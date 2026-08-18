import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { ratificationFailures } from "./gates/ratification-gate.mjs";
import {
  applyMfaBatch,
  applyReviewBatch,
  buildReviewRows,
  formatReviewTable,
  renderReviewBatch,
} from "./review-batch.mjs";

const SHORT_A = "short — U+064E";
const LONG_A = "long — U+064E U+0627";
const EXCEPTION = "lexical exception — reviewer must supply the exact Unicode replacement sequence";
const KAF = "kaf — U+06A9";
const QAF = "qaf — U+0642";

function fixtureQueue() {
  return {
    schemaVersion: 2,
    taskId: "review-batch-test",
    entries: [
      {
        boko: "alpha",
        normalizedBoko: "alpha",
        status: "provisional",
        reviewerDecision: null,
        reviewerNotes: null,
        openQuestions: [
          {
            type: "VOWEL_LENGTH",
            position: 0,
            letter: "a",
            options: [SHORT_A, LONG_A, EXCEPTION],
            reviewerDecision: null,
          },
        ],
      },
      {
        boko: "beta",
        normalizedBoko: "beta",
        status: "provisional",
        reviewerDecision: null,
        reviewerNotes: null,
        openQuestions: [
          {
            type: "VOWEL_LENGTH",
            position: 3,
            letter: "a",
            options: [SHORT_A, LONG_A, EXCEPTION],
            reviewerDecision: null,
          },
        ],
      },
      {
        boko: "kilo",
        normalizedBoko: "kilo",
        status: "provisional",
        reviewerDecision: null,
        reviewerNotes: null,
        openQuestions: [
          {
            type: "K_ARTICULATION",
            position: 0,
            options: [KAF, QAF],
            reviewerDecision: null,
          },
        ],
      },
    ],
  };
}

function fixtureReport() {
  return {
    proposals: [
      {
        word: "alpha",
        questionType: "VOWEL_LENGTH",
        position: 0,
        letter: "a",
        proposedLength: "long",
        sourcePhoneString: "aː",
      },
    ],
  };
}

function tempFiles(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ajamix-review-batch-"));
  const queuePath = path.join(directory, "queue.json");
  const proposalPath = path.join(directory, "proposals.json");
  fs.writeFileSync(queuePath, `${JSON.stringify(fixtureQueue(), null, 2)}\n`);
  fs.writeFileSync(proposalPath, `${JSON.stringify(fixtureReport(), null, 2)}\n`);
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return { queuePath, proposalPath };
}

function readQueue(queuePath) {
  return JSON.parse(fs.readFileSync(queuePath, "utf8"));
}

test("render rows include stable indices, preview output, MFA/default comparison, and options", () => {
  const calls = [];
  const rows = buildReviewRows(fixtureQueue(), "VOWEL_LENGTH", fixtureReport(), (...args) => {
    calls.push(args.slice(1, 4));
    return `rendered-${args[0].boko}`;
  });
  assert.deepEqual(
    rows.map((row) => [row.index, row.boko, row.position, row.letter]),
    [
      [1, "alpha", 0, "a"],
      [2, "beta", 3, "a"],
    ]
  );
  assert.deepEqual(calls[0], ["VOWEL_LENGTH", 0, SHORT_A]);
  assert.equal(rows[0].currentRenderedForm, "rendered-alpha");
  assert.equal(rows[0].mfaProposal.proposedLength, "long");
  assert.equal(rows[0].mfaDiffersFromDefault, true);
  assert.equal(rows[1].mfaProposal, null);

  const table = formatReviewTable("VOWEL_LENGTH", rows);
  assert.match(table, /Open VOWEL_LENGTH questions: 2/u);
  assert.match(table, /long \(differs from short default\)/u);
  assert.match(table, /1: short — U\+064E; 2: long/u);
});

test("normal apply accepts a default plus index or word@position exceptions", (t) => {
  const { queuePath } = tempFiles(t);
  const result = applyReviewBatch({
    path: queuePath,
    type: "VOWEL_LENGTH",
    defaultOption: "short",
    exceptions: "2",
    source: "bargery-1934",
  });
  assert.equal(result.applied, 2);
  assert.equal(result.exceptions, 1);
  const queue = readQueue(queuePath);
  assert.equal(queue.entries[0].openQuestions[0].reviewerDecision, SHORT_A);
  assert.equal(queue.entries[1].openQuestions[0].reviewerDecision, LONG_A);
  assert.equal(queue.entries[0].openQuestions[0].lengthSource, "bargery-1934");
  assert.deepEqual(ratificationFailures(queue), []);

  const second = tempFiles(t);
  applyReviewBatch({
    path: second.queuePath,
    type: "K_ARTICULATION",
    defaultOption: "kaf",
    exceptions: "kilo@0",
    source: "mfa-v3.0.0",
  });
  const consonant = readQueue(second.queuePath).entries[2].openQuestions[0];
  assert.equal(consonant.reviewerDecision, QAF);
  assert.equal(consonant.lengthSource, "n/a");
});

test("MFA mode applies only existing accepted proposals and records the fixed source", (t) => {
  const { queuePath, proposalPath } = tempFiles(t);
  const result = applyMfaBatch({ path: queuePath, proposalPath, type: "VOWEL_LENGTH" });
  assert.deepEqual(
    { applied: result.applied, available: result.available, rejected: result.rejected, missing: result.missing },
    { applied: 1, available: 1, rejected: 0, missing: 1 }
  );
  const queue = readQueue(queuePath);
  const alpha = queue.entries[0].openQuestions[0];
  const beta = queue.entries[1].openQuestions[0];
  assert.equal(alpha.reviewerDecision, LONG_A);
  assert.equal(alpha.lengthSource, "mfa-v3.0.0");
  assert.equal(alpha.reviewStatus, "human-approved");
  assert.equal(beta.reviewerDecision, null);
  assert.deepEqual(ratificationFailures(queue), []);
});

test("MFA mode refuses a rejection locator with no proposal and leaves bytes unchanged", (t) => {
  const { queuePath, proposalPath } = tempFiles(t);
  const before = fs.readFileSync(queuePath);
  assert.throws(
    () =>
      applyMfaBatch({
        path: queuePath,
        proposalPath,
        type: "VOWEL_LENGTH",
        exceptions: "beta@3",
      }),
    /proposal does not exist/u
  );
  assert.deepEqual(fs.readFileSync(queuePath), before);
});

test("review apply retains the ratification write-scope assertion", (t) => {
  const { queuePath } = tempFiles(t);
  const before = fs.readFileSync(queuePath);
  assert.throws(
    () =>
      applyReviewBatch({
        path: queuePath,
        type: "K_ARTICULATION",
        defaultOption: "kaf",
        beforeWriteAssertion(queue) {
          queue.entries[0].openQuestions[0].reviewerDecision = LONG_A;
        },
      }),
    /RATIFICATION WRITE SCOPE FAILED.*alpha\|VOWEL_LENGTH\|0/su
  );
  assert.deepEqual(fs.readFileSync(queuePath), before);
});

// Counts must come from a fixture, never from the live queue: ratification
// legitimately drives the live open counts to zero, so a hardcoded live count
// fails precisely when the tool it tests is working (cf. slice 34, slice 35c).
test("render batches count only open questions of the requested type", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "review-batch-render-"));
  try {
    const queuePath = path.join(directory, "queue.json");
    const queue = fixtureQueue();
    fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n");

    const open = queue.entries.flatMap((entry) =>
      (entry.openQuestions ?? []).filter(
        (question) => question.type === "K_ARTICULATION" && question.reviewerDecision == null
      )
    );

    const before = fs.readFileSync(queuePath);
    const rendered = renderReviewBatch({ path: queuePath, type: "K_ARTICULATION" });
    assert.equal(rendered.rows.length, open.length);
    assert.match(rendered.output, new RegExp(`Open K_ARTICULATION questions: ${open.length}`, "u"));
    assert.deepEqual(fs.readFileSync(queuePath), before, "render must not write");
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("rendering the live queue is read-only", () => {
  const quizPath = new URL("./data/review-queue-quiz.json", import.meta.url);
  const before = fs.readFileSync(quizPath);
  renderReviewBatch({ path: quizPath, type: "K_ARTICULATION" });
  renderReviewBatch({ path: quizPath, type: "GEMINATION" });
  assert.deepEqual(fs.readFileSync(quizPath), before);
});
