(function (root) {
  "use strict";
  var LEGACY_ID = "legacy-learner";
  var DEVICE_KEYS = ["activeProfileId", "contentVersion", "lastContentLastModified", "privacyMode", "analyticsConsent", "featureFlags", "imported-content"];
  var MAX_BYTES = 5 * 1024 * 1024;
  function copy(value) { return JSON.parse(JSON.stringify(value)); }
  function object(value) { return value && typeof value === "object" && !Array.isArray(value); }
  function assert(ok, message) { if (!ok) throw new Error(message); }
  function safeObject(value, depth) {
    depth = depth || 0;
    assert(depth < 32, "Object nesting exceeds limit");
    assert(object(value), "Expected an object");
    Object.keys(value).forEach(function (key) {
      assert(key !== "__proto__" && key !== "constructor" && key !== "prototype", "Unsafe key");
      if (object(value[key])) safeObject(value[key], depth + 1);
      if (Array.isArray(value[key])) checkArray(value[key], depth + 1);
    });
    return value;
  }
  function checkArray(items, depth) {
    assert(depth < 32, "Object nesting exceeds limit");
    items.forEach(function (item) {
      if (object(item)) safeObject(item, depth + 1);
      if (Array.isArray(item)) checkArray(item, depth + 1);
    });
  }
  function settingsOnly(settings) {
    safeObject(settings);
    var result = {};
    Object.keys(settings).forEach(function (key) { if (DEVICE_KEYS.indexOf(key) < 0) result[key] = copy(settings[key]); });
    return result;
  }
  function nameOf(name) {
    assert(typeof name === "string" && name.trim().length > 0 && name.trim().length <= 80, "Learner name must contain 1–80 characters");
    return name.trim();
  }
  function id() {
    assert(root.crypto && typeof root.crypto.randomUUID === "function", "Secure profile IDs unavailable");
    return root.crypto.randomUUID();
  }
  function transaction(db, stores, mode, work) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(stores, mode), result;
      tx.oncomplete = function () { resolve(result); };
      tx.onerror = tx.onabort = function () { reject(tx.learnerError || tx.error || new Error("Learner storage transaction failed")); };
      try { work(tx, function (value) { result = value; }); }
      catch (error) { tx.abort(); reject(error); }
    });
  }
  function profileRequest(tx, profileId, done) {
    var req = tx.objectStore("profiles").get(profileId);
    req.onsuccess = function () {
      if (!req.result) { tx.abort(); return; }
      done(req.result);
    };
  }
  function upgrade(db, tx) {
    if (!db.objectStoreNames.contains("profiles")) db.createObjectStore("profiles", { keyPath: "id" });
    if (!db.objectStoreNames.contains("profileProgress")) {
      db.createObjectStore("profileProgress", { keyPath: ["profileId", "id"] }).createIndex("profileId", "profileId");
    }
    if (!db.objectStoreNames.contains("profileEvents")) {
      var events = db.createObjectStore("profileEvents", { keyPath: "id", autoIncrement: true });
      events.createIndex("profileId", "profileId");
      events.createIndex("synced", "synced");
      events.createIndex("type", "type");
    }
    var check = tx.objectStore("profiles").get(LEGACY_ID);
    check.onsuccess = function () {
      if (check.result) return;
      var request = tx.objectStore("settings").getAll();
      request.onsuccess = function () {
        var settings = {};
        request.result.forEach(function (row) { if (DEVICE_KEYS.indexOf(row.key) < 0) settings[row.key] = row.value; });
        tx.objectStore("profiles").add({ id: LEGACY_ID, name: settings.displayName || "Dalibi", settings: settings, createdAt: new Date().toISOString() });
        tx.objectStore("settings").put({ key: "activeProfileId", value: LEGACY_ID });
      };
      [ ["progress", "profileProgress"], ["events", "profileEvents"] ].forEach(function (pair) {
        if (!db.objectStoreNames.contains(pair[0])) return;
        var old = tx.objectStore(pair[0]).openCursor();
        old.onsuccess = function () {
          var cursor = old.result;
          if (!cursor) return;
          var row = Object.assign({}, cursor.value, { profileId: LEGACY_ID });
          tx.objectStore(pair[1]).add(row);
          cursor.continue();
        };
      });
    };
  }
  function list(db) {
    return transaction(db, ["profiles"], "readonly", function (tx, done) {
      var req = tx.objectStore("profiles").getAll(); req.onsuccess = function () { done(req.result); };
    });
  }
  function load(db) {
    return transaction(db, ["profiles", "settings"], "readonly", function (tx, done) {
      var result = { profiles: [], activeProfileId: null };
      var profiles = tx.objectStore("profiles").getAll();
      profiles.onsuccess = function () { result.profiles = profiles.result; };
      var active = tx.objectStore("settings").get("activeProfileId");
      active.onsuccess = function () { result.activeProfileId = active.result ? active.result.value : null; };
      done(result);
    });
  }
  function create(db, input) {
    var profile = { id: id(), name: nameOf(input.name), settings: settingsOnly(input.settings || {}), createdAt: new Date().toISOString() };
    profile.settings.displayName = profile.name;
    return transaction(db, ["profiles"], "readwrite", function (tx, done) {
      var req = tx.objectStore("profiles").getAll();
      req.onsuccess = function () {
        if (req.result.length >= 50) { tx.abort(); return; }
        tx.objectStore("profiles").add(profile); done(profile);
      };
    });
  }
  function setActive(db, profileId) {
    return transaction(db, ["profiles", "settings"], "readwrite", function (tx, done) {
      profileRequest(tx, profileId, function () { tx.objectStore("settings").put({ key: "activeProfileId", value: profileId }); done(profileId); });
    });
  }
  function getSettings(db, profileId) {
    return transaction(db, ["profiles"], "readonly", function (tx, done) { profileRequest(tx, profileId, function (profile) { done(profile.settings || {}); }); });
  }
  function saveSettings(db, profileId, patch) {
    patch = settingsOnly(patch);
    if (Object.prototype.hasOwnProperty.call(patch, "displayName")) patch.displayName = nameOf(patch.displayName);
    return transaction(db, ["profiles"], "readwrite", function (tx, done) {
      profileRequest(tx, profileId, function (profile) {
        profile.settings = Object.assign({}, profile.settings, patch);
        if (patch.displayName) profile.name = patch.displayName;
        tx.objectStore("profiles").put(profile); done(profile.settings);
      });
    });
  }
  function readRows(db, profileId, store) {
    return transaction(db, ["profiles", store], "readonly", function (tx, done) {
      profileRequest(tx, profileId, function () {
        var req = tx.objectStore(store).index("profileId").getAll(profileId);
        req.onsuccess = function () { done(req.result); };
      });
    });
  }
  function saveRow(db, profileId, record, store) {
    safeObject(record);
    if (store === "profileProgress") assert(typeof record.id === "string" && record.id.length > 0 && record.id.length <= 200, "Invalid module ID");
    var row = Object.assign({}, copy(record), { profileId: profileId });
    if (store === "profileEvents") delete row.id;
    return transaction(db, ["profiles", store], "readwrite", function (tx, done) {
      profileRequest(tx, profileId, function () { var req = tx.objectStore(store).put(row); req.onsuccess = function () { done(req.result); }; });
    });
  }
  function clearEvents(db, profileId) {
    return transaction(db, ["profiles", "profileEvents"], "readwrite", function (tx) {
      profileRequest(tx, profileId, function () {
        var req = tx.objectStore("profileEvents").index("profileId").openCursor(profileId);
        req.onsuccess = function () { var cursor = req.result; if (cursor) { cursor.delete(); cursor.continue(); } };
      });
    });
  }
  function deleteProgress(db, profileId, moduleId) {
    return transaction(db, ["profiles", "profileProgress"], "readwrite", function (tx) {
      profileRequest(tx, profileId, function () { tx.objectStore("profileProgress").delete([profileId, moduleId]); });
    });
  }
  function clearProgress(db, profileId) {
    return transaction(db, ["profiles", "profileProgress"], "readwrite", function (tx) {
      profileRequest(tx, profileId, function () {
        var req = tx.objectStore("profileProgress").index("profileId").openCursor(profileId);
        req.onsuccess = function () { var cursor = req.result; if (cursor) { cursor.delete(); cursor.continue(); } };
      });
    });
  }
  function putEvent(db, profileId, record) {
    safeObject(record);
    assert(Number.isInteger(record.id) && record.id > 0, "Invalid event ID");
    return transaction(db, ["profiles", "profileEvents"], "readwrite", function (tx, done) {
      profileRequest(tx, profileId, function () {
        var req = tx.objectStore("profileEvents").get(record.id);
        req.onsuccess = function () {
          if (!req.result || req.result.profileId !== profileId) { tx.abort(); return; }
          tx.objectStore("profileEvents").put(Object.assign({}, copy(record), { profileId: profileId })); done(record.id);
        };
      });
    });
  }
  function validateBackup(input) {
    var text = typeof input === "string" ? input : JSON.stringify(input);
    assert(new TextEncoder().encode(text).length <= MAX_BYTES, "Backup exceeds 5 MB");
    var backup = JSON.parse(text); safeObject(backup);
    assert(backup.schema === "ajamix-learners-v1" && Array.isArray(backup.profiles), "Unsupported learner backup");
    assert(backup.profiles.length > 0 && backup.profiles.length <= 50, "Backup must contain 1–50 learners");
    var count = 0, ids = new Set();
    backup.profiles.forEach(function (profile) {
      assert(object(profile) && typeof profile.id === "string" && profile.id.length > 0 && profile.id.length <= 200 && !ids.has(profile.id), "Invalid or duplicate learner ID"); ids.add(profile.id);
      nameOf(profile.name); profile.settings = settingsOnly(profile.settings || {});
      assert(Array.isArray(profile.progress), "Missing learner progress");
      count += profile.progress.length; assert(count <= 25000, "Too many progress records");
      var modules = new Set();
      profile.progress.forEach(function (row) {
        safeObject(row);
        assert(typeof row.id === "string" && row.id.length > 0 && row.id.length <= 200 && !modules.has(row.id), "Invalid or duplicate module ID"); modules.add(row.id);
        if (row.moduleId !== undefined) assert(row.moduleId === row.id, "Mismatched module ID");
        if (row.status !== undefined) assert(["not-started", "in-progress", "completed", "locked", "available"].indexOf(row.status) >= 0, "Invalid progress status");
        ["attempts", "bestScore", "lastScore", "audioListenedPct"].forEach(function (key) {
          if (row[key] !== undefined && row[key] !== null) assert(typeof row[key] === "number" && Number.isFinite(row[key]) && row[key] >= 0, "Invalid progress number");
        });
        if (row.audioListenedPct !== undefined) assert(row.audioListenedPct <= 100, "Invalid listening percentage");
      });
    });
    return backup;
  }
  function exportBackup(db) {
    return transaction(db, ["profiles", "profileProgress"], "readonly", function (tx, done) {
      var output = { schema: "ajamix-learners-v1", exportedAt: new Date().toISOString(), profiles: [] };
      var req = tx.objectStore("profiles").getAll();
      req.onsuccess = function () {
        req.result.forEach(function (profile) {
          var exported = Object.assign({}, profile, { settings: settingsOnly(profile.settings || {}), progress: [] });
          output.profiles.push(exported);
          var rows = tx.objectStore("profileProgress").index("profileId").getAll(profile.id);
          rows.onsuccess = function () { exported.progress = rows.result.map(function (row) { delete row.profileId; return row; }); };
        });
      }; done(output);
    }).then(function (output) {
      // Validate the completed snapshot, not partially populated request results.
      // A successful export must satisfy the same contract as a future restore.
      return validateBackup(output);
    });
  }
  function pristineBootstrap(profile) {
    if (!profile || profile.id !== LEGACY_ID || profile.name !== "Dalibi") return false;
    var settings = profile.settings || {};
    return Object.keys(settings).every(function (key) {
      return (key === "displayName" && settings[key] === "") ||
        (key === "onboarded" && settings[key] === false);
    });
  }
  function importBackup(db, input) {
    var backup = validateBackup(input);
    var profiles = backup.profiles.map(function (profile) { return { id: id(), name: profile.name.trim(), settings: profile.settings, createdAt: new Date().toISOString() }; });
    return transaction(db, ["profiles", "profileProgress", "profileEvents", "settings"], "readwrite", function (tx, done) {
      var req = tx.objectStore("profiles").getAll();
      req.onsuccess = function () {
        function addProfiles() {
          profiles.forEach(function (profile, index) {
            tx.objectStore("profiles").add(profile);
            backup.profiles[index].progress.forEach(function (row) { tx.objectStore("profileProgress").add(Object.assign({}, row, { profileId: profile.id })); });
          }); done(profiles);
        }
        function rejectCapacity() {
          tx.learnerError = new Error("Restore would exceed the 50-learner limit; existing learner data was preserved");
          tx.abort();
        }
        if (req.result.length + profiles.length <= 50) { addProfiles(); return; }
        if (req.result.length !== 1 || !pristineBootstrap(req.result[0])) { rejectCapacity(); return; }
        var progress = tx.objectStore("profileProgress").index("profileId").getAll(LEGACY_ID);
        progress.onsuccess = function () {
          if (progress.result.length) { rejectCapacity(); return; }
          var events = tx.objectStore("profileEvents").index("profileId").getAll(LEGACY_ID);
          events.onsuccess = function () {
            if (events.result.length) { rejectCapacity(); return; }
            // Remove only a provably unused bootstrap, in the same transaction
            // as every imported row and the active-profile pointer.
            tx.objectStore("profiles").delete(LEGACY_ID);
            tx.objectStore("settings").put({ key: "activeProfileId", value: profiles[0].id });
            addProfiles();
          };
        };
      };
    });
  }
  var api = { LEGACY_ID: LEGACY_ID, DEVICE_KEYS: DEVICE_KEYS, upgrade: upgrade, load: load, list: list, create: create, setActive: setActive, getSettings: getSettings, saveSettings: saveSettings,
    getProgress: function (db, profileId) { return readRows(db, profileId, "profileProgress"); },
    saveProgress: function (db, profileId, record) { return saveRow(db, profileId, record, "profileProgress"); },
    getEvents: function (db, profileId) { return readRows(db, profileId, "profileEvents"); },
    addEvent: function (db, profileId, record) { return saveRow(db, profileId, record, "profileEvents"); },
    clearEvents: clearEvents, putEvent: putEvent, deleteProgress: deleteProgress, clearProgress: clearProgress,
    exportBackup: exportBackup, importBackup: importBackup, validateBackup: validateBackup };
  root.AjamixLearnerStore = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
