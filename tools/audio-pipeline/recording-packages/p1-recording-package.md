# AJAMIX Audio Recording Package — p1 (54 modules)

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

### `p1-maths-01` — Counting 1–10

**Target filename:** `audio/p1-maths-01.mp3`
**Title (Hausa):** Kirgawa 1–10

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kirgawa 1–10. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Kirgawa daga 1 zuwa 10 yana taimaka mana mu gane yadda lambobi suke bi jere ba tare da kuskure ba. Ka fara daga 1, ka bi lambobin ɗaya bayan ɗaya har zuwa 10, kuma ka kula kada ka tsallake wata lamba ko ka maimaita lamba sau biyu. Za ka iya amfani da yatsu, litattafai, fensir, ko kujeru domin ka haɗa abin da kake faɗa da abin da kake gani a zahiri, kuma hakan yana sa koyo ya fi daɗi. A gida ko a makaranta, ka kirga mutane, kujeru, faranti, ko fensir domin ka ƙarfafa abin da ka koya yau. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Nuna yatsu nawa don lamba biyar? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi lambobin da babbar murya, sannan ka sake kirgawa a hankali a zuciyarka domin ka tabbatar ka tuna jeren sosai. Sanin yadda ake kirgawa da kyau yana taimaka maka a ƙari, ragewa, da sauran darussan lissafi da za ka koya daga baya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Kujeru bakwai, ka ƙara ɗaya – nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita kirgawa kullum, za ka iya gano lambobi cikin sauri kuma ka yi amfani da su cikin tabbaci. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nuna yatsu nawa don lamba biyar?" (correct answer: "biyar"; options: ɗaya, biyar, goma)
- **[PAUSE 2]** — question shown to the learner: "Kujeru bakwai, ka ƙara ɗaya – nawa?" (correct answer: "takwas"; options: bakwai, takwas, tara)

---

### `p1-bsci-01` — The Senses – Sight

**Target filename:** `audio/p1-bsci-01.mp3`
**Title (Hausa):** Hankali – Gani

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Hankali – Gani. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Allah ya ba mu hankula domin mu san abin da ke faruwa a jikinmu da kuma a wajenmu. A wannan darasi, muna koyo game da gani. Muna amfani da idanu domin gani. Da idanu muke ganin littafi, fensir, allo, malamai, da sauran abubuwan da ke kewaye da mu. Idan ɗaki ya yi duhu, gani yana wahala, shi ya sa haske yake da muhimmanci wajen karatu da tafiya lafiya. Kar mu sanya hannu marar tsarki a ido, kuma kar mu kalli rana kai tsaye. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Me ake amfani da shi don gani? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi wasu misalai daga gida ko aji da wannan hankali yake taimaka maka ka gane. Idan muka san aikin wannan hankali, za mu iya kula da shi da kyau kuma mu yi amfani da shi yadda ya dace. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Me zai faru idan ka rufe idanunka? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Ka ci gaba da lura da abubuwan da ke kewaye da kai domin ka fi fahimtar aikin hankulan da Allah ya ba mu. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake amfani da shi don gani?" (correct answer: "idanu"; options: kunnuwa, idanu, hannu)
- **[PAUSE 2]** — question shown to the learner: "Me zai faru idan ka rufe idanunka?" (correct answer: "ba za ka ga komai ba"; options: za ka gani sosai, ba za ka ji komai ba, ba za ka ga komai ba)

---

### `p1-socs-01` — Meaning of Social Studies

**Target filename:** `audio/p1-socs-01.mp3`
**Title (Hausa):** Ma'anar Social Studies

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Ma'anar Social Studies. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Social Studies shine nazarin mutum da muhallinsa, wato yadda mutum yake rayuwa tare da sauran mutane da abubuwan da ke kewaye da shi. Muhallin mutum ya haɗa da mutane, dabbobi, gidaje, makarantu, asibitoci, hanyoyi, bishiyoyi, da sauran abubuwan da yake gani a yau da kullum. Ta hanyar wannan darasi, muna koyon yadda mutane suke magance matsaloli kamar yunwa, sanyi, rashin lafiya, da sauran buƙatu. Ka tuna cewa Social Studies ba nazarin mutum kaɗai ba ne, har ma da abin da ke tasiri a rayuwarsa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Idan mutum yana jin yunwa, me zai yi? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka kalli abubuwan da ke kewaye da kai ka faɗi waɗanda suke cikin muhallin mutum. Wannan darasi yana taimaka mana fahimtar rayuwa, zamantakewa, da yadda ake hulɗa cikin al'umma. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Mene ne Social Studies? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan fahimta, za ka ga dalilin da ya sa ake koyon Social Studies tun daga ƙanana. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan mutum yana jin yunwa, me zai yi?" (correct answer: "neman abinci"; options: yayi barci, neman abinci, yayi wasa)
- **[PAUSE 2]** — question shown to the learner: "Mene ne Social Studies?" (correct answer: "nazarin mutum da muhallinsa"; options: nazarin taurari, nazarin mutum da muhallinsa, nazarin dabbobi)

---

### `p1-maths-02` — Counting 11–20

**Target filename:** `audio/p1-maths-02.mp3`
**Title (Hausa):** Kirgawa 11–20

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kirgawa 11–20. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Kirgawa daga 11 zuwa 20 yana taimaka mana mu gane yadda lambobi suke bi jere ba tare da kuskure ba. Ka fara daga 11, ka bi lambobin ɗaya bayan ɗaya har zuwa 20, kuma ka kula kada ka tsallake wata lamba ko ka maimaita lamba sau biyu. Za ka iya amfani da litattafai, kujeru, ko almajirai domin ka haɗa abin da kake faɗa da abin da kake gani a zahiri, kuma hakan yana sa koyo ya fi daɗi. A gida ko a makaranta, ka kirga mutane, kujeru, faranti, ko fensir domin ka ƙarfafa abin da ka koya yau. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Lamba nawa ce bayan sha biyar? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi lambobin da babbar murya, sannan ka sake kirgawa a hankali a zuciyarka domin ka tabbatar ka tuna jeren sosai. Sanin yadda ake kirgawa da kyau yana taimaka maka a ƙari, ragewa, da sauran darussan lissafi da za ka koya daga baya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Idan kana da litattafai 12, ka ba da 2 – saura? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita kirgawa kullum, za ka iya gano lambobi cikin sauri kuma ka yi amfani da su cikin tabbaci. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba nawa ce bayan sha biyar?" (correct answer: "sha shida"; options: sha biyar, sha shida, sha bakwai)
- **[PAUSE 2]** — question shown to the learner: "Idan kana da litattafai 12, ka ba da 2 – saura?" (correct answer: "goma"; options: 10, 11, 12)

---

### `p1-bsci-02` — The Senses – Hearing

**Target filename:** `audio/p1-bsci-02.mp3`
**Title (Hausa):** Hankali – Ji

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Hankali – Ji. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Allah ya ba mu hankula domin mu san abin da ke faruwa a jikinmu da kuma a wajenmu. A wannan darasi, muna koyo game da ji. Muna amfani da kunnuwa domin ji. Da kunnuwa muke jin muryar malami, sautin motoci, kukan jariri, da waƙar tsuntsaye. Idan muka rufe kunnuwanmu, ba za mu ji sauti da kyau ba, shi ya sa dole mu kula da su sosai. Kar mu saka abu mai kaifi a kunne, kuma mu saurari sauti a hankali ba tare da cutar da kunne ba. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Me ake amfani da shi don ji? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi wasu misalai daga gida ko aji da wannan hankali yake taimaka maka ka gane. Idan muka san aikin wannan hankali, za mu iya kula da shi da kyau kuma mu yi amfani da shi yadda ya dace. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Me zai faru idan ka rufe kunnuwanka? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Ka ci gaba da lura da abubuwan da ke kewaye da kai domin ka fi fahimtar aikin hankulan da Allah ya ba mu. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake amfani da shi don ji?" (correct answer: "kunnuwa"; options: idanu, kunnuwa, hanc)
- **[PAUSE 2]** — question shown to the learner: "Me zai faru idan ka rufe kunnuwanka?" (correct answer: "ba za ka ji komai ba"; options: za ka ji sosai, ba za ka ga komai ba, ba za ka ji komai ba)

---

### `p1-socs-02` — How Man Solved His Problems

**Target filename:** `audio/p1-socs-02.mp3`
**Title (Hausa):** Yadda Mutum Ya Magance Matasalolinsa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Yadda Mutum Ya Magance Matasalolinsa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Mutum yana da buƙatu da matsaloli a rayuwa, kuma yana neman hanyoyin magance su domin ya zauna lafiya. Idan mutum yana jin yunwa, yana neman abinci. Idan yana jin sanyi, yana neman sutura. Idan yana rashin lafiya, yana zuwa asibiti domin samun magani. Haka nan idan akwai wata wahala, mutum yana amfani da tunani, taimako, da haɗin kai domin ya samu mafita. Ka tuna cewa matsala tana da mafita idan an yi tunani a hankali kuma an nemi taimakon da ya dace. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Idan mutum yana da sanyi, me zai yi? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi tunani a kan matsala kamar rashin ruwa ko yunwa, sannan ka faɗi abin da ya dace mutum ya yi domin ya magance ta. Wannan darasi yana koya mana mu kasance masu tunani da neman mafita maimakon yanke ƙauna. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Idan mutum yana da matsala, me ya kamata ya yi? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka ƙara fahimtar yadda rayuwar mutane ke tafiya a cikin al'umma. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan mutum yana da sanyi, me zai yi?" (correct answer: "neman sutura"; options: fita waje, neman sutura, yayi barci)
- **[PAUSE 2]** — question shown to the learner: "Idan mutum yana da matsala, me ya kamata ya yi?" (correct answer: "neman mafita"; options: yin kuka, neman mafita, gudu)

---

### `p1-maths-03` — Counting 21–30

**Target filename:** `audio/p1-maths-03.mp3`
**Title (Hausa):** Kirgawa 21–30

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kirgawa 21–30. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Kirgawa daga 21 zuwa 30 yana taimaka mana mu gane yadda lambobi suke bi jere ba tare da kuskure ba. Ka fara daga 21, ka bi lambobin ɗaya bayan ɗaya har zuwa 30, kuma ka kula kada ka tsallake wata lamba ko ka maimaita lamba sau biyu. Za ka iya amfani da fensir, faranti, ko matakai domin ka haɗa abin da kake faɗa da abin da kake gani a zahiri, kuma hakan yana sa koyo ya fi daɗi. A gida ko a makaranta, ka kirga mutane, kujeru, faranti, ko fensir domin ka ƙarfafa abin da ka koya yau. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wace lamba ce tsakanin 25 da 27? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi lambobin da babbar murya, sannan ka sake kirgawa a hankali a zuciyarka domin ka tabbatar ka tuna jeren sosai. Sanin yadda ake kirgawa da kyau yana taimaka maka a ƙari, ragewa, da sauran darussan lissafi da za ka koya daga baya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Kirga daga 21 zuwa 30 – lamba ta ƙarshe? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita kirgawa kullum, za ka iya gano lambobi cikin sauri kuma ka yi amfani da su cikin tabbaci. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace lamba ce tsakanin 25 da 27?" (correct answer: "26"; options: 25, 26, 27)
- **[PAUSE 2]** — question shown to the learner: "Kirga daga 21 zuwa 30 – lamba ta ƙarshe?" (correct answer: "30"; options: 29, 30, 31)

---

### `p1-bsci-03` — The Senses – Touch

**Target filename:** `audio/p1-bsci-03.mp3`
**Title (Hausa):** Hankali – Taɓa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Hankali – Taɓa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Allah ya ba mu hankula domin mu san abin da ke faruwa a jikinmu da kuma a wajenmu. A wannan darasi, muna koyo game da taɓa. Muna amfani da fata da hannu domin taɓa. Da fata da hannu muke gane abu mai taushi, mai kauri, mai sanyi, ko mai zafi. Idan muka taɓa auduga za mu ji laushi, amma idan muka taɓa dutse za mu ji taurin sa. Wuta kuma tana iya zama mai zafi sosai. Dole ne mu yi hattara kada mu taɓa wuta ko wani abu mai zafi ba tare da kulawa ba. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Me ake amfani da shi don taɓa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi wasu misalai daga gida ko aji da wannan hankali yake taimaka maka ka gane. Idan muka san aikin wannan hankali, za mu iya kula da shi da kyau kuma mu yi amfani da shi yadda ya dace. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wanne ne mai zafi? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Ka ci gaba da lura da abubuwan da ke kewaye da kai domin ka fi fahimtar aikin hankulan da Allah ya ba mu. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake amfani da shi don taɓa?" (correct answer: "hannu"; options: idanu, kunnuwa, hannu)
- **[PAUSE 2]** — question shown to the learner: "Wanne ne mai zafi?" (correct answer: "wuta"; options: wuta, ruwa, iska)

---

### `p1-socs-03` — The Family – Members and Roles

**Target filename:** `audio/p1-socs-03.mp3`
**Title (Hausa):** Iyali – Membobi da Ayyukansu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Iyali – Membobi da Ayyukansu. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Iyali rukunin mutane ne da suke rayuwa tare a gida ɗaya, kuma kowane memba yana da rawar da yake takawa. A iyali akwai uba, uwa, yara, da wani lokaci kaka ko kakanni. Uba kan shugabanci iyali, uwa tana kula da gida da yara, yara kuma suna taimakawa iyaye. Idan kowa ya yi aikin da ya dace, gida yana tafiya cikin zaman lafiya da tsari mai kyau. Ka tuna cewa kowane memba a iyali yana da muhimmanci ko da aikinsa ya bambanta da na wani. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane ne shugaban iyali? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi sunayen membobin iyalinka da kuma abin da kowanne yake yi a gida. Sanin membobin iyali da ayyukansu yana taimaka mana mu girmama su kuma mu ba su haɗin kai. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane aiki yake yi a gida? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi fahimtar yadda iyali ke aiki tare. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane ne shugaban iyali?" (correct answer: "uba"; options: uba, yaro, kaka)
- **[PAUSE 2]** — question shown to the learner: "Wane aiki yake yi a gida?" (correct answer: "aikin gida"; options: wasa, aikin gida, karatu)

---

### `p1-maths-04` — Counting 31–40

**Target filename:** `audio/p1-maths-04.mp3`
**Title (Hausa):** Kirgawa 31–40

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kirgawa 31–40. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Kirgawa daga 31 zuwa 40 yana taimaka mana mu gane yadda lambobi suke bi jere ba tare da kuskure ba. Ka fara daga 31, ka bi lambobin ɗaya bayan ɗaya har zuwa 40, kuma ka kula kada ka tsallake wata lamba ko ka maimaita lamba sau biyu. Za ka iya amfani da kujeru, littattafai, ko adadin yara domin ka haɗa abin da kake faɗa da abin da kake gani a zahiri, kuma hakan yana sa koyo ya fi daɗi. A gida ko a makaranta, ka kirga mutane, kujeru, faranti, ko fensir domin ka ƙarfafa abin da ka koya yau. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Lamba 0 tana nufin me? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi lambobin da babbar murya, sannan ka sake kirgawa a hankali a zuciyarka domin ka tabbatar ka tuna jeren sosai. Sanin yadda ake kirgawa da kyau yana taimaka maka a ƙari, ragewa, da sauran darussan lissafi da za ka koya daga baya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Bayan 39 ita ce? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita kirgawa kullum, za ka iya gano lambobi cikin sauri kuma ka yi amfani da su cikin tabbaci. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba 0 tana nufin me?" (correct answer: "babu komai"; options: ɗaya, biyu, babu komai)
- **[PAUSE 2]** — question shown to the learner: "Bayan 39 ita ce?" (correct answer: "40"; options: 38, 39, 40)

---

### `p1-bsci-04` — The Senses – Smell and Taste

**Target filename:** `audio/p1-bsci-04.mp3`
**Title (Hausa):** Hankali – Jin Ƙamshi da Dandano

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Hankali – Jin Ƙamshi da Dandano. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Jin ƙamshi da dandano suna daga cikin hankulan da Allah ya ba mu domin mu bambanta warin abubuwa da ɗanɗanonsu. Muna jin ƙamshi da hancI, yayin da muke jin dandano da baki musamman harshe. Da su ne muke gane turaren wuta, ƙamshin abinci, ko ɗanɗanon sukari da gishiri. Abinci mai dadi yana sa mu gane ɗanɗano mai kyau, sannan wari mara kyau yana iya nuna mana cewa abu bai dace ba. Dole ne mu kiyaye tsaftar baki da hanci, kuma kada mu ci ko sha abin da ba mu sani ba ba tare da izini ba. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Me ake amfani da shi don jin ƙamshi? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka tuna da misalan da ka sani kamar ƙamshin sabulu, turaren abinci, ko ɗanɗanon sukari da lemon tsami. Sanin waɗannan hankula yana taimaka mana mu zabi abinci mai kyau kuma mu guji abin da ba shi da amfani ga jiki. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Me ake amfani da shi don dandano? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi gane bambanci tsakanin jin ƙamshi da kuma jin dandano. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake amfani da shi don jin ƙamshi?" (correct answer: "hanci"; options: idanu, hanci, baki)
- **[PAUSE 2]** — question shown to the learner: "Me ake amfani da shi don dandano?" (correct answer: "baki"; options: idanu, kunnuwa, baki)

---

### `p1-socs-04` — Qualities of a Good Family

**Target filename:** `audio/p1-socs-04.mp3`
**Title (Hausa):** Halayen Iyali Nagari

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Halayen Iyali Nagari. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Iyali nagari yana da halaye masu kyau kamar soyayya, taimakon juna, girmamawa, da kula da juna. Idan iyali suna son juna, suna sauraran juna, kuma suna taimakon juna, gida yana zama wurin kwanciyar hankali. Rikici, kishi, da rashin kulawa sukan kawo matsala a gida, don haka ya kamata mu guje musu. Ka tuna cewa taimakawa juna da nuna girmamawa suna daga cikin ginshiƙan iyali nagari. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane hali ne mai kyau a cikin iyali? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi wasu halaye masu kyau da kake gani ko kake son gani a iyali. Wannan darasi yana koya mana cewa kyakkyawan hali yana gina iyali mai ƙarfi da farin ciki. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Idan muna son juna, me ya kamata mu yi? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan fahimta, za ka iya ba da gudummawa wajen zaman lafiya a gida. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane hali ne mai kyau a cikin iyali?" (correct answer: "soyayya"; options: soyayya, rikici, kishi)
- **[PAUSE 2]** — question shown to the learner: "Idan muna son juna, me ya kamata mu yi?" (correct answer: "taimakawa juna"; options: yin fada, taimakawa juna, yin shiru)

---

### `p1-maths-05` — Counting 41–50

**Target filename:** `audio/p1-maths-05.mp3`
**Title (Hausa):** Kirgawa 41–50

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kirgawa 41–50. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Kirgawa daga 41 zuwa 50 yana taimaka mana mu gane yadda lambobi suke bi jere ba tare da kuskure ba. Ka fara daga 41, ka bi lambobin ɗaya bayan ɗaya har zuwa 50, kuma ka kula kada ka tsallake wata lamba ko ka maimaita lamba sau biyu. Za ka iya amfani da abubuwan aji, takardu, ko kayan wasa domin ka haɗa abin da kake faɗa da abin da kake gani a zahiri, kuma hakan yana sa koyo ya fi daɗi. A gida ko a makaranta, ka kirga mutane, kujeru, faranti, ko fensir domin ka ƙarfafa abin da ka koya yau. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wanne ne ya fi girma: 45 ko 48? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi lambobin da babbar murya, sannan ka sake kirgawa a hankali a zuciyarka domin ka tabbatar ka tuna jeren sosai. Sanin yadda ake kirgawa da kyau yana taimaka maka a ƙari, ragewa, da sauran darussan lissafi da za ka koya daga baya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Ka sanya 42 da 49 a jere – wanne ya fi ƙanƙani? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita kirgawa kullum, za ka iya gano lambobi cikin sauri kuma ka yi amfani da su cikin tabbaci. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wanne ne ya fi girma: 45 ko 48?" (correct answer: "48"; options: 45, 46, 48)
- **[PAUSE 2]** — question shown to the learner: "Ka sanya 42 da 49 a jere – wanne ya fi ƙanƙani?" (correct answer: "42"; options: 42, 45, 49)

---

### `p1-bsci-05` — The Five Senses Review

**Target filename:** `audio/p1-bsci-05.mp3`
**Title (Hausa):** Hankali Biyar Maimaitawa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Hankali Biyar Maimaitawa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A darasin maimaitawa, za mu sake duba hankula biyar da gaɓoɓin da ake amfani da su domin mu tabbatar mun fahimce su sosai. Muna gani da idanu, muna ji da kunnuwa, muna taɓa da fata ko hannu, muna jin ƙamshi da hanci, sannan muna jin ɗanɗano da baki ko harshe. Kowane hankali yana da aikinsa a jiki, kuma dukansu suna taimaka mana sanin abin da ke faruwa a cikin muhallinmu. Ka yi amfani da jikinka da misalan da ke kusa da kai domin ka tuna wannan darasi cikin sauƙi. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Hankali nawa Allah ya ba mu? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi sunan kowanne hankali tare da gaɓarsa, sannan ka bada misali na abin da za ka iya gani, ji, ko taɓawa. Maimaitawa tana sa ilimi ya ƙara zaune a zuciya kuma tana taimaka mana mu gyara kuskure kafin jarrabawa. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane hankali ne ake amfani da idanu? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka tuna hankula biyar da kyau, sauran darussan kimiyya za su fi maka sauƙi. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Hankali nawa Allah ya ba mu?" (correct answer: "biyar"; options: uku, biyar, bakwai)
- **[PAUSE 2]** — question shown to the learner: "Wane hankali ne ake amfani da idanu?" (correct answer: "gani"; options: ji, taɓa, gani)

---

### `p1-socs-05` — Good Moral Values in the Family

**Target filename:** `audio/p1-socs-05.mp3`
**Title (Hausa):** Kyawawan Halaye a Iyali

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Kyawawan Halaye a Iyali. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A cikin iyali, akwai kyawawan halaye da ake koyarwa kamar gaskiya, biyayya, taimako, da haɗin kai. Faɗin gaskiya yana nuna amana. Biyayya kuwa tana nufin yin abin da iyaye ko manya suka umurta idan yana da kyau kuma daidai ne. Idan yara sun koyi taimakon juna da kuma mutunta iyaye, gida yana cika da nutsuwa da alheri. Ka tuna cewa rashin biyayya, ƙarya, da son kai sukan haifar da matsala a gida. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Me ake kira faɗin gaskiya? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi tunani kan wani hali mai kyau da za ka iya nunawa a gida yau. Wannan darasi yana taimaka mana zama yara na gari da kuma gina kyakkyawar dangantaka a cikin iyali. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Idan muka yi abin da iyaye suka ce, ana kiransa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da maimaitawa da aiki da abin da ka koya, za ka iya zama abin koyi a iyalinka. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira faɗin gaskiya?" (correct answer: "gaskiya"; options: gaskiya, ƙarya, rashawa)
- **[PAUSE 2]** — question shown to the learner: "Idan muka yi abin da iyaye suka ce, ana kiransa?" (correct answer: "biyayya"; options: biyayya, taurin kai, rashin biyayya)

---

### `p1-maths-06` — Place Value (Tens & Units)

**Target filename:** `audio/p1-maths-06.mp3`
**Title (Hausa):** Matsayi (Goma da Guda)

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Matsayi (Goma da Guda). Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Matsayin lamba yana nuna darajar kowane lamba a cikin lamba mai lambobi biyu, wato goma da kuma guda. A cikin 37, lamba 3 tana nufin goma uku, sannan lamba 7 tana nufin guda bakwai. Haka nan a cikin 52, lamba 5 tana nufin goma biyar, lamba 2 kuma guda biyu. Idan ka canja matsayi, ma'ana tana canzawa. Lamba 24 ba daidai take da 42 ba, domin goma da guda sun sauya wuri. Ka yi amfani da kwalaye, yatsu, ko ƙananan abubuwa don nuna rukunin goma da sauran guda domin ka ga bambancin sosai. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] A cikin 37, adadin goma nawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka ɗauki lambobi kamar 18, 46, da 63, ka faɗi adadin goma da kuma adadin guda da suke ɗauke da su. Sanin matsayi yana taimaka mana wajen fahimtar manyan lambobi, kirga kuɗi, da kuma shirya amsoshin lissafi daidai. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] A cikin 52, adadin guda nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da zarar ka fahimci matsayi, sauran darussan lissafi za su fi maka sauƙi sosai. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A cikin 37, adadin goma nawa?" (correct answer: "3"; options: 3, 7, 30)
- **[PAUSE 2]** — question shown to the learner: "A cikin 52, adadin guda nawa?" (correct answer: "2"; options: 5, 2, 20)

---

### `p1-bsci-06` — Living Things – Animals

**Target filename:** `audio/p1-bsci-06.mp3`
**Title (Hausa):** Abubuwa masu rai – Dabbobi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Abubuwa masu rai – Dabbobi. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Dabbobi abubuwa ne masu rai domin suna numfashi, suna cin abinci, suna motsi, kuma suna girma. Muna da dabbobi kamar kare, kaza, akuya, kifi, da tsuntsu. Wasu suna tafiya da ƙafafu, wasu suna tashi, wasu kuma suna iyo a ruwa. Duk dabba tana da irin abincinta da wurin zamanta, kuma mutane suna amfani da wasu dabbobi wajen aiki ko abinci. Ya kamata mu kula da dabbobi cikin tausayi kuma mu guji cutar da su babu dalili. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane dabba ne yana da ƙafafu huɗu? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi sunayen wasu dabbobin da ka sani kuma ka lissafta yadda suke motsi ko inda suke rayuwa. Wannan darasi yana taimaka mana mu bambanta dabbobi da abubuwan da ba su da rai. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Me ake kira abin da yake da rai? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan fahimta, za ka fi gane dalilin da ya sa dabbobi ake kiransu masu rai. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane dabba ne yana da ƙafafu huɗu?" (correct answer: "kare"; options: kaza, kare, kifi)
- **[PAUSE 2]** — question shown to the learner: "Me ake kira abin da yake da rai?" (correct answer: "mai rai"; options: mara rai, mai rai, dutse)

---

### `p1-socs-06` — My School – Environment and Facilities

**Target filename:** `audio/p1-socs-06.mp3`
**Title (Hausa):** Makaranta ta – Yanayi da Kayayyaki

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Makaranta ta – Yanayi da Kayayyaki. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Makaranta wuri ne da ake koyar da yara, kuma tana da muhalli da kayayyaki da suke taimaka wa karatu ya tafi daidai. A cikin makaranta muna samun aji, ɗakin karatu, filin wasa, bandaki, ofis, da wasu kayan aiki kamar tebura, kujeru, da allo. Tsabtar muhalli da kula da kayan makaranta suna taimaka mana koyon darasi cikin sauƙi da kwanciyar hankali. Ka tuna cewa ɗakin karatu wurin karanta littattafai ne, filin wasa kuwa don motsa jiki da wasa mai kyau. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane wuri ne muke karatu? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka duba makarantar ku a hankali ka faɗi wasu wurare da kayayyakin da kuke amfani da su kullum. Sanin muhalli da kayan makaranta yana koya mana yadda za mu kula da dukiyar jama'a. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Mene ne aikin ɗakin karatu? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka ƙara daraja makaranta da abubuwan da take ɗauke da su. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane wuri ne muke karatu?" (correct answer: "aji"; options: filin wasa, aji, ɗakin kwanciya)
- **[PAUSE 2]** — question shown to the learner: "Mene ne aikin ɗakin karatu?" (correct answer: "karanta littattafai"; options: karanta littattafai, yin wasa, cin abinci)

---

### `p1-maths-07` — Greater Than & Less Than

**Target filename:** `audio/p1-maths-07.mp3`
**Title (Hausa):** Girma da Ƙanan

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Girma da Ƙanan. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A lissafi, muna kwatanta lambobi domin mu san wacce ta fi girma da kuma wacce ta fi ƙanƙani. Idan ka duba 23 da 28, 28 ta fi girma saboda tana da ƙarin ƙima. Idan ka duba 12 da 15, 12 ita ce mafi ƙanƙani. Muna amfani da alamar > don nuna 'ya fi girma', sannan alamar < don nuna 'ya fi ƙanƙani'. Waɗannan alamomi suna taimaka mana wajen kwatanta lambobi cikin sauri. Ka gwada kwatanta yawan fensir, littattafai, ko almajirai a aji domin ka ga yadda kwatantawa ke aiki a rayuwa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] 23 < 28 – wanne ne ya fi girma? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka ɗauki lambobi biyu a takarda ko a allo, ka duba su a hankali, sannan ka faɗi wacce ta fi girma ko ƙanƙanta. Wannan darasi yana taimaka maka wajen tsara lambobi daga ƙarami zuwa babba, da kuma fahimtar tambayoyin kwatantawa cikin sauƙi. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] 15 > 12 – wanne ne ya fi ƙanƙani? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka ci gaba da atisaye, za ka iya gane girma da ƙanƙani ba tare da jinkiri ba. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "23 < 28 – wanne ne ya fi girma?" (correct answer: "28"; options: 23, 28, daidai)
- **[PAUSE 2]** — question shown to the learner: "15 > 12 – wanne ne ya fi ƙanƙani?" (correct answer: "12"; options: 15, 12, daidai)

---

### `p1-bsci-07` — Living Things – Plants

**Target filename:** `audio/p1-bsci-07.mp3`
**Title (Hausa):** Abubuwa masu rai – Tsire-tsire

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Abubuwa masu rai – Tsire-tsire. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Tsire-tsire ma abubuwa ne masu rai domin suna tsiro, suna sha ruwa, suna girma, kuma suna iya bushewa idan ba a kula da su ba. Muna ganin bishiya, ciyawa, gero, masara, da furanni a matsayin tsire-tsire. Wasu suna ba mu inuwa, wasu abinci, wasu kuma kawata muhalli. Tsire-tsire suna buƙatar ƙasa, ruwa, iska, da hasken rana domin su girma da kyau. Ka tuna cewa idan ba a shayar da shuka ko a ba ta haske ba, tana iya bushewa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane abu ne mai rai a cikin waɗannan? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka duba shuka a gida ko makaranta ka faɗi ɓangarenta kamar ganye, tushe, da 'ya'ya idan tana da su. Sanin tsire-tsire yana taimaka mana mu kula da muhalli da kuma gane abin da ke taimaka wa rayuwa ta ci gaba. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Me ake kira abin da yake tsiro daga ƙasa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka ƙara fahimtar dalilin da ya sa bishiya da sauran tsire-tsire ake kiransu masu rai. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne mai rai a cikin waɗannan?" (correct answer: "bishiya"; options: teburi, bishiya, takalmi)
- **[PAUSE 2]** — question shown to the learner: "Me ake kira abin da yake tsiro daga ƙasa?" (correct answer: "shuka"; options: dutse, shuka, iska)

---

### `p1-socs-07` — People in My School – Roles

**Target filename:** `audio/p1-socs-07.mp3`
**Title (Hausa):** Mutane a Makaranta ta – Ayyukansu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Mutane a Makaranta ta – Ayyukansu. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A makaranta akwai mutane daban-daban da suke aiki tare domin karatu ya gudana cikin tsari. Malami yana koyar da yara. Shugaban makaranta yana jagoranci. Mai tsabta yana share makaranta, yayin da mai tsaro yake kare makaranta da mutanen cikinta. Kowane mutum yana da muhimmiyar rawa, kuma idan ya yi aikinsa da kyau makaranta tana tafiya lafiya. Ka tuna cewa ba malami kaɗai ake buƙata a makaranta ba; akwai wasu mutane da suke taimaka wa kowa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane ne ke koyar da mu a makaranta? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi mutanen da kake gani a makaranta da kuma aikin kowannensu. Wannan darasi yana koya mana girmama ma'aikatan makaranta saboda suna taimaka mana kullum. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane ne ke share makaranta? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan fahimta, za ka fi nuna ladabi ga mutanen da kake gani a makaranta. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane ne ke koyar da mu a makaranta?" (correct answer: "malami"; options: malami, shugaba, mai tsaro)
- **[PAUSE 2]** — question shown to the learner: "Wane ne ke share makaranta?" (correct answer: "mai tsabta"; options: malami, mai tsabta, ɗalibi)

---

### `p1-maths-08` — Odd & Even Numbers

**Target filename:** `audio/p1-maths-08.mp3`
**Title (Hausa):** Lambobi marasa daidaituwa da masu daidaituwa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Lambobi marasa daidaituwa da masu daidaituwa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Lambobi masu daidaituwa su ne lambobin da za a iya raba su gida biyu ba tare da saura ba, yayin da marasa daidaituwa suke barin saura. Misali, 2, 4, 6, da 8 lambobi ne masu daidaituwa. Amma 1, 3, 5, da 7 lambobi ne marasa daidaituwa. Idan ka haɗa abubuwa gida biyu-gida biyu, za ka ga lamba mai daidaituwa ba ta barin wani abu a gefe, amma mara daidaituwa tana iya barin ɗaya a saura. Ka lura da lambobin da kake gani a takarda ko a allo, ka tambayi kanka ko za a iya raba su gida biyu daidai ko a'a. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] 6 lamba ce mai daidaituwa ko mara daidaituwa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi amfani da tsakuwa, kwalaye, ko fensir domin ka gwada raba lambobi kamar 6 da 9 gida biyu-gida biyu. Sanin bambanci tsakanin waɗannan lambobi yana taimaka mana a ƙari, rarraba, da sauran dabarun lissafi na gaba. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] 9 lamba ce mai daidaituwa ko mara daidaituwa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da maimaitawa, za ka iya gane lamba mai daidaituwa ko mara daidaituwa nan take. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "6 lamba ce mai daidaituwa ko mara daidaituwa?" (correct answer: "mai daidaituwa"; options: mai daidaituwa, mara daidaituwa, ba lamba ba)
- **[PAUSE 2]** — question shown to the learner: "9 lamba ce mai daidaituwa ko mara daidaituwa?" (correct answer: "mara daidaituwa"; options: mai daidaituwa, mara daidaituwa, ba lamba ba)

---

### `p1-bsci-08` — Non-Living Things

**Target filename:** `audio/p1-bsci-08.mp3`
**Title (Hausa):** Abubuwa marasa rai

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Abubuwa marasa rai. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Abubuwa marasa rai su ne abubuwan da ba su numfashi, ba sa girma da kansu, kuma ba sa motsi da kansu kamar yadda masu rai suke yi. Misalan abubuwa marasa rai sun haɗa da dutse, teburi, takalmi, littafi, da kwalba. Waɗannan abubuwa ba sa cin abinci kuma ba sa haihuwa. Duk da cewa wasu abubuwa marasa rai na iya motsawa idan muka tura su, ba sa yin hakan da kansu. Ka tuna cewa abu mai rai yana iya motsi, girma, ko buƙatar abinci da ruwa, amma mara rai ba ya yin hakan da kansa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wanne ne mara rai? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka kwatanta abu mai rai da mara rai a kusa da kai, sannan ka faɗi abin da ya sa ka san bambancinsu. Wannan darasi yana taimaka mana mu rarrabe abubuwa a muhallinmu bisa halayensu. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Abubuwa masu rai suna iya me? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da kyau ka maimaita misalai domin bambancin masu rai da marasa rai ya zauna sosai a zuciyarka. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wanne ne mara rai?" (correct answer: "dutse"; options: kare, dutse, bishiya)
- **[PAUSE 2]** — question shown to the learner: "Abubuwa masu rai suna iya me?" (correct answer: "motsi"; options: motsi, zama a wuri ɗaya koyaushe, nutsuwa)

---

### `p1-socs-08` — My Community – Meaning and People

**Target filename:** `audio/p1-socs-08.mp3`
**Title (Hausa):** Al'umma ta – Ma'ana da Mutane

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Al'umma ta – Ma'ana da Mutane. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Al'umma rukunin mutanen da suke rayuwa tare a wuri ɗaya, suna aiki, suna taimakon juna, kuma suna amfani da wurare iri ɗaya. A cikin al'umma za ka samu manoma, 'yan kasuwa, malamai, likitoci, masu dinki, da sauran mutane masu sana'o'i daban-daban. Kowane mutum a al'umma yana da aikin da yake yi wanda yake taimaka wa sauran mutane su rayu lafiya. Ka tuna cewa al'umma ba gida ɗaya ba ce kawai; tana haɗa gidaje da mutane da yawa a wuri ɗaya. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Mene ne al'umma? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi wasu mutane da kake gani a al'ummarka da irin aikin da suke yi. Wannan darasi yana koya mana cewa al'umma tana rayuwa ne ta hanyar haɗin kai da taimakon juna. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane irin mutum ne yake sayar da kaya a kasuwa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi fahimtar yadda rayuwa ke gudana a unguwa ko ƙauye. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne al'umma?" (correct answer: "rukunin mutanen da suke rayuwa tare"; options: gida ɗaya, rukunin mutanen da suke rayuwa tare, makaranta)
- **[PAUSE 2]** — question shown to the learner: "Wane irin mutum ne yake sayar da kaya a kasuwa?" (correct answer: "ɗan kasuwa"; options: manomi, ɗan kasuwa, likita)

---

### `p1-maths-09` — Addition Without Carrying

**Target filename:** `audio/p1-maths-09.mp3`
**Title (Hausa):** Ƙari ba tare da ja da baya ba

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ƙari ba tare da ja da baya ba. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Ƙari yana nufin haɗa lambobi biyu ko fiye domin mu samu jimla guda ɗaya. Idan kana da fensir 5 kuma aka ƙara maka 3, jimla za ta zama 8. Haka kuma idan kana da almajirai 12 kuma 4 suka shigo, jimla za ta zama 16. A wannan mataki, muna ƙara lambobi ba tare da ɗaukar goma zuwa wani wuri ba. Ka duba abubuwa a gida ko a aji, ka raba su gida biyu, sannan ka haɗa su domin ka gano jimlarsu. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] 5 + 3 nawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka fara da ƙananan lambobi, ka yi amfani da yatsu, tsakuwa, ko zane domin ka ga yadda lambobi suke haɗuwa su zama yawa ɗaya. Ƙari yana taimaka mana wajen kirga kaya, mutane, kuɗi, da sauran abubuwa da muke tarawa a rayuwa. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] 12 + 4 nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka ci gaba da atisaye, ƙari zai zama abu mai sauƙi sosai a gare ka. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "5 + 3 nawa?" (correct answer: "8"; options: 7, 8, 9)
- **[PAUSE 2]** — question shown to the learner: "12 + 4 nawa?" (correct answer: "16"; options: 15, 16, 17)

---

### `p1-bsci-09` — Water – Sources and Uses

**Target filename:** `audio/p1-bsci-09.mp3`
**Title (Hausa):** Ruwa – Maɓuɓɓugansa da amfaninsa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Ruwa – Maɓuɓɓugansa da amfaninsa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Ruwa abu ne mai muhimmanci ga rayuwa saboda mutane, dabbobi, da tsire-tsire duka suna buƙatarsa. Muna samun ruwa daga famfo, rijya, ruwan sama, da rafuka. Dole ne mu fi amfani da ruwa mai tsafta domin lafiya. Muna amfani da ruwa wajen sha, wanka, wanke kaya, girki, da shayar da tsire-tsire. Ya kamata mu sha ruwa mai tsabta kuma mu rufe tukunya ko tankin ruwa domin ya kasance lafiya. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Me ake samun ruwa daga gare shi? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka lissafta wasu wuraren da ake samun ruwa a yankinku, sannan ka faɗi yadda ake amfani da ruwa a gida. Sanin asalin ruwa da amfani da shi yana taimaka mana mu kiyaye shi kuma kada mu ɓata shi. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Muna amfani da ruwa don me? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka ƙara gane muhimmancin ruwa a rayuwa. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake samun ruwa daga gare shi?" (correct answer: "famfo"; options: wuta, famfo, iska)
- **[PAUSE 2]** — question shown to the learner: "Muna amfani da ruwa don me?" (correct answer: "sha"; options: sha, gani, ji)

---

### `p1-socs-09` — Places in My Community

**Target filename:** `audio/p1-socs-09.mp3`
**Title (Hausa):** Wurare a Al'umma ta

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Wurare a Al'umma ta. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A kowace al'umma akwai muhimmam wurare da mutane ke amfani da su domin ayyukan rayuwa daban-daban. Muna da kasuwa inda ake sayar da kaya, asibiti inda ake kula da marasa lafiya, masallaci da coci inda ake yin addu'a, da kuma wasu wurare kamar makaranta da ofishin 'yan sanda. Kowane wuri yana da nasa aiki, kuma mutane suna zuwa wurin da ya dace da buƙatarsu. Ka tuna cewa mutunta wuraren jama'a yana daga cikin kyawawan halaye a al'umma. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Ina ake sayar da kaya? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi wasu wurare a al'ummarku da aikin da ake yi a kowanne wuri. Sanin waɗannan wurare yana taimaka mana mu san inda za mu je idan muna buƙatar taimako ko sabis. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Ina ake kula da marasa lafiya? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi gane muhimmancin wurare a cikin al'umma. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ina ake sayar da kaya?" (correct answer: "kasuwa"; options: kasuwa, asibiti, masallaci)
- **[PAUSE 2]** — question shown to the learner: "Ina ake kula da marasa lafiya?" (correct answer: "asibiti"; options: makaranta, asibiti, filin wasa)

---

### `p1-maths-10` — Addition With Carrying

**Target filename:** `audio/p1-maths-10.mp3`
**Title (Hausa):** Ƙari tare da ja da baya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ƙari tare da ja da baya. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Ƙari yana nufin haɗa lambobi biyu ko fiye domin mu samu jimla guda ɗaya. Idan kana da fensir 5 kuma aka ƙara maka 3, jimla za ta zama 8. Haka kuma idan kana da almajirai 12 kuma 4 suka shigo, jimla za ta zama 16. A wasu lokuta, idan guda suka kai goma ko fiye, sai mu tara su mu mayar da goma ɗaya zuwa wajen gomomi. Ka duba abubuwa a gida ko a aji, ka raba su gida biyu, sannan ka haɗa su domin ka gano jimlarsu. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] 18 + 5 nawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka fara da ƙananan lambobi, ka yi amfani da yatsu, tsakuwa, ko zane domin ka ga yadda lambobi suke haɗuwa su zama yawa ɗaya. Ƙari yana taimaka mana wajen kirga kaya, mutane, kuɗi, da sauran abubuwa da muke tarawa a rayuwa. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] 27 + 8 nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka ci gaba da atisaye, ƙari zai zama abu mai sauƙi sosai a gare ka. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "18 + 5 nawa?" (correct answer: "23"; options: 22, 23, 24)
- **[PAUSE 2]** — question shown to the learner: "27 + 8 nawa?" (correct answer: "35"; options: 34, 35, 36)

---

### `p1-bsci-10` — Air – What is Air?

**Target filename:** `audio/p1-bsci-10.mp3`
**Title (Hausa):** Iska – Mene ne iska?

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Iska – Mene ne iska?. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Iska tana ko'ina ko da ba ma iya ganin ta da idanu. Muna jin ta idan tana kaɗawa ko idan muka hura numfashi. Ganye yana motsi idan iska ta buga shi, tutoci sukan yi lilo, kuma muke numfashi da iska domin rayuwa. Ko da ba mu gan ta, muna iya jin iska a jiki lokacin sanyi ko idan muka hura a hannu. Ka tuna cewa iska na da muhimmanci ga rayuwa kamar ruwa saboda tana taimaka mana mu numfasa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Me ake kira iskar da muke hura? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka hura a tafin hannunka ko ka lura da ganye a waje domin ka ji aikin iska. Sanin iska yana taimaka mana mu fahimci muhalli, numfashi, da motsin abubuwa a kusa da mu. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Idan iska ke kaɗawa, me zai motsa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka lura sosai, za ka gane cewa iska tana aiki a muhallinmu kullum. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira iskar da muke hura?" (correct answer: "iska"; options: ruwa, iska, wuta)
- **[PAUSE 2]** — question shown to the learner: "Idan iska ke kaɗawa, me zai motsa?" (correct answer: "ganye"; options: dutse, ganye, teburi)

---

### `p1-socs-10` — Community Helpers

**Target filename:** `audio/p1-socs-10.mp3`
**Title (Hausa):** Masu Taimako a Al'umma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Masu Taimako a Al'umma. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Masu taimako a al'umma mutane ne da suke yi wa jama'a hidima ta hanyoyi daban-daban. Likita yana kula da marasa lafiya, ɗan sanda yana kare mutane da dukiyoyi, manomi yana samar da abinci, ɗan kasuwa yana sayar da kaya, mai dinki yana dinka tufafi. Idan waɗannan mutane ba su yi aikinsu ba, rayuwa a al'umma za ta yi wahala sosai. Ka tuna cewa kowane taimako mai kyau yana da muhimmanci ko da aikin ya bambanta da na wani. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane ne ke ba mu agajin farko idan muka ji rauni? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi wasu masu taimako a al'ummarka da yadda suke taimakawa jama'a. Wannan darasi yana koya mana girmama masu aiki domin suna taimakawa rayuwarmu ta gudana lafiya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane ne ke kare mu da dukiyoyinmu? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan fahimta, za ka fi nuna godiya ga mutanen da ke yi wa al'umma aiki. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane ne ke ba mu agajin farko idan muka ji rauni?" (correct answer: "likita"; options: malami, ɗan kasuwa, likita)
- **[PAUSE 2]** — question shown to the learner: "Wane ne ke kare mu da dukiyoyinmu?" (correct answer: "ɗan sanda"; options: ɗan kasuwa, manomi, ɗan sanda)

---

### `p1-maths-11` — Subtraction Without Carrying

**Target filename:** `audio/p1-maths-11.mp3`
**Title (Hausa):** Ragewa ba tare da ja da baya ba

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ragewa ba tare da ja da baya ba. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Ragewa yana nufin cire wani ɓangare daga abin da muke da shi domin mu san abin da ya rage. Idan kana da 9 kuma ka cire 4, abin da ya rage shi ne 5. Haka idan kana da fensir 17 kuma ka ba da 6, saura 11 ne. A ragewa, muna fara da lambar da ta fi girma, sannan mu cire ƙaramin adadi daga cikinta cikin natsuwa. Ka gwada tambayoyi da kayanka a gida, kamar litattafai ko faranti, domin ka ga yadda ragewa ke aiki a zahiri. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] 9 – 4 nawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi amfani da yatsu, tsakuwa, ko zane domin ka cire abubuwa ɗaya bayan ɗaya har ka ga saura da idonka. Ragewa tana taimaka mana wajen sanin saura bayan rabawa, saye, ko cire wasu abubuwa daga cikin jimla. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] 17 – 6 nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da zarar ka saba da ragewa, za ka iya warware tambayoyi cikin sauƙi da sauri. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "9 – 4 nawa?" (correct answer: "5"; options: 4, 5, 6)
- **[PAUSE 2]** — question shown to the learner: "17 – 6 nawa?" (correct answer: "11"; options: 10, 11, 12)

---

### `p1-bsci-11` — The Weather

**Target filename:** `audio/p1-bsci-11.mp3`
**Title (Hausa):** Yanayi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Yanayi. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Yanayi yana nuna yadda sama take a wani lokaci, kamar lokacin rana, ruwa, iska, ko gizagizai. Idan rana tana haskakawa sosai, muna cewa rana ce. Idan ruwa yana sauka daga sama, muna cewa ruwan sama ne. Idan iska tana kaɗawa, yanayi na iya zama mai iska. Yanayi yana canzawa daga lokaci zuwa lokaci, kuma hakan yana taimaka mana sanin irin tufafin da ya dace mu sa ko abin da ya kamata mu yi. Ka tuna cewa idan ruwa zai zo, sai mu shirya mafaka ko laima; idan rana ta yi zafi, sai mu nemi inuwa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane yanayi ne rana take haskakawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka kalli sama ko muhallin da ke wajenku ka faɗi irin yanayin da kake gani yau. Sanin yanayi yana taimaka mana wajen shiri na makaranta, aiki, da kuma kula da lafiya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Idan ruwa yana sauka daga sama, ana kiransa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi gane irin canjin da sama take yi. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane yanayi ne rana take haskakawa?" (correct answer: "rana"; options: rana, ruwa, iska)
- **[PAUSE 2]** — question shown to the learner: "Idan ruwa yana sauka daga sama, ana kiransa?" (correct answer: "ruwan sama"; options: rana, ruwan sama, iska)

---

### `p1-socs-11` — Meaning of Culture

**Target filename:** `audio/p1-socs-11.mp3`
**Title (Hausa):** Ma'anar Al'ada

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Ma'anar Al'ada. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Al'ada ita ce yadda mutane suke rayuwa, magana, suturta, cin abinci, da gudanar da wasu ayyukan gargajiya. Harshe, abinci, tufafi, kiɗa, da hanyoyin gaisuwa duk suna cikin al'ada domin suna nuna irin rayuwar mutane. Al'ada tana bambanta daga wuri zuwa wuri, amma tana taimaka wa mutane su san ko su waye. Ka tuna cewa harshen da muke magana, irin tufafinmu, da irin abincinmu suna nuna al'ada. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Mene ne al'ada? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi wasu abubuwa da kuke yi a gidanku ko yankinku da suke nuna al'adarku. Wannan darasi yana koya mana girmama al'ada mai kyau da kuma fahimtar abin da ya bambanta mutane. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane abu ne ya shiga cikin al'ada? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fara ganin al'ada a abubuwan da kake yi a kullum. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne al'ada?" (correct answer: "yadda mutane suke rayuwa"; options: yadda mutane suke rayuwa, yadda mutane suke fada, yadda mutane suke barci)
- **[PAUSE 2]** — question shown to the learner: "Wane abu ne ya shiga cikin al'ada?" (correct answer: "harshe"; options: harshe, taurari, dabbobi)

---

### `p1-maths-12` — Revision and Assessment

**Target filename:** `audio/p1-maths-12.mp3`
**Title (Hausa):** Maimaitawa da jarrabawa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Maimaitawa da jarrabawa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A wannan darasi na maimaitawa, za mu duba manyan batutuwan lissafi da muka koya tun farko domin mu tabbatar sun zauna sosai a zuciya. Maimaitawa yana taimaka mana tuna abin da muka riga muka koya, gyara kuskure, da kuma ganin inda muke buƙatar ƙarin aiki. A irin wannan darasi, muna haɗa misalai daga darussa daban-daban domin mu tabbatar ilimin ya zauna sosai a zuciya. Ka yi aiki cikin natsuwa, ka karanta tambaya a hankali, kuma ka bincika amsarka kafin ka wuce zuwa ta gaba. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Bayan 19 ita ce? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka sake duba tambayoyin ƙari, ragewa, kirgawa, ko sauran batutuwa, sannan ka yi ƙoƙari ka warware su da kanka kafin ka nemi taimako. Jarrabawa ba don tsoro ba ce kawai; tana taimaka wa malami da ɗalibi su ga abin da aka fahimta da abin da ake bukatar a ƙara maimaitawa. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] 24 + 6 nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita sosai, zaka shiga gwaji da kwarin gwiwa kuma ka fi tuna darussan da aka koya. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Bayan 19 ita ce?" (correct answer: "20"; options: 18, 19, 20)
- **[PAUSE 2]** — question shown to the learner: "24 + 6 nawa?" (correct answer: "30"; options: 29, 30, 31)

---

### `p1-bsci-12` — Simple Machines – Lever

**Target filename:** `audio/p1-bsci-12.mp3`
**Title (Hausa):** Na'urori masu sauƙi – Lefe

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Na'urori masu sauƙi – Lefe. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Lefe na daga cikin na'urori masu sauƙi da suke taimaka mana ɗaga ko motsa abu mai nauyi cikin sauƙi. Idan muna amfani da lefe, ƙaramin ƙarfi na iya taimaka mana mu ɗaga abu da zai yi wuya mu ɗaga da hannu kaɗai. Misalan lefe sun haɗa da wasu kujeru masu jujjuyawa ko kayan aiki da ake tunkudawa domin ɗaga abu. Ka kula lokacin da manya suke amfani da wata sanda ko kayan aiki wajen ɗaga abu mai nauyi, domin a nan ne za ka ga lefe na aiki. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Lefe yana taimaka mana mu yi me? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi tunani game da abin da ya faru idan ka tunkuda ƙarshen sanda domin ɗaya gefen ya tashi sama. Sanin lefe yana taimaka mana mu fahimci yadda mutane ke amfani da fasaha don sauƙaƙa aiki. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane abu ne misalin lefe? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan fahimta, za ka san cewa kimiyya tana taimakawa aikin yau da kullum ya zama mai sauƙi. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lefe yana taimaka mana mu yi me?" (correct answer: "ɗaga abubuwa masu nauyi"; options: ɗaga abubuwa masu nauyi, sauke abubuwa, motsi da sauri)
- **[PAUSE 2]** — question shown to the learner: "Wane abu ne misalin lefe?" (correct answer: "kujera mai jujjuyawa"; options: teburi, kujera mai jujjuyawa, gado)

---

### `p1-socs-12` — Types of Culture

**Target filename:** `audio/p1-socs-12.mp3`
**Title (Hausa):** Nau'ukan Al'ada

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Nau'ukan Al'ada. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Al'ada tana da nau'o'i daban-daban, kuma ana iya raba ta zuwa al'ada ta zahiri da al'ada ta ruhaniya ko ta tunani. Al'ada ta zahiri ita ce abin da ake iya gani kamar tufafi, abinci, kayan aiki, da gidaje. Al'ada ta ruhaniya kuwa ita ce abin da ba a iya gani kai tsaye kamar imani, dabi'u, da dokokin rayuwa. Duk waɗannan nau'o'i suna taimaka wa mutane su san yadda za su rayu a cikin al'ummarsu. Ka tuna cewa tufafi da abinci al'ada ce ta zahiri, yayin da imani da ɗabi'a suke cikin al'ada ta ruhaniya. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane irin al'ada ne za mu iya gani? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi misalin abin da ake iya gani a al'ada da kuma misalin abin da ake ji ko a yi imani da shi. Wannan darasi yana taimaka mana gane cewa al'ada ba abu ɗaya ba ce; tana da ɓangarori masu yawa. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane irin al'ada ne ba a iya gani? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi fahimtar nau'o'in al'ada a rayuwar jama'a. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane irin al'ada ne za mu iya gani?" (correct answer: "al'ada ta zahiri"; options: al'ada ta zahiri, al'ada ta ruhaniya, al'ada ta jiki)
- **[PAUSE 2]** — question shown to the learner: "Wane irin al'ada ne ba a iya gani?" (correct answer: "al'ada ta ruhaniya"; options: al'ada ta zahiri, al'ada ta ruhaniya, al'ada ta jiki)

---

### `p1-maths-13` — Counting 51–70

**Target filename:** `audio/p1-maths-13.mp3`
**Title (Hausa):** Kirgawa 51–70

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kirgawa 51–70. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Kirgawa daga 51 zuwa 70 yana taimaka mana mu gane yadda lambobi suke bi jere ba tare da kuskure ba. Ka fara daga 51, ka bi lambobin ɗaya bayan ɗaya har zuwa 70, kuma ka kula kada ka tsallake wata lamba ko ka maimaita lamba sau biyu. Za ka iya amfani da yawan kujeru, takardu, ko sauran kayayyaki domin ka haɗa abin da kake faɗa da abin da kake gani a zahiri, kuma hakan yana sa koyo ya fi daɗi. A gida ko a makaranta, ka kirga mutane, kujeru, faranti, ko fensir domin ka ƙarfafa abin da ka koya yau. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wace lamba ce tsakanin 60 da 62? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka faɗi lambobin da babbar murya, sannan ka sake kirgawa a hankali a zuciyarka domin ka tabbatar ka tuna jeren sosai. Sanin yadda ake kirgawa da kyau yana taimaka maka a ƙari, ragewa, da sauran darussan lissafi da za ka koya daga baya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] 70 ya rage 10 nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita kirgawa kullum, za ka iya gano lambobi cikin sauri kuma ka yi amfani da su cikin tabbaci. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace lamba ce tsakanin 60 da 62?" (correct answer: "61"; options: 60, 61, 62)
- **[PAUSE 2]** — question shown to the learner: "70 ya rage 10 nawa?" (correct answer: "60"; options: 50, 60, 70)

---

### `p1-bsci-13` — Simple Machines – Wheel and Axle

**Target filename:** `audio/p1-bsci-13.mp3`
**Title (Hausa):** Na’urori masu sauƙi – Daba da sandar da ke tsakiya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Na'urori masu sauƙi – Daba da sandar da ke tsakiya. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Daba da sandar da ke tsakiya su ma na'urori ne masu sauƙi da suke taimaka mana motsa abubuwa daga wuri zuwa wuri. Mota, keken hannu, da wasu kayan tura kaya suna amfani da daba domin su motsa cikin sauƙi. Idan ba a sami daba ba, motsa kaya zai fi wahala saboda za a ja su ko a ɗauke su ne da ƙarfi sosai. Ka tuna cewa daba mai zagaye tana juyawa ne a kan sandar da ke tsakiya, kuma haɗin su ne ke ba da damar motsi mai sauƙi. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane abu ne yake da daba? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka lura da motoci, kekuna, ko keken hannu ka faɗi yadda daba take taimaka musu motsi. Wannan darasi yana taimaka mana gane cewa ƙananan fasahohi suna rage wahala a rayuwa. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Daba tana taimaka mana mu yi me? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan ilimi, za ka fara ganin na'urori masu sauƙi a cikin abubuwan yau da kullum. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne yake da daba?" (correct answer: "mota"; options: mota, littafi, fensir)
- **[PAUSE 2]** — question shown to the learner: "Daba tana taimaka mana mu yi me?" (correct answer: "motsi"; options: motsi, tsayawa, ɗagawa)

---

### `p1-socs-13` — Festivals and Celebrations

**Target filename:** `audio/p1-socs-13.mp3`
**Title (Hausa):** Bukukuwa da Biki

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Bukukuwa da Biki. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Biki lokaci ne na farin ciki da taruwa inda mutane suke murna da wasu muhimman ranaku ko abubuwan al'ada da addini. Misalan bukukuwa sun haɗa da Sallah, Kirsimati, Durbar, da sauran tarukan da jama'a ke yi domin murna da nuna haɗin kai. A lokacin biki mutane sukan yi ado, su gaisa, su yi sadaka, su ziyarci dangi, kuma su gode wa Allah. Ka tuna cewa biki mai kyau ya kamata ya kasance cikin tsari, girmamawa, da tausayi ga sauran mutane. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane biki ne musulmi ke yi? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi wani biki da ka sani da abin da ake yi a lokacin sa. Wannan darasi yana koya mana cewa bukukuwa suna haɗa jama'a, suna ƙara farin ciki, kuma suna nuna al'ada ko addini. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Me muke yi a lokacin biki? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi gane dalilin da ya sa bukukuwa suke da muhimmanci a al'umma. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane biki ne musulmi ke yi?" (correct answer: "Sallah"; options: Kirsimati, Sallah, Durbar)
- **[PAUSE 2]** — question shown to the learner: "Me muke yi a lokacin biki?" (correct answer: "murna da sadaka"; options: murna da sadaka, yin barci, yin aiki)

---

### `p1-maths-14` — Introduction to Multiplication

**Target filename:** `audio/p1-maths-14.mp3`
**Title (Hausa):** Gabatar da Rinkawa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Gabatar da Rinkawa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Rinkawa ita ce ƙari mai maimaitawa, wato haɗa adadi iri ɗaya sau da yawa. Misali, 2 + 2 + 2 daidai yake da 3 sau na 2, kuma hakan yana zama 6. Haka nan 3 + 3 yana nufin sau biyu na 3. Lokacin da muka ga alamar ×, muna tunanin adadi iri ɗaya ana maimaitawa sau da dama maimakon rubuta ƙari mai tsawo. Ka yi atisaye da kwallaye, tsakuwa, ko yatsu domin ka ga yadda ƙari mai maimaitawa ke zama rinkawa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] 2 + 2 + 2 yana daidai da sau nawa 2? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka tara ƙananan abubuwa a rukuni-rukuni iri ɗaya, sannan ka kirga yawan rukunin da kuma yawan abubuwan da ke cikin kowanne rukuni. Rinkawa tana taimaka mana wajen kirga abubuwa cikin sauri idan akwai rukunoni da yawa iri ɗaya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] 3 × 2 nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan fahimta, darussan lissafi na gaba za su fi maka sauƙin fahimta. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "2 + 2 + 2 yana daidai da sau nawa 2?" (correct answer: "sau uku"; options: sau biyu, sau uku, sau huɗu)
- **[PAUSE 2]** — question shown to the learner: "3 × 2 nawa?" (correct answer: "6"; options: 5, 6, 7)

---

### `p1-bsci-14` — Energy – Light and Heat

**Target filename:** `audio/p1-bsci-14.mp3`
**Title (Hausa):** Ƙarfi – Haske da Zafi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Ƙarfi – Haske da Zafi. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Haske da zafi wasu nau'o'in ƙarfi ne da muke ji ko gani a muhallinmu. Rana tana ba mu haske da zafi. Fitila tana ba mu haske a daki, wuta kuma tana iya ba mu zafi sosai. Haske yana taimaka mana mu gani, yayin da zafi yake sa abubuwa su yi ɗumi ko su yi zafi. Dole ne mu yi hattara da wuta domin tana iya ƙonewa, kuma kada mu tsaya a rana mai zafi na dogon lokaci ba tare da kariya ba. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Me ke ba mu haske da rana? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi wasu abubuwan da ke ba da haske da wasu da ke ba da zafi a rayuwarka. Sanin haske da zafi yana taimaka mana mu yi amfani da su cikin hikima kuma mu kare kanmu daga haɗari. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Me ke ba mu zafi idan muka taɓa shi? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi gane bambanci tsakanin haske da zafi da kuma inda suke fitowa. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ke ba mu haske da rana?" (correct answer: "rana"; options: rana, wata, taurari)
- **[PAUSE 2]** — question shown to the learner: "Me ke ba mu zafi idan muka taɓa shi?" (correct answer: "wuta"; options: ruwa, wuta, iska)

---

### `p1-socs-14` — Respect for People and Places

**Target filename:** `audio/p1-socs-14.mp3`
**Title (Hausa):** Girmama Mutane da Wurare

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Girmama Mutane da Wurare. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Girmamawa tana nufin nuna mutunci ga mutane da kuma kula da wurare masu muhimmanci a al'umma. Ya kamata mu girmama iyaye, malamai, dattawa, da sauran manya ta hanyar gaisuwa, sauraro, da magana cikin ladabi. Haka kuma ya kamata mu girmama makaranta, masallaci, coci, kasuwa, da sauran wuraren jama'a ta hanyar kiyaye su da tsabta da guje wa lalata su. Ka tuna cewa girmamawa ba magana kaɗai ba ce; tana haɗa aiki mai kyau da guje wa abin da zai ɓata rai ko lalata wuri. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wa ya kamata mu girmama? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi tunani kan wasu hanyoyi biyu da za ka nuna girmamawa ga mutum ko wuri a yau. Wannan darasi yana taimaka mana zama yara na gari masu mutunci da kula da dukiyar jama'a. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Yaya za mu nuna girmamawa ga dattijo? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka ƙara fahimtar muhimmancin ladabi a rayuwa. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wa ya kamata mu girmama?" (correct answer: "iyaye"; options: abokan wasa, iyaye, 'yan uwa)
- **[PAUSE 2]** — question shown to the learner: "Yaya za mu nuna girmamawa ga dattijo?" (correct answer: "gaishe shi"; options: gaishe shi, yi masa dariya, yi masa watsi)

---

### `p1-maths-15` — Introduction to Division

**Target filename:** `audio/p1-maths-15.mp3`
**Title (Hausa):** Gabatar da Rarraba

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Gabatar da Rarraba. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Rarraba yana nufin raba adadi gida-gida daidai domin kowanne rukuni ya samu nasa. Idan kana da abubuwa 8 kuma za ka raba su ga mutane 4 daidai, kowane mutum zai samu 2. Haka nan 6 idan aka raba gida biyu daidai, kowane ɓangare zai samu 3. Rarraba tana nuna yadda ake rabon adalci ba tare da nuna son kai ko barin wani ba. Ka fara da ƙananan lambobi, ka duba ko kowane rukuni ya yi daidai, sannan ka sake lissafawa idan kana shakka. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Ka raba kifaye 6 gida biyu daidai – kowane rukuni yana da nawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi amfani da tsakuwa, fensir, ko abinci a misali, ka raba su gida-gida daidai domin ka ga yadda rarraba ke aiki. Wannan darasi yana taimaka mana a kasuwa, a gida, da a makaranta idan muna son rabawa kowa nasa cikin daidai. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Abubuwa 8 ga mutane 4 – kowane mutum zai samu nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka saba da rarraba, za ka iya fahimtar rabon abubuwa cikin sauƙi. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ka raba kifaye 6 gida biyu daidai – kowane rukuni yana da nawa?" (correct answer: "3"; options: 2, 3, 4)
- **[PAUSE 2]** — question shown to the learner: "Abubuwa 8 ga mutane 4 – kowane mutum zai samu nawa?" (correct answer: "2"; options: 1, 2, 3)

---

### `p1-bsci-15` — Revision and Assessment

**Target filename:** `audio/p1-bsci-15.mp3`
**Title (Hausa):** Maimaitawa da jarrabawa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Maimaitawa da jarrabawa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A wannan darasi na maimaitawa, za mu sake duba muhimman batutuwan Basic Science da muka koya domin mu tabbatar sun zauna sosai. Za mu tuna hankula biyar, abubuwa masu rai da marasa rai, ruwa, iska, yanayi, da kuma wasu na'urori masu sauƙi. Maimaitawa tana ba mu damar gyara kuskure, sake faɗin amsoshi, da tabbatar da abin da muka koya ya zama daidai. Ka karanta tambaya da kyau, ka yi tunani, sannan ka zaɓi amsa mafi dacewa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Hankali nawa muka koya? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi ƙoƙari ka faɗi misalai daga kowane batu da aka koya, sannan ka amsa tambayoyi a hankali ba tare da firgita ba. Jarrabawa tana taimaka wa malami da ɗalibi su san inda ake bukatar ƙarin aiki ko maimaitawa. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane abu ne mara rai? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka yi maimaitawa sosai, za ka shiga gwaji da kwarin gwiwa. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Hankali nawa muka koya?" (correct answer: "biyar"; options: uku, biyar, bakwai)
- **[PAUSE 2]** — question shown to the learner: "Wane abu ne mara rai?" (correct answer: "dutse"; options: kare, bishiya, dutse)

---

### `p1-socs-15` — Revision and Assessment

**Target filename:** `audio/p1-socs-15.mp3`
**Title (Hausa):** Maimaitawa da jarrabawa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Karatun Al'umma. Yau za mu koyi Maimaitawa da jarrabawa. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A darasin maimaitawa, za mu sake duba muhimman batutuwan Social Studies da muka koya domin mu tabbatar mun fahimce su sosai. Za mu tuna ma'anar Social Studies, iyali, makaranta, al'umma, al'ada, bukukuwa, da kuma girmamawa ga mutane da wurare. Maimaitawa tana sa ilimi ya zauna a zuciya kuma tana taimaka mana mu gyara abin da bai fito ba kafin jarrabawa. Ka yi aiki cikin kwanciyar hankali, ka saurari umarni, kuma ka duba amsarka kafin ka miƙa. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Mene ne Social Studies? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka sake karanta tambayoyi a hankali, ka tuna misalai daga gida, makaranta, da al'umma, sannan ka amsa da natsuwa. Jarrabawa tana nuna mana abin da muka gane da inda ya kamata mu ƙara maimaitawa. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wa ke kula da mu idan muna rashin lafiya? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita sosai, za ka shiga gwaji da kwarin gwiwa da nutsuwa. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne Social Studies?" (correct answer: "nazarin mutum da muhallinsa"; options: nazarin taurari, nazarin mutum da muhallinsa, nazarin dabbobi)
- **[PAUSE 2]** — question shown to the learner: "Wa ke kula da mu idan muna rashin lafiya?" (correct answer: "likita"; options: malami, ɗan kasuwa, likita)

---

### `p1-maths-16` — Fractions (½ and ¼)

**Target filename:** `audio/p1-maths-16.mp3`
**Title (Hausa):** Ƙangare (rabi da rubu'u)

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ƙangare (rabi da rubu'u). Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Ƙangare yana nufin wani yanki na cikakken abu, kamar rabi ko rubu'i. Rabi yana nufin rabon abu gida biyu daidai. Idan muna da 10, rabinsa shi ne 5. Rubu'i kuwa yana nufin rabon abu gida huɗu daidai. Idan ka ɗauki lemo, gurasa, ko zane ka raba shi gida biyu daidai, ka samu rabinsa. Idan ka raba gida huɗu daidai, ka samu rubu'i. Ka kula cewa ɓangarorin dole ne su zama daidai; idan ba su yi daidai ba, ba rabi ko rubu'i na gaskiya ba ne. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Rabin 10 nawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi amfani da zane ko faranti ka zana layi ka raba abu gida biyu ko huɗu domin ka ga ɓangarorin da kanka. Fahimtar ƙangare tana taimaka mana wajen sanin rabon abinci, lokaci, ko sauran abubuwa a rayuwar yau da kullum. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Rubu'in 12 nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka maimaita wannan darasi, za ka fara gane ƙananan ɓangarori cikin sauƙi. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Rabin 10 nawa?" (correct answer: "5"; options: 4, 5, 6)
- **[PAUSE 2]** — question shown to the learner: "Rubu'in 12 nawa?" (correct answer: "3"; options: 2, 3, 4)

---

### `p1-maths-17` — Money – Identifying Naira and Kobo

**Target filename:** `audio/p1-maths-17.mp3`
**Title (Hausa):** Kuɗi – Gane Naira da Kobo

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kuɗi – Gane Naira da Kobo. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Kuɗi yana taimaka mana wajen saye da sayarwa, kuma a Najeriya muna amfani da Naira da Kobo. Naira ita ce babbar sashin kuɗi, yayin da Kobo ƙananan sashi ne. Kobo 100 ne suke yin Naira 1. Za ka ga kuɗi kamar N5, N10, N20, N50, da N100. Dole mu iya gane sunansu da darajarsu domin mu yi lissafi daidai. Ka tambayi kanka ko N50 ya fi N20 girma, ko kuma Kobo nawa suke yin N1, domin ka ƙarfafa fahimtarka. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Naira nawa a cikin kuɗin N50? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka duba kuɗin da ka taɓa gani ko hoton kuɗi, sannan ka faɗi darajar kowannensu da babbar murya. Sanin kuɗi yana taimaka maka a kasuwa, wajen siyan abu, da kuma fahimtar canjin da za a baka bayan biyan kuɗi. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Kobo nawa suke yin N1? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi fahimtar yadda kuɗi ke aiki a rayuwar yau da kullum. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Naira nawa a cikin kuɗin N50?" (correct answer: "50"; options: 5, 50, 500)
- **[PAUSE 2]** — question shown to the learner: "Kobo nawa suke yin N1?" (correct answer: "100"; options: 10, 50, 100)

---

### `p1-maths-18` — Money – Addition and Change

**Target filename:** `audio/p1-maths-18.mp3`
**Title (Hausa):** Kuɗi – Ƙari da canji

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kuɗi – Ƙari da canji. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] A darasin kuɗi, muna iya haɗa kuɗi biyu ko cire kuɗin abu daga abin da muka biya domin mu san jimla ko canji. Misali, N20 da N30 suna zama N50. Haka kuma idan ka biya N100 domin abu na N70, canjin da za a baka shi ne N30. Wannan yana taimaka mana mu san ko kuɗin da muke da shi ya isa, da kuma ko an ba mu canji daidai bayan sayayya. Ka yi amfani da misalan sayayya kamar alewa, littafi, ko fensir domin ka haɗa darasin da rayuwa ta ainihi. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] N20 + N30 nawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka yi atisaye da misalan kuɗi a takarda ko a zuciya, ka haɗa ko ka cire su cikin natsuwa har sai ka samu amsa. Sanin jimlar kuɗi da canji yana kare mu daga kuskure a kasuwa kuma yana taimaka mana mu kasance masu lura. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Ka biya N100 don abu N70 – canji nawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da yawan maimaitawa, za ka iya lissafin kuɗi da canji cikin sauƙi. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "N20 + N30 nawa?" (correct answer: "N50"; options: N40, N50, N60)
- **[PAUSE 2]** — question shown to the learner: "Ka biya N100 don abu N70 – canji nawa?" (correct answer: "N30"; options: N20, N30, N40)

---

### `p1-maths-19` — Length (Metres and Centimetres)

**Target filename:** `audio/p1-maths-19.mp3`
**Title (Hausa):** Tsayi (Mita da Santimita)

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tsayi (Mita da Santimita). Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Tsayi yana nuna yadda abu yake daga wannan gefe zuwa wancan, kuma muna auna shi da mita ko santimita. Mita ɗaya daidai take da santimita 100. Don haka mita 2 ta fi santimita 150 tsayi saboda santimita 200 ne. Muna amfani da ma'auni ko tef domin auna tsayin teburi, ƙofa, zane, ko jikin mutum. Ka yi amfani da misalan da kake gani a makaranta ko gida domin ka fahimci bambancin mita da santimita sosai. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Mita nawa a cikin santimita 100? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka gwada ka kwatanta tsayin abubuwa biyu, ko ka tambayi kanka santimita nawa ke cikin mita ɗaya ko biyu. Sanin tsayi yana taimaka mana wajen gini, ɗinki, zane, da kuma sanin ko abu ya fi wani tsawo. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane ne ya fi tsayi: mita 2 ko santimita 150? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da atisaye, za ka iya kwatanta tsayi daidai kuma ka yi ƙaramar auna a zuciyarka. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mita nawa a cikin santimita 100?" (correct answer: "1"; options: 1, 10, 100)
- **[PAUSE 2]** — question shown to the learner: "Wane ne ya fi tsayi: mita 2 ko santimita 150?" (correct answer: "mita 2"; options: mita 2, santimita 150, daidai)

---

### `p1-maths-20` — Capacity (Litres)

**Target filename:** `audio/p1-maths-20.mp3`
**Title (Hausa):** Girmamawa (Lita)

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Girmamawa (Lita). Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Ƙarfin ɗaukar ruwa ko wani abu a cikin kwano ko kwalba ana kiransa iya ɗauka ko capacity, kuma ana auna shi da lita. Idan kwalba mai lita 2 ta cika, hakan yana nufin tana ɗauke da lita 2 na ruwa. Lita 5 kuma ta fi lita 3 yawa. Muna iya amfani da lita wajen auna ruwa, mai, ko sauran ruwa da ake zubawa a cikin kwantena. Ka lura da rubutun lita a kwalban ruwa ko jarka idan ka gani, domin hakan yana ƙarfafa abin da ka koya. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Lita 3 da lita 5 – wanne ne ya fi yawa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka kwatanta kwalaye ko kwalabe daban-daban ka tambayi kanka wacce ta fi ɗaukar ruwa da yawa. Wannan darasi yana taimaka mana wajen fahimtar yawan ruwa da ake buƙata wajen sha, girki, ko ajiya. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Kwalba mai lita 2 ta cika – yaya yawan ruwan? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka ci gaba da maimaitawa, za ka iya gane abin da ya fi ɗauka cikin sauƙi. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lita 3 da lita 5 – wanne ne ya fi yawa?" (correct answer: "lita 5"; options: lita 3, lita 5, daidai)
- **[PAUSE 2]** — question shown to the learner: "Kwalba mai lita 2 ta cika – yaya yawan ruwan?" (correct answer: "lita 2"; options: lita 1, lita 2, lita 3)

---

### `p1-maths-21` — Weight (Kilograms)

**Target filename:** `audio/p1-maths-21.mp3`
**Title (Hausa):** Nauyi (Kilogiram)

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Nauyi (Kilogiram). Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Nauyi yana nuna yadda abu yake da sauƙi ko kuma yadda yake da nauyi, kuma ana auna shi da kilogiram. Kilogram 5 ya fi kilogram 2 nauyi. Abu mai nauyi kaɗan ana iya cewa mai sauƙi ne, yayin da mai yawa ake cewa nauyi ne. Muna kwatanta nauyin buhu, leda, littafi, ko kayan abinci domin mu san abin da ya fi ɗaukar nauyi. Ka yi amfani da hannunka ka gwada ɗagawa a hankali domin ka ji bambancin nauyi da sauƙi idan ya yiwu. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Wane ne ya fi nauyi: kilogiram 5 ko kilogiram 2? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka duba abubuwa biyu da kake iya ɗagawa, ka yi tunanin wanne ya fi sauƙi da wanne ya fi nauyi. Sanin nauyi yana taimaka mana wajen ɗaukar kaya, siyayya, da kuma fahimtar ma'auni a rayuwa ta yau da kullum. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Abin da yake da nauyi kaɗan ana kiransa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da yawan atisaye, za ka iya kwatanta nauyin abubuwa cikin sauƙi. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane ne ya fi nauyi: kilogiram 5 ko kilogiram 2?" (correct answer: "kilogiram 5"; options: kilogiram 2, kilogiram 5, daidai)
- **[PAUSE 2]** — question shown to the learner: "Abin da yake da nauyi kaɗan ana kiransa?" (correct answer: "sauƙi"; options: nauyi, sauƙi, tsayi)

---

### `p1-maths-22` — Time – Days, Weeks, and Hours

**Target filename:** `audio/p1-maths-22.mp3`
**Title (Hausa):** Lokaci – Kwanaki, makonni, da sa'o'i

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Lokaci – Kwanaki, makonni, da sa'o'i. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Lokaci yana taimaka mana mu san ranaku, makonni, da sa'o'i domin mu tsara abin da za mu yi a rayuwa. Mako yana da kwanaki bakwai: Litinin, Talata, Laraba, Alhamis, Juma'a, Asabar, da Lahadi. Agogo kuma yana taimaka mana sanin sa'a. Idan agogo ya nuna 3, muna cewa ƙarfe uku ne. Bayan Laraba kuwa, rana ta gaba ita ce Alhamis. Ka tambayi kanka rana ta farko da ta ƙarshe a mako, ko kuma karfe nawa agogo yake nunawa idan ka ga hoto. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Bayan Laraba wace rana ce? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka faɗi ranakun mako a jere, sannan ka kalli agogo ko ka zana shi domin ka gane yadda sa'o'i suke nuna lokaci. Sanin lokaci yana taimaka mana zuwa makaranta da wuri, yin sallah ko addu'a a kan kari, da kuma shirya hutawa da aiki. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Karfe nawa a lokacin da agogo ya nuna 3? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da wannan darasi, za ka fi gane yadda lokaci yake tafiya a kowace rana. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Bayan Laraba wace rana ce?" (correct answer: "Alhamis"; options: Talata, Alhamis, Juma'a)
- **[PAUSE 2]** — question shown to the learner: "Karfe nawa a lokacin da agogo ya nuna 3?" (correct answer: "3"; options: 2, 3, 4)

---

### `p1-maths-23` — 2D and 3D Shapes

**Target filename:** `audio/p1-maths-23.mp3`
**Title (Hausa):** Siffofi masu fuska biyu da uku

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Siffofi masu fuska biyu da uku. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Siffofi suna nuna irin yanayin abu, kuma muna da siffofi masu fuska biyu da kuma masu fuska uku. Alwatika tana da gefe uku. Murabba'i yana da gefe huɗu daidai, zobe kuma siffa ce mai zagaye. A siffofi masu fuska uku, cube yana kama da akwati, sphere kuma yana kama da ƙwallo. Idan ka kalli faranti, akwatin takalma, ko ƙwallo, za ka ga yadda siffofi suke bayyana a rayuwar yau da kullum. Ka zana siffa a takarda, ka lissafta gefuna ko fuska, sannan ka kwatanta ta da abu na zahiri. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Siffa mai gefe uku ita ce? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka duba abubuwa a gida ko a aji ka faɗi wace siffa suka yi kama da ita, ko ta fuska biyu ko ta fuska uku. Sanin siffofi yana taimaka mana wajen zane, gini, da kuma gane abubuwa cikin sauƙi idan muka gan su. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Wane abu yana kama da cube? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Idan ka yi maimaitawa, za ka iya gane siffa da sunanta nan take. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Siffa mai gefe uku ita ce?" (correct answer: "alwatika"; options: zobe, murabba'i, alwatika)
- **[PAUSE 2]** — question shown to the learner: "Wane abu yana kama da cube?" (correct answer: "akwati"; options: akwati, ƙwallo, faranti)

---

### `p1-maths-24` — Data Collection and Pictographs

**Target filename:** `audio/p1-maths-24.mp3`
**Title (Hausa):** Tattara bayanai da zane-zane

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tattara bayanai da zane-zane. Ka zauna lafiya, ka saurara a hankali, sannan ka maimaita bayanin da za ka ji domin ilimi ya zauna sosai a zuciyarka. [MAIN] Tattara bayanai yana nufin tara lambobi ko bayanai game da abin da mutane suke so ko abin da ya faru, sannan a nuna su ta hanyar zane ko hoto. Idan muka tambayi almajirai abin da suke so, kamar kifi ko nama, za mu iya rubuta adadinsu sannan mu nuna sakamakon da pictograph. Pictograph zane ne da ke nuna adadin abubuwa ta hanyar alamu ko hotuna, domin mutane su fahimta cikin sauƙi. Ka lura da cewa dole ne a kirga daidai kafin a zana, domin kuskure a kirgawa yana sa sakamakon ya zama ba daidai ba. Ka duba abin da ke kusa da kai, ko a gida ko a aji, domin ka haɗa abin da ake faɗa da abin da kake gani ko kake yi a zahiri. Idan ka yi haka, darasin zai fi maka sauƙin fahimta. [PAUSE 1] Mene ne zane-zanen da ke nuna adadin abubuwa? Ka dakata ka yi tunani kafin ka ci gaba. [MAIN] Ka tattara bayani daga abokanka ko 'yan uwanka, kamar launin da suka fi so, sannan ka yi ƙaramar alama ko zane don nuna adadi. Wannan darasi yana taimaka mana wajen karanta bayanai, kwatanta abin da ya fi yawa, da yanke hukunci bisa abin da muka gani. Ka tuna cewa maimaitawa yana ƙarfafa ilimi. Idan ka yi atisaye da yatsunka, da kayan aji, da abubuwan cikin gida, ko da misalai daga al'umma, za ka fi gane darasin kuma ba za ka manta da shi da wuri ba. [PAUSE 2] Almajirai 5 suna son kifi, 3 suna son nama – wanne ya fi yawa? Ka sake tunani cikin natsuwa sannan ka zaɓi amsa mafi dacewa. [OUTRO] Da yawan maimaitawa, za ka iya karanta bayanai da sauƙin fahimta. Ka ci gaba da maimaitawa, ka yi tambaya idan kana bukatar taimako, sannan mu haɗu a darasi na gaba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne zane-zanen da ke nuna adadin abubuwa?" (correct answer: "pictograph"; options: pictograph, jadawali, ginshiƙi)
- **[PAUSE 2]** — question shown to the learner: "Almajirai 5 suna son kifi, 3 suna son nama – wanne ya fi yawa?" (correct answer: "kifi"; options: kifi, nama, daidai)

---
