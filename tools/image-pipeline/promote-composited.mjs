#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const contentPath = path.join(root, 'app/content.json');
const sourceDir = path.join(here, 'output/composited');
const targetDir = path.join(root, 'app/images');
const backupDir = path.join(here, 'output/app-images-backup-2026-07-23');

const EXPECTED = {
  imageCards: 359,
  composited: 335,
  skipped: 24,
  existing: [
    'p1-bsci-01.png', 'p1-maths-01.png', 'p2-bsci-16.png', 'p2-maths-08.png',
    'p3-bsci-12.png', 'p3-maths-12.png', 'p4-bsci-18.png', 'p4-maths-16.png',
    'p5-bsci-03.png', 'p5-bsci-11.png', 'p5-maths-13.png', 'p6-maths-11.png',
  ],
};

function modulesIn(value, found = []) {
  if (Array.isArray(value)) {
    for (const item of value) modulesIn(item, found);
  } else if (value && typeof value === 'object') {
    if (typeof value.id === 'string') found.push(value);
    for (const [key, item] of Object.entries(value)) {
      if (key !== 'id') modulesIn(item, found);
    }
  }
  return found;
}

function sameSet(actual, expected) {
  return actual.length === expected.length && actual.every((item, i) => item === expected[i]);
}

async function fileHash(file) {
  return createHash('sha256').update(await readFile(file)).digest('hex');
}

function stop(message) {
  console.error(`PROMOTION STOPPED: ${message}`);
  process.exitCode = 1;
}

async function main() {
  const content = JSON.parse(await readFile(contentPath, 'utf8'));
  const cards = modulesIn(content)
    .filter((module) => typeof module.imageCard === 'string')
    .map((module) => [module.id, path.basename(module.imageCard)]);
  const cardMap = new Map(cards);
  const sourceNames = (await readdir(sourceDir)).filter((name) => name.endsWith('.png')).sort();
  const sourceIds = new Set(sourceNames.map((name) => path.basename(name, '.png')));
  const promoted = [...cardMap]
    .filter(([id, basename]) => sourceIds.has(id) && basename === `${id}.png`)
    .map(([id]) => id)
    .sort();
  const skipped = [...cardMap]
    .filter(([id]) => !sourceIds.has(id))
    .map(([id]) => id)
    .sort();
  const mismatchedCards = [...cardMap]
    .filter(([id, basename]) => sourceIds.has(id) && basename !== `${id}.png`)
    .map(([id, basename]) => `${id} -> ${basename}`);

  let existing = [];
  try {
    existing = (await readdir(targetDir)).sort();
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const overwriteNames = promoted.filter((id) => existing.includes(`${id}.png`)).map((id) => `${id}.png`).sort();

  const discrepancies = [];
  if (cards.length !== EXPECTED.imageCards) discrepancies.push(`imageCard entries: expected ${EXPECTED.imageCards}, found ${cards.length}`);
  if (sourceNames.length !== EXPECTED.composited) discrepancies.push(`composited PNGs: expected ${EXPECTED.composited}, found ${sourceNames.length}`);
  if (promoted.length !== EXPECTED.composited) discrepancies.push(`promotion set: expected ${EXPECTED.composited}, found ${promoted.length}`);
  if (skipped.length !== EXPECTED.skipped) discrepancies.push(`skipped imageCards: expected ${EXPECTED.skipped}, found ${skipped.length}`);
  if (mismatchedCards.length) discrepancies.push(`imageCard basenames that do not match their source id: ${mismatchedCards.join(', ')}`);
  if (!sameSet(overwriteNames, [...EXPECTED.existing].sort())) discrepancies.push(`overwrite targets: expected [${[...EXPECTED.existing].sort().join(', ')}], found [${overwriteNames.join(', ')}]`);
  if (!sameSet(existing, [...EXPECTED.existing].sort())) discrepancies.push(`pre-existing app/images files: expected [${[...EXPECTED.existing].sort().join(', ')}], found [${existing.join(', ')}]`);
  if (discrepancies.length) return stop(discrepancies.join('\n'));

  // No source or target copy occurs until every guard above has passed.
  await mkdir(backupDir, { recursive: true });
  for (const name of overwriteNames) {
    await copyFile(path.join(targetDir, name), path.join(backupDir, name));
  }

  await mkdir(targetDir, { recursive: true });
  for (const id of promoted) {
    await copyFile(path.join(sourceDir, `${id}.png`), path.join(targetDir, `${id}.png`));
  }

  const failures = [];
  for (const id of promoted) {
    const source = path.join(sourceDir, `${id}.png`);
    const target = path.join(targetDir, `${id}.png`);
    try {
      const [sourceStat, targetStat, sourceHash, targetHash] = await Promise.all([stat(source), stat(target), fileHash(source), fileHash(target)]);
      if (sourceStat.size === 0 || targetStat.size === 0 || sourceStat.size !== targetStat.size || sourceHash !== targetHash) failures.push(id);
    } catch {
      failures.push(id);
    }
  }

  console.log(`Promoted: ${promoted.length}`);
  console.log(`Skipped (${skipped.length}): ${skipped.join(', ')}`);
  console.log(`Backed up: ${overwriteNames.length}`);
  console.log(`Post-copy checksum failures (${failures.length}): ${failures.length ? failures.join(', ') : 'none'}`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`PROMOTION STOPPED: ${error.stack ?? error.message}`);
  process.exitCode = 1;
});
