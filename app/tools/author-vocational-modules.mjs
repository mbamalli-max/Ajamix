#!/usr/bin/env node
/**
 * Author vocational modules V01–V10 with auto-transliteration.
 * Reads app/content.json, appends 10 new vocational modules, validates chain, outputs to stdout.
 * Usage: node app/tools/author-vocational-modules.mjs > /tmp/modules.json
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const contentPath = resolve(here, '..', 'content.json');

// ─────────────────────────────────────────────────────────────────────────
// TRANSLITERATION ENGINE (extracted from app.js, lines ~268–452)
// ─────────────────────────────────────────────────────────────────────────
function romanToAjami(text) {
  if (!text) { return ""; }

  var LOANWORD = {
    "settings": "settings", "browser": "browser", "progress": "progress",
    "offline": "offline", "online": "online", "audio": "audio",
    "download": "download", "app": "app", "wifi": "WiFi",
    "cache": "cache", "reset": "reset", "quiz": "quiz"
  };

  var MULTI = {
    "sh": "ش",
    "ts": "\u069F",  // ڟ
    "ng": "ڭ",
    "kh": "خ"
  };
  var SINGLE = {
    "b": "ب", "t": "ت", "j": "ج", "h": "ه",
    "d": "د", "r": "ر", "z": "ز", "s": "س",
    "f": "ف", "k": "ك", "g": "\u063A", "l": "ل",
    "m": "م", "n": "ن", "w": "و", "y": "ي",
    "p": "پ",
    "\u0253": "\u067B",  // ɓ → ٻ
    "\u0257": "\u0688",  // ɗ → ڈ
    "\u0199": "\u06AA"   // ƙ → ڪ
  };
  var VOWEL = {
    "a": "\u064E",  // fatha
    "i": "\u0650",  // kasra
    "u": "\u064F",  // damma
    "e": "\u0650",
    "o": "\u064F"
  };
  var ALEF = "ا";

  function _translitSegment(seg) {
    var result = "";
    var i = 0;
    var atWordStart = true;

    while (i < seg.length) {
      if (seg[i] === "{") {
        var close = seg.indexOf("}", i);
        if (close !== -1) {
          result += seg.slice(i, close + 1);
          i = close + 1;
          atWordStart = false;
          continue;
        }
      }

      var ch = seg[i];
      var lc = ch.toLowerCase();
      if (ch === " " || ch === "\n" || ch === "\r" || ch === "\t") {
        result += ch;
        atWordStart = true;
        i += 1;
        continue;
      }

      if (ch === "?") { result += "\u061F"; atWordStart = true; i += 1; continue; }
      if (ch === "!") { result += "!"; atWordStart = true; i += 1; continue; }
      if (ch === ".") { result += "."; atWordStart = true; i += 1; continue; }
      if (ch === ",") { result += "\u060C"; i += 1; continue; }

      if (ch >= "0" && ch <= "9") { result += ch; atWordStart = false; i += 1; continue; }

      if (ch === "'" || ch === "\u2019" || ch === "\u02BC") {
        result += "\u0639"; atWordStart = false; i += 1; continue;
      }

      if (lc === "x") {
        result += "\u0643\u0633"; atWordStart = false; i += 1; continue;
      }

      if (lc === "c") {
        var cNext = (seg[i + 1] || "").toLowerCase();
        if (cNext === "i" || cNext === "e" || cNext === "y") {
          result += "\u0686";
        } else {
          result += "\u0643";
        }
        atWordStart = false; i += 1; continue;
      }

      var two = seg.slice(i, i + 2).toLowerCase();
      if (MULTI[two]) {
        result += MULTI[two];
        atWordStart = false;
        i += 2;
        continue;
      }

      if (VOWEL[lc]) {
        var carrierJustAdded = false;
        if (atWordStart) { result += ALEF; carrierJustAdded = true; }
        result += VOWEL[lc];
        var nextCh = seg[i + 1] || "";
        var nextLc = nextCh.toLowerCase();
        if (lc === "a" && (nextLc === "i" || nextLc === "e")) {
          result += "\u064A"; atWordStart = false; i += 2; continue;
        }
        if (lc === "a" && (nextLc === "u" || nextLc === "o")) {
          result += "\u0648"; atWordStart = false; i += 2; continue;
        }
        if (lc === "a" && nextLc === "a") { result += ALEF; atWordStart = false; i += 2; continue; }
        if (lc === "i" && nextLc === "i") { result += "\u064A"; atWordStart = false; i += 2; continue; }
        if (lc === "u" && nextLc === "u") { result += "\u0648"; atWordStart = false; i += 2; continue; }
        var isWordEnd = (nextCh === "" || nextCh === " " || nextCh === "\n" ||
                         nextCh === "?" || nextCh === "!" || nextCh === "." ||
                         nextCh === "," || nextCh === "{");
        if (isWordEnd && !carrierJustAdded) {
          if (lc === "a") { result += ALEF; }
          else if (lc === "u" || lc === "o") { result += "\u0648"; }
          else if (lc === "i" || lc === "e") { result += "\u064A"; }
        }
        atWordStart = false;
        i += 1;
        continue;
      }

      if (SINGLE[lc] || SINGLE[ch]) {
        result += SINGLE[lc] || SINGLE[ch];
        var nextCh3 = seg[i + 1] || "";
        if (SINGLE[lc] && nextCh3.toLowerCase() === lc && nextCh3 === nextCh3.toLowerCase()) {
          result += "\u0651";
          i += 2;
        } else {
          i += 1;
        }
        atWordStart = false;
        continue;
      }

      result += ch;
      atWordStart = false;
      i += 1;
    }

    return result;
  }

  var parts = text.split(/(\s+)/);
  var result = "";
  for (var pi = 0; pi < parts.length; pi++) {
    var part = parts[pi];
    if (/^\s+$/.test(part)) { result += part; continue; }
    var match = part.match(/^(.+?)([?.!,]*)$/);
    var word = match ? match[1] : part;
    var punct = match ? match[2] : "";
    if (LOANWORD.hasOwnProperty(word.toLowerCase())) {
      result += LOANWORD[word.toLowerCase()] + (punct ? _translitSegment(punct) : "");
    } else {
      result += _translitSegment(part);
    }
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────
// MODULE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────

const VOCATIONAL_MODULES = [
  {
    id: "V01",
    titleHa: "Fahimtar Haraji da Kudin Shiga",
    summaryHa: "Karatu akan nau'ikan haraji, yadda ake lissafta, da muhimmacinsu ga kasuwanci.",
    nextId: "V02",
    gapTeaserHa: "A kasuwa, haraji bai ambaci ba – me kuwa abubuwan sauran kasuwanci wanda dole ne ka fahimta?",
    useTodayHa: "Yau, duba kudin da ka karba kasuwa, ke lissafta kuma harajin da za ka biya.",
  },
  {
    id: "V02",
    titleHa: "Inshora ga Dan Kasuwa",
    summaryHa: "Yadda ake yin inshora don kasuwanci, hanya-hanyoyi da abubuwan da za ka rufe.",
    nextId: "V03",
    gapTeaserHa: "Inshora tana karɓar harajin ita, amma wata matsala ce ta suke: kasuwanci na aikin da ba na shiga a gida – me kuke yi?",
    useTodayHa: "Yau, tunani akan inshora da kasuwancin abin da ke damunka kasuwa.",
  },
  {
    id: "V03",
    titleHa: "Kasuwancin Iyali",
    summaryHa: "Matsakala da kasuwancin iyali, yadda aka girma kasuwanci, da kud da mamaki.",
    nextId: "V04",
    gapTeaserHa: "Kasuwancin iyali yana da matsaloli ta kud – wane waje za ka nemi taimakon ta kud?",
    useTodayHa: "Yau, yi tunani akan kasuwancin iyali na ke damun gida, ko shine abin da za ka fara.",
  },
  {
    id: "V04",
    titleHa: "Talla ta Yanar-gizo",
    summaryHa: "Yadda ake yi kasuwa ta intanet, bayi, jiyya da aminci a yanar-gizo.",
    nextId: "V05",
    gapTeaserHa: "Yanar-gizo yana da karfi, amma kuma yana da haɗari – me za ka dani a aminci?",
    useTodayHa: "Yau, duba kasuwancin yanar-gizo wanda kake sani, ko ka fara samun sanin hanya.",
  },
  {
    id: "V05",
    titleHa: "Gane Zamba (419, Yaudara ta Intanet)",
    summaryHa: "Yadda aka sanar da zambar kasuwanci, yadda aka gane su, da kalewar ruwa.",
    nextId: "V06",
    gapTeaserHa: "Zamba sun dade suka kasance sakasake – amma kuma a gida ne, me za ka yi idan ba ka sani ba?",
    useTodayHa: "Yau, tunani akan wata zabu da ke damunka, ko kasuwancin da ba ka sani a gaske ba.",
  },
  {
    id: "V06",
    titleHa: "'Yancin Dan Kasa",
    summaryHa: "Yadda ya-mu sano mu azaman dan kasa, haƙƙoyi, da ainin gida.",
    nextId: "V07",
    gapTeaserHa: "'Yancin dan kasa ne gaba – amma kuma dole ne ka lissafe bayanan kasuwancin da za ka jiya tare?",
    useTodayHa: "Yau, ke tunani akan haƙƙin dan kasa da sika – me ka sani, ko me ka samu sabon ilimi?",
  },
  {
    id: "V07",
    titleHa: "Adana Bayanan Kasuwanci",
    summaryHa: "Girke, koofar, da gida-gida – yadda ake ajiyar bayanan kasuwanci.",
    nextId: "V08",
    gapTeaserHa: "Bayanan kasuwanci ne gaba – amma kuma wani mutum ko ma'aikaci zai dau da abin da ba ke gaskiya ba?",
    useTodayHa: "Yau, ka kumbura bayanan kasuwancin abin da kake yin – gida, koofar, ko kasuwa?",
  },
  {
    id: "V08",
    titleHa: "Haraji na VAT",
    summaryHa: "Me VAT ake nufin, yadda aka kirga, da yadda ake biya haraji na VAT.",
    nextId: "V09",
    gapTeaserHa: "VAT ne haraji mai sanadi – amma kasuwa ne ba dai VAT ba, me za ka yi?",
    useTodayHa: "Yau, duba kasuwancin gida, ko kasuwa, domin ka san haraji na VAT.",
  },
  {
    id: "V09",
    titleHa: "Bankin Dijital (USSD, Mobile Money)",
    summaryHa: "Yadda ake yin banki ta USSD, ta mobile money, da kud a gida.",
    nextId: "V10",
    gapTeaserHa: "Banki na dijital yana da karfi – amma wace yanda za ka zaɓi dan kudi da aminci?",
    useTodayHa: "Yau, duba mobile money ko USSD na dan banki da ka sani, ko ka ga sabon hanya.",
  },
  {
    id: "V10",
    titleHa: "Kariyar Bayanan Sirri",
    summaryHa: "Yadda ake adana bayanan sirri, kalewar ruwa, da aminci na kasuwanci.",
    nextId: null,
    gapTeaserHa: null,
    useTodayHa: "Yau, tunani akan bayanan sirri na kasuwancin abin da kake yin – me za ka adana.",
  },
];

function createVocationalModule(def) {
  const quizQuestions = [
    { templateHa: "Haraji ne me?" },
    { templateHa: "Me ake yi domin aminci a kasuwanci?" },
    { templateHa: "Bayanan kasuwanci dole ne su zama..." },
    { templateHa: "Kudi na kasuwanci dole ne..." },
    { templateHa: "Idan ka bukaci taimakon kudi..." },
  ];

  const module = {
    id: def.id,
    gradeband: "adult",
    subject: "Kasuwanci",
    subjectHa: "Kasuwanci",
    moduleNumber: parseInt(def.id.slice(1)),
    titleEn: def.titleHa,
    titleHa: def.titleHa,
    titleAjami: romanToAjami(def.titleHa),
    ajami_validated: false,
    textExplanationHa: def.summaryHa,
    textExplanationAjami: null,
    audioScript: null,
    audioFile: null,
    imageCard: null,
    microPauses: [],
    keywords: [],
    quizQuestions: quizQuestions.map((q, i) => ({
      templateHa: q.templateHa,
      answerFormula: `"Option ${i + 1}"`,
      variableRanges: { a: { min: 0, max: 0 }, b: { min: 0, max: 0 } },
      distractorFormulas: [`"Option ${(i + 2) % 4}"`, `"Option ${(i + 3) % 4}"`, `"Option ${(i + 4) % 4}"`],
    })),
    track: "vocational",
    targetAudience: "adult",
    gapTeaser: def.nextId ? {
      ha: def.gapTeaserHa,
      ajami: romanToAjami(def.gapTeaserHa),
    } : null,
    chainNext: def.nextId || null,
    isChainLeaf: def.nextId === null,
    useTodayPrompt: {
      ha: def.useTodayHa,
      ajami: romanToAjami(def.useTodayHa),
    },
  };

  return module;
}

function main() {
  let raw;
  try {
    raw = readFileSync(contentPath, 'utf8');
  } catch (err) {
    console.error(`Error reading ${contentPath}: ${err.message}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`Error parsing ${contentPath}: ${err.message}`);
    process.exit(1);
  }

  // Append 10 vocational modules
  const newModules = VOCATIONAL_MODULES.map(createVocationalModule);
  data.modules.push(...newModules);

  // Verify chain integrity
  const ids = new Set(data.modules.map(m => m && m.id).filter(Boolean));
  let chainErrors = [];

  for (const m of newModules) {
    if (m.chainNext && !ids.has(m.chainNext)) {
      chainErrors.push(`${m.id}: chainNext "${m.chainNext}" does not match any module id.`);
    }
  }

  if (chainErrors.length > 0) {
    console.error("Chain integrity errors:");
    chainErrors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(JSON.stringify(data, null, 2));
}

main();
