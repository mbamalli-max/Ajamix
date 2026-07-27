# Mathematics validation regeneration report

Task ID: `AJAMIX-MATHS-VALIDATION-REGEN-1`

| ID | Status | Output path |
| --- | --- | --- |
| `p1-maths-03` | Failed | `tools/image-pipeline/output/raw/style-b-p1-maths-03.png` |
| `p2-maths-24` | Generated | `tools/image-pipeline/output/raw/style-b-p2-maths-24.png` |
| `p6-maths-15` | Generated | `tools/image-pipeline/output/raw/style-b-p6-maths-15.png` |

## Failure detail

- `p1-maths-03`: Five attempts were generated using the entry's exact Prompt/Avoid text. Every attempt exceeded the required count. The closest draft, retained at the required output path, contains eleven stepping-stones rather than exactly ten. The output is therefore marked failed and must not be promoted.

All three required output paths contain non-empty 1536 x 1024 PNG files. These are draft assets only; no overlay compositor or promotion step was run.
