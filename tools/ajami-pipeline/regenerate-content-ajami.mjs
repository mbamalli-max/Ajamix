#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildMergedLexicon } from "./build-merged-lexicon.mjs";
import { analyzeAjamiComposition } from "./compose-ajami.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");

export const CONTENT_PATH = path.join(REPO_ROOT, "app", "content.json");
export const COVERAGE_PATH = path.join(MODULE_DIR, "data", "content-ajami-coverage.json");
export const BACKUP_PATH = "/Users/muhammadbamalli/Documents/New project/ai-system/projects/ajamix/tasks/2026-08-10-pre-slice-35-content.json";

export const EXPECTED_COVERAGE = Object.freeze({
  titleAjami: { total: 389, covered: 343 },
  subjectAjami: { total: 389, covered: 389 },
  topicAjami: { total: 6, covered: 6 },
  termAjami: { total: 62, covered: 59 },
});

const MANAGED_AJAMI_FIELDS = Object.freeze([
  "titleAjami",
  "subjectAjami",
  "textExplanationAjami",
  "topicAjami",
  "termAjami",
]);

const FIELD_SPECS = Object.freeze([
  { group: "modules", source: "titleHa", target: "titleAjami" },
  { group: "modules", source: "subjectHa", target: "subjectAjami" },
  { group: "activities", source: "topicHa", target: "topicAjami" },
  { group: "glossary", source: "termHa", target: "termAjami" },
]);

export function wipeManagedAjami(content) {
  for (const groupName of ["modules", "activities", "glossary"]) {
    if (!Array.isArray(content[groupName])) {
      throw new Error(`content.${groupName} must be an array`);
    }
    for (const entry of content[groupName]) {
      for (const field of MANAGED_AJAMI_FIELDS) {
        if (Object.hasOwn(entry, field)) entry[field] = null;
      }
      if (Object.hasOwn(entry, "ajami_validated")) entry.ajami_validated = false;
    }
  }
  return content;
}

function addUncoveredWords(counts, words) {
  for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
}

function coveragePercent(covered, total) {
  return total === 0 ? 100 : Number(((covered / total) * 100).toFixed(2));
}

function composeFields(content, lexiconMap) {
  const composedByEntry = new Map();
  const uncoveredCounts = new Map();
  const fields = {};

  for (const spec of FIELD_SPECS) {
    const entries = content[spec.group];
    let covered = 0;
    for (const entry of entries) {
      const result = analyzeAjamiComposition(entry[spec.source], lexiconMap);
      if (!composedByEntry.has(entry)) composedByEntry.set(entry, {});
      composedByEntry.get(entry)[spec.target] = result.ajami;
      if (result.ajami == null) {
        addUncoveredWords(uncoveredCounts, result.uncoveredWords);
      } else {
        covered += 1;
      }
    }
    fields[spec.target] = {
      source: `${spec.group}[].${spec.source}`,
      total: entries.length,
      covered,
      uncovered: entries.length - covered,
      coveragePercent: coveragePercent(covered, entries.length),
    };
  }

  return { composedByEntry, uncoveredCounts, fields };
}

function insertManagedFields(entry, kind, composed) {
  const output = {};
  const insertions = kind === "module"
    ? new Map([
      ["subjectHa", ["subjectAjami"]],
      ["titleHa", ["titleAjami", "ajami_validated"]],
      ["textExplanationHa", ["textExplanationAjami"]],
    ])
    : kind === "activity"
      ? new Map([["topicHa", ["topicAjami", "ajami_validated"]]])
      : new Map([["termHa", ["termAjami", "ajami_validated"]]]);

  // A previously absent managed field stays absent when composition is
  // uncovered. Existing schema keys are retained with null instead.
  // ajami_validated is a whole-entry prose contract, so this short-field
  // pipeline must leave it false regardless of managed-field coverage.

  for (const [key, value] of Object.entries(entry)) {
    if (MANAGED_AJAMI_FIELDS.includes(key) || key === "ajami_validated") continue;
    output[key] = value;
    for (const field of insertions.get(key) ?? []) {
      if (field === "ajami_validated") {
        output[field] = false;
      } else {
        const composedValue = composed[field];
        if (composedValue != null) {
          output[field] = composedValue;
        } else if (Object.hasOwn(entry, field)) {
          output[field] = null;
        }
      }
    }
  }
  return output;
}

export function regenerateContentData(originalContent, lexiconMap, { lexiconEntryCount } = {}) {
  const content = structuredClone(originalContent);
  wipeManagedAjami(content);
  const { composedByEntry, uncoveredCounts, fields } = composeFields(content, lexiconMap);

  content.modules = content.modules.map((entry) =>
    insertManagedFields(entry, "module", composedByEntry.get(entry))
  );
  content.activities = content.activities.map((entry) =>
    insertManagedFields(entry, "activity", composedByEntry.get(entry))
  );
  content.glossary = content.glossary.map((entry) =>
    insertManagedFields(entry, "glossary", composedByEntry.get(entry))
  );

  const uncoveredWords = [...uncoveredCounts.entries()]
    .map(([word, occurrences]) => ({ word, occurrences }))
    .sort((left, right) =>
      right.occurrences - left.occurrences || left.word.localeCompare(right.word, "ha")
    );

  const coverage = {
    schemaVersion: 1,
    materialType: "lexicon_composed_content_ajami_coverage",
    source: "app/content.json",
    lexiconEntryCount: lexiconEntryCount ?? lexiconMap.size,
    invariant: "A managed Ajami field holds a non-null value if and only if its entire Boko source string was composed from ratified lexicon entries. null (or an absent key, where the schema never had one) means no lexicon coverage, which the renderer resolves to audio playback. ajami_validated stays false on every entry and is never set true.",
    fields,
    uncoveredWords,
  };

  return { content, coverage };
}

export function coverageDeviations(coverage, expected = EXPECTED_COVERAGE) {
  const deviations = [];
  for (const [field, target] of Object.entries(expected)) {
    const actual = coverage.fields[field];
    if (!actual) {
      deviations.push(`${field}: missing from coverage report`);
      continue;
    }
    if (actual.total !== target.total || actual.covered !== target.covered) {
      deviations.push(
        `${field}: expected ${target.covered}/${target.total}, got ${actual.covered}/${actual.total}`
      );
    }
  }
  return deviations;
}

export function ensureBackup(contentPath = CONTENT_PATH, backupPath = BACKUP_PATH) {
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(contentPath, backupPath, fs.constants.COPYFILE_EXCL);
  }
  return backupPath;
}

export function writeRegeneratedContent({
  content,
  coverage,
  contentPath = CONTENT_PATH,
  coveragePath = COVERAGE_PATH,
  backupPath = BACKUP_PATH,
}) {
  ensureBackup(contentPath, backupPath);
  fs.mkdirSync(path.dirname(coveragePath), { recursive: true });
  fs.writeFileSync(coveragePath, `${JSON.stringify(coverage, null, 2)}\n`, "utf8");
  fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  return { contentPath, coveragePath, backupPath };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const originalContent = JSON.parse(fs.readFileSync(CONTENT_PATH, "utf8"));
  const { map, counts } = buildMergedLexicon();
  const generated = regenerateContentData(originalContent, map, {
    lexiconEntryCount: counts.merged,
  });
  const deviations = coverageDeviations(generated.coverage);
  writeRegeneratedContent(generated);

  for (const [field, result] of Object.entries(generated.coverage.fields)) {
    process.stdout.write(`${field}: ${result.covered}/${result.total} (${result.coveragePercent}%)\n`);
  }
  if (deviations.length) {
    process.stderr.write(`Coverage target deviation(s):\n- ${deviations.join("\n- ")}\n`);
  }
  process.stdout.write(`Backup: ${BACKUP_PATH}\n`);
  process.stdout.write(`Coverage: ${COVERAGE_PATH}\n`);
  process.stdout.write(`Content: ${CONTENT_PATH}\n`);
}
