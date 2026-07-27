# AJAMIX Audio Recording Package — p2 (58 modules)

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

### `p2-bsci-01` — Living and Non-living Things

**Target filename:** `audio/p2-bsci-01.mp3`
**Title (Hausa):** Abubuwa Masu Rai da Marasa Rai

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi abubuwa masu rai da marasa rai. [MAIN] Abu mai rai yana iya girma, yana bukatar ruwa ko abinci, kuma yana numfashi. Akuya, kaza, bishiya, dawa, da wake misalai ne. Abu marar rai ba ya girma da kansa kuma ba ya cin abinci. Dutse, kujera, allo, da littafi misalai ne. [PAUSE 1] Wane abu ne mai rai? [MAIN] Idan kana rarraba abu, ka nemi alamar rai fiye da ɗaya. Shuka a tukunya tana girma idan an kula da ita, amma dutse ba ya canzawa saboda ruwa. Ka lura da abubuwa daga nesa kuma kada ka cutar da dabba ko tsiro. [PAUSE 2] Me ya sa dutse yake marar rai? [OUTRO] Ka rarrabe abubuwa a gida, a aji, da a gona cikin rukuni biyu: masu rai da marasa rai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne mai rai?" (correct answer: "akuya"; options: akuya, dutse, kujera)
- **[PAUSE 2]** — question shown to the learner: "Me ya sa dutse yake marar rai?" (correct answer: "ba ya girma ko numfashi"; options: yana cin abinci, ba ya girma ko numfashi, yana haihuwa)

---

### `p2-maths-01` — Numbers 1 to 100

**Target filename:** `audio/p2-maths-01.mp3`
**Title (Hausa):** Lambobi 1 zuwa 100

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Lambobi 1 zuwa 100. [MAIN] Lambobi suna taimaka maka ka san yawan abubuwa. A P2 za ka faɗa da rubuta lambobi daga 1 zuwa 100. Ka fara daga ɗaya, ka ci gaba har goma, sannan ka kai ashirin, hamsin, da ɗari. A aji, za ka iya ƙirga fensir, littattafai, kujeru, ko ɗalibai. [PAUSE 1] Wace lamba ce bayan 49? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Wace lamba ce ake kira ɗari? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace lamba ce bayan 49?" (correct answer: "50"; options: 48, 50, 59)
- **[PAUSE 2]** — question shown to the learner: "Wace lamba ce ake kira ɗari?" (correct answer: "100"; options: 10, 50, 100)

---

### `p2-socs-01` — The Family

**Target filename:** `audio/p2-socs-01.mp3`
**Title (Hausa):** Iyali

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Iyali. [MAIN] Iyali shi ne mutanen da suke zaune tare ko suke da dangantaka ta jini, aure, ko kulawa. A cikin iyali, kana iya samun uwa, uba, yara, kakanni, yayye, ƙanne, ko wasu dangi. Iyali yana ba ka ƙauna, kulawa, abinci, tarbiyya, da kariya. A gida, kowa yana da rawar da zai taka domin zaman lafiya. [PAUSE 1] Me ake kira mutanen da suke zaune tare da kulawa da juna? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me ya kamata ka nuna wa iyaye? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira mutanen da suke zaune tare da kulawa da juna?" (correct answer: "iyali"; options: iyali, kasuwa, filin wasa)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka nuna wa iyaye?" (correct answer: "girmamawa"; options: girmamawa, hayaniya, ƙin magana)

---

### `p2-bsci-02` — Parts of a Plant

**Target filename:** `audio/p2-bsci-02.mp3`
**Title (Hausa):** Sassan Tsiro

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi sassan tsiro. [MAIN] Tsiro yana da sassa kamar tushe, kara, ganye, fure, da 'ya'ya. Tushen yana cikin ƙasa, yana riƙe tsiro kuma yana shan ruwa. Kara tana ɗaga tsiro sama tana kai ruwa zuwa ganye. Ganye suna taimaka wa tsiro ya yi abinci da hasken rana. [PAUSE 1] Wane sashe ne yake shan ruwa daga ƙasa? [MAIN] Ka duba tsiro daga waje ka nuna sassan da ka gani, amma kada ka cire ganye ko ka karya kara. Idan ka shuka wake tare da babba, ka zuba ruwa kaɗan-kaɗan ka lura da sabon ganye. [PAUSE 2] Wane sashe ne yake taimaka wa tsiro ya yi abinci? [OUTRO] Ka kula da shuke-shuke a gida da makaranta, kuma ka tuna sunayen sassansu da aikinsu.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane sashe ne yake shan ruwa daga ƙasa?" (correct answer: "tushe"; options: ganye, tushe, fure)
- **[PAUSE 2]** — question shown to the learner: "Wane sashe ne yake taimaka wa tsiro ya yi abinci?" (correct answer: "ganye"; options: ganye, tukunya, dutse)

---

### `p2-maths-02` — Counting Forward and Backward

**Target filename:** `audio/p2-maths-02.mp3`
**Title (Hausa):** Ƙirga Gaba da Baya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ƙirga Gaba da Baya. [MAIN] Ƙirga gaba yana nufin tafiya daga ƙaramar lamba zuwa babbar lamba, kamar 21, 22, 23, 24. Ƙirga baya kuma yana nufin dawowa daga babbar lamba zuwa ƙaramar lamba, kamar 30, 29, 28, 27. Wannan yana taimaka maka ka gane abin da ke zuwa gaba da abin da ya gabata. Idan kana wasan tsalle, za ka iya ƙirga gaba yayin da kake ƙara mataki. [PAUSE 1] Idan ka ƙirga gaba daga 28, wace lamba ce ta biyo baya? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Idan ka ƙirga baya daga 40, wace lamba ce ta biyo baya? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan ka ƙirga gaba daga 28, wace lamba ce ta biyo baya?" (correct answer: "29"; options: 27, 29, 30)
- **[PAUSE 2]** — question shown to the learner: "Idan ka ƙirga baya daga 40, wace lamba ce ta biyo baya?" (correct answer: "39"; options: 39, 41, 49)

---

### `p2-socs-02` — Members of the Family

**Target filename:** `audio/p2-socs-02.mp3`
**Title (Hausa):** Membobin Iyali

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Membobin Iyali. [MAIN] Membobin iyali su ne mutane daban-daban da suke cikin gida ko dangi. Uwa tana kula da yara, uba yana taimaka wajen jagoranci da bukatun gida, kakanni suna ba da shawara da labari, yayye suna taimaka wa ƙanne, ƙanne kuma suna koyo daga manya. A wasu gidaje, za ka iya zama da kawu, inna, ko ɗan uwa. Kowane gida yana iya bambanta, amma muhimmanci shi ne kulawa da juna. [PAUSE 1] Wace ce mace mai kula da yara a gida? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Wa ke iya ba da shawara da labari a iyali? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace ce mace mai kula da yara a gida?" (correct answer: "uwa"; options: uwa, kasuwa, allo)
- **[PAUSE 2]** — question shown to the learner: "Wa ke iya ba da shawara da labari a iyali?" (correct answer: "kakanni"; options: kakanni, ƙwallo, bargo)

---

### `p2-bsci-03` — Domestic Animals

**Target filename:** `audio/p2-bsci-03.mp3`
**Title (Hausa):** Dabbobin Gida

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi dabbobin gida. [MAIN] Dabbobin gida su ne dabbobin da mutane ke kiwo ko kula da su kusa da gida. Misalai su ne akuya, tunkiya, kaza, saniya, jaki, kare, da kyanwa. Kaza tana ba mu ƙwai, saniya tana ba mu madara, jaki yana taimaka wajen ɗaukar kaya, kare yana iya tsaron gida. [PAUSE 1] Wace dabba ce take ba mu ƙwai? [MAIN] Dabbobin gida suna bukatar abinci, ruwa, inuwa, da tsafta. Kada ka jefa musu dutse ko ka tsoratar da su. Idan dabba ba ta da lafiya, manya za su nemi taimako. Ka tambayi babba kafin ka taɓa dabbar da ba ka sani ba. [PAUSE 2] Me dabbobin gida suke bukata domin su rayu? [OUTRO] Ka tuna cewa dabbobin gida masu rai ne. Ka kula da su cikin tausayi da hankali.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace dabba ce take ba mu ƙwai?" (correct answer: "kaza"; options: kaza, jaki, kare)
- **[PAUSE 2]** — question shown to the learner: "Me dabbobin gida suke bukata domin su rayu?" (correct answer: "abinci da ruwa"; options: dutse da fenti, abinci da ruwa, takarda da alli)

---

### `p2-maths-03` — Place Value: Tens and Units

**Target filename:** `audio/p2-maths-03.mp3`
**Title (Hausa):** Matsayin Lamba: Goma da Ɗaya-Ɗaya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Matsayin Lamba: Goma da Ɗaya-Ɗaya. [MAIN] Matsayin lamba yana nuna darajar lamba a cikin adadi. A lamba mai lambobi biyu, akwai wurin goma da wurin ɗaya-ɗaya. Idan ka ga 37, 3 tana nufin goma uku, wato 30, sannan 7 tana nufin ɗaya-ɗaya bakwai. Idan ka ga 52, 5 tana nufin goma biyar, 2 kuma ɗaya-ɗaya biyu. [PAUSE 1] A cikin 37, adadin goma nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] A cikin 52, adadin ɗaya-ɗaya nawa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A cikin 37, adadin goma nawa?" (correct answer: "3"; options: 3, 7, 30)
- **[PAUSE 2]** — question shown to the learner: "A cikin 52, adadin ɗaya-ɗaya nawa?" (correct answer: "2"; options: 5, 2, 20)

---

### `p2-socs-03` — Duties at Home

**Target filename:** `audio/p2-socs-03.mp3`
**Title (Hausa):** Ayyuka a Gida

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Ayyuka a Gida. [MAIN] Ayyuka a gida su ne ƙananan abubuwan da kowa zai iya yi domin gida ya kasance da tsari da tsafta. Yaro na P2 ba ya ɗaukar aiki mai nauyi, amma zai iya taimakawa da abin da ya dace da shekarunsa. Za ka iya tattara littattafai, share ƙaramin wuri idan an ce ka yi, ɗaukar kofinka bayan ka sha ruwa, ko ajiye takalma a wurinsu. Kada ka taɓa wuta, wuƙa, ko abu mai haɗari ba tare da babba ba. [PAUSE 1] Wane aiki yaro zai iya yi a gida? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me aiki a gida yake koya maka? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane aiki yaro zai iya yi a gida?" (correct answer: "tattara littattafai"; options: tattara littattafai, taɓa wuta, wasa da wuƙa)
- **[PAUSE 2]** — question shown to the learner: "Me aiki a gida yake koya maka?" (correct answer: "alhaki"; options: alhaki, rashin ladabi, ɓata kaya)

---

### `p2-bsci-04` — Weather

**Target filename:** `audio/p2-bsci-04.mp3`
**Title (Hausa):** Yanayi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi yanayi. [MAIN] Yanayi yana nufin yadda sararin sama da iska suke. Rana na iya haskawa, ruwa na iya sauka, iska na iya busawa, ko sanyi ya sauko. Idan gajimare ya taru sosai, ruwan sama na iya zuwa. [PAUSE 1] Me gajimare mai duhu zai iya nuna mana? [MAIN] Ka lura da rana, gajimare, iska, ko ruwan sama kowace rana. Ka faɗa wa malami ko babba abin da ka gani domin ka kwatanta yanayin yau da na jiya. Idan rana ta yi zafi, ka sha ruwa ka nemi inuwa; idan ruwan sama zai zo, ka ɗauki laima tare da izini. [PAUSE 2] Me za ka yi idan rana ta yi zafi sosai? [OUTRO] Ka riƙa lura da sama da iska; yanayi yana taimaka mana mu shirya lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me gajimare mai duhu zai iya nuna mana?" (correct answer: "ruwan sama na iya zuwa"; options: ruwan sama na iya zuwa, babu iska, rana ba ta haske)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan rana ta yi zafi sosai?" (correct answer: "sha ruwa ka nemi inuwa"; options: sha ruwa ka nemi inuwa, saka riga mai kauri, tsaya a rana duk rana)

---

### `p2-maths-04` — Comparing Numbers

**Target filename:** `audio/p2-maths-04.mp3`
**Title (Hausa):** Kwatanta Lambobi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kwatanta Lambobi. [MAIN] Kwatanta lambobi yana nufin duba wace lamba ta fi girma, wace ta fi ƙanƙanta, ko ko sun yi daidai. Idan kana da ƙwai 12, abokinka yana da 9, 12 ta fi 9 yawa. Idan farashin fensir naira 20 ne, farashin littafi naira 50 ne, 50 ta fi 20 girma. Ka fara kwatanta gomomi kafin ɗaya-ɗaya. [PAUSE 1] Wace lamba ta fi girma: 47 ko 39? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Idan 25 da 25 ne, me za ka ce? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace lamba ta fi girma: 47 ko 39?" (correct answer: "47"; options: 47, 39, daidai)
- **[PAUSE 2]** — question shown to the learner: "Idan 25 da 25 ne, me za ka ce?" (correct answer: "daidai"; options: 25 ya fi, daidai, 25 ya ƙasa)

---

### `p2-socs-04` — The Community

**Target filename:** `audio/p2-socs-04.mp3`
**Title (Hausa):** Al’umma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Al’umma. [MAIN] Al’umma ita ce tarin mutane da suke zaune ko aiki a wuri ɗaya, kamar unguwa, gari, ko ƙauye. A cikin al’umma akwai gidaje, makaranta, kasuwa, wurin ibada, asibiti, hanya, da wuraren wasa. Mutane a al’umma suna taimakon juna. Malami yana koyarwa, likita yana kula da marasa lafiya, manomi yana noma, ɗan kasuwa yana sayar da kaya, shugabanni kuma suna taimaka wa mutane su bi tsari. [PAUSE 1] Me ake kira tarin mutane da suke zaune a wuri ɗaya? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me mutane a al’umma suke yi wa juna? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira tarin mutane da suke zaune a wuri ɗaya?" (correct answer: "al’umma"; options: al’umma, littafi, ƙwallo)
- **[PAUSE 2]** — question shown to the learner: "Me mutane a al’umma suke yi wa juna?" (correct answer: "taimako"; options: taimako, ɓoye kaya, ƙin magana)

---

### `p2-bsci-05` — Uses of Water

**Target filename:** `audio/p2-bsci-05.mp3`
**Title (Hausa):** Amfanin Ruwa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi amfanin ruwa. [MAIN] Ruwa yana da amfani a gida, makaranta, da gona. Muna sha, muna wanke hannu, muna dafa abinci, kuma tsirrai da dabbobi suna bukatarsa. [PAUSE 1] Me ya sa muke shan ruwa? [MAIN] Kada ka ɓata ruwa. Ka rufe famfo idan ka gama amfani da shi. Idan ka ga famfo yana zuba ba tare da amfani ba, ka sanar da babba. Ka sha ruwa mai tsafta daga mazubi mai kyau. [PAUSE 2] Me ya kamata ka yi idan ka gama amfani da famfo? [OUTRO] Ka yi amfani da ruwa da tsabta da kulawa, domin ruwa na da muhimmanci ga rayuwa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ya sa muke shan ruwa?" (correct answer: "domin jiki ya yi aiki da kyau"; options: domin jiki ya yi aiki da kyau, domin ƙura ta ƙaru, domin famfo ya lalace)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi idan ka gama amfani da famfo?" (correct answer: "ka rufe shi"; options: ka bar shi yana zuba, ka rufe shi, ka ɓata ruwa)

---

### `p2-maths-05` — Ordering Numbers

**Target filename:** `audio/p2-maths-05.mp3`
**Title (Hausa):** Jera Lambobi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Jera Lambobi. [MAIN] Jera lambobi yana nufin sanya lambobi a tsari. Za ka iya jera su daga ƙaramar lamba zuwa babbar lamba, ko daga babbar lamba zuwa ƙaramar lamba. Misali, 12, 18, 25 suna tashi daga ƙasa zuwa sama. Amma 40, 30, 20 suna sauka daga sama zuwa ƙasa. [PAUSE 1] Jera 12, 18, 25 daga ƙaramar lamba zuwa babba. Wace ta fara? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Jera 40, 30, 20 daga babba zuwa ƙanana. Wace ta fara? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Jera 12, 18, 25 daga ƙaramar lamba zuwa babba. Wace ta fara?" (correct answer: "12"; options: 12, 18, 25)
- **[PAUSE 2]** — question shown to the learner: "Jera 40, 30, 20 daga babba zuwa ƙanana. Wace ta fara?" (correct answer: "40"; options: 20, 30, 40)

---

### `p2-socs-05` — Places in the Community

**Target filename:** `audio/p2-socs-05.mp3`
**Title (Hausa):** Wurare a Cikin Al’umma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Wurare a Cikin Al’umma. [MAIN] A cikin al’umma akwai wurare da yawa da suke taimaka wa mutane. Makaranta wuri ne na karatu. Asibiti ko wurin lafiya wuri ne da ake neman taimako idan mutum ba shi da lafiya. Kasuwa wuri ne da ake saye da sayarwa. [PAUSE 1] Ina ake karatu a cikin al’umma? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Ina ake saye da sayarwa? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ina ake karatu a cikin al’umma?" (correct answer: "makaranta"; options: makaranta, kasuwa, filin wasa)
- **[PAUSE 2]** — question shown to the learner: "Ina ake saye da sayarwa?" (correct answer: "kasuwa"; options: asibiti, kasuwa, ɗaki)

---

### `p2-bsci-06` — Personal Hygiene

**Target filename:** `audio/p2-bsci-06.mp3`
**Title (Hausa):** Tsaftar Jiki

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi tsaftar jiki. [MAIN] Ka wanke hannu da sabulu da ruwa bayan bayan gida, kafin cin abinci, da bayan wasa. Ka riƙa wanka, goge hakora, tsefe gashi, da sa tufafi masu tsabta idan akwai. [PAUSE 1] Yaushe ya kamata ka wanke hannunka? [MAIN] Farce mai datti na iya ɓoye ƙwayoyin cuta; ka bar babba ya yanke maka farce idan ta yi tsawo. Idan ka yi tari ko atishawa, ka rufe baki da hanci da gwiwar hannu ko kyalle mai tsabta. Waɗannan halaye suna taimaka rage yaduwar datti da ƙwayoyin cuta. [PAUSE 2] Me tsaftar jiki take taimaka maka ka guje wa? [OUTRO] Ka kula da jikinka kullum; tsafta tana taimaka maka ka kasance lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Yaushe ya kamata ka wanke hannunka?" (correct answer: "kafin cin abinci"; options: kafin cin abinci, bayan ka kwanta kawai, idan hannu ya fi datti kawai)
- **[PAUSE 2]** — question shown to the learner: "Me tsaftar jiki take taimaka maka ka guje wa?" (correct answer: "cuta"; options: cuta, karatu, abokai)

---

### `p2-maths-06` — Addition Without Regrouping

**Target filename:** `audio/p2-maths-06.mp3`
**Title (Hausa):** Tarawa Ba Tare da Canjin Goma ba

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tarawa Ba Tare da Canjin Goma ba. [MAIN] Tarawa ba tare da canjin goma ba yana nufin haɗa lambobi ba tare da ɗaya-ɗaya sun kai goma ba. Misali, 20 + 4 = 24, domin 4 kawai aka ƙara a wurin ɗaya-ɗaya. Haka kuma 30 + 6 = 36. Ka iya amfani da tsakuwa ko yatsu domin ka ga ƙarin da aka yi. [PAUSE 1] 20 + 4 nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] 30 + 6 nawa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "20 + 4 nawa?" (correct answer: "24"; options: 24, 26, 20)
- **[PAUSE 2]** — question shown to the learner: "30 + 6 nawa?" (correct answer: "36"; options: 36, 30, 46)

---

### `p2-socs-06` — Occupations

**Target filename:** `audio/p2-socs-06.mp3`
**Title (Hausa):** Sana’o’i

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Sana’o’i. [MAIN] Sana’a ita ce aikin da mutum yake yi domin ya taimaki kansa, iyali, da al’umma. A unguwa za ka iya ganin malami, likita, manomi, masunci, tela, direba, mai gyaran takalma, ko ɗan kasuwa. Kowane aiki yana da amfani. Malami yana koyar da yara. [PAUSE 1] Wane ne yake koyar da yara? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me manomi yake yi? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane ne yake koyar da yara?" (correct answer: "malami"; options: malami, direba, tela)
- **[PAUSE 2]** — question shown to the learner: "Me manomi yake yi?" (correct answer: "noma abinci"; options: noma abinci, ɗinka tufafi, gyara mota)

---

### `p2-bsci-07` — Food Groups

**Target filename:** `audio/p2-bsci-07.mp3`
**Title (Hausa):** Rukunan Abinci

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi rukunin abinci. [MAIN] Abinci yana taimaka wa jiki ya girma, ya yi aiki, kuma ya kasance lafiya. Tuwo, shinkafa, rogo, dankali, da burodi suna ba jiki ƙarfi. Wake, ƙwai, kifi, nama, da madara suna taimaka wa jiki girma. [PAUSE 1] Wane abinci ne yake taimaka wa jiki girma? [MAIN] Ganye da 'ya'yan itatuwa kamar alayyahu, zogale, mangwaro, da lemu suna taimaka wa jiki. Idan akwai zaɓi, a nemi abinci iri daban-daban tare da iyali ko masu kula da kai. Ka wanke hannu kafin ka ci. [PAUSE 2] Me ya kamata ka yi kafin ka ci abinci? [OUTRO] Ka zaɓi abinci iri daban-daban idan akwai, domin jikinka ya samu taimakon da yake bukata.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abinci ne yake taimaka wa jiki girma?" (correct answer: "wake"; options: wake, toka, ƙasa)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi kafin ka ci abinci?" (correct answer: "ka wanke hannu"; options: ka wanke hannu, ka ɗauki datti, ka raba buroshin hakori)

---

### `p2-maths-07` — Addition With Regrouping

**Target filename:** `audio/p2-maths-07.mp3`
**Title (Hausa):** Tarawa Tare da Canjin Goma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tarawa Tare da Canjin Goma. [MAIN] Tarawa tare da canjin goma yana faruwa idan ɗaya-ɗaya sun kai goma ko fiye. Misali, 18 + 5. Ka fara da 18, ka ƙara 2 domin ka kai 20, sannan sauran 3 su sa ka kai 23. Wannan shi ne canjin goma cikin sauƙi. [PAUSE 1] 18 + 5 nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] 27 + 8 nawa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "18 + 5 nawa?" (correct answer: "23"; options: 22, 23, 24)
- **[PAUSE 2]** — question shown to the learner: "27 + 8 nawa?" (correct answer: "35"; options: 34, 35, 36)

---

### `p2-socs-07` — The Market

**Target filename:** `audio/p2-socs-07.mp3`
**Title (Hausa):** Kasuwa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Kasuwa. [MAIN] Kasuwa wuri ne da mutane suke saye da sayarwa. A kasuwa za ka iya ganin kayan abinci kamar shinkafa, wake, tumatir, albasa, da kayan miya. Za ka iya ganin tufafi, takalma, littattafai, ko kayan gida. Masu sayarwa suna nuna kaya, masu saya kuma suna tambayar farashi. [PAUSE 1] Ina ake saye da sayarwa? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me ake tambaya kafin saye? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ina ake saye da sayarwa?" (correct answer: "kasuwa"; options: kasuwa, asibiti, ƙofar gida)
- **[PAUSE 2]** — question shown to the learner: "Me ake tambaya kafin saye?" (correct answer: "farashi"; options: farashi, launin sama, sunan kogi)

---

### `p2-bsci-08` — The Five Senses

**Target filename:** `audio/p2-bsci-08.mp3`
**Title (Hausa):** Gabobin Ji Biyar

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi gabobin ji biyar. [MAIN] Gabobin ji biyar suna taimaka maka ka gane duniya. Idanu suna gani. Kunnuwa suna jin sauti. Hanci yana jin ƙamshi. Harshe yana gane ɗanɗano. Fata tana jin taɓawa, zafi, sanyi, laushi, ko kaushi. [PAUSE 1] Wace gaba ce take taimaka maka ka gani? [MAIN] Ka kula da gabobin jikinka. Kada ka kalli rana kai tsaye, kada ka saka abu mai kaifi a kunne ko hanci, kuma kada ka ci abu da ba ka sani ba. Idan wata gaba ta yi ciwo, ka sanar da babba. [PAUSE 2] Wace gaba ce take gane ɗanɗano? [OUTRO] Ka yi amfani da gabobin ji cikin kulawa. Suna taimaka maka ka koya, ka yi wasa, kuma ka zauna lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace gaba ce take taimaka maka ka gani?" (correct answer: "idanu"; options: idanu, harshe, fata)
- **[PAUSE 2]** — question shown to the learner: "Wace gaba ce take gane ɗanɗano?" (correct answer: "harshe"; options: hanci, harshe, kunnuwa)

---

### `p2-maths-08` — Subtraction Without Borrowing

**Target filename:** `audio/p2-maths-08.mp3`
**Title (Hausa):** Ragi Ba Tare da Aro ba

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ragi Ba Tare da Aro ba. [MAIN] Ragi ba tare da aro ba yana nufin cire lamba daga wata lamba ba tare da bukatar aro daga goma ba. Misali, 30 - 4 = 26. Ka iya tunani cewa kana da abubuwa 30, ka cire 4, sai 26 suka rage. Haka kuma 50 - 7 = 43. [PAUSE 1] 30 - 4 nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] 50 - 7 nawa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "30 - 4 nawa?" (correct answer: "26"; options: 26, 24, 34)
- **[PAUSE 2]** — question shown to the learner: "50 - 7 nawa?" (correct answer: "43"; options: 43, 47, 57)

---

### `p2-socs-08` — Rules at Home and School

**Target filename:** `audio/p2-socs-08.mp3`
**Title (Hausa):** Dokoki a Gida da Makaranta

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Dokoki a Gida da Makaranta. [MAIN] Dokoki su ne ƙa’idoji da suke taimaka wa mutane su zauna lafiya cikin tsari. A gida, iyaye na iya cewa ka wanke hannu kafin cin abinci, ka dawo da kaya wurinsu, ko ka yi magana cikin ladabi. A makaranta, malamai na iya cewa ka zo da wuri, ka saurara a aji, ka ɗaga hannu kafin magana, kuma ka kula da littafi. Dokoki ba don tsoro kawai ba ne; suna kare ka da sauran mutane. [PAUSE 1] Me dokoki suke taimakawa a gida da makaranta? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me ya kamata ka yi kafin magana a aji? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me dokoki suke taimakawa a gida da makaranta?" (correct answer: "tsari"; options: tsari, hayaniya, rashin ladabi)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi kafin magana a aji?" (correct answer: "ɗaga hannu"; options: ɗaga hannu, yin ihu, barin aji)

---

### `p2-bsci-09` — Safety at Home

**Target filename:** `audio/p2-bsci-09.mp3`
**Title (Hausa):** Tsaro a Gida

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi tsaro a gida. [MAIN] Gida wuri ne na zama, amma dole ka yi hankali. Kada ka taɓa wuta, murhu, tukunyar zafi, soket, ko wayar lantarki. Ka guji wuƙa, reza, ƙusa, da kwalbar da ta fashe. Idan ka ga magani ko man fetur, kada ka sha ko ka taɓa shi ba tare da babba ba. [PAUSE 1] Me bai dace ka taɓa da hannunka ba? [MAIN] Idan ruwa ya zube a ɗaki, ka sanar da babba. Ka ajiye kayan wasa daga hanyar tafiya. Idan ka ji wari ko ka ga hayaƙi, ka kira babba nan da nan. [PAUSE 2] Wa za ka kira idan ka ga hayaƙi a gida? [OUTRO] Ka tuna cewa yaro mai hankali yana tambaya kafin ya taɓa abu mai hatsari.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me bai dace ka taɓa da hannunka ba?" (correct answer: "tukunyar zafi"; options: tukunyar zafi, littafi, tabarma)
- **[PAUSE 2]** — question shown to the learner: "Wa za ka kira idan ka ga hayaƙi a gida?" (correct answer: "babba"; options: babba, ƙwallo, takalmi)

---

### `p2-maths-09` — Subtraction With Borrowing

**Target filename:** `audio/p2-maths-09.mp3`
**Title (Hausa):** Ragi Tare da Aro

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ragi Tare da Aro. [MAIN] Ragi tare da aro yana faruwa idan ɗaya-ɗaya da kake da su ba su isa abin da za ka cire ba. Misali, 23 - 8. Ba za ka iya cire 8 daga 3 cikin sauƙi ba, sai ka aro goma ɗaya daga 2 goma. Sai 23 ta zama 1 goma da 13 ɗaya-ɗaya. [PAUSE 1] 23 - 8 nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] 32 - 7 nawa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "23 - 8 nawa?" (correct answer: "15"; options: 15, 16, 25)
- **[PAUSE 2]** — question shown to the learner: "32 - 7 nawa?" (correct answer: "25"; options: 24, 25, 26)

---

### `p2-socs-09` — Leaders in the Community

**Target filename:** `audio/p2-socs-09.mp3`
**Title (Hausa):** Shugabanni a Cikin Al’umma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Shugabanni a Cikin Al’umma. [MAIN] Shugabanni a cikin al’umma mutane ne da suke taimaka wa jama’a su bi tsari. A gida, iyaye suna jagorantar yara. A makaranta, shugaban makaranta da malamai suna taimaka wa ɗalibai. A unguwa, ana iya samun mai unguwa ko dattijo da mutane suke saurara saboda kwarewa da ladabi. [PAUSE 1] Wa ke jagorantar yara a gida? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Wane hali shugaba mai kyau yake nunawa? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wa ke jagorantar yara a gida?" (correct answer: "iyaye"; options: iyaye, ƙwallo, hanya)
- **[PAUSE 2]** — question shown to the learner: "Wane hali shugaba mai kyau yake nunawa?" (correct answer: "sauraro"; options: sauraro, tsokana, rashin gaskiya)

---

### `p2-bsci-10` — Clean Environment

**Target filename:** `audio/p2-bsci-10.mp3`
**Title (Hausa):** Muhalli Mai Tsafta

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi muhalli mai tsafta. [MAIN] Muhalli shi ne wurin da kake zaune, karatu, ko wasa. Idan muhalli ya yi datti, ƙwari, wari, da cuta na iya yawaita. Ka zuba shara a kwandon shara. Kada ka jefa leda, takarda, ko bawon abinci a hanya. [PAUSE 1] Ina ya kamata ka zuba shara? [MAIN] Ka taimaka wajen share ɗaki ko tsakar gida idan manya sun ba ka dama. Kada ruwa mai datti ya taru kusa da gida, domin sauro na iya yawaita a wurin. Ka wanke hannu bayan ka taɓa shara. [PAUSE 2] Me zai iya yawaita a ruwan datti da ya taru? [OUTRO] Muhalli mai tsafta yana sa gida da makaranta su fi kyau da lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ina ya kamata ka zuba shara?" (correct answer: "kwandon shara"; options: kwandon shara, hanyar gida, kan tabarma)
- **[PAUSE 2]** — question shown to the learner: "Me zai iya yawaita a ruwan datti da ya taru?" (correct answer: "sauro"; options: sauro, littafi, alkalami)

---

### `p2-maths-10` — Word Problems: Addition

**Target filename:** `audio/p2-maths-10.mp3`
**Title (Hausa):** Matsalolin Labari na Tarawa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Matsalolin Labari na Tarawa. [MAIN] Matsalolin labari na tarawa suna ɓoye lissafi a cikin magana. Za ka karanta labari, ka gano lambobin da aka ba ka, sannan ka haɗa su. Misali, idan Amina tana da mangwaro 12, mahaifiyarta ta ba ta 5, sai ka tara 12 + 5 = 17. A cikin labari, kalmomi kamar an ƙara, sun shigo, an ba shi, ko jimla suna nuna tarawa. [PAUSE 1] Amina tana da 12, aka ba ta 5. Jimla nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Idan yara 10 sun shigo, 6 kuma suka biyo, jimla nawa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Amina tana da 12, aka ba ta 5. Jimla nawa?" (correct answer: "17"; options: 16, 17, 18)
- **[PAUSE 2]** — question shown to the learner: "Idan yara 10 sun shigo, 6 kuma suka biyo, jimla nawa?" (correct answer: "16"; options: 14, 16, 18)

---

### `p2-socs-10` — Cooperation

**Target filename:** `audio/p2-socs-10.mp3`
**Title (Hausa):** Haɗin Kai

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Haɗin Kai. [MAIN] Haɗin kai yana nufin mutane su yi aiki tare domin cimma abu mai kyau. A gida, yara za su iya haɗa kai wajen gyara ɗaki ko tattara kayan wasa. A makaranta, ɗalibai za su iya haɗa kai wajen share aji, raba littattafai, ko taimaka wa wanda bai fahimta ba. A unguwa, mutane na iya haɗa kai wajen tsaftace hanya ko kula da wurin ruwa. [PAUSE 1] Me haɗin kai yake nufi? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me haɗin kai yake ragewa? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me haɗin kai yake nufi?" (correct answer: "aiki tare"; options: aiki tare, yin faɗa, ɓoye kaya)
- **[PAUSE 2]** — question shown to the learner: "Me haɗin kai yake ragewa?" (correct answer: "wahala"; options: wahala, taimako, zaman lafiya)

---

### `p2-bsci-11` — Simple Machines at Home

**Target filename:** `audio/p2-bsci-11.mp3`
**Title (Hausa):** Sauƙaƙan Kayan Aiki a Gida

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi sauƙaƙan kayan aiki a gida. [MAIN] Sauƙaƙan kayan aiki suna taimaka mana mu yi aiki da sauƙi. Cokali yana ɗebo abinci. Tsintsiya tana share gida. Guga yana ɗaukar ruwa. Mabuɗi yana buɗe ƙofa. Wuƙa tana yanka abu, amma yara sai da kulawar babba. [PAUSE 1] Wane kayan aiki ne ake amfani da shi wajen share gida? [MAIN] Ka lura da kayan aiki a gidanku. Wasu sun dace da yara, wasu kuma sai manya. Kada ka taɓa abu mai kaifi ko nauyi ba tare da izini ba. [PAUSE 2] Me ya kamata ka yi kafin ka taɓa wuƙa? [OUTRO] Ka tuna cewa kayan aiki suna taimakawa, amma dole a yi amfani da su cikin hankali.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kayan aiki ne ake amfani da shi wajen share gida?" (correct answer: "tsintsiya"; options: tsintsiya, ƙwai, madara)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi kafin ka taɓa wuƙa?" (correct answer: "nemi izinin babba"; options: nemi izinin babba, yi wasa da ita, ɓoye ta a aljihu)

---

### `p2-maths-11` — Word Problems: Subtraction

**Target filename:** `audio/p2-maths-11.mp3`
**Title (Hausa):** Matsalolin Labari na Ragi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Matsalolin Labari na Ragi. [MAIN] Matsalolin labari na ragi suna tambayar abin da ya rage bayan an cire wani adadi. Misali, Musa yana da ƙwallaye 18, ya ba abokinsa 6, sai ka yi 18 - 6 = 12. Kalmomi kamar ya bayar, an cire, ya kashe, sun fita, ko saura suna nuna ragi. Ka karanta labari sau ɗaya, sannan ka nemi lambobin da ke ciki. [PAUSE 1] Musa yana da 18, ya ba da 6. Saura nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Kana da 25, ka cire 5. Saura nawa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Musa yana da 18, ya ba da 6. Saura nawa?" (correct answer: "12"; options: 10, 12, 14)
- **[PAUSE 2]** — question shown to the learner: "Kana da 25, ka cire 5. Saura nawa?" (correct answer: "20"; options: 20, 25, 30)

---

### `p2-socs-11` — Nigerian Symbols

**Target filename:** `audio/p2-socs-11.mp3`
**Title (Hausa):** Alamomin Nijeriya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Alamomin Nijeriya. [MAIN] Alamomin Nijeriya abubuwa ne da suke tunatar da mu ƙasarmu. Misalai masu sauƙi su ne tutar Nijeriya, tambarin Nijeriya, taken ƙasa, kuɗin Nijeriya, da launukan kore da fari. Tuta tana da kore, fari, kore. Launin kore yana iya tunatar da mu noma da albarkatun ƙasa, fari kuma yana iya nuni da zaman lafiya. [PAUSE 1] Wane launi ne yake cikin tutar Nijeriya? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Menene kuɗin Nijeriya? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane launi ne yake cikin tutar Nijeriya?" (correct answer: "kore"; options: kore, ruwan hoda, baki)
- **[PAUSE 2]** — question shown to the learner: "Menene kuɗin Nijeriya?" (correct answer: "naira"; options: naira, dutse, ganye)

---

### `p2-bsci-12` — Sources of Light

**Target filename:** `audio/p2-bsci-12.mp3`
**Title (Hausa):** Tushen Haske

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi tushen haske. [MAIN] Haske yana taimaka mana mu ga abubuwa. Rana, wuta, fitila, tocila, da fitilar lantarki suna iya ba da haske. [PAUSE 1] Wane abu ne babban tushen haske da rana? [MAIN] Idan rana ko fitila ta haska abu, inuwa na iya bayyana a gefe. Inuwa wuri ne da haske bai kai sosai ba saboda wani abu ya tare shi. Ka lura da inuwarka daga wuri mai aminci, amma kada ka kalli rana kai tsaye. [PAUSE 2] Me kan bayyana idan haske ya haska abu? [OUTRO] Ka yi amfani da haske cikin aminci, kuma ka tuna cewa inuwa tana bayyana idan wani abu ya tare haske.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne babban tushen haske da rana?" (correct answer: "rana"; options: rana, dutse, kujera)
- **[PAUSE 2]** — question shown to the learner: "Me kan bayyana idan haske ya haska abu?" (correct answer: "inuwa"; options: inuwa, ruwa, sauti)

---

### `p2-maths-12` — Skip Counting by 2

**Target filename:** `audio/p2-maths-12.mp3`
**Title (Hausa):** Tsallake Ƙirga Biyu-Biyu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tsallake Ƙirga Biyu-Biyu. [MAIN] Tsallake ƙirga biyu-biyu yana nufin ƙirga ta hanyar ƙara 2 kowane lokaci. Za ka iya cewa 2, 4, 6, 8, 10. Wannan yana taimaka maka ka ƙirga abubuwa da suke zuwa bibbiyu, kamar takalma, safa, ko idanu. Idan kana ƙirga takalma, kowanne mutum yana da biyu, don haka biyu-biyu ya dace. [PAUSE 1] Bayan 12 a ƙirga biyu-biyu, me ke zuwa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] 2, 4, 6, me ke zuwa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Bayan 12 a ƙirga biyu-biyu, me ke zuwa?" (correct answer: "14"; options: 13, 14, 16)
- **[PAUSE 2]** — question shown to the learner: "2, 4, 6, me ke zuwa?" (correct answer: "8"; options: 7, 8, 10)

---

### `p2-socs-12` — Respect and Good Behaviour

**Target filename:** `audio/p2-socs-12.mp3`
**Title (Hausa):** Girmamawa da Kyawawan Halaye

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Girmamawa da Kyawawan Halaye. [MAIN] Girmamawa tana nufin nuna mutunci ga mutane ta magana da aiki. Kyawawan halaye su ne abubuwan da ke sa mutane su amince da kai, kamar gaskiya, ladabi, taimako, hakuri, da tsabta. A gida, ka gaishe iyaye da manya. A makaranta, ka saurari malami, ka jira lokacinka kafin magana, ka kuma kula da littattafai. [PAUSE 1] Me girmamawa take nufi? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me za ka ce idan wani ya taimaka maka? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me girmamawa take nufi?" (correct answer: "nuna mutunci"; options: nuna mutunci, yin hayaniya, ƙin magana)
- **[PAUSE 2]** — question shown to the learner: "Me za ka ce idan wani ya taimaka maka?" (correct answer: "na gode"; options: na gode, ka tafi, ba komai ba)

---

### `p2-bsci-13` — Sound Around Us

**Target filename:** `audio/p2-bsci-13.mp3`
**Title (Hausa):** Sauti a Kewaye da Mu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi sauti a kewaye da mu. [MAIN] Sauti abu ne da muke ji da kunnuwa. Mutum, ganguna, ƙararrawa, rediyo, mota, da dabbobi suna iya yin sauti. Sauti yana faruwa idan wani abu ya motsa ko ya girgiza. [PAUSE 1] Da wane gaɓa muke jin sauti? [MAIN] Idan ka buga ganga a hankali, gangar tana girgiza kuma tana ba da sauti. Ka iya tafawa sau ɗaya sannan sau biyu ka saurari bambanci, amma kada ka yi hayaniya ko ka buga kunne da ƙarfi. [PAUSE 2] Me ke faruwa da ganga idan ta ba da sauti? [OUTRO] Ka saurari sauti cikin kulawa kuma ka guji hayaniya mai ƙarfi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Da wane gaɓa muke jin sauti?" (correct answer: "kunnuwa"; options: kunnuwa, hanci, hannu)
- **[PAUSE 2]** — question shown to the learner: "Me ke faruwa da ganga idan ta ba da sauti?" (correct answer: "tana girgiza"; options: tana girgiza, tana zama ruwa, tana zama iska)

---

### `p2-maths-13` — Skip Counting by 5

**Target filename:** `audio/p2-maths-13.mp3`
**Title (Hausa):** Tsallake Ƙirga Biyar-Biyar

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tsallake Ƙirga Biyar-Biyar. [MAIN] Tsallake ƙirga biyar-biyar yana nufin ƙara 5 kowane lokaci. Jerin farko shi ne 5, 10, 15, 20, 25. Wannan yana taimaka maka ka ƙirga kuɗi, yatsu, ko ƙananan rukuni na abubuwa. Idan kana da ƙungiyoyi na leda biyar-biyar, za ka iya ƙirga su cikin sauri. [PAUSE 1] Bayan 20 a ƙirga biyar-biyar, me ke zuwa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] 5, 10, 15, me ke zuwa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Bayan 20 a ƙirga biyar-biyar, me ke zuwa?" (correct answer: "25"; options: 21, 25, 30)
- **[PAUSE 2]** — question shown to the learner: "5, 10, 15, me ke zuwa?" (correct answer: "20"; options: 15, 20, 25)

---

### `p2-socs-13` — Festivals and Celebrations

**Target filename:** `audio/p2-socs-13.mp3`
**Title (Hausa):** Bukukuwa da Murna

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Bukukuwa da Murna. [MAIN] Bukukuwa da murna lokuta ne da mutane suke taruwa cikin farin ciki da girmamawa. A gida ko al’umma, mutane na iya yin biki saboda rana ta musamman, aure, suna, nasara a makaranta, ko wata al’ada mai kyau. A lokacin biki, mutane na iya sa tufafi masu tsabta, gaishe da juna, cin abinci, raba alheri, da ziyartar dangi ko maƙwabta. Biki mai kyau yana bukatar tsari, tsafta, da ladabi. [PAUSE 1] Me mutane suke yi a lokacin biki? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Wane hali ake bukata a biki? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me mutane suke yi a lokacin biki?" (correct answer: "murna"; options: murna, faɗa, ɓoye juna)
- **[PAUSE 2]** — question shown to the learner: "Wane hali ake bukata a biki?" (correct answer: "ladabi"; options: ladabi, hayaniya mai cutarwa, rashin tsari)

---

### `p2-bsci-14` — Care of Plants and Animals

**Target filename:** `audio/p2-bsci-14.mp3`
**Title (Hausa):** Kula da Tsirrai da Dabbobi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi kula da tsirrai da dabbobi. [MAIN] Tsirrai da dabbobi masu rai ne. Shuka tana bukatar ruwa, haske, da wuri mai kyau. Kada ka karya rassanta. Dabbobin gida kamar akuya, kaza, saniya, kare, da kyanwa suna bukatar abinci, ruwa, inuwa, da tsafta. [PAUSE 1] Me shuka take bukata domin ta girma? [MAIN] Kada ka jefa wa dabba dutse ko ka ja wutsiyarta. Idan dabba ta yi ciwo, manya za su iya neman likitan dabbobi. Ka wanke hannu bayan ka taɓa dabba ko ƙasa. [PAUSE 2] Me ya kamata ka yi bayan ka taɓa dabba? [OUTRO] Ka kula da tsirrai da dabbobi cikin tausayi, domin su ma halittu ne masu rai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me shuka take bukata domin ta girma?" (correct answer: "ruwa"; options: ruwa, toka, takalmi)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi bayan ka taɓa dabba?" (correct answer: "wanke hannu"; options: wanke hannu, taɓa abinci nan da nan, ɓoye hannunka)

---

### `p2-maths-14` — Skip Counting by 10

**Target filename:** `audio/p2-maths-14.mp3`
**Title (Hausa):** Tsallake Ƙirga Goma-Goma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tsallake Ƙirga Goma-Goma. [MAIN] Tsallake ƙirga goma-goma yana nufin ƙara 10 kowane lokaci. Za ka iya cewa 10, 20, 30, 40, 50, har zuwa 100. Wannan yana taimaka maka ka ƙirga kuɗi, sanduna, ko rukuni-rukuni na goma. Idan malaminka ya tara fensir goma a cikin kowane ƙulli, za ka iya ƙirga ƙullin cikin sauri ta goma-goma. [PAUSE 1] Bayan 40 a ƙirga goma-goma, me ke zuwa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] 10, 20, 30, me ke zuwa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Bayan 40 a ƙirga goma-goma, me ke zuwa?" (correct answer: "50"; options: 30, 50, 60)
- **[PAUSE 2]** — question shown to the learner: "10, 20, 30, me ke zuwa?" (correct answer: "40"; options: 35, 40, 50)

---

### `p2-socs-14` — Our Environment

**Target filename:** `audio/p2-socs-14.mp3`
**Title (Hausa):** Muhallinmu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Muhallinmu. [MAIN] Muhallinmu shi ne wurin da muke rayuwa da abubuwan da ke kewaye da mu. Ya haɗa da gida, makaranta, hanya, kasuwa, itatuwa, ruwa, iska, mutane, da dabbobi. Muhalli mai kyau yana taimaka mana mu zauna lafiya. Idan muhalli ya yi datti, ƙwari da cuta na iya yawaita. [PAUSE 1] Me ake kira wurin da muke rayuwa? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me ya kamata ka yi da shara? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira wurin da muke rayuwa?" (correct answer: "muhalli"; options: muhalli, littafi, ƙwallo)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi da shara?" (correct answer: "zuba a kwandon shara"; options: zuba a kwandon shara, jefa a hanya, ɓoye a ɗaki)

---

### `p2-bsci-15` — Keeping Water Safe

**Target filename:** `audio/p2-bsci-15.mp3`
**Title (Hausa):** Kiyaye Ruwa Mai Tsabta

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi kiyaye ruwa mai tsafta. [MAIN] Ruwa mai tsafta yana taimaka wa jiki ya kasance lafiya. Ruwa na iya fitowa daga famfo, rijiya, borehole, kogi, ko ruwan sama. Amma ruwa mai datti, ƙwari, ko laka zai iya jawo ciwon ciki. [PAUSE 1] A cikin me ya kamata ka ajiye ruwan sha? [MAIN] Ka ajiye ruwan sha a mazubi mai murfi. Kada ka saka hannu mai datti cikin ruwan sha. Yi amfani da kofi ko ludayi mai tsafta. Idan ruwa bai tabbata ba, manya za su iya tacewa ko tafasawa. [PAUSE 2] Me zai iya jawo ciwon ciki? [OUTRO] Ka kiyaye ruwa mai tsafta domin ka kare kanka, iyalinka, da abokanka daga cuta.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A cikin me ya kamata ka ajiye ruwan sha?" (correct answer: "mazubi mai murfi"; options: mazubi mai murfi, ƙasa mai ƙura, kan hanya)
- **[PAUSE 2]** — question shown to the learner: "Me zai iya jawo ciwon ciki?" (correct answer: "ruwa mai datti"; options: ruwa mai datti, kofi mai tsafta, murfi mai kyau)

---

### `p2-maths-15` — Introduction to Multiplication

**Target filename:** `audio/p2-maths-15.mp3`
**Title (Hausa):** Gabatarwa ga Ninkawa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Gabatarwa ga Ninkawa. [MAIN] Ninkawa hanya ce ta ƙara lamba iri ɗaya sau da yawa. Idan kana da rukuni 3, kowanne yana da ƙwallaye 2, za ka iya cewa 2 + 2 + 2 = 6. Wannan shi ne ninkawa: 3 sau 2 = 6. A P2, za ka fara da ƙananan lambobi domin ka ga ma’anar ninkawa. [PAUSE 1] Rukuni 3 na 2 suna da nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Ninkawa tana kama da wace hanya? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Rukuni 3 na 2 suna da nawa?" (correct answer: "6"; options: 5, 6, 8)
- **[PAUSE 2]** — question shown to the learner: "Ninkawa tana kama da wace hanya?" (correct answer: "tarawa da aka maimaita"; options: ragi, tarawa da aka maimaita, kwatanta launi)

---

### `p2-socs-15` — Keeping the Community Clean

**Target filename:** `audio/p2-socs-15.mp3`
**Title (Hausa):** Tsaftace Al’umma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Zamantakewa. Yau za mu koyi Tsaftace Al’umma. [MAIN] Tsaftace al’umma yana nufin kula da wuraren da jama’a suke amfani da su, kamar hanya, makaranta, kasuwa, filin wasa, da wurin ruwa. Idan al’umma ta kasance da tsafta, mutane za su fi samun lafiya da jin daɗi. Yaro zai iya taimakawa ta hanyar zuba shara a kwandon shara, ɗaukar nasa takarda bayan cin abu, da tunatar da ƙani cikin ladabi. Manyan mutane na iya tsara ranar tsafta, share hanya, ko gyara magudanar ruwa. [PAUSE 1] Me tsaftace al’umma yake nufi? [MAIN] Ka haɗa darasin da abin da kake gani a gida, makaranta, kasuwa, ko unguwa. Ka yi tunani a hankali, ka nuna ladabi, sannan ka tambayi babba idan kana bukatar ƙarin bayani. [PAUSE 2] Me ya kamata ka yi bayan aikin tsafta? [OUTRO] Ka ci gaba da lura da rayuwar al’umma. Kyakkyawan hali yana taimaka maka ka zauna lafiya da mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me tsaftace al’umma yake nufi?" (correct answer: "kula da wuraren jama’a"; options: kula da wuraren jama’a, ɓoye shara, lalata hanya)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi bayan aikin tsafta?" (correct answer: "wanke hannu"; options: wanke hannu, ci abinci nan da nan, taɓa fuska)

---

### `p2-maths-16` — Multiplication by 2

**Target filename:** `audio/p2-maths-16.mp3`
**Title (Hausa):** Ninkawa da 2

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ninkawa da 2. [MAIN] Ninkawa da 2 yana nufin ƙirga abu biyu-biyu ko ƙara 2 sau da yawa. Idan kana da mutane 4, kowanne yana da idanu 2, idanu duka za su zama 8. Wannan shi ne 4 sau 2 = 8. Ka iya amfani da takalma, safa, hannu biyu, ko ƙananan dutse-dutse domin ka yi rukuni na biyu. [PAUSE 1] 4 sau 2 nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Wane abu yake zuwa biyu-biyu? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "4 sau 2 nawa?" (correct answer: "8"; options: 6, 8, 10)
- **[PAUSE 2]** — question shown to the learner: "Wane abu yake zuwa biyu-biyu?" (correct answer: "takalma"; options: rana, takalma, allo)

---

### `p2-bsci-16` — What Plants Need to Grow

**Target filename:** `audio/p2-bsci-16.mp3`
**Title (Hausa):** Abubuwan da Tsiro Ke Bukata Domin Girma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi abubuwan da tsiro ke bukata domin girma. [MAIN] Tsiro yana bukatar ruwa, iska, hasken rana, da ƙasa mai dacewa domin ya girma. Tushensa yana samun ruwa daga ƙasa, ganyensa kuma yana amfani da hasken rana. [PAUSE 1] Wane abu ne tushen tsiro yake samu daga ƙasa? [MAIN] Idan ka shuka wake a tukunya tare da babba, ka zuba ruwa kaɗan-kaɗan. Ka sanya tukunyar a wurin da take samun hasken rana, amma kada ka ja ganye ko ka karya kara. Ka lura ko sabon ganye ya fito. [PAUSE 2] Me bai kamata ka yi wa tsiro ba? [OUTRO] Ka kula da tsiro cikin hankali; ruwa, iska, hasken rana, da ƙasa mai dacewa suna taimaka masa girma.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne tushen tsiro yake samu daga ƙasa?" (correct answer: "ruwa"; options: ruwa, toka, gilashi)
- **[PAUSE 2]** — question shown to the learner: "Me bai kamata ka yi wa tsiro ba?" (correct answer: "ka karya kara"; options: ka karya kara, ka lura da shi, ka zuba ruwa kaɗan)

---

### `p2-maths-17` — Multiplication by 5

**Target filename:** `audio/p2-maths-17.mp3`
**Title (Hausa):** Ninkawa da 5

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ninkawa da 5. [MAIN] Ninkawa da 5 yana nufin ƙara 5 sau da yawa. Idan kana da rukuni 3 na kuɗin naira 5, jimla za ta zama naira 15. Za ka iya ƙirga 5, 10, 15, 20. Lambobin ninkawa da 5 sau da yawa suna ƙarewa da 5 ko 0, wanda zai taimaka maka ka gane su da sauri. [PAUSE 1] 3 sau 5 nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Lambobin 5 suna ƙarewa da me? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "3 sau 5 nawa?" (correct answer: "15"; options: 10, 15, 20)
- **[PAUSE 2]** — question shown to the learner: "Lambobin 5 suna ƙarewa da me?" (correct answer: "5 ko 0"; options: 1 ko 2, 5 ko 0, 7 ko 8)

---

### `p2-bsci-17` — Habitats and Their Differences

**Target filename:** `audio/p2-bsci-17.mp3`
**Title (Hausa):** Mazaunin Halittu da Bambancinsu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi mazaunin halittu da bambancinsu. [MAIN] Mazauni wuri ne da halitta take rayuwa ko take samun abin da take bukata. Kifi yana rayuwa a ruwa, tsiro yana girma a ƙasa, tsuntsu kuma na iya zama a bishiya ko ya gina sheƙa. [PAUSE 1] A ina kifi yake rayuwa? [MAIN] Ka lura da halittu daga nesa ka haɗa su da wurinsu. Kada ka taɓa sheƙa, rami, ko dabbar daji. Idan ka ga dabba mai hatsari ko wurin da ba ka sani ba, ka sanar da babba. [PAUSE 2] Me bai kamata ka taɓa ba domin wasa? [OUTRO] Ka girmama mazaunin halittu; kowane wuri yana taimaka wa wata halitta ta rayu.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A ina kifi yake rayuwa?" (correct answer: "a ruwa"; options: a ruwa, cikin wuta, a kan rufi)
- **[PAUSE 2]** — question shown to the learner: "Me bai kamata ka taɓa ba domin wasa?" (correct answer: "sheƙar tsuntsu"; options: sheƙar tsuntsu, littafi, allon aji)

---

### `p2-maths-18` — Multiplication by 10

**Target filename:** `audio/p2-maths-18.mp3`
**Title (Hausa):** Ninkawa da 10

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Ninkawa da 10. [MAIN] Ninkawa da 10 yana nufin ƙara 10 sau da yawa. Idan kana da rukuni 4 na abubuwa 10, jimla za ta zama 40. Ka iya ƙirga goma-goma: 10, 20, 30, 40, 50. Wannan yana da amfani idan kana ƙirga sanduna, kuɗi, ko littattafai a rukuni na goma. [PAUSE 1] 4 sau 10 nawa? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] 6 sau 10 nawa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "4 sau 10 nawa?" (correct answer: "40"; options: 30, 40, 50)
- **[PAUSE 2]** — question shown to the learner: "6 sau 10 nawa?" (correct answer: "60"; options: 16, 60, 70)

---

### `p2-bsci-18` — Materials, Their Properties and Uses

**Target filename:** `audio/p2-bsci-18.mp3`
**Title (Hausa):** Kayan Abu, Halayensu da Amfaninsu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi kayan abu, halayensu da amfaninsu. [MAIN] Ana yin abubuwa da itace, ƙarfe, roba, zane, filastik, da gilashi. Itace tana iya zama tebur, ƙarfe yana iya zama cokali, roba tana iya zama takalmi, zane kuma yana iya zama riga. [PAUSE 1] Wane kaya ake iya yin riga da shi? [MAIN] Wasu kayan suna da tauri, wasu masu laushi ne; wasu suna da santsi, wasu masu kaushi ne. Wasu suna lanƙwasuwa da sauƙi, wasu ba sa lanƙwasuwa da sauƙi. Kada ka taɓa gilashi da ya karye, ƙarfe mai kaifi, ko abu mai zafi. [PAUSE 2] Me ya kamata ka yi idan ka ga gilashi da ya karye? [OUTRO] Ka duba kayan abu masu aminci a kusa da kai, ka faɗi halinsu da abin da ya sa ake amfani da su.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kaya ake iya yin riga da shi?" (correct answer: "zane"; options: zane, ruwa, iska)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi idan ka ga gilashi da ya karye?" (correct answer: "ka sanar da babba"; options: ka sanar da babba, ka ɗauke shi da hannu, ka taka shi)

---

### `p2-maths-19` — Nigerian Money: Naira and Kobo

**Target filename:** `audio/p2-maths-19.mp3`
**Title (Hausa):** Kuɗin Nijeriya: Naira da Kobo

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Kuɗin Nijeriya: Naira da Kobo. [MAIN] Kuɗin Nijeriya yana taimaka wa mutane su saya da sayarwa. Manyan sunaye biyu su ne naira da kobo. A yau, yara suna yawan ganin naira a kasuwa, a shaguna, ko wajen biyan mota. Za ka iya ganin takardar naira 50, 100, 200, ko 500. [PAUSE 1] Wane suna ne ake amfani da shi ga kuɗin Nijeriya? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Kobo wane irin ɓangare ne? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane suna ne ake amfani da shi ga kuɗin Nijeriya?" (correct answer: "naira"; options: naira, ganye, hula)
- **[PAUSE 2]** — question shown to the learner: "Kobo wane irin ɓangare ne?" (correct answer: "ƙaramin ɓangare na naira"; options: ƙaramin ɓangare na naira, dabba, siffa)

---

### `p2-bsci-19` — Clay and Moulding Shapes

**Target filename:** `audio/p2-bsci-19.mp3`
**Title (Hausa):** Laka da Ƙera Siffofi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi laka da ƙera siffofi. [MAIN] Laka ƙasa ce mai laushi idan ta sami ruwa kaɗan. Ana iya matse ta da hannu a ƙera ƙwallo, ƙaramin kwano, ko dabba ta wasa. Idan laka ta bushe, siffar na ƙara tauri. [PAUSE 1] Yaya laka take idan ta sami ruwa kaɗan? [MAIN] Ka yi aiki da laka tare da izinin babba kuma ka yi amfani da laka mai tsafta. Kada ka sa laka a baki ko ka jefa wa wani. Bayan ka gama, ka wanke hannuwanka da sabulu da ruwa. [PAUSE 2] Me ya kamata ka yi bayan aikin laka? [OUTRO] Ka lura da laka mai ɗan ruwa da busasshiyar laka; ɗayarsu tana sauƙin ƙerawa, ɗayar kuma ta fi tauri.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Yaya laka take idan ta sami ruwa kaɗan?" (correct answer: "mai laushi"; options: mai laushi, mai ƙonewa, mai kaifi)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi bayan aikin laka?" (correct answer: "ka wanke hannuwanka"; options: ka wanke hannuwanka, ka sa laka a baki, ka jefa laka wa wani)

---

### `p2-maths-20` — Adding Small Amounts of Money

**Target filename:** `audio/p2-maths-20.mp3`
**Title (Hausa):** Tara Ƙananan Kuɗi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tara Ƙananan Kuɗi. [MAIN] Tara ƙananan kuɗi yana nufin haɗa adadin kuɗi domin ka san jimla. Idan kana da naira 20, aka ƙara maka naira 10, jimla ta zama naira 30. A kasuwa, wannan yana taimaka maka ka san nawa za ka biya idan ka sayi abubuwa biyu. Misali, alewa naira 5 da biskit naira 10 sun zama naira 15. [PAUSE 1] Naira 20 da naira 10 nawa ne? [MAIN] Ka yi amfani da misalai daga gida ko aji. Ka rubuta lambobi a hankali, ka duba matsayi, sannan ka sake lissafi kafin ka amsa. Idan ka yi kuskure, ka gyara cikin natsuwa. [PAUSE 2] Naira 5 da naira 10 nawa ne? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Naira 20 da naira 10 nawa ne?" (correct answer: "30"; options: 25, 30, 40)
- **[PAUSE 2]** — question shown to the learner: "Naira 5 da naira 10 nawa ne?" (correct answer: "15"; options: 10, 15, 20)

---

### `p2-maths-21` — Length: Long and Short

**Target filename:** `audio/p2-maths-21.mp3`
**Title (Hausa):** Tsawo: Dogaye da Gajeru

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Tsawo: Dogaye da Gajeru. [MAIN] Tsawo yana taimaka maka ka kwatanta abubuwa. Abu dogo yana da tsawo fiye da wani, abu gajere kuma bai kai tsawon wancan ba. A gida, sanda na iya fi cokali tsawo. A aji, dogon layi na iya fi gajeren layi. [PAUSE 1] Wane abu ne yawanci ya fi tsawo: sanda ko cokali? [MAIN] Ka kwatanta tsawo ta hanyar sa abubuwa su fara daga wuri ɗaya. Idan sanda ta fi cokali tsawo, sanda doguwa ce, cokali kuma gajere ne. Za ka iya kwatanta fensir, igiya, tabarma, hanya, ko zane cikin natsuwa. [PAUSE 2] Idan abu bai kai wani tsawo ba, me ake ce masa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne yawanci ya fi tsawo: sanda ko cokali?" (correct answer: "sanda"; options: sanda, cokali, ƙwai)
- **[PAUSE 2]** — question shown to the learner: "Idan abu bai kai wani tsawo ba, me ake ce masa?" (correct answer: "gajere"; options: dogo, gajere, mai nauyi)

---

### `p2-maths-22` — Weight: Heavy and Light

**Target filename:** `audio/p2-maths-22.mp3`
**Title (Hausa):** Nauyi: Masu Nauyi da Masu Sauƙi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Nauyi: Masu Nauyi da Masu Sauƙi. [MAIN] Nauyi yana nuna ko abu yana da nauyi ko sauƙi idan ka ɗauke shi. Dutse yawanci ya fi takarda nauyi. Littafi na iya fi fensir nauyi. Kada ka ɗauki abu mai nauyi sosai kai kaɗai; ka nemi taimakon babba. [PAUSE 1] Wane abu ya fi nauyi: dutse ko takarda? [MAIN] Ka kwatanta nauyi da abubuwa masu aminci. Ka iya ɗaukar fensir da littafi, ko guga marar ruwa da guga mai ruwa, ka ji wanda ya fi nauyi. Kada ka ɗauki abu mai nauyi sosai kai kaɗai; ka nemi taimakon babba. [PAUSE 2] Guga mai ruwa yawanci ya fi me nauyi? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ya fi nauyi: dutse ko takarda?" (correct answer: "dutse"; options: dutse, takarda, iska)
- **[PAUSE 2]** — question shown to the learner: "Guga mai ruwa yawanci ya fi me nauyi?" (correct answer: "guga marar ruwa"; options: guga marar ruwa, ganye, sauti)

---

### `p2-maths-23` — Shapes Around Us

**Target filename:** `audio/p2-maths-23.mp3`
**Title (Hausa):** Siffofi a Kewaye da Mu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Siffofi a Kewaye da Mu. [MAIN] Siffofi suna kewaye da kai a gida, makaranta, da kasuwa. Da’ira tana zagaye ba tare da kusurwa ba; zobe, faranti, da ƙwallo suna kama da da’ira. Murabba’i yana da gefe huɗu daidai, kamar wasu tiles. Murabba’i mai tsawo yana da gefe huɗu, amma biyu sun fi tsawo, kamar ƙofar ɗaki ko littafi. [PAUSE 1] Wace siffa ce take da gefe uku? [MAIN] Ka duba gefuna da kusurwa. Alwatika tana da gefe uku. Murabba’i yana da gefe huɗu daidai. Murabba’i mai tsawo yana da gefe huɗu, amma biyu sun fi tsawo. Da’ira kuma tana zagaye ba tare da kusurwa ba. [PAUSE 2] Wace siffa ce take zagaye? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace siffa ce take da gefe uku?" (correct answer: "alwatika"; options: zobe, alwatika, murabba’i)
- **[PAUSE 2]** — question shown to the learner: "Wace siffa ce take zagaye?" (correct answer: "da’ira"; options: da’ira, murabba’i mai tsawo, alwatika)

---

### `p2-maths-24` — Telling Time: Hour and Half Hour

**Target filename:** `audio/p2-maths-24.mp3`
**Title (Hausa):** Faɗin Lokaci: Awa da Rabin Awa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Lissafi. Yau za mu koyi Faɗin Lokaci: Awa da Rabin Awa. [MAIN] Faɗin lokaci yana taimaka maka ka san lokacin karatu, sallah, wasa, cin abinci, da barci. Agogo yana da hannaye da suke nuna lokaci. Idan babban hannu yana kan 12, ana nuna cikakkiyar awa, kamar ƙarfe 7. Idan babban hannu yana kan 6, ana nuna rabin awa, kamar 7 da rabi. [PAUSE 1] Idan babban hannu yana kan 12, me ake nuna wa? [MAIN] Ka fara duba babban hannu a agogo. Idan yana kan 12, ana nuna cikakkiyar awa, kamar ƙarfe 7. Idan yana kan 6, ana nuna rabin awa, kamar 7 da rabi. Ka nemi babba ya nuna maka misalai a agogon gida ko makaranta. [PAUSE 2] Idan babban hannu yana kan 6, me ake nuna wa? [OUTRO] Ka ci gaba da atisaye. Lissafi yana ƙaruwa da maimaitawa da amfani da misalai na yau da kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan babban hannu yana kan 12, me ake nuna wa?" (correct answer: "cikakkiyar awa"; options: cikakkiyar awa, rabin awa, siffa)
- **[PAUSE 2]** — question shown to the learner: "Idan babban hannu yana kan 6, me ake nuna wa?" (correct answer: "rabin awa"; options: rabin awa, kuɗi, nauyi)

---
