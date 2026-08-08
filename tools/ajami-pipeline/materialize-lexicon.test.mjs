import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import test from "node:test";

import { formatCodePoints } from "./tokenizer.mjs";
import { validateLexiconEntry } from "./lexicon/schema.mjs";
import {
  REVIEW_QUEUE_PATH,
  decisionCodepoints,
  materializeAjami,
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

  assert.equal(overriddenQuestions.length, 232);
  assert.equal(overridden.length, 198);
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

test("materialised entries validate and preserve ratified special cases", () => {
  const queue = sourceQueue();
  const lexicon = materializeLexicon(queue);

  assert.equal(lexicon.entries.length, 500);
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
