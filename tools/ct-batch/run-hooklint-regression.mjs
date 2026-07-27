#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const checker = resolve(here, "check-ct-structure.mjs");
const candidate = resolve(here, "ct-complete.json");
const legitimateFixture = resolve(here, "hooklint-fixtures", "legitimate-unhooked.json");
const kwaiFixture = resolve(here, "hooklint-fixtures", "kwai-lexical-exception.json");
const injectedFixture = resolve(here, "hooklint-fixtures", ".regression-candidate.json");

function fail(message) {
  console.error(`run-hooklint-regression: FAIL — ${message}`);
  process.exit(1);
}

function runPass(args) {
  try {
    return execFileSync(process.execPath, [checker, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    fail(error.stderr || error.stdout || error.message);
  }
}

const original = readFileSync(candidate);
try {
  runPass(["--source", candidate, "--expect-count", "10", "--leaf", "CT10"]);
  console.log("run-hooklint-regression: PASS — corrected candidate passes the full checker");

  runPass(["--hooklint-fixture", legitimateFixture]);
  console.log("run-hooklint-regression: PASS — hooked spellings and legitimate exceptions are clean across lesson and quiz fields");

  runPass(["--hooklint-fixture", kwaiFixture]);
  console.log("run-hooklint-regression: PASS — flags unhooked kwai in prose, quiz answer, and distractor while allowing only the four explicit kwaikwayo-family forms");

  // Work only on a throwaway byte-for-byte copy of the candidate.  This keeps
  // the approved source untouched while testing prose, answer, distractor,
  // example, and prompt fields through the full structural checker.
  writeFileSync(injectedFixture, original);
  const injected = JSON.parse(original.toString("utf8"));
  const ct04 = injected.find((module) => module.id === "CT04");
  const ct08 = injected.find((module) => module.id === "CT08");
  ct04.lessons[0].heading.ha = "Karfin gwiwa bai isa ba";
  ct04.quiz[0].answerFormula = "karfinsa";
  ct04.quizQuestions[0].answerFormula = "karfinsa";
  ct04.quiz[0].distractorFormulas[0] = "karfinsu";
  ct04.quizQuestions[0].distractorFormulas[0] = "karfinsu";
  ct08.lessons[3].takeaway.ha = "Karamin mataki mai sauƙin gyarawa";
  ct08.useTodayPrompt.ha = "karamar hanya mai sauƙin gyarawa";
  writeFileSync(injectedFixture, `${JSON.stringify(injected, null, 2)}\n`);

  const result = spawnSync(process.execPath, [checker, "--source", injectedFixture, "--expect-count", "10", "--leaf", "CT10"], { encoding: "utf8" });
  if (result.status === 0) fail("injected candidate unexpectedly passed");
  const output = `${result.stdout}${result.stderr}`;
  for (const expected of ["Karfin", "karfinsa", "karfinsu", "Karamin", "karamar"]) {
    if (!output.includes(expected)) fail(`injected candidate did not report ${expected}`);
  }
  console.log("run-hooklint-regression: PASS — flags Karfin, karfinsa, karfinsu, Karamin, and karamar in prose, quiz answer, distractor, example, and prompt fields");
} finally {
  // Restore the injected candidate fixture exactly, verify it, then remove it.
  writeFileSync(injectedFixture, original);
  if (!readFileSync(injectedFixture).equals(original)) fail("injected candidate fixture was not restored byte-identically");
  rmSync(injectedFixture, { force: true });
  if (!readFileSync(candidate).equals(original)) fail("ct-complete.json changed during regression");
}

console.log("run-hooklint-regression: PASS — injected candidate fixture restored byte-identically; source candidate unchanged");
