import fs from "node:fs";
import { tokenize } from "../tokenizer.mjs";

const QUEUE_PATH = "tools/ajami-pipeline/data/review-queue-top500.json";
const EXCLUDED_PATH = "tools/ajami-pipeline/data/review-queue-excluded.json";
const APOSTROPHE_PATTERN = /[\u0027\u2019\u02BC]/gu;

function canonicalWord(value) {
  return String(value ?? "")
    .normalize("NFC")
    .replace(APOSTROPHE_PATTERN, "'")
    .replace(/'y/giu, "\u01B4")
    .toLocaleLowerCase("ha");
}

function failIf(condition, message, failures) {
  if (condition) failures.push(message);
}

function characterPosition(source, sourceStart) {
  return Array.from(source.slice(0, sourceStart)).length;
}

function derivationRequirements(entry) {
  const tokenized = tokenize(entry.boko);
  const blockers = new Set();
  const sukunPositions = [];
  if (tokenized.tokens[0]?.type === "VOWEL") blockers.add("WORD_INITIAL_CARRIER");
  if (tokenized.tokens.some((token) => token.type === "UNKNOWN")) {
    blockers.add("NON_HAUSA_TOKEN");
  }
  if (tokenized.tokens.some((token) => token.token === "APOSTROPHE_UNRESOLVED")) {
    blockers.add("APOSTROPHE_ROLE");
  }
  for (let index = 0; index < tokenized.tokens.length; index += 1) {
    const token = tokenized.tokens[index];
    const next = tokenized.tokens[index + 1];
    if (token.type === "VOWEL" && next?.type === "VOWEL") {
      blockers.add("VOWEL_SEQUENCE");
    }
    if (
      token.type === "PHONEME" &&
      next?.type === "PHONEME" &&
      token.token === next.token
    ) {
      blockers.add("GEMINATION");
    }
    if (
      token.type === "PHONEME" &&
      (!next || (next.type === "PHONEME" && next.token !== token.token))
    ) {
      sukunPositions.push(characterPosition(entry.boko, token.sourceStart));
    }
  }
  return { blockers, sukunPositions };
}

const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
const entries = Array.isArray(queue) ? queue : queue.entries;
const excluded = JSON.parse(fs.readFileSync(EXCLUDED_PATH, "utf8"));
const failures = [];

failIf(entries.length !== 500, `expected 500 entries, got ${entries.length}`, failures);
failIf(entries.some((entry) => entry.status === "approved"), "an entry is marked approved", failures);

const badSingles = entries.filter(
  (entry) => /^[A-Za-z]$/u.test(entry.boko) && entry.boko.toLocaleLowerCase("ha") !== "a"
);
failIf(
  badSingles.length,
  `single Latin-letter entries remain: ${badSingles.map((entry) => entry.boko).join(", ")}`,
  failures
);

const contaminated = entries.filter(
  (entry) =>
    /[pqvx]/iu.test(entry.boko) ||
    /[\[\]{}]/u.test(entry.boko) ||
    ["pause", "intro", "main", "outro"].includes(canonicalWord(entry.boko))
);
failIf(
  contaminated.length,
  `contaminated/structural entries remain: ${contaminated.map((entry) => entry.boko).join(", ")}`,
  failures
);

const noQuestions = entries.filter(
  (entry) => !Array.isArray(entry.openQuestions) || entry.openQuestions.length === 0
);
failIf(
  noQuestions.length,
  `entries without open questions: ${noQuestions.map((entry) => entry.boko).join(", ")}`,
  failures
);

const unfinishedRows = [];
for (const entry of entries) {
  const { blockers, sukunPositions } = derivationRequirements(entry);
  const questionTypes = new Set(entry.openQuestions.map((question) => question.type));
  const missingBlockers = Array.from(blockers).filter((type) => !questionTypes.has(type));
  const provisionalSukunCount = Array.from(String(entry.provisionalAjami ?? "")).filter(
    (character) => character === "\u0652"
  ).length;
  const questionedSukunPositions = entry.openQuestions
    .filter((question) => question.type === "SUKUN")
    .map((question) => question.position)
    .sort((left, right) => left - right);
  const expectedSukunPositions = [...sukunPositions].sort((left, right) => left - right);
  const sukunComplete =
    entry.provisionalAjami === null
      ? JSON.stringify(questionedSukunPositions) === JSON.stringify(expectedSukunPositions)
      : provisionalSukunCount === expectedSukunPositions.length;
  const statusComplete =
    entry.status === "blocked"
      ? entry.provisionalAjami === null && blockers.size > 0
      : ["provisional", "human_reviewed"].includes(entry.status) &&
        entry.provisionalAjami !== null &&
        blockers.size === 0;
  if (missingBlockers.length || !sukunComplete || !statusComplete) {
    unfinishedRows.push(
      `${entry.boko} (missing blockers: ${missingBlockers.join(", ") || "none"}; ` +
        `sukūn expected/questioned/emitted: ${expectedSukunPositions.length}/` +
        `${questionedSukunPositions.length}/${provisionalSukunCount}; status ${entry.status})`
    );
  }
}
failIf(
  unfinishedRows.length,
  `rows are not finishable after their questions are answered: ${unfinishedRows.join("; ")}`,
  failures
);

const seen = new Map();
const duplicateWords = [];
for (const entry of entries) {
  const key = canonicalWord(entry.boko);
  if (seen.has(key)) duplicateWords.push(`${seen.get(key)} / ${entry.boko}`);
  else seen.set(key, entry.boko);
}
failIf(
  duplicateWords.length,
  `apostrophe-normalized duplicate rows remain: ${duplicateWords.join(", ")}`,
  failures
);

const excludedRows = [
  ...(excluded.structuralMarkers ?? []),
  ...(excluded.templatePlaceholders ?? []),
  ...(excluded.nonHausaTokens ?? []),
];
failIf(excludedRows.length === 0, "excluded artifact is empty", failures);
const placeholders = excluded.templatePlaceholders ?? [];
failIf(
  placeholders.reduce((sum, entry) => sum + entry.occurrences, 0) !== 1179,
  "template placeholder exclusion count is not 1,179",
  failures
);

if (failures.length) {
  throw new Error(`SLICE 42 GATE FAILED\n- ${failures.join("\n- ")}`);
}

console.log(
  "SLICE 42 GATE OK: 500 actionable unapproved entries; contaminants, duplicates, and suk\u016bn gaps absent"
);
