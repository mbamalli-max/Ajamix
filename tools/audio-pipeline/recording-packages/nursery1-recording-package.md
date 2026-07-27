# AJAMIX Audio Recording Package — nursery1 (12 modules)

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

### `n1-maths-01` — Counting 1–5

**Target filename:** `audio/n1-maths-01.mp3`
**Title (Hausa):** Kirgawa 1–5

**Script to read:**

> [INTRO] Sannu da zuwa darasin lissafi na yau. Zamu koyi kirgawa daga ɗaya zuwa biyar. [MAIN] Muna fara da lamba ɗaya. Ka ce tare da ni: 'ɗaya'. Da kyau. Yanzu lamba biyu. Ka ce 'biyu'. Lamba uku. Ka ce 'uku'. Lamba huɗu. Ka ce 'huɗu'. Lamba biyar. Ka ce 'biyar'. Yanzu za mu kirga daga ɗaya zuwa biyar tare. Shirya? Fara: ɗaya, biyu, uku, huɗu, biyar. Da kyau! Ka ga yatsun hannunka? Nuna yatsa ɗaya – wannan 'ɗaya' ce. Nuna yatsu biyu – 'biyu'. Nuna uku – 'uku'. Nuna huɗu – 'huɗu'. Nuna biyar – 'biyar'. [PAUSE 1] Yanzu, ina so ka nuna mini yatsu huɗu. Ka yi shiru ka tunani. Zan tambaye ka. [PAUSE 1 question] Ci gaba. Ka kirga abubuwa a kusa da kai. [PAUSE 2] Yanzu ka saurara. Zan tambaye ka game da kirgawa. [PAUSE 2 question] [OUTRO] Aiki nagari! Yau ka koyi kirgawa ɗaya zuwa biyar. Ka maimaita a gida tare da iyayenka. Sai mun hadu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nuna yatsu nawa don lamba huɗu?" (correct answer: "huɗu"; options: ɗaya, huɗu, biyar)
- **[PAUSE 2]** — question shown to the learner: "Idan kana da kujeru biyu ka ƙara ɗaya yanzu kujera nawa?" (correct answer: "uku"; options: biyu, uku, huɗu)

---

### `n1-maths-02` — Writing 1–5

**Target filename:** `audio/n1-maths-02.mp3`
**Title (Hausa):** Rubuta 1–5

**Script to read:**

> [INTRO] Yau zamu rubuta lambobi 1-5. [MAIN] Lamba 1: sanda tsaye. Ka zana. Lamba 2: wuyan agwagwa. Ka zana. Lamba 3: kurvature biyu. Ka zana. Lamba 4: sanda da layi. Ka zana. Lamba 5: tudun kai da ciki. Ka zana. [PAUSE 1] Rubuta lamba 3 da kanka. [PAUSE 1 question] Ci gaba. Ka rubuta 1 zuwa 5 a jere. [PAUSE 2] Rubuta lamba 5. [PAUSE 2 question] [OUTRO] Aiki nagari! Yau ka koyi rubuta 1-5.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba nawa ake rubuta kamar sanda tsaye?" (correct answer: "ɗaya"; options: ɗaya, biyu, uku)
- **[PAUSE 2]** — question shown to the learner: "Rubuta lamba biyu kamar me?" (correct answer: "wuyan agwagwa"; options: wuyan agwagwa, kunne, tuta)

---

### `n1-maths-03` — Circle & Square

**Target filename:** `audio/n1-maths-03.mp3`
**Title (Hausa):** Zobe da Murabba'i

**Script to read:**

> [INTRO] Yau zamu koyi siffofi: zobe da murabba'i. [MAIN] Zobe yana da zagaye. Kamar ƙwallo. Maimaita: zobe. Murabba'i yana da gefe huɗu daidai. Kamar akwati. Maimaita: murabba'i. Ka duba hoton zobe – zagaye. Ka duba hoton murabba'i – gefe huɗu. [PAUSE 1] Yanzu, me ake kira siffa mai zagaye? [PAUSE 1 question] Ci gaba. Ka nuna mini zobe a gida. Ka nuna murabba'i. [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Da kyau! Yau ka koyi zobe da murabba'i.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira siffa mai zagaye?" (correct answer: "zobe"; options: zobe, murabba'i, alwatika)
- **[PAUSE 2]** — question shown to the learner: "Siffa mai gefe huɗu daidai ita ce?" (correct answer: "murabba'i"; options: zobe, murabba'i, alwatika)

---

### `n1-maths-04` — Big & Small

**Target filename:** `audio/n1-maths-04.mp3`
**Title (Hausa):** Babba da Ƙarami

**Script to read:**

> [INTRO] Yau zamu koyi babba da ƙarami. [MAIN] Babba – abu mai girma. Kamar teburi. Ka ce babba. Ƙarami – abu mai ƙarami. Kamar cokali. Ka ce ƙarami. Ka kalli hoto: wane ne babba? Wane ne ƙarami? [PAUSE 1] Tambaya: me ake kira abu mai girma? [PAUSE 1 question] Ci gaba. Yanzu ka nuna mini babba a gida. Yanzu ƙarami. [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Aiki nagari! Yau ka koyi bambanci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira abu mai girma?" (correct answer: "babba"; options: babba, ƙarami, doguwa)
- **[PAUSE 2]** — question shown to the learner: "Abin da girmansa ya fi wani ƙanƙani ana kiransa?" (correct answer: "ƙarami"; options: babba, ƙarami, gajere)

---

### `n1-maths-05` — Counting 6–10

**Target filename:** `audio/n1-maths-05.mp3`
**Title (Hausa):** Kirgawa 6–10

**Script to read:**

> [INTRO] Yau zamu kirga 6-10. [MAIN] Bayan biyar: shida, bakwai, takwas, tara, goma. Ka maimaita: 6,7,8,9,10. Ka kirga tare: shida, bakwai, takwas, tara, goma. [PAUSE 1] Lamba bayan takwas ita ce? [PAUSE 1 question] Ci gaba. Ka kirga daga ɗaya zuwa goma. [PAUSE 2] Shida da ɗaya nawa? [PAUSE 2 question] [OUTRO] Aiki nagari!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba bayan takwas ita ce?" (correct answer: "tara"; options: bakwai, takwas, tara)
- **[PAUSE 2]** — question shown to the learner: "Shida da ɗaya nawa?" (correct answer: "bakwai"; options: shida, bakwai, takwas)

---

### `n1-maths-06` — Writing 6–10

**Target filename:** `audio/n1-maths-06.mp3`
**Title (Hausa):** Rubuta 6–10

**Script to read:**

> [INTRO] Yau zamu rubuta 6-10. [MAIN] 6: lanƙwasa. Ka zana. 7: sanda mai ƙarami. Ka zana. 8: kumfa biyu. Ka zana. 9: sanda mai da'ira. Ka zana. 10: sanda da da'ira. Ka zana. [PAUSE 1] Rubuta lamba 8. [PAUSE 1 question] Ci gaba. Ka rubuta 6 zuwa 10. [PAUSE 2] Rubuta lamba 10. [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba nawa ake rubuta kamar kumfa biyu?" (correct answer: "takwas"; options: shida, bakwai, takwas)
- **[PAUSE 2]** — question shown to the learner: "Rubuta lamba goma kamar?" (correct answer: "sanda da da'ira"; options: sanda da da'ira, 10, 11)

---

### `n1-maths-07` — Triangle & Rectangle

**Target filename:** `audio/n1-maths-07.mp3`
**Title (Hausa):** Alwatika da Madaidaici

**Script to read:**

> [INTRO] Yau zamu koyi alwatika da madaidaici. [MAIN] Alwatika – gefe uku. Kamar rufin gida. Maimaita: alwatika. Madaidaici – gefe huɗu, biyu dogaye biyu gajere. Kamar ƙofa. Maimaita: madaidaici. [PAUSE 1] Siffa mai gefe uku ita ce? [PAUSE 1 question] Ci gaba. Ka nuna alwatika. Madaidaici. [PAUSE 2] Madaidaici yana da gefe nawa? [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Siffa mai gefe uku ita ce?" (correct answer: "alwatika"; options: zobe, murabba'i, alwatika)
- **[PAUSE 2]** — question shown to the learner: "Madaidaici yana da gefe nawa?" (correct answer: "huɗu"; options: uku, huɗu, biyar)

---

### `n1-maths-08` — Long & Short

**Target filename:** `audio/n1-maths-08.mp3`
**Title (Hausa):** Doguwa da Gajere

**Script to read:**

> [INTRO] Yau zamu koyi doguwa da gajere. [MAIN] Doguwa – abu mai tsayi. Kamar sanda. Gajere – abu mai ɗan tsayi. Kamar cokali. Ka kalli hoto: wane ne doguwa? wane ne gajere? [PAUSE 1] Tambaya: me ake kira abu mai tsayi? [PAUSE 1 question] Ci gaba. Ka nuna doguwa a gida. Yanzu gajere. [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Aiki nagari!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira abu mai tsayi?" (correct answer: "doguwa"; options: doguwa, gajere, tsayi)
- **[PAUSE 2]** — question shown to the learner: "Abu mai ɗan tsayi ana kiransa?" (correct answer: "gajere"; options: doguwa, gajere, ƙarami)

---

### `n1-maths-09` — More & Less (1–5)

**Target filename:** `audio/n1-maths-09.mp3`
**Title (Hausa):** Yawa da Kaɗan (1–5)

**Script to read:**

> [INTRO] Yau zamu koyi yawa da kaɗan. [MAIN] Yawa – abubuwa da yawa. Kaɗan – abubuwa kaɗan. Ka kalli hoto: kwano biyar – yawa. Kwano biyu – kaɗan. Wanne ne yawa? Wanne ne kaɗan? [PAUSE 1] Tambaya: idan kana da kujeru uku, abokinka yana da kujera ɗaya, wane ne yawa? [PAUSE 1 question] Ci gaba. Ka nuna mini abubuwa da yawa a gida. Yanzu kaɗan. [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan kana da kujeru uku abokinka yana da ɗaya wane ne yawa?" (correct answer: "kai (kujeru uku)"; options: kai (kujeru uku), aboki, daidai)
- **[PAUSE 2]** — question shown to the learner: "Rukuni mai abubuwa kaɗan ana kiransa?" (correct answer: "kaɗan"; options: yawa, kaɗan, ƙarami)

---

### `n1-maths-10` — Inside & Outside

**Target filename:** `audio/n1-maths-10.mp3`
**Title (Hausa):** Ciki da Waje

**Script to read:**

> [INTRO] Yau zamu koyi ciki da waje. [MAIN] Ciki – a cikin abu. Waje – a wajen abu. Ka sanya hannu cikin akwati – ciki. Ka fitar da shi – waje. Ka gwada da kanka. [PAUSE 1] Tambaya: idan abin wasa yana cikin kwano, ina yake? [PAUSE 1 question] Ci gaba. Yanzu ka ce ina hannunka? Ciki ko waje? [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Aiki nagari!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan abin wasa yana cikin kwano ina yake?" (correct answer: "ciki"; options: ciki, waje, kan)
- **[PAUSE 2]** — question shown to the learner: "Idan ka fitar da hannu daga aljihu hannun yana?" (correct answer: "waje"; options: ciki, waje, ƙarƙashin)

---

### `n1-maths-11` — Patterns (ABAB)

**Target filename:** `audio/n1-maths-11.mp3`
**Title (Hausa):** Tsari ABAB

**Script to read:**

> [INTRO] Yau zamu koyi tsari ABAB. [MAIN] Tsari yana nufin abubuwa suna biyo juna. ABAB: A, B, A, B. Misali: ja, shuɗi, ja, shuɗi. Ka kalli hoto: zobe, murabba'i, zobe, murabba'i. Wane ne zai zo na gaba? [PAUSE 1] Tambaya: a jeri ja, shuɗi, ja, shuɗi, me zai biyo baya? [PAUSE 1 question] Ci gaba. Ka yi tsarin ABAB da kanka. [PAUSE 2] Tambaya ta biyu. [PAUSE 2 question] [OUTRO] Da kyau!

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A jeri ja shuɗi ja shuɗi me zai biyo baya?" (correct answer: "ja"; options: ja, shuɗi, zobe)
- **[PAUSE 2]** — question shown to the learner: "Idan tsari ABAB ne bayan B me zai zo?" (correct answer: "A"; options: A, B, C)

---

### `n1-maths-12` — Review 1–10

**Target filename:** `audio/n1-maths-12.mp3`
**Title (Hausa):** Maimaitawa 1–10

**Script to read:**

> [INTRO] Yau zamu maimaita duk darasin da muka yi. [MAIN] Ka kirga 1-10. Ka rubuta 5. Ka nuna zobe. Ka nuna babba. Ka ce tsari ABAB. [PAUSE 1] Tambaya: lamba nawa ne bayan bakwai? [PAUSE 1 question] Ci gaba. Ka nuna madaidaici. Ka ce gajere. [PAUSE 2] Tambaya ta ƙarshe: me ake kira siffa mai gefe uku? [PAUSE 2 question] [OUTRO] Aiki nagari! Ka kammala Nursery 1.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba nawa ne bayan bakwai?" (correct answer: "takwas"; options: shida, takwas, tara)
- **[PAUSE 2]** — question shown to the learner: "Me ake kira siffa mai gefe uku?" (correct answer: "alwatika"; options: zobe, murabba'i, alwatika)

---
