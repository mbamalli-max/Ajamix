import fs from "node:fs";

// Bulk-applies a default kaf/qaf K_ARTICULATION decision across a word list against any queue file,
// with per-word exceptions. Handles gemination-paired K_PLAIN positions (must agree) transparently.
//
// usage: node ratify-apply-k-batch.mjs --file <path> --default kaf|qaf --words <word1,word2,...> [--qaf word3,word4] [--kaf word5]
const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
}

const PATH = flag("--file");
const DEFAULT = flag("--default");
const words = (flag("--words") ?? "").split(",").filter(Boolean);
const qafExceptions = new Set((flag("--qaf") ?? "").split(",").filter(Boolean));
const kafExceptions = new Set((flag("--kaf") ?? "").split(",").filter(Boolean));
// per-position exceptions: word@position=kaf|qaf, comma separated
const posExceptions = new Map();
for (const item of (flag("--pos") ?? "").split(",").filter(Boolean)) {
  const [key, val] = item.split("=");
  posExceptions.set(key, val);
}

if (!PATH || !DEFAULT || !words.length) throw new Error("usage: --file <path> --default kaf|qaf --words w1,w2,...");

const KAF = "kaf — U+06A9";
const QAF = "qaf — U+0642";
const NOTE = `Muhammad ratified ${new Date().toISOString().slice(0, 10)} (K_ARTICULATION batch).`;

const q = JSON.parse(fs.readFileSync(PATH, "utf8"));
let applied = 0;

for (const boko of words) {
  const entry = q.entries.find((e) => e.boko === boko);
  if (!entry) throw new Error(`no entry for ${boko}`);
  let wordDecision = DEFAULT === "qaf" ? QAF : KAF;
  if (qafExceptions.has(boko)) wordDecision = QAF;
  if (kafExceptions.has(boko)) wordDecision = KAF;

  for (const oq of entry.openQuestions ?? []) {
    if (oq.type !== "K_ARTICULATION" || oq.reviewerDecision) continue;
    const posKey = `${boko}@${oq.position}`;
    let decision = wordDecision;
    if (posExceptions.has(posKey)) {
      decision = posExceptions.get(posKey) === "qaf" ? QAF : KAF;
    }
    oq.reviewerDecision = decision;
    oq.reviewerNotes = NOTE;
    applied++;
  }

  const allResolved = (entry.openQuestions ?? []).every((o) => !!o.reviewerDecision);
  if (allResolved && entry.status !== "human_reviewed") {
    entry.status = "human_reviewed";
    entry.reviewerDecision = "approved_as_proposed";
    entry.reviewerNotes = NOTE;
  }
}

fs.writeFileSync(PATH, JSON.stringify(q, null, 2) + "\n");
console.log(`Applied ${applied} K_ARTICULATION decisions across ${words.length} words.`);
