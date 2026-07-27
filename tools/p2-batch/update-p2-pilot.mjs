#!/usr/bin/env node
// Updates the p2-bsci-01..06 module objects already merged into app/content.json
// with the corrected versions from tools/p2-batch/p2-bsci-pilot.json (post hook-lint fixes).
// Content-only, in-place replacement by id. Does not append, reorder, or touch
// any other module / top-level key.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");
const contentPath = resolve(repoRoot, "app/content.json");
const batchPath = resolve(here, "p2-bsci-pilot.json");
const expectedIds = [
  "p2-bsci-01", "p2-bsci-02", "p2-bsci-03",
  "p2-bsci-04", "p2-bsci-05", "p2-bsci-06",
];

function fail(message) {
  console.error(`update-p2-pilot: ABORT: ${message}`);
  process.exit(1);
}

const content = JSON.parse(readFileSync(contentPath, "utf8"));
const batch = JSON.parse(readFileSync(batchPath, "utf8"));

if (!Array.isArray(content.modules)) fail("app/content.json has no modules array");
if (!Array.isArray(batch) || batch.length !== 6) fail("batch must be an array of 6 modules");

const batchById = new Map(batch.map((m) => [m.id, m]));
for (const id of expectedIds) {
  if (!batchById.has(id)) fail(`batch is missing expected id ${id}`);
}

const beforeCount = content.modules.length;
if (beforeCount !== 94) fail(`expected 94 modules before update, found ${beforeCount}`);

let replaced = 0;
const updatedModules = content.modules.map((m) => {
  if (expectedIds.includes(m.id)) {
    replaced += 1;
    return batchById.get(m.id);
  }
  return m;
});

if (replaced !== 6) fail(`expected to replace 6 modules, replaced ${replaced}`);

const merged = { ...content, modules: updatedModules };

// Same-length, same-order, same-ids invariant check.
if (merged.modules.length !== beforeCount) fail("module count changed");
for (let i = 0; i < content.modules.length; i += 1) {
  if (merged.modules[i].id !== content.modules[i].id) fail(`id order changed at index ${i}`);
}
for (const key of Object.keys(content)) {
  if (key !== "modules" && JSON.stringify(content[key]) !== JSON.stringify(merged[key])) {
    fail(`non-module content changed at key ${key}`);
  }
}

const mergedRaw = `${JSON.stringify(merged, null, 2)}\n`;
const reparsed = JSON.parse(mergedRaw);
if (!Array.isArray(reparsed.modules) || reparsed.modules.length !== 94) {
  fail("merged JSON re-parsed but module count was not 94");
}

if (!existsSync(resolve(repoRoot, "app/content.json.prehookfix.bak"))) {
  writeFileSync(resolve(repoRoot, "app/content.json.prehookfix.bak"), readFileSync(contentPath));
  console.log("update-p2-pilot: wrote app/content.json.prehookfix.bak");
}

writeFileSync(contentPath, mergedRaw, "utf8");
console.log(`update-p2-pilot: replaced ${replaced} module(s) in place: ${expectedIds.join(", ")}`);
console.log("update-p2-pilot: module count 94 -> 94 (in-place update, no append).");
console.log("update-p2-pilot: JSON reparse confirmation OK.");
