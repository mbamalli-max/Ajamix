# AJAMIX Audio Recording Package — p5 (54 modules)

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

### `p5-maths-01` — Numbers up to 100,000

**Target filename:** `audio/p5-maths-01.mp3`
**Title (Hausa):** Lambobi Har Zuwa 100,000

**Script to read:**

> [INTRO] Yau za mu fara lambobi har zuwa dubu ɗari. [MAIN] Lamba kamar 68,425 tana da dubu sittin da takwas, ɗari huɗu, ashirin, da biyar. Ka karanta daga hagu zuwa dama, sannan ka lura da waƙafi. Waƙafi yana taimaka maka ka raba dubu daga sauran lambobi. [PAUSE 1] Wace lamba ce mafi girma: 68,425 ko 68,245? [MAIN] Idan lamba ta kai 100,000, muna iya kiran ta dubu ɗari. Sifili biyar suna bin 1, amma kowanne yana riƙe matsayi. [PAUSE 2] 100,000 tana nufin dubu nawa? [OUTRO] Ka tuna: karanta manyan lambobi a hankali, rukuni bayan rukuni.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace lamba ce mafi girma: 68,425 ko 68,245?" (correct answer: "68,425"; options: 68,425, 68,245, 68,045)
- **[PAUSE 2]** — question shown to the learner: "100,000 tana nufin dubu nawa?" (correct answer: "100"; options: 10, 100, 1,000)

---

### `p5-bsci-01` — Environmental Changes, Pollution, and Environmental Quality

**Target filename:** `audio/p5-bsci-01.mp3`
**Title (Hausa):** Sauye-sauyen Muhalli da Gurɓacewarsa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu gano yadda muhalli yake canzawa da yadda ake kare shi. [MAIN] Zaizayar ƙasa na faruwa idan ruwa ko iska suna kwashe ƙasa, musamman inda babu ciyawa ko itatuwa. Hayaki daga ƙona shara da ababen hawa yana gurɓata iska. Datti, mai, ko ruwan najasa cikin rafi yana gurɓata ruwa. Muhalli mai kyau yana da tsaftatacciyar hanya, ruwa marar wari, bishiyoyi, da magudanar da ba ta toshe ba. [PAUSE 1] Wane abu ne zai iya rage zaizayar ƙasa? [MAIN] Datti mai yawa, hayaki, wari, mataccen kifi, ko ruwan da ya canza launi alamu ne na lalacewa. Ka lura daga wuri mai aminci, ka rage shara, kuma ka yi amfani da kwandon shara. Kada ka shiga gurɓataccen ruwa ko hayaki; ka gaya wa babban da ka yarda da shi. Tsaftacewa ta kasance mai aminci ƙarƙashin kulawar manya. [PAUSE 2] Me ya kamata ka yi idan ka ga gurɓataccen ruwa? [OUTRO] Kare muhalli yana farawa da lura cikin aminci, rage shara, da sanar da babba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne zai iya rage zaizayar ƙasa?" (correct answer: "ciyawa da itatuwa"; options: ciyawa da itatuwa, zubar da mai, toshe magudana)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi idan ka ga gurɓataccen ruwa?" (correct answer: "ka nisanta ka sanar da babba"; options: ka nisanta ka sanar da babba, ka shiga ciki, ka sha domin gwadawa)

---

### `p5-socs-01` — Natural Resources of Nigeria

**Target filename:** `audio/p5-socs-01.mp3`
**Title (Hausa):** Albarkatun Ƙasa na Nijeriya

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi albarkatun ƙasa na Nijeriya. [MAIN] Albarkatun ƙasa abubuwa ne daga muhalli da suke taimaka wa rayuwa. Sun haɗa da ƙasa, ruwa, dazuzzuka, dabbobi, ma’adanai, man fetur, da iskar gas. Ƙasa tana taimaka wa noma, ruwa yana taimaka wa sha da kamun kifi, dazuzzuka kuma suna kare ƙasa da mazaunin dabbobi. [PAUSE 1] Wane albarkatu ne yake taimaka wa noma da shuka amfanin gona? [MAIN] Albarkatu ba su bazu daidai a ko’ina ba. Amfani da su yana samar da ayyukan yi da kayayyaki, amma hako ko sarewa ba tare da kulawa ba yana iya lalata muhalli. [PAUSE 2] Me zai iya faruwa idan aka yi amfani da albarkatu ba tare da kulawa ba? [OUTRO] Ka zaɓi albarkatu ɗaya a yankinku, ka faɗi amfaninsa da hanya ɗaya ta kula da shi domin masu zuwa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane albarkatu ne yake taimaka wa noma da shuka amfanin gona?" (correct answer: "ƙasa"; options: ƙasa, hayaki, shara)
- **[PAUSE 2]** — question shown to the learner: "Me zai iya faruwa idan aka yi amfani da albarkatu ba tare da kulawa ba?" (correct answer: "lalata muhalli"; options: lalata muhalli, ƙara tsabta, ƙara albarkatu nan da nan)

---

### `p5-maths-02` — Place Value to Hundred Thousands

**Target filename:** `audio/p5-maths-02.mp3`
**Title (Hausa):** Matsayin Lamba Har Zuwa Dubu Ɗari

**Script to read:**

> [INTRO] Yau za mu koyi matsayi har zuwa wurin dubu ɗari. [MAIN] A 74,318, 7 tana wurin dubu goma, saboda tana nufin 70,000. 4 tana wurin dubu, 3 tana wurin ɗari, 1 tana wurin goma, 8 tana wurin ɗaya. [PAUSE 1] A lamba 74,318, wace lamba ce a wurin dubu goma? [MAIN] Idan ka ga 100,000, 1 tana wurin dubu ɗari. Wannan wurin yana sama da dubu goma. Ka rubuta wuraren a jere domin kada ka ruɗe. [PAUSE 2] A lamba 100,000, wane matsayi 1 take ciki? [OUTRO] Matsayi yana ba lamba ƙima, ba siffar rubutu kawai ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A lamba 74,318, wace lamba ce a wurin dubu goma?" (correct answer: "7"; options: 7, 4, 3)
- **[PAUSE 2]** — question shown to the learner: "A lamba 100,000, wane matsayi 1 take ciki?" (correct answer: "dubu ɗari"; options: dubu goma, dubu ɗari, ɗari)

---

### `p5-bsci-02` — Waste Disposal, Reuse, and Recycling

**Target filename:** `audio/p5-bsci-02.mp3`
**Title (Hausa):** Zubar da Shara, Sake Amfani, da Sarrafawa

**Script to read:**

> [INTRO] Yau za mu koyi zubar da shara, sake amfani, da sarrafawa. [MAIN] Ragowar abinci da ganye suna ruɓewa; takarda, kwalban roba, gwangwani, da tsofaffin kaya suna da siffofi dabam. A inda ya dace, manya na ware shara mai ruɓewa daga takarda, roba, da ƙarfe. Sake amfani shi ne amfani da abu kuma. Sarrafawa yana canza tsohon abu ya zama sabon abu. [PAUSE 1] Menene sake amfani? [MAIN] Shara cikin magudana tana iya jawo ambaliya, kuma shara cikin ruwa tana gurɓata shi. Ƙona shara yana iya fitar da hayaki mai cutarwa. Ka rarraba takarda ko kwalban roba mai tsabta kawai idan babba ya amince. Kada ka taɓa fasasshen gilashi, ƙarfe mai kaifi, sharar asibiti, sinadarin da ba ka sani ba, ko shara mai ruɓewa. [PAUSE 2] Me za ka yi da fasasshen gilashi? [OUTRO] Ka ware abin da yake aminci kawai, ka guji shara mai haɗari, ka kira babba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Menene sake amfani?" (correct answer: "amfani da abu kuma"; options: amfani da abu kuma, zubar da komai, ƙona kowace shara)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi da fasasshen gilashi?" (correct answer: "ka guje shi ka sanar da babba"; options: ka guje shi ka sanar da babba, ka ɗauka da hannu, ka yi wasa da shi)

---

### `p5-socs-02` — Conservation of Natural Resources

**Target filename:** `audio/p5-socs-02.mp3`
**Title (Hausa):** Kula da Albarkatun Ƙasa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi kula da albarkatun ƙasa. [MAIN] Ma’anarsa ita ce amfani da albarkatu cikin hikima ba tare da lalata damar masu zuwa ba. Sare itatuwa ba tare da dasawa ba, kiwo mai yawa a wuri ɗaya, da ɓarnatar da ruwa suna rage albarkatu. [PAUSE 1] Wane aiki ne yake taimaka wa daji bayan an sare itatuwa? [MAIN] Za mu iya dasa itatuwa, rufe famfo, kiyaye ciyayi, sake amfani da wasu kaya, da bin ƙa’idar hako ma’adanai. Makamashin rana da iska suna sabuntawa ta halitta, amma kayan aikinsu ma suna bukatar kulawa. [PAUSE 2] Me ya kamata ka yi idan famfo yana zuba bayan amfani? [OUTRO] Ka lura da albarkatu ɗaya a gida ko makaranta, ka tsara ƙaramin aikin da zai rage ɓarnatar da ita a wannan makon.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane aiki ne yake taimaka wa daji bayan an sare itatuwa?" (correct answer: "dasa wasu itatuwa"; options: dasa wasu itatuwa, barin ƙasa a buɗe, ƙara sarewa)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi idan famfo yana zuba bayan amfani?" (correct answer: "rufe famfo"; options: rufe famfo, bar shi yana zuba, zuba shara kusa da shi)

---

### `p5-maths-03` — Comparing and Ordering Large Numbers

**Target filename:** `audio/p5-maths-03.mp3`
**Title (Hausa):** Kwatanta Da Jeranta Manyan Lambobi

**Script to read:**

> [INTRO] Yau za mu kwatanta da jeranta manyan lambobi. [MAIN] Fara daga hagu. A 56,210 da 65,120, wurin dubu goma ya bambanta. 6 ya fi 5, don haka 65,120 ta fi girma. Idan wurin farko ya yi daidai, ka matsa zuwa wurin gaba. [PAUSE 1] Wace lamba ce ta fi girma: 56,210 ko 65,120? [MAIN] Jeranta lambobi yana nufin saka su cikin tsari. Daga ƙanana zuwa manya, ka fara da lambar da ke da ƙima mafi kaɗan. [PAUSE 2] Idan ana jeranta daga ƙanana zuwa manya, wace lamba ake fara sakawa? [OUTRO] Ka tuna: wurin hagu yana da ƙarfi wajen nuna girman lamba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace lamba ce ta fi girma: 56,210 ko 65,120?" (correct answer: "65,120"; options: 56,210, 65,120, 56,120)
- **[PAUSE 2]** — question shown to the learner: "Idan ana jeranta daga ƙanana zuwa manya, wace lamba ake fara sakawa?" (correct answer: "mafi ƙanƙanta"; options: mafi girma, mafi ƙanƙanta, ta tsakiya kawai)

---

### `p5-bsci-03` — Human Skeleton, Joints, and Movement

**Target filename:** `audio/p5-bsci-03.mp3`
**Title (Hausa):** Tsarin Ƙasusuwan Jiki da Motsi

**Script to read:**

> [INTRO] Yau za mu koyi tsarin ƙasusuwan jiki da motsi. [MAIN] Tsarin ƙasusuwa yana ba jiki tsari da goyon baya. Ƙasusuwan kai suna kewaye da ƙwaƙwalwa; na ƙirji suna taimaka wa kariyar zuciya da huhu. Wurin da ƙasusuwa biyu suke haɗuwa yana ba da motsi. Gwiwar hannu tana lanƙwasawa, gwiwa tana taimakon tafiya, kafada kuma tana motsa hannu. [PAUSE 1] Wane sashi ne ƙasusuwan kai suke karewa? [MAIN] Ka kwatanta motsin gwiwar hannu, gwiwa, da kafada a hankali ba tare da tilastawa ba. Daidaitacciyar zama da tsayuwa da motsa jiki cikin aminci suna taimakon jiki. Kada ka yi ƙoƙarin gyara ƙashi. Bayan faɗuwa, idan ka ji ciwo, ka sanar da babba a nemi ma'aikacin lafiya. [PAUSE 2] Wane wuri ne yake taimaka wa hannu ya lanƙwashe? [OUTRO] Tsari, kariya, da motsi su ne manyan ayyukan ƙasusuwa da wuraren haɗuwarsu.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane sashi ne ƙasusuwan kai suke karewa?" (correct answer: "ƙwaƙwalwa"; options: ƙwaƙwalwa, gwiwa, yatsa)
- **[PAUSE 2]** — question shown to the learner: "Wane wuri ne yake taimaka wa hannu ya lanƙwashe?" (correct answer: "gwiwar hannu"; options: gwiwar hannu, diddige, kunne)

---

### `p5-socs-03` — Environmental Pollution

**Target filename:** `audio/p5-socs-03.mp3`
**Title (Hausa):** Gurɓata Muhalli

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yadda iska, ruwa, da ƙasa suke gurɓata. [MAIN] Hayaƙin ababen hawa, masana’antu, da ƙona shara na iya gurɓata iska. Shara ko ruwa mai datti na iya gurɓata rijiya da kogi. Shara da wasu sinadarai kuma suna iya lalata ƙasa. [PAUSE 1] Waɗanne sassa uku na muhalli za su iya gurɓata? [MAIN] Gurɓatawa na iya cutar da lafiya, dabbobi, da amfanin gona. A yi amfani da kwandon shara, a kiyaye magudana, a dasa itatuwa, kuma yaro ya sanar da babba idan ya ga abu mai haɗari. [PAUSE 2] Me yaro zai yi idan ya ga shara mai kaifi? [OUTRO] Ka bincika hanyar shara daga gidanku zuwa wurin da ya dace, ka faɗi yadda hakan yake kare iska, ruwa, ko ƙasa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne sassa uku na muhalli za su iya gurɓata?" (correct answer: "iska, ruwa, da ƙasa"; options: iska, ruwa, da ƙasa, littafi, biro, da allo, riga, hula, da takalmi)
- **[PAUSE 2]** — question shown to the learner: "Me yaro zai yi idan ya ga shara mai kaifi?" (correct answer: "ya sanar da babba"; options: ya sanar da babba, ya ɗauka da hannu, ya ɓoye ta)

---

### `p5-maths-04` — Intro to Lowest Common Multiple

**Target filename:** `audio/p5-maths-04.mp3`
**Title (Hausa):** Gabatarwa Ga Mafi Ƙaramin Ninki Na Gari

**Script to read:**

> [INTRO] Yau za mu fara LCM, wato mafi ƙaramin ninki na gari. [MAIN] Ninkin lamba yana fitowa idan ka ninka lambar da 1, 2, 3, da sauransu. Ninkin 2 su ne 2, 4, 6, 8. Ninkin 3 su ne 3, 6, 9. Na farko da suka haɗu shi ne 6. [PAUSE 1] Menene LCM na 2 da 3? [MAIN] Ka rubuta ninkuna a hankali. Idan lamba ta bayyana a jerin ninkunan biyu, ita ce ninki na gari. Ka zaɓi mafi ƙanƙanta daga cikinsu. [PAUSE 2] A LCM, me ake nema daga ninkaye na gari? [OUTRO] LCM yana taimaka maka samun lokaci ko adadi na farko da lambobi biyu suka raba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Menene LCM na 2 da 3?" (correct answer: "6"; options: 5, 6, 8)
- **[PAUSE 2]** — question shown to the learner: "A LCM, me ake nema daga ninkaye na gari?" (correct answer: "mafi ƙanƙanta"; options: mafi ƙanƙanta, mafi girma, wanda ba ya shiga)

---

### `p5-bsci-04` — Flower Parts, Pollination, and Seed and Fruit Formation

**Target filename:** `audio/p5-bsci-04.mp3`
**Title (Hausa):** Sassan Fure da Samar da Iri da 'Ya'ya

**Script to read:**

> [INTRO] Yau za mu koyi sassan fure da yadda iri da 'ya'ya suke samuwa. [MAIN] Ganyen fure masu launi kan jawo kwari, sassan ciki kuma suna ɗauke da ƙurar fure. Ɗaukar ƙurar fure zuwa sashin da yake karɓarta muhimmin mataki ne. Iska, ƙudan zuma, da malam buɗe ido na iya taimaka wa wannan ɗauka. [PAUSE 1] Waɗanne abubuwa biyu ne kan taimaka wajen ɗaukar ƙurar fure? [MAIN] Bayan ƙurar ta isa inda ya dace, wasu matakai suna biyo baya, iri yana tasowa, kuma wani ɓangaren fure kan zama 'ya'ya. Mangwaro, tumatir, da kabewa suna ɗauke da iri. Ka lura da fure cikin aminci; kada ka cire shi ko kusanci ƙudan zuma. Ka zana sassan da ka gani. [PAUSE 2] Me kan tasowa bayan matakan da suka biyo bayan isar ƙurar fure? [OUTRO] Ka kalli fure a matsayin farkon tafiyar iri da 'ya'ya, ba ado kawai ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne abubuwa biyu ne kan taimaka wajen ɗaukar ƙurar fure?" (correct answer: "iska da kwari"; options: iska da kwari, duwatsu da yashi, takarda da fensir)
- **[PAUSE 2]** — question shown to the learner: "Me kan tasowa bayan matakan da suka biyo bayan isar ƙurar fure?" (correct answer: "iri"; options: iri, ƙarfe, gilashi)

---

### `p5-socs-04` — Disaster Preparedness and Safety

**Target filename:** `audio/p5-socs-04.mp3`
**Title (Hausa):** Shiri da Kariya Lokacin Bala’i

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi shiri da kariya lokacin bala’i. [MAIN] Ambaliya, gobara, da babban hatsarin hanya na iya cutar da mutane da muhalli. Iyali da makaranta su san hanyar fita, wurin taruwa, da wanda za a sanar. Gargadi na iya zuwa daga hukuma, rediyo, mai shela, ko babba. [PAUSE 1] Me ya kamata iyali su sani kafin bala’i? [MAIN] Ka bi babba zuwa wuri mai aminci. Kada ka shiga ruwa mai gudu, kusanci gobara, ko taru a hatsarin hanya. Ka sanar da babba, ka guji jita-jita, ka bi umarnin hukuma. [PAUSE 2] Wa ya kamata ya yi aikin ceto mai haɗari? [OUTRO] Ka yi atisayen tunani: gano hanyar fita, wurin taruwa, da babban da za ka sanar ba tare da shiga haɗari ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ya kamata iyali su sani kafin bala’i?" (correct answer: "hanyar fita da wurin taruwa"; options: hanyar fita da wurin taruwa, inda za a ɓoye gaskiya, inda za a taru domin kallo)
- **[PAUSE 2]** — question shown to the learner: "Wa ya kamata ya yi aikin ceto mai haɗari?" (correct answer: "masu horo"; options: masu horo, yaro shi kaɗai, duk mai kallo)

---

### `p5-maths-05` — Intro to Highest Common Factor

**Target filename:** `audio/p5-maths-05.mp3`
**Title (Hausa):** Gabatarwa Ga Mafi Girman Mai Raba Gari

**Script to read:**

> [INTRO] Yau za mu koyi HCF, wato mafi girman mai raba gari. [MAIN] Mai raba lamba yana shiga cikin lambar ba tare da saura ba. Masu raba 12 sun haɗa da 1, 2, 3, 4, 6, 12. Masu raba 18 sun haɗa da 1, 2, 3, 6, 9, 18. Mafi girman wanda ya bayyana a duka shi ne 6. [PAUSE 1] Menene HCF na 12 da 18? [MAIN] Idan kana raba kaya ga ƙungiyoyi daidai, HCF yana nuna mafi girman adadin ƙungiyoyi ko girman rabon da zai yi aiki. [PAUSE 2] A HCF, me ake nema daga masu raba gari? [OUTRO] Ka tuna: HCF yana kallon masu raba gari, sannan ya zaɓi mafi girma.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Menene HCF na 12 da 18?" (correct answer: "6"; options: 3, 6, 12)
- **[PAUSE 2]** — question shown to the learner: "A HCF, me ake nema daga masu raba gari?" (correct answer: "mafi girma"; options: mafi ƙanƙanta, mafi girma, wanda ba ya raba)

---

### `p5-bsci-05` — Rocks: Properties, Groups, and Uses

**Target filename:** `audio/p5-bsci-05.mp3`
**Title (Hausa):** Duwatsu: Siffofi, Rukuni, da Amfani

**Script to read:**

> [INTRO] Yau za mu kwatanta duwatsu da amfaninsu. [MAIN] Duwatsu sun bambanta a launi, santsi, kaushi, girma, da tauri. Za a iya rarraba su bisa siffofin da ake gani. Ana amfani da su wajen gini, hanya, niƙa, da ado. Ƙasa ma tana iya ɗauke da ƙananan gutsattsarin dutse. [PAUSE 1] Waɗanne siffofi biyu za a iya kwatantawa? [MAIN] Tare da malami, ka lura da duwatsu marasa kaifi, ka jera su daga ƙarami zuwa babba. Kada ka fasa dutse, ka hau ramin haƙa, ko ka taɓa gutsattsari mai kaifi. [PAUSE 2] Wane amfani ne ake yi da dutse a hanya? [OUTRO] Launi, saman dutse, da girma suna ba mu hanyar kwatanta dutse cikin aminci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne siffofi biyu za a iya kwatantawa?" (correct answer: "launi da kaushi"; options: launi da kaushi, wari da ɗanɗano, sauti da gudu)
- **[PAUSE 2]** — question shown to the learner: "Wane amfani ne ake yi da dutse a hanya?" (correct answer: "shimfiɗa hanya"; options: shimfiɗa hanya, shayar da hanya, daffa hanya)

---

### `p5-socs-05` — The Nigerian Constitution and Rule of Law

**Target filename:** `audio/p5-socs-05.mp3`
**Title (Hausa):** Kundin Tsarin Mulkin Nijeriya da Bin Doka

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi kundin tsarin mulki da bin doka. [MAIN] Kundin tsarin mulki babbar doka ce da take bayyana yadda ake tafiyar da ƙasa, ikon hukumomi, da haƙƙoƙi da nauyin ƴan ƙasa. Bin doka yana nufin gwamnati da jama’a su bi doka. [PAUSE 1] Shin akwai shugaba ko ɗan ƙasa da ya kamata ya kasance sama da doka? [MAIN] Kotu tana yanke hukunci bisa hujja da doka. Kundin yana da alaƙa da dimokuradiyya, zaɓe, da jefa ƙuri’a, amma darasinmu ba haddace lambobin sassa ba ne. Ƴan ƙasa su girmama haƙƙin wasu da kayan jama’a. [PAUSE 2] Me kotu take amfani da shi wajen yanke hukunci? [OUTRO] Ka bayyana dalilin da ya sa bin doka yake kare kowa, sannan ka ba da misalin nauyin ɗan ƙasa ba tare da goyon bayan wata jam’iyya ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Shin akwai shugaba ko ɗan ƙasa da ya kamata ya kasance sama da doka?" (correct answer: "babu wanda yake sama da doka"; options: babu wanda yake sama da doka, shugaba yana sama da doka, mai kuɗi yana sama da doka)
- **[PAUSE 2]** — question shown to the learner: "Me kotu take amfani da shi wajen yanke hukunci?" (correct answer: "hujja da doka"; options: hujja da doka, jita-jita, son rai)

---

### `p5-maths-06` — LCM and HCF Practice

**Target filename:** `audio/p5-maths-06.mp3`
**Title (Hausa):** Atisayen LCM Da HCF

**Script to read:**

> [INTRO] Yau za mu yi atisayen bambance LCM da HCF. [MAIN] LCM yana nufin mafi ƙaramin ninki na gari. HCF yana nufin mafi girman mai raba gari. Idan abubuwa biyu suna faruwa tare bayan wasu lokuta, ka yi tunanin LCM. [PAUSE 1] Idan kararrawa biyu suna bugawa tare bayan wasu mintuna, wane ra'ayi ya fi dacewa? [MAIN] Idan kana raba kaya daidai ba tare da saura ba, ka yi tunanin HCF. Misali, raba alawa da biskit ga ƙungiyoyi iri ɗaya. [PAUSE 2] Idan ana raba kaya daidai ba tare da saura ba, wane ra'ayi ya fi dacewa? [OUTRO] Ka bambanta su da kalmomi: ninki don LCM, raba don HCF.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan kararrawa biyu suna bugawa tare bayan wasu mintuna, wane ra'ayi ya fi dacewa?" (correct answer: "LCM"; options: LCM, HCF, ragi)
- **[PAUSE 2]** — question shown to the learner: "Idan ana raba kaya daidai ba tare da saura ba, wane ra'ayi ya fi dacewa?" (correct answer: "HCF"; options: LCM, HCF, ƙari)

---

### `p5-bsci-06` — Acids, Bases, and Household Substances

**Target filename:** `audio/p5-bsci-06.mp3`
**Title (Hausa):** Rukunan Wasu Sinadarai da Tsaronsu

**Script to read:**

> [INTRO] Yau za mu gane rukunan wasu sinadarai tare da tsaro. [MAIN] Wasu sinadarai suna da halayen asid, wasu kuma halayen bes. Halayensu da haɗarinsu sun bambanta. Lakabi da bayanin babba ne ke taimakawa wajen gane su. Ba a gane sinadari ta ɗanɗano, wari kusa, taɓawa, ko haɗawa ba. [PAUSE 1] Wace hanya ce ba ta dace a gane sinadari ba? [MAIN] Lemun tsami da sabulu misalai ne da manya suka sani, amma yara ba su gwada su da jiki. Malami ko babba kaɗai zai yi nunawa da kayan da aka amince da su. Ka kalla daga nesa. Ka nisanci sinadarin da ba ka sani ba ka sanar da babba. [PAUSE 2] Wa zai gudanar da nunawar sinadari? [OUTRO] Gane rukuni ba izinin gwaji ba ne: lakabi, nesa, da babban mutum su jagorance ka.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace hanya ce ba ta dace a gane sinadari ba?" (correct answer: "ɗanɗana shi"; options: ɗanɗana shi, karanta lakabi tare da babba, sauraron bayanin malami)
- **[PAUSE 2]** — question shown to the learner: "Wa zai gudanar da nunawar sinadari?" (correct answer: "malami ko babba"; options: malami ko babba, yaro shi kaɗai, jariri)

---

### `p5-socs-06` — Civic Education — Rights and Responsibilities

**Target filename:** `audio/p5-socs-06.mp3`
**Title (Hausa):** Ilimin Ɗan Ƙasa — Haƙƙoƙi da Nauyi

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi haƙƙoƙi da nauyin ɗan ƙasa. [MAIN] Haƙƙoƙi suna taimaka wa mutum ya rayu cikin mutunci. Akwai haƙƙin rayuwa, koyo, bayyana ra’ayi cikin doka, yin taro cikin lumana, da a saurare ka cikin adalci. Yara suna da haƙƙin kulawa da kariya. [PAUSE 1] Shin haƙƙi yana ba mutum izinin cutar da wani? [MAIN] Haƙƙi yana tare da nauyi: yin magana ba tare da zagi ba, bin doka, girmama wasu, da kula da kayan jama’a. Idan an tauye haƙƙin yaro, ya gaya wa amintaccen babba ko malami. [PAUSE 2] Wane nauyi ne yake tare da amfani da kayan jama’a? [OUTRO] Ka haɗa haƙƙi ɗaya da nauyin da yake taimaka wa kowa ya more shi cikin adalci da mutunci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Shin haƙƙi yana ba mutum izinin cutar da wani?" (correct answer: "a’a, haƙƙi ba izinin cutarwa ba ne"; options: a’a, haƙƙi ba izinin cutarwa ba ne, eh, a cutar da kowa, eh, a karya doka)
- **[PAUSE 2]** — question shown to the learner: "Wane nauyi ne yake tare da amfani da kayan jama’a?" (correct answer: "kula da kayan jama’a"; options: kula da kayan jama’a, lalata kayan jama’a, ɗaukar su ba izini)

---

### `p5-maths-07` — Fractions Review

**Target filename:** `audio/p5-maths-07.mp3`
**Title (Hausa):** Bitar Kashi

**Script to read:**

> [INTRO] Yau za mu yi bitar kashi. [MAIN] Kashi yana nuna ɓangare daga cikin duka. A 3 cikin 5, lambar da ke sama ita ce lambar sama, domin tana nuna ɓangarori nawa aka ɗauka. Lambar da ke ƙasa ita ce lambar ƙasa, domin tana nuna ɓangarori nawa aka raba duka. [PAUSE 1] A kashi 3 cikin 5, wace lamba ce lambar sama? [MAIN] Idan aka raba abu gida daidai, sai kashi ya zama mai ma'ana. Idan gidajen ba su yi daidai ba, rabon bai zama kashi na gaskiya ba. [PAUSE 2] A kashi 3 cikin 5, wace lamba ce lambar ƙasa? [OUTRO] Ka tuna: lambar sama tana sama, lambar ƙasa tana ƙasa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A kashi 3 cikin 5, wace lamba ce lambar sama?" (correct answer: "3"; options: 3, 5, 8)
- **[PAUSE 2]** — question shown to the learner: "A kashi 3 cikin 5, wace lamba ce lambar ƙasa?" (correct answer: "5"; options: 2, 3, 5)

---

### `p5-bsci-07` — Materials, Maintenance, and Drawing Instruments

**Target filename:** `audio/p5-bsci-07.mp3`
**Title (Hausa):** Kayan Aiki, Kulawa, da Kayan Zane

**Script to read:**

> [INTRO] Yau za mu haɗa kayan aiki da aikinsu da yadda ake kula da su. [MAIN] Itace, yumɓu, ƙarfe, da roba suna yin kayayyaki dabam. A share kayan, a busar da su, a mayar da su wurin ajiya. Fensir yana yin layi, magogi yana goge kuskure, ma'auni yana aunawa da zana madaidaicin layi, kusurwar awo tana zana kusurwa. [PAUSE 1] Wane kayan zane ne yake auna tsayi? [MAIN] Tare da malami, ka haɗa kayan da aikinsa, ka auna gefen littafi. Riƙe kayan cikin natsuwa. Kada yaro ya yi amfani da kayan kaifi ko masu aiki da wuta ba tare da kulawar ƙwararren babba ba. [PAUSE 2] Me ya kamata a yi da kayan da ya jike? [OUTRO] Zaɓin kayan da ya dace da tsaftace shi bayan aiki alamar mai amfani mai kula ce.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kayan zane ne yake auna tsayi?" (correct answer: "ma'auni"; options: ma'auni, magogi, yumɓu)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata a yi da kayan da ya jike?" (correct answer: "a busar da shi"; options: a busar da shi, a jefa shi, a binne shi)

---

### `p5-socs-07` — Social Issues — Drug Abuse

**Target filename:** `audio/p5-socs-07.mp3`
**Title (Hausa):** Matsalar Amfani da Taba, Giya, ko Magani Ba Bisa Ƙa’ida Ba

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yadda za a ƙi abin da zai cutar da lafiya. [MAIN] Taba da giya ba su dace da yara ba. Kada a yi amfani da maganin da iyaye, likita, ko ma’aikacin lafiya bai amince da shi ko ba da shi ba. Rashin amfani da waɗannan abubuwa na iya cutar da lafiya, koyo, da amincewar iyali. [PAUSE 1] Me za ka ce idan aboki ya matsa maka ka karɓi irin wannan abu? [MAIN] Ka ce a’a cikin natsuwa, ka bar wurin, ka je inda yake da aminci, sannan ka gaya wa babban da ka yarda da shi. A mutunta mai matsala; yana bukatar taimakon ƙwararru, ba zagi ba. [PAUSE 2] Wa ya kamata ka gaya wa bayan ka bar wurin? [OUTRO] Ka tuna matakai uku: ka ce a’a, ka bar wurin, ka nemi taimakon babban da ka yarda da shi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me za ka ce idan aboki ya matsa maka ka karɓi irin wannan abu?" (correct answer: "a’a"; options: a’a, zan karɓa, zan ɓoye)
- **[PAUSE 2]** — question shown to the learner: "Wa ya kamata ka gaya wa bayan ka bar wurin?" (correct answer: "babban da na yarda da shi"; options: babban da na yarda da shi, babu kowa, wanda zai kunyata ni)

---

### `p5-maths-08` — Equivalent Fractions

**Target filename:** `audio/p5-maths-08.mp3`
**Title (Hausa):** Kashi Masu Ƙima Ɗaya

**Script to read:**

> [INTRO] Yau za mu koyi kashi masu ƙima ɗaya. [MAIN] 1 cikin 2 da 2 cikin 4 suna nuna rabi ɗaya. Sun bambanta a rubutu, amma ƙimarsu ɗaya ce. Idan ka ninka lambar sama da lambar ƙasa da lamba ɗaya, ƙimar kashin ba ta canza. [PAUSE 1] Wane kashi ne ya yi daidai da 1 cikin 2: 2 cikin 4 ko 1 cikin 4? [MAIN] Ka kula: ninka sama kawai ba daidai ba ne. Dole ka ninka sama da ƙasa da lamba ɗaya. Haka ake samun sabon kashi mai ƙima ɗaya. [PAUSE 2] Idan ka ninka lambar sama da 3, me ya kamata ka yi da lambar ƙasa? [OUTRO] Kashi masu ƙima ɗaya suna da siffa daban, amma suna nuna rabon ɗaya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kashi ne ya yi daidai da 1 cikin 2: 2 cikin 4 ko 1 cikin 4?" (correct answer: "2 cikin 4"; options: 2 cikin 4, 1 cikin 4, 3 cikin 4)
- **[PAUSE 2]** — question shown to the learner: "Idan ka ninka lambar sama da 3, me ya kamata ka yi da lambar ƙasa?" (correct answer: "ninka ta da 3"; options: rage ta da 3, ninka ta da 3, bar ta haka)

---

### `p5-bsci-08` — Vehicle Parts, Functions, and Safety

**Target filename:** `audio/p5-bsci-08.mp3`
**Title (Hausa):** Sassan Abin Hawa, Ayyukansu, da Tsaro

**Script to read:**

> [INTRO] Yau za mu fahimci ayyukan sassan abin hawa da tsaro. [MAIN] Ƙafafu da tayoyi suna juyawa. Fitilu suna taimakon gani, madubai suna taimaka wa direba ya duba wasu wurare, gilashin gaba yana ba da kariya da gani. Na'urar tsayarwa tana rage gudu ko tsayar da mota. Bel ɗin zama yana riƙe fasinja. [PAUSE 1] Wane sashi ne yake taimaka wa direba ya ga wasu wurare? [MAIN] Babba ko ƙwararren ma'aikaci ne yake duba da gyara mota. Yaro zai nuna sassa a hoto kawai. Kada ka tuƙa, taɓa mai ko batiri, shiga ƙarƙashin mota, ko kusanci sashi mai zafi ko motsi. [PAUSE 2] Wa ya kamata ya gyara abin hawa? [OUTRO] Sanin aikin sassan mota yana koya mana dalilin da ya sa kulawar ƙwararru da dokar fasinja suke da muhimmanci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane sashi ne yake taimaka wa direba ya ga wasu wurare?" (correct answer: "madubi"; options: madubi, taya, ƙofa)
- **[PAUSE 2]** — question shown to the learner: "Wa ya kamata ya gyara abin hawa?" (correct answer: "ƙwararren babba"; options: ƙwararren babba, yaro shi kaɗai, duk wani fasinja)

---

### `p5-socs-08` — Social Issues — Conflict and Conflict Resolution

**Target filename:** `audio/p5-socs-08.mp3`
**Title (Hausa):** Saɓani da Yadda Ake Warware Shi Cikin Lumana

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi saɓani da yadda ake warware shi cikin lumana. [MAIN] Saɓani yana faruwa idan mutane ba su amince da juna kan bukata, ra’ayi, ko aiki ba. Ba lallai ya zama faɗa ba. A natsu, a daina zagi, kowa ya faɗi abin da ya faru, sannan a saurari juna. [PAUSE 1] Wane mataki ne ya dace a fara da shi idan saɓani ya taso? [MAIN] A gano abin da aka amince a kai, a nemi mafita mai adalci, ko a nemi mai shiga tsakani. Idan akwai haɗari, yaro ya nisanta ya sanar da babba. [PAUSE 2] Wa zai iya zama mai shiga tsakani a saɓanin makaranta? [OUTRO] Ka yi amfani da matakai huɗu: natsuwa, faɗin gaskiya, sauraro, da neman mafita mai adalci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane mataki ne ya dace a fara da shi idan saɓani ya taso?" (correct answer: "a natsu"; options: a natsu, a yi barazana, a fara zagi)
- **[PAUSE 2]** — question shown to the learner: "Wa zai iya zama mai shiga tsakani a saɓanin makaranta?" (correct answer: "malami"; options: malami, wanda yake ƙara zagi, wanda ba ya sauraro)

---

### `p5-maths-09` — Comparing Fractions

**Target filename:** `audio/p5-maths-09.mp3`
**Title (Hausa):** Kwatanta Kashi

**Script to read:**

> [INTRO] Yau za mu kwatanta kashi. [MAIN] Idan lambobin ƙasa iri ɗaya ne, ka duba lambar sama. 3 cikin 8 ya fi 2 cikin 8, domin an ɗauki ɓangarori uku maimakon biyu daga gida takwas. [PAUSE 1] Wanne ya fi girma: 3 cikin 8 ko 2 cikin 8? [MAIN] Idan kashin sun bambanta sosai, za ka iya ninkawa a giciye. Babban sakamakon giciye yana nuna babban kashi. Haka kuma 1 cikin 3 ya fi 1 cikin 4, domin kashi uku sun fi kashi huɗu girma idan aka ɗauki guda ɗaya. [PAUSE 2] Wanne ya fi girma: 1 cikin 3 ko 1 cikin 4? [OUTRO] Ka fara da lambobin ƙasa iri ɗaya, sannan ka yi giciye idan ana bukata.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wanne ya fi girma: 3 cikin 8 ko 2 cikin 8?" (correct answer: "3 cikin 8"; options: 3 cikin 8, 2 cikin 8, sun yi daidai)
- **[PAUSE 2]** — question shown to the learner: "Wanne ya fi girma: 1 cikin 3 ko 1 cikin 4?" (correct answer: "1 cikin 3"; options: 1 cikin 3, 1 cikin 4, sun yi daidai)

---

### `p5-bsci-09` — Energy Conversion

**Target filename:** `audio/p5-bsci-09.mp3`
**Title (Hausa):** Sauyawar Makamashi

**Script to read:**

> [INTRO] Yau za mu bi yadda makamashi yake sauyawa. [MAIN] Batiri zuwa fitila yana ba da haske. Lantarki zuwa fanka yana ba da motsi. Hasken rana yana dumama abubuwa. Abinci yana taimaka wa jiki yin motsi. Mai zuwa motsin mota misali ne na tunani kawai. [PAUSE 1] Wane sauyi ne yake faruwa a fanka? [MAIN] Tare da malami, ka zana kibiyoyi daga tushen makamashi zuwa sakamakonsa. Kada ka yi gwaji da wutar gida, soket, injin, ko mai. Hoto yana nuna sauyawa cikin aminci. [PAUSE 2] Makamashin abinci yana taimaka wa jiki yin me? [OUTRO] Duk lokacin da ka ga haske, zafi, ko motsi, ka tambayi inda makamashin ya fito da nau'in da ya koma.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane sauyi ne yake faruwa a fanka?" (correct answer: "lantarki zuwa motsi"; options: lantarki zuwa motsi, abinci zuwa ruwa, dutse zuwa iska)
- **[PAUSE 2]** — question shown to the learner: "Makamashin abinci yana taimaka wa jiki yin me?" (correct answer: "motsi"; options: motsi, zama ƙarfe, zama gilashi)

---

### `p5-socs-09` — The Nigerian Family — Change and Continuity

**Target filename:** `audio/p5-socs-09.mp3`
**Title (Hausa):** Iyalan Nijeriya — Sauyi da Abubuwan da Suke Ci Gaba

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi sauyi da ci gaba a iyalan Nijeriya. [MAIN] Wani gida yana da masu kula da yara da ’ya’yansu; wani yana da kakanni da sauran dangi kusa. Iyalai suna bayar da kulawa, tarbiyya, kariya, da taimako. [PAUSE 1] Wane abu ne yake ci gaba a iyali daga zamani zuwa zamani? [MAIN] Makaranta, sana’a, fasaha, tsadar rayuwa, ko sauya wurin zama suna iya sauya yadda ake raba aiki. Maza da mata za su iya raba alhaki gwargwadon hali da yarjejeniya. Yara su yi aikin da ya dace da shekarunsu. [PAUSE 2] Me yake taimaka wa iyali ya amsa sabon yanayi? [OUTRO] Ka kwatanta abu ɗaya da yake ci gaba da abu ɗaya da ya sauya a iyali, sannan ka nuna yadda adalci yake kiyaye zumunci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane abu ne yake ci gaba a iyali daga zamani zuwa zamani?" (correct answer: "girmama juna"; options: girmama juna, rashin kulawa, raina dangi)
- **[PAUSE 2]** — question shown to the learner: "Me yake taimaka wa iyali ya amsa sabon yanayi?" (correct answer: "sauraro, adalci, da sassauci"; options: sauraro, adalci, da sassauci, zargi da raini, ƙin tattaunawa)

---

### `p5-maths-10` — Common Denominators

**Target filename:** `audio/p5-maths-10.mp3`
**Title (Hausa):** Lambobin Ƙasa Na Gari

**Script to read:**

> [INTRO] Yau za mu koyi lambar ƙasa ta gari. [MAIN] Idan kashi biyu suna da lambobin ƙasa daban, sai mu nemo lambar ƙasa ɗaya da duka za su iya amfani da shi. 1 cikin 2 da 1 cikin 3 suna iya amfani da 6, domin 2 da 3 suna shiga 6. [PAUSE 1] Wace lambar ƙasa ta gari ya dace da 1 cikin 2 da 1 cikin 3? [MAIN] Bayan mun samu 6, 1 cikin 2 ya zama 3 cikin 6, 1 cikin 3 ya zama 2 cikin 6. Yanzu lambobin sama ne kawai za mu haɗa ko rage. [PAUSE 2] Bayan samun lambar ƙasa ta gari, wane ɓangare ne ake haɗawa ko ragewa? [OUTRO] Lambar ƙasa ta gari yana shirya kashi kafin ƙari ko ragi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace lambar ƙasa ta gari ya dace da 1 cikin 2 da 1 cikin 3?" (correct answer: "6"; options: 5, 6, 8)
- **[PAUSE 2]** — question shown to the learner: "Bayan samun lambar ƙasa ta gari, wane ɓangare ne ake haɗawa ko ragewa?" (correct answer: "lambobin sama"; options: lambobin sama, lambobin ƙasa, waƙafi)

---

### `p5-bsci-10` — Heat and Temperature

**Target filename:** `audio/p5-bsci-10.mp3`
**Title (Hausa):** Zafi da Matsayin Zafi ko Sanyi

**Script to read:**

> [INTRO] Yau za mu bambanta zafi da matsayin zafi ko sanyi. [MAIN] Zafi makamashi ne da kan motsa daga abu mafi zafi zuwa mafi sanyi. Matsayin zafi ko sanyi yana nuna yadda abu yake. Na'urar aunawa tana ba da adadi. Tare da malami, a kwatanta adadin yanayin ranaku biyu. [PAUSE 1] Daga ina zafi kan motsa? [MAIN] Kada ka taɓa abu mai zafi, wuta, ko tafasasshen ruwa. Babba ne ke jagorantar amfani da na'urar lafiya. Idan ba ka da lafiya, ka sanar da babba maimakon yi wa kanka magani. [PAUSE 2] Me na'urar auna matsayin zafi ko sanyi take bayarwa? [OUTRO] Adadi ya fi zato: ka kwatanta matsayin zafi cikin aminci, ka bar abubuwa masu zafi ga manya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Daga ina zafi kan motsa?" (correct answer: "daga mafi zafi zuwa mafi sanyi"; options: daga mafi zafi zuwa mafi sanyi, daga littafi zuwa fensir, daga inuwa zuwa sauti)
- **[PAUSE 2]** — question shown to the learner: "Me na'urar auna matsayin zafi ko sanyi take bayarwa?" (correct answer: "adadi"; options: adadi, abinci, waƙa)

---

### `p5-socs-10` — Education and Its Importance

**Target filename:** `audio/p5-socs-10.mp3`
**Title (Hausa):** Ilimi da Muhimmancinsa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi ilimi da muhimmancinsa. [MAIN] Ilimi yana ba mutum sani, basira, da damar amfani da abin da ya koya. Ana koyo a makaranta, a horaswar sana’a ko al’umma, da kuma daga iyaye, aiki, da lura da muhalli. [PAUSE 1] Waɗanne hanyoyi uku ne ake iya samun ilimi? [MAIN] Karatu da rubutu suna taimaka wa saƙo, takarda, da kuɗi. Shirin UBE yana faɗaɗa damar ilimin asali. ’Ya mace da ɗa namiji duk suna da haƙƙin koyo. Iyali, makaranta, al’umma, da hukuma su taimaka. [PAUSE 2] Shin ilimi yana ƙarewa da barin aji? [OUTRO] Ka bayyana abin da ka koya a makaranta, daga sana’a, da daga rayuwar yau da kullum, sannan ka nuna yadda hanyoyin suke taimakon juna.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne hanyoyi uku ne ake iya samun ilimi?" (correct answer: "makaranta, horaswa, da rayuwar yau da kullum"; options: makaranta, horaswa, da rayuwar yau da kullum, kasuwa, kogi, da hanya, riga, hula, da takalmi)
- **[PAUSE 2]** — question shown to the learner: "Shin ilimi yana ƙarewa da barin aji?" (correct answer: "a’a, ana ci gaba da koyo tsawon rayuwa"; options: a’a, ana ci gaba da koyo tsawon rayuwa, eh, koyo yana ƙarewa, eh, manya ba sa koyo)

---

### `p5-maths-11` — Adding Fractions with Unlike Denominators

**Target filename:** `audio/p5-maths-11.mp3`
**Title (Hausa):** Haɗa Kashi Masu Lambobin Ƙasa Daban

**Script to read:**

> [INTRO] Yau za mu haɗa kashi masu lambobin ƙasa daban. [MAIN] Kada ka haɗa lambobin ƙasa kai tsaye. Da farko ka nemo lambar ƙasa ta gari. 1 cikin 2 da 1 cikin 3 suna amfani da 6. Sai 1 cikin 2 ya zama 3 cikin 6, 1 cikin 3 ya zama 2 cikin 6. [PAUSE 1] 1 cikin 2 da 1 cikin 3 suna amfani da wace lambar ƙasa ta gari? [MAIN] Yanzu ka haɗa lambobin sama: 3 da 2 sun zama 5. Lambar ƙasa ta tsaya 6. Don haka 1 cikin 2 da 1 cikin 3 sun zama 5 cikin 6. [PAUSE 2] A 3 cikin 6 da 2 cikin 6, idan an haɗa, sabon lambar sama nawa ne? [OUTRO] Ka tuna: shirya lambobin ƙasa tukuna, sannan ka haɗa lambobin sama.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "1 cikin 2 da 1 cikin 3 suna amfani da wace lambar ƙasa ta gari?" (correct answer: "6"; options: 5, 6, 12)
- **[PAUSE 2]** — question shown to the learner: "A 3 cikin 6 da 2 cikin 6, idan an haɗa, sabon lambar sama nawa ne?" (correct answer: "5"; options: 5, 6, 12)

---

### `p5-bsci-11` — Battery, Insulated Wire, and Bulb: Simple Circuits

**Target filename:** `audio/p5-bsci-11.mp3`
**Title (Hausa):** Batiri, Waya Mai Lulluɓi, da Ƙaramar Fitila

**Script to read:**

> [INTRO] Yau za mu bi hanyar lantarki a samfurin batiri mai aminci. [MAIN] Batiri, waya mai lulluɓi, da ƙaramar fitila suna yin samfurin aji. Fitila tana haska idan hanya daga batiri ta waya da fitila ta koma batiri ba tare da gibi ba. Maballi yana buɗe ko rufe hanyar. [PAUSE 1] Yaushe fitila take haskawa? [MAIN] Malami ne yake tanada da haɗa kayan. Yara su bi hanyar a hoto. Kada a taɓa soket, wutar gida, waya da ta fito fili, ko batiri da ya lalace; kada a saka ƙarfe cikin soket. [PAUSE 2] Me ke faruwa idan hanya tana da gibi? [OUTRO] Ka bi hanyar a hoto: cikakkiyar hanya tana haska fitila, gibi yana katse ta.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Yaushe fitila take haskawa?" (correct answer: "idan hanya ta cika"; options: idan hanya ta cika, idan waya ta rabu, idan babu batiri)
- **[PAUSE 2]** — question shown to the learner: "Me ke faruwa idan hanya tana da gibi?" (correct answer: "fitila ba ta haskawa"; options: fitila ba ta haskawa, fitila ta zama ruwa, batiri ya zama fensir)

---

### `p5-socs-11` — Nigeria and Africa — ECOWAS and the African Union

**Target filename:** `audio/p5-socs-11.mp3`
**Title (Hausa):** Nijeriya da Afirka — ECOWAS da Tarayyar Afirka

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi ECOWAS da Tarayyar Afirka. [MAIN] ECOWAS ƙungiya ce ta Yammacin Afirka da aka kafa a shekara ta 1975 domin haɗin kan tattalin arziki da hulɗar yankin. Tana taimaka wa ciniki, sufuri, sadarwa, noma, da zirga-zirga bisa yarjejeniyoyi. [PAUSE 1] Wane yanki ne ECOWAS take haɗa ƙasashensa? [MAIN] Tarayyar Afirka, wato AU, ƙungiya ce ta nahiyar da aka ƙaddamar a 2002. Tana ƙarfafa haɗin kai, zaman lafiya, tsaro, da ci gaba. Mambobin ƙungiya na iya sauyawa, don haka a duba sabon bayanin hukuma. [PAUSE 2] Me Tarayyar Afirka take ƙarfafawa? [OUTRO] Ka bambanta su: ECOWAS tana mai da hankali ga Yammacin Afirka, Tarayyar Afirka kuma ga nahiyar baki ɗaya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane yanki ne ECOWAS take haɗa ƙasashensa?" (correct answer: "Yammacin Afirka"; options: Yammacin Afirka, Gabashin Asiya, Arewacin Turai)
- **[PAUSE 2]** — question shown to the learner: "Me Tarayyar Afirka take ƙarfafawa?" (correct answer: "haɗin kai, zaman lafiya, tsaro, da ci gaba"; options: haɗin kai, zaman lafiya, tsaro, da ci gaba, rufe iyakoki duka, hana ƙasashe tattaunawa)

---

### `p5-maths-12` — Subtracting Fractions with Unlike Denominators

**Target filename:** `audio/p5-maths-12.mp3`
**Title (Hausa):** Rage Kashi Masu Lambobin Ƙasa Daban

**Script to read:**

> [INTRO] Yau za mu rage kashi masu lambobin ƙasa daban. [MAIN] Da farko ka nemo lambar ƙasa ta gari. 1 cikin 2 rage 1 cikin 3 suna amfani da 6. 1 cikin 2 ya zama 3 cikin 6, 1 cikin 3 ya zama 2 cikin 6. [PAUSE 1] 1 cikin 2 rage 1 cikin 3 suna amfani da wace lambar ƙasa ta gari? [MAIN] Sai ka rage lambobin sama: 3 rage 2 ya zama 1. Lambar ƙasa ta tsaya 6. Don haka amsar ita ce 1 cikin 6. [PAUSE 2] A 3 cikin 6 rage 2 cikin 6, sabon lambar sama nawa ne? [OUTRO] Ka tuna: lambar ƙasa ta gari tukuna, sannan rage lambobin sama.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "1 cikin 2 rage 1 cikin 3 suna amfani da wace lambar ƙasa ta gari?" (correct answer: "6"; options: 1, 5, 6)
- **[PAUSE 2]** — question shown to the learner: "A 3 cikin 6 rage 2 cikin 6, sabon lambar sama nawa ne?" (correct answer: "1"; options: 1, 3, 6)

---

### `p5-bsci-12` — Magnets and Magnetic Materials

**Target filename:** `audio/p5-bsci-12.mp3`
**Title (Hausa):** Maganadisu da Abubuwan da Yake Jan Hankalinsu

**Script to read:**

> [INTRO] Yau za mu gano abubuwan da maganadisu yake ja. [MAIN] Maganadisu yana jan wasu abubuwan baƙin ƙarfe, amma ba kowane ƙarfe ba. Yana da ɓangarori biyu a ƙarshe. Wasu ƙarshen suna jan juna, masu kama kuma suna ture juna. [PAUSE 1] Shin maganadisu yana jan kowane ƙarfe? [MAIN] Malami zai gwada ƙusa marar kaifi, itace, roba, da takarda; yara su rarraba “an ja” da “ba a ja ba.” Kada a sa maganadisu a baki. A nisanta shi da waya, kwamfuta, katin ajiya, da na'urori masu laushi. [PAUSE 2] Wane abu ne maganadisu zai iya ja? [OUTRO] Gwajin “an ja ko ba a ja ba” yana nuna cewa kayan da suke kama ba lallai halayensu su zama ɗaya ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Shin maganadisu yana jan kowane ƙarfe?" (correct answer: "a'a"; options: a'a, eh, duka, yana jan ruwa kawai)
- **[PAUSE 2]** — question shown to the learner: "Wane abu ne maganadisu zai iya ja?" (correct answer: "ƙusa ta baƙin ƙarfe"; options: ƙusa ta baƙin ƙarfe, ɗan itace, takarda)

---

### `p5-socs-12` — Nigeria and the World — United Nations

**Target filename:** `audio/p5-socs-12.mp3`
**Title (Hausa):** Nijeriya da Duniya — Majalisar Ɗinkin Duniya

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi Majalisar Ɗinkin Duniya. [MAIN] An kafa UN a 1945 domin haɗin gwiwa kan zaman lafiya, tsaro, haƙƙin ɗan Adam, ci gaba, da taimakon jin ƙai. Babban Taro yana haɗa ƙasashe mambobi. Kwamitin Tsaro yana da babban alhakin zaman lafiya da tsaro na duniya. [PAUSE 1] Wane ɓangare ne yake haɗa dukkan ƙasashe mambobi domin tattaunawa? [MAIN] UNICEF tana aiki domin haƙƙin yara, lafiya, ilimi, ruwa, da kariya. Nijeriya ta zama mamba a ranar 7 ga Oktoba, 1960, kuma tana shiga tattaunawa da ayyukan haɗin gwiwa. [PAUSE 2] Wane rukuni ne UNICEF take mayar da hankali a kai? [OUTRO] Ka haɗa kowane suna da aikinsa: Babban Taro, Kwamitin Tsaro, da UNICEF, sannan ka tuna cewa rawarsu ba iri ɗaya ba ce.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane ɓangare ne yake haɗa dukkan ƙasashe mambobi domin tattaunawa?" (correct answer: "Babban Taro"; options: Babban Taro, ajin makaranta, ƙungiyar kasuwa)
- **[PAUSE 2]** — question shown to the learner: "Wane rukuni ne UNICEF take mayar da hankali a kai?" (correct answer: "yara"; options: yara, motoci, masana’antu)

---

### `p5-maths-13` — Decimal Place Value

**Target filename:** `audio/p5-maths-13.mp3`
**Title (Hausa):** Darajar Matsayin Desimal

**Script to read:**

> [INTRO] Yau za mu koyi darajar matsayin desimal. [MAIN] Alamar desimal tana raba cikakkiyar lamba da ƙananan ɓangarori. A 3.4, lamba 3 tana nuna guda uku, lamba 4 tana nuna kashi huɗu cikin goma. [PAUSE 1] A 3.4, wace lamba ce ke matsayi na goma-goma? [MAIN] A 3.45, lamba 4 tana matsayi na goma-goma, lamba 5 tana matsayi na ɗari-ɗari. Sifili bayan alamar desimal zai iya riƙe matsayi. [PAUSE 2] A 3.45, wace lamba ce ke matsayi na ɗari-ɗari? [OUTRO] Ka tuna: matsayi bayan alamar desimal yana canza ƙimar lamba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A 3.4, wace lamba ce ke matsayi na goma-goma?" (correct answer: "4"; options: 3, 4, 7)
- **[PAUSE 2]** — question shown to the learner: "A 3.45, wace lamba ce ke matsayi na ɗari-ɗari?" (correct answer: "5"; options: 3, 4, 5)

---

### `p5-bsci-13` — Nutrients, Healthy Growth, and Deficiency Prevention

**Target filename:** `audio/p5-bsci-13.mp3`
**Title (Hausa):** Sinadaran Abinci da Lafiyayyen Girma

**Script to read:**

> [INTRO] Yau za mu fahimci dalilin da jiki yake bukatar sinadaran abinci iri-iri. [MAIN] Sinadaran abinci suna ba da makamashi, suna gina da gyara jiki, suna taimakon kariya. Rasa rukuni na dogon lokaci na iya kawo gajiya ko rashin girma yadda ya dace, amma yaro ba ya tantance kansa. Hatsi, wake, gyada, ƙwai, kifi, ganye, da 'ya'yan itatuwa misalai ne masu araha. Ruwa mai tsabta yana da muhimmanci. [PAUSE 1] Me ya sa jiki yake bukatar sinadaran abinci? [MAIN] Ka tsara farantin hoto mai hatsi, abinci mai gina jiki, da kayan lambu ko 'ya'yan itace. Kada a raina jikin wani ko abincin gidansu. Kada a sha ƙarin magani sai da shawarar ƙwararren lafiya ga babba. [PAUSE 2] Shin abinci mai tsada ne kawai yake da amfani? [OUTRO] Faranti mai nau'o'in abinci na gida da ruwa mai tsabta ya fi dogaro da abu guda kullum.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ya sa jiki yake bukatar sinadaran abinci?" (correct answer: "don makamashi, gini, da kariya"; options: don makamashi, gini, da kariya, don canza jiki zuwa dutse, don hana shan ruwa)
- **[PAUSE 2]** — question shown to the learner: "Shin abinci mai tsada ne kawai yake da amfani?" (correct answer: "a'a"; options: a'a, eh, koyaushe, ruwa kawai ne abinci)

---

### `p5-socs-13` — Cultural Diversity and National Unity

**Target filename:** `audio/p5-socs-13.mp3`
**Title (Hausa):** Bambancin Al’adu da Haɗin Kan Ƙasa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi bambancin al’adu da haɗin kan ƙasa. [MAIN] Nijeriya tana da al’ummomi, harsuna, addinai, sutura, abinci, da bukukuwa iri-iri. Babu wata ƙungiya da ta fi wata daraja. Haɗin kai yana nufin girmama bambanci, bin doka, da aiki tare. [PAUSE 1] Shin haɗin kai yana nufin kowa ya bar al’adarsa? [MAIN] A makaranta, ka saurari suna daidai, ka tambaya cikin ladabi, ka raba aiki ba tare da fifiko ba. Shirin NYSC yana taimaka wa wasu matasa su san al’ummomi dabam ta hidima. [PAUSE 2] Me za ka yi idan ka ji maganar da take raina wata ƙungiya? [OUTRO] Ka koyi kalma ko al’ada ɗaya daga aboki cikin ladabi, sannan ka faɗi yadda mutunta bambanci yake ƙarfafa Nijeriya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Shin haɗin kai yana nufin kowa ya bar al’adarsa?" (correct answer: "a’a, yana nufin girmama bambanci da aiki tare"; options: a’a, yana nufin girmama bambanci da aiki tare, eh, kowa ya bar al’adarsa, eh, a hana harsuna dabam)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan ka ji maganar da take raina wata ƙungiya?" (correct answer: "kada na maimaita ta"; options: kada na maimaita ta, in yaɗa ta, in ƙara raini)

---

### `p5-maths-14` — Comparing Decimals

**Target filename:** `audio/p5-maths-14.mp3`
**Title (Hausa):** Kwatanta Desimal

**Script to read:**

> [INTRO] Yau za mu kwatanta desimal. [MAIN] Ka fara da cikakkiyar lamba. Idan cikakkiyar lamba ta bambanta, babbar cikakkiyar lamba tana nuna babban desimal. Idan ta yi daidai, ka duba matsayi na goma-goma. [PAUSE 1] Wanne ya fi girma: 3.7 ko 3.4? [MAIN] Idan goma-goma iri ɗaya ne, ka duba ɗari-ɗari. Haka kuma 2.5 da 2.50 suna da daraja ɗaya, domin sifili a ƙarshe bai canza ƙima ba. [PAUSE 2] Shin 2.5 da 2.50 sun yi daidai ko ɗaya ya fi? [OUTRO] Ka kwatanta desimal daga hagu zuwa dama, matsayi bayan matsayi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wanne ya fi girma: 3.7 ko 3.4?" (correct answer: "3.7"; options: 3.7, 3.4, sun yi daidai)
- **[PAUSE 2]** — question shown to the learner: "Shin 2.5 da 2.50 sun yi daidai ko ɗaya ya fi?" (correct answer: "sun yi daidai"; options: 2.5 ya fi, 2.50 ya fi, sun yi daidai)

---

### `p5-bsci-14` — Diseases and Prevention

**Target filename:** `audio/p5-bsci-14.mp3`
**Title (Hausa):** Cututtuka da Hanyoyin Kariya

**Script to read:**

> [INTRO] Yau za mu koyi nau'o'in cuta da hanyoyin kariya. [MAIN] Wasu cututtuka na iya yaɗuwa; wasu ba sa yaɗuwa tsakanin mutane. Yaro ba ya tantance cuta. Wanke hannu, ruwa mai tsabta, abinci da aka rufe, da rufe baki da gwiwar hannu lokacin tari suna rage haɗari. Gidan sauro da zubar da ruwan da ya taru suna taimakon kariya. [PAUSE 1] Wace hanya ce take taimakon kariya daga sauro? [MAIN] Iyaye da ma'aikatan lafiya suna tsara rigakafi da ziyara. Idan ba ka da lafiya, ka sanar da babban da ka yarda da shi, ka bi shawarar ƙwararren lafiya. Kada ka sha magani da kanka ko ka ba wani naka. [PAUSE 2] Me yaro zai yi idan ba shi da lafiya? [OUTRO] Kariya aikin yau da kullum ce; tantancewa da magani kuma aikin manya da ƙwararrun lafiya ne.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace hanya ce take taimakon kariya daga sauro?" (correct answer: "amfani da gidan sauro"; options: amfani da gidan sauro, barin ruwa ya taru, kwana a waje)
- **[PAUSE 2]** — question shown to the learner: "Me yaro zai yi idan ba shi da lafiya?" (correct answer: "ya sanar da babba"; options: ya sanar da babba, ya sha magani da kansa, ya ɓoye)

---

### `p5-socs-14` — Leadership and Good Governance

**Target filename:** `audio/p5-socs-14.mp3`
**Title (Hausa):** Jagoranci da Kyakkyawan Mulki

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi jagoranci da kyakkyawan mulki. [MAIN] Shugaba mai kyau yana sauraro, faɗin gaskiya, bin doka, da bayyana amfani da kayan jama’a. Cin hanci da rashawa shi ne amfani da mukami ko kayan jama’a domin amfanin kai, ko karɓar kyauta domin sauya hukunci. [PAUSE 1] Wane hali ne shugaba mai kyau yake nunawa? [MAIN] ICPC tana bincike, rigakafi ta hanyar gyaran tsari, da ilimantar da jama’a kan rashawa. EFCC tana binciken laifukan tattalin arziki da kuɗi bisa doka. Kotu ce take tabbatar da laifi. [PAUSE 2] Wace hukuma ce take mai da hankali ga laifukan tattalin arziki da kuɗi? [OUTRO] Ka tambayi yadda ake amfani da kayan jama’a cikin ladabi, ka faɗi gaskiya, kuma kada ka jingina laifi ga wata ƙungiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane hali ne shugaba mai kyau yake nunawa?" (correct answer: "sauraro da faɗin gaskiya"; options: sauraro da faɗin gaskiya, ɓoye bayanai, son kai)
- **[PAUSE 2]** — question shown to the learner: "Wace hukuma ce take mai da hankali ga laifukan tattalin arziki da kuɗi?" (correct answer: "EFCC"; options: EFCC, ƙungiyar wasa, majalisar ɗalibai)

---

### `p5-maths-15` — Adding Decimals

**Target filename:** `audio/p5-maths-15.mp3`
**Title (Hausa):** Haɗa Desimal

**Script to read:**

> [INTRO] Yau za mu haɗa desimal. [MAIN] Ka fara da daidaita alamar desimal. A 2.3 da 1.4, goma-goma suna ƙarƙashin juna. 3 cikin goma da 4 cikin goma sun zama 7 cikin goma. [PAUSE 1] A 2.3 + 1.4, kashi na goma-goma ya zama nawa? [MAIN] Cikakkun lambobi 2 da 1 sun zama 3, don haka amsar ita ce 3.7. Idan ana bukata, ka ƙara sifili a ƙarshe don daidaita matsayi. [PAUSE 2] A 2.3 + 1.4, cikakkiyar lambar amsa nawa ce? [OUTRO] Ka tuna: alamar desimal ta tsaya a layi ɗaya kafin ƙari.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A 2.3 + 1.4, kashi na goma-goma ya zama nawa?" (correct answer: "7"; options: 3, 7, 14)
- **[PAUSE 2]** — question shown to the learner: "A 2.3 + 1.4, cikakkiyar lambar amsa nawa ce?" (correct answer: "3"; options: 1, 3, 7)

---

### `p5-bsci-15` — Harmful Substances and Drug-Awareness Safety

**Target filename:** `audio/p5-bsci-15.mp3`
**Title (Hausa):** Kariya Daga Abubuwa Masu Cutarwa

**Script to read:**

> [INTRO] Yau za mu koyi matakai masu aminci idan aka ba yaro abu mai cutarwa. [MAIN] Taba da giya ba su dace da yara ba. Kada ka karɓi maganin da iyaye, likita, ko ma'aikacin lafiya bai amince da shi ba. Maganin wani ba naka ba ne. [PAUSE 1] Me za ka ce idan aka ba ka irin wannan abu? [MAIN] Ka ce a'a, ka matsa zuwa wuri mai aminci, kada ka ɗanɗana, riƙe, karɓa, ko gwadawa, sannan ka sanar da babban da ka yarda da shi. Kada ka yi gardama ko bincike. A mutunta kowa ba tare da zagi ba. [PAUSE 2] Wa za ka sanar? [OUTRO] Ka haddace matakai uku: ka ce a'a, ka matsa, ka sanar da babban da ka yarda da shi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me za ka ce idan aka ba ka irin wannan abu?" (correct answer: "a'a"; options: a'a, zan gwada, zan riƙe)
- **[PAUSE 2]** — question shown to the learner: "Wa za ka sanar?" (correct answer: "babban da na yarda da shi"; options: babban da na yarda da shi, babu kowa, jariri)

---

### `p5-socs-15` — Revision and Assessment — P5 Social and Citizenship Studies

**Target filename:** `audio/p5-socs-15.mp3`
**Title (Hausa):** Bita da Tantancewa — Nazarin Zamantakewa na Aji Biyar

**Script to read:**

> [INTRO] Sannu da zuwa bitar Nazarin Zamantakewa na aji biyar. [MAIN] Ka tuna da albarkatu da kulawa da su, gurɓata muhalli, da shirin bala’i. Ka tuna kundin tsarin mulki, haƙƙoƙi da nauyi, da bin doka. [PAUSE 1] Waɗanne matakai uku ne yaro zai bi idan aka matsa masa ya karɓi taba, giya, ko maganin da ba a amince da shi ba? [MAIN] Saɓani yana bukatar natsuwa da sauraro. Iyali yana bukatar adalci; ilimi yana zuwa ta hanyoyi da dama. ECOWAS, Tarayyar Afirka, da Majalisar Ɗinkin Duniya suna haɗa ƙasashe. Bambancin al’adu yana bukatar mutunci, jagoranci kuma yana bukatar gaskiya da alhaki. [PAUSE 2] Me kundin tsarin mulki yake bayyana? [OUTRO] Ka zaɓi jigogi biyar daga albarkatu, muhalli, doka, lafiya, iyali, ilimi, haɗin gwiwar ƙasashe, al’adu, ko jagoranci; ka ba da gaskiya ɗaya da aikin ɗan ƙasa ɗaya daga kowanne.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne matakai uku ne yaro zai bi idan aka matsa masa ya karɓi taba, giya, ko maganin da ba a amince da shi ba?" (correct answer: "cewa a’a, barin wurin, da neman taimako"; options: cewa a’a, barin wurin, da neman taimako, karɓa, ɓoyewa, da gardama, raina mutum, zagi, da tsokana)
- **[PAUSE 2]** — question shown to the learner: "Me kundin tsarin mulki yake bayyana?" (correct answer: "tsarin ƙasa, iko, haƙƙoƙi, da nauyi"; options: tsarin ƙasa, iko, haƙƙoƙi, da nauyi, jadawalin wasa, farashin kasuwa)

---

### `p5-maths-16` — Subtracting Decimals

**Target filename:** `audio/p5-maths-16.mp3`
**Title (Hausa):** Rage Desimal

**Script to read:**

> [INTRO] Yau za mu rage desimal. [MAIN] Ka daidaita alamar desimal kafin ragi. A 9.8 rage 5.3, goma-goma suna ƙarƙashin juna. 8 rage 3 ya zama 5 a matsayi na goma-goma. [PAUSE 1] A 9.8 - 5.3, kashi na goma-goma ya zama nawa? [MAIN] Cikakkun lambobi 9 rage 5 sun zama 4, don haka amsar ita ce 4.5. Idan matsayi ya bambanta, ka ƙara sifili a ƙarshe don daidaitawa. [PAUSE 2] A 9.8 - 5.3, cikakkiyar lambar amsa nawa ce? [OUTRO] Ka tuna: daidaita alamar desimal, sannan ka rage matsayi da matsayi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A 9.8 - 5.3, kashi na goma-goma ya zama nawa?" (correct answer: "5"; options: 3, 5, 8)
- **[PAUSE 2]** — question shown to the learner: "A 9.8 - 5.3, cikakkiyar lambar amsa nawa ce?" (correct answer: "4"; options: 4, 5, 9)

---

### `p5-maths-17` — Meaning of Percentages

**Target filename:** `audio/p5-maths-17.mp3`
**Title (Hausa):** Ma'anar Kashi Cikin Ɗari

**Script to read:**

> [INTRO] Yau za mu koyi ma'anar kashi cikin ɗari. [MAIN] Kashi cikin ɗari yana nufin adadi daga cikin 100. Alamar % tana nuna shi. 25% yana nufin kashi 25 cikin 100. [PAUSE 1] 25% yana nufin kashi nawa cikin 100? [MAIN] 50% yana nufin 50 cikin 100, wato rabi. 10% yana nufin 10 cikin 100, wato 1 cikin 10. [PAUSE 2] 50% yana daidai da wane kashi na yau da kullum? [OUTRO] Ka tuna: percent yana magana ne game da kashi cikin ɗari.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "25% yana nufin kashi nawa cikin 100?" (correct answer: "25"; options: 25, 50, 100)
- **[PAUSE 2]** — question shown to the learner: "50% yana daidai da wane kashi na yau da kullum?" (correct answer: "1 cikin 2"; options: 1 cikin 2, 1 cikin 4, 1 cikin 10)

---

### `p5-maths-18` — Percentage Word Problems

**Target filename:** `audio/p5-maths-18.mp3`
**Title (Hausa):** Matsalolin Kashi Cikin Ɗari

**Script to read:**

> [INTRO] Yau za mu warware matsalolin kashi cikin ɗari. [MAIN] Ka tuna cewa 10% yana nufin 1 cikin 10. Idan 10% na 80 ake nema, sai ka raba 80 da 10, ka samu 8. [PAUSE 1] 10% na 80 nawa ne? [MAIN] 50% yana nufin rabi. Idan 50% na 80 ake nema, rabin 80 shi ne 40. 25% kuma yana nufin 1 cikin 4. [PAUSE 2] 50% na 80 nawa ne? [OUTRO] Ka fara da ma'anar percent, sannan ka yi rabo ko ninkawa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "10% na 80 nawa ne?" (correct answer: "8"; options: 8, 10, 18)
- **[PAUSE 2]** — question shown to the learner: "50% na 80 nawa ne?" (correct answer: "40"; options: 30, 40, 50)

---

### `p5-maths-19` — Introduction to Ratio and Proportion

**Target filename:** `audio/p5-maths-19.mp3`
**Title (Hausa):** Gabatarwa ga Rasiyo da Daidaiton Rabo

**Script to read:**

> [INTRO] Yau za mu fara rasiyo da daidaiton rabo. [MAIN] Rasiyo yana kwatanta adadi biyu. Idan ja 2 ne kuma shuɗi 3 ne, rasiyon ja zuwa shuɗi shi ne 2 zuwa 3. [PAUSE 1] Idan ja 2 ne kuma shuɗi 3 ne, rasiyon ja zuwa shuɗi nawa ne? [MAIN] Idan an ninka bangarorin biyu da lamba ɗaya, rasiyo bai canza ba. Daidaiton rabo yana nuna ƙaruwa iri ɗaya a bangarori. [PAUSE 2] Idan buhu 1 yana biyan yara 4, buhu 3 za su biya yara nawa? [OUTRO] Ka tuna: rasiyo yana kwatanta ɓangarori, daidaiton rabo yana ninka su daidai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan ja 2 ne kuma shuɗi 3 ne, rasiyon ja zuwa shuɗi nawa ne?" (correct answer: "2 zuwa 3"; options: 2 zuwa 3, 3 zuwa 2, 5 zuwa 2)
- **[PAUSE 2]** — question shown to the learner: "Idan buhu 1 yana biyan yara 4, buhu 3 za su biya yara nawa?" (correct answer: "12"; options: 7, 12, 16)

---

### `p5-maths-20` — Area and Perimeter of Composite Shapes

**Target filename:** `audio/p5-maths-20.mp3`
**Title (Hausa):** Yanki da Perimita na Haɗaɗɗun Siffofi

**Script to read:**

> [INTRO] Yau za mu koyi yanki da perimita na haɗaɗɗun siffofi. [MAIN] Don yanki, ka raba siffa zuwa rektangul masu sauƙi. Yankin rektangul shi ne tsawo × faɗi. [PAUSE 1] Idan tsawo 6 ne kuma faɗi 4 ne, yankin rektangul nawa ne? [MAIN] Don perimita, ka bi gefen waje kawai. Layin da ke cikin siffa ba ya cikin zagayen waje. [PAUSE 2] Perimita yana nufin auna wane ɓangare na siffa? [OUTRO] Ka tuna: yanki yana cika ciki, perimita yana zagaye waje.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan tsawo 6 ne kuma faɗi 4 ne, yankin rektangul nawa ne?" (correct answer: "24"; options: 10, 20, 24)
- **[PAUSE 2]** — question shown to the learner: "Perimita yana nufin auna wane ɓangare na siffa?" (correct answer: "gefen waje"; options: cikin siffa, gefen waje, launin siffa)

---

### `p5-maths-21` — Types and Measuring of Angles

**Target filename:** `audio/p5-maths-21.mp3`
**Title (Hausa):** Nau'o'in Kusurwa da Aunawa

**Script to read:**

> [INTRO] Yau za mu koyi nau'o'in kusurwa da aunawa. [MAIN] Kusurwa madaidaiciya tana da digiri 90. Ƙaramar kusurwa ba ta kai 90 ba. Babbar kusurwa ta fi 90 amma ba ta kai 180 ba. [PAUSE 1] Kusurwa madaidaiciya tana da digiri nawa? [MAIN] Madaidaicin layi yana da digiri 180. Idan an ba ka kusurwa ɗaya a layi, za ka iya rage ta daga 180 don samun sauran. [PAUSE 2] Madaidaicin layi yana da digiri nawa? [OUTRO] Ka tuna: ka auna kusurwa da digiri kuma ka kwatanta ta da 90 ko 180.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kusurwa madaidaiciya tana da digiri nawa?" (correct answer: "90"; options: 45, 90, 180)
- **[PAUSE 2]** — question shown to the learner: "Madaidaicin layi yana da digiri nawa?" (correct answer: "180"; options: 90, 100, 180)

---

### `p5-maths-22` — Introduction to Average or Mean

**Target filename:** `audio/p5-maths-22.mp3`
**Title (Hausa):** Gabatarwa ga Matsakaici

**Script to read:**

> [INTRO] Yau za mu koyi matsakaici, wato average ko mean. [MAIN] Don samun matsakaici, ka haɗa lambobi, sannan ka raba da yawan lambobin. 6 da 8 da 10 sun zama 24. [PAUSE 1] Jimillar 6, 8, da 10 nawa ce? [MAIN] Idan ka raba 24 da lambobi 3, matsakaici 8 ne. Idan an ba ka matsakaici da yawa, jimla ita ce matsakaici × yawa. [PAUSE 2] Matsakaicin 6, 8, da 10 nawa ne? [OUTRO] Ka tuna: matsakaici shi ne jimla raba yawan lambobi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Jimillar 6, 8, da 10 nawa ce?" (correct answer: "24"; options: 18, 24, 30)
- **[PAUSE 2]** — question shown to the learner: "Matsakaicin 6, 8, da 10 nawa ne?" (correct answer: "8"; options: 6, 8, 10)

---

### `p5-maths-23` — Word Problems with Combined Operations

**Target filename:** `audio/p5-maths-23.mp3`
**Title (Hausa):** Matsalolin Kalma Masu Haɗa Ayyuka

**Script to read:**

> [INTRO] Yau za mu warware matsalolin kalma masu haɗa ayyuka. [MAIN] Ka karanta tambaya, ka gano abin da ake nema, sannan ka zabi aiki. Idan abu yana da farashi ɗaya kuma an saya da yawa, ka yi ninkawa. [PAUSE 1] Idan littafi 4 ne, kowanne ₦200, kuɗinsu nawa ne? [MAIN] Idan an biya ₦1000, ka rage kuɗin littattafai daga 1000 don samun canji. Mataki-mataki ya fi haɗa lambobi ba tare da tunani ba. [PAUSE 2] Idan an biya ₦1000 kuma kuɗi ₦800 ne, canji nawa ne? [OUTRO] Ka tuna: karanta, tsara, yi mataki, sannan ka duba amsa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan littafi 4 ne, kowanne ₦200, kuɗinsu nawa ne?" (correct answer: "800"; options: 200, 400, 800)
- **[PAUSE 2]** — question shown to the learner: "Idan an biya ₦1000 kuma kuɗi ₦800 ne, canji nawa ne?" (correct answer: "200"; options: 100, 200, 800)

---

### `p5-maths-24` — P5 Mathematics Revision and Bridge to P6

**Target filename:** `audio/p5-maths-24.mp3`
**Title (Hausa):** Bitar Lissafin P5 da Gada Zuwa P6

**Script to read:**

> [INTRO] Yau za mu yi bitar P5 kuma mu shirya zuwa P6. [MAIN] Ka tuna lambobi, LCM, HCF, kashi, desimal, percent, rasiyo, yanki, perimita, kusurwa, matsakaici, da matsalolin kalma. [PAUSE 1] Idan ana neman bambanci, wane aiki kake yi? [MAIN] Idan ana neman ɓangare, ka duba kashi, percent, ko rasiyo. P6 zai gina kan wannan da manyan lambobi da algebra mai sauƙi. [PAUSE 2] Idan ana neman rabon daidai tsakanin adadi biyu, wane batu kake tuna? [OUTRO] Ka tuna: P5 tushe ne mai ƙarfi don P6.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan ana neman bambanci, wane aiki kake yi?" (correct answer: "ragi"; options: ƙari, ragi, yanki)
- **[PAUSE 2]** — question shown to the learner: "Idan ana neman rabon daidai tsakanin adadi biyu, wane batu kake tuna?" (correct answer: "rasiyo"; options: rasiyo, perimita, kusurwa)

---
