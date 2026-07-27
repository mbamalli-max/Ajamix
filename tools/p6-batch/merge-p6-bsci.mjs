import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const EXPECTED_ORIGINAL_COUNT = 294;
const EXPECTED_BATCH_COUNT = 15;
const EXPECTED_MERGED_COUNT = 309;
const EXPECTED_IDS = Array.from(
  { length: EXPECTED_BATCH_COUNT },
  (_, index) => `p6-bsci-${String(index + 1).padStart(2, '0')}`,
);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '../..');
const batchPath = resolve(scriptDir, 'p6-bsci.json');
const contentPath = resolve(repoRoot, 'app/content.json');
const backupPath = resolve(
  repoRoot,
  '../New project/ai-system/projects/ajamix/tasks/2026-07-13-pre-p6-bsci-merge-content-294.json',
);

const fail = (message) => {
  console.error(`merge-p6-bsci: FAIL — ${message}`);
  process.exit(1);
};

const readJson = (path, label) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`could not read ${label}: ${error.message}`);
  }
};

const sourceModules = readJson(batchPath, 'P6 Basic Science source');
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

const duplicateLiveIds = liveContent.modules
  .map(({ id }) => id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);
if (duplicateLiveIds.length) {
  fail(`live bundle already contains duplicate IDs: ${[...new Set(duplicateLiveIds)].join(', ')}`);
}

const liveIdSet = new Set(liveContent.modules.map(({ id }) => id));
const existingBatchIds = EXPECTED_IDS.filter((id) => liveIdSet.has(id));

const toLiveModule = (module) => ({
  id: module.id,
  gradeband: module.gradeband,
  subject: module.subject,
  subjectHa: module.subjectHa,
  moduleNumber: module.moduleNumber,
  titleEn: module.titleEn,
  titleHa: module.titleHa,
  titleAjami: module.titleAjami,
  ajami_validated: module.ajami_validated,
  textExplanationHa: module.textExplanationHa,
  textExplanationAjami: null,
  audioScript: module.audioScript,
  audioFile: module.audioFile,
  imageCard: module.imageCard,
  microPauses: module.microPauses,
  quizQuestions: module.quizQuestions,
  track: module.track,
  targetAudience: module.targetAudience,
  gapTeaser: module.gapTeaser,
  chainNext: module.chainNext,
  isChainLeaf: module.isChainLeaf,
  useTodayPrompt: module.useTodayPrompt,
});

const expectedAppendedModules = sourceModules.map(toLiveModule);

if (existingBatchIds.length === EXPECTED_BATCH_COUNT) {
  if (liveContent.modules.length !== EXPECTED_MERGED_COUNT) {
    fail(`all batch IDs exist, but live count is ${liveContent.modules.length}; expected ${EXPECTED_MERGED_COUNT}`);
  }
  const existingModules = EXPECTED_IDS.map((id) => liveContent.modules.find((module) => module.id === id));
  if (JSON.stringify(existingModules) !== JSON.stringify(expectedAppendedModules)) {
    fail('all batch IDs exist, but their live objects do not exactly match the approved source transformation');
  }
  console.log(`merge-p6-bsci: OK — already merged; ${EXPECTED_MERGED_COUNT} modules, exact source match.`);
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

console.log(
  `merge-p6-bsci: OK — ${EXPECTED_ORIGINAL_COUNT} -> ${EXPECTED_MERGED_COUNT}; appended ${EXPECTED_IDS[0]}..${EXPECTED_IDS.at(-1)}; preserved all existing modules and non-module fields; backup=${backupPath}`,
);
