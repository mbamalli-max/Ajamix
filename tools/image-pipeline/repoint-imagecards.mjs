#!/usr/bin/env node
// Guarded, minimal image-card migration. Only exact images/<id>.png values move
// to an existing sibling WebP; the raw JSON is otherwise preserved byte-for-byte.
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
const IMAGES_DIR = resolve(REPO, "app/images");
const BACKUP_PATH = "/Users/muhammadbamalli/Documents/New project/ai-system/projects/ajamix/tasks/2026-07-28-pre-webp-content-389.json";
const EXPECTED_MODULE_COUNT = 389;
const PNG_IMAGE_CARD_RE = /^images\/([^/]+)\.png$/;

function fail(message) {
  throw new Error(`repoint-imagecards: ${message}`);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function collectTargets(data) {
  const targets = [];
  for (const [index, module] of data.modules.entries()) {
    if (typeof module.imageCard !== "string") continue;
    const match = module.imageCard.match(PNG_IMAGE_CARD_RE);
    if (!match) continue;
    targets.push({ index, id: module.id, from: module.imageCard, to: `images/${match[1]}.webp` });
  }
  return targets;
}

function applyObjectChanges(data, targets) {
  const changed = structuredClone(data);
  for (const target of targets) {
    const module = changed.modules[target.index];
    assert(module.imageCard === target.from, `module ${target.id}: imageCard changed while preparing migration.`);
    module.imageCard = target.to;
  }
  return changed;
}

function captureActivityImageCards(data) {
  const cards = (data.activities || [])
    .filter((activity) => typeof activity.imageCard === "string")
    .map((activity) => ({ activityId: activity.activityId, imageCard: activity.imageCard }));
  assert(cards.length === 6, `expected 6 activity imageCard values, found ${cards.length}.`);
  return cards;
}

function assertActivityImageCardsUnchanged(expectedCards, data, phase) {
  const actualCards = captureActivityImageCards(data);
  assert(
    JSON.stringify(actualCards) === JSON.stringify(expectedCards),
    `activity imageCard values changed during ${phase}; activities are explicitly out of scope.`,
  );
}

function assertOnlyIntendedChanges(before, after, targets) {
  const expected = applyObjectChanges(before, targets);
  assert(JSON.stringify(after) === JSON.stringify(expected), "post-write object differs from baseline beyond intended imageCard replacements.");
  assert(after.modules.length === EXPECTED_MODULE_COUNT, `module count changed to ${after.modules.length}.`);
}

function main() {
  const raw = readFileSync(CONTENT_PATH, "utf8");
  const before = JSON.parse(raw);
  assert(Array.isArray(before.modules) && before.modules.length === EXPECTED_MODULE_COUNT, `expected ${EXPECTED_MODULE_COUNT} modules, found ${before.modules?.length}.`);
  const activityImageCardsBefore = captureActivityImageCards(before);
  const targets = collectTargets(before);

  if (targets.length === 0) {
    const moduleCards = before.modules.filter((module) => typeof module.imageCard === "string");
    assert(moduleCards.length === 359, `expected 359 module imageCards, found ${moduleCards.length}.`);
    assert(moduleCards.every((module) => /^images\/[^/]+\.webp$/.test(module.imageCard)), "found a module imageCard that is not an images/<id>.webp path.");
    assertActivityImageCardsUnchanged(activityImageCardsBefore, before, "the no-op verification");
    console.log(`repoint-imagecards: already complete — 0 module PNG imageCards remain; ${EXPECTED_MODULE_COUNT} modules verified; no changes written.`);
    console.log("repoint-imagecards: 6 activity imageCard values verified byte-identical and untouched.");
    return;
  }

  assert(targets.length === 359, `expected 359 module PNG imageCards, found ${targets.length}.`);
  for (const target of targets) {
    const outputPath = resolve(IMAGES_DIR, target.to.slice("images/".length));
    assert(existsSync(outputPath), `module ${target.id}: required WebP does not exist: ${target.to}.`);
  }

  const after = applyObjectChanges(before, targets);
  assertOnlyIntendedChanges(before, after, targets);
  const replacements = targets.map((target) => ({ from: target.from, to: target.to }));
  let outputRaw = raw;
  for (const { from, to } of replacements) {
    const quotedFrom = JSON.stringify(from);
    const quotedTo = JSON.stringify(to);
    const occurrences = outputRaw.split(quotedFrom).length - 1;
    assert(occurrences === 1, `expected exactly one raw occurrence of ${from}, found ${occurrences}.`);
    outputRaw = outputRaw.replace(quotedFrom, quotedTo);
  }
  const rawAfter = JSON.parse(outputRaw);
  assertOnlyIntendedChanges(before, rawAfter, targets);
  assertActivityImageCardsUnchanged(activityImageCardsBefore, rawAfter, "the raw replacement pre-write check");

  let backupCreated = false;
  if (existsSync(BACKUP_PATH)) {
    const backupRaw = readFileSync(BACKUP_PATH, "utf8");
    assert(backupRaw === raw, "existing backup differs from current pre-write content.json; refusing to overwrite or write content.");
  } else {
    mkdirSync(dirname(BACKUP_PATH), { recursive: true });
    copyFileSync(CONTENT_PATH, BACKUP_PATH);
    assert(readFileSync(BACKUP_PATH, "utf8") === raw, "backup copy does not match current content.json exactly.");
    backupCreated = true;
  }

  writeFileSync(CONTENT_PATH, outputRaw);
  const reread = JSON.parse(readFileSync(CONTENT_PATH, "utf8"));
  assertOnlyIntendedChanges(before, reread, targets);
  assertActivityImageCardsUnchanged(activityImageCardsBefore, reread, "the post-write verification");
  console.log(`repoint-imagecards: rewrote ${targets.length} module imageCards.`);
  console.log(`repoint-imagecards: backup ${backupCreated ? "created" : "verified"} at ${BACKUP_PATH}`);
  console.log(`repoint-imagecards: ${EXPECTED_MODULE_COUNT} modules preserved; deep-equality check passed with only intended imageCard strings changed.`);
  console.log("repoint-imagecards: 6 activity imageCard values verified byte-identical and untouched.");
}

main();
