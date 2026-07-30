import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
export const MAPPING_PATH = path.join(MODULE_DIR, "data", "canonical-mapping.json");

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  for (const child of Object.values(value)) {
    deepFreeze(child);
  }
  return Object.freeze(value);
}

function parseCodePoint(label) {
  if (!/^U\+[0-9A-F]{4,6}$/.test(label)) {
    throw new Error(`Invalid Unicode label: ${label}`);
  }
  return Number.parseInt(label.slice(2), 16);
}

function glyphCodePoints(glyph) {
  return Array.from(glyph, (character) => character.codePointAt(0));
}

export function loadCanonicalMapping() {
  const source = fs.readFileSync(MAPPING_PATH, "utf8");
  return deepFreeze(JSON.parse(source));
}

export const CANONICAL_MAPPING = loadCanonicalMapping();

export function validateCanonicalMapping(mapping = CANONICAL_MAPPING) {
  const errors = [];
  const checkedEntries = [];
  const rawSource = fs.readFileSync(MAPPING_PATH, "utf8");

  if (mapping.orthography !== "warsh_kano_ajamix_v1") {
    errors.push(`Unexpected orthography version: ${mapping.orthography}`);
  }
  if (mapping.normalization !== "NFC") {
    errors.push(`Unexpected normalization: ${mapping.normalization}`);
  }

  function visit(value, location = "$") {
    if (Array.isArray(value)) {
      value.forEach((child, index) => visit(child, `${location}[${index}]`));
      return;
    }
    if (!value || typeof value !== "object") {
      return;
    }

    if (typeof value.glyph === "string") {
      const declared = value.codePoints ??
        (value.codePoint ? [value.codePoint] : []);
      const actual = glyphCodePoints(value.glyph);
      const expected = declared.map(parseCodePoint);

      if (!declared.length) {
        errors.push(`${location}: glyph has no declared code point`);
      } else if (
        actual.length !== expected.length ||
        actual.some((codePoint, index) => codePoint !== expected[index])
      ) {
        errors.push(
          `${location}: glyph ${actual.map((cp) => `U+${cp.toString(16).toUpperCase()}`).join(" ")} ` +
          `does not match ${declared.join(" ")}`
        );
      }

      if (!value.decision || !Array.isArray(value.sourceRefs) || !value.sourceRefs.length) {
        errors.push(`${location}: missing source/decision metadata`);
      }
      checkedEntries.push(location);
    }

    for (const [key, child] of Object.entries(value)) {
      visit(child, `${location}.${key}`);
    }
  }

  visit(mapping);

  const glyphDeclarations = rawSource.match(/"glyph"\s*:\s*"([^"]*)"/g) ?? [];
  for (const declaration of glyphDeclarations) {
    const encodedValue = declaration.slice(declaration.indexOf(":") + 1);
    if (!/\\u[0-9A-Fa-f]{4}/.test(encodedValue)) {
      errors.push(`Glyph declaration is not written with an explicit Unicode escape: ${declaration}`);
    }
  }

  if (glyphDeclarations.length !== checkedEntries.length) {
    errors.push(
      `Raw glyph declaration count ${glyphDeclarations.length} does not match checked entry count ${checkedEntries.length}`
    );
  }

  return {
    ok: errors.length === 0,
    errors,
    checkedEntries: checkedEntries.length,
    orthography: mapping.orthography,
  };
}
