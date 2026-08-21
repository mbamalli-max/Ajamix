import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  alignEntry,
  buildMfaProposalReport,
  parseMfaDictionary,
  parseMfaVowels,
  recordedLength,
} from "./mfa-proposals.mjs";

test("MFA parser strips tone/diacritic marks and maps reduced Hausa vowels", () => {
  assert.deepEqual(
    parseMfaVowels("ə˥ ɪ˦ ʊ˧ ɛ˨ ɔ˩ aːˤ iːʰ uːʲ eːʷ oː"),
    [
      { letter: "a", length: "short", sourceToken: "ə˥" },
      { letter: "i", length: "short", sourceToken: "ɪ˦" },
      { letter: "u", length: "short", sourceToken: "ʊ˧" },
      { letter: "e", length: "short", sourceToken: "ɛ˨" },
      { letter: "o", length: "short", sourceToken: "ɔ˩" },
      { letter: "a", length: "long", sourceToken: "aːˤ" },
      { letter: "i", length: "long", sourceToken: "iːʰ" },
      { letter: "u", length: "long", sourceToken: "uːʲ" },
      { letter: "e", length: "long", sourceToken: "eːʷ" },
      { letter: "o", length: "long", sourceToken: "oː" },
    ]
  );
});

test("MFA dictionary parser preserves ordered alternate pronunciations", () => {
  const parsed = parseMfaDictionary("gida\tɡ ɪ˩ d aː˥\ngida\tɡ iː˩ d ə˥\n");
  assert.equal(parsed.pronunciationCount, 2);
  assert.equal(parsed.pronunciationsByWord.size, 1);
  assert.deepEqual(parsed.pronunciationsByWord.get("gida"), ["ɡ ɪ˩ d aː˥", "ɡ iː˩ d ə˥"]);
});

test("alignment requires exact vowel count and letter sequence", () => {
  const entry = {
    boko: "gida",
    openQuestions: [
      { type: "WORD_FINAL_VOWEL", position: 3, letter: "a", reviewerDecision: null },
      { type: "VOWEL_LENGTH", position: 1, letter: "i", reviewerDecision: null },
    ],
  };
  assert.equal(alignEntry(entry, ["ɡ ɪ˩ d aː˥"]).alignment?.phoneString, "ɡ ɪ˩ d aː˥");
  assert.equal(alignEntry(entry, ["ɡ ɪ˩ d aː˥ n ɪ˩"]).alignment, null);
  assert.equal(alignEntry(entry, ["ɡ ʊ˩ d aː˥"]).alignment, null);
});

test("proposal report is read-only and records decisions without approving them", () => {
  const queue = {
    entries: [
      {
        boko: "gida",
        normalizedBoko: "gida",
        openQuestions: [
          {
            type: "VOWEL_LENGTH",
            position: 1,
            letter: "i",
            reviewerDecision: "short — U+0650",
          },
          {
            type: "WORD_FINAL_VOWEL",
            position: 3,
            letter: "a",
            reviewerDecision: null,
          },
        ],
      },
      {
        boko: "mismatch",
        normalizedBoko: "mismatch",
        openQuestions: [
          { type: "VOWEL_LENGTH", position: 1, letter: "a", reviewerDecision: null },
        ],
      },
    ],
  };
  const before = JSON.stringify(queue);
  const report = buildMfaProposalReport(
    queue,
    "gida\tɡ ɪ˩ d aː˥\nmismatch\tm ɪ˩ s m a˩ tʃ\n"
  );
  assert.equal(JSON.stringify(queue), before);
  assert.deepEqual(
    report.proposals.map(({ proposedLength, agreesWithRecordedDecision }) => ({
      proposedLength,
      agreesWithRecordedDecision,
    })),
    [
      { proposedLength: "short", agreesWithRecordedDecision: true },
      { proposedLength: "long", agreesWithRecordedDecision: null },
    ]
  );
  assert.equal(report.counts.alignedOpenQuestions, 1);
  assert.equal(report.unalignedWords[0].reason, "vowel-count-or-letter-sequence-mismatch");
  assert.equal(JSON.stringify(queue), before);
});

test("supplied lexical sequences are measurable only when they carry a long-vowel letter", () => {
  assert.equal(
    recordedLength({
      reviewerDecision: "lexical exception — reviewer must supply the exact Unicode replacement sequence",
      reviewerSuppliedSequence: "ُو",
    }),
    "long"
  );
  assert.equal(
    recordedLength({
      reviewerDecision: "lexical exception — reviewer must supply the exact Unicode replacement sequence",
      reviewerSuppliedSequence: "ُ",
    }),
    null
  );
});

test("vendored MFA source and baseline proposal artifact preserve the audited corpus counts", () => {
  const dictionary = fs.readFileSync(new URL("./data/mfa-hausa-v3.0.0.dict", import.meta.url), "utf8");
  const parsed = parseMfaDictionary(dictionary);
  assert.equal(parsed.pronunciationCount, 7891);
  assert.equal(parsed.pronunciationsByWord.size, 7792);

  const artifact = JSON.parse(
    fs.readFileSync(new URL("./data/mfa-proposals.json", import.meta.url), "utf8")
  );
  assert.equal(
    artifact.sourceQueue.sha256,
    "e8a5647557bad8b91e23b7e52c3697cc9ba6f6a4b95e83dd24c2ef81ea779b70"
  );
  assert.equal(artifact.counts.openVowelQuestions, 582);
  assert.equal(artifact.counts.alignedOpenQuestions, 346);
  assert.equal(artifact.counts.alignedOpenWords, 206);
  assert.equal(artifact.counts.openCoveragePercent, 59.5);
});
