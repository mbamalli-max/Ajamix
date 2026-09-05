import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import {
  createGeneratedEntry,
  normalizeBoko,
  validateLexicon,
  validateLexiconEntry,
} from "./schema.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const SEED_PATH = path.join(MODULE_DIR, "seed-lexicon.json");
const SEED = JSON.parse(fs.readFileSync(SEED_PATH, "utf8"));

test("seed lexicon validates as generated material and contains no approved entry", () => {
  const result = validateLexicon(SEED.entries, { generated: true });
  assert.deepEqual(result.errors, []);
  assert.ok(SEED.entries.length > 0);
  assert.ok(SEED.entries.every((entry) => ["candidate", "provisional"].includes(entry.status)));
  assert.equal(SEED.entries.some((entry) => entry.status === "approved"), false);
});

test("schema rejects a missing required field", () => {
  const malformed = structuredClone(SEED.entries[0]);
  delete malformed.tokens;
  const result = validateLexiconEntry(malformed);
  assert.equal(result.ok, false);
  assert.ok(result.errors.includes("missing required field: tokens"));
});

test("schema rejects an unknown status", () => {
  const malformed = { ...structuredClone(SEED.entries[0]), status: "auto_approved" };
  const result = validateLexiconEntry(malformed);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.startsWith("status must be one of:")));
});

test("approved entries require source, reviewer, and review date", () => {
  const malformed = {
    ...structuredClone(SEED.entries[0]),
    status: "approved",
    source: [],
    reviewer: null,
    reviewDate: null,
  };
  const result = validateLexiconEntry(malformed);
  assert.equal(result.ok, false);
  assert.ok(result.errors.includes("approved entries require at least one source"));
  assert.ok(result.errors.includes("approved entries require a reviewer"));
  assert.ok(result.errors.includes("approved entries require a valid reviewDate"));
});

test("generated material cannot promote itself even with review-looking metadata", () => {
  const forged = {
    ...structuredClone(SEED.entries[0]),
    status: "approved",
    source: ["human-reviewed-source"],
    reviewer: "Reviewer Name",
    reviewDate: "2026-07-28",
  };
  assert.equal(validateLexiconEntry(forged).ok, true);
  const generatedResult = validateLexiconEntry(forged, { generated: true });
  assert.equal(generatedResult.ok, false);
  assert.ok(generatedResult.errors.includes("generated entries may not have status approved"));
  assert.throws(
    () => createGeneratedEntry({ boko: "kuma", status: "approved" }),
    /generated lexicon status is not permitted/
  );
});

test("schema canonicalizes all supported apostrophe forms to the ASCII lookup key", () => {
  const forms = ["jama'a", "jama’a", "jamaʼa"];
  for (const form of forms) {
    assert.equal(normalizeBoko(form), "jama'a");
  }

  const entry = createGeneratedEntry({ boko: "Jama’a" });
  assert.equal(entry.normalizedBoko, normalizeBoko(entry.boko));
  assert.equal(validateLexiconEntry(entry).ok, true);
});
