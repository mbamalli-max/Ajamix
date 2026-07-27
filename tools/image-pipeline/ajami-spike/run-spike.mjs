import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";

const here = path.resolve(import.meta.dirname);
process.env.FONTCONFIG_FILE = path.join(here, "fonts.conf");
process.env.FONTCONFIG_PATH = here;
const require = createRequire(import.meta.url);
const sharp = require("sharp");
const output = path.join(here, "output");
fs.mkdirSync(output, { recursive: true });
const W = 1536, H = 1024;
const marker = "GWAJI — BA A TANTANCE BA / UNVALIDATED TEST";
const tests = [
  { id: "rtl-joining-diacritics", title: "RTL, joining, and diacritics", text: "اجمي نَصّ تَجْرِيبِي" },
  { id: "right-aligned", title: "Right alignment", text: "اجمي نَصّ تَجْرِيبِي" },
  { id: "arrow-label", title: "Arrow label", text: "اجمي نَصّ تَجْرِيبِي" },
  { id: "bilingual-two-line", title: "Bilingual two-line", text: "اجمي نَصّ تَجْرِيبِي" },
  { id: "mixed-latin-ajami", title: "Mixed Latin/Ajami", text: "Latin 123 — اجمي نَصّ تَجْرِيبِي" },
  { id: "mobile-size", title: "Mobile-size legibility", text: "اجمي نَصّ تَجْرِيبِي" }
];
const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const rows = tests.map((test, i) => {
  const y = 145 + i * 132;
  const arrow = test.id === "arrow-label" ? `<line x1="260" y1="${y - 12}" x2="480" y2="${y - 12}" stroke="#9d4e18" stroke-width="7"/><path d="M480 ${y - 12}l-18 -10l4 10l-4 10z" fill="#9d4e18"/>` : "";
  const anchor = test.id === "right-aligned" ? "start" : "middle";
  const x = test.id === "right-aligned" ? 1410 : 900;
  const size = test.id === "mobile-size" ? 32 : 48;
  const content = test.id === "bilingual-two-line" ? `<text x="${x}" y="${y - 20}" text-anchor="${anchor}" direction="rtl" unicode-bidi="plaintext" font-family="Alkalami" font-size="48" fill="#172f42">${esc(test.text)}</text><text x="${x}" y="${y + 28}" text-anchor="${anchor}" font-family="DejaVu Sans" font-size="28" fill="#172f42">UNVALIDATED Latin secondary</text>` : `<text x="${x}" y="${y}" text-anchor="${anchor}" direction="rtl" unicode-bidi="plaintext" font-family="Alkalami" font-size="${size}" fill="#172f42">${esc(test.text)}</text>`;
  return `<g><text x="75" y="${y - 40}" font-family="DejaVu Sans" font-size="22" font-weight="700" fill="#7c4522">${esc(test.title)}</text>${arrow}${content}</g>`;
}).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="100%" height="100%" fill="#fff7e7"/><rect x="28" y="24" width="1480" height="47" rx="10" fill="#7c1d1d"/><text x="768" y="56" text-anchor="middle" font-family="DejaVu Sans" font-size="23" font-weight="700" fill="#fff">${marker}</text>${rows}</svg>`;
const svgPath = path.join(output, "ajami-typography-unvalidated.svg");
const pngPath = path.join(output, "ajami-typography-unvalidated.png");
fs.writeFileSync(svgPath, svg);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: false, palette: false }).toFile(pngPath);
const metadata = await sharp(pngPath).metadata();
const sha256 = crypto.createHash("sha256").update(fs.readFileSync(pngPath)).digest("hex");
const report = {
  purpose: "UNVALIDATED typography infrastructure spike; no learner-facing Ajami and no content.json strings.",
  font: "tools/image-pipeline/fonts/Alkalami-Regular.ttf (staged; not copied)",
  renderingPath: "SVG -> sharp/libvips; sharp reports Pango/Harfbuzz component versions below.",
  tests: tests.map((test) => ({ id: test.id, testString: test.text, marker, technicallyRendered: metadata.format === "png" && metadata.width === W && metadata.height === H, visuallyLegible: "PASS — Phase 1 local visual review; rerun review after font or runtime changes", linguisticallyValidated: false })),
  runtime: { sharp: sharp.versions, fontconfigFile: "ajami-spike/fonts.conf" },
  artifact: { svg: path.basename(svgPath), png: path.basename(pngPath), sha256, width: metadata.width, height: metadata.height, hasAlpha: metadata.hasAlpha },
  assessmentBoundary: "Phase 1 can assess technically rendered and visually legible only. It cannot assess linguistic validity; every test string is explicitly unvalidated."
};
fs.writeFileSync(path.join(output, "glyph-shaping-report.json"), JSON.stringify(report, null, 2) + "\n");
console.log(`Ajami spike rendered SVG and PNG at ${W}x${H}; sha256=${sha256}`);
