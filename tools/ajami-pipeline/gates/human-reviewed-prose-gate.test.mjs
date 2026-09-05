import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";

import {
  HUMAN_REVIEWED_PROSE_SCHEMA_VERSION,
  runHumanReviewedProseGate,
  validateHumanReviewedProse,
} from "./human-reviewed-prose-gate.mjs";

function hash(value) {
  return `sha256:${crypto.createHash("sha256").update(value.normalize("NFC")).digest("hex")}`;
}

function liveContent(source = "Source") {
  return {
    modules: [{
      id: "module-1",
      gapTeaser: { ha: source, ajami: null },
      summary: { ha: "A real, populated summary", ajami: null },
    }],
  };
}

function validPacket(source = "Source") {
  return {
    schemaVersion: HUMAN_REVIEWED_PROSE_SCHEMA_VERSION,
    entries: [{
      moduleId: "module-1",
      fieldPath: "gapTeaser",
      category: "no_currently_flagged_risk",
      sourceHa: source,
      sourceHash: hash(source),
      reviewedAjami: null,
      status: "deferred",
      reviewer: null,
      reviewDate: null,
      note: null,
    }],
  };
}

function failures(packet, content = liveContent()) {
  return validateHumanReviewedProse(packet, content).violations.join("\n");
}

function approvedEntry(packet) {
  const entry = packet.entries[0];
  entry.status = "approved";
  entry.reviewedAjami = "ب";
  entry.reviewer = "Reviewer";
  entry.reviewDate = "2026-09-05";
  return entry;
}

test("human-reviewed prose validator accepts a valid entry and the schema-valid empty packet", () => {
  assert.deepEqual(validateHumanReviewedProse(validPacket(), liveContent()), { ok: true, violations: [] });
  assert.deepEqual(
    validateHumanReviewedProse(
      { schemaVersion: "human-reviewed-prose-v1", entries: [] },
      liveContent()
    ),
    { ok: true, violations: [] }
  );
});

test("human-reviewed prose validator independently reports each source-binding check", () => {
  const textMismatch = validPacket("e\u0301");
  assert.match(
    failures(textMismatch, liveContent("é")),
    /sourceHa does not byte-match live content/u
  );

  const selfHashMismatch = validPacket();
  selfHashMismatch.entries[0].sourceHash = hash("Other source");
  assert.match(
    failures(selfHashMismatch),
    /sourceHash is not self-consistent with sourceHa/u
  );

  const liveHashMismatch = validPacket("Other source");
  assert.match(
    failures(liveHashMismatch),
    /sourceHash does not match live content/u
  );
});

test("human-reviewed prose validator rejects duplicate paths, unknown modules, and orphaned paths", () => {
  const duplicate = validPacket();
  duplicate.entries.push(structuredClone(duplicate.entries[0]));
  assert.match(failures(duplicate), /duplicate moduleId\/fieldPath entry/u);

  const unknownModule = validPacket();
  unknownModule.entries[0].moduleId = "missing-module";
  assert.match(failures(unknownModule), /moduleId does not exist in live content/u);

  const orphaned = validPacket();
  const renamed = liveContent();
  delete renamed.modules[0].gapTeaser;
  assert.match(failures(orphaned, renamed), /fieldPath does not resolve to a currently populated field/u);
});

test("human-reviewed prose validator rejects a well-bound real non-gapTeaser fieldPath", () => {
  const content = liveContent();
  const packet = validPacket();
  const summary = content.modules[0].summary.ha;
  Object.assign(packet.entries[0], {
    fieldPath: "summary",
    sourceHa: summary,
    sourceHash: hash(summary),
  });

  assert.deepEqual(validateHumanReviewedProse(packet, content), {
    ok: false,
    violations: [
      'module-1/summary: unsupported fieldPath — only "gapTeaser" is supported in schema human-reviewed-prose-v1',
    ],
  });
});

test("human-reviewed prose gate reports approved and deferred entry counts", () => {
  const content = {
    modules: [
      { id: "module-1", gapTeaser: { ha: "First", ajami: null } },
      { id: "module-2", gapTeaser: { ha: "Second", ajami: null } },
    ],
  };
  const packet = validPacket("First");
  approvedEntry(packet);
  packet.entries.push({
    ...structuredClone(packet.entries[0]),
    moduleId: "module-2",
    sourceHa: "Second",
    sourceHash: hash("Second"),
    reviewedAjami: null,
    status: "deferred",
    reviewer: null,
    reviewDate: null,
  });

  assert.equal(
    runHumanReviewedProseGate(packet, content),
    "HUMAN-REVIEWED-PROSE GATE OK: 2 entries validated: 1 approved, 1 deferred"
  );
});

test("human-reviewed prose validator enforces deferred and approved status pairings", () => {
  const deferredWithReviewer = validPacket();
  deferredWithReviewer.entries[0].reviewer = "Stray reviewer";
  assert.match(
    failures(deferredWithReviewer),
    /deferred entries require reviewedAjami, reviewer, and reviewDate to all be null/u
  );

  const approvedMissingReviewer = validPacket();
  delete approvedEntry(approvedMissingReviewer).reviewer;
  assert.match(
    failures(approvedMissingReviewer),
    /approved entries require non-empty reviewedAjami and reviewer/u
  );
});

test("human-reviewed prose validator rejects malformed approved review data", () => {
  const badDate = validPacket();
  approvedEntry(badDate).reviewDate = "2026-09-05T00:00:00Z";
  assert.match(failures(badDate), /reviewDate YYYY-MM-DD/u);

  const nonNfc = validPacket();
  approvedEntry(nonNfc).reviewedAjami = "ا\u0654";
  assert.match(failures(nonNfc), /reviewedAjami must be NFC-normalized/u);

  const latinLeakage = validPacket();
  approvedEntry(latinLeakage).reviewedAjami = "بA";
  assert.match(failures(latinLeakage), /reviewedAjami is not clean Ajami/u);
});

test("human-reviewed prose validator rejects an unknown category", () => {
  const packet = validPacket();
  packet.entries[0].category = "unreviewed-category";
  assert.match(failures(packet), /category is not a defined enum value/u);
});
