#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const newPath = resolve(here, "p5-bsci.json");
const contentPath = resolve(repoRoot, "app", "content.json");
const backupPath = resolve(repoRoot, "app", "content.json.bak");

const expectedNewIds = Array.from({ length: 15 }, (_, i) => `p5-bsci-${String(i + 1).padStart(2, "0")}`);

function fail(message) {
  console.error(`apply-p5-bsci: FAIL: ${message}`);
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
const appended = readJson(newPath);

if (!Array.isArray(content.modules)) fail("content.modules is not an array");
if (!Array.isArray(appended)) fail("new-modules artifact is not an array");

const originalCount = content.modules.length;
const originalIds = content.modules.map((m) => m && m.id);
const originalIdSet = new Set(originalIds);
if (originalIdSet.size !== originalIds.length) fail("content.modules contains duplicate ids before application");

const newIdsAlreadyPresent = expectedNewIds.filter((id) => originalIdSet.has(id));
if (newIdsAlreadyPresent.length === expectedNewIds.length) {
  if (originalCount !== 294) fail(`already-applied content count ${originalCount} !== 294`);
  console.log("apply-p5-bsci: OK — already applied; no write needed.");
  console.log(`  original count: ${originalCount}`);
  console.log(`  final count:    ${originalCount}`);
  console.log(`  backup:         ${existsSync(backupPath) ? "already existed" : "not created; no write needed"}`);
  process.exit(0);
}
if (newIdsAlreadyPresent.length > 0) {
  fail(`partial new-module set already present: ${newIdsAlreadyPresent.join(", ")}`);
}

if (originalCount !== 279) fail(`original module count ${originalCount} !== 279`);

if (JSON.stringify(appended.map((m) => m.id)) !== JSON.stringify(expectedNewIds)) {
  fail(`new-module ids are not exactly p5-bsci-01..15, in order: ${appended.map((m) => m.id).join(", ")}`);
}

// Append-only: every existing module object is preserved verbatim, in order.
const merged = {
  ...content,
  modules: [...content.modules, ...appended],
};

const mergedIds = merged.modules.map((m) => m.id);
if (new Set(mergedIds).size !== mergedIds.length) fail("merged modules contain duplicate ids");
if (merged.modules.length !== 294) fail(`merged module count ${merged.modules.length} !== 294`);

const mergedIdSet = new Set(mergedIds);
for (const id of originalIdSet) if (!mergedIdSet.has(id)) fail(`existing module id removed: ${id}`);
for (const id of expectedNewIds) if (!mergedIdSet.has(id)) fail(`new module id missing after merge: ${id}`);

// Confirm every original module object round-trips unchanged (append-only guarantee).
for (let i = 0; i < content.modules.length; i += 1) {
  if (JSON.stringify(merged.modules[i]) !== JSON.stringify(content.modules[i])) {
    fail(`existing module at index ${i} (${content.modules[i].id}) was altered by the merge`);
  }
}

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

console.log("apply-p5-bsci: OK — applied.");
console.log(`  original count: ${originalCount}`);
console.log(`  final count:    ${merged.modules.length}`);
console.log(`  backup:         ${backupStatus}`);
