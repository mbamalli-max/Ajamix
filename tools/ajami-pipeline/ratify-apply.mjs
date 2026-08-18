import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { formatCodePoints } from "./tokenizer.mjs";

const DEFAULT_PATH = new URL("./data/review-queue-short300.json", import.meta.url);
export const LENGTH_SOURCES = new Set([
  "explicit",
  "mfa-v3.0.0",
  "bargery-1934",
  "n/a",
]);
export const VOWEL_LENGTH_TYPES = new Set(["VOWEL_LENGTH", "WORD_FINAL_VOWEL"]);
const QUESTION_FIELDS = {
  decision: "reviewerDecision",
  suppliedSequence: "reviewerSuppliedSequence",
  suppliedCodepoints: "reviewerSuppliedCodepoints",
  notes: "reviewerNotes",
  lengthSource: "lengthSource",
  ajamiEvidence: "ajamiEvidence",
  encodingRule: "encodingRule",
  reviewStatus: "reviewStatus",
};
const ENTRY_FIELDS = {
  status: "status",
  reviewerDecision: "reviewerDecision",
  reviewerNotes: "reviewerNotes",
};

// argv: [--file <path>] [--source <source>] [--overwrite]
//       boko type position decisionOptionString [suppliedSequence]

export function questionKey(boko, type, position) {
  return `${boko}|${type}|${position}`;
}

function stateFrom(record, fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([stateField, recordField]) => [stateField, record?.[recordField]])
  );
}

export function snapshotRatificationState(queue) {
  const questions = new Map();
  const entries = new Map();

  for (const entry of queue.entries ?? []) {
    if (entries.has(entry.boko)) throw new Error(`duplicate queue entry for ${entry.boko}`);
    entries.set(entry.boko, stateFrom(entry, ENTRY_FIELDS));
    for (const question of entry.openQuestions ?? []) {
      const key = questionKey(entry.boko, question.type, question.position);
      if (questions.has(key)) throw new Error(`duplicate queue question ${key}`);
      questions.set(key, stateFrom(question, QUESTION_FIELDS));
    }
  }

  return { questions, entries };
}

export function createChangePlan() {
  return { questions: new Map(), entries: new Map() };
}

export function provenancePatch(type, source = "explicit") {
  if (!LENGTH_SOURCES.has(source)) {
    throw new Error(`invalid --source ${source}; expected ${[...LENGTH_SOURCES].join(" | ")}`);
  }
  return {
    lengthSource: VOWEL_LENGTH_TYPES.has(type) ? source : "n/a",
    ajamiEvidence: "none",
    encodingRule: "ajamix-standard",
    reviewStatus: "human-approved",
  };
}

function isAnswered(state) {
  return state?.decision !== null && state?.decision !== undefined;
}

export function planQuestionChange(plan, before, change, { overwrite = false } = {}) {
  const key = questionKey(change.boko, change.type, change.position);
  const oldState = before.questions.get(key);
  if (!oldState) throw new Error(`no open question ${change.type}@${change.position} for ${change.boko}`);
  if (isAnswered(oldState) && !overwrite) {
    throw new Error(
      `refusing to overwrite answered question ${change.boko}|${change.type}|${change.position}; pass --overwrite to replace its reviewerDecision`
    );
  }
  if (plan.questions.has(key)) throw new Error(`duplicate intended question change ${key}`);
  plan.questions.set(key, { ...change, key });
}

export function planHumanReviewedPromotion(plan, queue, note) {
  const touchedWords = new Set(Array.from(plan.questions.values(), (change) => change.boko));
  for (const boko of touchedWords) {
    const entry = queue.entries.find((candidate) => candidate.boko === boko);
    if (!entry || entry.status === "human_reviewed") continue;
    const allResolved = (entry.openQuestions ?? []).every((question) => {
      const change = plan.questions.get(questionKey(boko, question.type, question.position));
      const decision = change?.patch.decision ?? question.reviewerDecision;
      return decision !== null && decision !== undefined;
    });
    if (allResolved) {
      plan.entries.set(boko, {
        boko,
        patch: {
          status: "human_reviewed",
          reviewerDecision: "approved_as_proposed",
          reviewerNotes: note,
        },
      });
    }
  }
}

function applyPatch(target, patch, fields) {
  for (const [stateField, value] of Object.entries(patch)) {
    target[fields[stateField]] = value;
  }
}

function expectedState(before, plan) {
  const expected = structuredClone(before);
  for (const [key, change] of plan.questions) {
    Object.assign(expected.questions.get(key), change.patch);
  }
  for (const [boko, change] of plan.entries) {
    Object.assign(expected.entries.get(boko), change.patch);
  }
  return expected;
}

function applyPlan(queue, plan) {
  for (const change of plan.questions.values()) {
    const entry = queue.entries.find((candidate) => candidate.boko === change.boko);
    const question = entry?.openQuestions?.find(
      (candidate) => candidate.type === change.type && candidate.position === change.position
    );
    if (!question) throw new Error(`planned question disappeared: ${change.key}`);
    applyPatch(question, change.patch, QUESTION_FIELDS);
  }
  for (const change of plan.entries.values()) {
    const entry = queue.entries.find((candidate) => candidate.boko === change.boko);
    if (!entry) throw new Error(`planned entry disappeared: ${change.boko}`);
    applyPatch(entry, change.patch, ENTRY_FIELDS);
  }
}

function comparable(value) {
  if (value === undefined) return "<unset>";
  if (value === null) return null;
  if (Array.isArray(value)) return value.map(comparable);
  if (typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, comparable(item)]));
  }
  return value;
}

function formatState(state) {
  return state === undefined ? "<missing>" : JSON.stringify(comparable(state));
}

function sameState(left, right) {
  return formatState(left) === formatState(right);
}

export function ratificationScopeFailures(before, expected, actual) {
  const failures = [];
  for (const collection of ["questions", "entries"]) {
    const keys = new Set([
      ...before[collection].keys(),
      ...expected[collection].keys(),
      ...actual[collection].keys(),
    ]);
    for (const key of keys) {
      const expectedValue = expected[collection].get(key);
      const actualValue = actual[collection].get(key);
      if (sameState(expectedValue, actualValue)) continue;
      const label = collection === "questions" ? key : `${key}|entry`;
      failures.push(
        `${label}: ${formatState(before[collection].get(key))} → ${formatState(actualValue)} ` +
          `(intended ${formatState(expectedValue)})`
      );
    }
  }
  return failures;
}

export function executeScopedMutation(path, buildPlan, { beforeWriteAssertion } = {}) {
  const originalBytes = fs.readFileSync(path);
  const queue = JSON.parse(originalBytes.toString("utf8"));
  const before = snapshotRatificationState(queue);
  const plan = buildPlan(queue, before);
  const expected = expectedState(before, plan);

  applyPlan(queue, plan);
  beforeWriteAssertion?.(queue);

  const actual = snapshotRatificationState(queue);
  const failures = ratificationScopeFailures(before, expected, actual);
  if (failures.length) {
    throw new Error(
      `RATIFICATION WRITE SCOPE FAILED (${failures.length} unexpected change${failures.length === 1 ? "" : "s"})\n- ` +
        failures.join("\n- ")
    );
  }

  fs.writeFileSync(path, JSON.stringify(queue, null, 2) + "\n");
  return { queue, plan };
}

export function applyRatification({
  path = DEFAULT_PATH,
  boko,
  type,
  position,
  decision,
  supplied,
  source = "explicit",
  overwrite = false,
  beforeWriteAssertion,
}) {
  const note = `Muhammad ratified ${new Date().toISOString().slice(0, 10)}.`;
  const { queue, plan } = executeScopedMutation(
    path,
    (queueValue, before) => {
      const entry = queueValue.entries.find((candidate) => candidate.boko === boko);
      if (!entry) throw new Error(`no entry for ${boko}`);
      const question = entry.openQuestions?.find(
        (candidate) => candidate.type === type && candidate.position === position
      );
      if (!question) throw new Error(`no open question ${type}@${position} for ${boko}`);
      if (!question.options.includes(decision)) {
        throw new Error(`decision not in options: ${decision}\noptions: ${JSON.stringify(question.options)}`);
      }

      const patch = { decision, notes: note, ...provenancePatch(type, source) };
      if (supplied !== undefined) {
        patch.suppliedSequence = supplied;
        patch.suppliedCodepoints = formatCodePoints(supplied);
      }
      const intended = createChangePlan();
      planQuestionChange(
        intended,
        before,
        { boko, type, position, patch },
        { overwrite }
      );
      planHumanReviewedPromotion(intended, queueValue, note);
      return intended;
    },
    { beforeWriteAssertion }
  );
  return {
    message: `OK ${boko}/${type}@${position} -> ${decision}${plan.entries.has(boko) ? " [entry human_reviewed]" : ""}`,
    queue,
  };
}

function cliArguments(argv) {
  const args = [...argv];
  let path = DEFAULT_PATH;
  let source = "explicit";
  let overwrite = false;
  for (let index = 0; index < args.length; ) {
    if (args[index] === "--overwrite") {
      overwrite = true;
      args.splice(index, 1);
    } else if (args[index] === "--file") {
      if (args[index + 1] === undefined) throw new Error("--file requires a path");
      path = args[index + 1];
      args.splice(index, 2);
    } else if (args[index] === "--source") {
      if (args[index + 1] === undefined) throw new Error("--source requires a value");
      source = args[index + 1];
      args.splice(index, 2);
    } else {
      index += 1;
    }
  }
  const [boko, type, positionString, decision, supplied] = args;
  if (!boko || !type || positionString === undefined || decision === undefined) {
    throw new Error(
      "usage: node ratify-apply.mjs [--file <path>] [--source explicit|mfa-v3.0.0|bargery-1934|n/a] [--overwrite] <boko> <type> <position> <decision> [suppliedSequence]"
    );
  }
  const position = Number(positionString);
  if (!Number.isFinite(position)) throw new Error(`invalid question position: ${positionString}`);
  return { path, boko, type, position, decision, supplied, source, overwrite };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(applyRatification(cliArguments(process.argv.slice(2))).message);
}
