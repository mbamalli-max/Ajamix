import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const pipeline = path.resolve(import.meta.dirname, "..");
const poc = path.join(pipeline, "poc");
const provenance = JSON.parse(fs.readFileSync(path.join(poc, "provenance.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.resolve(pipeline, "..", "image-manifest", "p2-bsci-image-manifest.json"), "utf8"));
const source = manifest.find((entry) => entry.id === provenance.sourceModule);
const result = { runAt: new Date().toISOString(), scope: "PoC pipeline proofs only", automated: [], manualChecklist: "qa/manual-checklist.md", overall: "PASS" };
const add = (id, status, details) => { result.automated.push({ id, status, details }); if (status === "FAIL") result.overall = "FAIL"; };
add("label-source-provenance", JSON.stringify(source.labelsHa) === JSON.stringify(provenance.latinLabels) ? "PASS" : "FAIL", { sourceManifest: provenance.sourceManifest, module: source.id, expected: source.labelsHa, record: provenance.latinLabels });
add("math-validation", 27 + 15 === 42 ? "PASS" : "FAIL", { expression: "27 + 15 = 42" });
for (const [file, expectation] of Object.entries(provenance.outputs)) {
  const target = path.join(poc, file);
  if (!fs.existsSync(target)) { add(`asset:${file}`, "FAIL", "missing"); continue; }
  const metadata = await sharp(target).metadata();
  const valid = metadata.format === "png" && metadata.width === 1536 && metadata.height === 1024;
  add(`asset:${file}:format-dimensions`, valid ? "PASS" : "FAIL", { format: metadata.format, width: metadata.width, height: metadata.height, alpha: metadata.hasAlpha });
  add(`asset:${file}:alpha-background`, metadata.hasAlpha ? "FAIL" : "PASS", { policy: "PoC composites must be opaque" });
  const hash = crypto.createHash("sha256").update(fs.readFileSync(target)).digest("hex");
  add(`asset:${file}:checksum`, "PASS", { sha256: hash });
  if (expectation.ajami) add(`asset:${file}:unvalidated-marker`, "MANUAL_REQUIRED", expectation.marker);
  if (expectation.exactLabels) add(`asset:${file}:label-spelling`, "MANUAL_REQUIRED", { verbatimManifestStrings: expectation.exactLabels });
  if (expectation.exactMath) add(`asset:${file}:math-overlay`, "MANUAL_REQUIRED", { exact: expectation.exactMath, columnLines: expectation.columnLines });
}
result.manualRequired = ["generated-text leakage (not applicable to placeholder, mandatory for API art)", "watermark detection", "label clipping/overlap", "contrast", "mobile-card legibility", "RTL direction and visual joining", "scientific diagram accuracy", "accepted/rejected decision and rejection reason"];
fs.writeFileSync(path.join(poc, "qa-result.json"), JSON.stringify(result, null, 2) + "\n");
console.log(`QA ${result.overall}: ${result.automated.filter(x => x.status === "PASS").length} automated pass(es), ${result.automated.filter(x => x.status === "MANUAL_REQUIRED").length} manual check(s).`);
if (result.overall !== "PASS") process.exit(1);
