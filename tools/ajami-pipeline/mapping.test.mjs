import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

import {
  CANONICAL_MAPPING,
  MAPPING_PATH,
  validateCanonicalMapping,
} from "./mapping.mjs";

test("canonical mapping glyphs match every declared code point", () => {
  const result = validateCanonicalMapping();
  assert.equal(result.ok, true, result.errors.join("\n"));
  assert.equal(result.orthography, "warsh_kano_ajamix_v1");
  assert.equal(result.checkedEntries, 60);
});

test("canonical mapping source spells every glyph with Unicode escapes", () => {
  const source = fs.readFileSync(MAPPING_PATH, "utf8");
  const declarations = source.match(/"glyph"\s*:\s*"([^"]*)"/g) ?? [];
  assert.ok(declarations.length > 0);
  for (const declaration of declarations) {
    assert.match(declaration, /\\u[0-9A-Fa-f]{4}/);
  }
});

test("h is represented as two classifier-selected tokens, never one unconditional mapping", () => {
  const hEntries = CANONICAL_MAPPING.canonicalConsonants.filter(
    (entry) => entry.boko.length === 1 && entry.boko[0] === "h"
  );
  assert.deepEqual(
    hEntries.map((entry) => entry.token),
    ["H_NATIVE_HAUSA", "H_ARABIC_LEXICAL"]
  );
  assert.ok(hEntries.every((entry) => entry.category === "C"));
});

test("canonical mapping includes variants, forbidden outputs, and provisional clusters", () => {
  assert.equal(CANONICAL_MAPPING.noncanonicalVariants.length, 11);
  assert.equal(CANONICAL_MAPPING.forbiddenOutput.length, 8);
  assert.deepEqual(
    CANONICAL_MAPPING.provisionalVelarClusters.flatMap((entry) => entry.boko),
    ["kw", "ky", "gw", "gy", "\u0199w", "\u0199y"]
  );
  assert.ok(
    CANONICAL_MAPPING.provisionalVelarClusters.every(
      (entry) => entry.status === "provisional"
    )
  );
});
