import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { IDBFactory } from "fake-indexeddb";
const require = createRequire(import.meta.url);
const store = require("./learner-store.js");

// A deliberately small asynchronous transaction fixture. It models commit/abort and
// request scheduling, not IndexedDB browser fidelity; real-device migration QA remains required.
function database() {
  const data = { profiles: [], profileProgress: [], profileEvents: [], settings: [] };
  let failWrite = false;
  const db = { data, set failWrite(value) { failWrite = value; }, transaction(names) {
    const snapshot = structuredClone(data);
    let pending = 0, ended = false;
    const tx = { error: null, abort() { if (ended) return; ended = true; Object.assign(data, snapshot); queueMicrotask(() => tx.onabort?.()); }, objectStore(name) {
      const key = row => name === "profileProgress" ? [row.profileId, row.id] : name === "settings" ? row.key : row.id;
      const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const request = action => {
        pending++; const req = {};
        queueMicrotask(() => {
          if (ended) return;
          try { req.result = action(); req.onsuccess?.(); }
          catch (e) { tx.error = e; tx.abort(); }
          pending--; queueMicrotask(() => { if (!pending && !ended) { ended = true; tx.oncomplete?.(); } });
        }); return req;
      };
      const put = (value, add) => request(() => {
        if (failWrite) throw Error("Injected write failure");
        value = structuredClone(value);
        if (name === "profileEvents" && !value.id) value.id = data[name].length + 1;
        const index = data[name].findIndex(row => same(key(row), key(value)));
        if (add && index >= 0) throw Error("Duplicate key");
        if (index < 0) data[name].push(value); else data[name][index] = value;
        return key(value);
      });
      return { get(k) { return request(() => structuredClone(data[name].find(row => same(key(row), k)))); },
        getAll() { return request(() => structuredClone(data[name])); },
        put(value) { return put(value, false); }, add(value) { return put(value, true); },
        index(field) { return { getAll(k) { return request(() => structuredClone(data[name].filter(row => row[field] === k))); } }; } };
    } };
    return tx;
  } };
  return db;
}
const backup = () => ({ schema: "ajamix-learners-v1", profiles: [{ id: "old", name: "Amina", settings: { scriptMode: "ajami" }, progress: [{ id: "CT01", moduleId: "CT01", attempts: 2, bestScore: 5, audioListenedPct: 100 }] }] });

test("learners isolate progress and settings while device settings are excluded", async () => {
  const db = database();
  const a = await store.create(db, { name: "Amina", settings: { contentVersion: "bad", scriptMode: "ajami" } });
  const b = await store.create(db, { name: "Bala" });
  await store.saveProgress(db, a.id, { id: "CT01", bestScore: 5, profileId: b.id });
  assert.equal((await store.getProgress(db, a.id))[0].bestScore, 5);
  assert.deepEqual(await store.getProgress(db, b.id), []);
  assert.equal((await store.getSettings(db, a.id)).contentVersion, undefined);
  await store.setActive(db, b.id);
  assert.equal((await store.load(db)).activeProfileId, b.id);
  await store.saveSettings(db, a.id, { displayName: "Amina II" });
  assert.equal((await store.list(db)).find(p => p.id === a.id).name, "Amina II");
});
test("backup round trip imports as new profiles and never overwrites", async () => {
  const db = database();
  const [first] = await store.importBackup(db, backup());
  const exported = await store.exportBackup(db);
  assert.equal(exported.profiles[0].progress[0].bestScore, 5);
  const [second] = await store.importBackup(db, exported);
  assert.notEqual(first.id, second.id);
  assert.equal((await store.list(db)).length, 2);
  assert.equal((await store.getProgress(db, second.id))[0].attempts, 2);
});
test("invalid backup rejected before any transaction and bounded", () => {
  const db = { transaction() { assert.fail("must not write invalid backup"); } };
  const invalid = backup(); invalid.profiles[0].progress.push(invalid.profiles[0].progress[0]);
  assert.throws(() => store.importBackup(db, invalid), /duplicate module/);
  assert.throws(() => store.validateBackup('{"schema":"ajamix-learners-v1","__proto__":{}}'), /Unsafe/);
  assert.throws(() => store.validateBackup(" ".repeat(5 * 1024 * 1024 + 1)), /exceeds/);
  const badNumber = backup(); badNumber.profiles[0].progress[0].audioListenedPct = 101;
  assert.throws(() => store.validateBackup(badNumber), /listening/);
});
test("failed import aborts atomically and rejects rather than reporting success", async () => {
  const db = database();
  await store.create(db, { name: "Existing" });
  const before = structuredClone(db.data);
  db.failWrite = true;
  await assert.rejects(store.importBackup(db, backup()), /Injected/);
  assert.deepEqual(db.data, before);
});
test("unknown learner cannot receive progress or become active", async () => {
  const db = database();
  await assert.rejects(store.saveProgress(db, "missing", { id: "CT01" }));
  await assert.rejects(store.setActive(db, "missing"));
  assert.deepEqual(db.data.profileProgress, []);
  assert.deepEqual(db.data.settings, []);
});
test("events always use explicit captured learner identity", async () => {
  const db = database();
  const a = await store.create(db, { name: "A" }); const b = await store.create(db, { name: "B" });
  await store.addEvent(db, a.id, { type: "module_started", profileId: b.id });
  assert.equal((await store.getEvents(db, a.id)).length, 1);
  assert.equal((await store.getEvents(db, b.id)).length, 0);
});

function open(factory, version, upgrade) {
  return new Promise((resolve, reject) => {
    const req = factory.open("learners", version);
    req.onupgradeneeded = () => upgrade?.(req.result, req.transaction);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function rawRead(db, name) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(name); const req = tx.objectStore(name).getAll();
    tx.oncomplete = () => resolve(req.result); tx.onabort = () => reject(tx.error);
  });
}
async function legacy(factory) {
  const db = await open(factory, 4, db => {
    db.createObjectStore("settings", { keyPath: "key" });
    db.createObjectStore("progress", { keyPath: "id" });
    db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
  });
  await new Promise((resolve, reject) => {
    const tx = db.transaction(["settings", "progress", "events"], "readwrite");
    tx.objectStore("settings").put({ key: "displayName", value: "Legacy" });
    tx.objectStore("settings").put({ key: "privacyMode", value: { enabled: true, pinHash: "existing" } });
    tx.objectStore("settings").put({ key: "streakData", value: { streakDays: 7 } });
    tx.objectStore("progress").put({ id: "CT01", attempts: 3, bestScore: 5, audioListenedPct: 80 });
    tx.objectStore("events").put({ id: 9, type: "module_completed", synced: 0 });
    tx.oncomplete = resolve; tx.onabort = () => reject(tx.error);
  });
  db.close();
}
test("real IDB migration preserves legacy records, isolates privacy and is idempotent", async () => {
  const factory = new IDBFactory(); await legacy(factory);
  const db = await open(factory, 5, store.upgrade);
  const progress = await rawRead(db, "progress");
  const migrated = await store.getProgress(db, store.LEGACY_ID);
  assert.deepEqual(migrated, progress.map(row => ({ ...row, profileId: store.LEGACY_ID })));
  assert.equal((await store.getSettings(db, store.LEGACY_ID)).streakData.streakDays, 7);
  assert.equal((await store.getSettings(db, store.LEGACY_ID)).privacyMode, undefined);
  assert.equal((await rawRead(db, "settings")).find(row => row.key === "privacyMode").value.pinHash, "existing");
  assert.equal((await store.getEvents(db, store.LEGACY_ID))[0].id, 9);
  db.close();
  const next = await open(factory, 6, store.upgrade);
  assert.equal((await store.list(next)).length, 1);
  assert.equal((await store.getProgress(next, store.LEGACY_ID)).length, 1);
  next.close();
});
test("real IDB aborted migration rolls back stores and retains version4 data", async () => {
  const factory = new IDBFactory(); await legacy(factory);
  await assert.rejects(open(factory, 5, (db, tx) => { store.upgrade(db, tx); tx.abort(); }));
  const db = await open(factory, 4);
  assert.equal(db.objectStoreNames.contains("profiles"), false);
  assert.equal((await rawRead(db, "progress"))[0].bestScore, 5);
  db.close();
});
test("real IDB progress clearing and event updates cannot cross profile boundaries", async () => {
  const factory = new IDBFactory(); await legacy(factory);
  const db = await open(factory, 5, store.upgrade);
  const other = await store.create(db, { name: "Other" });
  await store.saveProgress(db, other.id, { id: "CT01", bestScore: 1 });
  const eventId = await store.addEvent(db, other.id, { type: "module_started", synced: 0 });
  await assert.rejects(store.putEvent(db, other.id, { id: 9, synced: 1 }));
  await store.putEvent(db, other.id, { id: eventId, type: "module_started", synced: 1 });
  assert.equal((await store.getEvents(db, other.id))[0].synced, 1);
  await store.clearProgress(db, other.id);
  await store.clearEvents(db, other.id);
  assert.equal((await store.getProgress(db, other.id)).length, 0);
  assert.equal((await store.getProgress(db, store.LEGACY_ID)).length, 1);
  assert.equal((await store.getEvents(db, store.LEGACY_ID)).length, 1);
  db.close();
});
test("real IDB import is additive and total learner cap applies to create and import", async () => {
  const factory = new IDBFactory(); await legacy(factory);
  const db = await open(factory, 5, store.upgrade);
  for (let i = 0; i < 49; i++) await store.create(db, { name: "Learner " + i });
  await assert.rejects(store.create(db, { name: "Too many" }));
  await assert.rejects(store.importBackup(db, backup()));
  assert.equal((await store.list(db)).length, 50);
  assert.equal((await store.getProgress(db, store.LEGACY_ID)).length, 1);
  db.close();
});
test("real IDB failed mid-import rolls back earlier queued profile and progress writes", async () => {
  const factory = new IDBFactory(); await legacy(factory);
  const db = await open(factory, 5, store.upgrade);
  const input = backup(); input.profiles.push({ ...structuredClone(input.profiles[0]), id: "second-source" });
  const original = globalThis.crypto.randomUUID;
  let promise;
  try {
    globalThis.crypto.randomUUID = () => "deliberate-collision";
    promise = store.importBackup(db, input);
  } finally { globalThis.crypto.randomUUID = original; }
  await assert.rejects(promise);
  assert.equal((await store.list(db)).length, 1);
  assert.equal((await rawRead(db, "profileProgress")).length, 1);
  db.close();
});

async function blankLearnerDatabase() {
  const factory = new IDBFactory();
  return open(factory, 5, (db, tx) => {
    db.createObjectStore("settings", { keyPath: "key" });
    db.createObjectStore("progress", { keyPath: "id" });
    db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
    store.upgrade(db, tx);
  });
}
function fullBackup() {
  return { schema: "ajamix-learners-v1", profiles: Array.from({ length: 50 }, (_, i) => ({
    id: "source-" + i, name: "Learner " + i, settings: {}, progress: [{ id: "CT01", bestScore: i % 6 }],
  })) };
}
test("full fifty-learner export restores to pristine installation and updates active pointer", async () => {
  const db = await blankLearnerDatabase();
  const imported = await store.importBackup(db, fullBackup());
  assert.equal((await store.list(db)).length, 50);
  assert.equal((await store.load(db)).activeProfileId, imported[0].id);
  assert.equal((await store.list(db)).some(p => p.id === store.LEGACY_ID), false);
  const exported = await store.exportBackup(db);
  const fresh = await blankLearnerDatabase();
  await store.importBackup(fresh, exported);
  assert.equal((await store.list(fresh)).length, 50);
  assert.equal((await rawRead(fresh, "profileProgress")).length, 50);
  db.close(); fresh.close();
});
test("capacity exception never removes customized, onboarded, progressed or event-bearing legacy learner", async () => {
  const changes = [
    db => store.saveSettings(db, store.LEGACY_ID, { displayName: "Amina" }),
    db => store.saveSettings(db, store.LEGACY_ID, { onboarded: true }),
    db => store.saveSettings(db, store.LEGACY_ID, { scriptMode: "ajami" }),
    db => store.saveProgress(db, store.LEGACY_ID, { id: "CT01" }),
    db => store.addEvent(db, store.LEGACY_ID, { type: "module_started" }),
  ];
  for (const change of changes) {
    const db = await blankLearnerDatabase(); await change(db);
    const before = await store.exportBackup(db);
    await assert.rejects(store.importBackup(db, fullBackup()), /50-learner limit/);
    const after = await store.exportBackup(db);
    assert.deepEqual(after.profiles, before.profiles);
    db.close();
  }
});
test("failed full-capacity restore rolls back removal of bootstrap and active pointer", async () => {
  const db = await blankLearnerDatabase();
  const before = await store.load(db), original = globalThis.crypto.randomUUID;
  let result;
  try { globalThis.crypto.randomUUID = () => "collision"; result = store.importBackup(db, fullBackup()); }
  finally { globalThis.crypto.randomUUID = original; }
  await assert.rejects(result);
  assert.deepEqual(await store.load(db), before);
  assert.deepEqual(await rawRead(db, "profileProgress"), []);
  db.close();
});
test("export rejects oversized or invalid stored data instead of issuing unusable backup", async () => {
  const db = await blankLearnerDatabase();
  await store.saveSettings(db, store.LEGACY_ID, { note: "x".repeat(5 * 1024 * 1024) });
  await assert.rejects(store.exportBackup(db), /exceeds 5 MB/);
  await store.saveSettings(db, store.LEGACY_ID, { note: "" });
  await store.saveProgress(db, store.LEGACY_ID, { id: "CT01", audioListenedPct: 101 });
  await assert.rejects(store.exportBackup(db), /listening percentage/);
  db.close();
});
