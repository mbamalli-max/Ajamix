import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
// Configure the staged Alkalami family before sharp initializes Pango/Fontconfig.
// The font file stays in tools/image-pipeline/fonts and is never copied into output.
process.env.FONTCONFIG_FILE ??= path.resolve(import.meta.dirname, "../ajami-spike/fonts.conf");
process.env.FONTCONFIG_PATH ??= path.resolve(import.meta.dirname, "../ajami-spike");
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const overlap = (a, b) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
const lineHitsBox = (line, box) => Math.min(line.x1, line.x2) <= box.x + box.width && Math.max(line.x1, line.x2) >= box.x && Math.min(line.y1, line.y2) <= box.y + box.height && Math.max(line.y1, line.y2) >= box.y;

export function validateRecord(record) {
  const errors = [];
  if (record?.version !== "1.0") errors.push("record.version must be 1.0");
  const { width, height } = record?.canvas || {};
  if (!Number.isFinite(width) || !Number.isFinite(height)) errors.push("canvas width/height required");
  const boxes = [];
  for (const label of record?.labels || []) {
    const b = label.box || {};
    if (!label.id || !["latin", "ajami", "bilingual"].includes(label.mode)) errors.push(`invalid label identity: ${label?.id || "unknown"}`);
    if (!(b.x >= 0 && b.y >= 0 && b.width > 0 && b.height > 0 && b.x + b.width <= width && b.y + b.height <= height)) errors.push(`${label.id}: box outside canvas`);
    if (!label.lines?.length || label.lines.length > 2) errors.push(`${label.id}: requires one or two lines`);
    if (!label.font?.size || !label.font?.latinFamily || !label.font?.ajamiFamily) errors.push(`${label.id}: exact font selection required`);
    const renderedLines = label.lines.reduce((sum, line) => sum + (line.columnLines?.length || 1), 0);
    if (label.kind !== "pin") {
      const estimatedHeight = renderedLines * label.font.size * (label.font.lineHeight || 1.18) + (label.kind === "legend" ? 0 : 28);
      const estimatedWidth = Math.max(...(label.lines || []).map((line) => [...line.text].length * label.font.size * 0.58), 0) + (label.kind === "legend" ? 0 : 34);
      if (estimatedHeight > b.height || estimatedWidth > b.width) errors.push(`${label.id}: estimated text does not fit label box`);
    }
    boxes.push({ id: label.id, ...b });
    if (label.callout && lineHitsBox(label.callout, b)) errors.push(`${label.id}: callout crosses own label box`);
    if (record.safeAreas?.length && !record.safeAreas.some((safe) => b.x >= safe.x && b.y >= safe.y && b.x + b.width <= safe.x + safe.width && b.y + b.height <= safe.y + safe.height)) errors.push(`${label.id}: outside declared label-safe area`);
  }
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) if (overlap(boxes[i], boxes[j])) errors.push(`${boxes[i].id}/${boxes[j].id}: label collision`);
  for (const label of record?.labels || []) for (const other of boxes) if (other.id !== label.id && label.callout && lineHitsBox(label.callout, other)) errors.push(`${label.id}/${other.id}: callout collision`);
  return errors;
}

function markerSvg(width) {
  return `<g><rect x="24" y="${width > 700 ? 24 : 14}" width="${width - 48}" height="44" rx="10" fill="#7c1d1d"/><text x="${width / 2}" y="${width > 700 ? 54 : 44}" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="700" fill="#fff">GWAJI — BA A TANTANCE BA / UNVALIDATED TEST</text></g>`;
}

function labelSvg(label) {
  const { x, y, width, height } = label.box;
  const background = label.background || "#fffdf8";
  const foreground = label.foreground || "#17324d";
  const lineHeight = label.font.size * (label.font.lineHeight || 1.18);
  const renderedLines = label.lines.flatMap((line) => line.columnLines?.map((text) => ({ ...line, text })) || [line]);
  const lineYs = renderedLines.map((_, i) => y + (height - lineHeight * renderedLines.length) / 2 + label.font.size + i * lineHeight);
  const callout = label.callout ? `<line x1="${label.callout.x1}" y1="${label.callout.y1}" x2="${label.callout.x2}" y2="${label.callout.y2}" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>${label.callout.arrow ? `<path d="M${label.callout.x2} ${label.callout.y2} l-18 -9 l4 9 l-4 9 z" fill="#b45309"/>` : ""}` : "";
  if (label.kind === "pin") {
    const radius = Math.min(width, height) / 2;
    return `${callout}<g><circle cx="${x + radius}" cy="${y + radius}" r="${radius - 1.5}" fill="#7c1d1d" stroke="#f5d0a9" stroke-width="3"/><text x="${x + radius}" y="${y + radius + label.font.size * 0.35}" text-anchor="middle" font-family="${esc(label.font.latinFamily)}" font-size="${label.font.size}" font-weight="700" fill="#fff">${esc(label.lines[0].text)}</text></g>`;
  }
  const text = renderedLines.map((line, i) => {
    const rtl = line.direction === "rtl" || line.script === "ajami";
    const family = line.script === "ajami" ? label.font.ajamiFamily : label.font.latinFamily;
    // In SVG/Pango an RTL chunk's logical `start` is its physical right edge.
    // This produces physical right alignment while preserving HarfBuzz shaping.
    const anchor = rtl ? "start" : "start";
    const textX = rtl ? x + width - 17 : x + 17;
    return `<text x="${textX}" y="${lineYs[i]}" text-anchor="${line.script === "math" && line.columnLines ? "middle" : anchor}" direction="${rtl ? "rtl" : "ltr"}" unicode-bidi="plaintext" font-family="${esc(family)}" font-size="${label.font.size}" font-weight="${line.script === "math" ? 700 : 600}" fill="${foreground}"${line.script === "math" && line.columnLines ? ` style="font-variant-numeric:tabular-nums"` : ""}>${esc(line.text)}</text>`;
  }).join("");
  if (label.kind === "legend") return `<g>${text}</g>`;
  return `${callout}<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" fill="${background}" fill-opacity="1" stroke="#d6b98c" stroke-width="3"/>${text}</g>`;
}

export async function compose(record, outputPath) {
  const errors = validateRecord(record);
  if (errors.length) throw new Error(`Overlay record rejected:\n${errors.join("\n")}`);
  const { width, height } = record.canvas;
  const artworkHeight = record.artworkHeight || height;
  const needsMarker = record.labels.some((label) => label.lines.some((line) => line.script === "ajami" && line.validated === false));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><style>text{font-kerning:normal}</style>${record.labels.map(labelSvg).join("")}${needsMarker ? markerSvg(width) : ""}</svg>`;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const artwork = await sharp(record.baseArtwork, { animated: false }).resize(width, artworkHeight, { fit: "fill" }).png().toBuffer();
  await sharp({
    create: { width, height, channels: 3, background: "#fffdf8" },
  }).composite([{ input: artwork, top: 0, left: 0 }, { input: Buffer.from(svg), top: 0, left: 0 }]).removeAlpha().png({ compressionLevel: 9, adaptiveFiltering: false, palette: false }).toFile(outputPath);
  return { outputPath, markerApplied: needsMarker, errors: [] };
}
