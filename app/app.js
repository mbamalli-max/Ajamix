(function () {
  "use strict";

  var DB_NAME = "ajamix-db";
  var DB_VERSION = 4;
  var CONTENT_VERSION = "v3.0-dual-track";
  var PASSING_SCORE = 3;
  var LESSON_DEFAULT_DURATION_MS = 180000;
  var QUIZ_AUTO_ADVANCE_DELAY_MS = 900;
  var TOMORROW_CHECK_DELAY_MS = 12 * 60 * 60 * 1000;
  var PRIVACY_LOCKOUT_DURATION_MS = 30000;
  var STREAK_DIM_THRESHOLD_DAYS = 4;
  var STREAK_OUT_THRESHOLD_DAYS = 5;
  var STREAK_VISUAL_COUNT = 7;
  var DEFAULT_AUDIO_SIZE_ESTIMATE_BYTES = 2 * 1024 * 1024;
  var DEV = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  var ALLOWED_AD_ROUTES = ["home", "track-select"];
  var PRODUCTION_URL = "https://ajamix.ng/app/";
  var IMPORTED_CONTENT_KEY = "imported-content";
  var SHARE_SCHEMA_VERSION = "v3-dual-track";
  var REFERRAL_UNLOCK_THRESHOLD = 5;
  var AJAMI_PROVERBS = [
    "A hankali ake cin tuwo mai zafi.",
    "Hannu daya ba ya daukar jinka.",
    "Mai hakuri yakan dafa dutse ya sha romo.",
    "Ruwa baya tsami banza.",
    "Komai nisan jifa kasa zai fado.",
    "Idan kana da gaskiya, ka tsaya da ita."
  ];
  var onboardingStep = 1;
  var onboardingData = createOnboardingData();
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
  var DEFAULT_FEATURE_FLAGS = {
    vocationalTrack: true,
    useTodayLoop: false,
    adSlots: false,
    sharing: false,
    referral: false,
  };
  var DEFAULT_PRIVACY_MODE = {
    enabled: false,
    pinHash: "",
  };
  var DEFAULT_SETTINGS = {
    onboarded: false,
    gradeBand: "nursery1",
    displayName: "Dalibi",
    learnerType: "child",
    scriptMode: "latin",
    audioMode: "on-demand",
    motionMode: "full",
    contentVersion: "sample-bundle",
    lastContentLastModified: "",
    audioDownloadPromptSeen: false,
    audioDownloadState: Object.assign({}, DEFAULT_AUDIO_DOWNLOAD_STATE),
    trackPreference: null,
    privacyMode: Object.assign({}, DEFAULT_PRIVACY_MODE),
    featureFlags: Object.assign({}, DEFAULT_FEATURE_FLAGS),
    analyticsConsent: false,
    referralBadgeState: "locked",
  };
  var ALLOWED_TRACKS = ["vocational", "formal"];
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
    ads: [],
    adsLoaded: false,
    adsLoadError: null,
    adsLoadingPromise: null,
    listenersBound: false,
    confirmResetPending: false,
    onboardingPinMessage: "",
    settingsPinMessage: "",
    privacyGate: {
      unlocked: true,
      failedAttempts: 0,
      lockoutUntil: 0,
      unlockTimerId: null,
      message: "",
    },
    retention: {
      scannedThisBoot: false,
      useTodaySheet: null,
      tomorrowQueue: [],
      activeTomorrowCheck: null,
    },
    fileTransfer: {
      importSheetOpen: false,
      importBusy: false,
      importPendingHandle: null,
      importMessage: null,
      shareBusy: false,
      shareNotice: null,
      launchQueueReady: false,
    },
    referral: {
      modalOpen: false,
      fallbackVisible: false,
      source: "unlock",
      moduleCount: 0,
      busy: false,
      message: null,
    },
    analytics: {
      bootSyncAttempted: false,
      syncPromise: null,
      localKpis: null,
      localKpisLoading: false,
      exportMessage: "",
    },
  };

  function createOnboardingData() {
    return {
      displayName: "",
      learnerType: "child",
      scriptMode: "latin",
      gradeBand: "nursery1",
      trackPreference: null,
    };
  }

  function applyMotionMode(mode) {
    document.body.classList.toggle("motion-reduced", mode === "reduced");
    document.body.classList.toggle("motion-full", mode !== "reduced");
  }

  function getGradeBandLabel(band) {
    return GRADE_BAND_LABELS[band] || band;
  }

  function normalizeTrackPreference(value) {
    return ALLOWED_TRACKS.indexOf(value) >= 0 ? value : null;
  }

  function normalizePrivacyMode(mode) {
    var nextMode = Object.assign({}, DEFAULT_PRIVACY_MODE, mode || {});
    nextMode.pinHash = typeof nextMode.pinHash === "string" ? nextMode.pinHash : "";
    nextMode.enabled = Boolean(nextMode.enabled && nextMode.pinHash);
    return nextMode;
  }

  function normalizeReferralBadgeState(value) {
    return ["locked", "unlocked", "shared"].indexOf(value) >= 0
      ? value
      : DEFAULT_SETTINGS.referralBadgeState;
  }

  function normalizeAnalyticsConsent(value) {
    return Boolean(value);
  }

  function normalizeFeatureFlags(flags) {
    var nextFlags = Object.assign({}, DEFAULT_FEATURE_FLAGS, flags || {});

    Object.keys(DEFAULT_FEATURE_FLAGS).forEach(function (key) {
      nextFlags[key] = Boolean(nextFlags[key]);
    });

    return nextFlags;
  }

  function normalizeUseTodayCommitment(commitment) {
    if (!commitment || typeof commitment !== "object") {
      return null;
    }

    var committedAt = Number(commitment.committedAt || 0);
    if (!Number.isFinite(committedAt) || committedAt <= 0) {
      return null;
    }

    return {
      committedAt: committedAt,
      text: String(commitment.text || "").trim(),
      reminded: Boolean(commitment.reminded),
    };
  }

  function normalizeTomorrowCheckAnswer(answer) {
    return answer === "yes" || answer === "no" ? answer : null;
  }

  function normalizeUnlockedProverb(proverb) {
    if (!proverb || typeof proverb !== "object") {
      return null;
    }

    var haText = String(proverb.ha || "").trim();
    if (!haText) {
      return null;
    }

    return {
      ha: haText,
      ajami: String(proverb.ajami || romanToAjami(haText)).trim(),
      unlockedAt: Number(proverb.unlockedAt || Date.now()),
    };
  }

  function normalizeProgressRecord(record) {
    var nextRecord = Object.assign(
      {
        id: "",
        moduleId: "",
        status: "not-started",
        score: null,
        attempts: 0,
        bestScore: 0,
        audioListenedPct: 0,
        lastAudioPositionSec: 0,
        microPauseData: [],
        useTodayCommitment: null,
        tomorrowCheckAnswer: null,
        tomorrowCheckUnlockedProverb: null,
      },
      record || {}
    );

    nextRecord.microPauseData = Array.isArray(nextRecord.microPauseData)
      ? nextRecord.microPauseData.slice()
      : [];
    nextRecord.useTodayCommitment = normalizeUseTodayCommitment(nextRecord.useTodayCommitment);
    nextRecord.tomorrowCheckAnswer = normalizeTomorrowCheckAnswer(nextRecord.tomorrowCheckAnswer);
    nextRecord.tomorrowCheckUnlockedProverb = normalizeUnlockedProverb(nextRecord.tomorrowCheckUnlockedProverb);

    return nextRecord;
  }

  function clearPrivacyGateTimer() {
    if (state.privacyGate.unlockTimerId) {
      window.clearTimeout(state.privacyGate.unlockTimerId);
      state.privacyGate.unlockTimerId = null;
    }
  }

  function releasePrivacyLockoutIfReady() {
    if (state.privacyGate.lockoutUntil && Date.now() >= state.privacyGate.lockoutUntil) {
      state.privacyGate.lockoutUntil = 0;
      state.privacyGate.failedAttempts = 0;
      state.privacyGate.message = "";
      clearPrivacyGateTimer();
    }
  }

  function schedulePrivacyGateUnlock() {
    clearPrivacyGateTimer();

    if (!state.privacyGate.lockoutUntil) {
      return;
    }

    state.privacyGate.unlockTimerId = window.setTimeout(function () {
      releasePrivacyLockoutIfReady();
      render();
    }, Math.max(0, state.privacyGate.lockoutUntil - Date.now()) + 50);
  }

  function isPrivacyGateActive() {
    releasePrivacyLockoutIfReady();
    return Boolean(state.settings.privacyMode.enabled && !state.privacyGate.unlocked);
  }

  function getPrivacyLockoutSecondsRemaining() {
    if (!state.privacyGate.lockoutUntil) {
      return 0;
    }

    return Math.max(0, Math.ceil((state.privacyGate.lockoutUntil - Date.now()) / 1000));
  }

  function isValidPin(pin) {
    return /^\d{4}$/.test(String(pin || "").trim());
  }

  async function hashPin(pin) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("WebCrypto bai samu ba.");
    }

    var bytes = new TextEncoder().encode(String(pin));
    var digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map(function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }

  async function setPrivacyPin(pin, options) {
    var trimmedPin = String(pin || "").trim();

    if (!isValidPin(trimmedPin)) {
      return {
        ok: false,
        message: "Shigar da PIN mai lambobi 4.",
      };
    }

    var pinHash = await hashPin(trimmedPin);
    await saveSettings({
      privacyMode: {
        enabled: true,
        pinHash: pinHash,
      },
    }, options);

    return {
      ok: true,
      message: "An ajiye PIN na sirri.",
    };
  }

  async function clearPrivacyPin(options) {
    await saveSettings({
      privacyMode: {
        enabled: false,
        pinHash: "",
      },
    }, options);
  }

  async function applyGradeBandSetting(gradeBand) {
    var chosenBand = ALLOWED_GRADE_BANDS.indexOf(gradeBand) >= 0 ? gradeBand : state.settings.gradeBand || "nursery1";
    await saveSettings({
      gradeBand: chosenBand,
      audioDownloadState: normalizeAudioDownloadState({
        gradeBand: chosenBand,
        totalFiles: 0,
        completedUrls: [],
        status: "pending",
        lastUpdatedAt: null,
      }),
    }, { render: false });
    await prepareDownloadSession(true);
    navigate("#/learning-path");
  }

  async function setOnboardingTrackPreference(trackPreference) {
    var normalizedTrack = normalizeTrackPreference(trackPreference);

    if (!normalizedTrack) {
      return;
    }

    onboardingData.trackPreference = normalizedTrack;
    state.onboardingPinMessage = "";
    await saveSettings({ trackPreference: normalizedTrack }, { render: false });
    onboardingStep = 7;
    render();
  }

  // ─── Hausa Ajami transliteration engine ──────────────────────────────────
  // Converts Hausa written in Roman/Latin script to Hausa Ajami (Arabic script).
  // Uses the deterministic consonant + diacritic-vowel mapping defined in the
  // AJAMIX alphabet guide.  Template placeholders like {a} and {b} are preserved
  // verbatim so the quiz engine can still substitute numbers.
  function romanToAjami(text) {
    if (!text) { return ""; }

    var LOANWORD = {
      "settings": "settings", "browser": "browser", "progress": "progress",
      "offline": "offline", "online": "online", "audio": "audio",
      "download": "download", "app": "app", "wifi": "WiFi",
      "cache": "cache", "reset": "reset", "quiz": "quiz"
    };

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

    function _translitSegment(seg) {

      var result = "";
      var i = 0;
      var atWordStart = true;

      while (i < seg.length) {
        // 1 — Preserve {placeholder} patterns intact
        if (seg[i] === "{") {
          var close = seg.indexOf("}", i);
          if (close !== -1) {
            result += seg.slice(i, close + 1);
            i = close + 1;
            atWordStart = false;
            continue;
          }
        }

        // 2 — Whitespace → pass through, reset word-start flag
        var ch = seg[i];
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
          var cNext = (seg[i + 1] || "").toLowerCase();
          if (cNext === "i" || cNext === "e" || cNext === "y") {
            result += "\u0686"; // چ  Hausa ejective palatal
          } else {
            result += "\u0643"; // ك  English /k/ before back vowels / consonants
          }
          atWordStart = false; i += 1; continue;
        }

        // 5 — Multi-char consonant sequences (case-insensitive)
        var two = seg.slice(i, i + 2).toLowerCase();
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
          var carrierJustAdded = false;
          if (atWordStart) { result += ALEF; carrierJustAdded = true; }
          result += VOWEL[lc];
          var nextCh = seg[i + 1] || "";
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
          if (isWordEnd && !carrierJustAdded) {
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
          var nextCh3 = seg[i + 1] || "";
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

    var parts = text.split(/(\s+)/);
    var result = "";
    for (var pi = 0; pi < parts.length; pi++) {
      var part = parts[pi];
      if (/^\s+$/.test(part)) { result += part; continue; }
      // Strip trailing punctuation for lookup
      var match = part.match(/^(.+?)([?.!,]*)$/);
      var word = match ? match[1] : part;
      var punct = match ? match[2] : "";
      if (LOANWORD.hasOwnProperty(word.toLowerCase())) {
        result += LOANWORD[word.toLowerCase()] + (punct ? _translitSegment(punct) : "");
      } else {
        result += _translitSegment(part);
      }
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

  function getLocalizedPair(copy, fallbackHa) {
    var pair = copy && typeof copy === "object"
      ? copy
      : { ha: copy || fallbackHa || "", ajami: "" };
    var haText = String(pair.ha || fallbackHa || "").trim();

    return {
      ha: haText,
      ajami: String(pair.ajami || romanToAjami(haText)).trim(),
    };
  }

  function getLocalizedPlainText(copy, fallbackHa) {
    var pair = getLocalizedPair(copy, fallbackHa);
    return state.settings.scriptMode === "ajami" ? pair.ajami : pair.ha;
  }

  function renderLocalizedInline(copy, className, fallbackHa) {
    var pair = getLocalizedPair(copy, fallbackHa);
    var classes = className
      ? className + (state.settings.scriptMode === "ajami" ? " ajami" : "")
      : (state.settings.scriptMode === "ajami" ? "ajami" : "");
    var classMarkup = classes ? ' class="' + escapeAttribute(classes) + '"' : "";

    return state.settings.scriptMode === "ajami"
      ? '<span' + classMarkup + ">" + formatAjamiText(pair.ajami) + "</span>"
      : '<span' + classMarkup + ">" + escapeHtml(pair.ha) + "</span>";
  }

  function getModuleTitlePair(module) {
    return getLocalizedPair(
      module && module.title ? module.title : null,
      module ? module.titleHa || module.titleEn || "" : ""
    );
  }

  function isUseTodayLoopEnabled() {
    return Boolean(normalizeFeatureFlags(state.settings.featureFlags).useTodayLoop);
  }

  function isSharingEnabled() {
    return Boolean(normalizeFeatureFlags(state.settings.featureFlags).sharing);
  }

  function isReferralEnabled() {
    return Boolean(normalizeFeatureFlags(state.settings.featureFlags).referral);
  }

  function shouldShowReferralBadge() {
    return Boolean(
      isReferralEnabled() &&
      ["unlocked", "shared"].indexOf(normalizeReferralBadgeState(state.settings.referralBadgeState)) >= 0
    );
  }

  function canUseNativeShare() {
    return Boolean(navigator && typeof navigator.share === "function");
  }

  function getAdRouteName() {
    if (state.route && state.route.name === "learning-path") {
      return "home";
    }

    return state.route && state.route.name ? state.route.name : "";
  }

  function getSessionStorage() {
    try {
      return window.sessionStorage || sessionStorage;
    } catch (error) {
      return null;
    }
  }

  function getImportedContentBundle() {
    var bundle = state.settings ? state.settings[IMPORTED_CONTENT_KEY] : null;
    return bundle && typeof bundle === "object" && Array.isArray(bundle.modules)
      ? bundle
      : null;
  }

  function renderBilingualMessage(copy, className) {
    var pair = getLocalizedPair(copy, "");
    var classes = className ? "bilingual-copy " + className : "bilingual-copy";

    if (!pair.ha && !pair.ajami) {
      return "";
    }

    return [
      '<div class="' + escapeAttribute(classes) + '">',
      pair.ha
        ? '<p class="bilingual-copy-ha">' + escapeHtml(pair.ha) + "</p>"
        : "",
      pair.ajami && state.settings.scriptMode === "ajami"
        ? '<p class="bilingual-copy-ajami ajami">' + formatAjamiText(pair.ajami) + "</p>"
        : "",
      "</div>",
    ].join("");
  }

  function hasImportIntentQuery() {
    try {
      return new URLSearchParams(window.location.search || "").has("import");
    } catch (error) {
      return /(?:^|[?&])import(?:=|&|$)/.test(window.location.search || "");
    }
  }

  function clearImportIntentQuery() {
    if (!hasImportIntentQuery() || !window.history || !window.history.replaceState) {
      return;
    }

    var params = new URLSearchParams(window.location.search || "");
    params.delete("import");
    window.history.replaceState(
      {},
      "",
      window.location.pathname +
        (params.toString() ? "?" + params.toString() : "") +
        window.location.hash
    );
  }

  function setImportMessage(kind, haText) {
    state.fileTransfer.importMessage = haText
      ? {
          kind: kind || "info",
          ha: haText,
          ajami: romanToAjami(haText),
        }
      : null;
  }

  function openImportSheet(options) {
    var nextOptions = options || {};
    state.fileTransfer.importSheetOpen = true;
    state.fileTransfer.importBusy = Boolean(nextOptions.busy);

    if (Object.prototype.hasOwnProperty.call(nextOptions, "pendingHandle")) {
      state.fileTransfer.importPendingHandle = nextOptions.pendingHandle || null;
    }

    if (Object.prototype.hasOwnProperty.call(nextOptions, "message")) {
      state.fileTransfer.importMessage = nextOptions.message || null;
    }

    if (nextOptions.render !== false) {
      render();
    }
  }

  function closeImportSheet(options) {
    var nextOptions = options || {};
    state.fileTransfer.importSheetOpen = false;
    state.fileTransfer.importBusy = false;
    state.fileTransfer.importPendingHandle = null;

    if (nextOptions.clearMessage !== false) {
      state.fileTransfer.importMessage = null;
    }

    clearImportIntentQuery();

    if (nextOptions.render !== false) {
      render();
    }
  }

  function dismissShareNotice() {
    state.fileTransfer.shareNotice = null;
    render();
  }

  function openReferralModal(options) {
    var nextOptions = options || {};
    state.referral.modalOpen = true;
    state.referral.fallbackVisible = Boolean(nextOptions.fallbackVisible);
    state.referral.source = nextOptions.source || "unlock";
    state.referral.moduleCount = Math.max(0, Number(nextOptions.moduleCount || 0));
    state.referral.busy = false;
    state.referral.message = nextOptions.message || null;

    if (nextOptions.render !== false) {
      render();
    }
  }

  function closeReferralModal(options) {
    var nextOptions = options || {};
    state.referral.modalOpen = false;
    state.referral.fallbackVisible = false;
    state.referral.busy = false;
    state.referral.message = null;

    if (nextOptions.render !== false) {
      render();
    }
  }

  function setReferralMessage(kind, haText) {
    state.referral.message = haText
      ? {
          kind: kind || "info",
          ha: haText,
          ajami: romanToAjami(haText),
        }
      : null;
  }

  function getReferralShareText() {
    return "Ajamix — Koyi Ajami da darussa offline cikin Hausa da Ajami.";
  }

  function getEventTimestamp(eventRecord) {
    var timestamp = Number(
      eventRecord && (eventRecord.ts || eventRecord.createdAt || 0)
    );
    return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : 0;
  }

  function getEventModuleId(eventRecord) {
    if (!eventRecord || typeof eventRecord !== "object") {
      return "";
    }

    if (eventRecord.moduleId) {
      return String(eventRecord.moduleId);
    }

    if (eventRecord.payload && eventRecord.payload.moduleId) {
      return String(eventRecord.payload.moduleId);
    }

    return "";
  }

  function renderReferralBadgeGraphic(className) {
    var classes = className ? "referral-badge-svg " + className : "referral-badge-svg";

    return [
      '<span class="referral-badge-mark" aria-hidden="true">',
      '<svg class="' + escapeAttribute(classes) + '" viewBox="0 0 80 80" focusable="false">',
      '<circle cx="40" cy="40" r="34" fill="rgba(232, 168, 73, 0.18)" stroke="rgba(232, 168, 73, 0.44)" stroke-width="2"></circle>',
      '<path d="M40 12L47 26L63 28L51 39L54 55L40 47L26 55L29 39L17 28L33 26Z" fill="#e8a849" stroke="#8a5a00" stroke-width="2" stroke-linejoin="round"></path>',
      '<path d="M40 26L45 40H35Z" fill="#fff6d8"></path>',
      '<path d="M40 39L47 56H33Z" fill="#8a5a00"></path>',
      "</svg>",
      "</span>",
    ].join("");
  }

  function syncImportIntentState() {
    if (hasImportIntentQuery()) {
      openImportSheet({ render: false });
    }
  }

  function setupImportLaunchHandler() {
    if (
      state.fileTransfer.launchQueueReady ||
      !("launchQueue" in window) ||
      !window.launchQueue ||
      typeof window.launchQueue.setConsumer !== "function"
    ) {
      return;
    }

    state.fileTransfer.launchQueueReady = true;
    window.launchQueue.setConsumer(function (launchParams) {
      var files = launchParams && launchParams.files ? Array.from(launchParams.files) : [];
      openImportSheet({
        pendingHandle: files.length ? files[0] : null,
        message: null,
        render: true,
      });
    });
  }

  function getAdDismissalKey(adId) {
    return "adDismissed:" + String(adId || "");
  }

  function isAdDismissed(adId) {
    var storage = getSessionStorage();
    return Boolean(storage && storage.getItem(getAdDismissalKey(adId)));
  }

  function dismissAdForSession(adId) {
    var storage = getSessionStorage();
    if (!storage) {
      return;
    }

    try {
      storage.setItem(getAdDismissalKey(adId), "1");
    } catch (error) {
      console.warn("Could not dismiss ad in sessionStorage:", error);
    }
  }

  function shouldRenderAdsForCurrentRoute() {
    return Boolean(
      normalizeFeatureFlags(state.settings.featureFlags).adSlots &&
      state.settings.trackPreference === "vocational" &&
      ALLOWED_AD_ROUTES.indexOf(getAdRouteName()) >= 0
    );
  }

  function ensureAdsLoaded() {
    if (state.adsLoaded || state.adsLoadingPromise) {
      return state.adsLoadingPromise || Promise.resolve(state.ads);
    }

    state.adsLoadingPromise = fetch("./ads.json")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Could not load ads.json");
        }

        return response.json();
      })
      .then(function (ads) {
        state.ads = Array.isArray(ads) ? ads : [];
        state.adsLoaded = true;
        state.adsLoadError = null;
        state.adsLoadingPromise = null;
        render();
        return state.ads;
      })
      .catch(function (error) {
        console.warn("Could not load ads:", error);
        state.ads = [];
        state.adsLoaded = true;
        state.adsLoadError = error instanceof Error ? error.message : "Could not load ads.";
        state.adsLoadingPromise = null;
        render();
        return [];
      });

    return state.adsLoadingPromise;
  }

  function getVisibleAds() {
    return (state.ads || []).filter(function (ad) {
      return ad && ad.id && !isAdDismissed(ad.id);
    });
  }

  function renderAdTitle(ad) {
    if (state.settings.scriptMode === "ajami") {
      return '<span class="ad-slot-title ajami">' + formatAjamiText(ad.title_ajami || romanToAjami(ad.title_ha || "")) + "</span>";
    }

    return '<span class="ad-slot-title">' + escapeHtml(ad.title_ha || "") + "</span>";
  }

  function renderAdSlot() {
    var currentRoute = getAdRouteName();

    if (DEV && ALLOWED_AD_ROUTES.indexOf(currentRoute) === -1) {
      console.error("AdSlot rendered on disallowed route: " + currentRoute);
      throw new Error("AdSlot rendered on disallowed route: " + currentRoute);
    }

    if (!shouldRenderAdsForCurrentRoute()) {
      return "";
    }

    ensureAdsLoaded();

    var visibleAds = getVisibleAds();
    if (!visibleAds.length) {
      return "";
    }

    return [
      '<section class="screen-panel ad-slot-shell">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Tallace-tallace") + "</p>",
      '<h2>' + ha("Talla na kasuwanci") + "</h2>",
      "</div>",
      '<div class="ad-slot-grid">',
      visibleAds.map(function (ad) {
        var clickThrough = ad.clickThrough
          ? '<a class="secondary-btn ad-slot-cta" href="' +
            escapeAttribute(ad.clickThrough) +
            '" target="_blank" rel="noopener noreferrer">' + ha("Duba talla") + "</a>"
          : "";

        return [
          '<article class="ad-slot-card">',
          '<div class="ad-slot-card-head">',
          '<span class="pill ad-slot-label">' + ha(ad.label || "Tallace-tallace") + "</span>",
          '<button class="ghost-btn ad-slot-dismiss" type="button" data-action="dismiss-ad-slot" data-ad-id="' +
            escapeAttribute(ad.id) +
            '">' + ha("Rufe") + "</button>",
          "</div>",
          renderAdTitle(ad),
          ad.image
            ? '<figure class="ad-slot-image"><img src="' + escapeAttribute(ad.image) + '" alt="' + escapeAttribute(ad.title_ha || "") + '" loading="lazy" /></figure>'
            : "",
          clickThrough,
          "</article>",
        ].join("");
      }).join(""),
      "</div>",
      "</section>",
    ].join("");
  }

  function clearRetentionUi(options) {
    state.retention.useTodaySheet = null;
    state.retention.tomorrowQueue = [];
    state.retention.activeTomorrowCheck = null;

    if (options && options.resetBootScan) {
      state.retention.scannedThisBoot = false;
    }
  }

  function getDueTomorrowChecks() {
    var now = Date.now();

    return state.progress
      .filter(function (record) {
        var commitment = normalizeUseTodayCommitment(record.useTodayCommitment);
        return Boolean(
          commitment &&
          commitment.committedAt + TOMORROW_CHECK_DELAY_MS < now &&
          !commitment.reminded &&
          normalizeTomorrowCheckAnswer(record.tomorrowCheckAnswer) === null
        );
      })
      .sort(function (left, right) {
        return left.useTodayCommitment.committedAt - right.useTodayCommitment.committedAt;
      });
  }

  function activateNextTomorrowCheck() {
    if (state.retention.activeTomorrowCheck || !state.retention.tomorrowQueue.length) {
      return false;
    }

    var nextRecord = state.retention.tomorrowQueue.shift();
    var module = getModuleById(nextRecord.moduleId || nextRecord.id);

    if (!module) {
      return activateNextTomorrowCheck();
    }

    state.retention.activeTomorrowCheck = {
      moduleId: module.id,
      stage: "question",
      answer: null,
      proverb: null,
      tip: null,
    };
    return true;
  }

  function scanAndQueueTomorrowChecks() {
    state.retention.tomorrowQueue = getDueTomorrowChecks().slice();
    activateNextTomorrowCheck();
  }

  function activateRetentionLoop() {
    if (!isUseTodayLoopEnabled()) {
      clearRetentionUi();
      return;
    }

    if (isPrivacyGateActive() || state.retention.scannedThisBoot) {
      return;
    }

    state.retention.scannedThisBoot = true;
    scanAndQueueTomorrowChecks();
    render();
  }

  async function logEvent(type, payload) {
    if (!state.db) {
      return null;
    }

    var nextPayload = payload || null;
    var moduleId = nextPayload && nextPayload.moduleId
      ? String(nextPayload.moduleId)
      : null;
    var timestamp = Date.now();

    return putRecord("events", {
      ts: timestamp,
      type: type,
      moduleId: moduleId,
      payload: nextPayload,
      synced: false,
      createdAt: timestamp,
    });
  }

  async function getAllEvents() {
    return getAllRecords("events").catch(function () {
      return [];
    });
  }

  async function getUnsyncedEvents(limit) {
    var maxItems = Math.max(1, Number(limit || 50));
    var events = await getAllEvents();

    return events
      .filter(function (eventRecord) {
        return Boolean(eventRecord && eventRecord.synced !== true);
      })
      .slice(0, maxItems);
  }

  async function markEventsSynced(eventRows) {
    for (var index = 0; index < eventRows.length; index += 1) {
      await putRecord("events", Object.assign({}, eventRows[index], {
        synced: true,
      }));
    }
  }

  function tryRegisterKpiBackgroundSync() {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.ready
      .then(function (registration) {
        if (registration && registration.sync && typeof registration.sync.register === "function") {
          return registration.sync.register("kpi-sync");
        }
        return null;
      })
      .catch(function () {
        return null;
      });
  }

  async function syncEventsToServer() {
    if (!navigator.onLine || !normalizeAnalyticsConsent(state.settings.analyticsConsent)) {
      return null;
    }

    if (state.analytics.syncPromise) {
      return state.analytics.syncPromise;
    }

    state.analytics.syncPromise = (async function () {
      try {
        var unsyncedEvents = await getUnsyncedEvents(50);
        if (!unsyncedEvents.length) {
          return null;
        }

        tryRegisterKpiBackgroundSync();

        var response = await fetch("/api/kpi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            events: unsyncedEvents,
          }),
        });

        if (!response.ok) {
          return null;
        }

        var responseBody = await response.json().catch(function () {
          return null;
        });
        var acceptedCount = Math.max(
          0,
          Math.min(
            unsyncedEvents.length,
            Number(responseBody && responseBody.accepted ? responseBody.accepted : 0)
          )
        );

        if (acceptedCount > 0) {
          await markEventsSynced(unsyncedEvents.slice(0, acceptedCount));
        }

        if (state.settings.analyticsConsent && state.route.name === "settings") {
          refreshLocalKPIs().catch(function () {
            return null;
          });
        }
      } catch (_error) {
        return null;
      } finally {
        state.analytics.syncPromise = null;
      }

      return null;
    })();

    return state.analytics.syncPromise;
  }

  function maybeSyncEventsInBackground() {
    syncEventsToServer().catch(function () {
      return null;
    });
  }

  function triggerBootAnalyticsSync() {
    if (state.analytics.bootSyncAttempted || isPrivacyGateActive()) {
      return;
    }

    state.analytics.bootSyncAttempted = true;
    if (!normalizeAnalyticsConsent(state.settings.analyticsConsent) || !navigator.onLine) {
      return;
    }

    tryRegisterKpiBackgroundSync();
    maybeSyncEventsInBackground();
  }

  async function maybeLogSecondModuleStarted() {
    var events = await getAllEvents();
    var alreadyLogged = events.some(function (eventRecord) {
      return eventRecord && eventRecord.type === "second_module_started";
    });

    if (alreadyLogged) {
      return;
    }

    var startedModules = {};

    events.forEach(function (eventRecord) {
      if (!eventRecord || eventRecord.type !== "module_started") {
        return;
      }

      var moduleId = getEventModuleId(eventRecord);
      if (moduleId) {
        startedModules[moduleId] = true;
      }
    });

    if (Object.keys(startedModules).length >= 2) {
      await logEvent("second_module_started", {
        moduleCount: 2,
      });
    }
  }

  async function computeLocalKPIs() {
    var events = await getAllEvents();
    var sortedEvents = events
      .slice()
      .sort(function (left, right) {
        return getEventTimestamp(left) - getEventTimestamp(right);
      });
    var firstTimedEvent = sortedEvents.find(function (eventRecord) {
      return getEventTimestamp(eventRecord) > 0;
    });
    var firstEventTs = firstTimedEvent ? getEventTimestamp(firstTimedEvent) : 0;
    var completedModules = {};
    var startedModules = {};
    var useTodayYesCount = 0;
    var useTodayDeferredCount = 0;
    var hasSecondModuleStarted = false;
    var hasShared = false;
    var hasDay2Retention = false;
    var hasDay7Retention = false;

    sortedEvents.forEach(function (eventRecord) {
      var type = eventRecord && eventRecord.type ? eventRecord.type : "";
      var moduleId = getEventModuleId(eventRecord);
      var eventTs = getEventTimestamp(eventRecord);

      if (moduleId && type === "module_started") {
        startedModules[moduleId] = true;
      }

      if (moduleId && type === "module_completed") {
        completedModules[moduleId] = true;
      }

      if (type === "use_today_yes") {
        useTodayYesCount += 1;
      }

      if (type === "use_today_deferred") {
        useTodayDeferredCount += 1;
      }

      if (type === "second_module_started") {
        hasSecondModuleStarted = true;
      }

      if (type === "share_initiated") {
        hasShared = true;
      }

      if (firstEventTs) {
        if (eventTs > firstEventTs + (24 * 60 * 60 * 1000) && eventTs < firstEventTs + (48 * 60 * 60 * 1000)) {
          hasDay2Retention = true;
        }

        if (eventTs > firstEventTs + (6 * 24 * 60 * 60 * 1000)) {
          hasDay7Retention = true;
        }
      }
    });

    var startedCount = Object.keys(startedModules).length;
    var completedCount = Object.keys(completedModules).length;
    var useTodayTotal = useTodayYesCount + useTodayDeferredCount;

    return {
      day2Retention: hasDay2Retention,
      day7Retention: hasDay7Retention,
      secondModuleStarted: hasSecondModuleStarted,
      avgModulesCompleted: completedCount,
      completionRate: startedCount ? Math.min(1, completedCount / startedCount) : 0,
      useTodayYesRate: useTodayTotal ? useTodayYesCount / useTodayTotal : 0,
      shareInitiationRate: hasShared ? 1 : 0,
    };
  }

  async function refreshLocalKPIs() {
    if (!normalizeAnalyticsConsent(state.settings.analyticsConsent)) {
      state.analytics.localKpis = null;
      state.analytics.localKpisLoading = false;
      return null;
    }

    state.analytics.localKpisLoading = true;

    try {
      state.analytics.localKpis = await computeLocalKPIs();
      return state.analytics.localKpis;
    } finally {
      state.analytics.localKpisLoading = false;
    }
  }

  async function getDistinctCompletedModuleCount() {
    if (!state.db) {
      return 0;
    }

    var completionEvents = await getAllRecords("events").catch(function () {
      return [];
    });
    var seenModuleIds = {};

    completionEvents.forEach(function (eventRecord) {
      if (!eventRecord || eventRecord.type !== "module_completed") {
        return;
      }

      var moduleId = eventRecord.moduleId ||
        (eventRecord.payload && eventRecord.payload.moduleId
          ? String(eventRecord.payload.moduleId)
          : "");
      if (moduleId) {
        seenModuleIds[moduleId] = true;
      }
    });

    return Object.keys(seenModuleIds).length;
  }

  async function maybeUnlockReferralBadge() {
    if (!isReferralEnabled()) {
      return;
    }

    if (normalizeReferralBadgeState(state.settings.referralBadgeState) !== "locked") {
      return;
    }

    var moduleCount = await getDistinctCompletedModuleCount();
    if (moduleCount < REFERRAL_UNLOCK_THRESHOLD) {
      return;
    }

    await saveSettings({ referralBadgeState: "unlocked" }, { render: false });
    await logEvent("referral_unlocked", {
      moduleCount: REFERRAL_UNLOCK_THRESHOLD,
    });
    openReferralModal({
      source: "unlock",
      moduleCount: moduleCount,
    });
  }

  async function recordModuleCompletedEvent(moduleId, source) {
    await logEvent("module_completed", {
      moduleId: moduleId,
      source: source || "progress",
    });
    await maybeUnlockReferralBadge();
    maybeSyncEventsInBackground();
  }

  function openUseTodaySheet(moduleId) {
    var module = getModuleById(moduleId);

    if (!module || !module.useTodayPrompt || !isUseTodayLoopEnabled()) {
      return;
    }

    state.retention.useTodaySheet = {
      moduleId: module.id,
      message: "",
    };
  }

  async function saveUseTodayCommitment(moduleId, text, eventType) {
    var commitmentText = String(text || "").trim();

    if (!commitmentText) {
      state.retention.useTodaySheet = state.retention.useTodaySheet || { moduleId: moduleId };
      state.retention.useTodaySheet.message = "Ka rubuta abin da kake son gwadawa.";
      render();
      return;
    }

    var currentRecord = getProgressRecord(moduleId);

    await updateProgress(
      moduleId,
      {
        status: currentRecord.status,
        useTodayCommitment: {
          committedAt: Date.now(),
          text: commitmentText,
          reminded: false,
        },
        tomorrowCheckAnswer: null,
        tomorrowCheckUnlockedProverb: null,
        lastAccessedAt: new Date().toISOString(),
      },
      { render: false }
    );

    await logEvent(eventType, {
      moduleId: moduleId,
      text: commitmentText,
    });

    state.retention.useTodaySheet = null;
    render();
  }

  function pickRandomAjamiProverb() {
    var proverbHa = AJAMI_PROVERBS[Math.floor(Math.random() * AJAMI_PROVERBS.length)] || AJAMI_PROVERBS[0];

    return {
      ha: proverbHa,
      ajami: romanToAjami(proverbHa),
      unlockedAt: Date.now(),
    };
  }

  function getTomorrowCheckTip(module) {
    var glossaryCard = (module.lessons || []).find(function (lesson) {
      return lesson.type === "glossary-card" && lesson.term && lesson.definition;
    });

    if (glossaryCard) {
      return {
        heading: {
          ha: "Karamin tunatarwa",
          ajami: romanToAjami("Karamin tunatarwa"),
        },
        term: getLocalizedPair(glossaryCard.term),
        definition: getLocalizedPair(glossaryCard.definition),
      };
    }

    return {
      heading: {
        ha: "Karamin tunatarwa",
        ajami: romanToAjami("Karamin tunatarwa"),
      },
      term: {
        ha: module.titleHa || "Darasi",
        ajami: module.titleAjami || romanToAjami(module.titleHa || "Darasi"),
      },
      definition: getLocalizedPair(module.summary || null, module.textExplanationHa || ""),
    };
  }

  async function answerTomorrowCheck(answer) {
    var activeCheck = state.retention.activeTomorrowCheck;
    var module = activeCheck ? getModuleById(activeCheck.moduleId) : null;

    if (!activeCheck || !module) {
      state.retention.activeTomorrowCheck = null;
      activateNextTomorrowCheck();
      render();
      return;
    }

    var currentRecord = getProgressRecord(module.id);
    var currentCommitment = normalizeUseTodayCommitment(currentRecord.useTodayCommitment);

    if (!currentCommitment) {
      state.retention.activeTomorrowCheck = null;
      activateNextTomorrowCheck();
      render();
      return;
    }

    var nextCommitment = Object.assign({}, currentCommitment, {
      reminded: true,
    });
    var patch = {
      status: currentRecord.status,
      useTodayCommitment: nextCommitment,
      tomorrowCheckAnswer: answer,
      lastAccessedAt: new Date().toISOString(),
    };

    if (answer === "yes") {
      patch.tomorrowCheckUnlockedProverb = pickRandomAjamiProverb();
    }

    await updateProgress(module.id, patch, { render: false });
    await logEvent(answer === "yes" ? "tomorrow_check_yes" : "tomorrow_check_no", {
      moduleId: module.id,
      commitmentText: nextCommitment.text,
    });

    state.retention.activeTomorrowCheck = {
      moduleId: module.id,
      stage: "result",
      answer: answer,
      proverb: answer === "yes" ? patch.tomorrowCheckUnlockedProverb : null,
      tip: answer === "no" ? getTomorrowCheckTip(module) : null,
    };
    render();
  }

  function dismissTomorrowCheckResult() {
    state.retention.activeTomorrowCheck = null;
    activateNextTomorrowCheck();
    render();
  }

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      state.db = await openDatabase();
      await loadQuizEngine();
      await loadSettings();
      setupImportLaunchHandler();
      syncImportIntentState();
      state.privacyGate.unlocked = !state.settings.privacyMode.enabled;
      state.privacyGate.failedAttempts = 0;
      state.privacyGate.lockoutUntil = 0;
      state.privacyGate.message = "";
      clearPrivacyGateTimer();
      applyMotionMode(state.settings.motionMode);
      await syncStreakState();
      await loadProgress();
      bindListeners();
      await loadContentBundle();
      await refreshStorageEstimate();
      ensureRoute();
      updateShellChrome();
      render();
      activateRetentionLoop();
      triggerBootAnalyticsSync();
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
      if (state.route.name === "onboarding") {
        onboardingData.gradeBand =
          ALLOWED_GRADE_BANDS.indexOf(target.dataset.gradeBand) >= 0
            ? target.dataset.gradeBand
            : "nursery1";
        onboardingStep = 6;
        render();
        return;
      }

      await applyGradeBandSetting(target.dataset.gradeBand);
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
      state.onboardingPinMessage = "";
      if (onboardingStep < 7) {
        onboardingStep += 1;
        render();
      }
      return;
    }

    if (target.dataset.action === "onboarding-back") {
      if (onboardingStep > 1) {
        state.onboardingPinMessage = "";
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

    if (target.dataset.action === "ob-set-track-vocational") {
      await setOnboardingTrackPreference("vocational");
      return;
    }

    if (target.dataset.action === "ob-set-track-formal") {
      await setOnboardingTrackPreference("formal");
      return;
    }

    if (target.dataset.action === "track-set-vocational") {
      await saveSettings({ trackPreference: "vocational" });
      navigate("#/learning-path");
      return;
    }

    if (target.dataset.action === "track-set-formal") {
      await saveSettings({ trackPreference: "formal" });
      navigate("#/learning-path");
      return;
    }

    if (target.dataset.action === "dismiss-ad-slot") {
      dismissAdForSession(target.dataset.adId);
      render();
      return;
    }

    if (target.dataset.action === "dismiss-share-notice") {
      dismissShareNotice();
      return;
    }

    if (target.dataset.action === "dismiss-referral-modal") {
      closeReferralModal();
      return;
    }

    if (target.dataset.action === "referral-share") {
      await startReferralShareFlow({
        source: target.dataset.source || "unlock",
      });
      return;
    }

    if (target.dataset.action === "referral-copy-link") {
      await copyReferralLink({
        source: target.dataset.source || "unlock",
      });
      return;
    }

    if (target.dataset.action === "referral-export-ajamix") {
      await exportReferralAjamixPackage({
        source: target.dataset.source || "unlock",
      });
      return;
    }

    if (target.dataset.action === "share-referral-badge") {
      await handleReferralBadgeTap();
      return;
    }

    if (target.dataset.action === "dismiss-import-sheet") {
      closeImportSheet();
      return;
    }

    if (target.dataset.action === "export-ajamix-package") {
      await exportAjamixPackage();
      return;
    }

    if (target.dataset.action === "export-ajamix-delta") {
      await exportAjamixDeltaPack();
      return;
    }

    if (target.dataset.action === "export-usage-events") {
      await exportUsageEvents();
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

    if (target.dataset.action === "use-today-yes") {
      await saveUseTodayCommitment(target.dataset.moduleId, "Zan yi amfani da shi yau", "use_today_yes");
      return;
    }

    if (target.dataset.action === "use-today-deferred") {
      await saveUseTodayCommitment(target.dataset.moduleId, "Wata rana", "use_today_deferred");
      return;
    }

    if (target.dataset.action === "tomorrow-check-yes") {
      await answerTomorrowCheck("yes");
      return;
    }

    if (target.dataset.action === "tomorrow-check-no") {
      await answerTomorrowCheck("no");
      return;
    }

    if (target.dataset.action === "tomorrow-check-continue") {
      dismissTomorrowCheckResult();
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
      state.confirmResetPending = true;
      render();
      return;
    }

    if (target.dataset.action === "confirm-reset-yes") {
      state.confirmResetPending = false;
      await clearStore("progress");
      await setStreakData(DEFAULT_STREAK_DATA, { persist: true });
      state.progress = [];
      clearRetentionUi({ resetBootScan: true });
      state.quizResults = null;
      state.activeLessonModuleId = null;
      teardownQuizSession();
      teardownLessonSession();
      await refreshStorageEstimate();
      render();
      return;
    }

    if (target.dataset.action === "confirm-reset-no") {
      state.confirmResetPending = false;
      render();
      return;
    }

    if (target.dataset.action === "ob-skip-privacy-pin") {
      state.onboardingPinMessage = "";
      await clearPrivacyPin({ render: false });
      await completeOnboarding();
      return;
    }

    if (target.dataset.action === "remove-privacy-pin") {
      state.settingsPinMessage = "An cire PIN na sirri.";
      await clearPrivacyPin({ render: false });
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
    if (form.matches("[data-privacy-gate-form]")) {
      event.preventDefault();
      releasePrivacyLockoutIfReady();

      if (state.privacyGate.lockoutUntil) {
        schedulePrivacyGateUnlock();
        render();
        return;
      }

      var privacyGateData = new FormData(form);
      var enteredPin = String(privacyGateData.get("privacyPin") || "").trim();

      if (!isValidPin(enteredPin)) {
        state.privacyGate.message = "Shigar da PIN mai lambobi 4.";
        render();
        return;
      }

      var enteredHash = await hashPin(enteredPin);
      if (enteredHash === state.settings.privacyMode.pinHash) {
        state.privacyGate.unlocked = true;
        state.privacyGate.failedAttempts = 0;
        state.privacyGate.lockoutUntil = 0;
        state.privacyGate.message = "";
        clearPrivacyGateTimer();
        await handleRouteChange();
        activateRetentionLoop();
        triggerBootAnalyticsSync();
        return;
      }

      state.privacyGate.failedAttempts += 1;
      if (state.privacyGate.failedAttempts >= 3) {
        state.privacyGate.failedAttempts = 0;
        state.privacyGate.lockoutUntil = Date.now() + PRIVACY_LOCKOUT_DURATION_MS;
        state.privacyGate.message = "An kulle app na sakan 30. Jira kadan kafin sake gwadawa.";
        schedulePrivacyGateUnlock();
      } else {
        state.privacyGate.message = "PIN bai yi daidai ba. Ka sake gwadawa.";
      }
      render();
      return;
    }

    if (form.matches("[data-onboarding-pin-form]")) {
      event.preventDefault();
      var onboardingPinData = new FormData(form);
      var onboardingPin = String(onboardingPinData.get("onboardingPin") || "").trim();
      var onboardingResult = await setPrivacyPin(onboardingPin, { render: false });

      if (!onboardingResult.ok) {
        state.onboardingPinMessage = onboardingResult.message;
        render();
        return;
      }

      state.onboardingPinMessage = "";
      await completeOnboarding();
      return;
    }

    if (form.matches("[data-settings-pin-form]")) {
      event.preventDefault();
      var settingsPinData = new FormData(form);
      var settingsPin = String(settingsPinData.get("settingsPin") || "").trim();
      var settingsResult = await setPrivacyPin(settingsPin, { render: false });
      state.settingsPinMessage = settingsResult.message;
      render();
      return;
    }

    if (form.matches("[data-use-today-note-form]")) {
      event.preventDefault();
      var useTodayNoteData = new FormData(form);
      await saveUseTodayCommitment(
        form.getAttribute("data-module-id") || "",
        String(useTodayNoteData.get("useTodayNote") || "").trim(),
        "use_today_note"
      );
      return;
    }

    if (form.matches("[data-import-package-form]")) {
      event.preventDefault();
      await importAjamixPackageFromForm(form);
      return;
    }

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

    if (target.name === "analyticsConsent") {
      await saveSettings({ analyticsConsent: Boolean(target.checked) }, { render: false });

      if (target.checked) {
        await refreshLocalKPIs();
        maybeSyncEventsInBackground();
      } else {
        state.analytics.localKpis = null;
        state.analytics.localKpisLoading = false;
      }

      render();
    }
  }

  function handleConnectivityChange() {
    state.connectivity = navigator.onLine;
    updateShellChrome();
    if (state.connectivity) {
      checkForContentUpdate().catch(logError);
      prepareDownloadSession(true).catch(logError);
      maybeSyncEventsInBackground();
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

    if (isPrivacyGateActive()) {
      updateShellChrome();
      render();
      schedulePrivacyGateUnlock();
      return;
    }

    if (!state.settings.onboarded && !isPublicRoute(state.route.name)) {
      navigate("#/onboarding");
      return;
    }

    if (state.settings.onboarded && state.route.name === "onboarding") {
      navigate("#/learning-path");
      return;
    }

    if (
      state.settings.onboarded &&
      !state.settings.trackPreference &&
      state.route.name !== "track-select" &&
      state.route.name !== "settings"
    ) {
      navigate("#/track-select");
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
      if (state.settings.analyticsConsent) {
        await refreshLocalKPIs();
      } else {
        state.analytics.localKpis = null;
        state.analytics.localKpisLoading = false;
      }
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
      "track-select",
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

    if (isPrivacyGateActive()) {
      root.innerHTML = renderScreenLayout("privacy-gate", renderPrivacyGateScreen());
      return;
    }

    var screenMarkup = "";

    switch (state.route.name) {
      case "onboarding":
        screenMarkup = renderOnboardingScreen();
        break;
      case "learning-path":
        screenMarkup = renderHomeScreen();
        break;
      case "track-select":
        screenMarkup = renderTrackSelectScreen();
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
        screenMarkup = renderHomeScreen();
    }

    root.innerHTML = renderScreenLayout(state.route.name, screenMarkup);
    syncActiveScreen().catch(logError);
  }

  function renderScreenLayout(screenName, content) {
    var showTabs =
      state.settings.onboarded &&
      screenName !== "onboarding" &&
      screenName !== "privacy-gate";
    return [
      '<section class="screen" data-screen="' + escapeHtml(screenName) + '">',
      renderAppBanners(),
      content,
      "</section>",
      showTabs ? renderTabs() : "",
      renderGlobalOverlay(),
    ].join("");
  }

  function renderOnboardingScreen() {
    var steps = [
      renderOnboardingStep1,
      renderOnboardingStep2,
      renderOnboardingStep3,
      renderOnboardingStep4,
      renderOnboardingStep5,
      renderOnboardingStep6,
      renderOnboardingStep7,
    ];
    var stepFn = steps[onboardingStep - 1] || renderOnboardingStep1;
    var progressDots = steps.map(function (_step, index) {
      var n = index + 1;
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
      '<p class="eyebrow">' + ha("Matakin 2 na 7") + "</p>",
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
      '<p class="eyebrow">' + ha("Matakin 3 na 7") + "</p>",
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
      '<p class="eyebrow">' + ha("Matakin 4 na 7") + "</p>",
      "<h2>" + ha("Salon rubutu") + "</h2>",
      '<p class="screen-copy">' + ha("A wannan lokacin, karatu zai kasance a Hausa (Latin) kawai. Za a kara Ajami bayan an tabbatar da fassarar.") + "</p>",
      "</div>",
      '<div class="ob-nav">',
      '<button class="ghost-btn" type="button" data-action="onboarding-back">' + ha("← Baya") + "</button>",
      '<button class="btn" type="button" data-action="onboarding-next">' + ha("Gaba →") + "</button>",
      "</div>",
      "</div>",
    ].join("");
  }

  function renderOnboardingStep5() {
    var chosenBand = onboardingData.gradeBand || state.settings.gradeBand || "nursery1";
    return [
      '<div class="ob-step">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Matakin 5 na 7") + "</p>",
      "<h2>" + ha("Wane matakin karatu?") + "</h2>",
      '<p class="screen-copy">' + ha("Zabi matakin da ya dace. Bayan haka za ka zabi hanya da PIN idan kana so.") + "</p>",
      '<p class="muted">' + ha("Zaɓaɓɓen mataki yanzu: ") + escapeHtml(getGradeBandLabel(chosenBand)) + "</p>",
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

  function renderOnboardingStep6() {
    var currentTrack = onboardingData.trackPreference || state.settings.trackPreference || "formal";
    return [
      '<div class="ob-step">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Matakin 6 na 7") + "</p>",
      "<h2>" + ha("Wacce hanya kake son bi?") + "</h2>",
      '<p class="screen-copy">' + ha("Za ka iya canja hanya daga Settings a kowane lokaci.") + "</p>",
      "</div>",
      '<div class="ob-choice-grid">',
      '<button class="ob-choice' + (currentTrack === "vocational" ? " ob-choice--active" : "") + '" type="button" data-action="ob-set-track-vocational">',
      "<strong>" + ha("Hanyar Kasuwanci") + "</strong>",
      "<span>" + ha("Darussan kasuwanci, aiki, da rayuwar yau da kullum.") + "</span>",
      "</button>",
      '<button class="ob-choice' + (currentTrack === "formal" ? " ob-choice--active" : "") + '" type="button" data-action="ob-set-track-formal">',
      "<strong>" + ha("Hanyar Makaranta") + "</strong>",
      "<span>" + ha("Darussan makaranta bisa matakin karatu.") + "</span>",
      "</button>",
      "</div>",
      '<div class="ob-nav">',
      '<button class="ghost-btn" type="button" data-action="onboarding-back">' + ha("← Baya") + "</button>",
      "</div>",
      "</div>",
    ].join("");
  }

  function renderOnboardingStep7() {
    return [
      '<div class="ob-step">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Matakin 7 na 7") + "</p>",
      "<h2>" + ha("Kana son PIN na sirri?") + "</h2>",
      '<p class="screen-copy">' + ha("Wannan zaɓi ne. Idan ka sa PIN mai lambobi 4, za a bukaci ka shigar da shi duk lokacin da app ta buɗe.") + "</p>",
      "</div>",
      '<form class="ob-field" data-onboarding-pin-form>',
      '<label class="ob-label" for="ob-privacy-pin-input">' + ha("PIN mai lambobi 4") + "</label>",
      '<input class="text-input" id="ob-privacy-pin-input" name="onboardingPin" type="password" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="new-password" placeholder="' + ha("Misali: 1234") + '" />',
      state.onboardingPinMessage
        ? '<p class="muted">' + ha(state.onboardingPinMessage) + "</p>"
        : "",
      '<div class="ob-nav">',
      '<button class="ghost-btn" type="button" data-action="onboarding-back">' + ha("← Baya") + "</button>",
      '<button class="ghost-btn" type="button" data-action="ob-skip-privacy-pin">' + ha("Tsallake") + "</button>",
      '<button class="btn" type="submit">' + ha("Ajiye kuma gama") + "</button>",
      "</div>",
      "</form>",
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
            "</p>",
          "</section>",
        ].join("")
      : "";
    var referralBadgeCard = shouldShowReferralBadge()
      ? renderProgressReferralCard()
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
          state.settings.scriptMode === "ajami"
            ? '<span class="ajami">' + formatAjamiText(module.titleAjami) + "</span>"
            : "",
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
          "<span>" + ha("Gwaji: ") + escapeHtml(String(record.attempts || 0)) + "</span>",
          "<span>" + getLastActivityCopy(record) + "</span>",
          "</div>",
          "</article>",
        ].join("");
      })
      .join("");

    return [
      resultBanner,
      referralBadgeCard,
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
      '<article class="metric-panel"><span>' + ha("Mafi kyawun maki") + '</span><strong>' +
        bestScoreTotal +
        "/" +
        possibleScoreTotal +
        "</strong></article>",
      "</div>",
      "</section>",
      '<section class="settings-grid module-progress-grid">' + moduleProgress + "</section>",
    ].join("");
  }

  function renderProgressReferralCard() {
    var badgeState = normalizeReferralBadgeState(state.settings.referralBadgeState);

    return [
      '<section class="gap-teaser-card referral-badge-card">',
      '<div class="gap-teaser-card-head referral-badge-head">',
      renderReferralBadgeGraphic("referral-badge-graphic"),
      '<div class="screen-stack">',
      '<div class="progress-row">',
      '<strong>' + ha("Mai Yada Ilimi") + "</strong>",
      '<span class="status-badge path-badge is-' + escapeAttribute(badgeState === "shared" ? "complete" : "active") + '">' +
        ha(badgeState === "shared" ? "An raba" : "An buɗe") +
        "</span>",
      "</div>",
      '<p class="gap-teaser-copy">' + ha("Ka kai modules biyar. Taɓa nan domin ka sake raba AJAMIX ga wani.") + "</p>",
      '<div class="btn-row referral-inline-actions">',
      '<button class="secondary-btn" type="button" data-action="share-referral-badge">' + ha("Raba Ajamix") + "</button>",
      "</div>",
      "</div>",
      "</div>",
      "</section>",
    ].join("");
  }

  function renderGlossaryScreen() {
    var glossaryItems = state.glossary.length
      ? state.glossary
          .map(function (item) {
            return [
              '<li class="glossary-item">',
              "<strong>" + ha(getGlossaryHausa(item)) + "</strong>",
              state.settings.scriptMode === "ajami"
                ? '<span class="ajami">' + formatAjamiText(getGlossaryAjami(item)) + "</span>"
                : "",
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
      '<p class="screen-copy">' + ha("Kalmomi masu muhimmanci da aka fi amfani da su a darussa. Taɓa kalma domin ganin ma'anarta cikin Hausa da Ajami.") + "</p>",
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
              item.sizeBytes
                ? '<span class="muted-copy">' + escapeHtml(formatBytes(item.sizeBytes)) + "</span>"
                : "",
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
        (session.readyForOffline ? ha("Sake duba audio") : ha("Saukar da duk audio")) +
        "</button>",
      '<button class="ghost-btn" type="button" data-action="skip-audio-download">' + ha("Tsallake yanzu") + "</button>",
      "</div>",
      session.readyForOffline
        ? '<article class="metric-panel ready-offline-panel"><strong>' + ha("An shirya don offline!") + '</strong><span>' + ha("Audio na wannan mataki ya shiga na'urar, kuma darussa za su yi aiki ko da babu intanet.") + "</span></article>"
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
    var privacyMode = normalizePrivacyMode(state.settings.privacyMode);
    var sharingEnabled = isSharingEnabled();
    var analyticsConsent = normalizeAnalyticsConsent(state.settings.analyticsConsent);
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
      "<h3>" + ha("Matakin karatu") + "</h3>",
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
      '<div class="settings-section">',
      "<h3>" + ha("Hanyar koyo") + "</h3>",
      '<p class="muted">' + ha("Hanya yanzu: ") + ha(state.settings.trackPreference ? getTrackLabel(state.settings.trackPreference) : "Ba a zaba ba tukuna.") + "</p>",
      '<div class="btn-row">',
      '<button class="secondary-btn" type="button" data-route="#/track-select">' + ha("Canja hanya") + "</button>",
      "</div>",
      "</div>",
      '<div class="settings-section">',
      "<h3>" + ha("PIN na sirri") + "</h3>",
      '<p class="muted">' +
        (privacyMode.enabled
          ? ha("An kunna PIN a wannan na'ura.")
          : ha("Ba a kunna PIN ba tukuna.")) +
        "</p>",
      '<form class="ob-field" data-settings-pin-form>',
      '<label class="ob-label" for="settings-pin-input">' + ha(privacyMode.enabled ? "Canja PIN mai lambobi 4" : "Saita PIN mai lambobi 4") + "</label>",
      '<input class="text-input" id="settings-pin-input" name="settingsPin" type="password" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="new-password" placeholder="' + ha("Misali: 1234") + '" />',
      state.settingsPinMessage
        ? '<p class="muted">' + ha(state.settingsPinMessage) + "</p>"
        : "",
      '<div class="btn-row">',
      '<button class="secondary-btn" type="submit">' + ha(privacyMode.enabled ? "Canja PIN" : "Saita PIN") + "</button>",
      '<button class="ghost-btn" type="button" data-action="remove-privacy-pin"' + (privacyMode.enabled ? "" : " disabled") + ">" + ha("Cire PIN") + "</button>",
      "</div>",
      "</form>",
      "</div>",
      "</article>",
      '<article class="settings-panel">',
      '<div class="settings-section">',
      "<h3>" + ha("Ajiye audio") + "</h3>",
      '<ul class="settings-list">',
      '<li><label><input type="radio" name="audioMode" value="on-demand" ' +
        (state.settings.audioMode === "on-demand" ? "checked" : "") +
        ' /> ' + ha("Sauke audio idan akwai bukata") + '</label></li>',
      '<li><label><input type="radio" name="audioMode" value="wifi-only" ' +
        (state.settings.audioMode === "wifi-only" ? "checked" : "") +
        ' /> ' + ha("Sauke audio a WiFi kawai") + '</label></li>',
      "</ul>",
      "<h3>" + ha("Motsi") + "</h3>",
      '<ul class="settings-list">',
      '<li><label><input type="radio" name="motionMode" value="full" ' +
        (state.settings.motionMode === "full" ? "checked" : "") +
        ' /> ' + ha("Motsi cikakke") + '</label></li>',
      '<li><label><input type="radio" name="motionMode" value="reduced" ' +
        (state.settings.motionMode === "reduced" ? "checked" : "") +
        ' /> ' + ha("Rage motsi") + '</label></li>',
      "</ul>",
      '<div class="screen-stack">',
      '<span class="pill">' + ha("Yanayin audio: ") + getDownloadStatusCopy(audioState.status) + "</span>",
      '<span class="pill">' + ha("Adadin ajiya: ") + storageCopy + "</span>",
      '<span class="pill">' + ha("Audio da aka ajiye: ") + audioStorageCopy + "</span>",
      "</div>",
      '<div class="btn-row">',
      '<button class="secondary-btn" type="button" data-action="open-download-center">' + ha("Bude download audio") + "</button>",
      '<button class="ghost-btn" type="button" data-action="delete-completed-audio">' + ha("Goge audio na modules da aka gama") + "</button>",
      "</div>",
      '<div class="settings-section">',
      "<h3>" + ha("Bayanan amfani") + "</h3>",
      '<label class="settings-toggle"><input type="checkbox" name="analyticsConsent"' +
        (analyticsConsent ? " checked" : "") +
        ' /> <span>' + ha("Na amince a tura bayanan amfani marasa suna domin inganta AJAMIX.") + "</span></label>",
      '<p class="muted">' + ha("Idan ka kunna wannan, AJAMIX za ta tura rubutattun events marasa suna zuwa backend. Idan ka kashe, komai zai tsaya a wannan na'ura.") + "</p>",
      renderBilingualMessage(
        {
          ha: "Fitarwa: bayanan amfani",
          ajami: "",
        },
        "settings-bilingual-label"
      ),
      '<div class="btn-row">',
      '<button class="ghost-btn" type="button" data-action="export-usage-events">' + ha("Fitarwa: bayanan amfani") + "</button>",
      "</div>",
      state.analytics.exportMessage
        ? '<p class="muted">' + ha(state.analytics.exportMessage) + "</p>"
        : "",
      analyticsConsent ? renderLocalKpiSection() : "",
      "</div>",
      sharingEnabled
        ? [
            '<div class="settings-section">',
            "<h3>" + ha("Raba App") + "</h3>",
            '<p class="muted">' + ha("Fitar da cikakken fayil din .ajamix tare da cached audio, ko ka fitar da karamin kunshin canjin abun ciki.") + "</p>",
            '<div class="share-actions">',
            '<button class="secondary-btn" type="button" data-action="export-ajamix-package"' +
              (state.fileTransfer.shareBusy ? " disabled" : "") +
              ">" + ha(state.fileTransfer.shareBusy ? "Ana shirya fayil..." : "Fitar da .ajamix") + "</button>",
            '<button class="ghost-btn" type="button" data-action="export-ajamix-delta"' +
              (state.fileTransfer.shareBusy ? " disabled" : "") +
              ">" + ha("Fitar da kunshin canjin abun ciki") + "</button>",
            "</div>",
            "</div>",
          ].join("")
        : "",
      "</article>",
      "</div>",
      '<div class="helper-row"><span class="pill">Bundle: ' +
        escapeHtml(state.settings.contentVersion || "sample-bundle") +
        '</span><span class="pill">IndexedDB stores: settings, modules, audioCache, progress, glossary</span></div>',
      state.confirmResetPending
        ? [
            '<div class="confirm-reset-panel">',
            '<p>' + ha("Ka tabbata kana so ka share duk ci gaban koyo a wannan na'ura? Ba za a iya maido ba.") + '</p>',
            '<div class="btn-row">',
            '<button class="btn btn-danger" type="button" data-action="confirm-reset-yes">' + ha("Ee, share") + '</button>',
            '<button class="ghost-btn" type="button" data-action="confirm-reset-no">' + ha("A'a, soke") + '</button>',
            '</div>',
            '</div>',
          ].join("")
        : '<button class="ghost-btn" type="button" data-action="reset-progress">' + ha("Share progress a wannan na'ura") + "</button>",
      "</section>",
    ].join("");
  }

  function renderLocalKpiSection() {
    var localKpis = state.analytics.localKpis;

    return [
      '<details class="settings-details analytics-details" open>',
      '<summary>' + ha("Bayanan amfanin ku") + "</summary>",
      '<p class="helper-text">' + ha("Wadannan KPI suna fitowa daga events da ke cikin na'urar ka kawai.") + "</p>",
      state.analytics.localKpisLoading
        ? '<p class="muted">' + ha("Ana lissafa KPI...") + "</p>"
        : localKpis
          ? [
              '<div class="metrics-grid analytics-kpi-grid">',
              renderAnalyticsMetricCard(ha("Rana 2"), localKpis.day2Retention ? ha("Ee") : ha("A'a"), ha("Riƙewa bayan rana 2")),
              renderAnalyticsMetricCard(ha("Rana 7"), localKpis.day7Retention ? ha("Ee") : ha("A'a"), ha("Riƙewa bayan rana 7")),
              renderAnalyticsMetricCard(ha("Module na 2"), localKpis.secondModuleStarted ? ha("Ee") : ha("A'a"), ha("An fara module na biyu")),
              renderAnalyticsMetricCard(ha("Modules"), escapeHtml(String(localKpis.avgModulesCompleted || 0)), ha("Jimillar modules da aka gama")),
              renderAnalyticsMetricCard(ha("Kammalawa"), escapeHtml(formatPercent(localKpis.completionRate)), ha("Modules da aka gama / aka fara")),
              renderAnalyticsMetricCard(ha("Abin yau"), escapeHtml(formatPercent(localKpis.useTodayYesRate)), ha("Eh / (Eh + Wata rana)")),
              renderAnalyticsMetricCard(ha("Raba"), escapeHtml(formatPercent(localKpis.shareInitiationRate)), ha("An taba fara raba AJAMIX")),
              "</div>",
            ].join("")
          : '<p class="muted">' + ha("Babu isassun events tukuna domin a nuna KPI.") + "</p>",
      "</details>",
    ].join("");
  }

  function renderAnalyticsMetricCard(title, valueMarkup, helperCopy) {
    return [
      '<article class="metric-panel analytics-kpi-card">',
      '<span>' + title + "</span>",
      "<strong>" + valueMarkup + "</strong>",
      '<span class="muted-copy">' + helperCopy + "</span>",
      "</article>",
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

    if (!module.audioFile) {
      session.audioStatus = "missing";
      session.audioReady = false;
      session.audioError = null;
      syncLessonUi();
      return;
    }

    if (!audio.getAttribute("src")) {
      var source = await resolveLessonAudioSource(module);

      if (!state.lessonSession || state.lessonSession.moduleId !== module.id) {
        if (source.objectUrl) {
          URL.revokeObjectURL(source.objectUrl);
        }
        return;
      }

      state.lessonSession.audioStatus = source.status || "ready";

      if (!source.url) {
        state.lessonSession.audioReady = false;
        state.lessonSession.audioError = null;
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
        syncLessonUi();
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
    session.audioStatus = "ready";
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

  function getLessonAudioComingSoonMessage() {
    return "Ba a samu fayil din audio ba tukuna. Sauti yana zuwa, kuma player din zai bayyana a nan da zarar an saka MP3 dinsa.";
  }

  function isLessonAudioMissing(module, session) {
    return Boolean(!module || !module.audioFile || (session && session.audioStatus === "missing"));
  }

  function renderLessonAudioComingSoonBanner() {
    return [
      '<div class="lesson-audio-coming-soon-body">',
      '<span class="lesson-audio-coming-soon-icon" aria-hidden="true">♪</span>',
      '<div class="lesson-audio-coming-soon-copy">',
      '<strong class="lesson-audio-coming-soon-title">' + ha("Sauti yana zuwa") + "</strong>",
      '<p class="lesson-audio-coming-soon-text">' + ha(getLessonAudioComingSoonMessage()) + "</p>",
      "</div>",
      "</div>",
    ].join("");
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
      [module.titleHa, module.titleAjami, module.textExplanationHa, module.textExplanationAjami || ""].join(" ")
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

  function renderTrackSelectScreen() {
    var adSlot = renderAdSlot();
    var currentTrack = state.settings.trackPreference;
    return [
      adSlot,
      '<section class="screen-panel">',
      state.settings.onboarded
        ? '<button class="ghost-btn" type="button" data-route="#/settings">' + ha("← Koma Saiti") + "</button>"
        : "",
      '<p class="eyebrow">' + ha("Zabi Hanya") + "</p>",
      "<h2>" + ha("Wacce hanya kake son bi?") + "</h2>",
      '<p class="muted">' + ha("Za ka iya canja hanya a kowane lokaci daga Hanyar koyo ko Saiti.") + "</p>",
      '<div class="track-select-options">',
      '<button class="ob-choice' + (currentTrack === "vocational" ? " ob-choice--active" : "") + '" type="button" data-action="track-set-vocational">',
      '<span class="ob-choice-title">' + ha("Hanyar Kasuwanci") + "</span>",
      '<span class="ob-choice-sub">' + ha("Darussan kasuwanci da rayuwa — taxi, insurance, WhatsApp, da sauransu") + "</span>",
      "</button>",
      '<button class="ob-choice' + (currentTrack === "formal" ? " ob-choice--active" : "") + '" type="button" data-action="track-set-formal">',
      '<span class="ob-choice-title">' + ha("Hanyar Makaranta") + "</span>",
      '<span class="ob-choice-sub">' + ha("Tsarin karatu na makaranta — lissafi, karatu, da sauransu") + "</span>",
      "</button>",
      "</div>",
      "</section>",
    ].join("");
  }

  function renderPrivacyGateScreen() {
    var secondsRemaining = getPrivacyLockoutSecondsRemaining();
    var isLockedOut = secondsRemaining > 0;

    return [
      '<section class="screen-panel onboarding-screen">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Buɗe AJAMIX") + "</p>",
      "<h2>" + ha("Shigar da PIN na sirri") + "</h2>",
      '<p class="screen-copy">' +
        (isLockedOut
          ? ha("An kulle app na ɗan lokaci. Jira kaɗan sannan ka sake gwadawa.")
          : ha("Shigar da PIN mai lambobi 4 domin ci gaba.")) +
        "</p>",
      "</div>",
      '<form class="ob-field" data-privacy-gate-form>',
      '<label class="ob-label" for="privacy-gate-input">' + ha("PIN mai lambobi 4") + "</label>",
      '<input class="text-input" id="privacy-gate-input" name="privacyPin" type="password" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="current-password"' + (isLockedOut ? " disabled" : "") + ' placeholder="' + ha("Misali: 1234") + '" />',
      state.privacyGate.message
        ? '<p class="muted">' + ha(state.privacyGate.message) + "</p>"
        : "",
      isLockedOut
        ? '<p class="muted">' + ha("Sauran lokaci: ") + escapeHtml(String(secondsRemaining)) + ha(" sakan") + "</p>"
        : "",
      '<div class="ob-nav ob-nav--end">',
      '<button class="btn" type="submit"' + (isLockedOut ? " disabled" : "") + ">" + ha("Buɗe app") + "</button>",
      "</div>",
      "</form>",
      "</section>",
    ].join("");
  }

  function renderGlobalOverlay() {
    if (state.fileTransfer.importSheetOpen) {
      return renderImportSheetOverlay();
    }

    if (state.fileTransfer.shareNotice) {
      return renderShareNoticeSheet();
    }

    if (state.referral.modalOpen) {
      return renderReferralModal();
    }

    return renderRetentionSheetOverlay();
  }

  function renderImportSheetOverlay() {
    return [
      '<div class="retention-overlay">',
      '<section class="retention-sheet share-sheet" role="dialog" aria-modal="true" aria-labelledby="import-sheet-title">',
      '<p class="eyebrow">' + ha("Karbar fayil") + "</p>",
      '<h3 id="import-sheet-title">' + ha("Shigo da fayil din .ajamix") + "</h3>",
      '<p class="helper-text">' + ha("Zabi fayil din da aka raba maka domin a loda sabon abun ciki a cikin AJAMIX.") + "</p>",
      state.fileTransfer.importPendingHandle
        ? '<p class="muted">' + ha("Chrome ya riga ya mika wani fayil. Za ka iya shigo da shi kai tsaye ko ka zabi wani daban.") + "</p>"
        : "",
      state.fileTransfer.importMessage
        ? '<div class="share-status is-' +
          escapeAttribute(state.fileTransfer.importMessage.kind || "info") +
          '">' +
          renderBilingualMessage(state.fileTransfer.importMessage, "share-status-copy") +
          "</div>"
        : "",
      '<form class="ob-field share-import-form" data-import-package-form>',
      '<label class="ob-label" for="import-package-input">' + ha("Fayil din .ajamix") + "</label>",
      '<input class="text-input share-file-input" id="import-package-input" name="importPackage" type="file" accept=".ajamix,application/zip" />',
      '<div class="btn-row">',
      '<button class="btn" type="submit"' + (state.fileTransfer.importBusy ? " disabled" : "") + ">" +
        ha(state.fileTransfer.importBusy ? "Ana karbowa..." : "Shigo da fayil") +
        "</button>",
      '<button class="ghost-btn" type="button" data-action="dismiss-import-sheet"' + (state.fileTransfer.importBusy ? " disabled" : "") + ">" +
        ha("Rufe") +
        "</button>",
      "</div>",
      "</form>",
      "</section>",
      "</div>",
    ].join("");
  }

  function renderShareNoticeSheet() {
    var notice = state.fileTransfer.shareNotice;
    var isError = notice && notice.status === "error";

    if (!notice) {
      return "";
    }

    return [
      '<div class="retention-overlay">',
      '<section class="retention-sheet share-sheet" role="dialog" aria-modal="true" aria-labelledby="share-notice-title">',
      '<p class="eyebrow">' + ha("Raba App") + "</p>",
      '<h3 id="share-notice-title">' +
        ha(
          isError
            ? "An kasa fitar da fayil"
            : notice.exportType === "delta"
              ? "An adana kunshin canjin abun ciki"
              : "An adana fayil din .ajamix"
        ) +
        "</h3>",
      notice.fileName
        ? '<p class="share-file-name lamba-ltr">' + escapeHtml(notice.fileName) + "</p>"
        : "",
      isError
        ? renderBilingualMessage(
            notice.message || { ha: "An samu matsala wajen fitar da fayil din.", ajami: "" },
            "share-status-copy"
          )
        : notice.exportType === "delta"
          ? renderBilingualMessage(
              {
                ha: "An adana kunshin canjin abun ciki. Wannan fayil yana dauke da content.json da share-manifest.json kawai.",
                ajami: "",
              },
              "share-status-copy"
            )
          : renderExportGuidanceMessage(),
      '<div class="btn-row">',
      !isError && notice.exportType === "package"
        ? '<a class="secondary-btn share-link-btn" href="' +
          escapeAttribute(PRODUCTION_URL) +
          '" target="_blank" rel="noopener noreferrer">' +
          ha("Bude shafin AJAMIX") +
          "</a>"
        : "",
      '<button class="ghost-btn" type="button" data-action="dismiss-share-notice">' + ha("Na gani") + "</button>",
      "</div>",
      "</section>",
      "</div>",
    ].join("");
  }

  function renderReferralModal() {
    var badgeState = normalizeReferralBadgeState(state.settings.referralBadgeState);
    var canShareNatively = canUseNativeShare();
    var fallbackVisible = Boolean(state.referral.fallbackVisible);
    var source = state.referral.source || "unlock";

    return [
      '<div class="retention-overlay referral-overlay">',
      '<section class="retention-sheet referral-modal" role="dialog" aria-modal="true" aria-labelledby="referral-modal-title">',
      '<button class="ghost-btn referral-close-btn" type="button" data-action="dismiss-referral-modal" aria-label="' + escapeAttribute(getLocalizedPlainText("Rufe")) + '">' + ha("× Rufe") + "</button>",
      '<div class="referral-modal-body">',
      renderReferralBadgeGraphic("referral-badge-hero"),
      '<p class="eyebrow">' + ha("Kawowa Daya") + "</p>",
      '<h2 id="referral-modal-title">' + ha("Kawowa Daya — Mai Yada Ilimi") + "</h2>",
      renderBilingualMessage(
        {
          ha: "Ka kammala modules biyar. Ka taimaka wani ya shiga AJAMIX domin ilimi ya kara yaduwa.",
          ajami: "",
        },
        "referral-copy"
      ),
      state.referral.moduleCount
        ? '<p class="helper-text">' + ha("Modules da aka kammala: ") + escapeHtml(String(state.referral.moduleCount)) + "</p>"
        : "",
      state.referral.message
        ? '<div class="share-status is-' + escapeAttribute(state.referral.message.kind || "info") + '">' +
          renderBilingualMessage(state.referral.message, "share-status-copy") +
          "</div>"
        : "",
      !fallbackVisible
        ? '<div class="btn-row referral-modal-actions">' +
          '<button class="btn" type="button" data-action="referral-share" data-source="' + escapeAttribute(source) + '"' +
          (state.referral.busy ? " disabled" : "") +
          ">" + ha("Raba Ajamix") + "</button>" +
          "</div>"
        : renderReferralFallbackActions(source, badgeState),
      '</div>',
      "</section>",
      "</div>",
    ].join("");
  }

  function renderReferralFallbackActions(source, badgeState) {
    return [
      '<div class="referral-fallback-card">',
      '<div class="gap-teaser-card-head">',
      '<span class="gap-teaser-icon" aria-hidden="true">↗</span>',
      '<div class="screen-stack">',
      '<strong>' + ha("Raba ta hanya biyu") + "</strong>",
      '<p class="gap-teaser-copy">' + ha("Kwafi hanyar sakin ko ka fitar da fayil din .ajamix domin a aika ta Bluetooth ko sauran hanyoyin kusa.") + "</p>",
      "</div>",
      "</div>",
      '<div class="btn-row referral-modal-actions">',
      '<button class="secondary-btn" type="button" data-action="referral-copy-link" data-source="' + escapeAttribute(source) + '"' +
        (state.referral.busy ? " disabled" : "") +
        ">" + ha("Kwafi hanyar sakin") + "</button>",
      '<button class="ghost-btn" type="button" data-action="referral-export-ajamix" data-source="' + escapeAttribute(source) + '"' +
        (state.referral.busy ? " disabled" : "") +
        ">" + ha("Fitar da .ajamix") + "</button>",
      "</div>",
      badgeState === "unlocked"
        ? '<p class="helper-text">' + ha("Idan ka rufe yanzu, badgen zai ci gaba da bayyana a shafin ci gaba domin ka iya raba daga baya.") + "</p>"
        : "",
      "</div>",
    ].join("");
  }

  function renderExportGuidanceMessage() {
    var intro = "Fayil din .ajamix an adana. Mai karba ya fara bude Chrome ya zuwa ";
    var outro = " kafin a bude wannan fayil din.";

    return [
      '<div class="bilingual-copy share-guidance-copy">',
      '<p class="bilingual-copy-ha">' +
        escapeHtml(intro) +
        '<a class="share-production-link lamba-ltr" href="' +
        escapeAttribute(PRODUCTION_URL) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(PRODUCTION_URL) +
        "</a>" +
        escapeHtml(outro) +
        "</p>",
      state.settings.scriptMode === "ajami"
        ? '<p class="bilingual-copy-ajami ajami">' +
          formatAjamiText(romanToAjami(intro)) +
          '<span class="share-production-link lamba-ltr">' +
          escapeHtml(PRODUCTION_URL) +
          "</span>" +
          formatAjamiText(romanToAjami(outro)) +
          "</p>"
        : "",
      "</div>",
    ].join("");
  }

  function renderRetentionSheetOverlay() {
    if (state.retention.useTodaySheet) {
      return renderUseTodaySheet();
    }

    if (state.retention.activeTomorrowCheck) {
      return renderTomorrowCheckSheet();
    }

    return "";
  }

  function renderUseTodaySheet() {
    var sheet = state.retention.useTodaySheet;
    var module = sheet ? getModuleById(sheet.moduleId) : null;
    var prompt = getLocalizedPair(module && module.useTodayPrompt ? module.useTodayPrompt : null, "Me za ka gwada yau?");

    if (!sheet || !module) {
      return "";
    }

    return [
      '<div class="retention-overlay">',
      '<section class="retention-sheet" role="dialog" aria-modal="true" aria-labelledby="use-today-title">',
      '<p class="eyebrow">' + ha("Abin yau") + "</p>",
      '<h3 id="use-today-title">' + renderLocalizedInline(prompt, "retention-sheet-title") + "</h3>",
      '<p class="helper-text">' + ha("Zaɓi ɗaya ko ka rubuta naka domin manhajar ta tuna maka gobe.") + "</p>",
      '<div class="btn-row">',
      '<button class="btn" type="button" data-action="use-today-yes" data-module-id="' +
        escapeAttribute(module.id) +
        '">' + ha("Zan yi amfani da shi yau") + "</button>",
      '<button class="secondary-btn" type="button" data-action="use-today-deferred" data-module-id="' +
        escapeAttribute(module.id) +
        '">' + ha("Wata rana") + "</button>",
      "</div>",
      '<form class="ob-field retention-note-form" data-use-today-note-form data-module-id="' +
        escapeAttribute(module.id) +
        '">',
      '<label class="ob-label" for="use-today-note-input">' + ha("Ko ka rubuta abin da za ka gwada") + "</label>",
      '<textarea class="text-input retention-note-input" id="use-today-note-input" name="useTodayNote" rows="3" placeholder="' +
        escapeAttribute(getLocalizedPlainText("Misali: Zan rubuta kudin shiga na yau kafin dare")) +
        '"></textarea>',
      sheet.message
        ? '<p class="muted">' + ha(sheet.message) + "</p>"
        : "",
      '<button class="ghost-btn" type="submit">' + ha("Ajiye bayanin ka") + "</button>",
      "</form>",
      "</section>",
      "</div>",
    ].join("");
  }

  function renderTomorrowCheckSheet() {
    var activeCheck = state.retention.activeTomorrowCheck;
    var module = activeCheck ? getModuleById(activeCheck.moduleId) : null;

    if (!activeCheck || !module) {
      return "";
    }

    if (activeCheck.stage === "result") {
      return renderTomorrowCheckResultSheet(activeCheck, module);
    }

    return [
      '<div class="retention-overlay">',
      '<section class="retention-sheet" role="dialog" aria-modal="true" aria-labelledby="tomorrow-check-title">',
      '<p class="eyebrow">' + ha("Duba gobe") + "</p>",
      '<h3 id="tomorrow-check-title">' +
        ha("A jiya, kun ce za ku yi amfani da ") +
        renderLocalizedInline(getModuleTitlePair(module), "retention-inline-title") +
        ha(". Shin kun yi amfani da shi?") +
        "</h3>",
      '<div class="btn-row">',
      '<button class="btn" type="button" data-action="tomorrow-check-yes">' + ha("Haka") + "</button>",
      '<button class="secondary-btn" type="button" data-action="tomorrow-check-no">' + ha("Ba haka") + "</button>",
      "</div>",
      "</section>",
      "</div>",
    ].join("");
  }

  function renderTomorrowCheckResultSheet(activeCheck, module) {
    var continueLabel = state.retention.tomorrowQueue.length ? "Na gaba" : "Ci gaba";

    if (activeCheck.answer === "yes" && activeCheck.proverb) {
      return [
        '<div class="retention-overlay">',
        '<section class="retention-sheet" role="dialog" aria-modal="true" aria-labelledby="tomorrow-check-result-title">',
        '<p class="eyebrow">' + ha("Madalla") + "</p>",
        '<h3 id="tomorrow-check-result-title">' + ha("An buɗe karin magana ta Ajami") + "</h3>",
        '<div class="retention-reward-card">',
        '<span class="status-badge is-complete">' + ha("An buɗe") + "</span>",
        '<p class="retention-reward-text">' + renderLocalizedInline(activeCheck.proverb, "retention-proverb") + "</p>",
        '<p class="helper-text">' +
          ha("Saboda ka yi amfani da ") +
          renderLocalizedInline(getModuleTitlePair(module), "retention-inline-title") +
          ha(", ka samu sabon karin magana.") +
          "</p>",
        "</div>",
        '<button class="btn" type="button" data-action="tomorrow-check-continue">' + ha(continueLabel) + "</button>",
        "</section>",
        "</div>",
      ].join("");
    }

    return [
      '<div class="retention-overlay">',
      '<section class="retention-sheet" role="dialog" aria-modal="true" aria-labelledby="tomorrow-check-result-title">',
      '<p class="eyebrow">' + ha("Karamin tunatarwa") + "</p>",
      '<h3 id="tomorrow-check-result-title">' + ha("Ka sake gwadawa da wannan kalma") + "</h3>",
      '<div class="retention-tip-card">',
      '<span class="status-badge is-active">' + renderLocalizedInline(activeCheck.tip.term) + "</span>",
      '<p class="retention-tip-copy">' + renderLocalizedInline(activeCheck.tip.definition, "retention-tip-text") + "</p>",
      "</div>",
      '<button class="btn" type="button" data-action="tomorrow-check-continue">' + ha(continueLabel) + "</button>",
      "</section>",
      "</div>",
    ].join("");
  }

  function getTrackLabel(trackPreference) {
    if (trackPreference === "vocational") {
      return "Hanyar Kasuwanci";
    }

    if (trackPreference === "formal") {
      return "Hanyar Makaranta";
    }

    return "Dukkan Hanyoyi";
  }

  function hasLocalizedCopy(copy) {
    return Boolean(
      copy &&
      typeof copy === "object" &&
      (String(copy.ha || "").trim() || String(copy.ajami || "").trim())
    );
  }

  function getLessonBodyText(module) {
    if (!module) {
      return "";
    }

    if (state.settings.scriptMode === "ajami") {
      return module.textExplanationAjami || romanToAjami(module.textExplanationHa || "");
    }

    return module.textExplanationHa || "";
  }

  function formatLessonBodyText(text) {
    return state.settings.scriptMode === "ajami"
      ? formatAjamiText(text)
      : escapeHtml(text);
  }

  function splitLessonBodyAtRatio(text, ratio) {
    var copy = String(text || "").trim();
    if (!copy) {
      return { before: "", after: "" };
    }

    var targetLength = Math.max(1, Math.floor(copy.length * Math.max(0, Math.min(1, Number(ratio || 0.6)))));
    var sentences = copy.match(/[^.!?؟]+[.!?؟]*/g);

    if (sentences && sentences.length > 1) {
      var combined = "";

      for (var index = 0; index < sentences.length; index += 1) {
        combined += sentences[index];
        if (combined.trim().length >= targetLength) {
          return {
            before: combined.trim(),
            after: sentences.slice(index + 1).join("").trim(),
          };
        }
      }
    }

    var splitIndex = copy.indexOf(" ", targetLength);
    if (splitIndex === -1) {
      splitIndex = copy.lastIndexOf(" ", targetLength);
    }

    if (splitIndex === -1) {
      return { before: copy, after: "" };
    }

    return {
      before: copy.slice(0, splitIndex).trim(),
      after: copy.slice(splitIndex + 1).trim(),
    };
  }

  function renderInlineGapTeaserCallout(module) {
    if (!module || !hasLocalizedCopy(module.gapTeaserInline)) {
      return "";
    }

    return [
      '<div class="gap-teaser-inline-card">',
      '<div class="gap-teaser-card-head">',
      '<span class="gap-teaser-icon" aria-hidden="true">!</span>',
      '<div class="screen-stack">',
      '<p class="gap-teaser-inline-label">' + ha("Abin da Ba ku Sani ba Tukuna") + "</p>",
      '<p class="gap-teaser-inline-copy">' + renderLocalizedInline(module.gapTeaserInline, "gap-teaser-inline-copy") + "</p>",
      "</div>",
      "</div>",
      "</div>",
    ].join("");
  }

  function renderLessonBodyCopy(module) {
    var bodyText = getLessonBodyText(module);

    if (!bodyText) {
      return "<p></p>";
    }

    if (!hasLocalizedCopy(module && module.gapTeaserInline)) {
      return "<p>" + formatLessonBodyText(bodyText) + "</p>";
    }

    var segments = splitLessonBodyAtRatio(bodyText, 0.6);

    return [
      segments.before ? "<p>" + formatLessonBodyText(segments.before) + "</p>" : "",
      renderInlineGapTeaserCallout(module),
      segments.after ? "<p>" + formatLessonBodyText(segments.after) + "</p>" : "",
    ].join("");
  }

  function renderGapTeaserCard(module) {
    if (!module || !hasLocalizedCopy(module.gapTeaser)) {
      return "";
    }

    return [
      '<section class="gap-teaser-card">',
      '<div class="gap-teaser-card-head">',
      '<span class="gap-teaser-icon" aria-hidden="true">!</span>',
      '<div class="screen-stack">',
      '<p class="eyebrow">' + ha("Matsalar da ke gaba") + "</p>",
      '<p class="gap-teaser-lead">' +
        ha("Kun koyi yadda ake ") +
        renderLocalizedInline(getModuleTitlePair(module), "gap-teaser-title") +
        ha(". Amma wata matsala ta gaba ita ce:") +
        "</p>",
      "</div>",
      "</div>",
      '<div class="gap-teaser-copy">' + renderLocalizedInline(module.gapTeaser, "gap-teaser-copy") + "</div>",
      "</section>",
    ].join("");
  }

  function renderChainCompletionBanner(module) {
    if (!module || module.isChainLeaf !== true) {
      return "";
    }

    return [
      '<section class="completion-banner">',
      '<div class="gap-teaser-card-head">',
      '<span class="gap-teaser-icon gap-teaser-icon--success" aria-hidden="true">✓</span>',
      '<div class="screen-stack">',
      '<p class="eyebrow">' + ha("An kammala sarkar") + "</p>",
      '<p class="completion-banner-copy">' +
        ha("Kun kammala sarkar ") +
        ha(getTrackLabel(module.track)) +
        ha("! Sai a kara koyi.") +
        "</p>",
      "</div>",
      "</div>",
      "</section>",
    ].join("");
  }

  function renderEndOfModuleBridge(module) {
    if (!module) {
      return "";
    }

    if (module.isChainLeaf === true) {
      return renderChainCompletionBanner(module);
    }

    return renderGapTeaserCard(module);
  }

  function getAlternateTrackPreference(trackPreference) {
    if (trackPreference === "vocational") {
      return "formal";
    }

    if (trackPreference === "formal") {
      return "vocational";
    }

    return null;
  }

  function renderTrackSwitchControls() {
    var currentTrack = state.settings.trackPreference;
    var alternateTrack = getAlternateTrackPreference(currentTrack);

    if (!alternateTrack) {
      return "";
    }

    return [
      '<div class="helper-row"><span class="pill">' + ha("Hanya yanzu: ") + ha(getTrackLabel(currentTrack)) + "</span></div>",
      '<div class="btn-row"><button class="ghost-btn" type="button" data-action="track-set-' + escapeAttribute(alternateTrack) + '">' +
        ha("Wuce zuwa " + getTrackLabel(alternateTrack)) +
        "</button></div>",
    ].join("");
  }

  function renderHomeScreen() {
    var adSlot = renderAdSlot();
    var learningPath = buildLearningPath();
    var trackSwitchControls = renderTrackSwitchControls();
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
        adSlot,
        caregiverEntryMarkup,
        '<section class="screen-panel">',
        '<p class="eyebrow">' + ha("Hanyar koyo") + "</p>",
        "<h2>" + ha("Babu darussa a wannan hanyar yanzu.") + "</h2>",
        "<p>" + ha("Canza hanya ko grade band daga Settings domin ganin karin modules.") + "</p>",
        trackSwitchControls,
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
      adSlot,
      caregiverEntryMarkup,
      '<section class="screen-panel path-overview">',
      '<div class="screen-heading">',
      '<p class="eyebrow">' + ha("Hanyar koyo") + "</p>",
      "<h2>" + escapeHtml(getGradeBandLabel(state.settings.gradeBand)) + " — " + ha("Hanyar koyo") + "</h2>",
      '<p class="screen-copy">' + ha("Modules suna bude daya bayan daya. Ka ci quiz da aƙalla 3/5 domin bude darasi na gaba.") + "</p>",
      "</div>",
      trackSwitchControls,
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
    var audioMissing = isLessonAudioMissing(module, session);
    var canQuiz = module ? canStartQuiz(module.id) : false;
    var quizReadyText = audioMissing
      ? "Sauti yana zuwa. Za ka samu player da quiz din da zarar an saka MP3 dinsa."
      : canQuiz
        ? "Ka saurara isasshe. Yanzu za ka iya shiga quiz."
        : "Sai ka saurara aƙalla 80% na audio kafin quiz ya bude.";

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
      '<audio class="lesson-audio-element" data-lesson-audio preload="metadata"' + (audioMissing ? " hidden" : "") + "></audio>",
      '<div class="lesson-player-stack" data-lesson-player-ui' + (audioMissing ? " hidden" : "") + ">",
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
      "</div>",
      '<div class="lesson-audio-coming-soon" data-audio-coming-soon' + (audioMissing ? "" : " hidden") + ">" +
        renderLessonAudioComingSoonBanner() +
        "</div>",
      '<div class="micro-pause-overlay" data-micro-pause-overlay></div>',
      "</section>",
      '<section class="screen-panel lesson-text-panel">',
      '<p class="eyebrow">' + ha("Bayanin Hausa") + "</p>",
      '<div class="lesson-copy scrollable-copy">' + renderLessonBodyCopy(module) + "</div>",
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
        ha(quizReadyText) +
        "</p>",
      "</section>",
      module.microPauses && module.microPauses.length && countAnsweredMicroPauses(record) > 0
        ? [
            '<section class="screen-panel lesson-micropause-summary">',
            '<p class="eyebrow">' + ha("Tsayawar fahimta") + "</p>",
            '<ul class="micro-pause-list">' + renderLessonMicroPauseSummary(module, record, session) + "</ul>",
            "</section>",
          ].join("")
        : "",
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

    if (
      !audio ||
      !state.lessonSession ||
      state.lessonSession.audioStatus === "missing" ||
      !state.lessonSession.audioSource ||
      state.lessonSession.activePauseIndex !== null
    ) {
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
      audioStatus: module && module.audioFile ? "unknown" : "missing",
      audioSource: module ? module.audioFile : "",
      objectUrl: null,
      selectedGlossaryTermKey: null,
      lastDbWriteTime: 0,
    };
  }

  async function resolveLessonAudioSource(module) {
    if (!module || !module.audioFile) {
      return {
        url: "",
        objectUrl: null,
        status: "missing",
      };
    }

    if (state.lessonSession && state.lessonSession.moduleId === module.id && state.lessonSession.objectUrl) {
      return {
        url: state.lessonSession.objectUrl,
        objectUrl: state.lessonSession.objectUrl,
        status: "ready",
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
      return { url: objectUrl, objectUrl: objectUrl, status: "ready" };
    }

    try {
      var headResponse = await fetch(module.audioFile, {
        method: "HEAD",
        cache: "no-store",
      });

      if (headResponse.status === 404) {
        return {
          url: "",
          objectUrl: null,
          status: "missing",
        };
      }
    } catch (error) {
      console.warn("Could not verify lesson audio file:", module.audioFile, error);
    }

    return {
      url: module.audioFile,
      objectUrl: null,
      status: "ready",
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
    var DB_WRITE_THROTTLE_MS = 5000;
    var nowMs = Date.now();
    var shouldWriteDb = (
      (session.listenedPct !== session.lastPersistedPct || currentWholeSecond !== session.lastPersistedSec) &&
      (nowMs - (session.lastDbWriteTime || 0) >= DB_WRITE_THROTTLE_MS)
    );
    if (shouldWriteDb) {
      session.lastPersistedPct = session.listenedPct;
      session.lastPersistedSec = currentWholeSecond;
      session.lastDbWriteTime = nowMs;
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
    var playerUi = document.querySelector("[data-lesson-player-ui]");
    var comingSoon = document.querySelector("[data-audio-coming-soon]");
    var overlay = document.querySelector("[data-micro-pause-overlay]");
    var resumeButton = document.querySelector("[data-resume-button]");
    var playIcon = document.querySelector("[data-play-icon]");
    var playLabel = document.querySelector("[data-play-label]");
    var quizButton = document.querySelector(".lesson-quiz-button");
    var quizNote = document.querySelector("[data-quiz-ready-note]");
    var audioMissing = isLessonAudioMissing(module, session);
    var isPaused = !audio || audio.paused;
    var canQuiz = canStartQuiz(module.id);

    if (audio) {
      audio.hidden = audioMissing;
      if (audioMissing && audio.getAttribute("src")) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
    }

    if (playerUi) {
      playerUi.hidden = audioMissing;
    }

    if (comingSoon) {
      comingSoon.hidden = !audioMissing;
      if (audioMissing) {
        comingSoon.innerHTML = renderLessonAudioComingSoonBanner();
      }
    }

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

    if (notice && !audioMissing) {
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
      quizNote.innerHTML = audioMissing
        ? ha("Sauti yana zuwa. Za ka samu player da quiz din da zarar an saka MP3 dinsa.")
        : canQuiz
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
    var activeTrack = typeof state.settings.trackPreference === "string"
      ? state.settings.trackPreference.toLowerCase()
      : "";

    return state.modules
      .filter(function (module) {
        var moduleTrack = typeof module.track === "string"
          ? module.track.toLowerCase()
          : "";

        // Wrong track: always exclude
        if (activeTrack && moduleTrack && moduleTrack !== activeTrack) {
          return false;
        }

        // Vocational track: no gradeBand filter — vocational modules span all grade levels
        if (activeTrack === "vocational") {
          return moduleTrack === "vocational";
        }

        // Formal track or no track set: apply gradeBand filter
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
    return normalizeProgressRecord(
      state.progress.find(function (record) {
        return record.id === moduleId;
      }) || {
        id: moduleId,
        moduleId: moduleId,
      }
    );
  }

  async function completeOnboarding() {
    var chosenBand = ALLOWED_GRADE_BANDS.indexOf(onboardingData.gradeBand) >= 0
      ? onboardingData.gradeBand
      : (state.settings.gradeBand || "nursery1");
    var chosenTrack = normalizeTrackPreference(onboardingData.trackPreference || state.settings.trackPreference) || "formal";
    var isFirstOnboarding = !state.settings.onboarded;
    var nextFeatureFlags = normalizeFeatureFlags(state.settings.featureFlags);

    if (isFirstOnboarding) {
      nextFeatureFlags.useTodayLoop = true;
    }

    await saveSettings({
      onboarded: true,
      gradeBand: chosenBand,
      displayName: onboardingData.displayName || state.settings.displayName || "Dalibi",
      learnerType: onboardingData.learnerType || state.settings.learnerType || "child",
      scriptMode: "latin",
      trackPreference: chosenTrack,
      featureFlags: nextFeatureFlags,
      audioDownloadPromptSeen: isFirstOnboarding ? false : state.settings.audioDownloadPromptSeen,
      audioDownloadState: normalizeAudioDownloadState({
        gradeBand: chosenBand,
        totalFiles: 0,
        completedUrls: [],
        status: "pending",
        lastUpdatedAt: null,
      }),
    }, { render: false });
    onboardingStep = 1;
    onboardingData = createOnboardingData();
    state.onboardingPinMessage = "";
    await prepareDownloadSession(true);
    state.quizResults = null;
    navigate(isFirstOnboarding ? "#/download" : "#/learning-path");
  }

  async function saveSettings(patch, options) {
    var nextPatch = Object.assign({}, patch);

    if (Object.prototype.hasOwnProperty.call(nextPatch, "trackPreference")) {
      nextPatch.trackPreference = normalizeTrackPreference(nextPatch.trackPreference);
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "privacyMode")) {
      nextPatch.privacyMode = normalizePrivacyMode(nextPatch.privacyMode);
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "featureFlags")) {
      nextPatch.featureFlags = normalizeFeatureFlags(nextPatch.featureFlags);
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "analyticsConsent")) {
      nextPatch.analyticsConsent = normalizeAnalyticsConsent(nextPatch.analyticsConsent);
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "referralBadgeState")) {
      nextPatch.referralBadgeState = normalizeReferralBadgeState(nextPatch.referralBadgeState);
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "audioDownloadState")) {
      nextPatch.audioDownloadState = normalizeAudioDownloadState(nextPatch.audioDownloadState);
    }

    var entries = Object.entries(nextPatch);
    for (var index = 0; index < entries.length; index += 1) {
      await putRecord("settings", {
        key: entries[index][0],
        value: entries[index][1],
      });
    }

    state.settings = Object.assign({}, state.settings, nextPatch);
    state.settings.audioDownloadState = normalizeAudioDownloadState(state.settings.audioDownloadState);
    state.settings.privacyMode = normalizePrivacyMode(state.settings.privacyMode);
    state.settings.featureFlags = normalizeFeatureFlags(state.settings.featureFlags);
    state.settings.trackPreference = normalizeTrackPreference(state.settings.trackPreference);
    state.settings.analyticsConsent = normalizeAnalyticsConsent(state.settings.analyticsConsent);
    state.settings.referralBadgeState = normalizeReferralBadgeState(state.settings.referralBadgeState);

    if (Object.prototype.hasOwnProperty.call(nextPatch, "privacyMode")) {
      state.privacyGate.unlocked = true;
      state.privacyGate.failedAttempts = 0;
      state.privacyGate.lockoutUntil = 0;
      state.privacyGate.message = "";
      clearPrivacyGateTimer();
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "featureFlags") && !state.settings.featureFlags.useTodayLoop) {
      clearRetentionUi({ resetBootScan: true });
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "featureFlags") && !state.settings.featureFlags.referral) {
      closeReferralModal({ render: false });
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "analyticsConsent") && !state.settings.analyticsConsent) {
      state.analytics.localKpis = null;
      state.analytics.localKpisLoading = false;
    }

    if (Object.prototype.hasOwnProperty.call(nextPatch, "motionMode")) {
      applyMotionMode(state.settings.motionMode);
    }
    updateShellChrome();
    if (!options || options.render !== false) {
      render();
    }
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

    nextSettings.scriptMode = "latin";
    nextSettings.trackPreference = normalizeTrackPreference(nextSettings.trackPreference);
    nextSettings.privacyMode = normalizePrivacyMode(nextSettings.privacyMode);
    nextSettings.featureFlags = normalizeFeatureFlags(nextSettings.featureFlags);
    nextSettings.analyticsConsent = normalizeAnalyticsConsent(nextSettings.analyticsConsent);
    nextSettings.audioDownloadState = normalizeAudioDownloadState(nextSettings.audioDownloadState);
    nextSettings.referralBadgeState = normalizeReferralBadgeState(nextSettings.referralBadgeState);
    state.settings = nextSettings;
    state.streakData = normalizeStreakData(nextSettings.streakData);

    var storedScriptMode = records.find(function (r) { return r.key === "scriptMode"; });
    if (storedScriptMode && storedScriptMode.value !== "latin") {
      try {
        await putRecord("settings", { key: "scriptMode", value: "latin" });
      } catch (error) {
        logError(error);
      }
    }
  }

  async function loadProgress() {
    state.progress = (await getAllRecords("progress")).map(normalizeProgressRecord);
  }

  async function recordLessonOpen(moduleId) {
    var record = getProgressRecord(moduleId);
    await recordLearningActivity();
    await logEvent("module_started", {
      moduleId: moduleId,
    });
    await maybeLogSecondModuleStarted();
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
    var nextRecord = normalizeProgressRecord(Object.assign({}, currentRecord, patch, {
      id: moduleId,
      moduleId: moduleId,
    }));
    var transitionedToCompleted =
      nextRecord.status === "completed" &&
      currentRecord.status !== "completed";

    await putRecord("progress", nextRecord);
    if (transitionedToCompleted) {
      await recordModuleCompletedEvent(moduleId, patch && patch.authorityClass ? "quiz" : "manual");
    }
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
    var importedBundle = !loadOptions.forceNetwork ? getImportedContentBundle() : null;
    var cachedVersion = state.settings.contentVersion || "";
    var shouldUseNetwork = loadOptions.forceNetwork || !cachedModules.length || !cachedActivities.length
      || (cachedVersion !== CONTENT_VERSION);
    var bundleInfo = null;

    if (importedBundle) {
      applyBundleToState(importedBundle);
      try {
        await cacheContentBundle(importedBundle);
      } catch (error) {
        console.warn("Could not refresh imported content cache:", error);
      }
      return;
    }

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

    // Batch each store into a single transaction for performance
    await putAllRecords("modules", bundle.modules || []);
    await putAllRecords("activities", bundle.activities || []);
    await putAllRecords("glossary", normalizedGlossary);
  }

  function putAllRecords(storeName, records) {
    return new Promise(function (resolve, reject) {
      var transaction = state.db.transaction(storeName, "readwrite");
      var store = transaction.objectStore(storeName);
      store.clear();
      records.forEach(function (record) {
        store.put(record);
      });
      transaction.oncomplete = function () { resolve(); };
      transaction.onerror = function () {
        reject(transaction.error || new Error("Could not batch-write store " + storeName));
      };
      transaction.onabort = function () {
        reject(transaction.error || new Error("Batch write aborted for " + storeName));
      };
    });
  }

  async function checkForContentUpdate() {
    if (getImportedContentBundle()) {
      state.contentUpdateBanner = null;
      render();
      return;
    }

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

  function buildExportDateStamp() {
    var now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("");
  }

  async function hashTextToHex(text) {
    var buffer = await window.crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(String(text || ""))
    );
    var bytes = Array.from(new Uint8Array(buffer));
    return bytes
      .map(function (value) {
        return value.toString(16).padStart(2, "0");
      })
      .join("");
  }

  async function fetchExportTextAsset(urlPath) {
    var response = await fetch(urlPath);
    if (!response.ok) {
      throw new Error("Ba a samu fayil din app da ake bukata ba.");
    }

    return response.text();
  }

  async function buildShareManifest(contentText) {
    var parsedContent = JSON.parse(contentText || "{}");
    var contentHash = await hashTextToHex(contentText);

    return {
      exportedAt: new Date().toISOString(),
      schemaVersion: SHARE_SCHEMA_VERSION,
      moduleIds: Array.isArray(parsedContent.modules)
        ? parsedContent.modules
          .map(function (module) {
            return module && module.id ? module.id : null;
          })
          .filter(Boolean)
        : [],
      contentHash: contentHash.slice(0, 8),
    };
  }

  function getAudioExportPath(url, fallbackIndex) {
    var fileName = "audio-" + String(fallbackIndex + 1) + ".mp3";

    try {
      var parsedUrl = new URL(String(url || ""), window.location.origin + "/app/");
      var lastSegment = parsedUrl.pathname.split("/").pop();
      if (lastSegment) {
        fileName = decodeURIComponent(lastSegment);
      }
    } catch (error) {
      if (typeof url === "string" && url) {
        fileName = url.split("?")[0].split("/").pop() || fileName;
      }
    }

    return "app/audio/" + fileName;
  }

  function triggerBlobDownload(blob, fileName) {
    var objectUrl = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(objectUrl);
    }, 1000);
  }

  async function saveBlobWithFallback(blob, suggestedName, mimeType, extension) {
    if (typeof window.showSaveFilePicker === "function") {
      try {
        var accept = {};
        accept[mimeType] = [extension];

        var handle = await window.showSaveFilePicker({
          suggestedName: suggestedName,
          types: [
            {
              accept: accept,
            },
          ],
        });
        var writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return;
      } catch (error) {
        console.warn("Falling back to download link for export:", error);
      }
    }

    triggerBlobDownload(blob, suggestedName);
  }

  async function buildAjamixPackage() {
    if (!window.JSZip) {
      throw new Error("Ba a samu kayan hada ZIP ba tukuna. Sake bude app din ka gwada.");
    }

    var zip = new window.JSZip();
    var exportSources = [
      { zipPath: "app/index.html", fetchPath: "/app/index.html" },
      { zipPath: "app/styles.css", fetchPath: "/app/styles.css" },
      { zipPath: "app/app.js", fetchPath: "/app/app.js" },
      { zipPath: "app/quiz-engine.js", fetchPath: "/app/quiz-engine.js" },
      { zipPath: "app/manifest.json", fetchPath: "/app/manifest.json" },
      { zipPath: "app/sw.js", fetchPath: "/app/sw.js" },
      { zipPath: "app/ads.json", fetchPath: "/app/ads.json" },
      { zipPath: "app/content.json", fetchPath: "/app/content.json" },
    ];
    var exportedFiles = await Promise.all(
      exportSources.map(async function (source) {
        return {
          zipPath: source.zipPath,
          text: await fetchExportTextAsset(source.fetchPath),
        };
      })
    );
    var contentSource = exportedFiles.find(function (file) {
      return file.zipPath === "app/content.json";
    });
    var shareManifest = await buildShareManifest(contentSource ? contentSource.text : "{}");
    var cachedAudio = await getAllRecords("audioCache").catch(function () {
      return [];
    });

    exportedFiles.forEach(function (file) {
      zip.file(file.zipPath, file.text);
    });

    cachedAudio.forEach(function (record, index) {
      if (!record || !record.blob) {
        return;
      }

      zip.file(getAudioExportPath(record.url, index), record.blob);
    });

    zip.file("share-manifest.json", JSON.stringify(shareManifest, null, 2));

    var blob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    var fileName = "ajamix-" + buildExportDateStamp() + ".ajamix";

    await saveBlobWithFallback(blob, fileName, "application/zip", ".ajamix");
    return {
      fileName: fileName,
      shareManifest: shareManifest,
    };
  }

  async function buildAjamixDeltaPack() {
    var contentText = await fetchExportTextAsset("/app/content.json");
    var shareManifest = await buildShareManifest(contentText);
    var deltaPayload = {
      "share-manifest.json": shareManifest,
      "content.json": JSON.parse(contentText || "{}"),
    };
    var blob = new Blob([JSON.stringify(deltaPayload, null, 2)], {
      type: "application/json",
    });
    var fileName = "ajamix-delta-" + buildExportDateStamp() + ".json";

    await saveBlobWithFallback(blob, fileName, "application/json", ".json");
    return {
      fileName: fileName,
      shareManifest: shareManifest,
    };
  }

  async function copyTextToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return;
    }

    var fallbackInput = document.createElement("textarea");
    fallbackInput.value = text;
    fallbackInput.setAttribute("readonly", "readonly");
    fallbackInput.style.position = "fixed";
    fallbackInput.style.opacity = "0";
    fallbackInput.style.pointerEvents = "none";
    document.body.appendChild(fallbackInput);
    fallbackInput.focus();
    fallbackInput.select();

    var didCopy = document.execCommand && document.execCommand("copy");
    fallbackInput.remove();

    if (!didCopy) {
      throw new Error("An kasa kwafe hanyar sakin.");
    }
  }

  async function initiateReferralShare(options) {
    var shareOptions = Object.assign(
      {
        via: "native",
        closeModal: true,
        source: "unlock",
      },
      options || {}
    );
    var badgeState = normalizeReferralBadgeState(state.settings.referralBadgeState);
    var nextBadgeState = shareOptions.source === "unlock"
      ? "shared"
      : badgeState === "locked"
        ? "locked"
        : badgeState;
    var eventPayload = shareOptions.source === "progress-badge"
      ? {
          via: "progress-badge",
          method: shareOptions.via,
        }
      : {
          via: shareOptions.via,
        };

    if (nextBadgeState !== badgeState) {
      await saveSettings({ referralBadgeState: nextBadgeState }, { render: false });
    }

    await logEvent("share_initiated", eventPayload);

    if (shareOptions.closeModal) {
      closeReferralModal({ render: false });
    }
  }

  async function startReferralShareFlow(options) {
    var shareOptions = Object.assign({ source: "unlock" }, options || {});

    if (state.referral.busy) {
      return;
    }

    if (!canUseNativeShare()) {
      openReferralModal({
        source: shareOptions.source,
        moduleCount: state.referral.moduleCount,
        fallbackVisible: true,
        render: true,
      });
      return;
    }

    state.referral.busy = true;
    state.referral.message = null;
    render();

    try {
      await initiateReferralShare({
        via: "native",
        source: shareOptions.source,
        closeModal: true,
      });
      render();
      await navigator.share({
        title: "Ajamix — Koyi Ajami",
        text: getReferralShareText(),
        url: PRODUCTION_URL,
      });
    } catch (error) {
      if (error && error.name !== "AbortError") {
        console.warn("Referral native share failed:", error);
      }
    } finally {
      state.referral.busy = false;
      render();
    }
  }

  async function copyReferralLink(options) {
    var shareOptions = Object.assign({ source: "unlock" }, options || {});

    if (state.referral.busy) {
      return;
    }

    state.referral.busy = true;
    state.referral.message = null;
    render();

    try {
      await copyTextToClipboard(PRODUCTION_URL);
      await initiateReferralShare({
        via: "clipboard",
        source: shareOptions.source,
        closeModal: true,
      });
    } catch (error) {
      setReferralMessage(
        "error",
        error instanceof Error ? error.message : "An kasa kwafe hanyar sakin."
      );
    } finally {
      state.referral.busy = false;
      render();
    }
  }

  async function exportReferralAjamixPackage(options) {
    var shareOptions = Object.assign({ source: "unlock" }, options || {});

    if (state.referral.busy) {
      return;
    }

    state.referral.busy = true;
    state.referral.message = null;
    render();

    try {
      var result = await buildAjamixPackage();
      await initiateReferralShare({
        via: "ajamix",
        source: shareOptions.source,
        closeModal: true,
      });
      state.fileTransfer.shareNotice = {
        status: "success",
        exportType: "package",
        fileName: result.fileName,
        message: null,
      };
    } catch (error) {
      setReferralMessage(
        "error",
        error instanceof Error ? error.message : "An kasa fitar da fayil din .ajamix."
      );
    } finally {
      state.referral.busy = false;
      render();
    }
  }

  async function handleReferralBadgeTap() {
    await startReferralShareFlow({ source: "progress-badge" });
  }

  async function exportUsageEvents() {
    state.analytics.exportMessage = "";

    try {
      var events = await getAllEvents();
      var localKpis = await computeLocalKPIs();
      var exportPayload = {
        exportedAt: new Date().toISOString(),
        analyticsConsent: normalizeAnalyticsConsent(state.settings.analyticsConsent),
        kpis: localKpis,
        events: events,
      };
      var blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
        type: "application/json",
      });
      var fileName = "ajamix-usage-events-" + buildExportDateStamp() + ".json";

      await saveBlobWithFallback(blob, fileName, "application/json", ".json");
      state.analytics.exportMessage = "An fitar da bayanan amfani zuwa fayil na JSON.";
    } catch (error) {
      state.analytics.exportMessage =
        error instanceof Error
          ? error.message
          : "An kasa fitar da bayanan amfani.";
    }

    render();
  }

  async function exportAjamixPackage() {
    if (!isSharingEnabled() || state.fileTransfer.shareBusy) {
      return;
    }

    state.fileTransfer.shareBusy = true;
    state.fileTransfer.shareNotice = null;
    render();

    try {
      var result = await buildAjamixPackage();
      state.fileTransfer.shareNotice = {
        status: "success",
        exportType: "package",
        fileName: result.fileName,
        message: null,
      };
    } catch (error) {
      state.fileTransfer.shareNotice = {
        status: "error",
        exportType: "package",
        fileName: "",
        message: {
          ha: error instanceof Error ? error.message : "An kasa fitar da fayil din .ajamix.",
          ajami: romanToAjami(
            error instanceof Error ? error.message : "An kasa fitar da fayil din .ajamix."
          ),
        },
      };
    } finally {
      state.fileTransfer.shareBusy = false;
      render();
    }
  }

  async function exportAjamixDeltaPack() {
    if (!isSharingEnabled() || state.fileTransfer.shareBusy) {
      return;
    }

    state.fileTransfer.shareBusy = true;
    state.fileTransfer.shareNotice = null;
    render();

    try {
      var result = await buildAjamixDeltaPack();
      state.fileTransfer.shareNotice = {
        status: "success",
        exportType: "delta",
        fileName: result.fileName,
        message: null,
      };
    } catch (error) {
      state.fileTransfer.shareNotice = {
        status: "error",
        exportType: "delta",
        fileName: "",
        message: {
          ha: error instanceof Error ? error.message : "An kasa fitar da kunshin canjin abun ciki.",
          ajami: romanToAjami(
            error instanceof Error ? error.message : "An kasa fitar da kunshin canjin abun ciki."
          ),
        },
      };
    } finally {
      state.fileTransfer.shareBusy = false;
      render();
    }
  }

  async function resolveImportFileFromForm(form) {
    var fileInput = form.querySelector('input[name="importPackage"]');

    if (fileInput && fileInput.files && fileInput.files[0]) {
      return fileInput.files[0];
    }

    if (
      state.fileTransfer.importPendingHandle &&
      typeof state.fileTransfer.importPendingHandle.getFile === "function"
    ) {
      return state.fileTransfer.importPendingHandle.getFile();
    }

    return null;
  }

  async function importAjamixPackageFromForm(form) {
    var packageFile = await resolveImportFileFromForm(form);

    if (!packageFile) {
      setImportMessage("error", "Zabi fayil din .ajamix da farko.");
      render();
      return;
    }

    state.fileTransfer.importBusy = true;
    state.fileTransfer.importMessage = null;
    render();

    try {
      await importAjamixPackageFile(packageFile);
      state.fileTransfer.importPendingHandle = null;
      setImportMessage("success", "An karbi fayil din .ajamix kuma an loda sabon abun ciki.");
    } catch (error) {
      setImportMessage(
        "error",
        error instanceof Error ? error.message : "An kasa karbar fayil din .ajamix."
      );
    } finally {
      state.fileTransfer.importBusy = false;
      render();
    }
  }

  async function importAjamixPackageFile(packageFile) {
    if (!window.JSZip) {
      throw new Error("Ba a samu kayan bude .ajamix ba tukuna.");
    }

    var archive = await window.JSZip.loadAsync(await packageFile.arrayBuffer());
    var contentFile = archive.file("app/content.json");

    if (!contentFile) {
      throw new Error("Wannan fayil din bai kunshi app/content.json ba.");
    }

    var contentText = await contentFile.async("string");
    var bundle = JSON.parse(contentText || "{}");

    if (!bundle || !Array.isArray(bundle.modules)) {
      throw new Error("Abun cikin fayil din .ajamix bai dace ba.");
    }

    await saveSettings(
      {
        contentVersion: bundle.version || "imported-content",
        "imported-content": bundle,
      },
      { render: false }
    );
    await cacheContentBundle(bundle);
    applyBundleToState(bundle);
    await prepareDownloadSession(true);
    await refreshStorageEstimate();
    clearImportIntentQuery();
    await handleRouteChange();
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

    var unknownItems = session.items.filter(function (item) { return !item.sizeKnown; });

    await Promise.allSettled(unknownItems.map(function (item) {
      return fetchAudioSizeEstimate(item.url).then(function (sizeBytes) {
        item.sizeBytes = sizeBytes;
        item.sizeKnown = true;
      });
    }));

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
      var lastRenderTime = Date.now();
      var RENDER_THROTTLE_MS = 400;

      while (true) {
        var chunkResult = await reader.read();
        if (chunkResult.done) {
          break;
        }

        chunks.push(chunkResult.value);
        received += chunkResult.value.length;
        item.sizeBytes = contentLength || received;
        item.progressPct = contentLength ? Math.min(100, Math.round((received / contentLength) * 100)) : 0;

        var now = Date.now();
        if (now - lastRenderTime >= RENDER_THROTTLE_MS) {
          lastRenderTime = now;
          render();
        }
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

    if (passedThisAttempt) {
      await logEvent("quiz_passed", {
        moduleId: module.id,
        score: score,
        total: total,
      });
      openUseTodaySheet(module.id);
    }

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
    var endOfModuleBridge = results.progressPassed ? renderEndOfModuleBridge(module) : "";

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
      "</div>",
      endOfModuleBridge,
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
    var module = typeof moduleId === "string" ? getModuleById(moduleId) : moduleId;

    if (!module) {
      return null;
    }

    if (module.chainNext) {
      var chainedModule = getModuleById(module.chainNext);
      if (chainedModule) {
        return chainedModule;
      }
    }

    var trackModules = state.modules
      .filter(function (item) {
        return String(item.track || "").toLowerCase() === String(module.track || "").toLowerCase();
      })
      .slice()
      .sort(function (left, right) {
        return String(left.id || "").localeCompare(String(right.id || ""), undefined, { numeric: true });
      });
    var currentIndex = trackModules.findIndex(function (item) {
      return item.id === module.id;
    });

    if (currentIndex < 0 || currentIndex >= trackModules.length - 1) {
      return null;
    }

    return trackModules[currentIndex + 1];
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

  function formatPercent(value) {
    var numeric = Number(value || 0);
    return Math.round(Math.max(0, Math.min(1, numeric)) * 100) + "%";
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
        // v4: offline-first analytics queue (opt-in sync, see plan §4.4, §6.8)
        if (!db.objectStoreNames.contains("events")) {
          var eventsStore = db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
          eventsStore.createIndex("synced", "synced", { unique: false });
          eventsStore.createIndex("type", "type", { unique: false });
        }
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
