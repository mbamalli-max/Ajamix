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
  materializeLexicon,
  writeLexicon,
} from "./materialize-lexicon.mjs";

function sourceQueue() {
  return JSON.parse(fs.readFileSync(REVIEW_QUEUE_PATH, "utf8"));
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

  assert.equal(overriddenQuestions.length, 105);
  assert.equal(overridden.length, 99);
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
    // The source queue already carries Muhammad's supplied spelling as the
    // candidateFullAjami for ƙwai, despite its rejected cluster proposal.
    // It is the sole pre-materialised exception; the literal still has to win.
    if (source.boko === "ƙwai") continue;
    assert.notEqual(
      byBoko.get(source.boko).ajami,
      source.candidateFullAjami,
      `${source.boko} retained a rejected candidate spelling`
    );
  }

  assert.equal(entryFor(lexicon.entries, "aiki").ajami, "أَیْکِ");
  assert.equal(entryFor(lexicon.entries, "abu").ajami, "أَبُ");
  assert.equal(entryFor(lexicon.entries, "hannu").ajami, "هَࢽُّ");
  assert.equal(entryFor(lexicon.entries, "kalli").ajami, "کَلِّ");
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

  for (const boko of ["da", "ka", "ya", "ko"]) {
    const entry = entryFor(lexicon.entries, boko);
    assert.ok(entry.contextRule, `${boko} needs contextRule`);
    assert.match(entry.notes, /context-dependent.*contextRule/iu);
  }
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
