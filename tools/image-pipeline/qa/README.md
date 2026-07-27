# QA framework

`check-poc.mjs` produces a structured JSON record for dimensions, file type, alpha/background, label-source provenance, arithmetic, and artifact checksums. It intentionally classifies visual checks as `MANUAL_REQUIRED`: generated-text leakage, watermark detection, spelling visibility, clipping, overlap, contrast, mobile size, RTL layout, and factual scientific/visual correctness cannot be safely inferred from PNG metadata.

The manual checklist is also the acceptance template for future API outputs. Provenance must carry accepted/rejected status and a rejection reason, plus checksums and available API usage/cost fields.
