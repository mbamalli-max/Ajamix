import assert from "node:assert/strict";
import test from "node:test";

import { formatCodePoints } from "./tokenizer.mjs";
import { migrateCandidateFullNfc } from "./migrate-candidate-full-nfc.mjs";

const nonNfc = "\u0628\u0651\u064e";
const nfc = nonNfc.normalize("NFC");

function withoutMigratedFields(entry) {
  const { candidateFullAjami, candidateFullCodepoints, ...rest } = entry;
  return rest;
}

test("candidate-full NFC migration changes only non-NFC generated snapshots and is idempotent", () => {
  const original = {
    queueMetadata: { keep: ["exactly", "as-is"] },
    entries: [
      {
        id: "change",
        candidateFullAjami: nonNfc,
        candidateFullCodepoints: formatCodePoints(nonNfc),
        provisionalAjami: nonNfc,
        ajamiCodepoints: [],
        openQuestions: [{ candidateAnswer: "human decision" }],
        reviewerDecision: "preserve",
      },
      {
        id: "already-nfc",
        candidateFullAjami: nfc,
        candidateFullCodepoints: formatCodePoints(nfc),
        reviewerNotes: "unchanged",
      },
      {
        id: "null",
        candidateFullAjami: null,
        candidateFullCodepoints: [],
        candidateAnswer: "unchanged",
      },
    ],
  };
  const inputQueue = structuredClone(original);
  const inputSnapshot = structuredClone(inputQueue);

  const first = migrateCandidateFullNfc(inputQueue);
  assert.equal(first.stringsChanged, 1);
  assert.equal(first.arraysChanged, 1);
  assert.notEqual(first.queue, inputQueue);
  assert.deepEqual(inputQueue, inputSnapshot);
  assert.equal(inputQueue.entries[0].candidateFullAjami, nonNfc);
  assert.deepEqual(inputQueue.entries[0].candidateFullCodepoints, formatCodePoints(nonNfc));
  assert.equal(first.queue.entries[0].candidateFullAjami, nfc);
  assert.deepEqual(first.queue.entries[0].candidateFullCodepoints, formatCodePoints(nfc));
  assert.equal(first.queue.entries[2].candidateFullAjami, null);

  for (let index = 0; index < first.queue.entries.length; index += 1) {
    assert.deepEqual(
      withoutMigratedFields(first.queue.entries[index]),
      withoutMigratedFields(original.entries[index])
    );
  }
  assert.deepEqual(first.queue.queueMetadata, original.queueMetadata);

  const afterFirst = JSON.stringify(first.queue);
  const second = migrateCandidateFullNfc(first.queue);
  assert.equal(second.stringsChanged, 0);
  assert.equal(second.arraysChanged, 0);
  assert.notEqual(second.queue, first.queue);
  assert.equal(JSON.stringify(first.queue), afterFirst);
  assert.equal(JSON.stringify(second.queue), afterFirst);
});
