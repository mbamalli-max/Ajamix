import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { validateLexiconEntry } from "../lexicon/schema.mjs";
import { formatCodePoints } from "../tokenizer.mjs";

export const LEXICON_PATH = new URL("../data/ajami-lexicon.json", import.meta.url);
export const RATIFIED_QUEUE_PATH = new URL("../data/review-queue-top500.json", import.meta.url);
const REQUIRED_CONTEXT_WORDS = new Set(["da", "ka", "ya", "ko"]);
const YEH_VARIANTS = new Set(["U+064A", "U+06CC"]);
const APOSTROPHE_PATTERN = /[\u0027\u2019\u02BC]/gu;

function failIf(condition, message, failures) {
  if (condition) failures.push(message);
}

function sameArray(left, right) {
  return Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((value, index) => value === right[index]);
}

// The generated queue canonicalizes apostrophe variants for corpus merging,
// while lexicon/schema.mjs deliberately preserves the reviewed Boko form.
function queueLookupKey(normalizedBoko) {
  return String(normalizedBoko ?? "").normalize("NFC").replace(APOSTROPHE_PATTERN, "'");
}

export function lexiconFailures(lexicon, queue) {
  const entries = Array.isArray(lexicon) ? lexicon : lexicon?.entries;
  const queueEntries = Array.isArray(queue) ? queue : queue?.entries;
  const failures = [];
  if (!Array.isArray(entries)) return ["lexicon must contain an entries array"];
  if (!Array.isArray(queueEntries)) return ["review queue must contain an entries array"];

  const yehVariants = new Set();
  const lexiconByNormalizedBoko = new Map();
  for (const entry of entries) {
    const validation = validateLexiconEntry(entry);
    failIf(!validation.ok, `${entry.boko}: ${validation.errors.join("; ")}`, failures);
    const actualCodepoints = typeof entry.ajami === "string" ? formatCodePoints(entry.ajami) : [];
    failIf(
      !sameArray(actualCodepoints, entry.ajamiCodepoints),
      `${entry.boko}: ajamiCodepoints do not exactly describe ajami`,
      failures
    );
    for (const codepoint of actualCodepoints) {
      if (YEH_VARIANTS.has(codepoint)) yehVariants.add(codepoint);
    }
    const normalizedKey = queueLookupKey(entry.normalizedBoko);
    const bucket = lexiconByNormalizedBoko.get(normalizedKey) ?? [];
    bucket.push(entry);
    lexiconByNormalizedBoko.set(normalizedKey, bucket);
    failIf(entry.status === "approved", `${entry.boko}: entry is marked approved`, failures);
  }

  failIf(
    yehVariants.size !== 1 || !yehVariants.has("U+06CC"),
    `lexicon must use exactly the U+06CC yeh variant; saw ${[...yehVariants].join(", ") || "none"}`,
    failures
  );
  failIf(
    entries.length !== queueEntries.length,
    `lexicon entry count ${entries.length} does not equal ratified queue count ${queueEntries.length}`,
    failures
  );
  for (const entry of queueEntries) {
    const normalizedKey = queueLookupKey(entry.normalizedBoko);
    const matches = lexiconByNormalizedBoko.get(normalizedKey) ?? [];
    failIf(
      matches.length !== 1,
      `${normalizedKey}: appears ${matches.length} times in the lexicon instead of exactly once`,
      failures
    );
  }

  const contextEntries = entries.filter((entry) => entry.contextRule);
  const contextWords = new Set(contextEntries.map((entry) => entry.normalizedBoko));
  failIf(
    contextWords.size !== REQUIRED_CONTEXT_WORDS.size ||
      [...REQUIRED_CONTEXT_WORDS].some((word) => !contextWords.has(word)),
    `contextRule entries must be exactly ${[...REQUIRED_CONTEXT_WORDS].join(", ")}`,
    failures
  );
  for (const word of REQUIRED_CONTEXT_WORDS) {
    const lexiconEntry = lexiconByNormalizedBoko.get(word)?.[0];
    const queueEntry = queueEntries.find((entry) => queueLookupKey(entry.normalizedBoko) === word);
    const ratifiedOptions = queueEntry?.openQuestions?.flatMap((question) => question.options ?? []) ?? [];
    failIf(!lexiconEntry?.contextRule, `${word}: missing contextRule`, failures);
    failIf(
      !ratifiedOptions.includes(lexiconEntry?.contextRule?.default),
      `${word}: contextRule.default is not one of its ratified queue options`,
      failures
    );
  }

  return failures;
}

export function runLexiconGate(
  lexicon = JSON.parse(fs.readFileSync(LEXICON_PATH, "utf8")),
  queue = JSON.parse(fs.readFileSync(RATIFIED_QUEUE_PATH, "utf8"))
) {
  const failures = lexiconFailures(lexicon, queue);
  if (failures.length) {
    throw new Error(
      `LEXICON GATE FAILED (${failures.length} issue${failures.length === 1 ? "" : "s"})\n- ` +
        failures.join("\n- ")
    );
  }
  const entries = Array.isArray(lexicon) ? lexicon : lexicon.entries;
  return `LEXICON GATE OK: ${entries.length} validated, queue-aligned ratified spellings use U+06CC yeh`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(runLexiconGate());
}
