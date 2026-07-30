import test from "node:test";
import assert from "node:assert/strict";

import { tokenize, tokenizerSnapshot } from "./tokenizer.mjs";

function meaningfulTokens(input) {
  return tokenize(input).tokens.filter((token) => token.type !== "WHITESPACE");
}

test("tokenizer applies the required longest-match order", () => {
  const tokens = meaningfulTokens(
    "\u0027y \u0199w \u0199y gw gy kw ky sh ts \u0253 \u0257 \u0199 \u01b4"
  );
  assert.deepEqual(
    tokens.map((token) => token.token),
    [
      "HAUSA_GLOTTALIZED_Y",
      "K_GLOTTALIZED_VELAR_CLUSTER",
      "K_GLOTTALIZED_VELAR_CLUSTER",
      "G_VELAR_CLUSTER",
      "G_VELAR_CLUSTER",
      "K_VELAR_CLUSTER",
      "K_VELAR_CLUSTER",
      "SH_HAUSA",
      "TS_HAUSA",
      "B_GLOTTALIZED",
      "D_GLOTTALIZED",
      "K_GLOTTALIZED",
      "HAUSA_GLOTTALIZED_Y",
    ]
  );
});

test("sh and ts never decompose into single-letter tokens", () => {
  assert.deepEqual(
    meaningfulTokens("sh ts").map((token) => [token.sourceSubstring, token.token]),
    [["sh", "SH_HAUSA"], ["ts", "TS_HAUSA"]]
  );
});

test("all three apostrophe code points plus y are code-point aliases of one token", () => {
  const aliases = [
    "\u0027y",
    "\u2019y",
    "\u02BCy",
    "\u0027Y",
    "\u2019Y",
    "\u02BCY",
  ];
  for (const alias of aliases) {
    const [token] = meaningfulTokens(alias);
    assert.equal(token.token, "HAUSA_GLOTTALIZED_Y");
    assert.equal(token.sourceSubstring, alias);
    assert.equal(token.aliasClass, "APOSTROPHE_Y");
    assert.deepEqual(token.codePoints, Array.from(alias, (character) =>
      `U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
    ));
  }
});

test("hook-y uppercase and lowercase converge on one abstract token", () => {
  assert.deepEqual(
    meaningfulTokens("\u01b3 \u01b4").map((token) => token.token),
    ["HAUSA_GLOTTALIZED_Y", "HAUSA_GLOTTALIZED_Y"]
  );
});

test("NFC is applied while preserving original source substring in snapshots", () => {
  const decomposed = "e\u0301";
  const [snapshot] = tokenizerSnapshot(decomposed);
  assert.equal(snapshot.sourceSubstring, decomposed);
  assert.equal(snapshot.normalized, "\u00e9");
  assert.deepEqual(snapshot.codePoints, ["U+00E9"]);
});

test("generic apostrophes are unresolved and punctuation is retained outside phonemes", () => {
  const tokens = meaningfulTokens("sa\u0027a, ko?");
  assert.equal(tokens.find((token) => token.sourceSubstring === "\u0027").token, "APOSTROPHE_UNRESOLVED");
  assert.deepEqual(
    tokens.filter((token) => token.type === "PUNCTUATION").map((token) => token.sourceSubstring),
    [",", "?"]
  );
});

test("h remains a deferred contextual token", () => {
  const [token] = meaningfulTokens("H");
  assert.equal(token.token, "H_CONTEXT_REQUIRED");
  assert.equal(token.reviewRequired, true);
});
