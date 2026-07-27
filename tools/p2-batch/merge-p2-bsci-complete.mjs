#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");
const contentPath = resolve(repoRoot, "app/content.json");
const backupPath = resolve(repoRoot, "app/content.json.p2-bsci-complete.bak");
const batchPath = resolve(here, "p2-bsci-complete.json");
const expectedIds = [
  "p2-bsci-07",
  "p2-bsci-08",
  "p2-bsci-09",
  "p2-bsci-10",
  "p2-bsci-11",
  "p2-bsci-12",
  "p2-bsci-13",
  "p2-bsci-14",
  "p2-bsci-15"
];

function fail(message) {
  console.error(`merge-p2-bsci-complete: ABORT: ${message}`);
  process.exit(1);
}

const originalRaw = readFileSync(contentPath, "utf8");
let content;
try {
  content = JSON.parse(originalRaw);
} catch (error) {
  fail(`could not parse app/content.json before merge: ${error.message}`);
}

let batch;
try {
  batch = JSON.parse(readFileSync(batchPath, "utf8"));
} catch (error) {
  fail(`could not parse tools/p2-batch/p2-bsci-complete.json: ${error.message}`);
}

if (!Array.isArray(content.modules)) {
  fail("app/content.json has no modules array");
}

if (!Array.isArray(batch)) {
  fail("completion batch is not an array");
}

const batchIds = batch.map((module) => module && module.id);
if (batchIds.length !== expectedIds.length || expectedIds.some((id, index) => batchIds[index] !== id)) {
  fail(`completion batch ids must be exactly ${expectedIds.join(", ")}`);
}

if (new Set(batchIds).size !== batchIds.length) {
  fail("completion batch contains duplicate ids");
}

const beforeCount = content.modules.length;
const existingIds = new Set(content.modules.map((module) => module.id));
const newModules = batch.filter((module) => !existingIds.has(module.id));
const afterCount = beforeCount + newModules.length;

if (beforeCount === 103 && newModules.length === 0) {
  console.log("merge-p2-bsci-complete: no new modules to append; content already contains p2-bsci-07..15.");
  console.log("merge-p2-bsci-complete: module count 103 -> 103; no write performed.");
  process.exit(0);
}

if (beforeCount !== 94 || afterCount !== 103 || newModules.length !== 9) {
  fail(`unsafe module count transition ${beforeCount} -> ${afterCount}; expected first merge 94 -> 103`);
}

const merged = {
  ...content,
  modules: [...content.modules, ...newModules]
};

for (let index = 0; index < content.modules.length; index += 1) {
  if (merged.modules[index].id !== content.modules[index].id) {
    fail("existing module order changed before write");
  }
}

for (const key of Object.keys(content)) {
  if (key !== "modules" && JSON.stringify(content[key]) !== JSON.stringify(merged[key])) {
    fail(`non-module content changed at key ${key}`);
  }
}

const mergedRaw = `${JSON.stringify(merged, null, 2)}\n`;
let reparsed;
try {
  reparsed = JSON.parse(mergedRaw);
} catch (error) {
  fail(`merged JSON does not re-parse cleanly: ${error.message}`);
}

if (!Array.isArray(reparsed.modules) || reparsed.modules.length !== 103) {
  fail("merged JSON re-parsed but module count was not 103");
}

if (!existsSync(backupPath)) {
  copyFileSync(contentPath, backupPath);
  console.log("merge-p2-bsci-complete: wrote backup app/content.json.p2-bsci-complete.bak.");
} else {
  console.log("merge-p2-bsci-complete: backup app/content.json.p2-bsci-complete.bak already exists; leaving it unchanged.");
}

writeFileSync(contentPath, mergedRaw, "utf8");
console.log(`merge-p2-bsci-complete: appended ${newModules.length} module(s): ${newModules.map((module) => module.id).join(", ")}`);
console.log("merge-p2-bsci-complete: module count 94 -> 103.");
console.log("merge-p2-bsci-complete: JSON reparse confirmation OK.");
