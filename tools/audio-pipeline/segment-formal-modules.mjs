#!/usr/bin/env node
// Guarded, additive formal-track segmentation. This never edits approved prose:
// it removes delivery markers from audio slices and partitions display text only
// at existing sentence boundaries.
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(here, "../..");
const CONTENT_PATH = resolve(REPO, "app/content.json");
const BACKUP_PATH = "/Users/muhammadbamalli/Documents/New project/ai-system/projects/ajamix/tasks/2026-07-27-pre-segments-content-389.json";
const EXPECTED_MODULE_COUNT = 389;
const EXPECTED_FORMAL_COUNT = 359;
const EXPECTED_ADULT_COUNT = 30;

const CANONICAL_MARKERS = ["INTRO", "MAIN", "PAUSE 1", "MAIN", "PAUSE 2", "OUTRO"];
const NURSERY_MARKERS = ["INTRO", "MAIN", "PAUSE 1", "PAUSE 1 question", "PAUSE 2", "PAUSE 2 question", "OUTRO"];
const MARKER_RE = /\[(INTRO|MAIN|PAUSE 1(?: question)?|PAUSE 2(?: question)?|OUTRO)\]/g;

function fail(message) {
  throw new Error(`segment-formal-modules: ${message}`);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function parseMarkers(module) {
  const markers = [...module.audioScript.matchAll(MARKER_RE)].map((match) => ({
    name: match[1],
    start: match.index,
    end: match.index + match[0].length,
  }));
  const markerNames = markers.map(({ name }) => name);
  const canonical = JSON.stringify(markerNames) === JSON.stringify(CANONICAL_MARKERS);
  const nursery = JSON.stringify(markerNames) === JSON.stringify(NURSERY_MARKERS);
  assert(canonical || nursery, `${module.id}: unexpected marker sequence ${markerNames.join(" > ")}`);
  const allBracketedTokens = module.audioScript.match(/\[[^\]]+\]/g) || [];
  assert(allBracketedTokens.length === markers.length, `${module.id}: unsupported bracketed delivery cue found.`);
  return { markers, shape: canonical ? "canonical" : "nursery" };
}

function markerText(script, markers, markerIndex) {
  const start = markers[markerIndex].end;
  const end = markerIndex + 1 < markers.length ? markers[markerIndex + 1].start : script.length;
  return script.slice(start, end).trim();
}

function joinSpoken(parts) {
  return parts.map((part) => part.trim()).filter(Boolean).join(" ");
}

function buildAudioSegments(module) {
  assert(typeof module.audioScript === "string" && module.audioScript.trim(), `${module.id}: audioScript must be non-empty.`);
  const { markers, shape } = parseMarkers(module);
  const parts = markers.map((_, index) => markerText(module.audioScript, markers, index));
  const spoken = shape === "canonical"
    ? [joinSpoken([parts[0], parts[1], parts[2]]), joinSpoken([parts[3], parts[4]]), parts[5]]
    : [joinSpoken([parts[0], parts[1], parts[2]]), joinSpoken([parts[3], parts[4]]), parts[6]];

  assert(spoken.length === 3 && spoken.every((part) => part.length > 0), `${module.id}: markers did not yield exactly three non-empty audio segments.`);
  assert(spoken.every((part) => !/\[(?:INTRO|MAIN|PAUSE 1(?: question)?|PAUSE 2(?: question)?|OUTRO)\]/.test(part)), `${module.id}: delivery marker leaked into a segment.`);
  return { spoken, shape };
}

function sentenceBoundaries(text, id) {
  const boundaries = [];
  let start = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (!".?!".includes(text[index])) continue;
    if (text[index] === "." && /\d/.test(text[index - 1] || "") && /\d/.test(text[index + 1] || "")) continue;
    let terminalEnd = index + 1;
    while (terminalEnd < text.length && ".?!".includes(text[terminalEnd])) terminalEnd += 1;
    if (terminalEnd < text.length && !/\s/.test(text[terminalEnd])) continue;
    let boundary = terminalEnd;
    while (boundary < text.length && /\s/.test(text[boundary])) boundary += 1;
    assert(text.slice(start, terminalEnd).trim().length > 0, `${id}: empty sentence encountered in textExplanationHa.`);
    boundaries.push(boundary);
    start = boundary;
    index = terminalEnd - 1;
  }
  assert(start === text.length, `${id}: textExplanationHa has text outside sentence boundaries.`);
  assert(boundaries.length >= 3, `${id}: textExplanationHa has fewer than three sentences.`);
  return boundaries;
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function buildTextSegments(module, spoken) {
  assert(typeof module.textExplanationHa === "string" && module.textExplanationHa.trim(), `${module.id}: textExplanationHa must be non-empty.`);
  const text = module.textExplanationHa;
  const boundaries = sentenceBoundaries(text, module.id);
  const totalWords = spoken.reduce((sum, part) => sum + wordCount(part), 0);
  assert(totalWords > 0, `${module.id}: audio segments have no spoken words.`);

  // Allocate whole existing sentences in proportion to the corresponding spoken
  // segments. The original inter-sentence whitespace remains attached to its
  // preceding sentence, so concatenation reconstructs the source exactly.
  const count = boundaries.length;
  const firstCut = clamp(Math.round(count * wordCount(spoken[0]) / totalWords), 1, count - 2);
  const secondCut = clamp(
    Math.round(count * (wordCount(spoken[0]) + wordCount(spoken[1])) / totalWords),
    firstCut + 1,
    count - 1,
  );
  const slices = [
    text.slice(0, boundaries[firstCut - 1]),
    text.slice(boundaries[firstCut - 1], boundaries[secondCut - 1]),
    text.slice(boundaries[secondCut - 1]),
  ];
  assert(slices.length === 3 && slices.every((slice) => slice.trim().length > 0), `${module.id}: sentence allocation did not yield three non-empty text segments.`);
  assert(slices.join("") === text, `${module.id}: textExplanationHa reconstruction mismatch.`);
  return slices;
}

function expectedAudioFile(module, index) {
  const slash = module.audioFile.lastIndexOf("/");
  assert(slash > 0 && module.audioFile.endsWith(".mp3"), `${module.id}: audioFile must be an audio/*.mp3 path.`);
  return `${module.audioFile.slice(0, slash + 1)}${module.id}-${String(index).padStart(2, "0")}.mp3`;
}

function buildSegments(module) {
  const { spoken, shape } = buildAudioSegments(module);
  const textSlices = buildTextSegments(module, spoken);
  const segments = spoken.map((audioScript, offset) => ({
    index: offset + 1,
    audioScript,
    text: { ha: textSlices[offset], ajami: null },
    audioFile: expectedAudioFile(module, offset + 1),
    gate: offset < 2 ? "quiz" : null,
  }));
  return { segments, shape };
}

function assertSegmentSet(module, segments) {
  assert(Array.isArray(segments) && segments.length === 3, `${module.id}: segments must contain exactly three entries.`);
  const expected = buildSegments(module).segments;
  assert(JSON.stringify(segments) === JSON.stringify(expected), `${module.id}: existing segments do not match the deterministic mechanical split.`);
  assert(segments.map((segment) => segment.text.ha).join("") === module.textExplanationHa, `${module.id}: existing text segment reconstruction mismatch.`);
}

function assertPreservation(before, after) {
  assert(before.modules.length === after.modules.length, "module count changed after write.");
  for (let index = 0; index < before.modules.length; index += 1) {
    const original = before.modules[index];
    const current = after.modules[index];
    assert(original.id === current.id, `module ordering or id changed at index ${index}.`);
    if (original.track === "formal") {
      const withoutSegments = { ...current };
      delete withoutSegments.segments;
      assert(JSON.stringify(withoutSegments) === JSON.stringify(original), `${original.id}: a non-segments field changed.`);
    } else {
      assert(JSON.stringify(current) === JSON.stringify(original), `${original.id}: protected non-formal module changed.`);
    }
  }
}

function loadBackupOrCreate(raw) {
  if (existsSync(BACKUP_PATH)) {
    const backupRaw = readFileSync(BACKUP_PATH, "utf8");
    const backup = JSON.parse(backupRaw);
    assert(backup.modules?.length === EXPECTED_MODULE_COUNT, "existing backup does not contain the 389-module baseline.");
    return { backupRaw, backup, created: false };
  }
  mkdirSync(dirname(BACKUP_PATH), { recursive: true });
  copyFileSync(CONTENT_PATH, BACKUP_PATH);
  return { backupRaw: raw, backup: JSON.parse(raw), created: true };
}

function main() {
  const raw = readFileSync(CONTENT_PATH, "utf8");
  const data = JSON.parse(raw);
  assert(Array.isArray(data.modules) && data.modules.length === EXPECTED_MODULE_COUNT, `expected ${EXPECTED_MODULE_COUNT} modules, found ${data.modules?.length}.`);
  const formal = data.modules.filter((module) => module.track === "formal");
  const adults = data.modules.filter((module) => module.track === "vocational" && module.gradeband === "adult");
  assert(formal.length === EXPECTED_FORMAL_COUNT, `expected ${EXPECTED_FORMAL_COUNT} formal modules, found ${formal.length}.`);
  assert(adults.length === EXPECTED_ADULT_COUNT, `expected ${EXPECTED_ADULT_COUNT} adult modules, found ${adults.length}.`);

  const existingSegmentCount = formal.filter((module) => Object.hasOwn(module, "segments")).length;
  assert(existingSegmentCount === 0 || existingSegmentCount === EXPECTED_FORMAL_COUNT, `partial migration detected: ${existingSegmentCount}/${EXPECTED_FORMAL_COUNT} formal modules have segments.`);
  const backupInfo = loadBackupOrCreate(raw);
  assert(backupInfo.backup.modules.length === EXPECTED_MODULE_COUNT, "backup baseline module count changed.");

  if (existingSegmentCount === EXPECTED_FORMAL_COUNT) {
    assertPreservation(backupInfo.backup, data);
    for (const module of formal) assertSegmentSet(module, module.segments);
    console.log(`segment-formal-modules: already complete — ${EXPECTED_FORMAL_COUNT} modules / ${EXPECTED_FORMAL_COUNT * 3} segments verified; no changes written.`);
    return;
  }

  assert(backupInfo.backupRaw === raw, "existing backup differs from the unsegmented content.json baseline; refusing to patch.");
  const shapeCounts = { canonical: 0, nursery: 0 };
  for (const module of formal) {
    const { segments, shape } = buildSegments(module);
    shapeCounts[shape] += 1;
    module.segments = segments;
  }
  assert(shapeCounts.canonical === 335 && shapeCounts.nursery === 24, `unexpected marker-shape counts: canonical=${shapeCounts.canonical}, nursery=${shapeCounts.nursery}.`);

  const output = `${JSON.stringify(data, null, 2)}\n`;
  writeFileSync(CONTENT_PATH, output);
  const reread = JSON.parse(readFileSync(CONTENT_PATH, "utf8"));
  assertPreservation(backupInfo.backup, reread);
  for (const module of reread.modules.filter((candidate) => candidate.track === "formal")) assertSegmentSet(module, module.segments);
  console.log(`segment-formal-modules: segmented ${EXPECTED_FORMAL_COUNT} formal modules into ${EXPECTED_FORMAL_COUNT * 3} segments.`);
  console.log(`segment-formal-modules: marker shapes verified — canonical=${shapeCounts.canonical}, nursery=${shapeCounts.nursery}.`);
  console.log(`segment-formal-modules: all ${EXPECTED_FORMAL_COUNT} textExplanationHa values reconstruct character-for-character; adult modules and every non-segments field are byte-identical.`);
  console.log(`segment-formal-modules: backup ${backupInfo.created ? "created" : "verified"} at ${BACKUP_PATH}`);
}

main();
