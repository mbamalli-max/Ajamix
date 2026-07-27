#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const batchPath = resolve(here, "p4-maths.json");
const contentPath = resolve(repoRoot, "app", "content.json");
const backupPath = resolve(repoRoot, "app", "content.json.bak");
const expectedIds = Array.from({ length: 24 }, (_, i) => `p4-maths-${String(i + 1).padStart(2, "0")}`);

function fail(message) {
  console.error(`merge-p4-maths: FAIL: ${message}`);
  process.exit(1);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`${path} is not valid JSON: ${error.message}`);
  }
}

function assertBatch(batch) {
  if (!Array.isArray(batch)) fail("batch is not an array");
  if (batch.length !== expectedIds.length) fail(`batch module count ${batch.length} !== ${expectedIds.length}`);

  const ids = batch.map((module) => module && module.id);
  if (JSON.stringify(ids) !== JSON.stringify(expectedIds)) {
    fail(`batch ids mismatch: ${ids.join(", ")}`);
  }

  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) fail("batch contains duplicate ids");
}

function assertNoExistingIdsRemoved(originalIds, mergedIds) {
  for (const id of originalIds) {
    if (!mergedIds.has(id)) fail(`existing module id removed: ${id}`);
  }
}

const content = readJson(contentPath);
const batch = readJson(batchPath);
assertBatch(batch);

if (!Array.isArray(content.modules)) fail("content.modules is not an array");

const originalCount = content.modules.length;
const originalIds = content.modules.map((module) => module && module.id);
const originalIdSet = new Set(originalIds);
if (originalIdSet.size !== originalIds.length) fail("content.modules contains duplicate ids before merge");

const existingBatchIds = expectedIds.filter((id) => originalIdSet.has(id));

if (existingBatchIds.length === expectedIds.length) {
  if (originalCount !== 190) fail(`already-merged content count ${originalCount} !== 190`);
  console.log("merge-p4-maths: OK — already merged; no write needed.");
  console.log(`  original count: ${originalCount}`);
  console.log(`  merged count:   ${originalCount}`);
  console.log(`  backup:         ${existsSync(backupPath) ? "already existed" : "not created; no write needed"}`);
  process.exit(0);
}

if (existingBatchIds.length > 0) {
  fail(`partial batch already present: ${existingBatchIds.join(", ")}`);
}

if (originalCount !== 166) fail(`original module count ${originalCount} !== 166`);

const merged = {
  ...content,
  modules: [...content.modules, ...batch],
};

const mergedIds = new Set(merged.modules.map((module) => module && module.id));
if (mergedIds.size !== merged.modules.length) fail("merged modules contain duplicate ids");
if (merged.modules.length !== 190) fail(`merged module count ${merged.modules.length} !== 190`);

for (const id of expectedIds) {
  if (!mergedIds.has(id)) fail(`new module id missing after merge: ${id}`);
}

assertNoExistingIdsRemoved(originalIdSet, mergedIds);

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

console.log("merge-p4-maths: OK — merged.");
console.log(`  original count: ${originalCount}`);
console.log(`  merged count:   ${merged.modules.length}`);
console.log(`  backup:         ${backupStatus}`);
