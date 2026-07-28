#!/usr/bin/env node
// Guarded, idempotent conversion of the tracked curriculum-image masters.
// PNG masters remain untouched; only sibling WebP delivery files are written.
import { readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(here, "../..");
const IMAGES_DIR = resolve(REPO, "app/images");
const EXPECTED_IMAGE_COUNT = 359;

function fail(message) {
  throw new Error(`png-to-webp: ${message}`);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MiB`;
}

function expectedDimensions(metadata) {
  assert(Number.isInteger(metadata.width) && Number.isInteger(metadata.height), "source image metadata lacks pixel dimensions.");
  if (metadata.width <= 1024) return { width: metadata.width, height: metadata.height };
  return {
    width: 1024,
    height: Math.round(metadata.height * 1024 / metadata.width),
  };
}

async function verifyOutput(sourcePath, outputPath) {
  const source = await sharp(sourcePath).metadata();
  const expected = expectedDimensions(source);
  const outputStat = statSync(outputPath);
  assert(outputStat.size > 0, `${outputPath}: output is zero-length.`);
  const output = await sharp(outputPath).metadata();
  assert(output.format === "webp", `${outputPath}: expected WebP, got ${output.format || "unknown"}.`);
  assert(
    output.width === expected.width && output.height === expected.height,
    `${outputPath}: expected ${expected.width}x${expected.height}, got ${output.width}x${output.height}.`,
  );
  return { sourceSize: statSync(sourcePath).size, outputSize: outputStat.size, expected };
}

async function main() {
  const entries = readdirSync(IMAGES_DIR, { withFileTypes: true });
  const unexpected = entries.filter((entry) => !entry.isFile() || (!entry.name.endsWith(".png") && !entry.name.endsWith(".webp")));
  assert(unexpected.length === 0, `unexpected entries in app/images: ${unexpected.map((entry) => entry.name).join(", ")}`);

  const pngs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".png"))
    .map((entry) => entry.name)
    .sort();
  assert(pngs.length === EXPECTED_IMAGE_COUNT, `expected ${EXPECTED_IMAGE_COUNT} PNG masters, found ${pngs.length}.`);
  assert(!pngs.some((name) => name.endsWith(" 2.png")), "iCloud duplicate PNG detected; refusing to convert.");

  const converted = [];
  const skipped = [];
  for (const pngName of pngs) {
    const sourcePath = resolve(IMAGES_DIR, pngName);
    const outputName = `${pngName.slice(0, -4)}.webp`;
    const outputPath = resolve(IMAGES_DIR, outputName);
    const sourceStat = statSync(sourcePath);
    const outputExists = entries.some((entry) => entry.name === outputName);

    if (outputExists && statSync(outputPath).mtimeMs >= sourceStat.mtimeMs) {
      skipped.push(pngName);
      console.log(`SKIP    ${pngName}  ${formatBytes(sourceStat.size)} -> ${formatBytes(statSync(outputPath).size)}`);
      continue;
    }

    try {
      await sharp(sourcePath)
        .resize({ width: 1024, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outputPath);
      assert(statSync(outputPath).size > 0, `${outputName}: output is zero-length after conversion.`);
      converted.push(pngName);
      console.log(`CONVERT ${pngName}  ${formatBytes(sourceStat.size)} -> ${formatBytes(statSync(outputPath).size)}`);
    } catch (error) {
      fail(`${pngName}: conversion failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // A separate full pass makes verification independent of the mtime skip path.
  let totalSourceSize = 0;
  let totalOutputSize = 0;
  for (const pngName of pngs) {
    const sourcePath = resolve(IMAGES_DIR, pngName);
    const outputPath = resolve(IMAGES_DIR, `${pngName.slice(0, -4)}.webp`);
    assert(statSync(outputPath).size > 0, `${pngName}: missing or zero-length WebP output.`);
    try {
      const result = await verifyOutput(sourcePath, outputPath);
      totalSourceSize += result.sourceSize;
      totalOutputSize += result.outputSize;
    } catch (error) {
      fail(`${pngName}: verification failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const reduction = (1 - totalOutputSize / totalSourceSize) * 100;
  console.log(`png-to-webp: ${converted.length} converted, ${skipped.length} up-to-date, ${pngs.length}/${EXPECTED_IMAGE_COUNT} WebP files verified.`);
  console.log(`png-to-webp: total ${formatBytes(totalSourceSize)} -> ${formatBytes(totalOutputSize)} (${reduction.toFixed(2)}% reduction).`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
