import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { formatCodePoints } from "../tokenizer.mjs";

export const RATIFIED_QUEUE_PATH = new URL("../data/review-queue-top500.json", import.meta.url);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function failIf(condition, message, failures) {
  if (condition) failures.push(message);
}

export function ratificationFailures(queue) {
  const entries = Array.isArray(queue) ? queue : queue?.entries;
  const failures = [];
  if (!Array.isArray(entries)) return ["review queue must contain an entries array"];

  for (const entry of entries) {
    failIf(entry.status === "approved", `${entry.boko}: entry is marked approved`, failures);
    if (entry.status !== "human_reviewed") continue;

    for (const question of entry.openQuestions ?? []) {
      const label = `${entry.boko}/${question.type}@${question.position ?? "n/a"}`;
      failIf(
        question.reviewerDecision === null || question.reviewerDecision === undefined,
        `${label}: human-reviewed question is missing reviewerDecision`,
        failures
      );
      if (Array.isArray(question.options) && question.options.length > 0) {
        failIf(
          !question.options.includes(question.reviewerDecision),
          `${label}: reviewerDecision is not one of that question's options`,
          failures
        );
      }
      if (/must supply/iu.test(String(question.reviewerDecision ?? ""))) {
        failIf(
          !isNonEmptyString(question.reviewerSuppliedSequence),
          `${label}: a must-supply decision needs reviewerSuppliedSequence`,
          failures
        );
        const expectedCodepoints = isNonEmptyString(question.reviewerSuppliedSequence)
          ? formatCodePoints(question.reviewerSuppliedSequence)
          : [];
        failIf(
          !Array.isArray(question.reviewerSuppliedCodepoints) ||
            JSON.stringify(question.reviewerSuppliedCodepoints) !== JSON.stringify(expectedCodepoints),
          `${label}: reviewerSuppliedCodepoints do not exactly describe reviewerSuppliedSequence`,
          failures
        );
      }
    }
  }

  return failures;
}

export function runRatificationGate(queue = JSON.parse(fs.readFileSync(RATIFIED_QUEUE_PATH, "utf8"))) {
  const failures = ratificationFailures(queue);
  if (failures.length) {
    throw new Error(
      `RATIFICATION GATE FAILED (${failures.length} issue${failures.length === 1 ? "" : "s"})\n- ` +
        failures.join("\n- ")
    );
  }
  const entries = Array.isArray(queue) ? queue : queue.entries;
  return `RATIFICATION GATE OK: ${entries.length} entries preserve complete, option-bound human decisions`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(runRatificationGate());
}
