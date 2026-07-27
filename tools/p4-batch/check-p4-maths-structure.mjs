#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(here, "p4-maths.json");
const expectedIds = Array.from({ length: 24 }, (_, index) => `p4-maths-${String(index + 1).padStart(2, "0")}`);
const requiredFields = [
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
  "textExplanationAjami",
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

const failures = [];

function addFailure(message) {
  failures.push(message);
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) addFailure(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function assertArrayLength(value, length, message) {
  if (!Array.isArray(value) || value.length !== length) {
    addFailure(`${message}: expected array length ${length}, got ${Array.isArray(value) ? value.length : typeof value}`);
  }
}

let source;
try {
  source = JSON.parse(readFileSync(sourcePath, "utf8"));
} catch (error) {
  console.error(`check-p4-maths-structure: FAIL: ${error.message}`);
  process.exit(1);
}

if (!Array.isArray(source)) {
  console.error("check-p4-maths-structure: FAIL: source root is not an array.");
  process.exit(1);
}

assertArrayLength(source, 24, "source modules");
const ids = source.map((module) => module?.id);
if (JSON.stringify(ids) !== JSON.stringify(expectedIds)) {
  addFailure(`ids must be exactly ${expectedIds.join(", ")}; got ${ids.join(", ")}`);
}
if (new Set(ids).size !== ids.length) addFailure("duplicate module ids found");

source.forEach((module, index) => {
  const where = module?.id || `module[${index}]`;
  const fields = Object.keys(module || {});
  const missing = requiredFields.filter((field) => !fields.includes(field));
  const extra = fields.filter((field) => !requiredFields.includes(field));
  if (missing.length > 0) addFailure(`${where}: missing field(s): ${missing.join(", ")}`);
  if (extra.length > 0) addFailure(`${where}: unexpected field(s): ${extra.join(", ")}`);

  assertEqual(module.gradeband, "p4", `${where}.gradeband`);
  assertEqual(module.subject, "Mathematics", `${where}.subject`);
  assertEqual(module.subjectHa, "Lissafi", `${where}.subjectHa`);
  assertEqual(module.moduleNumber, index + 1, `${where}.moduleNumber`);
  assertEqual(module.titleAjami, null, `${where}.titleAjami`);
  assertEqual(module.textExplanationAjami, null, `${where}.textExplanationAjami`);
  assertEqual(module.ajami_validated, false, `${where}.ajami_validated`);
  assertEqual(module.audioFile, `audio/${where}.mp3`, `${where}.audioFile`);
  assertEqual(module.imageCard, `images/${where}.png`, `${where}.imageCard`);
  assertEqual(module.track, "formal", `${where}.track`);
  assertEqual(module.targetAudience, "youth", `${where}.targetAudience`);
  assertEqual(module.gapTeaser, null, `${where}.gapTeaser`);
  assertEqual(module.chainNext, null, `${where}.chainNext`);
  assertEqual(module.isChainLeaf, true, `${where}.isChainLeaf`);
  assertEqual(module.useTodayPrompt, null, `${where}.useTodayPrompt`);

  assertArrayLength(module.microPauses, 2, `${where}.microPauses`);
  assertArrayLength(module.quizQuestions, 5, `${where}.quizQuestions`);

  if (Array.isArray(module.microPauses)) {
    module.microPauses.forEach((pause, pauseIndex) => {
      const pauseWhere = `${where}.microPauses[${pauseIndex}]`;
      if (!pause || typeof pause !== "object") {
        addFailure(`${pauseWhere}: not an object`);
        return;
      }
      if (!Array.isArray(pause.options) || !pause.options.includes(pause.correctAnswer)) {
        addFailure(`${pauseWhere}: correctAnswer is not present in options`);
      }
      if (typeof pause.questionHa !== "string" || !module.audioScript.includes(pause.questionHa)) {
        addFailure(`${pauseWhere}: questionHa does not appear verbatim in audioScript`);
      }
      if (pauseIndex === 0) assertEqual(pause.pauseAtMs, 90000, `${pauseWhere}.pauseAtMs`);
      if (pauseIndex === 1) assertEqual(pause.pauseAtMs, 150000, `${pauseWhere}.pauseAtMs`);
    });
  }
});

if (failures.length > 0) {
  console.error(`check-p4-maths-structure: FAIL — ${failures.length} issue(s).`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("check-p4-maths-structure: PASS — 24 module(s), exact IDs p4-maths-01..24, schema fields, micro-pauses, quiz counts, assets, and formal leaf fields verified.");
