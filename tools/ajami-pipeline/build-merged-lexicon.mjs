#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { materializeLexicon } from "./materialize-lexicon.mjs";
import { normalizeBoko } from "./lexicon/schema.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));

export const TOP500_LEXICON_PATH = path.join(MODULE_DIR, "data", "ajami-lexicon.json");
export const SHORT300_QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-short300.json");
export const QUIZ_QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-quiz.json");
export const MERGED_LEXICON_PATH = path.join(MODULE_DIR, "data", "ajami-lexicon-merged.json");
export const SHORT300_SOURCE = "tools/ajami-pipeline/data/review-queue-short300.json";
export const QUIZ_SOURCE = "tools/ajami-pipeline/data/review-queue-quiz.json";

export function ratifiedEntries(queue) {
  if (!Array.isArray(queue?.entries)) {
    throw new Error("short300 review queue must contain an entries array");
  }
  return queue.entries.filter(
    (entry) =>
      entry.status === "human_reviewed" &&
      Array.isArray(entry.openQuestions) &&
      entry.openQuestions.every(
        (question) =>
          question.reviewerDecision != null ||
          question.resolution?.state === "not_applicable"
      )
  );
}

function addEntries(entries, sourceName, mergedEntries, mergedMap) {
  for (const entry of entries) {
    const key = normalizeBoko(entry.boko);
    if (mergedMap.has(key)) {
      const existing = mergedMap.get(key);
      throw new Error(
        `Merged lexicon key collision for ${JSON.stringify(key)}: ` +
        `${JSON.stringify(existing.boko)} conflicts with ${JSON.stringify(entry.boko)} from ${sourceName}`
      );
    }
    mergedEntries.push(entry);
    mergedMap.set(key, entry);
  }
}

export function buildMergedLexicon({
  top500Path = TOP500_LEXICON_PATH,
  short300Path = SHORT300_QUEUE_PATH,
  quizPath = QUIZ_QUEUE_PATH,
} = {}) {
  const top500 = JSON.parse(fs.readFileSync(top500Path, "utf8"));
  if (!Array.isArray(top500.entries)) {
    throw new Error("top500 lexicon must contain an entries array");
  }

  const short300Queue = JSON.parse(fs.readFileSync(short300Path, "utf8"));
  const short300Ratified = ratifiedEntries(short300Queue);
  const short300 = materializeLexicon(short300Ratified);

  // materializeEntry() predates the second queue and records the top500 queue
  // path. Correct only that provenance field after using the single existing
  // materializer; the ratified spelling and all review metadata stay intact.
  const short300Entries = short300.entries.map((entry) => ({
    ...entry,
    source: [SHORT300_SOURCE],
  }));

  const quizQueue = JSON.parse(fs.readFileSync(quizPath, "utf8"));
  const quizRatified = ratifiedEntries(quizQueue);
  const quiz = materializeLexicon(quizRatified);
  const quizEntries = quiz.entries.map((entry) => ({
    ...entry,
    source: [QUIZ_SOURCE],
  }));

  const entries = [];
  const map = new Map();
  addEntries(top500.entries, top500Path, entries, map);
  addEntries(short300Entries, short300Path, entries, map);
  addEntries(quizEntries, quizPath, entries, map);

  const lexicon = {
    schemaVersion: top500.schemaVersion,
    orthography: top500.orthography,
    materialType: top500.materialType,
    notice: "Ajami spellings merged from the ratified top500 lexicon, ratified short300 review decisions, and ratified quiz review decisions.",
    entries,
  };

  return {
    lexicon,
    map,
    counts: {
      top500: top500.entries.length,
      short300Ratified: short300Entries.length,
      quizRatified: quizEntries.length,
      merged: entries.length,
    },
  };
}

export function writeMergedLexicon(
  lexicon,
  outputPath = MERGED_LEXICON_PATH
) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(lexicon, null, 2)}\n`, "utf8");
  return outputPath;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [, , outputPath = MERGED_LEXICON_PATH] = process.argv;
  const { lexicon, counts } = buildMergedLexicon();
  writeMergedLexicon(lexicon, outputPath);
  process.stdout.write(
    `Merged ${counts.top500} top500 + ${counts.short300Ratified} short300 + ` +
    `${counts.quizRatified} quiz entries ` +
    `into ${counts.merged} entries at ${outputPath}\n`
  );
}
