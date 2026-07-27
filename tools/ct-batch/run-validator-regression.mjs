#!/usr/bin/env node
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { fixtures } from "./validator-fixtures/cases.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const validatorPath = resolve(here, "..", "..", "app", "tools", "validate-content.mjs");
const liveContentPath = resolve(here, "..", "..", "app", "content.json");
const temporaryDirectory = mkdtempSync(join(tmpdir(), "ajamix-validator-regression-"));
let failures = 0;

function runCase(id, expected, contentPath) {
  const result = spawnSync(process.execPath, [validatorPath, "--content", contentPath], { encoding: "utf8" });
  const actual = result.status === 0 ? "pass" : "fail";
  if (actual === expected) {
    console.log(`run-validator-regression: PASS — ${id} (${expected})`);
    return;
  }
  failures += 1;
  console.error(`run-validator-regression: FAIL — ${id}: expected ${expected}, got ${actual}.`);
  if (result.stdout) console.error(result.stdout.trim());
  if (result.stderr) console.error(result.stderr.trim());
}

try {
  for (const fixture of fixtures) {
    const fixturePath = join(temporaryDirectory, `${fixture.id}.json`);
    writeFileSync(fixturePath, `${JSON.stringify(fixture.data, null, 2)}\n`);
    runCase(fixture.id, fixture.expected, fixturePath);
  }
  runCase("06-live-369-module-corpus", "pass", liveContentPath);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}

if (failures) process.exit(1);
console.log("run-validator-regression: PASS — all regression cases behaved as specified.");
