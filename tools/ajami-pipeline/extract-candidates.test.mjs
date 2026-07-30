import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import {
  REQUIRED_CANDIDATE_COVERAGE,
} from "./extract-candidates.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = JSON.parse(
  fs.readFileSync(path.join(MODULE_DIR, "data", "candidate-corpus.json"), "utf8")
);

test("candidate corpus is explicitly non-gold and covers every required class", () => {
  assert.equal(CORPUS.materialType, "candidate_corpus_not_gold");
  assert.equal(CORPUS.goldStandard, false);
  assert.deepEqual(CORPUS.coverage.requiredLabels, REQUIRED_CANDIDATE_COVERAGE);
  assert.deepEqual(CORPUS.coverage.missingLabels, []);
});

test("deduplicated candidates retain real complete-sentence context arrays", () => {
  const normalized = CORPUS.candidates.map((candidate) => candidate.normalizedBoko);
  assert.equal(new Set(normalized).size, normalized.length);
  assert.ok(CORPUS.candidates.every((candidate) => candidate.occurrences.length > 0));
  assert.ok(CORPUS.candidates.every((candidate) =>
    candidate.occurrences.every((occurrence) =>
      occurrence.sourceFile === "app/content.json" &&
      occurrence.fieldPath.length > 0 &&
      occurrence.completeSurroundingSentence.includes(occurrence.sourceWord)
    )
  ));
  assert.ok(CORPUS.candidates.some((candidate) => candidate.occurrenceCount > 1));
});

test("all candidate review statuses remain candidate and no output self-approves", () => {
  assert.ok(CORPUS.candidates.every((candidate) => candidate.reviewStatus === "candidate"));
  assert.equal(
    JSON.stringify(CORPUS.candidates).includes('"reviewStatus":"approved"'),
    false
  );
});

test("coverage statistics reproduce the verified full-corpus tokenizer scan", () => {
  const stats = CORPUS.corpusStatistics;
  assert.equal(stats.totalHausaFieldsScanned, 7227);
  assert.equal(stats.totalUniqueNormalizedWords, 3243);
  assert.equal(stats.tokenizationCoveragePercent, 99.8678);
  assert.equal(stats.unknownTokenCount, 1294);
  assert.deepEqual(
    stats.unknownTokens.map(({ token, count }) => [token, count]),
    [["P", 936], ["p", 178], ["x", 78], ["q", 48], ["V", 37], ["v", 12], ["ā", 5]]
  );
});
