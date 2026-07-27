import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const EXPECTED_ORIGINAL_COUNT = 379;
const EXPECTED_BATCH_COUNT = 10;
const EXPECTED_MERGED_COUNT = 389;
const EXPECTED_IDS = Array.from(
  { length: EXPECTED_BATCH_COUNT },
  (_, index) => `CT${String(index + 1).padStart(2, '0')}`,
);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '../..');
const batchPath = resolve(scriptDir, 'ct-complete.json');
const contentPath = resolve(repoRoot, 'app/content.json');
const backupPath = resolve(
  repoRoot,
  '../New project/ai-system/projects/ajamix/tasks/2026-07-26-pre-ct-merge-content-379.json',
);

// Derived independently from the live V01 vocational module. CT uses the
// complete adult/vocational schema, including the lesson and static-quiz keys.
const KEY_ORDER = [
  'id', 'gradeband', 'subject', 'subjectHa', 'moduleNumber',
  'titleEn', 'titleHa', 'titleAjami', 'title', 'ajami_validated',
  'summary', 'textExplanationHa', 'textExplanationAjami',
  'audioScript', 'audioFile', 'imageCard', 'lessons', 'microPauses',
  'passingScore', 'quiz', 'quizQuestions', 'track', 'targetAudience',
  'gapTeaser', 'chainNext', 'isChainLeaf', 'useTodayPrompt',
];

const fail = (message) => {
  console.error(`merge-ct: FAIL — ${message}`);
  process.exit(1);
};

const readJson = (path, label) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`could not read ${label}: ${error.message}`);
  }
};

const sourceModules = readJson(batchPath, 'Critical Thinking source');
const liveContent = readJson(contentPath, 'live content bundle');

if (!Array.isArray(sourceModules)) fail('source root must be an array');
if (!Array.isArray(liveContent.modules)) fail('live content.modules must be an array');
if (sourceModules.length !== EXPECTED_BATCH_COUNT) {
  fail(`source count is ${sourceModules.length}; expected ${EXPECTED_BATCH_COUNT}`);
}

const sourceIds = sourceModules.map(({ id }) => id);
if (JSON.stringify(sourceIds) !== JSON.stringify(EXPECTED_IDS)) {
  fail(`source IDs are not the exact contiguous range ${EXPECTED_IDS[0]}..${EXPECTED_IDS.at(-1)}`);
}

for (const module of sourceModules) {
  const keys = Object.keys(module);
  if (keys.length !== KEY_ORDER.length || KEY_ORDER.some((key, index) => keys[index] !== key)) {
    fail(`module ${module.id} does not have the exact expected adult/vocational key order`);
  }
}

// Hard safety guard: this approved batch must remain non-doctrinal. A source
// edit that introduces any listed religious term must be reviewed, not merged.
const religiousTerms = [
  'qadar', 'addini', 'musulunci', 'musulmi', 'annabi', "alkur'ani",
  'ibada', 'sadaka', 'aljanna',
];
const sourceText = JSON.stringify(sourceModules).toLocaleLowerCase('ha');
const religiousHit = religiousTerms.find((term) => sourceText.includes(term));
if (religiousHit) {
  fail(`religious-sensitivity guard found banned term ${JSON.stringify(religiousHit)} in the Critical Thinking source`);
}

const duplicateLiveIds = liveContent.modules
  .map(({ id }) => id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);
if (duplicateLiveIds.length) {
  fail(`live bundle already contains duplicate IDs: ${[...new Set(duplicateLiveIds)].join(', ')}`);
}

const liveIdSet = new Set(liveContent.modules.map(({ id }) => id));
const existingBatchIds = EXPECTED_IDS.filter((id) => liveIdSet.has(id));

const toLiveModule = (module) => Object.fromEntries(KEY_ORDER.map((key) => [key, module[key]]));
const expectedAppendedModules = sourceModules.map(toLiveModule);

if (existingBatchIds.length === EXPECTED_BATCH_COUNT) {
  // Idempotent no-op path: verify this batch exactly matches the approved
  // source transformation regardless of any subsequently merged subjects.
  const existingModules = EXPECTED_IDS.map((id) => liveContent.modules.find((module) => module.id === id));
  if (JSON.stringify(existingModules) !== JSON.stringify(expectedAppendedModules)) {
    fail('all batch IDs exist, but their live objects do not exactly match the approved source transformation');
  }
  console.log('merge-ct: PASS — religious-sensitivity guard found no banned religious terms.');
  console.log(`merge-ct: OK — already merged; ${EXPECTED_MERGED_COUNT} modules, exact source match.`);
  process.exit(0);
}

if (existingBatchIds.length) {
  fail(`partial merge detected; already present: ${existingBatchIds.join(', ')}`);
}
if (liveContent.modules.length !== EXPECTED_ORIGINAL_COUNT) {
  fail(`live count is ${liveContent.modules.length}; expected ${EXPECTED_ORIGINAL_COUNT} before merge`);
}

const originalModules = structuredClone(liveContent.modules);
const originalNonModules = Object.fromEntries(
  Object.entries(liveContent).filter(([key]) => key !== 'modules'),
);

if (existsSync(backupPath)) {
  const existingBackup = readJson(backupPath, 'existing pre-merge backup');
  if (JSON.stringify(existingBackup) !== JSON.stringify(liveContent)) {
    fail(`backup already exists but is not identical to the current pre-merge bundle: ${backupPath}`);
  }
} else {
  copyFileSync(contentPath, backupPath);
}

const mergedContent = {
  ...liveContent,
  modules: [...liveContent.modules, ...expectedAppendedModules],
};
writeFileSync(contentPath, `${JSON.stringify(mergedContent, null, 2)}\n`);

const writtenContent = readJson(contentPath, 'written live content bundle');
if (writtenContent.modules.length !== EXPECTED_MERGED_COUNT) {
  fail(`written live count is ${writtenContent.modules.length}; expected ${EXPECTED_MERGED_COUNT}`);
}
if (JSON.stringify(writtenContent.modules.slice(0, EXPECTED_ORIGINAL_COUNT)) !== JSON.stringify(originalModules)) {
  fail('one or more pre-existing module objects changed during the merge');
}
const writtenNonModules = Object.fromEntries(
  Object.entries(writtenContent).filter(([key]) => key !== 'modules'),
);
if (JSON.stringify(writtenNonModules) !== JSON.stringify(originalNonModules)) {
  fail('one or more non-module top-level fields changed during the merge');
}
if (JSON.stringify(writtenContent.modules.slice(EXPECTED_ORIGINAL_COUNT)) !== JSON.stringify(expectedAppendedModules)) {
  fail('appended live modules do not exactly match the approved source transformation');
}
if (new Set(writtenContent.modules.map(({ id }) => id)).size !== EXPECTED_MERGED_COUNT) {
  fail('written bundle contains duplicate module IDs');
}

console.log('merge-ct: PASS — religious-sensitivity guard found no banned religious terms.');
console.log(
  `merge-ct: OK — ${EXPECTED_ORIGINAL_COUNT} -> ${EXPECTED_MERGED_COUNT}; appended ${EXPECTED_IDS[0]}..${EXPECTED_IDS.at(-1)}; preserved all existing modules and non-module fields; backup=${backupPath}`,
);
