import { fileURLToPath } from "node:url";

import { proposeCandidates } from "../propose-candidates.mjs";
import { formatCodePoints } from "../tokenizer.mjs";
import { runSlice42Gate, sourceQueue } from "./slice42-gate.mjs";

const CONFIDENCE_LEVELS = new Set(["high", "medium", "low"]);
const EVIDENCE_TYPES = new Set([
  "MORPHOLOGICAL_PATTERN",
  "COMMON_FUNCTION_WORD",
  "COGNATE_OR_LOAN",
  "CORPUS_INTERNAL_CONSISTENCY",
  "RULE_DEFAULT",
  "UNCERTAIN_BEST_GUESS",
]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function failIf(condition, message, failures) {
  if (condition) failures.push(message);
}

export function slice43Failures(queue) {
  const entries = Array.isArray(queue) ? queue : queue.entries;
  const failures = [];
  const seenConfidences = new Set();
  let questionCount = 0;

  failIf(entries.length !== 500, `expected 500 entries, got ${entries.length}`, failures);
  failIf(entries.some((entry) => entry.status === "approved"), "an entry is marked approved", failures);

  for (const entry of entries) {
    failIf(
      !Object.hasOwn(entry, "candidateFullAjami"),
      `${entry.boko}: missing candidateFullAjami`,
      failures
    );
    failIf(
      !Array.isArray(entry.candidateFullCodepoints),
      `${entry.boko}: candidateFullCodepoints must be an array`,
      failures
    );
    failIf(
      !CONFIDENCE_LEVELS.has(entry.entryConfidence),
      `${entry.boko}: invalid entryConfidence`,
      failures
    );
    if (typeof entry.candidateFullAjami === "string" && Array.isArray(entry.candidateFullCodepoints)) {
      failIf(
        JSON.stringify(formatCodePoints(entry.candidateFullAjami)) !==
          JSON.stringify(entry.candidateFullCodepoints),
        `${entry.boko}: candidateFullCodepoints do not describe candidateFullAjami`,
        failures
      );
    }

    for (const question of entry.openQuestions ?? []) {
      questionCount += 1;
      const label = `${entry.boko}/${question.type}@${question.position ?? "n/a"}`;
      const hasAnswer = Object.hasOwn(question, "candidateAnswer");
      failIf(!hasAnswer, `${label}: missing candidateAnswer`, failures);
      if (!hasAnswer) continue;

      failIf(
        !isNonEmptyString(question.reasoning),
        `${label}: missing explicit reasoning`,
        failures
      );
      failIf(
        !CONFIDENCE_LEVELS.has(question.confidence),
        `${label}: invalid confidence`,
        failures
      );
      failIf(
        !EVIDENCE_TYPES.has(question.evidenceType),
        `${label}: invalid evidenceType`,
        failures
      );
      failIf(
        !Array.isArray(question.candidateAjamiSequence),
        `${label}: candidateAjamiSequence must be an array`,
        failures
      );
      if (CONFIDENCE_LEVELS.has(question.confidence)) {
        seenConfidences.add(question.confidence);
      }

      if (question.candidateAnswer === null) {
        failIf(
          question.confidence !== "low" || question.evidenceType !== "UNCERTAIN_BEST_GUESS",
          `${label}: a null proposal must be low-confidence UNCERTAIN_BEST_GUESS`,
          failures
        );
        failIf(
          question.candidateAjamiSequence.length !== 0,
          `${label}: a null proposal must have an empty candidateAjamiSequence`,
          failures
        );
      } else {
        failIf(
          !question.options?.includes(question.candidateAnswer),
          `${label}: candidateAnswer is not one of the declared options`,
          failures
        );
      }
    }
  }

  failIf(questionCount !== 1407, `expected 1,407 questions, got ${questionCount}`, failures);
  failIf(
    seenConfidences.size < 2,
    `confidence is not calibrated: saw only ${[...seenConfidences].join(", ") || "none"}`,
    failures
  );

  return failures;
}

export function runSlice43Gate(queue = sourceQueue()) {
  runSlice42Gate(queue);
  const proposed = proposeCandidates(queue);
  const failures = slice43Failures(proposed);
  if (failures.length) {
    const displayed = failures.slice(0, 25);
    const remainder = failures.length - displayed.length;
    throw new Error(
      `SLICE 43 GATE FAILED (${failures.length} issue${failures.length === 1 ? "" : "s"})\n- ` +
        displayed.join("\n- ") +
        (remainder > 0 ? `\n- ... and ${remainder} more` : "")
    );
  }
  const entries = Array.isArray(proposed) ? proposed : proposed.entries;
  const questionCount = entries.reduce((count, entry) => count + (entry.openQuestions?.length ?? 0), 0);
  return `SLICE 43 GATE OK: ${entries.length} generated entries and ${questionCount} unapproved questions carry calibrated proposals`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(runSlice43Gate());
}
