import { CANONICAL_MAPPING } from "./mapping.mjs";

const NFC = "NFC";

export const APOSTROPHE_CODE_POINTS = Object.freeze([
  0x0027,
  0x2019,
  0x02bc,
]);

function sequenceKey(codePoints) {
  return codePoints.map((value) => value.toString(16).toUpperCase().padStart(4, "0")).join(" ");
}

function codePointsOf(value) {
  return Array.from(value, (character) => character.codePointAt(0));
}

export function formatCodePoints(value) {
  return codePointsOf(value).map((codePoint) => `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`);
}

function rule(token, type, codePoints, metadata = {}) {
  return Object.freeze({
    token,
    type,
    codePoints: Object.freeze(codePoints),
    key: sequenceKey(codePoints),
    ...metadata,
  });
}

const REQUIRED_SEQUENCE_ORDER = new Map([
  ["0027 0079", 0],
  ["2019 0079", 0],
  ["02BC 0079", 0],
  ["0199 0077", 1],
  ["0199 0079", 2],
  ["0067 0077", 3],
  ["0067 0079", 4],
  ["006B 0077", 5],
  ["006B 0079", 6],
  ["0073 0068", 7],
  ["0074 0073", 8],
  ["0253", 9],
  ["0257", 10],
  ["0199", 11],
  ["01B4", 12],
]);

function mappingRules() {
  const entries = [
    ...CANONICAL_MAPPING.canonicalConsonants.filter(
      (entry) => entry.token !== "H_NATIVE_HAUSA" && entry.token !== "H_ARABIC_LEXICAL"
    ),
    ...CANONICAL_MAPPING.provisionalVelarClusters,
  ];
  const seen = new Set();
  const derivedRules = [];

  for (const entry of entries) {
    for (const alias of entry.boko) {
      const folded = alias.normalize(NFC).toLocaleLowerCase("ha");
      const codePoints = codePointsOf(folded);
      const key = `${entry.token}:${sequenceKey(codePoints)}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      const isApostropheY =
        entry.token === "HAUSA_GLOTTALIZED_Y" &&
        APOSTROPHE_CODE_POINTS.includes(codePoints[0]);
      derivedRules.push(
        rule(entry.token, "PHONEME", codePoints, {
          settled: entry.status !== "provisional",
          provisional: entry.status === "provisional",
          aliasClass: isApostropheY
            ? "APOSTROPHE_Y"
            : entry.token === "HAUSA_GLOTTALIZED_Y"
              ? "LATIN_HOOK_Y"
              : null,
        })
      );
    }
  }

  return derivedRules.sort((left, right) => {
    const leftPriority = REQUIRED_SEQUENCE_ORDER.get(left.key) ?? 100;
    const rightPriority = REQUIRED_SEQUENCE_ORDER.get(right.key) ?? 100;
    return (
      leftPriority - rightPriority ||
      right.codePoints.length - left.codePoints.length ||
      left.key.localeCompare(right.key)
    );
  });
}

// Derived from canonical-mapping.json, with an explicit abstract-unit priority.
// Rules remain code-point sequences so visually similar apostrophes cannot collapse.
export const LONGEST_MATCH_RULES = Object.freeze(mappingRules());

const VOWEL_TOKENS = new Map([
  ["a", "VOWEL_A_UNLENGTHENED"],
  ["i", "VOWEL_I_UNLENGTHENED"],
  ["u", "VOWEL_U_UNLENGTHENED"],
  ["e", "VOWEL_E_UNLENGTHENED"],
  ["o", "VOWEL_O_UNLENGTHENED"],
]);

function segmentInput(input) {
  const source = String(input ?? "");
  const segmenter = new Intl.Segmenter("ha", { granularity: "grapheme" });
  return Array.from(segmenter.segment(source), (part) => ({
    source: part.segment,
    normalized: part.segment.normalize(NFC),
    sourceStart: part.index,
    sourceEnd: part.index + part.segment.length,
  }));
}

function matchRule(units, startIndex) {
  for (const candidateRule of LONGEST_MATCH_RULES) {
    let normalized = "";
    for (let endIndex = startIndex; endIndex < units.length; endIndex += 1) {
      normalized += units[endIndex].normalized;
      const lowered = normalized.toLocaleLowerCase("ha");
      const loweredCodePoints = codePointsOf(lowered);
      const candidateLength = candidateRule.codePoints.length;

      if (loweredCodePoints.length > candidateLength) {
        break;
      }

      const prefixMatches = loweredCodePoints.every(
        (codePoint, index) => codePoint === candidateRule.codePoints[index]
      );
      if (!prefixMatches) {
        break;
      }

      if (loweredCodePoints.length === candidateLength) {
        return {
          rule: candidateRule,
          unitCount: endIndex - startIndex + 1,
        };
      }
    }
  }
  return null;
}

function makeToken(units, startIndex, unitCount, token, type, metadata = {}) {
  const selected = units.slice(startIndex, startIndex + unitCount);
  const sourceSubstring = selected.map((unit) => unit.source).join("");
  const normalized = selected.map((unit) => unit.normalized).join("").normalize(NFC);

  return {
    sourceSubstring,
    normalized,
    token,
    type,
    codePoints: formatCodePoints(normalized),
    sourceCodePoints: formatCodePoints(sourceSubstring),
    sourceStart: selected[0].sourceStart,
    sourceEnd: selected[selected.length - 1].sourceEnd,
    ...metadata,
  };
}

function placeholderUnitCount(units, startIndex) {
  if (units[startIndex].normalized !== "\u007B") {
    return 0;
  }
  for (let index = startIndex + 1; index < units.length; index += 1) {
    if (units[index].normalized === "\u007D") {
      return index - startIndex + 1;
    }
    if (/\s/u.test(units[index].normalized)) {
      return 0;
    }
  }
  return 0;
}

/**
 * Tokenize Boko text as normalized graphemes and abstract units.
 *
 * This is deliberately not an Ajami generator. Generic apostrophes and the two
 * possible h tokens remain unresolved for later classification.
 */
export function tokenize(input) {
  const source = String(input ?? "");
  const units = segmentInput(source);
  const tokens = [];

  for (let index = 0; index < units.length;) {
    const placeholderLength = placeholderUnitCount(units, index);
    if (placeholderLength) {
      tokens.push(makeToken(units, index, placeholderLength, "PLACEHOLDER", "NON_PHONEME"));
      index += placeholderLength;
      continue;
    }

    const longest = matchRule(units, index);
    if (longest) {
      tokens.push(
        makeToken(
          units,
          index,
          longest.unitCount,
          longest.rule.token,
          longest.rule.type,
          {
            settled: Boolean(longest.rule.settled),
            provisional: Boolean(longest.rule.provisional),
            aliasClass: longest.rule.aliasClass ?? null,
          }
        )
      );
      index += longest.unitCount;
      continue;
    }

    const unit = units[index];
    const normalized = unit.normalized;
    const lowered = normalized.toLocaleLowerCase("ha");
    const codePoints = codePointsOf(normalized);

    if (codePoints.length === 1 && APOSTROPHE_CODE_POINTS.includes(codePoints[0])) {
      tokens.push(
        makeToken(units, index, 1, "APOSTROPHE_UNRESOLVED", "APOSTROPHE", {
          settled: false,
          reviewRequired: true,
        })
      );
    } else if (lowered === "h") {
      const token = "H_CONTEXT_REQUIRED";
      tokens.push(
        makeToken(units, index, 1, token, "PHONEME", {
          settled: token !== "H_CONTEXT_REQUIRED",
          reviewRequired: token === "H_CONTEXT_REQUIRED",
        })
      );
    } else if (VOWEL_TOKENS.has(lowered)) {
      tokens.push(
        makeToken(units, index, 1, VOWEL_TOKENS.get(lowered), "VOWEL", {
          settled: false,
          reviewRequired: true,
          reason: "Boko does not encode vowel length",
        })
      );
    } else if (/^\s+$/u.test(normalized)) {
      tokens.push(makeToken(units, index, 1, "WHITESPACE", "WHITESPACE"));
    } else if (/^\p{N}+$/u.test(normalized)) {
      tokens.push(makeToken(units, index, 1, "NUMBER", "NON_PHONEME"));
    } else if (/^\p{P}+$/u.test(normalized)) {
      tokens.push(makeToken(units, index, 1, "PUNCTUATION", "PUNCTUATION"));
    } else if (/^\p{S}+$/u.test(normalized)) {
      tokens.push(makeToken(units, index, 1, "SYMBOL", "NON_PHONEME"));
    } else {
      tokens.push(
        makeToken(units, index, 1, "UNKNOWN", "UNKNOWN", {
          settled: false,
          reviewRequired: true,
        })
      );
    }
    index += 1;
  }

  return {
    source,
    normalized: source.normalize(NFC),
    normalization: NFC,
    tokens,
  };
}

export function tokenizerSnapshot(input) {
  return tokenize(input).tokens.map((token) => ({
    sourceSubstring: token.sourceSubstring,
    normalized: token.normalized,
    tokenType: token.type,
    token: token.token,
    codePoints: token.codePoints,
  }));
}
