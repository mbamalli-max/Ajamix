import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const APP_PATH = new URL("./app.js", import.meta.url);

function loadRenderer() {
  const source = fs.readFileSync(APP_PATH, "utf8");
  const closeMarker = "\n})();";
  const closeIndex = source.lastIndexOf(closeMarker);
  assert.notEqual(closeIndex, -1, "app.js must retain its closing IIFE");

  const exports = `
  globalThis.__ajamixRendererTest = {
    setScriptMode: function (mode) { state.settings.scriptMode = mode; },
    getManagedAjamiField: getManagedAjamiField,
    getDisplayTitle: getDisplayTitle,
    getDisplayQuestion: getDisplayQuestion,
    getDisplaySubject: getDisplaySubject,
    getDisplayQuizOption: getDisplayQuizOption,
    getLocalizedPair: getLocalizedPair,
    ha: ha,
    getLessonBodyText: getLessonBodyText,
    renderLessonBodyCopy: renderLessonBodyCopy,
    getFormalSegmentText: getFormalSegmentText,
    renderLessonAudioComingSoonBanner: renderLessonAudioComingSoonBanner
  };
`;
  const instrumented = source.slice(0, closeIndex) + exports + source.slice(closeIndex);
  const context = {
    console,
    location: { hostname: "test.invalid" },
    navigator: { onLine: true },
    document: { addEventListener() {} },
    window: {},
    URLSearchParams,
    TextEncoder,
    setTimeout,
    clearTimeout,
  };
  context.globalThis = context;
  vm.runInNewContext(instrumented, context, { filename: "app.js" });
  return { renderer: context.__ajamixRendererTest, source };
}

const FIXTURE = Object.freeze({
  titleHa: "Kirgawa 1–5",
  titleAjami: "کِرْغَوَا 1–5",
  subjectHa: "Lissafi",
  subjectAjami: "لِسَّࢻِ",
  questionHa: "Kirgawa {a}",
  questionAjami: "کِرْغَوَا {a}",
  audioComingSoonAjami: "سَوْتِ یَࢽَ زُوَ",
});

test("Ajami renderer is field-presence gated and never restores the retired guesser", () => {
  const { renderer, source } = loadRenderer();
  assert.equal(source.includes("romanToAjami"), false);
  assert.equal(source.includes("ajami_validated"), false);

  renderer.setScriptMode("latin");
  assert.equal(renderer.getDisplayTitle(FIXTURE), FIXTURE.titleHa);
  assert.equal(renderer.getDisplayQuestion("<" + FIXTURE.questionHa, null, { a: 4 }), "&lt;Kirgawa {a}");
  assert.equal(renderer.getDisplaySubject(FIXTURE), FIXTURE.subjectHa);
  assert.equal(renderer.ha("A & B"), "A &amp; B");

  renderer.setScriptMode("ajami");
  assert.equal(renderer.getDisplayTitle(FIXTURE), FIXTURE.titleAjami);
  assert.equal(renderer.getDisplayTitle({ ...FIXTURE, titleAjami: null }), "");
  assert.equal(renderer.getDisplayTitle({ ...FIXTURE, status: "excluded" }), "");
  assert.equal(renderer.getDisplayQuestion(FIXTURE.questionHa, FIXTURE.questionAjami, { a: 4 }), "کِرْغَوَا <span class=\"math-inline\">4</span>");
  assert.equal(renderer.getDisplayQuestion(FIXTURE.questionHa, null, { a: 4 }), "");
  assert.equal(renderer.getDisplaySubject(FIXTURE), FIXTURE.subjectAjami);
  assert.equal(renderer.ha(FIXTURE.titleHa), "");
  assert.equal(renderer.getLocalizedPair({ ha: FIXTURE.titleHa, ajami: null }).ajami, "");
  assert.equal(renderer.getLocalizedPair({ ha: FIXTURE.titleHa, ajami: FIXTURE.titleAjami }).ajami, FIXTURE.titleAjami);
  assert.equal(
    renderer.getDisplayQuizOption("Lissafi", { optionAjamiByText: { Lissafi: FIXTURE.subjectAjami } }),
    FIXTURE.subjectAjami
  );
  assert.equal(renderer.getDisplayQuizOption("uncovered", { optionAjamiByText: {} }), "");
  assert.equal(renderer.getDisplayQuizOption("12.5", { optionAjamiByText: {} }), '<span class="math-inline">12</span>.<span class="math-inline">5</span>');
});

test("uncovered Ajami prose uses the existing audio-coming fallback while Latin prose is unchanged", () => {
  const { renderer } = loadRenderer();
  const uncovered = {
    textExplanationHa: "Kirgawa 1–5",
    textExplanationAjami: null,
  };
  const covered = {
    textExplanationHa: "Kirgawa 1–5",
    textExplanationAjami: FIXTURE.titleAjami,
  };

  renderer.setScriptMode("ajami");
  assert.equal(renderer.getLessonBodyText(uncovered), "");
  const fallback = renderer.renderLessonBodyCopy(uncovered);
  assert.match(fallback, /lesson-audio-coming-soon/u);
  assert.match(fallback, new RegExp(FIXTURE.audioComingSoonAjami, "u"));
  assert.doesNotMatch(fallback, /Kirgawa/u);
  assert.equal(
    renderer.renderLessonBodyCopy(covered),
    '<p>کِرْغَوَا <span class="math-inline">1–5</span></p>'
  );
  assert.equal(renderer.getFormalSegmentText({ text: { ha: FIXTURE.titleHa, ajami: null } }), "");
  assert.equal(renderer.getFormalSegmentText({ text: { ha: FIXTURE.titleHa, ajami: FIXTURE.titleAjami } }), FIXTURE.titleAjami);

  renderer.setScriptMode("latin");
  assert.equal(renderer.getLessonBodyText(uncovered), uncovered.textExplanationHa);
  assert.equal(renderer.renderLessonBodyCopy(uncovered), "<p>Kirgawa 1–5</p>");
  assert.doesNotMatch(renderer.renderLessonBodyCopy(uncovered), /lesson-audio-coming-soon/u);
});
