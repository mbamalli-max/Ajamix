#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const batchPath = resolve(here, "p3-maths-pilot.json");
const contentPath = resolve(repoRoot, "app", "content.json");

const patches = {
  "p3-maths-01": {
    textExplanationHa:
      "A wannan darasi za ka ƙara sanin lambobi har zuwa 1,000. Kowace lamba tana da matsayi. A lamba 342, 3 yana nufin ɗari uku, 4 yana nufin arba’in, 2 kuma yana nufin biyu. Idan ka fahimci daruruwa, gommai, da ɗaya-ɗaya, karatun lamba zai yi sauƙi. Ka yi tunanin jakar gero a kasuwa: ana iya ƙirga ta cikin ɗari, sai goma-goma, sai guda ɗaya. Haka lissafi yake tsara abubuwa. Idan aka ce ɗari 5, gommai 6, da ɗaya-ɗaya 7, lambar ita ce 567. Kada ka duba lamba a matsayin rubutu kawai; ka tambayi kanka, wane matsayi kowace lamba take nunawa? Wannan zai taimaka maka wajen ƙara, ragewa, da warware tambayoyin kuɗi ko kayan gida. Ka maimaita da murya, domin kunne da ido su riƙa aiki tare.",
    audioScript:
      "[INTRO] Yau za mu koyi lambobi har zuwa dubu ɗaya da matsayin kowace lamba. [MAIN] Lamba tana da wurare. A 342, 3 tana wurin ɗari, 4 tana wurin gommai, 2 tana wurin ɗaya-ɗaya. Idan ka ga 567, ka san akwai ɗari biyar, gommai shida, da ɗaya-ɗaya bakwai. [PAUSE 1] A lamba 342, wace lamba ce a wurin ɗari? [MAIN] Ka iya haɗa lamba daga sassa. Idan aka ce 4 ɗari, 5 goma, da 6 ɗaya, lambar ita ce 456. [PAUSE 2] Idan aka haɗa 4 ɗari, 5 goma, da 6 ɗaya, wace lamba ce? [OUTRO] Ka tuna: daruruwa, gommai, da ɗaya-ɗaya suna gaya maka ƙimar lamba.",
  },
  "p3-maths-02": {
    textExplanationHa:
      "Ƙari yana nufin haɗa abubuwa domin a sami jimla. A P3, za ka fara ganin tambayoyi inda ɗaya-ɗaya suka wuce goma. Idan hakan ya faru, sai mu sake haɗawa: goma ɗaya ta koma wurin gommai. Misali, 27 + 15. Ka fara da ɗaya-ɗaya: 7 + 5 = 12. Rubuta 2, ka ɗauki goma ɗaya zuwa wurin gommai. Sai gommai biyu, da gomma ɗaya, da gomma ɗaya da aka ɗauka, su zama gommai huɗu. Don haka amsar ita ce 42. Wannan hanya tana aiki a kasuwa, gida, ko makaranta. Idan kana da littattafai 38, abokinka ya kawo 24, sai ka haɗa su a hankali. Kada ka yi sauri ka ruɗe. Ka fara daga ɗaya-ɗaya, ka sake haɗawa idan ya wuce goma, sannan ka koma gommai da daruruwa.",
    audioScript:
      "[INTRO] A yau za mu yi ƙari da sake haɗawa. [MAIN] Idan ɗaya-ɗaya suka kai goma ko suka wuce goma, sai mu ɗauki goma ɗaya zuwa wurin gommai. Misali, 27 da 15. Bakwai da biyar sun zama goma sha biyu. Rubuta biyu a wurin ɗaya-ɗaya, sannan ka ɗauki goma ɗaya zuwa wurin gommai. Sai gommai su zama huɗu. Amsa ita ce 42. [PAUSE 1] Nawa ne 27 + 15? [MAIN] Ka riƙa farawa daga dama, wato ɗaya-ɗaya. Idan jimlar ta kai goma ko fiye, ka sake haɗawa. Wannan yana sa ƙari ya zama mai tsari. [PAUSE 2] Idan 8 + 7 ya zama 15, me za ka rubuta a wurin ɗaya-ɗaya? [OUTRO] Ka tuna: fara daga ɗaya-ɗaya, ɗauki goma idan ya cancanta.",
  },
};

const allowedFields = new Set(["textExplanationHa", "audioScript"]);
const patchIds = Object.keys(patches);

function fail(message) {
  console.error(`patch-p3-maths-01-02-hausa: FAIL: ${message}`);
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

function getModule(collection, id, label) {
  const module = collection.find((item) => item && item.id === id);
  if (!module) fail(`${id} does not exist in ${label}`);
  return module;
}

function assertIdsUnchanged(before, after, label) {
  const beforeIds = before.map((module) => module && module.id);
  const afterIds = after.map((module) => module && module.id);
  if (stable(beforeIds) !== stable(afterIds)) fail(`${label}: module ids changed`);
}

function assertOnlyApprovedFieldsChanged(beforeModules, afterModules, label) {
  for (const beforeModule of beforeModules) {
    const afterModule = getModule(afterModules, beforeModule.id, label);
    for (const field of Object.keys(beforeModule)) {
      const isApproved = patchIds.includes(beforeModule.id) && allowedFields.has(field);
      if (!isApproved && stable(beforeModule[field]) !== stable(afterModule[field])) {
        fail(`${label}: unexpected change at ${beforeModule.id}.${field}`);
      }
    }
    for (const field of Object.keys(afterModule)) {
      if (!Object.prototype.hasOwnProperty.call(beforeModule, field)) {
        fail(`${label}: unexpected new field at ${beforeModule.id}.${field}`);
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

if (!Array.isArray(batch)) fail("batch source is not an array");
if (!Array.isArray(content.modules)) fail("content.modules is not an array");
if (content.modules.length !== 148) fail(`app/content.json module count ${content.modules.length} !== 148`);

for (const id of patchIds) {
  getModule(batch, id, "batch source");
  getModule(content.modules, id, "content.modules");
}

const beforeBatch = clone(batch);
const beforeContent = clone(content);

patchModules(batch, "batch source");
patchModules(content.modules, "content.modules");

assertIdsUnchanged(beforeBatch, batch, "batch source");
assertIdsUnchanged(beforeContent.modules, content.modules, "content.modules");
assertOnlyApprovedFieldsChanged(beforeBatch, batch, "batch source");
assertOnlyApprovedFieldsChanged(beforeContent.modules, content.modules, "content.modules");

const serializedBatch = `${JSON.stringify(batch, null, 2)}\n`;
const serializedContent = `${JSON.stringify(content, null, 2)}\n`;

try {
  JSON.parse(serializedBatch);
  JSON.parse(serializedContent);
} catch (error) {
  fail(`patched JSON does not re-parse cleanly: ${error.message}`);
}

writeFileSync(batchPath, serializedBatch, "utf8");
writeFileSync(contentPath, serializedContent, "utf8");

console.log("patch-p3-maths-01-02-hausa: OK");
console.log("  patched: p3-maths-01.textExplanationHa");
console.log("  patched: p3-maths-01.audioScript");
console.log("  patched: p3-maths-02.textExplanationHa");
console.log("  patched: p3-maths-02.audioScript");
