import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
import { IDBFactory } from "fake-indexeddb";

const require = createRequire(import.meta.url);
const learnerStore = require("./learner-store.js");

function runtime() {
  const source = fs.readFileSync(new URL("./app.js", import.meta.url), "utf8");
  const index = source.lastIndexOf("\n})();");
  const exports = `
    globalThis.api = { state, openDatabase, openLearnerDatabase, getAllRecords,
      getRecord, putRecord, clearStore, deleteRecord, loadSettings, loadProgress,
      renderLearnersScreen, trackLearnerTask, switchLearner, learnerAudioListener,
      silenceView: function () { render = function () {}; navigate = function () {}; updateShellChrome = function () {}; applyMotionMode = function () {}; },
      pendingCount: function () { return learnerTasks.size; } };
  `;
  const context = {
    console, indexedDB: new IDBFactory(), navigator: { onLine: true },
    location: { hostname: "localhost", hash: "#/learners" },
    window: { AjamixLearnerStore: learnerStore },
    document: { addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; } },
    URLSearchParams, TextEncoder, setTimeout, clearTimeout,
  };
  vm.runInNewContext(source.slice(0, index) + exports + source.slice(index), context);
  return { ...context.api, indexedDB: context.indexedDB };
}

function write(db, rows) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(Object.keys(rows), "readwrite");
    tx.oncomplete = resolve;
    tx.onabort = tx.onerror = () => reject(tx.error);
    for (const [store, values] of Object.entries(rows)) {
      for (const value of values) tx.objectStore(store).put(value);
    }
  });
}

function read(db, store) {
  return new Promise((resolve, reject) => {
    const request = db.transaction(store).objectStore(store).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function migrated() {
  const app = runtime();
  app.state.db = await app.openDatabase();
  await write(app.state.db, {
    settings: [{ key: "displayName", value: "Amina" }, { key: "onboarded", value: true },
      { key: "scriptMode", value: "latin" }, { key: "contentVersion", value: "fixture" }],
    progress: [{ id: "CT01", status: "completed", bestScore: 5 }],
    events: [{ type: "module_completed", moduleId: "CT01", synced: false }],
    glossary: [{ id: "test-term", termHa: "Fixture" }],
  });
  app.state.learnerDb = await app.openLearnerDatabase();
  const loaded = await learnerStore.load(app.state.learnerDb);
  app.state.profileId = loaded.activeProfileId;
  app.state.profiles = loaded.profiles;
  return app;
}

test("runtime migrates existing learner once and keeps exact old database usable", async () => {
  const app = await migrated();
  try {
    assert.equal(app.state.db.version, 4);
    assert.notEqual(app.state.learnerDb.name, app.state.db.name);
    assert.equal((await app.getAllRecords("progress"))[0].bestScore, 5);
    assert.equal((await app.getAllRecords("events"))[0].moduleId, "CT01");
    assert.equal((await read(app.state.db, "glossary"))[0].id, "test-term");
    await app.putRecord("progress", { id: "CT01", bestScore: 4 });
    assert.equal((await read(app.state.db, "progress"))[0].bestScore, 5,
      "older release retains its pre-upgrade learner progress");
    app.state.learnerDb.close();
    app.state.learnerDb = await app.openLearnerDatabase();
    assert.equal((await app.getAllRecords("progress"))[0].bestScore, 4,
      "reopening cannot recopy stale legacy progress");
    const oldVersion = await new Promise((resolve, reject) => {
      const req = app.indexedDB.open("ajamix-db", 4);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    assert.equal((await read(oldVersion, "progress"))[0].bestScore, 5);
    oldVersion.close();
  } finally { app.state.db.close(); app.state.learnerDb.close(); }
});

test("runtime adapters isolate progress, settings, event edits and reset to current learner", async () => {
  const app = await migrated();
  try {
    const original = app.state.profileId;
    const added = await learnerStore.create(app.state.learnerDb, { name: "Bala" });
    const originalEvent = (await app.getAllRecords("events"))[0];
    app.state.profileId = added.id;
    assert.deepEqual(await app.getAllRecords("progress"), []);
    await app.putRecord("settings", { key: "displayName", value: "Bala II" });
    await app.putRecord("settings", { key: "contentVersion", value: "shared-version" });
    await app.putRecord("progress", { id: "CT02", bestScore: 3 });
    await assert.rejects(app.putRecord("events", { ...originalEvent, synced: true }));
    await app.clearStore("progress");
    assert.deepEqual(await app.getAllRecords("progress"), []);
    app.state.profileId = original;
    const settings = await app.getAllRecords("settings");
    assert.equal(settings.find(r => r.key === "displayName").value, "Amina");
    assert.equal(settings.find(r => r.key === "contentVersion").value, "shared-version");
    assert.equal((await app.getAllRecords("progress"))[0].bestScore, 5);
    assert.equal((await app.getAllRecords("events"))[0].synced, false);
  } finally { app.state.db.close(); app.state.learnerDb.close(); }
});

test("learner task tracking retains pending writes and cleans failures", async () => {
  const app = runtime();
  let finish;
  const write = app.trackLearnerTask(() => new Promise(resolve => { finish = resolve; }));
  const pending = write();
  assert.equal(app.pendingCount(), 1);
  finish(); await pending;
  assert.equal(app.pendingCount(), 0);
  await assert.rejects(app.trackLearnerTask(() => { throw Error("write failed"); })(), /write failed/);
  assert.equal(app.pendingCount(), 0);
});

test("switch waits for in-flight learner writes and ignores old audio callbacks", async () => {
  const app = await migrated();
  app.silenceView();
  try {
    const original = app.state.profileId;
    const other = await learnerStore.create(app.state.learnerDb, { name: "Bala" });
    let finish;
    const blocked = new Promise(resolve => { finish = resolve; });
    const writing = app.trackLearnerTask(async () => {
      await blocked;
      await app.putRecord("progress", { id: "CT02", bestScore: 2 });
    })();
    let callback;
    let played = 0;
    app.learnerAudioListener({ addEventListener(_type, fn) { callback = fn; } })("ended", () => played++);
    const switching = app.switchLearner(other.id);
    assert.equal(app.state.profileId, original);
    assert.equal(app.state.profileSwitching, true);
    callback(); assert.equal(played, 0);
    finish(); await writing; await switching;
    assert.equal(app.state.profileId, other.id);
    assert.equal((await learnerStore.getProgress(app.state.learnerDb, original)).length, 2);
    assert.equal((await app.getAllRecords("progress")).length, 0);
    callback(); assert.equal(played, 0, "old element cannot update new learner");
    assert.equal(app.state.profileSwitching, false);
  } finally { app.state.db.close(); app.state.learnerDb.close(); }
});

test("learner screen escapes names and conceals unreviewed Latin copy in Ajami mode", () => {
  const app = runtime();
  app.state.profiles = [{ id: "one", name: '<img src=x onerror="alert(1)">', settings: {} }];
  app.state.profileId = "one";
  app.state.settings.scriptMode = "latin";
  assert.doesNotMatch(app.renderLearnersScreen(), /<img src=x/);
  app.state.settings.scriptMode = "ajami";
  const html = app.renderLearnersScreen();
  const visible = html.replace(/<span[^>]*class="sr-only"[^>]*>[\s\S]*?<\/span>/g, "").replace(/<[^>]+>/g, "");
  assert.doesNotMatch(visible, /Learner|Backup|Restore|onerror|alert/);
});
