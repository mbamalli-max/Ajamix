#!/usr/bin/env node
/**
 * Correct the known unhooked Hausa money word in live V01–V10 content.
 *
 * This is deliberately bounded to the ten live vocational modules.  The
 * preflight count is a guard against accidentally widening the replacement;
 * zero hits is the expected, successful idempotent state.
 *
 * Usage:
 *   node tools/vocational-batch/fix-kudi-hooked-letter.mjs --dry-run
 *   node tools/vocational-batch/fix-kudi-hooked-letter.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const contentPath = resolve(here, "..", "..", "app", "content.json");
const allowedIds = new Set(Array.from({ length: 10 }, (_, index) => `V${String(index + 1).padStart(2, "0")}`));
const expectedPreCorrectionCount = 63;
const materialDifference = 5;
const dryRun = process.argv.includes("--dry-run");

if (process.argv.slice(2).some((argument) => argument !== "--dry-run")) {
  throw new Error("Usage: node tools/vocational-batch/fix-kudi-hooked-letter.mjs [--dry-run]");
}

// The initial negative lookbehind prevents matching inside a longer word or an
// already-hooked kuɗi form. Matching only the ASCII stem retains suffixes such
// as -nsa/-nsu while the replacement retains the original initial case.
const unhookedMoneyStem = /(?<![\p{L}\p{M}])kudi/giu;

function correctedStem(match) {
  if (match === match.toUpperCase()) return "KUƊI";
  if (match[0] === match[0].toUpperCase()) return "Kuɗi";
  return "kuɗi";
}

function walkStrings(value, path, visit) {
  if (typeof value === "string") {
    visit(value, path);
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const childPath = Array.isArray(value) ? `${path}[${key}]` : `${path}.${key}`;
    walkStrings(child, childPath, visit);
  }
}

const source = readFileSync(contentPath, "utf8");
const trailingNewline = source.endsWith("\n") ? "\n" : "";
const indentation = source.match(/\n( +)"/)?.[1] || "  ";
const content = JSON.parse(source);
const vocationalModules = content.modules.filter((module) => module?.track === "vocational");

for (const module of vocationalModules) {
  if (!allowedIds.has(module.id)) {
    throw new Error(`Refusing to run: unexpected vocational module ${JSON.stringify(module.id)}`);
  }
}
if (vocationalModules.length !== allowedIds.size) {
  throw new Error(`Refusing to run: expected ${allowedIds.size} vocational modules, found ${vocationalModules.length}`);
}

const changes = [];
let occurrenceCount = 0;
for (const module of vocationalModules) {
  walkStrings(module, `modules[${module.id}]`, (before, path) => {
    const matches = [...before.matchAll(unhookedMoneyStem)];
    if (!matches.length) return;
    occurrenceCount += matches.length;
    const after = before.replace(unhookedMoneyStem, correctedStem);
    changes.push({ moduleId: module.id, path, count: matches.length, before, after });
  });
}

if (occurrenceCount !== 0 && Math.abs(occurrenceCount - expectedPreCorrectionCount) > materialDifference) {
  throw new Error(
    `Refusing to write: found ${occurrenceCount} unhooked kudi money-form(s); expected about ${expectedPreCorrectionCount}`,
  );
}

console.log(`${dryRun ? "DRY RUN" : "APPLY"}: ${occurrenceCount} unhooked kudi money-form(s) in ${changes.length} field(s)`);
for (const change of changes) {
  console.log(`- ${change.moduleId} ${change.path} (${change.count})`);
  console.log(`  before: ${JSON.stringify(change.before)}`);
  console.log(`  after:  ${JSON.stringify(change.after)}`);
}

if (occurrenceCount === 0) {
  console.log("No-op: live V01–V10 content is already corrected.");
  process.exit(0);
}

if (dryRun) {
  console.log("No file written.");
  process.exit(0);
}

for (const change of changes) {
  const pathParts = change.path.replace(/^modules\[[^\]]+\]\.?/, "").split(".");
  let target = vocationalModules.find((module) => module.id === change.moduleId);
  for (let index = 0; index < pathParts.length - 1; index += 1) {
    const part = pathParts[index];
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
    target = arrayMatch ? target[arrayMatch[1]][Number(arrayMatch[2])] : target[part];
  }
  const finalPart = pathParts.at(-1);
  const finalArrayMatch = finalPart.match(/^(\w+)\[(\d+)\]$/);
  if (finalArrayMatch) target[finalArrayMatch[1]][Number(finalArrayMatch[2])] = change.after;
  else target[finalPart] = change.after;
}

const written = `${JSON.stringify(content, null, indentation)}${trailingNewline}`;
writeFileSync(contentPath, written, "utf8");
JSON.parse(readFileSync(contentPath, "utf8"));
console.log(`Wrote and reparsed ${contentPath}.`);
