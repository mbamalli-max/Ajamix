#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");
const contentPath = resolve(repoRoot, "app/content.json");
const backupPath = resolve(repoRoot, "app/content.json.p2-maths.bak");
const batchPath = resolve(here, "p2-maths.json");
const expectedIds = Array.from({ length: 24 }, (_, index) => `p2-maths-${String(index + 1).padStart(2, "0")}`);

function fail(message) {
  console.error(`merge-p2-maths: ABORT: ${message}`);
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
  fail(`could not parse tools/p2-batch/p2-maths.json: ${error.message}`);
}

if (!Array.isArray(content.modules)) fail("app/content.json has no modules array");
if (!Array.isArray(batch)) fail("P2 maths batch is not an array");

const batchIds = batch.map((module) => module && module.id);
if (batchIds.length !== expectedIds.length || expectedIds.some((id, index) => batchIds[index] !== id)) {
  fail(`P2 maths batch ids must be exactly ${expectedIds.join(", ")}`);
}

if (new Set(batchIds).size !== batchIds.length) fail("P2 maths batch contains duplicate ids");

const beforeCount = content.modules.length;
const existingIds = new Set(content.modules.map((module) => module.id));
const newModules = batch.filter((module) => !existingIds.has(module.id));
const afterCount = beforeCount + newModules.length;

if (beforeCount === 127 && newModules.length === 0) {
  console.log("merge-p2-maths: no new modules to append; content already contains p2-maths-01..24.");
  console.log("merge-p2-maths: module count 127 -> 127; no write performed.");
  process.exit(0);
}

if (beforeCount !== 103 || afterCount !== 127 || newModules.length !== 24) {
  fail(`unsafe module count transition ${beforeCount} -> ${afterCount}; expected first merge 103 -> 127`);
}

const merged = {
  ...content,
  modules: [...content.modules, ...newModules]
};

for (let index = 0; index < content.modules.length; index += 1) {
  if (merged.modules[index].id !== content.modules[index].id) fail("existing module order changed before write");
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

if (!Array.isArray(reparsed.modules) || reparsed.modules.length !== 127) {
  fail("merged JSON re-parsed but module count was not 127");
}

if (!existsSync(backupPath)) {
  copyFileSync(contentPath, backupPath);
  console.log("merge-p2-maths: wrote backup app/content.json.p2-maths.bak.");
} else {
  console.log("merge-p2-maths: backup app/content.json.p2-maths.bak already exists; leaving it unchanged.");
}

writeFileSync(contentPath, mergedRaw, "utf8");
console.log(`merge-p2-maths: appended ${newModules.length} module(s): ${newModules.map((module) => module.id).join(", ")}`);
console.log("merge-p2-maths: module count 103 -> 127.");
console.log("merge-p2-maths: JSON reparse confirmation OK.");
