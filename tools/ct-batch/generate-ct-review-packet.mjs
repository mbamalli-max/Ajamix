#!/usr/bin/env node
/**
 * Generate the CT04–CT10 human-review packet from the final curriculum source.
 * Inputs are read only; the only write is the --out Markdown artifact.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const MODULE_IDS = ['CT04', 'CT05', 'CT06', 'CT07', 'CT08', 'CT09', 'CT10'];
const ROOT = process.cwd();
const COMPLETE_PATH = path.join(ROOT, 'tools/ct-batch/ct-complete.json');
const IMAGE_PATH = path.join(ROOT, 'tools/image-manifest/ct-image-manifest.json');

// Historical wording is intentionally kept here: it is not present in the final JSON.
const LEDGER = [
  ['CT05 Q1', 'Launin takardar da aka rubuta saƙon', 'precision treated as reliability'],
  ['CT05 Q1', 'Sunan wanda ya karanta saƙon', 'numerator accepted without sample context'],
  ['CT05 Q1', 'Yawan kalmomin da ke cikin saƙon', 'unsupported generalisation accepted'],
  ['CT05 Q2', 'Launin jadawali', 'direction without baseline values'],
  ['CT05 Q2', 'Wurin da aka rataya saƙon', 'claim merely repeated'],
  ['CT05 Q2', 'Sunan wanda ya ji labarin', 'large endpoint treated as meaningful'],
  ['CT05 Q3', 'Shin lambar tana da sifar zagaye?', 'precision treated as context'],
  ['CT05 Q3', 'Shin an rubuta lambar da babban rubutu?', 'magnitude treated as importance'],
  ['CT05 Q4', 'Ko an yi amfani da takarda mai kauri', 'visual difference trusted without scale'],
  ['CT05 Q4', 'Ko sandunan suna da launi iri ɗaya', 'more displayed data treated as reliability'],
  ['CT05 Q4', 'Ko taken jadawali yana da dogon suna', 'chart title treated as proof'],
  ['CT08 Q3', 'Launin kayan da za ka ɗauka', 'benefit-only choice ignores harm and reversibility'],
  ['CT08 Q3', 'Ko sunan shawarar yana da gajarta', 'a choice is assumed to remove uncertainty'],
  ['CT09 Q1', 'Launin tufafin mutumin', 'confidence is substituted for evidence'],
  ['CT09 Q1', 'Wurin da aka zauna a ji labarin', 'prior belief is substituted for another account'],
  ['CT09 Q2', 'Yawan rubutun da ke cikin saƙon', 'assertion is substituted for a baseline'],
  ['CT09 Q2', 'Launin jadawalin sakamakon', 'magnitude is substituted for comparison'],
  ['CT09 Q3', 'Ko jumlar tana da dogon rubutu', 'an isolated quotation is treated as self-sufficient'],
  ['CT09 Q3', 'Ko an rubuta ta da babban harafi', 'confirmation preference replaces contextual reading'],
  ['CT09 Q4', 'Shin misalin ya fi tsawo?', 'detail is treated as representativeness'],
  ['CT09 Q4', 'Shin misalin mutum ɗaya ne?', 'recency is treated as representativeness'],
  ['CT10 Q1', 'Wane launi ne saƙon yake da shi?', 'asserted confidence is substituted for source verification'],
  ['CT10 Q1', 'Shin saƙon ya yi tsawo?', 'familiarity is substituted for support'],
  ['CT10 Q2', 'Ko lambar tana da sifar zagaye', 'precision is treated as numerical context'],
  ['CT10 Q2', 'Ko an rubuta lambar a sama', 'magnitude is treated as evidence'],
  ['CT10 Q3', 'Ko A da B suna da harafi iri ɗaya', 'sequence is confused with cause'],
  ['CT10 Q3', 'Ko an faɗi A da sauri', 'popularity is treated as proof of cause'],
  ['CT10 Q3', 'Ko B ya fi A tsawo', 'outcome importance is treated as proof of cause'],
  ['CT04 Q2', 'Shin saƙon yana da hoto?', 'a decorative cue is substituted for source knowledge'],
  ['CT06 Q2', 'Takalma ba a iya gani', 'an irrelevant property is substituted for causal reasoning'],
  ['CT07 Q2', 'Hoto mai kyau da ke tare da iƙirarin', 'a decorative cue is substituted for disconfirming evidence'],
  ['CT09 Q4', 'Shin misalin yana nuna yawancin abin da ake magana a kai?', 'the key used an overbroad wording instead of asking whether the example represents the other relevant matters'],
];

const LEDGER_DISTRACTOR_INDEX = new Map([
  ['CT05 Q1|Launin takardar da aka rubuta saƙon', 0], ['CT05 Q1|Sunan wanda ya karanta saƙon', 1], ['CT05 Q1|Yawan kalmomin da ke cikin saƙon', 2],
  ['CT05 Q2|Launin jadawali', 0], ['CT05 Q2|Wurin da aka rataya saƙon', 1], ['CT05 Q2|Sunan wanda ya ji labarin', 2],
  ['CT05 Q3|Shin lambar tana da sifar zagaye?', 1], ['CT05 Q3|Shin an rubuta lambar da babban rubutu?', 2],
  ['CT05 Q4|Ko an yi amfani da takarda mai kauri', 0], ['CT05 Q4|Ko sandunan suna da launi iri ɗaya', 1], ['CT05 Q4|Ko taken jadawali yana da dogon suna', 2],
  ['CT08 Q3|Launin kayan da za ka ɗauka', 0], ['CT08 Q3|Ko sunan shawarar yana da gajarta', 2],
  ['CT09 Q1|Launin tufafin mutumin', 0], ['CT09 Q1|Wurin da aka zauna a ji labarin', 2], ['CT09 Q2|Yawan rubutun da ke cikin saƙon', 1], ['CT09 Q2|Launin jadawalin sakamakon', 2],
  ['CT09 Q3|Ko jumlar tana da dogon rubutu', 0], ['CT09 Q3|Ko an rubuta ta da babban harafi', 1], ['CT09 Q4|Shin misalin ya fi tsawo?', 1], ['CT09 Q4|Shin misalin mutum ɗaya ne?', 2],
  ['CT10 Q1|Wane launi ne saƙon yake da shi?', 0], ['CT10 Q1|Shin saƙon ya yi tsawo?', 2], ['CT10 Q2|Ko lambar tana da sifar zagaye', 0], ['CT10 Q2|Ko an rubuta lambar a sama', 1],
  ['CT10 Q3|Ko A da B suna da harafi iri ɗaya', 0], ['CT10 Q3|Ko an faɗi A da sauri', 1], ['CT10 Q3|Ko B ya fi A tsawo', 2],
  ['CT04 Q2|Shin saƙon yana da hoto?', 1], ['CT06 Q2|Takalma ba a iya gani', 0], ['CT07 Q2|Hoto mai kyau da ke tare da iƙirarin', 0], ['CT09 Q4|Shin misalin yana nuna yawancin abin da ake magana a kai?', -1],
]);

const ASSESSMENT = {
  CT04: [
    ['source proximity', 'Lesson 4 example', 'The organiser checked the schedule directly; the alternatives are hearsay, confidence, or repetition.'],
    ['first-hand knowledge', 'Lesson 2 glossary card', 'Only the key asks how the source knows. The hearsay-chain distractor risks the learner treating a short hearsay chain as equivalent to first-hand knowledge.'],
    ['limits of a named source', 'Lesson 5 prose', 'A name alone does not establish knowledge or accuracy.'],
    ['closer source', 'Lesson 1 prose', 'The key improves evidence proximity; each alternative abandons that check.'],
    ['corroboration', 'Lesson 4 example', 'The key preserves appropriate caution and corroboration.'],
  ],
  CT05: [
    ['sample context', 'Lesson 1 prose', 'Only the key identifies who was sampled; each alternative mistakes wording or count for sample quality.'],
    ['baseline and change', 'Lesson 4 example', 'The key supplies both values needed to interpret “doubled.”'],
    ['time context', 'Lesson 2 glossary card', 'Collection time is required context; motive, precision, and magnitude do not supply it.'],
    ['chart scale and comparison', 'Lesson 5 prose', 'The scale and comparator determine the visual difference’s meaning.'],
    ['numerical caution', 'Lesson 5 prose', 'The key states the lesson’s central limitation on numerical claims.'],
  ],
  CT06: [
    ['explained causal link', 'Lesson 1 prose', 'The circuit supplies a mechanism; the alternatives merely place events together.'],
    ['sequence versus cause', 'Lesson 5 prose', 'The key names the missing causal link; the alternatives do not establish one.'],
    ['alternative explanations', 'Lesson 4 example', 'The key checks for competing causes.'],
    ['alternative explanation', 'Lesson 4 example', 'Only the key is another possible cause.'],
    ['causal caution', 'Lesson 5 prose', 'The lesson requires more evidence, not a premature cause claim.'],
  ],
  CT07: [
    ['disconfirming evidence', 'Lesson 1 prose', 'The key actively checks evidence contrary to preference.'],
    ['preference check', 'Lesson 2 glossary card', 'Only contrary evidence can test a wanted claim.'],
    ['self-check', 'Lesson 5 prose', 'The key asks what evidence could revise the conclusion.'],
    ['selective evidence', 'Lesson 4 example', 'The key identifies omitted contrary evidence.'],
    ['balanced evidence', 'Lesson 5 prose', 'The key requires both supporting and opposing evidence.'],
  ],
  CT08: [
    ['reversibility', 'Lesson 3 glossary card', 'The key preserves the ability to adjust; the alternatives remove flexibility or evidence.'],
    ['waiting for evidence', 'Lesson 1 prose', 'The key fits a non-urgent uncertain situation.'],
    ['risk-aware choice', 'Lesson 5 prose', 'The key combines benefit, harm, and a backup; each alternative omits a necessary element.'],
    ['appropriate support', 'Lesson 5 prose', 'The key follows the module’s explicit health safeguard.'],
    ['small reversible trial', 'Lesson 4 example', 'A small trial is valuable because it remains adjustable, not certain.'],
  ],
  CT09: [
    ['one-sided account', 'Lesson 1 prose', 'Other relevant accounts address the missing perspective; confidence, repetition, and familiarity do not.'],
    ['missing comparison', 'Lesson 5 prose', 'The key supplies the baseline and comparator missing from the claim.'],
    ['quotation context', 'Lesson 4 example', 'Surrounding remarks determine whether the quotation is understood correctly.'],
    ['representativeness', 'Lesson 5 prose', 'Only the key asks whether the example represents the wider matter; provenance, detail, and recency do not establish that.'],
    ['missing information', 'Lesson 2 glossary card', 'The key requests the missing information without overclaiming.'],
  ],
  CT10: [
    ['source check', 'Lesson 5 prose', 'The checklist next requires source and knowledge, not confidence, popularity, or familiarity.'],
    ['number context', 'Lesson 4 example', 'The key names all taught context checks; the alternatives substitute precision, magnitude, or motive.'],
    ['cause check', 'Lesson 5 prose', 'Sequence, popularity, and outcome importance do not demonstrate causation.'],
    ['preference check', 'Lesson 5 prose', 'The key is the checklist’s counter-bias action.'],
    ['prudent next action', 'Lesson 3 glossary card', 'The key verifies and prepares a reversible response proportionate to uncertainty.'],
  ],
};

function fail(message) { throw new Error(message); }
function text(value, label) {
  if (typeof value !== 'string' || !value.trim()) fail(`Missing or malformed ${label}`);
  return value;
}
function ha(value, label) {
  if (!value || typeof value !== 'object') fail(`Missing or malformed ${label}`);
  return text(value.ha, `${label}.ha`);
}
function words(value) { return text(value, 'textExplanationHa').trim().split(/\s+/u).length; }
function hash(value) { return createHash('sha256').update(value).digest('hex'); }
function escapeCell(value) { return value.replaceAll('|', '\\|').replaceAll('\n', ' '); }
function argumentOut() {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== '--out' || !args[1]) fail('Usage: node tools/ct-batch/generate-ct-review-packet.mjs --out <path>');
  return path.resolve(ROOT, args[1]);
}
function lessonLines(lesson, index, id) {
  if (!lesson || typeof lesson !== 'object') fail(`${id}.lessons[${index}] is malformed`);
  if (lesson.type === 'prose') return [`### Lesson ${index + 1}: ${ha(lesson.heading, `${id}.lessons[${index}].heading`)}`, '', ha(lesson.body, `${id}.lessons[${index}].body`), ''];
  if (lesson.type === 'glossary-card') return [`### Lesson ${index + 1}: Glossary`, '', `- **${ha(lesson.term, `${id}.lessons[${index}].term`)}:** ${ha(lesson.definition, `${id}.lessons[${index}].definition`)}`, ''];
  if (lesson.type === 'example') return [`### Lesson ${index + 1}: ${ha(lesson.title, `${id}.lessons[${index}].title`)}`, '', `**Scenario:** ${ha(lesson.scenario, `${id}.lessons[${index}].scenario`)}`, '', `**Takeaway:** ${ha(lesson.takeaway, `${id}.lessons[${index}].takeaway`)}`, ''];
  fail(`${id}.lessons[${index}].type is unsupported`);
}

async function main() {
  const out = argumentOut();
  const [completeBytes, imageBytes] = await Promise.all([readFile(COMPLETE_PATH), readFile(IMAGE_PATH)]);
  let complete; let images;
  try { complete = JSON.parse(completeBytes.toString('utf8')); images = JSON.parse(imageBytes.toString('utf8')); }
  catch { fail('One or more source inputs contain invalid JSON'); }
  if (!Array.isArray(complete) || !Array.isArray(images)) fail('Source inputs must be JSON arrays');

  const modules = MODULE_IDS.map((id) => {
    const module = complete.find((item) => item?.id === id);
    const image = images.find((item) => item?.id === id);
    if (!module) fail(`Missing module ${id}`);
    if (!image) fail(`Missing image-manifest entry ${id}`);
    text(module.titleEn, `${id}.titleEn`); text(module.titleHa, `${id}.titleHa`); ha(module.summary, `${id}.summary`);
    text(module.textExplanationHa, `${id}.textExplanationHa`);
    if (!Array.isArray(module.lessons) || module.lessons.length === 0) fail(`${id}.lessons is missing or empty`);
    if (!Array.isArray(module.quiz) || module.quiz.length !== 5) fail(`${id}.quiz must contain five items`);
    if (!Array.isArray(module.quizQuestions) || JSON.stringify(module.quiz) !== JSON.stringify(module.quizQuestions)) fail(`${id}.quiz and quizQuestions must be identical`);
    if (typeof module.isChainLeaf !== 'boolean') fail(`${id}.isChainLeaf must be boolean`);
    if (id === 'CT10' ? module.chainNext !== null : !MODULE_IDS.includes(module.chainNext)) fail(`${id}.chainNext is malformed`);
    if (id !== 'CT10') ha(module.gapTeaser, `${id}.gapTeaser`);
    else if (module.gapTeaser !== null) fail('CT10.gapTeaser must be null for the chain leaf');
    ha(module.useTodayPrompt, `${id}.useTodayPrompt`);
    text(image.type, `${id} image type`); text(image.depictEn, `${id} image depictEn`);
    if (!Array.isArray(image.labelsHa) || image.labelsHa.length === 0) fail(`${id} image labelsHa is missing or empty`);
    image.labelsHa.forEach((label, n) => text(label, `${id} image labelsHa[${n}]`)); text(image.safetyNote, `${id} image safetyNote`);
    if (!Array.isArray(ASSESSMENT[id]) || ASSESSMENT[id].length !== 5) fail(`Missing assessment rationale for ${id}`);
    module.quiz.forEach((q, n) => {
      text(q?.templateHa, `${id}.quiz[${n}].templateHa`); text(q.answerFormula, `${id}.quiz[${n}].answerFormula`);
      if (!Array.isArray(q.distractorFormulas) || q.distractorFormulas.length !== 3) fail(`${id}.quiz[${n}].distractorFormulas must contain three items`);
      q.distractorFormulas.forEach((d, di) => text(d, `${id}.quiz[${n}].distractorFormulas[${di}]`));
    });
    return { module, image };
  });

  const lines = [
    '# CT04–CT10 Hausa Review Packet — Final', '',
    'Generated directly from the final CT JSON and image manifest. This is a human-review packet, not an approval or integration decision.', '',
    '## Source record', '',
    `- CT complete SHA-256: \`${hash(completeBytes)}\``,
    `- CT image manifest SHA-256: \`${hash(imageBytes)}\``, '',
    '## Module review', '',
  ];
  for (const { module, image } of modules) {
    const count = words(module.textExplanationHa);
    lines.push(`## ${module.id} — ${module.titleEn}`, '', `- **Hausa title:** ${module.titleHa}`, `- **Summary:** ${ha(module.summary, `${module.id}.summary`)}`, `- **textExplanationHa word count:** ${count}`, '', '### Lesson cards', '');
    module.lessons.forEach((lesson, index) => lines.push(...lessonLines(lesson, index, module.id)));
    lines.push('### Quiz', '');
    module.quiz.forEach((q, index) => lines.push(`#### Q${index + 1}`, '', `- **Question:** ${q.templateHa}`, `- **Keyed answer:** ${q.answerFormula}`, `- **Distractor 1:** ${q.distractorFormulas[0]}`, `- **Distractor 2:** ${q.distractorFormulas[1]}`, `- **Distractor 3:** ${q.distractorFormulas[2]}`, ''));
    lines.push('### Chain and use today', '', `- **Gap teaser:** ${module.id === 'CT10' ? '(leaf)' : ha(module.gapTeaser, `${module.id}.gapTeaser`)}`, `- **chainNext:** ${module.chainNext ?? '(none)'}`, `- **isChainLeaf:** ${module.isChainLeaf}`, `- **Use today:** ${ha(module.useTodayPrompt, `${module.id}.useTodayPrompt`)}`, '', '### Image specification', '', `- **Type:** ${image.type}`, `- **depictEn:** ${image.depictEn}`, `- **labelsHa:** ${image.labelsHa.join('; ')}`, `- **Safety note:** ${image.safetyNote}`, '');
  }
  lines.push('## Assessment review', '', '| Item | Question | Correct answer | Distractor 1 | Distractor 2 | Distractor 3 | Skill assessed | Where taught | Why uniquely best |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const { module } of modules) module.quiz.forEach((q, index) => {
    const [skill, where, why] = ASSESSMENT[module.id][index];
    lines.push(`| ${module.id} Q${index + 1} | ${escapeCell(q.templateHa)} | ${escapeCell(q.answerFormula)} | ${escapeCell(q.distractorFormulas[0])} | ${escapeCell(q.distractorFormulas[1])} | ${escapeCell(q.distractorFormulas[2])} | ${skill} | ${where} | ${why} |`);
  });
  lines.push('', '## Changed-distractor ledger', '', '| Item | Previous wording | Corrected wording | Reasoning error represented |', '| --- | --- | --- | --- |');
  for (const [item, previous, error] of LEDGER) {
    const match = /^CT(\d\d) Q(\d)$/.exec(item); if (!match) fail(`Malformed ledger item ${item}`);
    const module = modules.find(({ module: entry }) => entry.id === `CT${match[1]}`)?.module;
    const question = module?.quiz[Number(match[2]) - 1]; if (!question) fail(`Ledger item does not resolve: ${item}`);
    const distractorIndex = LEDGER_DISTRACTOR_INDEX.get(`${item}|${previous}`);
    if (!Number.isInteger(distractorIndex)) fail(`Missing corrected-distractor mapping for ${item}`);
    const corrected = distractorIndex === -1 ? question.answerFormula : question.distractorFormulas[distractorIndex];
    lines.push(`| ${item} | ${escapeCell(previous)} | ${escapeCell(corrected)} | ${error} |`);
  }
  lines.push('', '## Human approval status', '', 'FINAL HUMAN-REVIEW PACKET — awaiting user approval of CT04–CT10 Hausa and assessments.', '');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, `${lines.join('\n')}\n`, 'utf8');
}

main().catch((error) => { console.error(`generate-ct-review-packet: ${error.message}`); process.exitCode = 1; });
