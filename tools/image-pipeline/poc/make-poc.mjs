import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { compose } from "../overlay/compositor.mjs";
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const here = path.resolve(import.meta.dirname);
const base = path.join(here, "placeholder-base-not-ai-art.png");
const out = (name) => path.join(here, name);
const W = 1536, H = 1024;
const font = { latinFamily: "DejaVu Sans", ajamiFamily: "Alkalami", size: 42, lineHeight: 1.12 };
const label = (id, x, y, width, height, text, callout) => ({ id, mode: "latin", box: { x, y, width, height }, font, lines: [{ script: "latin", text, direction: "ltr", validated: true }], callout, mobileSafe: true });
const record = (labels) => ({ version: "1.0", baseArtwork: base, canvas: { width: W, height: H }, safeAreas: labels.map(({ box }) => box), labels });

const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><filter id="grain"><feTurbulence baseFrequency=".55" numOctaves="2" seed="47" type="fractalNoise"/><feColorMatrix values="1 0 0 0 .82 0 1 0 0 .72 0 0 1 0 .52 0 0 0 .12 0"/></filter><linearGradient id="g" x2="0" y2="1"><stop stop-color="#f7ead1"/><stop offset="1" stop-color="#d6c39e"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" filter="url(#grain)" opacity=".28"/><circle cx="768" cy="520" r="152" fill="#c9b17b" opacity=".42"/><path d="M768 676V425 M768 495C680 430 625 455 600 395 M768 540C860 474 915 505 938 445" stroke="#7a8b49" stroke-width="25" fill="none" stroke-linecap="round"/><ellipse cx="620" cy="390" rx="70" ry="30" fill="#91a85a" transform="rotate(-26 620 390)"/><ellipse cx="915" cy="440" rx="72" ry="31" fill="#91a85a" transform="rotate(25 915 440)"/><path d="M620 700Q768 635 916 700Z" fill="#8a5a3b"/><text x="768" y="958" text-anchor="middle" font-family="DejaVu Sans" font-size="31" font-weight="700" fill="#6b3b2c">PLACEHOLDER BASE — NOT AI ART</text></svg>`;
await sharp(Buffer.from(baseSvg)).png({ compressionLevel: 9, adaptiveFiltering: false }).toFile(base);

await compose(record([
  label("water", 70, 160, 260, 82, "Ruwa", { x1: 350, y1: 201, x2: 665, y2: 515, arrow: true }),
  label("air", 70, 570, 260, 82, "Iska", { x1: 350, y1: 611, x2: 640, y2: 455, arrow: true }),
  label("sun", 1130, 160, 340, 82, "Hasken Rana", { x1: 1110, y1: 201, x2: 880, y2: 430, arrow: true }),
  label("soil", 1190, 570, 260, 82, "Ƙasa", { x1: 1170, y1: 611, x2: 850, y2: 670, arrow: true })
]), out("latin-p2-bsci-16-proof.png"));

const ajami = (id, x, y, w, h, text) => ({ id, mode: "ajami", box: { x, y, width: w, height: h }, font: { ...font, size: 48 }, lines: [{ script: "ajami", text, direction: "rtl", validated: false }], mobileSafe: true });
await compose(record([ajami("ajami-test", 243, 410, 1050, 112, "اجمي نَصّ تَجْرِيبِي")]), out("ajami-unvalidated-proof.png"));
await compose(record([{ id: "bilingual-test", mode: "bilingual", box: { x: 260, y: 390, width: 1016, height: 180 }, font: { ...font, size: 44 }, lines: [{ script: "ajami", text: "اجمي نَصّ تَجْرِيبِي", direction: "rtl", validated: false }, { script: "latin", text: "UNVALIDATED Latin-secondary test", direction: "ltr", validated: true }], mobileSafe: true }]), out("bilingual-unvalidated-proof.png"));
await compose(record([{ id: "math-exact", mode: "latin", box: { x: 520, y: 315, width: 500, height: 390 }, font: { ...font, size: 64, lineHeight: 1.05 }, lines: [{ script: "math", text: "27 + 15 = 42", direction: "ltr", validated: true, columnLines: ["  27", "+ 15", "────", "  42"] }], mobileSafe: true }]), out("math-27-plus-15-equals-42-proof.png"));
console.log("Created placeholder base and four isolated pipeline proofs under tools/image-pipeline/poc/.");
