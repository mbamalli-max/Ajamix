import {
  APOSTROPHE_CODE_POINTS,
  formatCodePoints,
  tokenize,
} from "./tokenizer.mjs";

export const APOSTROPHE_CATEGORIES = Object.freeze({
  GLOTTALIZED_Y: "GLOTTALIZED_Y",
  PAIRED_QUOTATION: "PAIRED_QUOTATION",
  GLOTTAL_BOUNDARY: "GLOTTAL_BOUNDARY",
  MORPHEME_BOUNDARY: "MORPHEME_BOUNDARY",
  TYPOGRAPHIC_PUNCTUATION: "TYPOGRAPHIC_PUNCTUATION",
  AMBIGUOUS: "AMBIGUOUS",
});

const APOSTROPHE_SET = new Set(APOSTROPHE_CODE_POINTS);
const VOWELS = new Set(["a", "e", "i", "o", "u"]);
const KNOWN_GLOTTAL_WORDS = new Set([
  "murabba\u0027i",
  "jami\u0027a",
  "sa\u0027a",
  "ma\u0027ana",
]);
const KNOWN_MORPHEME_WORDS = new Set([
  "\u0257an\u0027uwa",
  "\u01b4ar\u0027uwa",
]);

function codePointBefore(text, sourceIndex) {
  return Array.from(text.slice(0, sourceIndex)).at(-1) ?? "";
}

function codePointAfter(text, sourceIndex, sourceSubstring) {
  return Array.from(text.slice(sourceIndex + sourceSubstring.length))[0] ?? "";
}

function isWordCharacter(character) {
  return Boolean(character && /^[\p{L}\p{M}\p{N}]$/u.test(character));
}

function isOpeningBoundary(character) {
  return (
    !character ||
    /^\s$/u.test(character) ||
    /^[\p{Ps}\p{Pi}]$/u.test(character) ||
    /^[\u0028\u005B\u007B\u00AB\u201C\u201E\u2014\u2013:;]$/u.test(character)
  );
}

function isClosingBoundary(character) {
  return (
    !character ||
    /^\s$/u.test(character) ||
    /^[\p{Pe}\p{Pf}.!?,:;]$/u.test(character) ||
    /^[\u0029\u005D\u007D\u00BB\u201D\u2014\u2013]$/u.test(character)
  );
}

function normalizeApostrophes(value) {
  return Array.from(String(value ?? ""), (character) =>
    APOSTROPHE_SET.has(character.codePointAt(0)) ? "\u0027" : character
  ).join("").normalize("NFC").toLocaleLowerCase("ha");
}

function wordAt(text, sourceIndex) {
  const entries = [];
  let offset = 0;
  for (const character of Array.from(text)) {
    entries.push({ character, start: offset, end: offset + character.length });
    offset += character.length;
  }

  let target = entries.findIndex(
    (entry) => sourceIndex >= entry.start && sourceIndex < entry.end
  );
  if (target < 0) {
    return { source: "", normalized: "", start: sourceIndex, end: sourceIndex };
  }

  const belongsToWord = (character) =>
    isWordCharacter(character) || APOSTROPHE_SET.has(character.codePointAt(0));

  let start = target;
  let end = target;
  while (start > 0 && belongsToWord(entries[start - 1].character)) {
    start -= 1;
  }
  while (end + 1 < entries.length && belongsToWord(entries[end + 1].character)) {
    end += 1;
  }

  const source = entries.slice(start, end + 1).map((entry) => entry.character).join("");
  return {
    source,
    normalized: normalizeApostrophes(source),
    start: entries[start].start,
    end: entries[end].end,
  };
}

function contextWindow(text, sourceIndex, sourceLength, radius = 24) {
  const before = Array.from(text.slice(0, sourceIndex)).slice(-radius).join("");
  const after = Array.from(text.slice(sourceIndex + sourceLength)).slice(0, radius).join("");
  return `${before}${text.slice(sourceIndex, sourceIndex + sourceLength)}${after}`;
}

function baseOccurrence(text, token, occurrenceIndex) {
  const apostrophe = Array.from(token.sourceSubstring)[0];
  const previous = codePointBefore(text, token.sourceStart);
  const next = codePointAfter(text, token.sourceStart, apostrophe);
  const word = wordAt(text, token.sourceStart);
  return {
    occurrenceIndex,
    sourceIndex: token.sourceStart,
    sourceSubstring: apostrophe,
    normalizedApostrophe: "\u0027",
    apostropheCodePoint: formatCodePoints(apostrophe)[0],
    previousCharacter: previous,
    previousCodePoints: formatCodePoints(previous),
    nextCharacter: next,
    nextCodePoints: formatCodePoints(next),
    word: word.source,
    normalizedWord: word.normalized,
    context: contextWindow(text, token.sourceStart, apostrophe.length),
    category: null,
    confidence: 0,
    confidenceLabel: "low",
    reason: "",
    pairedPunctuationDetectable: false,
    quotationRole: null,
    quotationPairId: null,
    autoResolved: false,
    reviewRequired: true,
    outputToken: null,
    outputCodePoint: null,
  };
}

function confidenceLabel(confidence) {
  if (confidence >= 0.9) {
    return "high";
  }
  if (confidence >= 0.6) {
    return "medium";
  }
  return "low";
}

function assign(occurrence, category, confidence, reason, extra = {}) {
  Object.assign(occurrence, {
    category,
    confidence,
    confidenceLabel: confidenceLabel(confidence),
    reason,
    ...extra,
  });
}

function pairQuotationCandidates(occurrences) {
  const stack = [];
  let pairCounter = 0;

  for (const occurrence of occurrences) {
    if (occurrence.category === APOSTROPHE_CATEGORIES.GLOTTALIZED_Y) {
      continue;
    }

    const openingCandidate =
      isOpeningBoundary(occurrence.previousCharacter) &&
      isWordCharacter(occurrence.nextCharacter);
    const closingCandidate =
      isWordCharacter(occurrence.previousCharacter) &&
      isClosingBoundary(occurrence.nextCharacter);

    occurrence.openingQuotationCandidate = openingCandidate;
    occurrence.closingQuotationCandidate = closingCandidate;

    if (closingCandidate && stack.length) {
      const opening = stack.pop();
      pairCounter += 1;
      const pairId = `quotation-${pairCounter}`;
      assign(
        opening,
        APOSTROPHE_CATEGORIES.PAIRED_QUOTATION,
        0.98,
        "Balanced quotation opener found by boundary-aware stack",
        {
          pairedPunctuationDetectable: true,
          quotationRole: "opening",
          quotationPairId: pairId,
        }
      );
      assign(
        occurrence,
        APOSTROPHE_CATEGORIES.PAIRED_QUOTATION,
        0.98,
        "Balanced quotation closer found by boundary-aware stack",
        {
          pairedPunctuationDetectable: true,
          quotationRole: "closing",
          quotationPairId: pairId,
        }
      );
      continue;
    }

    if (openingCandidate) {
      stack.push(occurrence);
    }
  }
}

function classifyUnpaired(occurrence) {
  if (occurrence.category) {
    return;
  }

  const word = occurrence.normalizedWord;
  const previous = occurrence.previousCharacter.toLocaleLowerCase("ha");
  const next = occurrence.nextCharacter.toLocaleLowerCase("ha");

  if (KNOWN_MORPHEME_WORDS.has(word)) {
    assign(
      occurrence,
      APOSTROPHE_CATEGORIES.MORPHEME_BOUNDARY,
      0.95,
      "Exact morpheme-boundary example listed in the normative standard"
    );
    return;
  }

  if (KNOWN_GLOTTAL_WORDS.has(word)) {
    assign(
      occurrence,
      APOSTROPHE_CATEGORIES.GLOTTAL_BOUNDARY,
      0.95,
      "Exact glottal-boundary example listed in the normative standard"
    );
    return;
  }

  if (isWordCharacter(previous) && isWordCharacter(next)) {
    if (VOWELS.has(previous) && VOWELS.has(next)) {
      assign(
        occurrence,
        APOSTROPHE_CATEGORIES.GLOTTAL_BOUNDARY,
        0.75,
        "Intra-word apostrophe occurs between two Boko vowels; inferred only and queued"
      );
    } else {
      assign(
        occurrence,
        APOSTROPHE_CATEGORIES.AMBIGUOUS,
        0.25,
        "Intra-word apostrophe is not covered by a settled rule or normative example"
      );
    }
    return;
  }

  if (occurrence.openingQuotationCandidate || occurrence.closingQuotationCandidate) {
    assign(
      occurrence,
      APOSTROPHE_CATEGORIES.TYPOGRAPHIC_PUNCTUATION,
      0.7,
      "Quote-like boundary context is present, but no balanced pair was found"
    );
    return;
  }

  assign(
    occurrence,
    APOSTROPHE_CATEGORIES.AMBIGUOUS,
    0.2,
    "No settled phonological, morphological, or balanced-punctuation rule applies"
  );
}

/**
 * Classifies every supported apostrophe occurrence without generating Ajami.
 *
 * Only apostrophe+y is auto-resolved. Every other occurrence, including high
 * confidence paired quotation, remains in reviewQueue with null output.
 */
export function classifyApostrophes(input) {
  const text = String(input ?? "");
  const tokenized = tokenize(text);
  const occurrences = [];

  for (const token of tokenized.tokens) {
    const isApostropheY =
      token.token === "HAUSA_GLOTTALIZED_Y" &&
      token.aliasClass === "APOSTROPHE_Y";
    const isGenericApostrophe = token.token === "APOSTROPHE_UNRESOLVED";

    if (!isApostropheY && !isGenericApostrophe) {
      continue;
    }

    const occurrence = baseOccurrence(text, token, occurrences.length);
    if (isApostropheY) {
      assign(
        occurrence,
        APOSTROPHE_CATEGORIES.GLOTTALIZED_Y,
        1,
        "Settled Nigerian Boko apostrophe+y alias",
        {
          autoResolved: true,
          reviewRequired: false,
          outputToken: "HAUSA_GLOTTALIZED_Y",
          outputCodePoint: "U+063F",
        }
      );
    }
    occurrences.push(occurrence);
  }

  pairQuotationCandidates(occurrences);
  for (const occurrence of occurrences) {
    classifyUnpaired(occurrence);
  }

  const reviewQueue = occurrences.filter((occurrence) => occurrence.reviewRequired);
  return {
    source: text,
    normalization: "NFC",
    occurrences,
    reviewQueue,
    autoResolved: occurrences.filter((occurrence) => occurrence.autoResolved),
  };
}
