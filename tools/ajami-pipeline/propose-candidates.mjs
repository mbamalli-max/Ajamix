#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CANONICAL_MAPPING } from "./mapping.mjs";
import { formatCodePoints, tokenize } from "./tokenizer.mjs";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.json");
const MARKDOWN_PATH = path.join(MODULE_DIR, "data", "review-queue-top500.md");

const CONFIDENCE_ORDER = new Map([
  ["low", 0],
  ["medium", 1],
  ["high", 2],
]);

const consonantCodepoints = new Map(
  [
    ...CANONICAL_MAPPING.canonicalConsonants,
    ...CANONICAL_MAPPING.provisionalVelarClusters,
  ].map((entry) => [entry.token, [...(entry.codePoints ?? [entry.codePoint])]])
);

const COMMON_WORD_ANALYSES = new Map(
  Object.entries({
    da: {
      long: [],
      note:
        "Hausa `da` here is the short-vowel conjunction/preposition (‘and/with’), not distinct long-vowel `dā` (‘formerly’).",
    },
    ka: {
      long: [],
      note: "In the examples, `ka` is the second-person singular subject/imperative particle with short `a`.",
    },
    a: {
      long: [],
      note: "Standalone `a` is the common impersonal/locative function word, read with short `a`.",
    },
    ya: {
      long: [1],
      note: "In examples such as `ya shigo`, `ya` is the third-person masculine perfect subject marker, proposed as long `yā`.",
    },
    ko: {
      long: [1],
      note: "The corpus uses Hausa `ko` as the disjunctive particle ‘or’, conventionally read `kō` with long `o`.",
    },
    ba: {
      long: [],
      note: "The examples use `ba` as the negative particle, with short `a`, rather than an unrelated lexical form.",
    },
    ne: {
      long: [1],
      note: "The corpus uses the masculine copular particle `ne`, conventionally `nē` with long `e`.",
    },
    ta: {
      long: [],
      note: "Here `ta` is the feminine linker/subject form in phrases such as `lamba ta ƙarshe`, proposed with short `a`.",
    },
    mai: {
      long: [],
      note: "`mai` is the productive Hausa possessor/agentive particle and its written `ai` is the lexical diphthong.",
    },
    cikin: {
      long: [],
      note: "`cikin` is the common locative/genitive form ‘inside/of’; both written `i` vowels are short.",
    },
    kuma: {
      long: [3],
      note: "`kuma` is the additive particle ‘also/and’, read with short medial `u` and a long final `a`.",
    },
    yana: {
      long: [3],
      note: "`yana` is the masculine progressive subject construction in the examples: short first `a`, long final progressive vowel.",
    },
    tana: {
      long: [3],
      note: "`tana` is the feminine progressive subject construction in the examples: short first `a`, long final progressive vowel.",
    },
    suna: {
      long: [3],
      note: "`suna` is the plural progressive subject construction here: short `u`, long final progressive vowel.",
    },
    yi: {
      long: [1],
      note: "The high-frequency verb `yi` (‘do/make’) is conventionally `yī`, with long `i`.",
    },
    za: {
      long: [1],
      note: "The future particle `za` is conventionally `zā`, with long `a`.",
    },
    shi: {
      long: [2],
      note: "Independent/object pronoun `shi` is conventionally `shī`, with long `i`.",
    },
    fi: {
      long: [1],
      note: "Comparative verb `fi` (‘exceed/be more’) is conventionally `fī`, with long `i`.",
    },
    yau: {
      long: [],
      note: "The temporal noun `yau` (‘today’) contains the lexical `au` diphthong represented by the approved sequence.",
    },
    zai: {
      long: [],
      note: "Future masculine `zai` contains the lexical `ai` diphthong, not two separately timed vowels.",
    },
    ce: {
      long: [1],
      note: "The frequent verb/copular form `ce` is proposed with its conventional long final `e`.",
    },
    me: {
      long: [1],
      note: "Interrogative `me` (‘what’) is conventionally `mē`, with long `e`.",
    },
    mu: {
      long: [],
      note: "The examples place subject pronoun `mu` after future `za` (`za mu`); that bound subject form is proposed with short `u`.",
    },
    su: {
      long: [],
      note: "The examples use `su` as the third-person plural object/subject form, proposed with short `u` rather than independent emphatic length.",
    },
    na: {
      long: [],
      note: "In examples such as `darasi na yau`, `na` is the masculine genitive linker, proposed with short `a`.",
    },
    wa: {
      long: [],
      note: "The corpus uses dative/linking `wa` (‘to/for’), proposed with short `a`, not long interrogative `wā` (‘who’).",
    },
    ke: {
      long: [],
      note: "The examples use the bound relative/progressive particle `ke`, proposed with short `e`.",
    },
    ci: {
      long: [1],
      note: "The verb `ci` (‘eat/continue’ in the fixed `ci gaba` expression) is conventionally `cī` with long `i`.",
    },
  })
);

const H_CATEGORY_CODEPOINT = new Map([
  ["H_HAUSA_PHONEMIC", "U+062D"],
  ["H_ARABIC_HA_PRESERVED", "U+062D"],
  ["H_ARABIC_HEH_PRESERVED", "U+0647"],
  ["H_ARABIC_KHA_PRESERVED", "U+062E"],
  ["H_HAUSA_EPENTHETIC", "U+062D"],
]);

// These are proposal rules, not approvals.  They identify the source-class
// question that Muhammad must rule on; an unmatched or genuinely ambiguous
// word stays H_LEXICAL_UNRESOLVED instead of falling through to a binary
// Arabic-vs-native guess.
const H_LEXICAL_ANALYSES = Object.freeze([
  { pattern: /^fahim/u, category: "H_ARABIC_HEH_PRESERVED", confidence: "high", note: "The fahim- family is related to Arabic fahm/fahima (فهم), whose consonant is hāʾ (ه)." },
  { pattern: /^(?:muhimm|mahim)/u, category: "H_LEXICAL_UNRESOLVED", confidence: "low", note: "The muhimm-/mahim- family is built on Arabic مهم with hāʾ (ه), but its answered legacy decisions conflict between ه and ح and the project has no word-specific Ajami attestation establishing preservation rather than nativization." },
  { pattern: /^zahir/u, category: "H_ARABIC_HEH_PRESERVED", confidence: "high", note: "The zahir- family is related to Arabic ظاهر, which contains hāʾ (ه)." },
  { pattern: /^wahala/u, category: "H_ARABIC_HEH_PRESERVED", confidence: "medium", note: "Wahala is traced to Arabic وَهْلَة, whose consonant is hāʾ (ه); the inflected form retains the same stem." },
  { pattern: /^ainihi/u, category: "H_LEXICAL_UNRESOLVED", confidence: "low", note: "Ainihi is commonly related to Arabic عينه with hāʾ (ه), but the project has no word-specific Ajami attestation establishing preservation rather than Hausa nativization." },

  { pattern: /^(?:alhaki|haƙƙ|hakki)/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "This family is related to Arabic ḥaqq (حق), whose source consonant is ḥāʾ (ح)." },
  { pattern: /^(?:muhalli|mahalli)/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "This family is related to Arabic maḥall (محل), whose source consonant is ḥāʾ (ح)." },
  { pattern: /^(?:hali(?:n)?|halaye(?:nsu)?)$/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "The hali/halaye family is related to Arabic ḥāl (حال), whose source consonant is ḥāʾ (ح)." },
  { pattern: /^halitt/u, category: "H_LEXICAL_UNRESOLVED", confidence: "low", note: "The halitta family was previously assigned the general ح default only after no word-specific Ajami attestation was found; that evidence does not establish a preserved-source category." },
  { pattern: /^hukum/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "The hukum- family is related to Arabic ḥukm/ḥukūma (حكم/حكومة), with ḥāʾ (ح)." },
  { pattern: /^hukunci/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "Hukunci belongs to the Arabic ḥukm (حكم) family, whose source consonant is ḥāʾ (ح)." },
  { pattern: /^fasaha/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "Fasaha is related to Arabic faṣāḥa (فصاحة), whose source consonant is ḥāʾ (ح)." },
  { pattern: /^hujja/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "Hujja is related to Arabic ḥujja (حجة), whose source consonant is ḥāʾ (ح)." },
  { pattern: /^halartar/u, category: "H_ARABIC_HA_PRESERVED", confidence: "medium", note: "Halartar belongs to the halarta/ḥaḍara family, with source ḥāʾ (ح); the suffix does not change the lexical consonant." },
  { pattern: /^hauwa/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "The proper name Hauwa corresponds to Arabic Ḥawwāʾ (حواء), beginning with ḥāʾ (ح)." },
  { pattern: /^sihir/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "Sihiri is related to Arabic siḥr (سحر), whose source consonant is ḥāʾ (ح)." },
  { pattern: /^haruff/u, category: "H_ARABIC_HA_PRESERVED", confidence: "high", note: "Haruffa is related to Arabic ḥurūf (حروف), whose source consonant is ḥāʾ (ح)." },
  { pattern: /^alhali/u, category: "H_ARABIC_HA_PRESERVED", confidence: "medium", note: "Alhali is built on the Arabic al-ḥāl expression (الحال), with ḥāʾ (ح)." },

  { pattern: /^tarihi/u, category: "H_ARABIC_KHA_PRESERVED", confidence: "low", note: "The tarihi- family is related to Arabic taʾrīkh (تاريخ), whose final source consonant is khāʾ (خ); this provisional preservation proposal still lacks word-specific Hausa Ajami attestation." },
  { pattern: /^haraji/u, category: "H_LEXICAL_UNRESOLVED", confidence: "low", note: "Haraji is related to Arabic kharāj (خراج), but its answered legacy decision used the general ح default after no word-specific Ajami attestation was found; preservation versus nativization remains unresolved." },
  { pattern: /^hulɗ/u, category: "H_ARABIC_KHA_PRESERVED", confidence: "low", note: "Hulɗa is commonly related to Arabic khulṭa (خلطة), whose source consonant is khāʾ (خ); word-specific Hausa Ajami attestation is still needed." },
  { pattern: /^hatsari/u, category: "H_LEXICAL_UNRESOLVED", confidence: "low", note: "Hatsari is commonly related to Arabic khaṭar (خطر) with khāʾ (خ), while its binary legacy decision recorded ه; without word-specific Ajami attestation, preservation versus nativization remains unresolved." },

  { pattern: /^hankal/u, category: "H_HAUSA_EPENTHETIC", confidence: "high", note: "The recorded project analysis traces hankali to Arabic ʿaql (عقل), which has no corresponding h-type consonant; Hausa supplied the initial /h/." },

  { pattern: /^(?:haɗ|hany|hann|hask|huɗ|hana|harshe|hawa|haƙor|haihu|hutu|huta|duhu|tsoho|ihu)/u, category: "H_HAUSA_PHONEMIC", confidence: "high", note: "This is an established Hausa stem whose surface /h/ is handled by the ordinary Hausa phonemic rule (ح)." },
  { pattern: /^haka(?:n)?$/u, category: "H_HAUSA_PHONEMIC", confidence: "high", note: "Haka/hakan is an ordinary Hausa demonstrative stem with phonemic /h/." },
  { pattern: /^har$/u, category: "H_HAUSA_PHONEMIC", confidence: "medium", note: "In this corpus use, har is an ordinary Hausa function word with phonemic /h/." },
  { pattern: /^haɗe/u, category: "H_HAUSA_PHONEMIC", confidence: "high", note: "Haɗe is a member of the Hausa haɗ- verbal family and has phonemic /h/." },
  { pattern: /^eh$/u, category: "H_HAUSA_PHONEMIC", confidence: "medium", note: "Eh is the Hausa affirmative interjection; its final /h/ is part of the Hausa lexical form." },
  { pattern: /^hoto/u, category: "H_HAUSA_PHONEMIC", confidence: "medium", note: "Hoto is a fully nativized Hausa form (historically from English photo); the surface consonant is Hausa /h/, not preserved Arabic spelling." },
  { pattern: /^rahot/u, category: "H_HAUSA_PHONEMIC", confidence: "medium", note: "The rahoto/rahotanni family is fully nativized Hausa vocabulary (historically from English report); its surface /h/ is not an Arabic-spelling preservation decision." },
]);

const APOSTROPHE_PROPOSALS = new Map([
  ["al'umma", { answer: 0, sequence: ["U+0623"], note: "`al’umma` is the Arabic-derived ‘community’ form; the internal mark corresponds to the lexical hamza at the `al-` boundary, not punctuation." }],
  ["jama'a", { answer: 0, sequence: ["U+0639"], note: "`jama’a` is Arabic-derived `jamāʿa`; the Boko apostrophe represents the internal ʿayn/glottal-class boundary and is not typographic punctuation." }],
  ["al'ada", { answer: 0, sequence: ["U+0639"], note: "`al’ada` is the established Arabic-derived ‘custom’ form from `ʿāda`; the apostrophe corresponds to lexical ʿayn after `al-`." }],
  ["murabba'i", { answer: 0, sequence: ["U+0639"], note: "`murabba’i` is Arabic-derived ‘square’; its apostrophe marks the lexical ʿayn before final `i`, not a morpheme break or quotation mark." }],
  ["sana'a", { answer: 0, sequence: ["U+0639"], note: "`sana’a` (‘occupation/craft’) is Arabic-derived and the internal apostrophe corresponds to lexical ʿayn." }],
  ["ma'aunin", { answer: 1, sequence: ["U+0623"], note: "`ma’aunin` transparently contains the instrument noun `ma’auni` from the `ma-` formation plus `auna`; I classify the break as morphological, while proposing a hamza-bearing carrier to keep the adjacent vowels distinct." }],
  ["ma'auni", { answer: 1, sequence: ["U+0623"], note: "`ma’auni` is related to `auna` (‘measure’) with the instrument-forming `ma-`; the apostrophe marks that morpheme boundary, with a proposed hamza-bearing carrier for the following vowel." }],
  ["ra'ayi", { answer: 0, sequence: ["U+0621"], note: "`ra’ayi` is the Arabic-derived ‘opinion’ form related to `raʾy`; the apostrophe represents lexical hamza, not punctuation." }],
]);

function normalizeWord(value) {
  return String(value ?? "")
    .normalize("NFC")
    .replace(/[\u2019\u02BC]/gu, "'")
    .toLocaleLowerCase("ha");
}

function characterPosition(source, sourceStart) {
  return Array.from(source.slice(0, sourceStart)).length;
}

function codepointsToString(codePoints) {
  return codePoints
    .map((label) => String.fromCodePoint(Number.parseInt(label.slice(2), 16)))
    .join("");
}

function optionCodepoints(option) {
  const text = String(option);
  const sequenceText = text.includes(" — ") ? text.slice(text.lastIndexOf(" — ") + 3) : text;
  return sequenceText.match(/U\+[0-9A-F]{4,6}/gu) ?? [];
}

function exampleText(entry) {
  return String(entry.exampleSentences?.[0] ?? "")
    .replace(/^\[[^\]]+\]\s*/u, "")
    .replaceAll("`", "'")
    .slice(0, 180);
}

function nextTokenAfterPosition(entry, position) {
  const tokens = tokenize(entry.boko).tokens;
  const index = tokens.findIndex(
    (token) => characterPosition(entry.boko, token.sourceStart) === position
  );
  return { token: tokens[index], next: tokens[index + 1], afterNext: tokens[index + 2] };
}

function isClosedSyllableVowel(entry, question) {
  const { next, afterNext } = nextTokenAfterPosition(entry, question.position);
  return (
    next?.type === "PHONEME" &&
    (!afterNext || afterNext.type === "PHONEME" || afterNext.type === "APOSTROPHE")
  );
}

function selectedVowelLength(entry, question) {
  const word = normalizeWord(entry.boko);
  const common = COMMON_WORD_ANALYSES.get(word);
  if (common) return common.long.includes(question.position) ? "long" : "short";
  if (question.type === "VOWEL_LENGTH" && isClosedSyllableVowel(entry, question)) {
    return "short";
  }
  // Open final syllables are more often quantity-bearing in the ordinary lexical
  // inventory. This remains explicitly low confidence absent reviewed pronunciation.
  return question.type === "WORD_FINAL_VOWEL" ? "long" : "short";
}

function vowelProposal(entry, question) {
  const length = selectedVowelLength(entry, question);
  const optionLabel = question.type === "WORD_FINAL_VOWEL" ? `${length} final` : length;
  const answer = question.options.find((option) =>
    String(option).startsWith(`${optionLabel} — `)
  );
  if (!answer || /must supply/iu.test(answer)) {
    throw new Error(
      `${entry.boko}/${question.type}@${question.position}: missing canonical ${length} option`
    );
  }
  const common = COMMON_WORD_ANALYSES.get(normalizeWord(entry.boko));
  if (common) {
    return {
      answer,
      sequence: question.candidateCodePointSequences[length],
      reasoning: `${common.note} This selects the ${length} sequence for the '${question.letter}' at position ${question.position}.`,
      confidence: "high",
      evidenceType: "COMMON_FUNCTION_WORD",
    };
  }
  if (question.type === "VOWEL_LENGTH" && isClosedSyllableVowel(entry, question)) {
    return {
      answer,
      sequence: question.candidateCodePointSequences.short,
      reasoning:
        `In \`${entry.boko}\`, the '${question.letter}' at position ${question.position} is closed by the following consonant sequence. ` +
        "That phonotactic environment supports a short vowel, though Muhammad should still check the lexical pronunciation.",
      confidence: "medium",
      evidenceType: "MORPHOLOGICAL_PATTERN",
    };
  }
  return {
    answer,
    sequence: question.candidateCodePointSequences[length],
    reasoning:
      `The queue uses \`${entry.boko}\` in “${exampleText(entry)}”; I read the '${question.letter}' at position ${question.position} as ${length}. ` +
      "The repository has no reviewed pronunciation record for this word, so this is a low-confidence proposal for Muhammad to check.",
    confidence: "low",
    evidenceType: "UNCERTAIN_BEST_GUESS",
  };
}

function carrierProposal(entry, question) {
  const letter = question.letter;
  const optionIndex = letter === "i" ? 2 : 1;
  const carrier = optionCodepoints(question.options[optionIndex]);
  return {
    answer: question.options[optionIndex],
    sequence: carrier,
    reasoning:
      `\`${entry.boko}\` begins with '${letter}'; the proposal uses a below-hamza carrier for initial /i/ and an above-hamza carrier for initial /a, u/. ` +
      "The standard leaves general initial-carrier practice provisional, so this conventional polarity still needs ratification.",
    confidence: "medium",
    evidenceType: "RULE_DEFAULT",
  };
}

function vowelSequenceProposal(entry, question) {
  const approved = question.candidateCodePointSequences?.approvedDiphthong;
  const optionIndex = approved ? 0 : 0;
  const sequence = approved ?? Object.values(question.candidateCodePointSequences)[0];
  const common = COMMON_WORD_ANALYSES.get(normalizeWord(entry.boko));
  return {
    answer: question.options[optionIndex],
    sequence,
    reasoning: common
      ? `${common.note} Standard §7 supplies the exact approved ${question.letters} sequence selected here.`
      : `In \`${entry.boko}\`, adjacent '${question.letters}' at positions ${question.position}-${question.position + 1} are read as the lexical diphthong, not as two syllable nuclei. Standard §7 supplies the exact sequence, but the word-level reading still needs human confirmation.`,
    confidence: common ? "high" : "medium",
    evidenceType: common ? "COMMON_FUNCTION_WORD" : "MORPHOLOGICAL_PATTERN",
  };
}

function hProposal(entry, question) {
  const word = normalizeWord(entry.boko);
  const analysis = H_LEXICAL_ANALYSES.find(({ pattern }) => pattern.test(word)) ?? {
    category: "H_LEXICAL_UNRESOLVED",
    confidence: "low",
    note: "The available project evidence does not establish the etymology/spelling treatment for this h occurrence.",
  };
  const codepoint = H_CATEGORY_CODEPOINT.get(analysis.category);
  const categoryOption = question.options.find((option) =>
    String(option).startsWith(`${analysis.category} — `)
  );
  // Already-answered legacy queues must remain byte-identical.  Proposals over
  // those queues adapt a fixed six-way category to the old glyph option without
  // rewriting either options or reviewerDecision.
  const legacyOption = codepoint
    ? question.options.find((option) => String(option).endsWith(`— ${codepoint}`))
    : undefined;
  const answer = analysis.category === "H_LEXICAL_UNRESOLVED"
    ? null
    : categoryOption ?? legacyOption ?? null;
  return {
    answer,
    sequence: codepoint && answer ? [codepoint] : [],
    reasoning:
      `${analysis.note} Provisional six-way category: ${analysis.category}. ` +
      (analysis.category === "H_LEXICAL_UNRESOLVED"
        ? "Muhammad must supply the exact Unicode replacement sequence; the proposer supplies no fallback glyph. "
        : "") +
      "This is a machine proposal only and does not ratify the question.",
    confidence: analysis.confidence,
    evidenceType:
      analysis.category === "H_LEXICAL_UNRESOLVED"
        ? "UNCERTAIN_BEST_GUESS"
        : analysis.category.startsWith("H_ARABIC_")
          ? "COGNATE_OR_LOAN"
          : "MORPHOLOGICAL_PATTERN",
    hCategory: analysis.category,
  };
}

function apostropheProposal(entry, question) {
  const proposal = APOSTROPHE_PROPOSALS.get(normalizeWord(entry.boko));
  if (!proposal) {
    return {
      answer: null,
      sequence: [],
      reasoning: `I cannot classify the apostrophe in \`${entry.boko}\` honestly from the available corpus context; Muhammad must supply both its role and resulting sequence.`,
      confidence: "low",
      evidenceType: "UNCERTAIN_BEST_GUESS",
    };
  }
  return {
    answer: question.options[proposal.answer],
    sequence: proposal.sequence,
    reasoning: `${proposal.note} The proposed replacement sequence is ${proposal.sequence.join(" ") || "empty"}; §9 still requires human lexical review.`,
    confidence: "medium",
    evidenceType: "COGNATE_OR_LOAN",
  };
}

function uncertainProposal(entry, question) {
  return {
    answer: null,
    sequence: [],
    reasoning: `I cannot answer the ${question.type} question for \`${entry.boko}\` from the available standard and corpus context; Muhammad must resolve it.`,
    confidence: "low",
    evidenceType: "UNCERTAIN_BEST_GUESS",
  };
}

function shortECarrierProposal(entry, question) {
  const vowelLength = questionAt(entry, "VOWEL_LENGTH", question.position);
  const declaredShortOption = vowelLength?.options?.find((option) => /^short\s+—/iu.test(option));
  if (vowelLength?.reviewerDecision !== declaredShortOption) {
    const state = vowelLength?.reviewerDecision == null
      ? "has no human vowel-length decision"
      : `was not human-ratified as short (${vowelLength.reviewerDecision})`;
    return {
      answer: null,
      sequence: [],
      reasoning: `\`${entry.boko}\` ${state} at position ${question.position}; the short-e carrier rule cannot be proposed unless that same-position vowel is explicitly ratified short.`,
      confidence: "low",
      evidenceType: "UNCERTAIN_BEST_GUESS",
    };
  }
  return {
    answer: question.options[0],
    sequence: optionCodepoints(question.options[0]),
    reasoning: `\`${entry.boko}\` has a human-ratified short 'e' at position ${question.position}; standard §7 explicitly requires U+0639 AIN plus U+065C in that environment.`,
    confidence: "high",
    evidenceType: "RULE_DEFAULT",
  };
}

function proposeQuestion(entry, question) {
  switch (question.type) {
    case "VOWEL_LENGTH":
      // A proposal is always one of the two concrete canonical guesses. The
      // lexical-exception option is reserved for a reviewer's exact sequence.
      return vowelProposal(entry, question);
    case "WORD_FINAL_VOWEL":
      return vowelProposal(entry, question);
    case "WORD_INITIAL_CARRIER":
      return carrierProposal(entry, question);
    case "SHORT_E_CARRIER":
      return shortECarrierProposal(entry, question);
    case "SUKUN":
      return {
        answer: question.options[0],
        sequence: question.candidateCodePointSequences.closedSyllable,
        reasoning: `In \`${entry.boko}\`, '${question.consonant}' at position ${question.position} has no following vowel; standard §§7–8 therefore require this consonant plus U+0652 SUKUN sequence.`,
        confidence: "high",
        evidenceType: "RULE_DEFAULT",
      };
    case "VOWEL_SEQUENCE":
      return vowelSequenceProposal(entry, question);
    case "GEMINATION":
      return {
        answer: question.options[0],
        sequence: optionCodepoints(question.options[0]),
        reasoning: `Boko \`${entry.boko}\` writes '${Array.from(entry.boko).slice(question.position, question.position + 2).join("")}' twice at positions ${question.position}-${question.position + 1}; one consonant plus U+0651 SHADDA preserves that lexical gemination.`,
        confidence: "high",
        evidenceType: "MORPHOLOGICAL_PATTERN",
      };
    case "ARABIC_LEXICAL_H":
    case "H_ORTHOGRAPHY_CLASS":
      return hProposal(entry, question);
    case "APOSTROPHE_ROLE":
      return apostropheProposal(entry, question);
    case "VELAR_CLUSTER": {
      const canonicalProvisionalCluster =
        question.candidateCodePointSequences?.canonicalProvisionalCluster;
      if (!canonicalProvisionalCluster) return uncertainProposal(entry, question);
      return {
        answer: question.options[0],
        sequence: canonicalProvisionalCluster,
        reasoning: `\`${entry.boko}\` contains '${Array.from(entry.boko).slice(question.position, question.position + 2).join("")}' at position ${question.position}; I propose the canonical provisional cluster code point. Standard §6 says the per-vowel cluster rules remain unsettled, so confidence cannot exceed medium.`,
        confidence: "medium",
        evidenceType: "RULE_DEFAULT",
      };
    }
    default:
      return uncertainProposal(entry, question);
  }
}

function questionAt(entry, type, position) {
  return entry.openQuestions.find(
    (question) => question.type === type && question.position === position
  );
}

function consonantSequence(entry, token) {
  if (token.token === "H_CONTEXT_REQUIRED") {
    const position = characterPosition(entry.boko, token.sourceStart);
    return (questionAt(entry, "H_ORTHOGRAPHY_CLASS", position) ??
      questionAt(entry, "ARABIC_LEXICAL_H", position))
      ?.candidateAjamiSequence ?? ["U+062D"];
  }
  const cluster = questionAt(
    entry,
    "VELAR_CLUSTER",
    characterPosition(entry.boko, token.sourceStart)
  );
  return cluster?.candidateAjamiSequence ?? consonantCodepoints.get(token.token) ?? [];
}

function buildCandidateFullAjami(entry) {
  if (
    entry.openQuestions.some(
      (question) =>
        question.candidateAnswer === null ||
        /must supply/iu.test(String(question.candidateAnswer))
    )
  ) {
    return null;
  }
  const tokens = tokenize(entry.boko).tokens;
  const output = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const position = characterPosition(entry.boko, token.sourceStart);

    if (token.type === "VOWEL") {
      if (index === 0) {
        const carrier = questionAt(entry, "WORD_INITIAL_CARRIER", position);
        if (carrier) output.push(...carrier.candidateAjamiSequence);
      }
      const sequenceQuestion = questionAt(entry, "VOWEL_SEQUENCE", position);
      if (sequenceQuestion) {
        output.push(...sequenceQuestion.candidateAjamiSequence);
        index += 1;
        continue;
      }
      const vowelQuestion =
        questionAt(entry, "VOWEL_LENGTH", position) ??
        questionAt(entry, "WORD_FINAL_VOWEL", position);
      if (!vowelQuestion) throw new Error(`${entry.boko}: no vowel proposal at position ${position}`);
      output.push(...vowelQuestion.candidateAjamiSequence);
      continue;
    }

    if (token.type === "APOSTROPHE") {
      const apostrophe = questionAt(entry, "APOSTROPHE_ROLE", position);
      if (!apostrophe) throw new Error(`${entry.boko}: no apostrophe proposal at position ${position}`);
      output.push(...apostrophe.candidateAjamiSequence);
      continue;
    }

    if (token.type !== "PHONEME") {
      throw new Error(`${entry.boko}: cannot assemble token ${token.token}`);
    }

    const gemination = questionAt(entry, "GEMINATION", position);
    if (gemination) {
      output.push(...gemination.candidateAjamiSequence);
      index += 1;
    } else {
      output.push(...consonantSequence(entry, token));
    }

    const next = tokens[index + 1];
    if (!next || (next.type === "PHONEME" && next.token !== token.token)) {
      output.push("U+0652");
    }
  }
  return codepointsToString(output);
}

export function proposeCandidates(queue) {
  const proposed = structuredClone(queue);
  const entries = Array.isArray(proposed) ? proposed : proposed.entries;
  for (const entry of entries) {
    for (const question of entry.openQuestions) {
      const proposal = proposeQuestion(entry, question);
      question.candidateAnswer = proposal.answer;
      question.candidateAjamiSequence = proposal.sequence;
      question.reasoning = proposal.reasoning;
      question.confidence = proposal.confidence;
      question.evidenceType = proposal.evidenceType;
      if (["ARABIC_LEXICAL_H", "H_ORTHOGRAPHY_CLASS"].includes(question.type)) {
        question.proposedHCategory = proposal.hCategory;
      }
    }
    entry.candidateFullAjami = buildCandidateFullAjami(entry);
    entry.candidateFullCodepoints = entry.candidateFullAjami
      ? formatCodePoints(entry.candidateFullAjami)
      : [];
    entry.entryConfidence = entry.openQuestions.reduce(
      (lowest, question) =>
        CONFIDENCE_ORDER.get(question.confidence) < CONFIDENCE_ORDER.get(lowest)
          ? question.confidence
          : lowest,
      "high"
    );
  }
  return proposed;
}

function escapeMarkdown(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function proposalCell(entry) {
  return entry.openQuestions
    .map((question) => {
      const sequence = question.candidateAjamiSequence?.join(" ") || "no code points";
      const answer = question.candidateAnswer ?? "NULL — human decision required";
      return (
        `**${question.confidence === "low" ? "⚠ LOW" : question.confidence.toUpperCase()} — ${question.type}` +
        `${question.position === undefined ? "" : ` @ ${question.position}`}**<br>` +
        `Candidate: ${answer}<br>Sequence: ${sequence}<br>` +
        `Why: ${question.reasoning}`
      );
    })
    .join("<br><br>");
}

export function renderCandidateReviewMarkdown(queue) {
  const entries = Array.isArray(queue) ? queue : queue.entries;
  const lines = [
    "# Top-500 Hausa word review queue — machine proposals",
    "",
    "> **These are machine proposals, not approved spellings. Muhammad's ratification is required.**",
    "> A blank `Ratify?` cell means unratified, which is safe: the entry remains provisional or blocked",
    "> and nothing in this sheet is wired into production.",
    "",
    "Each frequency-rank band still contains its original 25 entries. Within a band, low-confidence",
    "entries appear first and carry a visible `⚠ LOW` marker so review attention goes to uncertainty.",
    "The immutable rank and running cumulative coverage remain visible.",
    "",
  ];

  for (let start = 0; start < entries.length; start += 25) {
    const originalBand = entries.slice(start, start + 25);
    const band = [...originalBand].sort(
      (left, right) =>
        CONFIDENCE_ORDER.get(left.entryConfidence) -
          CONFIDENCE_ORDER.get(right.entryConfidence) || left.rank - right.rank
    );
    const lowRank = start + 1;
    const highRank = Math.min(start + 25, entries.length);
    const coverage = Math.max(...originalBand.map((entry) => entry.cumulativeCoveragePercent));
    lines.push(
      `## Frequency ranks ${lowRank}–${highRank}`,
      "",
      `Ranks 1–${highRank} account for ${coverage.toFixed(4)}% of all running text.`,
      "",
      "| Rank | Boko | Occurrences | Running coverage | Proposed full Ajami | Question proposals, confidence, and reasoning | Ratify? (Y / correction) |",
      "|---:|---|---:|---:|---|---|---|"
    );
    for (const entry of band) {
      const confidence =
        entry.entryConfidence === "low" ? "⚠ LOW" : entry.entryConfidence.toUpperCase();
      lines.push(
        `| ${entry.rank} | ${escapeMarkdown(entry.boko)} | ${entry.occurrences} | ` +
          `${entry.cumulativeCoveragePercent.toFixed(4)}% | ` +
          `**${confidence}**<br>${escapeMarkdown(entry.candidateFullAjami ?? "— unresolved")}<br>` +
          `${entry.candidateFullCodepoints.join(" ")} | ` +
          `${escapeMarkdown(proposalCell(entry)).replaceAll("&lt;br&gt;", "<br>")} |  |`
      );
    }
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

export function proposalSummary(queue) {
  const entries = Array.isArray(queue) ? queue : queue.entries;
  const summary = {
    entries: entries.length,
    questions: 0,
    candidates: 0,
    nullCandidates: 0,
    confidence: { high: 0, medium: 0, low: 0 },
    evidenceType: {},
    entryConfidence: { high: 0, medium: 0, low: 0 },
    blockedEntries: entries.filter((entry) => entry.status === "blocked").length,
    blockedWithFullCandidate: entries.filter(
      (entry) => entry.status === "blocked" && typeof entry.candidateFullAjami === "string"
    ).length,
    approvedEntries: entries.filter((entry) => entry.status === "approved").length,
  };
  for (const entry of entries) {
    summary.entryConfidence[entry.entryConfidence] += 1;
    for (const question of entry.openQuestions) {
      summary.questions += 1;
      if (question.candidateAnswer === null) summary.nullCandidates += 1;
      else summary.candidates += 1;
      summary.confidence[question.confidence] += 1;
      summary.evidenceType[question.evidenceType] =
        (summary.evidenceType[question.evidenceType] ?? 0) + 1;
    }
  }
  return summary;
}

function main() {
  const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
  const proposed = proposeCandidates(queue);
  fs.writeFileSync(QUEUE_PATH, `${JSON.stringify(proposed, null, 2)}\n`);
  fs.writeFileSync(MARKDOWN_PATH, renderCandidateReviewMarkdown(proposed));
  console.log(JSON.stringify(proposalSummary(proposed), null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
