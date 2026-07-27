#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const patchPath = resolve(here, "p1-bsci-redundancy-patch.json");
const contentPath = resolve(repoRoot, "app", "content.json");
const backupPath = resolve(repoRoot, "app", "content.json.bak");

const expectedPatchIds = ["p1-bsci-02", "p1-bsci-03", "p1-bsci-07", "p1-bsci-09", "p1-bsci-14"];
const allowedFields = new Set(["textExplanationHa"]);

function fail(message) {
  console.error(`apply-p1-bsci-redundancy-patch: FAIL: ${message}`);
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
const patch = readJson(patchPath);

if (!Array.isArray(content.modules)) fail("content.modules is not an array");
if (!Array.isArray(patch)) fail("patch artifact is not an array");

const originalCount = content.modules.length;
if (originalCount !== 272) fail(`original module count ${originalCount} !== 272`);

if (JSON.stringify(patch.map((p) => p.id)) !== JSON.stringify(expectedPatchIds)) {
  fail(`patch ids do not match the approved set: ${patch.map((p) => p.id).join(", ")}`);
}
for (const p of patch) {
  const fieldKeys = Object.keys(p).filter((k) => k !== "id");
  if (fieldKeys.length === 0) fail(`${p.id}: patch has no fields`);
  for (const key of fieldKeys) {
    if (!allowedFields.has(key)) fail(`${p.id}: patch attempts to alter unauthorized field '${key}'`);
  }
}

const originalIdSet = new Set(content.modules.map((m) => m.id));
for (const id of expectedPatchIds) if (!originalIdSet.has(id)) fail(`expected id missing before application: ${id}`);

// Idempotency short-circuit: if live text already matches patch, nothing to do.
const patchMap = new Map(patch.map((p) => [p.id, p]));
const alreadyApplied = content.modules
  .filter((m) => patchMap.has(m.id))
  .every((m) => m.textExplanationHa === patchMap.get(m.id).textExplanationHa);
if (alreadyApplied) {
  console.log("apply-p1-bsci-redundancy-patch: OK — already applied; no write needed.");
  process.exit(0);
}

const patchedModules = content.modules.map((module) => {
  const p = patchMap.get(module.id);
  if (!p) return module;
  return { ...module, textExplanationHa: p.textExplanationHa };
});

const merged = { ...content, modules: patchedModules };

const mergedIds = merged.modules.map((m) => m.id);
if (new Set(mergedIds).size !== mergedIds.length) fail("merged modules contain duplicate ids");
if (merged.modules.length !== originalCount) fail(`merged module count ${merged.modules.length} !== ${originalCount}`);
for (const id of originalIdSet) if (!new Set(mergedIds).has(id)) fail(`existing module id removed: ${id}`);

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

console.log("apply-p1-bsci-redundancy-patch: OK — applied.");
console.log(`  patched ids:    ${expectedPatchIds.join(", ")}`);
console.log(`  module count:   ${merged.modules.length}`);
console.log(`  backup:         ${backupStatus}`);
