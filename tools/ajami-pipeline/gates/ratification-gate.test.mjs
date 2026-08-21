import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  H_ORTHOGRAPHY_CLASS_OPTIONS,
  ratificationFailures,
  runRatificationGate,
} from "./ratification-gate.mjs";

const QUEUES = [
  "review-queue-top500.json",
  "review-queue-short300.json",
  "review-queue-quiz.json",
];

test("ratification gate accepts every complete or in-progress review queue", () => {
  for (const filename of QUEUES) {
    const queue = JSON.parse(
      fs.readFileSync(new URL(`../data/${filename}`, import.meta.url), "utf8")
    );
    assert.match(runRatificationGate(queue), new RegExp(`OK: ${queue.entries.length} entries`, "u"));
  }
});

test("not-applicable is a reasoned human resolution distinct from an answer", () => {
  const provenance = {
    lengthSource: "n/a",
    ajamiEvidence: "none",
    encodingRule: "ajamix-standard",
    reviewStatus: "human-approved",
  };
  const question = {
    type: "SUKUN",
    position: 1,
    resolution: {
      state: "not_applicable",
      reason: "Synthetic human ruling: there is no consonant at this position.",
    },
    ...provenance,
  };
  const queue = {
    entries: [{ boko: "fixture", status: "human_reviewed", openQuestions: [question] }],
  };
  assert.deepEqual(ratificationFailures(queue), []);

  const missingReason = structuredClone(queue);
  missingReason.entries[0].openQuestions[0].resolution.reason = "";
  assert.match(
    ratificationFailures(missingReason).join("\n"),
    /not-applicable question is missing a human-supplied reason/u
  );

  const alsoAnswered = structuredClone(queue);
  alsoAnswered.entries[0].openQuestions[0].reviewerDecision = "emit something";
  assert.match(
    ratificationFailures(alsoAnswered).join("\n"),
    /not-applicable question must not carry reviewerDecision/u
  );

  const unresolved = structuredClone(queue);
  delete unresolved.entries[0].openQuestions[0].resolution;
  assert.match(
    ratificationFailures(unresolved).join("\n"),
    /human-reviewed question is neither answered nor explicitly not-applicable/u
  );
});

test("excluded entries require a reason and the gate preserves the exclusion", () => {
  const answeredQuestion = {
    type: "VOWEL_LENGTH",
    position: 1,
    options: ["short — U+064E", "long — U+064E U+0627"],
    reviewerDecision: "short — U+064E",
    lengthSource: "explicit",
    ajamiEvidence: "none",
    encodingRule: "ajamix-standard",
    reviewStatus: "human-approved",
  };
  const queue = {
    entries: [
      {
        boko: "fixture",
        status: "excluded",
        exclusionReason: "Synthetic human exclusion ruling.",
        openQuestions: [answeredQuestion],
      },
    ],
  };
  assert.deepEqual(ratificationFailures(queue), []);

  delete queue.entries[0].exclusionReason;
  assert.match(
    ratificationFailures(queue).join("\n"),
    /excluded entry is missing exclusionReason/u
  );
});

test("ratification gate requires complete provenance once a queue adopts it", () => {
  const provenance = {
    lengthSource: "explicit",
    ajamiEvidence: "none",
    encodingRule: "ajamix-standard",
    reviewStatus: "human-approved",
  };
  const queue = {
    entries: [
      {
        boko: "gida",
        status: "provisional",
        openQuestions: [
          { type: "VOWEL_LENGTH", position: 1, reviewerDecision: "short", ...provenance },
          { type: "WORD_FINAL_VOWEL", position: 3, reviewerDecision: "long" },
          { type: "SUKUN", position: 2, reviewerDecision: null },
        ],
      },
    ],
  };
  assert.deepEqual(ratificationFailures(queue), [
    "gida/WORD_FINAL_VOWEL@3: answered question is missing lengthSource",
    "gida/WORD_FINAL_VOWEL@3: answered question is missing ajamiEvidence",
    "gida/WORD_FINAL_VOWEL@3: answered question is missing encodingRule",
    "gida/WORD_FINAL_VOWEL@3: answered question is missing reviewStatus",
  ]);
});

test("ratification gate rejects invalid structured provenance values", () => {
  const queue = {
    entries: [
      {
        boko: "gida",
        status: "provisional",
        openQuestions: [
          {
            type: "VOWEL_LENGTH",
            position: 1,
            reviewerDecision: "short",
            lengthSource: "dictionary",
            ajamiEvidence: "reader",
            encodingRule: "other",
            reviewStatus: "machine-approved",
          },
        ],
      },
    ],
  };
  assert.equal(ratificationFailures(queue).length, 4);
});

test("ratification gate rejects an answered non-legacy queue with no provenance at all", () => {
  const queue = {
    entries: [
      {
        boko: "gida",
        status: "provisional",
        openQuestions: [{ type: "VOWEL_LENGTH", position: 1, reviewerDecision: "short" }],
      },
    ],
  };
  assert.equal(ratificationFailures(queue).length, 4);
});

// Assert the invariant, not a count: ratification is ongoing, so any hardcoded
// number here fails on the next batch applied (cf. slice 34, 35c, 42).
test("every answered question in the quiz queue carries full provenance", () => {
  const queue = JSON.parse(
    fs.readFileSync(new URL("../data/review-queue-quiz.json", import.meta.url), "utf8")
  );
  const answered = queue.entries
    .flatMap((entry) => (entry.openQuestions ?? []).map((question) => ({ entry, question })))
    .filter(({ question }) => question.reviewerDecision != null);
  assert.ok(answered.length > 0, "expected at least one answered question");
  const missing = answered.filter(({ question }) =>
    ["lengthSource", "ajamiEvidence", "encodingRule", "reviewStatus"].some(
      (field) => !Object.hasOwn(question, field)
    )
  );
  assert.deepEqual(
    missing.map(({ entry, question }) => `${entry.boko}|${question.type}@${question.position}`),
    []
  );
});

test("six-way h schema enforces exact options and must-supply payloads while legacy stays valid", () => {
  const provenance = {
    lengthSource: "n/a",
    ajamiEvidence: "none",
    encodingRule: "ajamix-standard",
    reviewStatus: "human-approved",
  };
  const unresolved = {
    type: "H_ORTHOGRAPHY_CLASS",
    position: 0,
    options: [...H_ORTHOGRAPHY_CLASS_OPTIONS],
    reviewerDecision: H_ORTHOGRAPHY_CLASS_OPTIONS.at(-1),
    reviewerSuppliedSequence: "خ",
    reviewerSuppliedCodepoints: ["U+062E"],
    ...provenance,
  };
  const legacy = {
    type: "ARABIC_LEXICAL_H",
    position: 0,
    options: ["H_NATIVE_HAUSA — U+062D", "H_ARABIC_LEXICAL — U+0647"],
    reviewerDecision: "H_NATIVE_HAUSA — U+062D",
    ...provenance,
  };
  const queue = {
    entries: [{ boko: "fixture", status: "human_reviewed", openQuestions: [unresolved, legacy] }],
  };
  assert.deepEqual(ratificationFailures(queue), []);

  const missingPayload = structuredClone(queue);
  delete missingPayload.entries[0].openQuestions[0].reviewerSuppliedSequence;
  assert.match(
    ratificationFailures(missingPayload).join("\n"),
    /must-supply decision needs reviewerSuppliedSequence/u
  );

  const malformedOptions = structuredClone(queue);
  malformedOptions.entries[0].openQuestions[0].options[0] = "H_HAUSA_PHONEMIC — U+062D";
  assert.match(
    ratificationFailures(malformedOptions).join("\n"),
    /options must exactly match the six-way H orthography schema/u
  );

  const fixedOverride = structuredClone(queue);
  fixedOverride.entries[0].openQuestions[0].reviewerDecision = H_ORTHOGRAPHY_CLASS_OPTIONS[0];
  assert.match(
    ratificationFailures(fixedOverride).join("\n"),
    /fixed H category must not override/u
  );
});
