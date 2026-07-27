#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(here, "p6-bsci.json");
const expectedArg = process.argv.find((argument) => argument.startsWith("--expected="));
const expectedCount = Number(expectedArg?.split("=")[1] ?? 5);
const expectedIds = Array.from(
  { length: expectedCount },
  (_, index) => `p6-bsci-${String(index + 1).padStart(2, "0")}`
);

const moduleFields = [
  "id",
  "gradeband",
  "subject",
  "subjectHa",
  "moduleNumber",
  "titleEn",
  "titleHa",
  "titleAjami",
  "ajami_validated",
  "textExplanationHa",
  "audioScript",
  "audioFile",
  "imageCard",
  "microPauses",
  "quizQuestions",
  "track",
  "targetAudience",
  "gapTeaser",
  "chainNext",
  "isChainLeaf",
  "useTodayPrompt"
];
const pauseFields = ["pauseAtMs", "questionHa", "correctAnswer", "options"];
const quizFields = ["templateHa", "answerFormula", "variableRanges", "distractorFormulas"];
const expectedMarkers = ["INTRO", "MAIN", "PAUSE 1", "MAIN", "PAUSE 2", "OUTRO"];
const failures = [];

function fail(message) {
  failures.push(message);
}

function sameMembers(actual, expected) {
  return actual.length === expected.length && expected.every((item) => actual.includes(item));
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) fail(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function assertExactFields(value, expected, message) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${message}: expected object`);
    return;
  }
  const actual = Object.keys(value);
  if (!sameMembers(actual, expected)) {
    const missing = expected.filter((field) => !actual.includes(field));
    const extra = actual.filter((field) => !expected.includes(field));
    fail(`${message}: missing [${missing.join(", ")}], extra [${extra.join(", ")}]`);
  }
}

function assertUniqueStrings(values, message) {
  if (!Array.isArray(values) || values.some((value) => typeof value !== "string" || value.trim() === "")) {
    fail(`${message}: expected non-empty strings`);
    return;
  }
  if (new Set(values).size !== values.length) fail(`${message}: duplicate values found`);
}

let source;
try {
  source = JSON.parse(readFileSync(sourcePath, "utf8"));
} catch (error) {
  console.error(`check-p6-bsci-structure: FAIL: ${error.message}`);
  process.exit(1);
}

if (!Number.isInteger(expectedCount) || expectedCount < 1 || expectedCount > 15) {
  console.error("check-p6-bsci-structure: FAIL: --expected must be an integer from 1 to 15.");
  process.exit(1);
}
if (!Array.isArray(source)) {
  console.error("check-p6-bsci-structure: FAIL: source root is not an array.");
  process.exit(1);
}

if (source.length !== expectedCount) {
  fail(`source modules: expected ${expectedCount}, got ${source.length}`);
}
const ids = source.map((module) => module?.id);
if (JSON.stringify(ids) !== JSON.stringify(expectedIds)) {
  fail(`ids must be exactly ${expectedIds.join(", ")}; got ${ids.join(", ")}`);
}
if (new Set(ids).size !== ids.length) fail("duplicate module ids found");

const q5Templates = [];
const outros = [];

source.forEach((module, index) => {
  const where = module?.id || `module[${index}]`;
  assertExactFields(module, moduleFields, where);
  assertEqual(module.gradeband, "p6", `${where}.gradeband`);
  assertEqual(module.subject, "Basic Science", `${where}.subject`);
  assertEqual(module.subjectHa, "Kimiyya", `${where}.subjectHa`);
  assertEqual(module.moduleNumber, index + 1, `${where}.moduleNumber`);
  assertEqual(module.titleAjami, null, `${where}.titleAjami`);
  assertEqual(module.ajami_validated, false, `${where}.ajami_validated`);
  assertEqual(module.audioFile, `audio/${where}.mp3`, `${where}.audioFile`);
  assertEqual(module.imageCard, `images/${where}.png`, `${where}.imageCard`);
  assertEqual(module.track, "formal", `${where}.track`);
  assertEqual(module.targetAudience, "youth", `${where}.targetAudience`);
  assertEqual(module.gapTeaser, null, `${where}.gapTeaser`);
  assertEqual(module.chainNext, null, `${where}.chainNext`);
  assertEqual(module.isChainLeaf, true, `${where}.isChainLeaf`);
  assertEqual(module.useTodayPrompt, null, `${where}.useTodayPrompt`);

  for (const field of ["titleEn", "titleHa", "textExplanationHa", "audioScript"]) {
    if (typeof module[field] !== "string" || module[field].trim() === "") {
      fail(`${where}.${field}: expected a non-empty string`);
    }
  }

  if (typeof module.textExplanationHa === "string") {
    const words = module.textExplanationHa.trim().split(/\s+/).length;
    if (words < 120 || words > 170) fail(`${where}.textExplanationHa: expected 120..170 words, got ${words}`);
  }

  if (typeof module.audioScript === "string") {
    const markers = [...module.audioScript.matchAll(/\[(INTRO|MAIN|PAUSE 1|PAUSE 2|OUTRO)\]/g)].map((match) => match[1]);
    if (JSON.stringify(markers) !== JSON.stringify(expectedMarkers)) {
      fail(`${where}.audioScript: marker order must be ${expectedMarkers.join(" -> ")}; got ${markers.join(" -> ")}`);
    }
    const outro = module.audioScript.match(/\[OUTRO\]\s*(.+)$/)?.[1]?.trim();
    if (!outro) fail(`${where}.audioScript: missing OUTRO text`);
    else outros.push(outro);
  }

  if (!Array.isArray(module.microPauses) || module.microPauses.length !== 2) {
    fail(`${where}.microPauses: expected exactly 2 entries`);
  } else {
    module.microPauses.forEach((pause, pauseIndex) => {
      const pauseWhere = `${where}.microPauses[${pauseIndex}]`;
      assertExactFields(pause, pauseFields, pauseWhere);
      assertEqual(pause.pauseAtMs, pauseIndex === 0 ? 90000 : 150000, `${pauseWhere}.pauseAtMs`);
      assertUniqueStrings(pause.options, `${pauseWhere}.options`);
      if (!Array.isArray(pause.options) || pause.options.length !== 3) {
        fail(`${pauseWhere}.options: expected exactly 3 choices`);
      } else if (pause.options.filter((option) => option === pause.correctAnswer).length !== 1) {
        fail(`${pauseWhere}.correctAnswer: must occur exactly once in options`);
      }
      if (typeof pause.questionHa !== "string" || !module.audioScript.includes(`[PAUSE ${pauseIndex + 1}] ${pause.questionHa}`)) {
        fail(`${pauseWhere}.questionHa: must follow its audio marker verbatim`);
      }
    });
  }

  if (!Array.isArray(module.quizQuestions) || module.quizQuestions.length !== 5) {
    fail(`${where}.quizQuestions: expected exactly 5 entries`);
  } else {
    const moduleTemplates = [];
    module.quizQuestions.forEach((quiz, quizIndex) => {
      const quizWhere = `${where}.quizQuestions[${quizIndex}]`;
      assertExactFields(quiz, quizFields, quizWhere);
      for (const field of ["templateHa", "answerFormula"]) {
        if (typeof quiz[field] !== "string" || quiz[field].trim() === "") {
          fail(`${quizWhere}.${field}: expected a non-empty string`);
        }
      }
      moduleTemplates.push(quiz.templateHa);
      const ranges = quiz.variableRanges;
      for (const variable of ["a", "b"]) {
        if (ranges?.[variable]?.min !== 0 || ranges?.[variable]?.max !== 0) {
          fail(`${quizWhere}.variableRanges.${variable}: expected static range {min: 0, max: 0}`);
        }
      }
      assertUniqueStrings(quiz.distractorFormulas, `${quizWhere}.distractorFormulas`);
      if (!Array.isArray(quiz.distractorFormulas) || quiz.distractorFormulas.length !== 3) {
        fail(`${quizWhere}.distractorFormulas: expected exactly 3 distractors`);
      } else if (quiz.distractorFormulas.includes(quiz.answerFormula)) {
        fail(`${quizWhere}: answerFormula is repeated as a distractor`);
      }
    });
    if (new Set(moduleTemplates).size !== moduleTemplates.length) {
      fail(`${where}.quizQuestions: duplicate templateHa within module`);
    }
    q5Templates.push(module.quizQuestions[4].templateHa);
  }
});

if (new Set(q5Templates).size !== q5Templates.length) fail("Q5 templateHa must be unique across the P6 source band");
if (new Set(outros).size !== outros.length) fail("OUTRO text must be unique across the P6 source band");

if (failures.length > 0) {
  console.error(`check-p6-bsci-structure: FAIL — ${failures.length} issue(s).`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `check-p6-bsci-structure: PASS — ${expectedCount} module(s), contiguous IDs, exact schema, 120..170 Hausa words, audio/pause alignment, quiz integrity, assets, and formal leaf fields verified.`
);
