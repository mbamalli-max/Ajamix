import { fileURLToPath } from "node:url";

import {
  createChangePlan,
  executeScopedMutation,
  planHumanReviewedPromotion,
  planQuestionChange,
  provenancePatch,
} from "./ratify-apply.mjs";

const KAF = "kaf — U+06A9";
const QAF = "qaf — U+0642";

// Bulk-applies a default kaf/qaf K_ARTICULATION decision across a word list against any queue file,
// with per-word and per-position exceptions. --overwrite explicitly includes answered matches.

export function applyKBatch({
  path,
  defaultDecision,
  words,
  qafExceptions = new Set(),
  kafExceptions = new Set(),
  positionExceptions = new Map(),
  source = "explicit",
  overwrite = false,
  beforeWriteAssertion,
}) {
  if (!path || !defaultDecision || !words?.length) {
    throw new Error(
      "usage: --file <path> --default kaf|qaf --words w1,w2,... [--source <source>] [--overwrite]"
    );
  }
  if (!new Set(["kaf", "qaf"]).has(defaultDecision)) {
    throw new Error(`invalid --default ${defaultDecision}; expected kaf | qaf`);
  }
  provenancePatch("K_ARTICULATION", source);
  const note = `Muhammad ratified ${new Date().toISOString().slice(0, 10)} (K_ARTICULATION batch).`;
  const { plan } = executeScopedMutation(
    path,
    (queue, before) => {
      const intended = createChangePlan();
      for (const boko of words) {
        const entry = queue.entries.find((candidate) => candidate.boko === boko);
        if (!entry) throw new Error(`no entry for ${boko}`);
        let wordDecision = defaultDecision === "qaf" ? QAF : KAF;
        if (qafExceptions.has(boko)) wordDecision = QAF;
        if (kafExceptions.has(boko)) wordDecision = KAF;

        for (const question of entry.openQuestions ?? []) {
          if (question.type !== "K_ARTICULATION") continue;
          if (question.reviewerDecision !== null && question.reviewerDecision !== undefined && !overwrite) {
            continue;
          }
          const positionKey = `${boko}@${question.position}`;
          const positionDecision = positionExceptions.get(positionKey);
          if (positionDecision && !new Set(["kaf", "qaf"]).has(positionDecision)) {
            throw new Error(`${positionKey}: invalid position decision ${positionDecision}`);
          }
          const decision = positionDecision
            ? positionDecision === "qaf"
              ? QAF
              : KAF
            : wordDecision;
          planQuestionChange(
            intended,
            before,
            {
              boko,
              type: question.type,
              position: question.position,
              patch: {
                decision,
                notes: note,
                ...provenancePatch(question.type, source),
              },
            },
            { overwrite }
          );
        }
      }
      planHumanReviewedPromotion(intended, queue, note);
      return intended;
    },
    { beforeWriteAssertion }
  );
  return {
    applied: plan.questions.size,
    message: `Applied ${plan.questions.size} K_ARTICULATION decisions across ${words.length} words.`,
  };
}

function cliArguments(argv) {
  function flag(name) {
    const index = argv.indexOf(name);
    return index === -1 ? undefined : argv[index + 1];
  }
  const positionExceptions = new Map();
  for (const item of (flag("--pos") ?? "").split(",").filter(Boolean)) {
    const [key, value] = item.split("=");
    positionExceptions.set(key, value);
  }
  return {
    path: flag("--file"),
    defaultDecision: flag("--default"),
    words: (flag("--words") ?? "").split(",").filter(Boolean),
    qafExceptions: new Set((flag("--qaf") ?? "").split(",").filter(Boolean)),
    kafExceptions: new Set((flag("--kaf") ?? "").split(",").filter(Boolean)),
    positionExceptions,
    source: flag("--source") ?? "explicit",
    overwrite: argv.includes("--overwrite"),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(applyKBatch(cliArguments(process.argv.slice(2))).message);
}
