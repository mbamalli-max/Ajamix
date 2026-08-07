import fs from "node:fs";

const PATH = new URL("./data/review-queue-short300.json", import.meta.url);

// argv: space-separated list of boko words to apply "all short" to,
// for every currently-open VOWEL_LENGTH/WORD_FINAL_VOWEL question.
const words = process.argv.slice(2);
if (!words.length) throw new Error("usage: node ratify-apply-batch-short.mjs <boko> [boko...]");

const q = JSON.parse(fs.readFileSync(PATH, "utf8"));
let applied = 0;

for (const boko of words) {
  const entry = q.entries.find((e) => e.boko === boko);
  if (!entry) throw new Error(`no entry for ${boko}`);
  for (const oq of entry.openQuestions ?? []) {
    if (oq.reviewerDecision) continue;
    if (oq.type !== "VOWEL_LENGTH" && oq.type !== "WORD_FINAL_VOWEL") continue;
    const shortOpt = oq.options.find((o) => o.startsWith("short"));
    if (!shortOpt) throw new Error(`${boko}/${oq.type}@${oq.position}: no short option`);
    oq.reviewerDecision = shortOpt;
    oq.reviewerNotes = "Muhammad ratified 2026-08-06 (short300 batch, bulk-confirmed all-short).";
    applied++;
  }
  const allResolved = (entry.openQuestions ?? []).every((o) => !!o.reviewerDecision);
  if (allResolved && entry.status !== "human_reviewed") {
    entry.status = "human_reviewed";
    entry.reviewerDecision = "approved_as_proposed";
    entry.reviewerNotes = "Muhammad ratified 2026-08-06 (short300 batch, bulk-confirmed all-short).";
  }
}

fs.writeFileSync(PATH, JSON.stringify(q, null, 2) + "\n");
console.log(`Applied ${applied} short decisions across ${words.length} words.`);
