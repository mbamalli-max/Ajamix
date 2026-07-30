import test from "node:test";
import assert from "node:assert/strict";

import { auditCorpus } from "./audit-corpus.mjs";

const FULL_AUDIT = auditCorpus();

test("full read-only corpus audit reproduces all preliminary occurrence counts", () => {
  const audit = FULL_AUDIT;
  assert.equal(audit.corpus.totalHausaFieldsScanned, 7227);
  assert.equal(audit.summary.totalOccurrences, 3082);
  assert.equal(audit.preliminaryCountVerification.actualApostropheY, 254);
  assert.equal(audit.preliminaryCountVerification.actualOther, 2828);
  assert.equal(audit.preliminaryCountVerification.totalMatches, true);
  assert.equal(audit.preliminaryCountVerification.apostropheYMatches, true);
  assert.equal(audit.preliminaryCountVerification.otherMatches, true);
});

test("audit accounts for apostrophe code points and fields exactly", () => {
  const audit = FULL_AUDIT;
  assert.deepEqual(audit.summary.byApostropheCodePoint, {
    "U+0027": 1652,
    "U+2019": 1430,
  });
  assert.deepEqual(audit.summary.byFieldType, {
    audioScript: 1295,
    textExplanationHa: 726,
    ha: 716,
    templateHa: 220,
    titleHa: 60,
    questionHa: 56,
    definitionHa: 6,
    termHa: 3,
  });
});

test("audit distinguishes no-path, stored-Ajami bypass, eager, and Ajami-session paths", () => {
  const audit = FULL_AUDIT;
  assert.deepEqual(audit.summary.byConverterReachability, {
    NO_CALL_PATH: 2021,
    AJAMI_BRANCH: 1011,
    EAGER_LOCALIZED_PAIR: 41,
    STORED_AJAMI_BYPASS: 9,
  });
  assert.deepEqual(audit.summary.byCurrentEngineWouldAlter, {
    false: 2030,
    true: 1052,
  });
});

test("all 2,828 unresolved cases are represented in the review queue", () => {
  const audit = FULL_AUDIT;
  assert.equal(audit.summary.reviewQueueCount, 2828);
  assert.equal(audit.summary.allUnresolvedQueued, true);
  assert.equal(audit.reviewQueue.length, 2828);
  assert.equal(new Set(audit.reviewQueue).size, 2828);
  const occurrencesById = new Map(
    audit.occurrences.map((occurrence) => [occurrence.occurrenceId, occurrence])
  );
  assert.ok(
    audit.reviewQueue.every(
      (occurrenceId) =>
        occurrencesById.get(occurrenceId)?.reviewRequired === true &&
        occurrencesById.get(occurrenceId)?.outputCodePoint === null
    )
  );
});
