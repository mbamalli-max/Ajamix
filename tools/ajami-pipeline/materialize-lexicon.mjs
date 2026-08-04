#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CANONICAL_MAPPING } from "./mapping.mjs";
import { formatCodePoints, tokenize } from "./tokenizer.mjs";
import {
  LEXICON_ORTHOGRAPHY,
  normalizeBoko,
  validateLexiconEntry,
} from "./lexicon/schema.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REVIEW_QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.json");
export const DEFAULT_OUTPUT_PATH = path.join(MODULE_DIR, "data", "ajami-lexicon.json");

const consonantCodepoints = new Map(
  [...CANONICAL_MAPPING.canonicalConsonants, ...CANONICAL_MAPPING.provisionalVelarClusters].map(
    (entry) => [entry.token, [...(entry.codePoints ?? [entry.codePoint])]]
  )
);

const shortVowelCodepoints = new Map([
  ["a", ["U+064E"]],
  ["i", ["U+0650"]],
  ["u", ["U+064F"]],
  ["e", ["U+065C"]],
  ["o", ["U+064F"]],
]);

function codepointsToString(codepoints) {
  return codepoints
    .map((codepoint) => {
      if (!/^U\+[0-9A-F]{4,6}$/u.test(codepoint)) {
        throw new Error(`Invalid Unicode code point: ${codepoint}`);
      }
      return String.fromCodePoint(Number.parseInt(codepoint.slice(2), 16));
    })
    .join("");
}

function characterPosition(source, sourceStart) {
  return Array.from(source.slice(0, sourceStart)).length;
}

function questionAt(entry, type, position) {
  return entry.openQuestions.find(
    (question) => question.type === type && question.position === position
  );
}

/**
 * The review queue records choices as human-readable option text. Its trailing
 * U+ labels are the stored spelling data; supplied literals take precedence
 * because they are the reviewer's exact replacement rather than an option.
 */
export function decisionCodepoints(question) {
  if (typeof question.reviewerDecision !== "string") {
    throw new Error(`${question.type} at ${question.position}: missing reviewerDecision`);
  }
  if (typeof question.reviewerSuppliedSequence === "string") {
    const supplied = formatCodePoints(question.reviewerSuppliedSequence);
    if (!supplied.length && !/emit no code points/iu.test(question.reviewerDecision)) {
      throw new Error(`${question.type} at ${question.position}: empty supplied sequence`);
    }
    return supplied;
  }
  if (/emit no code points/iu.test(question.reviewerDecision)) return [];

  const decisionText = String(question.reviewerDecision);
  const sequenceText = decisionText.includes(" — ")
    ? decisionText.slice(decisionText.lastIndexOf(" — ") + 3)
    : decisionText;
  const codepoints = sequenceText.match(/U\+[0-9A-F]{4,6}/gu) ?? [];
  if (!codepoints.length) {
    throw new Error(
      `${question.type} at ${question.position}: decision has no explicit Unicode sequence`
    );
  }
  return codepoints;
}

function pushSuppliedSequence(output, sequence) {
  // Some lexical exceptions deliberately include the preceding base (for
  // example ko -> کُو). Replace an exact emitted suffix instead of duplicating
  // it. This is unambiguous because only an exact code-point suffix is removed.
  for (let length = Math.min(output.length, sequence.length - 1); length > 0; length -= 1) {
    if (output.slice(-length).every((value, index) => value === sequence[index])) {
      output.splice(-length, length, ...sequence);
      return;
    }
  }
  output.push(...sequence);
}

function selectedSequence(question, output) {
  const sequence = decisionCodepoints(question);
  if (question.reviewerSuppliedSequence !== undefined) {
    pushSuppliedSequence(output, sequence);
    return true;
  }
  output.push(...sequence);
  return false;
}

function consonantSequence(entry, token, position, output) {
  const hQuestion =
    token.token === "H_CONTEXT_REQUIRED"
      ? questionAt(entry, "ARABIC_LEXICAL_H", position)
      : undefined;
  const clusterQuestion = questionAt(entry, "VELAR_CLUSTER", position);
  const question = hQuestion ?? clusterQuestion;
  if (question) {
    return { supplied: selectedSequence(question, output), question };
  }

  const sequence = consonantCodepoints.get(token.token);
  if (!sequence) {
    throw new Error(`${entry.boko}: cannot place consonant token ${token.token} at ${position}`);
  }
  output.push(...sequence);
  return { supplied: false, question: null };
}

function questionEndTokenIndex(tokens, startIndex, question) {
  if (question.type === "GEMINATION" || question.type === "VOWEL_SEQUENCE") {
    const end = startIndex + 1;
    if (!tokens[end]) {
      throw new Error(`${question.type} at ${question.position}: replacement exceeds token stream`);
    }
    return end;
  }
  return startIndex;
}

function suppliedCoversQuestion(sequence, question) {
  const later = decisionCodepoints(question);
  return later.length > 0 &&
    later.length <= sequence.length &&
    later.every((codepoint, index) => sequence[sequence.length - later.length + index] === codepoint);
}

/** Assemble one spelling directly from ratified decisions and token positions. */
export function materializeAjami(entry) {
  const tokens = tokenize(entry.boko).tokens;
  const output = [];
  const skipQuestionPositions = new Set();

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const position = characterPosition(entry.boko, token.sourceStart);

    if (token.type === "VOWEL") {
      if (index === 0) {
        const carrier = questionAt(entry, "WORD_INITIAL_CARRIER", position);
        if (carrier) selectedSequence(carrier, output);
      }

      const sequenceQuestion = questionAt(entry, "VOWEL_SEQUENCE", position);
      if (sequenceQuestion) {
        if (!skipQuestionPositions.has(position)) selectedSequence(sequenceQuestion, output);
        index = questionEndTokenIndex(tokens, index, sequenceQuestion);
        continue;
      }

      const vowelQuestion =
        questionAt(entry, "VOWEL_LENGTH", position) ??
        questionAt(entry, "WORD_FINAL_VOWEL", position);
      if (vowelQuestion) {
        selectedSequence(vowelQuestion, output);
      } else {
        const fallback = shortVowelCodepoints.get(token.normalized.toLocaleLowerCase("ha"));
        if (!fallback) {
          throw new Error(`${entry.boko}: no vowel decision at position ${position}`);
        }
        output.push(...fallback);
      }
      continue;
    }

    if (token.type === "APOSTROPHE") {
      const question = questionAt(entry, "APOSTROPHE_ROLE", position);
      if (!question) throw new Error(`${entry.boko}: no apostrophe decision at position ${position}`);
      selectedSequence(question, output);
      continue;
    }

    if (token.type !== "PHONEME") {
      throw new Error(`${entry.boko}: cannot place token ${token.token} at ${position}`);
    }

    const gemination = questionAt(entry, "GEMINATION", position);
    const sukun = questionAt(entry, "SUKUN", position);
    let lastIndex = index;
    let suppressAutomaticSukun = false;

    if (gemination) {
      selectedSequence(gemination, output);
      lastIndex = questionEndTokenIndex(tokens, index, gemination);
    } else if (sukun) {
      selectedSequence(sukun, output);
      suppressAutomaticSukun = true;
    } else {
      const selected = consonantSequence(entry, token, position, output);
      if (selected.supplied) {
        const supplied = decisionCodepoints(selected.question);
        for (const question of entry.openQuestions) {
          if (
            question.position > position &&
            (question.type === "VOWEL_SEQUENCE" || question.type === "VOWEL_LENGTH" || question.type === "WORD_FINAL_VOWEL") &&
            suppliedCoversQuestion(supplied, question)
          ) {
            skipQuestionPositions.add(question.position);
          }
        }
      }
    }

    const next = tokens[lastIndex + 1];
    if (!suppressAutomaticSukun && (!next || (next.type === "PHONEME" && next.token !== token.token))) {
      output.push("U+0652");
    }
    index = lastIndex;
  }

  return codepointsToString(output);
}

function notesFor(entry) {
  const base = "Materialised from Muhammad's ratified review-queue decisions on 2026-08-03.";
  return entry.contextRule
    ? `${base} Spelling is context-dependent; contextRule governs the default and exceptions.`
    : base;
}

export function materializeEntry(entry) {
  const ajami = materializeAjami(entry);
  const lexiconEntry = {
    boko: entry.boko,
    normalizedBoko: normalizeBoko(entry.boko),
    tokens: [...entry.tokens],
    ajami,
    ajamiCodepoints: formatCodePoints(ajami),
    pronunciation: null,
    vowelLength: null,
    category: entry.category,
    orthography: LEXICON_ORTHOGRAPHY,
    status: "human_reviewed",
    confidence: "reviewed",
    source: ["tools/ajami-pipeline/data/review-queue-top500.json"],
    reviewer: "Muhammad",
    reviewDate: "2026-08-03",
    notes: notesFor(entry),
    ...(entry.contextRule ? { contextRule: structuredClone(entry.contextRule) } : {}),
  };
  const validation = validateLexiconEntry(lexiconEntry, { generated: true });
  if (!validation.ok) {
    throw new Error(`${entry.boko}: invalid materialised lexicon entry: ${validation.errors.join("; ")}`);
  }
  return lexiconEntry;
}

export function materializeLexicon(queue) {
  const entries = Array.isArray(queue) ? queue : queue?.entries;
  if (!Array.isArray(entries)) throw new Error("review queue must contain an entries array");
  return {
    schemaVersion: 1,
    orthography: LEXICON_ORTHOGRAPHY,
    materialType: "ratified_human_reviewed_lexicon",
    notice: "Ajami spellings materialised from ratified native-speaker review decisions.",
    entries: entries.map(materializeEntry),
  };
}

export function writeLexicon(lexicon, outputPath = DEFAULT_OUTPUT_PATH) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(lexicon, null, 2)}\n`, "utf8");
  return outputPath;
}

export function materializeFromFile(inputPath = REVIEW_QUEUE_PATH, outputPath = DEFAULT_OUTPUT_PATH) {
  const queue = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const lexicon = materializeLexicon(queue);
  writeLexicon(lexicon, outputPath);
  return lexicon;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [, , inputPath = REVIEW_QUEUE_PATH, outputPath = DEFAULT_OUTPUT_PATH] = process.argv;
  const lexicon = materializeFromFile(inputPath, outputPath);
  process.stdout.write(`Materialised ${lexicon.entries.length} ratified lexicon entries to ${outputPath}\n`);
}
