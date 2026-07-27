# AJAMIX Audio Recording Package — p3 (55 modules)

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

### `p3-maths-01` — Numbers to 1,000 and Place Value

**Target filename:** `audio/p3-maths-01.mp3`
**Title (Hausa):** Lambobi Har Zuwa 1,000 da Matsayin Lamba

**Script to read:**

> [INTRO] Yau za mu koyi lambobi har zuwa dubu ɗaya da matsayin kowace lamba. [MAIN] Lamba tana da wurare. A 342, 3 tana wurin ɗari, 4 tana wurin gommai, 2 tana wurin ɗaya-ɗaya. Idan ka ga 567, ka san akwai ɗari biyar, gommai shida, da ɗaya-ɗaya bakwai. [PAUSE 1] A lamba 342, wace lamba ce a wurin ɗari? [MAIN] Ka iya haɗa lamba daga sassa. Idan aka ce 4 ɗari, 5 goma, da 6 ɗaya, lambar ita ce 456. [PAUSE 2] Idan aka haɗa 4 ɗari, 5 goma, da 6 ɗaya, wace lamba ce? [OUTRO] Ka tuna: daruruwa, gommai, da ɗaya-ɗaya suna gaya maka ƙimar lamba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A lamba 342, wace lamba ce a wurin ɗari?" (correct answer: "3"; options: 3, 4, 2)
- **[PAUSE 2]** — question shown to the learner: "Idan aka haɗa 4 ɗari, 5 goma, da 6 ɗaya, wace lamba ce?" (correct answer: "456"; options: 456, 465, 546)

---

### `p3-bsci-01` — Classifying Living Things

**Target filename:** `audio/p3-bsci-01.mp3`
**Title (Hausa):** Rarraba Abubuwa Masu Rai

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi rarraba abubuwa masu rai. [MAIN] Abu mai rai yana girma, yana bukatar abinci ko ruwa, yana numfashi, kuma yana iya haihuwa ko samar da iri. Tsirrai kamar masara, wake, mangwaro, da ciyawa suna da tushe, kara, ganye, ko 'ya'ya. Dabbobi kamar kaza, akuya, saniya, kifi, da ɓera suna motsi domin neman abinci, ruwa, ko mafaka. [PAUSE 1] Wane rukuni ne masara take ciki? [MAIN] Ana iya ƙara rarraba dabbobi ta wurin mazauninsu: kifi a ruwa, akuya a doron ƙasa, tsuntsu kuma yana iya shawagi a iska. Ka tambayi kanka: shin abin da nake gani yana da ganye ne, ko yana motsi kamar dabba? [PAUSE 2] Wane rukuni ne akuya take ciki? [OUTRO] Ka ci gaba da lura da halittu a kewaye da kai domin ka fi gane tsirrai da dabbobi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane rukuni ne masara take ciki?" (correct answer: "tsirrai"; options: tsirrai, dabbobi, kayan aiki)
- **[PAUSE 2]** — question shown to the learner: "Wane rukuni ne akuya take ciki?" (correct answer: "dabbobi"; options: tsirrai, dabbobi, ruwa)

---

### `p3-socs-01` — The Meaning and Importance of Social and Citizenship Studies

**Target filename:** `audio/p3-socs-01.mp3`
**Title (Hausa):** Ma’ana da Muhimmancin Nazarin Zamantakewa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi ma’ana da muhimmancin Nazarin Zamantakewa. [MAIN] Nazarin Zamantakewa yana koya maka yadda mutane suke rayuwa tare a gida, makaranta, unguwa, da ƙasa. Yana bayyana ayyukan mutane, dokoki, al’adu, da taimakon juna. Idan ka fahimci bukatun al’umma, za ka iya kula da kayan jama’a, sauraron wasu, da warware matsala cikin natsuwa. [PAUSE 1] Me Nazarin Zamantakewa yake koya maka game da mutane? [MAIN] Kai ma kana da rawa a al’umma. Za ka iya bin dokar makaranta, zuba shara a inda ya dace, girmama mutane, da faɗin gaskiya. Mutane na iya samun ayyuka da al’adu iri-iri, amma haɗin kai yana taimaka musu su zauna lafiya. Wannan darasi yana koya maka lura, tambaya, tattaunawa, da yin abin kirki. [PAUSE 2] Wane hali ne yake taimaka wa mutane su zauna lafiya? [OUTRO] Ka lura da abu ɗaya da ke nuna haɗin kai a gidanku ko makarantarku; wannan shi ne Nazarin Zamantakewa a aikace.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me Nazarin Zamantakewa yake koya maka game da mutane?" (correct answer: "yadda mutane suke rayuwa tare"; options: yadda mutane suke rayuwa tare, yadda ake ɓoye kaya, yadda ake guje wa makaranta)
- **[PAUSE 2]** — question shown to the learner: "Wane hali ne yake taimaka wa mutane su zauna lafiya?" (correct answer: "haɗin kai"; options: rashin sauraro, haɗin kai, lalata kayan jama’a)

---

### `p3-maths-02` — Addition with Regrouping

**Target filename:** `audio/p3-maths-02.mp3`
**Title (Hausa):** Ƙari da Sake Haɗawa

**Script to read:**

> [INTRO] A yau za mu yi ƙari da sake haɗawa. [MAIN] Idan ɗaya-ɗaya suka kai goma ko suka wuce goma, sai mu ɗauki goma ɗaya zuwa wurin gommai. Misali, 27 da 15. Bakwai da biyar sun zama goma sha biyu. Rubuta biyu a wurin ɗaya-ɗaya, sannan ka ɗauki goma ɗaya zuwa wurin gommai. Sai gommai su zama huɗu. Amsa ita ce 42. [PAUSE 1] Nawa ne 27 + 15? [MAIN] Ka riƙa farawa daga dama, wato ɗaya-ɗaya. Idan jimlar ta kai goma ko fiye, ka sake haɗawa. Wannan yana sa ƙari ya zama mai tsari. [PAUSE 2] Idan 8 + 7 ya zama 15, me za ka rubuta a wurin ɗaya-ɗaya? [OUTRO] Ka tuna: fara daga ɗaya-ɗaya, ɗauki goma idan ya cancanta.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nawa ne 27 + 15?" (correct answer: "42"; options: 42, 32, 52)
- **[PAUSE 2]** — question shown to the learner: "Idan 8 + 7 ya zama 15, me za ka rubuta a wurin ɗaya-ɗaya?" (correct answer: "5"; options: 5, 1, 15)

---

### `p3-bsci-02` — Parts of the Body and Their Functions

**Target filename:** `audio/p3-bsci-02.mp3`
**Title (Hausa):** Sassan Jiki da Ayyukansu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi sassan jiki da ayyukansu. [MAIN] Jikinka yana da sassa da yawa. Da idanu kake gani, da kunnuwa kake jin sauti, da hanci kake jin ƙamshi, da baki kake magana da cin abinci. Hannu suna taimaka maka ka rubuta ko ka ɗauki littafi. Ƙafafu suna taimaka maka ka tsaya, ka yi tafiya, ko ka gudu. [PAUSE 1] Wane sashi ne yake taimaka maka ka gani? [MAIN] Fata tana rufe jiki kuma tana taimaka maka ka ji zafi, sanyi, laushi, ko tauri. Zuciya tana bugawa a cikin ƙirji domin ta taimaka wa jini ya zagaya jiki. Ka kula da jikinka da wanka, abinci mai kyau, hutu, da wasa lafiya. [PAUSE 2] Wane sashi ne yake taimaka maka ka yi tafiya? [OUTRO] Ka tuna cewa kowane sashin jiki yana da amfani, don haka ka kula da jikinka kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane sashi ne yake taimaka maka ka gani?" (correct answer: "idanu"; options: idanu, ƙafafu, hanci)
- **[PAUSE 2]** — question shown to the learner: "Wane sashi ne yake taimaka maka ka yi tafiya?" (correct answer: "ƙafafu"; options: kunnuwa, ƙafafu, baki)

---

### `p3-socs-02` — Our Local Government Area

**Target filename:** `audio/p3-socs-02.mp3`
**Title (Hausa):** Yankin Ƙaramar Hukumarmu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yankin ƙaramar hukumarmu. [MAIN] Ƙaramar hukuma (LGA) hukuma ce da take kusa da jama’ar gari da ƙauye. Tana kula da wasu ayyukan da mutane suke bukata a yankinta. Ana raba yankin zuwa ƙananan yankuna domin wakilai da ma’aikata su san bukatun jama’a. A ofishin ƙaramar hukuma ake tsara ayyuka da karɓar bayani. [PAUSE 1] Wace hukuma ce take kusa da jama’ar gari da ƙauye? [MAIN] Ayyukan ƙaramar hukuma na iya haɗawa da kula da kasuwa, wasu hanyoyi, tsaftar muhalli, wuraren ruwa, makarantu, da cibiyoyin lafiya. Hukumomin jiha, ma’aikata, da jama’a su ma suna iya taimakawa. Idan wani wurin ruwa ya lalace, manya za su iya sanar da ofishin da ya dace cikin ladabi. Shugabanni da wakilai suna sauraron bukatun jama’a kuma suna tsara aiki. [PAUSE 2] Ina ake karɓar bayani game da bukatun yankin ƙaramar hukuma? [OUTRO] Ka tambayi babba sunan ƙaramar hukumarku da wani aikin jama’a da take yi a yankinku.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace hukuma ce take kusa da jama’ar gari da ƙauye?" (correct answer: "ƙaramar hukuma"; options: ƙungiyar wasa, ƙaramar hukuma, ajin makaranta)
- **[PAUSE 2]** — question shown to the learner: "Ina ake karɓar bayani game da bukatun yankin ƙaramar hukuma?" (correct answer: "ofishin ƙaramar hukuma"; options: filin wasa, cikin mota, ofishin ƙaramar hukuma)

---

### `p3-maths-03` — Subtraction with Regrouping

**Target filename:** `audio/p3-maths-03.mp3`
**Title (Hausa):** Ragi da Ɗaukar Aro

**Script to read:**

> [INTRO] Yau za mu koyi ragi da ɗaukar aro. [MAIN] Idan ɗaya-ɗaya da ke sama sun yi kaɗan, sai mu ɗauki aro daga gommai. A 52 rage 18, 2 ba ta isa a cire 8 ba. Sai wurin ɗaya-ɗaya ya zama 12, kuma gommai biyar su koma gommai huɗu. [PAUSE 1] Nawa ne 52 - 18? [MAIN] Bayan ɗaukar aro, 12 rage 8 ya zama 4. Sai gommai huɗu rage goma ɗaya ya zama gommai uku. Amsa ita ce 34. [PAUSE 2] Idan ɗaya-ɗaya a sama sun yi kaɗan, daga ina ake ɗaukar aro? [OUTRO] Ka tuna: ɗaukar aro yana canja goma ɗaya zuwa ɗaya-ɗaya goma.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nawa ne 52 - 18?" (correct answer: "34"; options: 34, 44, 24)
- **[PAUSE 2]** — question shown to the learner: "Idan ɗaya-ɗaya a sama sun yi kaɗan, daga ina ake ɗaukar aro?" (correct answer: "gommai"; options: gommai, daruruwa, sifili)

---

### `p3-bsci-03` — Growth and Life Cycles

**Target filename:** `audio/p3-bsci-03.mp3`
**Title (Hausa):** Girma da Zagayowar Rayuwa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi girma da zagayowar rayuwa. [MAIN] Abubuwa masu rai suna girma kuma suna bin matakai na rayuwa. Iri yana toho, ya zama ƙaramar shuka, ya fitar da ganye da furanni, sannan ya samar da sabbin iri. Sabbin irin za su iya fara wata zagayowa. [PAUSE 1] Me iri yake fara yi bayan an shuka shi da kyau? [MAIN] Uwar kaza tana yin ƙwai, ƙwai ya ƙyanƙyashe, sai ɗan kaza ya fito. Ɗan kaza yana girma har ya zama babbar kaza ko zakara. Zagayowar shuka da ta kaza sun bambanta, amma dukansu suna nuna sauyin halitta yayin girma. [PAUSE 2] Me ke fitowa daga ƙwai idan ya ƙyanƙyashe? [OUTRO] Ka tuna cewa halittu suna bin matakan rayuwa kuma suna bukatar kulawa domin su girma lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me iri yake fara yi bayan an shuka shi da kyau?" (correct answer: "toho"; options: toho, ƙwai, tafiya)
- **[PAUSE 2]** — question shown to the learner: "Me ke fitowa daga ƙwai idan ya ƙyanƙyashe?" (correct answer: "ɗan kaza"; options: ɗan kaza, ganye, dutse)

---

### `p3-socs-03` — Community Needs and Services

**Target filename:** `audio/p3-socs-03.mp3`
**Title (Hausa):** Bukatun Al’umma da Ayyukan Jama’a

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi bukatun al’umma da ayyukan jama’a. [MAIN] Ruwa mai tsabta, cibiyar lafiya, hanya, makaranta, kasuwa, da tsaftataccen muhalli bukatun jama’a ne. Aikin da ake yi domin biyan buƙata shi ake kira hidimar jama’a. Gyaran famfo yana taimaka wa mutane su sami ruwa, koyarwa tana taimaka wa yara, kuma kula da marasa lafiya yana taimaka wa masu jinya. [PAUSE 1] Wane abu ne misalin buƙatar al’umma? [MAIN] Don gano buƙata, ka lura da yankinku kuma ka tambayi mutane cikin ladabi. Ruwa da ya taru a hanya na iya nuna buƙatar magudanar ruwa. Bayan an gano matsala, al’umma za ta iya sanar da hukuma ko shirya taimako tare da manya. Yara ba sa yin aiki mai haɗari, amma za su iya kula da kayan jama’a da gaya wa babba abin da suka gani. [PAUSE 2] Me ake kira aikin da ake yi domin biyan buƙatar jama’a? [OUTRO] Ka zana taswirar unguwarku ka nuna buƙata ɗaya da hidimar da za ta iya taimakawa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne misalin buƙatar al’umma?" (correct answer: "Ruwa mai tsabta"; options: Ruwa mai tsabta, takalmi mai tsada, abin wasa na mutum)
- **[PAUSE 2]** — question shown to the learner: "Me ake kira aikin da ake yi domin biyan buƙatar jama’a?" (correct answer: "hidimar jama’a"; options: sirrin gida, hidimar jama’a, wasan mutum ɗaya)

---

### `p3-maths-04` — Multiplication Tables 2, 3, 4, 5, and 10

**Target filename:** `audio/p3-maths-04.mp3`
**Title (Hausa):** Teburin Ninkawa na 2, 3, 4, 5, da 10

**Script to read:**

> [INTRO] A yau za mu koyi teburin ninkawa na 2, 3, 4, 5, da 10. [MAIN] Ninkawa yana nufin haɗa adadi iri ɗaya sau da yawa. Idan muka ce 4 sau 3, muna nufin rukuni 3 na 4: 4 + 4 + 4. [PAUSE 1] Nawa ne 4 × 3? [MAIN] Ka tuna da misalai daga gida. Kujeru 3, kowace tana da ƙafa 4, za su ba da ƙafa 12. Kwalabe 5 na ₦10 za su zama ₦50. [PAUSE 2] Idan kwalba ɗaya tana ₦10, kwalabe 5 nawa ne? [OUTRO] Ka riƙa ganin ninkawa a matsayin rukuni-rukuni.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nawa ne 4 × 3?" (correct answer: "12"; options: 12, 7, 16)
- **[PAUSE 2]** — question shown to the learner: "Idan kwalba ɗaya tana ₦10, kwalabe 5 nawa ne?" (correct answer: "50"; options: 50, 15, 40)

---

### `p3-bsci-04` — Our Environment

**Target filename:** `audio/p3-bsci-04.mp3`
**Title (Hausa):** Muhallinmu

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi muhalli. [MAIN] Muhalli shi ne wurin da kake rayuwa, wasa, karatu, da taimakon iyali. Ya haɗa da gida, makaranta, masallaci, kasuwa, gona, titi, rijiya, bishiyoyi, dabbobi, mutane, iska, ruwa, da ƙasa. [PAUSE 1] Wane wuri ne yake cikin muhallin makaranta? [MAIN] Muhalli mai tsabta yana rage cuta kuma yana sa ka ji daɗi. Kada ka zubar da leda ko ƙashin abinci ko'ina. Ka sanya shara a kwandon shara, ka share aji, ka rufe rijiya, kuma ka kula da bishiyoyi. [PAUSE 2] A ina ya kamata ka sanya shara? [OUTRO] Ka kula da muhallinka domin gida, makaranta, da al'umma su kasance lafiya da kyau.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane wuri ne yake cikin muhallin makaranta?" (correct answer: "aji"; options: aji, ƙwai, tocila)
- **[PAUSE 2]** — question shown to the learner: "A ina ya kamata ka sanya shara?" (correct answer: "kwandon shara"; options: kwandon shara, kan hanya, cikin ruwan sha)

---

### `p3-socs-04` — Transportation — Road and Rail

**Target filename:** `audio/p3-socs-04.mp3`
**Title (Hausa):** Sufuri ta Hanya da Jirgin Ƙasa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi sufuri ta hanya da jirgin ƙasa. [MAIN] Sufuri yana nufin ɗaukar mutane ko kaya daga wani wuri zuwa wani. Mota, babur, keke, da babbar mota suna tafiya a hanya. Jirgin ƙasa yana tafiya a kan layin dogo, yana ɗaukar fasinjoji ko kaya. Babbar mota na iya kai amfanin gona kasuwa, jirgin ƙasa kuma yana bin layinsa tsakanin wurare. [PAUSE 1] A ina jirgin ƙasa yake tafiya? [MAIN] Tsaro yana da muhimmanci. Ka zauna a wurin da ya dace, ka ɗaura abin kariya idan yana nan, kuma kada ka fitar da hannu daga mota. Kafin ka tsallaka hanya, tsaya ka duba ɓangarori biyu a wuri mai aminci, ka bi umarnin babba. Kada ka yi wasa a hanya ko kusa da layin dogo. [PAUSE 2] Me ya kamata ka yi kafin ka tsallaka hanya? [OUTRO] A tafiyarka ta gaba, ka bambanta abin hawa na hanya da jirgin da yake bin layin dogo, sannan ka tuna da dokar tsaro ɗaya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A ina jirgin ƙasa yake tafiya?" (correct answer: "a kan layin dogo"; options: a cikin kasuwa, a kan layin dogo, a cikin kogin)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi kafin ka tsallaka hanya?" (correct answer: "tsaya ka duba ɓangarori biyu"; options: gudu ba tare da dubawa ba, yi wasa a hanya, tsaya ka duba ɓangarori biyu)

---

### `p3-maths-05` — Introduction to Division

**Target filename:** `audio/p3-maths-05.mp3`
**Title (Hausa):** Gabatarwa ga Rarrabawa

**Script to read:**

> [INTRO] Yau za mu fara koyon rarrabawa. [MAIN] Rarrabawa tana nufin raba abu daidai. Idan akwai alewa 20 ga yara 10, kowane yaro zai samu 2. Wannan yana da alaƙa da ninkawa, saboda 10 sau 2 ya zama 20. [PAUSE 1] Idan an raba alewa 20 ga yara 10 daidai, kowane yaro zai samu nawa? [MAIN] Ka kuma iya tunanin rukuni. Idan abubuwa 30 sun shiga rukuni 5 daidai, kowane rukuni zai samu 6. [PAUSE 2] Idan an raba abubuwa 30 zuwa rukuni 5 daidai, kowane rukuni nawa zai samu? [OUTRO] Ka tuna: rarrabawa na neman rabo daidai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan an raba alewa 20 ga yara 10 daidai, kowane yaro zai samu nawa?" (correct answer: "2"; options: 2, 10, 20)
- **[PAUSE 2]** — question shown to the learner: "Idan an raba abubuwa 30 zuwa rukuni 5 daidai, kowane rukuni nawa zai samu?" (correct answer: "6"; options: 6, 5, 10)

---

### `p3-bsci-05` — The Water Cycle

**Target filename:** `audio/p3-bsci-05.mp3`
**Title (Hausa):** Zagayowar Ruwa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi zagayowar ruwa, amfaninsa, da tsabtarsa. [MAIN] Rana tana sa ruwa ya tashi kamar tururi. Tururin yana taruwa ya zama gajimare, sannan ruwan sama ya sauko. [PAUSE 1] Me ake kira lokacin da ruwa ya tashi sama kamar tururi? [MAIN] Ana amfani da ruwa mai tsafta wajen sha, girki, wanka, da ban ruwa. Ba duk ruwan da ake gani ne ya dace a sha ba. A sha ruwan da babba ya tabbatar da tsabtarsa, a rufe mazubi, kuma kada a zubar da shara cikin rafi ko rijiya. [PAUSE 2] Wane ruwa ne ya dace a sha? [OUTRO] Ka tuna cewa ruwa yana zagayawa, yana da amfani, kuma kare tsabtarsa yana taimaka wa kowa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira lokacin da ruwa ya tashi sama kamar tururi?" (correct answer: "ƙafewa"; options: ƙafewa, ganye, motsi)
- **[PAUSE 2]** — question shown to the learner: "Wane ruwa ne ya dace a sha?" (correct answer: "ruwan da aka tabbatar da tsabtarsa"; options: ruwan da aka tabbatar da tsabtarsa, ruwan kwata, ruwan da ke ɗauke da shara)

---

### `p3-socs-05` — Transportation — Air and Water

**Target filename:** `audio/p3-socs-05.mp3`
**Title (Hausa):** Sufuri ta Sama da Ruwa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi sufuri ta sama da ruwa. [MAIN] Jirgin sama yana tashi daga filin jirgin sama, yana bi ta sama, sannan ya sauka a wani fili. Jirgin ruwa da kwale-kwale suna tafiya a kogi, tafki, ko teku. Dukansu suna ɗaukar mutane da kaya. Sufurin sama da na ruwa suna taimaka wa tafiye-tafiye da ciniki tsakanin wurare da wasu ƙasashe. [PAUSE 1] Daga ina jirgin sama yake tashi? [MAIN] A jirgin sama, ka bi umarnin ma’aikata kuma ka ɗaura abin kariya idan an ce ka yi. A jirgin ruwa, ka sa rigar kariya ta ruwa, ka zauna cikin natsuwa, kuma kada a ɗora kaya ko mutane fiye da kima. Yaro ya yi tafiya tare da babba, kada ya shiga ruwa ko jirgi shi kaɗai. [PAUSE 2] Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro? [OUTRO] Idan ka ga jirgin sama ko kwale-kwale, ka tuna wurin da yake tafiya da dokar tsaro da ta dace da shi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Daga ina jirgin sama yake tashi?" (correct answer: "filin jirgin sama"; options: filin jirgin sama, cikin kasuwa, layin dogo)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro?" (correct answer: "rigar kariya ta ruwa"; options: rigar kariya ta ruwa, jakar kasuwa, takalmin makaranta)

---

### `p3-maths-06` — Simple Fractions: Half and Quarter

**Target filename:** `audio/p3-maths-06.mp3`
**Title (Hausa):** Sauƙaƙan Kaso: Rabi da Kwata

**Script to read:**

> [INTRO] A yau za mu koyi rabi da kwata. [MAIN] Rabi yana nufin raba abu gida biyu daidai. Idan lemo 10 ya kasu gida biyu daidai, kowane gida ya samu 5. [PAUSE 1] Rabin 10 nawa ne? [MAIN] Kwata yana nufin raba abu gida huɗu daidai. Idan akwai rukuni huɗu, kowanne rukuni yana wakiltar kwata ɗaya na jimla. [PAUSE 2] Idan abu ya kasu gida huɗu daidai, kowane ɓangare ana kiransa me? [OUTRO] Ka tuna: rabi yana nufin gida biyu daidai; kwata yana nufin gida huɗu daidai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Rabin 10 nawa ne?" (correct answer: "5"; options: 5, 2, 10)
- **[PAUSE 2]** — question shown to the learner: "Idan abu ya kasu gida huɗu daidai, kowane ɓangare ana kiransa me?" (correct answer: "kwata"; options: kwata, rabi, jimla)

---

### `p3-bsci-06` — States of Matter

**Target filename:** `audio/p3-bsci-06.mp3`
**Title (Hausa):** Yanayin Abu: Abu Mai Tauri, Ruwa, da Iska

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi yanayin abu: abu mai tauri, ruwa, da iska. [MAIN] Abu mai tauri yana da siffa da za ka iya riƙewa, kamar dutse, littafi, kujera, ƙwallo, ko ƙanƙara. Idan ka ɗauki dutse, ba ya canza siffa cikin sauƙi. Ruwa yana zubowa kuma yana ɗaukar siffar abin da aka zuba shi a ciki, kamar kofi, kwano, ko guga. [PAUSE 1] Wane yanayi ne dutse yake ciki? [MAIN] Iska ba ka iya riƙe ta da hannu, amma tana cika wuri. Za ka iya jin iska idan ta busa fuskarka ko ta motsa leda. Tururi daga ruwan zafi ma yana nuna yanayin iska. Ka kalli gida da aji, za ka ga misalan yanayi uku kullum. [PAUSE 2] Wane yanayi ne ruwan sha yake ciki? [OUTRO] Ka tuna cewa abubuwa suna iya kasancewa abu mai tauri, ruwa, ko iska.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane yanayi ne dutse yake ciki?" (correct answer: "abu mai tauri"; options: abu mai tauri, ruwa, iska)
- **[PAUSE 2]** — question shown to the learner: "Wane yanayi ne ruwan sha yake ciki?" (correct answer: "ruwa"; options: abu mai tauri, ruwa, ganye)

---

### `p3-socs-06` — Communication — Traditional Methods

**Target filename:** `audio/p3-socs-06.mp3`
**Title (Hausa):** Sadarwa ta Hanyoyin Gargajiya

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi sadarwa ta hanyoyin gargajiya. [MAIN] Sadarwa tana nufin isar da saƙo daga mutum zuwa wani. Mai shela yana zagaya gari yana faɗa wa mutane sanarwar taro ko wani saƙon jama’a. A kasuwa, ana iya sanarwa da babbar murya. Ana kuma buga ganga ko kalangu da wata alama da mutanen yankin suka sani. Ma’anar bugun tana dogara da abin da al’ummar ta amince da shi. [PAUSE 1] Wa yake zagaya gari yana faɗa wa mutane sanarwa? [MAIN] Hanyoyin gargajiya suna amfani ga mutanen da suke kusa, amma nisa ko hayaniya na iya hana wasu ji. Mai isar da saƙo ya yi magana a sarari, ya maimaita muhimmin bayani, kuma kada ya canza saƙon. Mai sauraro ya saurara da kyau ya tambaya idan bai fahimta ba. [PAUSE 2] Me mai isar da saƙo ya kamata ya yi da muhimmin bayani? [OUTRO] Idan ka ji shela ko bugun sanarwa, ka lura da wanda ya aika saƙon, abin da aka faɗa, da mutanen da ake son su ji.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wa yake zagaya gari yana faɗa wa mutane sanarwa?" (correct answer: "Mai shela"; options: direban jirgi, Mai shela, ɗan wasa)
- **[PAUSE 2]** — question shown to the learner: "Me mai isar da saƙo ya kamata ya yi da muhimmin bayani?" (correct answer: "ya maimaita shi"; options: ya ɓoye shi, ya canza shi, ya maimaita shi)

---

### `p3-maths-07` — Comparing and Ordering Numbers to 1,000

**Target filename:** `audio/p3-maths-07.mp3`
**Title (Hausa):** Kwatanta da Jera Lambobi Har Zuwa 1,000

**Script to read:**

> [INTRO] Yau za mu koyi kwatanta da jera lambobi har zuwa dubu ɗaya. [MAIN] Idan lambobi biyu suna da daruruwa daban, lambar da take da daruruwa mafi yawa ita ce ta fi girma. Idan daruruwa sun yi daidai, sai mu duba gommai. [PAUSE 1] Wacce lamba ta fi girma: 632 ko 581? [MAIN] Don jera lambobi, ka fara da ƙaramar lamba ko babbar lamba, gwargwadon umarni. Ka duba daruruwa, gommai, da ɗaya-ɗaya. [PAUSE 2] Idan an jera 120, 450, 300 daga ƙanana zuwa manya, wace lamba ce ta farko? [OUTRO] Ka tuna: fara kwatantawa daga hagu zuwa dama.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wacce lamba ta fi girma: 632 ko 581?" (correct answer: "632"; options: 632, 581, 532)
- **[PAUSE 2]** — question shown to the learner: "Idan an jera 120, 450, 300 daga ƙanana zuwa manya, wace lamba ce ta farko?" (correct answer: "120"; options: 120, 300, 450)

---

### `p3-bsci-07` — Measuring Length and Mass

**Target filename:** `audio/p3-bsci-07.mp3`
**Title (Hausa):** Auna Tsawo da Nauyi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi auna tsawo da nauyi. [MAIN] Ana auna ƙaramin tsawo da santimita, babban tsawo kuma da mita. Ka zaɓi ma'aunin da ya dace: santimita ga fensir, mita ga ɗaki. [PAUSE 1] Wane ma'auni ya dace da tsawon fensir? [MAIN] Ana auna ƙaramin nauyi da giram, babban nauyi kuma da kilogiram. Ka fara daga alamar sifili, ka duba a hankali, ka rubuta lamba da sunan ma'aunin. Sake aunawa yana taimaka maka ka tabbatar da sakamako. [PAUSE 2] Wane ma'auni ya dace da nauyin buhun gero? [OUTRO] Ka tuna ka zaɓi kayan awo da ma'aunin da suka dace domin samun sakamako mai kyau.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane ma'auni ya dace da tsawon fensir?" (correct answer: "santimita"; options: santimita, kilogiram, awa)
- **[PAUSE 2]** — question shown to the learner: "Wane ma'auni ya dace da nauyin buhun gero?" (correct answer: "kilogiram"; options: mita, kilogiram, daƙiƙa)

---

### `p3-socs-07` — Communication — Modern Methods

**Target filename:** `audio/p3-socs-07.mp3`
**Title (Hausa):** Sadarwa ta Hanyoyin Zamani

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi sadarwa ta hanyoyin zamani. [MAIN] Rediyo yana watsa labarai da sanarwa. Talabijin yana haɗa sauti da hoto. Waya tana ba mutane damar magana daga wurare daban-daban, wayar hannu kuma za ta iya aika saƙon rubutu ko amfani da intanet. Samun wuta, sigina, da na’ura yana bambanta tsakanin wurare, don haka mutane suna amfani da hanyar da take samuwa. [PAUSE 1] Wace na’ura ce take haɗa sauti da hoto? [MAIN] Ka nemi izinin babba kafin amfani da na’ura, ka kiyaye bayanin sirri, kuma kada ka aika magana mai cutarwa. Ka tabbatar da saƙon kafin ka yaɗa shi, domin kuskure na iya isa ga mutane da yawa. Sadarwa mai kyau tana bukatar gaskiya, ladabi, da kulawa. [PAUSE 2] Me ya kamata ka yi kafin ka yaɗa saƙo? [OUTRO] Idan za ka aika saƙo da wayar hannu, ka zaɓi kalmomi masu ladabi sannan ka tabbatar da cewa saƙon gaskiya ne.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace na’ura ce take haɗa sauti da hoto?" (correct answer: "talabijin"; options: rediyo, talabijin, ganga)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi kafin ka yaɗa saƙo?" (correct answer: "tabbatar da saƙon"; options: tabbatar da saƙon, canza gaskiyar, aika shi ba dubawa)

---

### `p3-maths-08` — Even and Odd Numbers

**Target filename:** `audio/p3-maths-08.mp3`
**Title (Hausa):** Lambobin Biyu-Biyu da Marasa Biyu-Biyu

**Script to read:**

> [INTRO] A yau za mu koyi lambobi biyu-biyu da marasa biyu-biyu. [MAIN] Za a iya raba lamba biyu-biyu gida biyu daidai. Lamba mara biyu-biyu tana barin saura ɗaya. Ka duba lambar ƙarshe don gane hakan da sauri. [PAUSE 1] Lamba 18 biyu-biyu ce ko mara biyu-biyu? [MAIN] Idan lamba ta ƙare da 0, 2, 4, 6, ko 8, biyu-biyu ce. Idan ta ƙare da 1, 3, 5, 7, ko 9, mara biyu-biyu ce. [PAUSE 2] Lamba 25 biyu-biyu ce ko mara biyu-biyu? [OUTRO] Ka tuna: lambar ƙarshe tana taimaka maka gane iri.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lamba 18 biyu-biyu ce ko mara biyu-biyu?" (correct answer: "biyu-biyu"; options: biyu-biyu, mara biyu-biyu, ba lamba ba)
- **[PAUSE 2]** — question shown to the learner: "Lamba 25 biyu-biyu ce ko mara biyu-biyu?" (correct answer: "mara biyu-biyu"; options: mara biyu-biyu, biyu-biyu, goma)

---

### `p3-bsci-08` — Measuring Time

**Target filename:** `audio/p3-bsci-08.mp3`
**Title (Hausa):** Auna Lokaci

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi auna lokaci. [MAIN] Daƙiƙa sittin suna yin minti ɗaya, minti sittin kuma suna yin awa ɗaya. A agogo mai hannaye, ƙaramin hannu yana nuna awa, babban hannu kuma yana nuna minti. [PAUSE 1] Wane kayan awo ne ake amfani da shi domin auna lokaci? [MAIN] Lokacin da aiki ya ɗauka shi ne bambanci tsakanin farawa da ƙarewa. Idan ka shayar da lambu na minti goma, aikin ya ɗauki minti goma. Kwatanta lokacin ayyuka yana nuna wanda ya fi tsawo. [PAUSE 2] Minti sittin suna yin me? [OUTRO] Ka auna lokacin farawa da ƙarewa domin ka tsara ayyukanka da kyau.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kayan awo ne ake amfani da shi domin auna lokaci?" (correct answer: "agogo"; options: agogo, ma'aunin nauyi, fartanya)
- **[PAUSE 2]** — question shown to the learner: "Minti sittin suna yin me?" (correct answer: "awa ɗaya"; options: awa ɗaya, mako ɗaya, shekara ɗaya)

---

### `p3-socs-08` — Our Natural Environment

**Target filename:** `audio/p3-socs-08.mp3`
**Title (Hausa):** Muhallin Halitta Namu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi muhallin halitta namu. [MAIN] Muhallin halitta ya haɗa da ƙasa, ruwa, iska, itatuwa, daji, duwatsu, tsirrai, da dabbobi. A Arewacin Nijeriya, ana iya ganin fili mai faɗi, ciyayi, filayen ciyawa, ƙananan duwatsu, da ruwa a wasu wurare. Lokacin damina ciyayi sukan yi kore, lokacin rani kuma ƙasa da iska sukan bushe. [PAUSE 1] Waɗanne abubuwa uku ne suke cikin muhallin halitta? [MAIN] Ruwa yana taimaka wa mutane, dabbobi, da tsirrai. Iska tana da muhimmanci ga numfashi, ƙasa kuma tana ba tsirrai wurin girma. Muhallin duniya ya bambanta; wasu wurare suna da ruwa mai yawa, wasu suna da ƙarancin ruwa mai tsabta. [PAUSE 2] Me ƙasa take ba tsirrai? [OUTRO] Ka kalli muhallin yankinku ka gano abu ɗaya na ƙasa, abu ɗaya na ruwa, da wata halitta da take amfani da su.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne abubuwa uku ne suke cikin muhallin halitta?" (correct answer: "ƙasa, ruwa, da iska"; options: ƙasa, ruwa, da iska, mota, waya, da littafi, kujera, riga, da tukunya)
- **[PAUSE 2]** — question shown to the learner: "Me ƙasa take ba tsirrai?" (correct answer: "wurin girma"; options: wurin girma, sautin rediyo, hasken fitila)

---

### `p3-maths-09` — Counting in 2s, 5s, 10s, and 100s

**Target filename:** `audio/p3-maths-09.mp3`
**Title (Hausa):** Tsallake Ƙirga Biyu-Biyu, Biyar-Biyar, Goma-Goma, da Ɗari-Ɗari

**Script to read:**

> [INTRO] Yau za mu koyi tsallake ƙirga. [MAIN] Tsallake ƙirga yana nufin ƙara adadi iri ɗaya kowane lokaci. Biyu-biyu: 2, 4, 6. Biyar-biyar: 5, 10, 15. [PAUSE 1] Bayan 10 idan muna ƙirga biyar-biyar, wace lamba ce? [MAIN] Goma-goma yana taimaka wa kuɗi da awo. Ɗari-ɗari yana taimaka wa lambobi manya kamar 100, 200, 300. [PAUSE 2] Bayan 300 idan muna ƙirga ɗari-ɗari, wace lamba ce? [OUTRO] Ka tuna: adadin da kake ƙara shi ne matakin ƙirga.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Bayan 10 idan muna ƙirga biyar-biyar, wace lamba ce?" (correct answer: "15"; options: 15, 12, 20)
- **[PAUSE 2]** — question shown to the learner: "Bayan 300 idan muna ƙirga ɗari-ɗari, wace lamba ce?" (correct answer: "400"; options: 400, 310, 500)

---

### `p3-bsci-09` — Soil and Its Uses

**Target filename:** `audio/p3-bsci-09.mp3`
**Title (Hausa):** Ƙasa da Amfaninta

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi ƙasa da amfaninta. [MAIN] Ƙasa tana ɗauke da gutsutsuren duwatsu, ruwa, iska, da ruɓaɓɓen ganye. Tsirrai suna kafa tushe a cikinta, manomi kuma yana shuka amfanin gona. [PAUSE 1] A ina tushen tsiro yake girma? [MAIN] Ƙasa mai yashi tana zubar da ruwa da sauri, ƙasa mai laka kuma tana riƙe ruwa sosai. Mutane suna amfani da ƙasa wajen yin tubali da tukunya. Kada a gurɓata ƙasa; tushen ciyawa da bishiyoyi yana taimakawa kada ruwa ko iska su kwashe ta. [PAUSE 2] Wace ƙasa ce take riƙe ruwa sosai? [OUTRO] Ka lura da nau'ikan ƙasa da amfaninsu, kuma ka taimaka wajen kare ƙasa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A ina tushen tsiro yake girma?" (correct answer: "cikin ƙasa"; options: cikin ƙasa, kan rufin gida, cikin madubi)
- **[PAUSE 2]** — question shown to the learner: "Wace ƙasa ce take riƙe ruwa sosai?" (correct answer: "ƙasa mai laka"; options: ƙasa mai laka, ƙasa mai yashi, ƙasa mai cike da shara)

---

### `p3-socs-09` — Caring for Our Environment

**Target filename:** `audio/p3-socs-09.mp3`
**Title (Hausa):** Kula da Muhallinmu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi kula da muhallinmu. [MAIN] Shara a hanya tana iya toshe magudanar ruwa. Ƙona shara kusa da gida na iya gurɓata iska. Sare itatuwa da yawa ba tare da dasa wasu ba yana rage inuwa, yana barin ƙasa a buɗe, kuma yana rage mafakar dabbobi. [PAUSE 1] Me sharar da aka jefa a hanya za ta iya toshewa? [MAIN] Ka zuba shara a kwando, ka rage ɓarnar ruwa, ka kula da itace, kuma ka gaya wa babba idan ka ga matsala. Yara su yi aikin da ya dace da shekarunsu; kada su shiga magudana ko su taɓa abu mai haɗari. Manya da hukuma za su iya shirya kwashe shara da dasa itatuwa. [PAUSE 2] Me ya kamata a yi bayan sare itatuwa? [OUTRO] Yau ka zaɓi aikin kula da muhalli mai aminci: adana ruwa, amfani da kwandon shara, ko kula da itacen da ke kusa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me sharar da aka jefa a hanya za ta iya toshewa?" (correct answer: "magudanar ruwa"; options: magudanar ruwa, hasken rana, sautin rediyo)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata a yi bayan sare itatuwa?" (correct answer: "dasa wasu itatuwa"; options: barin ƙasa haka, dasa wasu itatuwa, ƙona sauran ciyayi)

---

### `p3-maths-10` — Money: Naira, Kobo, and Simple Totals

**Target filename:** `audio/p3-maths-10.mp3`
**Title (Hausa):** Kuɗi: Naira da Sauƙaƙan Jimla

**Script to read:**

> [INTRO] Yau za mu koyi naira da jimlar kuɗi. [MAIN] Idan abu ɗaya yana ₦20, abubuwa biyu suna ₦40. Idan ka haɗa ₦50 da ₦30, jimla ta zama ₦80. [PAUSE 1] Nawa ne ₦50 da ₦30 tare? [MAIN] Ka riƙa haɗa farashi a hankali. Ka fara da manyan kuɗi, sannan ka ƙara ƙananan kuɗi. Jimla ita ce kuɗin duka. [PAUSE 2] Idan littafi yana ₦100, littattafai 3 nawa ne? [OUTRO] Ka tuna: alamar ₦ tana nufin naira.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nawa ne ₦50 da ₦30 tare?" (correct answer: "80"; options: 80, 20, 100)
- **[PAUSE 2]** — question shown to the learner: "Idan littafi yana ₦100, littattafai 3 nawa ne?" (correct answer: "300"; options: 300, 100, 200)

---

### `p3-bsci-10` — Air in Motion

**Target filename:** `audio/p3-bsci-10.mp3`
**Title (Hausa):** Iska Mai Motsi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi iska mai motsi. [MAIN] Iska tana kewaye da kai ko da ba ka ganinta. Za ka iya gane alkiblar busawarta ta yadda ganye ko ɗan kyalle mai sauƙi yake karkata. Iska mai laushi tana busar da tufafi da juya abin wasa mai fikafikai. [PAUSE 1] Me zai iya nuna alkiblar iska? [MAIN] Ƙarfi da alkiblar iska suna iya sauyawa. Iska mai ƙarfi tana iya ɗaga ƙura ko karya reshen bishiya. Idan guguwa ta taso, ka shiga wuri mai aminci tare da babba, ka nisanci bishiya ko bango mai rauni. [PAUSE 2] Ina ya kamata ka je idan guguwa ta taso? [OUTRO] Ka lura da tasirin iska daga wuri mai aminci, kuma ka kiyaye kanka daga iska mai ƙarfi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me zai iya nuna alkiblar iska?" (correct answer: "yadda ɗan kyalle yake karkata"; options: yadda ɗan kyalle yake karkata, nauyin dutse, zurfin rijiya)
- **[PAUSE 2]** — question shown to the learner: "Ina ya kamata ka je idan guguwa ta taso?" (correct answer: "wuri mai aminci"; options: ƙarƙashin bango mai rauni, wuri mai aminci, saman bishiya)

---

### `p3-socs-10` — Food and Farming in Our Community

**Target filename:** `audio/p3-socs-10.mp3`
**Title (Hausa):** Abinci da Noma a Al’ummarmu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi abinci da noma a al’ummarmu. [MAIN] Manoma a Arewacin Nijeriya suna shuka gero, dawa, wake, da gyada. Wasu mutane suna kiwon shanu, awaki, da kaji. Dabbobi na iya ba da madara, nama, ƙwai, ko taki, kuma suna bukatar abinci, ruwa, mafaka, da kulawa. [PAUSE 1] Waɗanne amfanin gona biyu ake shukawa a Arewacin Nijeriya? [MAIN] Manomi yana shirya ƙasa, yana shuka iri, yana kula da amfanin gona, sannan yana girbi. Bayan girbi, ana busarwa ko adanawa domin kada wasu amfanin gona su lalace. Daga gona, ana kai abinci kasuwa ko wasu wurare. Yara su yi aikin da babba ya tabbatar yana da aminci kawai. [PAUSE 2] Me ake yi wa wasu amfanin gona bayan girbi domin kada su lalace? [OUTRO] Idan ka ga hatsi ko wake a kasuwa, ka tuna da tafiyarsa daga shuka da girbi zuwa adanawa da sayarwa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne amfanin gona biyu ake shukawa a Arewacin Nijeriya?" (correct answer: "gero da dawa"; options: gero da dawa, takalmi da riga, littafi da biro)
- **[PAUSE 2]** — question shown to the learner: "Me ake yi wa wasu amfanin gona bayan girbi domin kada su lalace?" (correct answer: "ana busarwa ko adanawa"; options: ana jefawa a hanya, ana busarwa ko adanawa, ana barinsu cikin ruwa)

---

### `p3-maths-11` — Giving Change

**Target filename:** `audio/p3-maths-11.mp3`
**Title (Hausa):** Bayar da Canji

**Script to read:**

> [INTRO] Yau za mu koyi bayar da canji. [MAIN] Canji shi ne kuɗin da ake mayarwa idan ka bayar da kuɗi fiye da farashi. Idan abu yana ₦70, ka bayar da ₦100, canji shi ne ₦30. [PAUSE 1] Idan abu yana ₦70, ka bayar da ₦100, canji nawa ne? [MAIN] Hanyar lissafi ita ce ragi: kuɗin da aka bayar rage farashi. Ka tabbata kuɗin da aka bayar ya fi farashi. [PAUSE 2] Idan farashi ₦40 ne, ka bayar da ₦50, canji nawa ne? [OUTRO] Ka tuna: canji = abin da aka bayar − farashi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan abu yana ₦70, ka bayar da ₦100, canji nawa ne?" (correct answer: "30"; options: 30, 70, 100)
- **[PAUSE 2]** — question shown to the learner: "Idan farashi ₦40 ne, ka bayar da ₦50, canji nawa ne?" (correct answer: "10"; options: 10, 40, 50)

---

### `p3-bsci-11` — Traditional and Modern Technology

**Target filename:** `audio/p3-bsci-11.mp3`
**Title (Hausa):** Kayan Aikin Gargajiya da na Zamani

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi kayan aikin gargajiya da na zamani da amfani da su lafiya. [MAIN] Fartanya, turmi da taɓarya, da keken jaki kayan gargajiya ne. Babbar na'urar noma, injin niƙa, da mota kayan zamani ne. [PAUSE 1] Wane kayan gargajiya ne ake amfani da shi wajen daka hatsi? [MAIN] Kafin amfani da kayan aiki, a zaɓi wanda ya dace, a duba ko ya lalace, a bi umarnin babba. Kada ka taɓa injin da yake aiki, soket, ko waya da ta bare. Ka tsaya nesa da wurin da ake niƙa hatsi. [PAUSE 2] Me ya kamata ka yi kafin amfani da kayan aiki? [OUTRO] Ka tuna cewa kayan aiki suna da amfani idan an yi amfani da su cikin aminci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kayan gargajiya ne ake amfani da shi wajen daka hatsi?" (correct answer: "turmi da taɓarya"; options: turmi da taɓarya, injin niƙa, agogo)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi kafin amfani da kayan aiki?" (correct answer: "nemi izinin babba"; options: nemi izinin babba, yi wasa da shi, taɓa injin mai aiki)

---

### `p3-socs-11` — Market and Trade

**Target filename:** `audio/p3-socs-11.mp3`
**Title (Hausa):** Kasuwa da Ciniki

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi kasuwa da ciniki. [MAIN] Mai sayarwa yana kawo kaya, mai saya kuma yana zaɓar abin da yake bukata. Suna tambayar farashi, su amince, sannan a biya kuɗi. Farashi shi ne adadin kuɗin da ake nema a kan kaya. Yana iya bambanta saboda yawan kaya, ƙarancinsu, ingancinsu, ko kuɗin kawo su kasuwa. [PAUSE 1] Me ake kira adadin kuɗin da ake nema a kan kaya? [MAIN] Mutane suna iya musayar kaya da kaya idan duka ɓangarorin sun amince, amma wannan yana wahala idan ɗaya bai bukaci kayan ɗayan ba. Ciniki mai kyau yana bukatar gaskiya, aunawa daidai, da ladabi. Yaro ya je kasuwa tare da babba ya kuma kula da kuɗi. [PAUSE 2] Wane hali ciniki mai kyau yake bukata? [OUTRO] Idan ka je kasuwa, ka lura da yadda ake tambayar farashi, aunawa daidai, da biyan kuɗi cikin ladabi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira adadin kuɗin da ake nema a kan kaya?" (correct answer: "farashi"; options: farashi, girma, launi)
- **[PAUSE 2]** — question shown to the learner: "Wane hali ciniki mai kyau yake bukata?" (correct answer: "gaskiya"; options: gaskiya, yaudara, rashin aunawa)

---

### `p3-maths-12` — Time to the Hour, Half-Hour, and Quarter-Hour

**Target filename:** `audio/p3-maths-12.mp3`
**Title (Hausa):** Lokaci: Sa’a, Rabin Sa’a, da Kwata Sa’a

**Script to read:**

> [INTRO] Yau za mu koyi karanta lokaci zuwa sa’a, rabin sa’a, da kwata sa’a. [MAIN] Idan dogon hannu yana kan 12, lokaci cikakkiyar sa’a ce. Idan yana kan 6, lokaci rabin sa’a ne. [PAUSE 1] Idan dogon hannu yana kan 6, wannan yana nuna me? [MAIN] Idan dogon hannu yana kan 3, kwata bayan sa’a ne. Idan yana kan 9, kwata ya rage kafin sa’a ta gaba. [PAUSE 2] Idan dogon hannu yana kan 3, mintuna nawa ne bayan sa’a? [OUTRO] Ka tuna: 12 yana nuna cikakkiyar sa’a, 6 yana nuna rabin sa’a, 3 yana nuna kwata bayan sa’a.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan dogon hannu yana kan 6, wannan yana nuna me?" (correct answer: "rabin sa’a"; options: rabin sa’a, cikakkiyar sa’a, kwata)
- **[PAUSE 2]** — question shown to the learner: "Idan dogon hannu yana kan 3, mintuna nawa ne bayan sa’a?" (correct answer: "15"; options: 15, 30, 45)

---

### `p3-bsci-12` — Light and Mirrors

**Target filename:** `audio/p3-bsci-12.mp3`
**Title (Hausa):** Haske da Madubi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi haske, inuwa, da madubi. [MAIN] Madubi yana mayar da haske zuwa idanunka, sai ka ga sura. Idan wani abu ya tare haske, inuwa tana bayyana a bayansa. [PAUSE 1] Me ke faruwa idan abu ya tare haske? [MAIN] Inuwa tana iya tsawaita ko gajarta yayin da matsayin rana ko fitila ya sauya. A duhu, madubi ba ya nuna sura sosai. Kada ka kalli rana kai tsaye ko ka mayar da haskenta zuwa idanun wani. [PAUSE 2] Me madubi yake mayarwa zuwa idanunka? [OUTRO] Ka tuna cewa haske yana sa mu ga sura, kuma abin da ya tare shi yana iya yin inuwa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ke faruwa idan abu ya tare haske?" (correct answer: "inuwa tana bayyana"; options: inuwa tana bayyana, sauti yana ƙaruwa, ruwa yana tafasa)
- **[PAUSE 2]** — question shown to the learner: "Me madubi yake mayarwa zuwa idanunka?" (correct answer: "haske"; options: haske, ƙasa, sauti)

---

### `p3-socs-12` — Nigerian Citizenship

**Target filename:** `audio/p3-socs-12.mp3`
**Title (Hausa):** Zama Ɗan Ƙasar Nijeriya

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi zama ɗan ƙasar Nijeriya. [MAIN] Ɗan ƙasa mutum ne da yake cikin wata ƙasa bisa dokarta. Ƴan ƙasa na iya zama a jihohi da garuruwa daban-daban. Ɗan ƙasa yana da haƙƙoƙi da alhaki. Yara suna da haƙƙin suna, kulawa, koyo, kariya daga cutarwa, da faɗin ra’ayi ta hanyar da ta dace. [PAUSE 1] Me ake kira mutumin da yake cikin wata ƙasa bisa dokarta? [MAIN] Alhakin yaro ya haɗa da bin dokokin aminci, girmama haƙƙin wasu, kula da kayan jama’a, da faɗin gaskiya. Wajen kayan jama’a, alhakin yaro shi ne kula da su. Zama ɗan ƙasa ba yana nufin kowa yana da harshe ko al’ada ɗaya ba. Ƴan ƙasa suna da al’adu daban-daban. Bambancin jama’a bai hana su taimaka wa zaman lafiya da ci gaban Nijeriya ba. [PAUSE 2] Wane alhaki ne yaro yake da shi ga kayan jama’a? [OUTRO] Ka nuna zama ɗan ƙasa nagari yau ta hanyar kula da kayan jama’a da mutunta haƙƙin wani.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake kira mutumin da yake cikin wata ƙasa bisa dokarta?" (correct answer: "ɗan ƙasa"; options: ɗan ƙasa, baƙo mai wucewa, ɗan kallo)
- **[PAUSE 2]** — question shown to the learner: "Wane alhaki ne yaro yake da shi ga kayan jama’a?" (correct answer: "kula da su"; options: kula da su, lalata su, ɓoye su)

---

### `p3-maths-13` — Length: Metre and Centimetre

**Target filename:** `audio/p3-maths-13.mp3`
**Title (Hausa):** Tsawo: Mita da Santimita

**Script to read:**

> [INTRO] Yau za mu koyi mita da santimita. [MAIN] Tsawo yana nuna yadda abu yake da nisa. Mita ta fi santimita girma. Mita 1 tana da santimita 100. [PAUSE 1] Mita 1 tana da santimita nawa? [MAIN] Ana amfani da santimita wajen ƙananan abubuwa kamar fensir. Ana amfani da mita wajen manyan abubuwa kamar igiya ko ɗaki. [PAUSE 2] Wane ma’auni ya fi dacewa da fensir: mita ko santimita? [OUTRO] Ka tuna: ma’auni ɗaya kafin kwatantawa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mita 1 tana da santimita nawa?" (correct answer: "100"; options: 100, 10, 1)
- **[PAUSE 2]** — question shown to the learner: "Wane ma’auni ya fi dacewa da fensir: mita ko santimita?" (correct answer: "santimita"; options: santimita, mita, lita)

---

### `p3-bsci-13` — First Aid and Safety

**Target filename:** `audio/p3-bsci-13.mp3`
**Title (Hausa):** Taimakon Farko da Tsaro

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi taimakon farko da tsaro. [MAIN] Taimakon farko shi ne taimakon gaggawa da ake ba wanda ya ji rauni kafin a kai shi wurin ma'aikacin lafiya. Ka fara duba cewa wurin ba zai cutar da kai ba, sannan ka kira babba. Mai ba da taimako yana bukatar natsuwa, tausayi, da tsafta. [PAUSE 1] Wa ya kamata yaro ya kira idan haɗari ya faru? [MAIN] Idan ƙaramin rauni yana zubar da jini, babba zai iya matsa tsabtataccen kyalle a kansa. Idan an ƙone fata, ka kira babba nan da nan; babba zai iya taimaka a sanya wurin ƙarƙashin ruwa mai tsafta mai sanyi na minti ashirin, sannan a nemi taimakon ma'aikacin lafiya. Kada a shafa mai, man goge baki, ko ƙanƙara. A muhalli, ka nisanci ruwan ambaliya, gilashin da ya karye, waya da ta faɗi, da hayaƙi; ka faɗa wa babba. [PAUSE 2] Me ya dace a sanya a kan wurin da ya ƙone? [OUTRO] Ka tuna cewa taimakon farko yana farawa da tsaro, kiran babba, da yin abin da aka koya cikin natsuwa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wa ya kamata yaro ya kira idan haɗari ya faru?" (correct answer: "babba"; options: babba, ɗan wasa, mai sayar da takalmi)
- **[PAUSE 2]** — question shown to the learner: "Me ya dace a sanya a kan wurin da ya ƙone?" (correct answer: "ruwa mai tsafta mai sanyi"; options: man goge baki, ruwa mai tsafta mai sanyi, man girki mai zafi)

---

### `p3-socs-13` — Our Cultural Heritage — Food, Dress, and Language

**Target filename:** `audio/p3-socs-13.mp3`
**Title (Hausa):** Abinci, Tufafi, da Harshe a Al’adunmu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi abinci, tufafi, da harshe a al’adunmu. [MAIN] Al’ada ita ce hanyar rayuwar da al’umma take koya wa ’ya’yanta. Abinci, tufafi, da harshe suna daga abubuwan da ake gada. A Arewa, wasu iyalai suna dafa tuwo da miya, suna sa babbar riga ko zane, kuma suna magana da Hausa, Fulfulde, Kanuri, ko wasu harsuna. A sauran sassan Nijeriya ma akwai abinci, tufafi, da harsuna iri-iri. [PAUSE 1] Waɗanne abubuwa uku ne suke nuna ɓangarorin al’ada? [MAIN] Ana kiyaye al’ada ta koya wa yara harshe, girki, ɗinki, da labarai. Ba kowa ne yake ci, sawa, ko magana iri ɗaya ba. Girmama al’adun wasu yana nufin sauraro da guje wa raini, ba barin naka ba. [PAUSE 2] Ta yaya za ka nuna girmama al’adun wasu? [OUTRO] Ka tambayi babba labarin wani abinci, tufa, ko harshe na iyalinku, sannan ka saurara ba tare da raina na wasu ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne abubuwa uku ne suke nuna ɓangarorin al’ada?" (correct answer: "abinci, tufafi, da harshe"; options: abinci, tufafi, da harshe, mota, jirgi, da hanya, kujera, allo, da biro)
- **[PAUSE 2]** — question shown to the learner: "Ta yaya za ka nuna girmama al’adun wasu?" (correct answer: "sauraro da guje wa raini"; options: sauraro da guje wa raini, yin dariya gare su, ƙin sauraron bayani)

---

### `p3-maths-14` — Weight: Kilogram and Gram

**Target filename:** `audio/p3-maths-14.mp3`
**Title (Hausa):** Nauyi: Kilogiram da Giram

**Script to read:**

> [INTRO] Yau za mu koyi kilogiram da giram. [MAIN] Nauyi yana nuna yadda abu yake idan aka ɗauka ko aka auna shi. Kilogiram ya fi giram girma. Kilogiram 1 yana da giram 1,000. [PAUSE 1] Kilogiram 1 yana da giram nawa? [MAIN] Ana amfani da kilogiram wajen shinkafa ko gari. Ana amfani da giram wajen ƙananan abubuwa. [PAUSE 2] Wane ma’auni ya fi dacewa da buhun shinkafa: kilogiram ko giram? [OUTRO] Ka tuna: duba ma’auni kafin kwatanta nauyi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kilogiram 1 yana da giram nawa?" (correct answer: "1000"; options: 1000, 100, 10)
- **[PAUSE 2]** — question shown to the learner: "Wane ma’auni ya fi dacewa da buhun shinkafa: kilogiram ko giram?" (correct answer: "kilogiram"; options: kilogiram, giram, santimita)

---

### `p3-bsci-14` — Animal Habitats and Shelters

**Target filename:** `audio/p3-bsci-14.mp3`
**Title (Hausa):** Mazauni da Mafakar Dabbobi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi mazauni, mafaka, da yadda dabbobi suka dace da wurinsu. [MAIN] Mazauni yana ba dabba abinci, ruwa, iska, da kariya. Fikafikan iyo na kifi suna taimaka masa ya motsa cikin ruwa, ƙafafun agwagwa masu faɗi kuma suna taimaka mata ta iyo. [PAUSE 1] Me ke taimaka wa kifi ya motsa cikin ruwa? [MAIN] Tsuntsu yana gina sheƙa, zomo yana samun mafaka a rami. Dabbobin gida ma suna bukatar keji ko rumfa mai tsafta, iska, inuwa, da ruwa. Kada ka rushe mazaunin dabbar daji. [PAUSE 2] Me tsuntsu yake ginawa a bishiya? [OUTRO] Ka lura daga nesa yadda mazauni da sassan jiki suke taimaka wa dabba ta rayu.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ke taimaka wa kifi ya motsa cikin ruwa?" (correct answer: "fikafikan iyo"; options: fikafikan iyo, gashin jiki, ƙahon kai)
- **[PAUSE 2]** — question shown to the learner: "Me tsuntsu yake ginawa a bishiya?" (correct answer: "sheƙa"; options: sheƙa, tukunya, agogo)

---

### `p3-socs-14` — Festivals and Special Occasions in Nigeria

**Target filename:** `audio/p3-socs-14.mp3`
**Title (Hausa):** Bukukuwa da Ranaku na Musamman a Nijeriya

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi bukukuwa da ranaku na musamman a Nijeriya. [MAIN] Eid al-Fitr yana zuwa bayan an kammala azumin Ramadan. Eid al-Adha yana tuna biyayya da sadaukarwa. Christmas rana ce da Kiristoci suke tunawa da haihuwar Yesu Almasihu. New Yam bikin girbi ne da wasu al’ummomi suke yi lokacin fara cin sabuwar doya. Ba duk al’ummomi ne suke yin biki iri ɗaya ba. [PAUSE 1] Wane biki ne yake zuwa bayan an kammala azumin Ramadan? [MAIN] Gwamnatin Tarayya tana iya ayyana ranakun Eid al-Fitr, Eid al-Adha, da Christmas a matsayin hutun jama’a. New Yam kuwa ba hutun jama’a na ƙasa baki ɗaya ba ne. A girmama masu yin kowane biki, kada a ce wani ya fi wani. A kula da tsaro, tsafta, da ladabi a taro. [PAUSE 2] Shin New Yam hutun jama’a ne na ƙasa baki ɗaya? [OUTRO] Idan ka ji sunan wani biki a Nijeriya, ka tambayi abin da yake tunawa da kuma ko hutun ƙasa ne, ba tare da raina masu yin sa ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane biki ne yake zuwa bayan an kammala azumin Ramadan?" (correct answer: "Eid al-Fitr"; options: Eid al-Fitr, New Yam, Christmas)
- **[PAUSE 2]** — question shown to the learner: "Shin New Yam hutun jama’a ne na ƙasa baki ɗaya?" (correct answer: "a’a, bikin wasu al’ummomi ne"; options: eh, hutun ƙasa ne, a’a, bikin wasu al’ummomi ne, ba a yin sa a Nijeriya)

---

### `p3-maths-15` — Capacity: Litre and Millilitre

**Target filename:** `audio/p3-maths-15.mp3`
**Title (Hausa):** Ma’aunin Ruwa: Lita da Mililita

**Script to read:**

> [INTRO] Yau za mu koyi lita da mililita. [MAIN] Lita da mililita suna auna yawan ruwa ko abin sha. Lita ta fi mililita girma. Lita 1 tana da mililita 1,000. [PAUSE 1] Lita 1 tana da mililita nawa? [MAIN] Ana amfani da lita wajen ruwa mai yawa. Ana amfani da mililita wajen ƙaramin ruwa ko magani. [PAUSE 2] Wane ma’auni ya fi dacewa da bokitin ruwa: lita ko mililita? [OUTRO] Ka tuna: duba ko tambaya tana magana da lita ko mililita.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Lita 1 tana da mililita nawa?" (correct answer: "1000"; options: 1000, 100, 10)
- **[PAUSE 2]** — question shown to the learner: "Wane ma’auni ya fi dacewa da bokitin ruwa: lita ko mililita?" (correct answer: "lita"; options: lita, mililita, giram)

---

### `p3-bsci-15` — Balanced Meals

**Target filename:** `audio/p3-bsci-15.mp3`
**Title (Hausa):** Abinci Mai Gina Jiki

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi abinci mai gina jiki da ayyukan abinci. [MAIN] Tuwo, shinkafa, gero, da dankali suna ba da kuzari. Wake, kifi, ƙwai, da nama suna taimaka wa jiki ya girma da gyara kansa. Ganyaye da 'ya'yan itatuwa suna taimaka wa jiki ya kasance lafiya. [PAUSE 1] Wane aiki wake yake taimakawa a jiki? [MAIN] Kwanon tuwo da miyar wake ko kifi, tare da zogale, yana haɗa nau'ikan abinci. Ka sha ruwa mai tsafta, ka ci gwargwadon yunwarka, kuma kada ka cika ciki da alewa. [PAUSE 2] Wane irin abinci ne yake ba da kuzari? [OUTRO] Ka haɗa abinci masu ayyuka daban-daban domin ka girma, ka yi karatu, da wasa cikin lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane aiki wake yake taimakawa a jiki?" (correct answer: "gina jiki"; options: gina jiki, yin inuwa, auna lokaci)
- **[PAUSE 2]** — question shown to the learner: "Wane irin abinci ne yake ba da kuzari?" (correct answer: "gero"; options: gero, alli, sabulu)

---

### `p3-socs-15` — Revision and Assessment — P3 Social and Citizenship Studies

**Target filename:** `audio/p3-socs-15.mp3`
**Title (Hausa):** Bita da Tantancewa — Nazarin Zamantakewa na Aji Uku

**Script to read:**

> [INTRO] Sannu da zuwa bitar Nazarin Zamantakewa na aji uku. [MAIN] Ka tuna da ƙaramar hukuma da ayyukan jama’a, sufuri da dokokin tsaro, da sadarwa ta gargajiya da zamani. Ka kuma tuna cewa muhalli ya haɗa da ƙasa, ruwa, iska, da halittu. Noma da kiwo suna samar da abinci, kasuwa kuma tana taimaka wa ciniki. [PAUSE 1] Me sadarwa take nufi? [MAIN] Ɗan ƙasa yana da haƙƙoƙi da alhaki. Al’adun Nijeriya suna bayyana ta abinci, tufafi, harshe, da bukukuwa. A bita, ka bayyana ma’ana, ka ba da misali, sannan ka faɗi aikin da ya dace. Misali, a jirgin ruwa a sa rigar kariya ta ruwa; a muhalli a zuba shara a kwando. [PAUSE 2] Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro? [OUTRO] Ka zaɓi jigogi uku daga aji uku—al’umma, sufuri, sadarwa, muhalli, abinci, ciniki, zama ɗan ƙasa, ko al’ada—ka bayyana gaskiya ɗaya da aikin kirki ɗaya daga kowanne.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me sadarwa take nufi?" (correct answer: "isar da saƙo"; options: isar da saƙo, gina hanya, shuka itace)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro?" (correct answer: "rigar kariya ta ruwa"; options: rigar kariya ta ruwa, hular kasuwa, takalmin makaranta)

---

### `p3-maths-16` — Simple Shapes and Their Properties

**Target filename:** `audio/p3-maths-16.mp3`
**Title (Hausa):** Sauƙaƙan Siffofi da Halayensu

**Script to read:**

> [INTRO] Yau za mu koyi sauƙaƙan siffofi. [MAIN] Murabba’i yana da gefe 4 da kusurwa 4. Alwatika yana da gefe 3 da kusurwa 3. Da’ira ba ta da kusurwa. [PAUSE 1] Alwatika tana da gefe nawa? [MAIN] Ka duba abubuwa a gida ko aji. Littafi yana kama da murabba’i mai tsawo. Kwano yana iya kama da da’ira. [PAUSE 2] Wace siffa ba ta da kusurwa? [OUTRO] Ka tuna: ƙirga gefe da kusurwa don gane siffa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Alwatika tana da gefe nawa?" (correct answer: "3"; options: 3, 4, 0)
- **[PAUSE 2]** — question shown to the learner: "Wace siffa ba ta da kusurwa?" (correct answer: "da’ira"; options: da’ira, alwatika, murabba’i)

---

### `p3-bsci-16` — Plant Parts and Functions (Deeper Study)

**Target filename:** `audio/p3-bsci-16.mp3`
**Title (Hausa):** Sassan Tsiro da Ayyukansu: Nazari Mai Zurfi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu zurfafa nazarin ayyukan sassan tsiro. [MAIN] Tushen dawa yana kafa shuka kuma ƙananan rassansa suna jawo ruwa da sinadaran gina jiki. Ƙananan hanyoyi a cikin kara suna kai waɗannan abubuwa zuwa ganye. Ganye suna amfani da hasken rana, iska, da ruwa domin samar da abinci. [PAUSE 1] Ta wace hanya ruwa yake tafiya daga tushe zuwa ganye? [MAIN] Furanni suna taimakawa wajen samar da iri, wasu kuma sukan bunƙasa su zama 'ya'ya kamar kabewa ko tumatir. 'Ya'yan suna kare iri har su nuna. Lalacewar tushe tana rage shan ruwa, lalacewar ganye kuma tana rage samar da abinci. [PAUSE 2] Wane aiki 'ya'ya suke yi wa iri? [OUTRO] Ka tuna cewa tushe, kara, ganye, fure, da 'ya'ya suna da ayyuka masu haɗuwa domin tsiro ya rayu ya samar da sabon iri.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ta wace hanya ruwa yake tafiya daga tushe zuwa ganye?" (correct answer: "ta ƙananan hanyoyin cikin kara"; options: ta ƙananan hanyoyin cikin kara, ta cikin fure kawai, ta saman 'ya'ya)
- **[PAUSE 2]** — question shown to the learner: "Wane aiki 'ya'ya suke yi wa iri?" (correct answer: "suna kare iri"; options: suna kare iri, suna yanke tushe, suna busar da ƙasa)

---

### `p3-maths-17` — Lines and Corners

**Target filename:** `audio/p3-maths-17.mp3`
**Title (Hausa):** Layuka da Kusurwa

**Script to read:**

> [INTRO] Yau za mu koyi layuka da kusurwa. [MAIN] Layi na iya zama a tsaye, a kwance, ko a karkace. Kusurwa tana fitowa inda layuka biyu suka haɗu. [PAUSE 1] Murabba’i yana da kusurwa nawa? [MAIN] Alwatika tana da kusurwa 3. Da’ira ba ta da kusurwa, saboda ba ta da inda layuka biyu suka haɗu. [PAUSE 2] Da’ira tana da kusurwa nawa? [OUTRO] Ka tuna: kusurwa tana fitowa a haɗuwar layuka biyu.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Murabba’i yana da kusurwa nawa?" (correct answer: "4"; options: 4, 3, 0)
- **[PAUSE 2]** — question shown to the learner: "Da’ira tana da kusurwa nawa?" (correct answer: "0"; options: 0, 3, 4)

---

### `p3-maths-18` — Simple Perimeter by Counting Sides

**Target filename:** `audio/p3-maths-18.mp3`
**Title (Hausa):** Sauƙaƙan Kewaye ta Ƙirga Gefuna

**Script to read:**

> [INTRO] Yau za mu koyi kewaye ta ƙirga gefuna. [MAIN] Kewaye yana nufin jimlar tsawon gefunan siffa. Idan murabba’i yana da gefuna 4, kowanne gefe santimita 3, kewayensa ya zama 12. [PAUSE 1] Murabba’i mai gefuna 4, kowanne santimita 3, kewayensa nawa ne? [MAIN] Idan alwatika tana da gefuna 3, kowanne gefe santimita 5, kewayenta ya zama 15. [PAUSE 2] Alwatika mai gefuna 3, kowanne santimita 5, kewayenta nawa ne? [OUTRO] Ka tuna: kewaye shi ne haɗin tsawon gefuna.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Murabba’i mai gefuna 4, kowanne santimita 3, kewayensa nawa ne?" (correct answer: "12"; options: 12, 7, 9)
- **[PAUSE 2]** — question shown to the learner: "Alwatika mai gefuna 3, kowanne santimita 5, kewayenta nawa ne?" (correct answer: "15"; options: 15, 8, 10)

---

### `p3-maths-19` — Reading Simple Tables

**Target filename:** `audio/p3-maths-19.mp3`
**Title (Hausa):** Karanta Sauƙaƙan Tebur

**Script to read:**

> [INTRO] Yau za mu koyi karanta sauƙaƙan tebur. [MAIN] Tebur yana da layuka da ginshiƙai. Layi yana tafiya gefe zuwa gefe. Ginshiƙi yana tafiya sama zuwa ƙasa. [PAUSE 1] Ginshiƙi yana tafiya ta wace hanya? [MAIN] Ka karanta taken tebur kafin ka ɗauki lamba. Lamba tana da ma’ana idan ka san abin da take wakilta. [PAUSE 2] Me ya kamata ka fara karantawa a tebur? [OUTRO] Ka tuna: tebur yana shirya bayanai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ginshiƙi yana tafiya ta wace hanya?" (correct answer: "sama zuwa ƙasa"; options: sama zuwa ƙasa, gefe zuwa gefe, zagaye)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka fara karantawa a tebur?" (correct answer: "taken tebur"; options: taken tebur, launi, hoto)

---

### `p3-maths-20` — Simple Bar Charts

**Target filename:** `audio/p3-maths-20.mp3`
**Title (Hausa):** Sauƙaƙan Jadawalin Sanduna

**Script to read:**

> [INTRO] Yau za mu koyi jadawalin sanduna. [MAIN] Sanda mai tsawo tana nuna adadi mai yawa. Sanda mai gajarta tana nuna adadi kaɗan. Ka karanta taken jadawali kafin amsa. [PAUSE 1] Sanda mafi tsawo tana nuna me? [MAIN] Idan sanda A tana nuna 8, sanda B tana nuna 5, bambanci shi ne 3. [PAUSE 2] Idan sanda A tana 8, sanda B tana 5, bambanci nawa ne? [OUTRO] Ka tuna: tsawon sanda yana nuna yawan abu.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Sanda mafi tsawo tana nuna me?" (correct answer: "adadi mai yawa"; options: adadi mai yawa, adadi kaɗan, babu abu)
- **[PAUSE 2]** — question shown to the learner: "Idan sanda A tana 8, sanda B tana 5, bambanci nawa ne?" (correct answer: "3"; options: 3, 5, 8)

---

### `p3-maths-21` — Word Problems with Addition and Subtraction

**Target filename:** `audio/p3-maths-21.mp3`
**Title (Hausa):** Matsalolin Labari na Ƙari da Ragi

**Script to read:**

> [INTRO] Yau za mu warware matsalolin labari na ƙari da ragi. [MAIN] Idan labari ya ce an haɗa ko an ƙara, ka yi ƙari. Idan ya ce an cire ko an kashe, ka yi ragi. [PAUSE 1] Idan kana da 35, aka ƙara 12, jimla nawa ce? [MAIN] Karanta tambaya a hankali. Ka san abin da ake nema: jimla ce ko saura? Sannan ka rubuta lissafi. [PAUSE 2] Idan kana da 80, ka kashe 25, saura nawa ne? [OUTRO] Ka tuna: kalmomin labari suna gaya maka aikin lissafi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan kana da 35, aka ƙara 12, jimla nawa ce?" (correct answer: "47"; options: 47, 35, 23)
- **[PAUSE 2]** — question shown to the learner: "Idan kana da 80, ka kashe 25, saura nawa ne?" (correct answer: "55"; options: 55, 105, 25)

---

### `p3-maths-22` — Word Problems with Multiplication and Division

**Target filename:** `audio/p3-maths-22.mp3`
**Title (Hausa):** Matsalolin Labari na Ninkawa da Rarrabawa

**Script to read:**

> [INTRO] Yau za mu warware matsalolin labari na ninkawa da rarrabawa. [MAIN] Idan rukuni da yawa suna da adadi iri ɗaya, ninkawa ce. Jakunkuna 4, kowanne yana da lemo 6, jimla ita ce 24. [PAUSE 1] Jakunkuna 4, kowanne da lemo 6, jimla nawa? [MAIN] Idan jimla ta kasu ga mutane daidai, rarrabawa ce. Idan an raba lemo 24 ga yara 6, kowane yaro zai samu 4. [PAUSE 2] Lemo 24 ga yara 6, kowane yaro nawa? [OUTRO] Ka tuna: rukuni iri ɗaya na iya nufin ninkawa ko rarrabawa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Jakunkuna 4, kowanne da lemo 6, jimla nawa?" (correct answer: "24"; options: 24, 10, 12)
- **[PAUSE 2]** — question shown to the learner: "Lemo 24 ga yara 6, kowane yaro nawa?" (correct answer: "4"; options: 4, 6, 24)

---

### `p3-maths-23` — Mixed Review: Numbers, Money, and Measurement

**Target filename:** `audio/p3-maths-23.mp3`
**Title (Hausa):** Bita Mai Haɗi: Lambobi, Kuɗi, da Awo

**Script to read:**

> [INTRO] Yau za mu yi bita mai haɗa lambobi, kuɗi, da awo. [MAIN] Ka fara da fahimtar tambaya. Idan ana neman jimla, ka yi ƙari. Idan ana neman saura, ka yi ragi. [PAUSE 1] Idan ka haɗa ₦40 da ₦30, jimla nawa ce? [MAIN] Idan tambaya tana magana da mita ko kilogiram, ka kula da ma’auni. Kada ka haɗa ma’auni daban ba tare da sani ba. [PAUSE 2] Mita 2 suna da santimita nawa? [OUTRO] Ka tuna: fahimtar tambaya tana zuwa kafin lissafi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan ka haɗa ₦40 da ₦30, jimla nawa ce?" (correct answer: "70"; options: 70, 10, 40)
- **[PAUSE 2]** — question shown to the learner: "Mita 2 suna da santimita nawa?" (correct answer: "200"; options: 200, 100, 20)

---

### `p3-maths-24` — P3 Mathematics Revision and Bridge to P4

**Target filename:** `audio/p3-maths-24.mp3`
**Title (Hausa):** Bitar Lissafin P3 da Gada Zuwa P4

**Script to read:**

> [INTRO] Yau za mu yi bitar P3 kuma mu shirya zuwa P4. [MAIN] Ka tuna lambobi, ƙari, ragi, ninkawa, rarrabawa, rabi, kwata, kuɗi, lokaci, awo, da siffofi. [PAUSE 1] Idan kana neman jimla, wane aiki kake yi? [MAIN] Idan kana neman saura, ka yi ragi. Idan rukuni iri ɗaya ne, ka duba ninkawa ko rarrabawa. [PAUSE 2] Idan kana neman saura, wane aiki kake yi? [OUTRO] Ka tuna: P3 tushe ne mai ƙarfi don P4.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan kana neman jimla, wane aiki kake yi?" (correct answer: "ƙari"; options: ƙari, ragi, kwata)
- **[PAUSE 2]** — question shown to the learner: "Idan kana neman saura, wane aiki kake yi?" (correct answer: "ragi"; options: ragi, ninkawa, rabi)

---
