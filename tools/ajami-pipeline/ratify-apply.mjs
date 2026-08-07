import fs from "node:fs";
import { formatCodePoints } from "./tokenizer.mjs";

const PATH = "/Users/muhammadbamalli/code/ajamix/tools/ajami-pipeline/data/review-queue-short300.json";

// argv: boko type position decisionOptionString [suppliedSequence]
const [, , boko, type, positionStr, decision, supplied] = process.argv;
const position = Number(positionStr);

const q = JSON.parse(fs.readFileSync(PATH, "utf8"));
const entry = q.entries.find((e) => e.boko === boko);
if (!entry) throw new Error(`no entry for ${boko}`);
const oq = entry.openQuestions.find((o) => o.type === type && o.position === position);
if (!oq) throw new Error(`no open question ${type}@${position} for ${boko}`);
if (!oq.options.includes(decision)) throw new Error(`decision not in options: ${decision}\noptions: ${JSON.stringify(oq.options)}`);

oq.reviewerDecision = decision;
oq.reviewerNotes = "Muhammad ratified 2026-08-04 (short300 batch).";
if (supplied !== undefined) {
  oq.reviewerSuppliedSequence = supplied;
  oq.reviewerSuppliedCodepoints = formatCodePoints(supplied);
}

// mark entry human_reviewed if all open questions now resolved
const allResolved = (entry.openQuestions ?? []).every((o) => !!o.reviewerDecision);
if (allResolved && entry.status !== "human_reviewed") {
  entry.status = "human_reviewed";
  entry.reviewerDecision = "approved_as_proposed";
  entry.reviewerNotes = "Muhammad ratified 2026-08-04 (short300 batch).";
}

fs.writeFileSync(PATH, JSON.stringify(q, null, 2) + "\n");
console.log(`OK ${boko}/${type}@${position} -> ${decision}${allResolved ? " [entry human_reviewed]" : ""}`);
