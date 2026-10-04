# Shared learners: release and recovery

## Preserved older release

The release before shared learners is commit
`53cc4532fd2aa4193b6233ff48419df979fdcd38`.
GitHub tag: `rollback/pre-shared-learners-2026-10-03`.
The tag was also saved in a verified Git bundle in the shared Ajamix task folder:
`2026-10-03-pre-shared-learners.bundle`.

The bundle contains the complete history needed to recover the release. It is a
source backup, not a backup of individual learners' browser data.

## Browser data and rollback

The new release retains the existing `ajamix-db` at version 4. Learner profiles
live in a separate `ajamix-learners-db`. Initialisation copies the existing
learner's settings, progress and events from a consistent snapshot. Downloads
and curriculum remain shared in the original database and caches.

An older release can therefore open its original database. It will show the
learner progress recorded before the move to profiles. Work completed in the
new release remains in the separate learner database; it is not visible in the
older app. Export a learner backup before rolling back when possible. That
backup covers learner settings and progress, not audio, curriculum, device PIN
or analytics events. Keep it private because it contains learner names.

Do not clear site data or uninstall the PWA as a rollback step. That can erase
both versions' local progress. Returning to the new release reopens the profile
database. Progress accumulated in the older app during a rollback is not
automatically reconciled with the profiles.

## Production rollback

1. In Vercel, select the successful production deployment for commit `53cc453`
   and use the platform's rollback/promote action for the production domain.
2. Verify `https://ajamix.vercel.app/app/` serves the older runtime and its
   matching service worker. The old release uses the v26 cache names.
3. Close other Ajamix tabs and reopen the app so its service worker can activate.
4. Verify onboarding/existing progress, a lesson and offline reload on a device.

Alternatively, deploy a clean checkout of the preserved Git tag through the
normal release process. Do not reset a working checkout containing prose work.

## Release gate

Before promoting the new version, verify legacy migration, learner separation,
backup/restore, reload persistence, offline use and the ability to reopen the
original version-4 database. Keep the preserved tag after the release.
