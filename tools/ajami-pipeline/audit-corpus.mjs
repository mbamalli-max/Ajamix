#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { classifyApostrophes } from "./apostrophe-classifier.mjs";
import { tokenize } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");
const CONTENT_PATH = path.join(REPO_ROOT, "app", "content.json");
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
const APOSTROPHE_CODE_POINTS = new Set([0x0027, 0x2019, 0x02bc]);
const SPECIAL_TOKENS = new Set([
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

function pathString(parts) {
  return parts.join(".");
}

function getModuleContext(content, parts) {
  if (parts[0] === "modules" && Number.isInteger(parts[1])) {
    const module = content.modules[parts[1]];
    return {
      module,
      moduleId: module?.id ?? `modules.${parts[1]}`,
    };
  }
  if (parts[0] === "activities" && Number.isInteger(parts[1])) {
    const activity = content.activities[parts[1]];
    return {
      module: null,
      moduleId: `activity:${activity?.activityId ?? parts[1]}`,
    };
  }
  if (parts[0] === "glossary" && Number.isInteger(parts[1])) {
    const item = content.glossary[parts[1]];
    return {
      module: null,
      moduleId: `glossary:${item?.id ?? parts[1]}`,
    };
  }
  return { module: null, moduleId: "_corpus" };
}

function collectHausaFields(content) {
  const fields = [];

  function walk(value, parts = [], parent = null) {
    if (Array.isArray(value)) {
      value.forEach((child, index) => walk(child, [...parts, index], value));
      return;
    }
    if (!value || typeof value !== "object") {
      return;
    }

    for (const [key, child] of Object.entries(value)) {
      const nextParts = [...parts, key];
      if (typeof child === "string" && HAUSA_FIELD_NAMES.has(key)) {
        const context = getModuleContext(content, nextParts);
        fields.push({
          fieldId: `field-${fields.length + 1}`,
          fieldType: key,
          path: pathString(nextParts),
          pathParts: nextParts,
          value: child,
          parent: value,
          ...context,
        });
      }
      walk(child, nextParts, value);
    }
  }

  walk(content);
  return fields;
}

function currentConverterReachability(field) {
  const { fieldType, module, parent, path: fieldPath } = field;
  const isVocational = module?.track === "vocational";

  if (fieldType === "audioScript") {
    return {
      reachesCurrentConverter: false,
      reachesWithForcedLatinMode: false,
      reachesInAjamiSession: false,
      callPath: "NO_CALL_PATH",
      reason: "audioScript is consumed as audio metadata/source and is not passed to romanToAjami()",
    };
  }

  if (fieldType === "textExplanationHa") {
    const hasFormalSegments = Array.isArray(module?.segments) && module.segments.length > 0;
    const hasVocationalLessons = Array.isArray(module?.lessons) && module.lessons.length > 0;
    const fallbackCouldRun = !hasFormalSegments && !hasVocationalLessons && !module?.textExplanationAjami;
    return {
      reachesCurrentConverter: fallbackCouldRun,
      reachesWithForcedLatinMode: false,
      reachesInAjamiSession: fallbackCouldRun,
      callPath: fallbackCouldRun ? "AJAMI_BRANCH" : "NO_CALL_PATH",
      reason: hasFormalSegments
        ? "Formal lesson rendering uses segments[].text.ha instead of top-level textExplanationHa"
        : hasVocationalLessons
          ? "Vocational lesson rendering uses structured lessons[] instead of top-level textExplanationHa"
          : module?.textExplanationAjami
            ? "Stored textExplanationAjami wins before the fallback converter"
            : "getLessonBodyText() falls back to romanToAjami(textExplanationHa)",
    };
  }

  if (fieldType === "subjectHa") {
    return {
      reachesCurrentConverter: Boolean(isVocational),
      reachesWithForcedLatinMode: false,
      reachesInAjamiSession: Boolean(isVocational),
      callPath: isVocational ? "AJAMI_BRANCH" : "NO_CALL_PATH",
      reason: isVocational
        ? "renderVocationalLesson() calls getDisplaySubject(), which converts subjectHa in Ajami mode"
        : "getDisplaySubject() is only called by the vocational lesson renderer",
    };
  }

  if (fieldType === "ha") {
    const isSegmentText = /\.segments\.\d+\.text\.ha$/.test(fieldPath);
    const isModuleSummary = /\.summary\.ha$/.test(fieldPath);
    const hasStoredAjami = Boolean(String(parent?.ajami ?? "").trim());

    if (isSegmentText) {
      return {
        reachesCurrentConverter: !hasStoredAjami,
        reachesWithForcedLatinMode: false,
        reachesInAjamiSession: !hasStoredAjami,
        callPath: hasStoredAjami ? "STORED_AJAMI_BYPASS" : "AJAMI_BRANCH",
        reason: hasStoredAjami
          ? "getFormalSegmentText() selects stored text.ajami"
          : "getFormalSegmentText() falls back to romanToAjami(text.ha) in Ajami mode",
      };
    }

    if (isModuleSummary) {
      return {
        reachesCurrentConverter: true,
        reachesWithForcedLatinMode: false,
        reachesInAjamiSession: true,
        callPath: "AJAMI_BRANCH",
        reason: "Vocational home cards pass module.summary.ha through ha() in Ajami mode",
      };
    }

    return {
      reachesCurrentConverter: !hasStoredAjami,
      reachesWithForcedLatinMode: !hasStoredAjami,
      reachesInAjamiSession: !hasStoredAjami,
      callPath: hasStoredAjami ? "STORED_AJAMI_BYPASS" : "EAGER_LOCALIZED_PAIR",
      reason: hasStoredAjami
        ? "getLocalizedPair() selects the sibling stored ajami value"
        : "getLocalizedPair() eagerly computes romanToAjami(ha), even while Latin mode is active",
    };
  }

  const ajamiBranchFields = new Set([
    "titleHa",
    "questionHa",
    "templateHa",
    "topicHa",
    "termHa",
    "definitionHa",
  ]);
  if (ajamiBranchFields.has(fieldType)) {
    return {
      reachesCurrentConverter: true,
      reachesWithForcedLatinMode: false,
      reachesInAjamiSession: true,
      callPath: "AJAMI_BRANCH",
      reason: `${fieldType} is passed through an Ajami-mode display helper (ha(), getDisplayTitle(), or getDisplayQuestion())`,
    };
  }

  return {
    reachesCurrentConverter: false,
    reachesWithForcedLatinMode: false,
    reachesInAjamiSession: false,
    callPath: "NO_CALL_PATH",
    reason: "No traced romanToAjami() call path",
  };
}

function normalizedWords(value) {
  return (
    value
      .normalize("NFC")
      .toLocaleLowerCase("ha")
      .match(/[\p{L}\p{M}\u0027\u2019\u02BC]+/gu) ?? []
  ).map((word) =>
    Array.from(word, (character) =>
      APOSTROPHE_CODE_POINTS.has(character.codePointAt(0)) ? "\u0027" : character
    ).join("")
  );
}

function surroundingKey(occurrence) {
  const previous = occurrence.previousCodePoints[0] ?? "START";
  const next = occurrence.nextCodePoints[0] ?? "END";
  return `${previous}|${next}`;
}

function confidenceKey(occurrence) {
  return `${occurrence.confidenceLabel}:${occurrence.confidence.toFixed(2)}`;
}

export function auditCorpus(contentPath = CONTENT_PATH) {
  const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
  const fields = collectHausaFields(content);
  const occurrences = [];
  const reviewQueue = [];
  const uniqueWords = new Set();
  const fieldCounts = {};
  const tokenTypeCounts = {};
  const unknownSourceCounts = {};
  const specialConsonantCounts = {};
  let knownTokenCount = 0;
  let unknownTokenCount = 0;

  for (const field of fields) {
    increment(fieldCounts, field.fieldType);
    normalizedWords(field.value).forEach((word) => uniqueWords.add(word));

    const tokenized = tokenize(field.value);
    for (const token of tokenized.tokens) {
      increment(tokenTypeCounts, token.type);
      if (token.type === "PHONEME" || token.type === "VOWEL") {
        knownTokenCount += 1;
      } else if (token.type === "UNKNOWN") {
        unknownTokenCount += 1;
        increment(unknownSourceCounts, `${token.normalized}|${token.codePoints.join(" ")}`);
      }
      if (SPECIAL_TOKENS.has(token.token)) {
        increment(specialConsonantCounts, token.token);
      }
    }

    const classified = classifyApostrophes(field.value);
    const reachability = currentConverterReachability(field);
    for (const classifiedOccurrence of classified.occurrences) {
      const occurrenceId = `apostrophe-${occurrences.length + 1}`;
      const occurrence = {
        occurrenceId,
        fieldId: field.fieldId,
        path: field.path,
        fieldType: field.fieldType,
        module: field.moduleId,
        ...classifiedOccurrence,
        ...reachability,
        currentEngineWouldAlter: reachability.reachesCurrentConverter,
        currentEngineReplacementCodePoint: reachability.reachesCurrentConverter
          ? "U+0639"
          : null,
        currentEngineEffect: reachability.reachesCurrentConverter
          ? "The legacy engine unconditionally replaces this apostrophe with U+0639 when this call path executes"
          : "This stored field occurrence is not passed to the legacy converter on the traced path",
      };
      occurrences.push(occurrence);
      if (occurrence.reviewRequired) {
        reviewQueue.push(occurrenceId);
      }
    }
  }

  const byCodePoint = {};
  const byFieldType = {};
  const byModule = {};
  const bySurroundingCharacters = {};
  const byCategory = {};
  const byConfidence = {};
  const byConverterReachability = {};
  const byCurrentEngineWouldAlter = {};
  const byForcedLatinModeReachability = {};
  const byAjamiSessionReachability = {};
  const byPairedPunctuationDetectable = {};
  const representativeExamples = {};

  for (const occurrence of occurrences) {
    increment(byCodePoint, occurrence.apostropheCodePoint);
    increment(byFieldType, occurrence.fieldType);
    increment(byModule, occurrence.module);
    increment(bySurroundingCharacters, surroundingKey(occurrence));
    increment(byCategory, occurrence.category);
    increment(byConfidence, confidenceKey(occurrence));
    increment(byConverterReachability, occurrence.callPath);
    increment(byCurrentEngineWouldAlter, String(occurrence.currentEngineWouldAlter));
    increment(byForcedLatinModeReachability, String(occurrence.reachesWithForcedLatinMode));
    increment(byAjamiSessionReachability, String(occurrence.reachesInAjamiSession));
    increment(byPairedPunctuationDetectable, String(occurrence.pairedPunctuationDetectable));

    representativeExamples[occurrence.category] ??= [];
    if (
      representativeExamples[occurrence.category].length < 8 &&
      !representativeExamples[occurrence.category].some(
        (example) => example.normalizedWord === occurrence.normalizedWord
      )
    ) {
      representativeExamples[occurrence.category].push({
        occurrenceId: occurrence.occurrenceId,
        module: occurrence.module,
        fieldType: occurrence.fieldType,
        path: occurrence.path,
        word: occurrence.word,
        normalizedWord: occurrence.normalizedWord,
        context: occurrence.context,
        confidence: occurrence.confidence,
        reviewRequired: occurrence.reviewRequired,
      });
    }
  }

  const apostropheYCount = byCategory.GLOTTALIZED_Y ?? 0;
  const nonYCount = occurrences.length - apostropheYCount;
  const tokenizationDenominator = knownTokenCount + unknownTokenCount;

  return {
    auditVersion: 1,
    taskId: "2026-07-28-slice-35",
    source: path.relative(REPO_ROOT, contentPath),
    method: {
      normalization: "NFC",
      apostropheCodePoints: ["U+0027", "U+2019", "U+02BC"],
      hausaFieldNames: Array.from(HAUSA_FIELD_NAMES),
      fieldSelection:
        "Recursive scan of string values whose key is one of the ten listed Hausa-bearing field names; array indices and object paths are retained.",
      classification:
        "Boundary-aware stack pairing is applied before conservative intra-word inference. Only apostrophe+y auto-resolves; all other occurrences are queued.",
      callPath:
        "Static trace of app/app.js display helpers and renderers. Reachability distinguishes the forced-Latin fresh-load state, Ajami-session branches, eager localized-pair calls, stored-Ajami bypasses, and fields with no converter call path.",
      tokenizationCoverage:
        "Known PHONEME and VOWEL tokens divided by known plus UNKNOWN tokens; whitespace, punctuation, numbers, symbols, and placeholders are outside the denominator.",
    },
    corpus: {
      totalHausaFieldsScanned: fields.length,
      fieldsByType: sortCounts(fieldCounts),
      totalUniqueNormalizedWords: uniqueWords.size,
      tokenization: {
        knownTokenCount,
        unknownTokenCount,
        coveragePercent: tokenizationDenominator
          ? Number(((knownTokenCount / tokenizationDenominator) * 100).toFixed(4))
          : 100,
        tokenTypes: sortCounts(tokenTypeCounts),
        unknownSources: sortCounts(unknownSourceCounts),
      },
      specialConsonantOccurrences: sortCounts(specialConsonantCounts),
    },
    preliminaryCountVerification: {
      expectedTotal: 3082,
      actualTotal: occurrences.length,
      totalMatches: occurrences.length === 3082,
      expectedApostropheY: 254,
      actualApostropheY: apostropheYCount,
      apostropheYMatches: apostropheYCount === 254,
      expectedOther: 2828,
      actualOther: nonYCount,
      otherMatches: nonYCount === 2828,
    },
    summary: {
      totalOccurrences: occurrences.length,
      autoResolvedCount: occurrences.length - reviewQueue.length,
      reviewQueueCount: reviewQueue.length,
      allUnresolvedQueued: reviewQueue.length === nonYCount,
      byApostropheCodePoint: sortCounts(byCodePoint),
      byFieldType: sortCounts(byFieldType),
      byModule: sortCounts(byModule),
      bySurroundingCharacters: sortCounts(bySurroundingCharacters),
      byInferredCategory: sortCounts(byCategory),
      byConfidence: sortCounts(byConfidence),
      byConverterReachability: sortCounts(byConverterReachability),
      byCurrentEngineWouldAlter: sortCounts(byCurrentEngineWouldAlter),
      byForcedLatinModeReachability: sortCounts(byForcedLatinModeReachability),
      byAjamiSessionReachability: sortCounts(byAjamiSessionReachability),
      byPairedPunctuationDetectable: sortCounts(byPairedPunctuationDetectable),
      representativeExamples,
    },
    reviewQueue,
    occurrences,
  };
}

function parseArgs(argv) {
  const args = { output: null, compact: false };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--write") {
      args.output = argv[index + 1];
      index += 1;
    } else if (argv[index] === "--compact") {
      args.compact = true;
    } else {
      throw new Error(`Unknown argument: ${argv[index]}`);
    }
  }
  return args;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  const audit = auditCorpus();
  if (args.output) {
    const outputPath = path.resolve(process.cwd(), args.output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(audit, null, args.compact ? 0 : 2)}\n`);
    console.log(`apostrophe-audit: wrote ${audit.summary.totalOccurrences} occurrences to ${outputPath}`);
  }
  console.log(JSON.stringify({
    corpus: audit.corpus,
    preliminaryCountVerification: audit.preliminaryCountVerification,
    summary: {
      totalOccurrences: audit.summary.totalOccurrences,
      autoResolvedCount: audit.summary.autoResolvedCount,
      reviewQueueCount: audit.summary.reviewQueueCount,
      allUnresolvedQueued: audit.summary.allUnresolvedQueued,
      byApostropheCodePoint: audit.summary.byApostropheCodePoint,
      byFieldType: audit.summary.byFieldType,
      byInferredCategory: audit.summary.byInferredCategory,
      byConverterReachability: audit.summary.byConverterReachability,
      byCurrentEngineWouldAlter: audit.summary.byCurrentEngineWouldAlter,
      byForcedLatinModeReachability: audit.summary.byForcedLatinModeReachability,
      byAjamiSessionReachability: audit.summary.byAjamiSessionReachability,
      byPairedPunctuationDetectable: audit.summary.byPairedPunctuationDetectable,
    },
  }, null, 2));
}
