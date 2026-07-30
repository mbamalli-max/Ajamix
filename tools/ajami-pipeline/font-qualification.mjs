#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  FONT_PROBE_TARGETS,
  probeWoff2Coverage,
  readUntransformedWoff2Tables,
} from "./font-probe.mjs";
import { formatCodePoints } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..");
const FONT_DIR = path.join(MODULE_DIR, "fonts", "harmattan-4.400");
const DEFAULT_OUTPUT = path.join(MODULE_DIR, "data", "font-qualification-report.json");
const JAVA_HOME = "/Library/Java/JavaVirtualMachines/jdk-23.jdk/Contents/Home";
const JAVA = path.join(JAVA_HOME, "bin", "java");
const JAVAC = path.join(JAVA_HOME, "bin", "javac");
const JAVA_SOURCE = path.join(MODULE_DIR, "HarfBuzzProbe.java");
const CANDIDATE_CORPUS = path.join(MODULE_DIR, "data", "candidate-corpus.json");
const UPEM = 2048;

export const QUALIFICATION_TARGETS = Object.freeze(
  FONT_PROBE_TARGETS.map((character) => character.codePointAt(0))
);

// The 15 approved mark/letter entries in §7 plus the provisional word-initial
// short-e carrier U+0639 make the 16-item qualification inventory.
export const REQUIRED_MARKS_AND_CARRIERS = Object.freeze([
  0x064e, 0x0650, 0x064f, 0x065c, 0x0652, 0x0651, 0x0670, 0x0654,
  0x0655, 0x0627, 0x0623, 0x0625, 0x0648, 0x0649, 0x06cc, 0x0639,
]);

const COMBINING_MARKS = new Set([
  0x064e, 0x064f, 0x0650, 0x0651, 0x0652, 0x0654, 0x0655, 0x065c, 0x0670,
]);

const WEIGHTS = Object.freeze([
  { name: "Regular", cssWeight: 400, file: "Harmattan-Regular.woff2" },
  { name: "Medium", cssWeight: 500, file: "Harmattan-Medium.woff2" },
  { name: "SemiBold", cssWeight: 600, file: "Harmattan-SemiBold.woff2" },
  { name: "Bold", cssWeight: 700, file: "Harmattan-Bold.woff2" },
]);

function fail(command, result) {
  const detail = result.stderr?.toString().trim() || result.stdout?.toString().trim();
  throw new Error(`${command} failed (${result.status}): ${detail}`);
}

function fixed16_16(value) {
  return value / 65536;
}

function utf16be(buffer) {
  const swapped = Buffer.allocUnsafe(buffer.length);
  for (let index = 0; index + 1 < buffer.length; index += 2) {
    swapped[index] = buffer[index + 1];
    swapped[index + 1] = buffer[index];
  }
  return swapped.toString("utf16le").replace(/\0/g, "");
}

function parseNames(buffer) {
  const count = buffer.readUInt16BE(2);
  const storageOffset = buffer.readUInt16BE(4);
  const wanted = new Map([
    [1, "family"],
    [2, "subfamily"],
    [4, "fullName"],
    [5, "version"],
    [16, "typographicFamily"],
    [17, "typographicSubfamily"],
  ]);
  const values = Object.fromEntries(Array.from(wanted.values(), (key) => [key, []]));
  for (let index = 0; index < count; index += 1) {
    const offset = 6 + index * 12;
    const platformId = buffer.readUInt16BE(offset);
    const nameId = buffer.readUInt16BE(offset + 6);
    const length = buffer.readUInt16BE(offset + 8);
    const stringOffset = buffer.readUInt16BE(offset + 10);
    if (!wanted.has(nameId) || ![0, 3].includes(platformId)) continue;
    const start = storageOffset + stringOffset;
    const value = utf16be(buffer.subarray(start, start + length));
    const key = wanted.get(nameId);
    if (value && !values[key].includes(value)) values[key].push(value);
  }
  return values;
}

function parseMetadata(fontPath) {
  const { directory, tables } = readUntransformedWoff2Tables(
    fontPath,
    ["head", "OS/2", "hhea", "maxp", "name"]
  );
  const head = tables.head;
  const os2 = tables["OS/2"];
  const hhea = tables.hhea;
  return {
    names: parseNames(tables.name),
    head: {
      fontRevision: fixed16_16(head.readUInt32BE(4)),
      flags: head.readUInt16BE(16),
      unitsPerEm: head.readUInt16BE(18),
      xMin: head.readInt16BE(36),
      yMin: head.readInt16BE(38),
      xMax: head.readInt16BE(40),
      yMax: head.readInt16BE(42),
      macStyle: head.readUInt16BE(44),
      lowestRecPPEM: head.readUInt16BE(46),
    },
    os2: {
      version: os2.readUInt16BE(0),
      usWeightClass: os2.readUInt16BE(4),
      usWidthClass: os2.readUInt16BE(6),
      fsType: os2.readUInt16BE(8),
      unicodeRanges: [42, 46, 50, 54].map((offset) => os2.readUInt32BE(offset)),
      vendorId: os2.toString("ascii", 58, 62),
      fsSelection: os2.readUInt16BE(62),
      typoAscender: os2.readInt16BE(68),
      typoDescender: os2.readInt16BE(70),
      typoLineGap: os2.readInt16BE(72),
      winAscent: os2.readUInt16BE(74),
      winDescent: os2.readUInt16BE(76),
      xHeight: os2.length >= 88 ? os2.readInt16BE(86) : null,
      capHeight: os2.length >= 90 ? os2.readInt16BE(88) : null,
    },
    hhea: {
      ascent: hhea.readInt16BE(4),
      descent: hhea.readInt16BE(6),
      lineGap: hhea.readInt16BE(8),
      advanceWidthMax: hhea.readUInt16BE(10),
    },
    glyphCount: tables.maxp.readUInt16BE(4),
    tableCount: directory.numTables,
    tableTags: directory.tables.map((table) => table.tag),
  };
}

function makeSyntheticCases() {
  const definitions = [
    ["isolated", (x) => x],
    ["final_after_ba", (x) => `ب${x}`],
    ["initial_before_ba", (x) => `${x}ب`],
    ["medial_between_ba", (x) => `ب${x}ب`],
    ["fatha_realistic", (x) => `بَ${x}َـ`],
    ["sukun", (x) => `ب${x}ْ`],
    ["shadda", (x) => `ب${x}ّ`],
    ["short_e", (x) => `ب${x}ٜ`],
    ["kasra", (x) => `ب${x}ِ`],
    ["damma", (x) => `ب${x}ُ`],
    ["fatha", (x) => `ب${x}َ`],
    ["shadda_fatha_stack", (x) => `ب${x}َّ`],
    ["shadda_kasra_stack", (x) => `ب${x}ِّ`],
    ["shadda_damma_stack", (x) => `ب${x}ُّ`],
    ["dagger_alif", (x) => `ب${x}ٰ`],
    ["long_a", (x) => `ب${x}َا`],
    ["long_i", (x) => `ب${x}ِى`],
    ["long_u", (x) => `ب${x}ُو`],
    ["long_e", (x) => `ب${x}ٜىٰ`],
    ["long_o", (x) => `ب${x}ُواْ`],
    ["diphthong_ai", (x) => `ب${x}َیْ`],
    ["diphthong_au", (x) => `ب${x}َوْ`],
    ["initial_short_e_carrier", (x) => `عٜ${x}`],
    ["initial_fatha_carrier", (x) => `أَ${x}`],
    ["initial_kasra_carrier", (x) => `إِ${x}`],
    ["fatha_dagger_stack", (x) => `ب${x}َٰ`],
    ["adjacent_marked_syllables", (x) => `ب${x}ْ ب${x}ٜ`],
  ];
  const cases = [];
  for (const codePoint of QUALIFICATION_TARGETS) {
    const character = String.fromCodePoint(codePoint);
    for (const [pattern, build] of definitions) {
      const text = build(character);
      cases.push({
        id: `synthetic-${codePoint.toString(16).toUpperCase()}-${pattern}`,
        kind: "synthetic",
        pattern,
        target: character,
        targetCodePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
        text,
      });
    }
  }
  return cases;
}

function makeCorpusCases() {
  const corpus = JSON.parse(fs.readFileSync(CANDIDATE_CORPUS, "utf8"));
  return corpus.candidates
    .filter((candidate) => candidate.provisionalAjami?.text)
    .map((candidate) => ({
      id: `corpus-${candidate.candidateId}`,
      kind: "candidate_corpus_word",
      pattern: "real_hausa_candidate",
      candidateId: candidate.candidateId,
      boko: candidate.boko,
      reviewStatus: candidate.reviewStatus,
      text: candidate.provisionalAjami.text,
      warning: "candidate corpus spelling is provisional and is shaped only as a realistic font run",
    }));
}

function utf16CodePointRecords(text) {
  const records = [];
  let clusterStart = 0;
  for (let index = 0; index < text.length;) {
    const codePoint = text.codePointAt(index);
    if (!COMBINING_MARKS.has(codePoint)) clusterStart = index;
    records.push({
      character: String.fromCodePoint(codePoint),
      codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
      utf16Index: index,
      combiningMark: COMBINING_MARKS.has(codePoint),
      harfBuzzClusterStart: clusterStart,
    });
    index += codePoint > 0xffff ? 2 : 1;
  }
  return records;
}

function parseGlyphRecord(record) {
  const [
    glyphId,
    charIndex,
    originX,
    originY,
    positionedDeltaX,
    positionedDeltaY,
    nominalAdvanceX,
    offsetFromNominalX,
    offsetY,
  ] = record.split(",").map(Number);
  return {
    glyphId,
    charIndex,
    advance: { x: nominalAdvanceX, y: 0 },
    positionedOrigin: { x: originX, y: originY },
    positionedDeltaToNext: { x: positionedDeltaX, y: positionedDeltaY },
    offset: { x: offsetFromNominalX, y: offsetY },
  };
}

function runJavaProbe(ttfPath, cases, tempDirectory) {
  const input = cases
    .map((item) => `${item.id}\t${Buffer.from(item.text).toString("base64")}`)
    .join("\n") + "\n";
  const result = spawnSync(
    JAVA,
    [
      "--enable-native-access=java.desktop",
      "-Dsun.font.layout.ffm=true",
      "-cp",
      tempDirectory,
      "HarfBuzzProbe",
      ttfPath,
    ],
    { input, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
  if (result.status !== 0) fail("HarfBuzz Java probe", result);
  const byId = new Map();
  for (const line of result.stdout.trim().split("\n")) {
    const [id, glyphCount, layoutFlags, totalX, totalY, glyphText = ""] = line.split("\t");
    byId.set(id, {
      glyphCount: Number(glyphCount),
      layoutFlags: Number(layoutFlags),
      totalAdvance: { x: Number(totalX), y: Number(totalY) },
      glyphs: glyphText ? glyphText.split(";").map(parseGlyphRecord) : [],
    });
  }
  return byId;
}

function assessCase(item, shaped) {
  const codePoints = utf16CodePointRecords(item.text);
  const notdefGlyphIndices = shaped.glyphs
    .map((glyph, index) => glyph.glyphId === 0 ? index : -1)
    .filter((index) => index >= 0);
  const markAnchors = codePoints
    .filter((record) => record.combiningMark)
    .map((mark) => {
      const glyphs = shaped.glyphs.filter(
        (glyph) =>
          glyph.charIndex >= mark.harfBuzzClusterStart &&
          glyph.charIndex <= mark.utf16Index &&
          glyph.advance.x === 0
      );
      const positioned = glyphs.some(
        (glyph) => Math.abs(glyph.offset.x) >= 0.5 || Math.abs(glyph.offset.y) >= 0.5
      );
      const plausible = glyphs.every(
        (glyph) =>
          Math.abs(glyph.offset.x) <= UPEM * 2 &&
          Math.abs(glyph.offset.y) <= UPEM * 2
      );
      return {
        ...mark,
        clusterNote:
          "HarfBuzz may assign a mark or substituted mark-stack glyph to the grapheme base cluster",
        glyphIds: glyphs.map((glyph) => glyph.glyphId),
        offsets: glyphs.map((glyph) => glyph.offset),
        zeroAdvanceGlyphFound: glyphs.length > 0,
        nonZeroPositioning: positioned,
        plausibleRange: plausible,
        pass: glyphs.length > 0 && positioned && plausible,
      };
    });
  return {
    ...item,
    codePoints,
    outputGlyphIds: shaped.glyphs.map((glyph) => glyph.glyphId),
    glyphs: shaped.glyphs,
    totalAdvance: shaped.totalAdvance,
    layoutFlags: shaped.layoutFlags,
    notdefGlyphIndices,
    noNotdef: notdefGlyphIndices.length === 0,
    markAnchors,
    markAnchorsPass: markAnchors.every((mark) => mark.pass),
    pass: notdefGlyphIndices.length === 0 && markAnchors.every((mark) => mark.pass),
  };
}

function joiningAssessment(results) {
  const simplePatterns = [
    "isolated",
    "final_after_ba",
    "initial_before_ba",
    "medial_between_ba",
  ];
  return QUALIFICATION_TARGETS.map((codePoint) => {
    const target = String.fromCodePoint(codePoint);
    const forms = {};
    for (const pattern of simplePatterns) {
      const result = results.find(
        (item) => item.target === target && item.pattern === pattern
      );
      const targetIndex = result.codePoints.find(
        (record) => record.codePoint === result.targetCodePoint
      ).utf16Index;
      forms[pattern] = result.glyphs
        .filter((glyph) => glyph.charIndex === targetIndex)
        .map((glyph) => glyph.glyphId);
    }
    const primaryGlyphs = simplePatterns.map((pattern) => forms[pattern][0]);
    return {
      target,
      codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
      forms,
      uniquePrimaryGlyphIds: Array.from(new Set(primaryGlyphs)),
      allFourContextualFormsDistinct:
        primaryGlyphs.every((glyphId) => Number.isInteger(glyphId) && glyphId > 0) &&
        new Set(primaryGlyphs).size === 4,
    };
  });
}

function reconstructSfnt(woff2Path, ttfPath) {
  const program = [
    "from fontTools.ttLib import TTFont",
    "import sys",
    "font=TTFont(sys.argv[1])",
    "font.flavor=None",
    "font.save(sys.argv[2])",
  ].join(";");
  const result = spawnSync("python3", ["-c", program, woff2Path, ttfPath], {
    encoding: "utf8",
  });
  if (result.status !== 0) fail("fontTools temporary SFNT reconstruction", result);
}

function expectedHashes() {
  const text = fs.readFileSync(path.join(FONT_DIR, "SHA256SUMS.txt"), "utf8");
  return new Map(
    text.trim().split("\n").map((line) => {
      const [hash, file] = line.trim().split(/\s+/, 2);
      return [file, hash];
    })
  );
}

function version(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) fail(`${command} version`, result);
  return (result.stdout || result.stderr).trim().split("\n")[0];
}

export function qualifyFonts() {
  const startedAt = new Date().toISOString();
  const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ajamix-font-qualification-"));
  const syntheticCases = makeSyntheticCases();
  const corpusCases = makeCorpusCases();
  const allCases = [...syntheticCases, ...corpusCases];
  const hashes = expectedHashes();
  const compile = spawnSync(JAVAC, ["-d", tempDirectory, JAVA_SOURCE], { encoding: "utf8" });
  if (compile.status !== 0) fail("HarfBuzz probe compilation", compile);

  const report = {
    schemaVersion: 1,
    taskId: "2026-07-28-slice-37",
    status: "font_qualification_only",
    startedAt,
    method: {
      coverage:
        "dependency-free direct WOFF2 directory/Brotli/cmap format 4/12/13 parser; independent of fontTools cmap",
      shaping:
        "JDK 23 java.desktop HarfBuzz 8.2.2 through RTL Font.layoutGlyphVector with sun.font.layout.ffm=true",
      sfntReconstruction:
        "fontTools reconstructs a temporary unflavored full SFNT from each unchanged WOFF2; no tables are subset, stripped, renamed, or written into the repository",
      markAnchorDetection:
        "each combining-mark character must produce a glyph-ID-nonzero, zero-advance glyph with nonzero x/y positioning inside ±2 UPEM",
      advanceAndOffsetSemantics:
        "advance is the nominal glyph advance supplied to HarfBuzz; offset is the shaped origin relative to the same glyph sequence without layout; mark offsets are direct GPOS evidence because mark advances are zero",
    },
    toolVersions: {
      java: version(JAVA, ["-version"]),
      fontTools: version("python3", ["-c", "import fontTools; print(fontTools.__version__)"]),
      harfBuzz: "8.2.2 (bundled in JDK java.desktop; see JDK legal/java.desktop/harfbuzz.md)",
    },
    targetInventory: QUALIFICATION_TARGETS.map((codePoint) => ({
      character: String.fromCodePoint(codePoint),
      codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
    })),
    markAndCarrierInventory: REQUIRED_MARKS_AND_CARRIERS.map((codePoint) => ({
      character: String.fromCodePoint(codePoint),
      codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
    })),
    syntheticCaseCountPerWeight: syntheticCases.length,
    corpusCaseCountPerWeight: corpusCases.length,
    corpusNotice:
      "candidate-corpus.json is not a gold standard; these strings are realistic shaping inputs only",
    weights: [],
  };

  try {
    for (const weight of WEIGHTS) {
      const fontPath = path.join(FONT_DIR, weight.file);
      const bytes = fs.readFileSync(fontPath);
      const sha256 = crypto.createHash("sha256").update(bytes).digest("hex");
      const coverage = probeWoff2Coverage(
        fontPath,
        [
          ...QUALIFICATION_TARGETS,
          ...REQUIRED_MARKS_AND_CARRIERS,
        ].map((codePoint) => String.fromCodePoint(codePoint))
      ).coverage;
      const ttfPath = path.join(tempDirectory, `${weight.name}.ttf`);
      reconstructSfnt(fontPath, ttfPath);
      const shapedById = runJavaProbe(ttfPath, allCases, tempDirectory);
      const results = allCases.map((item) => assessCase(item, shapedById.get(item.id)));
      const joining = joiningAssessment(results);
      const notdefFailures = results.filter((item) => !item.noNotdef);
      const anchorFailures = results.filter((item) => !item.markAnchorsPass);
      report.weights.push({
        ...weight,
        path: path.relative(REPO_ROOT, fontPath),
        byteSize: bytes.length,
        sha256,
        expectedSha256: hashes.get(weight.file) || null,
        hashMatchesManifest: sha256 === hashes.get(weight.file),
        metadata: parseMetadata(fontPath),
        coverage,
        coverageSummary: {
          present: coverage.filter((item) => item.nominalGlyphPresent).length,
          required: coverage.length,
          missing: coverage.filter((item) => !item.nominalGlyphPresent),
        },
        joining,
        joiningSummary: {
          passed: joining.filter((item) => item.allFourContextualFormsDistinct).length,
          required: joining.length,
          failures: joining.filter((item) => !item.allFourContextualFormsDistinct),
        },
        shapingSummary: {
          tests: results.length,
          passed: results.filter((item) => item.pass).length,
          notdefFailureCount: notdefFailures.length,
          markAnchorFailureCount: anchorFailures.length,
          notdefFailureIds: notdefFailures.map((item) => item.id),
          markAnchorFailureIds: anchorFailures.map((item) => item.id),
        },
        tests: results,
      });
    }
  } finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
  }

  report.completedAt = new Date().toISOString();
  report.summary = {
    allHashesMatch: report.weights.every((weight) => weight.hashMatchesManifest),
    coveragePresent: report.weights.reduce(
      (sum, weight) => sum + weight.coverageSummary.present,
      0
    ),
    coverageRequired: report.weights.reduce(
      (sum, weight) => sum + weight.coverageSummary.required,
      0
    ),
    shapingTests: report.weights.reduce(
      (sum, weight) => sum + weight.shapingSummary.tests,
      0
    ),
    notdefFailures: report.weights.reduce(
      (sum, weight) => sum + weight.shapingSummary.notdefFailureCount,
      0
    ),
    markAnchorFailures: report.weights.reduce(
      (sum, weight) => sum + weight.shapingSummary.markAnchorFailureCount,
      0
    ),
    joiningPasses: report.weights.reduce(
      (sum, weight) => sum + weight.joiningSummary.passed,
      0
    ),
    joiningRequired: report.weights.reduce(
      (sum, weight) => sum + weight.joiningSummary.required,
      0
    ),
  };
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputFlag = process.argv.indexOf("--write");
  const outputPath = outputFlag >= 0 && process.argv[outputFlag + 1]
    ? path.resolve(process.cwd(), process.argv[outputFlag + 1])
    : DEFAULT_OUTPUT;
  const report = qualifyFonts();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    output: path.relative(REPO_ROOT, outputPath),
    summary: report.summary,
    weights: report.weights.map((weight) => ({
      file: weight.file,
      sha256: weight.sha256,
      bytes: weight.byteSize,
      coverage: weight.coverageSummary,
      shaping: weight.shapingSummary,
      joining: weight.joiningSummary,
    })),
  }, null, 2));
}
