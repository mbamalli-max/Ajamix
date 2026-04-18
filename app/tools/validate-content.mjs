#!/usr/bin/env node
// Almajirix content validator
//
// Usage:   node app/tools/validate-content.mjs
// Purpose: enforce the v3.0 dual-track schema on app/content.json before commit.
// Exits 0 on success, 1 on any validation failure.
//
// Rules (from plan §4.6):
//   1. Every module has a `track` of "vocational" or "formal".
//   2. Every module has a `targetAudience` of "adult", "youth", or "all".
//   3. Every module has either `chainNext` set to a valid sibling module id
//      OR `isChainLeaf === true`.
//   4. When `chainNext` is set, `gapTeaser.ha` and `gapTeaser.ajami` are both
//      non-empty strings. Without the teaser, the chain surfaces nothing to
//      the learner.
//   5. `useTodayPrompt`, when non-null, is an object with non-empty `ha` and
//      `ajami` strings.
//   6. `gapTeaserInline`, when present, is optional and should be an object
//      with non-empty `ha` and `ajami` strings.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const contentPath = resolve(here, "..", "content.json");

const ALLOWED_TRACKS = new Set(["vocational", "formal"]);
const ALLOWED_AUDIENCES = new Set(["adult", "youth", "all"]);

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function main() {
  let raw;
  try {
    raw = readFileSync(contentPath, "utf8");
  } catch (err) {
    console.error(`validate-content: could not read ${contentPath}: ${err.message}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`validate-content: ${contentPath} is not valid JSON: ${err.message}`);
    process.exit(1);
  }

  if (!Array.isArray(data.modules)) {
    console.error('validate-content: content.json has no "modules" array.');
    process.exit(1);
  }

  const ids = new Set(data.modules.map((m) => m && m.id).filter(Boolean));
  const errors = [];

  for (const m of data.modules) {
    const where = m && m.id ? `module ${m.id}` : "module <unknown>";

    if (!m || typeof m !== "object") {
      errors.push(`${where}: not an object`);
      continue;
    }

    if (!ALLOWED_TRACKS.has(m.track)) {
      errors.push(`${where}: track must be one of ${[...ALLOWED_TRACKS].join(", ")} (got ${JSON.stringify(m.track)})`);
    }

    if (!ALLOWED_AUDIENCES.has(m.targetAudience)) {
      errors.push(`${where}: targetAudience must be one of ${[...ALLOWED_AUDIENCES].join(", ")} (got ${JSON.stringify(m.targetAudience)})`);
    }

    const hasChainNext = m.chainNext != null && m.chainNext !== "";
    const isLeaf = m.isChainLeaf === true;

    if (!hasChainNext && !isLeaf) {
      errors.push(`${where}: no chainNext and not marked isChainLeaf. Either set chainNext to a sibling module id or set isChainLeaf: true.`);
    }

    if (hasChainNext && isLeaf) {
      errors.push(`${where}: has chainNext but is also marked isChainLeaf: true. Pick one.`);
    }

    if (hasChainNext && !ids.has(m.chainNext)) {
      errors.push(`${where}: chainNext "${m.chainNext}" does not match any known module id.`);
    }

    if (hasChainNext && m.chainNext === m.id) {
      errors.push(`${where}: chainNext points to itself.`);
    }

    if (hasChainNext) {
      if (!m.gapTeaser || typeof m.gapTeaser !== "object") {
        errors.push(`${where}: has chainNext but no gapTeaser object. Learner would see no bridge.`);
      } else {
        if (!isNonEmptyString(m.gapTeaser.ha)) {
          errors.push(`${where}: gapTeaser.ha must be a non-empty string when chainNext is set.`);
        }
        if (!isNonEmptyString(m.gapTeaser.ajami)) {
          errors.push(`${where}: gapTeaser.ajami must be a non-empty string when chainNext is set.`);
        }
      }
    }

    if (m.useTodayPrompt != null) {
      if (typeof m.useTodayPrompt !== "object") {
        errors.push(`${where}: useTodayPrompt must be null or an object with ha + ajami strings.`);
      } else {
        if (!isNonEmptyString(m.useTodayPrompt.ha)) {
          errors.push(`${where}: useTodayPrompt.ha must be a non-empty string when useTodayPrompt is set.`);
        }
        if (!isNonEmptyString(m.useTodayPrompt.ajami)) {
          errors.push(`${where}: useTodayPrompt.ajami must be a non-empty string when useTodayPrompt is set.`);
        }
      }
    }

    if (m.gapTeaserInline != null) {
      if (typeof m.gapTeaserInline !== "object") {
        errors.push(`${where}: gapTeaserInline must be null/undefined or an object with ha + ajami strings.`);
      } else {
        if (!isNonEmptyString(m.gapTeaserInline.ha)) {
          errors.push(`${where}: gapTeaserInline.ha must be a non-empty string when gapTeaserInline is set.`);
        }
        if (!isNonEmptyString(m.gapTeaserInline.ajami)) {
          errors.push(`${where}: gapTeaserInline.ajami must be a non-empty string when gapTeaserInline is set.`);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`validate-content: ${errors.length} error(s) in ${contentPath}:`);
    for (const e of errors) {
      console.error("  - " + e);
    }
    process.exit(1);
  }

  const leaves = data.modules.filter((m) => m.isChainLeaf === true).length;
  const chained = data.modules.filter((m) => m.chainNext != null && m.chainNext !== "").length;
  const vocational = data.modules.filter((m) => m.track === "vocational").length;
  const formal = data.modules.filter((m) => m.track === "formal").length;

  console.log(`validate-content: OK — ${data.modules.length} module(s) pass.`);
  console.log(`  track=vocational: ${vocational}`);
  console.log(`  track=formal:     ${formal}`);
  console.log(`  isChainLeaf:      ${leaves}`);
  console.log(`  chainNext set:    ${chained}`);
  process.exit(0);
}

main();
