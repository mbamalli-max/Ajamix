import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const args = process.argv.slice(2);
const value = (flag) => args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
const dryRun = args.includes("--dry-run");
const live = args.includes("--live");
const authorizeLive = args.includes("--authorize-live");
const queuePath = path.resolve(value("--queue") || "generate/style-comparison-queue.json");
const model = value("--model");
if ((dryRun && live) || (!dryRun && !live)) throw new Error("Choose exactly one of --dry-run or --live.");
if (live && !authorizeLive) throw new Error("Live generation is locked. Supply --live --authorize-live only after explicit approval.");

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const digest = (input) => crypto.createHash("sha256").update(input).digest("hex");
const stable = (object) => JSON.stringify(object, Object.keys(object).sort());
const validateJob = (job) => {
  for (const key of ["id", "status", "moduleId", "prompt", "negativePrompt", "output", "labelSource"]) if (!job[key]) throw new Error(`${job.id || "unknown"}: missing ${key}`);
  if (!/(no text|no writing|do not include any writing|contains no text)/i.test(job.prompt)) throw new Error(`${job.id}: prompt does not reserve text for overlay`);
  if (!Array.isArray(job.labelSource.labelsHa)) throw new Error(`${job.id}: label provenance is incomplete`);
};
for (const job of queue.jobs) validateJob(job);

const pending = queue.jobs.filter((job) => job.status === "queued" || job.status === "retry");
if (dryRun) {
  console.log(`DRY RUN — zero network calls — queue: ${path.relative(process.cwd(), queuePath)}`);
  console.log(`model=${model || queue.defaultModel || "gpt-image-1"}; pending=${pending.length}; queue SHA-256=${digest(fs.readFileSync(queuePath))}`);
  for (const job of pending) console.log(`WOULD SUBMIT ${job.id} | ${job.style} | labels=${job.labelSource.labelsHa.join(" | ")} | attempts=${job.attempts || 0}`);
  console.log("Queue state deliberately unchanged; rerun is resumable and deterministic.");
  process.exit(0);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY is required for a live call and is only read from the environment.");
const rawDir = path.resolve("output/raw");
fs.mkdirSync(rawDir, { recursive: true });
for (const job of pending) {
  const requestedModel = model || queue.defaultModel || "gpt-image-1";
  const request = { model: requestedModel, prompt: `${job.prompt}\n\nNegative requirements: ${job.negativePrompt}`, size: "1536x1024", quality: "high", n: 1 };
  const startedAt = new Date().toISOString();
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", { method: "POST", headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify(request) });
    const payload = await response.json();
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${payload?.error?.message || "image request failed"}`);
    const b64 = payload?.data?.[0]?.b64_json;
    if (!b64) throw new Error("Response has no downloadable b64_json artifact");
    const artifact = Buffer.from(b64, "base64");
    const artifactPath = path.resolve(job.output);
    fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
    fs.writeFileSync(artifactPath, artifact);
    const provenance = { jobId: job.id, status: "generated", startedAt, completedAt: new Date().toISOString(), request, requestSha256: digest(JSON.stringify(request)), artifactPath, artifactSha256: digest(artifact), responseId: payload?.id || null, usage: payload?.usage || null, cost: payload?.cost || null, labelSource: job.labelSource };
    fs.writeFileSync(`${artifactPath}.provenance.json`, JSON.stringify(provenance, null, 2) + "\n");
    job.status = "generated"; job.attempts = (job.attempts || 0) + 1; job.lastProvenance = path.relative(path.dirname(queuePath), `${artifactPath}.provenance.json`);
    console.log(`GENERATED ${job.id}; sha256=${provenance.artifactSha256}`);
  } catch (error) {
    job.attempts = (job.attempts || 0) + 1;
    job.status = job.attempts > (queue.maxRetries ?? 2) ? "rejected" : "retry";
    job.rejection = { at: new Date().toISOString(), reason: error.message };
    console.error(`FAILED ${job.id}: ${error.message}`);
  }
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n");
}
