import { formatCodePoints, tokenize } from "../tokenizer.mjs";

export const LEXICON_ORTHOGRAPHY = "warsh_kano_ajamix_v1";

export const LEXICON_STATUSES = Object.freeze([
  "candidate",
  "provisional",
  "rule_verified",
  "human_reviewed",
  "approved",
  "ambiguous",
  "blocked",
  "deprecated",
]);

export const LEXICON_CATEGORIES = Object.freeze([
  "native_hausa",
  "assimilated_loanword",
  "arabic_lexical",
  "quranic",
  "proper_noun",
  "mixed_hausa_arabic",
  "mixed_hausa_english",
  "acronym",
  "numeral",
  "other",
]);

export const LEXICON_CONFIDENCE = Object.freeze([
  "unreviewed",
  "low",
  "medium",
  "high",
  "reviewed",
]);

export const REQUIRED_LEXICON_FIELDS = Object.freeze([
  "boko",
  "normalizedBoko",
  "tokens",
  "ajami",
  "ajamiCodepoints",
  "pronunciation",
  "vowelLength",
  "category",
  "orthography",
  "status",
  "confidence",
  "source",
  "reviewer",
  "reviewDate",
  "notes",
]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNullableString(value) {
  return value === null || typeof value === "string";
}

function validateDate(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
  );
}

export function normalizeBoko(value) {
  return String(value ?? "")
    .normalize("NFC")
    .toLocaleLowerCase("ha");
}

/**
 * Validate one lexicon entry without mutating it.
 *
 * `generated: true` is an origin assertion from a generator/importer. Such
 * material is prohibited from carrying `approved`, even if review metadata was
 * forged into the object. Human approval must occur in a separate review flow.
 */
export function validateLexiconEntry(entry, { generated = false } = {}) {
  const errors = [];

  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    return { ok: false, errors: ["entry must be an object"] };
  }

  for (const field of REQUIRED_LEXICON_FIELDS) {
    if (!Object.hasOwn(entry, field)) {
      errors.push(`missing required field: ${field}`);
    }
  }

  if (!isNonEmptyString(entry.boko)) {
    errors.push("boko must be a non-empty string");
  }
  if (!isNonEmptyString(entry.normalizedBoko)) {
    errors.push("normalizedBoko must be a non-empty string");
  } else if (entry.normalizedBoko !== normalizeBoko(entry.boko)) {
    errors.push("normalizedBoko must equal NFC Hausa-lowercase boko");
  }
  if (!Array.isArray(entry.tokens)) {
    errors.push("tokens must be an array");
  }
  if (typeof entry.ajami !== "string") {
    errors.push("ajami must be a string");
  }
  if (!Array.isArray(entry.ajamiCodepoints)) {
    errors.push("ajamiCodepoints must be an array");
  } else if (typeof entry.ajami === "string") {
    const actual = formatCodePoints(entry.ajami);
    if (
      actual.length !== entry.ajamiCodepoints.length ||
      actual.some((codePoint, index) => codePoint !== entry.ajamiCodepoints[index])
    ) {
      errors.push("ajamiCodepoints must exactly describe ajami");
    }
  }
  if (!isNullableString(entry.pronunciation)) {
    errors.push("pronunciation must be a string or null");
  }
  if (
    entry.vowelLength !== null &&
    typeof entry.vowelLength !== "string" &&
    !Array.isArray(entry.vowelLength)
  ) {
    errors.push("vowelLength must be a string, array, or null");
  }
  if (!LEXICON_CATEGORIES.includes(entry.category)) {
    errors.push(`category must be one of: ${LEXICON_CATEGORIES.join(", ")}`);
  }
  if (entry.orthography !== LEXICON_ORTHOGRAPHY) {
    errors.push(`orthography must be ${LEXICON_ORTHOGRAPHY}`);
  }
  if (!LEXICON_STATUSES.includes(entry.status)) {
    errors.push(`status must be one of: ${LEXICON_STATUSES.join(", ")}`);
  }
  if (!LEXICON_CONFIDENCE.includes(entry.confidence)) {
    errors.push(`confidence must be one of: ${LEXICON_CONFIDENCE.join(", ")}`);
  }
  if (!Array.isArray(entry.source) || entry.source.some((item) => !isNonEmptyString(item))) {
    errors.push("source must be an array of non-empty strings");
  }
  if (!isNullableString(entry.reviewer)) {
    errors.push("reviewer must be a string or null");
  }
  if (entry.reviewDate !== null && !validateDate(entry.reviewDate)) {
    errors.push("reviewDate must be YYYY-MM-DD or null");
  }
  if (typeof entry.notes !== "string") {
    errors.push("notes must be a string");
  }

  if (entry.status === "approved") {
    if (!Array.isArray(entry.source) || entry.source.length === 0) {
      errors.push("approved entries require at least one source");
    }
    if (!isNonEmptyString(entry.reviewer)) {
      errors.push("approved entries require a reviewer");
    }
    if (!validateDate(entry.reviewDate)) {
      errors.push("approved entries require a valid reviewDate");
    }
    if (generated) {
      errors.push("generated entries may not have status approved");
    }
  }

  return { ok: errors.length === 0, errors };
}

export function validateLexicon(entries, options = {}) {
  if (!Array.isArray(entries)) {
    return { ok: false, errors: ["lexicon must be an array"], entryResults: [] };
  }
  const entryResults = entries.map((entry, index) => ({
    index,
    ...validateLexiconEntry(entry, options),
  }));
  const errors = entryResults.flatMap((result) =>
    result.errors.map((error) => `[${result.index}] ${error}`)
  );
  return { ok: errors.length === 0, errors, entryResults };
}

/**
 * Constructor for machine-produced candidate material. It deliberately exposes
 * no path to approved status.
 */
export function createGeneratedEntry({
  boko,
  ajami = "",
  category = "native_hausa",
  status = "candidate",
  source = [],
  notes = "",
}) {
  if (!["candidate", "provisional", "ambiguous", "blocked"].includes(status)) {
    throw new Error(`generated lexicon status is not permitted: ${status}`);
  }
  const tokenized = tokenize(boko);
  const entry = {
    boko,
    normalizedBoko: normalizeBoko(boko),
    tokens: tokenized.tokens.map((token) => token.token),
    ajami,
    ajamiCodepoints: formatCodePoints(ajami),
    pronunciation: null,
    vowelLength: null,
    category,
    orthography: LEXICON_ORTHOGRAPHY,
    status,
    confidence: "unreviewed",
    source,
    reviewer: null,
    reviewDate: null,
    notes,
  };
  const validation = validateLexiconEntry(entry, { generated: true });
  if (!validation.ok) {
    throw new Error(`invalid generated lexicon entry: ${validation.errors.join("; ")}`);
  }
  return entry;
}
