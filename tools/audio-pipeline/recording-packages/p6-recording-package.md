# AJAMIX Audio Recording Package — p6 (54 modules)

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

### `p6-maths-01` — Numbers up to 1,000,000

**Target filename:** `audio/p6-maths-01.mp3`
**Title (Hausa):** Lambobi Har Zuwa 1,000,000

**Script to read:**

> [INTRO] Yau za mu buɗe P6 da lambobi har zuwa miliyan ɗaya. [MAIN] Miliyan ɗaya ita ce 1,000,000. Idan ka ga 742,615, ka fara da dubu ɗari bakwai da arba'in da biyu, sannan ka karanta ɗari shida da goma sha biyar. Waƙafi yana taimaka maka ka raba lambobin rukuni uku-uku. [PAUSE 1] 1,000,000 tana nufin dubu ɗari nawa? [MAIN] Ka yi tunanin kuɗin babban aiki a makaranta ko yawan hatsi a sito. Manyan lambobi suna buƙatar karatu a hankali daga hagu zuwa dama. [PAUSE 2] A lamba 742,615, wace lamba ce a farkon rubutun? [OUTRO] Idan ka riƙe rukuni da waƙafi, karatun manyan lambobi zai yi sauƙi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "1,000,000 tana nufin dubu ɗari nawa?" (correct answer: "10"; options: 10, 100, 1,000)
- **[PAUSE 2]** — question shown to the learner: "A lamba 742,615, wace lamba ce a farkon rubutun?" (correct answer: "7"; options: 7, 4, 2)

---

### `p6-bsci-01` — The Solar System and Gravity

**Target filename:** `audio/p6-bsci-01.mp3`
**Title (Hausa):** Tsarin Rana da Ƙarfin Jan Ƙasa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi Tsarin Rana da ƙarfin jan Ƙasa. [MAIN] Tsarin Rana ya ƙunshi Rana da duniyoyi takwas da suke kewaye da ita. Rana tauraro ce kuma babban tushen haske da zafi ga tsarinmu. Ƙasa ita ce duniyarmu, Wata kuma yana kewaye da Ƙasa. Wata ba ya samar da haskensa; yana nuna hasken Rana ne. [PAUSE 1] Wace duniyar ce muke rayuwa a kanta? [MAIN] Ƙarfin jan Ƙasa yana jawo abubuwa zuwa gare ta. Idan ƙwallo mai laushi ta kubuce, tana komawa ƙasa. Samfurin ƙwallaye zai iya nuna jerin duniyoyi, amma ba zai nuna dukkan nisan gaskiya ba. A lura sau da yawa, a rubuta sakamako, kuma kada a jefa dutse ko abu mai nauyi. [PAUSE 2] Me ke jawo ƙwallo ta koma ƙasa? [OUTRO] Ka bambanta abin da samfurin yake nunawa da abin da hujjar lura take tabbatarwa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace duniyar ce muke rayuwa a kanta?" (correct answer: "Ƙasa"; options: Ƙasa, Rana, Wata)
- **[PAUSE 2]** — question shown to the learner: "Me ke jawo ƙwallo ta koma ƙasa?" (correct answer: "ƙarfin jan Ƙasa"; options: ƙarfin jan Ƙasa, hasken Wata, launin ƙwallo)

---

### `p6-socs-01` — Globalisation and Its Effects

**Target filename:** `audio/p6-socs-01.mp3`
**Title (Hausa):** Haɗuwar Duniya ta Ciniki, Fasaha, da Sadarwa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yadda duniya take ƙara haɗuwa. [MAIN] Ciniki, sufuri, sadarwa, fasaha, da musayar ilimi suna haɗa ƙasashe. Wayar hannu da intanet suna sa bayani ya yi saurin isa, kasuwanci kuma yana kai kaya tsakanin ƙasashe. Wannan yana buɗe damar koyo, aiki, da sabuwar fasaha. [PAUSE 1] Waɗanne abubuwa ne suke haɗa ƙasashe a yau? [MAIN] Haɗuwar duniya tana iya kawo gasa ga ƙananan sana’o’i ko bayanin ƙarya. Ba tana nufin a raina al’adar gida ba. Ɗan ƙasa ya binciki bayani, ya daraja al’adunsa, ya kuma koyi abin amfani daga wasu. [PAUSE 2] Me ya kamata ka yi kafin ka amince da bayanin da ya zo daga nesa? [OUTRO] Ka zaɓi kaya ko bayani ɗaya da ya ratsa ƙasashe, ka bayyana damarsa da ƙalubalensa ga Nijeriya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne abubuwa ne suke haɗa ƙasashe a yau?" (correct answer: "ciniki, sufuri, sadarwa, fasaha, da musayar ilimi"; options: ciniki, sufuri, sadarwa, fasaha, da musayar ilimi, rufe dukkan hanyoyi, hana musayar ilimi)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi kafin ka amince da bayanin da ya zo daga nesa?" (correct answer: "bincika sahihancinsa"; options: bincika sahihancinsa, yaɗa shi nan da nan, ƙara masa abin da babu)

---

### `p6-maths-02` — Place Value to Millions

**Target filename:** `audio/p6-maths-02.mp3`
**Title (Hausa):** Matsayin Lamba Har Zuwa Miliyan

**Script to read:**

> [INTRO] Yau za mu duba matsayin lamba har zuwa miliyan. [MAIN] A 586,304, 5 tana wurin dubu ɗari, don haka ƙimarta 500,000 ce. 8 tana wurin dubu goma, 6 tana wurin dubu, 3 tana wurin ɗari, 0 tana wurin goma, 4 tana wurin ɗaya. [PAUSE 1] A lamba 586,304, wace lamba ce a wurin dubu ɗari? [MAIN] A 1,000,000, 1 tana wurin miliyan. Ka rubuta jadawalin matsayi daga hagu zuwa dama domin ka gane ƙimar kowace lamba. [PAUSE 2] A 1,000,000, wane matsayi 1 take ciki? [OUTRO] Matsayi yana sa ka gane bambanci tsakanin rubutu da ƙimar lamba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A lamba 586,304, wace lamba ce a wurin dubu ɗari?" (correct answer: "5"; options: 5, 8, 6)
- **[PAUSE 2]** — question shown to the learner: "A 1,000,000, wane matsayi 1 take ciki?" (correct answer: "miliyan"; options: dubu ɗari, miliyan, dubu goma)

---

### `p6-bsci-02` — Earth's Movements, Day and Night

**Target filename:** `audio/p6-bsci-02.mp3`
**Title (Hausa):** Juyawar Ƙasa da Samuwar Rana da Dare

**Script to read:**

> [INTRO] Yau za mu koyi juyawar Ƙasa da samuwar rana da dare. [MAIN] Ƙasa tana juyawa a kanta cikin kusan sa'o'i ashirin da huɗu. Gefen da yake fuskantar Rana yana cikin hasken rana, ɗayan gefen kuma yana cikin dare. Ƙasa tana kuma kewaye da Rana cikin kusan shekara guda. [PAUSE 1] Me ke jawo sauyin rana zuwa dare? [MAIN] Ƙwallo da fitila suna iya zama samfurin Ƙasa da Rana, amma ba su nuna girma da nisan gaskiya ba. A kusufin Rana, Wata yana toshe wani hasken Rana; a husufin Wata, inuwar Ƙasa tana faɗa kan Wata. Kada ka kalli Rana kai tsaye ko da lokacin kusufin Rana. [PAUSE 2] Me ya sa ba za a kalli Rana kai tsaye ba? [OUTRO] Ka yi amfani da samfurin domin bayani, amma ka tuna iyakarsa da tsaron ido.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ke jawo sauyin rana zuwa dare?" (correct answer: "juyawar Ƙasa a kanta"; options: juyawar Ƙasa a kanta, ruwan sama, girgizar iska)
- **[PAUSE 2]** — question shown to the learner: "Me ya sa ba za a kalli Rana kai tsaye ba?" (correct answer: "tana iya cutar da ido"; options: tana iya cutar da ido, tana hana ruwa gudu, tana canza sa'a)

---

### `p6-socs-02` — Human Rights — Deeper Study

**Target filename:** `audio/p6-socs-02.mp3`
**Title (Hausa):** Haƙƙin Ɗan Adam — Nazari Mai Zurfi

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu zurfafa nazarin haƙƙin ɗan Adam. [MAIN] Akwai haƙƙoƙin jama’a da siyasa, kamar rayuwa, ’yanci, shari’a mai adalci, shiga harkokin jama’a, da zaɓe bisa doka. Akwai kuma haƙƙin aiki, ilimi, lafiya, abinci, ruwa, da al’adu. Duk suna taimakon juna. [PAUSE 1] Waɗanne misalai ne na haƙƙin zamantakewa? [MAIN] Idan an tauye haƙƙi, yaro kada ya rama. Ya tuna abin da ya faru, ya gaya wa amintaccen babba ko malami, sannan babba ya nemi hanyar doka kamar ƙorafi ko kotu. [PAUSE 2] Me yaro zai fara yi idan an tauye haƙƙinsa? [OUTRO] Ka haɗa haƙƙi ɗaya da hanyar lumana da doka da za a bi domin neman gyara.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne misalai ne na haƙƙin zamantakewa?" (correct answer: "ilimi, lafiya, abinci, da ruwa"; options: ilimi, lafiya, abinci, da ruwa, zagi, barazana, da rama, ɓoye korafi da hujja)
- **[PAUSE 2]** — question shown to the learner: "Me yaro zai fara yi idan an tauye haƙƙinsa?" (correct answer: "ya gaya wa amintaccen babba"; options: ya gaya wa amintaccen babba, ya rama da kansa, ya shiga haɗari)

---

### `p6-maths-03` — Addition and Subtraction Mastery

**Target filename:** `audio/p6-maths-03.mp3`
**Title (Hausa):** Ƙwarewa a Ƙari da Ragi

**Script to read:**

> [INTRO] Yau za mu ƙarfafa ƙari da ragi da manyan lambobi. [MAIN] Ka jera matsayi kafin ka fara: ɗaya, goma, ɗari, dubu, dubu goma. A ƙari, ka ɗauki ƙari idan adadi ya wuce tara. A ragi, ka aro idan wurin da kake ragewa bai isa ba. [PAUSE 1] Wace hanya ce ta duba 73,500 - 18,200 = 55,300? [MAIN] Kimantawa tana taimaka maka ka gane kuskure. Idan ka haɗa kusan 48,000 da 21,000, amsar za ta kusa 69,000, ba 20,000 ba. [PAUSE 2] Idan ka yi ragi, wace hanya ce za ta iya dawo da lambar farko? [OUTRO] Jera matsayi, yi aiki a hankali, sannan ka duba da aikin kishiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace hanya ce ta duba 73,500 - 18,200 = 55,300?" (correct answer: "55,300 + 18,200"; options: 55,300 + 18,200, 55,300 - 18,200, 73,500 + 18,200)
- **[PAUSE 2]** — question shown to the learner: "Idan ka yi ragi, wace hanya ce za ta iya dawo da lambar farko?" (correct answer: "ƙari"; options: ƙari, rabawa, ninkawa)

---

### `p6-bsci-03` — Weather Symbols, Climate Records, and Change

**Target filename:** `audio/p6-bsci-03.mp3`
**Title (Hausa):** Alamomin Yanayi da Rubuta Sauye-sauyensa

**Script to read:**

> [INTRO] Yau za mu koyi alamomin yanayi da yadda ake rubuta sauye-sauye. [MAIN] Yanayin rana yana iya zama mai zafi, sanyi, iska, gajimare, ko ruwan sama. Alamomi suna taimaka mana mu rubuta bayanai a jadawali. Yanayin da aka saba gani na dogon lokaci yana bukatar bayanai masu yawa, ba rana ɗaya kawai ba. [PAUSE 1] Me ya sa rana guda ba ta isa a yanke hukunci kan sauyin dogon yanayi ba? [MAIN] A Najeriya damina, rani, da hunturu ko harmattan suna shafar noma, ruwa, da tafiya. Ku lura a lokaci ɗaya kowace rana, ku rubuta alama, ku kwatanta sakamako. Kada a fita cikin tsawa, ambaliya, ko zafi mai tsanani. [PAUSE 2] Wace hanya ce take ƙarfafa hujjar lura da yanayi? [OUTRO] Bayanai masu maimaituwa suna taimaka mana mu bambanta sauyin rana da sauyin dogon lokaci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ya sa rana guda ba ta isa a yanke hukunci kan sauyin dogon yanayi ba?" (correct answer: "ana buƙatar bayanai na dogon lokaci"; options: ana buƙatar bayanai na dogon lokaci, alama ba ta da amfani, ruwan sama ba yanayi ba ne)
- **[PAUSE 2]** — question shown to the learner: "Wace hanya ce take ƙarfafa hujjar lura da yanayi?" (correct answer: "maimaita lura a rubuta sakamako"; options: maimaita lura a rubuta sakamako, yin zato ba tare da lura ba, canza lokacin lura kullum)

---

### `p6-socs-03` — Gender Equality and Women's Empowerment

**Target filename:** `audio/p6-socs-03.mp3`
**Title (Hausa):** Daidaiton Matsayin Mata da Maza a Zama Ƴan Ƙasa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi daidaiton matsayin mata da maza a zama ƴan ƙasa. [MAIN] ’Ya mace da ɗa namiji suna da mutunci da haƙƙin koyo. Yarinya za ta iya bunƙasa basirarta kuma ta bi duk wata sana’a ta halal da doka ta yarda da ita. Mata suna hidima a ilimi, lafiya, noma, shari’a, kasuwanci, fasaha, da ayyukan al’umma. [PAUSE 1] Wane haƙƙi ne ’ya mace da ɗa namiji suke da shi? [MAIN] Hidimar ɗan ƙasa da ƙwarewa ba su taƙaita ga jinsi ɗaya ba. A raba aikin rukuni bisa basira, a saurari kowa, kuma kada a raina burin wani saboda jinsi. [PAUSE 2] Ta yaya ɗalibi zai nuna adalci a aikin rukuni? [OUTRO] Ka ambaci sana’a ta halal ɗaya da yarinya za ta iya bi, sannan ka bayyana yadda ilimi yake taimaka mata.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane haƙƙi ne ’ya mace da ɗa namiji suke da shi?" (correct answer: "haƙƙin koyo"; options: haƙƙin koyo, hana yarinya karatu, raina basirar wani)
- **[PAUSE 2]** — question shown to the learner: "Ta yaya ɗalibi zai nuna adalci a aikin rukuni?" (correct answer: "raba aiki bisa basira"; options: raba aiki bisa basira, raba aiki bisa jinsi, hana wasu magana)

---

### `p6-maths-04` — Multiplication Mastery

**Target filename:** `audio/p6-maths-04.mp3`
**Title (Hausa):** Ƙwarewa a Ninkawa

**Script to read:**

> [INTRO] Yau za mu yi ninkawa da sauri da tsari. [MAIN] Ninkawa yana nufin rukuni masu daidai adadi. Idan kana da kujeru 48 a cikin aji shida, 48 × 6 ya fi ƙara 48 sau shida sauri. Ka raba lamba idan ta yi girma. [PAUSE 1] 48 × 6 yana nufin ƙara 48 sau nawa? [MAIN] Idan lamba tana da sifili, ka ninka sashen farko sannan ka mayar da sifili. 3,000 × 7 ya zama 21,000. [PAUSE 2] 3,000 × 7 nawa ne? [OUTRO] Ninkawa mai kyau yana haɗa sanin rukuni, matsayi, da duba amsa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "48 × 6 yana nufin ƙara 48 sau nawa?" (correct answer: "6"; options: 4, 6, 8)
- **[PAUSE 2]** — question shown to the learner: "3,000 × 7 nawa ne?" (correct answer: "21,000"; options: 2,100, 21,000, 210,000)

---

### `p6-bsci-04` — Forces and Friction

**Target filename:** `audio/p6-bsci-04.mp3`
**Title (Hausa):** Ƙarfi da Guga Tsakanin Abubuwa

**Script to read:**

> [INTRO] Yau za mu koyi ƙarfi da guga tsakanin abubuwa. [MAIN] Ƙarfi na iya zama tura ko ja. Yana iya fara motsi, dakatar da shi, ko sauya sauri, alkibla, da siffa. Guga yana hana saman abubuwa biyu zamewa cikin sauƙi. Yana taimaka wa tafiya da birki, amma yana iya haifar da zafi da goge saman abu. [PAUSE 1] Wane amfani guga yake da shi wajen tafiya? [MAIN] A kwatanci mai adalci, a yi amfani da abu ɗaya da tura iri ɗaya, a canza saman kawai. A auna nisa, a maimaita, a rubuta sakamako. Yi amfani da ƙaramin abin wasa, ba mota ko kayan nauyi ba. [PAUSE 2] Me ya kamata a canza kawai yayin kwatanta guga a saman biyu? [OUTRO] Ka sarrafa abin da kake canzawa domin sakamakon ya zama hujja mai kyau.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane amfani guga yake da shi wajen tafiya?" (correct answer: "yana hana ƙafa zamewa"; options: yana hana ƙafa zamewa, yana kashe haske, yana samar da ruwa)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata a canza kawai yayin kwatanta guga a saman biyu?" (correct answer: "nau'in saman"; options: nau'in saman, abin da ake turawa, wurin farawa da tura)

---

### `p6-socs-04` — Sustainable Development

**Target filename:** `audio/p6-socs-04.mp3`
**Title (Hausa):** Ci Gaba Mai Kare Damar Masu Zuwa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi ci gaba mai kare damar masu zuwa. [MAIN] Irin wannan ci gaba yana haɗa tattalin arziki, zamantakewa, da muhalli. Sana’a da aiki suna cikin tattalin arziki; ilimi, lafiya, da adalci suna cikin zamantakewa; ƙasa, ruwa, iska, dazuzzuka, da dabbobi suna cikin muhalli. [PAUSE 1] Waɗanne ginshiƙai uku ne ci gaba mai kyau yake haɗawa? [MAIN] Ginshiƙan suna taimakon juna. Famfon ruwa yana kare lafiya, rage ɓarna, kuma gyaransa yana samar da sana’a. Ɗalibi zai iya kula da ruwa, littafi, itace, da tsaftar makaranta. [PAUSE 2] Wane aikin ɗalibi ne yake kare damar masu zuwa? [OUTRO] Ka tsara ƙaramin aikin makaranta da zai taimaka wa tattalin arziki, jama’a, da muhalli a lokaci ɗaya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne ginshiƙai uku ne ci gaba mai kyau yake haɗawa?" (correct answer: "tattalin arziki, zamantakewa, da muhalli"; options: tattalin arziki, zamantakewa, da muhalli, wasa, barci, da yawo, ruwa, takarda, da takalmi)
- **[PAUSE 2]** — question shown to the learner: "Wane aikin ɗalibi ne yake kare damar masu zuwa?" (correct answer: "rage ɓarnar ruwa"; options: rage ɓarnar ruwa, barin famfo yana zuba, lalata littattafai)

---

### `p6-maths-05` — Division Mastery

**Target filename:** `audio/p6-maths-05.mp3`
**Title (Hausa):** Ƙwarewa a Rabawa

**Script to read:**

> [INTRO] Yau za mu ƙarfafa rabawa da manyan lambobi. [MAIN] Rabawa yana nufin raba abu daidai ko gano yawan rukuni. Idan 240 ÷ 6 = 40, za ka duba ta da 40 × 6. [PAUSE 1] Wace hanya ce ta duba 240 ÷ 6 = 40? [MAIN] Ka kula da sifili. 4,800 ÷ 6 yana ba 800, domin 800 × 6 ya koma 4,800. [PAUSE 2] 4,800 ÷ 6 nawa ne? [OUTRO] Rabawa da ninkawa abokan duba juna ne.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace hanya ce ta duba 240 ÷ 6 = 40?" (correct answer: "40 × 6"; options: 40 × 6, 40 + 6, 240 × 6)
- **[PAUSE 2]** — question shown to the learner: "4,800 ÷ 6 nawa ne?" (correct answer: "800"; options: 80, 800, 8,000)

---

### `p6-bsci-05` — The Heart, Blood Vessels, and Circulation

**Target filename:** `audio/p6-bsci-05.mp3`
**Title (Hausa):** Zuciya, Jijiyoyin Jini, da Zagayawar Jini

**Script to read:**

> [INTRO] Yau za mu koyi zuciya, jijiyoyin jini, da zagayawar jini. [MAIN] Zuciya tsoka ce da take tura jini. Wasu manyan jijiyoyi suna kai jini daga zuciya, wasu suna dawo da shi, ƙananan jijiyoyi kuma suna haɗa hanyoyin a sassan jiki. Jini yana kai iskar da jiki ke bukata da sinadaran abinci. [PAUSE 1] Mene ne babban aikin zuciya a wannan tsari? [MAIN] Tare da babba, za a iya jin bugawar jijiya a wuyan hannu kafin da bayan tafiya a hankali, a ƙirga da rubuta sakamako. Wannan lura ba ganewar cuta ba ce. Kada a matsa wuya ko a yi motsi mai tsanani. Idan kana jin ciwo ko jiri, ka tsaya ka sanar da babba. [PAUSE 2] Me za ka yi idan ka ji jiri yayin lura da bugawar jijiya? [OUTRO] Zagayawar jini tsarin haɗin gwiwa ne, kuma lura mai aminci ba ya maye gurbin ma'aikacin lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne babban aikin zuciya a wannan tsari?" (correct answer: "tura jini ya zagaya jiki"; options: tura jini ya zagaya jiki, narkar da abinci, samar da ƙashi)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan ka ji jiri yayin lura da bugawar jijiya?" (correct answer: "ka tsaya ka sanar da babba"; options: ka tsaya ka sanar da babba, ka ci gaba da gudu, ka ɓoye abin da ka ji)

---

### `p6-socs-05` — Electoral Process — Deeper Study

**Target filename:** `audio/p6-socs-05.mp3`
**Title (Hausa):** Matakan Zaɓe — Nazari Mai Zurfi

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi matakan zaɓe a dimokuradiyya. [MAIN] INEC tana kula da rajista, bayanin zaɓe, kayan aiki, wuraren jefa ƙuri’a, ƙirga ƙuri’u, tattara sakamako, da sanarwa bisa doka. ’Yan takara suna bayyana shirye-shiryensu amma dole su bi doka. [PAUSE 1] Wace hukuma ce take shirya manyan zaɓuɓɓukan ƙasa? [MAIN] Wanda ya cancanta yana jefa ƙuri’a sau ɗaya a ɓoye. Ana ƙirga ƙuri’u, tattara sakamako, sannan jami’in da doka ta ba iko ya sanar. Ƙorafin sakamako yana bi ta hanyar ƙarar zaɓe, hujja, da doka. [PAUSE 2] Wace hanya ce ta dace idan akwai ƙorafin doka kan sakamakon zaɓe? [OUTRO] Ka jera matakai daga rajista zuwa sanar da sakamako, sannan ka bayyana dalilin da ya sa jita-jita ba ta maye gurbin hujja ba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace hukuma ce take shirya manyan zaɓuɓɓukan ƙasa?" (correct answer: "INEC"; options: INEC, ƙungiyar wasa, kasuwar unguwa)
- **[PAUSE 2]** — question shown to the learner: "Wace hanya ce ta dace idan akwai ƙorafin doka kan sakamakon zaɓe?" (correct answer: "shigar da ƙarar zaɓe"; options: shigar da ƙarar zaɓe, yaɗa jita-jita, yin barazana)

---

### `p6-maths-06` — Rounding and Estimating Large Numbers

**Target filename:** `audio/p6-maths-06.mp3`
**Title (Hausa):** Kiyasta da Zagaye Manyan Lambobi

**Script to read:**

> [INTRO] Yau za mu yi kiyasta da zagaye manyan lambobi. [MAIN] Kiyasta yana ba ka amsa mai kusa. Zagaye lamba yana sa ta fi sauƙin aiki. 48,620 zuwa dubu mafi kusa ya zama 49,000. [PAUSE 1] 48,620 idan an zagaye ta zuwa dubu mafi kusa, me za ta zama? [MAIN] Ka duba matsayi na gaba. Idan ya kai 5 ko fiye, ka ɗaga; idan bai kai 5 ba, ka bar lambar. Wannan yana taimaka maka ka gano amsar da ba ta yi ma'ana ba. [PAUSE 2] Idan matsayi na gaba ya kai 5 ko fiye, me kake yi? [OUTRO] Kiyasta da zagaye suna taimaka maka ka duba amsa kafin ka amince da ita.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "48,620 idan an zagaye ta zuwa dubu mafi kusa, me za ta zama?" (correct answer: "49,000"; options: 48,000, 49,000, 50,000)
- **[PAUSE 2]** — question shown to the learner: "Idan matsayi na gaba ya kai 5 ko fiye, me kake yi?" (correct answer: "ka ɗaga"; options: ka ɗaga, ka rage, ka share lambar)

---

### `p6-bsci-06` — Puberty, Hygiene, and Body Privacy

**Target filename:** `audio/p6-bsci-06.mp3`
**Title (Hausa):** Balaga, Tsafta, da Sirrin Jiki

**Script to read:**

> [INTRO] Yau za mu koyi balaga, tsafta, da sirrin jiki. [MAIN] Balaga mataki ne na girma daga yarinta zuwa samartaka. Jiki na iya ƙara tsawo, samun gashi a wasu wurare, yawan zufa, ko canjin fata. Muryar wasu samari tana zurfafa; wasu 'yan mata kuma suna fara jinin al'ada. Lokaci ya bambanta ga kowa, don haka ba a yi wa wani dariya. [PAUSE 1] Me ya sa bai dace a yi wa wani dariya saboda sauyin balaga ba? [MAIN] A kula da wanka, tufafi masu tsabta, wanke hannu, da kayan jinin al'ada. Sassan da ake rufewa na sirri ne. Idan wani abu ya sa ka ji tsoro ko rashin daɗi, ka matsa zuwa wuri mai aminci ka sanar da babban mutum da ka amince da shi. [PAUSE 2] Wa za ka tambaya idan kana da tambayar lafiya game da balaga? [OUTRO] Sauyin balaga na al'ada ne; tsafta, mutunta juna, da neman taimako suna kare lafiya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ya sa bai dace a yi wa wani dariya saboda sauyin balaga ba?" (correct answer: "lokacin sauyin ya bambanta ga kowa"; options: lokacin sauyin ya bambanta ga kowa, kowa yana sauyawa rana ɗaya, sauyin ba na girma ba ne)
- **[PAUSE 2]** — question shown to the learner: "Wa za ka tambaya idan kana da tambayar lafiya game da balaga?" (correct answer: "babban mutum ko ma'aikacin lafiya da na amince da shi"; options: babban mutum ko ma'aikacin lafiya da na amince da shi, duk wani baƙo, wanda zai yi mini dariya)

---

### `p6-socs-06` — The Nigerian Judiciary — Protecting Rights

**Target filename:** `audio/p6-socs-06.mp3`
**Title (Hausa):** Reshen Shari’a na Nijeriya — Kare Haƙƙoƙi

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yadda reshen shari’a yake kare haƙƙoƙi. [MAIN] Kotunan majistare suna fara shari’o’i da yawa. Manyan Kotuna suna sauraron muhimman shari’o’i da wasu ɗaukaka ƙara. Kotun Ɗaukaka Ƙara tana duba takamaiman hukunci. Kotun Koli ita ce kotu mafi girma. [PAUSE 1] Wace kotu ce mafi girma a Nijeriya? [MAIN] Tsarin ba tsani guda ba ne. Akwai kotunan jihohi da na tarayya, kotunan Shari’a, da kotunan al’ada, kowacce da aikin da doka ta kayyade. Alƙali yana sauraro, duba hujja, da bin doka. [PAUSE 2] Shin duk shari’o’i suna bin hanya ɗaya ta kotuna? [OUTRO] Ka zana taswirar hanyoyi masu rassa, ba tsani guda ba, ka sanya rawar kowace kotu da aka koya.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace kotu ce mafi girma a Nijeriya?" (correct answer: "Kotun Koli ta Nijeriya"; options: Kotun Koli ta Nijeriya, kotun majistare, kotun al’ada)
- **[PAUSE 2]** — question shown to the learner: "Shin duk shari’o’i suna bin hanya ɗaya ta kotuna?" (correct answer: "a’a, akwai hanyoyi da tsare-tsare masu rassa"; options: a’a, akwai hanyoyi da tsare-tsare masu rassa, eh, tsani guda ne kawai, eh, babu bambancin aiki)

---

### `p6-maths-07` — Fraction Operations Mastery

**Target filename:** `audio/p6-maths-07.mp3`
**Title (Hausa):** Ƙwarewa a Aikin Kashi

**Script to read:**

> [INTRO] Yau za mu ƙarfafa aikin kashi a matakin P6. [MAIN] Idan lambobin ƙasa sun bambanta, ka nemo lambar ƙasa ta gari kafin ƙari ko ragi. Idan kana ninkawa, ka ninka sama da sama, ƙasa da ƙasa. Idan kana rabawa, ka juya kashi na biyu sannan ka ninka. [PAUSE 1] Kafin haɗa kashi masu lambobin ƙasa daban, me kake nema? [MAIN] Kada ka haɗa lambobin ƙasa kai tsaye. Ka mayar da kashi zuwa girma ɗaya, sannan ka yi aiki da lambobin sama. [PAUSE 2] A ninkawa na kashi, wane sassa ake ninkawa tare? [OUTRO] Aikin kashi ya fi sauƙi idan ka san irin aikin da kake yi kafin ka fara.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kafin haɗa kashi masu lambobin ƙasa daban, me kake nema?" (correct answer: "lambar ƙasa ta gari"; options: lambar ƙasa ta gari, alamar desimal, miliyan)
- **[PAUSE 2]** — question shown to the learner: "A ninkawa na kashi, wane sassa ake ninkawa tare?" (correct answer: "sama da sama, ƙasa da ƙasa"; options: sama da sama, ƙasa da ƙasa, sama da ƙasa kawai, ƙasa da sama kawai)

---

### `p6-bsci-07` — Human Reproduction, Growth, and Development

**Target filename:** `audio/p6-bsci-07.mp3`
**Title (Hausa):** Haihuwar Ɗan Adam, Girma, da Ci Gaba

**Script to read:**

> [INTRO] Yau za mu koyi haihuwar ɗan Adam, girma, da ci gaba. [MAIN] Tsarin haihuwar namiji yana samarwa da ɗaukar ƙwayoyin halittar namiji. Tsarin mace yana samar da ƙwayar halittar mace, kuma mahaifa ita ce inda jariri yake girma kafin haihuwa. [PAUSE 1] Ina jariri yake girma kafin haihuwa? [MAIN] Samuwar ciki tana farawa idan ƙwayoyin halittar namiji da mace sun haɗu. Ƙwayar da ta samu tana rarrabuwa ta girma a mahaifa. Wannan bayani na kimiyya ne, ba umarnin wani aiki ba. A yi amfani da zanen da malami ya amince da shi, kada ɗalibai su binciki jikin juna. [PAUSE 2] Wa ya dace ka tambaya idan kana da tambaya ta kanka? [OUTRO] Ilimin haihuwa yana bayyana yadda sabon rai yake girma, cikin mutunci da tsaron sirrin jiki.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Ina jariri yake girma kafin haihuwa?" (correct answer: "a mahaifa"; options: a mahaifa, a zuciya, a huhu)
- **[PAUSE 2]** — question shown to the learner: "Wa ya dace ka tambaya idan kana da tambaya ta kanka?" (correct answer: "babban mutum ko ma'aikacin lafiya da na amince da shi"; options: babban mutum ko ma'aikacin lafiya da na amince da shi, duk wani baƙo, wanda zai yaɗa sirrina)

---

### `p6-socs-07` — Social Cohesion — Inter-ethnic and Inter-religious Tolerance

**Target filename:** `audio/p6-socs-07.mp3`
**Title (Hausa):** Haɗin Kan Al’umma — Haƙuri Tsakanin Al’ummomi da Addinai

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi haɗin kan al’umma. [MAIN] Mutane masu bambancin harshe, ƙabila, addini, ko yanki suna iya zama ƴan ƙasa ɗaya su yi aiki tare. Haƙuri yana nufin sauraro cikin ladabi, ƙin zagi da nuna bambanci, mutunta doka, da haɗin gwiwa. [PAUSE 1] Shin haƙuri yana nufin dole kowa ya yi imani iri ɗaya? [MAIN] Idan rashin fahimta ya taso, masu shiga tsakani na iya taimaka wa tattaunawa, amma su saurari kowa ba tare da fifiko ba. Ɗalibi ya ƙi jita-jita kuma ya raba aiki cikin adalci. [PAUSE 2] Wane hali mai shiga tsakani yake bukata? [OUTRO] Ka ambaci aikin yau da kullum ɗaya da zai ƙara amincewa tsakanin abokan da suka bambanta.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Shin haƙuri yana nufin dole kowa ya yi imani iri ɗaya?" (correct answer: "a’a, yana nufin mutunta bambanci"; options: a’a, yana nufin mutunta bambanci, eh, a tilasta imani ɗaya, eh, a hana wasu magana)
- **[PAUSE 2]** — question shown to the learner: "Wane hali mai shiga tsakani yake bukata?" (correct answer: "sauraron kowa ba tare da fifiko ba"; options: sauraron kowa ba tare da fifiko ba, zaɓar ɓangare tun farko, ƙara jita-jita)

---

### `p6-maths-08` — Fractions to Decimals

**Target filename:** `audio/p6-maths-08.mp3`
**Title (Hausa):** Mayar da Kashi Zuwa Desimal

**Script to read:**

> [INTRO] Yau za mu mayar da kashi zuwa desimal. [MAIN] Kashi 1 cikin 2 ya zama 0.5. Kashi 1 cikin 4 ya zama 0.25. Idan lambar ƙasa 10 ce, kamar 7 cikin 10, desimal ya zama 0.7. [PAUSE 1] Kashi 1 cikin 2 ya zama wane desimal? [MAIN] Kashi masu lambar ƙasa 10 ko 100 suna nuna matsayi na goma-goma da ɗari-ɗari kai tsaye. Ka kula da sifili bayan alamar desimal. [PAUSE 2] Kashi 36 cikin 100 ya zama wane desimal? [OUTRO] Idan ka san goma-goma da ɗari-ɗari, mayar da kashi zuwa desimal zai yi sauƙi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kashi 1 cikin 2 ya zama wane desimal?" (correct answer: "0.5"; options: 0.5, 0.2, 0.25)
- **[PAUSE 2]** — question shown to the learner: "Kashi 36 cikin 100 ya zama wane desimal?" (correct answer: "0.36"; options: 0.36, 3.6, 0.036)

---

### `p6-bsci-08` — Air Pressure and Its Uses

**Target filename:** `audio/p6-bsci-08.mp3`
**Title (Hausa):** Matsin Iska da Amfaninsa

**Script to read:**

> [INTRO] Yau za mu koyi matsin iska da amfaninsa. [MAIN] Iska tana ɗaukar wuri kuma tana matsawa a kowane ɓangare. Idan kwalbar filastik tana rufe, iskar cikinta tana turawa. Famfon keke yana matsar da iska zuwa cikin taya, matsin iskar kuma yana sa taya ta tsaya. [PAUSE 1] Mene ne matsin iska? [MAIN] Bambancin matsin iska yana taimaka wa bututun tsotsa. Iska mai motsi kuma tana taimaka wa ƙyallen jirgin ruwa, jirgin takarda, ko injin iska. Siffa da nauyi suna canza yadda abu yake motsi a iska. Kada a dumama rufaffiyar kwalba ko a yi gwaji da wuta. [PAUSE 2] Me ya sa ba za a dumama rufaffiyar kwalba ba? [OUTRO] Iska ba komai ba ce; tana ɗaukar wuri, tana matsawa, kuma ana amfani da ita cikin aminci.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne matsin iska?" (correct answer: "turawar da iska take yi a kowane ɓangare"; options: turawar da iska take yi a kowane ɓangare, launin da iska take da shi, sautin da ruwa yake yi)
- **[PAUSE 2]** — question shown to the learner: "Me ya sa ba za a dumama rufaffiyar kwalba ba?" (correct answer: "matsi na iya ƙaruwa ya haifar da haɗari"; options: matsi na iya ƙaruwa ya haifar da haɗari, iska za ta zama abinci, kwalbar za ta zama takarda)

---

### `p6-socs-08` — Migration — Internal and International

**Target filename:** `audio/p6-socs-08.mp3`
**Title (Hausa):** Sauya Wurin Zama — Cikin Ƙasa da Ketare

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi sauya wurin zama cikin ƙasa da ketare. [MAIN] Ƙaura cikin ƙasa ba ta ketare iyakar Nijeriya; ƙaura zuwa wata ƙasa tana ketare iyaka. Aiki, karatu, kasuwanci, iyali, ko bala’i na iya sa mutane su sauya wurin zama. [PAUSE 1] Mene ne bambanci tsakanin ƙaura cikin ƙasa da ƙaura zuwa wata ƙasa? [MAIN] Mutumin da aka tilasta wa barin gida amma yana cikin ƙasarsa ya rasa matsuguni a cikin gida. Ɗan gudun hijira yana wajen ƙasarsa yana neman kariya. Dukansu suna da mutunci da haƙƙoƙi. UNHCR tana taimakawa wajen kariya. [PAUSE 2] Shin rasa matsuguni yana rage mutuncin mutum? [OUTRO] Ka kwatanta nau’ikan ƙaura biyu ta iyaka, dalili, da haƙƙin mutanen da abin ya shafa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne bambanci tsakanin ƙaura cikin ƙasa da ƙaura zuwa wata ƙasa?" (correct answer: "ɗaya ba ta ketare iyakar ƙasa, ɗaya tana ketarewa"; options: ɗaya ba ta ketare iyakar ƙasa, ɗaya tana ketarewa, dukansu ba sa canza wuri, dukansu suna cikin gari ɗaya)
- **[PAUSE 2]** — question shown to the learner: "Shin rasa matsuguni yana rage mutuncin mutum?" (correct answer: "a’a, mutum yana da mutunci da haƙƙoƙi"; options: a’a, mutum yana da mutunci da haƙƙoƙi, eh, ya rasa dukkan haƙƙi, eh, ba a saurare shi)

---

### `p6-maths-09` — Decimals to Percentages

**Target filename:** `audio/p6-maths-09.mp3`
**Title (Hausa):** Mayar da Desimal Zuwa Percent

**Script to read:**

> [INTRO] Yau za mu mayar da desimal zuwa percent. [MAIN] Percent yana nufin kashi cikin ɗari. Desimal 0.25 yana nufin 25 cikin 100, don haka 25%. Desimal 0.5 yana zama 50%, domin 0.5 daidai yake da 0.50. [PAUSE 1] Desimal 0.25 ya zama percent nawa? [MAIN] Idan desimal yana da ɗari-ɗari, karanta lambobin bayan alamar desimal a matsayin cikin 100. 0.37 ya zama 37%. [PAUSE 2] Desimal 0.8 ya zama percent nawa? [OUTRO] Desimal zuwa percent yana haɗa alamar desimal da ma'anar cikin ɗari.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Desimal 0.25 ya zama percent nawa?" (correct answer: "25%"; options: 25%, 2.5%, 250%)
- **[PAUSE 2]** — question shown to the learner: "Desimal 0.8 ya zama percent nawa?" (correct answer: "80%"; options: 8%, 80%, 800%)

---

### `p6-bsci-09` — Nigeria's Mineral Resources and Responsible Use

**Target filename:** `audio/p6-bsci-09.mp3`
**Title (Hausa):** Albarkatun Ma'adinai na Najeriya da Amfani Mai Alhaki

**Script to read:**

> [INTRO] Yau za mu koyi albarkatun ma'adinai na Najeriya da amfani mai alhaki. [MAIN] Ma'adinai abubuwa ne na halitta da ake samu a ƙasa ko duwatsu. Misalai sun haɗa da zinariya, kwal, dutsen ƙarfe, dutsen farar ƙasa, gishiri, da ɗanyen mai. Wasu daskararru ne, ɗanyen mai kuma ruwa ne. [PAUSE 1] Wane daga cikin ma'adinan nan yake ruwa? [MAIN] Ma'adinai suna taimaka wa masana'antu, gini, sufuri, da tattalin arziki, amma yawancinsu ba sa dawowa da sauri. A rage ɓarna, a sake sarrafa ƙarfe, a kare ruwa, a gyara wurin haƙa. Kada ɗalibi ya shiga ma'adana, ya taɓa ɗanyen mai, ko ya ƙona samfurin. [PAUSE 2] Wane aiki yake nuna amfani mai alhaki? [OUTRO] Albarkatun ƙasa suna da amfani, amma darajarsu tana tare da kare mutane da muhalli.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane daga cikin ma'adinan nan yake ruwa?" (correct answer: "ɗanyen mai"; options: ɗanyen mai, dutsen ƙarfe, gishiri)
- **[PAUSE 2]** — question shown to the learner: "Wane aiki yake nuna amfani mai alhaki?" (correct answer: "sake sarrafa ƙarfe da kare ruwa"; options: sake sarrafa ƙarfe da kare ruwa, zubar da mai a kogi, barin ramin haƙa a buɗe)

---

### `p6-socs-09` — Safety and Security — Staying Safe as a Citizen

**Target filename:** `audio/p6-socs-09.mp3`
**Title (Hausa):** Aminci da Tsaro — Yadda Ɗan Ƙasa Zai Tsare Kansa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi yadda ɗan ƙasa zai tsare kansa. [MAIN] Idan akwai haɗari na zahiri nan take, ka nisanta zuwa wuri mai aminci. Kada ka tsaya domin kallo. Idan ka ga abin da ba ka sani ba, kada ka taɓa, motsa, buɗe, ko ɗauka; ka gaya wa amintaccen babba. [PAUSE 1] Me za ka yi idan ka ga wani abu da ba ka sani ba? [MAIN] Ka bi umarnin babban ko jami’in da yake jagorantar mutane a gaggawa. Kada ka yaɗa jita-jita. Babba zai iya kiran lambar gaggawa da ta dace. Aikin yaro shi ne nisanta, bin umarni, da sanarwa. [PAUSE 2] Mene ne aikin yaro a lokacin gaggawa? [OUTRO] Ka maimaita matakai uku na aminci: nisanta, kada ka taɓa abin da ba ka sani ba, sannan ka sanar da amintaccen babba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me za ka yi idan ka ga wani abu da ba ka sani ba?" (correct answer: "kada na taɓa shi; in nisanta in sanar da babba"; options: kada na taɓa shi; in nisanta in sanar da babba, in buɗe shi domin dubawa, in ɗauka zuwa gida)
- **[PAUSE 2]** — question shown to the learner: "Mene ne aikin yaro a lokacin gaggawa?" (correct answer: "nisanta, bin umarni, da sanar da babba"; options: nisanta, bin umarni, da sanar da babba, binciken wurin shi kaɗai, tsayawa domin kallo)

---

### `p6-maths-10` — Fractions to Percentages

**Target filename:** `audio/p6-maths-10.mp3`
**Title (Hausa):** Mayar da Kashi Zuwa Percent

**Script to read:**

> [INTRO] Yau za mu mayar da kashi zuwa percent kai tsaye. [MAIN] Percent yana nufin cikin 100. Idan kana da 32 cikin 100, amsar 32% ce. Idan kana da 7 cikin 10, ka mayar da 10 zuwa 100, sai ya zama 70%. [PAUSE 1] Kashi 7 cikin 10 ya zama percent nawa? [MAIN] Kashi 1 cikin 4 ya zama 25%, kuma 1 cikin 5 ya zama 20%. Ka nemi hanyar mayar da lambar ƙasa zuwa 100. [PAUSE 2] Kashi 1 cikin 4 ya zama percent nawa? [OUTRO] Kashi zuwa percent ya fi sauƙi idan lambar ƙasa tana shiga 100 daidai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Kashi 7 cikin 10 ya zama percent nawa?" (correct answer: "70%"; options: 7%, 70%, 17%)
- **[PAUSE 2]** — question shown to the learner: "Kashi 1 cikin 4 ya zama percent nawa?" (correct answer: "25%"; options: 20%, 25%, 40%)

---

### `p6-bsci-10` — White Light, Primary Colours, and Pigments

**Target filename:** `audio/p6-bsci-10.mp3`
**Title (Hausa):** Farin Haske, Launukan Asali, da Launin Fenti

**Script to read:**

> [INTRO] Yau za mu koyi farin haske, launukan asali, da launin fenti. [MAIN] Farin haske ya ƙunshi launuka da dama. Gilashi mai siffar musamman da yake karkatar da haske zai iya raba su kamar bakan gizo. Launukan haske na asali su ne ja, kore, da shuɗi. Idan suka haɗu daidai, suna iya samar da farin haske. [PAUSE 1] Waɗanne launuka uku ne na asalin haske? [MAIN] Fenti da tawada ba sa haɗuwa kamar haske. Suna tsotse wasu launuka suna mayar da wasu zuwa ido, saboda haka kada a haɗa dokar haske da ta fenti. A yi gwaji da malami da fitila mai aminci; ba a amfani da gilashin da ya karye ko kallon Rana kai tsaye. [PAUSE 2] Me ya sa ba za mu ɗauki haɗa haske da haɗa fenti a matsayin abu ɗaya ba? [OUTRO] Ka bambanta haske da kayan launi, sannan ka bayyana abin da hujjar gwaji ta nuna.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne launuka uku ne na asalin haske?" (correct answer: "ja, kore, da shuɗi"; options: ja, kore, da shuɗi, baƙi, fari, da toka, launin ƙasa, zinariya, da azurfa)
- **[PAUSE 2]** — question shown to the learner: "Me ya sa ba za mu ɗauki haɗa haske da haɗa fenti a matsayin abu ɗaya ba?" (correct answer: "haske da fenti suna aiki ta hanyoyi dabam"; options: haske da fenti suna aiki ta hanyoyi dabam, fenti ba shi da launi, haske abu ne mai tauri)

---

### `p6-socs-10` — Technology and Society

**Target filename:** `audio/p6-socs-10.mp3`
**Title (Hausa):** Fasaha da Al’umma

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi fasaha da al’umma. [MAIN] Wayar hannu da intanet suna taimaka wa koyo, sadarwa, aiki, da kasuwanci. Amma ba kowane bayani ne gaskiya ba. A duba tushe, a kuma tambayi amintaccen babba. Kada a ba baƙo kalmar sirri, adireshi, ko hoton sirri. [PAUSE 1] Wane bayani bai kamata ka ba baƙo a intanet ba? [MAIN] Cin zarafi ta intanet yana kunyata ko cutar da wani. Kada ka rama ko ka ƙara yaɗawa. Ka adana hujjar da ta dace, ka toshe mai cutarwa idan zai yiwu, ka sanar da babba. [PAUSE 2] Me za ka yi idan ana cin zarafinka ta intanet? [OUTRO] Ka duba ɗabi’arka ta intanet: kare kalmar sirri, tabbatar da bayani, neman izini, da girmama mutane.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane bayani bai kamata ka ba baƙo a intanet ba?" (correct answer: "kalmar sirri, adireshi, ko hoton sirri"; options: kalmar sirri, adireshi, ko hoton sirri, sunan darasin makaranta, gaisuwa cikin ladabi)
- **[PAUSE 2]** — question shown to the learner: "Me za ka yi idan ana cin zarafinka ta intanet?" (correct answer: "kada na rama; in adana hujja in sanar da babba"; options: kada na rama; in adana hujja in sanar da babba, in yaɗa saƙon ga kowa, in ba baƙo kalmar sirri)

---

### `p6-maths-11` — Mixed Fractions, Decimals, and Percentages

**Target filename:** `audio/p6-maths-11.mp3`
**Title (Hausa):** Haɗa Kashi, Desimal, da Percent

**Script to read:**

> [INTRO] Yau za mu haɗa kashi, desimal, da percent. [MAIN] 0.5, 1 cikin 2, da 50% duk suna nufin rabi. 0.25, 1 cikin 4, da 25% duk suna nufin kwata ɗaya. Ka mayar da su zuwa nau'i ɗaya kafin aiki. [PAUSE 1] Wane percent ne ya dace da 0.5? [MAIN] Idan ana neman 25% na abu, ka iya ganin shi a matsayin 1 cikin 4. Idan ana ganin 0.75, ka iya mayar da shi 75% ko 3 cikin 4. [PAUSE 2] 25% yana daidai da wane kashi mai sauƙi? [OUTRO] Canza nau'i kafin lissafi yana rage ruɗani.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane percent ne ya dace da 0.5?" (correct answer: "50%"; options: 5%, 50%, 500%)
- **[PAUSE 2]** — question shown to the learner: "25% yana daidai da wane kashi mai sauƙi?" (correct answer: "1 cikin 4"; options: 1 cikin 4, 1 cikin 5, 1 cikin 2)

---

### `p6-bsci-11` — Drawing Instruments and Accurate Technical Lines

**Target filename:** `audio/p6-bsci-11.mp3`
**Title (Hausa):** Kayan Zane na Fasaha da Madaidaicin Layi

**Script to read:**

> [INTRO] Yau za mu koyi kayan zane na fasaha da madaidaicin layi. [MAIN] Ma'aunin tsayi yana auna tazara da zana madaidaicin layi. Ma'aunin T yana taimaka wa zana layi kwance, ma'aunin kusurwa kuma yana taimaka wa layi a tsaye ko kusurwa. Komfas na zane yana zana da'ira, mai raba tazara kuma yana kwatanta tazara. [PAUSE 1] Wane kayan aiki ne yake zana da'ira? [MAIN] Daidaito yana bukatar a daure takarda, a yi alama mai laushi, a daidaita kayan, sannan a sake duba awo. A auna santimita biyar sau biyu a kwatanta layukan. Kada a yi wasa da kayan mai kaifi ko wanda ya karye. [PAUSE 2] Me ya sa ake maimaita awo? [OUTRO] Kayan da ya dace, amfani cikin aminci, da sake duba awo suna samar da zane mai daidaito.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane kayan aiki ne yake zana da'ira?" (correct answer: "komfas na zane"; options: komfas na zane, allon zane, akwatin kayan aiki)
- **[PAUSE 2]** — question shown to the learner: "Me ya sa ake maimaita awo?" (correct answer: "domin a duba ko awon yana da tabbas"; options: domin a duba ko awon yana da tabbas, domin a ɓata takarda, domin a lanƙwasa ma'auni)

---

### `p6-socs-11` — Civic Role Models in Nigeria

**Target filename:** `audio/p6-socs-11.mp3`
**Title (Hausa):** Mutanen Koyi a Aikin Ɗan Ƙasa a Nijeriya

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi mutanen koyi a aikin ɗan ƙasa. [MAIN] Nana Asma’u ta faɗaɗa ilimin mata. Aminu Kano ya yi kira ga ilimi da adalcin jama’a. Funmilayo Ransome-Kuti ta kare damar mata da shiga harkokin jama’a. Herbert Macaulay ya nemi wakilci ta ƙungiya da rubutu. Wole Soyinka ya yi amfani da adabi wajen kare ’yancin faɗar ra’ayi. [PAUSE 1] Wace ce ta faɗaɗa ilimin mata ta koyarwa da rubuce-rubuce? [MAIN] Ana nazarin su ne domin hanyoyin hidimarsu, ba domin a ɗora su sama da doka ko a goyi bayan jam’iyya ba. [PAUSE 2] Waɗanne hanyoyi ne mutum zai iya hidima wa al’umma? [OUTRO] Ka zaɓi mutum ɗaya daga cikin biyar, ka bayyana gudunmawarsa da ƙaramin aikin da za ka kwaikwaya cikin doka.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wace ce ta faɗaɗa ilimin mata ta koyarwa da rubuce-rubuce?" (correct answer: "Nana Asma’u"; options: Nana Asma’u, Herbert Macaulay, Wole Soyinka)
- **[PAUSE 2]** — question shown to the learner: "Waɗanne hanyoyi ne mutum zai iya hidima wa al’umma?" (correct answer: "ilimantarwa, tsara jama’a, rubutu, sauraro, da kare haƙƙi"; options: ilimantarwa, tsara jama’a, rubutu, sauraro, da kare haƙƙi, raina jama’a da ɓoye gaskiya, lalata kaya da yaɗa jita-jita)

---

### `p6-maths-12` — Word Problems with Fractions and Percentages

**Target filename:** `audio/p6-maths-12.mp3`
**Title (Hausa):** Matsalolin Kashi, Desimal, da Percent

**Script to read:**

> [INTRO] Yau za mu warware matsalolin kashi, desimal, da percent. [MAIN] Ka fara da adadin farko. Idan tambaya ta ce 50% na 80, tana nufin rabi na 80. Idan ta ce 25% na 120, tana nufin 1 cikin 4 na 120. [PAUSE 1] 50% na abu yana nufin wane kashi mai sauƙi? [MAIN] Idan ka ga 0.3 na adadi, ka iya mayar da 0.3 zuwa 3 cikin 10. Ka karanta ko ana neman abin da aka samu ko abin da ya rage. [PAUSE 2] Kafin lissafi a matsalar kalmomi, me ya kamata ka nemo da farko? [OUTRO] Karatu mai kyau yana jagorantar lissafi mai kyau.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "50% na abu yana nufin wane kashi mai sauƙi?" (correct answer: "1 cikin 2"; options: 1 cikin 2, 1 cikin 4, 1 cikin 10)
- **[PAUSE 2]** — question shown to the learner: "Kafin lissafi a matsalar kalmomi, me ya kamata ka nemo da farko?" (correct answer: "adadin farko"; options: adadin farko, amfani da miliyan, zagaye zuwa dubu)

---

### `p6-bsci-12` — Hand Tools: Identification, Care, and Safety

**Target filename:** `audio/p6-bsci-12.mp3`
**Title (Hausa):** Kayan Aikin Hannu: Ganewa, Kulawa, da Tsaro

**Script to read:**

> [INTRO] Yau za mu koyi gane kayan aikin hannu, kulawa, da tsaro. [MAIN] Ma'auni da tef kayan aunawa ne. Fensir da mai raba tazara kayan yin alama ne. Zarto da abin sassaƙa katako kayan yanka ko sassautawa ne. Zaɓen kayan da ya dace yana rage kuskure. [PAUSE 1] Wane rukuni ne tef ɗin awo yake ciki? [MAIN] Kafin aiki, babba yana duba ko kayan ya tsage, ya yi tsatsa, ko hannunsa ya kwance. Bayan aiki, a goge, a busar, a adana. Ɗalibai su rarraba hotuna kawai; kada su taɓa kayan mai kaifi. [PAUSE 2] Wa ya kamata ya yi amfani da zarto? [OUTRO] Ka gane aikin kayan daga hotonsa, ka bar kayan mai kaifi ga malami ko ƙwararren babba.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Wane rukuni ne tef ɗin awo yake ciki?" (correct answer: "kayan aunawa"; options: kayan aunawa, kayan yanka, kayan dafa abinci)
- **[PAUSE 2]** — question shown to the learner: "Wa ya kamata ya yi amfani da zarto?" (correct answer: "malami ko ƙwararren babba"; options: malami ko ƙwararren babba, ɗalibi shi kaɗai, duk wanda yake son wasa)

---

### `p6-socs-12` — Population Growth and Civic Responsibility

**Target filename:** `audio/p6-socs-12.mp3`
**Title (Hausa):** Ƙaruwar Jama’a da Nauyin Ɗan Ƙasa

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi ƙaruwar jama’a da nauyin ɗan ƙasa. [MAIN] Yawan jama’a shi ne adadin mutanen wuri a wani lokaci. Ƙidayar jama’a da binciken hukuma suna taimaka wa tsara makarantu, asibitoci, ruwa, gidaje, sufuri, abinci, da ayyukan yi. [PAUSE 1] Me ake amfani da bayanin yawan jama’a wajen tsarawa? [MAIN] Jama’a masu yawa suna iya ƙara basira da kasuwa, amma hidimomi na iya fuskantar matsin lamba. Ɗan ƙasa ya ba da sahihin bayani, ya kula da kayan jama’a, ya rage ɓarna, ya shiga tattaunawa. [PAUSE 2] Wane nauyi ne ɗan ƙasa yake da shi lokacin ƙidayar hukuma? [OUTRO] Ka zaɓi hidima ɗaya a unguwa, ka nuna yadda bayanin yawan jama’a zai taimaka wajen tsara ta.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me ake amfani da bayanin yawan jama’a wajen tsarawa?" (correct answer: "makarantu, asibitoci, ruwa, gidaje, sufuri, abinci, da ayyukan yi"; options: makarantu, asibitoci, ruwa, gidaje, sufuri, abinci, da ayyukan yi, launin kayan makaranta, sunayen wasannin yara)
- **[PAUSE 2]** — question shown to the learner: "Wane nauyi ne ɗan ƙasa yake da shi lokacin ƙidayar hukuma?" (correct answer: "ba da sahihin bayani"; options: ba da sahihin bayani, ƙirƙirar adadi, ɓoye dukkan bayani)

---

### `p6-maths-13` — Ratio Scaling Practice

**Target filename:** `audio/p6-maths-13.mp3`
**Title (Hausa):** Atisayen Faɗaɗa Rasiyo

**Script to read:**

> [INTRO] Yau za mu yi atisayen faɗaɗa rasiyo. [MAIN] Rasiyo 2:3 yana nufin ɓangare 2 da ɓangare 3. Idan ka ninka duka ɓangarori da 4, rasiyon ya zama 8:12. Ma'anar rabon tana nan. [PAUSE 1] Idan rasiyo 2:3 an ninka duka ɓangarori da 4, me zai zama? [MAIN] Doka ita ce ka ninka ko ka raba duka ɓangarori da lamba ɗaya. Idan ka sauya ɓangare ɗaya kawai, rasiyon ya canza. [PAUSE 2] Don faɗaɗa rasiyo, ɓangarori nawa ake ninkawa da lamba ɗaya? [OUTRO] Ka riƙe cewa rasiyo yana buƙatar daidaito tsakanin ɓangarori.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan rasiyo 2:3 an ninka duka ɓangarori da 4, me zai zama?" (correct answer: "8:12"; options: 6:7, 8:12, 2:12)
- **[PAUSE 2]** — question shown to the learner: "Don faɗaɗa rasiyo, ɓangarori nawa ake ninkawa da lamba ɗaya?" (correct answer: "duka ɓangarori"; options: ɓangare ɗaya, duka ɓangarori, babu ɓangare)

---

### `p6-bsci-13` — Maintenance, Workshop Safety, and Road Safety

**Target filename:** `audio/p6-bsci-13.mp3`
**Title (Hausa):** Kulawa, Tsaron Wurin Aiki, da Tsaron Hanya

**Script to read:**

> [INTRO] Yau za mu koyi kulawa, tsaron wurin aiki, da tsaron hanya. [MAIN] Kulawar rigakafi ita ce dubawa da tsaftacewa kafin lalacewa. Gyaran kayan da ya lalace aikin ƙwararren mutum ne. Hular kariya, safar hannu, takalmin aiki, da abin kare ido suna taimaka wa tsaro. [PAUSE 1] Mene ne kulawar rigakafi? [MAIN] Fitilar hanya, alamar tsayawa, wurin tsallakar masu tafiya, bel ɗin mota, da alwatika mai kyalli suna taimaka wa tsaron hanya. Yaro ya tsallaka tare da babba a wurin da aka tanada. A yi nazari da hotuna daga aji, ba shiga hanya ko wurin aiki ba. [PAUSE 2] Me ya kamata ka yi idan ka ga kayan aiki ya lalace? [OUTRO] Kulawa tana hana matsala, amma horo, alamomi, da bin dokar tsaro ne suke kare rai.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne kulawar rigakafi?" (correct answer: "dubawa da tsaftacewa kafin lalacewa"; options: dubawa da tsaftacewa kafin lalacewa, jira kayan ya karye gaba ɗaya, jefa kayan bayan amfani)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata ka yi idan ka ga kayan aiki ya lalace?" (correct answer: "a matsa nesa a sanar da babba"; options: a matsa nesa a sanar da babba, a gyara shi kai kaɗai, a ɓoye shi a hanyar tafiya)

---

### `p6-socs-13` — Entrepreneurship and Self-Reliance

**Target filename:** `audio/p6-socs-13.mp3`
**Title (Hausa):** Kafa Sana’a da Dogaro da Kai

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi kafa sana’a da dogaro da kai. [MAIN] A gano bukata, a koyi ƙwarewa, a tsara kaya ko hidima, a rubuta kuɗin shiga da fita, kuma a kula da inganci. Dogaro da kai yana amfani da ilimi da basira, amma yana iya haɗawa da taimako da haɗin gwiwa. [PAUSE 1] Waɗanne matakai ne suke taimaka wa fara sana’a? [MAIN] Bankin Aikin Gona yana tallafa wa noma da kasuwancin noma. BOI yana tallafa wa wasu masana’antu da sana’o’i da kuɗi ko shawara bisa ƙa’idoji. Rance ba tabbaci ba ne; ana duba cancanta. [PAUSE 2] Me ya kamata mutum ya fahimta kafin ya karɓi bashi? [OUTRO] Ka tsara ƙaramin ra’ayin sana’a: bukatar da zai biya, ƙwarewar da ake bukata, da yadda za ka rubuta kuɗi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne matakai ne suke taimaka wa fara sana’a?" (correct answer: "gano bukata, koyon ƙwarewa, tsari, da rubuta kuɗi"; options: gano bukata, koyon ƙwarewa, tsari, da rubuta kuɗi, fara ba tare da lissafi ba, ɓoye ingancin kaya)
- **[PAUSE 2]** — question shown to the learner: "Me ya kamata mutum ya fahimta kafin ya karɓi bashi?" (correct answer: "sharuddan bashin"; options: sharuddan bashin, launin takarda, sunan mai kallo)

---

### `p6-maths-14` — Proportion Word Problems

**Target filename:** `audio/p6-maths-14.mp3`
**Title (Hausa):** Matsalolin Kalma na Daidaiton Rabo

**Script to read:**

> [INTRO] Yau za mu warware matsalolin kalma na daidaiton rabo. [MAIN] Idan littafi 1 yana biyan ₦80, littattafai 5 za su biya ₦400. Ka ninka farashin abu ɗaya da yawan abubuwa. [PAUSE 1] Idan littafi 1 ₦80 ne, littattafai 5 nawa ne? [MAIN] Wani lokaci za ka fara ragewa zuwa abu 1. Idan buhu 3 suna da mudu 24, buhu 1 yana da mudu 8. Sannan ka ninka zuwa yawan da ake nema. [PAUSE 2] Idan buhu 3 suna da mudu 24, buhu 1 yana da mudu nawa? [OUTRO] Daidaiton rabo yana bukatar ka riƙe ma'auni ɗaya daga farko zuwa ƙarshe.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan littafi 1 ₦80 ne, littattafai 5 nawa ne?" (correct answer: "₦400"; options: ₦85, ₦400, ₦800)
- **[PAUSE 2]** — question shown to the learner: "Idan buhu 3 suna da mudu 24, buhu 1 yana da mudu nawa?" (correct answer: "8"; options: 8, 21, 72)

---

### `p6-bsci-14` — Levers and Pulleys

**Target filename:** `audio/p6-bsci-14.mp3`
**Title (Hausa):** Sandar Ɗagawa da Na'urar Dabaran Igiya

**Script to read:**

> [INTRO] Yau za mu koyi sandar ɗagawa da na'urar dabaran igiya. [MAIN] Sandar ɗagawa tana juyawa a kan madogara. Tana da madogarar juyawa, kaya, da wurin turawa ko ja. Matsayin waɗannan sassa yana canza ƙarfin da ake bukata. [PAUSE 1] Waɗanne sassa uku ne na sandar ɗagawa? [MAIN] Na'urar dabaran igiya mai ɗaure tana iya sauya alkiblar jan igiya. Wadda take motsi tare da kaya tana iya rage ƙarfin ɗagawa, amma igiyar tana tafiya mai tsawo. A yi samfurin kaya marar nauyi tare da malami. Kada a ɗaga kaya mai nauyi ko a tsaya ƙarƙashinsa. [PAUSE 2] Mene ne bambanci tsakanin na'urar dabaran igiya mai ɗaure da mai motsi? [OUTRO] Ka gano madogara, kaya, da ƙarfi, sannan ka bayyana abin da na'urar ta canza.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne sassa uku ne na sandar ɗagawa?" (correct answer: "madogarar juyawa, kaya, da wurin turawa ko ja"; options: madogarar juyawa, kaya, da wurin turawa ko ja, haske, inuwa, da launi, iska, ruwa, da ƙasa)
- **[PAUSE 2]** — question shown to the learner: "Mene ne bambanci tsakanin na'urar dabaran igiya mai ɗaure da mai motsi?" (correct answer: "mai ɗaure yana zama a wuri, mai motsi yana tafiya tare da kaya"; options: mai ɗaure yana zama a wuri, mai motsi yana tafiya tare da kaya, dukansu ba sa amfani da igiya, mai motsi yana samar da lantarki)

---

### `p6-socs-14` — Peace Education and Conflict Prevention

**Target filename:** `audio/p6-socs-14.mp3`
**Title (Hausa):** Ilimin Zaman Lafiya da Hana Saɓani

**Script to read:**

> [INTRO] Sannu da zuwa. Yau za mu koyi ilimin zaman lafiya da hana saɓani. [MAIN] Zaman lafiya yana haɗa aminci, adalci, mutunci, sauraro, da warware saɓani cikin lumana. Ana hana matsala tsananta ta hanyar ƙa’idoji, raba aiki daidai, sauraron korafi da wuri, da gyara bayanin ƙarya. [PAUSE 1] Me zaman lafiya yake haɗawa bayan rashin faɗa? [MAIN] Matasa su ƙi jita-jita, su haɗa waɗanda aka ware, su yi aikin jama’a, su nemi mai shiga tsakani mai adalci. Idan akwai haɗari, yaro ya nisanta ya sanar da babba. [PAUSE 2] Wane aiki ne matashi zai iya yi domin hana saɓani? [OUTRO] Ka tsara aikin haɗin kai ɗaya da zai sa kowa ya samu rawa, a saurari ra’ayi, kuma a warware rashin fahimta da wuri.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Me zaman lafiya yake haɗawa bayan rashin faɗa?" (correct answer: "aminci, adalci, mutunci, sauraro, da mafita ta lumana"; options: aminci, adalci, mutunci, sauraro, da mafita ta lumana, zagi, jita-jita, da fifiko, barazana, rama, da raini)
- **[PAUSE 2]** — question shown to the learner: "Wane aiki ne matashi zai iya yi domin hana saɓani?" (correct answer: "ƙin jita-jita da haɗa waɗanda aka ware"; options: ƙin jita-jita da haɗa waɗanda aka ware, ƙara zagi da wariya, ɓoye korafi har ya tsananta)

---

### `p6-maths-15` — Introduction to Algebra

**Target filename:** `audio/p6-maths-15.mp3`
**Title (Hausa):** Gabatarwa ga Algebra

**Script to read:**

> [INTRO] Yau za mu fara algebra mai sauƙi. [MAIN] A algebra, harafi kamar x yana iya wakiltar lambar da ba a sani ba. A x + 5 = 12, x tana nufin lambar da idan aka ƙara 5 za ta ba 12. [PAUSE 1] A x + 5 = 12, x nawa ne? [MAIN] Ma'aunin lissafi yana nuna bangare biyu masu ƙima ɗaya. Idan ka samu amsa, ka mayar da ita ka duba ko bangarorin biyu sun daidaita. [PAUSE 2] A algebra, harafi kamar x yana wakiltar me? [OUTRO] Algebra tana ɓoye lamba cikin harafi, sannan lissafi ya taimaka maka ka gano ta.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A x + 5 = 12, x nawa ne?" (correct answer: "7"; options: 5, 7, 12)
- **[PAUSE 2]** — question shown to the learner: "A algebra, harafi kamar x yana wakiltar me?" (correct answer: "lambar da ba a sani ba"; options: lambar da ba a sani ba, alamar desimal, perimita)

---

### `p6-bsci-15` — Inclined Planes and P6 Science Consolidation

**Target filename:** `audio/p6-bsci-15.mp3`
**Title (Hausa):** Shimfiɗar Gangara da Maimaitawar Kimiyya ta P6

**Script to read:**

> [INTRO] Yau za mu koyi shimfiɗar gangara da yadda ake gina ƙarshe daga hujja. [MAIN] Shimfiɗar gangara fili ne da aka karkatar. Tana iya rage ƙarfin motsa kaya ta ƙara nisan tafiya. Gangara mai laushi tana bukatar ƙaramin ƙarfi amma tafiyar ta fi tsawo. [PAUSE 1] Mene ne abin da ake samu da abin da ake bayarwa idan gangara ta rage ƙarfi? [MAIN] A gwaji mai adalci, a yi amfani da abu iri ɗaya, a canza gangarar kawai, a rubuta sakamako, sannan a sake gwaji. Ƙarshe ya fito daga abin da aka gani, ba zato kawai ba. Kada a hau gangara ko a yi amfani da kaya mai nauyi. [PAUSE 2] Me ya sa ake canza abu ɗaya kawai a gwaji? [OUTRO] Ka yi hasashe, ka gwada cikin aminci, ka rubuta hujja, sannan ka faɗi abin da sakamakon ya nuna.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Mene ne abin da ake samu da abin da ake bayarwa idan gangara ta rage ƙarfi?" (correct answer: "ana bukatar ƙaramin ƙarfi amma ana yin tafiya mai tsawo"; options: ana bukatar ƙaramin ƙarfi amma ana yin tafiya mai tsawo, kayan yana rasa nauyinsa gaba ɗaya, ba a bukatar motsi ko kaɗan)
- **[PAUSE 2]** — question shown to the learner: "Me ya sa ake canza abu ɗaya kawai a gwaji?" (correct answer: "domin a san abin da ya jawo bambancin sakamako"; options: domin a san abin da ya jawo bambancin sakamako, domin a ƙara ruɗani, domin a guji rubuta sakamako)

---

### `p6-socs-15` — Revision and Consolidation — Bridge to JSS1

**Target filename:** `audio/p6-socs-15.mp3`
**Title (Hausa):** Bita da Ƙarfafawa — Shiri Zuwa Ajin Farko na Sakandare

**Script to read:**

> [INTRO] Sannu da zuwa bitar ƙarshe daga aji uku zuwa aji shida. [MAIN] Ka tuna ƙaramar hukuma, ayyukan jama’a, sufuri, sadarwa, noma, kasuwa, muhalli, da zama ɗan ƙasa. Ka haɗa alamomin Nijeriya, matakan gwamnati, rassa uku, kundin tsarin mulki, dimokuradiyya, da zaɓe. [PAUSE 1] Waɗanne rassa uku ne gwamnatin Nijeriya take da su? [MAIN] Ka tuna albarkatu, ilimi, sana’a, fasaha, ƙaura, yawan jama’a, haƙƙin ɗan Adam, kotuna, haɗin kai, aminci, da zaman lafiya. A sakandare za ka tambayi tushe, kwatanta hujja, sauraro, da tsara aikin ɗan ƙasa. [PAUSE 2] Waɗanne matakai ne za su taimaka maka ka tantance batun al’umma a sakandare? [OUTRO] Ka zaɓi jigogi huɗu, ɗaya daga kowane aji uku zuwa shida, ka haɗa su cikin bayani ɗaya da aikin ɗan ƙasa mai yiwuwa.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Waɗanne rassa uku ne gwamnatin Nijeriya take da su?" (correct answer: "reshen zartarwa, reshen kafa doka, da reshen shari’a"; options: reshen zartarwa, reshen kafa doka, da reshen shari’a, kasuwa, gona, da makaranta, sufuri, sadarwa, da wasa)
- **[PAUSE 2]** — question shown to the learner: "Waɗanne matakai ne za su taimaka maka ka tantance batun al’umma a sakandare?" (correct answer: "tambayar tushe, kwatanta hujja, sauraro, da tsara aiki"; options: tambayar tushe, kwatanta hujja, sauraro, da tsara aiki, yaɗa jita-jita da raini, ƙin hujja da ƙin sauraro)

---

### `p6-maths-16` — Multiplication and Division Equations

**Target filename:** `audio/p6-maths-16.mp3`
**Title (Hausa):** Ma'aunin Lissafi na Ninkawa da Rabawa

**Script to read:**

> [INTRO] Yau za mu warware ma'aunin lissafi na ninkawa da rabawa. [MAIN] Idan 4 × x = 28, x ita ce 7, domin 4 × 7 = 28. Harafi yana riƙe lambar da ba a sani ba. [PAUSE 1] A 4 × x = 28, x nawa ne? [MAIN] Idan x ÷ 5 = 6, x ita ce 30, domin 30 ÷ 5 = 6. Ka duba amsa ta mayar da ita cikin ma'aunin lissafi. [PAUSE 2] A x ÷ 5 = 6, x nawa ne? [OUTRO] Ninkawa da rabawa suna taimaka maka gano lambar da harafi ya ɓoye.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "A 4 × x = 28, x nawa ne?" (correct answer: "7"; options: 4, 7, 28)
- **[PAUSE 2]** — question shown to the learner: "A x ÷ 5 = 6, x nawa ne?" (correct answer: "30"; options: 11, 30, 1)

---

### `p6-maths-17` — Area and Perimeter Review

**Target filename:** `audio/p6-maths-17.mp3`
**Title (Hausa):** Bitar Yanki da Perimita

**Script to read:**

> [INTRO] Yau za mu yi bitar yanki da perimita. [MAIN] Yanki yana auna cikin siffa. Perimita yana auna zagayen waje. A rektangul, yanki shi ne tsawo × faɗi. [PAUSE 1] Rektangul mai tsawo 40 da faɗi 25 yana da yanki nawa? [MAIN] Perimita na rektangul shi ne 2 × (tsawo + faɗi). Idan ana maganar shinge a gefen fili, ka yi perimita. [PAUSE 2] Idan ana maganar zagayen waje, wane abu ake nema? [OUTRO] Ka bambanta cikin siffa da zagayen waje kafin ka fara lissafi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Rektangul mai tsawo 40 da faɗi 25 yana da yanki nawa?" (correct answer: "1,000"; options: 65, 130, 1,000)
- **[PAUSE 2]** — question shown to the learner: "Idan ana maganar zagayen waje, wane abu ake nema?" (correct answer: "perimita"; options: perimita, yanki, percent)

---

### `p6-maths-18` — Volume of a Cuboid

**Target filename:** `audio/p6-maths-18.mp3`
**Title (Hausa):** Girma na Kuboid

**Script to read:**

> [INTRO] Yau za mu koyi girma na kuboid. [MAIN] Kuboid yana da tsawo, faɗi, da tsayi. Girman kuboid shi ne tsawo × faɗi × tsayi. Idan 10, 6, da 4 ne, girma 240 ne. [PAUSE 1] Girman kuboid mai tsawo 10, faɗi 6, tsayi 4 nawa ne? [MAIN] Raka'ar girma tana amfani da cubic unit, kamar cm³. Yanki yana auna fuska, amma girma yana auna sarari a ciki. [PAUSE 2] Girman kuboid ana samu ta hanyar ninka waɗanne ma'auni uku? [OUTRO] Ka tuna: tsawo × faɗi × tsayi yana ba da girma na kuboid.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Girman kuboid mai tsawo 10, faɗi 6, tsayi 4 nawa ne?" (correct answer: "240"; options: 20, 120, 240)
- **[PAUSE 2]** — question shown to the learner: "Girman kuboid ana samu ta hanyar ninka waɗanne ma'auni uku?" (correct answer: "tsawo, faɗi, da tsayi"; options: tsawo, faɗi, da tsayi, tsawo da faɗi kawai, gefen waje kawai)

---

### `p6-maths-19` — Angle Sum in a Triangle

**Target filename:** `audio/p6-maths-19.mp3`
**Title (Hausa):** Jimlar Kusurwoyi a Alwatika

**Script to read:**

> [INTRO] Yau za mu koyi jimlar kusurwoyi a alwatika. [MAIN] Alwatika tana da kusurwa uku. Jimlar kusurwoyin cikin kowace alwatika ita ce 180 digiri. Idan ka san biyu, ka nemo abin da ya rage. [PAUSE 1] Jimlar kusurwoyin cikin alwatika nawa ce? [MAIN] Idan kusurwa biyu su ne 50 digiri da 60 digiri, jimlarsu 110 ce. Abin da ya rage zuwa 180 shi ne 70 digiri. [PAUSE 2] Idan kusurwa biyu su ne 50 da 60 digiri, kusurwa ta uku nawa ce? [OUTRO] Ka tuna: alwatika tana da kusurwa uku, kuma jimlarsu 180 digiri ce.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Jimlar kusurwoyin cikin alwatika nawa ce?" (correct answer: "180 digiri"; options: 90 digiri, 180 digiri, 360 digiri)
- **[PAUSE 2]** — question shown to the learner: "Idan kusurwa biyu su ne 50 da 60 digiri, kusurwa ta uku nawa ce?" (correct answer: "70 digiri"; options: 60 digiri, 70 digiri, 110 digiri)

---

### `p6-maths-20` — Angles in Triangles and Quadrilaterals

**Target filename:** `audio/p6-maths-20.mp3`
**Title (Hausa):** Kusurwoyi a Alwatika da Siffa Mai Gefe Huɗu

**Script to read:**

> [INTRO] Yau za mu kwatanta kusurwoyi a alwatika da siffa mai gefe huɗu. [MAIN] Alwatika tana da jimlar kusurwoyi 180 digiri. Siffa mai gefe huɗu tana da jimlar kusurwoyi 360 digiri. [PAUSE 1] Siffa mai gefe huɗu tana da jimlar kusurwoyi nawa? [MAIN] Idan rektangul yana da kusurwa huɗu na 90 digiri, jimla 360 ce. Idan ka san kusurwa uku, ka nemo abin da ya rage. [PAUSE 2] Rektangul yana da kusurwa madaidaiciya guda nawa? [OUTRO] Ka fara da yawan gefuna, sannan ka zaɓi 180 ko 360.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Siffa mai gefe huɗu tana da jimlar kusurwoyi nawa?" (correct answer: "360 digiri"; options: 90 digiri, 180 digiri, 360 digiri)
- **[PAUSE 2]** — question shown to the learner: "Rektangul yana da kusurwa madaidaiciya guda nawa?" (correct answer: "4"; options: 3, 4, 6)

---

### `p6-maths-21` — Reading Tables and Bar Charts

**Target filename:** `audio/p6-maths-21.mp3`
**Title (Hausa):** Karanta Teburi da Jadawalin Sanduna

**Script to read:**

> [INTRO] Yau za mu karanta tebur da jadawalin sanduna. [MAIN] Teburi yana da layuka da ginshiƙai. Jadawalin sanduna yana amfani da tsawon sanduna domin nuna adadi. [PAUSE 1] Sandar da ta fi tsawo tana nuna wane adadi? [MAIN] Don bambanci, ka cire ƙarami daga babba. Don jimla, ka haɗa adadin da tambaya ta nema. [PAUSE 2] Idan shinkafa 80 ce kuma wake 55 ne, bambanci nawa ne? [OUTRO] Ka karanta taken bayanai kafin ka fara lissafi.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Sandar da ta fi tsawo tana nuna wane adadi?" (correct answer: "adadi mafi yawa"; options: adadi mafi yawa, adadi mafi kaɗan, adadi babu)
- **[PAUSE 2]** — question shown to the learner: "Idan shinkafa 80 ce kuma wake 55 ne, bambanci nawa ne?" (correct answer: "25"; options: 25, 55, 135)

---

### `p6-maths-22` — Simple Probability with Counts

**Target filename:** `audio/p6-maths-22.mp3`
**Title (Hausa):** Sauƙaƙƙiyar Yiwuwar Faruwa da Ƙidaya

**Script to read:**

> [INTRO] Yau za mu fara yiwuwar faruwa da ƙidaya. [MAIN] Yiwuwar faruwa tana kallon zaɓuka. Idan jaka tana da ƙwallaye ja 3 da shuɗi 2, jimla 5 ce. [PAUSE 1] Idan ja 3 ne kuma shuɗi 2 ne, jimillar ƙwallaye nawa ce? [MAIN] Don ja, ka dubi ja daga cikin jimla. Don ba ja ba, ka ƙidaya sauran launuka. [PAUSE 2] A jaka mai ja 3 da shuɗi 2, ƙwallaye nawa ba ja ba ne? [OUTRO] Ka fara da jimla, sannan ka gano abin da tambaya take nema.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan ja 3 ne kuma shuɗi 2 ne, jimillar ƙwallaye nawa ce?" (correct answer: "5"; options: 2, 3, 5)
- **[PAUSE 2]** — question shown to the learner: "A jaka mai ja 3 da shuɗi 2, ƙwallaye nawa ba ja ba ne?" (correct answer: "2"; options: 2, 3, 5)

---

### `p6-maths-23` — Data and Probability Practice

**Target filename:** `audio/p6-maths-23.mp3`
**Title (Hausa):** Atisayen Bayanai da Yiwuwar Faruwa

**Script to read:**

> [INTRO] Yau za mu haɗa bayanai da yiwuwar faruwa. [MAIN] Teburi yana ba ka adadi. Idan zobo 12 ne kuma kunu 8 ne, jimla 20 ce. [PAUSE 1] Idan zobo 12 ne kuma kunu 8 ne, jimla nawa ce? [MAIN] Idan ana neman ba zobo ba, ka ƙidaya sauran zaɓuka. A misalin nan, ba zobo ba shi ne kunu 8. [PAUSE 2] Idan zobo 12 ne kuma kunu 8 ne, ba zobo ba nawa ne? [OUTRO] Ka karanta bayanai, sannan ka ƙidaya zaɓukan da tambaya take so.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan zobo 12 ne kuma kunu 8 ne, jimla nawa ce?" (correct answer: "20"; options: 8, 12, 20)
- **[PAUSE 2]** — question shown to the learner: "Idan zobo 12 ne kuma kunu 8 ne, ba zobo ba nawa ne?" (correct answer: "8"; options: 8, 12, 20)

---

### `p6-maths-24` — P6 Mathematics Revision and Bridge to JSS1

**Target filename:** `audio/p6-maths-24.mp3`
**Title (Hausa):** Bitar Lissafin P6 da Gada Zuwa JSS1

**Script to read:**

> [INTRO] Yau za mu yi bitar P6 kuma mu gina gada zuwa JSS1. [MAIN] Ka tuna lambobi har zuwa miliyan, ayyuka huɗu, kashi, desimal, percent, rasiyo, algebra, yanki, perimita, girma, kusurwa, bayanai, da yiwuwar faruwa. [PAUSE 1] Idan tambaya tana neman jimla, wane aiki kake yi? [MAIN] Idan harafi ya ɓoye lamba, ka yi algebra. Idan siffa ce, ka bambanta yanki, perimita, girma, da kusurwa. JSS1 zai gina kan wannan tushe. [PAUSE 2] Idan tambaya tana neman saura, wane aiki kake yi? [OUTRO] Ka shiga JSS1 da tunanin lissafi mai tsari da hujja.

**Pause context (not read aloud):**

- **[PAUSE 1]** — question shown to the learner: "Idan tambaya tana neman jimla, wane aiki kake yi?" (correct answer: "ƙari"; options: ƙari, ragi, perimita)
- **[PAUSE 2]** — question shown to the learner: "Idan tambaya tana neman saura, wane aiki kake yi?" (correct answer: "ragi"; options: ragi, ninkawa, digiri)

---
