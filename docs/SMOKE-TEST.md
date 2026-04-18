# AJAMIX v3.0 Smoke Test

Manual end-to-end validation for the dual-track AJAMIX PWA.

Run against:
- Local: `python3 serve.py` → `http://localhost:3002/app/`
- Vercel preview: preview deployment on a real Android device when possible
- Production: `https://ajamix.ng/app/`

## Reset Before Testing

- Clear `ajamix-db` in Chrome DevTools → Application → IndexedDB
- Unregister any old service worker in DevTools → Application → Service Workers
- If testing upgrade migration, first install the older build, generate some progress, then upgrade without clearing storage

## Fresh Install Flow

1. Launch the app from a clean profile.
2. Verify onboarding shows the current flow with track selection and the optional PIN step, and confirm there is no voice-selection step.
3. Finish onboarding without setting a PIN.
4. Confirm the user lands in the app and is routed through the selected track.
5. Repeat once more with a fresh profile and set a valid 4-digit PIN.
6. Reload the app and confirm the PIN gate appears before any route content renders.
7. Enter a wrong PIN 3 times and verify the app locks for 30 seconds.
8. After lockout, enter the correct PIN and confirm the app unlocks normally.

## Upgrade / Migration Flow

1. Start from a build before the latest sprint set and create progress in at least 2 modules.
2. Upgrade to the current build without clearing IndexedDB.
3. Confirm existing progress, settings, and track state are still present.
4. Confirm the `events` store still exists and new events continue to be written.

## Track / Ad Slot Rules

1. Set `featureFlags.adSlots=false` and confirm no ads appear anywhere.
2. Set `featureFlags.adSlots=true` and `trackPreference="vocational"`.
3. Verify ad slots appear only on:
   - vocational home / learning-path
   - track-select
4. Verify ad slots do not appear on:
   - onboarding
   - lesson
   - quiz
   - progress
   - settings
   - PIN gate

## Lesson / Quiz / Chain Flow

1. Open a module lesson and confirm `module_started` is written to IndexedDB events.
2. Open a second distinct module lesson and confirm `second_module_started` is written once.
3. Complete a quiz with a passing score (`>= 3`) and confirm:
   - `quiz_passed` is written
   - the Use Today modal appears
4. Choose `Zan yi amfani da shi yau` and confirm `use_today_yes` is written.
5. Repeat with `Wata rana` and confirm `use_today_deferred` is written.
6. Complete a vocational chained module such as `V01` and verify:
   - the gap teaser card appears
   - the next button resolves via `chainNext`
7. Complete `V10` and verify:
   - the leaf completion banner appears
   - no gap teaser card is shown

## Tomorrow Check Retention Loop

1. Pass a quiz and set a Use Today action.
2. Advance the system clock at least 12 hours.
3. Fully close and reopen the app.
4. Verify the Tomorrow Check sheet appears exactly once.
5. Answer `Haka` and confirm `tomorrow_check_yes` is written.
6. Repeat with `Ba haka` and confirm `tomorrow_check_no` is written.
7. Reopen the app again and confirm the same Tomorrow Check does not reappear.

## Sharing / Referral

1. Set `featureFlags.sharing=true`.
2. In Settings, export a full `.ajamix` package.
3. Confirm:
   - a `.ajamix` file downloads or saves
   - the post-export Chrome disclaimer sheet appears
4. Import the same `.ajamix` file via `?import` or file handler.
5. Confirm content reloads successfully after import.
6. Export the delta pack and confirm a plain JSON file downloads.
7. Set `featureFlags.referral=true`.
8. Complete 5 distinct modules and verify the `Kawowa Daya — Mai Yada Ilimi` modal appears once.
9. Dismiss the referral modal with `Rufe` and verify the badge remains on the progress screen.
10. Tap the progress badge and verify the share flow opens.
11. Complete a 6th distinct module and verify the referral modal does not appear again.
12. Set `featureFlags.referral=false` and verify there is no referral modal and no progress badge.

## Analytics / KPI Sync

1. Open Settings and leave analytics consent OFF.
2. Perform a few actions that generate events.
3. Confirm there are no network calls to `/api/kpi`.
4. Turn analytics consent ON.
5. Reopen a lesson, pass a quiz, and complete a module.
6. Confirm `/api/kpi` is called and unsynced rows begin moving to `synced=true`.
7. Open `/dashboard` and verify KPI cards load from `/api/dashboard`.
8. Use `Fitarwa: bayanan amfani` in Settings and confirm a JSON file containing events downloads.

## Offline / Stability

1. Put DevTools Network into Offline mode.
2. Reload the app and verify cached app shell content still opens.
3. Confirm PIN gate still appears first when enabled.
4. Confirm no tight retry loop hits `/api/kpi` while offline.

## Sign-Off

- Local smoke test: date / tester
- Preview smoke test: date / tester / device
- Production smoke test: date / tester / device
