import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import test from "node:test";

import { formatCodePoints } from "./tokenizer.mjs";
import { validateLexiconEntry } from "./lexicon/schema.mjs";
import {
  DEFAULT_OUTPUT_PATH,
  REVIEW_QUEUE_PATH,
  decisionCodepoints,
  materializeAjami,
  materializeEntry,
  materializeLexicon,
  writeLexicon,
} from "./materialize-lexicon.mjs";

function storedQueue() {
  return JSON.parse(fs.readFileSync(REVIEW_QUEUE_PATH, "utf8"));
}

function sourceQueue() {
  const queue = storedQueue();
  queue.entries = queue.entries.filter(
    (entry) =>
      entry.status === "human_reviewed" &&
      entry.openQuestions.every((question) => question.reviewerDecision != null)
  );
  queue.entryCount = queue.entries.length;
  return queue;
}

function entryFor(entries, boko) {
  const entry = entries.find((candidate) => candidate.boko === boko);
  assert.ok(entry, `missing ${boko}`);
  return entry;
}

function containsSequence(codepoints, sequence) {
  return codepoints.some((_, start) =>
    sequence.every((value, offset) => codepoints[start + offset] === value)
  );
}

test("ratified decisions determine materialised spellings", () => {
  const queue = sourceQueue();
  const lexicon = materializeLexicon(queue);
  const byBoko = new Map(lexicon.entries.map((entry) => [entry.boko, entry]));
  const overriddenQuestions = queue.entries.flatMap((entry) =>
    entry.openQuestions.filter((question) => question.reviewerDecision !== question.candidateAnswer)
  );
  const overridden = queue.entries.filter((entry) =>
    entry.openQuestions.some((question) => question.reviewerDecision !== question.candidateAnswer)
  );

  // Counts are deliberately not hardcoded: ratification is ongoing and every
  // new ruling moves them. Assert the invariant instead (cf. slices 34, 35c, 42).
  assert.ok(overriddenQuestions.length > 0, "expected at least one overridden question");
  assert.ok(overridden.length > 0, "expected at least one overridden entry");
  assert.ok(overridden.length <= overriddenQuestions.length);
  for (const source of queue.entries) {
    const materializedCodepoints = formatCodePoints(byBoko.get(source.boko).ajami);
    for (const question of source.openQuestions) {
      if (question.reviewerDecision === question.candidateAnswer) continue;
      const chosen = decisionCodepoints(question);
      assert.ok(
        containsSequence(materializedCodepoints, chosen),
        `${source.boko} does not contain its ratified ${question.type} sequence`
      );
    }
  }
  for (const source of overridden) {
    assert.notEqual(
      byBoko.get(source.boko).ajami,
      source.candidateFullAjami,
      `${source.boko} retained a rejected candidate spelling`
    );
  }

  assert.equal(entryFor(lexicon.entries, "a").ajami, "أَ");
  assert.equal(entryFor(lexicon.entries, "abu").ajami, "أَبُ");
  assert.equal(entryFor(lexicon.entries, "hannu").ajami, "هَࢽُّ");
  assert.equal(entryFor(lexicon.entries, "ɗaya").ajami, "طَیَ");
});

test("accepted candidate spellings do not drift during assembly", () => {
  const queue = sourceQueue();
  const lexicon = materializeLexicon(queue);
  const byBoko = new Map(lexicon.entries.map((entry) => [entry.boko, entry]));
  for (const source of queue.entries) {
    if (source.openQuestions.every((question) => question.reviewerDecision === question.candidateAnswer)) {
      assert.equal(byBoko.get(source.boko).ajami, source.candidateFullAjami, source.boko);
    }
  }
});

test("unresolved kaf/qaf question fixtures block materialisation", () => {
  const queue = storedQueue();
  const ka = structuredClone(entryFor(queue.entries, "ka"));
  const articulation = ka.openQuestions.find(
    (question) => question.type === "K_ARTICULATION" && question.position === 0
  );
  assert.ok(articulation);
  articulation.reviewerDecision = null;

  assert.throws(
    () => materializeAjami(ka),
    /K_ARTICULATION at 0: missing reviewerDecision/u
  );
});

test("new six-way h questions materialise fixed and reviewer-supplied sequences", () => {
  const base = {
    boko: "ha",
    tokens: ["H_CONTEXT_REQUIRED", "VOWEL_A_UNLENGTHENED"],
    openQuestions: [
      {
        type: "H_ORTHOGRAPHY_CLASS",
        position: 0,
        reviewerDecision: "H_ARABIC_HEH_PRESERVED — ه U+0647 Arabic ه preserved",
      },
      {
        type: "WORD_FINAL_VOWEL",
        position: 1,
        reviewerDecision: "short final — U+064E",
      },
    ],
  };
  assert.equal(materializeAjami(base), "هَ");

  const unresolved = structuredClone(base);
  unresolved.openQuestions[0] = {
    type: "H_ORTHOGRAPHY_CLASS",
    position: 0,
    reviewerDecision:
      "H_LEXICAL_UNRESOLVED — reviewer must supply the exact Unicode replacement sequence",
    reviewerSuppliedSequence: "خ",
    reviewerSuppliedCodepoints: ["U+062E"],
  };
  assert.equal(materializeAjami(unresolved), "خَ");
});

test("contextual h and sukun decisions compose without the sukun answer replacing h", () => {
  const hChoices = [
    ["H_ARABIC_HA_PRESERVED — ح U+062D Arabic ح preserved", ["U+062D", "U+0652"]],
    ["H_ARABIC_HEH_PRESERVED — ه U+0647 Arabic ه preserved", ["U+0647", "U+0652"]],
    ["H_ARABIC_KHA_PRESERVED — خ U+062E Arabic خ preserved", ["U+062E", "U+0652"]],
  ];
  const rendered = hChoices.map(([reviewerDecision, expected]) => {
    const entry = {
      boko: "h",
      openQuestions: [
        { type: "H_ORTHOGRAPHY_CLASS", position: 0, reviewerDecision },
        {
          type: "SUKUN",
          position: 0,
          reviewerDecision: "consonant + U+0652 SUKUN — U+062D U+0652",
        },
      ],
    };
    const actual = formatCodePoints(materializeAjami(entry));
    assert.deepEqual(actual, expected);
    return actual;
  });
  assert.equal(new Set(rendered.map((codepoints) => codepoints.join(" "))).size, 3);

  const legacy = {
    boko: "h",
    openQuestions: [
      {
        type: "ARABIC_LEXICAL_H",
        position: 0,
        reviewerDecision: "Arabic lexical h — U+0647",
      },
      {
        type: "SUKUN",
        position: 0,
        reviewerDecision: "consonant + U+0652 SUKUN — U+062D U+0652",
      },
    ],
  };
  assert.deepEqual(formatCodePoints(materializeAjami(legacy)), ["U+0647", "U+0652"]);

  const standaloneSukun = {
    boko: "b",
    openQuestions: [
      {
        type: "SUKUN",
        position: 0,
        reviewerDecision: "consonant + U+0652 SUKUN — U+0628 U+0652",
      },
    ],
  };
  assert.deepEqual(formatCodePoints(materializeAjami(standaloneSukun)), ["U+0628", "U+0652"]);
});

test("not-applicable questions emit nothing and never fall back", () => {
  const reason = "Synthetic human ruling: these questions do not apply.";
  const notApplicable = {
    resolution: { state: "not_applicable", reason },
    lengthSource: "n/a",
    ajamiEvidence: "none",
    encodingRule: "ajamix-standard",
    reviewStatus: "human-approved",
  };
  const entry = {
    boko: "eh",
    openQuestions: [
      {
        type: "VOWEL_LENGTH",
        position: 0,
        reviewerDecision: "long — U+065C U+0649 U+0670",
      },
      { type: "WORD_INITIAL_CARRIER", position: 0, reviewerDecision: "U+0627 ALIF" },
      { type: "SHORT_E_CARRIER", position: 0, ...notApplicable },
      { type: "H_ORTHOGRAPHY_CLASS", position: 1, ...notApplicable },
      { type: "SUKUN", position: 1, ...notApplicable },
    ],
  };

  assert.equal(materializeAjami(entry), "اٜىٰ");
  assert.deepEqual(formatCodePoints(materializeAjami(entry)), [
    "U+0627",
    "U+065C",
    "U+0649",
    "U+0670",
  ]);
  assert.throws(
    () => decisionCodepoints(entry.openQuestions[2]),
    /question is not applicable/u
  );
});

test("answered excluded entries cannot enter a materialised lexicon", () => {
  const excluded = {
    boko: "ba",
    tokens: ["B_PLAIN", "VOWEL_A_UNLENGTHENED"],
    category: "native_hausa",
    status: "excluded",
    exclusionReason: "Synthetic human exclusion ruling.",
    openQuestions: [
      { type: "VOWEL_LENGTH", position: 1, reviewerDecision: "short — U+064E" },
    ],
  };

  assert.deepEqual(materializeLexicon({ entries: [excluded] }).entries, []);
  assert.throws(() => materializeAjami(excluded), /excluded review entry cannot be materialised/u);
  assert.throws(() => materializeEntry(excluded), /excluded review entry cannot be materialised/u);
});

test("materialised entries validate and preserve ratified special cases", () => {
  const queue = sourceQueue();
  const lexicon = materializeLexicon(queue);

  assert.equal(lexicon.entries.length, queue.entries.length);
  for (const entry of lexicon.entries) {
    assert.equal(validateLexiconEntry(entry, { generated: true }).ok, true, entry.boko);
    assert.deepEqual(formatCodePoints(entry.ajami), entry.ajamiCodepoints, entry.boko);
    assert.notEqual(entry.status, "approved", entry.boko);
  }

  const kwai = entryFor(lexicon.entries, "ƙwai");
  assert.equal(kwai.ajami, "قْوَیْ");
  assert.deepEqual(formatCodePoints(kwai.ajami), [
    "U+0642", "U+0652", "U+0648", "U+064E", "U+06CC", "U+0652",
  ]);

  const contextWords = queue.entries
    .filter((entry) => entry.contextRule)
    .map((entry) => entry.boko)
    .sort();
  assert.deepEqual(contextWords, ["da", "ka", "ko", "ya"]);
  for (const boko of contextWords) {
    const entry = entryFor(lexicon.entries, boko);
    assert.ok(entry.contextRule, `${boko} needs contextRule`);
    assert.match(entry.notes, /context-dependent.*contextRule/iu);
  }
});

test("resolved kaf/qaf articulation and cluster fixtures materialise exact selected sequences", () => {
  const queue = storedQueue();

  const aiki = structuredClone(entryFor(queue.entries, "aiki"));
  const articulation = aiki.openQuestions.find(
    (question) => question.type === "K_ARTICULATION" && question.position === 2
  );
  assert.ok(articulation);
  articulation.reviewerDecision = "qaf — U+0642";
  assert.deepEqual(formatCodePoints(materializeAjami(aiki)), [
    "U+0623", "U+064E", "U+06CC", "U+0652", "U+0642", "U+0650",
  ]);

  const kwatanta = structuredClone(entryFor(queue.entries, "kwatanta"));
  const wawCluster = kwatanta.openQuestions.find(
    (question) => question.type === "VELAR_CLUSTER" && question.position === 0
  );
  assert.ok(wawCluster);
  wawCluster.reviewerDecision = "qaf cluster — U+0642 U+0648";
  assert.deepEqual(formatCodePoints(materializeAjami(kwatanta)).slice(0, 3), [
    "U+0642", "U+0648", "U+064E",
  ]);

  const kyau = structuredClone(entryFor(queue.entries, "kyau"));
  const yehCluster = kyau.openQuestions.find(
    (question) => question.type === "VELAR_CLUSTER" && question.position === 0
  );
  assert.ok(yehCluster);
  yehCluster.reviewerDecision = "kaf cluster — U+06A9 U+06CC";
  assert.deepEqual(formatCodePoints(materializeAjami(kyau)).slice(0, 3), [
    "U+06A9", "U+06CC", "U+064E",
  ]);
});

test("writeLexicon writes only to an explicitly supplied temporary path", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajami-lexicon-"));
  try {
    const outputPath = path.join(temporaryDirectory, "ajami-lexicon.json");
    const lexicon = materializeLexicon(sourceQueue());
    assert.equal(writeLexicon(lexicon, outputPath), outputPath);
    assert.deepEqual(JSON.parse(fs.readFileSync(outputPath, "utf8")), lexicon);
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("stored top-500 lexicon stays in sync with its ratified review queue", () => {
  // The merged-lexicon builder materialises short300 and quiz live from their
  // queues, but reads the top500 lexicon from disk as a stored artifact. That
  // makes ajami-lexicon.json the one source that can silently drift out of
  // sync with the decisions that produced it -- and it did: four six-way
  // H_ORTHOGRAPHY_CLASS corrections (haɗin, haɗu, haɗari, hakan, all
  // ح U+062D -> ه U+0647) were ratified into the queue but never
  // rematerialised, and the stale ح propagated into 11 composed content
  // fields that every gate passed. Found by Muhammad, 2026-08-23.
  //
  // Deep-equality against a fresh materialisation is the invariant that makes
  // that class of drift impossible to ship again. This asserts a relationship
  // between two artifacts, not a live count, so it does not violate the
  // no-live-counts rule.
  const stored = JSON.parse(fs.readFileSync(DEFAULT_OUTPUT_PATH, "utf8"));
  const fresh = materializeLexicon(storedQueue());

  assert.deepEqual(
    stored,
    fresh,
    "tools/ajami-pipeline/data/ajami-lexicon.json is stale relative to " +
      "review-queue-top500.json. Re-run: node tools/ajami-pipeline/materialize-lexicon.mjs " +
      "(then rebuild the merged lexicon and regenerate content.json)."
  );
});
