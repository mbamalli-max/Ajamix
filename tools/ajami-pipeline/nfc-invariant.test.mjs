import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { buildMergedLexicon } from "./build-merged-lexicon.mjs";
import { validateLexiconEntry } from "./lexicon/schema.mjs";
import { formatCodePoints } from "./tokenizer.mjs";
import { regenerateContentData } from "./regenerate-content-ajami.mjs";
import { loadHumanReviewedProsePacket } from "./gates/human-reviewed-prose-gate.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");
const STORED_LEXICON_PATH = path.join(MODULE_DIR, "data", "ajami-lexicon.json");
const MERGED_LEXICON_PATH = path.join(MODULE_DIR, "data", "ajami-lexicon-merged.json");
const TOP500_QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.json");
const CONTENT_PATH = path.join(REPO_ROOT, "app", "content.json");

function isAjamiField(key) {
  return key === "ajami" || key.endsWith("Ajami");
}

export function findNonNfcAjami(value, { ajamiSubtree = false, pathParts = [] } = {}) {
  if (typeof value === "string") {
    return ajamiSubtree && value !== value.normalize("NFC") ? [pathParts.join(".")] : [];
  }
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    return value.flatMap((child, index) =>
      findNonNfcAjami(child, { ajamiSubtree, pathParts: [...pathParts, index] })
    );
  }
  return Object.entries(value).flatMap(([key, child]) =>
    findNonNfcAjami(child, {
      ajamiSubtree: ajamiSubtree || isAjamiField(key),
      pathParts: [...pathParts, key],
    })
  );
}

function mapAjamiStrings(value, transform, ajamiSubtree = false) {
  if (typeof value === "string") return ajamiSubtree ? transform(value) : value;
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value)) {
    return value.map((child) => mapAjamiStrings(child, transform, ajamiSubtree));
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      mapAjamiStrings(child, transform, ajamiSubtree || isAjamiField(key)),
    ])
  );
}

function reconstructPreMigrationAjami(value) {
  return value.replace(/[\u064E\u064F\u0650]\u0651|\u0650\u0652/g, (pair) => {
    if (pair === "\u0650\u0652") return "\u0652\u0650";
    return `${pair[1]}${pair[0]}`;
  });
}

// This preserves the validator's blind spot: strings directly in arrays are skipped.
function findNonNfcAjamiInObjectStrings(value, { ajamiSubtree = false, pathParts = [] } = {}) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    return value.flatMap((child, index) =>
      findNonNfcAjamiInObjectStrings(child, { ajamiSubtree, pathParts: [...pathParts, index] })
    );
  }
  return Object.entries(value).flatMap(([key, child]) => {
    const childAjamiSubtree = ajamiSubtree || isAjamiField(key);
    const childPathParts = [...pathParts, key];
    if (typeof child === "string") {
      return childAjamiSubtree && child !== child.normalize("NFC")
        ? [childPathParts.join(".")]
        : [];
    }
    return findNonNfcAjamiInObjectStrings(child, {
      ajamiSubtree: childAjamiSubtree,
      pathParts: childPathParts,
    });
  });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function nonNfcEntry() {
  const ajami = "\u0628\u0651\u064e";
  return {
    boko: "ba",
    normalizedBoko: "ba",
    tokens: ["B_PLAIN", "VOWEL_A_UNLENGTHENED"],
    ajami,
    ajamiCodepoints: formatCodePoints(ajami),
    pronunciation: null,
    vowelLength: null,
    category: "native_hausa",
    orthography: "warsh_kano_ajamix_v1",
    status: "candidate",
    confidence: "unreviewed",
    source: [],
    reviewer: null,
    reviewDate: null,
    notes: "",
  };
}

test("all generated Ajami artifacts are NFC-normalized", () => {
  for (const [label, artifact] of [
    ["content", readJson(CONTENT_PATH)],
    ["stored lexicon", readJson(STORED_LEXICON_PATH)],
    ["merged lexicon", readJson(MERGED_LEXICON_PATH)],
    ["top500 queue", readJson(TOP500_QUEUE_PATH)],
  ]) {
    assert.deepEqual(findNonNfcAjami(artifact), [], `${label} has non-NFC Ajami values`);
  }
});

test("NFC invariant walker reports non-NFC Ajami values inside arrays", () => {
  const fixture = {
    distractorFormulasAjami: ["\u0628\u0651\u064e"],
  };
  assert.deepEqual(findNonNfcAjami(fixture), ["distractorFormulasAjami.0"]);
});

test("real-content NFC regression preserves the 741-versus-597 array walker delta", () => {
  const currentContent = readJson(CONTENT_PATH);
  const preMigrationContent = mapAjamiStrings(currentContent, reconstructPreMigrationAjami);

  assert.deepEqual(
    mapAjamiStrings(preMigrationContent, (value) => value.normalize("NFC")),
    currentContent,
    "the reconstructed fixture must NFC-round-trip to current content"
  );

  // Deliberate regression constants: update only through a human content-change decision.
  const fullPaths = findNonNfcAjami(preMigrationContent);
  const scalarPaths = findNonNfcAjamiInObjectStrings(preMigrationContent);
  const arrayOnlyPaths = fullPaths.filter((path) => !scalarPaths.includes(path));
  assert.equal(fullPaths.length, 741);
  assert.equal(scalarPaths.length, 597);
  assert.equal(arrayOnlyPaths.length, 144);
  assert.ok(
    arrayOnlyPaths.every((path) => /\.distractorFormulasAjami\.\d+$/.test(path)),
    "the 144-path delta must consist only of distractorFormulasAjami array elements"
  );
  assert.equal(findNonNfcAjami(currentContent).length, 0);
});

test("generated Ajami strings and codepoint arrays remain paired", () => {
  for (const filePath of [STORED_LEXICON_PATH, MERGED_LEXICON_PATH]) {
    for (const entry of readJson(filePath).entries) {
      assert.deepEqual(entry.ajamiCodepoints, formatCodePoints(entry.ajami), entry.boko);
    }
  }
  for (const entry of readJson(TOP500_QUEUE_PATH).entries) {
    if (entry.candidateFullAjami !== null) {
      assert.deepEqual(
        entry.candidateFullCodepoints,
        formatCodePoints(entry.candidateFullAjami),
        entry.boko
      );
    }
  }
});

test("lexicon validation rejects non-NFC Ajami in generated and reviewed modes", () => {
  const entry = nonNfcEntry();
  for (const options of [{ generated: true }, {}]) {
    const result = validateLexiconEntry(entry, options);
    assert.equal(result.ok, false);
    assert.ok(result.errors.includes("ajami must be NFC-normalized"));
    assert.equal(
      result.errors.includes("ajamiCodepoints must exactly describe ajami"),
      false,
      "the fixture codepoint array agrees with the non-NFC string"
    );
  }
});

test("full content regeneration is byte-identical on consecutive runs", () => {
  const originalContent = readJson(CONTENT_PATH);
  const { map, counts } = buildMergedLexicon();
  const humanReviewedProsePacket = loadHumanReviewedProsePacket();
  const options = { lexiconEntryCount: counts.merged, humanReviewedProsePacket };
  const first = regenerateContentData(originalContent, map, options);
  const second = regenerateContentData(originalContent, map, options);
  assert.equal(JSON.stringify(first.content), JSON.stringify(second.content));
  assert.equal(JSON.stringify(first.coverage), JSON.stringify(second.coverage));
  assert.equal(JSON.stringify(first.content, null, 2), fs.readFileSync(CONTENT_PATH, "utf8").trim());
  assert.equal(
    JSON.stringify(first.coverage, null, 2),
    fs.readFileSync(path.join(MODULE_DIR, "data", "content-ajami-coverage.json"), "utf8").trim()
  );
});
