const latin = {
  title: "Gwajin Ajami",
  summary: "Takaitaccen bayani ne na gwajin Ajami.",
  explanation: "Wannan rubutu ne na gwaji domin a tantance tsarin Ajami.",
  heading: "Taken darasi",
  body: "Jikin darasin gwaji.",
  term: "Kalma",
  definition: "Ma'anar kalmar gwaji.",
  exampleTitle: "Misali",
  scenario: "An kawo misali mai sauƙi.",
  takeaway: "A duba tsari kafin a yarda.",
  teaser: "Darasi na gaba zai zurfafa wannan aiki.",
  prompt: "Yau, duba tsari guda kafin ka ci gaba.",
};

const ajami = {
  title: "اَجَمِي",
  summary: "تَكَايتَچَّن بَيَنِي",
  explanation: "وَنَّن رُبُتُو نِي نَا ڠَوَجِي",
  heading: "تَكِن دَرَسِي",
  body: "جِكِن دَرَسِن ڠَوَجِي",
  term: "كَلْمَا",
  definition: "مَعْنَر كَلْمَر ڠَوَجِي",
  exampleTitle: "مِسَلِي",
  scenario: "اَن كَوُو مِسَلِي مَي سَوڪِي",
  takeaway: "اَ دُبَا ڟَرِي كَفِن اَ يَرْدَا",
  teaser: "دَرَسِي نَا غَبَا",
  prompt: "يَو، دُبَا ڟَرِي غُدَا",
};

function pair(ha, ajamiValue) {
  return { ha, ajami: ajamiValue };
}

function quizItem(index) {
  return {
    templateHa: `Tambayar gwaji ta ${index}?`,
    answerFormula: `Amsa ta ${index}`,
    variableRanges: { a: { min: 0, max: 0 }, b: { min: 0, max: 0 } },
    distractorFormulas: [`Kuskure ${index}-1`, `Kuskure ${index}-2`, `Kuskure ${index}-3`],
  };
}

function moduleFixture({ ajamiValidated, ajamiValue, mutate = () => {} }) {
  const lessons = [
    { type: "prose", heading: pair(latin.heading, ajamiValue.heading), body: pair(latin.body, ajamiValue.body) },
    { type: "glossary-card", term: pair(latin.term, ajamiValue.term), definition: pair(latin.definition, ajamiValue.definition) },
    { type: "glossary-card", term: pair(latin.term, ajamiValue.term), definition: pair(latin.definition, ajamiValue.definition) },
    { type: "example", title: pair(latin.exampleTitle, ajamiValue.exampleTitle), scenario: pair(latin.scenario, ajamiValue.scenario), takeaway: pair(latin.takeaway, ajamiValue.takeaway) },
    { type: "prose", heading: pair(latin.heading, ajamiValue.heading), body: pair(latin.body, ajamiValue.body) },
  ];
  const quiz = Array.from({ length: 5 }, (_, index) => quizItem(index + 1));
  const module = {
    id: "AJAMI-TEST-01",
    gradeband: "adult",
    subject: "Fixture",
    subjectHa: "Gwaji",
    moduleNumber: 1,
    titleEn: "Ajami Fixture",
    titleHa: latin.title,
    titleAjami: ajamiValue.title,
    title: pair(latin.title, ajamiValue.title),
    ajami_validated: ajamiValidated,
    summary: pair(latin.summary, ajamiValue.summary),
    textExplanationHa: latin.explanation,
    textExplanationAjami: ajamiValue.explanation,
    audioScript: null,
    audioFile: null,
    imageCard: null,
    lessons,
    microPauses: [],
    passingScore: 3,
    quiz,
    quizQuestions: structuredClone(quiz),
    track: "vocational",
    targetAudience: "adult",
    gapTeaser: pair(latin.teaser, ajamiValue.teaser),
    chainNext: "AJAMI-TEST-02",
    isChainLeaf: false,
    useTodayPrompt: pair(latin.prompt, ajamiValue.prompt),
  };
  const leafModule = structuredClone(module);
  mutate(module);
  return { modules: [module, { ...leafModule, id: "AJAMI-TEST-02", chainNext: null, isChainLeaf: true, gapTeaser: null }] };
}

const nullAjami = Object.fromEntries(Object.keys(ajami).map((key) => [key, null]));

export const fixtures = [
  {
    id: "01-false-null-ajami",
    expected: "pass",
    data: moduleFixture({ ajamiValidated: false, ajamiValue: nullAjami }),
  },
  {
    id: "02-true-valid-ajami",
    expected: "pass",
    data: moduleFixture({ ajamiValidated: true, ajamiValue: ajami }),
  },
  {
    id: "03-true-missing-required-ajami",
    expected: "fail",
    data: moduleFixture({
      ajamiValidated: true,
      ajamiValue: ajami,
      mutate: (module) => { module.useTodayPrompt.ajami = null; },
    }),
  },
  {
    id: "04-false-malformed-nonnull-ajami",
    expected: "fail",
    data: moduleFixture({
      ajamiValidated: false,
      ajamiValue: nullAjami,
      mutate: (module) => { module.gapTeaser.ajami = { invalid: true }; },
    }),
  },
  {
    id: "05-missing-required-latin",
    expected: "fail",
    data: moduleFixture({
      ajamiValidated: false,
      ajamiValue: nullAjami,
      mutate: (module) => { module.useTodayPrompt.ha = null; },
    }),
  },
];
