import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  createChangePlan,
  executeScopedMutation,
  planHumanReviewedPromotion,
  planQuestionChange,
  provenancePatch,
} from "./ratify-apply.mjs";

const DEFAULT_PATH = new URL("./data/review-queue-short300.json", import.meta.url);

// The former all-short writer was retired on 2026-08-17. This entry point is now
// a generic, human-directed type batch writer: both the type and option are
// required, and no option is inferred from the file name.

export function resolveOption(question, selector) {
  if (selector === undefined || selector === null || String(selector).trim() === "") {
    throw new Error(`${question.type}@${question.position}: an option selector is required`);
  }
  const value = String(selector).trim();
  const numeric = Number(value);
  if (Number.isInteger(numeric) && numeric >= 1 && numeric <= question.options.length) {
    return question.options[numeric - 1];
  }
  if (question.options.includes(value)) return value;

  const folded = value.toLocaleLowerCase("en");
  const matches = question.options.filter((option) => {
    const optionFolded = option.toLocaleLowerCase("en");
    const label = option.split(" — ", 1)[0].trim().toLocaleLowerCase("en");
    return label === folded || optionFolded.startsWith(`${folded} —`) || optionFolded.startsWith(folded);
  });
  if (matches.length === 1) return matches[0];
  throw new Error(
    `${question.type}@${question.position}: option selector ${JSON.stringify(value)} matched ${matches.length}; ` +
      `options: ${JSON.stringify(question.options)}`
  );
}

export function applyBatchDecisions({
  path = DEFAULT_PATH,
  decisions,
  source = "explicit",
  overwrite = false,
  noteLabel = "type batch",
  beforeWriteAssertion,
}) {
  if (!Array.isArray(decisions)) throw new Error("decisions must be an array");
  if (decisions.length === 0) {
    return { applied: 0, message: "Applied 0 decisions (empty batch)." };
  }
  const note = `Muhammad ratified ${new Date().toISOString().slice(0, 10)} (${noteLabel}).`;
  const { plan } = executeScopedMutation(
    path,
    (queue, before) => {
      const intended = createChangePlan();
      for (const change of decisions) {
        const entry = queue.entries.find((candidate) => candidate.boko === change.boko);
        if (!entry) throw new Error(`no entry for ${change.boko}`);
        const question = entry.openQuestions?.find(
          (candidate) => candidate.type === change.type && candidate.position === change.position
        );
        if (!question) {
          throw new Error(`no open question ${change.type}@${change.position} for ${change.boko}`);
        }
        if (!question.options.includes(change.decision)) {
          throw new Error(
            `${change.boko}/${change.type}@${change.position}: decision not in options: ${change.decision}`
          );
        }
        planQuestionChange(
          intended,
          before,
          {
            boko: change.boko,
            type: change.type,
            position: change.position,
            patch: {
              decision: change.decision,
              notes: note,
              ...provenancePatch(change.type, source),
            },
          },
          { overwrite }
        );
      }
      planHumanReviewedPromotion(intended, queue, note);
      return intended;
    },
    { beforeWriteAssertion }
  );
  return {
    applied: plan.questions.size,
    message: `Applied ${plan.questions.size} human-directed ${noteLabel} decisions.`,
  };
}

export function applyTypeBatch({
  path = DEFAULT_PATH,
  type,
  defaultOption,
  words,
  source = "explicit",
  overwrite = false,
  beforeWriteAssertion,
}) {
  if (!type || defaultOption === undefined || !words?.length) {
    throw new Error(
      "usage: node ratify-apply-batch-short.mjs [--file <path>] --type <type> --default <option> " +
        "[--source <source>] [--overwrite] <boko> [boko...]"
    );
  }
  const queue = JSON.parse(fs.readFileSync(path, "utf8"));
  const decisions = [];
  for (const boko of words) {
    const entry = queue.entries.find((candidate) => candidate.boko === boko);
    if (!entry) throw new Error(`no entry for ${boko}`);
    const questions = (entry.openQuestions ?? []).filter((question) => question.type === type);
    if (questions.length === 0) throw new Error(`no ${type} questions for ${boko}`);
    for (const question of questions) {
      if (question.reviewerDecision != null && !overwrite) continue;
      decisions.push({
        boko,
        type,
        position: question.position,
        decision: resolveOption(question, defaultOption),
      });
    }
  }
  return applyBatchDecisions({
    path,
    decisions,
    source,
    overwrite,
    noteLabel: `${type} batch`,
    beforeWriteAssertion,
  });
}

function cliArguments(argv) {
  const args = [...argv];
  let path = DEFAULT_PATH;
  let type;
  let defaultOption;
  let source = "explicit";
  let overwrite = false;
  const words = [];
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--overwrite") {
      overwrite = true;
    } else if (["--file", "--type", "--default", "--source", "--words"].includes(argument)) {
      if (args[index + 1] === undefined) throw new Error(`${argument} requires a value`);
      const value = args[index + 1];
      index += 1;
      if (argument === "--file") path = value;
      if (argument === "--type") type = value;
      if (argument === "--default") defaultOption = value;
      if (argument === "--source") source = value;
      if (argument === "--words") words.push(...value.split(",").filter(Boolean));
    } else if (argument.startsWith("--")) {
      throw new Error(`unknown flag ${argument}`);
    } else {
      words.push(argument);
    }
  }
  return { path, type, defaultOption, words, source, overwrite };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(applyTypeBatch(cliArguments(process.argv.slice(2))).message);
}
