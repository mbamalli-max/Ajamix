# P1 content-quality tools

Run the within-module exact/normalized-duplicate gate against the edited module set:

```sh
node tools/p1-batch/check-within-module-redundancy.mjs --ids=p1-maths-02,p1-maths-03
```

Omit `--ids` to scan the complete content corpus. The check detects exact and normalized exact duplicates, plus simple adjacent containment. It is intentionally not a semantic-paraphrase detector; close paraphrases still require human content review.

To check a standalone batch array instead of the live content file:

```sh
node tools/p1-batch/check-within-module-redundancy.mjs --file=tools/p2-batch/p2-bsci-hybrid-new.json
```

## Decimal-aware sentence splitting

The sentence splitter treats a period between two digits (e.g. `3.45`, `0.5`, `2.06`) as part of a decimal number, not a sentence boundary. It protects that period with a control-character placeholder before splitting, then restores it afterward — so a sentence like `"A 3.45, lamba 5 tana matsayi na ɗari-ɗari."` stays a single sentence instead of fragmenting into `"A 3."` + `"45, lamba 5 tana..."`. Genuine sentence-ending periods, question marks, and exclamation marks are unaffected and still split normally, including immediately after a plain number (`"Akwai littattafai 10. Ka lissafa su duka."` still splits into two sentences).

Regression fixtures for this behavior — decimal numbers that must not split, plain sentences that must still split, and a genuine-duplicate fixture that must still be caught — live in `tools/p1-batch/test-redundancy-splitter.mjs`:

```sh
node tools/p1-batch/test-redundancy-splitter.mjs
```

Run this after any change to the splitter or the redundancy logic.

## Known limitations

- **Not a semantic-paraphrase detector.** The checker only catches exact/normalized-exact duplicates and simple adjacent containment. Two sentences that say the same thing in different words will not be flagged — model or human content review is still required to catch close paraphrases.
- **Abbreviations are not specially handled.** A period after an abbreviation (if any appear in future content) will still be treated as a sentence boundary; this has not been a demonstrated defect against current content, so no placeholder logic was added for it. Revisit if abbreviation-heavy content is introduced.
- **Punctuation followed by closing quotes/brackets is not specially handled.** Not currently a demonstrated defect against existing content; the same caution applies if quoted dialogue or bracketed asides become common.
