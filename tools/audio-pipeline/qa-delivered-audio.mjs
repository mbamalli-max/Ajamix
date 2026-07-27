// AJAMIX audio delivery QA — checks format spec on delivered MP3s.
// Does NOT and cannot check Hausa pronunciation/accuracy/naturalness — that's TIMSAN's job.
// Usage: node tools/audio-pipeline/qa-delivered-audio.mjs [--dir <path>] [--band <id>]
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const REPO = path.resolve(import.meta.dirname, "../..");
const content = JSON.parse(fs.readFileSync(path.join(REPO, "app/content.json")));

const args = process.argv.slice(2);
const dirFlagIndex = args.indexOf("--dir");
const bandFlagIndex = args.indexOf("--band");
const SCAN_DIR = dirFlagIndex >= 0 ? args[dirFlagIndex + 1] : path.join(REPO, "app/audio");
const BAND_FILTER = bandFlagIndex >= 0 ? args[bandFlagIndex + 1] : null;

const SPEC = {
  format: "mp3",
  channels: 1, // mono
  bitrateKbpsTarget: 64,
  bitrateKbpsTolerance: 16, // accept 48-80kbps as "close enough to spec"
  formalDurationMinSec: 150, // 2.5 min, a little slack under the 3 min spec floor
  formalDurationMaxSec: 330, // 5.5 min, a little slack over the 5 min spec ceiling
  adultDurationMinSec: 3,
  adultDurationMaxSec: 40,
};

const ADULT_AUDIO_PREFIXES = [
  { prefix: "audio/vocational/", track: "adult Vocational Skills clips" },
  { prefix: "audio/falsafa/", track: "adult Falsafa clips" },
  { prefix: "audio/critical-thinking/", track: "adult Critical Thinking clips" },
];

export function normalizeAudioPath(audioFile) {
  return String(audioFile || "").replaceAll("\\", "/").replace(/^\.\/+/, "");
}

export function classifyAudioPath(audioFile) {
  const normalizedPath = normalizeAudioPath(audioFile);
  const adultMatch = ADULT_AUDIO_PREFIXES.find(({ prefix }) => normalizedPath.startsWith(prefix));
  if (adultMatch) {
    return {
      normalizedPath,
      track: adultMatch.track,
      minSec: SPEC.adultDurationMinSec,
      maxSec: SPEC.adultDurationMaxSec,
    };
  }

  // Formal recordings are direct children of audio/; adult recordings use a named subfolder.
  if (/^audio\/[^/]+$/.test(normalizedPath)) {
    return {
      normalizedPath,
      track: "formal module audio",
      minSec: SPEC.formalDurationMinSec,
      maxSec: SPEC.formalDurationMaxSec,
    };
  }

  return {
    normalizedPath,
    error: `unclassifiable audio path: ${normalizedPath || "(empty path)"}`,
  };
}

export function buildWorklist(sourceContent) {
  const formalTargets = sourceContent.modules
    .filter((module) => module.audioScript && module.audioFile)
    .map((module) => ({
      id: module.id,
      gradeband: module.gradeband,
      audioFile: module.audioFile,
      kind: "formal",
    }));

  const adultTargets = sourceContent.modules
    .filter((module) => module.track === "vocational" && module.gradeband === "adult")
    .flatMap((module) => module.lessons
      .map((lesson, index) => ({ lesson, index }))
      .filter(({ lesson }) => typeof lesson.audioFile === "string" && lesson.audioFile.trim())
      .map(({ lesson, index }) => ({
        id: `${module.id}-${String(index + 1).padStart(2, "0")}`,
        gradeband: module.gradeband,
        audioFile: lesson.audioFile,
        kind: "adult-card",
      })));

  return [...formalTargets, ...adultTargets];
}

async function probe(filePath) {
  const { stdout } = await execFileAsync("ffprobe", [
    "-v", "error",
    "-print_format", "json",
    "-show_format",
    "-show_streams",
    filePath,
  ]);
  return JSON.parse(stdout);
}

export function checkOne(info, audioFile, stat = fs.statSync(audioFile)) {
  const issues = [];
  const classification = classifyAudioPath(audioFile);
  if (classification.error) issues.push(classification.error);
  const audioStream = (info.streams || []).find((s) => s.codec_type === "audio");
  if (!audioStream) {
    issues.push("no audio stream found");
    return issues;
  }
  const formatName = (info.format?.format_name || "").toLowerCase();
  if (!formatName.includes("mp3")) {
    issues.push(`format is "${info.format?.format_name}", expected mp3`);
  }
  if (!classification.normalizedPath.toLowerCase().endsWith(".mp3")) {
    issues.push(`${classification.normalizedPath}: filename must end in .mp3`);
  }
  if (audioStream.channels !== SPEC.channels) {
    issues.push(`channels=${audioStream.channels}, expected ${SPEC.channels} (mono)`);
  }
  const bitrateKbps = Math.round(Number(info.format?.bit_rate || audioStream.bit_rate || 0) / 1000);
  if (bitrateKbps === 0) {
    issues.push("could not determine bitrate");
  } else if (Math.abs(bitrateKbps - SPEC.bitrateKbpsTarget) > SPEC.bitrateKbpsTolerance) {
    issues.push(`bitrate=${bitrateKbps}kbps, expected ~${SPEC.bitrateKbpsTarget}kbps (±${SPEC.bitrateKbpsTolerance}kbps)`);
  }
  const durationSec = Number(info.format?.duration || 0);
  if (durationSec === 0) {
    issues.push("could not determine duration");
  } else if (!classification.error && (durationSec < classification.minSec || durationSec > classification.maxSec)) {
    issues.push(`${path.posix.basename(classification.normalizedPath)}: ${durationSec.toFixed(1)}s — ${classification.track} must be ${classification.minSec}-${classification.maxSec}s.`);
  }
  if (stat.size === 0) {
    issues.push("file is zero bytes");
  }
  return issues;
}

async function main() {
  const targets = buildWorklist(content);
  const filtered = BAND_FILTER ? targets.filter((target) => target.gradeband === BAND_FILTER) : targets;

  const results = { checked: 0, missing: [], passed: [], flagged: [] };

  for (const target of filtered) {
    const normalizedPath = normalizeAudioPath(target.audioFile);
    const relativePath = normalizedPath.startsWith("audio/") ? normalizedPath.slice("audio/".length) : normalizedPath;
    const filePath = path.join(SCAN_DIR, relativePath);
    const displayPath = normalizedPath;
    if (!fs.existsSync(filePath)) {
      results.missing.push(target.id);
      continue;
    }
    results.checked += 1;
    try {
      const info = await probe(filePath);
      const issues = checkOne(info, target.audioFile, fs.statSync(filePath));
      if (issues.length) {
        results.flagged.push({ id: target.id, file: displayPath, issues });
      } else {
        results.passed.push(target.id);
      }
    } catch (e) {
      results.flagged.push({ id: target.id, file: displayPath, issues: [`ffprobe failed: ${e.message}`] });
    }
  }

  console.log("=== AJAMIX audio delivery QA ===");
  console.log("scan dir:", SCAN_DIR);
  if (BAND_FILTER) console.log("band filter:", BAND_FILTER);
  console.log("audio targets expected:", filtered.length);
  console.log("files found & checked:", results.checked);
  console.log("missing (not yet delivered):", results.missing.length);
  console.log("passed spec:", results.passed.length);
  console.log("flagged (out of spec):", results.flagged.length);

  if (results.flagged.length) {
    console.log("\n-- flagged details --");
    for (const f of results.flagged) {
      console.log(`${f.id} (${f.file}):`);
      for (const issue of f.issues) console.log("  -", issue);
    }
  }

  fs.writeFileSync(
    path.join(REPO, "tools/audio-pipeline/_qa-report.json"),
    JSON.stringify(results, null, 2)
  );

  console.log("\nNote: this checks technical spec only (format/channels/bitrate/duration).");
  console.log("It cannot and does not check Hausa pronunciation, accuracy, or naturalness — that is TIMSAN's review.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main();
}
