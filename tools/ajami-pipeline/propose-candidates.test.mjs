import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import {
  proposalSummary,
  proposeCandidates,
  renderCandidateReviewMarkdown,
} from "./propose-candidates.mjs";
import { formatCodePoints } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.json");

function sourceQueue() {
  return JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
}

function proposedQueue() {
  return proposeCandidates(sourceQueue());
}

function entryFor(queue, word) {
  return queue.entries.find(
    (entry) => entry.normalizedBoko.replace(/[\u2019\u02BC]/gu, "'") === word
  );
}

test("adds proposals to all 1,288 questions without approving or changing the queue", () => {
  const source = sourceQueue();
  const sourceSnapshot = JSON.stringify(source);
  const proposed = proposeCandidates(source);
  const summary = proposalSummary(proposed);

  assert.equal(summary.entries, 500);
  assert.equal(summary.questions, 1288);
  assert.equal(summary.candidates + summary.nullCandidates, 1288);
  assert.equal(summary.approvedEntries, 0);
  assert.equal(JSON.stringify(source), sourceSnapshot);

  for (const entry of proposed.entries) {
    assert.notEqual(entry.status, "approved");
    for (const question of entry.openQuestions) {
      if (question.candidateAnswer !== null) {
        assert.ok(question.options.includes(question.candidateAnswer));
      } else {
        assert.match(question.reasoning, /cannot|must/iu);
      }
      assert.ok(["high", "medium", "low"].includes(question.confidence));
      assert.ok(Array.isArray(question.candidateAjamiSequence));
    }
  }
});

test("preserves separately authored human-review metadata", () => {
  const source = sourceQueue();
  const entry = source.entries[0];
  entry.status = "human_reviewed";
  entry.reviewerDecision = "fixture-human-decision";
  entry.reviewerNotes = "fixture-human-note";
  entry.openQuestions[0].reviewerDecision = "fixture-question-decision";

  const proposedEntry = proposeCandidates(source).entries[0];
  assert.equal(proposedEntry.status, "human_reviewed");
  assert.equal(proposedEntry.reviewerDecision, "fixture-human-decision");
  assert.equal(proposedEntry.reviewerNotes, "fixture-human-note");
  assert.equal(
    proposedEntry.openQuestions[0].reviewerDecision,
    "fixture-question-decision"
  );
});

test("complete candidates have exact code points and include blocked entries", () => {
  const proposed = proposedQueue();
  const summary = proposalSummary(proposed);

  assert.equal(summary.blockedEntries, 119);
  assert.ok(summary.blockedWithFullCandidate > 0);
  for (const entry of proposed.entries) {
    if (entry.candidateFullAjami === null) {
      assert.deepEqual(entry.candidateFullCodepoints, []);
    } else {
      assert.deepEqual(formatCodePoints(entry.candidateFullAjami), entry.candidateFullCodepoints);
    }
  }
});

test("deterministic and provisional special cases are calibrated", () => {
  const proposed = proposedQueue();
  const sukun = proposed.entries
    .flatMap((entry) => entry.openQuestions)
    .filter((question) => question.type === "SUKUN");
  const clusters = proposed.entries
    .flatMap((entry) => entry.openQuestions)
    .filter((question) => question.type === "VELAR_CLUSTER");
  const da = entryFor(proposed, "da").openQuestions[0];
  const ya = entryFor(proposed, "ya").openQuestions[0];
  const wa = entryFor(proposed, "wa").openQuestions[0];
  const sannanGemination = entryFor(proposed, "sannan").openQuestions.find(
    (question) => question.type === "GEMINATION"
  );

  assert.equal(sukun.length, 38);
  assert.ok(sukun.every((question) => question.confidence === "high"));
  assert.ok(sukun.every((question) => question.evidenceType === "RULE_DEFAULT"));
  assert.equal(clusters.length, 7);
  assert.ok(clusters.every((question) => question.confidence !== "high"));
  assert.match(clusters[0].reasoning, /unsettled/u);
  assert.equal(da.confidence, "high");
  assert.match(da.reasoning, /formerly/u);
  assert.match(ya.candidateAnswer, /^long final/u);
  assert.match(wa.candidateAnswer, /^short final/u);
  assert.deepEqual(sannanGemination.candidateAjamiSequence, ["U+08BD", "U+0651"]);
});

test("lexical h and apostrophe proposals carry word-specific classifications and sequences", () => {
  const proposed = proposedQueue();
  const fahimta = entryFor(proposed, "fahimta").openQuestions.find(
    (question) => question.type === "ARABIC_LEXICAL_H"
  );
  const hada = entryFor(proposed, "haɗa").openQuestions.find(
    (question) => question.type === "ARABIC_LEXICAL_H"
  );
  const community = entryFor(proposed, "al'umma").openQuestions.find(
    (question) => question.type === "APOSTROPHE_ROLE"
  );
  const measure = entryFor(proposed, "ma'auni").openQuestions.find(
    (question) => question.type === "APOSTROPHE_ROLE"
  );

  assert.match(fahimta.candidateAnswer, /H_ARABIC_LEXICAL/u);
  assert.deepEqual(fahimta.candidateAjamiSequence, ["U+0647"]);
  assert.match(hada.candidateAnswer, /H_NATIVE_HAUSA/u);
  assert.deepEqual(hada.candidateAjamiSequence, ["U+062D"]);
  assert.match(community.candidateAnswer, /^glottal boundary/u);
  assert.deepEqual(community.candidateAjamiSequence, ["U+0623"]);
  assert.match(measure.candidateAnswer, /^morpheme boundary/u);
  assert.deepEqual(measure.candidateAjamiSequence, ["U+0623"]);
});

test("review Markdown exposes full proposals, low-confidence warnings, and blank ratification cells", () => {
  const markdown = renderCandidateReviewMarkdown(proposedQueue());

  assert.match(markdown, /machine proposals, not approved spellings/iu);
  assert.match(markdown, /Ratify\? \(Y \/ correction\)/u);
  assert.match(markdown, /⚠ LOW/u);
  assert.equal((markdown.match(/^## Frequency ranks /gmu) ?? []).length, 20);
  assert.match(markdown, /\|  \|$/mu);
});
