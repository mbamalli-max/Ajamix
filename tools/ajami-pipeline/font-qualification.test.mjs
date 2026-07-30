import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import {
  QUALIFICATION_TARGETS,
  REQUIRED_MARKS_AND_CARRIERS,
} from "./font-qualification.mjs";
import { probeWoff2Coverage } from "./font-probe.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIR = path.join(MODULE_DIR, "fonts", "harmattan-4.400");
const DATA_PATH = path.join(MODULE_DIR, "data", "font-qualification-report.json");
const HTML_PATH = path.join(MODULE_DIR, "font-qualification.html");
const ARCHITECTURE_PATH = path.join(
  MODULE_DIR,
  "harmattan-loading-architecture.example.md"
);
const WEIGHTS = ["Regular", "Medium", "SemiBold", "Bold"];

test("independent direct cmap parser finds all 15 targets and 16 marks/carriers", () => {
  assert.equal(QUALIFICATION_TARGETS.length, 15);
  assert.equal(REQUIRED_MARKS_AND_CARRIERS.length, 16);
  const characters = [...QUALIFICATION_TARGETS, ...REQUIRED_MARKS_AND_CARRIERS]
    .map((codePoint) => String.fromCodePoint(codePoint));
  for (const weight of WEIGHTS) {
    const result = probeWoff2Coverage(
      path.join(FONT_DIR, `Harmattan-${weight}.woff2`),
      characters
    );
    assert.equal(result.coverage.length, 31);
    assert.equal(
      result.coverage.every((item) => item.nominalGlyphPresent && item.glyphId > 0),
      true
    );
  }
});

test("generated HarfBuzz evidence has no notdef, anchor, hash, or joining failures", () => {
  const report = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  assert.equal(report.summary.allHashesMatch, true);
  assert.equal(report.summary.coveragePresent, 124);
  assert.equal(report.summary.coverageRequired, 124);
  assert.equal(report.summary.shapingTests, 1720);
  assert.equal(report.summary.notdefFailures, 0);
  assert.equal(report.summary.markAnchorFailures, 0);
  assert.equal(report.summary.joiningPasses, 60);
  assert.equal(report.summary.joiningRequired, 60);
  assert.equal(report.weights.length, 4);
  for (const weight of report.weights) {
    assert.deepEqual(weight.metadata.names.version, ["Version 4.400"]);
    assert.equal(weight.metadata.head.unitsPerEm, 2048);
    assert.equal(weight.metadata.glyphCount, 1789);
    assert.ok(weight.metadata.tableTags.includes("GSUB"));
    assert.ok(weight.metadata.tableTags.includes("GPOS"));
    assert.ok(weight.metadata.tableTags.includes("GDEF"));
    assert.equal(weight.tests.length, 430);
    assert.equal(weight.tests.every((item) => item.noNotdef), true);
    assert.equal(weight.tests.every((item) => item.markAnchorsPass), true);
  }
});

test("visual page is local-only and contains required comparisons and stress cases", () => {
  const html = fs.readFileSync(HTML_PATH, "utf8");
  assert.match(html, /Harmattan-Regular\.woff2/);
  assert.match(html, /Harmattan-Bold\.woff2/);
  assert.match(html, /NotoNaskhArabic-Regular\.woff2/);
  assert.match(html, /\(a\) shipped Noto Naskh/);
  assert.match(html, /\(b\) stock Harmattan 4\.400/);
  assert.match(html, /\(c\) browser\/system fallback/);
  assert.match(html, /lang=\\"ar\\" dir=\\"rtl\\"/);
  assert.match(html, /"ha-Arab"/);
  assert.match(html, /document\.fonts\.load/);
  assert.match(html, /mobile-frame/);
  assert.match(html, /zoom-frame/);
  for (const character of "ݑڟطثکࢼࢻࢽیؿݣࣃࣄ") {
    assert.ok(html.includes(character), `missing visual character ${character}`);
  }
  for (const phrase of [
    "Western digits",
    "Arabic-Indic digits",
    "mathematical expression",
    "mixed-script answer choice",
    "apostrophe-y",
    "glottal apostrophe candidates",
  ]) {
    assert.ok(html.includes(phrase), `missing visual category ${phrase}`);
  }
  assert.doesNotMatch(html, /(?:src|href)=["']https?:/i);
});

test("inert architecture covers offline cache, MIME, integrity, and tofu prevention", () => {
  const example = fs.readFileSync(ARCHITECTURE_PATH, "utf8");
  assert.match(example, /document\.fonts\.load/);
  assert.match(example, /ajami-font-pending/);
  assert.match(example, /cache\.addAll/);
  assert.match(example, /cache-version|cache-version suffix/i);
  assert.match(example, /shasum -a 256 -c/);
  assert.match(example, /font\/woff2/);
  assert.match(example, /same origin/i);
  assert.match(example, /no post-install network request/i);
});

