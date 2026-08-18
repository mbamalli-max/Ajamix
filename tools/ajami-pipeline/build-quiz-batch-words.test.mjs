import assert from "node:assert/strict";
import test from "node:test";

import {
  deriveQuizBatchWords,
  tokenizeSurfaceWords,
} from "./build-quiz-batch-words.mjs";

test("quiz batch tokenization keeps Hausa apostrophes and ignores punctuation and numbers", () => {
  assert.deepEqual(tokenizeSurfaceWords("'Ya'ya, 'haka' N60 {b} ma'a"), [
    "'Ya'ya",
    "haka",
    "N",
    "ma'a",
  ]);
});

test("quiz batch words are uncovered, filtered, and frequency-sorted deterministically", () => {
  const content = {
    modules: [
      {
        quiz: [
          {
            templateHa: "'Ya'ya suna Sabon Sabon WhatsApp N60 b",
            answerFormula: "Dabara",
            distractorFormulas: ["Sabon dabara ma'a", "Zango", "Zango"],
          },
        ],
        lessons: [{ heading: { ha: "Dabara ma'a" } }],
      },
    ],
  };
  const lexicon = {
    entries: [{ boko: "'ya'ya" }, { boko: "suna" }],
  };

  const first = deriveQuizBatchWords(content, lexicon);
  const second = deriveQuizBatchWords(structuredClone(content), structuredClone(lexicon));

  assert.deepEqual(first.words, ["dabara", "sabon", "ma'a", "zango"]);
  assert.deepEqual(second, first);
  assert.deepEqual(first.wordCounts, [
    { word: "dabara", occurrences: 3 },
    { word: "sabon", occurrences: 3 },
    { word: "ma'a", occurrences: 2 },
    { word: "zango", occurrences: 2 },
  ]);
  assert.deepEqual(first.excludedTokens, [
    { token: "b", occurrences: 1, reason: "TEMPLATE_PLACEHOLDER" },
    { token: "n", occurrences: 1, reason: "SINGLE_LATIN_LETTER" },
    { token: "whatsapp", occurrences: 1, reason: "CONTENT_AUTHORING_ARTIFACT" },
  ]);
  assert.equal(first.surfaceCount, 6);
});
