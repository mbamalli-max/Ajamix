import assert from "node:assert/strict";
import test from "node:test";

import { buildMergedLexicon } from "./build-merged-lexicon.mjs";
import { analyzeAjamiComposition, composeAjami } from "./compose-ajami.mjs";

const { map } = buildMergedLexicon();
const spelling = (word) => map.get(word).ajami;

test("composer uses known lexicon entries and preserves punctuation and spacing", () => {
  assert.equal(composeAjami("Kirgawa,  lissafi!", map), `${spelling("kirgawa")},  ${spelling("lissafi")}!`);
});

test("composer treats an apostrophe word as one lexicon lookup", () => {
  assert.equal(composeAjami("Murabba'i", map), spelling("murabba'i"));
  assert.equal(composeAjami("'Ya'ya", map), spelling("'ya'ya"));
  assert.equal(composeAjami("’Yancin", map), spelling("’yancin"));
});

test("composer passes Latin digits through unchanged", () => {
  assert.equal(composeAjami("Kirgawa 1–5", map), `${spelling("kirgawa")} 1–5`);
});

test("composer applies both reachable ka context branches", () => {
  assert.equal(composeAjami("Ka", map), spelling("ka"));
  assert.equal(composeAjami("Idan ka", map), `${spelling("idan")} کَا`);
});

test("composer applies both ya context branches", () => {
  assert.equal(composeAjami("Ya", map), spelling("ya"));
  assert.equal(composeAjami("Da ya", map), `${spelling("da")} یَ`);
  assert.equal(composeAjami("Wanda ya", map), `${spelling("wanda")} یَ`);
  assert.equal(composeAjami("Me ya", map), `${spelling("me")} یَ`);
  assert.equal(composeAjami("Ba ya", map), `${spelling("ba")} یَ`);
});

test("composer applies plain da default and ko's supplied lexical exception verbatim", () => {
  assert.equal(composeAjami("Da", map), spelling("da"));
  assert.equal(composeAjami("Ko", map), spelling("ko"));
  assert.deepEqual(Array.from(composeAjami("Ko", map), (character) => character.codePointAt(0)), [
    0x06a9, 0x064f, 0x0648,
  ]);
});

test("composer returns null for a string with any uncovered alphabetic word", () => {
  assert.equal(composeAjami("Kirgawa uncovered", map), null);
  assert.deepEqual(analyzeAjamiComposition("Kirgawa uncovered", map).uncoveredWords, ["uncovered"]);
});

test("composer rejects presentation forms in lexicon output", () => {
  const brokenMap = new Map([["karya", { boko: "karya", ajami: "\uFEDB" }]]);
  assert.throws(() => composeAjami("karya", brokenMap), /presentation form/iu);
});

test("composer rejects any Latin-script leakage from a malformed lexicon entry", () => {
  const brokenMap = new Map([["karya", { boko: "karya", ajami: "Vَت" }]]);
  assert.throws(() => composeAjami("karya", brokenMap), /Latin-script/iu);
});
