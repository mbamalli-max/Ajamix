import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { applyTypeBatch } from "./ratify-apply-batch-short.mjs";
import { applyKBatch } from "./ratify-apply-k-batch.mjs";
import { applyRatification } from "./ratify-apply.mjs";

const SHORT = "short — fixture";
const LONG = "long — fixture";
const KAF = "kaf — U+06A9";
const QAF = "qaf — U+0642";

function fixtureQueue() {
  return {
    entries: [
      {
        boko: "alpha",
        status: "provisional",
        reviewerDecision: null,
        reviewerNotes: null,
        openQuestions: [
          {
            type: "VOWEL_LENGTH",
            position: 1,
            options: [SHORT, LONG],
            reviewerDecision: null,
            reviewerNotes: null,
          },
        ],
      },
      {
        boko: "beta",
        status: "provisional",
        reviewerDecision: null,
        reviewerNotes: null,
        openQuestions: [
          {
            type: "K_ARTICULATION",
            position: 0,
            options: [KAF, QAF],
            reviewerDecision: null,
            reviewerNotes: null,
          },
        ],
      },
    ],
  };
}

function tempFixture(t, queue = fixtureQueue()) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ajamix-ratify-"));
  const file = path.join(directory, "queue.json");
  fs.writeFileSync(file, JSON.stringify(queue, null, 2) + "\n");
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return file;
}

function readQueue(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

test("all three ratification writers apply only their intended synthetic-fixture changes", (t) => {
  const singleFile = tempFixture(t);
  applyRatification({
    path: singleFile,
    boko: "alpha",
    type: "VOWEL_LENGTH",
    position: 1,
    decision: LONG,
    source: "bargery-1934",
  });
  const single = readQueue(singleFile);
  assert.equal(single.entries[0].openQuestions[0].reviewerDecision, LONG);
  assert.equal(single.entries[0].openQuestions[0].lengthSource, "bargery-1934");
  assert.equal(single.entries[0].openQuestions[0].ajamiEvidence, "none");
  assert.equal(single.entries[0].openQuestions[0].encodingRule, "ajamix-standard");
  assert.equal(single.entries[0].openQuestions[0].reviewStatus, "human-approved");
  assert.equal(single.entries[0].status, "human_reviewed");
  assert.equal(single.entries[1].openQuestions[0].reviewerDecision, null);

  const shortFile = tempFixture(t);
  const shortResult = applyTypeBatch({
    path: shortFile,
    type: "VOWEL_LENGTH",
    defaultOption: "short",
    words: ["alpha"],
    source: "mfa-v3.0.0",
  });
  const short = readQueue(shortFile);
  assert.equal(shortResult.applied, 1);
  assert.equal(short.entries[0].openQuestions[0].reviewerDecision, SHORT);
  assert.equal(short.entries[0].openQuestions[0].lengthSource, "mfa-v3.0.0");
  assert.equal(short.entries[0].status, "human_reviewed");
  assert.equal(short.entries[1].openQuestions[0].reviewerDecision, null);

  const kFile = tempFixture(t);
  const kResult = applyKBatch({
    path: kFile,
    defaultDecision: "qaf",
    words: ["beta"],
    source: "bargery-1934",
  });
  const kQueue = readQueue(kFile);
  assert.equal(kResult.applied, 1);
  assert.equal(kQueue.entries[1].openQuestions[0].reviewerDecision, QAF);
  assert.equal(kQueue.entries[1].openQuestions[0].lengthSource, "n/a");
  assert.equal(kQueue.entries[1].openQuestions[0].reviewStatus, "human-approved");
  assert.equal(kQueue.entries[1].status, "human_reviewed");
  assert.equal(kQueue.entries[0].openQuestions[0].reviewerDecision, null);
});

test("single apply rejects an answered question without --overwrite and preserves every byte", (t) => {
  const queue = fixtureQueue();
  queue.entries[0].openQuestions[0].reviewerDecision = SHORT;
  queue.entries[0].openQuestions[0].reviewerNotes = "earlier human decision";
  const file = tempFixture(t, queue);
  const before = fs.readFileSync(file);

  assert.throws(
    () =>
      applyRatification({
        path: file,
        boko: "alpha",
        type: "VOWEL_LENGTH",
        position: 1,
        decision: LONG,
      }),
    /refusing to overwrite answered question alpha\|VOWEL_LENGTH\|1/u
  );
  assert.deepEqual(fs.readFileSync(file), before);

  applyRatification({
    path: file,
    boko: "alpha",
    type: "VOWEL_LENGTH",
    position: 1,
    decision: LONG,
    overwrite: true,
  });
  assert.equal(readQueue(file).entries[0].openQuestions[0].reviewerDecision, LONG);
});

test("both batch writers require explicit overwrite authority before replacing answers", (t) => {
  const shortQueue = fixtureQueue();
  shortQueue.entries[0].openQuestions[0].reviewerDecision = LONG;
  shortQueue.entries[0].openQuestions[0].reviewerNotes = "earlier human decision";
  const shortFile = tempFixture(t, shortQueue);
  assert.equal(
    applyTypeBatch({
      path: shortFile,
      type: "VOWEL_LENGTH",
      defaultOption: "short",
      words: ["alpha"],
    }).applied,
    0
  );
  assert.equal(readQueue(shortFile).entries[0].openQuestions[0].reviewerDecision, LONG);
  applyTypeBatch({
    path: shortFile,
    type: "VOWEL_LENGTH",
    defaultOption: "short",
    words: ["alpha"],
    overwrite: true,
  });
  assert.equal(readQueue(shortFile).entries[0].openQuestions[0].reviewerDecision, SHORT);

  const kQueue = fixtureQueue();
  kQueue.entries[1].openQuestions[0].reviewerDecision = KAF;
  kQueue.entries[1].openQuestions[0].reviewerNotes = "earlier human decision";
  const kFile = tempFixture(t, kQueue);
  assert.equal(
    applyKBatch({ path: kFile, defaultDecision: "qaf", words: ["beta"] }).applied,
    0
  );
  assert.equal(readQueue(kFile).entries[1].openQuestions[0].reviewerDecision, KAF);
  applyKBatch({
    path: kFile,
    defaultDecision: "qaf",
    words: ["beta"],
    overwrite: true,
  });
  assert.equal(readQueue(kFile).entries[1].openQuestions[0].reviewerDecision, QAF);
});

test("an injected stray mutation is named by the scope assertion and blocks the write", (t) => {
  const file = tempFixture(t);
  const before = fs.readFileSync(file);

  assert.throws(
    () =>
      applyTypeBatch({
        path: file,
        type: "VOWEL_LENGTH",
        defaultOption: "short",
        words: ["alpha"],
        beforeWriteAssertion(queue) {
          const stray = queue.entries[1].openQuestions[0];
          stray.reviewerDecision = KAF;
          stray.reviewerSuppliedSequence = "ُو";
          stray.reviewerSuppliedCodepoints = ["U+064F", "U+0648"];
          stray.reviewerNotes = "not authorized";
          queue.entries[1].status = "human_reviewed";
          queue.entries[1].reviewerDecision = "approved_as_proposed";
          queue.entries[1].reviewerNotes = "not authorized";
        },
      }),
    (error) => {
      assert.match(error.message, /RATIFICATION WRITE SCOPE FAILED/u);
      assert.match(error.message, /beta\|K_ARTICULATION\|0:/u);
      assert.match(error.message, /beta\|entry:/u);
      assert.match(error.message, /not authorized/u);
      return true;
    }
  );
  assert.deepEqual(fs.readFileSync(file), before);
});

test("the retired short writer has no implicit decision and validates provenance sources", (t) => {
  const file = tempFixture(t);
  assert.throws(
    () => applyTypeBatch({ path: file, type: "VOWEL_LENGTH", words: ["alpha"] }),
    /--default <option>/u
  );
  assert.throws(
    () =>
      applyRatification({
        path: file,
        boko: "alpha",
        type: "VOWEL_LENGTH",
        position: 1,
        decision: SHORT,
        source: "bulk-default",
      }),
    /invalid --source bulk-default/u
  );
});
