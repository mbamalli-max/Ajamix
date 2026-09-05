import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { buildMergedLexicon } from "./build-merged-lexicon.mjs";
import { analyzeAjamiComposition } from "./compose-ajami.mjs";
import {
  regenerateContentData,
  writeRegeneratedContent,
} from "./regenerate-content-ajami.mjs";
import {
  HUMAN_REVIEWED_PROSE_SCHEMA_VERSION,
  validateHumanReviewedProse,
} from "./gates/human-reviewed-prose-gate.mjs";

const LIVE_CONTENT_PATH = new URL("../../app/content.json", import.meta.url);
const HUMAN_REVIEWED_PROSE_PATH = new URL("./data/human-reviewed-prose.json", import.meta.url);

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
    provenance: "lexicon_composed",
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
    provenance: "lexicon_composed",
  });
  assert.deepEqual(coverage.fields.answerFormulaAjami, {
    source: "modules[].quiz[].answerFormula",
    total: 1,
    covered: 1,
    uncovered: 0,
    coveragePercent: 100,
    provenance: "lexicon_composed",
  });
  assert.deepEqual(coverage.fields.distractorFormulasAjami, {
    source: "modules[].quiz[].distractorFormulas[]",
    total: 3,
    covered: 1,
    uncovered: 2,
    coveragePercent: 33.33,
    provenance: "lexicon_composed",
  });
  assert.deepEqual(coverage.fields["heading.ajami"], {
    source: "modules[].lessons[].heading.ha",
    total: 2,
    covered: 1,
    uncovered: 1,
    coveragePercent: 50,
    provenance: "lexicon_composed",
  });
  assert.equal(
    coverage.invariant,
    "A non-null managed Ajami field is valid iff its provenance is exactly one of: lexicon_composed — produced by the existing composer, unchanged, for every field family this pipeline already manages; or human_reviewed_prose — produced only by regenerating from an approved entry in a dedicated, gated review-source file, for prose fields only, starting with gapTeaser. No third path exists. A field is never valid because it is merely non-null, because it looks well-formed, or because the ordinary content validator (validate-content.mjs) passed — that validator checks structural shape, not linguistic provenance, and must never be treated as establishing either."
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
    provenance: "lexicon_composed",
  });
  assert.deepEqual(coverage.fields["lessonTerm.ajami"], {
    source: "modules[].lessons[].term.ha",
    total: 2,
    covered: 1,
    uncovered: 1,
    coveragePercent: 50,
    provenance: "lexicon_composed",
  });
  assert.deepEqual(coverage.fields["lessonTitle.ajami"], {
    source: "modules[].lessons[].title.ha",
    total: 2,
    covered: 1,
    uncovered: 1,
    coveragePercent: 50,
    provenance: "lexicon_composed",
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

function liveContent() {
  return JSON.parse(fs.readFileSync(LIVE_CONTENT_PATH, "utf8"));
}

function humanReviewedProsePacket() {
  return JSON.parse(fs.readFileSync(HUMAN_REVIEWED_PROSE_PATH, "utf8"));
}

function allManagedAjamiRecords(content) {
  const records = [];
  const add = (coverageKey, source, ajami, moduleId) => {
    records.push({ coverageKey, source, ajami, moduleId });
  };
  for (const module of content.modules) {
    add("titleAjami", module.titleHa, module.titleAjami, module.id);
    add("subjectAjami", module.subjectHa, module.subjectAjami, module.id);
    add("textExplanationAjami", module.textExplanationHa, module.textExplanationAjami, module.id);
    if (module.gapTeaser) add("gapTeaser", module.gapTeaser.ha, module.gapTeaser.ajami, module.id);
    if (module.title) add("title.ajami", module.title.ha, module.title.ajami, module.id);
    for (const lesson of module.lessons ?? []) {
      if (lesson.heading) add("heading.ajami", lesson.heading.ha, lesson.heading.ajami, module.id);
      if (lesson.term) add("lessonTerm.ajami", lesson.term.ha, lesson.term.ajami, module.id);
      if (lesson.title) add("lessonTitle.ajami", lesson.title.ha, lesson.title.ajami, module.id);
    }
    for (const quiz of module.quiz ?? []) {
      add("templateHaAjami", quiz.templateHa, quiz.templateHaAjami, module.id);
      add("answerFormulaAjami", quiz.answerFormula, quiz.answerFormulaAjami, module.id);
      for (const [index, ajami] of (quiz.distractorFormulasAjami ?? []).entries()) {
        add("distractorFormulasAjami", quiz.distractorFormulas?.[index], ajami, module.id);
      }
    }
  }
  for (const activity of content.activities) {
    add("topicAjami", activity.topicHa, activity.topicAjami, activity.activityId);
  }
  for (const entry of content.glossary) {
    add("termAjami", entry.termHa, entry.termAjami, entry.term);
  }
  return records;
}

test("generated coverage enforces declared provenance for every non-null managed Ajami value", () => {
  const original = liveContent();
  const packet = humanReviewedProsePacket();
  const { map, counts } = buildMergedLexicon();
  const { content, coverage } = regenerateContentData(original, map, {
    lexiconEntryCount: counts.merged,
    humanReviewedProsePacket: packet,
  });
  const records = allManagedAjamiRecords(content);
  const approvedByPath = new Map(
    packet.entries
      .filter((entry) => entry.status === "approved")
      .map((entry) => [`${entry.moduleId}\u0000${entry.fieldPath}`, entry])
  );

  for (const [coverageKey, family] of Object.entries(coverage.fields)) {
    assert.ok(records.some((record) => record.coverageKey === coverageKey), `${coverageKey} has no real field walk`);
    assert.ok(
      ["lexicon_composed", "human_reviewed_prose"].includes(family.provenance),
      `${coverageKey} has unknown provenance`
    );
  }
  for (const record of records.filter((candidate) => candidate.ajami != null)) {
    const family = coverage.fields[record.coverageKey];
    assert.ok(family, `${record.coverageKey} is non-null without declared provenance`);
    if (family.provenance === "lexicon_composed") {
      assert.equal(
        analyzeAjamiComposition(record.source, map).ajami,
        record.ajami,
        `${record.coverageKey} does not re-derive from the lexicon`
      );
    } else {
      assert.equal(family.provenance, "human_reviewed_prose");
      const approved = approvedByPath.get(`${record.moduleId}\u0000gapTeaser`);
      assert.ok(approved, `${record.moduleId}/gapTeaser is non-null without approval`);
      assert.equal(approved.reviewedAjami, record.ajami);
    }
  }
});

test("full regeneration is deterministic for the same lexicon and prose packet", () => {
  const original = liveContent();
  const packet = humanReviewedProsePacket();
  const { map, counts } = buildMergedLexicon();
  const first = regenerateContentData(original, map, {
    lexiconEntryCount: counts.merged,
    humanReviewedProsePacket: packet,
  });
  const second = regenerateContentData(first.content, map, {
    lexiconEntryCount: counts.merged,
    humanReviewedProsePacket: packet,
  });
  assert.equal(JSON.stringify(second.content), JSON.stringify(first.content));
  assert.equal(JSON.stringify(second.coverage), JSON.stringify(first.coverage));
});

test("a schema-valid empty prose packet clears every gapTeaser Ajami value", () => {
  const packet = { schemaVersion: HUMAN_REVIEWED_PROSE_SCHEMA_VERSION, entries: [] };
  const original = liveContent();
  const { map, counts } = buildMergedLexicon();
  assert.deepEqual(validateHumanReviewedProse(packet, original), { ok: true, violations: [] });
  const { content } = regenerateContentData(original, map, {
    lexiconEntryCount: counts.merged,
    humanReviewedProsePacket: packet,
  });
  const gapTeasers = content.modules.filter((module) => module.gapTeaser);
  assert.equal(gapTeasers.length, 27);
  assert.ok(gapTeasers.every((module) => module.gapTeaser.ajami === null));
});

test("the all-deferred pilot leaves every gapTeaser Ajami value null", () => {
  const packet = humanReviewedProsePacket();
  const original = liveContent();
  const { map, counts } = buildMergedLexicon();
  const { content } = regenerateContentData(original, map, {
    lexiconEntryCount: counts.merged,
    humanReviewedProsePacket: packet,
  });
  const gapTeasers = content.modules.filter((module) => module.gapTeaser);
  assert.equal(gapTeasers.length, 27);
  assert.ok(gapTeasers.every((module) => module.gapTeaser.ajami === null));
  for (const moduleId of ["CT09", "CT07", "CT06", "V07", "FL04", "FL05"]) {
    assert.equal(content.modules.find((module) => module.id === moduleId).gapTeaser.ajami, null);
  }
});

test("an approved gapTeaser is regenerated byte-for-byte without mutating the caller input", () => {
  const originalContent = liveContent();
  const originalSnapshot = JSON.stringify(originalContent);
  const packet = structuredClone(humanReviewedProsePacket());
  const approved = packet.entries.find((entry) => entry.moduleId === "CT09");
  Object.assign(approved, {
    status: "approved",
    reviewedAjami: "ب",
    reviewer: "Test reviewer",
    reviewDate: "2026-09-05",
  });
  const { map, counts } = buildMergedLexicon();

  const { content, coverage } = regenerateContentData(originalContent, map, {
    lexiconEntryCount: counts.merged,
    humanReviewedProsePacket: packet,
  });
  const gapTeasers = content.modules.filter((module) => module.gapTeaser);

  assert.strictEqual(
    content.modules.find((module) => module.id === "CT09").gapTeaser.ajami,
    approved.reviewedAjami
  );
  assert.deepEqual(coverage.fields.gapTeaser, {
    source: "modules[].gapTeaser.ha",
    total: 27,
    covered: 1,
    uncovered: 26,
    coveragePercent: 3.7,
    provenance: "human_reviewed_prose",
    pilotEntries: 6,
    pilotApproved: 1,
    pilotDeferred: 5,
  });
  assert.equal(gapTeasers.length, 27);
  assert.equal(
    gapTeasers.filter((module) => module.id !== "CT09" && module.gapTeaser.ajami === null).length,
    26
  );
  assert.equal(JSON.stringify(originalContent), originalSnapshot);
});

test("an invalid prose packet aborts regeneration without mutating the caller input", () => {
  const originalContent = liveContent();
  const originalSnapshot = JSON.stringify(originalContent);
  const badPacket = structuredClone(humanReviewedProsePacket());
  badPacket.entries = [badPacket.entries.find((entry) => entry.moduleId === "CT09")];
  badPacket.entries[0].fieldPath = "summary";
  const { map, counts } = buildMergedLexicon();

  assert.throws(
    () => regenerateContentData(originalContent, map, {
      lexiconEntryCount: counts.merged,
      humanReviewedProsePacket: badPacket,
    }),
    /HUMAN-REVIEWED-PROSE GATE FAILED/u
  );
  assert.equal(JSON.stringify(originalContent), originalSnapshot);
});
