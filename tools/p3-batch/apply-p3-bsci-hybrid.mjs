#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const patchesPath = resolve(here, "p3-bsci-hybrid-patches.json");
const newPath = resolve(here, "p3-bsci-hybrid-new.json");
const contentPath = resolve(repoRoot, "app", "content.json");
const backupPath = resolve(repoRoot, "app", "content.json.bak");

const expectedExistingIds = Array.from({ length: 15 }, (_, i) => `p3-bsci-${String(i + 1).padStart(2, "0")}`);
const expectedPatchIds = ["p3-bsci-01", "p3-bsci-03", "p3-bsci-05", "p3-bsci-07", "p3-bsci-08", "p3-bsci-09", "p3-bsci-10", "p3-bsci-11", "p3-bsci-12", "p3-bsci-13", "p3-bsci-14", "p3-bsci-15"];
const expectedNewIds = ["p3-bsci-16"];
const allowedPatchFields = new Set(["textExplanationHa", "audioScript", "microPauses"]);

function fail(message) {
  console.error(`apply-p3-bsci-hybrid: FAIL: ${message}`);
  process.exit(1);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`${path} is not valid JSON: ${error.message}`);
  }
}

const content = readJson(contentPath);
const patches = readJson(patchesPath);
const appended = readJson(newPath);

if (!Array.isArray(content.modules)) fail("content.modules is not an array");
if (!Array.isArray(patches)) fail("patches artifact is not an array");
if (!Array.isArray(appended)) fail("new-modules artifact is not an array");

const originalCount = content.modules.length;
const originalIds = content.modules.map((m) => m && m.id);
const originalIdSet = new Set(originalIds);
if (originalIdSet.size !== originalIds.length) fail("content.modules contains duplicate ids before application");

const newIdsAlreadyPresent = expectedNewIds.filter((id) => originalIdSet.has(id));
if (newIdsAlreadyPresent.length === expectedNewIds.length) {
  if (originalCount !== 273) fail(`already-applied content count ${originalCount} !== 273`);
  console.log("apply-p3-bsci-hybrid: OK — already applied; no write needed.");
  console.log(`  original count: ${originalCount}`);
  console.log(`  final count:    ${originalCount}`);
  console.log(`  backup:         ${existsSync(backupPath) ? "already existed" : "not created; no write needed"}`);
  process.exit(0);
}
if (newIdsAlreadyPresent.length > 0) {
  fail(`partial new-module set already present: ${newIdsAlreadyPresent.join(", ")}`);
}

if (originalCount !== 272) fail(`original module count ${originalCount} !== 272`);
for (const id of expectedExistingIds) if (!originalIdSet.has(id)) fail(`expected existing id missing before application: ${id}`);

// Validate patch artifact shape and authorized scope before touching anything.
if (JSON.stringify(patches.map((p) => p.id)) !== JSON.stringify(expectedPatchIds)) {
  fail(`patch artifact ids do not match the approved set: ${patches.map((p) => p.id).join(", ")}`);
}
for (const patch of patches) {
  const fieldKeys = Object.keys(patch).filter((k) => k !== "id");
  if (fieldKeys.length === 0) fail(`${patch.id}: patch has no fields`);
  for (const key of fieldKeys) {
    if (!allowedPatchFields.has(key)) fail(`${patch.id}: patch attempts to alter unauthorized field '${key}'`);
  }
}

// KEEP ids must never appear in the patch set.
const keepIds = ["p3-bsci-02", "p3-bsci-04", "p3-bsci-06"];
for (const id of keepIds) {
  if (patches.some((p) => p.id === id)) fail(`patch set touches a KEEP-ruled id: ${id}`);
}

if (JSON.stringify(appended.map((m) => m.id)) !== JSON.stringify(expectedNewIds)) {
  fail(`new-module ids are not exactly the expected set in order: ${appended.map((m) => m.id).join(", ")}`);
}

// Apply patches to copies of the live modules only (never mutate other fields).
const patchMap = new Map(patches.map((p) => [p.id, p]));
const patchedModules = content.modules.map((module) => {
  const patch = patchMap.get(module.id);
  if (!patch) return module;
  const next = { ...module };
  for (const key of Object.keys(patch)) {
    if (key === "id") continue;
    next[key] = patch[key];
  }
  return next;
});

const merged = {
  ...content,
  modules: [...patchedModules, ...appended],
};

const mergedIds = merged.modules.map((m) => m.id);
if (new Set(mergedIds).size !== mergedIds.length) fail("merged modules contain duplicate ids");
if (merged.modules.length !== 273) fail(`merged module count ${merged.modules.length} !== 273`);

const mergedIdSet = new Set(mergedIds);
for (const id of originalIdSet) if (!mergedIdSet.has(id)) fail(`existing module id removed: ${id}`);
for (const id of expectedNewIds) if (!mergedIdSet.has(id)) fail(`new module id missing after merge: ${id}`);

const serialized = `${JSON.stringify(merged, null, 2)}\n`;
try {
  JSON.parse(serialized);
} catch (error) {
  fail(`merged JSON does not re-parse cleanly: ${error.message}`);
}

let backupStatus = "already existed";
if (!existsSync(backupPath)) {
  copyFileSync(contentPath, backupPath);
  backupStatus = "created";
}

writeFileSync(contentPath, serialized, "utf8");

console.log("apply-p3-bsci-hybrid: OK — applied.");
console.log(`  original count: ${originalCount}`);
console.log(`  final count:    ${merged.modules.length}`);
console.log(`  backup:         ${backupStatus}`);
