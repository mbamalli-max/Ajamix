import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  validateContentFile,
  validateUnicodeString,
} from "./validate-unicode.mjs";

function rules(value, options) {
  return validateUnicodeString(value, options).map((finding) => finding.rule);
}

test("validator detects every forbidden Unicode hygiene class without rewriting", () => {
  assert.ok(rules("\uFEDB").includes("ARABIC_PRESENTATION_FORMS"));
  assert.ok(rules("\uE000").includes("PRIVATE_USE_AREA"));
  assert.ok(rules("\uFFFD").includes("REPLACEMENT_CHARACTER"));
  assert.ok(rules("V\u064E").includes("LATIN_WITH_ARABIC_COMBINING_MARK"));
  assert.ok(rules("\u064E").includes("COMBINING_MARK_WITHOUT_VALID_BASE"));
  assert.ok(rules("\u0628\u0651\u064E").includes("INVALID_COMBINING_MARK_ORDER"));
  assert.ok(rules("\u0628\u06DB").includes("CONSTRUCTED_TRIPLE_DOT_SUBSTITUTE"));
  assert.ok(rules("\u0628\u0651\u064E").includes("NORMALIZATION_INSTABILITY_NFC"));
});

test("new native-Hausa output applies context-dependent AJAMIX prohibitions", () => {
  const options = {
    nativeHausa: true,
    newlyGenerated: true,
    sourceBoko: "haraji da 'yan ƙasa",
  };
  const detected = rules("\u0751\u0646 \u06D1 \u0647 \u0253 \u0027y \u0688", options);
  assert.ok(detected.includes("MIXED_CANONICAL_NONCANONICAL_NATIVE_HAUSA"));
  assert.ok(detected.includes("U+06D1_IN_NEW_AJAMIX_OUTPUT"));
  assert.ok(detected.includes("UNCONDITIONAL_HEH_FOR_NATIVE_HAUSA_H"));
  assert.ok(detected.includes("UNCONVERTED_BOKO_SPECIAL_LETTER"));
  assert.ok(detected.includes("UNCONVERTED_APOSTROPHE_Y"));
  assert.ok(detected.includes("UNSUPPORTED_EXTENDED_ARABIC_GLYPH"));
});

test("U+06D1 is not called malformed in imported/stored analysis mode", () => {
  const detected = rules("\u06D1", { nativeHausa: true, newlyGenerated: false });
  assert.equal(detected.includes("U+06D1_IN_NEW_AJAMIX_OUTPUT"), false);
});

test("read-only fixture scan detects both known defect shapes and preserves source bytes", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajami-unicode-scan-"));
  try {
    const contentPath = path.join(temporaryDirectory, "content.json");
    const fixture = {
      activities: [{
        activityId: "pn-maths-01",
        topicHa: "Kirgawa 1–3",
        topicAjami: "\uFEDBِرْغَوَا 1–3",
      }],
      modules: [{
        id: "V08",
        titleHa: "Haraji na VAT",
        titleAjami: "هَرَجِي نَا Vَت",
      }],
    };
    fs.writeFileSync(contentPath, `${JSON.stringify(fixture, null, 2)}\n`);
    const before = fs.readFileSync(contentPath);

    const report = validateContentFile(contentPath);

    assert.equal(report.summary.knownDefectSelfTests.passed, true);
    assert.equal(report.summary.knownDefectSelfTests.pnMaths01PresentationFormsDetected, true);
    assert.equal(report.summary.knownDefectSelfTests.v08LatinVWithFathaDetected, true);
    assert.equal(report.summary.sourceIntegrity.sourceUnchanged, true);
    assert.deepEqual(fs.readFileSync(contentPath), before);
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
