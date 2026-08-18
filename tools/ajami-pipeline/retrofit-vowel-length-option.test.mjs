import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { VOWEL_LENGTH_LEXICAL_EXCEPTION_OPTION } from "./build-review-queue.mjs";
import {
  retrofitVowelLengthOptionFile,
  retrofitVowelLengthOptions,
} from "./retrofit-vowel-length-option.mjs";

function fixtureQueue() {
  return {
    entries: [
      {
        boko: "aboki",
        status: "provisional",
        openQuestions: [
          {
            type: "VOWEL_LENGTH",
            position: 2,
            options: ["short — U+064F", "long — U+064F U+0648 U+0627 U+0652"],
            reviewerDecision: "short — U+064F",
            reviewerNotes: "keep byte-for-byte",
          },
          {
            type: "WORD_FINAL_VOWEL",
            position: 4,
            options: ["short final — U+0650", "long final — U+0650 U+0649"],
            reviewerDecision: null,
          },
        ],
      },
      {
        boko: "done",
        status: "human_reviewed",
        openQuestions: [
          {
            type: "VOWEL_LENGTH",
            position: 1,
            options: [
              "short — U+064F",
              "long — U+064F U+0648 U+0627 U+0652",
              VOWEL_LENGTH_LEXICAL_EXCEPTION_OPTION,
            ],
            reviewerDecision: "long — U+064F U+0648 U+0627 U+0652",
          },
        ],
      },
    ],
  };
}

test("retrofit changes only missing VOWEL_LENGTH option arrays", () => {
  const queue = fixtureQueue();
  const snapshot = structuredClone(queue);
  const result = retrofitVowelLengthOptions(queue);

  assert.equal(result.vowelLengthQuestions, 2);
  assert.equal(result.changedQuestions, 1);
  assert.deepEqual(queue.entries[0].openQuestions[0].options, [
    ...snapshot.entries[0].openQuestions[0].options,
    VOWEL_LENGTH_LEXICAL_EXCEPTION_OPTION,
  ]);
  assert.deepEqual(
    { ...queue.entries[0].openQuestions[0], options: snapshot.entries[0].openQuestions[0].options },
    snapshot.entries[0].openQuestions[0]
  );
  assert.deepEqual(queue.entries[0].openQuestions[1], snapshot.entries[0].openQuestions[1]);
  assert.deepEqual(queue.entries[1], snapshot.entries[1]);
});

test("file retrofit is idempotent and does not rewrite on its second run", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ajamix-vowel-retrofit-"));
  try {
    const queuePath = path.join(directory, "review-queue-quiz.json");
    fs.writeFileSync(queuePath, `${JSON.stringify(fixtureQueue(), null, 2)}\n`, "utf8");

    const first = retrofitVowelLengthOptionFile(queuePath);
    const afterFirst = fs.readFileSync(queuePath, "utf8");
    const second = retrofitVowelLengthOptionFile(queuePath);
    const afterSecond = fs.readFileSync(queuePath, "utf8");

    assert.deepEqual(first, {
      queuePath,
      changedQuestions: 1,
      vowelLengthQuestions: 2,
      wroteFile: true,
    });
    assert.deepEqual(second, {
      queuePath,
      changedQuestions: 0,
      vowelLengthQuestions: 2,
      wroteFile: false,
    });
    assert.equal(afterSecond, afterFirst);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
