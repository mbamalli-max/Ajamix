#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

import { formatCodePoints } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");
const FONT_PATH = path.join(REPO_ROOT, "app", "fonts", "NotoNaskhArabic-Regular.woff2");
const DEFAULT_OUTPUT = path.join(MODULE_DIR, "data", "font-probe-report.json");

export const FONT_PROBE_TARGETS = Object.freeze(
  Array.from("ݑ ط ث ک ࢼ ࢻ ڟ ࢽ ی ؿ ح ه ݣ ࣃ ࣄ".split(" ").join(""))
);

const WOFF2_KNOWN_TAGS = [
  "cmap", "head", "hhea", "hmtx", "maxp", "name", "OS/2", "post",
  "cvt ", "fpgm", "glyf", "loca", "prep", "CFF ", "VORG", "EBDT",
  "EBLC", "gasp", "hdmx", "kern", "LTSH", "PCLT", "VDMX", "vhea",
  "vmtx", "BASE", "GDEF", "GPOS", "GSUB", "EBSC", "JSTF", "MATH",
  "CBDT", "CBLC", "COLR", "CPAL", "SVG ", "sbix", "acnt", "avar",
  "bdat", "bloc", "bsln", "cvar", "fdsc", "feat", "fmtx", "fvar",
  "gvar", "hsty", "just", "lcar", "mort", "morx", "opbd", "prop",
  "trak", "Zapf", "Silf", "Glat", "Gloc", "Feat", "Sill",
];

function readUIntBase128(buffer, state) {
  let value = 0;
  for (let count = 0; count < 5; count += 1) {
    if (state.offset >= buffer.length) throw new Error("truncated UIntBase128");
    const byte = buffer[state.offset++];
    if (count === 0 && byte === 0x80) throw new Error("invalid leading UIntBase128 zero");
    if (value & 0xfe000000) throw new Error("UIntBase128 overflow");
    value = value * 128 + (byte & 0x7f);
    if ((byte & 0x80) === 0) return value;
  }
  throw new Error("UIntBase128 exceeds five bytes");
}

function readTag(buffer, state, tagIndex) {
  if (tagIndex !== 0x3f) {
    const tag = WOFF2_KNOWN_TAGS[tagIndex];
    if (!tag) throw new Error(`unsupported predefined WOFF2 tag index ${tagIndex}`);
    return tag;
  }
  if (state.offset + 4 > buffer.length) throw new Error("truncated explicit WOFF2 tag");
  const tag = buffer.toString("ascii", state.offset, state.offset + 4);
  state.offset += 4;
  return tag;
}

function tableIsTransformed(tag, transformVersion) {
  if (tag === "glyf" || tag === "loca") return transformVersion === 0;
  if (tag === "hmtx") return transformVersion === 1;
  return false;
}

export function parseWoff2Directory(buffer) {
  if (buffer.length < 48 || buffer.toString("ascii", 0, 4) !== "wOF2") {
    throw new Error("file is not a valid WOFF2 container");
  }
  const declaredLength = buffer.readUInt32BE(8);
  if (declaredLength !== buffer.length) {
    throw new Error(`WOFF2 length mismatch: header ${declaredLength}, file ${buffer.length}`);
  }
  const numTables = buffer.readUInt16BE(12);
  const totalCompressedSize = buffer.readUInt32BE(20);
  const state = { offset: 48 };
  const tables = [];
  let transformedOffset = 0;

  for (let index = 0; index < numTables; index += 1) {
    const flags = buffer[state.offset++];
    if (flags === undefined) throw new Error("truncated WOFF2 table directory");
    const tagIndex = flags & 0x3f;
    const transformVersion = flags >>> 6;
    const tag = readTag(buffer, state, tagIndex);
    const originalLength = readUIntBase128(buffer, state);
    const transformed = tableIsTransformed(tag, transformVersion);
    const transformedLength = transformed
      ? readUIntBase128(buffer, state)
      : originalLength;
    tables.push({
      tag,
      transformVersion,
      transformed,
      originalLength,
      transformedLength,
      transformedOffset,
    });
    transformedOffset += transformedLength;
  }

  if (state.offset + totalCompressedSize > buffer.length) {
    throw new Error("truncated WOFF2 Brotli stream");
  }
  return {
    flavor: `0x${buffer.readUInt32BE(4).toString(16).toUpperCase().padStart(8, "0")}`,
    numTables,
    totalSfntSize: buffer.readUInt32BE(16),
    totalCompressedSize,
    compressedOffset: state.offset,
    transformedDataSize: transformedOffset,
    tables,
  };
}

function cmapFormat4Glyph(view, offset, codePoint) {
  const length = view.getUint16(offset + 2);
  const end = offset + length;
  if (end > view.byteLength) throw new Error("truncated cmap format 4");
  const segCount = view.getUint16(offset + 6) / 2;
  const endCodeOffset = offset + 14;
  const startCodeOffset = endCodeOffset + segCount * 2 + 2;
  const idDeltaOffset = startCodeOffset + segCount * 2;
  const idRangeOffsetOffset = idDeltaOffset + segCount * 2;

  for (let segment = 0; segment < segCount; segment += 1) {
    const endCode = view.getUint16(endCodeOffset + segment * 2);
    const startCode = view.getUint16(startCodeOffset + segment * 2);
    if (codePoint < startCode || codePoint > endCode) continue;
    const delta = view.getInt16(idDeltaOffset + segment * 2);
    const rangeWordAddress = idRangeOffsetOffset + segment * 2;
    const rangeOffset = view.getUint16(rangeWordAddress);
    if (rangeOffset === 0) return (codePoint + delta) & 0xffff;
    const glyphAddress = rangeWordAddress + rangeOffset + (codePoint - startCode) * 2;
    if (glyphAddress + 2 > end) return 0;
    const glyph = view.getUint16(glyphAddress);
    return glyph === 0 ? 0 : (glyph + delta) & 0xffff;
  }
  return 0;
}

function cmapFormat12Or13Glyph(view, offset, codePoint, format) {
  const length = view.getUint32(offset + 4);
  if (offset + length > view.byteLength) throw new Error(`truncated cmap format ${format}`);
  const groups = view.getUint32(offset + 12);
  let low = 0;
  let high = groups - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const groupOffset = offset + 16 + middle * 12;
    const start = view.getUint32(groupOffset);
    const end = view.getUint32(groupOffset + 4);
    if (codePoint < start) {
      high = middle - 1;
    } else if (codePoint > end) {
      low = middle + 1;
    } else {
      const startGlyph = view.getUint32(groupOffset + 8);
      return format === 12 ? startGlyph + (codePoint - start) : startGlyph;
    }
  }
  return 0;
}

export function parseCmap(cmapBuffer, targets) {
  const view = new DataView(
    cmapBuffer.buffer,
    cmapBuffer.byteOffset,
    cmapBuffer.byteLength
  );
  if (view.byteLength < 4 || view.getUint16(0) !== 0) {
    throw new Error("unsupported or truncated cmap header");
  }
  const numSubtables = view.getUint16(2);
  const subtables = [];
  for (let index = 0; index < numSubtables; index += 1) {
    const recordOffset = 4 + index * 8;
    if (recordOffset + 8 > view.byteLength) throw new Error("truncated cmap encoding record");
    const platformId = view.getUint16(recordOffset);
    const encodingId = view.getUint16(recordOffset + 2);
    const offset = view.getUint32(recordOffset + 4);
    if (offset + 2 > view.byteLength) continue;
    const format = view.getUint16(offset);
    if ([4, 12, 13].includes(format)) {
      subtables.push({ platformId, encodingId, offset, format });
    }
  }
  subtables.sort((left, right) => {
    const rank = (item) =>
      item.format === 12 && item.platformId === 3 && item.encodingId === 10 ? 0 :
      item.format === 12 ? 1 :
      item.format === 4 && item.platformId === 3 ? 2 :
      item.format === 4 ? 3 : 4;
    return rank(left) - rank(right);
  });
  if (!subtables.length) throw new Error("no supported cmap format 4/12/13 subtable");

  return targets.map((character) => {
    const codePoint = character.codePointAt(0);
    let glyphId = 0;
    let subtable = null;
    for (const candidate of subtables) {
      glyphId = candidate.format === 4
        ? cmapFormat4Glyph(view, candidate.offset, codePoint)
        : cmapFormat12Or13Glyph(view, candidate.offset, codePoint, candidate.format);
      if (glyphId) {
        subtable = candidate;
        break;
      }
    }
    return {
      character,
      codePoint: formatCodePoints(character)[0],
      nominalGlyphPresent: glyphId > 0,
      glyphId: glyphId || null,
      cmapSubtable: subtable
        ? {
            format: subtable.format,
            platformId: subtable.platformId,
            encodingId: subtable.encodingId,
          }
        : null,
    };
  });
}

export function probeWoff2Coverage(fontPath, targets) {
  const buffer = fs.readFileSync(fontPath);
  const directory = parseWoff2Directory(buffer);
  const cmap = directory.tables.find((table) => table.tag === "cmap");
  if (!cmap) throw new Error("WOFF2 contains no cmap table");
  if (cmap.transformed) {
    throw new Error("cmap is transformed; this dependency-free parser cannot reconstruct it");
  }
  const compressed = buffer.subarray(
    directory.compressedOffset,
    directory.compressedOffset + directory.totalCompressedSize
  );
  const transformedData = zlib.brotliDecompressSync(compressed);
  if (transformedData.length !== directory.transformedDataSize) {
    throw new Error(
      `decompressed table stream length mismatch: expected ${directory.transformedDataSize}, got ${transformedData.length}`
    );
  }
  const cmapBuffer = transformedData.subarray(
    cmap.transformedOffset,
    cmap.transformedOffset + cmap.originalLength
  );
  return {
    directory,
    cmap,
    transformedDataSize: transformedData.length,
    coverage: parseCmap(cmapBuffer, targets),
  };
}

export function readUntransformedWoff2Tables(fontPath, requestedTags) {
  const buffer = fs.readFileSync(fontPath);
  const directory = parseWoff2Directory(buffer);
  const compressed = buffer.subarray(
    directory.compressedOffset,
    directory.compressedOffset + directory.totalCompressedSize
  );
  const transformedData = zlib.brotliDecompressSync(compressed);
  if (transformedData.length !== directory.transformedDataSize) {
    throw new Error(
      `decompressed table stream length mismatch: expected ${directory.transformedDataSize}, got ${transformedData.length}`
    );
  }
  const tables = {};
  for (const tag of requestedTags) {
    const table = directory.tables.find((candidate) => candidate.tag === tag);
    if (!table) throw new Error(`WOFF2 contains no ${tag} table`);
    if (table.transformed) {
      throw new Error(`${tag} is transformed and cannot be returned verbatim`);
    }
    tables[tag] = transformedData.subarray(
      table.transformedOffset,
      table.transformedOffset + table.originalLength
    );
  }
  return { directory, tables };
}

export function probeFont(fontPath = FONT_PATH) {
  const report = {
    schemaVersion: 1,
    taskId: "2026-07-28-slice-36",
    font: path.relative(REPO_ROOT, fontPath),
    targets: FONT_PROBE_TARGETS.map((character) => ({
      character,
      codePoint: formatCodePoints(character)[0],
    })),
    staticAnalysis: {
      attempted: true,
      parser: "dependency-free Node WOFF2 directory + Brotli + untransformed cmap parser",
      success: false,
      determinable:
        "If parsing succeeds, cmap can verify only whether each code point maps to a nonzero nominal glyph ID.",
      notDeterminable:
        "cmap alone cannot verify isolated/initial/medial/final shaping, GSUB substitutions, GPOS mark placement, glyph outline quality, tofu visibility, or whether browser fallback is used.",
      error: null,
      container: null,
      coverage: [],
    },
    visualVerification: {
      status: "pending_human_browser_review",
      probePage: "tools/ajami-pipeline/font-probe.html",
      requiredChecks: [
        "isolated form",
        "initial form",
        "medial form",
        "final form",
        "sukun U+0652 placement",
        "shadda U+0651 placement",
        "short-e U+065C placement",
        "comparison against deliberately missing-font fallback control",
      ],
    },
  };

  try {
    const {
      directory,
      cmap,
      transformedDataSize,
      coverage,
    } = probeWoff2Coverage(fontPath, FONT_PROBE_TARGETS);
    report.staticAnalysis.success = true;
    report.staticAnalysis.container = {
      signature: "wOF2",
      flavor: directory.flavor,
      tableCount: directory.numTables,
      totalSfntSize: directory.totalSfntSize,
      totalCompressedSize: directory.totalCompressedSize,
      decompressedTableStreamSize: transformedDataSize,
      cmapOriginalLength: cmap.originalLength,
      cmapTransformVersion: cmap.transformVersion,
      cmapTransformed: cmap.transformed,
    };
    report.staticAnalysis.coverage = coverage;
    report.staticAnalysis.verifiedNominalGlyphCount = coverage.filter(
      (item) => item.nominalGlyphPresent
    ).length;
    report.staticAnalysis.missingNominalGlyphCount = coverage.filter(
      (item) => !item.nominalGlyphPresent
    ).length;
  } catch (error) {
    report.staticAnalysis.error = error instanceof Error ? error.message : String(error);
  }
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputFlag = process.argv.indexOf("--write");
  const outputPath = outputFlag >= 0 && process.argv[outputFlag + 1]
    ? path.resolve(process.cwd(), process.argv[outputFlag + 1])
    : DEFAULT_OUTPUT;
  const report = probeFont();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    output: path.relative(REPO_ROOT, outputPath),
    staticAnalysis: report.staticAnalysis,
    visualVerification: report.visualVerification,
  }, null, 2));
}
