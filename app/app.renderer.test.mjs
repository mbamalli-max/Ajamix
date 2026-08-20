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
    setOnboardingScriptMode: function (mode) { onboardingData.scriptMode = mode; },
    getManagedAjamiField: getManagedAjamiField,
    getDisplayTitle: getDisplayTitle,
    getDisplayTitleMarkup: getDisplayTitleMarkup,
    getDisplayQuestion: getDisplayQuestion,
    getDisplaySubject: getDisplaySubject,
    getDisplayActivityTopicAjamiMarkup: getDisplayActivityTopicAjamiMarkup,
    getDisplayGlossaryTermMarkup: getDisplayGlossaryTermMarkup,
    getDisplayQuizOption: getDisplayQuizOption,
    getLocalizedPair: getLocalizedPair,
    ha: ha,
    getLessonBodyText: getLessonBodyText,
    renderLessonBodyCopy: renderLessonBodyCopy,
    getFormalSegmentText: getFormalSegmentText,
    renderLessonAudioComingSoonBanner: renderLessonAudioComingSoonBanner,
    renderCompactAjamiAudioFallbackState: renderCompactAjamiAudioFallbackState,
    renderOnboardingStep4: renderOnboardingStep4,
    renderSettingsScreen: renderSettingsScreen
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
  assert.match(renderer.getDisplayTitleMarkup({ ...FIXTURE, titleAjami: null }), /lesson-audio-coming-soon--compact/u);
  assert.equal(renderer.getDisplayTitle({ ...FIXTURE, status: "excluded" }), "");
  assert.equal(renderer.getDisplayQuestion(FIXTURE.questionHa, FIXTURE.questionAjami, { a: 4 }), "کِرْغَوَا <span class=\"math-inline\">4</span>");
  assert.equal(renderer.getDisplayQuestion(FIXTURE.questionHa, null, { a: 4 }), "");
  assert.equal(renderer.getDisplaySubject(FIXTURE), FIXTURE.subjectAjami);
  assert.match(renderer.getDisplaySubject({ ...FIXTURE, subjectAjami: null }), /lesson-audio-coming-soon--compact/u);
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

test("compact Ajami fallback covers short managed strings without exposing Boko", () => {
  const { renderer } = loadRenderer();
  const uncoveredActivity = { topicHa: "Uncovered activity", topicAjami: null };
  const uncoveredGlossary = { termHa: "Sphere", termAjami: null };

  renderer.setScriptMode("ajami");
  const compactFallback = renderer.renderCompactAjamiAudioFallbackState();
  assert.match(compactFallback, /lesson-audio-coming-soon--compact/u);
  assert.match(compactFallback, /lesson-audio-coming-soon-icon[^>]*>♪</u);
  assert.match(compactFallback, new RegExp(FIXTURE.audioComingSoonAjami, "u"));
  assert.doesNotMatch(compactFallback, /Sauti yana zuwa/u);
  assert.match(renderer.getDisplayActivityTopicAjamiMarkup(uncoveredActivity), /lesson-audio-coming-soon--compact/u);
  assert.match(renderer.getDisplayGlossaryTermMarkup(uncoveredGlossary), /lesson-audio-coming-soon--compact/u);
  assert.doesNotMatch(renderer.getDisplayActivityTopicAjamiMarkup(uncoveredActivity), /Uncovered activity/u);
  assert.doesNotMatch(renderer.getDisplayGlossaryTermMarkup(uncoveredGlossary), /Sphere/u);

  renderer.setScriptMode("latin");
  assert.equal(renderer.getDisplayTitleMarkup(FIXTURE), FIXTURE.titleHa);
  assert.equal(renderer.getDisplaySubject(FIXTURE), FIXTURE.subjectHa);
  assert.equal(renderer.getDisplayActivityTopicAjamiMarkup(uncoveredActivity), "");
  assert.equal(renderer.getDisplayGlossaryTermMarkup(uncoveredGlossary), "Sphere");
});

test("script choice is reachable and no load or onboarding completion lock remains", () => {
  const { renderer, source } = loadRenderer();
  const loadSettingsSource = source.slice(
    source.indexOf("async function loadSettings"),
    source.indexOf("async function loadProgress")
  );
  const completeOnboardingSource = source.slice(
    source.indexOf("async function completeOnboarding"),
    source.indexOf("async function saveSettings")
  );

  assert.match(source, /var DEFAULT_SETTINGS = \{[\s\S]*?scriptMode: "latin"/u);
  assert.doesNotMatch(loadSettingsSource, /nextSettings\.scriptMode\s*=\s*"latin"/u);
  assert.doesNotMatch(loadSettingsSource, /storedScriptMode/u);
  assert.match(
    completeOnboardingSource,
    /scriptMode: onboardingData\.scriptMode \|\| state\.settings\.scriptMode \|\| "latin"/u
  );
  assert.match(source, /settings-set-script-ajami"\) \{\s*await saveSettings\(\{ scriptMode: "ajami" \}\)/u);
  assert.match(source, /settings-set-script-latin"\) \{\s*await saveSettings\(\{ scriptMode: "latin" \}\)/u);

  const initialOnboarding = renderer.renderOnboardingStep4();
  assert.match(initialOnboarding, /data-action="ob-set-script-ajami"/u);
  assert.match(initialOnboarding, /ob-choice ob-choice--active"[^>]*data-action="ob-set-script-latin"/u);
  assert.doesNotMatch(initialOnboarding, /kawai\. Za a kara Ajami/u);

  renderer.setOnboardingScriptMode("ajami");
  assert.match(
    renderer.renderOnboardingStep4(),
    /ob-choice ob-choice--active"[^>]*data-action="ob-set-script-ajami"/u
  );

  renderer.setScriptMode("latin");
  const latinSettings = renderer.renderSettingsScreen();
  assert.match(latinSettings, /data-action="settings-set-script-ajami"/u);
  assert.match(latinSettings, /data-action="settings-set-script-latin" checked/u);

  renderer.setScriptMode("ajami");
  const ajamiSettings = renderer.renderSettingsScreen();
  assert.match(ajamiSettings, /data-action="settings-set-script-ajami" checked/u);
  assert.match(ajamiSettings, /Latin \(Boko\)/u);
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
