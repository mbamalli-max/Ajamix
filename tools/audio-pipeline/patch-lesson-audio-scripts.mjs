#!/usr/bin/env node
import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const EXPECTED_MODULE_COUNT = 389;
const EXPECTED_TARGET_COUNT = 30;
const EXPECTED_LESSON_COUNT = 150;
const EXPECTED_PILOT_COUNT = 15;
const EXPECTED_NEW_COUNT = 135;
const EXPECTED_SUBJECT_COUNTS = new Map([
  ['Vocational Skills', 10],
  ['Philosophy', 10],
  ['Critical Thinking', 10],
]);
const PILOT_IDS = new Set(['V01', 'V02', 'V03']);

// These are the reviewed spoken-audio adaptations for every non-pilot adult card.
// Keeping them here makes each run deterministic and independently auditable.
const AUTHORED_SCRIPTS = {
  V04: [
    "Ka sa sakonka ya zama a fili. Mutane suna son ganin hoto na gaskiya, sunan kaya, farashi, da yadda za su tuntuɓe ka. Saƙo mai rikitarwa yana sa kwastoma ta wuce.",
    'Kalmar "Talla" tana nufin hanyar sanar da mutane abin da kake sayarwa.',
    'Kalmar "Kwastoma" tana nufin mutumin da yake sha\'awar saya ko ya riga ya saya.',
    'Ga misalin sabulun Halima. Halima ta saka hoton sabulunta a WhatsApp Status tare da farashi, girma, da lambar waya. Ta kuma rubuta ko ana kai kaya ko a\'a. Abin da wannan ya nuna shi ne, saboda bayanin ya fito a fili, mutanen da suka kira ta sun riga sun san abin da za su samu.',
    'Ka amsa cikin lokaci. Idan ka jinkirta amsa, kwastoma na iya komawa wani. Ka tsara lokacin da za ka duba sakonni kuma ka faɗi kuɗin kai ko lokacin isarwa tun farko.',
  ],
  V05: [
    'Alamun ja na zamba. Sako da ke matsa maka ka gaggauta, ya ɓoye cikakken bayani, ko ya nemi lambar sirri yana bukatar ka tsaya. Gaskiyar kasuwanci tana yarda a bincika.',
    'Kalmar "Zamba" tana nufin dabara ta yaudara domin a karɓi kuɗi ko bayanai ba da gaskiya ba.',
    'Kalmar "Tabbatarwa" tana nufin binciken hujja kafin a yarda da sako, mutum, ko biyan kuɗi.',
    'Ga misalin hoton canji na bogi. Wani ya turo wa Bello hoton transfer ya ce ya gama biya, ya nemi a saki kaya nan take. Bello ya duba asusunsa, bai ga kuɗi ba, don haka ya jira tabbacin banki kafin ya bada kaya. Abin da wannan ya nuna shi ne, jiran tabbacin gaskiya ya ceci Bello daga asara.',
    'Ka duba link da lambobi. Kar ka danna link daga wanda ba ka sani ba kuma kar ka raba lambar sirri. Idan labari ya yi kyau fiye da kima, ka nemi wata hujja daga hanya ta daban.',
  ],
  V06: [
    'Ka san abin da za ka iya tambaya. Idan ana neman kuɗi ko bayanai daga hukuma ko wani jami\'i, kana da haƙƙin tambayar dalili, suna, da takardar shaida. Wannan ba rashin kunya ba ne.',
    'Kalmar "Yanci" tana nufin haƙƙin da doka ta tanadar wa mutum ya nema a girmama shi.',
    'Kalmar "Rasit" tana nufin takardar shaidar abin da aka biya ko aka karɓa.',
    'Ga misalin kuɗin harabar kasuwa. Wani mai karbar kuɗi ya zo wajen Rabi ya bukaci ta biya nan take ba tare da rasit ba. Rabi ta nemi sunan ofishi da takarda sannan ta ce za ta biya ne kawai idan an ba ta shaida. Abin da wannan ya nuna shi ne, sanin haƙƙinta ya hana ta biyan kuɗi ba tare da hujja ba.',
    'Ka kai rahoto da hujja. Idan an ci zarafi, ka rubuta rana, lokaci, suna, da abin da ya faru. Rahoto mai hujja yana da ƙarfi fiye da zargi kawai.',
  ],
  V07: [
    'Rubutu kullum ya fi tunani. Idan ka dogara da kwakwalwa kadai, ƙananan kuɗi da kaya suna ɓacewa. Rubutu na yau da kullum yana sa gaskiyar kasuwa ta fito.',
    'Kalmar "Rikodi" tana nufin adana bayanin ciniki domin a iya dubawa daga baya.',
    'Kalmar "Stock" tana nufin jimillar kayan da suke hannun kasuwa domin sayarwa.',
    'Ga misalin littafin ciniki. Nasiru yana da shafin sayayya, shafin sayarwa, da shafin bashi a ƙaramin littafi. Duk yamma yana tara abin da ya shiga da abin da ya fita. Abin da wannan ya nuna shi ne, da wannan tsari ya gane wane kaya ne ke saurin karewa da inda asara ke faruwa.',
    'Me ya kamata ka rubuta. Ka rubuta sayayya, sayarwa, bashi, mayar da kaya, da kuɗin sufuri. Idan ka rasa rasit, ka rubuta bayanin cinikin nan da nan kafin ka manta.',
  ],
  V08: [
    'Ka bambanta VAT da kuɗinka. VAT ba riba ba ce. Idan ka tara shi a madadin gwamnati, dole ne ka rarrabe shi da kuɗin kasuwarka domin kada ka rikita lissafi.',
    'Kalmar "VAT" tana nufin harajin da ake ƙara wa wasu kaya da ayyuka a matakin saye.',
    'Kalmar "Rasit" tana nufin takardar da ke nuna farashi, biya, da duk wani karin haraji a fili.',
    'Ga misalin rasit mai VAT. Shagon Umar ya sayar da kaya, ya nuna farashin kaya daban sannan ya nuna adadin VAT daban a rasit. Wannan ya sauƙaƙa masa gane abin da ya shafi gwamnati da abin da ya rage na kasuwa. Abin da wannan ya nuna shi ne, ware VAT a fili yana rage ruɗani da cece-kuce da kwastoma.',
    'Idan ka yi shakka. Dokokin VAT suna bukatar a bincika su daga hukuma ko masani. Ka duba kafin ka ɗora haraji ko ka ce bai shafe ka ba.',
  ],
  V09: [
    'Ka tsaya kafin ka danna amincewa. A USSD ko manhajar banki, ka duba suna, adadi, da dalilin biyan kuɗi kafin ka tabbatar. Gaggawa ce ke sa mafi yawan kuskure.',
    'Kalmar "USSD" tana nufin lambar da ake bugawa a waya domin yin ayyukan banki ba tare da intanet ba.',
    'Kalmar "Tarihin ciniki" tana nufin jerinhin rubuce-rubucen biyan kuɗi da karɓa da aka yi.',
    'Ga misalin biyan kaya ga mai kaya. Zainab ta shirya tura kuɗi ga mai kawo mata leda. Kafin ta tabbatar, ta sake dubawa ta ga harafin suna ya bambanta da wanda ta saba gani, sai ta dakatar ta kira mai kayan. Abin da wannan ya nuna shi ne, sake duba suna ya hana ta aikawa ga asusun da ba daidai ba.',
    'Ka kare wayarka. Ka ɓoye lambar sirri, ka kulle wayarka, kuma ka duba sakon tabbatarwa bayan kowace mu\'amala. Idan waya ta bace, ka kira banki nan da nan.',
  ],
  V10: [
    'Ba kowa ya kamata ya ga bayaninka ba. Lambar sirri, lambobin tabbatarwa, hoton shaida, da bayanin asusu bai kamata su fita ga kowa ba. Ko mai kira ya ce daga banki ne, ka tantance ta wata hanya.',
    'Kalmar "Bayanan sirri" tana nufin bayanan da za su iya ba wani damar shiga asusunka ko sace sunanka.',
    'Kalmar "Kalmar sirri" tana nufin lambar ko kalmar da ke kulle waya ko asusu.',
    'Ga misalin kiran bogi. Wata mata ta kira Safiya ta ce akwai matsala a asusunta kuma ta nemi lambar tabbatarwa. Safiya ta ƙi bayarwa, ta kashe kiran, sannan ta kira lambar bankinta da kanta. Abin da wannan ya nuna shi ne, tantancewa ta hanya mai zaman kanta ta kare bayananta.',
    'Ka rage fallasa bayanai. Ka rufe takardun da ke ɗauke da bayanai, ka fita daga manhajojin banki idan ka gama, kuma kada ka bari wasu su ɗauki hoton katinka ko waya.',
  ],
  FL01: [
    'Maraba ga baƙo. Binta ta ga ana ba baƙo wurin zama kafin zance. Ta tambayi abin da wannan hali yake taimakawa a gida.',
    'Kalmar "Abin da aka saba" tana nufin halin da mutane ke maimaitawa saboda sun saba da shi.',
    'Kalmar "Manufa" tana nufin abin da ake son a samu ko a kula da shi ta wani aiki.',
    'Ga amsa biyu. An tambayi Binta abin da ya sa ake miƙa wurin zama. Ta ce zai sa baƙo ya huta kuma zance ya fara cikin natsuwa. Abin da wannan ya nuna shi ne, wannan amsa ta nuna abin da al\'adar ke taimakawa, ba wai ta ce an saba kawai ba.',
    'Ka tsaya ka tambaya. Tambayar manufa ba zargi ba ce. Hanya ce ta gane abin da ya sa ka riƙe wani hali a rayuwarka.',
  ],
  FL02: [
    'Kalmar nasara. Aisha da Musa sun yi zance game da nasara, amma kowane yana riƙe da wata ma\'ana a zuciyarsa.',
    'Kalmar "Ma\'ana" tana nufin abin da mutum yake nufi da kalma ko magana a wani wuri.',
    'Kalmar "Fayyacewa" tana nufin faɗin iyakar abin da kalma take nufi domin a gane ta a sarari.',
    'Ga abin da suka yarda su fayyace. Aisha ta ce tana nufin cimma burin aiki. Musa ya ce shi yana nufin samun lokacin iyali ma. Abin da wannan ya nuna shi ne, sun gano cewa kalma guda ce, amma ma\'anonin da suke amfani da su ba ɗaya ba ne.',
    'Kafin a ci gaba. Idan kalma mai nauyi ta kawo saɓani, ka tambayi abin da kowanne yake nufi da ita kafin a yi hukunci.',
  ],
  FL03: [
    'Lokacin ɗakin karatu. Hauwa da Sani sun bambanta kan buɗe ɗakin karatu da yamma. Tambayoyinsu ba duka iri ɗaya ba ne.',
    'Kalmar "Abin da za a iya dubawa" tana nufin maganar da za a iya bincika ta wajen ganin abin da ya faru ko yake akwai.',
    'Kalmar "Daraja" tana nufin abin da mutum yake ganin ya dace a kula da shi ko a ba muhimmanci.',
    'Ga tambayoyi uku. An tambayi mai kula ko zai samu zuwa da yamma, an fayyace lokacin yamma, sannan aka saurari abin da kowa ya fi damuwa da shi. Abin da wannan ya nuna shi ne, raba tambayoyin ya nuna ko ana neman bayani, ma\'ana, ko ana bayyana abin da ya fi muhimmanci.',
    'Kada a gauraya su. Idan ka gane irin saɓani, za ka san wace tambaya ce ta dace maimakon ka yi zance a fili ba tare da tsari ba.',
  ],
  FL04: [
    'Ruwa daga rufi. Kabiru ya ga ruwa daga wuri guda, sai ya ce dukan rufin gidan ya lalace. Ya ɗauki matsaya mai faɗi.',
    'Kalmar "Bayanan farawa" tana nufin abubuwan da mutum ya ɗauka daidai kafin ya gina tunaninsa a kansu.',
    'Kalmar "Matsaya" tana nufin abin da mutum yake cewa ya kamata a karɓa daga bayanan farawa.',
    'Ga fitila da wuta. An katse wutar ɗakin, kuma fitilar tana aiki ne da wutar ɗakin. Don haka fitilar ba za ta kunna ba. Abin da wannan ya nuna shi ne, a wannan misali, matsayar ta biyo bayan bayanan da aka amince da su.',
    'Gwada haɗin. Ka ce a zuciyarka, \'Idan bayanan nan gaskiya ne, shin dole matsayar ta biyo?\' Wannan tambaya tana gano gibi.',
  ],
  FL05: [
    // Muhammad's ruling 2026-07-26: restore "ta lura" (noticed). FL05 is about
    // rules/outcomes/character, and the three ethical lenses only become
    // relevant once Zainab recognises the mistake — so her awareness of the
    // excess change is the decision point and must stay explicit. This is now
    // the approved display body verbatim, with only the caption heading dropped.
    'Zainab ta lura an ba ta canji fiye da yadda ta biya. Mutane uku sun bayyana dalilansu ta hanyoyi dabam.',
    'Kalmar "Hanyar doka" tana nufin bayani da yake jingina zaɓi ga ka\'ida, alkawari, ko abin da aka amince a bi.',
    'Kalmar "Hanyar sakamako" tana nufin bayani da yake kallon abin da zaɓi zai haifar ga mutane ko yanayi.',
    'Ga hanyar hali. Bello ya ce yana kallon irin mutumin da yake son ya zama idan ya yi zaɓi a ɓoye. Abin da wannan ya nuna shi ne, wannan bayanin yana amfani da halin mutum a matsayin abin dubawa.',
    'Gane hanya, ba yanke hukunci ba. A wannan darasi kana tantance irin bayanin da ake bayarwa. Ba a tambayarka wane zaɓi ne ya fi kyau ba.',
  ],
  FL06: [
    'Alkawari da buƙatar gaggawa. Maryam ta shirya raka ƙanwarta, sai wata maƙwabciya ta nemi taimako a lokaci guda.',
    'Kalmar "Nauyi" tana nufin abin da mutum yake ganin yana da alhakin kula da shi ko aikatawa.',
    'Kalmar "Karo" tana nufin yanayi da nauyi biyu suke neman abubuwa mabambanta daga mutum a lokaci guda.',
    'Ga rubuta nauyin biyu. Maryam ta rubuta, \'na cika alkawari\' da \'na taimaka wa mai buƙata\', domin kada ta manta da ɗaya. Abin da wannan ya nuna shi ne, gano nauyin biyu ya bayyana abin da yake sa yanayin ya yi wuya.',
    'Tsari kafin zaɓi. Kafin ka yanke naka zaɓi, ka bayyana abubuwan da suka yi karo. Wannan darasi ba ya zaɓar maka ɓangare.',
  ],
  FL07: [
    'Lokacin keke. Usman ya ce rabin sa\'a ne ga Rabi, amma ya ƙyale wani yaro ya wuce lokaci ba tare da bayani ba.',
    'Kalmar "Mizani" tana nufin ka\'ida ko hanya da mutum yake amfani da ita wajen yanke shawara.',
    'Kalmar "Daidaito" tana nufin amfani da mizani guda ga yanayi masu kama idan babu bambanci mai dacewa.',
    'Ga bambanci da aka bayyana. Usman ya ba ɗan da ya dawo daga doguwar tafiya ƙarin minti goma, kuma ya bayyana wannan ga Rabi. Abin da wannan ya nuna shi ne, an bayyana abin da ya sa aka yi bambancin, maimakon a ɓoye sauyin mizani.',
    'Duba mizaninka. Tambayi kanka ko yanayin mutane iri ɗaya ne, sannan ko ka yi amfani da ƙa\'ida guda gare su.',
  ],
  FL08: [
    'Littafin da bai buɗe ba. Sule bai yi karatu ba, sai ya fara ce wa kansa littafin bai da amfani. Daga baya ya duba yadda ya yi amfani da lokacinsa.',
    'Kalmar "Uzurin da ke kauce wa ainihin dalili" tana nufin maganar da mutum yake yi wa kansa domin kada ya fuskanci ainihin abin da ya sa bai yi wani abu ba.',
    'Kalmar "Ainihin bayani" tana nufin maganar da take fuskantar abin da ya faru da abin da ya sa ya faru ba tare da ɓoyewa ba.',
    'Ga duba ranar. Sule ya tuna ya shafe lokacin da yake da shi a abubuwan da ba su gaggawa ba, ba wai ya rasa lokacin karatu gaba ɗaya ba. Abin da wannan ya nuna shi ne, ganin abin da ya faru a sarari ya ba shi damar tsara lokacinsa dabam a gaba.',
    'Ba zargi ba ne. Gaskiya ga kai ba hanyar cin mutuncinka ba ce. Hanya ce ta gane abin da za ka iya gyarawa.',
  ],
  FL09: [
    'Hanyar da ta sauya. Fatima ta saba da hanyar baya, amma gyaran hanya ya canja abin da ta sani game da hanya mafi sauri.',
    'Kalmar "Sabon bayani mai muhimmanci" tana nufin wani sabon bayani da zai iya taɓa abin da mutum ya dogara da shi wajen riƙe matsaya.',
    'Kalmar "Sake duba ra\'ayi" tana nufin komawa a auna matsaya bayan wani abu mai muhimmanci ya sauya.',
    'Ga ba wai canji saboda magana kawai ba. Fatima ba ta canja saboda an ce mata kawai; ta duba cewa cunkoso ya canja kuma wannan yana da alaƙa da zaɓinta. Abin da wannan ya nuna shi ne, sabon abu ya dace a duba idan yana da muhimmanci ga abin da matsayarka ta dogara da shi.',
    'Kada girman kai ya rufe ido. Idan tushen tunaninka ya sauya, ba sai ka tsare tsohon ra\'ayi saboda ka taɓa faɗinsa ba.',
  ],
  FL10: [
    'Ɗaki da lokacin karatu. Amina tana da ƙa\'idar rufe ɗaki, amma \'yar uwarta tana buƙatar wuri mai natsuwa domin karatu.',
    'Kalmar "Jerin dubawa" tana nufin tsarin tambayoyi da mutum yake bi domin ya binciki tunaninsa kafin ya yi zaɓi.',
    'Kalmar "Binciken kai" tana nufin duba ma\'anarka, mizaninka, dalilanka, da abin da wataƙila kake kauce wa a tunaninka.',
    'Ga matakai masu haɗuwa. Amina ta fayyace lokaci, ta gano nauyi biyu, ta duba mizani, sannan ta sake dubawa bayan ta ji batun jarrabawa. Abin da wannan ya nuna shi ne, ta yi amfani da tambayoyi masu yawa domin ta fahimci tsarin zaɓinta, ba domin a ba ta amsa guda ba.',
    'Hanyar da za ka sake amfani da ita. Ka tambayi abin da ya sa, ma\'ana, irin saɓani, haɗin tunani, nauyi, mizani, uzuri, da sabon abu kafin ka ɗauki matsaya.',
  ],
  CT01: [
    'Saƙon da ya zo da gaggawa. Amina ta ga saƙon waya mai cewa an canja lokacin taron iyali kuma a tura shi nan da nan. Ta tsaya kafin ta yaɗa shi, domin saƙo ba ya zama tabbatacce saboda an turo shi kawai.',
    'Kalmar "Iƙirari" tana nufin maganar da ke cewa wani abu gaskiya ne, wadda za a iya dubawa ko an tabbatar da ita.',
    'Kalmar "Tushen bayani" tana nufin mutum, ƙungiya, ko wuri da labari ya fito daga gare shi.',
    'Ga kiran mai shirya taro. Amina ta ga cewa saƙon bai nuna wanda ya canja lokacin ba. Ta kira mutumin da ke shirya taron, kuma ya ce lokacin bai canja ba. Abin da wannan ya nuna shi ne, tambayar tushen bayani da dubawa daga abin dogaro sun hana yaɗuwar kuskure.',
    'Idan ba a tabbatar ba. Rashin tabbatarwa ba hujjar cewa labari ƙarya ne ba. Amma dalili ne kada a faɗa shi kamar an tabbatar; ka jira bayani daga tushen abin dogaro.',
  ],
  CT02: [
    'Saƙo mai sassa uku. Saƙon waya ya ce an canja lokacin taron iyali saboda wani ya ji daga aboki, sannan ya ce a kira kowa nan da nan. Ka raba abin da aka ce, dalilin da aka bayar, da matakin da ake nema.',
    'Kalmar "Dalili" tana nufin abin da ake bayarwa domin ya goyi bayan iƙirari.',
    'Kalmar "Kammalawa" tana nufin abin da dalilai suke kaiwa gare shi, ko matakin da ake cewa ya kamata ya biyo baya.',
    'Ga shin dalilin ya isa? A cikin saƙon, “wani ya ji daga aboki” shi ne dalilin. Amma saƙon ya nemi a kira kowa nan da nan, duk da cewa ba a duba mai shirya taron ba. Abin da wannan ya nuna shi ne, kammalawa na iya fi ƙarfin dalilin da aka bayar; a duba kafin a ɗauki mataki mai faɗi.',
    'Tsoro ba hujja ba ne. Gargadin “kada ku yi kuskure” na iya sa mutum ya firgita, amma ba ya tabbatar da iƙirari. Dalili mai kyau yana ba da abin da za a iya dubawa.',
  ],
  CT03: [
    'Zancen rediyo da zancen gida. Mai rediyo ya ce ma\'aunin yanayi ya nuna an samu ruwan sama jiya. A gida kuma, wani ya ce lokacin sanyi ya fi daɗi. Ba irin magana ɗaya ba ce.',
    'Kalmar "Tabbataccen bayani" tana nufin maganar da za a iya dubawa a gano ko ta dace da abin da aka auna ko aka lura.',
    'Kalmar "Zato" tana nufin maganar da aka yi ba tare da isasshen tabbaci ba.',
    'Ga zato game da yanayi. A hirar unguwa, Sani ya ce lallai ruwan sama zai yi da yamma saboda sama ta yi duhu. Bai nuna rahoto ko wata hanyar tabbatarwa ba. Abin da wannan ya nuna shi ne, wannan zato ne, domin ganin sama ta yi duhu kaɗai bai isa ya tabbatar da cewa ruwan sama zai yi ba.',
    'Tambayoyi uku kafin ka yarda. Ka tambayi ko za a iya dubawa, ko magana tana nuna zaɓin mutum, ko kuma ba ta da isasshen tabbaci. Hakan yana raba tabbataccen bayani, ra\'ayi, da zato.',
  ],
  CT04: [
    'Saƙo biyu game da taro. Musa ya ji daga maƙwabcinsa cewa an matsar da taron. Rabi kuma ta yi magana kai tsaye da mai shirya taron. Kafin a ɗauki mataki, a duba yadda kowane mutum ya sami bayaninsa.',
    'Kalmar "Abin da mutum ya gani ko ya ji da kansa" tana nufin bayani daga mutum da ya kasance a wurin abin da ya faru ko ya ji shi kai tsaye.',
    'Kalmar "Tushen bayani abin dogaro" tana nufin tushen bayani da yake da damar sani ko ilimin da ya dace da batun, kuma za a iya komawa gare shi.',
    'Ga mai shirya taro ya fi kusa da bayani. Rabi ta kira mai shirya taron, ya duba tsarin taron ya ce lokaci bai canja ba. Musa bai yi magana da wanda ya shirya taron ba. Abin da wannan ya nuna shi ne, a nan an fi dogara da bayanin mai shirya taron, amma har yanzu ana iya sake tantance idan sabon bayani ya fito.',
    'Ƙarfin gwiwa bai isa ba. Mutum na iya yi magana da ƙarfi ko mutane da yawa su maimaita saƙo, amma hakan ba ya nuna yadda suka sani. Ka nemi tushen da za a iya tambaya da kuma wata hanyar tabbatarwa.',
  ],
  CT05: [
    '“Mutane 8 cikin 10”. Saƙo ya ce mutane 8 cikin 10 sun amince da sabon lokaci. Kafin ka ɗauki wannan a matsayin hujja mai ƙarfi, ka tambayi su wane ne goma ɗin da yadda aka zaɓe su.',
    'Kalmar "Cikakken bayani da ke kewaye da lamba" tana nufin bayanan da ke nuna wanda aka ƙirga, abin da aka kwatanta, da lokacin da aka tattara lamba.',
    'Kalmar "Jadawali" tana nufin hanyar nuna ƙididdiga da tebur ko sassa masu gani domin a kwatanta bayanai.',
    'Ga adadin da ya ninka. Wani ya ce yawan mahalarta ya ninka, amma bai faɗi adadin farko, adadin na gaba, ko tsawon lokacin ba. Abin da wannan ya nuna shi ne, maganar tana buƙatar waɗannan bayanai kafin a san girman sauyin da ake nufi.',
    'Tambayi mahallin lamba. Ka nemi yawan da aka ƙirga, waɗanda aka saka cikin ƙididdigar, kwatancen da aka yi, da lokaci. Idan jadawali bai nuna ma\'auninsa ba, kada tsawon sassa ya sa ka hanzarta kammalawa.',
  ],
  CT06: [
    'Maballi da fitila. An danna maballi sai fitila ta haska. Saboda tsarin wuta ya haɗa maballi da fitila, akwai dalili mai kyau a bincika maballin a matsayin abin da ya jawo hasken.',
    'Kalmar "Abin da ya jawo wani abu" tana nufin abu ko canji da hujja ta nuna yana haifar da wani sakamako.',
    'Kalmar "Wani bayani mai yiwuwa" tana nufin wani dalili daban da zai iya bayyana abin da aka lura da shi.',
    'Ga sabbin takalma da ruwan sama. Sani ya sa sabbin takalma da safe, sai ruwan sama ya yi da yamma. Bai nuna wata hanya da takalman za su iya jawo ruwan ba. Abin da wannan ya nuna shi ne, jerin lokaci kaɗai bai isa ya haɗa abubuwa biyu da dalili da sakamako ba.',
    'Ka nemi abin da ya canja. Idan halartar taro ta canja bayan sabon jadawali, ka tambayi ko wurin taro, ranar sanarwa, ko wani abu ma ya canja. Idan ba a da isasshen bayani, a dakatar da kammalawa.',
  ],
  CT07: [
    'Rahoton yanayi da tafiya. Kana son tafiya ta yiwu, don haka rahoto mai kyau ya yi maka daɗi. Amma idan akwai wani rahoto da ya nuna yiwuwar ruwa, bai dace ka watsar da shi saboda ba ka so ba.',
    'Kalmar "Son wani sakamako ya sa mutum ya karkata" tana nufin halin da son abin da mutum yake fata ya rinjayi yadda yake duba hujja.',
    'Kalmar "Hujjar da ta saba" tana nufin hujjar da ba ta goyon bayan iƙirari ko kammalawar da mutum ya fi so.',
    'Ga misalan da aka tuna. Fatima ta fi son bayani ɗaya game da jinkirin taro. Ta tuna abubuwan da ke goyon bayansa, amma ta ƙi duba bayanan da ke nuna wani bayani daban. Abin da wannan ya nuna shi ne, ta fi taimakon kanta idan ta nemi bayanin da zai iya ƙalubalantar kammalawarta.',
    'Tambayi abin da zai canja tunani. Ka faɗi wa kanka wace hujja za ta sa ka canja ra\'ayi. Idan babu abin da za ka yarda ya canja tunaninka, son sakamako na iya zama ya rufe hanyar dubawa.',
  ],
  CT08: [
    'Hanya a yanayi mai rashin tabbaci. Akwai yiwuwar ruwan sama, amma ba a tabbatar ba. Kana iya zaɓar hanya mai madadin hanya, ka shirya kayan kariya, ko ka jira sabon bayani idan ba gaggawa ba ne.',
    'Kalmar "Rashin tabbaci" tana nufin halin da bayanin da ake da shi bai isa ya nuna abin da zai faru da cikakkiyar tabbas ba.',
    'Kalmar "Matakin da za a iya juyawa baya" tana nufin shawarar da za a iya canzawa ko gyarawa idan sabon bayani ya bayyana.',
    'Ga fara da ƙaramin gwaji. Wani manomi yana tunanin lokacin fara wani aiki, amma bayanin yanayi bai cika ba. Ya fara da ƙaramin ɓangare kuma ya bar damar canja tsari. Abin da wannan ya nuna shi ne, ƙaramin mataki mai sauƙin gyarawa na iya rage illa yayin da ake jiran ƙarin bayani.',
    'Daidaita mataki da haɗari. Tambayi abin da za ka samu, abin da zai iya lalacewa, ko za ka iya juyawa baya, da ko akwai madadi. Idan akwai batun lafiya, neman ƙwararren ma\'aikacin lafiya shi ne matakin hankali.',
  ],
  CT09: [
    'Labari daga mutum ɗaya. A wani rashin jituwa na gida, ka ji bayanin mutum ɗaya kawai. Kafin ka gina kammalawa, ka lura cewa akwai sauran mutanen da za su iya ba da bayanin abin da suka gani.',
    'Kalmar "Bayanin da ya ɓace" tana nufin mahimmin bayani da ba a bayar ba amma zai iya canja yadda ake fahimtar iƙirari.',
    'Kalmar "Bayani daga gefe ɗaya" tana nufin labari da aka samu daga mutum ko ra\'ayi guda ba tare da sauran bayanan da suka dace ba.',
    'Ga jumla da aka cire daga mahalli. Saƙo ya kawo jumla guda daga wata hira ba tare da abin da aka faɗa kafin ta da bayan ta ba. Abin da wannan ya nuna shi ne, duba abin da ya kewaye jumlar na iya nuna ko an fahimci ma\'anarta yadda ya dace.',
    'Nemi kwatance mai dacewa. Idan aka ce sakamako ya fi na baya, tambayi menene na baya. Idan aka kawo misali guda, tambayi ko yana wakiltar yawancin abin da ake magana a kai ko an zaɓe shi kawai.',
  ],
  CT10: [
    'Saƙo mai abubuwa da yawa. Saƙo ya ce za a matsar da aikin tsaftace unguwa saboda ruwan sama zai yi, kuma ya kawo lamba. Maimakon karɓar saƙon kai tsaye, ka bi tambayoyi a jere.',
    'Kalmar "Jerin dubawa" tana nufin tsarin tambayoyi da ake bi domin a tantance iƙirari kafin a yanke kammalawa.',
    'Kalmar "Mataki mai hankali" tana nufin aikin da ya dace da hujjar da ake da ita, rashin tabbaci, da yiwuwar illa.',
    'Ga tantance saƙon tsaftace unguwa. Ka gano iƙirari, ka kira mai shirya aikin, ka tambayi yadda aka tara “8 cikin 10,” sannan ka duba sabon rahoton yanayi kafin ka canja shirinka. Abin da wannan ya nuna shi ne, tambayoyin daban-daban sun nuna abin da za a bincika kafin a zaɓi jira, canja shiri, ko shirya madadi.',
    'Bi tambayoyi, sannan ka zaɓi mataki. Ka gano iƙirari da tushen bayani; ka duba yadda aka sani, dalili da hujja, da nau\'in magana. Ka duba lambobi, dalili da sakamako, kuma ka duba ko son wani sakamako yana sa ka karkata. Ka duba bayanin da ya ɓace. Sannan ka zaɓi mataki mai hankali.',
  ],
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '../..');
const contentPath = resolve(repoRoot, 'app/content.json');
const backupPath = resolve(
  repoRoot,
  '../New project/ai-system/projects/ajamix/tasks/2026-07-26-pre-audioscript-content-389.json',
);

const fail = (message) => {
  console.error(`patch-lesson-audio-scripts: FAIL — ${message}`);
  process.exit(1);
};

const readJson = (filePath, label) => {
  try {
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`could not read ${label}: ${error.message}`);
  }
};

const comparableWithoutNewScripts = (content) => {
  const clone = structuredClone(content);
  for (const module of clone.modules) {
    if (Object.hasOwn(AUTHORED_SCRIPTS, module.id)) {
      for (const lesson of module.lessons) delete lesson.audioScript;
    }
  }
  return clone;
};

const validateBaseline = (content) => {
  if (!Array.isArray(content.modules)) fail('live content.modules must be an array');
  if (content.modules.length !== EXPECTED_MODULE_COUNT) {
    fail(`live module count is ${content.modules.length}; expected ${EXPECTED_MODULE_COUNT}`);
  }
  const targets = content.modules.filter((module) => module.track === 'vocational' && module.gradeband === 'adult');
  if (targets.length !== EXPECTED_TARGET_COUNT) {
    fail(`adult vocational target count is ${targets.length}; expected ${EXPECTED_TARGET_COUNT}`);
  }
  const subjectCounts = new Map();
  for (const module of targets) subjectCounts.set(module.subject, (subjectCounts.get(module.subject) ?? 0) + 1);
  if (subjectCounts.size !== EXPECTED_SUBJECT_COUNTS.size || [...EXPECTED_SUBJECT_COUNTS].some(([subject, count]) => subjectCounts.get(subject) !== count)) {
    fail(`adult vocational subjects/counts are not exact: ${JSON.stringify(Object.fromEntries(subjectCounts))}`);
  }
  let lessonCount = 0;
  for (const module of targets) {
    if (!Array.isArray(module.lessons) || module.lessons.length !== 5) fail(`target module ${module.id} must have exactly five lessons`);
    lessonCount += module.lessons.length;
    if (PILOT_IDS.has(module.id)) continue;
    if (!Object.hasOwn(AUTHORED_SCRIPTS, module.id)) fail(`no authored scripts are embedded for target module ${module.id}`);
    if (AUTHORED_SCRIPTS[module.id].length !== module.lessons.length) fail(`authored-script count for ${module.id} is not ${module.lessons.length}`);
  }
  if (lessonCount !== EXPECTED_LESSON_COUNT) fail(`target lesson count is ${lessonCount}; expected ${EXPECTED_LESSON_COUNT}`);
  if (Object.keys(AUTHORED_SCRIPTS).length !== 27) fail(`authored module count is ${Object.keys(AUTHORED_SCRIPTS).length}; expected 27`);
  if (Object.values(AUTHORED_SCRIPTS).flat().length !== EXPECTED_NEW_COUNT) fail(`authored script count is not ${EXPECTED_NEW_COUNT}`);
  return targets;
};

const liveContent = readJson(contentPath, 'live content bundle');
const targetModules = validateBaseline(liveContent);
const originalContent = structuredClone(liveContent);
const originalNonModules = Object.fromEntries(Object.entries(liveContent).filter(([key]) => key !== 'modules'));
const pilotSnapshot = Object.fromEntries(
  liveContent.modules.filter((module) => PILOT_IDS.has(module.id)).map((module) => [module.id, structuredClone(module.lessons)]),
);

let existingPilotCount = 0;
let existingNewCount = 0;
for (const module of targetModules) {
  for (const lesson of module.lessons) {
    if (typeof lesson.audioScript === 'string' && lesson.audioScript.trim()) {
      if (PILOT_IDS.has(module.id)) existingPilotCount += 1;
      else existingNewCount += 1;
    } else if (Object.hasOwn(lesson, 'audioScript')) {
      fail(`${module.id} has a non-string or empty lesson audioScript`);
    }
  }
}
if (existingPilotCount !== EXPECTED_PILOT_COUNT) fail(`pilot audioScript count is ${existingPilotCount}; expected ${EXPECTED_PILOT_COUNT}`);
if (existingNewCount !== 0 && existingNewCount !== EXPECTED_NEW_COUNT) fail(`partial patch detected: ${existingNewCount} of ${EXPECTED_NEW_COUNT} new lesson audioScript values already exist`);

const expectedBaseline = comparableWithoutNewScripts(liveContent);
if (existsSync(backupPath)) {
  const existingBackup = readJson(backupPath, 'existing pre-audioscript backup');
  if (JSON.stringify(existingBackup) !== JSON.stringify(expectedBaseline)) {
    fail(`backup parity check failed: ${backupPath} is not the exact pre-audioscript bundle`);
  }
} else {
  copyFileSync(contentPath, backupPath);
  const writtenBackup = readJson(backupPath, 'new pre-audioscript backup');
  if (JSON.stringify(writtenBackup) !== JSON.stringify(expectedBaseline)) fail(`new backup parity check failed: ${backupPath}`);
}

if (existingNewCount === EXPECTED_NEW_COUNT) {
  for (const module of targetModules) {
    if (PILOT_IDS.has(module.id)) continue;
    module.lessons.forEach((lesson, index) => {
      if (lesson.audioScript !== AUTHORED_SCRIPTS[module.id][index]) fail(`${module.id} lesson ${index + 1} differs from its authored audioScript`);
    });
  }
  console.log(`patch-lesson-audio-scripts: PASS — already complete; ${EXPECTED_NEW_COUNT} authored lesson audioScript values across 27 non-pilot adult modules exactly match the embedded data. Pilot ${EXPECTED_PILOT_COUNT} values and backup parity verified. No write performed.`);
  process.exit(0);
}

for (const module of targetModules) {
  if (PILOT_IDS.has(module.id)) continue;
  module.lessons = module.lessons.map((lesson, index) => ({ ...lesson, audioScript: AUTHORED_SCRIPTS[module.id][index] }));
}
writeFileSync(contentPath, `${JSON.stringify(liveContent, null, 2)}\n`);

const writtenContent = readJson(contentPath, 'written live content bundle');
validateBaseline(writtenContent);
const writtenNonModules = Object.fromEntries(Object.entries(writtenContent).filter(([key]) => key !== 'modules'));
if (JSON.stringify(writtenNonModules) !== JSON.stringify(originalNonModules)) fail('one or more non-module top-level fields changed during the patch');

for (const [moduleIndex, originalModule] of originalContent.modules.entries()) {
  const writtenModule = writtenContent.modules[moduleIndex];
  const isTarget = originalModule.track === 'vocational' && originalModule.gradeband === 'adult';
  if (!isTarget) {
    if (JSON.stringify(writtenModule) !== JSON.stringify(originalModule)) fail(`non-target module ${originalModule.id} changed during the patch`);
    continue;
  }
  const expectedLessons = PILOT_IDS.has(originalModule.id)
    ? originalModule.lessons
    : originalModule.lessons.map((lesson, index) => ({ ...lesson, audioScript: AUTHORED_SCRIPTS[originalModule.id][index] }));
  const withoutLessons = (module) => Object.fromEntries(Object.entries(module).filter(([key]) => key !== 'lessons'));
  if (JSON.stringify(withoutLessons(writtenModule)) !== JSON.stringify(withoutLessons(originalModule))) fail(`target module ${originalModule.id} changed outside lessons`);
  if (JSON.stringify(writtenModule.lessons) !== JSON.stringify(expectedLessons)) fail(`target module ${originalModule.id} changed beyond its expected lesson audioScript fields`);
}
for (const [id, lessons] of Object.entries(pilotSnapshot)) {
  const written = writtenContent.modules.find((module) => module.id === id);
  if (!written || JSON.stringify(written.lessons) !== JSON.stringify(lessons)) fail(`pilot ${id} lesson values were changed`);
}

console.log(`patch-lesson-audio-scripts: PASS — added ${EXPECTED_NEW_COUNT} authored lesson audioScript values across 27 non-pilot adult modules; preserved ${EXPECTED_PILOT_COUNT} pilot values, all ${EXPECTED_MODULE_COUNT - EXPECTED_TARGET_COUNT} non-target modules, all target display fields/non-lesson fields, and non-module top-level fields; backup=${backupPath}`);
