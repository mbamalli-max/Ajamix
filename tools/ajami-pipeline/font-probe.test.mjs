import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import { FONT_PROBE_TARGETS, probeFont } from "./font-probe.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));

test("font probe reports every exact target without substituting code points", () => {
  const report = probeFont();
  assert.deepEqual(
    report.targets.map((item) => item.character),
    FONT_PROBE_TARGETS
  );
  assert.equal(report.targets.length, 15);
  assert.equal(
    report.staticAnalysis.coverage.length === 0 ||
      report.staticAnalysis.coverage.length === FONT_PROBE_TARGETS.length,
    true
  );
});

test("font report states the hard limit of cmap analysis", () => {
  const report = probeFont();
  assert.match(report.staticAnalysis.notDeterminable, /cannot verify/i);
  assert.equal(report.visualVerification.status, "pending_human_browser_review");
});

test("HTML probe includes the shipped font, missing-font control, forms, and marks", () => {
  const html = fs.readFileSync(path.join(MODULE_DIR, "font-probe.html"), "utf8");
  assert.match(html, /NotoNaskhArabic-Regular\.woff2/);
  assert.match(html, /AJAMIX Deliberately Missing Font/);
  for (const character of FONT_PROBE_TARGETS) assert.ok(html.includes(character));
  for (const codePoint of ["&#x0652;", "&#x0651;", "&#x065C;"]) {
    assert.ok(html.includes(codePoint));
  }
});
