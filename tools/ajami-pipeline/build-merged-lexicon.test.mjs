import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  QUIZ_SOURCE,
  SHORT300_SOURCE,
  SHORTFIELD_SOURCE,
  buildMergedLexicon,
  ratifiedEntries,
  writeMergedLexicon,
} from "./build-merged-lexicon.mjs";

test("merged lexicon appends all ratified queues with source provenance", () => {
  const { lexicon, map, counts } = buildMergedLexicon();
  assert.equal(
    counts.merged,
    counts.top500 + counts.short300Ratified + counts.quizRatified + counts.shortfieldRatified
  );
  assert.equal(lexicon.entries.length, counts.merged);
  assert.equal(map.size, counts.merged);
  assert.deepEqual(lexicon.entries[counts.top500].source, [SHORT300_SOURCE]);
  assert.deepEqual(
    lexicon.entries[counts.top500 + counts.short300Ratified].source,
    [QUIZ_SOURCE]
  );
  assert.deepEqual(
    lexicon.entries[counts.top500 + counts.short300Ratified + counts.quizRatified].source,
    [SHORTFIELD_SOURCE]
  );
  const shortfieldEntries = lexicon.entries.slice(
    counts.top500 + counts.short300Ratified + counts.quizRatified
  );
  assert.equal(shortfieldEntries.length, counts.shortfieldRatified);
  assert.equal(counts.shortfieldRatified, 12);
  assert.ok(shortfieldEntries.every((entry) =>
    Array.isArray(entry.source) && entry.source.length === 1 && entry.source[0] === SHORTFIELD_SOURCE
  ));
  assert.ok(map.has("idan"));
  assert.ok(map.has("jera"));
  assert.ok(map.has("eh"));
  assert.equal(map.get("halima")?.boko, "Halima");
});

test("ratifiedEntries accepts answered or not-applicable questions only", () => {
  const queue = {
    entries: [
      { status: "human_reviewed", openQuestions: [{ reviewerDecision: "chosen" }] },
      {
        status: "human_reviewed",
        openQuestions: [{
          reviewerDecision: null,
          resolution: { state: "not_applicable", reason: "human ruling" },
        }],
      },
      { status: "human_reviewed", openQuestions: [{ reviewerDecision: null }] },
      { status: "candidate", openQuestions: [{ reviewerDecision: "chosen" }] },
      { status: "excluded", openQuestions: [{ reviewerDecision: "chosen" }] },
    ],
  };
  assert.deepEqual(ratifiedEntries(queue), queue.entries.slice(0, 2));
});

test("merged lexicon builder throws instead of resolving a key collision", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajami-merged-collision-"));
  try {
    const original = buildMergedLexicon().lexicon;
    const topPath = path.join(temporaryDirectory, "top.json");
    const shortPath = path.join(temporaryDirectory, "short.json");
    const quizPath = path.join(temporaryDirectory, "quiz.json");
    const shortfieldPath = path.join(temporaryDirectory, "shortfield.json");
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
    fs.writeFileSync(quizPath, JSON.stringify({ entries: [] }));
    fs.writeFileSync(shortfieldPath, JSON.stringify({ entries: [] }));
    assert.throws(
      () => buildMergedLexicon({ top500Path: topPath, short300Path: shortPath, quizPath, shortfieldPath }),
      /key collision.*"a"/iu
    );
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("merged lexicon excludes incomplete short-field entries through the shared ratification contract", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajami-merged-shortfield-contract-"));
  try {
    const shortfieldPath = path.join(temporaryDirectory, "shortfield.json");
    const shortfieldQueue = JSON.parse(fs.readFileSync(
      new URL("./data/review-queue-shortfield.json", import.meta.url),
      "utf8"
    ));
    const withheld = shortfieldQueue.entries[0];
    withheld.openQuestions[0].reviewerDecision = null;
    delete withheld.openQuestions[0].resolution;
    fs.writeFileSync(shortfieldPath, JSON.stringify(shortfieldQueue));

    const { map, counts } = buildMergedLexicon({ shortfieldPath });
    assert.equal(counts.shortfieldRatified, 11);
    assert.equal(map.has(withheld.boko.toLocaleLowerCase("ha")), false);
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("merged lexicon fails closed on normalized case-folded collisions", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajami-merged-normalized-collision-"));
  try {
    const original = buildMergedLexicon().lexicon;
    const topPath = path.join(temporaryDirectory, "top.json");
    const shortPath = path.join(temporaryDirectory, "short.json");
    const quizPath = path.join(temporaryDirectory, "quiz.json");
    const shortfieldPath = path.join(temporaryDirectory, "shortfield.json");
    const quizQueue = JSON.parse(fs.readFileSync(
      new URL("./data/review-queue-quiz.json", import.meta.url),
      "utf8"
    ));
    const misali = quizQueue.entries.find((entry) => entry.boko === "misalin");
    assert.ok(misali);
    fs.writeFileSync(topPath, JSON.stringify({ ...original, entries: [{ ...original.entries[0], boko: "Misali" }] }));
    fs.writeFileSync(shortPath, JSON.stringify({ entries: [] }));
    fs.writeFileSync(quizPath, JSON.stringify({ entries: [{ ...misali, boko: "misali" }] }));
    fs.writeFileSync(shortfieldPath, JSON.stringify({ entries: [] }));

    assert.throws(
      () => buildMergedLexicon({ top500Path: topPath, short300Path: shortPath, quizPath, shortfieldPath }),
      /key collision.*"misali"/iu
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
