#!/usr/bin/env node
// Regression fixtures for the decimal-aware sentence splitter and the
// redundancy detector built on top of it. Dev-tool only; not part of the
// runtime app. Run with: node tools/p1-batch/test-redundancy-splitter.mjs
import { sentences, findRedundancy } from './check-within-module-redundancy.mjs';

let failures = 0;

function assertSentences(label, text, expected) {
  const actual = sentences(text);
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures += 1;
    console.error(`FAIL: ${label}`);
    console.error(`  expected: ${JSON.stringify(expected)}`);
    console.error(`  actual:   ${JSON.stringify(actual)}`);
  } else {
    console.log(`PASS: ${label}`);
  }
}

function assertFindings(label, modules, expectMatch) {
  const findings = findRedundancy(modules);
  const found = findings.some((f) => f.includes(expectMatch));
  if (!found) {
    failures += 1;
    console.error(`FAIL: ${label}`);
    console.error(`  expected a finding containing: ${expectMatch}`);
    console.error(`  actual findings: ${JSON.stringify(findings)}`);
  } else {
    console.log(`PASS: ${label}`);
  }
}

function assertNoFindings(label, modules) {
  const findings = findRedundancy(modules);
  if (findings.length !== 0) {
    failures += 1;
    console.error(`FAIL: ${label}`);
    console.error(`  expected zero findings, got: ${JSON.stringify(findings)}`);
  } else {
    console.log(`PASS: ${label}`);
  }
}

// --- Must not split: decimal points stay inside their sentence ---

assertSentences(
  'decimal number does not fragment a sentence',
  'A 3.45, lamba 5 tana wurin ɗari.',
  ['A 3.45, lamba 5 tana wurin ɗari.'],
);

assertSentences(
  'two decimal numbers compared in one sentence stay whole',
  '2.6 ya bambanta da 2.06.',
  ['2.6 ya bambanta da 2.06.'],
);

assertSentences(
  'three-decimal comparison sentence stays whole',
  '2.60 da 2.6 suna da ƙima ɗaya.',
  ['2.60 da 2.6 suna da ƙima ɗaya.'],
);

assertSentences(
  'decimal comparison with a following sentence splits only at the real boundary',
  '0.5 ya fi 0.25 girma.',
  ['0.5 ya fi 0.25 girma.'],
);

// --- Must still split: genuine sentence boundaries are preserved ---

assertSentences(
  'two plain sentences still split',
  'Auna tsawon littafin. Rubuta sakamakon.',
  ['Auna tsawon littafin.', 'Rubuta sakamakon.'],
);

assertSentences(
  'a sentence ending after a decimal number still splits before the next sentence',
  'Ka duba 3.45. Sannan ka kwatanta shi da 3.54.',
  ['Ka duba 3.45.', 'Sannan ka kwatanta shi da 3.54.'],
);

assertSentences(
  'a sentence ending with a whole number still splits before the next sentence',
  'Akwai littattafai 10. Ka lissafa su duka.',
  ['Akwai littattafai 10.', 'Ka lissafa su duka.'],
);

assertSentences(
  'Hausa question and exclamation punctuation still split',
  'Ka gama aiki? Ee, na gama!',
  ['Ka gama aiki?', 'Ee, na gama!'],
);

// --- Genuine redundancy is still caught ---

assertFindings(
  'a genuine verbatim duplicate sentence is still reported',
  [{ id: 'fixture-01', textExplanationHa: 'Ka duba littafin sosai. Wani abu daban. Ka duba littafin sosai.' }],
  'normalized duplicate sentences 1 and 3',
);

// --- The four real modules under review must now be clean ---

assertNoFindings('p5-maths-13 style decimal comparisons produce zero findings', [{
  id: 'p5-maths-13',
  textExplanationHa: 'Desimal hanya ce ta rubuta lamba da ɓangaren da bai kai ɗaya cikakke ba. A 3.4, lamba 3 tana gefen hagu. A 3.45, lamba 5 tana matsayi na ɗari-ɗari. Ka karanta 2.6 a matsayin biyu da kashi shida cikin goma. Ka karanta 2.06 a matsayin biyu da kashi shida cikin ɗari. Wannan ya bambanta da 2.60, wanda yake da daraja ɗaya da 2.6.',
}]);

if (failures > 0) {
  console.error(`\n${failures} regression fixture(s) failed.`);
  process.exitCode = 1;
} else {
  console.log('\nAll regression fixtures passed.');
}
