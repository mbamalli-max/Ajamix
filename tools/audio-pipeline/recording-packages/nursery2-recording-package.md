# AJAMIX Audio Recording Package — nursery2 (12 modules)

**Technical spec:** MP3, 64kbps, mono. Target duration 3–5 minutes per module — no hard
per-module target beyond this range; let the script's natural spoken length determine it.

**Markers:** `[INTRO]`, `[MAIN]`, `[PAUSE N]`, `[OUTRO]` are delivery cues for where to pause
naturally — they are not spoken aloud. At each `[PAUSE N]` marker, the listed question is where the
app will pause playback and show an interactive quiz question to the learner; the question/answer
options below are for the reader's context only (so pacing and tone can anticipate the pause), not
text to read aloud.

**Pause timing note:** the app triggers each pause based on a timestamp (`pauseAtMs`) that is
currently a placeholder estimate from content authoring, not measured from real narration. After this
module is recorded, the actual playback time of each `[PAUSE N]` moment in the final audio must be
measured and reconciled back into `content.json` — a separate step after recording, not something the
reader needs to worry about.

---

### `n2-maths-01` — Counting 1–15

**Target filename:** `audio/n2-maths-01.mp3`
**Title (Hausa):** Kirgawa 1–15

**Script to read:**

> [INTRO] Yau zamu kirga 1-15. [MAIN] Bayan goma: sha ɗaya, sha biyu, sha uku, sha huɗu, sha biyar. Muna kirga tare: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15. Ka maimaita. [PAUSE 1] Tambaya: lamba nawa ce bayan sha uku? [PAUSE 1 question] Ci gaba. Ka kirga da kanka. [PAUSE 2] Tambaya: sha biyar da ɗaya? [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba nawa ce bayan sha uku?" (correct answer: "sha huɗu"; options: sha biyu, sha uku, sha huɗu)
- **[PAUSE 2]** — question shown to the learner: "Sha biyar da ɗaya nawa?" (correct answer: "sha shida"; options: sha huɗu, sha biyar, sha shida)

---

### `n2-maths-02` — Writing 1–15

**Target filename:** `audio/n2-maths-02.mp3`
**Title (Hausa):** Rubuta 1–15

**Script to read:**

> [INTRO] Yau zamu rubuta 1-15. [MAIN] 1-10 kun sani. 11,12,13,14,15. Ka rubuta tare: 11,12,13,14,15. [PAUSE 1] Tambaya: lamba nawa ce 14 a Hausa? [PAUSE 1 question] Ci gaba. Ka rubuta 10 zuwa 15. [PAUSE 2] Tambaya: rubuta sha biyu. [PAUSE 2 question] [OUTRO] Aiki nagari!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba nawa ce 14 a Hausa?" (correct answer: "sha huɗu"; options: sha uku, sha huɗu, sha biyar)
- **[PAUSE 2]** — question shown to the learner: "Rubuta sha biyu a lamba?" (correct answer: "12"; options: 11, 12, 13)

---

### `n2-maths-03` — Heavy & Light

**Target filename:** `audio/n2-maths-03.mp3`
**Title (Hausa):** Nauyi da Sauki

**Script to read:**

> [INTRO] Yau zamu koyi nauyi da sauki. [MAIN] Nauyi – abu mai nauyi. Kamar dutse. Sauki – abu mai sauƙi. Kamar gashin tsuntsu. Ka kalli hoto. [PAUSE 1] Tambaya: me ake kira abu mai nauyi? [PAUSE 1 question] Ci gaba. Ka nuna abu mai nauyi a gida. Sauki? [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira abu mai nauyi?" (correct answer: "nauyi"; options: nauyi, sauki, doguwa)
- **[PAUSE 2]** — question shown to the learner: "Gashin tsuntsu yana da?" (correct answer: "sauki"; options: nauyi, sauki, ƙarami)

---

### `n2-maths-04` — Position: On/Under

**Target filename:** `audio/n2-maths-04.mp3`
**Title (Hausa):** Kan da Ƙarƙashin

**Script to read:**

> [INTRO] Yau zamu koyi kan da ƙarƙashin. [MAIN] Kan – a saman. Ƙarƙashin – a ƙasa. Ka sanya hannu kan teburi – kan. Ka sanya shi ƙarƙashin teburi – ƙarƙashin. [PAUSE 1] Tambaya: idan abin wasa yana ƙarƙashin kujera, ina yake? [PAUSE 1 question] Ci gaba. Ka nuna kan da ƙarƙashin da kanka. [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Aiki nagari!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan abin wasa yana ƙarƙashin kujera ina yake?" (correct answer: "ƙarƙashin"; options: kan, ƙarƙashin, ciki)
- **[PAUSE 2]** — question shown to the learner: "Sanya hannu kan teburi – wannan shi ne?" (correct answer: "kan"; options: kan, ƙarƙashin, waje)

---

### `n2-maths-05` — Counting 1–20

**Target filename:** `audio/n2-maths-05.mp3`
**Title (Hausa):** Kirgawa 1–20

**Script to read:**

> [INTRO] Yau zamu kirga 1-20. [MAIN] Bayan 15: 16,17,18,19,20. Muna kirga: 1,2,3,...,20. Ka maimaita. [PAUSE 1] Tambaya: lamba nawa ce bayan sha bakwai? [PAUSE 1 question] Ci gaba. Ka kirga 10-20. [PAUSE 2] Tambaya: ashirin ya rage ɗaya? [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba nawa ce bayan sha bakwai?" (correct answer: "sha takwas"; options: sha shida, sha bakwai, sha takwas)
- **[PAUSE 2]** — question shown to the learner: "Ashirin ya rage ɗaya nawa?" (correct answer: "sha tara"; options: sha tara, ashirin, sha takwas)

---

### `n2-maths-06` — Addition 1–5 (objects)

**Target filename:** `audio/n2-maths-06.mp3`
**Title (Hausa):** Ƙari 1–5 (abubuwa)

**Script to read:**

> [INTRO] Yau zamu koyi ƙari. [MAIN] Ƙari – haɗa tare. Misali: 2 'ya'yan goro + 3 = 5. Ka ce 2+3=5. Ka gwada da kanka: 1+1=2. [PAUSE 1] Tambaya: 3+2 nawa? [PAUSE 1 question] Ci gaba. 2+2=4. [PAUSE 2] Tambaya: 1+3 nawa? [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "3+2 nawa?" (correct answer: "biyar"; options: huɗu, biyar, shida)
- **[PAUSE 2]** — question shown to the learner: "1+3 nawa?" (correct answer: "huɗu"; options: uku, huɗu, biyar)

---

### `n2-maths-07` — Subtraction 1–5 (take away)

**Target filename:** `audio/n2-maths-07.mp3`
**Title (Hausa):** Ragewa 1–5 (cirewa)

**Script to read:**

> [INTRO] Yau zamu koyi ragewa. [MAIN] Ragewa – cire. Misali: 5 'ya'yan goro, ka cire 2, saura 3. Ka ce 5-2=3. Ka gwada: 4-1=3. [PAUSE 1] Tambaya: 3-1 nawa? [PAUSE 1 question] Ci gaba. 5-3=2. [PAUSE 2] Tambaya: 4-2 nawa? [PAUSE 2 question] [OUTRO] Aiki nagari!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "3-1 nawa?" (correct answer: "biyu"; options: ɗaya, biyu, uku)
- **[PAUSE 2]** — question shown to the learner: "4-2 nawa?" (correct answer: "biyu"; options: ɗaya, biyu, uku)

---

### `n2-maths-08` — Sorting by colour

**Target filename:** `audio/n2-maths-08.mp3`
**Title (Hausa):** Rarraba da launi

**Script to read:**

> [INTRO] Yau zamu rarraba abubuwa da launi. [MAIN] Ka ɗauki ja, ja, shuɗi, shuɗi. Sanya ja tare, shuɗi tare. Wannan rarraba ce. Ka gwada da kanka. [PAUSE 1] Tambaya: idan kana da ja, shuɗi, ja, me zaka sanya tare? [PAUSE 1 question] Ci gaba. Ka rarraba abubuwa a gida. [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan kana da ja shuɗi ja me zaka sanya tare?" (correct answer: "ja da ja"; options: ja da ja, shuɗi da shuɗi, duka)
- **[PAUSE 2]** — question shown to the learner: "Ka rarraba: ja ja shuɗi – wanne rukuni yana da biyu?" (correct answer: "ja"; options: ja, shuɗi, daidai)

---

### `n2-maths-09` — Full & Empty

**Target filename:** `audio/n2-maths-09.mp3`
**Title (Hausa):** Cikawa da Fanko

**Script to read:**

> [INTRO] Yau zamu koyi cikawa da fanko. [MAIN] Cikawa – abubuwa sun cika. Fanko – babu komai. Ka kalli hoto: wannan kwano cikawa, wannan fanko. [PAUSE 1] Tambaya: kwano da ruwa – cikawa ko fanko? [PAUSE 1 question] Ci gaba. Ka nuna fanko a gida. [PAUSE 2] Tambaya: me ake kira kwano marar komai? [PAUSE 2 question] [OUTRO] Aiki nagari!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kwano da ruwa – cikawa ko fanko?" (correct answer: "cikawa"; options: cikawa, fanko, daidai)
- **[PAUSE 2]** — question shown to the learner: "Me ake kira kwano marar komai?" (correct answer: "fanko"; options: cikawa, fanko, kaɗan)

---

### `n2-maths-10` — Number patterns (1 more)

**Target filename:** `audio/n2-maths-10.mp3`
**Title (Hausa):** Tsarin lambobi (ƙari 1)

**Script to read:**

> [INTRO] Yau zamu koyi tsarin lambobi inda kowace ta ƙara ɗaya. [MAIN] Misali: 1,2,3,4,5. Na gaba bayan 5 ita ce 6. Ka ci gaba: 6,7,8,9,10. [PAUSE 1] Tambaya: bayan 8 ita ce? [PAUSE 1 question] Ci gaba. Ka ce jeri daga 10 zuwa 15. [PAUSE 2] Tambaya: bayan 12 ita ce? [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Bayan 8 ita ce?" (correct answer: "9"; options: 7, 8, 9)
- **[PAUSE 2]** — question shown to the learner: "Bayan 12 ita ce?" (correct answer: "13"; options: 11, 12, 13)

---

### `n2-maths-11` — Simple word problems

**Target filename:** `audio/n2-maths-11.mp3`
**Title (Hausa):** Kalmomin ƙari da ragewa

**Script to read:**

> [INTRO] Yau zamu yi tambayoyi na ƙari da ragewa. [MAIN] Misali: kujeru 2, ƙara 1, nawa? 3. 'Ya'yan goro 4, cire 1, saura? 3. [PAUSE 1] Tambaya: Kana da alkalami 3, ka sami 2, nawa? [PAUSE 1 question] Ci gaba. Kana da kwano 5, ka bada 2, saura? [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Aiki nagari!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kana da alkalami 3 ka sami 2 nawa?" (correct answer: "5"; options: 4, 5, 6)
- **[PAUSE 2]** — question shown to the learner: "Kana da kwano 5 ka bada 2 saura?" (correct answer: "3"; options: 2, 3, 4)

---

### `n2-maths-12` — Review & celebration

**Target filename:** `audio/n2-maths-12.mp3`
**Title (Hausa):** Maimaitawa da biki

**Script to read:**

> [INTRO] Yau zamu maimaita duk darasin Nursery 2. [MAIN] Ka kirga 1-20. Ka ce 5+3. Ka ce 7-2. Ka nuna cikawa. Ka ce tsarin lambobi bayan 10. [PAUSE 1] Tambaya: 8+2 nawa? [PAUSE 1 question] Ci gaba. Ka ce nauyi. Ka nuna kan. [PAUSE 2] Tambaya ta ƙarshe: 15-5 nawa? [PAUSE 2 question] [OUTRO] Taya murna! Ka kammala Nursery 2.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "8+2 nawa?" (correct answer: "10"; options: 9, 10, 11)
- **[PAUSE 2]** — question shown to the learner: "15-5 nawa?" (correct answer: "10"; options: 9, 10, 11)

---
