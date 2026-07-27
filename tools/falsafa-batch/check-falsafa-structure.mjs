#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
function optionValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const sourceOption = optionValue("--source", optionValue("--candidate", null));
const sourcePath = sourceOption
  ? resolve(sourceOption)
  : resolve(here, "falsafa-pilot.json");
const expectedCount = Number(optionValue("--expect-count", "3"));
const expectedLeaf = optionValue("--leaf", "FL03");
const injectTypographicApostrophe = process.argv.includes("--inject-typographic-apostrophe");
const hooklintFixtureOption = optionValue("--hooklint-fixture", null);
const hooklintScan = process.argv.includes("--hooklint-scan");
const contentPath = resolve(here, "..", "..", "app", "content.json");
const expectedIds = Array.from({ length: expectedCount }, (_, index) => `FL${String(index + 1).padStart(2, "0")}`);
const lessonTypes = ["prose", "glossary-card", "glossary-card", "example", "prose"];
const failures = [];

function fail(message) {
  failures.push(message);
}

function equal(actual, expected, where) {
  if (actual !== expected) fail(`${where}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function jsonEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function wordCount(value) {
  return typeof value === "string" ? value.trim().split(/\s+/).filter(Boolean).length : 0;
}

function collectHa(value, path = "") {
  const found = [];
  if (!value || typeof value !== "object") return found;
  for (const [key, child] of Object.entries(value)) {
    const childPath = path ? `${path}.${key}` : key;
    if ((key === "ha" || key.endsWith("Ha")) && typeof child === "string") found.push({ path: childPath, value: child });
    else if (child && typeof child === "object") found.push(...collectHa(child, childPath));
  }
  return found;
}

function collectStrings(value, path = "") {
  const found = [];
  if (typeof value === "string") return [{ path, value }];
  if (!value || typeof value !== "object") return found;
  for (const [key, child] of Object.entries(value)) {
    const childPath = path ? `${path}.${key}` : key;
    found.push(...collectStrings(child, childPath));
  }
  return found;
}

// These rules intentionally remain separate so a reviewer can see which stems
// support suffix matching and which require a whole-word/context decision.
// `prefix` is used only where the listed stem is not a productive prefix of
// unrelated ordinary Hausa words.  `exact` protects against the known traps:
// yana/yanke/yarda/yanayi/yanzu, danna, kasance, and kara's plant-stem sense.
const hookedLetterRules = [
  { stem: "kaddara", strategy: "prefix", note: "narrow stem; suffix matching is safe" },
  { stem: "karshe", strategy: "prefix", note: "narrow stem; suffix matching is safe" },
  { stem: "karami", forms: ["karami", "karama"], strategy: "prefix", note: "narrow stem; catches ƙaramar/ƙaramin forms" },
  { stem: "karfi", strategy: "prefix", note: "narrow stem; catches ƙarfi possessive forms" },
  { stem: "dauka", strategy: "prefix", note: "narrow stem; suffix matching is safe" },
  { stem: "karya", strategy: "prefix", note: "narrow stem; suffix matching is safe" },
  { stem: "kudi", strategy: "prefix", note: "narrow stem; suffix matching is safe" },
  { stem: "kofa", strategy: "prefix", note: "narrow stem; suffix matching is safe" },
  { stem: "kwai", strategy: "prefix", note: "narrow stem; suffix matching is safe" },
  { stem: "bata", strategy: "exact", note: "meaning can be legitimately unhooked; no blind suffix match" },
  { stem: "kare", strategy: "exact", note: "meaning can be legitimately unhooked; no blind suffix match" },
  { stem: "kasa", strategy: "exact", note: "do not catch kasance/kasancewa" },
  { stem: "yiwa", strategy: "exact", note: "spacing and meaning require review; no blind suffix match" },
  { stem: "shafa", strategy: "exact", note: "meaning can be legitimately unhooked; no blind suffix match" },
  { stem: "dan", strategy: "exact", note: "do not catch danna" },
  { stem: "yan", strategy: "exact", note: "do not catch yana/yanke/yarda/yanayi/yanzu" },
  { stem: "yar", strategy: "exact", note: "short productive stem; no blind suffix match" },
  { stem: "kara", strategy: "contextual", note: "plant stem kara is allowed; ƙara has a different meaning" },
];

// Keep ASCII and legacy curly apostrophes inside a Hausa word.  Without this,
// `ya'yan` (or a live-corpus `ya’yan`) would split and its final `yan` would
// be spuriously treated as a separate token.
const unicodeWord = /(?<![\p{L}\p{M}'\u2018\u2019])[\p{L}\p{M}]+(?:['\u2018\u2019][\p{L}\p{M}]+)*(?![\p{L}\p{M}'\u2018\u2019])/gu;
const plantStemKara = /(?<![\p{L}\p{M}])kara(?:\s+(?:na|ta))?\s+shuka(?![\p{L}\p{M}])/iu;

// The kwai prefix rule must continue to catch unhooked ƙwai (egg) forms.
// These four complete words are the documented, unrelated imitation-word
// family found in the live corpus.  Keep this as an explicit lexical list:
// allowing a kwaik* prefix or arbitrary kwai suffix would hide real errors.
const kwaiImitationWordExceptions = [
  "kwaikwayo",
  "kwaikwayi",
  "kwaikwayon",
  "kwaikwaya",
];

function isDocumentedHookedLetterException(rule, field, normalizedWord) {
  // Like the documented kara plant-stem exception above, this logic is kept
  // beside the rule set and requires an exact, auditable match.
  if (rule.stem === "kara") return plantStemKara.test(field.value);
  if (rule.stem === "kwai") return kwaiImitationWordExceptions.includes(normalizedWord);
  return false;
}

function lintHookedLetters(value) {
  const hits = [];
  for (const field of collectStrings(value)) {
    for (const match of field.value.matchAll(unicodeWord)) {
      const word = match[0];
      const normalizedWord = word.toLocaleLowerCase("ha");
      const rule = hookedLetterRules.find((candidate) => (
        candidate.strategy === "prefix"
          ? (candidate.forms || [candidate.stem]).some((form) => normalizedWord.startsWith(form))
          : normalizedWord === candidate.stem
      ));
      if (rule && !isDocumentedHookedLetterException(rule, field, normalizedWord)) {
        hits.push({ path: field.path, word, stem: rule.stem, note: rule.note });
      }
    }
  }
  return hits;
}

function runHooklintFixture(fixturePath) {
  const fixture = JSON.parse(readFileSync(resolve(fixturePath), "utf8"));
  const hits = lintHookedLetters(fixture.value);
  const expectedWords = fixture.expectedWords || [];
  const actualWords = hits.map((hit) => hit.word);
  const sameWords = jsonEqual(actualWords, expectedWords);
  if (!sameWords) {
    console.error(`hooklint fixture: FAIL — ${fixture.name || fixturePath}`);
    console.error(`- expected words ${JSON.stringify(expectedWords)}, got ${JSON.stringify(actualWords)}`);
    process.exit(1);
  }
  console.log(`hooklint fixture: PASS — ${fixture.name || fixturePath} (${hits.length} hit(s))`);
}

if (hooklintFixtureOption) {
  try {
    runHooklintFixture(hooklintFixtureOption);
  } catch (error) {
    console.error(`hooklint fixture: FAIL — ${error.message}`);
    process.exit(1);
  }
  process.exit(0);
}

if (hooklintScan) {
  try {
    const source = JSON.parse(readFileSync(sourcePath, "utf8"));
    const hits = lintHookedLetters(source);
    console.log(`hooklint scan: ${sourcePath}`);
    if (!hits.length) console.log("hooklint scan: PASS — no possible missing hooked letters");
    else {
      console.log(`hooklint scan: REVIEW — ${hits.length} possible missing hooked letter(s)`);
      hits.forEach((hit) => console.log(`- ${hit.path}: ${JSON.stringify(hit.word)} (stem ${hit.stem}; ${hit.note})`));
    }
  } catch (error) {
    console.error(`hooklint scan: FAIL — ${error.message}`);
    process.exit(1);
  }
  process.exit(0);
}

function assertAjamiNull(module, where) {
  const requiredPaths = [
    ["titleAjami"], ["textExplanationAjami"], ["title", "ajami"], ["summary", "ajami"],
    ["useTodayPrompt", "ajami"],
  ];
  for (const path of requiredPaths) {
    let value = module;
    for (const key of path) value = value?.[key];
    if (value !== null) fail(`${where}.${path.join(".")}: expected null`);
  }
  if (module.gapTeaser !== null && module.gapTeaser?.ajami !== null) {
    fail(`${where}.gapTeaser.ajami: expected null`);
  }
  for (const [index, lesson] of (module.lessons || []).entries()) {
    for (const [key, value] of Object.entries(lesson)) {
      if (key === "type") continue;
      if (value?.ajami !== null) fail(`${where}.lessons[${index}].${key}.ajami: expected null`);
    }
  }
}

function sentencesFromModule(module) {
  const values = [module.textExplanationHa];
  for (const lesson of module.lessons || []) {
    if (lesson.type === "prose") values.push(lesson.heading?.ha, lesson.body?.ha);
    if (lesson.type === "glossary-card") values.push(lesson.term?.ha, lesson.definition?.ha);
    if (lesson.type === "example") values.push(lesson.title?.ha, lesson.scenario?.ha, lesson.takeaway?.ha);
  }
  return values
    .filter((value) => typeof value === "string")
    .flatMap((value) => value.split(/[.!?]+/))
    .map((value) => value.trim().toLocaleLowerCase("ha"))
    .filter((value) => value.split(/\s+/).length >= 5);
}

function closingProse(module) {
  const lessons = module?.lessons;
  if (!Array.isArray(lessons) || lessons[4]?.type !== "prose") return null;
  return lessons[4]?.body?.ha || null;
}

function normalized(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/gu, " ").toLocaleLowerCase("ha") : "";
}

function similarity(left, right) {
  const a = new Set(left.replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/).filter(Boolean));
  const b = new Set(right.replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/).filter(Boolean));
  const union = new Set([...a, ...b]);
  const overlap = [...a].filter((word) => b.has(word)).length;
  return union.size ? overlap / union.size : 0;
}

let modules;
let live;
try {
  modules = JSON.parse(readFileSync(sourcePath, "utf8"));
  live = JSON.parse(readFileSync(contentPath, "utf8"));
} catch (error) {
  console.error(`check-falsafa-structure: FAIL — could not read JSON: ${error.message}`);
  process.exit(1);
}

if (injectTypographicApostrophe && Array.isArray(modules) && modules[0]) {
  modules[0].titleHa = `${modules[0].titleHa}\u2019`;
}

const typographicApostrophe = /[\u02BB\u02BC\u055A\u2018\u2019\u2032\u2035\uFF07]/gu;
const typographicMatches = [...JSON.stringify(modules).matchAll(typographicApostrophe)];
if (typographicMatches.length) {
  fail(`candidate: found ${typographicMatches.length} typographic apostrophe character(s); use ASCII U+0027 instead`);
}

if (!Array.isArray(modules)) fail("source root: expected an array");
const liveVocational = live.modules?.find((module) => module.track === "vocational");
if (!liveVocational) fail("live content: no vocational module available for schema comparison");
const expectedKeys = liveVocational ? Object.keys(liveVocational) : [];

if (Array.isArray(modules)) {
  if (!Number.isInteger(expectedCount) || expectedCount < 1) fail(`--expect-count: expected a positive integer, got ${JSON.stringify(expectedCount)}`);
  if (modules.length !== expectedCount) fail(`source modules: expected exactly ${expectedCount}, got ${modules.length}`);
  const ids = modules.map((module) => module?.id);
  if (!jsonEqual(ids, expectedIds)) fail(`ids: expected ${expectedIds.join(", ")}, got ${ids.join(", ")}`);
  if (new Set(ids).size !== ids.length) fail("ids: duplicates found");
}

for (const [index, module] of (modules || []).entries()) {
  const where = module?.id || `module[${index}]`;
  if (!module || typeof module !== "object" || Array.isArray(module)) {
    fail(`${where}: expected object`);
    continue;
  }
  const actualKeys = Object.keys(module);
  if (!jsonEqual(actualKeys, expectedKeys)) {
    fail(`${where}: 27-key set and key order must match live vocational module; expected ${expectedKeys.join(", ")}; got ${actualKeys.join(", ")}`);
  }
  equal(module.moduleNumber, index + 1, `${where}.moduleNumber`);
  equal(module.gradeband, "adult", `${where}.gradeband`);
  equal(module.subject, "Philosophy", `${where}.subject`);
  equal(module.subjectHa, "Falsafa", `${where}.subjectHa`);
  equal(module.track, "vocational", `${where}.track`);
  equal(module.targetAudience, "adult", `${where}.targetAudience`);
  equal(module.audioScript, null, `${where}.audioScript`);
  equal(module.audioFile, `audio/falsafa/${where}.mp3`, `${where}.audioFile`);
  equal(module.imageCard, null, `${where}.imageCard`);
  equal(module.passingScore, 3, `${where}.passingScore`);
  if (!Array.isArray(module.microPauses) || module.microPauses.length !== 0) fail(`${where}.microPauses: expected []`);
  equal(module.ajami_validated, false, `${where}.ajami_validated`);
  assertAjamiNull(module, where);

  const words = wordCount(module.textExplanationHa);
  if (words < 152 || words > 196) fail(`${where}.textExplanationHa: expected 152..196 Hausa words, got ${words}`);

  if (!Array.isArray(module.lessons) || module.lessons.length !== 5) {
    fail(`${where}.lessons: expected exactly 5 entries`);
  } else {
    const types = module.lessons.map((lesson) => lesson?.type);
    if (!jsonEqual(types, lessonTypes)) fail(`${where}.lessons: expected type sequence ${lessonTypes.join(", ")}, got ${types.join(", ")}`);
    module.lessons.forEach((lesson, lessonIndex) => {
      const lessonWhere = `${where}.lessons[${lessonIndex}]`;
      const keys = Object.keys(lesson || {});
      const expectedLessonKeys = lesson?.type === "example" ? ["type", "title", "scenario", "takeaway"] : lesson?.type === "prose" ? ["type", "heading", "body"] : ["type", "term", "definition"];
      if (!jsonEqual(keys, expectedLessonKeys)) fail(`${lessonWhere}: unexpected lesson-object key order`);
      for (const key of expectedLessonKeys.slice(1)) {
        if (typeof lesson?.[key]?.ha !== "string" || lesson[key].ha.trim() === "") fail(`${lessonWhere}.${key}.ha: expected non-empty string`);
        if (!jsonEqual(Object.keys(lesson?.[key] || {}), ["ha", "ajami"])) fail(`${lessonWhere}.${key}: expected {ha, ajami} key order`);
      }
    });
  }

  if (!Array.isArray(module.quiz) || module.quiz.length !== 5) fail(`${where}.quiz: expected exactly 5 entries`);
  if (!Array.isArray(module.quizQuestions) || module.quizQuestions.length !== 5) fail(`${where}.quizQuestions: expected exactly 5 entries`);
  if (!jsonEqual(module.quiz, module.quizQuestions)) fail(`${where}: quiz and quizQuestions must be byte-identical JSON duplicates`);
  for (const [quizIndex, question] of (module.quiz || []).entries()) {
    const quizWhere = `${where}.quiz[${quizIndex}]`;
    if (!jsonEqual(Object.keys(question || {}), ["templateHa", "answerFormula", "variableRanges", "distractorFormulas"])) fail(`${quizWhere}: unexpected quiz-object key order`);
    if (!question || typeof question.templateHa !== "string" || !question.templateHa.trim()) fail(`${quizWhere}.templateHa: expected non-empty string`);
    if (!question || typeof question.answerFormula !== "string" || !question.answerFormula.trim()) fail(`${quizWhere}.answerFormula: expected non-empty string`);
    if (!jsonEqual(Object.keys(question?.variableRanges || {}), ["a", "b"]) || !jsonEqual(Object.keys(question?.variableRanges?.a || {}), ["min", "max"]) || !jsonEqual(Object.keys(question?.variableRanges?.b || {}), ["min", "max"]) || question?.variableRanges?.a?.min !== 0 || question?.variableRanges?.a?.max !== 0 || question?.variableRanges?.b?.min !== 0 || question?.variableRanges?.b?.max !== 0) fail(`${quizWhere}.variableRanges: expected inert a/b {min: 0, max: 0} ranges`);
    if (!Array.isArray(question?.distractorFormulas) || question.distractorFormulas.length !== 3) fail(`${quizWhere}.distractorFormulas: expected exactly 3 distractors`);
    else if (question.distractorFormulas.includes(question.answerFormula)) fail(`${quizWhere}: correct answer appears among distractors`);
  }

  const expectedNext = index < expectedIds.length - 1 ? expectedIds[index + 1] : null;
  equal(module.chainNext, expectedNext, `${where}.chainNext`);
  equal(module.isChainLeaf, module.id === expectedLeaf, `${where}.isChainLeaf`);
  if (module.chainNext !== null && (!module.gapTeaser || typeof module.gapTeaser.ha !== "string" || !module.gapTeaser.ha.trim())) {
    fail(`${where}.gapTeaser: expected non-empty Hausa teaser when chainNext is set`);
  }

  const rawEnglish = /\b(?:claim|reason|conclusion|evidence|source|fact|opinion|guess|verification|reliable|uncertainty|true|check|message|share|forward)\b/iu;
  for (const field of collectHa(module)) {
    if (rawEnglish.test(field.value)) fail(`${where}.${field.path}: raw English learner-facing leakage found`);
  }
  for (const hit of lintHookedLetters(module)) {
    fail(`${where}.${hit.path}: possible missing hooked letter (${JSON.stringify(hit.word)}; stem ${hit.stem})`);
  }
  const sentences = sentencesFromModule(module);
  for (let left = 0; left < sentences.length; left += 1) {
    for (let right = left + 1; right < sentences.length; right += 1) {
      if (sentences[left] === sentences[right] || similarity(sentences[left], sentences[right]) >= 0.92) {
        fail(`${where}: duplicate/near-duplicate learner-facing sentences found (${JSON.stringify(sentences[left])})`);
      }
    }
  }
}

if (Array.isArray(modules)) {
  const leaves = modules.filter((module) => module?.isChainLeaf);
  if (leaves.length !== 1 || leaves[0]?.id !== expectedLeaf) fail(`chain: expected exactly one leaf, ${expectedLeaf}`);
  const q5 = modules.map((module) => normalized(module?.quiz?.[4]?.templateHa));
  if (q5.some((value) => !value) || new Set(q5).size !== q5.length) fail("quiz Q5: templates must be unique across all modules");
  const closings = modules.map(closingProse).map(normalized);
  if (closings.some((value) => !value) || new Set(closings).size !== closings.length) fail("closing prose: final lesson bodies must be unique across all modules");
  for (const module of modules) {
    const definitions = new Set((module.lessons || [])
      .filter((lesson) => lesson?.type === "glossary-card")
      .map((lesson) => normalized(lesson?.definition?.ha))
      .filter(Boolean));
    const takeaways = (module.lessons || [])
      .filter((lesson) => lesson?.type === "example")
      .map((lesson) => normalized(lesson?.takeaway?.ha));
    if (takeaways.some((takeaway) => definitions.has(takeaway))) fail(`${module.id}: glossary definition reused verbatim as an example takeaway`);
  }
}

if (failures.length) {
  console.error(`check-falsafa-structure: FAIL — ${failures.length} issue(s).`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

[
  `exactly ${expectedCount} modules`,
  `ids FL01–${expectedIds.at(-1)} in order`,
  `moduleNumber values 1–${expectedCount}`,
  "27-key set and order match a live vocational module",
  "adult/vocational invariants",
  "five lessons with the required type sequence and shapes",
  "five quiz and five quizQuestions entries",
  "quiz and quizQuestions byte-identical duplicates",
  "three distractors per item and no answer repeated as a distractor",
  "152–196-word textExplanationHa values",
  "every required Ajami-bearing field null",
  "ajami_validated false",
  "ASCII apostrophe standard (no typographic apostrophes)",
  `FL01 → … → ${expectedLeaf} chain wiring with ${expectedLeaf} leaf`,
  "unique Q5 templates and closing prose across all modules",
  "no glossary definition reused verbatim as an example takeaway",
  "hooked-letter lint",
  "raw-English learner-facing Hausa scan",
  "within-module duplicate/near-duplicate sentence scan",
].forEach((label) => console.log(`check-falsafa-structure: PASS — ${label}`));
console.log(`check-falsafa-structure: PASS — all Falsafa ${expectedCount === 3 ? "pilot" : "candidate"} structure checks passed.`);
