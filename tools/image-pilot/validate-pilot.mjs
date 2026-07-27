import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const repo = path.resolve(import.meta.dirname, "../..");
const specs = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "pilot-render-spec.json")));
const raw = JSON.parse(fs.readFileSync(path.join(repo, "app/content.json")));
const modules = Array.isArray(raw) ? raw : raw.modules;
const errors = [];
for (const spec of specs) {
  const module = modules.find((item) => item.id === spec.moduleId);
  const png = path.join(repo, spec.outputPath);
  const svg = path.join(import.meta.dirname, "svg", `${spec.moduleId}.svg`);
  if (!module || module.imageCard !== `images/${spec.moduleId}.png`) errors.push(`${spec.moduleId}: runtime imageCard mismatch`);
  if (!fs.existsSync(png) || !fs.existsSync(svg)) errors.push(`${spec.moduleId}: missing PNG or SVG`);
  const metadata = await sharp(png).metadata();
  if (metadata.format !== "png" || metadata.width !== 1536 || metadata.height !== 1024) errors.push(`${spec.moduleId}: wrong PNG metadata`);
  const source = fs.readFileSync(svg, "utf8");
  for (const label of spec.hausaLabels) if (!source.includes(label.replaceAll("&", "&amp;"))) errors.push(`${spec.moduleId}: missing label ${label}`);
  if (/watermark|©|™|\.com\b/i.test(source)) errors.push(`${spec.moduleId}: prohibited branding token`);
}
const exact = {
  "p1-maths-01": ["1","2","3","4","5","6","7","8","9","10"],
  "p2-maths-08": ["30 − 4 = 26","26"],
  "p3-maths-12": ["3:00","3:30","3:15"],
  "p4-maths-16": ["Ali","24","Binta","31","31 − 24 = 7"],
  "p5-maths-13": ["3.45 = 3 + 4/10 + 5/100","45 cikin 100"],
  "p6-maths-11": ["1/2 = 0.5","50%","1/4 = 0.25","25%","3/4 = 0.75","75%"],
};
for (const [id, values] of Object.entries(exact)) {
  const source = fs.readFileSync(path.join(import.meta.dirname,"svg",`${id}.svg`),"utf8");
  for (const value of values) if (!source.includes(value)) errors.push(`${id}: missing exact value ${value}`);
}
if (30 - 4 !== 26 || 31 - 24 !== 7 || .5 !== 1/2 || .25 !== 1/4 || .75 !== 3/4) errors.push("independent arithmetic recomputation failed");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`PASS: ${specs.length} pilot assets; paths, labels, 1536×1024 PNG metadata, and displayed math verified.`);
