import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const EXPECTED_MODULE_COUNT = 389;
const EXPECTED_TARGET_COUNT = 30;
const EXPECTED_SUBJECT_COUNTS = new Map([
  ['Vocational Skills', 10],
  ['Philosophy', 10],
  ['Critical Thinking', 10],
]);
const EXPECTED_LESSON_COUNT = 150;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '../..');
const contentPath = resolve(repoRoot, 'app/content.json');
const backupPath = resolve(
  repoRoot,
  '../New project/ai-system/projects/ajamix/tasks/2026-07-26-pre-lesson-audio-patch-content-389.json',
);

const fail = (message) => {
  console.error(`patch-lesson-audio-files: FAIL — ${message}`);
  process.exit(1);
};

const readJson = (path, label) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`could not read ${label}: ${error.message}`);
  }
};

const expectedLessonAudioFile = (module, index) => (
  `${posix.dirname(module.audioFile)}/${module.id}-${String(index + 1).padStart(2, '0')}.mp3`
);

const withoutLessons = (module) => Object.fromEntries(
  Object.entries(module).filter(([key]) => key !== 'lessons'),
);

const liveContent = readJson(contentPath, 'live content bundle');
if (!Array.isArray(liveContent.modules)) fail('live content.modules must be an array');
if (liveContent.modules.length !== EXPECTED_MODULE_COUNT) {
  fail(`live module count is ${liveContent.modules.length}; expected ${EXPECTED_MODULE_COUNT}`);
}

const targetModules = liveContent.modules.filter(
  (module) => module.track === 'vocational' && module.gradeband === 'adult',
);
if (targetModules.length !== EXPECTED_TARGET_COUNT) {
  fail(`adult vocational target count is ${targetModules.length}; expected ${EXPECTED_TARGET_COUNT}`);
}

const actualSubjectCounts = new Map();
for (const module of targetModules) {
  actualSubjectCounts.set(module.subject, (actualSubjectCounts.get(module.subject) ?? 0) + 1);
}
if (
  actualSubjectCounts.size !== EXPECTED_SUBJECT_COUNTS.size
  || [...EXPECTED_SUBJECT_COUNTS].some(([subject, count]) => actualSubjectCounts.get(subject) !== count)
) {
  fail(`adult vocational subjects/counts are not exact: ${JSON.stringify(Object.fromEntries(actualSubjectCounts))}`);
}

let totalLessons = 0;
let existingLessonAudioFields = 0;
for (const module of targetModules) {
  if (!Array.isArray(module.lessons) || module.lessons.length === 0) {
    fail(`target module ${module.id} has a missing or empty lessons array`);
  }
  if (typeof module.audioFile !== 'string' || module.audioFile.length === 0) {
    fail(`target module ${module.id} has no usable module-level audioFile`);
  }
  for (const [index, lesson] of module.lessons.entries()) {
    if (!lesson || typeof lesson !== 'object' || Array.isArray(lesson)) {
      fail(`target module ${module.id} lesson ${index + 1} is not an object`);
    }
    totalLessons += 1;
    if (Object.hasOwn(lesson, 'audioFile')) {
      existingLessonAudioFields += 1;
      const expected = expectedLessonAudioFile(module, index);
      if (lesson.audioFile !== expected) {
        fail(`target module ${module.id} lesson ${index + 1} has audioFile ${JSON.stringify(lesson.audioFile)}; expected ${JSON.stringify(expected)} (partial/inconsistent state)`);
      }
    }
  }
}
if (totalLessons !== EXPECTED_LESSON_COUNT) {
  fail(`target lesson count is ${totalLessons}; expected ${EXPECTED_LESSON_COUNT}`);
}

if (existingLessonAudioFields === EXPECTED_LESSON_COUNT) {
  console.log(`patch-lesson-audio-files: PASS — already patched; ${EXPECTED_LESSON_COUNT} lesson audioFile values across ${EXPECTED_TARGET_COUNT} adult vocational modules exactly match the expected naming convention. No write performed.`);
  process.exit(0);
}
if (existingLessonAudioFields !== 0) {
  fail(`partial patch detected: ${existingLessonAudioFields} of ${EXPECTED_LESSON_COUNT} target lessons already have audioFile fields`);
}

const originalModules = structuredClone(liveContent.modules);
const originalNonModules = Object.fromEntries(
  Object.entries(liveContent).filter(([key]) => key !== 'modules'),
);

if (existsSync(backupPath)) {
  const existingBackup = readJson(backupPath, 'existing pre-patch backup');
  if (JSON.stringify(existingBackup) !== JSON.stringify(liveContent)) {
    fail(`backup already exists but is not identical to the current pre-patch bundle: ${backupPath}`);
  }
} else {
  copyFileSync(contentPath, backupPath);
}

for (const module of targetModules) {
  module.lessons = module.lessons.map((lesson, index) => ({
    ...lesson,
    audioFile: expectedLessonAudioFile(module, index),
  }));
}

writeFileSync(contentPath, `${JSON.stringify(liveContent, null, 2)}\n`);

const writtenContent = readJson(contentPath, 'written live content bundle');
if (!Array.isArray(writtenContent.modules) || writtenContent.modules.length !== EXPECTED_MODULE_COUNT) {
  fail(`written module count is ${writtenContent.modules?.length}; expected ${EXPECTED_MODULE_COUNT}`);
}
const writtenNonModules = Object.fromEntries(
  Object.entries(writtenContent).filter(([key]) => key !== 'modules'),
);
if (JSON.stringify(writtenNonModules) !== JSON.stringify(originalNonModules)) {
  fail('one or more non-module top-level fields changed during the patch');
}

for (const [index, originalModule] of originalModules.entries()) {
  const writtenModule = writtenContent.modules[index];
  const isTarget = originalModule.track === 'vocational' && originalModule.gradeband === 'adult';
  if (!isTarget) {
    if (JSON.stringify(writtenModule) !== JSON.stringify(originalModule)) {
      fail(`non-adult-target module ${originalModule.id} changed during the patch`);
    }
    continue;
  }
  if (JSON.stringify(withoutLessons(writtenModule)) !== JSON.stringify(withoutLessons(originalModule))) {
    fail(`target module ${originalModule.id} has changed non-lessons fields`);
  }
  if (!Array.isArray(writtenModule.lessons) || writtenModule.lessons.length !== originalModule.lessons.length) {
    fail(`target module ${originalModule.id} lessons array changed length`);
  }
  for (const [lessonIndex, originalLesson] of originalModule.lessons.entries()) {
    const writtenLesson = writtenModule.lessons[lessonIndex];
    const expected = expectedLessonAudioFile(originalModule, lessonIndex);
    const expectedLesson = { ...originalLesson, audioFile: expected };
    if (JSON.stringify(writtenLesson) !== JSON.stringify(expectedLesson)) {
      fail(`target module ${originalModule.id} lesson ${lessonIndex + 1} changed beyond its appended audioFile field`);
    }
  }
}

console.log(
  `patch-lesson-audio-files: PASS — added ${EXPECTED_LESSON_COUNT} lesson audioFile values across ${EXPECTED_TARGET_COUNT} adult vocational modules; preserved all ${EXPECTED_MODULE_COUNT - EXPECTED_TARGET_COUNT} non-target modules, target non-lessons fields, and non-module top-level fields; backup=${backupPath}`,
);
