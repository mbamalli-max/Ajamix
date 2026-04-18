# Content Review Notes

Long-form Hausa prose for V01–V10 was generated into Ajami with `romanToAjami()` from `app/app.js`.
Most running prose looks mechanically consistent, but the following terms should get human Ajami review before publication:

| Hausa term | Generated Ajami | Note |
|---|---|---|
| VAT | Vَت | Acronym ne; fassarar Ajami tana bukatar daidaitacciyar ka'idar edita. |
| USSD | اُسسد | Takaitaccen banki ne; transliterator ya rubuta shi ta inji kuma yana bukatar dubawar mutum. |
| Mobile Money | مُبِلِي مُنِي | Kalmar aro ce; fitowarta a Ajami ta na inji kuma ya dace a duba house style. |
| 419 | 419 | Lambar ta tsaya yadda take; a duba ko ana so a bar ta haka ko a kara bayanin rubutu. |
| Yanar-gizo | يَنَر-غِزُو | Kalma ce mai alamar hyphen; an yi ta ta inji kuma ya dace a duba rubutunta. |
| Intanet | اِنتَنِت | Kalmar fasaha ce ta aro; a duba ko transliteration din ya dace da salon kungiyar. |
| 'Yancin | عيَنچِن | Farkon alamar apostrophe tana iya bayar da siffar Ajami mai bukatar duba na musamman. |

## Additional checks

- Review titles for V05, V08, and V09 first, because they contain the densest mix of acronyms and digital loanwords.
- If a house-style Ajami spelling already exists for any of the flagged terms, prefer that spelling over the raw transliteration output.

## Automated Ajami QA — 2026-04-17

- Ran `node app/tools/check-ajami-output.mjs` across `titleHa`, `summary.ha`, `gapTeaser.ha`, and `useTodayPrompt.ha` for `V01`–`V10`.
- No literal `?` or empty-output flags were found in the checked vocational fields.
- The verified `romanToAjami()` title output matched the existing `titleAjami` values for `V01`–`V10`, so the Sprint 10 QA pass kept those spellings and marked the ten modules with `ajami_validated: true`.
