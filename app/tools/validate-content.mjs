#!/usr/bin/env node
// Almajirix content validator
//
// Usage:   node app/tools/validate-content.mjs [--content path/to/content.json]
// Purpose: enforce the v3.0 dual-track schema on app/content.json before commit.
// Exits 0 on success, 1 on any validation failure.
//
// Rules (from plan §4.6):
//   1. Every module has a `track` of "vocational" or "formal".
//   2. Every module has a `targetAudience` of "adult", "youth", or "all".
//   3. Every module has either `chainNext` set to a valid sibling module id
//      OR `isChainLeaf === true`.
//   4. Latin learner-content fields are always required. Ajami fields are
//      required when `ajami_validated === true`; otherwise they may be null,
//      but any non-null Ajami value must still be a non-empty string.
//   5. Adult vocational modules retain their complete lesson and quiz schema.
//   6. When `chainNext` is set, `gapTeaser` is required; `useTodayPrompt` and
//      `gapTeaserInline`, when present, must retain valid bilingual shapes.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const contentFlagIndex = process.argv.indexOf("--content");
const contentPath = contentFlagIndex >= 0 && process.argv[contentFlagIndex + 1]
  ? resolve(process.argv[contentFlagIndex + 1])
  : resolve(here, "..", "content.json");

const ALLOWED_TRACKS = new Set(["vocational", "formal"]);
const ALLOWED_AUDIENCES = new Set(["adult", "youth", "all"]);

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function validateAjamiValue(errors, where, value, ajamiValidated) {
  if (ajamiValidated) {
    if (!isNonEmptyString(value)) errors.push(`${where}: must be a non-empty string when ajami_validated is true.`);
    return;
  }
  if (value !== null && !isNonEmptyString(value)) {
    errors.push(`${where}: must be null or a non-empty string when ajami_validated is false.`);
  }
}

function validateBilingualObject(errors, where, value, ajamiValidated, required) {
  if (value == null) {
    if (required) errors.push(`${where}: required object with ha + ajami fields is missing.`);
    return;
  }
  if (typeof value !== "object" || Array.isArray(value)) {
    errors.push(`${where}: must be an object with ha + ajami fields.`);
    return;
  }
  if (!isNonEmptyString(value.ha)) errors.push(`${where}.ha: must be a non-empty string.`);
  if (!Object.hasOwn(value, "ajami")) {
    errors.push(`${where}.ajami: required field is missing.`);
    return;
  }
  validateAjamiValue(errors, `${where}.ajami`, value.ajami, ajamiValidated);
}

function validateRootBilingualPair(errors, where, latin, ajami, ajamiValidated, hasAjamiField) {
  if (!isNonEmptyString(latin)) errors.push(`${where}: must be a non-empty string.`);
  if (!hasAjamiField) {
    if (ajamiValidated) errors.push(`${where.replace(/Ha$/, "Ajami")}: required field is missing when ajami_validated is true.`);
    return;
  }
  validateAjamiValue(errors, `${where.replace(/Ha$/, "Ajami")}`, ajami, ajamiValidated);
}

function validateQuizArray(errors, where, quiz) {
  if (!Array.isArray(quiz) || quiz.length !== 5) {
    errors.push(`${where}: must contain exactly five quiz items.`);
    return;
  }
  for (const [index, question] of quiz.entries()) {
    const questionWhere = `${where}[${index}]`;
    if (!question || typeof question !== "object" || Array.isArray(question)) {
      errors.push(`${questionWhere}: must be an object.`);
      continue;
    }
    if (!isNonEmptyString(question.templateHa)) errors.push(`${questionWhere}.templateHa: must be a non-empty string.`);
    if (!isNonEmptyString(question.answerFormula)) errors.push(`${questionWhere}.answerFormula: must be a non-empty string.`);
    if (!Array.isArray(question.distractorFormulas) || question.distractorFormulas.length !== 3 || !question.distractorFormulas.every(isNonEmptyString)) {
      errors.push(`${questionWhere}.distractorFormulas: must contain exactly three non-empty strings.`);
    }
    if (Array.isArray(question.distractorFormulas) && question.distractorFormulas.includes(question.answerFormula)) {
      errors.push(`${questionWhere}: answerFormula must not appear among distractorFormulas.`);
    }
    const ranges = question.variableRanges;
    if (!ranges || typeof ranges !== "object" || !ranges.a || !ranges.b || !Number.isFinite(ranges.a.min) || !Number.isFinite(ranges.a.max) || !Number.isFinite(ranges.b.min) || !Number.isFinite(ranges.b.max)) {
      errors.push(`${questionWhere}.variableRanges: must contain numeric a and b min/max ranges.`);
    }
  }
}

function validateAdultVocationalModule(errors, m, where) {
  const requiredFields = [
    "id", "gradeband", "subject", "subjectHa", "moduleNumber", "titleEn", "titleHa", "titleAjami", "title",
    "ajami_validated", "summary", "textExplanationHa", "textExplanationAjami", "audioScript", "audioFile",
    "imageCard", "lessons", "microPauses", "passingScore", "quiz", "quizQuestions", "track", "targetAudience",
    "gapTeaser", "chainNext", "isChainLeaf", "useTodayPrompt",
  ];
  for (const field of requiredFields) {
    if (!Object.hasOwn(m, field)) errors.push(`${where}.${field}: required adult vocational field is missing.`);
  }
  if (m.gradeband !== "adult") errors.push(`${where}.gradeband: adult vocational modules must use "adult".`);
  if (!isNonEmptyString(m.subject) || !isNonEmptyString(m.subjectHa) || !isNonEmptyString(m.titleEn)) {
    errors.push(`${where}: subject, subjectHa, and titleEn must be non-empty strings.`);
  }
  if (!Number.isInteger(m.moduleNumber) || m.moduleNumber < 1) errors.push(`${where}.moduleNumber: must be a positive integer.`);
  if (!Array.isArray(m.lessons) || m.lessons.length !== 5) {
    errors.push(`${where}.lessons: must contain exactly five lessons.`);
  } else {
    for (const [index, lesson] of m.lessons.entries()) {
      const lessonWhere = `${where}.lessons[${index}]`;
      if (!lesson || typeof lesson !== "object" || Array.isArray(lesson) || !isNonEmptyString(lesson.type)) {
        errors.push(`${lessonWhere}: must be a typed lesson object.`);
        continue;
      }
      for (const [key, value] of Object.entries(lesson)) {
        if (key === "type") continue;
        if (key === "audioFile" || key === "audioScript") {
          if (!isNonEmptyString(value)) errors.push(`${lessonWhere}.${key}: must be a non-empty string.`);
          continue;
        }
        validateBilingualObject(errors, `${lessonWhere}.${key}`, value, m.ajami_validated, true);
      }
    }
  }
  if (!Array.isArray(m.microPauses)) errors.push(`${where}.microPauses: must be an array.`);
  if (!Number.isFinite(m.passingScore)) errors.push(`${where}.passingScore: must be numeric.`);
  validateQuizArray(errors, `${where}.quiz`, m.quiz);
  validateQuizArray(errors, `${where}.quizQuestions`, m.quizQuestions);
  if (JSON.stringify(m.quiz) !== JSON.stringify(m.quizQuestions)) errors.push(`${where}: quiz and quizQuestions must be identical.`);
}

function validateSegments(errors, m, where) {
  if (!Array.isArray(m.segments) || m.segments.length !== 3) {
    errors.push(`${where}.segments: must contain exactly three segments.`);
    return;
  }
  for (const [offset, segment] of m.segments.entries()) {
    const segmentWhere = `${where}.segments[${offset}]`;
    if (!segment || typeof segment !== "object" || Array.isArray(segment)) {
      errors.push(`${segmentWhere}: must be an object.`);
      continue;
    }
    if (segment.index !== offset + 1) errors.push(`${segmentWhere}.index: must be ${offset + 1}.`);
    if (!isNonEmptyString(segment.audioScript)) errors.push(`${segmentWhere}.audioScript: must be a non-empty string.`);
    if (!isNonEmptyString(segment.audioFile)) errors.push(`${segmentWhere}.audioFile: must be a non-empty string.`);
    const expectedGate = offset < 2 ? "quiz" : null;
    if (segment.gate !== expectedGate) errors.push(`${segmentWhere}.gate: must be ${JSON.stringify(expectedGate)}.`);
    if (!segment.text || typeof segment.text !== "object" || Array.isArray(segment.text)) {
      errors.push(`${segmentWhere}.text: must be a bilingual object.`);
    } else {
      if (!isNonEmptyString(segment.text.ha)) errors.push(`${segmentWhere}.text.ha: must be a non-empty string.`);
      if (!Object.hasOwn(segment.text, "ajami") || segment.text.ajami !== null) errors.push(`${segmentWhere}.text.ajami: must be null.`);
    }
  }
}

function main() {
  let raw;
  try {
    raw = readFileSync(contentPath, "utf8");
  } catch (err) {
    console.error(`validate-content: could not read ${contentPath}: ${err.message}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`validate-content: ${contentPath} is not valid JSON: ${err.message}`);
    process.exit(1);
  }

  if (!Array.isArray(data.modules)) {
    console.error('validate-content: content.json has no "modules" array.');
    process.exit(1);
  }

  const ids = new Set(data.modules.map((m) => m && m.id).filter(Boolean));
  const errors = [];

  for (const m of data.modules) {
    const where = m && m.id ? `module ${m.id}` : "module <unknown>";

    if (!m || typeof m !== "object") {
      errors.push(`${where}: not an object`);
      continue;
    }

    if (!ALLOWED_TRACKS.has(m.track)) {
      errors.push(`${where}: track must be one of ${[...ALLOWED_TRACKS].join(", ")} (got ${JSON.stringify(m.track)})`);
    }

    if (!ALLOWED_AUDIENCES.has(m.targetAudience)) {
      errors.push(`${where}: targetAudience must be one of ${[...ALLOWED_AUDIENCES].join(", ")} (got ${JSON.stringify(m.targetAudience)})`);
    }

    if (typeof m.ajami_validated !== "boolean") {
      errors.push(`${where}.ajami_validated: must be a boolean.`);
    }
    const ajamiValidated = m.ajami_validated === true;

    validateRootBilingualPair(errors, `${where}.titleHa`, m.titleHa, m.titleAjami, ajamiValidated, Object.hasOwn(m, "titleAjami"));
    if (m.title != null) validateBilingualObject(errors, `${where}.title`, m.title, ajamiValidated, true);
    if (m.summary != null) validateBilingualObject(errors, `${where}.summary`, m.summary, ajamiValidated, true);
    validateRootBilingualPair(errors, `${where}.textExplanationHa`, m.textExplanationHa, m.textExplanationAjami, ajamiValidated, Object.hasOwn(m, "textExplanationAjami"));

    if (m.track === "vocational" && m.targetAudience === "adult") {
      validateAdultVocationalModule(errors, m, where);
    }

    if (m.track === "formal") {
      validateSegments(errors, m, where);
    } else if (m.segments != null) {
      validateSegments(errors, m, where);
    }

    const hasChainNext = m.chainNext != null && m.chainNext !== "";
    const isLeaf = m.isChainLeaf === true;

    if (!hasChainNext && !isLeaf) {
      errors.push(`${where}: no chainNext and not marked isChainLeaf. Either set chainNext to a sibling module id or set isChainLeaf: true.`);
    }

    if (hasChainNext && isLeaf) {
      errors.push(`${where}: has chainNext but is also marked isChainLeaf: true. Pick one.`);
    }

    if (hasChainNext && !ids.has(m.chainNext)) {
      errors.push(`${where}: chainNext "${m.chainNext}" does not match any known module id.`);
    }

    if (hasChainNext && m.chainNext === m.id) {
      errors.push(`${where}: chainNext points to itself.`);
    }

    if (hasChainNext) {
      validateBilingualObject(errors, `${where}.gapTeaser`, m.gapTeaser, ajamiValidated, true);
    } else if (m.gapTeaser != null) {
      validateBilingualObject(errors, `${where}.gapTeaser`, m.gapTeaser, ajamiValidated, false);
    }

    if (m.useTodayPrompt != null) {
      validateBilingualObject(errors, `${where}.useTodayPrompt`, m.useTodayPrompt, ajamiValidated, false);
    }

    if (m.gapTeaserInline != null) {
      validateBilingualObject(errors, `${where}.gapTeaserInline`, m.gapTeaserInline, ajamiValidated, false);
    }
  }

  if (errors.length > 0) {
    console.error(`validate-content: ${errors.length} error(s) in ${contentPath}:`);
    for (const e of errors) {
      console.error("  - " + e);
    }
    process.exit(1);
  }

  const leaves = data.modules.filter((m) => m.isChainLeaf === true).length;
  const chained = data.modules.filter((m) => m.chainNext != null && m.chainNext !== "").length;
  const vocational = data.modules.filter((m) => m.track === "vocational").length;
  const formal = data.modules.filter((m) => m.track === "formal").length;

  console.log(`validate-content: OK — ${data.modules.length} module(s) pass.`);
  console.log(`  track=vocational: ${vocational}`);
  console.log(`  track=formal:     ${formal}`);
  console.log(`  isChainLeaf:      ${leaves}`);
  console.log(`  chainNext set:    ${chained}`);
  process.exit(0);
}

main();
