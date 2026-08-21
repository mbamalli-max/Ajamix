import { APOSTROPHE_CODE_POINTS, formatCodePoints, tokenize } from "./tokenizer.mjs";
import { normalizeBoko } from "./lexicon/schema.mjs";

const PRESENTATION_FORM_RE = /[\uFB50-\uFEFF]/u;
const BIDI_CONTROL_RE = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/u;
const LATIN_SCRIPT_RE = /\p{Script=Latin}/u;
const LETTER_RE = /\p{L}/u;
const WORD_UNIT_RE = /^[\p{L}\p{M}\p{N}]+$/u;

function isApostrophe(value) {
  const codePoints = Array.from(value, (character) => character.codePointAt(0));
  return codePoints.length === 1 && APOSTROPHE_CODE_POINTS.includes(codePoints[0]);
}

function isWordUnit(token) {
  // The tokenizer deliberately folds apostrophe+y into one PHONEME token, so
  // token type must participate here; testing only the raw substring would
  // misclassify the Latin y as punctuation and leak it into Ajami output.
  return ["PHONEME", "VOWEL", "UNKNOWN"].includes(token.type) ||
    WORD_UNIT_RE.test(token.normalized) ||
    isApostrophe(token.normalized);
}

/**
 * Group the pipeline tokenizer's grapheme tokens into lexicon lookup spans.
 * Apostrophe variants remain word-internal and alphanumeric grade codes remain
 * one uncovered unit; punctuation, symbols, spacing, and standalone numbers
 * are preserved exactly.
 */
export function compositionSegments(bokoString) {
  const source = String(bokoString ?? "");
  const tokens = tokenize(source).tokens;
  const segments = [];

  for (let index = 0; index < tokens.length;) {
    const first = tokens[index];
    if (!isWordUnit(first)) {
      segments.push({
        source: source.slice(first.sourceStart, first.sourceEnd),
        start: first.sourceStart,
        end: first.sourceEnd,
        isWord: false,
      });
      index += 1;
      continue;
    }

    let endIndex = index + 1;
    while (
      endIndex < tokens.length &&
      isWordUnit(tokens[endIndex]) &&
      tokens[endIndex - 1].sourceEnd === tokens[endIndex].sourceStart
    ) {
      endIndex += 1;
    }
    const start = first.sourceStart;
    const end = tokens[endIndex - 1].sourceEnd;
    const value = source.slice(start, end);
    segments.push({ source: value, start, end, isWord: LETTER_RE.test(value) });
    index = endIndex;
  }

  return segments;
}

function codePointsFromDecision(decision) {
  return (String(decision).match(/U\+[0-9A-F]{4,6}/gu) ?? []).map((value) =>
    String.fromCodePoint(Number.parseInt(value.slice(2), 16))
  ).join("");
}

function replaceSuffix(value, oldSuffix, newSuffix) {
  if (!oldSuffix || !value.endsWith(oldSuffix)) return null;
  return `${value.slice(0, -oldSuffix.length)}${newSuffix}`;
}

function contextSpelling(entry, previousWord) {
  const key = normalizeBoko(entry.boko);
  const rule = entry.contextRule;
  if (!rule) return entry.ajami;

  if (key === "ko") {
    // The stored spelling is Muhammad's exact reviewer-supplied lexical
    // exception. It must pass through verbatim, never be reconstructed.
    return rule.exceptions?.length === 0 && /lexical exception/iu.test(rule.default)
      ? entry.ajami
      : null;
  }

  const defaultSuffix = codePointsFromDecision(rule.default);
  if (!defaultSuffix) return null;

  let decision = rule.default;
  if (key === "da") {
    // Content Boko contains no macron-marked dā token. A plain "da" is always
    // the ratified default; the dā branch is deliberately not inferred.
    decision = rule.default;
  } else if (key === "ka") {
    if (previousWord === "idan") {
      const exception = rule.exceptions?.find((item) => /preceded by.*idan/iu.test(item.match));
      if (!exception) return null;
      decision = exception.decision;
    }
  } else if (key === "ya") {
    if (["da", "wanda", "me", "ba"].includes(previousWord)) {
      const exception = rule.exceptions?.find((item) => {
        const match = String(item.match).toLocaleLowerCase("ha");
        return match.includes(`\"${previousWord}\"`);
      });
      if (!exception) return null;
      decision = exception.decision;
    }
  } else {
    return null;
  }

  const selectedSuffix = codePointsFromDecision(decision);
  if (!selectedSuffix) return null;
  return replaceSuffix(entry.ajami, defaultSuffix, selectedSuffix);
}

function assertCleanAjami(value) {
  if (PRESENTATION_FORM_RE.test(value)) {
    throw new Error(`Composed Ajami contains an Arabic presentation form: ${formatCodePoints(value).join(" ")}`);
  }
  if (BIDI_CONTROL_RE.test(value)) {
    throw new Error("Composed Ajami contains a bidi control character");
  }
  if (LATIN_SCRIPT_RE.test(value)) {
    throw new Error("Composed Ajami contains a Latin-script character");
  }
}

export function analyzeAjamiComposition(bokoString, lexiconMap) {
  if (!(lexiconMap instanceof Map)) throw new TypeError("lexiconMap must be a Map");
  const segments = compositionSegments(bokoString);
  const uncoveredWords = [];
  const output = [];
  let previousWord = null;

  for (const segment of segments) {
    if (!segment.isWord) {
      output.push(segment.source);
      continue;
    }

    const key = normalizeBoko(segment.source);
    const entry = lexiconMap.get(key);
    if (!entry) {
      uncoveredWords.push(key);
      previousWord = key;
      continue;
    }

    const spelling = contextSpelling(entry, previousWord);
    if (spelling == null) {
      uncoveredWords.push(key);
    } else {
      assertCleanAjami(spelling);
      output.push(spelling);
    }
    previousWord = key;
  }

  if (uncoveredWords.length) {
    return { ajami: null, uncoveredWords };
  }
  const ajami = output.join("");
  assertCleanAjami(ajami);
  return { ajami, uncoveredWords: [] };
}

export function composeAjami(bokoString, lexiconMap) {
  return analyzeAjamiComposition(bokoString, lexiconMap).ajami;
}
