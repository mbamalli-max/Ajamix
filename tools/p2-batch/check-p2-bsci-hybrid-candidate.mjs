#!/usr/bin/env node
import fs from 'node:fs';

const root = new URL('../..', import.meta.url);
const read = (relative) => JSON.parse(fs.readFileSync(new URL(relative, root), 'utf8'));
const live = read('app/content.json');
const patches = read('tools/p2-batch/p2-bsci-hybrid-existing-patches.json');
const appended = read('tools/p2-batch/p2-bsci-hybrid-new.json');
const staticRanges = JSON.stringify({ a: { min: 0, max: 0 }, b: { min: 0, max: 0 } });
const expectedExisting = Array.from({ length: 15 }, (_, index) => `p2-bsci-${String(index + 1).padStart(2, '0')}`);
const expectedAppended = ['p2-bsci-16', 'p2-bsci-17', 'p2-bsci-18', 'p2-bsci-19'];
const expectedPatches = ['p2-bsci-01', 'p2-bsci-02', 'p2-bsci-04', 'p2-bsci-05', 'p2-bsci-06', 'p2-bsci-07', 'p2-bsci-12', 'p2-bsci-13'];
const errors = [];
const fail = (message) => errors.push(message);
const normalize = (text) => text.normalize('NFC').toLocaleLowerCase('ha').replace(/[“”'’]/g, "'").replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ');
const sentences = (text) => text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [];
const words = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const pause = (audio, marker, next) => String(audio).match(new RegExp(`\\[${marker}\\]\\s*(.*?)\\s*\\[${next}\\]`, 's'))?.[1];

const modules = live.modules.map((module) => structuredClone(module));
const byId = new Map(modules.map((module) => [module.id, module]));
if (JSON.stringify(patches.map((patch) => patch.id)) !== JSON.stringify(expectedPatches)) fail('patch artifact ids do not match the approved matrix');
for (const patch of patches) {
  const module = byId.get(patch.id);
  if (!module) { fail(`${patch.id}: missing from live content`); continue; }
  const keys = Object.keys(patch.fields);
  if (keys.some((key) => !['textExplanationHa', 'audioScript', 'microPauses'].includes(key))) fail(`${patch.id}: patch changes an unapproved field`);
  Object.assign(module, patch.fields);
}

for (const module of appended) modules.push(module);
const ids = modules.map((module) => module.id);
if (new Set(ids).size !== ids.length) fail('candidate contains duplicate ids');
if (JSON.stringify(appended.map((module) => module.id)) !== JSON.stringify(expectedAppended)) fail('new ids are not exactly p2-bsci-16..19');
for (const id of expectedExisting) if (!byId.has(id)) fail(`${id}: existing id missing`);
const candidate = modules.filter((module) => /^p2-bsci-/.test(module.id));
if (candidate.length !== 19) fail(`candidate has ${candidate.length} P2 Basic Science modules, expected 19`);

for (const module of candidate) {
  const isNew = expectedAppended.includes(module.id);
  if (module.gradeband !== 'p2' || module.subject !== 'Basic Science' || module.subjectHa !== 'Kimiyya') fail(`${module.id}: gradeband or subject mismatch`);
  if (module.moduleNumber !== Number(module.id.slice(-2))) fail(`${module.id}: module number mismatch`);
  if (module.titleAjami !== null || module.textExplanationAjami !== null || module.ajami_validated !== false) fail(`${module.id}: Ajami schema mismatch`);
  if (module.track !== 'formal' || module.targetAudience !== 'youth' || module.chainNext !== null || module.gapTeaser !== null || module.useTodayPrompt !== null || module.isChainLeaf !== true) fail(`${module.id}: track/chain schema mismatch`);
  if (module.audioFile !== `audio/${module.id}.mp3` || module.imageCard !== `images/${module.id}.png`) fail(`${module.id}: asset path mismatch`);
  if (!Array.isArray(module.microPauses) || module.microPauses.length !== 2) fail(`${module.id}: pause count mismatch`);
  if (!Array.isArray(module.quizQuestions) || module.quizQuestions.length !== 5) fail(`${module.id}: quiz count mismatch`);
  if ((module.audioScript.match(/\[PAUSE [12]\]/g) || []).length !== 2) fail(`${module.id}: audio pause marker count mismatch`);
  if (module.microPauses?.[0]?.questionHa !== pause(module.audioScript, 'PAUSE 1', 'MAIN')) fail(`${module.id}: pause 1 audio mismatch`);
  if (module.microPauses?.[1]?.questionHa !== pause(module.audioScript, 'PAUSE 2', 'OUTRO')) fail(`${module.id}: pause 2 audio mismatch`);
  for (const [index, item] of module.microPauses.entries()) if (item.options.filter((option) => option === item.correctAnswer).length !== 1) fail(`${module.id}: pause ${index + 1} answer does not appear exactly once`);
  for (const [index, question] of module.quizQuestions.entries()) {
    if (JSON.stringify(question.variableRanges) !== staticRanges) fail(`${module.id}: quiz ${index + 1} is not static`);
    const options = [question.answerFormula, ...question.distractorFormulas].map((value) => String(value).trim().toLocaleLowerCase('ha'));
    if (question.distractorFormulas.length !== 3 || new Set(options).size !== 4) fail(`${module.id}: quiz ${index + 1} has invalid answer/distractor options`);
  }
  const seen = new Map();
  for (const [index, sentence] of sentences(module.textExplanationHa).entries()) {
    const key = normalize(sentence);
    if (seen.has(key)) fail(`${module.id}: duplicate sentences ${seen.get(key) + 1} and ${index + 1}`);
    else seen.set(key, index);
  }
  if (isNew && (words(module.textExplanationHa) < 120 || words(module.textExplanationHa) > 170)) fail(`${module.id}: word count ${words(module.textExplanationHa)} is outside 120-170`);
}

const newQ5 = appended.map((module) => module.quizQuestions[4].templateHa);
if (new Set(newQ5).size !== newQ5.length) fail('new-module Q5 templates are not unique');
const outros = appended.map((module) => module.audioScript.match(/\[OUTRO\]\s*(.*)$/s)?.[1]?.trim());
if (new Set(outros).size !== outros.length) fail('new-module OUTRO text is not unique');
const generic = 'A wannan darasi, za mu kalli batun a hankali domin ka gane shi cikin sauki kuma ka iya amfani da shi a rayuwarka ta yau da kullum.';
if (JSON.stringify(modules).includes(generic)) fail('generic filler remains in candidate');
for (const module of candidate) if (/\b(wheel|axle|solid|flexible|rigid|waterproof|absorbent)\b/i.test(module.textExplanationHa)) fail(`${module.id}: raw English term found in Hausa explanation`);

if (errors.length) {
  console.error(`check-p2-bsci-hybrid-candidate: FAIL (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('check-p2-bsci-hybrid-candidate: OK');
console.log('  existing ids preserved: p2-bsci-01..15');
console.log('  approved enrichments: 8');
console.log('  appended modules: p2-bsci-16..19');
console.log('  candidate modules checked: 19');
