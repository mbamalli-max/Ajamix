# Updated Hausa Ajami Alphabet Guide (Corrected)

## Core Consonant Mapping (Hausa Ajami → Roman)

| Ajami | Roman | Sound | Hausa Example (Ajami → Roman) | Notes |
|---|---|---|---|---|
| ا | a / ∅ | vowel carrier | اِنَا → ina | |
| ب | b | b | بَا → ba | |
| ت | t | t | تَا → ta | |
| ث | s | s | ثَابِت → sabit (firm) | Rare, mostly Arabic loans. In some traditions = 'th' |
| ج | j | j | جَا → ja | |
| ح | h | h (strong) | حَا → ha | |
| خ | kh | kh | خَا → kha | Loanwords only |
| د | d | d | دَا → da | |
| ذ | z | z | ذَاكِر → zakir (remembering) | Rare, Arabic loans |
| ر | r | r | رَا → ra | |
| ز | z | z | زُوَا → zuwa | |
| س | s | s | سُنَا → suna | |
| ش | sh | sh | شَا → sha | |
| ص | s | s (emphatic) | صَا → sa | Emphatic, pronounced as plain s |
| ض | d | d (emphatic) | ضَا → da | Emphatic, pronounced as plain d |
| ط | t | t (emphatic) | طَا → ta | Emphatic, pronounced as plain t |
| ظ | z | z | ظَا → za | Emphatic, pronounced as plain z |
| ع | ' / a | glottal | عَا → a | |
| غ | g | g | غِيدَا → gida | **CORRECTED: Use غ for g, not گ** |
| ف | f | f | فَا → fa | |
| ق | ƙ | ejective k | قَا → ƙa | |
| ك | k | k | كَسُوَا → kasuwa | |
| ل | l | l | لَا → la | |
| م | m | m | مُتُمْ → mutum | |
| ن | n | n | نَا → na | |
| ه | h | h | هَا → ha | |
| و | w / u | w / u | وَا → wa | Also vowel carrier for u/o |
| ي | y / i | y / i | يَا → ya | Also vowel carrier for i/e |

## Hausa-Specific Ajami Letters (Critical)

These represent non-Arabic Hausa sounds.

| Ajami | Roman | Sound | Hausa Example (Ajami → Roman) | Notes |
|---|---|---|---|---|
| پ | p | p | پَا → pa | |
| ڭ | ng | ŋ | ڭَا → nga | |
| ٻ | ɓ | implosive b | ٻَا → ɓa | |
| د (with dot below) | ɗ | implosive d | دَا → ɗa | Often modified د |
| ڪ | ƙ | ejective k | ڪَا → ƙa | |
| ڟ | ts | ts (ejective affricate) | ڟَدَا → tsada | ظ with three dots — U+069F |
| غ | g | g | تَغَ → taga (window) | **CORRECTED: غ not گ** |

## Vowel System

Hausa has 5 vowels (a, e, i, o, u), each short and long.

| Vowel | Short Form | Example | Long Form | Example |
|---|---|---|---|---|
| a | ◌َ (fatha) | بَ (ba) | ◌َا | بَا (baa) |
| i | ◌ِ (kasra) | بِ (bi) | ◌ِي | بِى (bii) |
| u | ◌ُ (damma) | بُ (bu) | ◌ُو | بُو (buu) |
| e | ◌ٜ or ◌ٖ | بٜ (be) | ◌ٜى or ◌َاى | بٜى (bee) |
| o | ◌ٛ | بٛ (bo) | ◌ٛو | بٛو (boo) |

**Key Insight:** e/i and o/u share symbols; pronunciation determined by context.

## Corrected Examples (Real Hausa Words)

| Ajami | Roman | Meaning | Notes |
|---|---|---|---|
| تَغَ | taga | window | Corrected: غ = g, not گ |
| أَلَسَ | Alasa | Tuesday | Corrected: س = s, not ث |
| غِيدَا | gida | home | |
| رُوَا | ruwa | water | |
| مُتُمْ | mutum | person | |
| كَسُوَا | kasuwa | market | |
| سُنَا | suna | name / they | |
| يَا زُو | ya zo | he came | |
| ڟَدَا | tsada | expensive | Added with ڟ |

## Full Sentence Examples

| Ajami | Roman | Meaning |
|---|---|---|
| اِنَا زُوَا كَسُوَا | Ina zuwa kasuwa | I am going to the market |
| مُتُمْ يَا شَا رُوَا | Mutum ya sha ruwa | A person drank water |
| يَا زُو غِيدَا | Ya zo gida | He came home |
| سُنَا نَا زُوَا | Suna na zuwa | They are coming |
| ڟَدَا تَغَ | Tsada taga | The window is expensive |

## Rules for System Design

1. **No direct Arabic reading** – Same letters ≠ same language
2. **Vowels require reconstruction** – Context determines e/i and o/u
3. **Normalize variants:** ك/ق → k, ص/س → s, ث/س → s (except Arabic loans)
4. **Hausa grammar governs meaning** – Not Arabic syntax
5. **Use غ for g, never use گ** (گ is not standard in Hausa Ajami)
6. **Use ڟ for ts** (ظ with three dots, U+069F) to avoid confusion with ط

## Minimal Deterministic Mapping Layer (For Ajamix)

**Base consonants:**
ب → b, ت → t, ج → j, د → d, ر → r, ز → z, س → s, ش → sh, ف → f, ك → k, ل → l, م → m, ن → n, و → w/u, ي → y/i, ا → a, **غ → g**

**Hausa-specific:**
پ → p, ڭ → ng, ٻ → ɓ, ɗ → ɗ, ڪ → ƙ, **ڟ → ts**
