#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const batchPath = resolve(here, "p3-maths-pilot.json");
const contentPath = resolve(repoRoot, "app", "content.json");

const patches = {
  "p3-maths-05": {
    textExplanationHa:
      "Rarrabawa tana nufin rabon abubuwa daidai ko sanya su cikin rukuni daidai. Idan kana da alewa 20, ka raba ga yara 10, kowane yaro zai samu 2. Rarrabawa tana da alaƙa da ninkawa. Idan 10 × 2 = 20, to 20 ÷ 10 = 2. Wannan yana nuna cewa ninkawa da rarrabawa suna taimakon juna. A rayuwa, ana amfani da rarrabawa wajen rabon abinci, kuɗi, littattafai, ko kujeru. Muhimmin abu shi ne adalci: kowane rukuni ya samu adadi iri ɗaya. Idan wani abu ya rage, za ka iya ajiye shi; daga baya za ka koyi yadda ake rubuta saura. A wannan mataki, za mu fara da rabo mai sauƙi wanda ba ya da saura, domin ka fara ganin tsarin da kyau.",
    audioScript:
      "[INTRO] Yau za mu fara koyon rarrabawa. [MAIN] Rarrabawa tana nufin raba abu daidai. Idan akwai alewa 20 ga yara 10, kowane yaro zai samu 2. Wannan yana da alaƙa da ninkawa, saboda 10 sau 2 ya zama 20. [PAUSE 1] Idan an raba alewa 20 ga yara 10 daidai, kowane yaro zai samu nawa? [MAIN] Ka kuma iya tunanin rukuni. Idan abubuwa 30 sun shiga rukuni 5 daidai, kowane rukuni zai samu 6. [PAUSE 2] Idan an raba abubuwa 30 zuwa rukuni 5 daidai, kowane rukuni nawa zai samu? [OUTRO] Ka tuna: rarrabawa na neman rabo daidai.",
  },
  "p3-maths-06": {
    textExplanationHa:
      "Kaso yana nuna wani ɓangare na abu cikakke. Idan ka raba gurasa gida biyu daidai, kowane ɓangare rabi ne. Idan ka raba abu gida huɗu daidai, kowane ɓangare kwata ne. Muhimmin kalma ita ce daidai. Idan rabon bai yi daidai ba, ba za mu kira shi rabi ko kwata daidai ba. A gida, za ka iya ganin kaso lokacin rabon tuwo, lemo, ko takarda. Idan yara biyu sun raba lemo 10 daidai, kowane yaro ya samu 5, wato rabin 10. Idan rukuni huɗu suna da abu iri ɗaya, kowanne rukuni yana wakiltar kwata ɗaya na jimla. Kaso yana taimaka mana mu fahimci rabon adalci. Ka fara da zane ko abubuwa na gaske, sannan ka koma lamba. Idan ka zana da'ira ko murabba'i, rabi da kwata za su fi bayyana.",
    audioScript:
      "[INTRO] A yau za mu koyi rabi da kwata. [MAIN] Rabi yana nufin raba abu gida biyu daidai. Idan lemo 10 ya kasu gida biyu daidai, kowane gida ya samu 5. [PAUSE 1] Rabin 10 nawa ne? [MAIN] Kwata yana nufin raba abu gida huɗu daidai. Idan akwai rukuni huɗu, kowanne rukuni yana wakiltar kwata ɗaya na jimla. [PAUSE 2] Idan abu ya kasu gida huɗu daidai, kowane ɓangare ana kiransa me? [OUTRO] Ka tuna: rabi yana nufin gida biyu daidai; kwata yana nufin gida huɗu daidai.",
    microPauseQuestionHa:
      "Idan abu ya kasu gida huɗu daidai, kowane ɓangare ana kiransa me?",
  },
};

const approvedPaths = new Set([
  "p3-maths-05.textExplanationHa",
  "p3-maths-05.audioScript",
  "p3-maths-06.textExplanationHa",
  "p3-maths-06.audioScript",
  "p3-maths-06.microPauses[1].questionHa",
]);

function fail(message) {
  console.error(`patch-p3-maths-05-06-hausa: FAIL: ${message}`);
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

function diffValues(before, after, prefix, out) {
  if (stable(before) === stable(after)) return;

  if (Array.isArray(before) && Array.isArray(after)) {
    if (before.length !== after.length) {
      out.push(prefix);
      return;
    }
    before.forEach((value, index) => diffValues(value, after[index], `${prefix}[${index}]`, out));
    return;
  }

  if (before && after && typeof before === "object" && typeof after === "object") {
    const beforeKeys = Object.keys(before);
    const afterKeys = Object.keys(after);
    if (stable(beforeKeys) !== stable(afterKeys)) {
      out.push(prefix);
      return;
    }
    beforeKeys.forEach((key) => diffValues(before[key], after[key], prefix ? `${prefix}.${key}` : key, out));
    return;
  }

  out.push(prefix);
}

function assertOnlyApprovedFieldsChanged(beforeModules, afterModules, label) {
  if (stable(moduleIds(beforeModules)) !== stable(moduleIds(afterModules))) {
    fail(`${label}: module ids were added, removed, or reordered`);
  }

  const diffs = [];
  for (const beforeModule of beforeModules) {
    const afterModule = getModule(afterModules, beforeModule.id, label);
    diffValues(beforeModule, afterModule, beforeModule.id, diffs);
  }

  const unexpected = diffs.filter((path) => !approvedPaths.has(path));
  if (unexpected.length > 0) {
    fail(`${label}: unexpected change(s): ${unexpected.join(", ")}`);
  }
}

function patchModules(modules, label) {
  const module05 = getModule(modules, "p3-maths-05", label);
  module05.textExplanationHa = patches["p3-maths-05"].textExplanationHa;
  module05.audioScript = patches["p3-maths-05"].audioScript;

  const module06 = getModule(modules, "p3-maths-06", label);
  module06.textExplanationHa = patches["p3-maths-06"].textExplanationHa;
  module06.audioScript = patches["p3-maths-06"].audioScript;
  module06.microPauses[1].questionHa = patches["p3-maths-06"].microPauseQuestionHa;
}

function assertMicroPauseIntegrity(modules, label) {
  for (const id of Object.keys(patches)) {
    const module = getModule(modules, id, label);
    module.microPauses.forEach((pause, index) => {
      if (!Array.isArray(pause.options) || !pause.options.includes(pause.correctAnswer)) {
        fail(`${label}: ${module.id}.microPauses[${index}].correctAnswer is not in options`);
      }
    });
  }

  const module06 = getModule(modules, "p3-maths-06", label);
  const question = module06.microPauses[1].questionHa;
  if (!module06.audioScript.includes(`[PAUSE 2] ${question}`)) {
    fail(`${label}: p3-maths-06 [PAUSE 2] does not exactly match microPauses[1].questionHa`);
  }
}

const batch = readJson(batchPath);
const content = readJson(contentPath);
const batchModules = modulesOf(batch, "batch source");
const contentModules = modulesOf(content, "content.modules");

if (contentModules.length !== 148) fail(`app/content.json module count ${contentModules.length} !== 148`);

for (const id of Object.keys(patches)) {
  getModule(batchModules, id, "batch source");
  getModule(contentModules, id, "content.modules");
}

const beforeBatch = clone(batchModules);
const beforeContent = clone(contentModules);

patchModules(batchModules, "batch source");
patchModules(contentModules, "content.modules");

assertOnlyApprovedFieldsChanged(beforeBatch, batchModules, "batch source");
assertOnlyApprovedFieldsChanged(beforeContent, contentModules, "content.modules");
assertMicroPauseIntegrity(batchModules, "batch source");
assertMicroPauseIntegrity(contentModules, "content.modules");

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

console.log("patch-p3-maths-05-06-hausa: OK");
for (const path of approvedPaths) {
  console.log(`  patched: ${path}`);
}
