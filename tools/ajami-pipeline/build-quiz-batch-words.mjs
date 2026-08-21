#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildReviewQueueFromContent } from "./build-review-queue.mjs";
import { normalizeBoko } from "./lexicon/schema.mjs";
import { APOSTROPHE_CODE_POINTS, tokenize } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");

export const CONTENT_PATH = path.join(REPO_ROOT, "app", "content.json");
export const MERGED_LEXICON_PATH = path.join(
  MODULE_DIR,
  "data",
  "ajami-lexicon-merged.json"
);
export const OUTPUT_PATH = path.join(MODULE_DIR, "data", "quiz-batch-words.txt");
export const KNOWN_NON_HAUSA_TOKENS = Object.freeze([
  "vat",
  "group",
  "mobile",
  "money",
  "ussd",
  "whatsapp",
]);

const LETTER_OR_MARK_RE = /^[\p{L}\p{M}]+$/u;

function isApostropheToken(token) {
  const codePoints = Array.from(token.normalized, (character) => character.codePointAt(0));
  return codePoints.length === 1 && APOSTROPHE_CODE_POINTS.includes(codePoints[0]);
}

function isWordToken(token) {
  return (
    ["PHONEME", "VOWEL", "UNKNOWN"].includes(token.type) ||
    LETTER_OR_MARK_RE.test(token.normalized)
  );
}

/**
 * Group the pipeline tokenizer's units into words for vocabulary counting.
 * Generic apostrophes join a word only when they are internal. The tokenizer's
 * apostrophe-y PHONEME remains eligible at the beginning of words such as
 * 'Ya'ya. Numbers and placeholders remain non-word units.
 */
export function tokenizeSurfaceWords(surface) {
  const source = String(surface ?? "");
  const tokens = tokenize(source).tokens;
  const words = [];

  for (let index = 0; index < tokens.length;) {
    if (!isWordToken(tokens[index])) {
      index += 1;
      continue;
    }

    let endIndex = index;
    while (
      endIndex + 1 < tokens.length &&
      tokens[endIndex].sourceEnd === tokens[endIndex + 1].sourceStart
    ) {
      if (isWordToken(tokens[endIndex + 1])) {
        endIndex += 1;
        continue;
      }
      if (
        isApostropheToken(tokens[endIndex + 1]) &&
        endIndex + 2 < tokens.length &&
        tokens[endIndex + 1].sourceEnd === tokens[endIndex + 2].sourceStart &&
        isWordToken(tokens[endIndex + 2])
      ) {
        endIndex += 2;
        continue;
      }
      break;
    }

    words.push(source.slice(tokens[index].sourceStart, tokens[endIndex].sourceEnd));
    index = endIndex + 1;
  }

  return words;
}

export function quizLessonSurfaces(content) {
  const surfaces = [];
  for (const module of content?.modules ?? []) {
    for (const quiz of module.quiz ?? []) {
      if (typeof quiz.templateHa === "string") surfaces.push(quiz.templateHa);
      if (typeof quiz.answerFormula === "string") surfaces.push(quiz.answerFormula);
      for (const distractor of quiz.distractorFormulas ?? []) {
        if (typeof distractor === "string") surfaces.push(distractor);
      }
    }
    for (const lesson of module.lessons ?? []) {
      if (typeof lesson.heading?.ha === "string") surfaces.push(lesson.heading.ha);
    }
  }
  return surfaces;
}

function lexiconKeys(lexicon) {
  if (!Array.isArray(lexicon?.entries)) {
    throw new Error("merged lexicon must contain an entries array");
  }
  return new Set(lexicon.entries.map((entry) => normalizeBoko(entry.boko)));
}

function sortedExcluded(excluded) {
  return Array.from(excluded.values()).sort((left, right) =>
    left.token.localeCompare(right.token, "ha")
  );
}

export function deriveQuizBatchWords(
  content,
  lexicon,
  { knownNonHausaTokens = KNOWN_NON_HAUSA_TOKENS } = {}
) {
  const surfaces = quizLessonSurfaces(content);
  const covered = lexiconKeys(lexicon);
  const knownNonHausa = new Set(
    Array.from(knownNonHausaTokens, (token) => normalizeBoko(token))
  );
  const counts = new Map();
  const excluded = new Map();

  for (const surface of surfaces) {
    for (const surfaceWord of tokenizeSurfaceWords(surface)) {
      const word = normalizeBoko(surfaceWord);
      if (covered.has(word)) continue;
      if (knownNonHausa.has(word)) {
        const record = excluded.get(word) ?? {
          token: word,
          occurrences: 0,
          reason: "CONTENT_AUTHORING_ARTIFACT",
        };
        record.occurrences += 1;
        excluded.set(word, record);
        continue;
      }
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  // Reuse the queue builder's existing orthography and no-open-question
  // exclusions instead of maintaining a second non-Hausa classifier here.
  const classification = buildReviewQueueFromContent(content, {
    words: Array.from(counts.keys()),
  }).coverage.requestedWords;
  if (classification.unmatchedNotInCorpus.length) {
    throw new Error(
      "Derived quiz words are missing from the review corpus: " +
        classification.unmatchedNotInCorpus.join(", ")
    );
  }
  for (const item of classification.unmatchedExcludedNonHausa) {
    excluded.set(item.word, {
      token: item.word,
      occurrences: counts.get(item.word),
      reason: item.reason,
    });
    counts.delete(item.word);
  }

  const wordCounts = Array.from(counts, ([word, occurrences]) => ({ word, occurrences })).sort(
    (left, right) =>
      right.occurrences - left.occurrences || left.word.localeCompare(right.word, "ha")
  );
  return {
    words: wordCounts.map((item) => item.word),
    wordCounts,
    excludedTokens: sortedExcluded(excluded),
    surfaceCount: surfaces.length,
    lexiconEntryCount: lexicon.entries.length,
  };
}

export function writeQuizBatchWords(words, outputPath = OUTPUT_PATH) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, words.length ? `${words.join("\n")}\n` : "", "utf8");
  return outputPath;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length > 2) {
    throw new Error("build-quiz-batch-words.mjs does not accept arguments");
  }
  const content = JSON.parse(fs.readFileSync(CONTENT_PATH, "utf8"));
  const lexicon = JSON.parse(fs.readFileSync(MERGED_LEXICON_PATH, "utf8"));
  const result = deriveQuizBatchWords(content, lexicon);
  writeQuizBatchWords(result.words);
  process.stdout.write(
    `${JSON.stringify(
      {
        output: path.relative(REPO_ROOT, OUTPUT_PATH),
        wordCount: result.words.length,
        surfaceCount: result.surfaceCount,
        lexiconEntryCount: result.lexiconEntryCount,
        excludedTokens: result.excludedTokens,
      },
      null,
      2
    )}\n`
  );
}
