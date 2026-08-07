import { materializeAjami } from "./materialize-lexicon.mjs";

function fillerFor(oq) {
  const nonException = oq.options.find((o) => !/lexical exception|must supply/i.test(o));
  return nonException ?? oq.options[0];
}

export function previewWord(entry, targetType, targetPosition, candidateOption) {
  const clone = structuredClone(entry);
  for (const oq of clone.openQuestions) {
    if (oq.type === targetType && oq.position === targetPosition) {
      oq.reviewerDecision = candidateOption;
    } else if (!oq.reviewerDecision) {
      oq.reviewerDecision = fillerFor(oq);
    }
  }
  try {
    return materializeAjami(clone);
  } catch (err) {
    return `[render error: ${err.message}]`;
  }
}

function shortOptionFor(oq) {
  return oq.options.find((o) => o.startsWith("short"));
}

// Renders a word with every open VOWEL_LENGTH/WORD_FINAL_VOWEL question defaulted
// to its "short" option, and every other pending question type left at its filler
// default (for display only -- those still need their own real ratification).
export function previewAllShort(entry) {
  const clone = structuredClone(entry);
  const vowelPositions = [];
  for (const oq of clone.openQuestions) {
    if (oq.reviewerDecision) continue;
    if (oq.type === "VOWEL_LENGTH" || oq.type === "WORD_FINAL_VOWEL") {
      const shortOpt = shortOptionFor(oq);
      if (shortOpt) {
        oq.reviewerDecision = shortOpt;
        vowelPositions.push({ type: oq.type, position: oq.position, letter: oq.letter });
        continue;
      }
    }
    oq.reviewerDecision = fillerFor(oq);
  }
  let rendered;
  try {
    rendered = materializeAjami(clone);
  } catch (err) {
    rendered = `[render error: ${err.message}]`;
  }
  const otherPending = entry.openQuestions
    .filter((oq) => !oq.reviewerDecision && oq.type !== "VOWEL_LENGTH" && oq.type !== "WORD_FINAL_VOWEL")
    .map((oq) => `${oq.type}@${oq.position}`);
  return { rendered, vowelPositions, otherPending };
}
