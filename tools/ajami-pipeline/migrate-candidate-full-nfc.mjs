#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { formatCodePoints } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REVIEW_QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.json");

/**
 * Normalize only the historical generated candidate snapshot. Review decisions,
 * provisional spellings, and all queue metadata deliberately pass through.
 */
export function migrateCandidateFullNfc(queue) {
  if (!queue || typeof queue !== "object" || !Array.isArray(queue.entries)) {
    throw new Error("review queue must contain an entries array");
  }

  const migratedQueue = structuredClone(queue);
  let stringsChanged = 0;
  let arraysChanged = 0;
  for (const entry of migratedQueue.entries) {
    if (typeof entry.candidateFullAjami !== "string") continue;
    const normalizedValue = entry.candidateFullAjami.normalize("NFC");
    if (entry.candidateFullAjami === normalizedValue) continue;
    entry.candidateFullAjami = normalizedValue;
    entry.candidateFullCodepoints = formatCodePoints(normalizedValue);
    stringsChanged += 1;
    arraysChanged += 1;
  }

  return { queue: migratedQueue, stringsChanged, arraysChanged };
}

export function migrateCandidateFullNfcFile(queuePath = REVIEW_QUEUE_PATH) {
  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  const result = migrateCandidateFullNfc(queue);
  if (result.stringsChanged || result.arraysChanged) {
    fs.writeFileSync(queuePath, `${JSON.stringify(result.queue, null, 2)}\n`, "utf8");
  }
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [, , queuePath = REVIEW_QUEUE_PATH] = process.argv;
  const { stringsChanged, arraysChanged } = migrateCandidateFullNfcFile(queuePath);
  process.stdout.write(`candidateFullAjami strings changed: ${stringsChanged}\n`);
  process.stdout.write(`candidateFullCodepoints arrays changed: ${arraysChanged}\n`);
}
