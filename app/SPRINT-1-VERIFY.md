# Sprint 1 Verification

## 1. Fresh install

1. Clear site data for the AJAMIX origin so IndexedDB, Cache Storage, and service worker state are empty.
2. Open the app and complete onboarding as a brand-new learner.
3. After onboarding, continue until the app tries to enter the main experience.
4. Confirm onboarded users with no `trackPreference` are redirected to `#/track-select`.
5. Tap `Hanyar Kasuwanci` or `Hanyar Makaranta`.
6. Confirm the app lands on `#/learning-path`, reload the page, and verify the same path remains selected.

## 2. Upgrade from v3 database

1. Start from a browser profile that already has the older AJAMIX IndexedDB database from v3.
2. Load the updated app build once so the database upgrade runs.
3. Open DevTools > Application > IndexedDB and confirm the database version is `4`.
4. Confirm the `events` object store exists and has indexes for `synced` and `type`.
5. Confirm existing learner settings and progress still load after the upgrade.

## 3. Track-select redirect

1. With an onboarded profile that has no saved `trackPreference`, try to open `#/learning-path`.
2. Confirm the route guard immediately redirects to `#/track-select`.
3. Choose each track once and verify the saved choice survives a reload.

## 4. Track switching

1. Open `#/settings` and switch to the other track using the `Hanyar koyo` controls.
2. Confirm the app returns to `#/learning-path` and the active path changes.
3. On the learning-path screen, tap the persistent `Wuce zuwa Hanyar ...` control.
4. Confirm `trackPreference` flips again and the screen reloads with the other path.
5. If the selected grade band has no modules for that track yet, confirm the empty-state message appears and still offers the switch control.

## 5. Content validator

1. From the repo root, run `node app/tools/validate-content.mjs`.
2. Confirm the script exits with code `0`.
3. If a repo-level `package.json` is added later, also verify any `validate-content` npm script resolves to the same command.
