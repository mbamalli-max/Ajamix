# Slice 30 report — ajamix

Task ID: `2026-07-28-slice-30`

## Result

Completed the three requested `app/app.js` fixes. No commit, Git command, dev server, or browser was used.

## Exact changes applied

### Fix 1 — narrow legacy formal-cache cleanup

In `prepareDownloadSession()` ([app.js](/Users/muhammadbamalli/Documents/ajamix/app/app.js:8063)), the existing single `getAllRecords("audioCache")` result is now used to identify legacy cache rows. The added set contains only non-empty `module.audioFile` values for modules for which `hasFormalSegments(module)` is true. Each matching cached row is deleted best-effort, then excluded from `cachedMap` whether the deletion succeeded or failed, so it cannot be presented as a completed download in that session.

```diff
 var audioEntries = getAudioEntriesForGradeBand(state.settings.gradeBand);
 var cachedAudio = await getAllRecords("audioCache");
+var legacyFormalAudioUrls = state.modules.reduce(function (accumulator, module) {
+  if (hasFormalSegments(module) && typeof module.audioFile === "string" && module.audioFile.trim()) {
+    accumulator[module.audioFile] = true;
+  }
+  return accumulator;
+}, Object.create(null));
+var retainedCachedAudio = [];
+for (var cachedIndex = 0; cachedIndex < cachedAudio.length; cachedIndex += 1) {
+  var cachedRecord = cachedAudio[cachedIndex];
+  if (cachedRecord && legacyFormalAudioUrls[cachedRecord.url]) {
+    await deleteRecord("audioCache", cachedRecord.url).catch(function () {
+      return null;
+    });
+    continue;
+  }
+  retainedCachedAudio.push(cachedRecord);
+}
+cachedAudio = retainedCachedAudio;
 var cachedMap = cachedAudio.reduce(function (accumulator, item) {
```

`Object.create(null)` makes the key set exact even for unusual string keys; it has no prototype properties that could accidentally match a cached URL. This is not a blanket sweep: activity audio, vocational lessons, and non-segmented formal modules are not candidates.

### Fix 2 — count only successful deletions

In `deleteAudioForCompletedModules()` ([app.js](/Users/muhammadbamalli/Documents/ajamix/app/app.js:8420)), the pre-delete count/byte calculation was replaced with a URL-to-record map and post-success accounting. Each completed-module URL is still attempted even after another delete fails. A cached row contributes exactly once only after its `deleteRecord()` resolves; the original size expression is unchanged.

```diff
-var completedAudioUrls = completedModules.reduce(function (accumulator, module) {
-  getAudioUrlsForModule(module).forEach(function (url) {
-    accumulator[url] = true;
-  });
-  return accumulator;
-}, {});
 var cachedAudio = await getAllRecords("audioCache").catch(function () {
   return [];
 });
-var recordsToDelete = cachedAudio.filter(function (record) {
-  return record && completedAudioUrls[record.url];
-});
-var deletedBytes = recordsToDelete.reduce(function (total, record) {
-  return total + Number(record.sizeBytes || (record.blob ? record.blob.size : 0) || 0);
-}, 0);
+var cachedAudioByUrl = cachedAudio.reduce(function (accumulator, record) {
+  if (record) {
+    accumulator[record.url] = record;
+  }
+  return accumulator;
+}, Object.create(null));
+var deletedCount = 0;
+var deletedBytes = 0;

 for (var index = 0; index < completedModules.length; index += 1) {
   var audioUrls = getAudioUrlsForModule(completedModules[index]);
   for (var urlIndex = 0; urlIndex < audioUrls.length; urlIndex += 1) {
-    await deleteRecord("audioCache", audioUrls[urlIndex]).catch(function () {
-      return null;
-    });
+    var audioUrl = audioUrls[urlIndex];
+    var record = cachedAudioByUrl[audioUrl];
+    try {
+      await deleteRecord("audioCache", audioUrl);
+      if (record) {
+        deletedCount += 1;
+        deletedBytes += Number(record.sizeBytes || (record.blob ? record.blob.size : 0) || 0);
+        delete cachedAudioByUrl[audioUrl];
+      }
+    } catch (error) {
+      // Continue deleting remaining completed-module audio after an individual failure.
+    }
   }
 }

 return {
-  count: recordsToDelete.length,
+  count: deletedCount,
   bytes: deletedBytes,
 };
```

The existing trailing `await prepareDownloadSession(true);` and `await refreshStorageEstimate();` calls are unchanged.

### Fix 3 — shared segmented predicate and legacy fallback

In `getAudioUrlsForModule()` ([app.js](/Users/muhammadbamalli/Documents/ajamix/app/app.js:6907)), the formal branch now calls the hoisted `hasFormalSegments(module)` declaration. If the predicate is true but all segment audio-file values are filtered out, it falls through to the existing legacy `module.audioFile` fallback. The vocational branch is unchanged.

```diff
-if (Array.isArray(module.segments) && module.segments.length) {
-  return module.segments
+if (hasFormalSegments(module)) {
+  var segmentUrls = module.segments
     .filter(function (segment) {
       return segment && typeof segment.audioFile === "string" && segment.audioFile.trim();
     })
     .map(function (segment) {
       return segment.audioFile;
     });
+  if (segmentUrls.length) {
+    return segmentUrls;
+  }
 }
 return module.audioFile ? [module.audioFile] : [];
```

`hasFormalSegments()` is a function declaration in the same IIFE ([app.js](/Users/muhammadbamalli/Documents/ajamix/app/app.js:3856)), so its use before its source position is valid through normal function-declaration hoisting.

## Fix 3 current-corpus neutrality proof

I created a throwaway Node script, `.slice30-audio-urls.mjs`, which parsed the real `app/content.json` and reimplemented both the old and new `getAudioUrlsForModule()` logic. It compared each result as a serialized URL array.

Result:

```text
Fix 3 comparison: byte-identical URL arrays for all 389 module(s); 0 mismatches.
```

The throwaway comparison script was deleted before this report was written and its absence was verified.

## Verification

`node -c app/app.js` — exit 0; no output.

Full acceptance-gate output from:

```text
node -c app/app.js && node app/tools/validate-content.mjs && node --test tools/audio-pipeline/qa-delivered-audio.test.mjs
```

```text
validate-content: OK — 389 module(s) pass.
  track=vocational: 30
  track=formal:     359
  isChainLeaf:      362
  chainNext set:    27
PASS formal 149.9s fails
PASS formal 150s passes
PASS formal 330s passes
PASS formal 331s fails
PASS formal segment 2.9s fails
PASS formal segment 3s passes
PASS formal segment 90s passes
PASS formal segment 90.1s fails
PASS formal segment and legacy formal paths classify correctly
PASS adult 2.9s fails
PASS adult 3s passes
PASS adult 40s passes
PASS adult 40.1s fails
PASS vocational valid path classifies and passes
PASS falsafa valid path classifies and passes
PASS criticalThinking valid path classifies and passes
PASS unknown path fails classification
PASS adult bitrate check still fails
PASS adult mono check still fails
PASS adult filename check still fails
PASS worklist enumerates 1,077 formal segment targets and preserves 150 adult card targets
All deterministic delivered-audio QA tests passed.
✔ tools/audio-pipeline/qa-delivered-audio.test.mjs (73.445625ms)
ℹ tests 1
ℹ suites 0
ℹ pass 1
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 81.512375
```

## Scope confirmation

I reviewed the applied patch after the changes. Only the three requested functions changed: `getAudioUrlsForModule()`, `prepareDownloadSession()`, and `deleteAudioForCompletedModules()`. The vocational branch, `hasFormalSegments()`, `resolveAudioSourceForPath()`, playback functions, and the retained cleanup refresh calls are unchanged.

No changes were made to `app/content.json`, `app/styles.css`, `app/index.html`, `app/sw.js`, `app/images/`, `app/audio/`, `tools/image-pipeline/`, or `tasks/2026-07-28-slice-30.jsonl`. The acceptance test did not update the pre-existing `tools/audio-pipeline/_qa-report.json`. No commit was created.
