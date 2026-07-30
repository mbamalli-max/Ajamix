#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { classifyApostrophes } from "./apostrophe-classifier.mjs";
import { CANONICAL_MAPPING } from "./mapping.mjs";
import { formatCodePoints, tokenize } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");
const CONTENT_PATH = path.join(REPO_ROOT, "app", "content.json");
const DEFAULT_OUTPUT = path.join(MODULE_DIR, "data", "candidate-corpus.json");

const HAUSA_FIELD_NAMES = new Set([
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
const APOSTROPHES = new Set([0x0027, 0x2019, 0x02bc]);
const WORD_PATTERN = /[\p{L}\p{M}\u0027\u2019\u02BC]+|\p{N}+/gu;

const COMMON_FUNCTION_WORDS = new Set([
  "a", "ake", "amma", "ce", "da", "don", "ga", "idan", "ita", "ka", "kada",
  "kamar", "kana", "ko", "mai", "na", "ne", "sai", "shi", "ta", "to", "wannan",
  "wanda", "wata", "ya", "yana", "za", "zuwa",
]);
const COMMON_VERBS = new Set([
  "duba", "fara", "gane", "gwada", "haɗa", "kalli", "kirga", "koyi", "nuna",
  "rubuta", "saurara", "tambaya", "yi", "zana",
]);
const COMMON_NOUNS = new Set([
  "abu", "abubuwa", "aiki", "darasi", "gida", "hannu", "lamba", "lokaci",
  "mutum", "rana", "ruwa", "yaro", "yara",
]);
const CURRICULUM_TERMS = new Set([
  "alwatika", "darasi", "jimla", "lissafi", "ma'ana", "murabba'i", "ƙari",
  "siffa", "tsari", "zobe",
]);
const ARABIC_ISLAMIC_WORDS = new Set([
  "allah", "al'umma", "ibada", "islam", "musulunci", "sallah", "zakka",
]);
const KNOWN_PROPER_NOUNS = new Set([
  "amina", "bello", "fatima", "hausa", "kano", "musa", "najeriya", "zainab",
]);
const ENGLISH_LOAN_CANDIDATES = new Set([
  "app", "business", "customer", "database", "digital", "email", "engine",
  "internet", "management", "marketing", "online", "software", "website",
]);
const ACRONYM_STOP_WORDS = new Set(["INTRO", "MAIN", "OUTRO", "PAUSE"]);
const AUDIT_SPECIAL_TOKENS = new Set([
  "B_GLOTTALIZED",
  "D_GLOTTALIZED",
  "K_GLOTTALIZED",
  "HAUSA_GLOTTALIZED_Y",
  "TS_HAUSA",
  "SH_HAUSA",
  "K_VELAR_CLUSTER",
  "G_VELAR_CLUSTER",
  "K_GLOTTALIZED_VELAR_CLUSTER",
]);

export const REQUIRED_CANDIDATE_COVERAGE = Object.freeze([
  "common_function_word",
  "common_verb",
  "common_noun",
  "curriculum_terminology",
  ..."ɓ ɗ ƙ ƴ c ts sh f n k y".split(" ").map((item) => `fixed_special_consonant:${item}`),
  "apostrophe_y",
  "genuine_glottal_stop_candidate",
  "morpheme_boundary_candidate",
  "quotation_heavy_audioScript",
  "short_long_vowel_ambiguity",
  "diphthong_ai",
  "diphthong_au",
  "word_initial_vowel",
  "word_final_vowel",
  "native_hausa_h",
  "arabic_islamic_lexical_h",
  "proper_noun",
  "acronym",
  "numeral",
  "mixed_hausa_arabic",
  "mixed_hausa_english",
]);

const consonantGlyphs = new Map(
  [...CANONICAL_MAPPING.canonicalConsonants, ...CANONICAL_MAPPING.provisionalVelarClusters]
    .map((entry) => [entry.token, entry.glyph])
);
const vowelGlyphs = new Map([
  ["VOWEL_A_UNLENGTHENED", "\u064E"],
  ["VOWEL_I_UNLENGTHENED", "\u0650"],
  ["VOWEL_U_UNLENGTHENED", "\u064F"],
  ["VOWEL_E_UNLENGTHENED", "\u065C"],
  ["VOWEL_O_UNLENGTHENED", "\u064F"],
]);

function normalizeApostrophes(value) {
  return Array.from(value, (character) =>
    APOSTROPHES.has(character.codePointAt(0)) ? "'" : character
  ).join("");
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

function auditNormalizedWords(value) {
  return (
    value
      .normalize("NFC")
      .toLocaleLowerCase("ha")
      .match(/[\p{L}\p{M}\u0027\u2019\u02BC]+/gu) ?? []
  ).map(normalizeApostrophes);
}

function normalizeWord(raw) {
  let value = normalizeApostrophes(raw.normalize("NFC")).toLocaleLowerCase("ha");
  if (value.startsWith("'") && value.endsWith("'") && value.length > 2) {
    value = value.slice(1, -1);
  } else {
    if (value.endsWith("'")) {
      value = value.slice(0, -1);
    }
    if (value.startsWith("'") && !/^'[yY]/u.test(value)) {
      value = value.slice(1);
    }
  }
  return value;
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

function collectFields(content) {
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
      if (typeof child === "string" && HAUSA_FIELD_NAMES.has(key)) {
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
  while (sentenceStart > 0) {
    const previous = text[sentenceStart - 1];
    if (/[.!?\n]/u.test(previous)) {
      break;
    }
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

function isAcronym(raw) {
  return (
    /^[A-Z][A-Z0-9]{1,}$/u.test(raw) &&
    !ACRONYM_STOP_WORDS.has(raw)
  );
}

function hasArabicIslamicContext(sentence) {
  const words = sentence.toLocaleLowerCase("ha").match(/\p{L}+/gu) ?? [];
  return words.some((word) => ARABIC_ISLAMIC_WORDS.has(word));
}

function hasEnglishContext(sentence) {
  const words = sentence.match(/\p{L}+/gu) ?? [];
  return words.some(
    (word) => isAcronym(word) || ENGLISH_LOAN_CANDIDATES.has(word.toLocaleLowerCase("en"))
  );
}

function occurrenceTags(word, raw, field, sentence) {
  const tags = new Set();
  const lowerSentence = sentence.toLocaleLowerCase("ha");

  if (COMMON_FUNCTION_WORDS.has(word)) tags.add("common_function_word");
  if (COMMON_VERBS.has(word)) tags.add("common_verb");
  if (COMMON_NOUNS.has(word)) tags.add("common_noun");
  if (CURRICULUM_TERMS.has(word)) tags.add("curriculum_terminology");

  for (const consonant of ["ɓ", "ɗ", "ƙ", "ƴ", "c", "ts", "sh", "f", "n", "k", "y"]) {
    if (word.includes(consonant.toLocaleLowerCase("ha"))) {
      tags.add(`fixed_special_consonant:${consonant}`);
    }
  }
  if (word.includes("'y") || word.includes("ƴ".toLocaleLowerCase("ha"))) {
    tags.add("apostrophe_y");
  }
  if (
    /[aeiou]'[aeiou]/u.test(word) ||
    ["murabba'i", "jami'a", "sa'a", "ma'ana"].includes(word)
  ) {
    tags.add("genuine_glottal_stop_candidate");
  }
  if (["ɗan'uwa", "ƴar'uwa"].includes(word)) {
    tags.add("morpheme_boundary_candidate");
  }
  if (
    field.fieldType === "audioScript" &&
    (sentence.match(/['’ʼ]/gu)?.length ?? 0) >= 4
  ) {
    tags.add("quotation_heavy_audioScript");
  }
  if (/[aeiou]/u.test(word)) tags.add("short_long_vowel_ambiguity");
  if (word.includes("ai")) tags.add("diphthong_ai");
  if (word.includes("au")) tags.add("diphthong_au");
  if (/^[aeiou]/u.test(word)) tags.add("word_initial_vowel");
  if (/[aeiou]$/u.test(word)) tags.add("word_final_vowel");
  if (word.includes("h") && !ARABIC_ISLAMIC_WORDS.has(word)) tags.add("native_hausa_h");
  if (word.includes("h") && ARABIC_ISLAMIC_WORDS.has(word)) {
    tags.add("arabic_islamic_lexical_h");
  }
  if (KNOWN_PROPER_NOUNS.has(word)) tags.add("proper_noun");
  if (isAcronym(raw)) tags.add("acronym");
  if (/^\p{N}+$/u.test(word)) tags.add("numeral");
  if (hasArabicIslamicContext(lowerSentence)) tags.add("mixed_hausa_arabic");
  if (hasEnglishContext(sentence)) tags.add("mixed_hausa_english");

  return tags;
}

function entryCategory(tags) {
  if (tags.has("acronym")) return "acronym";
  if (tags.has("numeral")) return "numeral";
  if (tags.has("mixed_hausa_english")) return "mixed_hausa_english";
  if (tags.has("mixed_hausa_arabic")) return "mixed_hausa_arabic";
  if (tags.has("proper_noun")) return "proper_noun";
  if (tags.has("arabic_islamic_lexical_h")) return "arabic_lexical";
  return "native_hausa";
}

function provisionalFallback(word, tags) {
  const tokenized = tokenize(word);
  const unresolved = new Set();
  let output = "";
  let complete = true;

  if (/^\p{N}+$/u.test(word)) {
    return {
      text: "",
      codepoints: [],
      complete: false,
      used: false,
      unresolvedDecisions: ["numeral_policy"],
    };
  }
  if (/^[aeiou]/u.test(word)) {
    unresolved.add("word_initial_vowel_carrier");
    complete = false;
  }
  if (/[aeiou]$/u.test(word)) unresolved.add("word_final_vowel_form");
  if (/[aeiou]/u.test(word)) unresolved.add("vowel_length");
  if (tags.has("genuine_glottal_stop_candidate")) unresolved.add("glottal_stop_spelling");
  if (tags.has("morpheme_boundary_candidate")) unresolved.add("morpheme_boundary_spelling");
  if (tags.has("acronym") || tags.has("mixed_hausa_english")) {
    unresolved.add("loanword_or_acronym_exception");
  }
  if (tags.has("mixed_hausa_arabic")) unresolved.add("mixed_language_routing");
  if (tags.has("arabic_islamic_lexical_h")) unresolved.add("established_arabic_spelling");

  for (const token of tokenized.tokens) {
    if (token.token === "H_CONTEXT_REQUIRED") {
      if (tags.has("arabic_islamic_lexical_h")) {
        output += consonantGlyphs.get("H_ARABIC_LEXICAL");
      } else {
        output += consonantGlyphs.get("H_NATIVE_HAUSA");
        unresolved.add("h_lexical_classification");
      }
    } else if (consonantGlyphs.has(token.token)) {
      output += consonantGlyphs.get(token.token);
      if (token.provisional) unresolved.add("velar_cluster_spelling");
    } else if (vowelGlyphs.has(token.token)) {
      if (output.length && !/^[aeiou]/u.test(word)) {
        output += vowelGlyphs.get(token.token);
      } else {
        complete = false;
      }
    } else if (token.type === "APOSTROPHE") {
      unresolved.add("apostrophe_classification");
      complete = false;
    } else if (token.type === "UNKNOWN") {
      unresolved.add("unknown_token");
      complete = false;
    }
  }

  if (/(\p{L})\1/iu.test(word)) {
    unresolved.add("gemination_or_repeated_consonant");
    complete = false;
  }

  return {
    text: output,
    codepoints: formatCodePoints(output),
    complete,
    used: output.length > 0,
    unresolvedDecisions: Array.from(unresolved).sort(),
  };
}

function indexCorpus(fields) {
  const words = new Map();
  for (const field of fields) {
    for (const match of field.value.matchAll(WORD_PATTERN)) {
      const raw = match[0];
      const normalized = normalizeWord(raw);
      if (!normalized) continue;
      const sentence = sentenceAt(field.value, match.index, match.index + raw.length);
      const tags = occurrenceTags(normalized, raw, field, sentence);
      let record = words.get(normalized);
      if (!record) {
        record = {
          normalizedBoko: normalized,
          displayForms: new Map(),
          tags: new Set(),
          tagOccurrenceCounts: new Map(),
          occurrenceCount: 0,
          occurrences: [],
        };
        words.set(normalized, record);
      }
      record.displayForms.set(raw, (record.displayForms.get(raw) ?? 0) + 1);
      record.occurrenceCount += 1;
      tags.forEach((tag) => {
        record.tags.add(tag);
        record.tagOccurrenceCounts.set(
          tag,
          (record.tagOccurrenceCounts.get(tag) ?? 0) + 1
        );
      });
      const occurrence = {
        sourceFile: "app/content.json",
        fieldPath: field.fieldPath,
        fieldType: field.fieldType,
        moduleId: field.moduleId,
        sourceWord: raw,
        completeSurroundingSentence: sentence,
        coverageLabels: Array.from(tags).sort(),
      };
      const introducesNewContextTag = occurrence.coverageLabels.some((tag) =>
        !record.occurrences.some((existing) => existing.coverageLabels.includes(tag))
      );
      if (record.occurrences.length < 12 || introducesNewContextTag) {
        record.occurrences.push(occurrence);
      }
    }
  }
  return words;
}

function bestRecordForTag(records, tag) {
  const preferred = {
    common_function_word: ["da", "ka", "yana"],
    common_verb: ["yi", "koyi", "rubuta"],
    common_noun: ["abu", "darasi", "lamba"],
    curriculum_terminology: ["lissafi", "murabba'i", "tsari"],
    apostrophe_y: ["'ya'ya", "'yan", "ƴa"],
    genuine_glottal_stop_candidate: ["murabba'i", "ma'ana", "sa'a", "jami'a"],
    morpheme_boundary_candidate: ["ɗan'uwa", "ƴar'uwa"],
    quotation_heavy_audioScript: ["ɗaya", "biyu"],
    short_long_vowel_ambiguity: ["kuma"],
    diphthong_ai: ["sai", "mai"],
    diphthong_au: ["yau", "sau"],
    word_initial_vowel: ["abu", "aiki"],
    word_final_vowel: ["kuma", "ɗaya"],
    native_hausa_h: ["haka", "huɗu"],
    arabic_islamic_lexical_h: ["allah"],
    proper_noun: ["amina", "musa", "najeriya"],
    acronym: ["VAT", "ICT", "POS"],
    numeral: ["1", "2"],
    mixed_hausa_arabic: ["allah", "musulunci"],
    mixed_hausa_english: ["vat", "ict", "pos"],
  }[tag]?.map((item) => normalizeWord(item)) ?? [];

  const matching = records.filter((record) => record.tags.has(tag));
  matching.sort((left, right) => {
    const leftPreferred = preferred.indexOf(left.normalizedBoko);
    const rightPreferred = preferred.indexOf(right.normalizedBoko);
    const leftRank = leftPreferred < 0 ? 999 : leftPreferred;
    const rightRank = rightPreferred < 0 ? 999 : rightPreferred;
    return leftRank - rightRank ||
      right.occurrenceCount - left.occurrenceCount ||
      left.normalizedBoko.localeCompare(right.normalizedBoko, "ha");
  });
  return matching[0] ?? null;
}

function representativeOccurrences(record, limit = 12) {
  const seen = new Set();
  const selected = [];
  const prioritized = [...record.occurrences].sort(
    (left, right) => right.coverageLabels.length - left.coverageLabels.length
  );
  for (const occurrence of prioritized) {
    const key = `${occurrence.fieldPath}|${occurrence.completeSurroundingSentence}`;
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(occurrence);
    if (selected.length === limit) break;
  }
  return selected;
}

function displayBoko(record) {
  return Array.from(record.displayForms.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "ha"))[0][0];
}

function lightweightCorpusStatistics(fields) {
  const uniqueWords = new Set();
  const unknownSources = {};
  const specialConsonantOccurrences = {};
  const apostropheCategories = {};
  let knownTokenCount = 0;
  let unknownTokenCount = 0;
  let apostropheTotal = 0;
  let apostropheYSettled = 0;

  for (const field of fields) {
    auditNormalizedWords(field.value).forEach((word) => uniqueWords.add(word));
    for (const token of tokenize(field.value).tokens) {
      if (token.type === "PHONEME" || token.type === "VOWEL") {
        knownTokenCount += 1;
      } else if (token.type === "UNKNOWN") {
        unknownTokenCount += 1;
        increment(unknownSources, `${token.normalized}|${token.codePoints.join(" ")}`);
      }
      if (AUDIT_SPECIAL_TOKENS.has(token.token)) {
        increment(specialConsonantOccurrences, token.token);
      }
    }
    for (const occurrence of classifyApostrophes(field.value).occurrences) {
      apostropheTotal += 1;
      increment(apostropheCategories, occurrence.category);
      if (occurrence.autoResolved) apostropheYSettled += 1;
    }
  }
  const denominator = knownTokenCount + unknownTokenCount;
  return {
    totalHausaFieldsScanned: fields.length,
    totalUniqueNormalizedWords: uniqueWords.size,
    knownTokenCount,
    unknownTokenCount,
    tokenizationCoveragePercent: denominator
      ? Number(((knownTokenCount / denominator) * 100).toFixed(4))
      : 100,
    unknownSources: sortCounts(unknownSources),
    specialConsonantOccurrences: sortCounts(specialConsonantOccurrences),
    apostropheCarryOver: {
      total: apostropheTotal,
      apostropheYSettled,
      unresolvedQueued: apostropheTotal - apostropheYSettled,
      byCategory: sortCounts(apostropheCategories),
    },
  };
}

export function extractCandidateCorpus(contentPath = CONTENT_PATH) {
  const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
  const fields = collectFields(content);
  const wordIndex = indexCorpus(fields);
  const records = Array.from(wordIndex.values());
  const liveStatistics = lightweightCorpusStatistics(fields);
  const selected = new Map();

  for (const label of REQUIRED_CANDIDATE_COVERAGE) {
    const record = bestRecordForTag(records, label);
    if (record) selected.set(record.normalizedBoko, record);
  }

  const candidates = Array.from(selected.values())
    .sort((left, right) => left.normalizedBoko.localeCompare(right.normalizedBoko, "ha"))
    .map((record, index) => {
      const tags = record.tags;
      const boko = displayBoko(record);
      const tokenized = tokenize(boko);
      const provisionalAjami = provisionalFallback(record.normalizedBoko, tags);
      return {
        candidateId: `candidate-${String(index + 1).padStart(3, "0")}`,
        boko,
        normalizedBoko: record.normalizedBoko,
        proposedTokenization: tokenized.tokens.map((token) => ({
          sourceSubstring: token.sourceSubstring,
          token: token.token,
          type: token.type,
          provisional: Boolean(token.provisional),
          reviewRequired: Boolean(token.reviewRequired),
        })),
        provisionalAjami,
        unresolvedDecisions: provisionalAjami.unresolvedDecisions,
        confidence: "unreviewed",
        reviewStatus: "candidate",
        category: entryCategory(tags),
        coverageLabels: Array.from(tags).sort(),
        occurrenceCount: record.occurrenceCount,
        occurrences: representativeOccurrences(record),
        contextReferencesTruncated: record.occurrenceCount > 12,
      };
    });

  const covered = new Set(candidates.flatMap((candidate) => candidate.coverageLabels));
  const unknownTokens = Object.entries(liveStatistics.unknownSources).map(
    ([key, count]) => {
      const separator = key.indexOf("|");
      return {
        token: key.slice(0, separator),
        codepoints: key.slice(separator + 1).split(" "),
        count,
      };
    }
  );
  const languageCounts = {
    arabicOrIslamicUniqueWords: records.filter((record) =>
      record.tags.has("mixed_hausa_arabic") ||
      record.tags.has("arabic_islamic_lexical_h")
    ).length,
    arabicOrIslamicOccurrences: records.reduce(
      (sum, record) =>
        sum +
        Math.max(
          record.tagOccurrenceCounts.get("mixed_hausa_arabic") ?? 0,
          record.tagOccurrenceCounts.get("arabic_islamic_lexical_h") ?? 0
        ),
      0
    ),
    mixedHausaEnglishUniqueWords: records.filter((record) =>
      record.tags.has("mixed_hausa_english")
    ).length,
    mixedHausaEnglishOccurrences: records.reduce(
      (sum, record) =>
        sum + (record.tagOccurrenceCounts.get("mixed_hausa_english") ?? 0),
      0
    ),
    acronymUniqueWords: records.filter((record) => record.tags.has("acronym")).length,
    acronymOccurrences: records.reduce(
      (sum, record) => sum + (record.tagOccurrenceCounts.get("acronym") ?? 0),
      0
    ),
  };
  const provisionalFallbackCount = records.filter((record) =>
    provisionalFallback(record.normalizedBoko, record.tags).used
  ).length;
  const fullSpecialConsonantOccurrences = Object.fromEntries(
    ["ɓ", "ɗ", "ƙ", "ƴ", "c", "ts", "sh", "f", "n", "k", "y"].map((label) => [label, 0])
  );
  const tokenToSpecial = new Map([
    ["B_GLOTTALIZED", "ɓ"],
    ["D_GLOTTALIZED", "ɗ"],
    ["K_GLOTTALIZED", "ƙ"],
    ["HAUSA_GLOTTALIZED_Y", "ƴ"],
    ["C_HAUSA", "c"],
    ["TS_HAUSA", "ts"],
    ["SH_HAUSA", "sh"],
    ["F_HAUSA", "f"],
    ["N_HAUSA", "n"],
    ["K_PLAIN", "k"],
    ["Y_PLAIN", "y"],
  ]);
  for (const field of fields) {
    for (const token of tokenize(field.value).tokens) {
      const label = tokenToSpecial.get(token.token);
      if (label) fullSpecialConsonantOccurrences[label] += 1;
    }
  }

  return {
    schemaVersion: 1,
    taskId: "2026-07-28-slice-36",
    materialType: "candidate_corpus_not_gold",
    goldStandard: false,
    notice:
      "Candidate development material only. Proposed tokenization and provisional Ajami are machine-derived review aids, never approved spellings, and may be incomplete where the standard requires lexical or human decisions.",
    source: path.relative(REPO_ROOT, contentPath),
    extractionMethod: {
      fieldSelection:
        "The same ten Hausa-bearing field names used by the verified slice-35 audit are recursively scanned.",
      normalization: "NFC plus Hausa locale lowercase; supported apostrophes normalize to ASCII for deduplication.",
      deduplication:
        "Identical normalized words have one candidate record and retain occurrenceCount plus up to 12 distinct complete-sentence context references.",
      provisionalAjami:
        "Canonical-mapping.json supplies consonants and approved short-mark inventory supplies a clearly labeled fallback. No word becomes approved; unresolved carrier, vowel-length, h, apostrophe, cluster, numeral, and language-routing decisions remain explicit.",
    },
    corpusStatistics: {
      totalHausaFieldsScanned: liveStatistics.totalHausaFieldsScanned,
      totalUniqueNormalizedWords: liveStatistics.totalUniqueNormalizedWords,
      tokenizationCoveragePercent: liveStatistics.tokenizationCoveragePercent,
      knownTokenCount: liveStatistics.knownTokenCount,
      unknownTokenCount: liveStatistics.unknownTokenCount,
      unknownTokens,
      specialConsonantOccurrences: liveStatistics.specialConsonantOccurrences,
      fullFixedConsonantOccurrences: fullSpecialConsonantOccurrences,
      apostropheCarryOver: liveStatistics.apostropheCarryOver,
      languageCandidateCounts: languageCounts,
      provisionalFallbackCount,
      selectedCandidateFallbackCount: candidates.filter(
        (candidate) => candidate.provisionalAjami.used
      ).length,
    },
    coverage: {
      requiredLabels: REQUIRED_CANDIDATE_COVERAGE,
      coveredLabels: REQUIRED_CANDIDATE_COVERAGE.filter((label) => covered.has(label)),
      missingLabels: REQUIRED_CANDIDATE_COVERAGE.filter((label) => !covered.has(label)),
    },
    candidateCount: candidates.length,
    candidates,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputFlag = process.argv.indexOf("--write");
  const outputPath = outputFlag >= 0 && process.argv[outputFlag + 1]
    ? path.resolve(process.cwd(), process.argv[outputFlag + 1])
    : DEFAULT_OUTPUT;
  const report = extractCandidateCorpus();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    output: path.relative(REPO_ROOT, outputPath),
    candidateCount: report.candidateCount,
    coverage: report.coverage,
    corpusStatistics: report.corpusStatistics,
  }, null, 2));
}
