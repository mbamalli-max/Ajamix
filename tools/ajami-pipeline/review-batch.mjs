import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { recordedLength } from "./mfa-proposals.mjs";
import { applyBatchDecisions, resolveOption } from "./ratify-apply-batch-short.mjs";
import { previewWord } from "./ratify-preview.mjs";

const DEFAULT_QUEUE_PATH = new URL("./data/review-queue-quiz.json", import.meta.url);
const DEFAULT_PROPOSALS_PATH = new URL("./data/mfa-proposals.json", import.meta.url);
const VOWEL_TYPES = new Set(["VOWEL_LENGTH", "WORD_FINAL_VOWEL"]);

function defaultOption(question) {
  return question.options.find((option) => !/lexical exception|must supply/iu.test(option)) ?? question.options[0];
}

function questionLetter(entry, question) {
  return question.letter ?? Array.from(entry.normalizedBoko ?? entry.boko)[question.position] ?? "—";
}

function proposalKey(word, type, position) {
  return `${word}|${type}|${position}`;
}

export function proposalMap(report) {
  const proposals = new Map();
  for (const proposal of report?.proposals ?? []) {
    const key = proposalKey(proposal.word, proposal.questionType, proposal.position);
    if (proposals.has(key)) throw new Error(`duplicate MFA proposal ${key}`);
    proposals.set(key, proposal);
  }
  return proposals;
}

export function buildReviewRows(queue, type, report = { proposals: [] }, render = previewWord) {
  const entries = Array.isArray(queue) ? queue : queue?.entries;
  if (!Array.isArray(entries)) throw new Error("review queue must contain an entries array");
  if (!type) throw new Error("question type is required");
  const proposals = proposalMap(report);
  const rows = [];
  for (const entry of entries) {
    for (const question of entry.openQuestions ?? []) {
      if (question.type !== type || question.reviewerDecision != null) continue;
      const option = defaultOption(question);
      const proposal = VOWEL_TYPES.has(type)
        ? proposals.get(proposalKey(entry.boko, type, question.position)) ?? null
        : null;
      const defaultLength = recordedLength({ reviewerDecision: option });
      rows.push({
        index: rows.length + 1,
        boko: entry.boko,
        position: question.position,
        letter: questionLetter(entry, question),
        currentRenderedForm: render(entry, type, question.position, option),
        mfaProposal: proposal,
        mfaDiffersFromDefault:
          proposal === null || defaultLength === null
            ? null
            : proposal.proposedLength !== defaultLength,
        defaultLength,
        options: [...question.options],
        question,
      });
    }
  }
  return rows;
}

function tableCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

export function formatReviewTable(type, rows) {
  const lines = [
    `Open ${type} questions: ${rows.length}`,
    "",
    "index | boko | position/letter | current rendered form | MFA proposal | options",
    "---: | --- | --- | --- | --- | ---",
  ];
  for (const row of rows) {
    let proposal = "—";
    if (row.mfaProposal) {
      const relation = row.mfaDiffersFromDefault ? "differs from" : "matches";
      proposal = `${row.mfaProposal.proposedLength} (${relation} ${row.defaultLength} default)`;
    }
    const options = row.options.map((option, index) => `${index + 1}: ${option}`).join("; ");
    lines.push(
      [
        row.index,
        row.boko,
        `${row.position}/${row.letter}`,
        row.currentRenderedForm,
        proposal,
        options,
      ]
        .map(tableCell)
        .join(" | ")
    );
  }
  return lines.join("\n");
}

function loadJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

export function renderReviewBatch({
  path = DEFAULT_QUEUE_PATH,
  type,
  proposalPath = DEFAULT_PROPOSALS_PATH,
} = {}) {
  const queue = loadJson(path);
  const report = VOWEL_TYPES.has(type) ? loadJson(proposalPath) : { proposals: [] };
  const rows = buildReviewRows(queue, type, report);
  return { rows, output: formatReviewTable(type, rows) };
}

function exceptionParts(spec) {
  const equals = spec.indexOf("=");
  return equals === -1
    ? { locator: spec.trim(), selector: null }
    : { locator: spec.slice(0, equals).trim(), selector: spec.slice(equals + 1).trim() };
}

export function parseExceptions(value) {
  if (value === undefined || value === null || value === "") return [];
  const values = Array.isArray(value) ? value : [value];
  return values.flatMap((item) => String(item).split(",")).map((item) => item.trim()).filter(Boolean);
}

function rowForLocator(rows, locator) {
  if (/^[1-9][0-9]*$/u.test(locator)) {
    const row = rows[Number(locator) - 1];
    if (!row) throw new Error(`exception index ${locator} is outside 1..${rows.length}`);
    return row;
  }
  const matches = rows.filter((row) => `${row.boko}@${row.position}` === locator);
  if (matches.length !== 1) {
    throw new Error(`exception locator ${locator} matched ${matches.length} open questions`);
  }
  return matches[0];
}

function exceptionSelections(rows, exceptionValue) {
  const selections = new Map();
  for (const spec of parseExceptions(exceptionValue)) {
    const { locator, selector } = exceptionParts(spec);
    const row = rowForLocator(rows, locator);
    if (selections.has(row.index)) throw new Error(`duplicate exception for row ${row.index}`);
    selections.set(row.index, selector);
  }
  return selections;
}

function alternativeOption(row, defaultDecision) {
  const alternatives = row.options.filter(
    (option) => option !== defaultDecision && !/lexical exception|must supply/iu.test(option)
  );
  if (alternatives.length !== 1) {
    throw new Error(
      `row ${row.index} (${row.boko}@${row.position}) has ${alternatives.length} non-default standard options; ` +
        "use locator=<option>"
    );
  }
  return alternatives[0];
}

function rejectMustSupply(row, decision) {
  if (/must supply/iu.test(decision)) {
    throw new Error(
      `row ${row.index} (${row.boko}@${row.position}) requires an exact supplied sequence; ` +
        "use ratify-apply.mjs for this lexical exception"
    );
  }
}

export function applyReviewBatch({
  path = DEFAULT_QUEUE_PATH,
  type,
  defaultOption: defaultSelector,
  exceptions,
  source = "explicit",
  beforeWriteAssertion,
} = {}) {
  if (defaultSelector === undefined) throw new Error("apply mode requires --default <option>");
  const queue = loadJson(path);
  const rows = buildReviewRows(queue, type, { proposals: [] });
  const selections = exceptionSelections(rows, exceptions);
  const decisions = rows.map((row) => {
    const defaultDecision = resolveOption(row.question, defaultSelector);
    const exceptionSelector = selections.get(row.index);
    const decision = selections.has(row.index)
      ? exceptionSelector === null
        ? alternativeOption(row, defaultDecision)
        : resolveOption(row.question, exceptionSelector)
      : defaultDecision;
    rejectMustSupply(row, decision);
    return { boko: row.boko, type, position: row.position, decision };
  });
  const result = applyBatchDecisions({
    path,
    decisions,
    source,
    noteLabel: `${type} review batch`,
    beforeWriteAssertion,
  });
  return { ...result, total: rows.length, exceptions: selections.size };
}

export function mfaProposalForRow(row, proposals) {
  const proposal = proposals.get(proposalKey(row.boko, row.question.type, row.position));
  if (!proposal) {
    throw new Error(
      `refusing MFA apply for ${row.boko}|${row.question.type}|${row.position}: proposal does not exist`
    );
  }
  return proposal;
}

export function applyMfaBatch({
  path = DEFAULT_QUEUE_PATH,
  type,
  exceptions,
  proposalPath = DEFAULT_PROPOSALS_PATH,
  beforeWriteAssertion,
} = {}) {
  if (!VOWEL_TYPES.has(type)) {
    throw new Error("MFA mode supports only VOWEL_LENGTH and WORD_FINAL_VOWEL");
  }
  const queue = loadJson(path);
  const report = loadJson(proposalPath);
  const proposals = proposalMap(report);
  const rows = buildReviewRows(queue, type, report);
  const rejected = exceptionSelections(rows, exceptions);
  for (const [index, selector] of rejected) {
    if (selector !== null) throw new Error(`MFA exception row ${index} is a rejection, not an option`);
    mfaProposalForRow(rows[index - 1], proposals);
  }

  const decisions = [];
  let missing = 0;
  for (const row of rows) {
    const key = proposalKey(row.boko, type, row.position);
    if (!proposals.has(key)) {
      missing += 1;
      continue;
    }
    if (rejected.has(row.index)) continue;
    const proposal = mfaProposalForRow(row, proposals);
    const decision = resolveOption(row.question, proposal.proposedLength);
    rejectMustSupply(row, decision);
    decisions.push({ boko: row.boko, type, position: row.position, decision });
  }
  const result = applyBatchDecisions({
    path,
    decisions,
    source: "mfa-v3.0.0",
    noteLabel: `${type} MFA-confirmed batch`,
    beforeWriteAssertion,
  });
  return {
    ...result,
    available: decisions.length + rejected.size,
    rejected: rejected.size,
    missing,
    message:
      `Applied ${decisions.length} reviewer-accepted MFA proposals; ` +
      `${rejected.size} rejected and ${missing} open questions had no proposal.`,
  };
}

function cliArguments(argv) {
  const positional = [];
  const values = new Map();
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (["--file", "--proposals", "--default", "--exceptions", "--source"].includes(argument)) {
      if (argv[index + 1] === undefined) throw new Error(`${argument} requires a value`);
      values.set(argument, argv[index + 1]);
      index += 1;
    } else if (argument.startsWith("--")) {
      throw new Error(`unknown flag ${argument}`);
    } else {
      positional.push(argument);
    }
  }
  const [mode, type] = positional;
  if (!new Set(["render", "apply", "mfa"]).has(mode) || !type || positional.length !== 2) {
    throw new Error(
      "usage: node review-batch.mjs [--file <queue>] render <type>\n" +
        "   or: node review-batch.mjs [--file <queue>] apply <type> --default <option> " +
        "[--exceptions 2,word@position] [--source <source>]\n" +
        "   or: node review-batch.mjs [--file <queue>] [--proposals <json>] mfa <vowel-type> " +
        "[--exceptions 2,word@position]"
    );
  }
  return {
    mode,
    type,
    path: values.get("--file") ?? DEFAULT_QUEUE_PATH,
    proposalPath: values.get("--proposals") ?? DEFAULT_PROPOSALS_PATH,
    defaultOption: values.get("--default"),
    exceptions: values.get("--exceptions"),
    source: values.get("--source") ?? "explicit",
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = cliArguments(process.argv.slice(2));
  if (args.mode === "render") {
    console.log(renderReviewBatch(args).output);
  } else if (args.mode === "apply") {
    console.log(applyReviewBatch(args).message);
  } else {
    if (args.source !== "explicit") throw new Error("MFA mode fixes --source to mfa-v3.0.0");
    console.log(applyMfaBatch(args).message);
  }
}
