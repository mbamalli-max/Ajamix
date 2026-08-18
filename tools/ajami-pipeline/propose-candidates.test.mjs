import test from "node:test";
import assert from "node:assert/strict";

import { buildReviewQueue, buildReviewQueueFromContent } from "./build-review-queue.mjs";
import {
  proposalSummary,
  proposeCandidates,
  renderCandidateReviewMarkdown,
} from "./propose-candidates.mjs";
import { formatCodePoints } from "./tokenizer.mjs";

const GENERATED_QUEUE = buildReviewQueue().queue;

function sourceQueue() {
  return structuredClone(GENERATED_QUEUE);
}

function proposedQueue() {
  return proposeCandidates(sourceQueue());
}

function entryFor(queue, word) {
  return queue.entries.find(
    (entry) => entry.normalizedBoko.replace(/[\u2019\u02BC]/gu, "'") === word
  );
}

test("adds proposals to all 1,407 questions without approving or changing the queue", () => {
  const source = sourceQueue();
  const sourceSnapshot = JSON.stringify(source);
  const proposed = proposeCandidates(source);
  const summary = proposalSummary(proposed);

  assert.equal(summary.entries, 500);
  assert.equal(summary.questions, 1407);
  assert.equal(summary.candidates + summary.nullCandidates, 1407);
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

  assert.equal(summary.blockedEntries, 120);
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
  const kArticulations = proposed.entries
    .flatMap((entry) => entry.openQuestions)
    .filter((question) => question.type === "K_ARTICULATION");
  const kClusters = clusters.filter((question) => question.token === "K_VELAR_CLUSTER");
  const legacyClusters = clusters.filter((question) => question.token !== "K_VELAR_CLUSTER");
  const da = entryFor(proposed, "da").openQuestions[0];
  const ya = entryFor(proposed, "ya").openQuestions[0];
  const wa = entryFor(proposed, "wa").openQuestions[0];
  const sannanGemination = entryFor(proposed, "sannan").openQuestions.find(
    (question) => question.type === "GEMINATION"
  );

  assert.equal(sukun.length, 36);
  assert.ok(sukun.every((question) => question.confidence === "high"));
  assert.ok(sukun.every((question) => question.evidenceType === "RULE_DEFAULT"));
  assert.equal(clusters.length, 8);
  assert.ok(clusters.every((question) => question.confidence !== "high"));
  assert.equal(kArticulations.length, 121);
  assert.ok(kArticulations.every((question) => question.candidateAnswer === null));
  assert.ok(kArticulations.every((question) => question.confidence === "low"));
  assert.ok(
    kArticulations.every((question) => question.evidenceType === "UNCERTAIN_BEST_GUESS")
  );
  assert.ok(kArticulations.every((question) => question.candidateAjamiSequence.length === 0));
  assert.equal(kClusters.length, 3);
  assert.ok(kClusters.every((question) => question.candidateAnswer === null));
  assert.ok(kClusters.every((question) => question.confidence === "low"));
  assert.ok(kClusters.every((question) => question.evidenceType === "UNCERTAIN_BEST_GUESS"));
  assert.ok(kClusters.every((question) => question.candidateAjamiSequence.length === 0));
  assert.equal(legacyClusters.length, 5);
  assert.ok(legacyClusters.every((question) => question.candidateAnswer === question.options[0]));
  assert.ok(legacyClusters.every((question) => question.confidence === "medium"));
  assert.ok(legacyClusters.every((question) => question.evidenceType === "RULE_DEFAULT"));
  assert.ok(legacyClusters.every((question) => question.candidateAjamiSequence.length > 0));
  assert.match(legacyClusters[0].reasoning, /unsettled/u);
  assert.equal(da.confidence, "high");
  assert.match(da.reasoning, /formerly/u);
  assert.match(ya.candidateAnswer, /^long final/u);
  assert.match(wa.candidateAnswer, /^short final/u);
  assert.deepEqual(sannanGemination.candidateAjamiSequence, ["U+08BD", "U+0651"]);
});

test("VOWEL_LENGTH proposals remain canonical after adding the lexical exception option", () => {
  const questions = proposedQueue().entries
    .flatMap((entry) => entry.openQuestions)
    .filter((question) => question.type === "VOWEL_LENGTH");

  assert.ok(questions.length > 0);
  assert.ok(questions.every((question) => question.options.length === 3));
  assert.ok(
    questions.every((question) => question.options.slice(0, 2).includes(question.candidateAnswer))
  );
  assert.ok(questions.every((question) => !/must supply/iu.test(question.candidateAnswer)));
  assert.ok(questions.every((question) => question.candidateAjamiSequence.length > 0));
});

test("lexical h and apostrophe proposals carry word-specific classifications and sequences", () => {
  const proposed = proposedQueue();
  const fahimta = entryFor(proposed, "fahimta").openQuestions.find(
    (question) => question.type === "H_ORTHOGRAPHY_CLASS"
  );
  const hada = entryFor(proposed, "haɗa").openQuestions.find(
    (question) => question.type === "H_ORTHOGRAPHY_CLASS"
  );
  const community = entryFor(proposed, "al'umma").openQuestions.find(
    (question) => question.type === "APOSTROPHE_ROLE"
  );
  const measure = entryFor(proposed, "ma'auni").openQuestions.find(
    (question) => question.type === "APOSTROPHE_ROLE"
  );

  assert.match(fahimta.candidateAnswer, /H_ARABIC_HEH_PRESERVED/u);
  assert.equal(fahimta.proposedHCategory, "H_ARABIC_HEH_PRESERVED");
  assert.deepEqual(fahimta.candidateAjamiSequence, ["U+0647"]);
  assert.match(hada.candidateAnswer, /H_HAUSA_PHONEMIC/u);
  assert.equal(hada.proposedHCategory, "H_HAUSA_PHONEMIC");
  assert.deepEqual(hada.candidateAjamiSequence, ["U+062D"]);
  assert.match(community.candidateAnswer, /^glottal boundary/u);
  assert.deepEqual(community.candidateAjamiSequence, ["U+0623"]);
  assert.match(measure.candidateAnswer, /^morpheme boundary/u);
  assert.deepEqual(measure.candidateAjamiSequence, ["U+0623"]);
});

test("unresolved h proposals classify without supplying a decision or fallback glyph", () => {
  const source = buildReviewQueueFromContent(
    { modules: [{ id: "h-fixture", titleHa: "Hira" }] },
    { limit: 1 }
  ).queue;
  const proposed = proposeCandidates(source);
  const question = proposed.entries[0].openQuestions.find(
    (candidate) => candidate.type === "H_ORTHOGRAPHY_CLASS"
  );

  assert.equal(question.proposedHCategory, "H_LEXICAL_UNRESOLVED");
  assert.equal(question.candidateAnswer, null);
  assert.deepEqual(question.candidateAjamiSequence, []);
  assert.equal(proposed.entries[0].candidateFullAjami, null);
});

test("short-e carrier is a rule default only after an explicit same-position short decision", () => {
  const source = buildReviewQueueFromContent(
    { modules: [{ id: "short-e-fixture", titleHa: "Eh" }] },
    { limit: 1 }
  ).queue;
  const entry = source.entries[0];
  const vowelLength = entry.openQuestions.find(
    (question) => question.type === "VOWEL_LENGTH" && question.position === 0
  );
  const proposalFor = (decision) => {
    vowelLength.reviewerDecision = decision;
    return proposeCandidates(source).entries[0].openQuestions.find(
      (question) => question.type === "SHORT_E_CARRIER" && question.position === 0
    );
  };

  const unanswered = proposalFor(null);
  assert.equal(unanswered.candidateAnswer, null);
  assert.equal(unanswered.confidence, "low");
  assert.equal(unanswered.evidenceType, "UNCERTAIN_BEST_GUESS");

  const long = proposalFor(vowelLength.options.find((option) => /^long —/u.test(option)));
  assert.equal(long.candidateAnswer, null);
  assert.equal(long.confidence, "low");
  assert.equal(long.evidenceType, "UNCERTAIN_BEST_GUESS");

  const short = proposalFor(vowelLength.options.find((option) => /^short —/u.test(option)));
  assert.equal(short.candidateAnswer, short.options[0]);
  assert.equal(short.confidence, "high");
  assert.equal(short.evidenceType, "RULE_DEFAULT");
});

test("review Markdown exposes full proposals, low-confidence warnings, and blank ratification cells", () => {
  const markdown = renderCandidateReviewMarkdown(proposedQueue());

  assert.match(markdown, /machine proposals, not approved spellings/iu);
  assert.match(markdown, /Ratify\? \(Y \/ correction\)/u);
  assert.match(markdown, /⚠ LOW/u);
  assert.equal((markdown.match(/^## Frequency ranks /gmu) ?? []).length, 20);
  assert.match(markdown, /\|  \|$/mu);
});
