import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const APP_PATH = new URL("./app.js", import.meta.url);

test("lesson discovery filters existing path states without unlocking a matching lesson", () => {
  const { renderer } = loadRenderer();
  const content = JSON.parse(fs.readFileSync(new URL("./content.json", import.meta.url), "utf8"));
  renderer.setLearningState(content.modules, [], { trackPreference: "formal", gradeBand: "p3", scriptMode: "latin" });
  const path = renderer.buildLearningPath();
  const locked = path.find((entry) => entry.state === "locked");
  const filtered = renderer.filterLearningPath(path, { query: locked.module.id, status: "all", subject: "" });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].state, "locked");
  renderer.setLearningFilters({ query: locked.module.id });
  const html = renderer.renderHomeScreen();
  assert.match(html, /is-locked[^>]+disabled/);
  assert.doesNotMatch(html, new RegExp('data-action="open-lesson" data-module-id="' + locked.module.id + '"'));
  assert.equal(renderer.filterLearningPath(path, { query: locked.module.id, status: "ready" }).length, 0);
});

test("lesson search accepts unvowelled Ajami, apostrophe variants, IDs and combined subject/status filters", () => {
  const { renderer } = loadRenderer();
  const entries = [
    { module: { id: "CT01", subject: "critical-thinking", titleHa: "Ra'ayi", titleAjami: "رَأْیِ" }, record: {}, state: "completed" },
    { module: { id: "V01", subject: "vocational", titleHa: "Haraji", titleAjami: "هَرَجِ" }, record: {}, state: "available" }
  ];
  assert.equal(renderer.filterLearningPath(entries, { query: "\u0631\u0623\u06CC" })[0].module.id, "CT01");
  assert.equal(renderer.filterLearningPath(entries, { query: "RA’AYI", status: "completed", subject: "critical-thinking" }).length, 1);
  assert.equal(renderer.filterLearningPath(entries, { query: "ct01", status: "ready" }).length, 0);
  assert.equal(renderer.filterLearningPath(entries, { query: "haraji v01" }).length, 1);
});

test("continue learning prioritizes most recent unfinished lesson and falls back to an available one", () => {
  const { renderer } = loadRenderer();
  const entries = [
    { module: { id: "new" }, record: {}, state: "available" },
    { module: { id: "old" }, record: { lastAccessedAt: "2026-09-01T00:00:00Z" }, state: "in-progress" },
    { module: { id: "recent" }, record: { lastAccessedAt: "2026-09-18T00:00:00Z" }, state: "in-progress" }
  ];
  assert.equal(renderer.getNextLearningPathEntry(entries).module.id, "recent");
  assert.equal(renderer.getNextLearningPathEntry(entries.slice(0, 1)).module.id, "new");
  assert.equal(renderer.getNextLearningPathEntry([{ state: "completed", record: {} }]), null);
  assert.equal(entries[0].module.id, "new", "recommendation must not reorder the curriculum");
});

test("learning filters survive rerenders, reset on track/grade change, and escape search input", () => {
  const { renderer } = loadRenderer();
  const content = JSON.parse(fs.readFileSync(new URL("./content.json", import.meta.url), "utf8"));
  renderer.setLearningState(content.modules, [], { trackPreference: "vocational", gradeBand: "p3", scriptMode: "latin" });
  renderer.setLearningFilters({ query: '\"><img src=x onerror=alert(1)>', status: "completed" });
  assert.match(renderer.renderHomeScreen(), /learning-empty/);
  assert.doesNotMatch(renderer.renderHomeScreen(), /<img src=x/);
  assert.equal(renderer.getLearningBrowser().status, "completed");
  renderer.setLearningSettings({ trackPreference: "formal" });
  assert.equal(renderer.getLearningBrowser().query, "");
  renderer.setLearningFilters({ subject: "maths" });
  renderer.setLearningSettings({ gradeBand: "p4" });
  assert.equal(renderer.getLearningBrowser().subject, "");
});

test("Ajami discovery uses managed subject/title fields without synthesizing new Ajami", () => {
  const { renderer } = loadRenderer();
  const content = JSON.parse(fs.readFileSync(new URL("./content.json", import.meta.url), "utf8"));
  renderer.setLearningState(content.modules, [], { trackPreference: "vocational", gradeBand: "p3", scriptMode: "ajami" });
  const html = renderer.renderHomeScreen();
  assert.match(html, /learning-browser/);
  assert.match(html, /learning-continue/);
  assert.match(html, /aria-label="Nemo darasi"/);
  assert.doesNotMatch(html, />Fara darasi</);
});

function loadRenderer() {
  const source = fs.readFileSync(APP_PATH, "utf8");
  const closeMarker = "\n})();";
  const closeIndex = source.lastIndexOf(closeMarker);
  assert.notEqual(closeIndex, -1, "app.js must retain its closing IIFE");

  const exports = `
  globalThis.__ajamixRendererTest = {
    setScriptMode: function (mode) { state.settings.scriptMode = mode; },
    setOnboardingScriptMode: function (mode) { onboardingData.scriptMode = mode; },
    setLearningState: function (modules, progress, settings) {
      state.modules = modules;
      state.progress = progress;
      Object.assign(state.settings, settings);
      state.learningBrowser = { scope: "", query: "", subject: "", status: "all" };
    },
    setLearningFilters: function (filters) { Object.assign(getLearningBrowser(), filters); },
    setLearningSettings: function (settings) { Object.assign(state.settings, settings); },
    getLearningBrowser: getLearningBrowser,
    filterLearningPath: filterLearningPath,
    buildLearningPath: buildLearningPath,
    getNextLearningPathEntry: getNextLearningPathEntry,
    renderHomeScreen: renderHomeScreen,
    buildQuizSession: function (module, generatedQuestions) {
      state.modules = [module];
      state.quizSession = null;
      quizEngine = { generateQuiz: function () { return generatedQuestions; } };
      ensureQuizSession(module.id, { force: true });
      return state.quizSession;
    },
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
  subjectAjami: "لِسَّࢻِ",
  questionHa: "Kirgawa {a}",
  questionAjami: "کِرْغَوَا {a}",
  audioComingSoonAjami: "سَوْتِ یَࢽَ زُوَ",
});

function buildQuizSession(renderer, template, generatedQuestion) {
  return renderer.buildQuizSession(
    { id: "quiz-fixture", quizQuestions: [template] },
    [generatedQuestion]
  );
}

test("quiz session carries templateHaAjami into the displayed Ajami question", () => {
  const { renderer } = loadRenderer();
  const template = {
    templateHa: "Wace amsa ce daidai?",
    templateHaAjami: "وَاثٜىٰ أَمْسَا ثٜ دَیْدَیْ?",
  };
  const session = buildQuizSession(renderer, template, {
    questionText: template.templateHa,
    variables: {},
  });

  renderer.setScriptMode("ajami");
  assert.equal(session.questions[0].templateAjami, template.templateHaAjami);
  assert.equal(
    renderer.getDisplayQuestion(
      session.questions[0].questionText,
      session.questions[0].templateAjami,
      session.questions[0].variables
    ),
    template.templateHaAjami
  );
});

test("quiz session preserves Ajami placeholder substitution", () => {
  const { renderer } = loadRenderer();
  const template = {
    templateHa: "Kirgawa {a}",
    templateHaAjami: "کِرْغَوَا {a}",
  };
  const session = buildQuizSession(renderer, template, {
    questionText: "Kirgawa 4",
    variables: { a: 4 },
  });

  renderer.setScriptMode("ajami");
  assert.equal(
    renderer.getDisplayQuestion(
      session.questions[0].questionText,
      session.questions[0].templateAjami,
      session.questions[0].variables
    ),
    'کِرْغَوَا <span class="math-inline">4</span>'
  );
});

test("uncovered quiz session question stays blank in Ajami mode without Boko fallback", () => {
  const { renderer } = loadRenderer();
  const template = {
    templateHa: "Wace amsa ce daidai?",
    templateHaAjami: null,
  };
  const session = buildQuizSession(renderer, template, {
    questionText: template.templateHa,
    variables: {},
  });

  renderer.setScriptMode("ajami");
  const displayedQuestion = renderer.getDisplayQuestion(
    session.questions[0].questionText,
    session.questions[0].templateAjami,
    session.questions[0].variables
  );
  assert.equal(session.questions[0].templateAjami, null);
  assert.equal(displayedQuestion, "");
  assert.doesNotMatch(displayedQuestion, /Wace amsa ce daidai/u);
});

test("quiz session construction leaves Latin question output unchanged", () => {
  const { renderer } = loadRenderer();
  const template = {
    templateHa: "Wace <amsa> ce daidai?",
    templateHaAjami: "وَاثٜىٰ أَمْسَا ثٜ دَیْدَیْ?",
  };
  const generatedQuestion = {
    questionText: template.templateHa,
    variables: {},
  };

  renderer.setScriptMode("latin");
  const beforeSessionConstruction = renderer.getDisplayQuestion(
    generatedQuestion.questionText,
    null,
    generatedQuestion.variables
  );
  const session = buildQuizSession(renderer, template, generatedQuestion);
  const afterSessionConstruction = renderer.getDisplayQuestion(
    session.questions[0].questionText,
    session.questions[0].templateAjami,
    session.questions[0].variables
  );
  assert.equal(afterSessionConstruction, beforeSessionConstruction);
  assert.equal(afterSessionConstruction, "Wace &lt;amsa&gt; ce daidai?");
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
