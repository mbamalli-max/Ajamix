#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const contentPath = path.join(__dirname, "..", "app", "content.json");

function normalizeAssetPath(value, expectedPrefix) {
  if (value == null) {
    return value;
  }

  if (typeof value !== "string") {
    return value;
  }

  let normalized = value;

  if (normalized.startsWith("/app/assets/")) {
    normalized = normalized.slice("/app/assets/".length);
  } else if (normalized.startsWith("/app/")) {
    normalized = normalized.slice("/app/".length);
  } else if (normalized.startsWith("/")) {
    normalized = normalized.slice(1);
  }

  if (normalized.startsWith(expectedPrefix + "/")) {
    return normalized;
  }

  const prefixIndex = normalized.indexOf(expectedPrefix + "/");
  if (prefixIndex >= 0) {
    return normalized.slice(prefixIndex);
  }

  return normalized;
}

function updateEntry(entry) {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  let changed = false;

  if ("audioFile" in entry) {
    const nextAudioFile = normalizeAssetPath(entry.audioFile, "audio");
    if (nextAudioFile !== entry.audioFile) {
      entry.audioFile = nextAudioFile;
      changed = true;
    }
  }

  if ("imageCard" in entry) {
    const nextImageCard = normalizeAssetPath(entry.imageCard, "images");
    if (nextImageCard !== entry.imageCard) {
      entry.imageCard = nextImageCard;
      changed = true;
    }
  }

  return changed;
}

function main() {
  const raw = fs.readFileSync(contentPath, "utf8");
  const content = JSON.parse(raw);
  let updatedCount = 0;
  let unchangedCount = 0;

  for (const collectionName of ["modules", "activities"]) {
    const collection = content[collectionName];
    if (!Array.isArray(collection)) {
      continue;
    }

    for (const entry of collection) {
      if (updateEntry(entry)) {
        updatedCount += 1;
      } else {
        unchangedCount += 1;
      }
    }
  }

  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2) + "\n");
  console.log(`${updatedCount} modules updated, ${unchangedCount} unchanged`);
}

main();
