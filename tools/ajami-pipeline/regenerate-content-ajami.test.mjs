import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  regenerateContentData,
  writeRegeneratedContent,
} from "./regenerate-content-ajami.mjs";

function entry(boko, ajami) {
  return { boko, ajami };
}

const map = new Map([
  ["known", entry("known", "ک")],
  ["subject", entry("subject", "س")],
  ["topic", entry("topic", "ت")],
]);

function fixture() {
  const quiz = {
    templateHa: "Known?",
    templateHaAjami: "stale template",
    answerFormula: "42",
    answerFormulaAjami: "stale answer",
    variableRanges: { a: { min: 0, max: 0 } },
    distractorFormulas: ["Known", "Missing", "N12,000"],
    distractorFormulasAjami: ["stale known", "stale missing", "stale currency"],
  };
  return {
    modules: [{
      id: "module-1",
      subjectHa: "Subject",
      subjectAjami: "stale",
      titleHa: "Known missing",
      titleAjami: "broken",
      ajami_validated: false,
      textExplanationHa: "Prose stays Boko",
      textExplanationAjami: "broken prose",
      lessons: [{
        type: "prose",
        heading: { ha: "Known", ajami: "stale heading" },
        keep: "lesson value",
      }, {
        type: "prose",
        heading: { ha: "Missing", ajami: "stale uncovered heading" },
        keep: "another lesson value",
      }],
      quiz: [quiz],
      quizQuestions: [structuredClone(quiz)],
      keep: { byte: "identical" },
    }],
    activities: [{
      activityId: "activity-1",
      topicHa: "Topic 12",
      topicAjami: "broken",
      ajami_validated: false,
      keep: true,
    }],
    glossary: [{
      termHa: "Missing",
      termAjami: "broken",
      ajami_validated: true,
      definitionHa: "Keep me",
    }, {
      termHa: "Missing",
      ajami_validated: false,
      definitionHa: "Keep this too",
    }],
  };
}

test("regeneration wipes first, composes all-or-nothing, and applies the flag invariant", () => {
  const { content, coverage } = regenerateContentData(fixture(), map);
  const module = content.modules[0];
  assert.equal(module.subjectAjami, "س");
  assert.equal(module.titleAjami, null);
  assert.equal(module.textExplanationAjami, null);
  assert.equal(module.ajami_validated, false);
  assert.deepEqual(module.lessons[0].heading, { ha: "Known", ajami: "ک" });
  assert.deepEqual(module.lessons[1].heading, { ha: "Missing", ajami: null });
  assert.deepEqual(module.quiz[0].distractorFormulasAjami, ["ک", null, null]);
  assert.equal(module.quiz[0].templateHaAjami, "ک?");
  assert.equal(module.quiz[0].answerFormulaAjami, "42");
  assert.deepEqual(module.quizQuestions, module.quiz);
  assert.equal(JSON.stringify(module.quizQuestions), JSON.stringify(module.quiz));
  assert.equal(Object.hasOwn(module.quiz[0], "ajami_validated"), false);
  assert.equal(Object.hasOwn(module.lessons[0], "ajami_validated"), false);

  assert.equal(content.activities[0].topicAjami, "ت 12");
  assert.equal(content.activities[0].ajami_validated, false);
  assert.equal(content.glossary[0].termAjami, null);
  assert.equal(content.glossary[0].ajami_validated, false);
  assert.equal(Object.hasOwn(content.glossary[1], "termAjami"), false);
  assert.equal(content.glossary[1].ajami_validated, false);
  assert.equal(
    [...content.modules, ...content.activities, ...content.glossary]
      .some((item) => item.ajami_validated === true),
    false
  );

  assert.deepEqual(coverage.fields.titleAjami, {
    source: "modules[].titleHa",
    total: 1,
    covered: 0,
    uncovered: 1,
    coveragePercent: 0,
  });
  assert.deepEqual(coverage.uncoveredWords, [
    { word: "missing", occurrences: 5 },
    { word: "n12", occurrences: 1 },
  ]);
  assert.deepEqual(coverage.fields.templateHaAjami, {
    source: "modules[].quiz[].templateHa",
    total: 1,
    covered: 1,
    uncovered: 0,
    coveragePercent: 100,
  });
  assert.deepEqual(coverage.fields.answerFormulaAjami, {
    source: "modules[].quiz[].answerFormula",
    total: 1,
    covered: 1,
    uncovered: 0,
    coveragePercent: 100,
  });
  assert.deepEqual(coverage.fields.distractorFormulasAjami, {
    source: "modules[].quiz[].distractorFormulas[]",
    total: 3,
    covered: 1,
    uncovered: 2,
    coveragePercent: 33.33,
  });
  assert.deepEqual(coverage.fields["heading.ajami"], {
    source: "modules[].lessons[].heading.ha",
    total: 2,
    covered: 1,
    uncovered: 1,
    coveragePercent: 50,
  });
  assert.equal(
    coverage.invariant,
    "A managed Ajami field holds a non-null value if and only if its entire Boko source string was composed from ratified lexicon entries. null (or an absent key, where the schema never had one) means no lexicon coverage, which the renderer resolves to audio playback. ajami_validated stays false on every entry and is never set true."
  );
});

test("regeneration preserves non-managed values and key order", () => {
  const original = fixture();
  const { content } = regenerateContentData(original, map);
  const strip = (value) => {
    const copy = structuredClone(value);
    for (const item of [...copy.modules, ...copy.activities, ...copy.glossary]) {
      for (const field of [
        "titleAjami",
        "subjectAjami",
        "textExplanationAjami",
        "topicAjami",
        "termAjami",
        "ajami_validated",
      ]) delete item[field];
    }
    for (const module of copy.modules) {
      for (const lesson of module.lessons ?? []) delete lesson.heading?.ajami;
      for (const collection of [module.quiz ?? [], module.quizQuestions ?? []]) {
        for (const quiz of collection) {
          delete quiz.templateHaAjami;
          delete quiz.answerFormulaAjami;
          delete quiz.distractorFormulasAjami;
        }
      }
    }
    return copy;
  };
  assert.deepEqual(strip(content), strip(original));
  assert.deepEqual(
    Object.keys(strip(content).modules[0]),
    Object.keys(strip(original).modules[0])
  );
});

test("regeneration refuses to overwrite a divergent quizQuestions mirror", () => {
  const original = fixture();
  original.modules[0].quizQuestions[0].answerFormula = "Different";
  assert.throws(
    () => regenerateContentData(original, map),
    /Module module-1 quiz and quizQuestions differ/
  );
});

test("regeneration leaves quizQuestions-only modules outside the managed quiz path", () => {
  const original = fixture();
  const quizQuestions = [{
    question: "Keep this scholastic schema unchanged",
    options: ["A", "B"],
    correct: 0,
  }];
  original.modules.push({
    id: "module-2",
    subjectHa: "Subject",
    titleHa: "Known",
    quizQuestions: structuredClone(quizQuestions),
  });
  const { content } = regenerateContentData(original, map);
  assert.deepEqual(content.modules[1].quizQuestions, quizQuestions);
});

test("regeneration composes short nested title and term fields and wipes uncovered values", () => {
  const original = fixture();
  original.modules[0].title = { ha: "Known", ajami: "stale module title" };
  original.modules[0].lessons.push(
    { type: "glossary-card", term: { ha: "Known", ajami: "stale term" } },
    { type: "example", title: { ha: "Known", ajami: "stale lesson title" } },
    { type: "glossary-card", term: { ha: "Missing", ajami: "stale uncovered term" } },
    { type: "example", title: { ha: "Missing", ajami: "stale uncovered lesson title" } }
  );

  const { content, coverage } = regenerateContentData(original, map);
  const module = content.modules[0];

  assert.deepEqual(module.title, { ha: "Known", ajami: "ک" });
  assert.deepEqual(module.lessons[2].term, { ha: "Known", ajami: "ک" });
  assert.deepEqual(module.lessons[3].title, { ha: "Known", ajami: "ک" });
  assert.strictEqual(module.lessons[4].term.ajami, null);
  assert.notStrictEqual(module.lessons[4].term.ajami, module.lessons[4].term.ha);
  assert.strictEqual(module.lessons[5].title.ajami, null);
  assert.notStrictEqual(module.lessons[5].title.ajami, module.lessons[5].title.ha);
  assert.deepEqual(coverage.fields["title.ajami"], {
    source: "modules[].title.ha",
    total: 1,
    covered: 1,
    uncovered: 0,
    coveragePercent: 100,
  });
  assert.deepEqual(coverage.fields["lessonTerm.ajami"], {
    source: "modules[].lessons[].term.ha",
    total: 2,
    covered: 1,
    uncovered: 1,
    coveragePercent: 50,
  });
  assert.deepEqual(coverage.fields["lessonTitle.ajami"], {
    source: "modules[].lessons[].title.ha",
    total: 2,
    covered: 1,
    uncovered: 1,
    coveragePercent: 50,
  });
});

test("writer creates a pre-write backup and deterministic JSON artifacts", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajami-content-write-"));
  try {
    const contentPath = path.join(temporaryDirectory, "content.json");
    const coveragePath = path.join(temporaryDirectory, "coverage.json");
    const backupPath = path.join(temporaryDirectory, "backup.json");
    const original = fixture();
    fs.writeFileSync(contentPath, `${JSON.stringify(original, null, 2)}\n`);
    const generated = regenerateContentData(original, map);
    writeRegeneratedContent({ ...generated, contentPath, coveragePath, backupPath });
    assert.deepEqual(JSON.parse(fs.readFileSync(backupPath, "utf8")), original);
    assert.deepEqual(JSON.parse(fs.readFileSync(contentPath, "utf8")), generated.content);
    assert.deepEqual(JSON.parse(fs.readFileSync(coveragePath, "utf8")), generated.coverage);
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
