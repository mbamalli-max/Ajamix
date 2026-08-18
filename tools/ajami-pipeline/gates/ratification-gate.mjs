import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { formatCodePoints } from "../tokenizer.mjs";
import {
  QUESTION_NOT_APPLICABLE_STATE,
  isExcludedReviewEntry,
  isQuestionNotApplicable,
} from "../lexicon/schema.mjs";

export const RATIFIED_QUEUE_PATH = new URL("../data/review-queue-top500.json", import.meta.url);
export const LENGTH_SOURCES = new Set([
  "explicit",
  "bargery-1934",
  "bulk-default",
  "mfa-v3.0.0",
  "n/a",
]);
const PROVENANCE_FIELDS = ["lengthSource", "ajamiEvidence", "encodingRule", "reviewStatus"];
export const H_ORTHOGRAPHY_CLASS_OPTIONS = Object.freeze([
  "H_HAUSA_PHONEMIC — ح U+062D native Hausa /h/",
  "H_ARABIC_HA_PRESERVED — ح U+062D Arabic ح preserved",
  "H_ARABIC_HEH_PRESERVED — ه U+0647 Arabic ه preserved",
  "H_ARABIC_KHA_PRESERVED — خ U+062E Arabic خ preserved",
  "H_HAUSA_EPENTHETIC — ح U+062D epenthetic /h/",
  "H_LEXICAL_UNRESOLVED — reviewer must supply the exact Unicode replacement sequence",
]);

function sameArray(left, right) {
  return Array.isArray(left) &&
    left.length === right.length &&
    left.every((value, index) => value === right[index]);
}

export function sourceQueue(queuePath = process.argv[2] ?? process.env.AJAMIX_QUEUE_PATH) {
  return JSON.parse(fs.readFileSync(queuePath ?? RATIFIED_QUEUE_PATH, "utf8"));
}

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

  // These are the two protected legacy queues whose required byte-identical
  // hashes preclude a provenance backfill in this slice. Every other queue must
  // carry provenance on every answered question, even if all four fields vanish.
  const isProtectedLegacyQueue =
    !Array.isArray(queue) &&
    queue.schemaVersion === 1 &&
    queue.taskId === "2026-07-28-slice-42" &&
    (queue.entryCount === 500 || queue.entryCount === 300) &&
    !queue.fieldSelection?.includes("answerFormula");
  const requiresStructuredProvenance = !isProtectedLegacyQueue;

  for (const entry of entries) {
    failIf(entry.status === "approved", `${entry.boko}: entry is marked approved`, failures);
    failIf(
      isExcludedReviewEntry(entry) && !isNonEmptyString(entry.exclusionReason),
      `${entry.boko}: excluded entry is missing exclusionReason`,
      failures
    );
    failIf(
      !isExcludedReviewEntry(entry) && Object.hasOwn(entry, "exclusionReason"),
      `${entry.boko}: exclusionReason is only valid when status is excluded`,
      failures
    );

    for (const question of entry.openQuestions ?? []) {
      const label = `${entry.boko}/${question.type}@${question.position ?? "n/a"}`;
      const answered = question.reviewerDecision !== null && question.reviewerDecision !== undefined;
      const notApplicable = isQuestionNotApplicable(question);
      const hasResolution = Object.hasOwn(question, "resolution");
      if (hasResolution) {
        failIf(
          !question.resolution ||
            typeof question.resolution !== "object" ||
            Array.isArray(question.resolution) ||
            question.resolution.state !== QUESTION_NOT_APPLICABLE_STATE,
          `${label}: resolution must have state ${QUESTION_NOT_APPLICABLE_STATE}`,
          failures
        );
      }
      if (notApplicable) {
        failIf(
          !isNonEmptyString(question.resolution.reason),
          `${label}: not-applicable question is missing a human-supplied reason`,
          failures
        );
        failIf(
          answered,
          `${label}: not-applicable question must not carry reviewerDecision`,
          failures
        );
      }
      if (question.type === "H_ORTHOGRAPHY_CLASS") {
        failIf(
          !sameArray(question.options, H_ORTHOGRAPHY_CLASS_OPTIONS),
          `${label}: options must exactly match the six-way H orthography schema`,
          failures
        );
      }
      if (entry.status === "human_reviewed") {
        failIf(
          !answered && !notApplicable,
          `${label}: human-reviewed question is neither answered nor explicitly not-applicable`,
          failures
        );
      }
      if (!answered && !notApplicable) continue;

      if (requiresStructuredProvenance || notApplicable) {
        for (const field of PROVENANCE_FIELDS) {
          failIf(!Object.hasOwn(question, field), `${label}: answered question is missing ${field}`, failures);
        }
        if (Object.hasOwn(question, "lengthSource")) {
          failIf(
            !LENGTH_SOURCES.has(question.lengthSource),
            `${label}: lengthSource must be one of ${[...LENGTH_SOURCES].join(", ")}`,
            failures
          );
        }
        if (Object.hasOwn(question, "ajamiEvidence")) {
          failIf(question.ajamiEvidence !== "none", `${label}: ajamiEvidence must be none`, failures);
        }
        if (Object.hasOwn(question, "encodingRule")) {
          failIf(
            question.encodingRule !== "ajamix-standard",
            `${label}: encodingRule must be ajamix-standard`,
            failures
          );
        }
        if (Object.hasOwn(question, "reviewStatus")) {
          failIf(
            question.reviewStatus !== "human-approved",
            `${label}: reviewStatus must be human-approved`,
            failures
          );
        }
      }

      if (!answered) continue;

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
      } else if (question.type === "H_ORTHOGRAPHY_CLASS") {
        failIf(
          Object.hasOwn(question, "reviewerSuppliedSequence") ||
            Object.hasOwn(question, "reviewerSuppliedCodepoints"),
          `${label}: fixed H category must not override its required glyph with a reviewer-supplied sequence`,
          failures
        );
      }
    }
  }

  return failures;
}

export function runRatificationGate(queue = sourceQueue()) {
  const failures = ratificationFailures(queue);
  if (failures.length) {
    throw new Error(
      `RATIFICATION GATE FAILED (${failures.length} issue${failures.length === 1 ? "" : "s"})\n- ` +
        failures.join("\n- ")
    );
  }
  const entries = Array.isArray(queue) ? queue : queue.entries;
  return `RATIFICATION GATE OK: ${entries.length} entries preserve complete answered/not-applicable human resolutions and enforced exclusions`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(runRatificationGate());
}
