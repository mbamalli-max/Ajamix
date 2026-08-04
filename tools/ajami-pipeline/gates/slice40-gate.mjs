import fs from "node:fs";
const p = "tools/ajami-pipeline/data/review-queue-top500.json";
const q = JSON.parse(fs.readFileSync(p, "utf8"));
const e = Array.isArray(q) ? q : q.entries;
if (e.length !== 500) throw new Error(`expected 500 entries, got ${e.length}`);
if (e.some(x => x.status === "approved")) throw new Error("an entry is marked approved");
const bad = e.filter(x =>
  /[pqvxPQVX]/.test(x.boko) ||
  ["pause", "intro", "main", "outro"].includes(String(x.boko).toLowerCase())
);
if (bad.length) throw new Error("contaminated entries remain: " + bad.map(b => b.boko).join(", "));
if (!fs.existsSync("tools/ajami-pipeline/data/review-queue-excluded.json")) {
  throw new Error("review-queue-excluded.json was not created");
}
console.log("QUEUE GATE OK: 500 clean entries, none approved, excluded file present");
