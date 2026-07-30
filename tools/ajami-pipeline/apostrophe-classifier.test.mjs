import test from "node:test";
import assert from "node:assert/strict";

import {
  APOSTROPHE_CATEGORIES,
  classifyApostrophes,
} from "./apostrophe-classifier.mjs";

test("only the settled apostrophe+y rule auto-resolves", () => {
  for (const apostrophe of ["\u0027", "\u2019", "\u02BC"]) {
    const result = classifyApostrophes(`${apostrophe}Yanci`);
    assert.equal(result.occurrences.length, 1);
    assert.equal(result.occurrences[0].category, APOSTROPHE_CATEGORIES.GLOTTALIZED_Y);
    assert.equal(result.occurrences[0].outputToken, "HAUSA_GLOTTALIZED_Y");
    assert.equal(result.occurrences[0].outputCodePoint, "U+063F");
    assert.equal(result.occurrences[0].autoResolved, true);
    assert.equal(result.reviewQueue.length, 0);
  }
});

test("balanced quotations are stack-paired and still queued", () => {
  const result = classifyApostrophes("Ka ce \u0027\u0257aya\u0027, sannan \u0027babba da \u0027\u0199arami\u0027 yanzu\u0027.");
  const paired = result.occurrences.filter(
    (occurrence) => occurrence.category === APOSTROPHE_CATEGORIES.PAIRED_QUOTATION
  );
  assert.equal(paired.length, 6);
  assert.equal(new Set(paired.map((occurrence) => occurrence.quotationPairId)).size, 3);
  assert.ok(paired.every((occurrence) => occurrence.pairedPunctuationDetectable));
  assert.ok(paired.every((occurrence) => occurrence.reviewRequired));
});

test("normative glottal and morpheme examples are inferred but never emitted", () => {
  const glottal = classifyApostrophes("murabba\u0027i").occurrences[0];
  const morpheme = classifyApostrophes("\u0257an\u0027uwa").occurrences[0];
  assert.equal(glottal.category, APOSTROPHE_CATEGORIES.GLOTTAL_BOUNDARY);
  assert.equal(morpheme.category, APOSTROPHE_CATEGORIES.MORPHEME_BOUNDARY);
  for (const occurrence of [glottal, morpheme]) {
    assert.equal(occurrence.reviewRequired, true);
    assert.equal(occurrence.autoResolved, false);
    assert.equal(occurrence.outputToken, null);
    assert.equal(occurrence.outputCodePoint, null);
  }
});

test("unmatched typographic punctuation and unclear contractions remain queued", () => {
  const unmatched = classifyApostrophes("\u0027karya").occurrences[0];
  const ambiguous = classifyApostrophes("al\u0027umma").occurrences[0];
  assert.equal(unmatched.category, APOSTROPHE_CATEGORIES.TYPOGRAPHIC_PUNCTUATION);
  assert.equal(ambiguous.category, APOSTROPHE_CATEGORIES.AMBIGUOUS);
  assert.equal(unmatched.pairedPunctuationDetectable, false);
  assert.equal(ambiguous.pairedPunctuationDetectable, false);
  assert.equal(classifyApostrophes("\u0027karya al\u0027umma").reviewQueue.length, 2);
});

test("every unresolved apostrophe is queued and never assigned an Ajami character", () => {
  const result = classifyApostrophes(
    "Ka ce \u0027\u0257aya\u0027; murabba\u0027i, \u0257an\u0027uwa, al\u0027umma, da \u0027karya"
  );
  assert.equal(result.reviewQueue.length, result.occurrences.length);
  assert.ok(result.reviewQueue.every((occurrence) => occurrence.outputToken === null));
  assert.ok(result.reviewQueue.every((occurrence) => occurrence.outputCodePoint === null));
});
