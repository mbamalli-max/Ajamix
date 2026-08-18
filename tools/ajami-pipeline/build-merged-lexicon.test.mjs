import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  SHORT300_SOURCE,
  buildMergedLexicon,
  ratifiedEntries,
  writeMergedLexicon,
} from "./build-merged-lexicon.mjs";

test("merged lexicon contains exactly the 797 ratified, collision-free entries", () => {
  const { lexicon, map, counts } = buildMergedLexicon();
  assert.deepEqual(counts, { top500: 500, short300Ratified: 297, merged: 797 });
  assert.equal(lexicon.entries.length, 797);
  assert.equal(map.size, 797);
  assert.deepEqual(lexicon.entries[500].source, [SHORT300_SOURCE]);
  assert.ok(map.has("idan"));
  assert.ok(map.has("jera"));
});

test("ratifiedEntries excludes any entry with an unresolved question", () => {
  const queue = {
    entries: [
      { status: "human_reviewed", openQuestions: [{ reviewerDecision: "chosen" }] },
      { status: "human_reviewed", openQuestions: [{ reviewerDecision: null }] },
      { status: "candidate", openQuestions: [{ reviewerDecision: "chosen" }] },
    ],
  };
  assert.equal(ratifiedEntries(queue).length, 1);
});

test("merged lexicon builder throws instead of resolving a key collision", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajami-merged-collision-"));
  try {
    const original = buildMergedLexicon().lexicon;
    const topPath = path.join(temporaryDirectory, "top.json");
    const shortPath = path.join(temporaryDirectory, "short.json");
    fs.writeFileSync(topPath, JSON.stringify({ ...original, entries: [original.entries[0]] }));
    fs.writeFileSync(shortPath, JSON.stringify({
      entries: [{
        boko: "A",
        status: "human_reviewed",
        tokens: ["VOWEL_A_UNLENGTHENED"],
        category: "native_hausa",
        contextRule: undefined,
        openQuestions: [{
          type: "WORD_INITIAL_CARRIER",
          position: 0,
          reviewerDecision: "hamza-above carrier — U+0623",
        }, {
          type: "WORD_FINAL_VOWEL",
          position: 0,
          reviewerDecision: "short final — U+064E",
        }],
      }],
    }));
    assert.throws(
      () => buildMergedLexicon({ top500Path: topPath, short300Path: shortPath }),
      /key collision.*"a"/iu
    );
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("writeMergedLexicon writes an inspectable artifact to an explicit path", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajami-merged-write-"));
  try {
    const outputPath = path.join(temporaryDirectory, "merged.json");
    const { lexicon } = buildMergedLexicon();
    writeMergedLexicon(lexicon, outputPath);
    assert.deepEqual(JSON.parse(fs.readFileSync(outputPath, "utf8")), lexicon);
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
