#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(readFileSync(join(here, '../../app/content.json'), 'utf8'));

const p4Science = {
  'p4-bsci-01': ['diagram', 'Three clearly separated plant examples shown at the same scale: a tall tree with one woody trunk, a shrub with several woody stems near the ground, and a soft-stemmed herb.', ['Bishiya', 'Ƙaramar Bishiya', 'Ganye'], 'Keep the plants intact and healthy; no child cutting or uprooting them.'],
  'p4-bsci-02': ['diagram', 'Two animal groups side by side: a fish, bird, and goat with a simple backbone line highlighted; an earthworm, snail, and insect without a backbone line.', ['Masu Ƙashin Baya', 'Marasa Ƙashin Baya'], 'Use friendly, non-graphic animal drawings; no dissection or exposed anatomy.'],
  'p4-bsci-03': ['diagram', 'Three soil samples in shallow clear trays showing sandy soil with large grains, clay soil with fine packed particles, and loamy soil with a dark crumbly mixture.', ['Ƙasa Mai Yashi', 'Ƙasa Mai Laka', 'Ƙasa Mai Taki'], 'Observation only; include a hand-washing cue and do not show anyone tasting soil.'],
  'p4-bsci-04': ['diagram', 'A farm cross-section showing crops rooted in suitable soil, compost being added by an adult, and channels carrying water without washing the soil away.', [], 'Show an adult handling farm tools; keep children away from sharp tools and chemicals.'],
  'p4-bsci-05': ['diagram', 'Four everyday energy-source examples linked to their uses: sunlight on a solar panel, food supporting a walking child, a battery lighting a torch, and wind turning a small windmill.', ['Rana', 'Abinci', 'Batiri', 'Iska'], 'No open flame, fuel container, or mains electricity.'],
  'p4-bsci-06': ['diagram', 'A safe classroom comparison: a complete low-voltage battery-and-bulb circuit beside a crossed-out wall socket and damaged wire that children must not touch.', ['Batiri', 'Waya', 'Fitila'], 'Battery classroom model only; no child touching a socket, bare wire, or household electrical equipment.'],
  'p4-bsci-07': ['diagram', 'Two panels showing a child safely pushing a light box away and pulling a small wheeled toy closer, with arrows indicating force direction.', ['Tura', 'Ja'], 'Use only light classroom objects; no heavy load or unsafe strain.'],
  'p4-bsci-08': ['diagram', 'A ball rolling farther on a smooth surface and stopping sooner on a rough surface, with arrows showing movement and friction opposing it.', ['Motsi', 'Goga'], 'No fast vehicle or fall hazard; use a small ball on level ground.'],
  'p4-bsci-09': ['diagram', 'A four-step personal-hygiene sequence: washing hands with soap, brushing teeth, bathing, and wearing clean clothes.', [], 'Keep the child fully clothed where appropriate and avoid medical or body-shaming imagery.'],
  'p4-bsci-10': ['diagram', 'Before-and-after surroundings: littered ground and an open drain on one side; swept ground, covered bin, and clear drain on the other.', ['Muhalli Mai Tsafta'], 'No child touching waste or entering a drain; cleanup is shown with an adult and safe tools.'],
  'p4-bsci-11': ['diagram', 'A malaria-prevention scene with a child sleeping under a properly tucked mosquito net, a covered water container, and an adult clearing stagnant water.', ['Gidan Sauro'], 'Do not show illness symptoms, spraying near children, or a child handling chemicals.'],
  'p4-bsci-12': ['diagram', 'Four prevention panels: handwashing with soap, covered cooked food, clean drinking water in a covered vessel, and a clean latrine area.', [], 'No depiction of diarrhoea symptoms or waste; keep the scene calm and hygienic.'],
  'p4-bsci-13': ['diagram', 'A weather station layout with a rain gauge, thermometer, wind vane, and windsock, each clearly separated and connected to a weather icon.', ['Kayan Auna Yanayi'], 'Instruments are observed with a teacher; no broken glass or climbing.'],
  'p4-bsci-14': ['diagram', 'A seven-day weather-record table beside matching daily icons for sun, cloud, rain, and wind, with one example observation entered.', ['Yanayi'], 'Use mild everyday weather only; no dangerous storm scene.'],
  'p4-bsci-15': ['diagram', 'A safe-distance fire-and-heat scene: an adult tends a small cooking fire while a child stands well back; a second panel shows cool running water as the first response to a minor burn.', ['Wuta', 'Zafi'], 'No visible injury, child near flame, fuel pouring, or unsafe firefighting action.'],
  'p4-bsci-16': ['diagram', 'Two paired changes: ice melting and refreezing as a reversible change; paper burned to ash as a change that is not easily reversed, shown only as an adult-controlled demonstration icon.', ['Sauyin da Za a Iya Mayarwa', 'Sauyin da Ba Ya Sauƙin Mayarwa'], 'Fire example must be symbolic and adult-controlled; no child, open flame close-up, or handling hot material.'],
  'p4-bsci-17': ['diagram', 'Two arrowed life cycles: seed to seedling to flowering plant to seed, and egg to young animal to adult.', ['Tsiro', 'Dabba'], 'Use simple, non-graphic stages; no birth or predation scene.'],
  'p4-bsci-18': ['diagram', 'A simple clothed torso outline with the food path shown from mouth through stomach and intestines, plus four tooth shapes beside the mouth for cutting and grinding.', ['Baki', 'Ciki', 'Haƙora'], 'Non-graphic educational outline only; no exposed organs, procedure, or illness.'],
  'p4-bsci-19': ['diagram', 'A vibrating drum skin sending widening wave lines through air toward a listener, plus a hand gently plucking a stretched rubber band.', ['Sauti', 'Iska'], 'No excessive-noise source close to an ear and no child placing objects in the ear.'],
  'p4-bsci-20': ['diagram', 'A stationary car viewed from the side with external parts identified, beside a child standing safely with an adult away from the road.', ['Taya', 'Ƙofa', 'Fitila', 'Madubi'], 'Vehicle must be parked with engine off; no child under, inside, or touching moving parts.'],
  'p4-bsci-21': ['diagram', 'A balanced meal plate containing grains or tubers, beans or fish, vegetables, and fruit, with clean water and a simple growth arrow.', [], 'Use ordinary local foods; no body-size comparison or claims that one food alone causes growth.'],
};

function mathBrief(m) {
  const t = m.titleEn.toLowerCase();
  let depict = `A clean classroom diagram teaching “${m.titleEn}” with large readable numerals, a worked visual example, and familiar counters or objects arranged from left to right.`;
  let safety = 'Use uncluttered, age-appropriate classroom objects; avoid branded products and unnecessary text.';
  if (/counting|numbers? (1|up|to)|place value|ordering|comparing|greater|odd|even|rounding|estimating/.test(t)) depict = `A number-line and place-value visual for “${m.titleEn}”: grouped counters or bundled sticks, large numerals, and arrows or comparison signs showing the exact relationship.`;
  if (/addition|subtraction|mixed addition|giving change/.test(t)) depict = `A step-by-step arithmetic layout for “${m.titleEn}” using two small groups of familiar objects, a clear operation sign, and a final combined or remaining group; include a compact vertical-number example where appropriate.`;
  if (/multiplication|tables|skip counting/.test(t)) depict = `Equal rows of counters illustrating “${m.titleEn}”, with repeated-addition jumps on a number line and one matching multiplication sentence.`;
  if (/division|sharing|grouping/.test(t)) depict = `A set of familiar counters shared into equal groups for “${m.titleEn}”, with arrows showing fair distribution and one matching division sentence.`;
  if (/fraction/.test(t)) depict = `Several identical circles or rectangles partitioned into equal parts for “${m.titleEn}”; selected parts are shaded consistently, with equivalent or compared fractions aligned side by side.`;
  if (/decimal/.test(t)) depict = `A place-value chart and hundred-grid for “${m.titleEn}”, with the decimal point clearly aligned and tenths/hundredths shown by shaded cells.`;
  if (/percent/.test(t)) depict = `A 10-by-10 hundred-grid illustrating “${m.titleEn}”, with shaded cells linked by arrows to the matching fraction, decimal, and percentage.`;
  if (/money|naira|kobo|amounts|change/.test(t)) { depict = `A market-style learning scene for “${m.titleEn}” using clearly educational Nigerian naira and kobo representations, price tags, and a simple total or change calculation.`; safety = 'Use generic educational currency representations, not photorealistic banknote reproductions; no branded goods.'; }
  if (/time|clock|hour|week|days/.test(t)) depict = `Two large analog clock faces and a simple daily schedule illustrating “${m.titleEn}”; hour and minute hands are visually distinct and point exactly to the stated times.`;
  if (/length|metre|centimetre/.test(t)) depict = `A ruler or metre rule aligned from zero beside familiar objects of different lengths for “${m.titleEn}”, with units and endpoints clearly marked.`;
  if (/weight|mass|kilogram|gram/.test(t)) depict = `A balanced weighing scale comparing familiar objects for “${m.titleEn}”, with gram and kilogram units shown beside appropriate light and heavy examples.`;
  if (/capacity|litre|millilitre/.test(t)) depict = `Transparent containers of different capacities for “${m.titleEn}”, with litre and millilitre level marks and arrows showing safe pouring between containers.`;
  if (/shape|perimeter|area|angle|triangle|quadrilateral|volume|cuboid|line|corner/.test(t)) depict = `A precise geometry diagram for “${m.titleEn}” using large simple shapes, highlighted sides or angles, measurement marks, and a square grid where area or volume is involved.`;
  if (/table|bar chart|data|pictograph|average|mean|probability/.test(t)) depict = `A small, readable data display for “${m.titleEn}”: familiar objects supply the counts, then a matching table, pictograph, bar chart, average marker, or probability set shows how the data is interpreted.`;
  if (/ratio|proportion/.test(t)) depict = `Two color-coded groups of familiar counters illustrating “${m.titleEn}”, with equal scaling arrows and the matching ratio or proportion written beside them.`;
  if (/algebra|equation|unknown/.test(t)) depict = `A balance-scale model for “${m.titleEn}”, with a letter or covered box representing the unknown and equal groups on both sides showing how the value is found.`;
  if (/revision|review|bridge|word problem|mixed/.test(t)) depict = `A tidy four-panel review board for “${m.titleEn}”, combining the module’s main visual models—numbers or operations, measurement, geometry, and data—with one short worked example in each relevant panel.`;
  return ['diagram', depict, [], safety];
}

function entry(m, brief) {
  const [type, depictEn, labelsHa, safetyNote] = brief;
  return { id: m.id, imagePath: m.imageCard ?? `images/${m.id}.png`, titleEn: m.titleEn, titleHa: m.titleHa, type, depictEn, labelsHa, safetyNote };
}

function write(name, modules, briefFor) {
  writeFileSync(join(here, name), `${JSON.stringify(modules.map((m) => entry(m, briefFor(m))), null, 2)}\n`);
}

const p4 = content.modules.filter((m) => /^p4-bsci-/.test(m.id));
write('p4-bsci-image-manifest.json', p4, (m) => p4Science[m.id]);

for (let grade = 1; grade <= 6; grade += 1) {
  const modules = content.modules.filter((m) => new RegExp(`^p${grade}-maths-`).test(m.id));
  write(`p${grade}-maths-image-manifest.json`, modules, mathBrief);
}

console.log(`Wrote P4 Basic Science (${p4.length}) and P1-P6 Mathematics (${content.modules.filter((m) => /^p[1-6]-maths-/.test(m.id)).length}) manifests.`);
