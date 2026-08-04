import fs from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

import { runSlice42Gate } from "./slice42-gate.mjs";
import { runSlice43Gate } from "./slice43-gate.mjs";
import { lexiconFailures, runLexiconGate } from "./lexicon-gate.mjs";
import { ratificationFailures, runRatificationGate } from "./ratification-gate.mjs";

const QUEUE_PATH = new URL("../data/review-queue-top500.json", import.meta.url);
const LEXICON_PATH = new URL("../data/ajami-lexicon.json", import.meta.url);

function ratifiedQueue() {
  return JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
}

function lexicon() {
  return JSON.parse(fs.readFileSync(LEXICON_PATH, "utf8"));
}

function suppliedQuestion(queue) {
  const entry = queue.entries.find((candidate) =>
    candidate.openQuestions.some((question) => /must supply/iu.test(question.reviewerDecision ?? ""))
  );
  return entry.openQuestions.find((question) => /must supply/iu.test(question.reviewerDecision ?? ""));
}

test("all generator, ratification, and lexicon gates pass their intended inputs", () => {
  assert.doesNotThrow(() => runSlice42Gate());
  assert.doesNotThrow(() => runSlice43Gate());
  assert.doesNotThrow(() => runRatificationGate());
  assert.doesNotThrow(() => runLexiconGate());
});

test("ratification gate rejects a decision outside its own question options", () => {
  const queue = structuredClone(ratifiedQueue());
  queue.entries[0].openQuestions[0].reviewerDecision = "not a declared option";
  assert.match(ratificationFailures(queue).join("\n"), /not one of that question's options/u);
});

test("ratification gate rejects missing must-supply payloads and incomplete decisions", () => {
  const queue = structuredClone(ratifiedQueue());
  const question = suppliedQuestion(queue);
  delete question.reviewerSuppliedSequence;
  question.reviewerSuppliedCodepoints = [];
  queue.entries[0].openQuestions[0].reviewerDecision = null;
  const failures = ratificationFailures(queue).join("\n");
  assert.match(failures, /must-supply decision needs reviewerSuppliedSequence/u);
  assert.match(failures, /human-reviewed question is missing reviewerDecision/u);
});

test("ratification gate rejects incorrect must-supply code points", () => {
  const queue = structuredClone(ratifiedQueue());
  const question = suppliedQuestion(queue);
  question.reviewerSuppliedCodepoints = ["U+0000"];
  assert.match(
    ratificationFailures(queue).join("\n"),
    /reviewerSuppliedCodepoints do not exactly describe reviewerSuppliedSequence/u
  );
});

test("ratification gate permits ratified entries without a provisional spelling but rejects approval", () => {
  const queue = structuredClone(ratifiedQueue());
  assert.ok(queue.entries.some((entry) => entry.status === "human_reviewed" && entry.provisionalAjami === null));
  assert.deepEqual(ratificationFailures(queue), []);
  queue.entries[0].status = "approved";
  assert.match(ratificationFailures(queue).join("\n"), /entry is marked approved/u);
});

test("lexicon gate rejects invalid entries, code-point drift, and Arabic yeh", () => {
  const queue = ratifiedQueue();
  const invalid = structuredClone(lexicon());
  invalid.entries[0].status = "not-a-status";
  assert.match(lexiconFailures(invalid, queue).join("\n"), /status must be one of/u);

  const drifted = structuredClone(lexicon());
  drifted.entries[0].ajamiCodepoints = [];
  assert.match(lexiconFailures(drifted, queue).join("\n"), /ajamiCodepoints do not exactly describe ajami/u);

  const wrongYeh = structuredClone(lexicon());
  const yehEntry = wrongYeh.entries.find((entry) => entry.ajami.includes("\u06CC"));
  yehEntry.ajami = yehEntry.ajami.replace("\u06CC", "\u064A");
  yehEntry.ajamiCodepoints = yehEntry.ajamiCodepoints.map((codepoint) =>
    codepoint === "U+06CC" ? "U+064A" : codepoint
  );
  assert.match(lexiconFailures(wrongYeh, queue).join("\n"), /exactly the U\+06CC yeh variant/u);
});

test("lexicon gate rejects queue misalignment, approval, and invalid context defaults", () => {
  const queue = ratifiedQueue();
  const missing = structuredClone(lexicon());
  missing.entries.pop();
  assert.match(lexiconFailures(missing, queue).join("\n"), /does not equal ratified queue count/u);

  const unaligned = structuredClone(lexicon());
  unaligned.entries.find((entry) => entry.normalizedBoko === "da").normalizedBoko = "not-da";
  assert.match(lexiconFailures(unaligned, queue).join("\n"), /da: appears 0 times/u);

  const approved = structuredClone(lexicon());
  approved.entries[0].status = "approved";
  assert.match(lexiconFailures(approved, queue).join("\n"), /entry is marked approved/u);

  const badContext = structuredClone(lexicon());
  badContext.entries.find((entry) => entry.normalizedBoko === "da").contextRule.default = "not a ratified option";
  assert.match(lexiconFailures(badContext, queue).join("\n"), /contextRule\.default is not one of its ratified queue options/u);

  const extraContext = structuredClone(lexicon());
  extraContext.entries.find((entry) => entry.normalizedBoko === "a").contextRule = { default: "unexpected" };
  assert.match(lexiconFailures(extraContext, queue).join("\n"), /contextRule entries must be exactly/u);
});
