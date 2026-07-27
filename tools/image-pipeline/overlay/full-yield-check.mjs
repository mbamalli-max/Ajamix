import { autoPlaceLabels } from "./auto-place-labels.mjs";
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "../../..");
const font = { latinFamily: "DejaVu Sans", ajamiFamily: "DejaVu Sans", size: 26, lineHeight: 1.2 };
const canvas = { width: 1536, height: 1024 };

const tpFiles = fs.readdirSync(path.join(REPO, "tools/image-pipeline/overlay/target-points"))
  .filter((f) => f.endsWith("-target-points.json"));

let totalImages = 0, totalLabels = 0, totalPlaced = 0, totalPinPlaced = 0, totalLegendOnly = 0, imagesFullyPlaced = 0, imagesZeroPlaced = 0;
const perImage = [];

for (const tpFile of tpFiles) {
  const band = tpFile.replace("-target-points.json", "");
  const tp = JSON.parse(fs.readFileSync(path.join(REPO, "tools/image-pipeline/overlay/target-points", tpFile)));
  const manifestFiles = fs.readdirSync(path.join(REPO, "tools/image-manifest")).filter((f) => f.startsWith(`${band}-image-manifest`));
  const manifestById = {};
  for (const mf of manifestFiles) {
    const d = JSON.parse(fs.readFileSync(path.join(REPO, "tools/image-manifest", mf)));
    for (const e of d) manifestById[e.id] = e;
  }

  for (const entry of tp) {
    const m = manifestById[entry.id];
    if (!m) { console.log("NO MANIFEST FOR", entry.id); continue; }
    const baseArtwork = path.join(REPO, `tools/image-pipeline/output/raw/style-b-${entry.id}.png`);
    if (!fs.existsSync(baseArtwork)) { console.log("NO ARTWORK FOR", entry.id); continue; }
    const labels = entry.labels.map((l, i) => ({
      id: `label-${i}`,
      text: l.text,
      targetPoint: { x: l.targetPoint.x * canvas.width, y: l.targetPoint.y * canvas.height },
    }));
    let result;
    try {
      result = await autoPlaceLabels({
        baseArtwork,
        canvas,
        title: { textHa: m.titleHa },
        labels,
        font,
      });
    } catch (e) {
      console.log("ERROR on", entry.id, e.message);
      continue;
    }
    const normalPlaced = result.record.labels.filter((label) => label.id !== "title" && !label.kind).length;
    const pinPlaced = result.record.fallback?.pinPlaced || 0;
    const legendOnly = result.record.fallback?.legendOnly || 0;
    const placed = normalPlaced + pinPlaced;
    totalImages += 1;
    totalLabels += labels.length;
    totalPlaced += placed;
    totalPinPlaced += pinPlaced;
    totalLegendOnly += legendOnly;
    if (labels.length > 0 && placed === labels.length) imagesFullyPlaced += 1;
    if (labels.length > 0 && placed === 0) imagesZeroPlaced += 1;
    perImage.push({ id: entry.id, placed, pinPlaced, legendOnly, total: labels.length });
  }
}

console.log("=== FULL YIELD CHECK ===");
console.log("images processed:", totalImages);
console.log("total labels:", totalLabels);
console.log("total placed:", totalPlaced, `(${(100*totalPlaced/totalLabels).toFixed(1)}%)`);
console.log("pin-placed labels:", totalPinPlaced);
console.log("legend-only labels:", totalLegendOnly);
console.log("images with ALL labels placed:", imagesFullyPlaced);
console.log("images with ZERO labels placed:", imagesZeroPlaced);
console.log("images with PARTIAL placement:", totalImages - imagesFullyPlaced - imagesZeroPlaced);

fs.writeFileSync(
  path.join(REPO, "tools/image-pipeline/overlay/target-points/_yield-report.json"),
  JSON.stringify(perImage, null, 2)
);
