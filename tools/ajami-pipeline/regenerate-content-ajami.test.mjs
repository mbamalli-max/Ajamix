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
    { word: "missing", occurrences: 3 },
  ]);
  assert.equal(
    coverage.invariant,
    "A managed Ajami field holds a non-null value if and only if its entire Boko source string was composed from ratified lexicon entries. null (or an absent key, where the schema never had one) means no lexicon coverage, which the renderer resolves to audio playback. ajami_validated stays false on every entry and is never set true."
  );
});

test("regeneration preserves non-managed values and key order", () => {
  const original = fixture();
  const { content } = regenerateContentData(original, map);
  const strip = (value) => JSON.parse(JSON.stringify(value), (key, item) =>
    ["titleAjami", "subjectAjami", "textExplanationAjami", "topicAjami", "termAjami", "ajami_validated"].includes(key)
      ? undefined
      : item
  );
  assert.deepEqual(strip(content), strip(original));
  assert.deepEqual(
    Object.keys(strip(content.modules[0])),
    Object.keys(strip(original.modules[0]))
  );
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
