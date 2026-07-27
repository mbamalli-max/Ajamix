#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");
const contentPath = resolve(repoRoot, "app/content.json");
const batchPaths = {
  bsciPilot: resolve(here, "p2-bsci-pilot.json"),
  bsciComplete: resolve(here, "p2-bsci-complete.json"),
  maths: resolve(here, "p2-maths.json"),
  socs: resolve(here, "p2-socs.json")
};

const STATIC_RANGES = JSON.stringify({ a: { min: 0, max: 0 }, b: { min: 0, max: 0 } });
const EXPECTED = {
  bsci: { count: 15, subject: "Basic Science", subjectHa: "Kimiyya", prefix: "p2-bsci-" },
  maths: { count: 24, subject: "Mathematics", subjectHa: "Lissafi", prefix: "p2-maths-" },
  socs: { count: 15, subject: "Social Studies", subjectHa: "Nazarin Zamantakewa", prefix: "p2-socs-" }
};

function fail(errors) {
  console.error(`check-p2-closure: FAIL — ${errors.length} issue(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function idsFor(prefix, count) {
  return Array.from({ length: count }, (_, index) => `${prefix}${String(index + 1).padStart(2, "0")}`);
}

function byId(modules) {
  return new Map(modules.map((module) => [module.id, module]));
}

function stable(value) {
  return JSON.stringify(value);
}

function extractPause(audioScript, marker, nextMarker) {
  return String(audioScript || "").match(new RegExp(`\\[${marker}\\]\\s*(.*?)\\s*\\[${nextMarker}\\]`, "s"))?.[1];
}

const content = readJson(contentPath);
const errors = [];

if (!Array.isArray(content.modules)) errors.push("app/content.json has no modules array");
if (!Array.isArray(content.gradeBands) || !content.gradeBands.includes("p2")) errors.push('gradeBands does not include "p2"');

const modules = content.modules || [];
const allIds = modules.map((module) => module.id);
if (new Set(allIds).size !== allIds.length) errors.push("duplicate module ids found in app/content.json");
if (modules.length !== 142) errors.push(`total module count is ${modules.length}, expected 142`);

const p2 = modules.filter((module) => module.gradeband === "p2");
if (p2.length !== 54) errors.push(`P2 module count is ${p2.length}, expected 54`);

for (const module of modules.filter((item) => item.subject === "Social Studies" && /^(p1|p2)-socs-/.test(item.id))) {
  if (module.subjectHa !== "Nazarin Zamantakewa") {
    errors.push(`${module.id}: Social Studies subjectHa is ${JSON.stringify(module.subjectHa)}, expected "Nazarin Zamantakewa"`);
  }
}

const contentById = byId(modules);

for (const [shortName, spec] of Object.entries(EXPECTED)) {
  const expectedIds = idsFor(spec.prefix, spec.count);
  const subjectModules = expectedIds.map((id) => contentById.get(id));
  const missing = expectedIds.filter((id, index) => !subjectModules[index]);
  if (missing.length) errors.push(`${shortName}: missing ids ${missing.join(", ")}`);

  subjectModules.filter(Boolean).forEach((module, index) => {
    const where = module.id;
    if (module.gradeband !== "p2") errors.push(`${where}: gradeband is not p2`);
    if (module.subject !== spec.subject) errors.push(`${where}: subject mismatch`);
    if (module.subjectHa !== spec.subjectHa) errors.push(`${where}: subjectHa mismatch`);
    if (module.moduleNumber !== index + 1) errors.push(`${where}: moduleNumber ${module.moduleNumber}, expected ${index + 1}`);
    if (module.track !== "formal") errors.push(`${where}: track mismatch`);
    if (module.targetAudience !== "youth") errors.push(`${where}: targetAudience mismatch`);
    if (module.titleAjami !== null) errors.push(`${where}: titleAjami must be null`);
    if (module.textExplanationAjami !== null) errors.push(`${where}: textExplanationAjami must be null`);
    if (module.ajami_validated !== false) errors.push(`${where}: ajami_validated must be false`);
    if (module.chainNext !== null) errors.push(`${where}: chainNext must be null`);
    if (module.gapTeaser !== null) errors.push(`${where}: gapTeaser must be null`);
    if (module.useTodayPrompt !== null) errors.push(`${where}: useTodayPrompt must be null`);
    if (module.isChainLeaf !== true) errors.push(`${where}: isChainLeaf must be true`);
    if (module.audioFile !== `audio/${module.id}.mp3`) errors.push(`${where}: audioFile mismatch`);
    if (module.imageCard !== `images/${module.id}.png`) errors.push(`${where}: imageCard mismatch`);

    if (!Array.isArray(module.microPauses) || module.microPauses.length !== 2) errors.push(`${where}: microPauses count mismatch`);
    if (!Array.isArray(module.quizQuestions) || module.quizQuestions.length !== 5) errors.push(`${where}: quizQuestions count mismatch`);

    const pauseMarkers = String(module.audioScript || "").match(/\[PAUSE [12]\]/g) || [];
    if (pauseMarkers.length !== 2) errors.push(`${where}: expected exactly 2 [PAUSE] markers, got ${pauseMarkers.length}`);
    const pause1 = extractPause(module.audioScript, "PAUSE 1", "MAIN");
    const pause2 = extractPause(module.audioScript, "PAUSE 2", "OUTRO");
    if (module.microPauses?.[0]?.questionHa !== pause1) errors.push(`${where}: [PAUSE 1] does not match microPauses[0].questionHa`);
    if (module.microPauses?.[1]?.questionHa !== pause2) errors.push(`${where}: [PAUSE 2] does not match microPauses[1].questionHa`);
    for (const [pauseIndex, pause] of (module.microPauses || []).entries()) {
      const matches = (pause.options || []).filter((option) => option === pause.correctAnswer).length;
      if (matches !== 1) errors.push(`${where}: microPauses[${pauseIndex}].correctAnswer appears ${matches} time(s) in options`);
    }

    if (shortName !== "maths") {
      for (const [questionIndex, question] of (module.quizQuestions || []).entries()) {
        if (stable(question.variableRanges) !== STATIC_RANGES) errors.push(`${where}: quizQuestions[${questionIndex}] is not static`);
        if (typeof question.answerFormula !== "string" || !question.answerFormula.trim()) {
          errors.push(`${where}: quizQuestions[${questionIndex}] answerFormula is not a non-empty literal string`);
        }
        if (!Array.isArray(question.distractorFormulas) || question.distractorFormulas.length !== 3) {
          errors.push(`${where}: quizQuestions[${questionIndex}] distractor count mismatch`);
        }
        const options = [question.answerFormula, ...(question.distractorFormulas || [])].map((value) => String(value).toLowerCase());
        if (new Set(options).size !== 4) errors.push(`${where}: quizQuestions[${questionIndex}] static options are not distinct`);
      }
    }
  });
}

const liveBsci = idsFor(EXPECTED.bsci.prefix, EXPECTED.bsci.count).map((id) => contentById.get(id));
const batchBsci = [...readJson(batchPaths.bsciPilot), ...readJson(batchPaths.bsciComplete)];
const batchMaths = readJson(batchPaths.maths);
const batchSocs = readJson(batchPaths.socs);

for (const [label, batch, live] of [
  ["Basic Science split batch", batchBsci, liveBsci],
  ["Mathematics batch", batchMaths, idsFor(EXPECTED.maths.prefix, EXPECTED.maths.count).map((id) => contentById.get(id))],
  ["Social Studies batch", batchSocs, idsFor(EXPECTED.socs.prefix, EXPECTED.socs.count).map((id) => contentById.get(id))]
]) {
  if (stable(batch) !== stable(live)) errors.push(`${label}: batch file content does not match live app/content.json modules`);
}

const p2Subjects = new Map();
for (const module of p2) {
  const labels = p2Subjects.get(module.subject) || new Set();
  labels.add(module.subjectHa);
  p2Subjects.set(module.subject, labels);
}
for (const [subject, labels] of p2Subjects.entries()) {
  if (labels.size !== 1) errors.push(`${subject}: duplicate P2 subjectHa labels ${[...labels].join(", ")}`);
}

if (errors.length) fail(errors);

console.log("check-p2-closure: OK");
console.log("  total modules: 142");
console.log("  P2 modules: 54");
console.log("  Basic Science: 15 (p2-bsci-01..15), subjectHa=Kimiyya");
console.log("  Mathematics: 24 (p2-maths-01..24), subjectHa=Lissafi");
console.log("  Social Studies: 15 (p2-socs-01..15), subjectHa=Nazarin Zamantakewa");
console.log("  P1/P2 Social Studies subjectHa consistency: OK");
console.log("  schema/audio/micro-pause/static quiz checks: OK");
console.log("  batch-file parity: OK");
console.log("  render readiness: gradeBands includes p2; modules reachable by gradeband + subject; placeholder paths present");
