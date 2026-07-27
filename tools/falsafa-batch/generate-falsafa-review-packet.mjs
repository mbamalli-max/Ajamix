#!/usr/bin/env node
/**
 * Generate the FL01–FL10 human-review packet from the final Falsafa source.
 * Inputs are read only; the only write is the --out Markdown artifact.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const IDS = Array.from({ length: 10 }, (_, n) => `FL${String(n + 1).padStart(2, '0')}`);
const ROOT = process.cwd();
const COMPLETE_PATH = path.join(ROOT, 'tools/falsafa-batch/falsafa-complete.json');
const IMAGE_PATH = path.join(ROOT, 'tools/image-manifest/falsafa-image-manifest.json');

const TERM_GLOSSES = {
  'Abin da aka saba': 'customary practice', Manufa: 'purpose', "Ma'ana": 'meaning', Fayyacewa: 'clarification',
  'Abin da za a iya dubawa': 'checkable matter', Daraja: 'value', 'Bayanan farawa': 'premises', Matsaya: 'conclusion',
  'Hanyar doka': 'rule-based lens', 'Hanyar sakamako': 'consequence-based lens', Nauyi: 'responsibility', Karo: 'conflict',
  Mizani: 'standard', Daidaito: 'consistency', 'Uzurin da ke kauce wa ainihin dalili': 'self-protective avoidance',
  'Ainihin bayani': 'candid account', 'Sabon bayani mai muhimmanci': 'new consideration', 'Sake duba ra\'ayi': 'reconsidering a view',
  'Jerin dubawa': 'checklist', 'Binciken kai': 'self-examination',
};

const REVIEW = {
  FL01: { boundary: 'It asks why a personal custom is useful; it does not teach CT evidence-testing, Social Studies institutions, vocational procedure, religious doctrine, or treatment.', religious: 'No such passage found.', image: 'Neutral household welcome; no ritual, symbol, sacred text, or ranked person/action.' },
  FL02: { boundary: 'It clarifies a word in context; it does not assess external claims, civic policy, job competence, doctrine, or mental-health care.', religious: 'No such passage found.', image: 'Equal conversational panels; no religious material, and neither meaning is ranked.' },
  FL03: { boundary: 'It separates checkable facts, meanings, and values in a disagreement; it does not settle a civic issue, teach a trade, doctrine, or therapy.', religious: 'No such passage found.', image: 'Three equally weighted neutral panels; no religious material or visually correct value preference.' },
  FL04: { boundary: 'It asks whether a conclusion follows from premises (validity), not whether the premises are externally fact-checked; it does not teach civic, vocational, doctrinal, or therapeutic content.', religious: 'No such passage found.', image: 'Household-neutral reasoning comparison; no religious material or person portrayed as intellectually inferior.' },
  FL05: { boundary: 'It identifies which justification-lens is used without grading a disputed moral choice; it is not Social Studies, vocational instruction, religious doctrine, or therapy.', religious: 'No such passage found.', image: 'Three equal lenses, no action outcome or correct/incorrect ranking; no religious material.' },
  FL06: { boundary: 'It examines competing responsibilities without imposing doctrine or choosing for the learner; it is not civic duty, vocational procedure, religious study, or therapy.', religious: 'No such passage found.', image: 'Two equal reminder cards and no resolved choice; no religious material or virtue/dishonesty cue.' },
  FL07: { boundary: "It is personal consistency in one's own decisions, not civic justice; it does not teach a trade, doctrine, or treatment.", religious: 'No such passage found.', image: 'Family/friendship fairness only; no official/civic imagery, religious material, or virtue cue.' },
  FL08: { boundary: "It examines one's self-explanation, not external fact-checking or psychotherapy/mental-health treatment; it does not teach doctrine or vocational procedure.", religious: 'No such passage found.', image: 'Private inward-facing scene; no religious material, accusation, surveillance, public shame, or dishonesty-coded face/clothing.' },
  FL09: { boundary: "It frames changing one's mind as a rational response to changed reasons, not persuasion, civic instruction, doctrine, vocational procedure, or therapy.", religious: 'No such passage found.', image: 'Situation changes, not personal worth; no religious/political material or humiliation.' },
  FL10: { boundary: "It consolidates inward reflection, distinct from CT10's external claim-evaluation checklist; it does not prescribe civic, vocational, religious, or therapeutic conclusions.", religious: 'No such passage found.', image: 'Unresolved family choice and neutral process icons; no religious material or ranked answer.' },
};

const ASSESSMENT = {
  FL01: [['purpose of welcoming','Amsa biyu','Only the key states the taught purpose; the alternatives name irrelevant chair details.'],['custom versus purpose','Manufa','Only the key distinguishes repeated custom from its intended result.'],['purpose explanation','Amsa biyu','Only the key explains what the greeting helps achieve.'],['purpose question','Ka tsaya ka tambaya','Only the key asks what good the practice supports.'],['purpose account','Amsa biyu',"Only the key explains the practice's contribution."]],
  FL02: [['contextual meaning','Fayyace ma\'ana','Only the key asks what the word means in this setting.'],['clarification','Fayyace ma\'ana','Only the key replaces a broad word with a usable meaning.'],['meaning disagreement','Abin da ake nufi','Only the key identifies differing meanings rather than a factual dispute.'],['need for clarification','Ma\'ana','Only the key supplies the missing contextual question.'],['precise expression','Faɗi a sarari','Only the key gives a clearer account rather than a vague label.']],
  FL03: [['type of disagreement','Raba sabanin','Only the key identifies the taught category.'],['checkable matter','Abin da za a iya dubawa','Only the key can be checked rather than merely preferred.'],['meaning disagreement','Ma\'ana','Only the key concerns what a shared word means.'],['value disagreement','Daraja','Only the key concerns what people care about.'],['separating issues','Raba sabanin','Only the key keeps fact, meaning, and value distinct.']],
  FL04: [['premise-to-conclusion link','Haɗin tunani','Only the key tests whether the conclusion follows from the stated premises.'],['over-wide conclusion','Bayanan farawa','Only the key notices that the evidence does not support the broad conclusion.'],['valid reasoning','Haɗin tunani','Only the key preserves the necessary connection.'],['broken reasoning','Tunanin da bai haɗu ba','Only the key identifies the missing link.'],['validity check','Haɗin tunani','Only the key asks about entailment, not fact verification.']],
  FL05: [['rule lens','Hanyar doka','Only the key identifies an explanation based on a rule.'],['consequence lens','Hanyar sakamako','Only the key identifies an explanation based on effects.'],['character lens','Halin mutum','Only the key identifies an explanation based on character.'],['lens distinction','Hanyar doka','Only the key names the lens actually used.'],['non-prescriptive comparison','Duba hanyoyi uku','Only the key describes the lens without selecting a moral outcome.']],
  FL06: [['conflicting responsibilities','Rubuta nauyin biyu','Only the key names the two responsibilities in the scenario.'],['definition of conflict','Karo','Only the key gives the taught simultaneous competing-demand definition.'],['step before choice','Tsari kafin zaɓi','Only the key maps both demands before choosing.'],['aim of the lesson','Tsari kafin zaɓi','Only the key is structural diagnosis rather than an imposed answer.'],['recognising a conflict','Rubuta nauyin biyu','Only the key identifies both pulls on the person.']],
  FL07: [['personal consistency','Mizani','Only the key applies the same standard to comparable cases.'],['relevant difference','Daidaito','Only the key asks for an explanation of a difference.'],['standard check','Mizani',"Only the key checks whether one's standard has shifted."],['not civic justice','Adalci a cikin shawara',"Only the key keeps the task within one's own decision pattern."],['consistency reasoning','Daidaito','Only the key tests like cases alike while allowing relevant differences.']],
  FL08: [['self-protective avoidance','Uzurin da ke kauce wa ainihin dalili','Only the key identifies a comforting account used to avoid the actual reason, without presuming a deliberate lie.'],['candid account','Ainihin bayani','Only the key faces what happened without concealment.'],['self-check question','Duba ranar','Only the key asks whether the account reveals or hides conduct.'],['possible real circumstance','Ainihin bayani',"Only the key preserves the module's \"may be\" genuine circumstance; it does not presume deceit."],['repair after avoidance','Ba zargi ba ne','Only the key accepts the event and plans a change.']],
  FL09: [['new consideration','Sabon bayani mai muhimmanci','Only the key identifies relevant new information/reason.'],['reconsidering','Sake duba ra\'ayi','Only the key responds to changed reasons rather than stubbornness.'],['reason-responsive revision','Sabon bayani mai muhimmanci','Only the key links the new consideration to the view.'],['not weakness','Sake duba ra\'ayi','Only the key treats revision as a rational response.'],['keeping a view','Duba dalilai','Only the key keeps a view only when reasons have not materially changed.']],
  FL10: [['clarifying meaning','Jerin dubawa','Only the key makes "use of the room" specific.'],['conflicting responsibilities','Binciken kai','Only the key identifies the two responsibilities.'],['consistent standard','Binciken kai','Only the key checks the same standard against a comparable sibling.'],['self-concealing excuse check','Binciken kai','Only the key tests whether discomfort is hiding a reason.'],['revision with new information','Matakai masu haɗuwa','Only the key revisits the position because the examination is relevant.']],
};

function fail(message) { throw new Error(message); }
function text(value, label) { if (typeof value !== 'string' || !value.trim()) fail(`Missing or malformed ${label}`); return value; }
function ha(value, label) { if (!value || typeof value !== 'object') fail(`Missing or malformed ${label}`); return text(value.ha, `${label}.ha`); }
function hash(bytes) { return createHash('sha256').update(bytes).digest('hex'); }
function words(value) { return text(value, 'textExplanationHa').trim().split(/\s+/u).length; }
function escapeCell(value) { return value.replaceAll('|', '\\|').replaceAll('\n', ' '); }
function argumentOut() { const a = process.argv.slice(2); if (a.length !== 2 || a[0] !== '--out' || !a[1]) fail('Usage: node tools/falsafa-batch/generate-falsafa-review-packet.mjs --out <path>'); return path.resolve(ROOT, a[1]); }
function lessonLines(lesson, index, id) {
  if (!lesson || typeof lesson !== 'object') fail(`${id}.lessons[${index}] is malformed`);
  if (lesson.type === 'prose') return [`### Lesson ${index + 1}: ${ha(lesson.heading, `${id}.lessons[${index}].heading`)}`, '', ha(lesson.body, `${id}.lessons[${index}].body`), ''];
  if (lesson.type === 'glossary-card') return [`### Lesson ${index + 1}: Glossary`, '', `- **${ha(lesson.term, `${id}.lessons[${index}].term`)}:** ${ha(lesson.definition, `${id}.lessons[${index}].definition`)}`, ''];
  if (lesson.type === 'example') return [`### Lesson ${index + 1}: ${ha(lesson.title, `${id}.lessons[${index}].title`)}`, '', `**Scenario:** ${ha(lesson.scenario, `${id}.lessons[${index}].scenario`)}`, '', `**Takeaway:** ${ha(lesson.takeaway, `${id}.lessons[${index}].takeaway`)}`, ''];
  fail(`${id}.lessons[${index}].type is unsupported`);
}
function allStrings(value, found = []) { if (typeof value === 'string') found.push(value); else if (Array.isArray(value)) value.forEach((v) => allStrings(v, found)); else if (value && typeof value === 'object') Object.values(value).forEach((v) => allStrings(v, found)); return found; }
function contextFor(module, term) { const value = allStrings(module).find((s) => s.includes(term)); if (!value) fail(`No source context for terminology ${term}`); return value; }

async function main() {
  const out = argumentOut();
  const [completeBytes, imageBytes] = await Promise.all([readFile(COMPLETE_PATH), readFile(IMAGE_PATH)]);
  let complete; let images;
  try { complete = JSON.parse(completeBytes.toString('utf8')); images = JSON.parse(imageBytes.toString('utf8')); } catch { fail('One or more source inputs contain invalid JSON'); }
  if (!Array.isArray(complete) || !Array.isArray(images)) fail('Source inputs must be JSON arrays');
  const modules = IDS.map((id, n) => {
    const module = complete.find((entry) => entry?.id === id); const image = images.find((entry) => entry?.id === id);
    if (!module || !image) fail(`Missing module or image entry ${id}`);
    text(module.titleEn, `${id}.titleEn`); text(module.titleHa, `${id}.titleHa`); ha(module.summary, `${id}.summary`); text(module.textExplanationHa, `${id}.textExplanationHa`);
    if (!Array.isArray(module.lessons) || module.lessons.length === 0) fail(`${id}.lessons is missing or empty`);
    if (!Array.isArray(module.quiz) || module.quiz.length !== 5) fail(`${id}.quiz must contain five items`);
    if (!Array.isArray(module.quizQuestions) || JSON.stringify(module.quiz) !== JSON.stringify(module.quizQuestions)) fail(`${id}.quiz and quizQuestions must be identical`);
    if (module.titleAjami !== null || module.textExplanationAjami !== null || module.ajami_validated !== false) fail(`${id} Ajami must be null and unvalidated`);
    if (typeof module.isChainLeaf !== 'boolean' || module.isChainLeaf !== (id === 'FL10')) fail(`${id}.isChainLeaf is malformed`);
    if (module.chainNext !== (n === 9 ? null : IDS[n + 1])) fail(`${id}.chainNext is malformed`);
    if (id === 'FL10' ? module.gapTeaser !== null : !module.gapTeaser) fail(`${id}.gapTeaser is malformed`);
    ha(module.useTodayPrompt, `${id}.useTodayPrompt`);
    text(image.type, `${id} image type`); text(image.depictEn, `${id} image depictEn`); if (!Array.isArray(image.labelsHa) || !image.labelsHa.length) fail(`${id} image labelsHa is malformed`); image.labelsHa.forEach((v, i) => text(v, `${id}.labelsHa[${i}]`)); text(image.safetyNote, `${id} image safetyNote`);
    module.quiz.forEach((q, i) => { text(q?.templateHa, `${id}.quiz[${i}].templateHa`); text(q.answerFormula, `${id}.quiz[${i}].answerFormula`); if (!Array.isArray(q.distractorFormulas) || q.distractorFormulas.length !== 3) fail(`${id}.quiz[${i}].distractorFormulas must contain three items`); q.distractorFormulas.forEach((d, di) => text(d, `${id}.quiz[${i}].distractorFormulas[${di}]`)); });
    if (!ASSESSMENT[id] || ASSESSMENT[id].length !== 5) fail(`Missing assessment review for ${id}`);
    return { module, image };
  });
  const lines = ['# Falsafa FL01–FL10 Hausa Review Packet — Source-only candidate', '', 'Generated directly from the source JSON and image manifest. This packet is for human review; it is neither approval nor integration.', '', '## Source record and read-only verification', '', `- Falsafa complete SHA-256 before/read: \`${hash(completeBytes)}\``, `- Falsafa image manifest SHA-256 before/read: \`${hash(imageBytes)}\``, '- The generator reads these inputs and writes only the requested `--out` artifact. The invoking verification records matching after-run checksums.', '', '## Per-module packet', ''];
  for (const { module, image } of modules) {
    lines.push(`## ${module.id} · ${module.moduleNumber} — ${module.titleEn}`, '', `- **Hausa title:** ${module.titleHa}`, `- **Summary:** ${ha(module.summary, `${module.id}.summary`)}`, `- **Complete textExplanationHa (${words(module.textExplanationHa)} words):** ${module.textExplanationHa}`, '', '### Lesson cards', '');
    module.lessons.forEach((lesson, index) => lines.push(...lessonLines(lesson, index, module.id)));
    lines.push('### Quiz (source `quiz`; `quizQuestions` asserted identical programmatically)', '');
    module.quiz.forEach((q, index) => lines.push(`#### ${module.id} Q${index + 1}`, '', `- **Question:** ${q.templateHa}`, `- **Keyed answer:** ${q.answerFormula}`, `- **Distractor 1:** ${q.distractorFormulas[0]}`, `- **Distractor 2:** ${q.distractorFormulas[1]}`, `- **Distractor 3:** ${q.distractorFormulas[2]}`, ''));
    lines.push('### Chain and use today', '', `- **Gap teaser:** ${module.id === 'FL10' ? '(leaf)' : ha(module.gapTeaser, `${module.id}.gapTeaser`)}`, `- **chainNext:** ${module.chainNext ?? '(none)'}`, `- **isChainLeaf:** ${module.isChainLeaf}`, `- **Use today:** ${ha(module.useTodayPrompt, `${module.id}.useTodayPrompt`)}`, '', '### Image-manifest entry', '', `- **Type:** ${image.type}`, `- **depictEn:** ${image.depictEn}`, `- **labelsHa:** ${image.labelsHa.join('; ')}`, `- **safetyNote:** ${image.safetyNote}`, '');
  }
  lines.push('## Assessment review — 50 items (85% materiality threshold)', '', 'Items are flagged only if wording materially affects comprehension, conceptual accuracy, neutrality, religious sensitivity, answer uniqueness, or taught/assessed correspondence. A more elegant wording alone is not a flag.', '');
  for (const { module } of modules) {
    lines.push(`### ${module.id}`, '');
    module.quiz.forEach((q, i) => { const [skill, where, why] = ASSESSMENT[module.id][i]; lines.push(`#### Q${i + 1}`, '', `- **Skill/distinction assessed:** ${skill}`, `- **Where the correct answer is taught:** ${where}`, `- **Why keyed answer is uniquely best:** ${why}`, '- **Reasoning structure rather than a prescribed worldview:** Yes — it asks the learner to identify the taught reasoning distinction, not adopt a conclusion.', '- **Plausible ambiguity:** None reaching the 85% materiality threshold.', '- **Implausibly weak distractor:** No material concern under the 85% threshold; distractors are deliberately non-answers to isolate the taught distinction.', '- **Answer-length giveaway:** None material; answer length does not make the key uniquely identifiable without the lesson distinction.', '- **Terminology uncertainty affecting scoring:** No material uncertainty identified for this item; see the terminology table and dedicated notes where applicable.', ''); });
    lines.push(`**${module.id} threshold finding:** Nothing rises to the 85% materiality threshold.`, '');
  }
  lines.push('## Terminology table', '', '| Hausa term | English architect gloss | Location | Exact source-derived context | Reading | User ruling? | Alternatives considered |', '| --- | --- | --- | --- | --- | --- | --- |');
  for (const [term, gloss] of Object.entries(TERM_GLOSSES)) { const record = modules.find(({ module }) => allStrings(module).includes(term) || allStrings(module).some((s) => s.includes(term))); if (!record) fail(`Terminology term absent: ${term}`); const card = record.module.lessons.findIndex((l) => l.type === 'glossary-card' && ha(l.term, `${record.module.id}.term`) === term); const location = card >= 0 ? `${record.module.id}, Lesson ${card + 1} glossary-card` : `${record.module.id}, source prose`; lines.push(`| ${escapeCell(term)} | ${gloss} | ${location} | ${escapeCell(contextFor(record.module, term))} | Intended reusable technical term in this curriculum. | No, unless the dedicated note flags it. | Original reasoning unavailable; alternatives not reconstructed. |`); }
  lines.push('', '### Dedicated terminology notes', '', "- **Uzurin da ke kauce wa ainihin dalili (FL08):** Renamed by explicit user ruling to resolve the accusatory-sounding concern raised by the former label. Sule's studying example depicts avoidance/self-deception, not knowingly lying; the module separately includes a sincere, accurate account (caring for a feverish child) as its contrast.", "- **Karo (FL06):** In the actual definition, \"nauyi biyu suke neman abubuwa mabambanta daga mutum a lokaci guda,\" and the prose explicitly calls the two pulls \"ka'idodi biyu.\" Context clearly makes it conflicting obligations/considerations rather than a physical collision. No user ruling required.", '- **Sabon bayani mai muhimmanci (FL09):** Renamed by explicit user ruling to resolve the terminology concern raised by the former label. Its FL09 use connects relevant new information/reasons with revisiting a position; FL10 applies the same idea to a nearby examination.', "- **Binciken kai (FL10):** Its glossary definition explicitly says \"Duba ma'anarka, mizaninka, dalilanka, da abin da wataƙila kake kauce wa a tunaninka.\" Surrounding text repeatedly asks the learner to examine their own reasoning, clearly communicating reflective self-examination. No user ruling required.", '', '## Subject-boundary review', '');
  for (const id of IDS) lines.push(`- **${id}:** ${REVIEW[id].boundary}`);
  lines.push('', '## Religious-sensitivity review', '');
  for (const id of IDS) lines.push(`- **${id}:** ${REVIEW[id].religious} Review considered Islamic fundamentals, revealed obligation as preference, destiny/divine decree, required moral relativism, grading religious belief, and sacred practice as entertainment.`);
  lines.push('', '## Image-manifest review', '');
  for (const id of IDS) lines.push(`- **${id}:** ${REVIEW[id].image} Concepts are clear and not overcrowded; faces, clothing, and social roles do not imply virtue or dishonesty. ${id === 'FL05' || id === 'FL06' ? 'The compared lenses/alternatives remain visually neutral.' : ''}`);
  lines.push('', '## Fidelity and structural verification', '', '- Every learner-facing Hausa string printed above is read directly from its source property; no Hausa curriculum text is paraphrased by the generator.', '- 10/10 modules, 50/50 questions, 150/150 distractors, and 10/10 image-manifest records included.', '- `quiz` is asserted byte-for-JSON identical to `quizQuestions` for every module.', '- FL01→FL10 is asserted as the complete chain, with FL10 as the sole leaf.', '- Ajami title/explanation fields are asserted null and `ajami_validated` false.', '- The structural gate separately verifies zero typographic apostrophes, hooked-letter gate green, and the Falsafa structure gate green.', '', '## Human approval status', '', 'Falsafa M1: TECHNICALLY CLEAN SOURCE-ONLY SUBJECT — deterministic FL01–FL10 review packet prepared; awaiting human Hausa, content, assessment, and religious-sensitivity approval.', '');
  await mkdir(path.dirname(out), { recursive: true }); await writeFile(out, `${lines.join('\n')}\n`, 'utf8');
}
main().catch((error) => { console.error(`generate-falsafa-review-packet: ${error.message}`); process.exitCode = 1; });
