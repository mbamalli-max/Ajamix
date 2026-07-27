#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const batchPath = resolve(here, "p3-maths-pilot.json");
const contentPath = resolve(repoRoot, "app", "content.json");

const patches = {
  "p3-maths-03": {
    textExplanationHa:
      "Ragi yana nufin cire wani adadi daga wani adadi. Wani lokaci, lambar ɗaya-ɗaya da ke sama ba ta isa a cire lambar da ke ƙasa ba. Sai mu ɗauki aro daga wurin gommai. Misali, 52 − 18. Ba za ka iya cire 8 daga 2 ba, saboda 2 ya yi kaɗan. Sai ka ɗauki goma ɗaya daga gommai 5, wurin ɗaya-ɗaya ya zama 12. Yanzu 12 − 8 = 4. Gommai da suka rage sun zama 4, sai 4 − 1 = 3. Amsa ita ce 34. Wannan ba ruɗani ba ne; tsari ne. Ka yi tunanin kana da kuɗi ₦52, ka kashe ₦18. Idan ɗaya-ɗaya ba su isa ba, sai ka canja goma ɗaya zuwa ɗaya-ɗaya goma. Haka ɗaukar aro yake taimaka maka ka rage daidai.",
    audioScript:
      "[INTRO] Yau za mu koyi ragi da ɗaukar aro. [MAIN] Idan ɗaya-ɗaya da ke sama sun yi kaɗan, sai mu ɗauki aro daga gommai. A 52 rage 18, 2 ba ta isa a cire 8 ba. Sai wurin ɗaya-ɗaya ya zama 12, kuma gommai 5 su koma gommai 4. [PAUSE 1] Nawa ne 52 - 18? [MAIN] Bayan ɗaukar aro, 12 rage 8 ya zama 4. Sai gommai 4 rage goma ɗaya ya zama gommai 3. Amsa ita ce 34. [PAUSE 2] Idan ɗaya-ɗaya a sama sun yi kaɗan, daga ina ake ɗaukar aro? [OUTRO] Ka tuna: ɗaukar aro yana canja goma ɗaya zuwa ɗaya-ɗaya goma.",
  },
  "p3-maths-04": {
    textExplanationHa:
      "Ninkawa hanya ce ta haɗa adadi iri ɗaya sau da yawa. Idan ka ce 4 × 3, kana nufin rukuni 3 na 4: 4 + 4 + 4 = 12. A P3, yana da muhimmanci ka fara ƙwarewa a teburin 2, 3, 4, 5, da 10. Wannan zai taimaka maka a rarrabawa, kuɗi, lokaci, da auna kaya. Misali, idan kwalbar ruwa ɗaya tana ₦10, kwalabe 5 za su zama ₦50. Idan kujera ɗaya tana da ƙafa 4, kujeru 3 suna da ƙafa 12. Kada ka haddace kawai ba tare da fahimta ba. Ka ga ninkawa a matsayin rukuni-rukuni. Rukuni 5 na abubuwa 2 yana nufin 2 + 2 + 2 + 2 + 2. Idan ka iya ganin rukuni, amsar ninkawa za ta fi fitowa da sauri.",
    audioScript:
      "[INTRO] A yau za mu koyi teburin ninkawa na 2, 3, 4, 5, da 10. [MAIN] Ninkawa yana nufin haɗa adadi iri ɗaya sau da yawa. Idan muka ce 4 sau 3, muna nufin rukuni 3 na 4: 4 + 4 + 4. [PAUSE 1] Nawa ne 4 × 3? [MAIN] Ka tuna da misalai daga gida. Kujeru 3, kowace tana da ƙafa 4, za su ba da ƙafa 12. Kwalabe 5 na ₦10 za su zama ₦50. [PAUSE 2] Idan kwalba ɗaya tana ₦10, kwalabe 5 nawa ne? [OUTRO] Ka riƙa ganin ninkawa a matsayin rukuni-rukuni.",
  },
};

const allowedFields = new Set(["textExplanationHa", "audioScript"]);
const patchIds = Object.keys(patches);

function fail(message) {
  console.error(`patch-p3-maths-03-04-hausa: FAIL: ${message}`);
  process.exit(1);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`${path} is not valid JSON: ${error.message}`);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function stable(value) {
  return JSON.stringify(value);
}

function modulesOf(data, label) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.modules)) return data.modules;
  fail(`${label} does not contain a module array`);
}

function getModule(modules, id, label) {
  const module = modules.find((item) => item && item.id === id);
  if (!module) fail(`${id} does not exist in ${label}`);
  return module;
}

function moduleIds(modules) {
  return modules.map((module) => module && module.id);
}

function assertOnlyApprovedFieldsChanged(beforeModules, afterModules, label) {
  if (stable(moduleIds(beforeModules)) !== stable(moduleIds(afterModules))) {
    fail(`${label}: module ids were added, removed, or reordered`);
  }

  for (const beforeModule of beforeModules) {
    const afterModule = getModule(afterModules, beforeModule.id, label);
    if (stable(Object.keys(beforeModule)) !== stable(Object.keys(afterModule))) {
      fail(`${label}: schema fields changed for ${beforeModule.id}`);
    }

    for (const key of Object.keys(beforeModule)) {
      const approved = patchIds.includes(beforeModule.id) && allowedFields.has(key);
      if (!approved && stable(beforeModule[key]) !== stable(afterModule[key])) {
        fail(`${label}: unexpected change at ${beforeModule.id}.${key}`);
      }
    }
  }
}

function patchModules(modules, label) {
  for (const id of patchIds) {
    const module = getModule(modules, id, label);
    module.textExplanationHa = patches[id].textExplanationHa;
    module.audioScript = patches[id].audioScript;
  }
}

const batch = readJson(batchPath);
const content = readJson(contentPath);
const batchModules = modulesOf(batch, "batch source");
const contentModules = modulesOf(content, "content.modules");

if (contentModules.length !== 148) fail(`app/content.json module count ${contentModules.length} !== 148`);

for (const id of patchIds) {
  getModule(batchModules, id, "batch source");
  getModule(contentModules, id, "content.modules");
}

const beforeBatch = clone(batchModules);
const beforeContent = clone(contentModules);

patchModules(batchModules, "batch source");
patchModules(contentModules, "content.modules");

assertOnlyApprovedFieldsChanged(beforeBatch, batchModules, "batch source");
assertOnlyApprovedFieldsChanged(beforeContent, contentModules, "content.modules");

const batchOut = `${JSON.stringify(batch, null, 2)}\n`;
const contentOut = `${JSON.stringify(content, null, 2)}\n`;

try {
  JSON.parse(batchOut);
  JSON.parse(contentOut);
} catch (error) {
  fail(`patched JSON does not re-parse cleanly: ${error.message}`);
}

writeFileSync(batchPath, batchOut, "utf8");
writeFileSync(contentPath, contentOut, "utf8");

console.log("patch-p3-maths-03-04-hausa: OK");
for (const id of patchIds) {
  console.log(`  patched: ${id}.textExplanationHa`);
  console.log(`  patched: ${id}.audioScript`);
}
