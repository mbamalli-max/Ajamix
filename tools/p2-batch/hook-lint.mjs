#!/usr/bin/env node
// AJAMIX hooked-letter linter — gating check for P2 content batches.
//
// Usage:   node tools/p2-batch/hook-lint.mjs <file.json> [<file.json> ...]
//          node tools/p2-batch/hook-lint.mjs app/content.json
//
// Recursively scans every string value in the given JSON file(s) for unhooked
// spellings of words whose hooked form is standard Hausa orthography.
//   - ERRORS  (exit 1): unambiguous — the unhooked form is not a valid other word.
//   - WARNINGS (exit 0): context-dependent — surfaced for human/TIMSAN review only.
//
// The ERROR list is intentionally conservative and TIMSAN-extensible: add a word
// only when the hooked form is unambiguously correct in all contexts.

import { readFileSync } from "node:fs";

// [regex, unhookedLabel, hookedForm]
const ERRORS = [
  [/\brika\b/gi, "rika", "riƙa"],
  [/\bwada(n)?nan\b/gi, "wadannan", "waɗannan"],
  [/\bwadanda\b/gi, "wadanda", "waɗanda"],
  [/\bwadansu\b/gi, "wadansu", "waɗansu"],
  [/\bkamshi\b/gi, "kamshi", "ƙamshi"],
  [/\bkwai\b/gi, "kwai", "ƙwai"],          // house standard per Architect ruling
  [/\bkarfi\b/gi, "karfi", "ƙarfi"],
  [/\bkarshe\b/gi, "karshe", "ƙarshe"],
  [/\bkarami\b/gi, "karami", "ƙarami"],
  [/\bkarama\b/gi, "karama", "ƙarama"],
  [/\bkaramar\b/gi, "karamar", "ƙaramar"],
  [/\bkwarai\b/gi, "kwarai", "ƙwarai"],
  [/\bboye\b/gi, "boye", "ɓoye"],
  [/\bbera\b/gi, "bera", "ɓera"],   // ruled 2026-07-03: user (fluent Hausa speaker) — rat/mouse is always ɓera
];

// Context-dependent: the unhooked form can be a legitimate different word.
// Do NOT auto-fix — flag for review (user first; user escalates to TIMSAN if unsure).
const WARNINGS = [
  [/\bkasa\b/gi, "kasa", "ƙasa? (also 'below/fail')"],
  [/\bkara\b/gi, "kara", "ƙara? (also plant stem/stalk — CONFIRMED unhooked 'kara' is correct for stem; only flag if 'to add/increase' sense suspected)"],
  [/\bbata\b/gi, "bata", "ɓata? (also 'her/serve')"],
];

function walkStrings(node, path, out) {
  if (typeof node === "string") {
    out.push([path, node]);
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walkStrings(v, `${path}[${i}]`, out));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) walkStrings(v, path ? `${path}.${k}` : k, out);
  }
}

let errorCount = 0;
let warnCount = 0;

for (const file of process.argv.slice(2)) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const strings = [];
  walkStrings(data, "", strings);

  for (const [path, text] of strings) {
    for (const [re, bad, good] of ERRORS) {
      const hits = text.match(re);
      if (hits) {
        errorCount += hits.length;
        console.error(`ERROR  ${file} :: ${path} :: "${bad}" ×${hits.length} → "${good}"`);
      }
    }
    for (const [re, bad, good] of WARNINGS) {
      const hits = text.match(re);
      if (hits) {
        warnCount += hits.length;
        console.warn(`warn   ${file} :: ${path} :: "${bad}" ×${hits.length} → ${good}`);
      }
    }
  }
}

if (process.argv.length <= 2) {
  console.error("usage: node tools/p2-batch/hook-lint.mjs <file.json> [...]");
  process.exit(2);
}

console.log(`\nhook-lint: ${errorCount} error(s), ${warnCount} warning(s).`);
process.exit(errorCount > 0 ? 1 : 0);
