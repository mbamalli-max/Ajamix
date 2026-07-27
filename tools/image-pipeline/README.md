# AJAMIX premium image pipeline — Phase 1

This directory is an isolated foundation for API-generated curriculum images. It deliberately contains no learner asset and does not write to `app/`.

Phase 1 has three candidate style bibles, a reusable cast, script-independent label records, deterministic compositing, an Ajami rendering spike, an API queue/client, QA, and four placeholder-based proofs of concept. It is **not** a rendering run. The placeholder images are watermarked and must never be promoted to `app/images/`.

Run commands from this directory (the repository-root `package.json` is not used by these tools):

```sh
export NODE_PATH='/Users/muhammadbamalli/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'
node generate/client.mjs --dry-run --queue generate/style-comparison-queue.json
node ajami-spike/run-spike.mjs
node poc/make-poc.mjs
node qa/check-poc.mjs
```

`generate/client.mjs --live` is intentionally guarded by both `--authorize-live` and `OPENAI_API_KEY`; Phase 1 never invokes it. The client never reads credentials from a file and never prints them.

Accepted and raw API artifacts are operational directories, not deliverables. Their provenance records contain input hashes, response metadata, and SHA-256 artifact checksums.
