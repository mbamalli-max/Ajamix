#!/usr/bin/env node
// Scaffolds an image-needs manifest for a set of modules so it can be filled
// in by content review, then used to drive image rendering later.
//
// Usage:
//   node tools/image-manifest/generate-image-manifest.mjs --ids=p5-bsci-01,p5-bsci-02 > out.json
//   node tools/image-manifest/generate-image-manifest.mjs --file=tools/p5-batch/p5-bsci.json > out.json
//
// Each entry starts with the mechanical fields already filled (id, imagePath,
// titleEn, titleHa) and empty fields for the judgment-based ones (type,
// depictEn, labelsHa, safetyNote) — those must be completed by a content
// reviewer who has read the module, not guessed from the title alone.
import { readFileSync } from 'node:fs';

const contentPath = new URL('../../app/content.json', import.meta.url);
const idsArg = process.argv.find((a) => a.startsWith('--ids='));
const fileArg = process.argv.find((a) => a.startsWith('--file='));
const requestedIds = idsArg ? new Set(idsArg.slice('--ids='.length).split(',').filter(Boolean)) : null;

const input = JSON.parse(readFileSync(fileArg ? fileArg.slice('--file='.length) : contentPath, 'utf8'));
const allModules = Array.isArray(input) ? input : input.modules;
if (!Array.isArray(allModules)) throw new Error('Input must be a module array or an object with a modules array.');
const modules = requestedIds ? allModules.filter((m) => requestedIds.has(m.id)) : allModules;
if (requestedIds && modules.length !== requestedIds.size) {
  const foundIds = new Set(modules.map((m) => m.id));
  throw new Error(`Unknown module ids: ${[...requestedIds].filter((id) => !foundIds.has(id)).join(', ')}`);
}

const manifest = modules.map((m) => ({
  id: m.id,
  imagePath: m.imageCard ?? `images/${m.id}.png`,
  titleEn: m.titleEn,
  titleHa: m.titleHa,
  type: '',
  depictEn: '',
  labelsHa: [],
  safetyNote: '',
}));

console.log(JSON.stringify(manifest, null, 2));
