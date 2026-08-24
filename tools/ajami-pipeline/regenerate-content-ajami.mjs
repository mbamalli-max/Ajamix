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
  titleAjami: { total: 389, covered: 344 },
  subjectAjami: { total: 389, covered: 389 },
  topicAjami: { total: 6, covered: 6 },
  termAjami: { total: 62, covered: 59 },
  templateHaAjami: { total: 150, covered: 129 },
  answerFormulaAjami: { total: 150, covered: 146 },
  distractorFormulasAjami: { total: 450, covered: 439 },
  "heading.ajami": { total: 60, covered: 59 },
  "title.ajami": { total: 30, covered: 27 },
  "lessonTerm.ajami": { total: 60, covered: 53 },
  "lessonTitle.ajami": { total: 30, covered: 21 },
});

const TOP_LEVEL_MANAGED_AJAMI_FIELDS = Object.freeze([
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
  {
    group: "quiz",
    source: "templateHa",
    target: "templateHaAjami",
    sourcePath: "modules[].quiz[].templateHa",
  },
  {
    group: "quiz",
    source: "answerFormula",
    target: "answerFormulaAjami",
    sourcePath: "modules[].quiz[].answerFormula",
  },
  {
    group: "quiz",
    source: "distractorFormulas",
    target: "distractorFormulasAjami",
    sourcePath: "modules[].quiz[].distractorFormulas[]",
    arrayItems: true,
  },
  {
    group: "lessonHeadings",
    source: "ha",
    target: "ajami",
    coverageKey: "heading.ajami",
    sourcePath: "modules[].lessons[].heading.ha",
  },
  {
    group: "moduleTitles",
    source: "ha",
    target: "ajami",
    coverageKey: "title.ajami",
    sourcePath: "modules[].title.ha",
  },
  {
    group: "lessonTerms",
    source: "ha",
    target: "ajami",
    coverageKey: "lessonTerm.ajami",
    sourcePath: "modules[].lessons[].term.ha",
  },
  {
    group: "lessonTitles",
    source: "ha",
    target: "ajami",
    coverageKey: "lessonTitle.ajami",
    sourcePath: "modules[].lessons[].title.ha",
  },
]);

const QUIZ_AJAMI_FIELDS = Object.freeze([
  "templateHaAjami",
  "answerFormulaAjami",
  "distractorFormulasAjami",
]);

function assertQuizMirrors(content) {
  for (const module of content.modules) {
    if (!Array.isArray(module.quizQuestions)) continue;
    if (!Array.isArray(module.quiz)) continue;
    if (JSON.stringify(module.quiz) !== JSON.stringify(module.quizQuestions)) {
      throw new Error(`Module ${module.id ?? "(unknown)"} quiz and quizQuestions differ`);
    }
  }
}

function wipeQuizEntry(entry) {
  for (const field of QUIZ_AJAMI_FIELDS) {
    if (Object.hasOwn(entry, field)) entry[field] = null;
  }
}

export function wipeManagedAjami(content) {
  for (const groupName of ["modules", "activities", "glossary"]) {
    if (!Array.isArray(content[groupName])) {
      throw new Error(`content.${groupName} must be an array`);
    }
    for (const entry of content[groupName]) {
      for (const field of TOP_LEVEL_MANAGED_AJAMI_FIELDS) {
        if (Object.hasOwn(entry, field)) entry[field] = null;
      }
      if (Object.hasOwn(entry, "ajami_validated")) entry.ajami_validated = false;
    }
  }
  for (const module of content.modules) {
    for (const quiz of module.quiz ?? []) wipeQuizEntry(quiz);
    if (Array.isArray(module.quiz)) {
      for (const quiz of module.quizQuestions ?? []) wipeQuizEntry(quiz);
    }
    for (const lesson of module.lessons ?? []) {
      if (lesson.heading && Object.hasOwn(lesson.heading, "ajami")) {
        lesson.heading.ajami = null;
      }
      if (lesson.term && Object.hasOwn(lesson.term, "ajami")) {
        lesson.term.ajami = null;
      }
      if (lesson.title && Object.hasOwn(lesson.title, "ajami")) {
        lesson.title.ajami = null;
      }
    }
    if (module.title && Object.hasOwn(module.title, "ajami")) module.title.ajami = null;
  }
  return content;
}

function addUncoveredWords(counts, words) {
  for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
}

function coveragePercent(covered, total) {
  return total === 0 ? 100 : Number(((covered / total) * 100).toFixed(2));
}

function entriesForGroup(content, group) {
  if (group === "quiz") {
    return content.modules.flatMap((module) => module.quiz ?? []);
  }
  if (group === "lessonHeadings") {
    return content.modules.flatMap((module) =>
      (module.lessons ?? [])
        .map((lesson) => lesson.heading)
        .filter((heading) => heading && Object.hasOwn(heading, "ha"))
    );
  }
  if (group === "moduleTitles") {
    return content.modules
      .map((module) => module.title)
      .filter((title) => title && Object.hasOwn(title, "ha"));
  }
  if (group === "lessonTerms") {
    return content.modules.flatMap((module) =>
      (module.lessons ?? [])
        .map((lesson) => lesson.term)
        .filter((term) => term && Object.hasOwn(term, "ha"))
    );
  }
  if (group === "lessonTitles") {
    return content.modules.flatMap((module) =>
      (module.lessons ?? [])
        .map((lesson) => lesson.title)
        .filter((title) => title && Object.hasOwn(title, "ha"))
    );
  }
  return content[group];
}

function composeFields(content, lexiconMap) {
  const composedByEntry = new Map();
  const uncoveredCounts = new Map();
  const fields = {};

  for (const spec of FIELD_SPECS) {
    const entries = entriesForGroup(content, spec.group);
    let covered = 0;
    let total = 0;
    for (const entry of entries) {
      if (!composedByEntry.has(entry)) composedByEntry.set(entry, {});

      const sourceValues = spec.arrayItems ? entry[spec.source] : [entry[spec.source]];
      if (!Array.isArray(sourceValues)) {
        throw new Error(`${spec.sourcePath} must be an array`);
      }
      const results = sourceValues.map((source) => analyzeAjamiComposition(source, lexiconMap));
      total += results.length;
      for (const result of results) {
        if (result.ajami == null) {
          addUncoveredWords(uncoveredCounts, result.uncoveredWords);
        } else {
          covered += 1;
        }
      }
      composedByEntry.get(entry)[spec.target] = spec.arrayItems
        ? results.map((result) => result.ajami)
        : results[0].ajami;
    }
    fields[spec.coverageKey ?? spec.target] = {
      source: spec.sourcePath ?? `${spec.group}[].${spec.source}`,
      total,
      covered,
      uncovered: total - covered,
      coveragePercent: coveragePercent(covered, total),
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
      : kind === "glossary"
        ? new Map([["termHa", ["termAjami", "ajami_validated"]]])
        : kind === "quiz"
          ? new Map([
            ["templateHa", ["templateHaAjami"]],
            ["answerFormula", ["answerFormulaAjami"]],
            ["distractorFormulas", ["distractorFormulasAjami"]],
          ])
          : new Map([["ha", ["ajami"]]]);
  const managedFields = new Set(
    [...insertions.values()].flat().filter((field) => field !== "ajami_validated")
  );

  // A previously absent scalar field stays absent when composition is
  // uncovered. Existing schema keys are retained with null instead. The
  // distractor target is always an index-aligned array whose individual
  // elements may be null.
  // ajami_validated is a whole-entry prose contract, so this short-field
  // pipeline must leave it false regardless of managed-field coverage.

  for (const [key, value] of Object.entries(entry)) {
    if (managedFields.has(key) || key === "ajami_validated") continue;
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
  assertQuizMirrors(content);
  wipeManagedAjami(content);
  const { composedByEntry, uncoveredCounts, fields } = composeFields(content, lexiconMap);

  content.modules = content.modules.map((entry) => {
    const output = insertManagedFields(entry, "module", composedByEntry.get(entry));
    if (entry.title && Object.hasOwn(entry.title, "ha")) {
      output.title = insertManagedFields(
        entry.title,
        "moduleTitle",
        composedByEntry.get(entry.title)
      );
    }
    if (Array.isArray(entry.lessons)) {
      output.lessons = entry.lessons.map((lesson) => {
        const outputLesson = { ...lesson };
        if (lesson.heading && Object.hasOwn(lesson.heading, "ha")) {
          outputLesson.heading = insertManagedFields(
            lesson.heading,
            "lessonHeading",
            composedByEntry.get(lesson.heading)
          );
        }
        if (lesson.term && Object.hasOwn(lesson.term, "ha")) {
          outputLesson.term = insertManagedFields(
            lesson.term,
            "lessonTerm",
            composedByEntry.get(lesson.term)
          );
        }
        if (lesson.title && Object.hasOwn(lesson.title, "ha")) {
          outputLesson.title = insertManagedFields(
            lesson.title,
            "lessonTitle",
            composedByEntry.get(lesson.title)
          );
        }
        return outputLesson;
      });
    }
    if (Array.isArray(entry.quiz)) {
      output.quiz = entry.quiz.map((quiz) =>
        insertManagedFields(quiz, "quiz", composedByEntry.get(quiz))
      );
      if (Array.isArray(entry.quizQuestions)) {
        output.quizQuestions = structuredClone(output.quiz);
      }
    }
    return output;
  });
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
