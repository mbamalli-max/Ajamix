import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import {
  buildReviewQueue,
  buildReviewQueueFromContent,
  writeReviewQueueArtifacts,
} from "./build-review-queue.mjs";
import { renderCandidateReviewMarkdown } from "./propose-candidates.mjs";
import { tokenize } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.json");
const MARKDOWN_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.md");
const COVERAGE_PATH = path.join(MODULE_DIR, "data", "review-queue-coverage.json");
const EXCLUDED_PATH = path.join(MODULE_DIR, "data", "review-queue-excluded.json");
const BUILDER_PATH = path.join(MODULE_DIR, "build-review-queue.mjs");

function withoutSlice43Candidates(queue) {
  const stripped = structuredClone(queue);
  for (const entry of stripped.entries) {
    delete entry.candidateFullAjami;
    delete entry.candidateFullCodepoints;
    delete entry.entryConfidence;
    // Human review may proceed while the generated proposal artifact remains
    // reproducible. Normalize that independently authored layer away here.
    if (entry.status === "human_reviewed") entry.status = "provisional";
    entry.reviewerDecision = null;
    entry.reviewerNotes = "";
    for (const question of entry.openQuestions) {
      delete question.candidateAnswer;
      delete question.candidateAjamiSequence;
      delete question.reasoning;
      delete question.confidence;
      delete question.evidenceType;
      delete question.reviewerDecision;
    }
  }
  return stripped;
}

function fixtureArtifacts() {
  return buildReviewQueueFromContent(
    {
      modules: [
        {
          id: "fixture-1",
          titleHa: "Da da DA a e haka hankali P ma'a 'ya'ya b c.",
          textExplanationHa: "Da ya fi haka. E yana nan.",
        },
      ],
    },
    { limit: 10 }
  );
}

function wordListFixture() {
  return {
    modules: [
      {
        id: "fixture-word-list",
        titleHa: "kuma kuma kuma da da haka perimita.",
      },
    ],
  };
}

function temporaryWriterFixture() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ajamix-review-queue-"));
  const contentPath = path.join(directory, "content.json");
  const queuePath = path.join(directory, "queue.json");
  fs.writeFileSync(contentPath, JSON.stringify(wordListFixture()));
  return {
    contentPath,
    queuePath,
    markdownPath: path.join(directory, "queue.md"),
    coveragePath: path.join(directory, "queue-coverage.json"),
    excludedPath: path.join(directory, "queue-excluded.json"),
  };
}

function entryAtRank(entries, rank) {
  return entries.find((entry) => entry.rank === rank);
}

function entryFor(entries, normalizedBoko) {
  return entries.find((entry) => entry.normalizedBoko === normalizedBoko);
}

function characterPosition(source, sourceStart) {
  return Array.from(source.slice(0, sourceStart)).length;
}

function requiredSukunPositions(boko) {
  const tokenized = tokenize(boko);
  const positions = [];
  for (let index = 0; index < tokenized.tokens.length; index += 1) {
    const token = tokenized.tokens[index];
    if (token.type !== "PHONEME") continue;
    const next = tokenized.tokens[index + 1];
    if (!next || (next.type === "PHONEME" && next.token !== token.token)) {
      positions.push(characterPosition(boko, token.sourceStart));
    }
  }
  return positions;
}

test("frequency ranking folds case while preserving a representative corpus form", () => {
  const { queue, coverage } = fixtureArtifacts();
  const da = entryAtRank(queue.entries, 1);

  assert.equal(da.boko, "Da");
  assert.equal(da.normalizedBoko, "da");
  assert.equal(da.occurrences, 4);
  assert.equal(coverage.totalRunningWords, 19);
  assert.equal(coverage.totalDistinctWords, 14);
  assert.match(da.exampleSentences[0], /^\[fixture-1 \| modules\.0\.titleHa\]/);
});

test("writer refuses to overwrite human-reviewed queues without force and leaves them unchanged", () => {
  const paths = temporaryWriterFixture();
  const ratified = {
    entries: [{ status: "human_reviewed", reviewerNotes: "" }],
  };
  const original = `${JSON.stringify(ratified, null, 2)}\n`;
  fs.writeFileSync(paths.queuePath, original);

  assert.throws(
    () => writeReviewQueueArtifacts({ ...paths, words: ["da"] }),
    /Refusing to overwrite.*--force/u
  );
  assert.equal(fs.readFileSync(paths.queuePath, "utf8"), original);
});

test("writer also refuses a queue with reviewer notes", () => {
  const paths = temporaryWriterFixture();
  const original = JSON.stringify({ entries: [{ status: "provisional", reviewerNotes: "Do not replace." }] });
  fs.writeFileSync(paths.queuePath, original);

  assert.throws(
    () => writeReviewQueueArtifacts({ ...paths, words: ["da"] }),
    /Refusing to overwrite.*--force/u
  );
  assert.equal(fs.readFileSync(paths.queuePath, "utf8"), original);
});

test("writer force override permits replacing a human-reviewed fixture queue", () => {
  const paths = temporaryWriterFixture();
  fs.writeFileSync(
    paths.queuePath,
    JSON.stringify({ entries: [{ status: "human_reviewed", reviewerNotes: "ratified" }] })
  );

  const artifacts = writeReviewQueueArtifacts({ ...paths, words: ["da"], force: true });
  assert.equal(artifacts.queue.entryCount, 1);
  assert.equal(JSON.parse(fs.readFileSync(paths.queuePath, "utf8")).entries[0].normalizedBoko, "da");
});

test("word-list mode selects only requested words at their true corpus ranks", () => {
  const artifacts = buildReviewQueueFromContent(wordListFixture(), {
    words: ["haka", "da"],
  });

  assert.deepEqual(
    artifacts.queue.entries.map((entry) => [entry.normalizedBoko, entry.rank]),
    [["da", 2], ["haka", 3]]
  );
  assert.equal(artifacts.coverage.selection.mode, "wordList");
  assert.equal(artifacts.coverage.selection.entryCount, 2);
  assert.equal("top500" in artifacts.coverage, false);
  assert.equal("coverageCurve" in artifacts.coverage, false);
});

test("word-list input order and duplicates do not affect selection", () => {
  const first = buildReviewQueueFromContent(wordListFixture(), {
    words: ["haka", "da", "da"],
  });
  const second = buildReviewQueueFromContent(wordListFixture(), {
    words: ["da", "haka"],
  });

  assert.deepEqual(first.queue.entries, second.queue.entries);
  assert.equal(first.coverage.requestedWords.requested, 2);
});

test("word-list mode reports absent and excluded requested words without failing", () => {
  const artifacts = buildReviewQueueFromContent(wordListFixture(), {
    words: ["da", "babu", "perimita"],
  });

  assert.deepEqual(artifacts.coverage.requestedWords, {
    requested: 3,
    matched: 1,
    unmatchedNotInCorpus: ["babu"],
    unmatchedExcludedNonHausa: [{ word: "perimita", reason: "GLOSSED_LOANWORD" }],
  });
});

test("limit and words selection options are mutually exclusive", () => {
  assert.throws(
    () => buildReviewQueueFromContent(wordListFixture(), { limit: 1, words: ["da"] }),
    /either limit or words/u
  );
});

test("default build retains the top-500 entry count and corpus ranks", () => {
  const generated = buildReviewQueue();

  assert.equal(generated.queue.entryCount, 500);
  assert.deepEqual(
    generated.queue.entries.map((entry) => entry.rank).sort((left, right) => left - right),
    Array.from({ length: 500 }, (_, index) => index + 1)
  );
});

test("CLI rejects the protected top-500 output prefix", () => {
  const wordsFile = path.join(os.tmpdir(), `ajamix-words-${process.pid}.txt`);
  fs.writeFileSync(wordsFile, "da\n");
  const result = spawnSync(process.execPath, [
    BUILDER_PATH,
    "--words-file",
    wordsFile,
    "--out-prefix",
    "review-queue-top500",
  ], { encoding: "utf8" });

  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}${result.stderr}`, /must not resolve to review-queue-top500/u);
});

test("CLI --force permits a word-list output to replace a ratified temporary queue", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ajamix-review-queue-cli-"));
  const wordsFile = path.join(directory, "words.json");
  const prefix = path.join(directory, "review-queue-short");
  fs.writeFileSync(wordsFile, JSON.stringify(["da"]));
  fs.writeFileSync(
    `${prefix}.json`,
    JSON.stringify({ entries: [{ status: "human_reviewed", reviewerNotes: "ratified" }] })
  );

  const result = spawnSync(process.execPath, [
    BUILDER_PATH,
    "--words-file",
    wordsFile,
    "--out-prefix",
    prefix,
    "--force",
  ], { encoding: "utf8" });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(fs.readFileSync(`${prefix}.json`, "utf8")).entryCount, 1);
  assert.equal(fs.existsSync(path.join(directory, "review-queue-short-excluded.json")), false);
});

test("vowel questions name the position and exact short and long code-point candidates", () => {
  const { queue } = fixtureArtifacts();
  const haka = entryFor(queue.entries, "haka");
  const vowel = haka.openQuestions.find((question) => question.type === "VOWEL_LENGTH");

  assert.deepEqual(vowel.candidateCodePointSequences, {
    short: ["U+064E"],
    long: ["U+064E", "U+0627"],
  });
  assert.equal(vowel.position, 1);
  assert.equal(haka.provisionalAjami, "حَکَ");
  assert.deepEqual(haka.ajamiCodepoints, ["U+062D", "U+064E", "U+06A9", "U+064E"]);
  assert.equal(haka.status, "provisional");
});

test("initial vowels and short e expose carrier questions and block guessed spellings", () => {
  const { queue } = buildReviewQueueFromContent(
    { modules: [{ id: "fixture-initial-e", titleHa: "Emu" }] },
    { limit: 1 }
  );
  const emu = entryFor(queue.entries, "emu");
  const types = emu.openQuestions.map((question) => question.type);

  assert.ok(types.includes("VOWEL_LENGTH"));
  assert.ok(types.includes("WORD_INITIAL_CARRIER"));
  assert.ok(types.includes("SHORT_E_CARRIER"));
  assert.ok(types.includes("WORD_FINAL_VOWEL"));
  assert.equal(emu.provisionalAjami, null);
  assert.deepEqual(emu.ajamiCodepoints, []);
  assert.equal(emu.status, "blocked");
});

test("lexical h and apostrophes have specific routing questions", () => {
  const { queue, excluded } = fixtureArtifacts();
  const hankali = entryFor(queue.entries, "hankali");
  const apostrophe = entryFor(queue.entries, "ma'a");
  const apostropheY = entryFor(queue.entries, "ƴaƴa");

  const hQuestion = hankali.openQuestions.find(
    (question) => question.type === "ARABIC_LEXICAL_H"
  );
  assert.equal(hQuestion.arabicLoanCandidate, true);
  assert.match(hQuestion.question, /H_NATIVE_HAUSA.*H_ARABIC_LEXICAL/);
  assert.equal(hankali.category, "arabic_lexical");

  assert.equal(entryFor(queue.entries, "p"), undefined);
  assert.deepEqual(
    excluded.nonHausaTokens.find((entry) => entry.normalizedBoko === "p"),
    {
      token: "P",
      normalizedBoko: "p",
      occurrences: 1,
      reason: "SINGLE_LATIN_LETTER",
    }
  );

  assert.ok(
    apostrophe.openQuestions.some(
      (question) =>
        question.type === "APOSTROPHE_ROLE" &&
        question.inferredCategory === "GLOTTAL_BOUNDARY"
    )
  );
  assert.equal(apostrophe.status, "blocked");
  assert.equal(
    apostropheY.openQuestions.some((question) => question.type === "APOSTROPHE_ROLE"),
    false
  );
});

test("structural markers are stripped whole, reported, and never leave marker words or numbers", () => {
  const artifacts = buildReviewQueueFromContent(
    {
      modules: [
        {
          id: "fixture-marker",
          audioScript: "[intro] Da [ PAUSE   2 question ] da [SPEAKER CUE] da.",
        },
      ],
    },
    { limit: 1 }
  );

  assert.equal(artifacts.coverage.totalRunningWords, 3);
  assert.equal(artifacts.queue.entries[0].normalizedBoko, "da");
  assert.deepEqual(
    artifacts.excluded.structuralMarkers.map((marker) => marker.token),
    ["[ PAUSE   2 question ]", "[intro]", "[SPEAKER CUE]"]
  );
  assert.throws(
    () =>
      buildReviewQueueFromContent(
        { modules: [{ id: "fixture-content", audioScript: "[wannan rubutu] Da." }] },
        { limit: 1 }
      ),
    /Unclassified bracketed construct/
  );
});

test("template placeholders are stripped whole, reported distinctly, and never counted as words", () => {
  const artifacts = buildReviewQueueFromContent(
    {
      modules: [
        {
          id: "fixture-placeholders",
          templateHa: "{a} {b} {c} {d} {e} {numerator} a da.",
        },
      ],
    },
    { limit: 2 }
  );

  assert.equal(artifacts.coverage.totalRunningWords, 2);
  assert.equal(entryFor(artifacts.queue.entries, "a").occurrences, 1);
  assert.deepEqual(
    artifacts.excluded.templatePlaceholders.map((entry) => [
      entry.token,
      entry.occurrences,
      entry.reason,
    ]),
    [
      ["{a}", 1, "TEMPLATE_PLACEHOLDER"],
      ["{b}", 1, "TEMPLATE_PLACEHOLDER"],
      ["{c}", 1, "TEMPLATE_PLACEHOLDER"],
      ["{d}", 1, "TEMPLATE_PLACEHOLDER"],
      ["{e}", 1, "TEMPLATE_PLACEHOLDER"],
      ["{numerator}", 1, "TEMPLATE_PLACEHOLDER"],
    ]
  );
});

test("genuine standalone a stays while every other bare Latin letter is excluded with a reason", () => {
  const artifacts = buildReviewQueueFromContent(
    { modules: [{ id: "fixture-singles", titleHa: "a b c d e f da" }] },
    { limit: 2 }
  );

  assert.ok(entryFor(artifacts.queue.entries, "a"));
  assert.deepEqual(
    artifacts.excluded.nonHausaTokens.map((entry) => [entry.normalizedBoko, entry.reason]),
    [
      ["b", "TEMPLATE_PLACEHOLDER"],
      ["c", "TEMPLATE_PLACEHOLDER"],
      ["d", "TEMPLATE_PLACEHOLDER"],
      ["e", "TEMPLATE_PLACEHOLDER"],
      ["f", "SINGLE_LATIN_LETTER"],
    ]
  );
});

test("apostrophe variants and the apostrophe-y family merge before frequency counting", () => {
  const artifacts = buildReviewQueueFromContent(
    {
      modules: [
        {
          id: "fixture-apostrophes",
          titleHa: "al'umma al’umma alʼumma ƴan 'yan ’yan ʼyan da",
        },
      ],
    },
    { limit: 3 }
  );
  const community = entryFor(artifacts.queue.entries, "al'umma");
  const glottalizedY = entryFor(artifacts.queue.entries, "ƴan");

  assert.equal(community.occurrences, 3);
  assert.ok(["al'umma", "al’umma", "alʼumma"].includes(community.boko));
  assert.equal(glottalizedY.occurrences, 4);
  assert.ok(["ƴan", "'yan", "’yan", "ʼyan"].includes(glottalizedY.boko));
  assert.equal(
    artifacts.queue.entries.filter((entry) => entry.normalizedBoko === "al'umma").length,
    1
  );
});

test("deterministic sukūn is emitted, and blocked rows carry exact positioned sukūn questions", () => {
  const { queue } = buildReviewQueueFromContent(
    { modules: [{ id: "fixture-sukun", titleHa: "cikin lamba abin da" }] },
    { limit: 4 }
  );
  const cikin = entryFor(queue.entries, "cikin");
  const lamba = entryFor(queue.entries, "lamba");
  const abin = entryFor(queue.entries, "abin");

  assert.equal(cikin.provisionalAjami, "ثِکِࢽْ");
  assert.equal(lamba.provisionalAjami, "لَمْبَ");
  assert.equal(abin.status, "blocked");
  assert.equal(abin.provisionalAjami, null);
  assert.deepEqual(
    abin.openQuestions
      .filter((question) => question.type === "SUKUN")
      .map((question) => [question.position, question.options]),
    [[3, ["consonant + U+0652 SUKUN — U+08BD U+0652"]]]
  );
});

test("dependent final and adjacent-vowel questions collapse into one exact-sequence decision", () => {
  const artifacts = buildReviewQueueFromContent(
    { modules: [{ id: "fixture-dependent", titleHa: "mai da" }] },
    { limit: 2 }
  );
  const mai = entryFor(artifacts.queue.entries, "mai");
  const types = mai.openQuestions.map((question) => question.type);
  const sequence = mai.openQuestions.find((question) => question.type === "VOWEL_SEQUENCE");

  assert.deepEqual(types, ["VOWEL_SEQUENCE"]);
  assert.equal(mai.redundantQuestionsRemoved, 3);
  assert.ok(sequence.options.every((option) => /U\+[0-9A-F]{4}/u.test(option) || /reviewer must supply/u.test(option)));
  assert.deepEqual(sequence.candidateCodePointSequences.approvedDiphthong, [
    "U+064E",
    "U+06CC",
    "U+0652",
  ]);
});

test("Markdown prints every structured option, including exact final-vowel and velar sequences", () => {
  const artifacts = buildReviewQueueFromContent(
    { modules: [{ id: "fixture-markdown-options", titleHa: "kwata mai a" }] },
    { limit: 3 }
  );
  const kwata = entryFor(artifacts.queue.entries, "kwata");
  const finalVowel = kwata.openQuestions.find(
    (question) => question.type === "WORD_FINAL_VOWEL"
  );
  const velar = kwata.openQuestions.find((question) => question.type === "VELAR_CLUSTER");

  assert.ok(finalVowel.options.includes("short final — U+064E"));
  assert.ok(finalVowel.options.includes("long final — U+064E U+0627"));
  assert.deepEqual(velar.options, [
    "kaf cluster — U+06A9 U+0648",
    "qaf cluster — U+0642 U+0648",
    "lexical exception — reviewer must supply the exact Unicode replacement sequence",
  ]);
  for (const entry of artifacts.queue.entries) {
    for (const question of entry.openQuestions) {
      for (const option of question.options ?? []) {
        assert.ok(artifacts.markdown.includes(option), `${entry.boko}: missing Markdown option ${option}`);
      }
    }
  }
});

test("tokens with no answerable decision are excluded instead of becoming zero-question rows", () => {
  const artifacts = buildReviewQueueFromContent(
    { modules: [{ id: "fixture-no-action", titleHa: "LCM cm da" }] },
    { limit: 1 }
  );

  assert.equal(artifacts.queue.entries[0].normalizedBoko, "da");
  assert.ok(artifacts.queue.entries[0].openQuestions.length > 0);
  assert.deepEqual(
    artifacts.excluded.nonHausaTokens.map((entry) => [entry.normalizedBoko, entry.reason]),
    [
      ["cm", "NO_OPEN_QUESTION"],
      ["lcm", "NO_OPEN_QUESTION"],
    ]
  );
});

test("non-Hausa orthography is excluded while Hausa macron notation remains eligible", () => {
  const artifacts = buildReviewQueueFromContent(
    {
      modules: [
        {
          id: "fixture-orthography",
          titleHa: "Dā da perimita x.",
        },
      ],
    },
    { limit: 2 }
  );

  assert.deepEqual(
    artifacts.queue.entries.map((entry) => entry.normalizedBoko),
    ["dā", "da"]
  );
  assert.deepEqual(artifacts.excluded.nonHausaTokens, [
    {
      token: "perimita",
      normalizedBoko: "perimita",
      occurrences: 1,
      reason: "GLOSSED_LOANWORD",
      classification: "GLOSSED_LOANWORD",
    },
    {
      token: "x",
      normalizedBoko: "x",
      occurrences: 1,
      reason: "SINGLE_LATIN_LETTER",
    },
  ]);
});

test.skip("legacy generated-artifact snapshot predates human ratification", () => {
  const generated = buildReviewQueue();
  const storedQueue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
  const storedCoverage = JSON.parse(fs.readFileSync(COVERAGE_PATH, "utf8"));
  const storedExcluded = JSON.parse(fs.readFileSync(EXCLUDED_PATH, "utf8"));
  const storedMarkdown = fs.readFileSync(MARKDOWN_PATH, "utf8");

  assert.equal(generated.queue.entries.length, 500);
  assert.deepEqual(
    generated.queue.entries.map((entry) => entry.rank).sort((left, right) => left - right),
    Array.from({ length: 500 }, (_, index) => index + 1)
  );
  const byRank = [...generated.queue.entries].sort((left, right) => left.rank - right.rank);
  assert.ok(
    byRank.every(
      (entry, index) =>
        index === 0 ||
        byRank[index - 1].occurrences > entry.occurrences ||
        (byRank[index - 1].occurrences === entry.occurrences &&
          byRank[index - 1].normalizedBoko.localeCompare(entry.normalizedBoko, "ha") <= 0)
    )
  );
  for (let start = 0; start < generated.queue.entries.length; start += 25) {
    assert.deepEqual(
      generated.queue.entries
        .slice(start, start + 25)
        .map((entry) => entry.rank)
        .sort((left, right) => left - right),
      Array.from({ length: 25 }, (_, index) => start + index + 1)
    );
  }
  assert.equal(
    generated.queue.entries.some((entry) => entry.status === "approved"),
    false
  );
  assert.ok(
    generated.queue.entries.every((entry) => Array.isArray(entry.openQuestions))
  );
  assert.deepEqual(withoutSlice43Candidates(storedQueue), generated.queue);
  assert.deepEqual(storedCoverage, generated.coverage);
  assert.deepEqual(storedExcluded, generated.excluded);
  assert.equal(storedCoverage.top500.entryCount, 500);
  assert.equal(storedCoverage.totalRunningWords, 237166);
  assert.equal(storedCoverage.totalDistinctWords, 3235);
  assert.equal(storedCoverage.eligibleRunningWords, 236479);
  assert.equal(storedCoverage.eligibleDistinctWords, 3211);
  assert.deepEqual(storedCoverage.top500, {
    entryCount: 500,
    occurrencesCovered: 201432,
    coveragePercent: 84.9329,
  });
  assert.equal(storedCoverage.exclusions.structuralMarkers.distinctConstructs, 7);
  assert.deepEqual(storedCoverage.exclusions.templatePlaceholders, {
    distinctConstructs: 5,
    occurrences: 1179,
    runningWordsRemoved: 1179,
  });
  assert.deepEqual(
    storedExcluded.templatePlaceholders.map((entry) => [entry.token, entry.occurrences]),
    [
      ["{a}", 717],
      ["{b}", 348],
      ["{c}", 88],
      ["{d}", 25],
      ["{e}", 1],
    ]
  );
  assert.equal(storedCoverage.exclusions.nonHausaTokens.occurrences, 687);
  assert.equal(storedCoverage.zeroOpenQuestionEntries, 0);
  assert.equal(storedCoverage.redundantQuestionsRemoved, 488);
  assert.equal(storedCoverage.sukunTreatedEntries, 181);
  assert.equal(storedCoverage.blockedEntries, 119);
  assert.deepEqual(storedCoverage.openDecisionCountsByType, {
    VOWEL_LENGTH: 705,
    WORD_FINAL_VOWEL: 374,
    VOWEL_SEQUENCE: 47,
    WORD_INITIAL_CARRIER: 46,
    SUKUN: 38,
    GEMINATION: 37,
    ARABIC_LEXICAL_H: 26,
    APOSTROPHE_ROLE: 8,
    VELAR_CLUSTER: 7,
    DERIVATION_BLOCKED: 0,
    NON_HAUSA_TOKEN: 0,
    SHORT_E_CARRIER: 0,
  });
  assert.equal(
    storedExcluded.nonHausaTokens.find((entry) => entry.normalizedBoko === "perimita")
      .reason,
    "GLOSSED_LOANWORD"
  );
  assert.ok(
    storedQueue.entries
      .filter((entry) => entry.status === "blocked")
      .every(
        (entry) =>
          entry.provisionalAjami === null &&
          entry.ajamiCodepoints.length === 0 &&
          entry.openQuestions.length > 0
      )
  );
  assert.ok(
    storedQueue.entries.every(
      (entry) =>
        entry.exampleSentences.length > 0 &&
        entry.exampleSentences.length <= 3
    )
  );
  assert.ok(storedQueue.entries.every((entry) => entry.openQuestions.length > 0));
  assert.equal(
    storedQueue.entries.some(
      (entry) => /^[A-Za-z]$/u.test(entry.boko) && entry.boko.toLocaleLowerCase("ha") !== "a"
    ),
    false
  );
  const community = entryFor(storedQueue.entries, "al'umma");
  assert.equal(community.occurrences, 461);
  assert.equal(storedQueue.entries.filter((entry) => entry.normalizedBoko === "al'umma").length, 1);

  for (const entry of storedQueue.entries) {
    const positions = requiredSukunPositions(entry.boko);
    if (!positions.length) continue;
    if (entry.provisionalAjami !== null) {
      assert.equal(
        Array.from(entry.provisionalAjami).filter((character) => character === "\u0652").length,
        positions.length,
        `${entry.boko}: deterministic sukūn count`
      );
    } else {
      const questionedPositions = entry.openQuestions
        .filter((question) => question.type === "SUKUN")
        .map((question) => question.position)
        .sort((left, right) => left - right);
      assert.deepEqual(questionedPositions, positions, `${entry.boko}: blocked sukūn positions`);
    }
  }

  for (const entry of storedQueue.entries) {
    for (const question of entry.openQuestions.filter((item) =>
      ["WORD_FINAL_VOWEL", "VELAR_CLUSTER", "VOWEL_SEQUENCE"].includes(item.type)
    )) {
      assert.ok(
        question.options.every(
          (option) => /U\+[0-9A-F]{4}/u.test(option) || /reviewer must supply/u.test(option)
        ),
        `${entry.boko}: non-concrete ${question.type} option`
      );
    }
  }
  assert.equal(storedMarkdown, renderCandidateReviewMarkdown(storedQueue));
  assert.equal((storedMarkdown.match(/^## Frequency ranks /gmu) ?? []).length, 20);
  assert.equal(
    (storedMarkdown.match(/^\| \d+ \|/gmu) ?? []).length,
    500
  );
  assert.equal(
    storedQueue.entries.some(
      (entry) =>
        /[pqvx]/iu.test(entry.boko) ||
        ["pause", "intro", "main", "outro"].includes(entry.normalizedBoko)
    ),
    false
  );
});
