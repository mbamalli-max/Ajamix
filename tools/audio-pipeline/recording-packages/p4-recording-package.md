# AJAMIX Audio Recording Package — p4 (60 modules)

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

### `p4-maths-01` — Numbers up to 10,000

**Target filename:** `audio/p4-maths-01.mp3`
**Title (Hausa):** Lambobi Har Zuwa 10,000

**Script to read:**

> [INTRO] Yau za mu koyi lambobi har zuwa dubu goma. [MAIN] Lamba mai wurare huɗu tana iya nuna dubu, ɗari, goma, da ɗaya. A 4,386, akwai dubu huɗu, ɗari uku, tamanin, da shida. Idan ka karanta daga hagu zuwa dama, lambar za ta fi sauƙin fahimta. [PAUSE 1] A lamba 4,386, wace lamba ce a wurin dubu? [MAIN] Ka lura da sifili. A 7,050, sifili yana nuna babu ɗari, amma har yanzu wurin yana nan. Idan ka ƙirga daga 9,998, lamba ta gaba ita ce 9,999, sannan 10,000. [PAUSE 2] Wace lamba ce bayan 9,999? [OUTRO] Ka tuna: manyan lambobi suna zama sauƙi idan ka raba su zuwa dubu, ɗari, goma, da ɗaya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A lamba 4,386, wace lamba ce a wurin dubu?" (correct answer: "4"; options: 4, 3, 8)
- **[PAUSE 2]** — question shown to the learner: "Wace lamba ce bayan 9,999?" (correct answer: "10,000"; options: 9,998, 10,000, 9,000)

---

### `p4-bsci-01` — Plant Groups: Trees, Shrubs, and Herbs

**Target filename:** `audio/p4-bsci-01.mp3`
**Title (Hausa):** Rukunin Tsirrai: Bishiyoyi, Ƙananan Bishiyoyi, da Ganyayyaki

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Rukunin Tsirrai: Bishiyoyi, Ƙananan Bishiyoyi, da Ganyayyaki. [MAIN] Yau za ka koyi yadda ake rarraba tsirrai zuwa bishiyoyi, ƙananan bishiyoyi, da ganyayyaki. Bishiya tana da kara mai kauri kuma tana iya girma sosai, kamar mangwaro ko kuka. Ƙaramar bishiya tana da rassan kara da yawa kusa da ƙasa, kamar lalle. Ganyayyaki kuma kan zama ƙanana kuma kararsu ba ta da kauri, kamar albasa ko alayyahu. Idan ka je gida, makaranta, ko gona, ka duba tsiro ba tare da cire shi ba. Ka lura da tsayinsa, kaurin kararsa, da rassansa. Wannan ba wai kawai sanin suna ba ne; yana taimaka maka ka fahimci abin da manomi yake shukawa da yadda ake kula da shi. Ka tambayi babba idan ba ka san sunan tsiro ba. Ka riƙa kare tsirrai, domin suna ba mu abinci, inuwa, da iska mai kyau. [PAUSE 1] Wane rukunin tsiro ne mangwaro? [MAIN] Bishiya tana da kara mai kauri, yayin da ganyayyaki kararsu ba ta da kauri. [PAUSE 2] Wane rukunin tsiro ne albasa? [OUTRO] Ka riƙa lura da kara da rassan tsiro ba tare da cire shi ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane rukunin tsiro ne mangwaro?" (correct answer: "bishiya"; options: bishiya, ƙaramar bishiya, ganye)
- **[PAUSE 2]** — question shown to the learner: "Wane rukunin tsiro ne albasa?" (correct answer: "ganye"; options: bishiya, ganye, ƙaramar bishiya)

---

### `p4-socs-01` — Nigeria — Our Country

**Target filename:** `audio/p4-socs-01.mp3`
**Title (Hausa):** Nijeriya — Ƙasarmu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi Nijeriya a matsayin ƙasarmu. [MAIN] Nijeriya tana Yammacin Afirka. Tana da jihohi talatin da shida da Yankin Babban Birnin Tarayya. Abuja ita ce babban birnin ƙasa, kuma kowace jiha tana da babban birninta. Ana haɗa jihohin cikin yankuna shida domin bayyana wurarensu. Waɗannan yankuna ba matakan gwamnati ba ne. [PAUSE 1] Jihohi nawa ne a Nijeriya? [MAIN] Taswira tana iya nuna iyakar ƙasa, jihohi, manyan birane, koguna, da gabar teku. Idan ka duba taswira, ka fara neman arewa, kudu, gabas, da yamma. Ka gano jiharku da babban birninta, sannan ka kwatanta wurinta da Abuja. Sanin wurare yana taimaka wa ƴan ƙasa su fahimci nisa, tafiya, da ayyukan jama’a. [PAUSE 2] Wane birni ne babban birnin Nijeriya? [OUTRO] Ka nuna jiharku a taswirar Nijeriya, ka faɗi babban birninta, sannan ka nuna inda Abuja take ba tare da ba da labarin tarihi ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Jihohi nawa ne a Nijeriya?" (correct answer: "talatin da shida"; options: talatin da shida, ashirin da shida, arba’in da shida)
- **[PAUSE 2]** — question shown to the learner: "Wane birni ne babban birnin Nijeriya?" (correct answer: "Abuja"; options: Abuja, Kano, Lagos)

---

### `p4-maths-02` — Place Value to Thousands

**Target filename:** `audio/p4-maths-02.mp3`
**Title (Hausa):** Matsayin Lamba Har Zuwa Dubu

**Script to read:**

> [INTRO] Yau za mu koyi matsayin lamba har zuwa dubu. [MAIN] Kowace lamba tana da wurinta. A 6,245, 6 tana wurin dubu, 2 tana wurin ɗari, 4 tana wurin goma, 5 tana wurin ɗaya. Wannan yana nuna cewa 6 tana da ƙimar 6,000. [PAUSE 1] A lamba 6,245, wace lamba ce a wurin ɗari? [MAIN] Idan aka ba ka sassa, za ka iya haɗa lamba. 3 dubu, 4 ɗari, 7 goma, da 2 ɗaya suna zama 3,472. Ka duba daga hagu zuwa dama. [PAUSE 2] Idan aka haɗa 3 dubu, 4 ɗari, 7 goma, da 2 ɗaya, wace lamba ce? [OUTRO] Matsayi yana taimaka maka ka san ƙimar lamba, ba rubutunta kawai ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A lamba 6,245, wace lamba ce a wurin ɗari?" (correct answer: "2"; options: 6, 2, 4)
- **[PAUSE 2]** — question shown to the learner: "Idan aka haɗa 3 dubu, 4 ɗari, 7 goma, da 2 ɗaya, wace lamba ce?" (correct answer: "3,472"; options: 3,472, 3,427, 4,372)

---

### `p4-bsci-02` — Animal Groups: Vertebrates and Invertebrates

**Target filename:** `audio/p4-bsci-02.mp3`
**Title (Hausa):** Rukunin Dabbobi: Masu Ƙashin Baya da Marasa Ƙashin Baya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Rukunin Dabbobi: Masu Ƙashin Baya da Marasa Ƙashin Baya. [MAIN] Dabbobi suna da siffofi daban-daban. Wasu suna da ƙashin baya a cikin jikinsu; ana kiran su dabbobi masu ƙashin baya. Kaza, akuya, kifi, da mutum suna cikin wannan rukuni. Wasu kuma ba su da ƙashin baya; ana kiran su marasa ƙashin baya. Misalansu sun haɗa da tsutsa, ƙudan zuma, da malam buɗe ido. Ba sai ka kama dabba ba domin ka koya; ka lura da ita daga nesa cikin aminci. Idan ka ga kaza tana tafiya ko kifi a ruwa, ka tuna cewa jikinsu yana da ƙashin baya. Idan ka ga ƙudan zuma, kar ka kusance ta, domin tana iya cizo. Wannan rarrabawa tana taimaka maka ka fahimci bambancin halittu. Ka girmama dabbobi, kada ka jefa musu dutse, kuma ka sanar da babba idan dabba mai hatsari tana kusa. [PAUSE 1] Wace dabba ce mai ƙashin baya? [MAIN] Kaza da kifi masu ƙashin baya ne, amma tsutsa da ƙudan zuma ba su da ƙashin baya. [PAUSE 2] Wace dabba ce ba ta da ƙashin baya? [OUTRO] Ka lura da dabbobi daga nesa, kuma ka sanar da babba idan dabba mai hatsari tana kusa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace dabba ce mai ƙashin baya?" (correct answer: "kaza"; options: kaza, tsutsa, ƙudan zuma)
- **[PAUSE 2]** — question shown to the learner: "Wace dabba ce ba ta da ƙashin baya?" (correct answer: "tsutsa"; options: akuya, tsutsa, kifi)

---

### `p4-socs-02` — The Nigerian People — Ethnic Groups and Languages

**Target filename:** `audio/p4-socs-02.mp3`
**Title (Hausa):** Al’ummomin Nijeriya da Harsunansu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi al’ummomin Nijeriya da harsunansu. [MAIN] Nijeriya tana da al’ummomi da harsuna masu yawa. Akwai Hausa, Fulani, Yoruba, Igbo, Kanuri, Tiv, Edo, Ibibio, da wasu da dama. Ba kowa a al’umma ɗaya yake magana, sutura, ko sana’a iri ɗaya ba. Mutum kuma na iya magana da harsuna fiye da ɗaya. [PAUSE 1] Me harshe yake taimaka wa mutane su yi? [MAIN] Harshe yana taimaka wa mutane su bayyana tunani, su koyar, su yi ciniki, kuma su adana al’adu. Babu al’umma ko harshe da ya fi wani daraja. Idan ka ji sabon suna, ka tambaya cikin ladabi, kada ka yi raini. Yara daga iyalai daban-daban za su iya aiki tare da sauraron juna. [PAUSE 2] Wane hali ya dace idan ka ji harshen da ba ka sani ba? [OUTRO] Ka faɗi harsuna biyu da ake ji a yankinku, sannan ka bayyana yadda sauraro cikin ladabi yake gina haɗin kai ba tare da fifita wata al’umma ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me harshe yake taimaka wa mutane su yi?" (correct answer: "bayyana tunani"; options: bayyana tunani, lalata kaya, toshe hanya)
- **[PAUSE 2]** — question shown to the learner: "Wane hali ya dace idan ka ji harshen da ba ka sani ba?" (correct answer: "tambaya cikin ladabi"; options: tambaya cikin ladabi, yin raini, ƙin sauraro)

---

### `p4-maths-03` — Comparing and Ordering Numbers

**Target filename:** `audio/p4-maths-03.mp3`
**Title (Hausa):** Kwatanta da Jera Lambobi

**Script to read:**

> [INTRO] Yau za mu koyi kwatanta da jera lambobi. [MAIN] Idan lambobi biyu suna da wurare huɗu, ka fara duba wurin dubu. Idan dubu sun yi daidai, sai ka duba ɗari, sannan goma, sannan ɗaya. [PAUSE 1] Wacce lamba ta fi girma: 7,420 ko 7,240? [MAIN] Don jera lambobi daga ƙanana zuwa manya, ka fara da lambar da ta fi ƙanƙanta. Idan an ba ka 3,100, 2,950, da 3,050, lamba ta farko ita ce 2,950. [PAUSE 2] Idan an jera 3,100, 2,950, 3,050 daga ƙanana zuwa manya, wace lamba ce ta farko? [OUTRO] Ka tuna: kwatanta tana farawa daga hagu zuwa dama.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wacce lamba ta fi girma: 7,420 ko 7,240?" (correct answer: "7,420"; options: 7,420, 7,240, 7,024)
- **[PAUSE 2]** — question shown to the learner: "Idan an jera 3,100, 2,950, 3,050 daga ƙanana zuwa manya, wace lamba ce ta farko?" (correct answer: "2,950"; options: 3,100, 2,950, 3,050)

---

### `p4-bsci-03` — Types of Soil

**Target filename:** `audio/p4-bsci-03.mp3`
**Title (Hausa):** Nau'o'in Ƙasa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Nau'o'in Ƙasa. [MAIN] Ƙasa ba iri ɗaya ba ce. A wannan darasi za ka san ƙasa mai yashi, ƙasa mai laka, da ƙasa mai kyau ta noma. Ƙasa mai yashi tana da ƙwayoyi masu girma kuma ruwa yana wucewa da sauri a cikinta. Ƙasa mai laka tana manne wa hannu idan ta ji ruwa, kuma ruwa yana tsaya a cikinta na ɗan lokaci. Ƙasa mai kyau ta noma tana haɗa yashi da laka tare da tarkacen ganye da suka ruɓe; tana taimaka wa tsiro ya yi girma. Ka nemi izinin babba kafin ka duba ƙasa a gona. Ka ɗauki ɗan ƙasa kaɗan, ka ji ta da yatsunka, sannan ka wanke hannuwanka. Manomi yana lura da irin ƙasa kafin ya shuka. Wannan ilimi yana taimaka maka ka fahimci dalilin da ya sa wasu gonaki suke fi dacewa da wasu tsirrai. [PAUSE 1] Wace ƙasa ce ruwa yake wucewa da sauri a cikinta? [MAIN] Ƙasa mai yashi tana barin ruwa ya wuce da sauri, amma ƙasa mai laka tana riƙe shi na ɗan lokaci. [PAUSE 2] Wace ƙasa ce take manne wa hannu idan ta ji ruwa? [OUTRO] Ka nemi izinin babba, ka ɗauki ɗan ƙasa kaɗan, sannan ka wanke hannuwanka.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace ƙasa ce ruwa yake wucewa da sauri a cikinta?" (correct answer: "ƙasa mai yashi"; options: ƙasa mai yashi, ƙasa mai laka, ƙasa mai kyau ta noma)
- **[PAUSE 2]** — question shown to the learner: "Wace ƙasa ce take manne wa hannu idan ta ji ruwa?" (correct answer: "ƙasa mai laka"; options: ƙasa mai yashi, ƙasa mai laka, ƙasa mai kyau ta noma)

---

### `p4-socs-03` — Nigeria's Geography — Landscape and Regions

**Target filename:** `audio/p4-socs-03.mp3`
**Title (Hausa):** Yanayin Ƙasa da Yankunan Nijeriya

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yanayin ƙasa da yankunan Nijeriya. [MAIN] A arewa mai nisa akwai Sahel mai ƙarancin ciyayi da ruwan sama. A mafi yawan Arewa ana samun filayen ciyawa na Sudan. Wasu sassan kudu suna da dazuzzuka, gabar teku kuma tana da bishiyoyin da suke girma cikin ruwa mai gauraye da gishiri. [PAUSE 1] Waɗanne manyan koguna biyu ne suke haɗuwa a Lokoja? [MAIN] Kogin Neja da Kogin Binuwai suna haɗuwa a Lokoja. Akwai tsaunuka, kwaruruka, filaye, da gabar teku. Albarkatun ƙasa ba su bazu daidai ba; noma, daji, ruwa, kiwo, da ma’adanai suna bambanta tsakanin wurare. Wannan yana shafar sana’o’i, sufuri, da matsugunan mutane. [PAUSE 2] Wane yanki ne yake da ƙarancin ciyayi da ruwan sama? [OUTRO] Ka duba taswirar yanayin Nijeriya ka nuna Sahel, filayen ciyawa, dazuzzuka, da koguna biyu; ka tsaya ga bayanin ƙasa kawai, ba tarihin wani zamani ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne manyan koguna biyu ne suke haɗuwa a Lokoja?" (correct answer: "Kogin Neja da Kogin Binuwai"; options: Kogin Neja da Kogin Binuwai, Kogin Neja da Teku, Kogin Binuwai da Tafki)
- **[PAUSE 2]** — question shown to the learner: "Wane yanki ne yake da ƙarancin ciyayi da ruwan sama?" (correct answer: "Sahel"; options: Sahel, dazuzzuka, gabar teku)

---

### `p4-maths-04` — Addition of Larger Numbers

**Target filename:** `audio/p4-maths-04.mp3`
**Title (Hausa):** Ƙarin Manyan Lambobi

**Script to read:**

> [INTRO] Yau za mu koyi ƙarin manyan lambobi. [MAIN] Ka tsara lambobi a wurare: ɗaya da ɗaya, goma da goma, ɗari da ɗari, dubu da dubu. Idan ka haɗa 2,345 da 1,230, jimlar ita ce 3,575. [PAUSE 1] Nawa ne 2,345 da 1,230? [MAIN] Idan wuri ya kai goma, ka ɗauki ɗaya zuwa wuri na gaba. Ka rubuta abin da ka ɗauka domin kada ka manta. Fara daga dama, ka tafi hagu cikin natsuwa. [PAUSE 2] A ƙari, idan wurin ɗaya ya kai goma, me za ka yi? [OUTRO] Ka tuna: daidaita wurare yana sa ƙari ya zama mai sauƙi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nawa ne 2,345 da 1,230?" (correct answer: "3,575"; options: 3,575, 3,475, 2,575)
- **[PAUSE 2]** — question shown to the learner: "A ƙari, idan wurin ɗaya ya kai goma, me za ka yi?" (correct answer: "ka ɗauki ɗaya"; options: ka ɗauki ɗaya, ka bar shi, ka fara daga hagu)

---

### `p4-bsci-04` — Soil and Farming

**Target filename:** `audio/p4-bsci-04.mp3`
**Title (Hausa):** Ƙasa da Aikin Noma

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Ƙasa da Aikin Noma. [MAIN] Irin ƙasa yana taimaka wa manomi ya zaɓi yadda zai yi noma. Ƙasa mai kyau ta noma tana riƙe ruwa gwargwado kuma tana da tarkacen tsirrai da suka ruɓe, saboda haka tsiro kan samu abin da yake bukata. Idan ƙasa mai yashi ce, ruwa kan wuce da sauri; manomi na iya ba shuka ruwa a hankali idan ya dace. Idan ƙasa mai laka ce, ruwa kan tsaya, don haka ba a son a cika ta da ruwa. Ba kai ne za ka yanke hukunci a gona kai kaɗai ba; ka tambayi iyaye ko manomi. Za ka iya taimakawa ta hanyar cire shara daga fili, kada ka taka sabon tsiro, kuma ka kawo ruwa idan babba ya ce. Ka riƙa lura da irin ƙasar gonar gida. Hakan yana nuna maka cewa noma yana bukatar hankali, aiki, da kula da muhalli. [PAUSE 1] Wace ƙasa ce ta fi taimaka wa tsiro ya girma? [MAIN] Manomi yana la'akari da irin ƙasa domin ya kula da ruwa da sabon tsiro yadda ya dace. [PAUSE 2] Me ya kamata ka yi da sabon tsiro? [OUTRO] Ka taimaka wajen kula da gona ta hanyar kada ka taka sabon tsiro.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace ƙasa ce ta fi taimaka wa tsiro ya girma?" (correct answer: "ƙasa mai kyau ta noma"; options: ƙasa mai kyau ta noma, dutse, kwalba)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi da sabon tsiro?" (correct answer: "kada ka taka shi"; options: ka taka shi, ka karya shi, kada ka taka shi)

---

### `p4-socs-04` — National Identity — Our Flag, Anthem, Pledge, and Symbols

**Target filename:** `audio/p4-socs-04.mp3`
**Title (Hausa):** Tuta, Taken Ƙasa, Alkawarin Ƙasa, da Alamomi

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi tutar Nijeriya, taken ƙasa, alkawarin ƙasa, da alamomi. [MAIN] Tutar Nijeriya tana da kore, fari, kore. Kore yana nuna albarkatun ƙasa da noma, fari kuma yana nuna zaman lafiya. Tambarin Nijeriya yana ɗauke da alamomi da suke wakiltar ƙasa, ƙarfi, albarkatu, da haɗin kai. [PAUSE 1] Me farin launin tutar Nijeriya yake nunawa? [MAIN] Taken ƙasa waƙa ce da ake rerawa a lokutan hukuma ko makaranta. Alkawarin ƙasa kalmomi ne da ake furtawa domin nuna biyayya ga ƙasa da niyyar yin alhaki. Waɗannan alamomi na ƙasa baki ɗaya ne, ba na jam’iyya ko shugaba ɗaya ba. A kula da tuta, a kuma tsaya cikin natsuwa idan tsarin makaranta ya buƙata. [PAUSE 2] Me alamomin ƙasa suke tunatar da ƴan ƙasa? [OUTRO] Lokacin da ka ga tuta ko ka ji taken ƙasa, ka tuna da zaman lafiya, hidima, gaskiya, da haɗin kan dukkan ƴan Nijeriya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me farin launin tutar Nijeriya yake nunawa?" (correct answer: "zaman lafiya"; options: zaman lafiya, hayaniya, rarrabuwar kai)
- **[PAUSE 2]** — question shown to the learner: "Me alamomin ƙasa suke tunatar da ƴan ƙasa?" (correct answer: "suna cikin ƙasa ɗaya"; options: suna cikin ƙasa ɗaya, suna cikin jam’iyya ɗaya, suna magana da harshe ɗaya)

---

### `p4-maths-05` — Subtraction of Larger Numbers

**Target filename:** `audio/p4-maths-05.mp3`
**Title (Hausa):** Ragin Manyan Lambobi

**Script to read:**

> [INTRO] Yau za mu koyi ragin manyan lambobi. [MAIN] Ka tsara lambobi bisa wurare, sannan ka fara daga dama. Idan ka cire 1,234 daga 3,456, amsar ita ce 2,222. Ka duba ɗaya, goma, ɗari, da dubu a jere. [PAUSE 1] Nawa ne 3,456 cire 1,234? [MAIN] Idan lambar sama ta yi ƙasa, ka aro daga wuri na gaba. Bayan ka aro, ka ci gaba da ragi cikin natsuwa. Ka iya duba amsa ta hanyar ƙari. [PAUSE 2] A ragi, idan lambar sama ta yi ƙasa, me za ka yi? [OUTRO] Ka tuna: ragi yana buƙatar daidaita wurare da kula da aro.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nawa ne 3,456 cire 1,234?" (correct answer: "2,222"; options: 2,222, 2,122, 4,690)
- **[PAUSE 2]** — question shown to the learner: "A ragi, idan lambar sama ta yi ƙasa, me za ka yi?" (correct answer: "ka aro"; options: ka aro, ka ƙara sifili, ka daina lissafi)

---

### `p4-bsci-05` — Everyday Sources of Energy

**Target filename:** `audio/p4-bsci-05.mp3`
**Title (Hausa):** Tushen Ƙarfi a Rayuwar Yau da Kullum

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Tushen Ƙarfi a Rayuwar Yau da Kullum. [MAIN] Ƙarfi yana taimaka wa abubuwa su yi aiki ko su ba da haske da zafi. Rana tana ba mu haske da dumi. Wuta tana iya dafa abinci, amma babba ne kawai zai kula da ita. Iska mai ƙarfi tana iya motsa injin niƙa ko tura jirgin ruwa mai jirgi, amma iska mai ƙarfi na iya zama haɗari. Baturi kuma yana ba fitila ko rediyo ƙarfi. Ka lura da tushen ƙarfi a gida cikin aminci. Kada ka kunna wuta, kada ka taɓa kayan lantarki da hannu mai ruwa, kuma kada ka kusanci hayaƙi. Idan ana dafa abinci, ka tsaya nesa sai babba ya ba ka aiki. Ka tuna cewa ƙarfi yana da amfani idan an yi amfani da shi da kulawa. Ta haka za ka iya gane bambanci tsakanin amfani mai kyau da abin da zai iya jawo haɗari. [PAUSE 1] Wane abu ne rana take ba mu? [MAIN] Rana, wuta, iska, da baturi tushen ƙarfi ne, amma a yi amfani da su cikin kulawa. [PAUSE 2] Wa ya kamata ya kula da wuta? [OUTRO] Ka nisanci hayaƙi da wuta, kuma ka bar babba ya kula da su.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne rana take ba mu?" (correct answer: "haske"; options: haske, ƙura, laka)
- **[PAUSE 2]** — question shown to the learner: "Wa ya kamata ya kula da wuta?" (correct answer: "babba"; options: ƙaramin yaro, babba, ƙudan zuma)

---

### `p4-socs-05` — Nigerian Government — The Three Tiers

**Target filename:** `audio/p4-socs-05.mp3`
**Title (Hausa):** Matakan Gwamnati Uku a Nijeriya

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi matakan Gwamnatin Nijeriya uku. [MAIN] Matakan su ne Gwamnatin Tarayya, gwamnatin jiha, da ƙaramar hukuma. Tarayya tana aiki ga ƙasa baki ɗaya. Jiha tana aiki a cikin jiharta. Ƙaramar hukuma tana kusa da jama’ar gari da ƙauye. [PAUSE 1] Waɗanne matakan gwamnati uku ne Nijeriya take da su? [MAIN] Tarayya tana kula da kuɗin ƙasa da wasu manyan ayyuka. Jiha tana iya kula da wasu makarantu, asibitoci, da hanyoyi. Ƙaramar hukuma tana iya taimakawa wajen kasuwa, tsaftar muhalli, wuraren ruwa, da wasu hanyoyin cikin gari. Ayyuka da dama suna bukatar hukumomi su haɗa hannu. [PAUSE 2] Wace hukuma ce take kusa da jama’ar gari da ƙauye? [OUTRO] Idan ka ga buƙatar kasuwa, makaranta, ko babbar hanya, ka tambayi wane matakin gwamnati ne zai iya shiga da kuma wanda zai haɗa hannu da shi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne matakan gwamnati uku ne Nijeriya take da su?" (correct answer: "Tarayya, jiha, da ƙaramar hukuma"; options: Tarayya, jiha, da ƙaramar hukuma, gida, aji, da kasuwa, arewa, kudu, da teku)
- **[PAUSE 2]** — question shown to the learner: "Wace hukuma ce take kusa da jama’ar gari da ƙauye?" (correct answer: "ƙaramar hukuma"; options: ƙaramar hukuma, ƙungiyar wasa, ajin makaranta)

---

### `p4-maths-06` — Multiplication Tables Review up to 10

**Target filename:** `audio/p4-maths-06.mp3`
**Title (Hausa):** Bita Kan Teburin Ninkawa Har Zuwa 10

**Script to read:**

> [INTRO] Yau za mu yi bita kan teburin ninkawa har zuwa goma. [MAIN] Ninkawa yana nufin ƙara abu iri ɗaya sau da yawa. 4 sau 6 yana nufin 6 + 6 + 6 + 6, amsa 24. Idan ka tuna tebur, lissafi zai yi sauri. [PAUSE 1] Nawa ne 4 sau 6? [MAIN] Ka yi amfani da ƙungiyoyi. Idan faranti 7 kowanne yana da lemu 3, za ka yi 7 sau 3, amsa 21. Ka maimaita teburin 2, 5, da 10, sannan ka ƙarfafa sauran. [PAUSE 2] Nawa ne 7 sau 3? [OUTRO] Ka tuna: ninkawa ƙari ne maimaitacce, kuma atisaye yana sa ka tuna da sauri.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Nawa ne 4 sau 6?" (correct answer: "24"; options: 10, 24, 46)
- **[PAUSE 2]** — question shown to the learner: "Nawa ne 7 sau 3?" (correct answer: "21"; options: 10, 21, 73)

---

### `p4-bsci-06` — Simple Electricity Safety

**Target filename:** `audio/p4-bsci-06.mp3`
**Title (Hausa):** Lantarki Mai Sauƙi da Tsaro

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Lantarki Mai Sauƙi da Tsaro. [MAIN] Lantarki wani irin ƙarfi ne da ke sa fitila, rediyo, ko fanfo su yi aiki. Baturi yana iya ba ƙaramin abu lantarki, kamar fitilar hannu. Amma lantarki na iya cutarwa idan an yi sakaci. Kada ka saka yatsa ko waya a ramin bango. Kada ka taɓa soket ko waya da hannu mai ruwa. Idan ka ga waya ta yage, soket ya fashe, ko wuta ta yi walƙiya, kada ka kusance shi; ka sanar da babba nan da nan. Fitilar hannu mai baturi ta fi dacewa ka yi amfani da ita tare da kulawar babba. Ka kashe fitila idan ba a bukatarta domin a ajiye baturi. Wannan darasi bai ce ka gyara kayan lantarki ba. Aikinka shi ne ka kiyaye kanka, ka kiyaye ruwa daga lantarki, kuma ka kira babban mutum idan ka ga matsala. [PAUSE 1] Me ke ba fitilar hannu lantarki? [MAIN] Baturi yana ba fitilar hannu lantarki, kuma ka sanar da babba idan ka ga waya ta yage. [PAUSE 2] Me za ka yi idan ka ga waya ta yage? [OUTRO] Ka kiyaye ruwa daga lantarki, kuma ka sanar da babba idan ka ga matsala.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ke ba fitilar hannu lantarki?" (correct answer: "baturi"; options: baturi, ƙasa, ganye)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan ka ga waya ta yage?" (correct answer: "ka sanar da babba"; options: ka gyara ta, ka taɓa ta, ka sanar da babba)

---

### `p4-socs-06` — The Three Arms of Government

**Target filename:** `audio/p4-socs-06.mp3`
**Title (Hausa):** Rassan Gwamnati Uku

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi rassan gwamnati uku. [MAIN] Reshen zartarwa yana gudanar da ayyukan gwamnati kuma yana aiwatar da dokoki. Reshen kafa doka yana tattauna bukatun jama’a da tsara dokoki. Reshen shari’a yana sauraron shari’o’i, yana bayyana yadda doka take aiki, kuma yana warware saɓani bisa doka. [PAUSE 1] Wane reshe ne yake tsara dokoki? [MAIN] Babbar dokar ƙasa tana bayyana iyakokin ayyukan rassan. Rarraba ayyuka yana taimakawa kada reshe ɗaya ya yi komai shi kaɗai. Kowane reshe yana iya duba wani ta hanyar da doka ta tanada. Wannan yana ƙarfafa adalci, alhaki, da bin doka. [PAUSE 2] Me reshen shari’a yake yi idan mutane suna da saɓani? [OUTRO] Ka haɗa kowane aiki da reshensa: aiwatar da doka, tsara doka, ko warware saɓani bisa doka; wannan rarrabewa tana kare adalci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane reshe ne yake tsara dokoki?" (correct answer: "reshen kafa doka"; options: reshen kafa doka, reshen zartarwa, reshen shari’a)
- **[PAUSE 2]** — question shown to the learner: "Me reshen shari’a yake yi idan mutane suna da saɓani?" (correct answer: "yana warware saɓani bisa doka"; options: yana warware saɓani bisa doka, yana shuka amfanin gona, yana sayar da kaya)

---

### `p4-maths-07` — Division as Sharing and Grouping

**Target filename:** `audio/p4-maths-07.mp3`
**Title (Hausa):** Rabawa Daidai da Yin Rukuni

**Script to read:**

> [INTRO] Yau za mu koyi rabawa daidai da yin rukuni. [MAIN] Idan kana da lemu 24, ka raba su ga yara 6, kowane yaro zai samu 4. Domin 6 sau 4 yana ba da 24, rabawa tana komawa ga ninkawa. [PAUSE 1] Idan an raba lemu 24 ga yara 6, kowane yaro zai samu nawa? [MAIN] Wata hanya ita ce yin rukuni. Idan kana da abubuwa 30, ka sa 5 a kowane rukuni, za ka samu rukuni 6. Ka iya gwadawa da duwatsu ko ƙwallaye a gida. [PAUSE 2] Idan abubuwa 30 suna rukuni-rukuni na 5, rukuni nawa za a samu? [OUTRO] Ka tuna: rabawa tana nufin raba daidai ko neman yawan rukuni.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan an raba lemu 24 ga yara 6, kowane yaro zai samu nawa?" (correct answer: "4"; options: 4, 6, 24)
- **[PAUSE 2]** — question shown to the learner: "Idan abubuwa 30 suna rukuni-rukuni na 5, rukuni nawa za a samu?" (correct answer: "6"; options: 5, 6, 30)

---

### `p4-bsci-07` — Push and Pull

**Target filename:** `audio/p4-bsci-07.mp3`
**Title (Hausa):** Tura da Ja

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Tura da Ja. [MAIN] Ƙarfi ba haske kawai ba ne; yana iya sa abu ya motsa. Idan ka tura ƙofa domin ta buɗe, kana amfani da tura. Idan ka ja ruwa daga rijiya da igiya, kana amfani da ja. Tura da ja duka ƙarfi ne da ke canja wurin abu. Ƙwallo tana motsawa idan ka ture ta, amma idan ta tsaya ba ka ƙara ƙarfi ba. Ka yi wannan lura da abubuwa masu sauƙi a gida ko a aji, ba tare da tura mutum ko dabba ba. Kada ka tura ƙofa da ƙarfi idan wani yana bayanta. Kada ka ja abu mai nauyi kai kaɗai; ka nemi taimakon babba. Idan ka san lokacin da za ka tura ko ja, za ka yi wasa da aiki cikin aminci. Ka tuna: ƙarfi na iya motsa abu, tsayar da abu, ko canja hanyar da yake tafiya. [PAUSE 1] Me kake yi idan ka buɗe ƙofa zuwa gaba? [MAIN] Tura da ja ƙarfi ne da zai iya motsa abu ko canja hanyar da yake tafiya. [PAUSE 2] Me kake yi idan ka ɗaga guga da igiya? [OUTRO] Kada ka tura mutum ko dabba, kuma ka nemi taimakon babba da abu mai nauyi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me kake yi idan ka buɗe ƙofa zuwa gaba?" (correct answer: "tura"; options: tura, ja, ɓoye)
- **[PAUSE 2]** — question shown to the learner: "Me kake yi idan ka ɗaga guga da igiya?" (correct answer: "ja"; options: tura, ja, tsayawa)

---

### `p4-socs-07` — Democracy and Elections

**Target filename:** `audio/p4-socs-07.mp3`
**Title (Hausa):** Yadda Jama’a Ke Nuna Wanda Suke So Ya Jagorance Su

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yadda jama’a ke nuna wanda suke so ya jagorance su. [MAIN] Mutanen da doka ta ba dama suna yin rajista, su je wurin da aka tanada, su nuna mutum guda sau ɗaya kuma cikin sirri. Wannan yana sa muryar kowane mai shiga ta sami daraja iri ɗaya. Hukumar INEC ce take shirya wannan aiki a matakin ƙasa. [PAUSE 1] Wace hukuma ce take shirya wannan aiki a matakin ƙasa? [MAIN] Ana ƙirga abin da mutane suka nuna, kuma aikin ya kasance cikin gaskiya, natsuwa, da bin doka. Ba a tilasta wa mutum ya nuna wanda wani yake so ba. Ƴan ƙasa su saurari bayani, su girmama ra’ayin wasu, su bi hanyar doka idan suna da ƙorafi. [PAUSE 2] Sau nawa mutumin da doka ta ba dama zai nuna mutum guda? [OUTRO] Ka tuna da ƙa’idodi uku na wannan aikin: kowane mutum sau ɗaya, sirri, da ƙirga abin da jama’a suka nuna cikin gaskiya—ba tare da nuna goyon bayan kowa ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace hukuma ce take shirya wannan aiki a matakin ƙasa?" (correct answer: "INEC"; options: INEC, ƙungiyar wasa, kasuwar gari)
- **[PAUSE 2]** — question shown to the learner: "Sau nawa mutumin da doka ta ba dama zai nuna mutum guda?" (correct answer: "sau ɗaya"; options: sau ɗaya, sau biyu, sau uku)

---

### `p4-maths-08` — Intro to Long Division

**Target filename:** `audio/p4-maths-08.mp3`
**Title (Hausa):** Gabatarwa Ga Doguwar Rabawa

**Script to read:**

> [INTRO] Yau za mu fara doguwar rabawa mai amsa tsabta. [MAIN] Doguwar rabawa tana tsara aiki mataki-mataki. Idan ana raba 84 da 7, ka tuna cewa 7 sau 12 yana ba da 84, don haka amsar ita ce 12. [PAUSE 1] Idan an raba 84 da 7, amsar nawa ce? [MAIN] Ka iya duba amsa ta ninkawa. Idan ka ce 15, kuma mai rabawa 6 ne, 15 sau 6 ya kamata ya dawo 90. Wannan yana nuna rabawa ta yi daidai. [PAUSE 2] Wace hanya ce za ka iya amfani da ita domin duba amsar rabawa? [OUTRO] Ka tuna: rabawa da ninkawa suna taimaka wa juna.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan an raba 84 da 7, amsar nawa ce?" (correct answer: "12"; options: 7, 12, 84)
- **[PAUSE 2]** — question shown to the learner: "Wace hanya ce za ka iya amfani da ita domin duba amsar rabawa?" (correct answer: "ninkawa"; options: ninkawa, rubutu kawai, tsallake lamba)

---

### `p4-bsci-08` — Movement and Friction

**Target filename:** `audio/p4-bsci-08.mp3`
**Title (Hausa):** Motsi da Guga

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Motsi da Guga. [MAIN] Abu yana motsi idan an tura shi ko an ja shi. Amma wani lokaci abu yana raguwa ko ya tsaya saboda guga. Guga yana faruwa idan saman abubuwa biyu suna haɗuwa suna gogar juna. Ƙwallo kan yi nisa a kan bene mai santsi, amma a kan yashi tana raguwa da sauri saboda guga. Takalmin da ke da kyakkyawan tafin ƙasa yana taimaka maka kada ka zame a hanya. Ka lura da wannan a filin wasa, amma kada ka gudu a wuri mai santsi ko mai ruwa. Ka sa takalmi mai kyau idan za ka yi wasa. Idan ƙasa ta jike, ka yi tafiya a hankali kuma ka sanar da babba idan ka ga wuri mai hatsari. Sanin guga yana taimaka maka ka fahimci dalilin da ya sa wasu abubuwa ke saurin tsayawa. [PAUSE 1] A kan wane wuri ƙwallo take yin nisa? [MAIN] Guga yana rage motsi, kuma takalmi mai kyau yana taimaka maka kada ka zame. [PAUSE 2] Me yake sa abu ya ragu? [OUTRO] Ka sa takalmi mai kyau kuma ka yi tafiya a hankali a ƙasa mai jike.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A kan wane wuri ƙwallo take yin nisa?" (correct answer: "bene mai santsi"; options: bene mai santsi, yashi, laka mai yawa)
- **[PAUSE 2]** — question shown to the learner: "Me yake sa abu ya ragu?" (correct answer: "guga"; options: haske, guga, abinci)

---

### `p4-socs-08` — Nigerian Economy — Agriculture

**Target filename:** `audio/p4-socs-08.mp3`
**Title (Hausa):** Tattalin Arzikin Nijeriya — Noma da Kiwo

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi noma da kiwo a tattalin arzikin Nijeriya. [MAIN] Manoma suna shuka gero, dawa, shinkafa, masara, wake, rogo, doya, da kayan lambu. Gyada ta shahara a Arewa, koko a wasu sassan Kudu maso Yamma, manja kuma a wuraren da suke da ruwan sama mai yawa. Kiwo ya haɗa da shanu, awaki, tumaki, kaji, da kifi. [PAUSE 1] Wane amfanin gona ne ya shahara a Arewa? [MAIN] A fadama, wato wuraren da suke riƙe ruwa, manoma suna iya shuka kayan lambu lokacin rani. Noma yana samar da aiki ga manomi, mai ɗaukar kaya, mai sarrafa abinci, da ɗan kasuwa. Ajiya mai kyau da hanya mai kyau suna rage asarar amfanin gona. Dabbobi kuma suna bukatar ruwa, abinci, mafaka, da lafiya. [PAUSE 2] Me dabbobin kiwo suke bukata? [OUTRO] Ka bi tafiyar gyada ko gero daga gona zuwa ajiya, sarrafawa, sufuri, da kasuwa, sannan ka faɗi aikin kowane mutum a wannan tafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane amfanin gona ne ya shahara a Arewa?" (correct answer: "gyada"; options: gyada, koko, manja)
- **[PAUSE 2]** — question shown to the learner: "Me dabbobin kiwo suke bukata?" (correct answer: "ruwa, abinci, mafaka, da lafiya"; options: ruwa, abinci, mafaka, da lafiya, hayaniya da ƙura, takarda da biro)

---

### `p4-maths-09` — Equivalent Fractions

**Target filename:** `audio/p4-maths-09.mp3`
**Title (Hausa):** Kashi Masu Ƙima Ɗaya

**Script to read:**

> [INTRO] Yau za mu koyi kashi masu ƙima ɗaya. [MAIN] 1/2 da 2/4 suna iya nuna adadi ɗaya, saboda duka suna nuna rabi. Idan ka ninka saman lamba da ƙasan lamba da abu ɗaya, ƙimar kashi ba ta canja ba. [PAUSE 1] Wane kashi ne yake da ƙima ɗaya da 1/2: 2/4 ko 1/4? [MAIN] Idan ka ninka 2/3 da 4, saman lamba zai zama 8, ƙasan lamba kuma 12. Saman da ƙasa dole su canja tare. [PAUSE 2] Idan ka ninka saman 2 da 4, sabon saman lamba nawa ne? [OUTRO] Ka tuna: kashi masu ƙima ɗaya suna iya rubutu daban amma su nuna adadi ɗaya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kashi ne yake da ƙima ɗaya da 1/2: 2/4 ko 1/4?" (correct answer: "2/4"; options: 2/4, 1/4, 3/4)
- **[PAUSE 2]** — question shown to the learner: "Idan ka ninka saman 2 da 4, sabon saman lamba nawa ne?" (correct answer: "8"; options: 2, 4, 8)

---

### `p4-bsci-09` — Personal Hygiene and Health

**Target filename:** `audio/p4-bsci-09.mp3`
**Title (Hausa):** Tsaftar Jiki da Lafiya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Tsaftar Jiki da Lafiya. [MAIN] Tsaftar jiki tana taimaka maka ka kare lafiyarka. Ka wanke hannuwanka da sabulu da ruwa mai tsafta bayan bayan gida, kafin cin abinci, da bayan wasa. Ka yi wanka, ka goge jikinka, ka sanya tufafi masu tsabta, kuma ka yanke farce idan babba ya taimaka. Ka rufe baki da gwiwar hannu idan za ka yi tari ko atishawa, sannan ka wanke hannu. Kada ka raba buroshin haƙori ko tawul da kowa. Waɗannan halaye suna rage yaduwar ƙwayoyin cuta. Idan jikinka ya yi zafi, cikinka ya ciwo, ko ka ji rashin lafiya, kada ka yi ƙoƙarin magani da kanka; ka sanar da iyaye, malami, ko wani babban mutum. Aikinka shi ne tsafta da sanarwa, ba gano cuta ko bada magani ba. Ka riƙa yin waɗannan abubuwa kullum domin ka zauna lafiya a gida da makaranta. [PAUSE 1] Yaushe ya kamata ka wanke hannu? [MAIN] Wanke hannu da sabulu da ruwa mai tsafta yana taimakawa rage yaduwar ƙwayoyin cuta. [PAUSE 2] Me za ka yi idan ka ji rashin lafiya? [OUTRO] Ka riƙa wanke hannu kuma ka sanar da babba idan ka ji rashin lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Yaushe ya kamata ka wanke hannu?" (correct answer: "kafin cin abinci"; options: kafin cin abinci, bayan barci kawai, bayan wata guda)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan ka ji rashin lafiya?" (correct answer: "ka sanar da babba"; options: ka ɓoye, ka sanar da babba, ka bada magani)

---

### `p4-socs-09` — Nigerian Economy — Industry and Trade

**Target filename:** `audio/p4-socs-09.mp3`
**Title (Hausa):** Tattalin Arzikin Nijeriya — Masana’antu da Ciniki

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi masana’antu da ciniki a Nijeriya. [MAIN] Masana’antu suna sarrafa albarkatun ƙasa su zama kayayyaki. Hatsi zai iya zama gari, auduga ta zama zare ko tufa, fata ta zama takalmi. Nijeriya tana da man fetur da iskar gas, kuma aikin hako su ya kamata ya kiyaye lafiya da muhalli. [PAUSE 1] Me masana’antu suke yi da albarkatun ƙasa? [MAIN] Ciniki yana haɗa masu samarwa, masu ɗaukar kaya, masu sayarwa, da masu saya. Kasuwanni suna rarraba kaya, tashoshin jiragen ruwa kuma suna taimaka wa kaya su shiga ko su fita daga ƙasa. Kaya na bin sarrafawa, ɗauka, sayarwa, sannan amfani. [PAUSE 2] Wane wuri ne yake taimaka wa kaya su shiga ko su fita daga ƙasa ta ruwa? [OUTRO] Ka zaɓi auduga, hatsi, ko fata, ka bi matakanta daga albarkatun ƙasa zuwa masana’anta, sufuri, kasuwa, da mai amfani.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me masana’antu suke yi da albarkatun ƙasa?" (correct answer: "suna sarrafa su su zama kayayyaki"; options: suna sarrafa su su zama kayayyaki, suna jefa su a hanya, suna ɓoye su duka)
- **[PAUSE 2]** — question shown to the learner: "Wane wuri ne yake taimaka wa kaya su shiga ko su fita daga ƙasa ta ruwa?" (correct answer: "tashar jiragen ruwa"; options: tashar jiragen ruwa, filin wasa, ajin makaranta)

---

### `p4-maths-10` — Comparing Fractions

**Target filename:** `audio/p4-maths-10.mp3`
**Title (Hausa):** Kwatanta Kashi

**Script to read:**

> [INTRO] Yau za mu koyi kwatanta kashi. [MAIN] Idan ƙasan lambobi iri ɗaya ne, ka duba saman lamba. 5/8 ya fi 3/8 girma, saboda 5 ya fi 3. Wannan yana aiki idan an raba abu gida iri ɗaya. [PAUSE 1] Wanne ya fi girma: 5/8 ko 3/8? [MAIN] Idan ƙasan lambobi sun bambanta, ka yi hankali. A yau za mu fi amfani da ƙasa ɗaya domin ka gane ka'ida. Idan saman lamba ya fi girma, kashin ya fi girma. [PAUSE 2] Idan ƙasan lamba ɗaya ce, me za ka fara dubawa? [OUTRO] Ka tuna: don ƙasa ɗaya, saman lamba ne ke nuna girma.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wanne ya fi girma: 5/8 ko 3/8?" (correct answer: "5/8"; options: 5/8, 3/8, 1/8)
- **[PAUSE 2]** — question shown to the learner: "Idan ƙasan lamba ɗaya ce, me za ka fara dubawa?" (correct answer: "saman lamba"; options: saman lamba, launi, sunan abinci)

---

### `p4-bsci-10` — Clean Surroundings

**Target filename:** `audio/p4-bsci-10.mp3`
**Title (Hausa):** Tsaftar Muhalli

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Tsaftar Muhalli. [MAIN] Muhalli mai tsabta yana taimaka wa mutane su zauna lafiya. Ka zubar da shara a kwandon shara, ba a hanya ko cikin magudana ba. Ruwan da ya tsaya a kusa da gida na iya zama wurin da sauro ke yawaita, don haka ka sanar da babba idan ka gani. Ka taimaka wajen share aji ko harabar gida idan an umurce ka, amma kada ka ɗauki tarkace mai kaifi da hannu. Ka sa takalmi, kuma ka kira babba idan ka ga gilashi ya karye ko wani abu mai hatsari. Kada ka zuba mai ko datti cikin rijiyar ruwa. Idan kowa ya riƙa kula da muhallinsa, iska da ruwa za su fi tsabta. Wannan ba aikin mutum ɗaya ba ne; iyali, makaranta, da al'umma suna aiki tare. Ka tuna cewa tsabta tana farawa da ƙaramin aiki, kamar ɗaukar takardarka da sanya ta inda ya dace. [PAUSE 1] Ina ya kamata ka zubar da shara? [MAIN] Zubar da shara a kwandon shara da hana ruwa tsayawa suna taimaka wa muhalli ya zauna tsaf. [PAUSE 2] Me za ka yi idan ka ga ruwa ya tsaya? [OUTRO] Ka zubar da shara a kwandon shara domin muhalli ya zauna tsaf.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ina ya kamata ka zubar da shara?" (correct answer: "kwandon shara"; options: kwandon shara, magudana, hanya)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan ka ga ruwa ya tsaya?" (correct answer: "ka sanar da babba"; options: ka yi iyo, ka sanar da babba, ka sha shi)

---

### `p4-socs-10` — Population and Settlement

**Target filename:** `audio/p4-socs-10.mp3`
**Title (Hausa):** Yawan Jama’a da Matsugunansu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yawan jama’a da matsugunansu. [MAIN] Yawan jama’a shi ne adadin mutanen da suke zaune a wuri. A ƙauye, gidaje na iya zama kusa da gonaki da ƙananan kasuwanni. A birni, mutane da gidaje suna da yawa, tare da manyan kasuwanni, makarantu, asibitoci, ofisoshi, da hanyoyi. Kano, Kaduna, Maiduguri, da Sokoto misalan birane ne. [PAUSE 1] Me yawan jama’a yake nufi? [MAIN] Gwamnati tana ƙirga mutanen ƙasa a lokaci da aka tsara domin sanin yawansu da inda suke zaune. Bayanin yana taimaka wa tsara makarantu, lafiya, ruwa, gidaje, da hanyoyi. Idan jama’a sun yi yawa, ana bukatar ƙarin hidimomi. [PAUSE 2] Me ƙidayar jama’a take taimaka wa gwamnati ta tsara? [OUTRO] Ka kwatanta ƙauye da birni ta yawan gidaje da hidimomi, sannan ka bayyana dalilin da ya sa ƙidayar jama’a take taimaka wa shiri.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me yawan jama’a yake nufi?" (correct answer: "adadin mutanen da suke zaune a wuri"; options: adadin mutanen da suke zaune a wuri, yawan itatuwa a gona, adadin kujeru a aji)
- **[PAUSE 2]** — question shown to the learner: "Me ƙidayar jama’a take taimaka wa gwamnati ta tsara?" (correct answer: "makarantu, lafiya, ruwa, gidaje, da hanyoyi"; options: makarantu, lafiya, ruwa, gidaje, da hanyoyi, launin tufafi, sunayen wasanni)

---

### `p4-maths-11` — Intro Decimals: Tenths and Hundredths

**Target filename:** `audio/p4-maths-11.mp3`
**Title (Hausa):** Gabatarwa Ga Desimal: Goma-Goma da Ɗari-Ɗari

**Script to read:**

> [INTRO] Yau za mu fara desimal ta goma-goma da ɗari-ɗari. [MAIN] Idan an raba abu gida 10, kowane gida goma-goma ɗaya ne. Idan an raba abu gida 100, kowane gida ɗari-ɗari ɗaya ne. [PAUSE 1] Idan an raba abu gida 10, kowane gida ana kiransa me? [MAIN] Goma-goma ɗaya yana da ɗari-ɗari 10. Saboda haka goma-goma 4 yana da ɗari-ɗari 40. Ka iya ganin haka a takarda mai murabba'ai 100. [PAUSE 2] Goma-goma 4 suna da ɗari-ɗari nawa? [OUTRO] Ka tuna: desimal yana taimaka mana mu nuna sassan abu.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan an raba abu gida 10, kowane gida ana kiransa me?" (correct answer: "goma-goma ɗaya"; options: goma-goma ɗaya, dubu ɗaya, rukuni ɗaya)
- **[PAUSE 2]** — question shown to the learner: "Goma-goma 4 suna da ɗari-ɗari nawa?" (correct answer: "40"; options: 4, 40, 400)

---

### `p4-bsci-11` — Malaria Prevention

**Target filename:** `audio/p4-bsci-11.mp3`
**Title (Hausa):** Kare Kai daga Zazzabin Cizon Sauro

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Kare Kai daga Zazzabin Cizon Sauro. [MAIN] Zazzabin cizon sauro cuta ce da sauro ke iya yaɗawa. Ba sai ka gane cuta da kanka ba; abin da ya dace shi ne ka taimaka wajen rigakafi kuma ka sanar da babba idan kana rashin lafiya. Ka kwana cikin gidan sauro idan iyayenka sun tanada, ka sanya tufafi masu rufe jiki da dare idan ya dace, kuma ka taimaka wajen hana ruwa tsayawa kusa da gida. Sauro kan yawaita a wuraren ruwa mai tsayawa. Idan ka ji jikinka ya yi zafi, ka yi sanyi, ko ka gaji sosai, ka faɗa wa iyaye ko malami. Kada ka sayi ko ka sha magani da kanka. Babba zai kai ka wajen ma'aikacin lafiya idan ya dace. Ka kuma kiyaye ɗan uwanka: ka tuna masa ya kwana cikin gidan sauro. Rigakafi da sanar da babba hanyoyi ne masu aminci na kula da lafiya. [PAUSE 1] Me ke iya yaɗa zazzabin cizon sauro? [MAIN] Gidan sauro da hana ruwa tsayawa suna taimakawa wajen rigakafin zazzabin cizon sauro. [PAUSE 2] Me za ka yi idan jikinka ya yi zafi? [OUTRO] Ka kwana cikin gidan sauro kuma ka sanar da babba idan kana rashin lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ke iya yaɗa zazzabin cizon sauro?" (correct answer: "sauro"; options: sauro, bishiya, dutse)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan jikinka ya yi zafi?" (correct answer: "ka sanar da babba"; options: ka sha magani kai kaɗai, ka sanar da babba, ka ɓoye)

---

### `p4-socs-11` — Migration and Urbanisation

**Target filename:** `audio/p4-socs-11.mp3`
**Title (Hausa):** Sauya Wurin Zama da Girman Birane

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi sauya wurin zama da girman birane. [MAIN] Mutane suna sauya wurin zama domin aiki, makaranta, kasuwanci, aure, kula da iyali, samun ƙasa, ko neman hidima. Wani yana komawa na ɗan lokaci, wani kuma yana kafa sabon gida. Idan mutane da yawa suka koma birni, birnin yana girma. [PAUSE 1] Wane dalili ne zai sa mutum ya sauya wurin zama? [MAIN] Girman birni na iya kawo kasuwanni, makarantu, da ayyukan yi. Haka kuma yana ƙara buƙatar gidaje, ruwa, sufuri, tsafta, asibitoci, da makarantu. Idan hidimomi ba su ƙaru ba, cunkoso da tsadar gida na iya ƙaruwa. Gwamnati da al’umma su tsara hidimomi kuma su girmama sababbin mazauna. [PAUSE 2] Me birni yake bukata idan jama’arsa suka ƙaru? [OUTRO] Ka zana kibiyar motsi daga ƙauye zuwa birni ko akasin haka, ka rubuta dalili ɗaya, dama ɗaya, da hidima ɗaya da za a ƙara.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane dalili ne zai sa mutum ya sauya wurin zama?" (correct answer: "neman aiki"; options: neman aiki, canza launin riga, ƙirga kujeru)
- **[PAUSE 2]** — question shown to the learner: "Me birni yake bukata idan jama’arsa suka ƙaru?" (correct answer: "ƙarin hidimomi"; options: ƙarin hidimomi, ƙarancin ruwa, rufe makarantu)

---

### `p4-maths-12` — Perimeter of Simple Shapes

**Target filename:** `audio/p4-maths-12.mp3`
**Title (Hausa):** Kewayen Sauƙaƙan Siffofi

**Script to read:**

> [INTRO] Yau za mu koyi kewayen sauƙaƙan siffofi. [MAIN] Kewayen siffa, wato perimita, shi ne jimlar tsawon duk gefuna. Don murabba'i mai gefe 5, kewayen shi ne 4 sau 5, wato 20. [PAUSE 1] Murabba'i mai gefe 5 yana da kewayen nawa? [MAIN] Don siffar rektangul, ka haɗa tsawo da faɗi, sannan ka ninka sau 2. Idan tsawo 8 ne, faɗi 3 ne, kewayen ya zama 22. [PAUSE 2] Kewayen siffa yana bin me? [OUTRO] Ka tuna: kewayen yana zagaye gefunan siffa ne.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Murabba'i mai gefe 5 yana da kewayen nawa?" (correct answer: "20"; options: 5, 10, 20)
- **[PAUSE 2]** — question shown to the learner: "Kewayen siffa yana bin me?" (correct answer: "gefuna"; options: gefuna, launi, sunan siffa)

---

### `p4-bsci-12` — Preventing Diarrhoea

**Target filename:** `audio/p4-bsci-12.mp3`
**Title (Hausa):** Kare Kai daga Gudawa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Kare Kai daga Gudawa. [MAIN] Gudawa na iya faruwa idan abinci ko ruwa ba su da tsabta, amma ba aikin yaro ba ne ya gano dalilinta ko ya magance ta. Kai za ka iya taimakawa wajen rigakafi. Ka wanke hannu da sabulu da ruwa mai tsafta kafin cin abinci da bayan bayan gida. Ka sha ruwa mai tsafta, ka rufe abinci domin ƙuda kada su sauka a kai, kuma ka ci abincin da babba ya shirya cikin tsabta. Kada ka sha ruwa daga kwalba ko kofi da ba ka san tsabtarsa ba. Idan kana yawan zuwa bayan gida, cikinka ya ciwo, ko kana jin rauni, ka sanar da iyaye ko malami nan da nan. Kada ka sha magani ko haɗa wani abin sha da kanka. Babba zai nemi taimakon ma'aikacin lafiya idan ya dace. Tsafta da sanar da babba su ne hanyoyin da suka dace da kai. [PAUSE 1] Me zai taimaka wajen kare kai daga gudawa? [MAIN] Wanke hannu da rufe abinci suna taimakawa wajen rigakafin gudawa. [PAUSE 2] Me za ka yi idan kana yawan zuwa bayan gida? [OUTRO] Ka sha ruwa mai tsafta kuma ka sanar da babba idan kana yawan zuwa bayan gida.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me zai taimaka wajen kare kai daga gudawa?" (correct answer: "wanke hannu"; options: wanke hannu, cin ƙasa, shan ruwa marar tsafta)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan kana yawan zuwa bayan gida?" (correct answer: "ka sanar da babba"; options: ka ɓoye, ka sanar da babba, ka sha magani da kanka)

---

### `p4-socs-12` — Social Problems — Poverty and Community Responses

**Target filename:** `audio/p4-socs-12.mp3`
**Title (Hausa):** Matsalar Talauci da Yadda Al’umma Take Taimakawa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi matsalar talauci da amsar al’umma. [MAIN] Talauci yana faruwa idan mutum ko iyali ba su da isassun abubuwan biyan bukatu kamar abinci, ruwa, gida, lafiya, tufafi, ko ilimi. Dalilai na iya haɗawa da rashin aiki, rashin lafiya, asarar amfanin gona, ko tsadar kaya. Talauci ba laifin mutum kawai ba ne. [PAUSE 1] Wane abu ne daga bukatun da talauci zai iya hana iyali samu? [MAIN] Gwamnati za ta iya samar da makarantu, lafiya, ruwa, hanyoyi, da koyar da sana’a. Al’umma za ta iya yin taimakon juna, ajiyar kuɗi, gayya, ko raba abinci cikin mutunci. Kada a raina ko a kunyata wanda ake taimakawa. [PAUSE 2] Wane hali ya dace yayin taimaka wa iyalin da yake cikin bukata? [OUTRO] Ka bambanta taimakon gaggawa, kamar abinci, da taimakon dogon lokaci, kamar ilimi ko koyon sana’a; dukansu su kiyaye mutuncin mutum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne daga bukatun da talauci zai iya hana iyali samu?" (correct answer: "ilimi"; options: ilimi, launin riga, wasan ƙwallo)
- **[PAUSE 2]** — question shown to the learner: "Wane hali ya dace yayin taimaka wa iyalin da yake cikin bukata?" (correct answer: "kiyaye mutuncinsa"; options: kiyaye mutuncinsa, kunyata shi, raina shi)

---

### `p4-maths-13` — Area of Squares and Rectangles

**Target filename:** `audio/p4-maths-13.mp3`
**Title (Hausa):** Yankin Murabba'i da Siffar Rektangul

**Script to read:**

> [INTRO] Yau za mu koyi yankin murabba'i da siffar rektangul. [MAIN] Yanki yana nufin girman cikin siffa. Don murabba'i, ka ninka gefe sau gefe. Idan gefe 6 ne, yanki ya zama 36. [PAUSE 1] Murabba'i mai gefe 6 yana da yanki nawa? [MAIN] Don siffar rektangul, ka ninka tsawo da faɗi. Idan tsawo 8 ne, faɗi 3 ne, yanki ya zama 24. [PAUSE 2] Idan tsawo 8 ne kuma faɗi 3 ne, yanki nawa ne? [OUTRO] Ka tuna: perimita yana zagaye gefuna, yanki yana cika cikin siffa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Murabba'i mai gefe 6 yana da yanki nawa?" (correct answer: "36"; options: 12, 24, 36)
- **[PAUSE 2]** — question shown to the learner: "Idan tsawo 8 ne kuma faɗi 3 ne, yanki nawa ne?" (correct answer: "24"; options: 11, 22, 24)

---

### `p4-bsci-13` — Weather Instruments

**Target filename:** `audio/p4-bsci-13.mp3`
**Title (Hausa):** Kayan Auna Yanayi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Kayan Auna Yanayi. [MAIN] Yanayi yana canjawa: wani lokaci rana ce, wani lokaci gajimare ne, wani lokaci kuma ana ruwan sama. Akwai kayan da manya suke amfani da su domin lura da yanayi. Ma'aunin zafi yana nuna ko iska tana da zafi ko sanyi. Ma'aunin ruwan sama yana tattara ruwan sama domin a auna yawan da aka samu. Alamar iska tana nuna wajen da iska take kadawa. Ba sai ka mallaki waɗannan kayan ba domin ka koyi aikinsu. Za ka iya lura da gajimare, iska, da rana daga wuri mai aminci. Kada ka tsaya a fili idan ana tsawa, kuma kada ka taɓa kayan aunawa ba tare da izini ba. Rahoton yanayi yana taimaka wa manoma, matafiya, da iyalai su shirya. Ka tambayi malami yadda ake rubuta abin da aka lura da shi a rana. [PAUSE 1] Wane kayan aiki ne ke tattara ruwan sama? [MAIN] Ma'aunin ruwan sama, ma'aunin zafi, da alamar iska suna taimakawa wajen lura da yanayi. [PAUSE 2] Me ma'aunin zafi yake nuna? [OUTRO] Ka lura da yanayi daga wuri mai aminci, kuma kada ka tsaya a fili idan ana tsawa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kayan aiki ne ke tattara ruwan sama?" (correct answer: "ma'aunin ruwan sama"; options: ma'aunin ruwan sama, ma'aunin zafi, alamar iska)
- **[PAUSE 2]** — question shown to the learner: "Me ma'aunin zafi yake nuna?" (correct answer: "zafi ko sanyi"; options: zafi ko sanyi, launin ƙasa, nauyin littafi)

---

### `p4-socs-13` — Social Problems — Child Labour and Child Rights

**Target filename:** `audio/p4-socs-13.mp3`
**Title (Hausa):** Aikin da Yake Cutar da Yara da Haƙƙoƙinsu

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi aikin da yake cutar da yara da haƙƙoƙinsu. [MAIN] Yara suna da haƙƙin kulawa, kariya, lafiya, koyo, hutu, da wasa. Za su iya taimakawa da ƙananan ayyuka masu aminci. Matsala tana faruwa idan aiki yana da nauyi, haɗari, tsawo, ko yana hana yaro makaranta da hutu. Wannan ba laifin yaron ba ne. [PAUSE 1] Yaushe aikin yaro yake zama mai cutarwa? [MAIN] Yaro bai kamata ya yi aiki da wuta, wuƙa, sinadari, babbar na’ura, ko kaya masu nauyi shi kaɗai ba. Idan yaro yana fuskantar aiki mai cutarwa, ya gaya wa amintaccen babba, malami, ma’aikacin lafiya, ko hukumar da take kare yara. [PAUSE 2] Wa ya kamata yaro ya gaya wa idan aiki yana cutar da shi? [OUTRO] Ka tuna bambanci: taimako mai sauƙi da aminci yana iya dacewa da shekaru; aikin da ya hana makaranta, hutu, ko lafiya yana bukatar kariyar babba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Yaushe aikin yaro yake zama mai cutarwa?" (correct answer: "idan yana hana makaranta, hutu, ko lafiya"; options: idan yana hana makaranta, hutu, ko lafiya, idan yana tattara littafinsa, idan yana gyara kayan wasansa)
- **[PAUSE 2]** — question shown to the learner: "Wa ya kamata yaro ya gaya wa idan aiki yana cutar da shi?" (correct answer: "amintaccen babba"; options: amintaccen babba, mutumin da yake tilasta masa, ya ɓoye matsalar)

---

### `p4-maths-14` — Angles Intro

**Target filename:** `audio/p4-maths-14.mp3`
**Title (Hausa):** Gabatarwa Ga Kusurwa

**Script to read:**

> [INTRO] Yau za mu fara koyon kusurwa. [MAIN] Kusurwa tana faruwa inda layuka biyu suka haɗu ko suka buɗe. Kusurwa madaidaiciya tana da digiri 90, kamar kusurwar takarda. [PAUSE 1] Kusurwa madaidaiciya tana da digiri nawa? [MAIN] Idan kusurwa ta buɗe kaɗan, tana ƙasa da kusurwa madaidaiciya. Idan ta buɗe sosai, tana fiye da kusurwa madaidaiciya. [PAUSE 2] Kusurwa da ta fi 90 digiri ta fi kusurwa madaidaiciya ko ta yi ƙasa da ita? [OUTRO] Ka tuna: ka kwatanta kusurwa da 90 digiri.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kusurwa madaidaiciya tana da digiri nawa?" (correct answer: "90"; options: 45, 90, 180)
- **[PAUSE 2]** — question shown to the learner: "Kusurwa da ta fi 90 digiri ta fi kusurwa madaidaiciya ko ta yi ƙasa da ita?" (correct answer: "ta fi"; options: ta fi, ta yi ƙasa, ta zama sifili)

---

### `p4-bsci-14` — Keeping Weather Records

**Target filename:** `audio/p4-bsci-14.mp3`
**Title (Hausa):** Rubuta Lura da Yanayi

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Rubuta Lura da Yanayi. [MAIN] Za ka iya koyon yanayi ta hanyar lura da abin da kake gani kowace rana. Da safe, ka duba ko rana tana haskawa, ko gajimare ya rufe sama, ko iska tana kadawa. Da taimakon malami, za ka iya rubuta rana, lokaci, da abin da ka lura da shi a ƙaramin jadawali. Bayan kwanaki da yawa, za ku iya kwatanta ranakun da aka yi ruwa da ranakun da rana ta fito. Wannan shi ake kira rubuta lura. Rubuta lura yana taimaka wa mutane su gane sauyin yanayi kuma su shirya aiki, kamar busar da hatsi ko zuwa gona. Kada ka fita cikin ruwan sama mai tsanani ko lokacin tsawa domin rubuta lura. Ka tsaya a wuri mai aminci ko ka duba ta taga. Idan yanayi ya yi haɗari, ka bi umarnin babba. Ilimi mai kyau yana haɗa lura, rubutu, da tsaro. [PAUSE 1] Me za ka iya lura da shi da safe? [MAIN] Rubuta rana, lokaci, da abin da ka lura da shi yana taimaka maka ka gane sauyin yanayi. [PAUSE 2] Me za ka rubuta tare da abin da ka lura? [OUTRO] Ka rubuta lura daga wuri mai aminci kuma ka bi umarnin babba idan yanayi ya yi haɗari.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me za ka iya lura da shi da safe?" (correct answer: "gajimare"; options: gajimare, soket, wuta)
- **[PAUSE 2]** — question shown to the learner: "Me za ka rubuta tare da abin da ka lura?" (correct answer: "rana"; options: rana, girman takalmi, sunan wasa)

---

### `p4-socs-14` — Cooperation — Family, Community, Nation

**Target filename:** `audio/p4-socs-14.mp3`
**Title (Hausa):** Haɗin Kai a Iyali, Al’umma, da Ƙasa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi haɗin kai a iyali, al’umma, da ƙasa. [MAIN] Haɗin kai yana nufin mutane su haɗa ƙarfi, ilimi, lokaci, ko kaya domin cimma manufa ta gari. A iyali ana raba aikin da ya dace. A makaranta ana shirya aikin rukuni. A al’umma, gayya tana haɗa mutane domin aikin da zai amfani jama’a. [PAUSE 1] Me gayya take haɗa mutane su yi? [MAIN] A ƙasa, jihohi da al’ummomi suna haɗa hannu wajen sufuri, kasuwanci, lafiya, ilimi, da muhalli. Haɗin kai ba yana nufin kowa ya yi tunani iri ɗaya ba. A saurara, a raba aiki daidai, a mutunta bambanci, a warware saɓani cikin natsuwa. [PAUSE 2] Wane hali ne haɗin kai yake bukata idan ra’ayoyi sun bambanta? [OUTRO] Ka shirya ƙaramin aikin rukuni: ku bayyana manufa, ku raba aiki daidai, ku saurari kowa, sannan ku duba abin da haɗin kai ya inganta.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me gayya take haɗa mutane su yi?" (correct answer: "aikin da zai amfani jama’a"; options: aikin da zai amfani jama’a, ɓoye kayan jama’a, raba kan al’umma)
- **[PAUSE 2]** — question shown to the learner: "Wane hali ne haɗin kai yake bukata idan ra’ayoyi sun bambanta?" (correct answer: "sauraro da mutunta bambanci"; options: sauraro da mutunta bambanci, yin fushi, tilasta wa kowa)

---

### `p4-maths-15` — Measuring Angles with Simple Degrees

**Target filename:** `audio/p4-maths-15.mp3`
**Title (Hausa):** Auna Kusurwa da Sauƙaƙan Digiri

**Script to read:**

> [INTRO] Yau za mu auna kusurwa da sauƙaƙan digiri. [MAIN] Kusurwa madaidaiciya tana da digiri 90. Layin madaidaiciya yana da digiri 180. Idan kusurwa ta kai 45, ta yi ƙasa da 90. [PAUSE 1] Kusurwa madaidaiciya tana da digiri nawa? [MAIN] Idan kusurwa ta kai 120, ta fi kusurwa madaidaiciya. Ka kwatanta lambobi da 90 ko 180, sannan ka nemo bambanci. [PAUSE 2] Layin madaidaiciya yana da digiri nawa? [OUTRO] Ka tuna: digiri yana gaya maka yadda kusurwa ta buɗe.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kusurwa madaidaiciya tana da digiri nawa?" (correct answer: "90"; options: 45, 90, 120)
- **[PAUSE 2]** — question shown to the learner: "Layin madaidaiciya yana da digiri nawa?" (correct answer: "180"; options: 90, 120, 180)

---

### `p4-bsci-15` — Fire, Heat, and Safety

**Target filename:** `audio/p4-bsci-15.mp3`
**Title (Hausa):** Wuta, Zafi, da Tsaro

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi Wuta, Zafi, da Tsaro. [MAIN] Wuta tana ba da zafi domin dafa abinci, amma tana iya ƙone fata ko ta jawo gobara idan ba a kula ba. Ka tsaya nesa da murhu, wutar girki, kyandir, da fitila mai zafi. Kada ka kunna ashana, kada ka zuba mai a wuta, kuma kada ka yi wasa da kayan wuta. Idan ka ga hayaƙi mai yawa ko wuta a inda bai kamata ba, ka kira babba cikin sauri sannan ka nisanta kanka. Kada ka koma ɗaki mai hayaƙi domin ɗaukar kaya. Babba zai san abin da ya dace a yi. Idan ruwan zafi yana kusa, kada ka ɗauki tukunya ko ka zuba shi kai kaɗai. Wannan darasi yana koya maka kariya, ba kashe gobara ba. Ka riƙa bin umarnin iyaye da malamai domin zafi yana da amfani idan an yi amfani da shi cikin hankali. [PAUSE 1] Me ya kamata ka yi idan ka ga wuta a inda bai kamata ba? [MAIN] Ka tsaya nesa da wuta da hayaƙi, kuma ka kira babba idan ka ga wuta a inda bai kamata ba. [PAUSE 2] Me bai kamata ka kunna ba? [OUTRO] Ka nisanta kanka daga wuta da hayaƙi, sannan ka kira babba cikin sauri.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ya kamata ka yi idan ka ga wuta a inda bai kamata ba?" (correct answer: "ka kira babba"; options: ka kira babba, ka yi wasa da ita, ka kusance ta)
- **[PAUSE 2]** — question shown to the learner: "Me bai kamata ka kunna ba?" (correct answer: "ashana"; options: ashana, littafi, ganye)

---

### `p4-socs-15` — Revision and Assessment — P4 Social and Citizenship Studies

**Target filename:** `audio/p4-socs-15.mp3`
**Title (Hausa):** Bita da Tantancewa — Nazarin Zamantakewa na Aji Huɗu

**Script to read:**

> [INTRO] Sannu da zuwa bitar Nazarin Zamantakewa na aji huɗu. [MAIN] Ka tuna da jihohi talatin da shida, Abuja, al’ummomi da harsuna, da yanayin ƙasa daga Sahel zuwa gabar teku. Ka tuna da alamomin ƙasa, matakan gwamnati uku, da rassan gwamnati uku. [PAUSE 1] Wace hukuma ce take shirya yadda jama’a ke nuna wanda suke so ya jagorance su a matakin ƙasa? [MAIN] Noma, kiwo, masana’antu, da ciniki suna samar da abinci, kaya, da ayyukan yi. Yawan jama’a da sauya wurin zama suna ƙara bukatar hidimomi. Talauci yana bukatar taimako mai mutunci, yara kuma suna bukatar koyo, lafiya, hutu, da kariya. Gayya tana nuna haɗin kai. [PAUSE 2] Waɗanne koguna biyu ne suke haɗuwa a Lokoja? [OUTRO] Ka zaɓi jigogi biyar—ƙasa, jama’a, gwamnati, tattalin arziki, matsuguni, matsalolin al’umma, haƙƙin yara, ko haɗin kai—ka faɗi gaskiya ɗaya da aikin ɗan ƙasa ɗaya daga kowanne.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace hukuma ce take shirya yadda jama’a ke nuna wanda suke so ya jagorance su a matakin ƙasa?" (correct answer: "INEC"; options: INEC, ƙaramar hukuma, ƙungiyar kasuwa)
- **[PAUSE 2]** — question shown to the learner: "Waɗanne koguna biyu ne suke haɗuwa a Lokoja?" (correct answer: "Kogin Neja da Kogin Binuwai"; options: Kogin Neja da Kogin Binuwai, Kogin Neja da Teku, Sahel da dazuzzuka)

---

### `p4-maths-16` — Reading Simple Tables

**Target filename:** `audio/p4-maths-16.mp3`
**Title (Hausa):** Karanta Sauƙaƙan Teburi

**Script to read:**

> [INTRO] Yau za mu koyi karanta sauƙaƙan teburi. [MAIN] Teburi yana tsara bayani cikin layuka da ginshiƙai. Ka fara da taken tebur, sannan ka bi suna zuwa adadi. Idan Ali yana da 24, Binta tana da 31, Binta ta fi Ali da 7. [PAUSE 1] Idan Ali yana da 24 kuma Binta tana da 31, wa ya fi yawa? [MAIN] Don jimla, ka haɗa lambobi. Don bambanci, ka cire ƙarami daga babba. Kada ka ɗauki adadi daga layin da ba a tambaya ba. [PAUSE 2] Idan ana neman jimla a tebur, me za ka yi? [OUTRO] Ka tuna: karanta take, layi, ginshiƙi, sannan adadi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan Ali yana da 24 kuma Binta tana da 31, wa ya fi yawa?" (correct answer: "Binta"; options: Ali, Binta, ba su da yawa)
- **[PAUSE 2]** — question shown to the learner: "Idan ana neman jimla a tebur, me za ka yi?" (correct answer: "haɗa lambobi"; options: haɗa lambobi, cire take, bar ginshiƙi)

---

### `p4-bsci-16` — Temporary and Permanent Changes; Heating and Cooling

**Target filename:** `audio/p4-bsci-16.mp3`
**Title (Hausa):** Sauye-sauyen da Za a Iya Mayarwa da Waɗanda Ba Su Sauƙin Mayarwa

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi sauye-sauyen da za a iya mayarwa da waɗanda ba su sauƙin mayarwa. [MAIN] Ƙanƙara tana narkewa ta zama ruwa idan ta sami ɗumi, ruwan kuma yana iya sake daskarewa ya zama ƙanƙara. Riga mai ruwa tana bushewa, kuma za ta iya sake jike. [PAUSE 1] Me ruwan ƙanƙara yake zama bayan ya daskare? [MAIN] Karyewar kofin yumbu ko dafuwar ƙwai ba sa sauƙin komawa yadda suke a dā. Ba kowane sauyin ɗumi ne yake zama na dindindin ba. Babba ne kaɗai zai riƙe abu mai zafi; kai ka lura daga nesa ka rubuta abin da ka gani. [PAUSE 2] Wa ya kamata ya riƙe abu mai zafi? [OUTRO] Ka kwatanta ƙanƙara kafin narkewa da bayanta, sannan ka ware sauyin da za a iya mayarwa daga wanda ba ya sauƙin mayarwa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ruwan ƙanƙara yake zama bayan ya daskare?" (correct answer: "ƙanƙara"; options: ƙanƙara, yashi, itace)
- **[PAUSE 2]** — question shown to the learner: "Wa ya kamata ya riƙe abu mai zafi?" (correct answer: "babba"; options: babba, yaro shi kaɗai, jariri)

---

### `p4-maths-17` — Reading Simple Bar Charts

**Target filename:** `audio/p4-maths-17.mp3`
**Title (Hausa):** Karanta Sauƙaƙan Jadawalin Sanduna

**Script to read:**

> [INTRO] Yau za mu karanta sauƙaƙan jadawalin sanduna. [MAIN] Sandar da ta fi tsawo tana nuna adadi mafi yawa. Idan shinkafa ta kai 30 kuma wake ya kai 20, shinkafa ta fi wake da 10. [PAUSE 1] Idan shinkafa 30 ce kuma wake 20 ne, wanne ya fi yawa? [MAIN] Don jimla, ka haɗa adadin sanduna. Don bambanci, ka cire ƙarami daga babba. Ka karanta lambar da kowace sanda take nunawa. [PAUSE 2] Sandar da ta fi tsawo tana nuna me? [OUTRO] Ka tuna: jadawalin sanduna yana sa kwatanta adadi ya zama sauƙi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan shinkafa 30 ce kuma wake 20 ne, wanne ya fi yawa?" (correct answer: "shinkafa"; options: shinkafa, wake, duk ɗaya)
- **[PAUSE 2]** — question shown to the learner: "Sandar da ta fi tsawo tana nuna me?" (correct answer: "adadi mafi yawa"; options: adadi mafi yawa, adadi mafi kaɗan, babu adadi)

---

### `p4-bsci-17` — Plant and Animal Life-Cycle Changes

**Target filename:** `audio/p4-bsci-17.mp3`
**Title (Hausa):** Matakan Girman Tsiro da Dabba

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu kwatanta matakan girman tsiro da kaza. [MAIN] Wake yana farawa daga iri, ya zama ƙaramin tsiro, sannan cikakken tsiro mai samar da sabbin iri. Kaza tana farawa daga ƙwai, ta zama ɗan kaza, sannan babbar kaza mai iya samar da sabbin ƙwai. [PAUSE 1] Wane mataki ne yake zuwa bayan iri ya fara toho? [MAIN] Duk rayuwar biyu suna da matakai masu jere, amma farkonsu da abin da babba yake samarwa sun bambanta. Ka shuka wake tare da babba, ka rubuta ranar shuka, ka zana ko ka auna tsayinsa kowace rana biyu. [PAUSE 2] Me cikakken tsiron wake yake samarwa? [OUTRO] Ka jera zane-zanen wake bisa ranaku, sannan ka bayyana sauyi ɗaya da ya faru tsakanin rikodi biyu.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane mataki ne yake zuwa bayan iri ya fara toho?" (correct answer: "ƙaramin tsiro"; options: ƙaramin tsiro, babbar kaza, ƙwai)
- **[PAUSE 2]** — question shown to the learner: "Me cikakken tsiron wake yake samarwa?" (correct answer: "sabbin iri"; options: sabbin iri, ƙwai, gashin tsuntsu)

---

### `p4-maths-18` — 24-Hour Clock Intro

**Target filename:** `audio/p4-maths-18.mp3`
**Title (Hausa):** Gabatarwa Ga Agogon Awa 24

**Script to read:**

> [INTRO] Yau za mu fara agogon awa 24. [MAIN] Agogon awa 24 yana ƙirga daga 0 zuwa 23. 13:00 yana nufin 1 na rana, saboda 13 cire 12 ya ba da 1. [PAUSE 1] 13:00 yana nufin wace awa ta rana? [MAIN] 18:00 yana nufin 6 na yamma. Idan kana neman awanni daga 8 zuwa 13, ka yi 13 cire 8, amsa 5. [PAUSE 2] Daga 8:00 zuwa 13:00 awanni nawa ne? [OUTRO] Ka tuna: agogon awa 24 yana rage ruɗani tsakanin safe, rana, da dare.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "13:00 yana nufin wace awa ta rana?" (correct answer: "1"; options: 1, 3, 13)
- **[PAUSE 2]** — question shown to the learner: "Daga 8:00 zuwa 13:00 awanni nawa ne?" (correct answer: "5"; options: 4, 5, 6)

---

### `p4-bsci-18` — Digestive System and Teeth

**Target filename:** `audio/p4-bsci-18.mp3`
**Title (Hausa):** Yadda Jiki Ke Sarrafa Abinci da Ayyukan Haƙora

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi yadda jiki ke sarrafa abinci da ayyukan haƙora. [MAIN] Abinci yana shiga ta baki. Haƙora suna gutsura shi, ruwan baki ya taimaka masa ya fi sauƙin haɗiyewa. Sai ya wuce ta bututun abinci zuwa jakar da ke karɓar abinci a cikin jiki. [PAUSE 1] Me ruwan baki yake taimakawa abinci ya yi? [MAIN] Jiki yana narkar da abinci a sassa fiye da ɗaya domin ya yi amfani da abin da ke cikinsa. Haƙoran gaba suna yanka, masu tsini suna yayyagewa, manyan na baya kuma suna niƙawa. A goge haƙora safe da dare, a rage yawan kayan zaƙi. [PAUSE 2] Wane aiki manyan haƙoran baya suke yi? [OUTRO] Ka kalli siffofin haƙoran gaba da na baya a madubi, ka bayyana yadda bambancin siffofinsu yake taimaka musu yin ayyuka daban-daban.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ruwan baki yake taimakawa abinci ya yi?" (correct answer: "ya fi sauƙin haɗiyewa"; options: ya fi sauƙin haɗiyewa, ya zama dutse, ya koma takarda)
- **[PAUSE 2]** — question shown to the learner: "Wane aiki manyan haƙoran baya suke yi?" (correct answer: "murƙushewa da niƙawa"; options: murƙushewa da niƙawa, gani da ji, shaƙar iska)

---

### `p4-maths-19` — Mixed Addition and Subtraction Word Problems

**Target filename:** `audio/p4-maths-19.mp3`
**Title (Hausa):** Matsalolin Kalma na Ƙari da Ragi

**Script to read:**

> [INTRO] Yau za mu warware matsalolin kalma na ƙari da ragi. [MAIN] Ka fara da karanta labarin. Idan an kawo ko an ƙara, ka yi ƙari. Idan an cire, an sayar, ko ana neman saura, ka yi ragi. [PAUSE 1] Idan tambaya ta ce an ƙara kaya, wane aiki kake yi? [MAIN] Wasu tambayoyi suna da matakai biyu. Littattafai 120, an kawo 35, sannan an raba 20. Ka yi 120 da 35, sai ka cire 20, amsa 135. [PAUSE 2] Idan kana neman saura, wane aiki kake yi? [OUTRO] Ka tuna: karanta tambaya, gano aiki, rubuta matakai, sannan ka duba amsa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan tambaya ta ce an ƙara kaya, wane aiki kake yi?" (correct answer: "ƙari"; options: ƙari, ragi, rabawa)
- **[PAUSE 2]** — question shown to the learner: "Idan kana neman saura, wane aiki kake yi?" (correct answer: "ragi"; options: ninkawa, ragi, perimita)

---

### `p4-bsci-19` — How Sound Is Produced and Travels

**Target filename:** `audio/p4-bsci-19.mp3`
**Title (Hausa):** Yadda Sauti Ke Samuwa da Tafiya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi yadda sauti ke samuwa da tafiya. [MAIN] Sauti yana samuwa idan abu yana rawa da sauri. Za ka iya jin wannan rawar idan ka ɗora yatsunka a wuyanka a hankali yayin magana. Sauti yana tafiya ta iska da wasu abubuwa kamar itace da ƙarfe. [PAUSE 1] Me yake samar da sauti? [MAIN] Sauti mai ƙara ya bambanta da mai laushi. Nisa kuma yana shafar yadda ake jin sauti a sarari. Ka saurari taɓawar fensir a hankali daga matakai biyu da shida, ka rubuta inda aka fi ji, ba tare da ƙara sautin sosai ba. [PAUSE 2] A wane nisa za a fi jin taɓawar fensir a sarari? [OUTRO] Ka haɗa abin da ka gani ko ka ji yana rawa da sautin da ya samar, sannan ka kare kunnenka daga ƙara mai yawa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me yake samar da sauti?" (correct answer: "rawar abu da sauri"; options: rawar abu da sauri, launin abu, nauyin littafi)
- **[PAUSE 2]** — question shown to the learner: "A wane nisa za a fi jin taɓawar fensir a sarari?" (correct answer: "matakai biyu"; options: matakai biyu, matakai shida, bayan bango mai nisa)

---

### `p4-maths-20` — Mixed Multiplication and Division Word Problems

**Target filename:** `audio/p4-maths-20.mp3`
**Title (Hausa):** Matsalolin Kalma na Ninkawa da Rabawa

**Script to read:**

> [INTRO] Yau za mu yi matsalolin kalma na ninkawa da rabawa. [MAIN] Idan akwai rukuni iri ɗaya, ka yi ninkawa. Faranti 8, kowanne yana da lemu 6, suna da lemu 48. [PAUSE 1] Faranti 8, kowanne da lemu 6, lemu nawa duka? [MAIN] Idan ana raba abu daidai, ka yi rabawa. Lemu 48 ga yara 8 yana ba kowane yaro 6. [PAUSE 2] Idan ana raba abu daidai, wane aiki kake yi? [OUTRO] Ka tuna: ninkawa tana haɗa rukuni, rabawa tana raba rukuni daidai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Faranti 8, kowanne da lemu 6, lemu nawa duka?" (correct answer: "48"; options: 14, 48, 86)
- **[PAUSE 2]** — question shown to the learner: "Idan ana raba abu daidai, wane aiki kake yi?" (correct answer: "rabawa"; options: ƙari, rabawa, kusurwa madaidaiciya)

---

### `p4-bsci-20` — Vehicles, External Parts and Safe Technology Use

**Target filename:** `audio/p4-bsci-20.mp3`
**Title (Hausa):** Ababen Hawa, Sassan Waje, da Amfani Cikin Aminci

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi ababen hawa, sassan wajensu, da amfani cikin aminci. [MAIN] Ƙafafu da tayoyi suna taimaka wa abin hawa ya motsa. Fitilu suna taimakawa wajen gani, madubai wajen lura da gefe ko baya, gilashin gaba kuma yana kare direba daga iska da ƙura. [PAUSE 1] Wane sashe yake taimaka wa direba ya lura da abin da yake baya? [MAIN] Ƙofofi hanyar shiga da fita ce. Sandar da ke tsakiya tana iya haɗa ƙafafu. Gyara da kula da injin aikin manya ne. Kada ka taɓa abin hawa mai motsi, injin mai zafi, batiri, ko waya. [PAUSE 2] Wa ya kamata ya gyara abin hawa? [OUTRO] Daga wuri mai aminci, ka zana abin hawa mai tsaye ka haɗa kowane sashe na waje da aikinsa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane sashe yake taimaka wa direba ya lura da abin da yake baya?" (correct answer: "madubi"; options: madubi, taya, ƙofa)
- **[PAUSE 2]** — question shown to the learner: "Wa ya kamata ya gyara abin hawa?" (correct answer: "babba mai ƙwarewa"; options: babba mai ƙwarewa, yaro shi kaɗai, jariri)

---

### `p4-maths-21` — Money, Measures, and Time Word Problems

**Target filename:** `audio/p4-maths-21.mp3`
**Title (Hausa):** Matsalolin Kuɗi, Awo, da Lokaci

**Script to read:**

> [INTRO] Yau za mu yi matsalolin kuɗi, awo, da lokaci. [MAIN] Idan farashin kaya biyu ne, ka haɗa su. Idan ka biya kuɗi fiye da farashi, ka cire domin samun canji. [PAUSE 1] Idan ana neman jimlar farashi, wane aiki kake yi? [MAIN] A awo, mita 1 tana da santimita 100. A lokaci, daga awa 9 zuwa awa 14, awanni 5 ne. [PAUSE 2] Mita 1 tana da santimita nawa? [OUTRO] Ka tuna: ka rubuta raka'a domin amsa ta kasance a fili.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan ana neman jimlar farashi, wane aiki kake yi?" (correct answer: "ƙari"; options: ƙari, ragi, desimal)
- **[PAUSE 2]** — question shown to the learner: "Mita 1 tana da santimita nawa?" (correct answer: "100"; options: 10, 100, 1000)

---

### `p4-bsci-21` — Nutrition and Healthy Growth

**Target filename:** `audio/p4-bsci-21.mp3`
**Title (Hausa):** Abinci Mai Gina Jiki da Girma Cikin Lafiya

**Script to read:**

> [INTRO] Sannu da zuwa darasin Kimiyya. Yau za mu koyi yadda abinci iri-iri yake taimaka wa girma cikin lafiya. [MAIN] Tuwo, shinkafa, gero, doya, da rogo suna bada kuzari. Wake, ƙwai, kifi, da gyada suna taimakawa gina jiki. Kayan lambu da 'ya'yan itatuwa suna taimaka wa jiki ya zauna lafiya. [PAUSE 1] Wane aiki abincin gina jiki yake yi? [MAIN] Ruwa mai tsafta yana taimaka wa ayyukan jiki. Tuwo da miya mai alayyahu da wake yana da rukuni iri-iri fiye da biskit da abin sha mai zaƙi. Abinci na gida mai araha zai iya haɗa nau'ikan da ake bukata. A wanke hannu kafin ci. [PAUSE 2] Wane abinci ne ya fi haɗa rukuni iri-iri? [OUTRO] Ka kwatanta abincin rana biyu ta aikin kowane rukuni, sannan ka nuna yadda za a ƙara iri-iri da abin da ake samu a gida.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane aiki abincin gina jiki yake yi?" (correct answer: "yana taimaka wa jiki ya gina sassa"; options: yana taimaka wa jiki ya gina sassa, yana mayar da abinci dutse, yana hana mutum shan ruwa)
- **[PAUSE 2]** — question shown to the learner: "Wane abinci ne ya fi haɗa rukuni iri-iri?" (correct answer: "tuwo da miya mai alayyahu da wake"; options: tuwo da miya mai alayyahu da wake, biskit kaɗai, abin sha mai zaƙi kaɗai)

---

### `p4-maths-22` — Shapes Review: Perimeter, Area, and Angles

**Target filename:** `audio/p4-maths-22.mp3`
**Title (Hausa):** Bitar Siffofi: Perimita, Yanki, da Kusurwa

**Script to read:**

> [INTRO] Yau za mu yi bitar perimita, yanki, da kusurwa. [MAIN] Perimita yana zagaye gefen siffa. Yanki yana cika cikin siffa. Siffar rektangul mai tsawo 8 da faɗi 3 tana da yanki 24. [PAUSE 1] Siffar rektangul mai tsawo 8 da faɗi 3 tana da yanki nawa? [MAIN] Kusurwa madaidaiciya tana da digiri 90. Idan tambaya ta ce zagaye, ka yi perimita. Idan ta ce ciki, ka yi yanki. [PAUSE 2] Kusurwa madaidaiciya tana da digiri nawa? [OUTRO] Ka tuna: perimita zagaye ne, yanki ciki ne, kusurwa buɗewa ce.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Siffar rektangul mai tsawo 8 da faɗi 3 tana da yanki nawa?" (correct answer: "24"; options: 11, 22, 24)
- **[PAUSE 2]** — question shown to the learner: "Kusurwa madaidaiciya tana da digiri nawa?" (correct answer: "90"; options: 45, 90, 180)

---

### `p4-maths-23` — Data Review with Tables and Bar Charts

**Target filename:** `audio/p4-maths-23.mp3`
**Title (Hausa):** Bitar Bayanai da Teburi da Jadawalin Sanduna

**Script to read:**

> [INTRO] Yau za mu yi bitar bayanai da tebur da jadawalin sanduna. [MAIN] Teburi yana da layuka da ginshiƙai. Jadawalin sanduna yana nuna adadi da tsawon sanduna. Sandar da ta fi tsawo tana nuna adadi mafi yawa. [PAUSE 1] Sandar da ta fi tsawo tana nuna me? [MAIN] Don jimla, ka haɗa adadi. Don bambanci, ka cire ƙarami daga babba. Idan shinkafa 45 ce kuma wake 30 ne, jimla 75 ce. [PAUSE 2] Idan ana neman bambanci, me za ka yi? [OUTRO] Ka tuna: karanta bayanai da kyau kafin lissafi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Sandar da ta fi tsawo tana nuna me?" (correct answer: "adadi mafi yawa"; options: adadi mafi yawa, adadi mafi kaɗan, babu adadi)
- **[PAUSE 2]** — question shown to the learner: "Idan ana neman bambanci, me za ka yi?" (correct answer: "cire ƙarami daga babba"; options: haɗa duk lambobi, cire ƙarami daga babba, ninka da 100)

---

### `p4-maths-24` — P4 Mathematics Revision and Bridge to P5

**Target filename:** `audio/p4-maths-24.mp3`
**Title (Hausa):** Bitar Lissafin P4 da Gada Zuwa P5

**Script to read:**

> [INTRO] Yau za mu yi bitar P4 kuma mu shirya zuwa P5. [MAIN] Ka tuna lambobi har zuwa 10,000, ƙari, ragi, ninkawa, rabawa, kashi, desimal, perimita, yanki, kusurwa, tebur, jadawalin sanduna, kuɗi, awo, da lokaci. [PAUSE 1] Idan kana neman jimla, wane aiki kake yi? [MAIN] Idan kana neman saura ko bambanci, ka yi ragi. Idan rukuni iri ɗaya ne, ka duba ninkawa ko rabawa. P5 zai gina kan wannan tushe. [PAUSE 2] Idan kana neman saura, wane aiki kake yi? [OUTRO] Ka tuna: P4 tushe ne mai ƙarfi don P5.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan kana neman jimla, wane aiki kake yi?" (correct answer: "ƙari"; options: ƙari, ragi, kusurwa)
- **[PAUSE 2]** — question shown to the learner: "Idan kana neman saura, wane aiki kake yi?" (correct answer: "ragi"; options: ragi, ninkawa, yanki)

---
