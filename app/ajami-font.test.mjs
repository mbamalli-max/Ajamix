import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";
import { probeWoff2Coverage } from "../tools/ajami-pipeline/font-probe.mjs";

const read = (name) => fs.readFileSync(new URL(name, import.meta.url), "utf8");

test("both shipped Harmattan weights cover every Arabic-script character in live content", () => {
  const characters = [...new Set(read("./content.json").match(/\p{Script=Arabic}/gu))];
  assert.ok(characters.length > 0);
  for (const weight of ["Regular", "Bold"]) {
    const result = probeWoff2Coverage(new URL(`./fonts/Harmattan-${weight}.woff2`, import.meta.url).pathname, characters);
    assert.equal(result.coverage.filter((item) => !item.nominalGlyphPresent).length, 0);
  }
});

test("Ajami uses local real font weights and isolated RTL rather than forced order", () => {
  const css = read("./styles.css");
  assert.match(css, /--font-ajami:\s*'Harmattan'/);
  assert.match(css, /Harmattan-Regular\.woff2/);
  assert.match(css, /Harmattan-Bold\.woff2/);
  assert.match(css, /font-synthesis: none/);
  assert.doesNotMatch(css, /bidi-override/);
  assert.match(read("./index.html"), /href="\.\/fonts\/Harmattan-Regular\.woff2"/);
});

test("offline install requires both Ajami font weights, including on font-fetch failure", async () => {
  for (const failFont of [false, true]) {
    let install;
    let pending;
    let required;
    let activated = false;
    vm.runInNewContext(read("./sw.js"), {
      self: { addEventListener: (name, handler) => { if (name === "install") install = handler; }, skipWaiting: async () => { activated = true; } },
      caches: { open: async () => ({ addAll: async (paths) => { required = paths; if (failFont) throw new Error("font unavailable"); }, add: async () => {} }) },
    });
    install({ waitUntil: (promise) => { pending = promise; } });
    if (failFont) await assert.rejects(pending, /font unavailable/);
    else await pending;
    for (const weight of ["Regular", "Bold"]) assert.ok(required.includes(`/app/fonts/Harmattan-${weight}.woff2`));
    assert.equal(activated, !failFont);
  }
});
