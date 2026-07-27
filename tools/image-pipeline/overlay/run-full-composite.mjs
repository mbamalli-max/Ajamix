import { autoPlaceLabels } from "./auto-place-labels.mjs";
import { compose } from "./compositor.mjs";
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "../../..");
const OUT_DIR = path.join(REPO, "tools/image-pipeline/output/composited");
fs.mkdirSync(OUT_DIR, { recursive: true });

const font = { latinFamily: "DejaVu Sans", ajamiFamily: "DejaVu Sans", size: 26, lineHeight: 1.2 };
const canvas = { width: 1536, height: 1024 };

const manifestDir = path.join(REPO, "tools/image-manifest");
const manifestFiles = fs.readdirSync(manifestDir).filter((f) => f.startsWith("p") && f.endsWith("-image-manifest.json") || f.includes("-image-manifest-part2.json"));

// Group manifest files by band (handles the p3-socs split-file case)
const byBand = {};
for (const f of manifestFiles) {
  const band = f.replace(/-image-manifest(-part\d+)?\.json$/, "");
  byBand[band] = byBand[band] || [];
  byBand[band].push(f);
}

const targetPointsDir = path.join(REPO, "tools/image-pipeline/overlay/target-points");

let total = 0, succeeded = 0, failed = 0;
const failures = [];
const results = [];

for (const band of Object.keys(byBand).sort()) {
  const entries = [];
  for (const f of byBand[band]) {
    entries.push(...JSON.parse(fs.readFileSync(path.join(manifestDir, f))));
  }
  const tpPath = path.join(targetPointsDir, `${band}-target-points.json`);
  const tpById = {};
  if (fs.existsSync(tpPath)) {
    for (const e of JSON.parse(fs.readFileSync(tpPath))) tpById[e.id] = e.labels;
  }

  for (const m of entries) {
    total += 1;
    const id = m.id;
    const baseArtwork = path.join(REPO, `tools/image-pipeline/output/raw/style-b-${id}.png`);
    if (!fs.existsSync(baseArtwork)) {
      failed += 1;
      failures.push({ id, error: "missing raw artwork" });
      continue;
    }
    const rawLabels = tpById[id] || [];
    const labels = rawLabels.map((l, i) => ({
      id: `label-${i}`,
      text: l.text,
      targetPoint: { x: l.targetPoint.x * canvas.width, y: l.targetPoint.y * canvas.height },
    }));
    try {
      const result = await autoPlaceLabels({
        baseArtwork,
        canvas,
        title: { textHa: m.titleHa },
        labels,
        font,
      });
      const outPath = path.join(OUT_DIR, `${id}.png`);
      await compose(result.record, outPath);
      succeeded += 1;
      results.push({
        id,
        outPath,
        canvasHeight: result.record.canvas.height,
        totalLabels: labels.length,
        pinPlaced: result.record.fallback?.pinPlaced || 0,
        legendOnly: result.record.fallback?.legendOnly || 0,
        unplaceable: result.unplaceable || [],
      });
    } catch (e) {
      failed += 1;
      failures.push({ id, error: e.message });
    }
  }
}

console.log("=== FULL COMPOSITE RUN ===");
console.log("total:", total, "succeeded:", succeeded, "failed:", failed);
if (failures.length) {
  console.log("FAILURES:");
  for (const f of failures) console.log(" -", f.id, ":", f.error);
}

fs.writeFileSync(
  path.join(REPO, "tools/image-pipeline/output/composited/_composite-report.json"),
  JSON.stringify({ total, succeeded, failed, failures, results }, null, 2)
);
