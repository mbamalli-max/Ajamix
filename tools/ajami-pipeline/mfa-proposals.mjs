// Proposal-only use of the CC BY 4.0 Hausa MFA dictionary. Source, licence, and
// required attribution: data/mfa-hausa-v3.0.0.LICENSE.md

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const MFA_DICTIONARY_PATH = new URL("./data/mfa-hausa-v3.0.0.dict", import.meta.url);
export const REVIEW_QUEUE_PATH = new URL("./data/review-queue-quiz.json", import.meta.url);
export const MFA_PROPOSALS_PATH = new URL("./data/mfa-proposals.json", import.meta.url);

const VOWEL_QUESTION_TYPES = new Set(["VOWEL_LENGTH", "WORD_FINAL_VOWEL"]);
const DIACRITICS = /[˥˦˧˨˩ˤʰʲʷ]/gu;
const VOWEL_EQUIVALENTS = new Map([
  ["a", "a"],
  ["i", "i"],
  ["u", "u"],
  ["e", "e"],
  ["o", "o"],
  ["ə", "a"],
  ["ɪ", "i"],
  ["ʊ", "u"],
  ["ɛ", "e"],
  ["ɔ", "o"],
]);
const LONG_VOWEL_CODEPOINTS = new Set(["U+0627", "U+0648", "U+0649"]);

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function percent(numerator, denominator) {
  return denominator === 0 ? 0 : Number(((numerator / denominator) * 100).toFixed(1));
}

export function parseMfaDictionary(text) {
  const pronunciationsByWord = new Map();
  let pronunciationCount = 0;

  for (const [index, line] of text.split(/\r?\n/u).entries()) {
    if (line.length === 0) continue;
    const separator = line.indexOf("\t");
    if (separator <= 0 || separator === line.length - 1) {
      throw new Error(`MFA dictionary line ${index + 1} must be word<TAB>phones`);
    }
    const word = line.slice(0, separator);
    const phones = line.slice(separator + 1);
    const pronunciations = pronunciationsByWord.get(word) ?? [];
    pronunciations.push(phones);
    pronunciationsByWord.set(word, pronunciations);
    pronunciationCount += 1;
  }

  return { pronunciationsByWord, pronunciationCount };
}

export function parseMfaVowels(phoneString) {
  return phoneString
    .trim()
    .split(/\s+/u)
    .map((sourceToken) => {
      const strippedToken = sourceToken.replace(DIACRITICS, "");
      const isLong = strippedToken.includes("ː");
      const baseToken = strippedToken.replaceAll("ː", "");
      const letter = VOWEL_EQUIVALENTS.get(baseToken);
      return letter ? { letter, length: isLong ? "long" : "short", sourceToken } : null;
    })
    .filter(Boolean);
}

function vowelQuestions(entry) {
  return (entry.openQuestions ?? [])
    .filter((question) => VOWEL_QUESTION_TYPES.has(question.type))
    .toSorted((left, right) => left.position - right.position);
}

export function recordedLength(question) {
  if (question.reviewerDecision === null || question.reviewerDecision === undefined) return null;
  if (/^short(?:\s|\b)/u.test(question.reviewerDecision)) return "short";
  if (/^long(?:\s|\b)/u.test(question.reviewerDecision)) return "long";

  if (/must supply/iu.test(question.reviewerDecision)) {
    const codepoints = Array.isArray(question.reviewerSuppliedCodepoints)
      ? question.reviewerSuppliedCodepoints
      : [...String(question.reviewerSuppliedSequence ?? "")].map(
          (character) => `U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
        );
    if (codepoints.some((codepoint) => LONG_VOWEL_CODEPOINTS.has(codepoint))) return "long";
  }

  return null;
}

export function alignEntry(entry, pronunciations = []) {
  const questions = vowelQuestions(entry);
  if (questions.length === 0) return { questions, alignment: null };

  for (const [pronunciationIndex, phoneString] of pronunciations.entries()) {
    const vowels = parseMfaVowels(phoneString);
    const exactMatch =
      vowels.length === questions.length &&
      vowels.every((vowel, index) => vowel.letter === questions[index].letter);
    if (exactMatch) return { questions, alignment: { phoneString, pronunciationIndex, vowels } };
  }

  return { questions, alignment: null };
}

export function buildMfaProposalReport(queue, dictionaryText, metadata = {}) {
  const entries = Array.isArray(queue) ? queue : queue?.entries;
  if (!Array.isArray(entries)) throw new Error("review queue must contain an entries array");

  const { pronunciationsByWord, pronunciationCount } = parseMfaDictionary(dictionaryText);
  const proposals = [];
  const unalignedWords = [];
  const openAlignedWords = new Set();
  let vowelQuestionCount = 0;
  let openVowelQuestionCount = 0;
  let answeredVowelQuestionCount = 0;

  for (const entry of entries) {
    const questions = vowelQuestions(entry);
    if (questions.length === 0) continue;
    vowelQuestionCount += questions.length;
    openVowelQuestionCount += questions.filter((question) => question.reviewerDecision == null).length;
    answeredVowelQuestionCount += questions.filter((question) => question.reviewerDecision != null).length;

    const lookupWord = pronunciationsByWord.has(entry.boko) ? entry.boko : entry.normalizedBoko;
    const pronunciations = pronunciationsByWord.get(lookupWord) ?? [];
    const { alignment } = alignEntry(entry, pronunciations);
    if (!alignment) {
      unalignedWords.push({
        word: entry.boko,
        reason: pronunciations.length === 0 ? "not-in-dictionary" : "vowel-count-or-letter-sequence-mismatch",
        questionLetters: questions.map((question) => question.letter).join(""),
        sourcePhoneStrings: pronunciations,
      });
      continue;
    }

    for (const [index, question] of questions.entries()) {
      const proposedLength = alignment.vowels[index].length;
      const existingLength = recordedLength(question);
      if (question.reviewerDecision == null) openAlignedWords.add(entry.boko);
      proposals.push({
        word: entry.boko,
        questionType: question.type,
        position: question.position,
        letter: question.letter,
        proposedLength,
        sourcePhoneString: alignment.phoneString,
        pronunciationIndex: alignment.pronunciationIndex,
        recordedDecision: question.reviewerDecision ?? null,
        recordedLength: existingLength,
        agreesWithRecordedDecision:
          existingLength === null ? null : existingLength === proposedLength,
      });
    }
  }

  const alignedWords = new Set(proposals.map((proposal) => proposal.word));
  const openProposalCount = proposals.filter((proposal) => proposal.recordedDecision === null).length;
  const answeredProposalCount = proposals.length - openProposalCount;
  const agreementCount = proposals.filter((proposal) => proposal.agreesWithRecordedDecision === true).length;
  const disagreementCount = proposals.filter((proposal) => proposal.agreesWithRecordedDecision === false).length;

  return {
    schemaVersion: 1,
    taskId: "2026-08-17-slice-40",
    notice:
      "MFA output is proposal-only. This artifact never sets, alters, clears, or approves a reviewerDecision; Muhammad remains the sole spelling authority.",
    source: {
      dictionary: "mfa-hausa-v3.0.0.dict",
      url: "https://raw.githubusercontent.com/MontrealCorpusTools/mfa-models/main/dictionary/hausa/mfa/hausa_mfa.dict",
      version: "3.0.0",
      license: "CC BY 4.0",
      attribution: "mfa-hausa-v3.0.0.LICENSE.md",
      sha256: metadata.dictionarySha256 ?? sha256(dictionaryText),
    },
    sourceQueue: {
      path: metadata.queuePath ?? "review-queue-quiz.json",
      sha256: metadata.queueSha256 ?? null,
    },
    counts: {
      dictionaryPronunciations: pronunciationCount,
      dictionaryUniqueHeadwords: pronunciationsByWord.size,
      vowelQuestions: vowelQuestionCount,
      openVowelQuestions: openVowelQuestionCount,
      answeredVowelQuestions: answeredVowelQuestionCount,
      alignedWords: alignedWords.size,
      alignedQuestions: proposals.length,
      alignedOpenWords: openAlignedWords.size,
      alignedOpenQuestions: openProposalCount,
      openCoveragePercent: percent(openProposalCount, openVowelQuestionCount),
      alignedAnsweredQuestions: answeredProposalCount,
      agreementsWithRecordedDecision: agreementCount,
      disagreementsWithRecordedDecision: disagreementCount,
      unalignedWords: unalignedWords.length,
    },
    proposals,
    unalignedWords,
  };
}

export function generateMfaProposalReport({
  queuePath = REVIEW_QUEUE_PATH,
  dictionaryPath = MFA_DICTIONARY_PATH,
  outputPath = MFA_PROPOSALS_PATH,
} = {}) {
  const queueText = fs.readFileSync(queuePath, "utf8");
  const dictionaryText = fs.readFileSync(dictionaryPath, "utf8");
  const queue = JSON.parse(queueText);
  const report = buildMfaProposalReport(queue, dictionaryText, {
    queuePath: path.basename(queuePath instanceof URL ? fileURLToPath(queuePath) : String(queuePath)),
    queueSha256: sha256(queueText),
  });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const report = generateMfaProposalReport();
  const { counts } = report;
  console.log(
    `MFA PROPOSALS OK: ${counts.alignedQuestions} proposals for ${counts.alignedWords} aligned words; ` +
      `${counts.alignedOpenQuestions}/${counts.openVowelQuestions} open vowel questions across ` +
      `${counts.alignedOpenWords} words (${counts.openCoveragePercent}%); ${counts.unalignedWords} words unaligned`
  );
}
