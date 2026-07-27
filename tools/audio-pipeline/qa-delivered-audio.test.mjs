import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildWorklist, checkOne, classifyAudioPath } from "./qa-delivered-audio.mjs";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const content = JSON.parse(fs.readFileSync(path.join(repo, "app/content.json"), "utf8"));
const nonEmptyStat = { size: 1 };

function info(duration, { bitrate = 64000, channels = 1, format = "mp3" } = {}) {
  return {
    format: { format_name: format, bit_rate: String(bitrate), duration: String(duration) },
    streams: [{ codec_type: "audio", channels }],
  };
}

function issuesFor(duration, audioFile, options) {
  return checkOne(info(duration, options), audioFile, nonEmptyStat);
}

function expectPass(name, duration, audioFile, options) {
  assert.deepEqual(issuesFor(duration, audioFile, options), [], name);
  console.log(`PASS ${name}`);
}

function expectIssue(name, duration, audioFile, pattern, options) {
  const issues = issuesFor(duration, audioFile, options);
  assert(issues.some((issue) => pattern.test(issue)), `${name}: expected ${pattern}, got ${JSON.stringify(issues)}`);
  console.log(`PASS ${name}`);
}

const formalPath = "audio/p3-maths-04.mp3";
expectIssue("formal 149.9s fails", 149.9, formalPath, /149\.9s — formal module audio must be 150-330s\./);
expectPass("formal 150s passes", 150, formalPath);
expectPass("formal 330s passes", 330, formalPath);
expectIssue("formal 331s fails", 331, formalPath, /331\.0s — formal module audio must be 150-330s\./);

const adultPaths = {
  vocational: "audio/vocational/V01-01.mp3",
  falsafa: "audio/falsafa/FL01-01.mp3",
  criticalThinking: "audio/critical-thinking/CT01-03.mp3",
};
expectIssue("adult 2.9s fails", 2.9, adultPaths.criticalThinking, /CT01-03\.mp3: 2\.9s — adult Critical Thinking clips must be 3-40s\./);
expectPass("adult 3s passes", 3, adultPaths.criticalThinking);
expectPass("adult 40s passes", 40, adultPaths.criticalThinking);
expectIssue("adult 40.1s fails", 40.1, adultPaths.criticalThinking, /CT01-03\.mp3: 40\.1s — adult Critical Thinking clips must be 3-40s\./);

for (const [name, audioFile] of Object.entries(adultPaths)) {
  const classification = classifyAudioPath(audioFile);
  assert(!classification.error, `${name}: should classify`);
  assert.match(classification.track, new RegExp(name === "criticalThinking" ? "Critical Thinking" : name === "falsafa" ? "Falsafa" : "Vocational Skills"));
  expectPass(`${name} valid path classifies and passes`, 10, audioFile);
}

expectIssue("unknown path fails classification", 10, "recordings/future/F01.mp3", /unclassifiable audio path: recordings\/future\/F01\.mp3/);
expectIssue("adult bitrate check still fails", 10, adultPaths.vocational, /bitrate=96kbps/,{ bitrate: 96000 });
expectIssue("adult mono check still fails", 10, adultPaths.vocational, /channels=2, expected 1 \(mono\)/,{ channels: 2 });
expectIssue("adult filename check still fails", 10, "audio/vocational/V01-01.wav", /filename must end in \.mp3/);

const worklist = buildWorklist(content);
const formalTargets = worklist.filter((target) => target.kind === "formal");
const adultTargets = worklist.filter((target) => target.kind === "adult-card");
assert.equal(formalTargets.length, 359, "all formal module targets remain enumerated");
assert.equal(adultTargets.length, 150, "all adult card targets are enumerated");
assert.equal(new Set(adultTargets.map((target) => target.id)).size, 150, "adult card IDs are distinct");
console.log("PASS worklist preserves 359 formal targets and enumerates 150 adult card targets");
console.log("All deterministic delivered-audio QA tests passed.");
