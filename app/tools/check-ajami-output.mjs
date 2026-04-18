#!/usr/bin/env node

import { appendFileSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const contentPath = resolve(here, "..", "content.json");
const notesPath = resolve(here, "..", "content-review-notes.md");
const VOCATIONAL_IDS = ["V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09", "V10"];

function romanToAjami(text) {
  if (!text) { return ""; }

  const LOANWORD = {
    settings: "settings", browser: "browser", progress: "progress",
    offline: "offline", online: "online", audio: "audio",
    download: "download", app: "app", wifi: "WiFi",
    cache: "cache", reset: "reset", quiz: "quiz",
  };

  const MULTI = {
    sh: "ش",
    ts: "\u069F",
    ng: "ڭ",
    kh: "خ",
  };

  const SINGLE = {
    b: "ب", t: "ت", j: "ج", h: "ه",
    d: "د", r: "ر", z: "ز", s: "س",
    f: "ف", k: "ك", g: "\u063A", l: "ل",
    m: "م", n: "ن", w: "و", y: "ي",
    p: "پ",
    "\u0253": "\u067B",
    "\u0257": "\u0688",
    "\u0199": "\u06AA",
  };

  const VOWEL = {
    a: "\u064E",
    i: "\u0650",
    u: "\u064F",
    e: "\u0650",
    o: "\u064F",
  };

  const ALEF = "ا";

  function translitSegment(segment) {
    let result = "";
    let index = 0;
    let atWordStart = true;

    while (index < segment.length) {
      if (segment[index] === "{") {
        const close = segment.indexOf("}", index);
        if (close !== -1) {
          result += segment.slice(index, close + 1);
          index = close + 1;
          atWordStart = false;
          continue;
        }
      }

      const character = segment[index];
      const lower = character.toLowerCase();

      if (character === " " || character === "\n" || character === "\r" || character === "\t") {
        result += character;
        atWordStart = true;
        index += 1;
        continue;
      }

      if (character === "?") { result += "\u061F"; atWordStart = true; index += 1; continue; }
      if (character === "!") { result += "!"; atWordStart = true; index += 1; continue; }
      if (character === ".") { result += "."; atWordStart = true; index += 1; continue; }
      if (character === ",") { result += "\u060C"; index += 1; continue; }

      if (character >= "0" && character <= "9") {
        result += character;
        atWordStart = false;
        index += 1;
        continue;
      }

      if (character === "'" || character === "\u2019" || character === "\u02BC") {
        result += "\u0639";
        atWordStart = false;
        index += 1;
        continue;
      }

      if (lower === "x") {
        result += "\u0643\u0633";
        atWordStart = false;
        index += 1;
        continue;
      }

      if (lower === "c") {
        const next = (segment[index + 1] || "").toLowerCase();
        result += next === "i" || next === "e" || next === "y" ? "\u0686" : "\u0643";
        atWordStart = false;
        index += 1;
        continue;
      }

      const pair = segment.slice(index, index + 2).toLowerCase();
      if (MULTI[pair]) {
        result += MULTI[pair];
        atWordStart = false;
        index += 2;
        continue;
      }

      if (VOWEL[lower]) {
        let carrierJustAdded = false;
        if (atWordStart) {
          result += ALEF;
          carrierJustAdded = true;
        }
        result += VOWEL[lower];

        const nextCharacter = segment[index + 1] || "";
        const nextLower = nextCharacter.toLowerCase();
        if (lower === "a" && (nextLower === "i" || nextLower === "e")) {
          result += "\u064A";
          atWordStart = false;
          index += 2;
          continue;
        }
        if (lower === "a" && (nextLower === "u" || nextLower === "o")) {
          result += "\u0648";
          atWordStart = false;
          index += 2;
          continue;
        }
        if (lower === "a" && nextLower === "a") {
          result += ALEF;
          atWordStart = false;
          index += 2;
          continue;
        }
        if (lower === "i" && nextLower === "i") {
          result += "\u064A";
          atWordStart = false;
          index += 2;
          continue;
        }
        if (lower === "u" && nextLower === "u") {
          result += "\u0648";
          atWordStart = false;
          index += 2;
          continue;
        }

        const isWordEnd = (
          nextCharacter === "" ||
          nextCharacter === " " ||
          nextCharacter === "\n" ||
          nextCharacter === "?" ||
          nextCharacter === "!" ||
          nextCharacter === "." ||
          nextCharacter === "," ||
          nextCharacter === "{"
        );

        if (isWordEnd && !carrierJustAdded) {
          if (lower === "a") { result += ALEF; }
          else if (lower === "u" || lower === "o") { result += "\u0648"; }
          else if (lower === "i" || lower === "e") { result += "\u064A"; }
        }

        atWordStart = false;
        index += 1;
        continue;
      }

      if (SINGLE[lower] || SINGLE[character]) {
        result += SINGLE[lower] || SINGLE[character];
        const nextCharacter = segment[index + 1] || "";
        if (SINGLE[lower] && nextCharacter.toLowerCase() === lower && nextCharacter === nextCharacter.toLowerCase()) {
          result += "\u0651";
          index += 2;
        } else {
          index += 1;
        }
        atWordStart = false;
        continue;
      }

      result += character;
      atWordStart = false;
      index += 1;
    }

    return result;
  }

  return text
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part)) {
        return part;
      }
      const match = part.match(/^(.+?)([?.!,]*)$/);
      const word = match ? match[1] : part;
      if (Object.prototype.hasOwnProperty.call(LOANWORD, word.toLowerCase())) {
        return LOANWORD[word.toLowerCase()];
      }
      return translitSegment(part);
    })
    .join("");
}

function loadVocationalModules() {
  const raw = readFileSync(contentPath, "utf8");
  const data = JSON.parse(raw);
  return data.modules
    .filter((module) => VOCATIONAL_IDS.includes(module.id))
    .sort((left, right) => left.id.localeCompare(right.id));
}

function appendNotes(flags) {
  const timestamp = new Date().toISOString();
  const lines = [
    "",
    `## Automated Ajami QA — ${timestamp}`,
  ];

  if (!flags.length) {
    lines.push("- No `?` or empty-output flags were found for V01–V10 title, summary, gap teaser, or use-today prompt fields.");
  } else {
    lines.push("| Module | Field | Latin | Ajami | Issue |");
    lines.push("|---|---|---|---|---|");
    flags.forEach((flag) => {
      lines.push(
        `| ${flag.id} | ${flag.field} | ${flag.input.replace(/\|/g, "\\|")} | ${flag.output.replace(/\|/g, "\\|")} | ${flag.issue} |`
      );
    });
  }

  try {
    appendFileSync(notesPath, lines.join("\n") + "\n", "utf8");
    return true;
  } catch (error) {
    console.warn(`Could not append Ajami QA notes to ${notesPath}: ${error.message}`);
    return false;
  }
}

function main() {
  const modules = loadVocationalModules();
  const fields = [
    { name: "titleHa", getInput: (module) => String(module.titleHa || "") },
    { name: "summary.ha", getInput: (module) => String(module.summary?.ha || "") },
    { name: "gapTeaser.ha", getInput: (module) => String(module.gapTeaser?.ha || "") },
    { name: "useTodayPrompt.ha", getInput: (module) => String(module.useTodayPrompt?.ha || "") },
  ];
  const flags = [];

  modules.forEach((module) => {
    console.log(`\n[${module.id}]`);
    fields.forEach((field) => {
      const input = field.getInput(module).trim();
      const output = romanToAjami(input);
      console.log(`${field.name}:`);
      console.log(`  latin: ${input}`);
      console.log(`  ajami: ${output}`);
      if (input && !output) {
        flags.push({ id: module.id, field: field.name, input, output, issue: "empty output" });
      } else if (output.includes("?")) {
        flags.push({ id: module.id, field: field.name, input, output, issue: "literal question mark remained" });
      }
      if (field.name === "titleHa") {
        console.log(`  title-output: ${module.id} => ${output}`);
      }
    });
  });

  const wroteNotes = appendNotes(flags);
  console.log(
    `\nAjami QA complete. Flags: ${flags.length}. ` +
    (wroteNotes ? `Notes appended to ${notesPath}` : "Notes were not appended in this environment.")
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}

export { romanToAjami };
