(function () {
  "use strict";

  var DB_NAME = "ajamix-db";
  var DB_VERSION = 3;
  var PASSING_SCORE = 3;
  var LESSON_DEFAULT_DURATION_MS = 180000;
  var QUIZ_AUTO_ADVANCE_DELAY_MS = 900;
  var STREAK_DIM_THRESHOLD_DAYS = 4;
  var STREAK_OUT_THRESHOLD_DAYS = 5;
  var STREAK_VISUAL_COUNT = 7;
  var DEFAULT_AUDIO_SIZE_ESTIMATE_BYTES = 2 * 1024 * 1024;
  var onboardingStep = 1;
  var onboardingData = { displayName: "", learnerType: "child", scriptMode: "ajami" };
  var quizEngine = null;
  var DEFAULT_STREAK_DATA = {
    lastActivityDate: null,
    streakDays: 0,
    streakState: "out",
  };
  var DEFAULT_AUDIO_DOWNLOAD_STATE = {
    gradeBand: "nursery1",
    totalFiles: 0,
    completedUrls: [],
    status: "pending",
    lastUpdatedAt: null,
  };
  var DEFAULT_SETTINGS = {
    onboarded: false,
    gradeBand: "nursery1",
    displayName: "Dalibi",
    learnerType: "child",
    scriptMode: "ajami",
    audioMode: "on-demand",
    motionMode: "full",
    contentVersion: "sample-bundle",
    lastContentLastModified: "",
    audioDownloadPromptSeen: false,
    audioDownloadState: Object.assign({}, DEFAULT_AUDIO_DOWNLOAD_STATE),
  };
  var ALLOWED_GRADE_BANDS = [
    "nursery1", "nursery2",
    "p1", "p2", "p3", "p4", "p5", "p6",
    "jss1", "jss2", "jss3",
    "ss1", "ss2", "ss3"
  ];
  var GRADE_BAND_LABELS = {
    nursery1: "Nursery 1",
    nursery2: "Nursery 2",
    p1: "Primary 1",
    p2: "Primary 2",
    p3: "Primary 3",
    p4: "Primary 4",
    p5: "Primary 5",
    p6: "Primary 6",
    jss1: "JSS 1",
    jss2: "JSS 2",
    jss3: "JSS 3",
    ss1: "SS 1",
    ss2: "SS 2",
    ss3: "SS 3"
  };
  var state = {
    db: null,
    settings: Object.assign({}, DEFAULT_SETTINGS),
    modules: [],
    activities: [],
    glossary: [],
    progress: [],
    route: { name: "loading", moduleId: null },
    quizSession: null,
    quizResults: null,
    connectivity: navigator.onLine,
    bootError: null,
    activeLessonModuleId: null,
    lessonSession: null,
    streakData: Object.assign({}, DEFAULT_STREAK_DATA),
    downloadSession: null,
    storageEstimate: null,
    shellUpdateBanner: null,
    contentUpdateBanner: null,
    listenersBound: false,
  };

  function applyMotionMode(mode) {
    document.body.classList.toggle("motion-reduced", mode === "reduced");
    document.body.classList.toggle("motion-full", mode !== "reduced");
  }

  function getGradeBandLabel(band) {
    return GRADE_BAND_LABELS[band] || band;
  }

  // ─── Hausa Ajami transliteration engine ──────────────────────────────────
  // Converts Hausa written in Roman/Latin script to Hausa Ajami (Arabic script).
  // Uses the deterministic consonant + diacritic-vowel mapping defined in the
  // AJAMIX alphabet guide.  Template placeholders like {a} and {b} are preserved
  // verbatim so the quiz engine can still substitute numbers.
  function romanToAjami(text) {
    if (!text) { return ""; }

    // Consonant mapping (multi-char entries must be checked first)
    var MULTI = {
      "sh": "ش",
      "ts": "\u069F",  // ڟ  ejective alveolar affricate (tah with three dots below)
      "ng": "ڭ",
      "kh": "خ"
    };
    var SINGLE = {
      // Note: 'c' and 'x' handled by dedicated steps above (4.6 / 4.7)
      "b": "ب", "t": "ت", "j": "ج", "h": "ه",
      "d": "د", "r": "ر", "z": "ز", "s": "س",
      "f": "ف", "k": "ك", "g": "\u063A", "l": "ل",  // g = غ (ghain, NOT گ gaf)
      "m": "م", "n": "ن", "w": "و", "y": "ي",
      "p": "پ",
      // Hausa implosives / ejective
      "\u0253": "\u067B",  // ɓ → ٻ
      "\u0257": "\u0688",  // ɗ → ڈ
      "\u0199": "\u06AA"   // ƙ → ڪ (swash kaf)
    };
    // Short vowels → Arabic diacritics (harakat)
    var VOWEL = {
      "a": "\u064E",  // fatha  َ
      "i": "\u0650",  // kasra  ِ
      "u": "\u064F",  // damma  ُ
      "e": "\u0650",  // treated as i
      "o": "\u064F"   // treated as u
    };
    var ALEF = "ا";  // vowel carrier at word start

    var result = "";
    var i = 0;
    var atWordStart = true;

    while (i < text.length) {
      // 1 — Preserve {placeholder} patterns intact
      if (text[i] === "{") {
        var close = text.indexOf("}", i);
        if (close !== -1) {
          result += text.slice(i, close + 1);
          i = close + 1;
          atWordStart = false;
          continue;
        }
      }

      // 2 — Whitespace → pass through, reset word-start flag
      var ch = text[i];
      var lc = ch.toLowerCase();
      if (ch === " " || ch === "\n" || ch === "\r" || ch === "\t") {
        result += ch;
        atWordStart = true;
        i += 1;
        continue;
      }

      // 3 — Arabic question / exclamation mark
      if (ch === "?") { result += "\u061F"; atWordStart = true; i += 1; continue; }
      if (ch === "!") { result += "!"; atWordStart = true; i += 1; continue; }
      if (ch === ".") { result += "."; atWordStart = true; i += 1; continue; }
      if (ch === ",") { result += "\u060C"; i += 1; continue; }

      // 4 — Digits pass through (numbers like {a} substitutions are numerals)
      if (ch >= "0" && ch <= "9") { result += ch; atWordStart = false; i += 1; continue; }

      // 4.5 — Apostrophe / glottal-stop marker → ع (ain)
      if (ch === "'" || ch === "\u2019" || ch === "\u02BC") {
        result += "\u0639"; atWordStart = false; i += 1; continue;
      }

      // 4.6 — 'x' → كس (represents /ks/ in Hausa loanwords)
      if (lc === "x") {
        result += "\u0643\u0633"; atWordStart = false; i += 1; continue;
      }

      // 4.7 — 'c' disambiguation: Hausa ejective palatal چ before i/e/y;
      //        English /k/ sound → ك before a/o/u or consonants (loanword heuristic)
      if (lc === "c") {
        var cNext = (text[i + 1] || "").toLowerCase();
        if (cNext === "i" || cNext === "e" || cNext === "y") {
          result += "\u0686"; // چ  Hausa ejective palatal
        } else {
          result += "\u0643"; // ك  English /k/ before back vowels / consonants
        }
        atWordStart = false; i += 1; continue;
      }

      // 5 — Multi-char consonant sequences (case-insensitive)
      var two = text.slice(i, i + 2).toLowerCase();
      if (MULTI[two]) {
        result += MULTI[two];
        atWordStart = false;
        i += 2;
        continue;
      }

      // 6 — Short vowel: add alef carrier at word start, then diacritic.
      // Diphthongs: ai/ae → fatha+ya; au/ao → fatha+waw (consume both chars).
      // Long vowels: aa → fatha+alef; ii → kasra+ya; uu → damma+waw.
      // Word-final vowels get a mater lectionis per Hausa Ajami convention.
      if (VOWEL[lc]) {
        if (atWordStart) { result += ALEF; }
        result += VOWEL[lc];
        var nextCh = text[i + 1] || "";
        var nextLc = nextCh.toLowerCase();
        // Diphthongs: a + i/e → ya mater; a + u/o → waw mater
        if (lc === "a" && (nextLc === "i" || nextLc === "e")) {
          result += "\u064A"; atWordStart = false; i += 2; continue; // ي
        }
        if (lc === "a" && (nextLc === "u" || nextLc === "o")) {
          result += "\u0648"; atWordStart = false; i += 2; continue; // و
        }
        // Long vowels: aa → +alef, ii → +ya, uu → +waw
        if (lc === "a" && nextLc === "a") { result += ALEF; atWordStart = false; i += 2; continue; }
        if (lc === "i" && nextLc === "i") { result += "\u064A"; atWordStart = false; i += 2; continue; }
        if (lc === "u" && nextLc === "u") { result += "\u0648"; atWordStart = false; i += 2; continue; }
        // Look-ahead: is this vowel at word end?
        var isWordEnd = (nextCh === "" || nextCh === " " || nextCh === "\n" ||
                         nextCh === "?" || nextCh === "!" || nextCh === "." ||
                         nextCh === "," || nextCh === "{");
        if (isWordEnd) {
          if (lc === "a") { result += ALEF; }              // fatha + alef
          else if (lc === "u" || lc === "o") { result += "\u0648"; }  // damma + waw
          else if (lc === "i" || lc === "e") { result += "\u064A"; }  // kasra + ya
        }
        atWordStart = false;
        i += 1;
        continue;
      }

      // 7 — Single consonant (including Hausa special chars)
      if (SINGLE[lc] || SINGLE[ch]) {
        result += SINGLE[lc] || SINGLE[ch];
        // Gemination: doubled consonant → shadda ّ (consumes both occurrences).
        // Guard: next char must be lowercase — uppercase signals a morpheme boundary
        // (e.g. 'dD' in "IndexedDB") and must NOT trigger shadda.
        var nextCh3 = text[i + 1] || "";
        if (SINGLE[lc] && nextCh3.toLowerCase() === lc && nextCh3 === nextCh3.toLowerCase()) {
          result += "\u0651"; // shadda ّ
          i += 2;
        } else {
          i += 1;
        }
        atWordStart = false;
        continue;
      }

      // 8 — Unknown character: pass through unchanged
      result += ch;
      atWordStart = false;
      i += 1;
    }

    return result;
  }
  // ─────────────────────────────────────────────────────────────────────────

  function getDisplayTitle(module) {
    if (!module) {
      return "";
    }
    if (state.settings.scriptMode === "latin") {
      return module.titleHa || module.titleEn || "";
    }
    return module.titleAjami || romanToAjami(module.titleHa || module.titleEn || "");
  }

  function getDisplayQuestion(questionText, questionAjami) {
    if (state.settings.scriptMode === "latin") {
      return escapeHtml(questionText || "");
    }
    // Use pre-validated Ajami if available, otherwise auto-transliterate from Hausa Latin
    var ajami = questionAjami || romanToAjami(questionText || "");
    return formatAjamiText(ajami);
  }

  function getDisplaySubject(module) {
    if (state.settings.scriptMode === "ajami") {
      return formatAjamiText(romanToAjami(module.subjectHa || module.subjectEn || module.subject || ""));
    }
    return escapeHtml(module.subjectHa || module.subjectEn || module.subject || "");
  }

  function ha(text) {
    if (!text) { return ""; }
    if (state.settings.scriptMode === "ajami") {
      return formatAjamiText(romanToAjami(text));
    }
    return escapeHtml(text);
  }

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      state.db = await openDatabase();
      await loadQuizEngine();
      await loadSettings();
      applyMotionMode(state.settings.motionMode);
      await syncStreakState();
      await loadProgress();
      bindListeners();
      await loadContentBundle();
      await refreshStorageEstimate();
      ensureRoute();
      updateShellChrome();
      render();
      checkForContentUpdate().catch(logError);
    } catch (error) {
      console.error("AJAMIX boot failed:", error);
      state.bootError = error instanceof Error ? error.message : "Failed to boot application.";
      bindListeners();
      updateShellChrome();
      render();
    }
  }

  function bindListeners() {
    if (state.listenersBound) {
      return;
    }

    state.listenersBound = true;
    window.addEventListener("hashchange", function () {
      handleRouteChange().catch(logError);
    });
    window.addEventListener("online", handleConnectivityChange);
    window.addEventListener("offline", handleConnectivityChange);
    document.addEventListener("click", function (event) {
      handleClick(event).catch(logError);
    });
    document.addEventListener("submit", function (event) {
      handleSubmit(event).catch(logError);
    });
    document.addEventListener("change", function (event) {
      handleChange(event).catch(logError);
    });
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", function (event) {
        handleServiceWorkerMessage(event);
      });
    }
  }

  async function handleClick(event) {
    var target = event.target.closest("[data-route], [data-action], [data-grade-band]");
    if (!target) {
      return;
    }

    if (target.dataset.route) {
      event.preventDefault();
      navigate(target.dataset.route);
      return;
    }

    if (target.dataset.gradeBand) {
      event.preventDefault();
      await completeOnboarding(target.dataset.gradeBand);
      return;
    }

    if (!target.dataset.action) {
      return;
    }

    event.preventDefault();

    if (target.dataset.action === "onboarding-next") {
      if (onboardingStep === 2) {
        var nameInput = document.getElementById("ob-name-input");
        onboardingData.displayName = nameInput ? nameInput.value.trim() : "";
      }
      if (onboardingStep < 5) {
        onboardingStep += 1;
        render();
      }
      return;
    }

    if (target.dataset.action === "onboarding-back") {
      if (onboardingStep > 1) {
        onboardingStep -= 1;
        render();
      }
      return;
    }

    if (target.dataset.action === "ob-set-learner-child") {
      onboardingData.learnerType = "child";
      render();
      return;
    }

    if (target.dataset.action === "ob-set-learner-adult") {
      onboardingData.learnerType = "adult";
      render();
      return;
    }

    if (target.dataset.action === "ob-set-script-ajami") {
      onboardingData.scriptMode = "ajami";
      render();
      return;
    }

    if (target.dataset.action === "ob-set-script-latin") {
      onboardingData.scriptMode = "latin";
      render();
      return;
    }

    if (target.dataset.action === "settings-set-script-ajami") {
      await saveSettings({ scriptMode: "ajami" });
      return;
    }

    if (target.dataset.action === "settings-set-script-latin") {
      await saveSettings({ scriptMode: "latin" });
      return;
    }

    if (target.dataset.action === "open-lesson") {
      if (isModuleLocked(target.dataset.moduleId)) {
        return;
      }
      navigate("#/lesson/" + target.dataset.moduleId);
      return;
    }

    if (target.dataset.action === "open-quiz") {
      if (isModuleLocked(target.dataset.moduleId)) {
        return;
      }
      if (state.route.name === "lesson" && !canStartQuiz(target.dataset.moduleId)) {
        return;
      }
      ensureQuizSession(target.dataset.moduleId, true);
      navigate("#/quiz/" + target.dataset.moduleId);
      return;
    }

    if (target.dataset.action === "toggle-audio") {
      toggleLessonAudio();
      return;
    }

    if (target.dataset.action === "resume-audio") {
      resumeLessonAudio(target.dataset.seekSeconds);
      return;
    }

    if (target.dataset.action === "answer-micro-pause") {
      await submitMicroPauseAnswer(target.dataset.optionValue);
      return;
    }

    if (target.dataset.action === "answer-quiz-option") {
      await submitQuizAnswer(target.dataset.optionValue);
      return;
    }

    if (target.dataset.action === "retake-quiz") {
      retryQuizSession(target.dataset.moduleId);
      return;
    }

    if (target.dataset.action === "toggle-glossary-term") {
      toggleLessonGlossaryTerm(target.dataset.termKey);
      return;
    }

    if (target.dataset.action === "complete-module") {
      await markModuleComplete(target.dataset.moduleId);
      navigate("#/progress");
      return;
    }

    if (target.dataset.action === "reset-progress") {
      var shouldReset = window.confirm("Kana so ka share duk ci gaban koyo a wannan na'ura?");
      if (!shouldReset) {
        return;
      }

      await clearStore("progress");
      await setStreakData(DEFAULT_STREAK_DATA, { persist: true });
      state.progress = [];
      state.quizResults = null;
      state.activeLessonModuleId = null;
      teardownQuizSession();
      teardownLessonSession();
      await refreshStorageEstimate();
      render();
      return;
    }

    if (target.dataset.action === "start-audio-download") {
      await startAudioDownload();
      return;
    }

    if (target.dataset.action === "skip-audio-download") {
      await markAudioDownloadPromptSeen(true);
      navigate("#/learning-path");
      return;
    }

    if (target.dataset.action === "open-download-center") {
      navigate("#/download");
      return;
    }

    if (target.dataset.action === "delete-completed-audio") {
      await deleteAudioForCompletedModules();
      return;
    }

    if (target.dataset.action === "apply-content-update") {
      await applyContentUpdate();
      return;
    }

    if (target.dataset.action === "reload-app") {
      window.location.reload();
      return;
    }
  }

  async function handleSubmit(event) {
    var form = event.target;
    if (!form.matches("[data-quiz-form]")) {
      return;
    }

    event.preventDefault();

    var moduleId = form.getAttribute("data-module-id");
    var module = getModuleById(moduleId);

    if (!module || !state.quizSession || state.quizSession.moduleId !== moduleId) {
      ensureQuizSession(moduleId, true);
    }

    var questions = state.quizSession ? state.quizSession.questions : [];
    var formData = new FormData(form);
    var score = 0;

    questions.forEach(function (question, index) {
      var answer = formData.get("question-" + index);
      if (normalizeAnswerValue(answer) === normalizeAnswerValue(question.correctAnswer)) {
        score += 1;
      }
    });

    var currentRecord = getProgressRecord(moduleId);
    var attempts = (currentRecord.attempts || 0) + 1;
    var bestScore = Math.max(score, currentRecord.bestScore || 0);
    var passed = score >= PASSING_SCORE;
    var now = new Date().toISOString();

    await updateProgress(moduleId, {
      status: passed ? "completed" : "in-progress",
      attempts: attempts,
      lastScore: score,
      bestScore: bestScore,
      quizTakenAt: now,
      completedAt: passed ? now : currentRecord.completedAt || null,
      lastAccessedAt: now,
    }, { render: false });

    state.quizResults = {
      moduleId: moduleId,
      moduleTitle: module ? module.titleHa : "Darasi",
      score: score,
      total: questions.length,
      passed: passed,
    };
    state.quizSession = null;
    navigate("#/progress");
  }

  async function handleChange(event) {
    var target = event.target;
    if (!target.name) {
      return;
    }

    if (target.name === "audioMode") {
      await saveSettings({ audioMode: target.value });
      return;
    }

    if (target.name === "motionMode") {
      await saveSettings({ motionMode: target.value });
      return;
    }
  }

  function handleConnectivityChange() {
    state.connectivity = navigator.onLine;
    updateShellChrome();
    if (state.connectivity) {
      checkForContentUpdate().catch(logError);
      prepareDownloadSession(true).catch(logError);
    }
    render();
  }

  function handleServiceWorkerMessage(event) {
    var data = event && event.data ? event.data : {};

    if (data.type === "APP_UPDATE_AVAILABLE") {
      state.shellUpdateBanner = {
        cacheVersion: data.cacheVersion || "",
      };
      render();
    }
  }

  function navigate(hash) {
    if (window.location.hash === hash) {
      handleRouteChange().catch(logError);
      return;
    }

    window.location.hash = hash;
  }

  function ensureRoute() {
    if (!window.location.hash) {
      window.location.hash = state.settings.onboarded
        ? shouldPromptAudioDownload()
          ? "#/download"
          : "#/learning-path"
        : "#/onboarding";
    }

    handleRouteChange().catch(logError);
  }

  async function handleRouteChange() {
    var nextRoute = parseRoute(window.location.hash);
    var leavingLesson =
      state.route.name === "lesson" &&
      !(nextRoute.name === "lesson" && nextRoute.moduleId === state.route.moduleId);
    var leavingQuiz =
      state.route.name === "quiz" &&
      !(nextRoute.name === "quiz" && nextRoute.moduleId === state.route.moduleId);

    if (leavingLesson) {
      teardownLessonSession();
    }

    if (leavingQuiz) {
      teardownQuizSession();
    }

    state.route = nextRoute;

    if (!state.settings.onboarded && !isPublicRoute(state.route.name)) {
      navigate("#/onboarding");
      return;
    }

    if (state.settings.onboarded && state.route.name === "onboarding") {
      navigate("#/learning-path");
      return;
    }

    if (state.settings.onboarded && shouldPromptAudioDownload() && state.route.name !== "download") {
      navigate("#/download");
      return;
    }

    if (state.route.name === "lesson") {
      var lessonModule = getModuleById(state.route.moduleId);
      if (!lessonModule) {
        navigate("#/learning-path");
        return;
      }

      if (isModuleLocked(lessonModule.id)) {
        navigate("#/learning-path");
        return;
      }

      if (state.activeLessonModuleId !== lessonModule.id) {
        state.activeLessonModuleId = lessonModule.id;
      }

      await prepareLessonSession(lessonModule.id);
    } else {
      state.activeLessonModuleId = null;
    }

    if (state.route.name === "quiz") {
      var quizModule = getModuleById(state.route.moduleId);
      if (!quizModule) {
        navigate("#/learning-path");
        return;
      }

      if (isModuleLocked(quizModule.id)) {
        navigate("#/learning-path");
        return;
      }

      if (!canStartQuiz(quizModule.id) && !hasPassedModule(getProgressRecord(quizModule.id))) {
        navigate("#/lesson/" + quizModule.id);
        return;
      }

      ensureQuizSession(quizModule.id, false);
    }

    if (state.route.name === "progress") {
      await syncStreakState();
    }

    if (state.route.name === "download") {
      await markAudioDownloadPromptSeen(true);
      await prepareDownloadSession(true);
      await refreshStorageEstimate();
    }

    if (state.route.name === "settings") {
      await refreshStorageEstimate();
    }

    updateShellChrome();
    render();
  }

  function parseRoute(hash) {
    var cleanHash = (hash || "").replace(/^#\/?/, "");
    var segments = cleanHash ? cleanHash.split("/") : [];
    var name = segments[0] || (state.settings.onboarded ? "learning-path" : "onboarding");
    var moduleId = segments[1] || null;
    var validRoutes = [
      "onboarding",
      "learning-path",
      "caregiver",
      "caregiver-activity",
      "lesson",
      "quiz",
      "download",
      "progress",
      "glossary",
      "settings",
    ];

    if (validRoutes.indexOf(name) === -1) {
      return {
        name: state.settings.onboarded ? "learning-path" : "onboarding",
        moduleId: null,
      };
    }

    return { name: name, moduleId: moduleId };
  }

  function isPublicRoute(name) {
    return name === "onboarding";
  }

  function render() {
    var root = document.getElementById("app-root");
    if (!root) {
      return;
    }

    if (state.bootError) {
      root.innerHTML = renderScreenLayout(
        "settings",
        [
          '<section class="screen-panel">',
          '<p class="eyebrow">' + ha("An samu matsala") + "</p>",
          "<h2>" + ha("AJAMIX bai iya budewa ba.") + "</h2>",
          "<p>" + escapeHtml(state.bootError) + "</p>",
          '<button class="btn" data-route="#/onboarding" type="button">' + ha("Sake gwadawa") + "</button>",
          "</section>",
        ].join("")
      );
      return;
    }

    var screenMarkup = "";

    switch (state.route.name) {
      case "onboarding":
        screenMarkup = renderOnboardingScreen();
        break;
      case "learning-path":
        screenMarkup = renderLearningPathScreen();
        break;
      case "caregiver":
        screenMarkup = renderCaregiverScreen();
        break;
      case "caregiver-activity":
        screenMarkup = renderCaregiverActivityScreen();
        break;
      case "lesson":
        screenMarkup = renderLessonScreen();
        break;
      case "quiz":
        screenMarkup = renderQuizScreen();
        break;
      case "download":
        screenMarkup = renderDownloadScreen();
        break;
      case "progress":
        screenMarkup = renderProgressScreen();
        break;
      case "glossary":
        screenMarkup = renderGlossaryScreen();
        break;
      case "settings":
        screenMarkup = renderSettingsScreen();
        break;
      default:
        screenMarkup = renderLearningPathScreen();
    }

    root.innerHTML = renderScreenLayout(state.route.name, screenMarkup);
    syncActiveScreen().catch(logError);
  }

  function renderScreenLayout(screenName, content) {
    var showTabs = state.settings.onboarded && screenName !== "onboarding";
    return [
      '<section class="screen" data-screen="' + escapeHtml(screenName) + '">',
      renderAppBanners(),
      content,
      "</section>",
      showTabs ? renderTabs() : "",
    ].join("");
  }

  function renderOnboardingScreen() {
    var steps = [
      renderOnboardingStep1,
      renderOnboardingStep2,
      renderOnboardingStep3,
      renderOnboardingStep4,
      renderOnboardingStep5,
    ];
    var stepFn = steps[onboardingStep - 1] || renderOnboardingStep1;
    var progressDots = [1, 2, 3, 4, 5].map(function (n) {
      return '<span class="ob-dot' + (n === onboardingStep ? ' ob-dot--active' : (n < onboardingStep ? ' ob-dot--done' : '')) + '"></span>';
    }).join("");
    return [
      '<section class="screen-panel onboarding-screen">',
      '<div class="ob-progress">' + progressDots + "</div>",
      stepFn(),
      "</section>",
    ].join("");
  }

  function renderOnboardingStep1() {
    return [
      '<div class="ob-step">',
      '<div class="ob-hero">',
      '<div class="ob-logo">📖</div>',
      '<h1 class="ob-brand">AJAMIX</h1>',
      '<p class="ajami ob-ajami-tagline">أَجَامِكْس</p>',
      "</div>",
      '<div class="screen-heading">',
      "<h2>" + ha("Karatu cikin Hausa da Ajami") + "</h2>",
      '<p class="screen-copy">' + ha("AJAMIX tana kawo darussa na makaranta cikin yaren da kuka riga kuka sani - Hausa da Ajami. Ko da babu intanet.") + "</p>",
      "</div>",
      '<ul class="feature-strip">',
      "<li>" + ha("Ba a bukatar login. Komai yana ajiye a na'ura.") + "</li>",
      "<li>" + ha("Audio, tambayoyi, da ma'anoni - duka offline.") + "</li>",
      "<li>" + ha("Daga Nursery zuwa SS3, kowanne darasi yana nan.") + "</li>",
      "</ul>",
      '<div class="ob-nav ob-nav--end">',
      '<button class="btn" type="button" data-action="onboarding-next">' + ha("Gaba →") + "</button>",
      "</div>",
      "</div>",
    ].join("");
  }

  function renderOnboardingStep2() {
    return [
      '<div class="ob-step">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Matakin 2 na 5") + "</p>",
      "<h2>" + ha("Sunanka?") + "</h2>",
      '<p class="screen-copy">' + ha("Za a yi amfani da sunanka a cikin app. Wannan zaɓi ne - za ka iya bar shi fanko.") + "</p>",
      "</div>",
      '<div class="ob-field">',
      '<label class="ob-label" for="ob-name-input">' + ha("Suna") + "</label>",
      '<input class="text-input" id="ob-name-input" type="text" placeholder="' + ha("Misali: Ahmad") + '" maxlength="40" autocomplete="off" value="' + escapeAttribute(onboardingData.displayName) + '" />',
      "</div>",
      '<div class="ob-nav">',
      '<button class="ghost-btn" type="button" data-action="onboarding-back">' + ha("← Baya") + "</button>",
      '<button class="btn" type="button" data-action="onboarding-next">' + ha("Gaba →") + "</button>",
      "</div>",
      "</div>",
    ].join("");
  }

  function renderOnboardingStep3() {
    return [
      '<div class="ob-step">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Matakin 3 na 5") + "</p>",
      "<h2>" + ha("Wane ne mai koyo?") + "</h2>",
      '<p class="screen-copy">' + ha("Wannan yana taimaka wa AJAMIX wajen nuna tambayoyi da misalai masu dacewa.") + "</p>",
      "</div>",
      '<div class="ob-choice-grid">',
      '<button class="ob-choice' + (onboardingData.learnerType === "child" ? " ob-choice--active" : "") + '" type="button" data-action="ob-set-learner-child">',
      '<div class="ob-choice-icon">🧒</div>',
      "<strong>" + ha("Yaro") + "</strong>",
      "<span>" + ha("Ɗalibi mai shekara 8-18") + "</span>",
      "</button>",
      '<button class="ob-choice' + (onboardingData.learnerType === "adult" ? " ob-choice--active" : "") + '" type="button" data-action="ob-set-learner-adult">',
      '<div class="ob-choice-icon">🧑‍🦱</div>',
      "<strong>" + ha("Babba") + "</strong>",
      "<span>" + ha("Mai koyo a kasuwa ko gida") + "</span>",
      "</button>",
      "</div>",
      '<div class="ob-nav">',
      '<button class="ghost-btn" type="button" data-action="onboarding-back">' + ha("← Baya") + "</button>",
      '<button class="btn" type="button" data-action="onboarding-next">' + ha("Gaba →") + "</button>",
      "</div>",
      "</div>",
    ].join("");
  }

  function renderOnboardingStep4() {
    return [
      '<div class="ob-step">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Matakin 4 na 5") + "</p>",
      "<h2>" + ha("Yaya kake son karatu?") + "</h2>",
      '<p class="screen-copy">' + ha("Za ka iya canza wannan daga Settings a kowane lokaci.") + "</p>",
      "</div>",
      '<div class="ob-choice-grid">',
      '<button class="ob-choice ob-choice--script' + (onboardingData.scriptMode === "ajami" ? " ob-choice--active" : "") + '" type="button" data-action="ob-set-script-ajami">',
      '<div class="ob-script-sample ajami">أَجَامِي</div>',
      "<strong>" + ha("Ajami") + "</strong>",
      "<span>" + ha("Rubutun Larabci na Hausa") + "</span>",
      "</button>",
      '<button class="ob-choice ob-choice--script' + (onboardingData.scriptMode === "latin" ? " ob-choice--active" : "") + '" type="button" data-action="ob-set-script-latin">',
      '<div class="ob-script-sample">Ajami</div>',
      "<strong>" + ha("Hausa (Latin)") + "</strong>",
      "<span>" + ha("Haruffan boko na Hausa") + "</span>",
      "</button>",
      "</div>",
      '<div class="ob-nav">',
      '<button class="ghost-btn" type="button" data-action="onboarding-back">' + ha("← Baya") + "</button>",
      '<button class="btn" type="button" data-action="onboarding-next">' + ha("Gaba →") + "</button>",
      "</div>",
      "</div>",
    ].join("");
  }

  function renderOnboardingStep5() {
    return [
      '<div class="ob-step">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Matakin 5 na 5") + "</p>",
      "<h2>" + ha("Wane matakin karatu?") + "</h2>",
      '<p class="screen-copy">' + ha("Zabi matakin da ya dace. Za a iya canza wannan daga Settings.") + "</p>",
      "</div>",
      '<div class="band-grid">',
      renderGradeBandButton("nursery1", "Fara da lambobi, zane, da wasanni na farko.", true),
      renderGradeBandButton("nursery2", "Ci gaba da lambobi da kalmomin farko.", true),
      renderGradeBandButton("p1", "Kirgawa, ƙari, ragewa, da kimiyya ta farko.", true),
      renderGradeBandButton("p2", "Lissafi, Kimiyya, da Karatun Al'umma na P2.", true),
      renderGradeBandButton("p3", "Lissafi, Kimiyya, da Karatun Al'umma na P3.", true),
      renderGradeBandButton("p4", "Lissafi, Kimiyya, da Karatun Al'umma na P4.", true),
      renderGradeBandButton("p5", "Lissafi, Kimiyya, da Karatun Al'umma na P5.", true),
      renderGradeBandButton("p6", "Lissafi, Kimiyya, da Karatun Al'umma na P6.", true),
      renderGradeBandButton("jss1", "Junior Secondary School Year 1."),
      renderGradeBandButton("jss2", "Junior Secondary School Year 2."),
      renderGradeBandButton("jss3", "Junior Secondary School Year 3."),
      renderGradeBandButton("ss1", "Senior Secondary School Year 1."),
      renderGradeBandButton("ss2", "Senior Secondary School Year 2."),
      renderGradeBandButton("ss3", "Senior Secondary School Year 3."),
      "</div>",
      '<div class="ob-nav">',
      '<button class="ghost-btn" type="button" data-action="onboarding-back">' + ha("← Baya") + "</button>",
      "</div>",
      "</div>",
    ].join("");
  }

  function renderGradeBandButton(gradeBand, description, isHausaDescription) {
    var moduleCount = (state.modules || []).filter(function (m) {
      return m.gradeband === gradeBand;
    }).length;
    var hasBadge = moduleCount > 0
      ? '<span class="band-badge band-badge--live">' + ha(String(moduleCount) + " darasi") + "</span>"
      : '<span class="band-badge band-badge--soon">' + ha("Nan gaba") + "</span>";
    return [
      '<button class="band-option' + (moduleCount === 0 ? ' band-option--empty' : '') + '" type="button"',
      ' data-grade-band="' + escapeAttribute(gradeBand) + '">',
      '<div class="band-option-header">',
      '<strong class="band-option-label">' + escapeHtml(getGradeBandLabel(gradeBand)) + '</strong>',
      hasBadge,
      '</div>',
      '<span class="option-copy">' + (isHausaDescription ? ha(description) : escapeHtml(description)) + "</span>",
      "</button>",
    ].join("");
  }

  function renderQuizScreen() {
    var module = getModuleById(state.route.moduleId);

    if (!module) {
      return [
        '<section class="screen-panel">',
        "<h2>" + ha("Quiz din wannan darasi bai samu ba.") + "</h2>",
        '<button class="btn" data-route="#/learning-path" type="button">' + ha("Koma baya") + "</button>",
        "</section>",
      ].join("");
    }

    ensureQuizSession(module.id, false);

    var session = state.quizSession;

    if (!session || session.moduleId !== module.id) {
      return [
        '<section class="screen-panel">',
        '<p class="eyebrow">Quiz</p>',
        "<h2>" + ha("Ba a iya fara quiz yanzu ba.") + "</h2>",
        '<button class="btn" data-action="retake-quiz" data-module-id="' +
          escapeAttribute(module.id) +
          '" type="button">' + ha("Sake lodawa") + "</button>",
        "</section>",
      ].join("");
    }

    if (session.error) {
      return [
        '<section class="screen-panel quiz-shell">',
        '<p class="eyebrow">Quiz</p>',
        "<h2>" +
          (state.settings.scriptMode === "ajami"
            ? '<span class="ajami">' + formatAjamiText(getDisplayTitle(module)) + "</span>"
            : escapeHtml(getDisplayTitle(module))) +
          "</h2>",
        '<p class="helper-text">' + escapeHtml(session.error) + "</p>",
        '<div class="btn-row">',
        '<button class="btn btn-primary" type="button" data-action="retake-quiz" data-module-id="' +
          escapeAttribute(module.id) +
          '">' + ha("Sake gwadawa") + "</button>",
        '<button class="ghost-btn" data-route="#/learning-path" type="button">' + ha("Koma baya") + "</button>",
        "</div>",
        "</section>",
      ].join("");
    }

    if (session.completed) {
      return renderQuizResultsScreen(module, session);
    }

    var question = session.questions[session.currentIndex];
    var totalQuestions = session.questions.length;

    if (!question) {
      return [
        '<section class="screen-panel quiz-shell">',
        '<p class="eyebrow">Quiz</p>',
        "<h2>" + ha("Tambayoyin quiz ba su cika ba.") + "</h2>",
        '<button class="btn" type="button" data-action="retake-quiz" data-module-id="' +
          escapeAttribute(module.id) +
          '">' + ha("Sake quiz") + "</button>",
        "</section>",
      ].join("");
    }

    var optionMarkup = question.options
      .map(function (option) {
        var classes = ["answer-option", "answer-option-button"];
        var isSelected = session.selectedOption === option;
        var isCorrect =
          session.feedbackState &&
          normalizeAnswerValue(option) === normalizeAnswerValue(question.correctAnswer);
        var isWrongSelected = session.feedbackState === "incorrect" && isSelected;

        if (isSelected) {
          classes.push("is-selected");
        }

        if (isCorrect) {
          classes.push("is-correct");
        } else if (isWrongSelected) {
          classes.push("is-wrong");
        }

        return [
          '<button class="' + classes.join(" ") + '" type="button" data-action="answer-quiz-option" data-option-value="' +
            escapeAttribute(option) +
            '"' +
            (session.feedbackState ? " disabled" : "") +
            ">",
          '<span class="math-value">' + escapeHtml(option) + "</span>",
          "</button>",
        ].join("");
      })
      .join("");

    var feedbackMarkup = "";

    if (session.feedbackState === "correct") {
      feedbackMarkup = '<p class="quiz-feedback is-correct">' + ha("Daidai ne. Mu je tambaya ta gaba.") + "</p>";
    } else if (session.feedbackState === "incorrect") {
      feedbackMarkup =
        '<p class="quiz-feedback is-wrong">' + ha("Ba daidai ba. Amsa ita ce ") +
        escapeHtml(question.correctAnswer) +
        ".</p>";
    }

    return [
      '<section class="screen-panel quiz-shell">',
      '<div class="screen-heading">',
      '<p class="eyebrow">Quiz</p>',
      "<h2>" +
        (state.settings.scriptMode === "ajami"
          ? '<span class="ajami">' + formatAjamiText(getDisplayTitle(module)) + "</span>"
          : escapeHtml(getDisplayTitle(module))) +
        "</h2>",
      '<p class="screen-copy">' + ha("Ka amsa tambaya daya bayan daya. AJAMIX za ta duba sakamakon ta atomatik.") + "</p>",
      "</div>",
      '<div class="quiz-progress-row">',
      '<span class="pill quiz-progress-pill">' + escapeHtml(String(session.currentIndex + 1)) + "/" + escapeHtml(String(totalQuestions)) + "</span>",
      '<span class="pill quiz-score-pill">' + ha("Maki ") + escapeHtml(String(session.score)) + "</span>",
      "</div>",
      '<article class="quiz-question-card">',
      '<p class="quiz-question-text' + (state.settings.scriptMode === "ajami" ? ' ajami' : "") + '">' +
        getDisplayQuestion(question.questionText, question.templateAjami) +
        "</p>",
      '<div class="quiz-options">' + optionMarkup + "</div>",
      feedbackMarkup,
      "</article>",
      '<div class="btn-row">',
      '<button class="ghost-btn" data-route="#/learning-path" type="button">' + ha("Koma baya") + "</button>",
      "</div>",
      "</section>",
    ].join("");
  }

  function renderProgressScreen() {
    var selectedModules = getSelectedModules();
    var streakData = state.streakData || normalizeStreakData();
    var completedCount = selectedModules.filter(function (module) {
      return hasPassedModule(getProgressRecord(module.id));
    }).length;
    var startedCount = selectedModules.filter(function (module) {
      return hasStartedModule(getProgressRecord(module.id));
    }).length;
    var bestScoreTotal = selectedModules.reduce(function (accumulator, module) {
      var record = getProgressRecord(module.id);
      return accumulator + (record.bestScore || 0);
    }, 0);
    var possibleScoreTotal = selectedModules.reduce(function (accumulator, module) {
      return accumulator + module.quizQuestions.length;
    }, 0);
    var progressPct = selectedModules.length ? Math.round((completedCount / selectedModules.length) * 100) : 0;
    var resultBanner = state.quizResults
      ? [
          '<section class="screen-panel">',
          '<p class="eyebrow">' + ha("Sabon sakamako") + "</p>",
          "<h2>" + ha(state.quizResults.moduleTitle) + "</h2>",
          "<p>" + ha("Ka samu ") +
            escapeHtml(String(state.quizResults.score)) +
            ha(" cikin ") +
            escapeHtml(String(state.quizResults.total)) +
            (state.quizResults.passed
              ? ha(" a quiz na baya-bayan nan. An bude mataki na gaba idan akwai shi.")
              : ha(" a quiz na baya-bayan nan. Ka sake gwadawa domin ka kai maki 3/5.")) +
            "</p>" +
            '<span class="pill">AUTO_VERIFIED</span>',
          "</section>",
        ].join("")
      : "";

    var moduleProgress = selectedModules
      .map(function (module) {
        var record = getProgressRecord(module.id);
        var moduleMetrics = getModuleProgressMetrics(module, record);

        return [
          '<article class="metric-panel module-progress-card">',
          '<div class="progress-row">',
          '<div class="screen-stack">',
          "<strong>" + ha(module.titleHa) + "</strong>",
          '<span class="ajami">' + formatAjamiText(module.titleAjami) + "</span>",
          "</div>",
          '<span class="' + getStatusBadgeClass(moduleMetrics.status) + '">' + getStatusCopy(moduleMetrics.status) + "</span>",
          "</div>",
          '<div class="module-progress-metrics">',
          '<span class="pill">Audio ' + escapeHtml(String(moduleMetrics.audioPct)) + "%</span>",
          '<span class="pill">' + ha("Tsayawa ") +
            escapeHtml(String(moduleMetrics.microPauseCorrect)) +
            "/" +
            escapeHtml(String(moduleMetrics.microPauseTotal)) +
            " · " +
            escapeHtml(String(moduleMetrics.microPauseAccuracy)) +
            '%</span>',
          '<span class="pill">Quiz ' + ha(moduleMetrics.quizScoreText) + "</span>",
          "</div>",
          '<div class="module-progress-bars">',
          '<div class="progress-stat-row"><span>Audio</span><div class="progress-stat-rail"><span class="progress-stat-fill is-audio" style="width: ' +
            escapeAttribute(String(moduleMetrics.audioPct)) +
            '%;"></span></div></div>',
          '<div class="progress-stat-row"><span>' + ha("Tsayawa") + '</span><div class="progress-stat-rail"><span class="progress-stat-fill is-micro" style="width: ' +
            escapeAttribute(String(moduleMetrics.microPauseAccuracy)) +
            '%;"></span></div></div>',
          '<div class="progress-stat-row"><span>Quiz</span><div class="progress-stat-rail"><span class="progress-stat-fill is-quiz" style="width: ' +
            escapeAttribute(String(moduleMetrics.quizPct)) +
            '%;"></span></div></div>',
          "</div>",
          '<div class="helper-row">',
          "<span>Attempts: " + escapeHtml(String(record.attempts || 0)) + "</span>",
          "<span>" + getLastActivityCopy(record) + "</span>",
          "</div>",
          "</article>",
        ].join("");
      })
      .join("");

    return [
      resultBanner,
      '<section class="screen-panel progress-overview-screen">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Ci gaba") + "</p>",
      "<h2>" + ha("Abin da aka kammala a ") + escapeHtml(getGradeBandLabel(state.settings.gradeBand)) + "</h2>",
      '<p class="screen-copy">' + ha("Flame streak yana nuna yawan ranakun da aka ci gaba da koyon lissafi, sannan kowane module yana nuna audio, tsayawar fahimta, da quiz.") + "</p>",
      "</div>",
      '<article class="metric-panel streak-panel">',
      '<div class="progress-row">',
      "<strong>" + ha("Wutar ranaku") + "</strong>",
      '<span class="status-badge path-badge is-' + escapeAttribute(streakData.streakState) + '">' + getStreakStateCopy(streakData.streakState) + "</span>",
      "</div>",
      '<div class="flame-streak">' + renderFlames(streakData, STREAK_VISUAL_COUNT) + "</div>",
      '<div class="streak-summary"><strong>' + escapeHtml(String(streakData.streakDays || 0)) + "</strong><span>" + ha("Ranaku a streak") + "</span></div>",
      '<p class="helper-text">' + getStreakSupportCopy(streakData) + "</p>",
      "</article>",
      '<div class="path-progress-shell">',
      '<div class="path-progress-copy"><strong>' +
        completedCount +
        "/" +
        selectedModules.length +
        "</strong><span>" + ha("Modules an wuce") + "</span></div>",
      '<div class="path-progress-rail"><span class="path-progress-fill" style="width: ' + progressPct + '%;"></span></div>',
      "</div>",
      '<div class="metrics-grid">',
      '<article class="metric-panel"><span>' + ha("An fara modules") + "</span><strong>" + startedCount + "</strong></article>",
      '<article class="metric-panel"><span>' + ha("Modules da aka gama") + "</span><strong>" + completedCount + "</strong></article>",
      '<article class="metric-panel"><span>Best quiz total</span><strong>' +
        bestScoreTotal +
        "/" +
        possibleScoreTotal +
        "</strong></article>",
      "</div>",
      "</section>",
      '<section class="settings-grid module-progress-grid">' + moduleProgress + "</section>",
    ].join("");
  }

  function renderGlossaryScreen() {
    var glossaryItems = state.glossary.length
      ? state.glossary
          .map(function (item) {
            return [
              '<li class="glossary-item">',
              "<strong>" + ha(getGlossaryHausa(item)) + "</strong>",
              '<span class="ajami">' + formatAjamiText(getGlossaryAjami(item)) + "</span>",
              "<span>" + ha(getGlossaryMeaningHa(item)) + "</span>",
              '<span class="muted-copy">' + escapeHtml(getGlossaryMeaningEn(item)) + "</span>",
              "</li>",
            ].join("");
          })
          .join("")
      : '<li class="glossary-item">' + ha("Babu bayanan glossary a cikin bundle yanzu.") + "</li>";

    return [
      '<section class="screen-panel">',
      '<div class="screen-back-row">',
      '<button class="btn-back ghost-btn" type="button" data-route="#/learning-path">' + ha("← Komawa") + "</button>",
      '</div>',
      '<div class="screen-heading">',
      '<p class="eyebrow">Glossary</p>',
      "<h2>" + ha("Kalmomin lissafi cikin Hausa da Ajami") + "</h2>",
      '<p class="screen-copy">' + ha("Wannan sashe yana nuna kalmomi na kowa da aka fi amfani da su a modules. Ana iya fadada shi daga content bundle ko pipeline na CSV.") + "</p>",
      "</div>",
      '<ul class="glossary-list">' + glossaryItems + "</ul>",
      "</section>",
    ].join("");
  }

  function renderDownloadScreen() {
    var session = state.downloadSession || buildEmptyDownloadSession();
    var completedCount = session.items.filter(function (item) {
      return item.status === "completed";
    }).length;
    var totalFiles = session.items.length;
    var totalSizeCopy = formatBytes(session.totalEstimatedBytes || 0);
    var downloadItems = session.items.length
      ? session.items
          .map(function (item) {
            return [
              '<li class="download-item">',
              '<div class="progress-row">',
              "<strong>" + ha(item.titleHa) + "</strong>",
              '<span class="' + getDownloadStatusBadgeClass(item.status) + '">' + getDownloadStatusCopy(item.status) + "</span>",
              "</div>",
              '<span class="muted-copy">' +
                escapeHtml(item.url) +
                (item.sizeBytes ? " • " + escapeHtml(formatBytes(item.sizeBytes)) : "") +
                "</span>",
              '<div class="progress-stat-rail"><span class="progress-stat-fill is-audio" style="width: ' +
                escapeAttribute(String(item.progressPct || 0)) +
                '%;"></span></div>',
              "</li>",
            ].join("");
          })
          .join("")
      : '<li class="download-item">' + ha("Babu audio files na wannan grade band a bundle din yanzu.") + "</li>";

    return [
      '<section class="screen-panel download-screen">',
      '<div class="screen-heading">',
      '<p class="eyebrow">Download Audio</p>',
      "<h2>" + ha("Adana sautukan ") + escapeHtml(getGradeBandLabel(state.settings.gradeBand)) + ha(" domin offline") + "</h2>",
      '<p class="screen-copy">' + ha("Zaka iya sauke duk audio na wannan mataki yanzu, ko kuma ka bar AJAMIX ta yi streaming a lokacin da ake bukata idan akwai intanet.") + "</p>",
      "</div>",
      '<div class="metrics-grid">',
      '<article class="metric-panel"><span>' + ha("Fayiloli") + "</span><strong>" + completedCount + "/" + totalFiles + "</strong></article>",
      '<article class="metric-panel"><span>' + ha("Kimanin girma") + "</span><strong>" + escapeHtml(totalSizeCopy) + "</strong></article>",
      '<article class="metric-panel"><span>' + ha("Yanayi") + "</span><strong>" + getDownloadStatusCopy(session.status) + "</strong></article>",
      "</div>",
      '<div class="btn-row">',
      '<button class="btn" type="button" data-action="start-audio-download"' +
        (!state.connectivity || !session.items.length || session.active ? " disabled" : "") +
        ">" +
        (session.readyForOffline ? ha("Sake duba audio") : "Download All") +
        "</button>",
      '<button class="ghost-btn" type="button" data-action="skip-audio-download">' + ha("Tsallake yanzu") + "</button>",
      "</div>",
      session.readyForOffline
        ? '<article class="metric-panel ready-offline-panel"><strong>Ready for offline!</strong><span>' + ha("Audio na wannan mataki ya shiga na'urar, kuma darussa za su yi aiki ko da babu intanet.") + "</span></article>"
        : "",
      session.error ? '<p class="helper-text">' + ha(session.error) + "</p>" : "",
      !state.connectivity ? '<p class="helper-text">' + ha("Kana offline yanzu. Download audio yana bukatar network idan ba a taba adana fayil din ba.") + "</p>" : "",
      '<ul class="settings-list download-list">' + downloadItems + "</ul>",
      session.readyForOffline
        ? '<button class="btn" type="button" data-route="#/learning-path">' + ha("Shiga koyo") + "</button>"
        : "",
      "</section>",
    ].join("");
  }

  function renderSettingsScreen() {
    var audioState = normalizeAudioDownloadState(state.settings.audioDownloadState);
    var storageCopy = state.storageEstimate
      ? formatBytes(state.storageEstimate.usage || 0) +
        (state.storageEstimate.quota ? " / " + formatBytes(state.storageEstimate.quota) : "")
      : ha("Ana lissafawa...");
    var audioStorageCopy = state.storageEstimate
      ? formatBytes(state.storageEstimate.audioBytes || 0)
      : ha("Ana lissafawa...");

    return [
      '<section class="screen-panel settings-screen">',
      '<div class="screen-heading">',
      '<p class="eyebrow">Settings</p>',
      "<h2>" + ha("Saituna na wannan na'ura") + "</h2>",
      '<p class="screen-copy">' + ha("Ba a hada asusu ba. Ana adana settings, content, da progress a IndexedDB a cikin wannan browser.") + "</p>",
      "</div>",
      '<div class="settings-grid">',
      '<article class="settings-panel">',
      "<h3>Grade band</h3>",
      '<div class="band-grid">',
      renderGradeBandButton("nursery1", "Fara da lambobi, zane, da wasanni na farko.", true),
      renderGradeBandButton("nursery2", "Ci gaba da lambobi da kalmomin farko.", true),
      renderGradeBandButton("p1", "Kirgawa, ƙari, ragewa, da kimiyya ta farko.", true),
      renderGradeBandButton("p2", "Lissafi, Kimiyya, da Karatun Al'umma na P2.", true),
      renderGradeBandButton("p3", "Lissafi, Kimiyya, da Karatun Al'umma na P3.", true),
      renderGradeBandButton("p4", "Lissafi, Kimiyya, da Karatun Al'umma na P4.", true),
      renderGradeBandButton("p5", "Lissafi, Kimiyya, da Karatun Al'umma na P5.", true),
      renderGradeBandButton("p6", "Lissafi, Kimiyya, da Karatun Al'umma na P6.", true),
      renderGradeBandButton("jss1", "Junior Secondary School Year 1."),
      renderGradeBandButton("jss2", "Junior Secondary School Year 2."),
      renderGradeBandButton("jss3", "Junior Secondary School Year 3."),
      renderGradeBandButton("ss1", "Senior Secondary School Year 1."),
      renderGradeBandButton("ss2", "Senior Secondary School Year 2."),
      renderGradeBandButton("ss3", "Senior Secondary School Year 3."),
      "</div>",
      "</article>",
      '<article class="settings-panel">',
      '<div class="settings-section">',
      "<h3>" + ha("Salon rubutu") + "</h3>",
      '<div class="ob-choice-grid ob-choice-grid--compact">',
      '<button class="ob-choice' + (state.settings.scriptMode === "ajami" ? ' ob-choice--active' : '') + '" type="button" data-action="settings-set-script-ajami">',
      '<div class="ob-script-sample ajami">أَجَامِي</div>',
      "<strong>" + ha("Ajami") + "</strong>",
      "</button>",
      '<button class="ob-choice' + (state.settings.scriptMode === "latin" ? ' ob-choice--active' : '') + '" type="button" data-action="settings-set-script-latin">',
      '<div class="ob-script-sample">Ajami</div>',
      "<strong>" + ha("Hausa") + "</strong>",
      "</button>",
      "</div>",
      '<div class="script-preview' + (state.settings.scriptMode === "ajami" ? ' ajami' : '') + '">',
      state.settings.scriptMode === "ajami"
        ? '<p>' + formatAjamiText(romanToAjami("Ina zuwa kasuwa")) + '</p>'
        : '<p>' + ha("Ina zuwa kasuwa") + "</p>",
      '<p class="script-preview-label">(' +
        (state.settings.scriptMode === "ajami" ? ha("Ajami") : ha("Hausa Latin")) +
        ')</p>',
      '</div>',
      "</div>",
      "<h3>Audio caching</h3>",
      '<ul class="settings-list">',
      '<li><label><input type="radio" name="audioMode" value="on-demand" ' +
        (state.settings.audioMode === "on-demand" ? "checked" : "") +
        ' /> Download audio on demand</label></li>',
      '<li><label><input type="radio" name="audioMode" value="wifi-only" ' +
        (state.settings.audioMode === "wifi-only" ? "checked" : "") +
        ' /> Download audio on Wi-Fi only</label></li>',
      "</ul>",
      "<h3>Motion</h3>",
      '<ul class="settings-list">',
      '<li><label><input type="radio" name="motionMode" value="full" ' +
        (state.settings.motionMode === "full" ? "checked" : "") +
        ' /> Full motion</label></li>',
      '<li><label><input type="radio" name="motionMode" value="reduced" ' +
        (state.settings.motionMode === "reduced" ? "checked" : "") +
        ' /> Reduced motion</label></li>',
      "</ul>",
      '<div class="screen-stack">',
      '<span class="pill">Audio status: ' + getDownloadStatusCopy(audioState.status) + "</span>",
      '<span class="pill">Storage used: ' + storageCopy + "</span>",
      '<span class="pill">Audio stored: ' + audioStorageCopy + "</span>",
      "</div>",
      '<div class="btn-row">',
      '<button class="secondary-btn" type="button" data-action="open-download-center">' + ha("Bude download audio") + "</button>",
      '<button class="ghost-btn" type="button" data-action="delete-completed-audio">' + ha("Goge audio na modules da aka gama") + "</button>",
      "</div>",
      "</article>",
      "</div>",
      '<div class="helper-row"><span class="pill">Bundle: ' +
        escapeHtml(state.settings.contentVersion || "sample-bundle") +
        '</span><span class="pill">IndexedDB stores: settings, modules, audioCache, progress, glossary</span></div>',
      '<button class="ghost-btn" type="button" data-action="reset-progress">' + ha("Share progress a wannan na'ura") + "</button>",
      "</section>",
    ].join("");
  }

  function renderAppBanners() {
    var banners = [];

    if (state.shellUpdateBanner) {
      banners.push(
        [
          '<section class="app-banner is-shell-update">',
          "<strong>" + ha("Sabon sigar AJAMIX ta iso.") + "</strong>",
          '<button class="secondary-btn" type="button" data-action="reload-app">' + ha("Sabunta app") + "</button>",
          "</section>",
        ].join("")
      );
    }

    if (state.contentUpdateBanner) {
      banners.push(
        [
          '<section class="app-banner is-content-update">',
          "<strong>" +
            (state.contentUpdateBanner.error
              ? escapeHtml(state.contentUpdateBanner.error)
              : ha("Sabon abun ciki yana samuwa.")) +
            "</strong>",
          '<button class="secondary-btn" type="button" data-action="apply-content-update">' + ha("Sabunta yanzu") + "</button>",
          "</section>",
        ].join("")
      );
    }

    return banners.join("");
  }

  function renderTabs() {
    var tabs = [
      { name: "learning-path", label: ha("Koyo"), route: "#/learning-path" },
      { name: "progress", label: ha("Ci gaba"), route: "#/progress" },
      { name: "glossary", label: ha("Kalmomi"), route: "#/glossary" },
    ];

    return [
      '<nav class="tab-bar" aria-label="Primary navigation">',
      tabs
        .map(function (tab) {
          return [
            '<button class="tab-button ' +
              (state.route.name === tab.name ? "is-active" : "") +
              '" type="button" data-route="' +
              escapeAttribute(tab.route) +
              '">',
            tab.label,
            "</button>",
          ].join("");
        })
        .join(""),
      "</nav>",
    ].join("");
  }

  function renderFlames(streakData, totalCount) {
    var activeCount = Math.max(
      0,
      Math.min(totalCount, Number(streakData && streakData.streakDays ? streakData.streakDays : 0))
    );
    var stateName = streakData && streakData.streakState ? streakData.streakState : "out";
    var markup = "";

    for (var index = 0; index < totalCount; index += 1) {
      var className = "streak-flame is-out";
      if (index < activeCount) {
        className = "streak-flame is-" + stateName;
      }

      markup += '<span class="' + className + '" aria-hidden="true"></span>';
    }

    return markup;
  }

  function normalizeStreakData(value) {
    var next = Object.assign({}, DEFAULT_STREAK_DATA, value || {});
    next.streakDays = Math.max(0, Number(next.streakDays || 0));
    next.streakState = ["bright", "dim", "out"].indexOf(next.streakState) >= 0 ? next.streakState : "out";
    next.lastActivityDate = next.lastActivityDate ? String(next.lastActivityDate) : null;
    return next;
  }

  async function setStreakData(nextStreakData, options) {
    var updateOptions = Object.assign({ persist: false }, options || {});
    var normalized = normalizeStreakData(nextStreakData);

    state.streakData = normalized;
    state.settings.streakData = normalized;

    if (updateOptions.persist) {
      await putRecord("settings", {
        key: "streakData",
        value: normalized,
      });
    }

    return normalized;
  }

  async function syncStreakState() {
    var streakData = normalizeStreakData(state.streakData || state.settings.streakData);
    var nextStreakData = Object.assign({}, streakData);

    if (!nextStreakData.lastActivityDate) {
      nextStreakData.streakDays = 0;
      nextStreakData.streakState = "out";
    } else {
      var daysSince = getDaysSinceDateKey(nextStreakData.lastActivityDate, getTodayDateKey());

      if (daysSince <= 1) {
        nextStreakData.streakState = "bright";
      } else if (daysSince <= STREAK_DIM_THRESHOLD_DAYS) {
        nextStreakData.streakState = "dim";
      } else {
        nextStreakData.streakState = "out";
        nextStreakData.streakDays = 0;
      }
    }

    var didChange = JSON.stringify(nextStreakData) !== JSON.stringify(streakData);
    return setStreakData(nextStreakData, { persist: didChange });
  }

  async function recordLearningActivity() {
    var streakData = await syncStreakState();
    var today = getTodayDateKey();
    var nextStreakData = Object.assign({}, streakData);
    var daysSince = streakData.lastActivityDate ? getDaysSinceDateKey(streakData.lastActivityDate, today) : null;

    if (!streakData.lastActivityDate) {
      nextStreakData.streakDays = 1;
      nextStreakData.lastActivityDate = today;
      nextStreakData.streakState = "bright";
      return setStreakData(nextStreakData, { persist: true });
    }

    if (daysSince <= 0) {
      nextStreakData.streakDays = Math.max(1, streakData.streakDays || 0);
      nextStreakData.lastActivityDate = today;
      nextStreakData.streakState = "bright";
      return setStreakData(nextStreakData, { persist: true });
    }

    if (daysSince === 1) {
      nextStreakData.streakDays = Math.max(1, streakData.streakDays || 0) + 1;
      nextStreakData.lastActivityDate = today;
      nextStreakData.streakState = "bright";
      return setStreakData(nextStreakData, { persist: true });
    }

    if (daysSince <= STREAK_DIM_THRESHOLD_DAYS) {
      nextStreakData.lastActivityDate = today;
      nextStreakData.streakDays = Math.max(1, streakData.streakDays || 0);
      nextStreakData.streakState = "bright";
      return setStreakData(nextStreakData, { persist: true });
    }

    nextStreakData.lastActivityDate = today;
    nextStreakData.streakDays = 1;
    nextStreakData.streakState = "bright";
    return setStreakData(nextStreakData, { persist: true });
  }

  function getTodayDateKey() {
    var now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
  }

  function getDaysSinceDateKey(lastDateKey, todayDateKey) {
    if (!lastDateKey || !todayDateKey) {
      return 0;
    }

    var lastDate = parseDateKey(lastDateKey);
    var today = parseDateKey(todayDateKey);

    if (!lastDate || !today) {
      return 0;
    }

    return Math.max(0, Math.floor((today.getTime() - lastDate.getTime()) / 86400000));
  }

  function parseDateKey(dateKey) {
    var parts = String(dateKey || "").split("-");
    if (parts.length !== 3) {
      return null;
    }

    var year = Number(parts[0]);
    var month = Number(parts[1]) - 1;
    var day = Number(parts[2]);

    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
      return null;
    }

    return new Date(year, month, day);
  }

  function getStreakStateCopy(stateName) {
    if (stateName === "bright") {
      return ha("Yana haske");
    }

    if (stateName === "dim") {
      return ha("Ya dan dusashe");
    }

    return ha("A kashe");
  }

  function getStreakSupportCopy(streakData) {
    if (!streakData.lastActivityDate || streakData.streakState === "out") {
      return ha("Ka fara sabuwar streak ta yau ta hanyar shiga darasi ko quiz.");
    }

    if (streakData.streakState === "dim") {
      return ha("An yi kwanaki kadan ba tare da koyon lissafi ba. Ka dawo yau domin wutar ta sake karfi.");
    }

    return ha("Kana kan hanya mai kyau. Ci gaba da buda darasi ko quiz kullum domin streak ta dore.");
  }

  function getModuleProgressMetrics(module, record) {
    var totalMicroPauses = Array.isArray(module.microPauses) ? module.microPauses.length : 0;
    var answeredMicroPauses = Array.isArray(record.microPauseData) ? record.microPauseData.length : 0;
    var correctMicroPauses = Array.isArray(record.microPauseData)
      ? record.microPauseData.filter(function (item) {
          return item.correct;
        }).length
      : 0;
    var microPauseAccuracy = answeredMicroPauses
      ? Math.round((correctMicroPauses / answeredMicroPauses) * 100)
      : 0;
    var quizBestScore = typeof record.bestScore === "number" ? record.bestScore : 0;
    var quizPct = module.quizQuestions.length
      ? Math.round((quizBestScore / module.quizQuestions.length) * 100)
      : 0;

    return {
      status: hasPassedModule(record)
        ? "completed"
        : hasStartedModule(record)
          ? "in-progress"
          : "not-started",
      audioPct: Math.max(0, Math.min(100, Number(record.audioListenedPct || 0))),
      microPauseAccuracy: Math.max(0, Math.min(100, microPauseAccuracy)),
      microPauseCorrect: correctMicroPauses,
      microPauseTotal: totalMicroPauses,
      quizPct: Math.max(0, Math.min(100, quizPct)),
      quizScoreText: record.attempts || typeof record.score === "number"
        ? quizBestScore + "/" + module.quizQuestions.length
        : "Ba a yi ba",
    };
  }

  function getLastActivityCopy(record) {
    if (record.completedAt) {
      return ha("An gama");
    }

    if (record.lastAccessedAt) {
      return ha("An taba budewa");
    }

    return ha("Ba a fara ba");
  }

  async function syncActiveScreen() {
    if (state.route.name === "lesson") {
      await syncLessonScreen();
      return;
    }

    if (state.route.name === "caregiver-activity") {
      await syncCaregiverActivityScreen();
    }
  }

  function buildLearningPath() {
    var modules = getSelectedModules();
    var progressMap = buildProgressMap();

    return modules.map(function (module, index) {
      var record = progressMap[module.id] || getProgressRecord(module.id);
      return {
        module: module,
        record: record,
        state: getPathStateFromContext(modules, index, progressMap),
      };
    });
  }

  function getPathStateFromContext(modules, index, progressMap) {
    var module = modules[index];
    var record = progressMap[module.id] || getProgressRecord(module.id);
    var previousModule = index > 0 ? modules[index - 1] : null;
    var previousRecord = previousModule ? progressMap[previousModule.id] || getProgressRecord(previousModule.id) : null;
    var isUnlocked = index === 0 || hasPassedModule(previousRecord);

    if (hasPassedModule(record)) {
      return "completed";
    }

    if (record.status === "in-progress" || record.audioListenedPct > 0 || countAnsweredMicroPauses(record) > 0) {
      return "in-progress";
    }

    return isUnlocked ? "available" : "locked";
  }

  function getNextLearningPathEntry(learningPath) {
    return learningPath.find(function (entry) {
      return entry.state === "in-progress" || entry.state === "available";
    }) || null;
  }

  function getModuleAccessState(moduleId) {
    var entry = buildLearningPath().find(function (item) {
      return item.module.id === moduleId;
    });

    return entry ? entry.state : "locked";
  }

  function isModuleLocked(moduleId) {
    return getModuleAccessState(moduleId) === "locked";
  }

  function hasPassedModule(record) {
    return Number(record && record.bestScore ? record.bestScore : 0) >= PASSING_SCORE;
  }

  function hasStartedModule(record) {
    return Boolean(
      record &&
        (hasPassedModule(record) ||
          record.status === "in-progress" ||
          Number(record.audioListenedPct || 0) > 0 ||
          countAnsweredMicroPauses(record) > 0 ||
          Number(record.attempts || 0) > 0 ||
          typeof record.score === "number")
    );
  }

  function getPathStateCopy(stateName) {
    if (stateName === "completed") {
      return ha("An wuce");
    }

    if (stateName === "in-progress") {
      return ha("Ana yi");
    }

    if (stateName === "available") {
      return ha("A bude");
    }

    return ha("A kulle");
  }

  function getPathBadgeClass(stateName) {
    return "status-badge path-badge is-" + stateName;
  }

  function countAnsweredMicroPauses(record) {
    return Array.isArray(record.microPauseData) ? record.microPauseData.length : 0;
  }

  async function prepareLessonSession(moduleId) {
    if (state.lessonSession && state.lessonSession.moduleId === moduleId) {
      return;
    }

    teardownLessonSession();
    state.lessonSession = buildLessonSessionSnapshot(moduleId);
    await recordLessonOpen(moduleId);
  }

  function teardownLessonSession() {
    var audio = document.querySelector("[data-lesson-audio]");
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
    }

    if (state.lessonSession && state.lessonSession.objectUrl) {
      URL.revokeObjectURL(state.lessonSession.objectUrl);
    }

    state.lessonSession = null;
  }

  async function syncLessonScreen() {
    var module = getModuleById(state.route.moduleId);
    var session = state.lessonSession;
    var audio = document.querySelector("[data-lesson-audio]");

    if (!module || !session || !audio) {
      return;
    }

    if (!audio.dataset.bound) {
      audio.dataset.bound = "true";
      bindLessonAudioElement(audio, module.id);
    }

    if (!audio.getAttribute("src")) {
      var source = await resolveLessonAudioSource(module);

      if (!state.lessonSession || state.lessonSession.moduleId !== module.id) {
        if (source.objectUrl) {
          URL.revokeObjectURL(source.objectUrl);
        }
        return;
      }

      if (state.lessonSession.objectUrl && source.objectUrl && state.lessonSession.objectUrl !== source.objectUrl) {
        URL.revokeObjectURL(state.lessonSession.objectUrl);
      }

      state.lessonSession.objectUrl = source.objectUrl || state.lessonSession.objectUrl;
      state.lessonSession.audioSource = source.url;
      audio.setAttribute("src", source.url);
      audio.load();
    }

    syncLessonUi();
  }

  async function syncCaregiverActivityScreen() {
    var caregiverActivity = getActivityById(state.route.moduleId);
    var audio = document.querySelector("[data-lesson-audio]");

    if (!caregiverActivity || !audio) {
      return;
    }

    if (!audio.dataset.bound) {
      audio.dataset.bound = "true";
      bindCaregiverAudioElement(audio);
    }

    if (!audio.getAttribute("src") && caregiverActivity.audioFile) {
      audio.dataset.errorMessage = "";
      audio.setAttribute("src", caregiverActivity.audioFile);
      audio.load();
    }

    syncCaregiverActivityUi(caregiverActivity);
  }

  function bindLessonAudioElement(audio, moduleId) {
    audio.addEventListener("loadedmetadata", function () {
      handleLessonMetadataLoaded(audio, moduleId);
    });
    audio.addEventListener("timeupdate", function () {
      handleLessonTimeUpdate(audio, moduleId).catch(logError);
    });
    audio.addEventListener("seeked", function () {
      handleLessonSeeked(audio, moduleId);
    });
    audio.addEventListener("ended", function () {
      handleLessonEnded(audio, moduleId).catch(logError);
    });
    audio.addEventListener("error", function () {
      handleLessonAudioError();
    });
    audio.addEventListener("play", function () {
      if (state.lessonSession && state.lessonSession.moduleId === moduleId) {
        state.lessonSession.audioError = null;
      }
      syncLessonUi();
    });
    audio.addEventListener("pause", function () {
      syncLessonUi();
    });
  }

  function bindCaregiverAudioElement(audio) {
    audio.addEventListener("loadedmetadata", function () {
      audio.dataset.errorMessage = "";
      syncCaregiverActivityUi();
    });
    audio.addEventListener("timeupdate", function () {
      syncCaregiverActivityUi();
    });
    audio.addEventListener("ended", function () {
      syncCaregiverActivityUi();
    });
    audio.addEventListener("play", function () {
      audio.dataset.errorMessage = "";
      syncCaregiverActivityUi();
    });
    audio.addEventListener("pause", function () {
      syncCaregiverActivityUi();
    });
    audio.addEventListener("error", function () {
      audio.dataset.errorMessage =
        "Ba a samu fayil din audio ba tukuna. Da zarar an saka MP3 dinsa, player din zai yi aiki nan.";
      syncCaregiverActivityUi();
    });
  }

  function handleLessonMetadataLoaded(audio, moduleId) {
    var session = state.lessonSession;
    if (!session || session.moduleId !== moduleId) {
      return;
    }

    var resumeAt = Number(session.currentTimeSec || 0);
    session.durationSec = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : session.durationSec;
    session.audioReady = true;
    session.audioError = null;

    if (resumeAt > 1 && resumeAt < session.durationSec - 1) {
      try {
        audio.currentTime = resumeAt;
      } catch (error) {
        console.warn("Could not restore lesson position:", error);
      }
    }

    syncLessonUi();
  }

  async function handleLessonEnded(audio, moduleId) {
    var session = state.lessonSession;
    if (!session || session.moduleId !== moduleId) {
      return;
    }

    session.currentTimeSec = Number(audio.duration || session.durationSec || 0);
    session.listenedPct = 100;
    session.lastPersistedPct = 100;
    session.lastPersistedSec = session.currentTimeSec;

    await updateProgress(
      moduleId,
      {
        status: hasPassedModule(getProgressRecord(moduleId)) ? "completed" : "in-progress",
        audioListenedPct: 100,
        lastAudioPositionSec: session.currentTimeSec,
        lastAccessedAt: new Date().toISOString(),
      },
      { render: false }
    );

    syncLessonUi();
  }

  function handleLessonAudioError() {
    if (!state.lessonSession) {
      return;
    }

    state.lessonSession.audioError =
      "Ba a samu fayil din audio ba tukuna. Da zarar an saka MP3 dinsa, player din zai yi aiki nan.";
    syncLessonUi();
  }

  function queueMicroPause(pauseIndex, actualPauseMs) {
    var session = state.lessonSession;
    var audio = document.querySelector("[data-lesson-audio]");

    if (!session || session.activePauseIndex !== null) {
      return;
    }

    session.activePauseIndex = pauseIndex;
    session.activePauseStartedAt = Date.now();
    session.activePauseActualMs = actualPauseMs;

    if (audio) {
      audio.pause();
    }

    syncLessonUi();
  }

  async function submitMicroPauseAnswer(optionValue) {
    var session = state.lessonSession;
    if (!session || session.activePauseIndex === null) {
      return;
    }

    var module = getModuleById(session.moduleId);
    var pauseIndex = session.activePauseIndex;
    var pause = module.microPauses[pauseIndex];
    var responseTimeMs = Date.now() - session.activePauseStartedAt;
    var pauseRecord = {
      pauseIndex: pauseIndex + 1,
      pauseAtMs: pause.pauseAtMs,
      actualPauseMs: session.activePauseActualMs || pause.pauseAtMs,
      responseTimeMs: responseTimeMs,
      selectedAnswer: optionValue,
      correct: normalizeAnswerValue(optionValue) === normalizeAnswerValue(pause.correctAnswer),
      timestamp: new Date().toISOString(),
    };
    var currentRecord = getProgressRecord(module.id);
    var microPauseData = mergeMicroPauseData(currentRecord.microPauseData || [], pauseRecord);
    var patch = {
      status: hasPassedModule(currentRecord) ? "completed" : "in-progress",
      microPauseData: microPauseData,
      lastAccessedAt: new Date().toISOString(),
    };

    patch["microPause" + (pauseIndex + 1) + "Correct"] = pauseRecord.correct;
    patch["microPause" + (pauseIndex + 1) + "ResponseTimeMs"] = responseTimeMs;

    await updateProgress(module.id, patch, { render: false });

    session.pendingPauseIndices = session.pendingPauseIndices.filter(function (index) {
      return index !== pauseIndex;
    });
    session.activePauseIndex = null;
    session.activePauseStartedAt = 0;
    session.activePauseActualMs = 0;

    syncLessonUi();

    if (session.skippedPauseQueue.length) {
      var nextQueuedIndex = session.skippedPauseQueue.shift();
      queueMicroPause(nextQueuedIndex, Math.round((session.currentTimeSec || 0) * 1000));
      return;
    }

    var audio = document.querySelector("[data-lesson-audio]");
    if (audio) {
      audio.play().catch(function () {
        state.lessonSession.audioError =
          "AJAMIX ta adana amsar ka, amma player bai iya ci gaba kai tsaye ba. Danna play domin cigaba.";
        syncLessonUi();
      });
    }
  }

  function resumeLessonAudio(seekSeconds) {
    var audio = document.querySelector("[data-lesson-audio]");
    var session = state.lessonSession;

    if (!audio || !session) {
      return;
    }

    var targetSecond = Number(seekSeconds);
    if (Number.isFinite(targetSecond) && targetSecond > 0) {
      try {
        audio.currentTime = targetSecond;
        session.currentTimeSec = targetSecond;
      } catch (error) {
        console.warn("Could not seek lesson audio:", error);
      }
    }

    audio.play().catch(function () {
      session.audioError = "Player din yana bukatar ka danna play daga controls na audio.";
      syncLessonUi();
    });
  }

  function renderLessonMicroPauseOverlay(module, session) {
    if (!session || session.activePauseIndex === null) {
      return "";
    }

    var pause = module.microPauses[session.activePauseIndex];

    return [
      '<div class="micro-pause-card is-active" role="dialog" aria-modal="true" aria-labelledby="micro-pause-question" aria-live="assertive">',
      '<p class="eyebrow">' + ha("Tsayawar fahimta ") + escapeHtml(String(session.activePauseIndex + 1)) + "</p>",
      '<h3 id="micro-pause-question"' + (state.settings.scriptMode === "ajami" ? ' class="ajami"' : "") + '>' +
        getDisplayQuestion(pause.questionHa, pause.questionAjami) +
        "</h3>",
      '<div class="micro-pause-options">',
      pause.options
        .map(function (option) {
          return (
            '<button class="micro-pause-option" type="button" data-action="answer-micro-pause" data-option-value="' +
            escapeAttribute(option) +
            '">' +
            '<span class="math-value">' +
            escapeHtml(option) +
            "</span>" +
            "</button>"
          );
        })
        .join(""),
      "</div>",
      '<p class="helper-text">' + ha("Audio ya tsaya har sai ka zabi amsa daya.") + "</p>",
      "</div>",
    ].join("");
  }

  function renderLessonMicroPauseSummary(module, record, session) {
    return module.microPauses
      .map(function (pause, index) {
        var savedRecord = findPauseRecord(record, index + 1);
        var stateName = savedRecord
          ? savedRecord.correct
            ? "correct"
            : "wrong"
          : session && session.activePauseIndex === index
            ? "active"
            : "pending";
        var responseCopy = savedRecord
          ? '<span class="pill">' + ha("Lokaci: ") + escapeHtml(formatMilliseconds(savedRecord.responseTimeMs)) + "</span>"
          : '<span class="pill">' + ha("A ") + escapeHtml(formatMilliseconds(pause.pauseAtMs)) + "</span>";
        var answerCopy = savedRecord
          ? '<span class="pill">' + ha("Amsa: ") + escapeHtml(savedRecord.selectedAnswer) + "</span>"
          : '<span class="pill">' + ha("Options: ") + escapeHtml(pause.options.join(", ")) + "</span>";

        return [
          '<li class="micro-pause-item is-' + escapeAttribute(stateName) + '">',
          '<div class="module-title-row">',
          "<strong>" + ha("Tsayawa ") + escapeHtml(String(index + 1)) + "</strong>",
          '<span class="status-badge micro-state is-' +
            escapeAttribute(stateName) +
            '">' +
            getMicroPauseStateCopy(stateName) +
            "</span>",
          "</div>",
          "<p>" + ha(pause.questionHa) + "</p>",
          '<div class="helper-row">' + responseCopy + answerCopy + "</div>",
          "</li>",
        ].join("");
      })
      .join("");
  }

  function getMicroPauseStateCopy(stateName) {
    if (stateName === "correct") {
      return ha("Daidai");
    }

    if (stateName === "wrong") {
      return ha("A sake dubawa");
    }

    if (stateName === "active") {
      return ha("Yanzu");
    }

    return ha("Ana jira");
  }

  function findPauseRecord(record, pauseIndex) {
    return (record.microPauseData || []).find(function (item) {
      return item.pauseIndex === pauseIndex;
    }) || null;
  }

  function mergeMicroPauseData(existingData, nextRecord) {
    var withoutExisting = existingData.filter(function (item) {
      return item.pauseIndex !== nextRecord.pauseIndex;
    });

    withoutExisting.push(nextRecord);
    return withoutExisting.sort(function (left, right) {
      return left.pauseIndex - right.pauseIndex;
    });
  }

  function getLessonAudioNotice(record) {
    if (!state.connectivity) {
      return "Kana offline. Idan an sauke audio din a baya, zai yi aiki daga cache ko IndexedDB.";
    }

    if (record.audioListenedPct > 0) {
      return "An adana inda ka tsaya, don haka za ka iya ci gaba daga baya.";
    }

    return "Idan ba a saka MP3 din ba tukuna, player din zai nuna placeholder har sai an kawo audio.";
  }

  function renderLessonGlossaryChips(terms, selectedKey) {
    if (!terms.length) {
      return '<span class="muted-copy">' + ha("Babu kalmomin glossary da suka dace da wannan darasi a bundle din yanzu.") + "</span>";
    }

    return terms
      .map(function (item) {
        var key = getGlossaryKey(item);
        return (
          '<button class="term-chip' +
          (selectedKey === key ? " is-active" : "") +
          '" type="button" data-action="toggle-glossary-term" data-term-key="' +
          escapeAttribute(key) +
          '">' +
          ha(getGlossaryHausa(item)) +
          "</button>"
        );
      })
      .join("");
  }

  function renderLessonGlossaryDetail(item) {
    if (!item) {
      return "<p>" + ha("Taɓa kalma daya domin ganin ma'anarta cikin Hausa da Ajami.") + "</p>";
    }

    return [
      '<div class="screen-stack">',
      "<strong>" + ha(getGlossaryHausa(item)) + "</strong>",
      getGlossaryAjami(item) ? '<span class="ajami">' + formatAjamiText(getGlossaryAjami(item)) + "</span>" : "",
      getGlossaryMeaningHa(item) ? "<span>" + ha(getGlossaryMeaningHa(item)) + "</span>" : "",
      getGlossaryMeaningEn(item) ? '<span class="muted-copy">' + escapeHtml(getGlossaryMeaningEn(item)) + "</span>" : "",
      "</div>",
    ].join("");
  }

  function toggleLessonGlossaryTerm(termKey) {
    if (!state.lessonSession) {
      return;
    }

    state.lessonSession.selectedGlossaryTermKey =
      state.lessonSession.selectedGlossaryTermKey === termKey ? null : termKey;
    syncLessonUi();
  }

  function getSelectedLessonGlossaryTerm() {
    if (!state.lessonSession || !state.lessonSession.selectedGlossaryTermKey) {
      return null;
    }

    return findGlossaryItemByKey(state.lessonSession.selectedGlossaryTermKey);
  }

  function getRelatedGlossaryTerms(module) {
    var searchableText = normalizeSearchValue(
      [module.titleHa, module.titleAjami, module.textExplanationHa].join(" ")
    );
    var related = state.glossary.filter(function (item) {
      return searchableText.indexOf(normalizeSearchValue(getGlossaryHausa(item))) >= 0;
    });

    if (!related.length) {
      related = state.glossary.slice(0, 3);
    }

    return related.slice(0, 4);
  }

  function findGlossaryItemByKey(termKey) {
    return (
      state.glossary.find(function (item) {
        return getGlossaryKey(item) === termKey;
      }) || null
    );
  }

  function getGlossaryKey(item) {
    return String(item.id != null ? item.id : getGlossaryHausa(item) || getGlossaryAjami(item));
  }

  function getGlossaryHausa(item) {
    return item.termHausa || item.termHa || item.term || "";
  }

  function getGlossaryAjami(item) {
    return item.termAjami || "";
  }

  function getGlossaryMeaningHa(item) {
    return item.definitionHa || item.meaningHa || "";
  }

  function getGlossaryMeaningEn(item) {
    return item.termEnglish || item.termEn || item.meaningEn || "";
  }

  function normalizeGlossaryItem(item) {
    var normalized = Object.assign({}, item || {});
    var hausa = getGlossaryHausa(normalized);
    var ajami = getGlossaryAjami(normalized);
    var english = normalized.termEnglish || normalized.termEn || normalized.meaningEn || "";
    var meaningHa = normalized.definitionHa || normalized.meaningHa || "";
    var meaningEn = normalized.meaningEn || english;

    normalized.id = String(
      normalized.id != null
        ? normalized.id
        : normalized.termKey ||
          ajami ||
          (english ? english + "::" + (normalized.subject || "") : "") ||
          (hausa ? hausa + "::" + (normalized.subject || "") : "")
    );
    normalized.term = hausa;
    normalized.termHausa = hausa;
    normalized.termEnglish = english;
    normalized.meaningHa = meaningHa;
    normalized.meaningEn = meaningEn;

    return normalized;
  }

  function normalizeGlossaryEntries(entries) {
    return (entries || []).map(normalizeGlossaryItem);
  }

  function normalizeSearchValue(value) {
    return String(value || "").toLowerCase();
  }

  function normalizeAnswerValue(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getLessonDurationSec(module, session) {
    if (session && Number.isFinite(session.durationSec) && session.durationSec > 0) {
      return session.durationSec;
    }

    if (module && Number.isFinite(module.audioDurationMs) && module.audioDurationMs > 0) {
      return module.audioDurationMs / 1000;
    }

    return LESSON_DEFAULT_DURATION_MS / 1000;
  }

  function formatSeconds(seconds) {
    var totalSeconds = Math.max(0, Math.round(Number(seconds || 0)));
    var minutes = Math.floor(totalSeconds / 60);
    var remainingSeconds = totalSeconds % 60;
    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
  }

  function canStartQuiz(moduleId) {
    var record = getProgressRecord(moduleId);
    return !isModuleLocked(moduleId) && Number(record.audioListenedPct || 0) >= 80;
  }

  function renderLearningPathScreen() {
    var learningPath = buildLearningPath();
    var caregiverEntryMarkup = [
      '<section class="screen-panel caregiver-entry-panel">',
      '<a class="caregiver-entry-card" href="#/caregiver">',
      '<div class="caregiver-entry-icon">🌱</div>',
      '<div class="caregiver-entry-text">',
      "<strong>Caregiver Mode</strong>",
      "<span>" + ha("Ayyuka don yara shekara 0-3") + "</span>",
      "</div>",
      '<span class="caregiver-arrow">▶</span>',
      "</a>",
      "</section>",
    ].join("");

    if (!learningPath.length) {
      return [
        caregiverEntryMarkup,
        '<section class="screen-panel">',
        "<h2>" + ha("Babu darussa a wannan matakin yanzu.") + "</h2>",
        "<p>" + ha("Canza grade band daga Settings ko sabunta content bundle domin ganin karin modules.") + "</p>",
        "</section>",
      ].join("");
    }

    var completedCount = learningPath.filter(function (entry) {
      return entry.state === "completed";
    }).length;
    var nextModule = getNextLearningPathEntry(learningPath);
    var progressPct = Math.round((completedCount / learningPath.length) * 100);
    var moduleCards = learningPath
      .map(function (entry, index) {
        var module = entry.module;
        var record = entry.record;
        var isLocked = entry.state === "locked";
        var quizCopy =
          typeof record.bestScore === "number"
            ? "Quiz " + escapeHtml(String(record.bestScore)) + "/" + escapeHtml(String(module.quizQuestions.length))
            : ha("Quiz ba a fara ba");
        var listenCopy =
          record.lastAudioPositionSec > 5
            ? ha("Ci gaba daga ") + escapeHtml(formatSeconds(record.lastAudioPositionSec))
            : "Audio " + escapeHtml(String(record.audioListenedPct || 0)) + "%";

        return [
          '<button class="path-node path-node-button is-' +
            escapeAttribute(entry.state) +
            '" type="button"' +
            (isLocked ? " disabled" : ' data-action="open-lesson" data-module-id="' + escapeAttribute(module.id) + '"') +
            '>',
          '<div class="path-track" aria-hidden="true">',
          renderPathMarker(entry, module, record),
          index < learningPath.length - 1 ? '<span class="path-line"></span>' : "",
          "</div>",
          '<div class="module-item path-card">',
          '<div class="path-card-header">',
          '<span class="path-module-number">' + ha("Darasi ") + escapeHtml(String(module.moduleNumber)) + "</span>",
          '<span class="' + getPathBadgeClass(entry.state) + '">' + getPathStateCopy(entry.state) + "</span>",
          "</div>",
          state.settings.scriptMode === "ajami"
            ? '<p class="ajami path-title-ajami">' + formatAjamiText(module.titleAjami || romanToAjami(module.titleHa || "")) + "</p>"
            : '<p class="path-title-hausa path-title-primary">' + ha(module.titleHa || "") + "</p>",
          state.settings.scriptMode === "ajami"
            ? '<p class="path-title-hausa">' + ha(module.titleHa || "") + "</p>"
            : "",
          '<div class="path-meta-row"><span class="path-meta-item">' +
            listenCopy +
            '</span><span class="path-meta-item">' +
            quizCopy +
            "</span></div>",
          '<div class="path-node-hint"><span>' +
            (isLocked
              ? ha("Wannan module zai bude idan ka ci na baya da 3/5.")
              : ha("Taɓa domin bude darasi.")) +
            "</span></div>",
          "</div>",
          "</button>",
        ].join("");
      })
      .join("");

    return [
      caregiverEntryMarkup,
      '<section class="screen-panel path-overview">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Hanyar koyo") + "</p>",
      "<h2>" + escapeHtml(getGradeBandLabel(state.settings.gradeBand)) + " learning path</h2>",
      '<p class="screen-copy">' + ha("Modules suna bude daya bayan daya. Ka ci quiz da aƙalla 3/5 domin bude darasi na gaba.") + "</p>",
      "</div>",
      '<div class="path-progress-shell">',
      '<div class="path-progress-copy"><strong>' +
        completedCount +
        "/" +
        learningPath.length +
        "</strong><span>" + ha("An kammala") + "</span></div>",
      '<div class="path-progress-rail"><span class="path-progress-fill" style="width: ' + progressPct + '%;"></span></div>',
      "</div>",
      nextModule
        ? '<div class="path-next-callout"><span class="pill">' + ha("Na gaba") + "</span><strong>" +
          ha(nextModule.module.titleHa) +
          '</strong><span class="muted-copy">' +
          getPathStateCopy(nextModule.state) +
          "</span></div>"
        : '<div class="path-next-callout"><span class="pill">' + ha("Madalla") + "</span><strong>" + ha("Ka kammala duk modules na wannan mataki.") + "</strong></div>",
      "</section>",
      '<section class="path-rail" aria-label="Learning path modules">' + moduleCards + "</section>",
    ].join("");
  }

  function renderCaregiverScreen() {
    var activities = state.activities || [];

    if (!activities.length) {
      return [
        '<section class="screen-panel">',
        '<button class="ghost-btn" type="button" data-route="#/learning-path">' + ha("← Koma baya") + "</button>",
        "<h2>" + ha("Babu ayyukan Caregiver Mode a yanzu.") + "</h2>",
        "</section>",
      ].join("");
    }

    var groups = {};
    var groupOrder = [];
    activities.forEach(function (activity) {
      if (!groups[activity.ageRange]) {
        groups[activity.ageRange] = [];
        groupOrder.push(activity.ageRange);
      }
      groups[activity.ageRange].push(activity);
    });

    var groupMarkup = groupOrder.map(function (ageRange) {
      var items = groups[ageRange].map(function (activity) {
        return [
          '<a class="caregiver-card" href="#/caregiver-activity/' + escapeAttribute(activity.activityId) + '">',
          '<div class="caregiver-card-body">',
          '<p class="ajami caregiver-ajami">' + formatAjamiText(activity.topicAjami) + "</p>",
          '<p class="caregiver-topic">' + ha(activity.topicHa) + "</p>",
          "</div>",
          '<span class="caregiver-arrow">▶</span>',
          "</a>",
        ].join("");
      });

      return [
        '<div class="caregiver-age-group">',
        '<p class="caregiver-age-label">' + ha("Shekarun yaro: ") + escapeHtml(ageRange) + "</p>",
        items.join(""),
        "</div>",
      ].join("");
    });

    return [
      '<section class="screen-panel caregiver-header-panel">',
      '<button class="ghost-btn" type="button" data-route="#/learning-path">' + ha("← Koma baya") + "</button>",
      '<p class="eyebrow">' + ha("Caregiver Mode") + "</p>",
      '<h2>' + ha("Ayyukan yara ƙanana") + "</h2>",
      '<p class="screen-copy">' + ha("Waɗannan ayyuka an tsara su don iyaye da masu kula da yara tsakanin shekara 0 zuwa 3. Babu tambayoyi - kawai saurara, duba hoto, ka yi aikin tare da ɗanka.") + "</p>",
      "</section>",
      '<section class="screen-panel caregiver-list-panel">',
      groupMarkup.join(""),
      "</section>",
    ].join("");
  }

  function renderCaregiverActivityScreen() {
    var activity = getActivityById(state.route.moduleId);

    if (!activity) {
      return [
        '<section class="screen-panel">',
        '<button class="ghost-btn" type="button" data-route="#/caregiver">' + ha("← Koma Caregiver Mode") + "</button>",
        "<h2>" + ha("Ba a samu wannan aiki ba.") + "</h2>",
        "</section>",
      ].join("");
    }

    return [
      '<section class="screen-panel lesson-shell">',
      '<div class="lesson-topbar">',
      '<button class="ghost-btn lesson-back-button" type="button" data-route="#/caregiver" aria-label="' + ha("Koma baya") + '">←</button>',
      '<div class="lesson-heading-block">',
      '<p class="ajami lesson-title-large">' + formatAjamiText(activity.topicAjami) + "</p>",
      '<p class="lesson-title-small">' + ha(activity.topicHa) + "</p>",
      "</div>",
      "</div>",
      "</section>",
      '<section class="screen-panel caregiver-age-banner">',
      '<span class="caregiver-age-chip">' + ha("Shekarun yaro: ") + escapeHtml(activity.ageRange) + "</span>",
      "</section>",
      '<section class="screen-panel lesson-player-panel">',
      '<audio class="lesson-audio-element" data-lesson-audio preload="metadata"></audio>',
      '<div class="lesson-player-controls">',
      '<button class="lesson-play-toggle" type="button" data-action="toggle-audio">',
      '<span class="lesson-play-icon" data-play-icon>▶</span>',
      '<span class="lesson-play-label" data-play-label>' + ha("Fara sauraro") + "</span>",
      "</button>",
      "</div>",
      '<div class="lesson-audio-progress">',
      '<div class="lesson-audio-rail"><span class="lesson-audio-fill" data-audio-progress-fill style="width:0%;"></span></div>',
      "</div>",
      '<p class="lesson-audio-note" data-audio-notice>' + ha("Sauraro tare da ɗanka. Babu tambayoyi a wannan aiki.") + "</p>",
      "</section>",
      activity.imageCard
        ? [
            '<section class="screen-panel lesson-card-panel">',
            '<p class="eyebrow">' + ha("Katin Ajami") + "</p>",
            '<div class="placeholder-media lesson-image-card">',
            '<strong>' + ha(activity.topicHa) + "</strong>",
            '<span class="ajami">' + formatAjamiText(activity.topicAjami) + "</span>",
            "</div>",
            "</section>",
          ].join("")
        : "",
    ].join("");
  }

  function renderLessonScreen() {
    var module = getModuleById(state.route.moduleId);
    var session = state.lessonSession || buildLessonSessionSnapshot(module ? module.id : null);
    var record = getProgressRecord(module ? module.id : null);
    var listenedPct = Math.max(session.listenedPct || 0, record.audioListenedPct || 0);
    var positionPct =
      module && getLessonDurationSec(module, session) > 0
        ? Math.max(0, Math.min(100, Math.round(((session.currentTimeSec || 0) / getLessonDurationSec(module, session)) * 100)))
        : 0;
    var resumeAtSec = session.currentTimeSec || record.lastAudioPositionSec || 0;
    var canQuiz = module ? canStartQuiz(module.id) : false;

    if (!module) {
      return [
        '<section class="screen-panel">',
        "<h2>" + ha("Ba a samu wannan darasi ba.") + "</h2>",
        '<button class="btn" data-route="#/learning-path" type="button">' + ha("Koma hanyar koyo") + "</button>",
        "</section>",
      ].join("");
    }

    return [
      '<section class="screen-panel lesson-shell">',
      '<div class="lesson-topbar">',
      '<button class="ghost-btn lesson-back-button" type="button" data-route="#/learning-path" aria-label="' + ha("Koma baya") + '">←</button>',
      '<div class="lesson-heading-block">',
      state.settings.scriptMode === "ajami"
        ? '<p class="ajami lesson-title-large">' + formatAjamiText(getDisplayTitle(module)) + "</p>"
        : '<p class="lesson-title-large lesson-title-large--latin">' + escapeHtml(getDisplayTitle(module)) + "</p>",
      state.settings.scriptMode === "ajami"
        ? '<p class="lesson-title-small">' + ha(module.titleHa || "") + "</p>"
        : "",
      "</div>",
      "</div>",
      "</section>",
      '<section class="screen-panel lesson-player-panel">',
      '<audio class="lesson-audio-element" data-lesson-audio preload="metadata"></audio>',
      '<div class="lesson-player-controls">',
      '<button class="lesson-play-toggle" type="button" data-action="toggle-audio">',
      '<span class="lesson-play-icon" data-play-icon>▶</span>',
      '<span class="lesson-play-label" data-play-label>' + ha("Fara sauraro") + "</span>",
      "</button>",
      "</div>",
      '<div class="lesson-audio-progress">',
      '<div class="lesson-audio-rail"><span class="lesson-audio-fill" data-audio-progress-fill style="width: ' +
        positionPct +
        '%;"></span></div>',
      '<div class="lesson-audio-meta"><span data-audio-time-label>' +
        escapeHtml(formatSeconds(session.currentTimeSec || 0)) +
        " / " +
        escapeHtml(formatSeconds(getLessonDurationSec(module, session))) +
        '</span><span data-audio-progress-label>' +
        escapeHtml(String(listenedPct)) +
        "%</span></div>",
      "</div>",
      '<div class="helper-row">',
      '<button class="secondary-btn" type="button" data-action="resume-audio" data-seek-seconds="' +
        escapeAttribute(String(resumeAtSec)) +
        '"' +
        (resumeAtSec > 5 ? "" : " hidden") +
        ' data-resume-button>' + ha("Ci gaba daga ") +
        escapeHtml(formatSeconds(resumeAtSec)) +
        "</button>",
      "</div>",
      '<p class="lesson-audio-note" data-audio-notice>' + ha("AJAMIX za ta fara da audio da aka sauke a na'ura idan akwai shi.") + "</p>",
      '<div class="micro-pause-overlay" data-micro-pause-overlay></div>',
      "</section>",
      '<section class="screen-panel lesson-text-panel">',
      '<p class="eyebrow">' + ha("Bayanin Hausa") + "</p>",
      '<div class="lesson-copy scrollable-copy"><p>' + ha(module.textExplanationHa) + "</p></div>",
      "</section>",
      module.imageCard
        ? '<section class="screen-panel lesson-card-panel"><p class="eyebrow">' + ha("Katin Ajami") + '</p><figure class="lesson-image-card"><img src="' +
          escapeHtml(module.imageCard) +
          '" alt="' +
          ha(module.titleHa || "") +
          '" loading="lazy" /></figure></section>'
        : "",
      '<section class="screen-panel lesson-footer-panel">',
      '<button class="btn lesson-quiz-button" type="button" data-action="open-quiz" data-module-id="' +
        escapeAttribute(module.id) +
        '"' +
        (canQuiz ? "" : " disabled") +
        ">" + ha("Fara Jarrabawa") + "</button>",
      '<p class="helper-text" data-quiz-ready-note>' +
        ha(
          canQuiz
            ? "Ka saurara isasshe. Yanzu za ka iya shiga quiz."
            : "Sai ka saurara aƙalla 80% na audio kafin quiz ya bude."
        ) +
        "</p>",
      "</section>",
    ].join("");
  }

  function renderPathMarker(entry, module, record) {
    if (entry.state === "completed") {
      return '<span class="path-marker path-marker-check" aria-hidden="true">✓</span>';
    }

    if (entry.state === "in-progress") {
      var pct = Math.max(0, Math.min(100, Number(record.audioListenedPct || 0)));
      return (
        '<span class="path-marker path-marker-progress" style="--path-progress:' +
        pct +
        '%;" aria-hidden="true"><span>' +
        escapeHtml(String(pct)) +
        "%</span></span>"
      );
    }

    return '<span class="path-marker" aria-hidden="true">' + escapeHtml(String(module.moduleNumber).padStart(2, "0")) + "</span>";
  }

  function toggleLessonAudio() {
    var audio = document.querySelector("[data-lesson-audio]");

    if (!audio || (state.lessonSession && state.lessonSession.activePauseIndex !== null)) {
      return;
    }

    if (audio.paused) {
      audio.play().catch(function () {
        if (state.lessonSession) {
          state.lessonSession.audioError = "Player din yana bukatar ka danna play daga browser ko ka duba fayil din audio.";
          syncLessonUi();
          return;
        }

        if (state.route.name === "caregiver-activity") {
          audio.dataset.errorMessage =
            "Player din yana bukatar ka danna play daga browser ko ka duba fayil din audio.";
          syncCaregiverActivityUi();
        }
      });
      return;
    }

    audio.pause();
  }

  function getSortedMicroPauseIndices(module) {
    if (!module || !Array.isArray(module.microPauses)) {
      return [];
    }

    return module.microPauses
      .map(function (pause, index) {
        return { index: index, pauseAtMs: Number(pause.pauseAtMs || 0) };
      })
      .sort(function (left, right) {
        return left.pauseAtMs - right.pauseAtMs;
      })
      .map(function (item) {
        return item.index;
      });
  }

  function buildLessonSessionSnapshot(moduleId) {
    var module = getModuleById(moduleId);
    var record = getProgressRecord(moduleId);

    return {
      moduleId: moduleId,
      currentTimeSec: Number(record.lastAudioPositionSec || 0),
      listenedPct: Number(record.audioListenedPct || 0),
      lastPersistedPct: Number(record.audioListenedPct || 0),
      lastPersistedSec: Math.floor(Number(record.lastAudioPositionSec || 0)),
      durationSec: getLessonDurationSec(module),
      pendingPauseIndices: getSortedMicroPauseIndices(module).filter(function (pauseIndex) {
        return !findPauseRecord(record, pauseIndex + 1);
      }),
      activePauseIndex: null,
      activePauseStartedAt: 0,
      activePauseActualMs: 0,
      skippedPauseQueue: [],
      audioReady: false,
      audioError: null,
      audioSource: module ? module.audioFile : "",
      objectUrl: null,
      selectedGlossaryTermKey: null,
    };
  }

  async function resolveLessonAudioSource(module) {
    if (state.lessonSession && state.lessonSession.moduleId === module.id && state.lessonSession.objectUrl) {
      return {
        url: state.lessonSession.objectUrl,
        objectUrl: state.lessonSession.objectUrl,
      };
    }

    var cachedAudio = await getRecord("audioCache", module.audioFile).catch(function () {
      return null;
    });

    if (!cachedAudio) {
      cachedAudio = await getRecord("audioCache", module.id).catch(function () {
        return null;
      });
    }

    var blob = null;
    if (cachedAudio && cachedAudio.blob instanceof Blob) {
      blob = cachedAudio.blob;
    } else if (cachedAudio instanceof Blob) {
      blob = cachedAudio;
    }

    if (blob) {
      var objectUrl = URL.createObjectURL(blob);
      return { url: objectUrl, objectUrl: objectUrl };
    }

    return {
      url: module.audioFile,
      objectUrl: null,
    };
  }

  async function handleLessonTimeUpdate(audio, moduleId) {
    var session = state.lessonSession;
    var module = getModuleById(moduleId);

    if (!session || session.moduleId !== moduleId || !module) {
      return;
    }

    if (session.activePauseIndex !== null) {
      return;
    }

    session.currentTimeSec = Number(audio.currentTime || 0);
    session.durationSec =
      Number.isFinite(audio.duration) && audio.duration > 0 ? Number(audio.duration) : session.durationSec;

    if (session.durationSec > 0) {
      session.listenedPct = Math.max(
        session.listenedPct,
        Math.min(100, Math.round((session.currentTimeSec / session.durationSec) * 100))
      );
    }

    var currentWholeSecond = Math.floor(session.currentTimeSec);
    if (session.listenedPct !== session.lastPersistedPct || currentWholeSecond !== session.lastPersistedSec) {
      session.lastPersistedPct = session.listenedPct;
      session.lastPersistedSec = currentWholeSecond;
      await updateProgress(
        moduleId,
        {
          status: hasPassedModule(getProgressRecord(moduleId)) ? "completed" : "in-progress",
          audioListenedPct: session.listenedPct,
          lastAudioPositionSec: session.currentTimeSec,
          lastAccessedAt: new Date().toISOString(),
        },
        { render: false }
      );
    }

    if (session.pendingPauseIndices.length) {
      var nextPauseIndex = session.pendingPauseIndices[0];
      var nextPause = module.microPauses[nextPauseIndex];
      var currentMs = Math.round(session.currentTimeSec * 1000);

      if (Math.abs(currentMs - Number(nextPause.pauseAtMs || 0)) <= 500 || currentMs > Number(nextPause.pauseAtMs || 0) + 500) {
        queueMicroPause(nextPauseIndex, currentMs);
        return;
      }
    }

    syncLessonUi();
  }

  function handleLessonSeeked(audio, moduleId) {
    var session = state.lessonSession;
    var module = getModuleById(moduleId);

    if (!session || session.moduleId !== moduleId || !module) {
      return;
    }

    session.currentTimeSec = Number(audio.currentTime || 0);

    if (session.activePauseIndex !== null) {
      syncLessonUi();
      return;
    }

    var currentMs = Math.round(session.currentTimeSec * 1000);
    var skipped = session.pendingPauseIndices.filter(function (pauseIndex) {
      return Number(module.microPauses[pauseIndex].pauseAtMs || 0) < currentMs;
    });

    if (skipped.length) {
      audio.pause();
      session.skippedPauseQueue = skipped.slice(1);
      queueMicroPause(skipped[0], currentMs);
      return;
    }

    syncLessonUi();
  }

  function syncLessonUi() {
    var session = state.lessonSession;
    var module = session ? getModuleById(session.moduleId) : null;
    var audio = document.querySelector("[data-lesson-audio]");

    if (!session || !module || state.route.name !== "lesson") {
      return;
    }

    var record = getProgressRecord(module.id);
    var listenedPct = Math.max(session.listenedPct || 0, record.audioListenedPct || 0);
    var positionPct =
      getLessonDurationSec(module, session) > 0
        ? Math.max(0, Math.min(100, Math.round(((session.currentTimeSec || 0) / getLessonDurationSec(module, session)) * 100)))
        : 0;
    var progressFill = document.querySelector("[data-audio-progress-fill]");
    var progressLabel = document.querySelector("[data-audio-progress-label]");
    var timeLabel = document.querySelector("[data-audio-time-label]");
    var notice = document.querySelector("[data-audio-notice]");
    var overlay = document.querySelector("[data-micro-pause-overlay]");
    var resumeButton = document.querySelector("[data-resume-button]");
    var playIcon = document.querySelector("[data-play-icon]");
    var playLabel = document.querySelector("[data-play-label]");
    var quizButton = document.querySelector(".lesson-quiz-button");
    var quizNote = document.querySelector("[data-quiz-ready-note]");
    var isPaused = !audio || audio.paused;
    var canQuiz = canStartQuiz(module.id);

    if (progressFill) {
      progressFill.style.width = positionPct + "%";
    }

    if (progressLabel) {
      progressLabel.textContent = listenedPct + "%";
    }

    if (timeLabel) {
      timeLabel.textContent =
        formatSeconds(session.currentTimeSec || 0) + " / " + formatSeconds(getLessonDurationSec(module, session));
    }

    if (notice) {
      notice.innerHTML = ha(session.audioError || getLessonAudioNotice(record));
    }

    if (resumeButton) {
      var resumeAt = Number(session.currentTimeSec || record.lastAudioPositionSec || 0);
      resumeButton.hidden = resumeAt <= 5;
      resumeButton.dataset.seekSeconds = String(resumeAt);
      resumeButton.innerHTML = ha("Ci gaba daga ") + escapeHtml(formatSeconds(resumeAt));
    }

    if (playIcon) {
      playIcon.textContent = isPaused ? "▶" : "❚❚";
    }

    if (playLabel) {
      playLabel.innerHTML = isPaused ? ha("Fara sauraro") : ha("Dakatar");
    }

    if (overlay) {
      overlay.innerHTML = renderLessonMicroPauseOverlay(module, session);
      overlay.classList.toggle("is-visible", session.activePauseIndex !== null);
      if (session.activePauseIndex !== null) {
        queueMicrotask(function () {
          var firstOption = document.querySelector("#micro-pause-question ~ * button, .micro-pause-overlay button");
          if (firstOption) {
            firstOption.focus();
          }
        });
      }
    }

    if (quizButton) {
      quizButton.disabled = !canQuiz;
    }

    if (quizNote) {
      quizNote.innerHTML = canQuiz
        ? ha("Ka saurara isasshe. Yanzu za ka iya shiga quiz.")
        : ha("Sai ka saurara aƙalla 80% na audio kafin quiz ya bude.");
    }
  }

  function syncCaregiverActivityUi(activityOverride) {
    var audio = document.querySelector("[data-lesson-audio]");
    var caregiverActivity = activityOverride || getActivityById(state.route.moduleId);

    if (!audio || !caregiverActivity || state.route.name !== "caregiver-activity") {
      return;
    }

    var progressFill = document.querySelector("[data-audio-progress-fill]");
    var notice = document.querySelector("[data-audio-notice]");
    var playIcon = document.querySelector("[data-play-icon]");
    var playLabel = document.querySelector("[data-play-label]");
    var progressPct =
      Number.isFinite(audio.duration) && audio.duration > 0
        ? Math.max(0, Math.min(100, Math.round((Number(audio.currentTime || 0) / audio.duration) * 100)))
        : 0;

    if (progressFill) {
      progressFill.style.width = progressPct + "%";
    }

    if (notice) {
      notice.innerHTML = ha(
        audio.dataset.errorMessage ||
          (caregiverActivity.audioFile
            ? "Sauraro tare da ɗanka. Babu tambayoyi a wannan aiki."
            : "Ba a samu fayil din audio ba tukuna. Da zarar an saka MP3 dinsa, player din zai yi aiki nan.")
      );
    }

    if (playIcon) {
      playIcon.textContent = audio.paused ? "▶" : "❚❚";
    }

    if (playLabel) {
      playLabel.innerHTML = audio.paused ? ha("Fara sauraro") : ha("Dakatar");
    }
  }

  function getSelectedModules() {
    return state.modules
      .filter(function (module) {
        return module.gradeband === state.settings.gradeBand;
      })
      .sort(function (left, right) {
        return left.moduleNumber - right.moduleNumber;
      });
  }

  function getModuleById(moduleId) {
    return state.modules.find(function (module) {
      return module.id === moduleId;
    });
  }

  function getActivityById(activityId) {
    return (state.activities || []).find(function (activity) {
      return activity.activityId === activityId;
    }) || null;
  }

  function buildProgressMap() {
    return state.progress.reduce(function (accumulator, record) {
      accumulator[record.id] = record;
      return accumulator;
    }, {});
  }

  function getProgressRecord(moduleId) {
    return (
      state.progress.find(function (record) {
        return record.id === moduleId;
      }) || {
        id: moduleId,
        moduleId: moduleId,
        status: "not-started",
        score: null,
        attempts: 0,
        bestScore: 0,
        audioListenedPct: 0,
        lastAudioPositionSec: 0,
        microPauseData: [],
      }
    );
  }

  async function completeOnboarding(gradeBand) {
    var chosenBand = ALLOWED_GRADE_BANDS.indexOf(gradeBand) >= 0 ? gradeBand : "nursery1";
    var isFirstOnboarding = !state.settings.onboarded;
    await saveSettings({
      onboarded: true,
      gradeBand: chosenBand,
      displayName: onboardingData.displayName || state.settings.displayName || "Dalibi",
      learnerType: onboardingData.learnerType || state.settings.learnerType || "child",
      scriptMode: onboardingData.scriptMode || state.settings.scriptMode || "ajami",
      audioDownloadPromptSeen: isFirstOnboarding ? false : state.settings.audioDownloadPromptSeen,
      audioDownloadState: normalizeAudioDownloadState({
        gradeBand: chosenBand,
        totalFiles: 0,
        completedUrls: [],
        status: "pending",
        lastUpdatedAt: null,
      }),
    });
    onboardingStep = 1;
    onboardingData = { displayName: "", learnerType: "child", scriptMode: "ajami" };
    await prepareDownloadSession(true);
    state.quizResults = null;
    navigate(isFirstOnboarding ? "#/download" : "#/learning-path");
  }

  async function saveSettings(patch) {
    var entries = Object.entries(patch);
    for (var index = 0; index < entries.length; index += 1) {
      await putRecord("settings", {
        key: entries[index][0],
        value: entries[index][1],
      });
    }

    state.settings = Object.assign({}, state.settings, patch);
    state.settings.audioDownloadState = normalizeAudioDownloadState(state.settings.audioDownloadState);
    if (Object.prototype.hasOwnProperty.call(patch, "motionMode")) {
      applyMotionMode(state.settings.motionMode);
    }
    updateShellChrome();
    render();
  }

  async function loadSettings() {
    var records = await getAllRecords("settings");
    var nextSettings = Object.assign({}, DEFAULT_SETTINGS);

    records.forEach(function (record) {
      nextSettings[record.key] = record.value;
    });

    if (ALLOWED_GRADE_BANDS.indexOf(nextSettings.gradeBand) === -1) {
      nextSettings.gradeBand = "nursery1";
    }

    nextSettings.audioDownloadState = normalizeAudioDownloadState(nextSettings.audioDownloadState);
    state.settings = nextSettings;
    state.streakData = normalizeStreakData(nextSettings.streakData);
  }

  async function loadProgress() {
    state.progress = await getAllRecords("progress");
  }

  async function recordLessonOpen(moduleId) {
    var record = getProgressRecord(moduleId);
    await recordLearningActivity();
    await updateProgress(moduleId, {
      status: hasPassedModule(record) ? "completed" : "in-progress",
      openedAt: record.openedAt || new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    }, { render: false });
  }

  async function markModuleComplete(moduleId) {
    var existing = getProgressRecord(moduleId);
    await updateProgress(moduleId, {
      status: hasPassedModule(existing) ? "completed" : "in-progress",
      completedAt: hasPassedModule(existing) ? new Date().toISOString() : existing.completedAt || null,
      attempts: existing.attempts || 0,
      bestScore: existing.bestScore || 0,
      lastScore: typeof existing.lastScore === "number" ? existing.lastScore : null,
    }, { render: false });
    state.quizResults = null;
  }

  async function updateProgress(moduleId, patch, options) {
    var updateOptions = Object.assign(
      {
        reload: true,
        render: true,
      },
      options || {}
    );
    var currentRecord = getProgressRecord(moduleId);
    var nextRecord = Object.assign({}, currentRecord, patch, {
      id: moduleId,
      moduleId: moduleId,
    });

    await putRecord("progress", nextRecord);
    if (updateOptions.reload) {
      await loadProgress();
    }
    if (updateOptions.render) {
      render();
    }
  }

  async function loadContentBundle(options) {
    var loadOptions = Object.assign({ forceNetwork: false }, options || {});
    var cachedModules = await getAllRecords("modules");
    var cachedActivities = await getAllRecords("activities");
    var cachedGlossary = await getAllRecords("glossary");
    var shouldUseNetwork = loadOptions.forceNetwork || !cachedModules.length || !cachedActivities.length;
    var bundleInfo = null;

    if (!shouldUseNetwork) {
      state.modules = cachedModules.sort(sortModules);
      state.activities = cachedActivities;
      state.glossary = normalizeGlossaryEntries(cachedGlossary);
      return;
    }

    try {
      bundleInfo = await fetchContentBundleFromNetwork();
      await cacheContentBundle(bundleInfo.bundle);
      applyBundleToState(bundleInfo.bundle);
      await persistContentMetadata(bundleInfo);
      await prepareDownloadSession(true);
    } catch (error) {
      if (loadOptions.forceNetwork) {
        throw error;
      }

      if (!cachedModules.length) {
        throw error;
      }

      state.modules = cachedModules.sort(sortModules);
      state.activities = cachedActivities;
      state.glossary = normalizeGlossaryEntries(cachedGlossary);
    }
  }

  async function fetchContentBundleFromNetwork() {
    var response = await fetch("./content.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Could not load content.json");
    }

    return {
      bundle: await response.json(),
      lastModified: response.headers.get("Last-Modified") || "",
    };
  }

  function applyBundleToState(bundle) {
    state.modules = (bundle.modules || []).slice().sort(sortModules);
    state.activities = (bundle.activities || []).slice();
    state.glossary = normalizeGlossaryEntries(bundle.glossary);
    state.settings.contentVersion = bundle.version || DEFAULT_SETTINGS.contentVersion;
  }

  async function persistContentMetadata(bundleInfo) {
    var bundle = bundleInfo.bundle || {};
    var nextMetadata = {
      contentVersion: bundle.version || DEFAULT_SETTINGS.contentVersion,
      lastContentLastModified: bundleInfo.lastModified || state.settings.lastContentLastModified || "",
    };

    state.settings = Object.assign({}, state.settings, nextMetadata);

    await putRecord("settings", {
      key: "contentVersion",
      value: nextMetadata.contentVersion,
    });
    await putRecord("settings", {
      key: "lastContentLastModified",
      value: nextMetadata.lastContentLastModified,
    });
  }

  async function cacheContentBundle(bundle) {
    var normalizedGlossary = normalizeGlossaryEntries(bundle.glossary);
    await clearStore("modules");
    await clearStore("activities");
    await clearStore("glossary");

    for (var moduleIndex = 0; moduleIndex < (bundle.modules || []).length; moduleIndex += 1) {
      await putRecord("modules", bundle.modules[moduleIndex]);
    }

    for (var activityIndex = 0; activityIndex < (bundle.activities || []).length; activityIndex += 1) {
      await putRecord("activities", bundle.activities[activityIndex]);
    }

    for (var glossaryIndex = 0; glossaryIndex < normalizedGlossary.length; glossaryIndex += 1) {
      await putRecord("glossary", normalizedGlossary[glossaryIndex]);
    }
  }

  async function checkForContentUpdate() {
    if (!state.connectivity) {
      state.contentUpdateBanner = null;
      render();
      return;
    }

    try {
      var nextLastModified = await fetchContentLastModified();
      var currentLastModified = state.settings.lastContentLastModified || "";

      if (nextLastModified && !currentLastModified) {
        state.settings.lastContentLastModified = nextLastModified;
        await putRecord("settings", {
          key: "lastContentLastModified",
          value: nextLastModified,
        });
        state.contentUpdateBanner = null;
        render();
        return;
      }

      if (nextLastModified && currentLastModified && Date.parse(nextLastModified) > Date.parse(currentLastModified)) {
        state.contentUpdateBanner = { lastModified: nextLastModified };
      } else {
        state.contentUpdateBanner = null;
      }
      render();
    } catch (error) {
      console.warn("Could not check for content updates:", error);
    }
  }

  async function fetchContentLastModified() {
    var response = await fetch("./content.json", {
      method: "HEAD",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not check content headers.");
    }

    var lastModified = response.headers.get("Last-Modified") || "";
    if (lastModified) {
      return lastModified;
    }

    response = await fetch("./content.json", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not re-check content metadata.");
    }

    return response.headers.get("Last-Modified") || "";
  }

  async function applyContentUpdate() {
    state.contentUpdateBanner = null;
    render();

    try {
      await loadContentBundle({ forceNetwork: true });
      await prepareDownloadSession(true);
      if (state.downloadSession && state.downloadSession.items.some(function (item) { return item.status !== "completed"; })) {
        navigate("#/download");
        await startAudioDownload();
      } else {
        await refreshStorageEstimate();
        render();
      }
    } catch (error) {
      state.contentUpdateBanner = { error: error instanceof Error ? error.message : "An kasa sabunta abun ciki." };
      render();
    }
  }

  function shouldPromptAudioDownload() {
    return Boolean(state.settings.onboarded && !state.settings.audioDownloadPromptSeen);
  }

  async function markAudioDownloadPromptSeen(value) {
    var nextValue = Boolean(value);
    if (state.settings.audioDownloadPromptSeen === nextValue) {
      return;
    }

    state.settings.audioDownloadPromptSeen = nextValue;
    await putRecord("settings", {
      key: "audioDownloadPromptSeen",
      value: nextValue,
    });
  }

  function normalizeAudioDownloadState(value) {
    var next = Object.assign({}, DEFAULT_AUDIO_DOWNLOAD_STATE, value || {});
    next.gradeBand = ALLOWED_GRADE_BANDS.indexOf(next.gradeBand) >= 0 ? next.gradeBand : state.settings.gradeBand || "nursery1";
    next.totalFiles = Math.max(0, Number(next.totalFiles || 0));
    next.completedUrls = Array.isArray(next.completedUrls) ? next.completedUrls.slice() : [];
    next.status = ["pending", "downloading", "complete", "partial"].indexOf(next.status) >= 0 ? next.status : "pending";
    next.lastUpdatedAt = next.lastUpdatedAt || null;
    return next;
  }

  async function saveAudioDownloadState(nextState, options) {
    var updateOptions = Object.assign({ render: false }, options || {});
    var normalized = normalizeAudioDownloadState(nextState);

    state.settings.audioDownloadState = normalized;
    await putRecord("settings", {
      key: "audioDownloadState",
      value: normalized,
    });

    if (updateOptions.render) {
      render();
    }
    return normalized;
  }

  function buildEmptyDownloadSession() {
    return {
      gradeBand: state.settings.gradeBand,
      items: [],
      totalEstimatedBytes: 0,
      downloadedBytes: 0,
      status: "pending",
      active: false,
      readyForOffline: false,
      error: null,
    };
  }

  function getAudioEntriesForGradeBand(gradeBand) {
    var seen = {};
    return state.modules
      .filter(function (module) {
        return module.gradeband === gradeBand && module.audioFile;
      })
      .map(function (module) {
        return {
          moduleId: module.id,
          titleHa: module.titleHa,
          url: module.audioFile,
        };
      })
      .filter(function (item) {
        if (seen[item.url]) {
          return false;
        }
        seen[item.url] = true;
        return true;
      });
  }

  async function prepareDownloadSession(forceRefresh) {
    if (
      !forceRefresh &&
      state.downloadSession &&
      state.downloadSession.gradeBand === state.settings.gradeBand &&
      state.downloadSession.items.length
    ) {
      return state.downloadSession;
    }

    var audioEntries = getAudioEntriesForGradeBand(state.settings.gradeBand);
    var cachedAudio = await getAllRecords("audioCache");
    var cachedMap = cachedAudio.reduce(function (accumulator, item) {
      accumulator[item.url] = item;
      return accumulator;
    }, {});
    var savedState = normalizeAudioDownloadState(state.settings.audioDownloadState);
    var items = audioEntries.map(function (entry) {
      var cachedItem = cachedMap[entry.url];
      var sizeBytes = cachedItem
        ? Number(cachedItem.sizeBytes || (cachedItem.blob ? cachedItem.blob.size : 0) || DEFAULT_AUDIO_SIZE_ESTIMATE_BYTES)
        : DEFAULT_AUDIO_SIZE_ESTIMATE_BYTES;

      return {
        moduleId: entry.moduleId,
        titleHa: entry.titleHa,
        url: entry.url,
        sizeBytes: sizeBytes,
        sizeKnown: Boolean(cachedItem),
        progressPct: cachedItem ? 100 : 0,
        status: cachedItem ? "completed" : "pending",
      };
    });

    state.downloadSession = {
      gradeBand: state.settings.gradeBand,
      items: items,
      totalEstimatedBytes: items.reduce(function (total, item) {
        return total + Number(item.sizeBytes || 0);
      }, 0),
      downloadedBytes: items.reduce(function (total, item) {
        return total + Number(item.status === "completed" ? item.sizeBytes || 0 : 0);
      }, 0),
      status: items.length && items.every(function (item) { return item.status === "completed"; })
        ? "complete"
        : savedState.status === "downloading"
          ? "partial"
          : savedState.status,
      active: false,
      readyForOffline: items.length > 0 && items.every(function (item) { return item.status === "completed"; }),
      error: null,
    };

    await enrichDownloadEstimates();
    await saveAudioDownloadState({
      gradeBand: state.settings.gradeBand,
      totalFiles: items.length,
      completedUrls: items.filter(function (item) { return item.status === "completed"; }).map(function (item) { return item.url; }),
      status: state.downloadSession.readyForOffline ? "complete" : items.some(function (item) { return item.status === "completed"; }) ? "partial" : "pending",
      lastUpdatedAt: savedState.lastUpdatedAt,
    });

    render();
    return state.downloadSession;
  }

  async function enrichDownloadEstimates() {
    var session = state.downloadSession;
    if (!session || !state.connectivity) {
      return;
    }

    for (var index = 0; index < session.items.length; index += 1) {
      if (session.items[index].sizeKnown) {
        continue;
      }
      session.items[index].sizeBytes = await fetchAudioSizeEstimate(session.items[index].url);
      session.items[index].sizeKnown = true;
    }

    session.totalEstimatedBytes = session.items.reduce(function (total, item) {
      return total + Number(item.sizeBytes || DEFAULT_AUDIO_SIZE_ESTIMATE_BYTES);
    }, 0);
  }

  async function fetchAudioSizeEstimate(url) {
    try {
      var headResponse = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (headResponse.ok) {
        var headLength = Number(headResponse.headers.get("Content-Length") || 0);
        if (headLength > 0) {
          return headLength;
        }
      }
    } catch (error) {
      console.warn("Could not fetch audio HEAD:", url, error);
    }

    return DEFAULT_AUDIO_SIZE_ESTIMATE_BYTES;
  }

  async function startAudioDownload() {
    var session = await prepareDownloadSession(false);

    if (!session || !session.items.length || !state.connectivity) {
      return;
    }

    session.active = true;
    session.error = null;
    session.status = "downloading";
    render();

    await saveAudioDownloadState({
      gradeBand: session.gradeBand,
      totalFiles: session.items.length,
      completedUrls: session.items.filter(function (item) { return item.status === "completed"; }).map(function (item) { return item.url; }),
      status: "downloading",
      lastUpdatedAt: new Date().toISOString(),
    });

    try {
      for (var index = 0; index < session.items.length; index += 1) {
        if (session.items[index].status === "completed") {
          continue;
        }

        await downloadAudioItem(session.items[index], session);
      }

      session.active = false;
      session.status = "complete";
      session.readyForOffline = true;
      await saveAudioDownloadState({
        gradeBand: session.gradeBand,
        totalFiles: session.items.length,
        completedUrls: session.items.map(function (item) { return item.url; }),
        status: "complete",
        lastUpdatedAt: new Date().toISOString(),
      });
      await refreshStorageEstimate();
      render();
    } catch (error) {
      session.active = false;
      session.status = "partial";
      session.error = error instanceof Error ? error.message : "An kasa kammala download din audio.";
      await saveAudioDownloadState({
        gradeBand: session.gradeBand,
        totalFiles: session.items.length,
        completedUrls: session.items.filter(function (item) { return item.status === "completed"; }).map(function (item) { return item.url; }),
        status: "partial",
        lastUpdatedAt: new Date().toISOString(),
      });
      render();
    }
  }

  async function downloadAudioItem(item, session) {
    item.status = "downloading";
    item.progressPct = 0;
    render();

    var response = await fetch(item.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Ba a samu fayil din audio ba: " + item.titleHa);
    }

    var contentLength = Number(response.headers.get("Content-Length") || item.sizeBytes || 0);
    var blob;

    if (response.body && response.body.getReader) {
      var reader = response.body.getReader();
      var chunks = [];
      var received = 0;

      while (true) {
        var chunkResult = await reader.read();
        if (chunkResult.done) {
          break;
        }

        chunks.push(chunkResult.value);
        received += chunkResult.value.length;
        item.sizeBytes = contentLength || received;
        item.progressPct = contentLength ? Math.min(100, Math.round((received / contentLength) * 100)) : 0;
        render();
      }

      blob = new Blob(chunks, {
        type: response.headers.get("Content-Type") || "audio/mpeg",
      });
    } else {
      blob = await response.blob();
    }

    item.sizeBytes = blob.size || item.sizeBytes || contentLength || DEFAULT_AUDIO_SIZE_ESTIMATE_BYTES;
    item.sizeKnown = true;
    item.progressPct = 100;
    item.status = "completed";

    await putRecord("audioCache", {
      url: item.url,
      moduleId: item.moduleId,
      gradeBand: session.gradeBand,
      titleHa: item.titleHa,
      blob: blob,
      sizeBytes: item.sizeBytes,
      downloadedAt: new Date().toISOString(),
      contentVersion: state.settings.contentVersion,
    });

    session.downloadedBytes = session.items.reduce(function (total, entry) {
      return total + Number(entry.status === "completed" ? entry.sizeBytes || 0 : 0);
    }, 0);

    await saveAudioDownloadState({
      gradeBand: session.gradeBand,
      totalFiles: session.items.length,
      completedUrls: session.items.filter(function (entry) { return entry.status === "completed"; }).map(function (entry) { return entry.url; }),
      status: session.items.every(function (entry) { return entry.status === "completed"; }) ? "complete" : "downloading",
      lastUpdatedAt: new Date().toISOString(),
    });

    render();
  }

  async function deleteAudioForCompletedModules() {
    var completedModules = state.modules.filter(function (module) {
      return hasPassedModule(getProgressRecord(module.id));
    });

    for (var index = 0; index < completedModules.length; index += 1) {
      await deleteRecord("audioCache", completedModules[index].audioFile).catch(function () {
        return null;
      });
    }

    await prepareDownloadSession(true);
    await refreshStorageEstimate();
    render();
  }

  async function refreshStorageEstimate() {
    var audioRecords = await getAllRecords("audioCache");
    var audioBytes = audioRecords.reduce(function (total, item) {
      return total + Number(item.sizeBytes || (item.blob ? item.blob.size : 0) || 0);
    }, 0);
    var usage = audioBytes;
    var quota = 0;

    if (navigator.storage && navigator.storage.estimate) {
      try {
        var estimate = await navigator.storage.estimate();
        usage = Number(estimate.usage || usage);
        quota = Number(estimate.quota || 0);
      } catch (error) {
        console.warn("Could not estimate storage:", error);
      }
    }

    state.storageEstimate = {
      usage: usage,
      quota: quota,
      audioBytes: audioBytes,
    };
  }

  function sortModules(left, right) {
    return left.moduleNumber - right.moduleNumber;
  }

  async function loadQuizEngine() {
    if (quizEngine) {
      return quizEngine;
    }

    var module = await import("./quiz-engine.js");
    quizEngine = {
      generateQuiz: module.generateQuiz,
      generateQuizInstance: module.generateQuizInstance,
    };
    return quizEngine;
  }

  function ensureQuizSession(moduleId, forceOptions) {
    var forceRefresh = forceOptions === true || Boolean(forceOptions && forceOptions.force);
    if (
      !forceRefresh &&
      state.quizSession &&
      state.quizSession.moduleId === moduleId &&
      (state.quizSession.questions.length || state.quizSession.completed || state.quizSession.error)
    ) {
      return;
    }

    var module = getModuleById(moduleId);
    if (!module) {
      state.quizSession = null;
      return;
    }

    clearQuizAdvanceTimer();

    try {
      var quizTemplates = module.quizQuestions || [];
      var generatedQuestions = quizEngine ? quizEngine.generateQuiz(quizTemplates) : [];
      state.quizSession = {
        moduleId: moduleId,
        questions: generatedQuestions.map(function (question, index) {
          var template = quizTemplates[index] || {};
          return Object.assign({}, question, {
            templateHa: template.templateHa || question.questionText || "",
            templateAjami: template.templateAjami || "",
          });
        }),
        currentIndex: 0,
        selectedOption: null,
        feedbackState: null,
        score: 0,
        answers: [],
        completed: false,
        authorityClass: "AUTO_VERIFIED",
        advanceTimerId: 0,
        error: null,
      };
      state.quizResults = null;
    } catch (err) {
      console.warn("[quiz] generation error", err);
      state.quizSession = {
        moduleId: moduleId,
        questions: [],
        currentIndex: 0,
        selectedOption: null,
        feedbackState: null,
        score: 0,
        answers: [],
        completed: false,
        authorityClass: "AUTO_VERIFIED",
        advanceTimerId: 0,
        error: err instanceof Error ? err.message : "Ba a iya samar da tambayoyin quiz ba.",
      };
    }
  }

  function retryQuizSession(moduleId) {
    if (state.quizSession && state.quizSession.moduleId === moduleId) {
      state.quizSession.error = null;
    }
    ensureQuizSession(moduleId, { force: true });
    render();
  }

  function teardownQuizSession() {
    clearQuizAdvanceTimer();
    state.quizSession = null;
  }

  function clearQuizAdvanceTimer() {
    if (state.quizSession && state.quizSession.advanceTimerId) {
      window.clearTimeout(state.quizSession.advanceTimerId);
      state.quizSession.advanceTimerId = 0;
    }
  }

  async function submitQuizAnswer(optionValue) {
    var session = state.quizSession;

    if (!session || session.completed || session.feedbackState || session.error) {
      return;
    }

    var question = session.questions[session.currentIndex];
    if (!question) {
      return;
    }

    var selectedOption = String(optionValue);
    var isCorrect = normalizeAnswerValue(selectedOption) === normalizeAnswerValue(question.correctAnswer);

    session.selectedOption = selectedOption;
    session.feedbackState = isCorrect ? "correct" : "incorrect";
    session.answers.push({
      questionIndex: session.currentIndex + 1,
      questionText: question.questionText,
      selectedOption: selectedOption,
      correctAnswer: question.correctAnswer,
      correct: isCorrect,
      variables: question.variables,
    });

    if (isCorrect) {
      session.score += 1;
    }

    render();

    session.advanceTimerId = window.setTimeout(function () {
      advanceQuizSession().catch(logError);
    }, QUIZ_AUTO_ADVANCE_DELAY_MS);
  }

  async function advanceQuizSession() {
    var session = state.quizSession;

    if (!session || session.completed) {
      return;
    }

    clearQuizAdvanceTimer();

    if (session.currentIndex < session.questions.length - 1) {
      session.currentIndex += 1;
      session.selectedOption = null;
      session.feedbackState = null;
      render();
      return;
    }

    await finalizeQuizSession();
  }

  async function finalizeQuizSession() {
    var session = state.quizSession;
    if (!session || session.completed) {
      return;
    }

    clearQuizAdvanceTimer();

    var module = getModuleById(session.moduleId);
    if (!module) {
      return;
    }

    var currentRecord = getProgressRecord(module.id);
    var score = session.score;
    var total = session.questions.length;
    var attempts = (currentRecord.attempts || 0) + 1;
    var bestScore = Math.max(score, currentRecord.bestScore || 0);
    var passedThisAttempt = score >= PASSING_SCORE;
    var passedForProgress = bestScore >= PASSING_SCORE;
    var now = new Date().toISOString();
    var nextModule = getNextModuleAfter(module.id);

    await recordLearningActivity();

    await updateProgress(
      module.id,
      {
        status: passedForProgress ? "completed" : "in-progress",
        score: score,
        attempts: attempts,
        lastScore: score,
        bestScore: bestScore,
        quizTakenAt: now,
        completedAt: passedForProgress ? currentRecord.completedAt || now : currentRecord.completedAt || null,
        authorityClass: "AUTO_VERIFIED",
        lastAccessedAt: now,
      },
      { render: false }
    );

    state.quizResults = {
      moduleId: module.id,
      moduleTitle: module.titleHa,
      score: score,
      total: total,
      passed: passedThisAttempt,
      progressPassed: passedForProgress,
      bestScore: bestScore,
      attempts: attempts,
      authorityClass: "AUTO_VERIFIED",
      nextModuleId: nextModule ? nextModule.id : null,
      nextModuleTitle: nextModule ? nextModule.titleHa : "",
    };

    session.completed = true;
    session.selectedOption = null;
    session.feedbackState = null;
    session.advanceTimerId = 0;

    render();
  }

  function renderQuizResultsScreen(module, session) {
    var results = state.quizResults || {
      moduleId: module.id,
      moduleTitle: module.titleHa,
      score: session.score,
      total: session.questions.length,
      passed: session.score >= PASSING_SCORE,
      progressPassed: session.score >= PASSING_SCORE,
      bestScore: session.score,
      attempts: getProgressRecord(module.id).attempts || 0,
      authorityClass: session.authorityClass || "AUTO_VERIFIED",
      nextModuleId: null,
      nextModuleTitle: "",
    };
    var nextModule = results.nextModuleId ? getModuleById(results.nextModuleId) : getNextModuleAfter(module.id);

    return [
      '<section class="screen-panel quiz-shell quiz-result-screen">',
      '<div class="screen-back-row">',
      '<button class="btn-back ghost-btn" type="button" data-route="#/learning-path">' + ha("← Komawa") + "</button>",
      '</div>',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Sakamakon Quiz") + "</p>",
      "<h2>" +
        (state.settings.scriptMode === "ajami"
          ? '<span class="ajami">' + formatAjamiText(getDisplayTitle(module)) + "</span>"
          : escapeHtml(getDisplayTitle(module))) +
        "</h2>",
      '<p class="screen-copy">' + ha("Ka samu ") +
        escapeHtml(String(results.score)) +
        ha(" daga cikin ") +
        escapeHtml(String(results.total)) +
        ".</p>",
      "</div>",
      '<div class="quiz-result-card">',
      '<div class="quiz-stars" aria-label="Star rating">' + renderQuizStars(results.score, results.total) + "</div>",
      '<p class="quiz-result-copy ' +
        (results.passed ? "is-success" : "is-fail") +
        '">' +
        ha(results.passed ? "An yi nasara!" : "Sake gwadawa") +
        "</p>",
      '<p class="helper-text">' +
        ha(
          results.passed
            ? nextModule
              ? "An bude module na gaba."
              : "Ka kammala wannan matakin na quiz."
            : results.progressPassed && nextModule
              ? "Best score dinka ya riga ya bude module na gaba, amma ka iya sake gwadawa domin karin kwarewa."
              : "Ka sake kokari domin ka kai maki 3/5 ko fiye."
        ) +
        "</p>",
      '<p class="helper-text">Authority: ' + escapeHtml(results.authorityClass || "AUTO_VERIFIED") + "</p>",
      "</div>",
      '<div class="btn-row">',
      nextModule && results.progressPassed
        ? '<button class="btn" type="button" data-route="#/lesson/' +
          escapeAttribute(nextModule.id) +
          '">' + ha("Bude na gaba") + "</button>"
        : '<button class="btn" type="button" data-route="#/learning-path">' + ha("Koma hanyar koyo") + "</button>",
      !results.passed
        ? '<button class="secondary-btn" type="button" data-action="retake-quiz" data-module-id="' +
          escapeAttribute(module.id) +
          '">' + ha("Sake quiz") + "</button>"
        : "",
      nextModule && results.progressPassed
        ? '<button class="ghost-btn" type="button" data-route="#/learning-path">' + ha("Koma hanyar koyo") + "</button>"
        : "",
      "</div>",
      "</section>",
    ].join("");
  }

  function renderQuizStars(score, total) {
    var maximum = Math.max(total || 5, 5);
    var markup = "";
    var activeCount = Math.max(0, Math.min(maximum, Number(score || 0)));

    for (var index = 0; index < maximum; index += 1) {
      markup +=
        '<span class="quiz-star' +
        (index < activeCount ? " is-active" : "") +
        '" aria-hidden="true">' +
        (index < activeCount ? "★" : "☆") +
        "</span>";
    }

    return markup;
  }

  function getNextModuleAfter(moduleId) {
    var selectedModules = getSelectedModules();
    var currentIndex = selectedModules.findIndex(function (module) {
      return module.id === moduleId;
    });

    if (currentIndex < 0 || currentIndex >= selectedModules.length - 1) {
      return null;
    }

    return selectedModules[currentIndex + 1];
  }

  function updateShellChrome() {
    var gradeChip = document.getElementById("selected-grade-chip");
    var connectionChip = document.getElementById("connection-status");
    var gear = document.getElementById("settings-gear");
    var home = document.getElementById("home-btn");

    if (gradeChip) {
      gradeChip.textContent = getGradeBandLabel(state.settings.gradeBand || "nursery1");
    }

    if (connectionChip) {
      connectionChip.innerHTML = state.connectivity ? ha("Kan layi") : "Offline";
      connectionChip.classList.toggle("is-online", state.connectivity);
      connectionChip.classList.toggle("is-offline", !state.connectivity);
    }

    if (gear) {
      gear.classList.toggle("is-active", state.route.name === "settings");
    }

    if (home) {
      var hideHome = state.route.name === "learning-path" || state.route.name === "onboarding";
      home.style.display = hideHome ? "none" : "inline-flex";
    }
  }

  function getStatusCopy(status) {
    if (status === "completed") {
      return ha("An gama");
    }

    if (status === "in-progress") {
      return ha("Ana yi");
    }

    return ha("Ba a fara ba");
  }

  function getStatusBadgeClass(status) {
    if (status === "completed") {
      return "status-badge is-complete";
    }

    if (status === "in-progress") {
      return "status-badge is-active";
    }

    return "status-badge";
  }

  function getDownloadStatusCopy(status) {
    if (status === "completed" || status === "complete") {
      return ha("An gama");
    }

    if (status === "downloading") {
      return ha("Ana saukewa");
    }

    if (status === "partial") {
      return ha("An tsaya a tsakiya");
    }

    if (status === "error") {
      return ha("An samu matsala");
    }

    return ha("Ana jira");
  }

  function getDownloadStatusBadgeClass(status) {
    if (status === "completed" || status === "complete") {
      return "status-badge is-complete";
    }

    if (status === "downloading") {
      return "status-badge is-active";
    }

    if (status === "partial") {
      return "status-badge path-badge is-dim";
    }

    return "status-badge";
  }

  function formatMilliseconds(milliseconds) {
    var totalSeconds = Math.round(Number(milliseconds || 0) / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return minutes + ":" + String(seconds).padStart(2, "0");
  }

  function formatBytes(bytes) {
    var value = Number(bytes || 0);
    if (!value) {
      return "0 B";
    }

    var units = ["B", "KB", "MB", "GB"];
    var unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }

    return value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1) + " " + units[unitIndex];
  }

  function formatAjamiText(text) {
    return escapeHtml(String(text || "")).replace(
      /([0-9٠-٩]+(?:\s*[-–]\s*[0-9٠-٩]+)?)/g,
      '<span class="math-inline">$1</span>'
    );
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function logError(error) {
    console.error(error);
  }

  function openDatabase() {
    return new Promise(function (resolve, reject) {
      var request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function (event) {
        var db = event.target.result;

        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains("modules")) {
          db.createObjectStore("modules", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("activities")) {
          db.createObjectStore("activities", { keyPath: "activityId" });
        }
        if (!db.objectStoreNames.contains("audioCache")) {
          db.createObjectStore("audioCache", { keyPath: "url" });
        }
        if (!db.objectStoreNames.contains("progress")) {
          db.createObjectStore("progress", { keyPath: "id" });
        }
        if (db.objectStoreNames.contains("glossary")) {
          db.deleteObjectStore("glossary");
        }
        db.createObjectStore("glossary", { keyPath: "id" });
      };

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject(request.error || new Error("Could not open IndexedDB"));
      };
    });
  }

  function getAllRecords(storeName) {
    return new Promise(function (resolve, reject) {
      var transaction = state.db.transaction(storeName, "readonly");
      var request = transaction.objectStore(storeName).getAll();

      request.onsuccess = function () {
        resolve(request.result || []);
      };
      request.onerror = function () {
        reject(request.error || new Error("Could not read store " + storeName));
      };
    });
  }

  function getRecord(storeName, key) {
    return new Promise(function (resolve, reject) {
      var transaction = state.db.transaction(storeName, "readonly");
      var request = transaction.objectStore(storeName).get(key);

      request.onsuccess = function () {
        resolve(request.result || null);
      };
      request.onerror = function () {
        reject(request.error || new Error("Could not read record from " + storeName));
      };
    });
  }

  function putRecord(storeName, value) {
    return new Promise(function (resolve, reject) {
      var transaction = state.db.transaction(storeName, "readwrite");
      var request = transaction.objectStore(storeName).put(value);

      transaction.oncomplete = function () {
        resolve(request.result);
      };
      transaction.onerror = function () {
        reject(transaction.error || new Error("Could not write store " + storeName));
      };
      transaction.onabort = function () {
        reject(transaction.error || new Error("Transaction aborted for " + storeName));
      };
    });
  }

  function deleteRecord(storeName, key) {
    return new Promise(function (resolve, reject) {
      var transaction = state.db.transaction(storeName, "readwrite");
      var request = transaction.objectStore(storeName).delete(key);

      transaction.oncomplete = function () {
        resolve(request.result);
      };
      transaction.onerror = function () {
        reject(transaction.error || new Error("Could not delete record from " + storeName));
      };
      transaction.onabort = function () {
        reject(transaction.error || new Error("Deleting record aborted for " + storeName));
      };
    });
  }

  function clearStore(storeName) {
    return new Promise(function (resolve, reject) {
      var transaction = state.db.transaction(storeName, "readwrite");
      var request = transaction.objectStore(storeName).clear();

      transaction.oncomplete = function () {
        resolve(request.result);
      };
      transaction.onerror = function () {
        reject(transaction.error || new Error("Could not clear store " + storeName));
      };
      transaction.onabort = function () {
        reject(transaction.error || new Error("Clearing store aborted for " + storeName));
      };
    });
  }
})();
