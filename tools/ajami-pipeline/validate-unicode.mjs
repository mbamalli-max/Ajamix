#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CANONICAL_MAPPING } from "./mapping.mjs";
import { formatCodePoints } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");
const CONTENT_PATH = path.join(REPO_ROOT, "app", "content.json");
const DEFAULT_OUTPUT = path.join(MODULE_DIR, "data", "unicode-validation-report.json");

const APOSTROPHE_Y = /(?:\u0027|\u2019|\u02BC)[yY]/u;
const UNCONVERTED_SPECIAL = /[\u0253\u0257\u0199\u01B4\u01B3]/u;
const ARABIC_MARK = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u08D3-\u08FF]/u;
const ARABIC_LETTER = /^(?=\p{Script=Arabic}$)\p{L}$/u;
const LATIN_LETTER = /^(?=\p{Script=Latin}$)\p{L}$/u;
const MARK = /^\p{M}$/u;

const canonicalCodePoints = new Set(
  [
    ...CANONICAL_MAPPING.canonicalConsonants,
    ...CANONICAL_MAPPING.provisionalVelarClusters,
  ].flatMap((entry) => Array.from(entry.glyph, (character) => character.codePointAt(0)))
);
const noncanonicalCodePoints = new Set(
  CANONICAL_MAPPING.noncanonicalVariants.flatMap((entry) =>
    Array.from(entry.glyph, (character) => character.codePointAt(0))
  )
);
// U+0628 and U+062F are canonical plain b/d as well as context-dependent
// alternatives for ɓ/ɗ, so code points alone cannot identify them as variants.
for (const codePoint of canonicalCodePoints) noncanonicalCodePoints.delete(codePoint);
const supportedArabicCodePoints = new Set([
  ...canonicalCodePoints,
  ...noncanonicalCodePoints,
  ...CANONICAL_MAPPING.vowelAndMarkInventory.flatMap((entry) =>
    Array.from(entry.glyph, (character) => character.codePointAt(0))
  ),
  0x0621,
  0x0639,
  0x0640,
]);

function inRange(codePoint, start, end) {
  return codePoint >= start && codePoint <= end;
}

function isPresentationForm(codePoint) {
  return inRange(codePoint, 0xfb50, 0xfeff);
}

function isPrivateUse(codePoint) {
  return (
    inRange(codePoint, 0xe000, 0xf8ff) ||
    inRange(codePoint, 0xf0000, 0xffffd) ||
    inRange(codePoint, 0x100000, 0x10fffd)
  );
}

function isArabicExtendedLetter(codePoint) {
  return (
    inRange(codePoint, 0x0671, 0x06d3) ||
    inRange(codePoint, 0x0750, 0x077f) ||
    inRange(codePoint, 0x0870, 0x089f) ||
    inRange(codePoint, 0x08a0, 0x08c9)
  );
}

function finding(rule, disposition, detail = {}) {
  return { rule, recommendedDisposition: disposition, ...detail };
}

function indexesMatching(characters, predicate) {
  const indexes = [];
  characters.forEach((character, index) => {
    if (predicate(character.codePointAt(0), character, index)) indexes.push(index);
  });
  return indexes;
}

function precedingBase(characters, index) {
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    if (!MARK.test(characters[cursor])) return characters[cursor];
  }
  return "";
}

function markRuns(characters) {
  const runs = [];
  for (let index = 0; index < characters.length;) {
    if (!MARK.test(characters[index])) {
      index += 1;
      continue;
    }
    const start = index;
    while (index < characters.length && MARK.test(characters[index])) index += 1;
    runs.push({ start, marks: characters.slice(start, index).join("") });
  }
  return runs;
}

/**
 * Validate one string without rewriting it.
 *
 * Context-sensitive rules are only asserted when their required context flags
 * are supplied. Stored legacy text should use `newlyGenerated: false`.
 */
export function validateUnicodeString(value, {
  nativeHausa = false,
  newlyGenerated = false,
  sourceBoko = null,
} = {}) {
  const text = String(value ?? "");
  const characters = Array.from(text);
  const findings = [];
  const add = (rule, disposition, detail = {}) => {
    if (!findings.some((item) => item.rule === rule)) {
      findings.push(finding(rule, disposition, detail));
    }
  };

  const presentationIndexes = indexesMatching(characters, isPresentationForm);
  if (presentationIndexes.length) {
    add(
      "ARABIC_PRESENTATION_FORMS",
      "Regenerate or human-correct from the authoritative source using standard Unicode; do not normalize presentation forms in place.",
      { characterIndexes: presentationIndexes }
    );
  }

  const privateUseIndexes = indexesMatching(characters, isPrivateUse);
  if (privateUseIndexes.length) {
    add(
      "PRIVATE_USE_AREA",
      "Block the output and identify the originating font/encoder; do not preserve private-use storage.",
      { characterIndexes: privateUseIndexes }
    );
  }

  const replacementIndexes = indexesMatching(characters, (codePoint) => codePoint === 0xfffd);
  if (replacementIndexes.length) {
    add(
      "REPLACEMENT_CHARACTER",
      "Block and recover the original character from source data; U+FFFD is irreversible evidence of decoding loss.",
      { characterIndexes: replacementIndexes }
    );
  }

  const latinWithArabicMark = [];
  const orphanMarks = [];
  characters.forEach((character, index) => {
    if (!ARABIC_MARK.test(character)) return;
    const base = precedingBase(characters, index);
    if (LATIN_LETTER.test(base)) latinWithArabicMark.push(index);
    if (!ARABIC_LETTER.test(base)) orphanMarks.push(index);
  });
  if (latinWithArabicMark.length) {
    add(
      "LATIN_WITH_ARABIC_COMBINING_MARK",
      "Block and route the Latin token through acronym/loanword review; never attach Arabic marks to Latin letters.",
      { characterIndexes: latinWithArabicMark }
    );
  }
  if (orphanMarks.length) {
    add(
      "COMBINING_MARK_WITHOUT_VALID_BASE",
      "Block and review the mark with its intended Arabic base; never silently move or delete it.",
      { characterIndexes: orphanMarks }
    );
  }

  const invalidRuns = markRuns(characters).filter(
    ({ marks }) => marks.normalize("NFD") !== marks
  );
  if (invalidRuns.length) {
    add(
      "INVALID_COMBINING_MARK_ORDER",
      "Regenerate the reviewed output with canonical combining-mark order; preserve the source unchanged during validation.",
      { characterIndexes: invalidRuns.map((run) => run.start) }
    );
  }

  const constructedIndexes = indexesMatching(
    characters,
    (codePoint, _character, index) =>
      codePoint === 0x06db && ARABIC_LETTER.test(precedingBase(characters, index))
  );
  if (constructedIndexes.length) {
    add(
      "CONSTRUCTED_TRIPLE_DOT_SUBSTITUTE",
      "Block and regenerate with the exact precomposed canonical Hausa consonant from canonical-mapping.json.",
      { characterIndexes: constructedIndexes }
    );
  }

  if (text !== text.normalize("NFC") || text.normalize("NFC").normalize("NFC") !== text.normalize("NFC")) {
    add(
      "NORMALIZATION_INSTABILITY_NFC",
      "Block new output and regenerate in NFC. For stored content, review and migrate explicitly; validation never rewrites it."
    );
  }

  const zeroWidthIndexes = indexesMatching(
    characters,
    (codePoint) => [0x200b, 0x200c, 0x200d, 0x2060, 0xfeff].includes(codePoint)
  );
  if (zeroWidthIndexes.length) {
    add(
      "UNDOCUMENTED_ZERO_WIDTH_CONTROL",
      "Review bidi/joining intent and remove only through an explicit migration if no documented justification exists.",
      { characterIndexes: zeroWidthIndexes }
    );
  }

  if (nativeHausa) {
    const hasCanonical = characters.some((character) =>
      canonicalCodePoints.has(character.codePointAt(0))
    );
    const variantIndexes = indexesMatching(characters, (codePoint) =>
      noncanonicalCodePoints.has(codePoint)
    );
    if (hasCanonical && variantIndexes.length) {
      add(
        "MIXED_CANONICAL_NONCANONICAL_NATIVE_HAUSA",
        "Queue the complete word/string for orthographic review and regenerate consistently; do not globally substitute variants.",
        { characterIndexes: variantIndexes }
      );
    }

    const specialIndexes = indexesMatching(characters, (_codePoint, character) =>
      UNCONVERTED_SPECIAL.test(character)
    );
    if (specialIndexes.length) {
      add(
        "UNCONVERTED_BOKO_SPECIAL_LETTER",
        "Block generated output and retokenize with the existing tokenizer and canonical mapping.",
        { characterIndexes: specialIndexes }
      );
    }
    if (APOSTROPHE_Y.test(text)) {
      add(
        "UNCONVERTED_APOSTROPHE_Y",
        "Block generated output and normalize the alias to HAUSA_GLOTTALIZED_Y → U+063F."
      );
    }

    if (
      text.includes("\u0647") &&
      typeof sourceBoko === "string" &&
      /h/iu.test(sourceBoko)
    ) {
      add(
        "UNCONDITIONAL_HEH_FOR_NATIVE_HAUSA_H",
        "Queue for lexical classification. Native Hausa defaults to U+062D; preserve U+0647 only for reviewed Arabic, Quranic, or proper-name spelling."
      );
    }

    const unsupportedIndexes = indexesMatching(
      characters,
      (codePoint, character) =>
        ARABIC_LETTER.test(character) &&
        isArabicExtendedLetter(codePoint) &&
        !supportedArabicCodePoints.has(codePoint)
    );
    if (unsupportedIndexes.length) {
      add(
        "UNSUPPORTED_EXTENDED_ARABIC_GLYPH",
        "Block new generation and classify the character; do not substitute a visually similar code point.",
        { characterIndexes: unsupportedIndexes }
      );
    }
  }

  if (newlyGenerated && text.includes("\u06D1")) {
    add(
      "U+06D1_IN_NEW_AJAMIX_OUTPUT",
      "Block and regenerate HAUSA_GLOTTALIZED_Y as U+063F. U+06D1 remains an attested import variant, not generated AJAMIX output."
    );
  }

  return findings;
}

function sourceBokoFor(object, key) {
  if (key === "ajami" && typeof object.ha === "string") return object.ha;
  if (key.endsWith("Ajami")) {
    const stem = key.slice(0, -"Ajami".length);
    for (const candidate of [`${stem}Ha`, stem]) {
      if (typeof object[candidate] === "string") return object[candidate];
    }
  }
  return null;
}

function isAjamiField(key) {
  return key === "ajami" || key.endsWith("Ajami");
}

function entityIdentity(value, inherited) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return inherited;
  return value.id ?? value.activityId ?? inherited;
}

function countBy(items, selector) {
  const counts = {};
  for (const item of items) {
    const key = selector(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.fromEntries(
    Object.entries(counts).sort((left, right) =>
      right[1] - left[1] || left[0].localeCompare(right[0])
    )
  );
}

export function validateContentFile(contentPath = CONTENT_PATH) {
  const before = fs.readFileSync(contentPath);
  const content = JSON.parse(before.toString("utf8"));
  const findings = [];
  let stringsScanned = 0;
  let ajamiFieldsScanned = 0;

  function walk(value, parts = [], entityId = "_root") {
    if (Array.isArray(value)) {
      value.forEach((child, index) => walk(child, [...parts, index], entityId));
      return;
    }
    if (!value || typeof value !== "object") return;
    const currentEntity = entityIdentity(value, entityId);
    for (const [key, child] of Object.entries(value)) {
      const childParts = [...parts, key];
      if (typeof child === "string") {
        stringsScanned += 1;
        const nativeHausa = isAjamiField(key);
        if (nativeHausa) ajamiFieldsScanned += 1;
        const stringFindings = validateUnicodeString(child, {
          nativeHausa,
          newlyGenerated: false,
          sourceBoko: nativeHausa ? sourceBokoFor(value, key) : null,
        });
        for (const item of stringFindings) {
          findings.push({
            file: path.relative(REPO_ROOT, contentPath),
            field: childParts.join("."),
            entityId: currentEntity,
            string: child,
            codePointSequence: formatCodePoints(child),
            ...item,
          });
        }
      } else {
        walk(child, childParts, currentEntity);
      }
    }
  }
  walk(content);

  const after = fs.readFileSync(contentPath);
  const beforeHash = crypto.createHash("sha256").update(before).digest("hex");
  const afterHash = crypto.createHash("sha256").update(after).digest("hex");
  const knownPresentationDetected = findings.some(
    (item) =>
      item.entityId === "pn-maths-01" &&
      item.field.endsWith("topicAjami") &&
      item.rule === "ARABIC_PRESENTATION_FORMS"
  );
  const knownV08Detected = findings.some(
    (item) =>
      item.entityId === "V08" &&
      item.rule === "LATIN_WITH_ARABIC_COMBINING_MARK" &&
      item.string.includes("V\u064E")
  );

  return {
    schemaVersion: 1,
    taskId: "2026-07-28-slice-36",
    validatorMode: "read_only_no_rewrite",
    source: path.relative(REPO_ROOT, contentPath),
    scanContext:
      "Live content is existing stored/legacy material, not newly generated AJAMIX text. Contextual findings recommend review and do not silently rewrite or declare every legacy variant malformed.",
    summary: {
      stringsScanned,
      ajamiFieldsScanned,
      findingCount: findings.length,
      fieldsWithFindings: new Set(findings.map((item) => item.field)).size,
      byRule: countBy(findings, (item) => item.rule),
      knownDefectSelfTests: {
        pnMaths01PresentationFormsDetected: knownPresentationDetected,
        v08LatinVWithFathaDetected: knownV08Detected,
        passed: knownPresentationDetected && knownV08Detected,
      },
      sourceIntegrity: {
        sha256Before: beforeHash,
        sha256After: afterHash,
        sourceUnchanged: beforeHash === afterHash,
      },
    },
    findings,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputFlag = process.argv.indexOf("--write");
  const outputPath = outputFlag >= 0 && process.argv[outputFlag + 1]
    ? path.resolve(process.cwd(), process.argv[outputFlag + 1])
    : DEFAULT_OUTPUT;
  const report = validateContentFile();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    output: path.relative(REPO_ROOT, outputPath),
    summary: report.summary,
  }, null, 2));
}
