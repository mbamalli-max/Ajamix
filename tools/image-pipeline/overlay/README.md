# Label-overlay architecture

A label record is a separate, structured input to the compositor. The base artwork never carries generated labels, so the same approved illustration can produce Latin-only, later Ajami-only, and Ajami-primary/Latin-secondary outputs without regeneration.

`labels.schema.json` defines boxes, exact font families and sizes, script/direction per line, callouts/arrows, validation status, and mobile-safe intent. The implementation rejects out-of-canvas boxes, label-box collisions, callout/box intersections, and non-safe placement where safe areas are supplied. Collision detection is deterministic and deliberately conservative: it uses a fixed 0.58 × font-size glyph-width estimate before rendering. Final visual QA remains required because actual glyph widths vary.

Compositing is deterministic: SVG markup is emitted in a stable order and sharp encodes PNG with fixed settings and no volatile metadata. On the pinned local sharp/libvips build, repeated runs are byte-identical (verified by SHA-256 in Phase 1); the intended portability guarantee is pixel-identical because PNG encoder versions can differ between runtime deployments.

Ajami records must mark each unvalidated line `validated: false`; the compositor then adds the mandatory visible `GWAJI — BA A TANTANCE BA / UNVALIDATED TEST` ribbon. Production use must reject unvalidated Ajami records at workflow policy level.
