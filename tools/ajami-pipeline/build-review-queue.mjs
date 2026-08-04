#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  APOSTROPHE_CATEGORIES,
  classifyApostrophes,
} from "./apostrophe-classifier.mjs";
import {
  createGeneratedEntry,
  normalizeBoko,
  validateLexiconEntry,
} from "./lexicon/schema.mjs";
import { CANONICAL_MAPPING } from "./mapping.mjs";
import { formatCodePoints, tokenize } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");
const CONTENT_PATH = path.join(REPO_ROOT, "app", "content.json");
const CANDIDATE_CORPUS_PATH = path.join(MODULE_DIR, "data", "candidate-corpus.json");
const QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.json");
const MARKDOWN_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.md");
const COVERAGE_PATH = path.join(MODULE_DIR, "data", "review-queue-coverage.json");
const EXCLUDED_PATH = path.join(MODULE_DIR, "data", "review-queue-excluded.json");

export const HAUSA_FIELD_NAMES = Object.freeze([
  "titleHa",
  "subjectHa",
  "textExplanationHa",
  "audioScript",
  "questionHa",
  "templateHa",
  "ha",
  "topicHa",
  "termHa",
  "definitionHa",
]);

export const COVERAGE_CUTOFFS = Object.freeze([
  50,
  100,
  200,
  300,
  500,
  1000,
  1500,
  2000,
  3000,
]);

export const OPEN_QUESTION_TYPES = Object.freeze([
  "VOWEL_LENGTH",
  "WORD_INITIAL_CARRIER",
  "WORD_FINAL_VOWEL",
  "SHORT_E_CARRIER",
  "APOSTROPHE_ROLE",
  "ARABIC_LEXICAL_H",
  "NON_HAUSA_TOKEN",
  "VELAR_CLUSTER",
  "VOWEL_SEQUENCE",
  "GEMINATION",
  "SUKUN",
  "DERIVATION_BLOCKED",
]);

const HAUSA_FIELD_NAME_SET = new Set(HAUSA_FIELD_NAMES);
const WORD_PATTERN = /[\p{L}\p{M}\u0027\u2019\u02BC]+/gu;
const BRACKETED_CONSTRUCT_PATTERN = /\[[^\]\r\n]*\]/gu;
const TEMPLATE_PLACEHOLDER_PATTERN = /\{[^{}\r\n]*\}/gu;
const APOSTROPHE_PATTERN = /[\u0027\u2019\u02BC]/gu;
const BARE_LATIN_LETTER_PATTERN = /^[a-z]$/u;
const NAMED_STRUCTURAL_MARKER_PATTERN =
  /^\[\s*(?:(?:intro|main|outro)\s*|pause\s+\d+(?:\s+question)?)\s*\]$/iu;
const GENERIC_UPPERCASE_CUE_PATTERN =
  /^\[\s*[A-Z][A-Z0-9]*(?:\s+[A-Za-z0-9]+)*\s*\]$/u;
const HAUSA_BOKO_ORTHOGRAPHY_PATTERN = /^(?:[aeiou]\u0304?|[bɓcɗdfghjklƙmnorstwyƴz]|['’ʼ])+$/u;
const VOWEL_TOKEN_PREFIX = "VOWEL_";
const UNRESOLVED_APOSTROPHE_CATEGORIES = new Set(
  Object.values(APOSTROPHE_CATEGORIES).filter(
    (category) => category !== APOSTROPHE_CATEGORIES.GLOTTALIZED_Y
  )
);

const consonantGlyphs = new Map(
  [
    ...CANONICAL_MAPPING.canonicalConsonants,
    ...CANONICAL_MAPPING.provisionalVelarClusters,
  ].map((entry) => [entry.token, entry.glyph])
);
const vowelInventory = new Map(
  CANONICAL_MAPPING.vowelAndMarkInventory.map((entry) => [entry.token, entry])
);
const approvedSequences = new Map(
  CANONICAL_MAPPING.approvedSequences.map((entry) => [entry.token, entry])
);
const shortVowelTokens = new Map([
  ["a", "VOWEL_SHORT_A"],
  ["i", "VOWEL_SHORT_I"],
  ["u", "VOWEL_SHORT_U_O"],
  ["e", "VOWEL_SHORT_E"],
  ["o", "VOWEL_SHORT_U_O"],
]);
const longVowelTokens = new Map([
  ["a", "VOWEL_LONG_A"],
  ["i", "VOWEL_LONG_I"],
  ["u", "VOWEL_LONG_U"],
  ["e", "VOWEL_LONG_E"],
  ["o", "VOWEL_LONG_O"],
]);

function loadArabicLoanCandidates() {
  const source = JSON.parse(fs.readFileSync(CANDIDATE_CORPUS_PATH, "utf8"));
  return new Set(
    (source.candidates ?? [])
      .filter(
        (candidate) =>
          candidate.category === "arabic_lexical" ||
          candidate.coverageLabels?.includes("arabic_islamic_lexical_h")
      )
      .map((candidate) => candidate.normalizedBoko)
  );
}

const ARABIC_LOAN_CANDIDATES = loadArabicLoanCandidates();

const EXCLUSION_CLASSIFICATIONS = new Map([
  ["percent", "ENGLISH_LEAKAGE"],
  ["question", "ENGLISH_LEAKAGE"],
  ["sphere", "ENGLISH_LEAKAGE"],
  ["capacity", "ENGLISH_LEAKAGE"],
  ["average", "ENGLISH_LEAKAGE"],
  ["pictograph", "ENGLISH_LEAKAGE"],
  ["whatsapp", "ENGLISH_LEAKAGE"],
  ["protractor", "ENGLISH_LEAKAGE"],
  ["vat", "ACRONYM"],
  ["icpc", "ACRONYM"],
  ["tiv", "PROPER_NOUN"],
  ["perimita", "GLOSSED_LOANWORD"],
  ["kurvature", "GLOSSED_LOANWORD"],
]);

function roundPercent(numerator, denominator) {
  return denominator ? Number(((numerator / denominator) * 100).toFixed(4)) : 0;
}

function increment(object, key, amount = 1) {
  object[key] = (object[key] ?? 0) + amount;
}

function sortCounts(object) {
  return Object.fromEntries(
    Object.entries(object).sort(
      (left, right) => right[1] - left[1] || left[0].localeCompare(right[0])
    )
  );
}

function sourcePath(parts) {
  return parts.join(".");
}

function moduleId(content, parts) {
  if (parts[0] === "modules" && Number.isInteger(parts[1])) {
    return content.modules[parts[1]]?.id ?? `modules.${parts[1]}`;
  }
  if (parts[0] === "activities" && Number.isInteger(parts[1])) {
    return `activity:${content.activities[parts[1]]?.activityId ?? parts[1]}`;
  }
  if (parts[0] === "glossary" && Number.isInteger(parts[1])) {
    return `glossary:${content.glossary[parts[1]]?.id ?? parts[1]}`;
  }
  return "_corpus";
}

function collectHausaFields(content) {
  const fields = [];

  function walk(value, parts = []) {
    if (Array.isArray(value)) {
      value.forEach((child, index) => walk(child, [...parts, index]));
      return;
    }
    if (!value || typeof value !== "object") {
      return;
    }
    for (const [key, child] of Object.entries(value)) {
      const childParts = [...parts, key];
      if (typeof child === "string" && HAUSA_FIELD_NAME_SET.has(key)) {
        fields.push({
          fieldPath: sourcePath(childParts),
          fieldType: key,
          moduleId: moduleId(content, childParts),
          value: child,
        });
      }
      walk(child, childParts);
    }
  }

  walk(content);
  return fields;
}

function sentenceAt(text, start, end) {
  let sentenceStart = start;
  while (sentenceStart > 0 && !/[.!?\n]/u.test(text[sentenceStart - 1])) {
    sentenceStart -= 1;
  }
  let sentenceEnd = end;
  while (sentenceEnd < text.length) {
    const character = text[sentenceEnd];
    sentenceEnd += 1;
    if (/[.!?\n]/u.test(character)) {
      break;
    }
  }
  return text.slice(sentenceStart, sentenceEnd).trim();
}

function markerLooksStructural(construct) {
  return (
    NAMED_STRUCTURAL_MARKER_PATTERN.test(construct) ||
    GENERIC_UPPERCASE_CUE_PATTERN.test(construct)
  );
}

function stripStructuralMarkers(value, fieldPath, markers) {
  return value.replace(BRACKETED_CONSTRUCT_PATTERN, (construct) => {
    if (!markerLooksStructural(construct)) {
      throw new Error(
        `Unclassified bracketed construct in ${fieldPath}: ${construct}. ` +
          "It may be Hausa content; refusing to strip it."
      );
    }
    const marker = markers.get(construct) ?? {
      construct,
      occurrences: 0,
      runningWordsRemoved: 0,
      fieldPaths: new Set(),
    };
    marker.occurrences += 1;
    marker.runningWordsRemoved += Array.from(construct.matchAll(WORD_PATTERN)).length;
    marker.fieldPaths.add(fieldPath);
    markers.set(construct, marker);
    return " ";
  });
}

function stripTemplatePlaceholders(value, fieldPath, placeholders) {
  return value.replace(TEMPLATE_PLACEHOLDER_PATTERN, (construct) => {
    const placeholder = placeholders.get(construct) ?? {
      construct,
      occurrences: 0,
      runningWordsRemoved: 0,
      fieldPaths: new Set(),
    };
    placeholder.occurrences += 1;
    placeholder.runningWordsRemoved += Array.from(construct.matchAll(WORD_PATTERN)).length;
    placeholder.fieldPaths.add(fieldPath);
    placeholders.set(construct, placeholder);
    return " ";
  });
}

function normalizeCorpusBoko(value) {
  return normalizeBoko(value)
    .replace(APOSTROPHE_PATTERN, "'")
    .replace(/'y/giu, "\u01B4");
}

function isHausaBokoToken(normalizedBoko) {
  // Decomposition permits a vowel-length macron (for example dā) while still
  // rejecting foreign base letters such as p, q, v, and x.
  return HAUSA_BOKO_ORTHOGRAPHY_PATTERN.test(normalizedBoko.normalize("NFD"));
}

function isBareDisallowedLatinLetter(normalizedBoko) {
  return BARE_LATIN_LETTER_PATTERN.test(normalizedBoko) && normalizedBoko !== "a";
}

function exclusionReason(normalizedBoko) {
  if (/^[bcde]$/u.test(normalizedBoko)) {
    return "TEMPLATE_PLACEHOLDER";
  }
  if (isBareDisallowedLatinLetter(normalizedBoko)) {
    return "SINGLE_LATIN_LETTER";
  }
  if (normalizedBoko === "p" || normalizedBoko === "x") {
    return "SINGLE_LATIN_LETTER";
  }
  return EXCLUSION_CLASSIFICATIONS.get(normalizedBoko) === "GLOSSED_LOANWORD"
    ? "GLOSSED_LOANWORD"
    : "NON_HAUSA_ORTHOGRAPHY";
}

function indexCorpus(content) {
  const fields = collectHausaFields(content);
  const words = new Map();
  const structuralMarkers = new Map();
  const templatePlaceholders = new Map();
  let totalRunningWords = 0;

  for (const field of fields) {
    const withoutMarkers = stripStructuralMarkers(
      field.value,
      field.fieldPath,
      structuralMarkers
    );
    const cleanedValue = stripTemplatePlaceholders(
      withoutMarkers,
      field.fieldPath,
      templatePlaceholders
    );
    for (const match of cleanedValue.matchAll(WORD_PATTERN)) {
      const raw = match[0].normalize("NFC");
      const normalized = normalizeCorpusBoko(raw);
      totalRunningWords += 1;

      let record = words.get(normalized);
      if (!record) {
        record = {
          normalizedBoko: normalized,
          occurrences: 0,
          displayForms: new Map(),
          examples: [],
          exampleKeys: new Set(),
        };
        words.set(normalized, record);
      }
      record.occurrences += 1;
      record.displayForms.set(raw, (record.displayForms.get(raw) ?? 0) + 1);

      if (record.examples.length < 3) {
        const sentence = sentenceAt(cleanedValue, match.index, match.index + match[0].length);
        const key = `${field.moduleId}|${field.fieldPath}|${sentence}`;
        if (sentence && !record.exampleKeys.has(key)) {
          record.exampleKeys.add(key);
          record.examples.push(`[${field.moduleId} | ${field.fieldPath}] ${sentence}`);
        }
      }
    }
  }

  const ranked = Array.from(words.values()).sort(
    (left, right) =>
      right.occurrences - left.occurrences ||
      left.normalizedBoko.localeCompare(right.normalizedBoko, "ha")
  );
  return {
    fields,
    ranked,
    totalRunningWords,
    structuralMarkers,
    templatePlaceholders,
  };
}

function representativeBoko(record) {
  return Array.from(record.displayForms.entries()).sort(
    (left, right) =>
      right[1] - left[1] ||
      left[0].localeCompare(right[0], "ha")
  )[0][0];
}

function characterPosition(source, sourceStart) {
  return Array.from(source.slice(0, sourceStart)).length;
}

function codePointsForMappedToken(map, token) {
  const entry = map.get(token);
  return entry ? formatCodePoints(entry.glyph) : [];
}

function sequenceOption(label, codePoints) {
  return `${label} — ${codePoints.join(" ")}`;
}

function replacementSequenceOption(label) {
  return `${label} — reviewer must supply the exact Unicode replacement sequence`;
}

function vowelLengthQuestion(letter, position) {
  const shortEntry = vowelInventory.get(shortVowelTokens.get(letter));
  const longEntry = approvedSequences.get(longVowelTokens.get(letter));
  const shortCodePoints = formatCodePoints(shortEntry.glyph);
  const longCodePoints = formatCodePoints(longEntry.glyph);
  return {
    type: "VOWEL_LENGTH",
    position,
    letter,
    question:
      `Is the '${letter}' at position ${position} short (${shortCodePoints.join(" ")}) ` +
      `or long (${longCodePoints.join(" ")})?`,
    options: [
      sequenceOption("short", shortCodePoints),
      sequenceOption("long", longCodePoints),
    ],
    candidateCodePointSequences: {
      short: shortCodePoints,
      long: longCodePoints,
    },
  };
}

function vowelSequenceCandidates(letters) {
  const [leftLetter, rightLetter] = Array.from(letters);
  const left = {
    short: codePointsForMappedToken(vowelInventory, shortVowelTokens.get(leftLetter)),
    long: codePointsForMappedToken(approvedSequences, longVowelTokens.get(leftLetter)),
  };
  const right = {
    short: codePointsForMappedToken(vowelInventory, shortVowelTokens.get(rightLetter)),
    long: codePointsForMappedToken(approvedSequences, longVowelTokens.get(rightLetter)),
  };
  const candidates = {};
  for (const leftLength of ["short", "long"]) {
    for (const rightLength of ["short", "long"]) {
      const key = `${leftLength}_${rightLength}`;
      candidates[key] = [...left[leftLength], ...right[rightLength]];
    }
  }
  return candidates;
}

function isArabicLoanCandidate(normalizedBoko) {
  return normalizedBoko.includes("al") || ARABIC_LOAN_CANDIDATES.has(normalizedBoko);
}

function findAdjacentVowelPairs(tokenized) {
  const pairs = [];
  for (let index = 0; index + 1 < tokenized.tokens.length; index += 1) {
    const left = tokenized.tokens[index];
    const right = tokenized.tokens[index + 1];
    if (left.type === "VOWEL" && right.type === "VOWEL") {
      pairs.push({
        letters: `${left.normalized.toLocaleLowerCase("ha")}${right.normalized.toLocaleLowerCase("ha")}`,
        position: characterPosition(tokenized.source, left.sourceStart),
        rightPosition: characterPosition(tokenized.source, right.sourceStart),
      });
    }
  }
  return pairs;
}

function findRepeatedConsonants(tokenized) {
  const pairs = [];
  for (let index = 0; index + 1 < tokenized.tokens.length; index += 1) {
    const left = tokenized.tokens[index];
    const right = tokenized.tokens[index + 1];
    if (
      left.type === "PHONEME" &&
      right.type === "PHONEME" &&
      left.token === right.token
    ) {
      pairs.push({
        source: `${left.sourceSubstring}${right.sourceSubstring}`,
        token: left.token,
        position: characterPosition(tokenized.source, left.sourceStart),
      });
    }
  }
  return pairs;
}

function glyphForConsonantToken(token) {
  if (token.token === "H_CONTEXT_REQUIRED") {
    return consonantGlyphs.get("H_NATIVE_HAUSA");
  }
  return consonantGlyphs.get(token.token);
}

function findSukunTreatments(tokenized) {
  const treatments = [];
  for (let index = 0; index < tokenized.tokens.length; index += 1) {
    const token = tokenized.tokens[index];
    if (token.type !== "PHONEME") continue;
    const next = tokenized.tokens[index + 1];
    const followedByDistinctConsonant =
      next?.type === "PHONEME" && next.token !== token.token;
    if (!next || followedByDistinctConsonant) {
      treatments.push({
        tokenIndex: index,
        token: token.token,
        consonant: token.sourceSubstring,
        position: characterPosition(tokenized.source, token.sourceStart),
        baseGlyph: glyphForConsonantToken(token),
      });
    }
  }
  return treatments;
}

function sukunQuestion(treatment) {
  const baseCodePoints = formatCodePoints(treatment.baseGlyph);
  const exactSequence = [...baseCodePoints, "U+0652"];
  return {
    type: "SUKUN",
    position: treatment.position,
    consonant: treatment.consonant,
    question:
      `The consonant '${treatment.consonant}' at position ${treatment.position} has no ` +
      "following vowel. Confirm this exact closed-syllable sequence when resolving the " +
      "row's other blocker(s).",
    options: [sequenceOption("consonant + U+0652 SUKUN", exactSequence)],
    candidateCodePointSequences: { closedSyllable: exactSequence },
  };
}

function buildOpenQuestions(boko, tokenized) {
  const questions = [];
  const normalized = normalizeCorpusBoko(boko);
  const adjacentVowelPairs = findAdjacentVowelPairs(tokenized);
  const adjacentVowelPositions = new Set(
    adjacentVowelPairs.flatMap((pair) => [pair.position, pair.rightPosition])
  );
  const characters = Array.from(normalized);
  const finalCharacter = characters.at(-1) ?? "";
  const finalPosition = Array.from(boko).length - 1;
  let redundantQuestionsRemoved = 0;

  for (const token of tokenized.tokens) {
    if (token.type === "VOWEL") {
      const letter = token.normalized.toLocaleLowerCase("ha");
      const position = characterPosition(boko, token.sourceStart);
      if (adjacentVowelPositions.has(position) || position === finalPosition) {
        redundantQuestionsRemoved += 1;
        continue;
      }
      questions.push(
        vowelLengthQuestion(letter, position)
      );
    }
  }

  const firstCharacter = Array.from(normalized)[0] ?? "";
  if (/^[aeiou]$/u.test(firstCharacter)) {
    questions.push({
      type: "WORD_INITIAL_CARRIER",
      position: 0,
      letter: firstCharacter,
      question:
        `Which alif/hamza carrier is required before the word-initial '${firstCharacter}' ` +
        "at position 0?",
      options: [
        "U+0627 ALIF",
        "U+0623 ALIF WITH HAMZA ABOVE",
        "U+0625 ALIF WITH HAMZA BELOW",
        replacementSequenceOption("lexical exception"),
      ],
    });
    if (firstCharacter === "e") {
      questions.push({
        type: "SHORT_E_CARRIER",
        position: 0,
        letter: "e",
        question:
          "If the word-initial 'e' is short, confirm the required U+0639 AIN carrier " +
          "before U+065C per standard §7.",
        options: [
          "short-e carrier — U+0639 U+065C",
          replacementSequenceOption("lexical exception"),
        ],
      });
    }
  }

  if (/^[aeiou]$/u.test(finalCharacter) && !adjacentVowelPositions.has(finalPosition)) {
    const shortCodePoints = codePointsForMappedToken(
      vowelInventory,
      shortVowelTokens.get(finalCharacter)
    );
    const longCodePoints = codePointsForMappedToken(
      approvedSequences,
      longVowelTokens.get(finalCharacter)
    );
    questions.push({
      type: "WORD_FINAL_VOWEL",
      position: finalPosition,
      letter: finalCharacter,
      question:
        `Which reviewed final-vowel form is required for '${finalCharacter}' at position ` +
        `${finalPosition}? Select the exact sequence, or supply a replacement sequence.`,
      options: [
        sequenceOption("short final", shortCodePoints),
        sequenceOption("long final", longCodePoints),
        replacementSequenceOption("lexical exception"),
      ],
      candidateCodePointSequences: {
        short: shortCodePoints,
        long: longCodePoints,
      },
    });
  } else if (/^[aeiou]$/u.test(finalCharacter)) {
    // The adjacent-vowel decision replaces the old dependent final-vowel question.
    redundantQuestionsRemoved += 1;
  }

  const apostropheResult = classifyApostrophes(boko);
  for (const occurrence of apostropheResult.occurrences) {
    if (
      occurrence.autoResolved ||
      !UNRESOLVED_APOSTROPHE_CATEGORIES.has(occurrence.category)
    ) {
      continue;
    }
    questions.push({
      type: "APOSTROPHE_ROLE",
      position: characterPosition(boko, occurrence.sourceIndex),
      inferredCategory: occurrence.category,
      question:
        `The classifier inferred ${occurrence.category} for the apostrophe at position ` +
        `${characterPosition(boko, occurrence.sourceIndex)}. Is it a glottal boundary, ` +
        "morpheme boundary, typographic punctuation to remove, or another lexical exception?",
      options: [
        replacementSequenceOption("glottal boundary"),
        replacementSequenceOption("morpheme boundary"),
        "typographic punctuation — emit no code points for the apostrophe",
        replacementSequenceOption("lexical exception"),
      ],
    });
  }

  const hTokens = tokenized.tokens.filter((token) => token.token === "H_CONTEXT_REQUIRED");
  if (hTokens.length) {
    const arabicLoanCandidate = isArabicLoanCandidate(normalized);
    questions.push({
      type: "ARABIC_LEXICAL_H",
      position: characterPosition(boko, hTokens[0].sourceStart),
      arabicLoanCandidate,
      question:
        `Should '${boko}' use H_NATIVE_HAUSA (ح, U+062D) or ` +
        `H_ARABIC_LEXICAL (ه, U+0647)?${arabicLoanCandidate
          ? " This word is flagged as a possible Arabic/Islamic lexical form."
          : ""}`,
      options: [
        "H_NATIVE_HAUSA — U+062D",
        "H_ARABIC_LEXICAL — U+0647",
      ],
    });
  }

  for (const token of tokenized.tokens.filter((item) => item.type === "UNKNOWN")) {
    questions.push({
      type: "NON_HAUSA_TOKEN",
      position: characterPosition(boko, token.sourceStart),
      token: token.sourceSubstring,
      codePoints: token.codePoints,
      question:
        `Tokenizer emitted UNKNOWN for '${token.sourceSubstring}' ` +
        `(${token.codePoints.join(" ")}) at position ` +
        `${characterPosition(boko, token.sourceStart)}. Which non-Hausa/loanword route applies?`,
      options: [
        replacementSequenceOption("mixed_hausa_english"),
        replacementSequenceOption("assimilated_loanword"),
        replacementSequenceOption("proper_noun"),
        replacementSequenceOption("other"),
      ],
    });
  }

  for (const token of tokenized.tokens.filter((item) => item.provisional)) {
    const clusterCodePoints = formatCodePoints(consonantGlyphs.get(token.token));
    questions.push({
      type: "VELAR_CLUSTER",
      position: characterPosition(boko, token.sourceStart),
      token: token.token,
      question:
        `Confirm the provisional ${token.token} spelling for '${token.sourceSubstring}' ` +
        `at position ${characterPosition(boko, token.sourceStart)} in this vowel environment.`,
      options: [
        sequenceOption("use canonical provisional cluster", clusterCodePoints),
        replacementSequenceOption("lexical exception"),
      ],
      candidateCodePointSequences: {
        canonicalProvisionalCluster: clusterCodePoints,
      },
    });
  }

  for (const pair of adjacentVowelPairs) {
    const approvedDiphthong = {
      ai: codePointsForMappedToken(approvedSequences, "DIPHTHONG_AI"),
      au: codePointsForMappedToken(approvedSequences, "DIPHTHONG_AU"),
    }[pair.letters];
    const separateVowelCandidates = vowelSequenceCandidates(pair.letters);
    const candidateCodePointSequences = {
      ...(approvedDiphthong ? { approvedDiphthong } : {}),
      ...separateVowelCandidates,
    };
    questions.push({
      type: "VOWEL_SEQUENCE",
      position: pair.position,
      letters: pair.letters,
      question:
        `Which exact sequence represents '${pair.letters}' at positions ${pair.position}-` +
        `${pair.position + 1}? This one decision replaces both component length questions` +
        `${pair.rightPosition === finalPosition ? " and the dependent final-vowel question" : ""}.`,
      options: [
        ...(approvedDiphthong
          ? [sequenceOption("approved diphthong", approvedDiphthong)]
          : []),
        ...Object.entries(separateVowelCandidates).map(([key, codePoints]) =>
          sequenceOption(`separate vowels (${key.replaceAll("_", " + ")})`, codePoints)
        ),
        replacementSequenceOption("lexical exception"),
      ],
      candidateCodePointSequences,
    });
  }

  for (const pair of findRepeatedConsonants(tokenized)) {
    const baseGlyph =
      pair.token === "H_CONTEXT_REQUIRED"
        ? consonantGlyphs.get("H_NATIVE_HAUSA")
        : consonantGlyphs.get(pair.token);
    const baseCodePoints = baseGlyph ? formatCodePoints(baseGlyph) : [];
    questions.push({
      type: "GEMINATION",
      position: pair.position,
      token: pair.token,
      question:
        `Should repeated '${pair.source}' at positions ${pair.position}-${pair.position + 1} ` +
        "be written as one consonant plus U+0651 SHADDA, as two bases, or as a lexical exception?",
      options: [
        sequenceOption("one consonant base + U+0651 SHADDA", [
          ...baseCodePoints,
          "U+0651",
        ]),
        sequenceOption("two consonant bases", [...baseCodePoints, ...baseCodePoints]),
        replacementSequenceOption("lexical exception"),
      ],
    });
  }

  return { questions, redundantQuestionsRemoved };
}

function deriveProvisionalAjami(boko, tokenized) {
  const adjacentVowels = findAdjacentVowelPairs(tokenized);
  const sukunTokenIndexes = new Set(
    findSukunTreatments(tokenized).map((treatment) => treatment.tokenIndex)
  );
  const blockingReasons = [];
  let output = "";
  let hasBase = false;

  if (tokenized.tokens[0]?.type === "VOWEL") {
    blockingReasons.push("WORD_INITIAL_CARRIER");
  }
  if (tokenized.tokens.some((token) => token.type === "UNKNOWN")) {
    blockingReasons.push("NON_HAUSA_TOKEN");
  }
  if (tokenized.tokens.some((token) => token.token === "APOSTROPHE_UNRESOLVED")) {
    blockingReasons.push("APOSTROPHE_ROLE");
  }
  if (adjacentVowels.length) {
    blockingReasons.push("VOWEL_SEQUENCE");
  }
  if (findRepeatedConsonants(tokenized).length) {
    blockingReasons.push("GEMINATION");
  }

  if (blockingReasons.length) {
    return {
      provisionalAjami: null,
      blockingReasons: Array.from(new Set(blockingReasons)),
    };
  }

  for (let index = 0; index < tokenized.tokens.length; index += 1) {
    const token = tokenized.tokens[index];
    if (token.token === "H_CONTEXT_REQUIRED") {
      output += consonantGlyphs.get("H_NATIVE_HAUSA");
      if (sukunTokenIndexes.has(index)) output += "\u0652";
      hasBase = true;
    } else if (consonantGlyphs.has(token.token)) {
      output += consonantGlyphs.get(token.token);
      if (sukunTokenIndexes.has(index)) output += "\u0652";
      hasBase = true;
    } else if (token.type === "VOWEL") {
      const letter = token.normalized.toLocaleLowerCase("ha");
      const shortEntry = vowelInventory.get(shortVowelTokens.get(letter));
      if (!hasBase || !shortEntry) {
        blockingReasons.push("DERIVATION_BLOCKED");
        continue;
      }
      output += shortEntry.glyph;
    } else {
      blockingReasons.push("DERIVATION_BLOCKED");
    }
  }

  return blockingReasons.length
    ? {
        provisionalAjami: null,
        blockingReasons: Array.from(new Set(blockingReasons)),
      }
    : { provisionalAjami: output, blockingReasons: [] };
}

function entryCategory(openQuestions) {
  if (openQuestions.some((question) => question.type === "NON_HAUSA_TOKEN")) {
    return "mixed_hausa_english";
  }
  if (
    openQuestions.some(
      (question) => question.type === "ARABIC_LEXICAL_H" && question.arabicLoanCandidate
    )
  ) {
    return "arabic_lexical";
  }
  return "native_hausa";
}

function blockedQuestion(reason) {
  return {
    type: "DERIVATION_BLOCKED",
    reason,
    question:
      `No complete provisional Ajami form can be derived until the ${reason} decision is resolved.`,
    options: [replacementSequenceOption("resolve named decision")],
  };
}

function buildEntry(record, rank, cumulativeOccurrences, totalRunningWords) {
  const boko = representativeBoko(record);
  const tokenized = tokenize(boko);
  const questionBuild = buildOpenQuestions(boko, tokenized);
  const openQuestions = questionBuild.questions;
  const derived = deriveProvisionalAjami(boko, tokenized);

  if (derived.provisionalAjami === null) {
    for (const treatment of findSukunTreatments(tokenized)) {
      openQuestions.push(sukunQuestion(treatment));
    }
  }

  for (const reason of derived.blockingReasons) {
    if (!openQuestions.some((question) => question.type === reason)) {
      openQuestions.push(blockedQuestion(reason));
    }
  }

  const category = entryCategory(openQuestions);
  const status = derived.provisionalAjami === null ? "blocked" : "provisional";
  const generated = createGeneratedEntry({
    boko,
    ajami: derived.provisionalAjami ?? "",
    category,
    status,
    source: ["app/content.json"],
    notes:
      "Machine-generated review aid. Short vowels are fallback candidates only; " +
      "all open questions require human review.",
  });
  const validation = validateLexiconEntry(generated, { generated: true });
  if (!validation.ok) {
    throw new Error(
      `Generated entry failed lexicon validation for ${boko}: ${validation.errors.join("; ")}`
    );
  }

  return {
    rank,
    boko: generated.boko,
    // Keep the most frequent original spelling in `boko` for display, but expose
    // the corpus-normalized key used for counting and apostrophe-family merging.
    normalizedBoko: record.normalizedBoko,
    occurrences: record.occurrences,
    cumulativeCoveragePercent: roundPercent(cumulativeOccurrences, totalRunningWords),
    tokens: generated.tokens,
    provisionalAjami: derived.provisionalAjami,
    ajamiCodepoints: derived.provisionalAjami === null ? [] : generated.ajamiCodepoints,
    status: generated.status,
    confidence: generated.confidence,
    openQuestions,
    category: generated.category,
    exampleSentences: record.examples,
    reviewerDecision: null,
    reviewerNotes: "",
    redundantQuestionsRemoved: questionBuild.redundantQuestionsRemoved,
  };
}

const REVIEW_FOCUS_ORDER = new Map([
  ["NON_HAUSA_TOKEN", 0],
  ["APOSTROPHE_ROLE", 1],
  ["ARABIC_LEXICAL_H", 2],
  ["WORD_INITIAL_CARRIER", 3],
  ["VOWEL_SEQUENCE", 4],
  ["GEMINATION", 5],
  ["VELAR_CLUSTER", 6],
  ["SUKUN", 7],
  ["WORD_FINAL_VOWEL", 8],
  ["VOWEL_LENGTH", 9],
  ["NONE", 10],
]);

function reviewFocus(entry) {
  for (const type of REVIEW_FOCUS_ORDER.keys()) {
    if (entry.openQuestions.some((question) => question.type === type)) {
      return type;
    }
  }
  return "NONE";
}

function groupWithinRankBands(entries, bandSize = 25) {
  const grouped = [];
  for (let start = 0; start < entries.length; start += bandSize) {
    const band = entries.slice(start, start + bandSize);
    band.sort(
      (left, right) =>
        (REVIEW_FOCUS_ORDER.get(reviewFocus(left)) ?? 99) -
          (REVIEW_FOCUS_ORDER.get(reviewFocus(right)) ?? 99) ||
        left.rank - right.rank
    );
    grouped.push(...band);
  }
  return grouped;
}

function makeCoverageReport(
  ranked,
  entries,
  totalRunningWords,
  totalDistinctWords,
  structuralMarkers,
  templatePlaceholders,
  excludedRecords,
  selection = { mode: "limit" }
) {
  const prefixOccurrences = [];
  let cumulative = 0;
  for (const record of ranked) {
    cumulative += record.occurrences;
    prefixOccurrences.push(cumulative);
  }

  const coverageCurve = Object.fromEntries(
    COVERAGE_CUTOFFS.map((cutoff) => {
      const covered = prefixOccurrences[Math.min(cutoff, ranked.length) - 1] ?? 0;
      return [
        String(cutoff),
        {
          reviewedWords: Math.min(cutoff, ranked.length),
          occurrencesCovered: covered,
          coveragePercent: roundPercent(covered, totalRunningWords),
        },
      ];
    })
  );
  const entriesByOpenQuestionType = Object.fromEntries(
    OPEN_QUESTION_TYPES.map((type) => [type, 0])
  );
  const openDecisionCountsByType = Object.fromEntries(
    OPEN_QUESTION_TYPES.map((type) => [type, 0])
  );
  const statusCounts = {};
  const blockedByReason = {};
  for (const entry of entries) {
    increment(statusCounts, entry.status);
    const entryQuestionTypes = new Set();
    for (const question of entry.openQuestions) {
      increment(openDecisionCountsByType, question.type);
      entryQuestionTypes.add(question.type);
    }
    for (const type of entryQuestionTypes) {
      increment(entriesByOpenQuestionType, type);
    }
    if (entry.status === "blocked") {
      const reasons = entry.openQuestions
        .filter((question) =>
          [
            "WORD_INITIAL_CARRIER",
            "APOSTROPHE_ROLE",
            "NON_HAUSA_TOKEN",
            "VOWEL_SEQUENCE",
            "GEMINATION",
            "DERIVATION_BLOCKED",
          ].includes(question.type)
        )
        .map((question) => question.type);
      for (const reason of new Set(reasons)) {
        increment(blockedByReason, reason);
      }
    }
  }

  const top500Covered = prefixOccurrences[Math.min(500, ranked.length) - 1] ?? 0;
  const report = {
    schemaVersion: 1,
    taskId: "2026-07-28-slice-42",
    source: "app/content.json",
    totalRunningWords,
    totalDistinctWords,
    eligibleRunningWords: ranked.reduce((sum, record) => sum + record.occurrences, 0),
    eligibleDistinctWords: ranked.length,
    exclusions: {
      structuralMarkers: {
        distinctConstructs: structuralMarkers.length,
        occurrences: structuralMarkers.reduce((sum, marker) => sum + marker.occurrences, 0),
        runningWordsRemoved: structuralMarkers.reduce(
          (sum, marker) => sum + marker.runningWordsRemoved,
          0
        ),
      },
      templatePlaceholders: {
        distinctConstructs: templatePlaceholders.length,
        occurrences: templatePlaceholders.reduce(
          (sum, placeholder) => sum + placeholder.occurrences,
          0
        ),
        runningWordsRemoved: templatePlaceholders.reduce(
          (sum, placeholder) => sum + placeholder.runningWordsRemoved,
          0
        ),
      },
      nonHausaTokens: {
        distinctTokens: excludedRecords.length,
        occurrences: excludedRecords.reduce((sum, record) => sum + record.occurrences, 0),
      },
      excludedArtifact: "data/review-queue-excluded.json",
    },
    entriesByOpenQuestionType: sortCounts(entriesByOpenQuestionType),
    openQuestionTypeCounts: sortCounts(entriesByOpenQuestionType),
    openDecisionCountsByType: sortCounts(openDecisionCountsByType),
    zeroOpenQuestionEntries: entries.filter((entry) => entry.openQuestions.length === 0).length,
    nonHausaFlaggedEntries: entries.filter((entry) =>
      entry.openQuestions.some((question) => question.type === "NON_HAUSA_TOKEN")
    ).length,
    statusCounts: sortCounts(statusCounts),
    blockedEntries: entries.filter((entry) => entry.status === "blocked").length,
    blockedByReason: sortCounts(blockedByReason),
    redundantQuestionsRemoved: entries.reduce(
      (sum, entry) => sum + entry.redundantQuestionsRemoved,
      0
    ),
    sukunTreatedEntries: entries.filter(
      (entry) =>
        String(entry.provisionalAjami ?? "").includes("\u0652") ||
        entry.openQuestions.some((question) => question.type === "SUKUN")
    ).length,
  };
  if (selection.mode === "wordList") {
    const occurrencesCovered = entries.reduce((sum, entry) => sum + entry.occurrences, 0);
    report.selection = {
      mode: "wordList",
      entryCount: entries.length,
      occurrencesCovered,
      coveragePercent: roundPercent(occurrencesCovered, totalRunningWords),
    };
    report.requestedWords = selection.requestedWords;
  } else {
    report.coverageCurve = coverageCurve;
    report.top500 = {
      entryCount: entries.length,
      occurrencesCovered: top500Covered,
      coveragePercent: roundPercent(top500Covered, totalRunningWords),
    };
  }
  return report;
}

function markerArtifactEntries(structuralMarkers) {
  return structuralMarkers
    .map((marker) => ({
      token: marker.construct,
      occurrences: marker.occurrences,
      runningWordsRemoved: marker.runningWordsRemoved,
      reason: "STRUCTURAL_MARKER",
      fieldPaths: Array.from(marker.fieldPaths).sort(),
    }))
    .sort((left, right) => left.token.localeCompare(right.token));
}

function placeholderArtifactEntries(templatePlaceholders) {
  return templatePlaceholders
    .map((placeholder) => ({
      token: placeholder.construct,
      occurrences: placeholder.occurrences,
      runningWordsRemoved: placeholder.runningWordsRemoved,
      reason: "TEMPLATE_PLACEHOLDER",
      fieldPaths: Array.from(placeholder.fieldPaths).sort(),
    }))
    .sort((left, right) => left.token.localeCompare(right.token));
}

function excludedTokenArtifactEntries(excludedRecords) {
  return excludedRecords.map((record) => {
    const normalizedBoko = record.normalizedBoko;
    const classification = EXCLUSION_CLASSIFICATIONS.get(normalizedBoko);
    return {
      token: representativeBoko(record),
      normalizedBoko,
      occurrences: record.occurrences,
      reason: record.exclusionReason ?? exclusionReason(normalizedBoko),
      ...(classification ? { classification } : {}),
    };
  });
}

function makeExcludedArtifact(structuralMarkers, templatePlaceholders, excludedRecords) {
  const markers = markerArtifactEntries(structuralMarkers);
  const placeholders = placeholderArtifactEntries(templatePlaceholders);
  const tokens = excludedTokenArtifactEntries(excludedRecords);
  return {
    schemaVersion: 1,
    taskId: "2026-07-28-slice-42",
    source: "app/content.json",
    notice:
      "Excluded from this generated Hausa review queue only; retained here for a later " +
      "loanword, acronym, proper-noun, or structural-marker classification decision.",
    structuralMarkers: markers,
    templatePlaceholders: placeholders,
    nonHausaTokens: tokens,
  };
}

function escapeMarkdown(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function plainQuestion(question) {
  const prefix = question.position === undefined ? "" : `pos ${question.position}: `;
  const options = Array.isArray(question.options)
    ? `<br>Options: ${question.options
        .map((option, index) => `${index + 1}) ${option}`)
        .join("; ")}`
    : "";
  return `${question.type} — ${prefix}${question.question}${options}`;
}

export function renderReviewMarkdown(queue, coverage) {
  const isWordList = coverage.selection?.mode === "wordList";
  const selectionSummary = isWordList
    ? `This selected list contains ${coverage.selection.entryCount} forms and covers ` +
      `${coverage.selection.coveragePercent.toFixed(4)}% of running text.`
    : `Exactly 500 reviewed forms cover ${coverage.top500.coveragePercent.toFixed(4)}% of running text.`;
  const lines = [
    "# Top-500 Hausa word review queue",
    "",
    "Each completed row is a permanent corpus-wide lexical decision: every occurrence of that Boko " +
      "word benefits from the same review. `VOWEL_LENGTH` asks whether a written Boko vowel is short " +
      "or long; Boko spelling does not encode that distinction, while fully vowelled Ajami must.",
    "",
    "Leaving a decision blank is safe. The row remains `provisional` or `blocked`, is not approved, " +
      "and is not shipped. A blocked Ajami cell means the existing rules cannot produce a complete " +
      "form without guessing.",
    "",
    `Corpus: ${coverage.totalRunningWords.toLocaleString("en-US")} running word tokens and ` +
      `${coverage.totalDistinctWords.toLocaleString("en-US")} lowercase-folded forms. ` +
      `Structural markers and template placeholders are removed before counting; ` +
      `non-Hausa-orthography tokens are excluded ` +
      `from ranking and recorded separately. ${selectionSummary}`,
    "",
    isWordList
      ? "Ordering: entries are sorted by their immutable corpus frequency rank."
      : "Ordering: immutable frequency ranks are divided into bands of 25. Within each band, rows are " +
        "grouped by review focus (non-Hausa, apostrophe, lexical h, initial carrier, vowel sequence, " +
        "gemination, velar cluster, final vowel, then vowel length). No entry moves across a " +
        "25-rank boundary.",
    "",
  ];

  for (let start = 0; start < queue.entries.length; start += 25) {
    const band = queue.entries.slice(start, start + 25);
    const lowRank = isWordList ? band[0]?.rank : start + 1;
    const highRank = isWordList ? band.at(-1)?.rank : Math.min(start + 25, queue.entries.length);
    const coverageAtBoundary =
      coverage.coverageCurve?.[String(highRank)]?.coveragePercent ??
      Math.max(...band.map((entry) => entry.cumulativeCoveragePercent));
    lines.push(
      `## Frequency ranks ${lowRank}–${highRank}`,
      "",
      isWordList
        ? `Selected entries through corpus rank ${highRank} account for ${coverageAtBoundary.toFixed(4)}% of all running text.`
        : `Ranks 1–${highRank} account for ${coverageAtBoundary.toFixed(4)}% of all running text.`,
      "",
      "| Rank | Boko | Occurrences | Cumulative coverage | Provisional Ajami | Open question(s) | Decision |",
      "|---:|---|---:|---:|---|---|---|"
    );
    for (const entry of band) {
      const questions = entry.openQuestions.length
        ? entry.openQuestions.map(plainQuestion).join("<br>")
        : "No unresolved question recorded; remains generated and unapproved.";
      lines.push(
        `| ${entry.rank} | ${escapeMarkdown(entry.boko)} | ${entry.occurrences} | ` +
          `${entry.cumulativeCoveragePercent.toFixed(4)}% | ` +
          `${escapeMarkdown(entry.provisionalAjami ?? "— blocked")} | ` +
          `${escapeMarkdown(questions).replaceAll("&lt;br&gt;", "<br>")} |  |`
      );
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

export function buildReviewQueueFromContent(content, options = {}) {
  const { limit, words } = options;
  if (limit !== undefined && words !== undefined) {
    throw new Error("Specify either limit or words, not both");
  }
  if (words !== undefined && !Array.isArray(words)) {
    throw new Error("words must be an array");
  }
  const selectedLimit = limit ?? 500;
  const {
    fields,
    ranked: corpusRanked,
    totalRunningWords,
    structuralMarkers,
    templatePlaceholders,
  } = indexCorpus(content);
  const ranked = [];
  const excludedRecords = [];
  for (const record of corpusRanked) {
    if (!isHausaBokoToken(record.normalizedBoko)) {
      excludedRecords.push(record);
      continue;
    }
    if (isBareDisallowedLatinLetter(record.normalizedBoko)) {
      record.exclusionReason = exclusionReason(record.normalizedBoko);
      excludedRecords.push(record);
      continue;
    }
    const boko = representativeBoko(record);
    const questionBuild = buildOpenQuestions(boko, tokenize(boko));
    if (questionBuild.questions.length === 0) {
      record.exclusionReason = "NO_OPEN_QUESTION";
      excludedRecords.push(record);
      continue;
    }
    ranked.push(record);
  }
  if (words === undefined && ranked.length < selectedLimit) {
    throw new Error(`Corpus has only ${ranked.length} distinct forms; cannot build top ${selectedLimit}`);
  }

  const cumulativeByRecord = new Map();
  let cumulativeOccurrences = 0;
  ranked.forEach((record) => {
    cumulativeOccurrences += record.occurrences;
    cumulativeByRecord.set(record, cumulativeOccurrences);
  });
  const rankByRecord = new Map(ranked.map((record, index) => [record, index + 1]));
  const rankedByNormalized = new Map(
    ranked.map((record) => [record.normalizedBoko, record])
  );
  const excludedByNormalized = new Map(
    excludedRecords.map((record) => [record.normalizedBoko, record])
  );
  const requestedNormalized = words === undefined
    ? null
    : Array.from(new Set(words.map((word) => normalizeCorpusBoko(word)))).sort((left, right) =>
        left.localeCompare(right, "ha")
      );
  const selectedRecords = requestedNormalized === null
    ? ranked.slice(0, selectedLimit)
    : ranked.filter((record) => requestedNormalized.includes(record.normalizedBoko));
  const requestedWords = requestedNormalized === null
    ? null
    : {
        requested: requestedNormalized.length,
        matched: selectedRecords.length,
        unmatchedNotInCorpus: requestedNormalized.filter(
          (word) => !rankedByNormalized.has(word) && !excludedByNormalized.has(word)
        ),
        unmatchedExcludedNonHausa: requestedNormalized
          .filter((word) => excludedByNormalized.has(word))
          .map((word) => ({
            word,
            reason: excludedByNormalized.get(word).exclusionReason ?? exclusionReason(word),
          })),
      };
  const frequencyEntries = selectedRecords.map((record) =>
    buildEntry(record, rankByRecord.get(record), cumulativeByRecord.get(record), totalRunningWords)
  );
  const entries = requestedNormalized === null
    ? groupWithinRankBands(frequencyEntries)
    : frequencyEntries;
  const markerEntries = Array.from(structuralMarkers.values());
  const placeholderEntries = Array.from(templatePlaceholders.values());
  const coverage = makeCoverageReport(
    ranked,
    entries,
    totalRunningWords,
    corpusRanked.length,
    markerEntries,
    placeholderEntries,
    excludedRecords,
    requestedWords === null ? { mode: "limit" } : { mode: "wordList", requestedWords }
  );
  const queue = {
    schemaVersion: 1,
    taskId: "2026-07-28-slice-42",
    materialType: "generated_review_queue_not_approved",
    source: "app/content.json",
    notice:
      "Machine-generated review material only. No entry is approved or production-wired; " +
      "human decisions are required before promotion.",
    fieldSelection: HAUSA_FIELD_NAMES,
    totalHausaFieldsScanned: fields.length,
    ordering: requestedNormalized === null
      ? "Frequency ranks are immutable. Entries are grouped by review focus only within fixed " +
        "25-rank bands; maximum displacement is 24 positions and no section boundary is crossed."
      : "Entries are sorted by immutable corpus frequency rank.",
    entryCount: entries.length,
    entries,
  };
  return {
    queue,
    coverage,
    excluded: makeExcludedArtifact(markerEntries, placeholderEntries, excludedRecords),
    markdown: renderReviewMarkdown(queue, coverage),
  };
}

export function buildReviewQueue(contentPath = CONTENT_PATH, options = {}) {
  const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
  return buildReviewQueueFromContent(content, options);
}

export function writeReviewQueueArtifacts({
  contentPath = CONTENT_PATH,
  queuePath = QUEUE_PATH,
  markdownPath = MARKDOWN_PATH,
  coveragePath = COVERAGE_PATH,
  excludedPath = EXCLUDED_PATH,
  force = false,
  words,
  limit,
} = {}) {
  if (fs.existsSync(queuePath)) {
    const existingQueue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
    const hasHumanDecisions = (existingQueue.entries ?? []).some(
      (entry) =>
        entry?.status === "human_reviewed" ||
        (typeof entry?.reviewerNotes === "string"
          ? entry.reviewerNotes.trim().length > 0
          : Boolean(entry?.reviewerNotes))
    );
    if (hasHumanDecisions && !force) {
      throw new Error(
        `Refusing to overwrite ${queuePath}: it contains human review decisions. Re-run with --force to override.`
      );
    }
  }
  const artifacts = buildReviewQueue(contentPath, { ...(words === undefined ? {} : { words }), ...(limit === undefined ? {} : { limit }) });
  fs.mkdirSync(path.dirname(queuePath), { recursive: true });
  fs.writeFileSync(queuePath, `${JSON.stringify(artifacts.queue, null, 2)}\n`);
  fs.writeFileSync(markdownPath, artifacts.markdown);
  fs.writeFileSync(coveragePath, `${JSON.stringify(artifacts.coverage, null, 2)}\n`);
  if (words === undefined) {
    fs.writeFileSync(excludedPath, `${JSON.stringify(artifacts.excluded, null, 2)}\n`);
  }
  return artifacts;
}

function parseWordsFile(wordsFile) {
  const source = fs.readFileSync(wordsFile, "utf8").trim();
  if (source.startsWith("[")) {
    let parsed;
    try {
      parsed = JSON.parse(source);
    } catch {
      throw new Error("--words-file must contain a JSON array or a newline-delimited word list");
    }
    if (!Array.isArray(parsed) || parsed.some((word) => typeof word !== "string")) {
      throw new Error("--words-file JSON content must be an array of strings");
    }
    return parsed;
  }
  return source.split(/\r?\n/u).map((word) => word.trim()).filter(Boolean);
}

function parseCliArguments(argv) {
  const options = { force: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--force") {
      options.force = true;
    } else if (argument === "--words-file" || argument === "--out-prefix") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`${argument} requires a value`);
      options[argument === "--words-file" ? "wordsFile" : "outPrefix"] = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  if (options.wordsFile && !options.outPrefix) {
    throw new Error("--out-prefix is required with --words-file");
  }
  if (!options.wordsFile && options.outPrefix) {
    throw new Error("--out-prefix is only supported with --words-file");
  }
  return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cli = parseCliArguments(process.argv.slice(2));
  const words = cli.wordsFile ? parseWordsFile(cli.wordsFile) : undefined;
  const prefix = cli.outPrefix
    ? path.resolve(MODULE_DIR, "data", cli.outPrefix)
    : null;
  if (prefix && path.resolve(`${prefix}.json`) === path.resolve(QUEUE_PATH)) {
    throw new Error("--out-prefix must not resolve to review-queue-top500");
  }
  const artifacts = writeReviewQueueArtifacts({
    force: cli.force,
    words,
    ...(prefix
      ? {
          queuePath: `${prefix}.json`,
          markdownPath: `${prefix}.md`,
          coveragePath: `${prefix}-coverage.json`,
        }
      : {}),
  });
  console.log(
    JSON.stringify(
      {
        queue: path.relative(REPO_ROOT, prefix ? `${prefix}.json` : QUEUE_PATH),
        markdown: path.relative(REPO_ROOT, prefix ? `${prefix}.md` : MARKDOWN_PATH),
        coverage: path.relative(REPO_ROOT, prefix ? `${prefix}-coverage.json` : COVERAGE_PATH),
        ...(words === undefined ? { excluded: path.relative(REPO_ROOT, EXCLUDED_PATH) } : {}),
        entryCount: artifacts.queue.entryCount,
        ...(words === undefined
          ? { top500CoveragePercent: artifacts.coverage.top500.coveragePercent }
          : { requestedWords: artifacts.coverage.requestedWords }),
        totalRunningWords: artifacts.coverage.totalRunningWords,
        totalDistinctWords: artifacts.coverage.totalDistinctWords,
        statusCounts: artifacts.coverage.statusCounts,
      },
      null,
      2
    )
  );
}
