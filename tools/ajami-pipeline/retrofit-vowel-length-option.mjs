#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { VOWEL_LENGTH_LEXICAL_EXCEPTION_OPTION } from "./build-review-queue.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));

export const QUIZ_QUEUE_PATH = path.join(
  MODULE_DIR,
  "data",
  "review-queue-quiz.json"
);

export function retrofitVowelLengthOptions(queue) {
  if (!Array.isArray(queue?.entries)) {
    throw new Error("review queue must contain an entries array");
  }

  let changedQuestions = 0;
  let vowelLengthQuestions = 0;

  for (const entry of queue.entries) {
    if (!Array.isArray(entry.openQuestions)) {
      throw new Error(`${entry.boko ?? "<unknown>"}: openQuestions must be an array`);
    }
    for (const question of entry.openQuestions) {
      if (question.type !== "VOWEL_LENGTH") continue;
      vowelLengthQuestions += 1;
      if (!Array.isArray(question.options)) {
        throw new Error(
          `${entry.boko}/VOWEL_LENGTH@${question.position}: options must be an array`
        );
      }

      const matches = question.options.filter(
        (option) => option === VOWEL_LENGTH_LEXICAL_EXCEPTION_OPTION
      );
      if (matches.length > 1) {
        throw new Error(
          `${entry.boko}/VOWEL_LENGTH@${question.position}: duplicate lexical exception options`
        );
      }
      if (matches.length === 1) {
        if (question.options.at(-1) !== VOWEL_LENGTH_LEXICAL_EXCEPTION_OPTION) {
          throw new Error(
            `${entry.boko}/VOWEL_LENGTH@${question.position}: lexical exception must be the final option`
          );
        }
        continue;
      }

      question.options.push(VOWEL_LENGTH_LEXICAL_EXCEPTION_OPTION);
      changedQuestions += 1;
    }
  }

  return { queue, changedQuestions, vowelLengthQuestions };
}

export function retrofitVowelLengthOptionFile(queuePath = QUIZ_QUEUE_PATH) {
  const original = fs.readFileSync(queuePath, "utf8");
  const queue = JSON.parse(original);
  const result = retrofitVowelLengthOptions(queue);
  if (result.changedQuestions > 0) {
    fs.writeFileSync(queuePath, `${JSON.stringify(result.queue, null, 2)}\n`, "utf8");
  }
  return {
    queuePath,
    changedQuestions: result.changedQuestions,
    vowelLengthQuestions: result.vowelLengthQuestions,
    wroteFile: result.changedQuestions > 0,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = retrofitVowelLengthOptionFile(process.argv[2] ?? QUIZ_QUEUE_PATH);
  process.stdout.write(
    `VOWEL_LENGTH retrofit: ${result.changedQuestions} changed of ` +
      `${result.vowelLengthQuestions} questions in ${result.queuePath}\n`
  );
}
