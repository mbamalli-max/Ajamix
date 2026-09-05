import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { assertCleanAjami } from "../compose-ajami.mjs";

export const HUMAN_REVIEWED_PROSE_PATH = new URL("../data/human-reviewed-prose.json", import.meta.url);
export const CONTENT_PATH = new URL("../../../app/content.json", import.meta.url);
export const HUMAN_REVIEWED_PROSE_SCHEMA_VERSION = "human-reviewed-prose-v1";
export const EMPTY_HUMAN_REVIEWED_PROSE_PACKET = Object.freeze({
  schemaVersion: HUMAN_REVIEWED_PROSE_SCHEMA_VERSION,
  entries: [],
});

const CATEGORIES = new Set([
  "no_currently_flagged_risk",
  "context_sensitive_candidate",
  "vocabulary_incomplete",
  "english_loanword",
  "punctuation_heavy",
]);
const REVIEW_DATE_RE = /^\d{4}-\d{2}-\d{2}$/u;

function sourceHash(value) {
  return `sha256:${crypto.createHash("sha256").update(value.normalize("NFC")).digest("hex")}`;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function entryLabel(entry) {
  return `${entry?.moduleId ?? "(missing moduleId)"}/${entry?.fieldPath ?? "(missing fieldPath)"}`;
}

function pushIf(condition, message, violations) {
  if (condition) violations.push(message);
}

/**
 * Validate a parsed human-reviewed prose packet against parsed live content.
 * This function is deliberately pure: it performs no file I/O or regeneration.
 */
export function validateHumanReviewedProse(packet, liveContent) {
  const violations = [];
  if (packet?.schemaVersion !== HUMAN_REVIEWED_PROSE_SCHEMA_VERSION) {
    violations.push(`packet: schemaVersion must be ${HUMAN_REVIEWED_PROSE_SCHEMA_VERSION}`);
  }
  if (!Array.isArray(packet?.entries)) {
    violations.push("packet: entries must be an array");
    return { ok: false, violations };
  }
  if (!Array.isArray(liveContent?.modules)) {
    violations.push("live content: modules must be an array");
    return { ok: false, violations };
  }

  const seenPaths = new Set();
  for (const entry of packet.entries) {
    const label = entryLabel(entry);
    const pathKey = `${entry?.moduleId}\u0000${entry?.fieldPath}`;
    pushIf(seenPaths.has(pathKey), `${label}: duplicate moduleId/fieldPath entry`, violations);
    seenPaths.add(pathKey);

    const module = liveContent.modules.find((m) => m.id === entry?.moduleId);
    pushIf(!module, `${label}: moduleId does not exist in live content`, violations);

    const supportedFieldPath = entry?.fieldPath === "gapTeaser";
    pushIf(
      !supportedFieldPath,
      `${label}: unsupported fieldPath — only "gapTeaser" is supported in schema ${HUMAN_REVIEWED_PROSE_SCHEMA_VERSION}`,
      violations
    );

    // An unsupported path must fail closed even if a currently populated
    // bilingual field happens to exist at that path. Do not compound that
    // structural rejection with field-resolution or source-binding checks.
    const liveField = supportedFieldPath ? module?.[entry?.fieldPath] : undefined;
    const populatedField = liveField && typeof liveField === "object" &&
      isNonEmptyString(liveField.ha);
    pushIf(
      module && supportedFieldPath && !populatedField,
      `${label}: fieldPath does not resolve to a currently populated field`,
      violations
    );

    // Source binding only applies once a live target resolves. Unknown modules
    // and orphaned fields already have their own actionable, non-overlapping
    // violations above.
    if (populatedField) {
      const liveSourceHa = liveField.ha;
      pushIf(
        entry?.sourceHa !== liveSourceHa,
        `${label}: sourceHa does not byte-match live content`,
        violations
      );
      pushIf(
        typeof entry?.sourceHa !== "string" || sourceHash(entry.sourceHa) !== entry?.sourceHash,
        `${label}: sourceHash is not self-consistent with sourceHa`,
        violations
      );
      pushIf(
        sourceHash(liveSourceHa) !== entry?.sourceHash,
        `${label}: sourceHash does not match live content`,
        violations
      );
    }

    if (entry?.status === "deferred") {
      pushIf(
        entry.reviewedAjami !== null || entry.reviewer !== null || entry.reviewDate !== null,
        `${label}: deferred entries require reviewedAjami, reviewer, and reviewDate to all be null`,
        violations
      );
    } else if (entry?.status === "approved") {
      pushIf(
        !isNonEmptyString(entry.reviewedAjami) || !isNonEmptyString(entry.reviewer) ||
          !REVIEW_DATE_RE.test(entry.reviewDate ?? ""),
        `${label}: approved entries require non-empty reviewedAjami and reviewer plus reviewDate YYYY-MM-DD`,
        violations
      );
    } else {
      violations.push(`${label}: status must be approved or deferred`);
    }

    if (entry?.reviewedAjami != null) {
      pushIf(
        typeof entry.reviewedAjami !== "string" || entry.reviewedAjami !== entry.reviewedAjami.normalize("NFC"),
        `${label}: reviewedAjami must be NFC-normalized`,
        violations
      );
      if (typeof entry.reviewedAjami === "string") {
        try {
          assertCleanAjami(entry.reviewedAjami);
        } catch (error) {
          violations.push(`${label}: reviewedAjami is not clean Ajami: ${error.message}`);
        }
      }
    }

    pushIf(!CATEGORIES.has(entry?.category), `${label}: category is not a defined enum value`, violations);
  }

  return { ok: violations.length === 0, violations };
}

export function loadHumanReviewedProsePacket(packetPath = HUMAN_REVIEWED_PROSE_PATH) {
  if (!fs.existsSync(packetPath)) return structuredClone(EMPTY_HUMAN_REVIEWED_PROSE_PACKET);
  return JSON.parse(fs.readFileSync(packetPath, "utf8"));
}

export function runHumanReviewedProseGate(packet, liveContent) {
  const resolvedPacket = packet ?? loadHumanReviewedProsePacket();
  const resolvedContent = liveContent ?? JSON.parse(fs.readFileSync(CONTENT_PATH, "utf8"));
  const { ok, violations } = validateHumanReviewedProse(resolvedPacket, resolvedContent);
  if (!ok) {
    throw new Error(
      `HUMAN-REVIEWED-PROSE GATE FAILED (${violations.length} issue${violations.length === 1 ? "" : "s"})\n- ` +
        violations.join("\n- ")
    );
  }
  const approvedCount = resolvedPacket.entries.filter((entry) => entry.status === "approved").length;
  const deferredCount = resolvedPacket.entries.filter((entry) => entry.status === "deferred").length;
  return `HUMAN-REVIEWED-PROSE GATE OK: ${resolvedPacket.entries.length} entries validated: ${approvedCount} approved, ${deferredCount} deferred`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(runHumanReviewedProseGate());
}
