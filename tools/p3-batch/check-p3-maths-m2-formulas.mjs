#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(here, "p3-maths-m2.json");
const expectedIds = Array.from({ length: 18 }, (_, i) => `p3-maths-${String(i + 7).padStart(2, "0")}`);
const safeFormulaPattern = /^[\d\s+\-*/().]+$/;
const randomIterations = 100;
const failures = [];

function fail(message) {
  console.error(`check-p3-maths-m2-formulas: FAIL: ${message}`);
  process.exit(1);
}

function normalizeRange(range) {
  const rawMin = Number.isFinite(Number(range?.min)) ? Number(range.min) : 0;
  const rawMax = Number.isFinite(Number(range?.max)) ? Number(range.max) : rawMin;
  const min = Math.ceil(Math.min(rawMin, rawMax));
  const max = Math.floor(Math.max(rawMin, rawMax));
  if (max < min) throw new Error(`invalid range ${JSON.stringify(range)}`);
  return { min, max, mid: Math.floor((min + max) / 2) };
}

function deterministicInteger(range, iteration, salt) {
  const { min, max } = range;
  const span = max - min + 1;
  return min + ((iteration * 37 + salt * 17 + iteration * iteration) % span);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function substituteFormula(formula, variables) {
  let expression = String(formula || "");
  for (const key of Object.keys(variables).sort((left, right) => right.length - left.length)) {
    const value = String(variables[key]);
    expression = expression
      .replace(new RegExp(`\\{${escapeRegExp(key)}\\}`, "g"), value)
      .replace(new RegExp(`\\b${escapeRegExp(key)}\\b`, "g"), value);
  }
  return expression.trim();
}

function parseArithmetic(expression) {
  const tokens = expression.match(/\d+(?:\.\d+)?|[+\-*/()]/g) || [];
  let position = 0;
  const peek = () => tokens[position];
  const consume = () => tokens[position++];

  function parseExpression() {
    let left = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const operator = consume();
      const right = parseTerm();
      left = operator === "+" ? left + right : left - right;
    }
    return left;
  }

  function parseTerm() {
    let left = parseFactor();
    while (peek() === "*" || peek() === "/") {
      const operator = consume();
      const right = parseFactor();
      if (operator === "/" && right === 0) throw new Error("division by zero");
      left = operator === "*" ? left * right : left / right;
    }
    return left;
  }

  function parseFactor() {
    if (peek() === "(") {
      consume();
      const value = parseExpression();
      if (consume() !== ")") throw new Error("missing closing parenthesis");
      return value;
    }
    const token = consume();
    if (token === undefined) throw new Error("unexpected end of expression");
    const value = Number(token);
    if (!Number.isFinite(value)) throw new Error(`unexpected token ${token}`);
    return value;
  }

  const value = parseExpression();
  if (position !== tokens.length) throw new Error(`unexpected token ${tokens[position]}`);
  if (!Number.isFinite(value)) throw new Error("formula result is not finite");
  if (!Number.isInteger(value)) throw new Error("formula result is not an integer");
  return value;
}

function evaluate(formula, variables) {
  const expression = substituteFormula(formula, variables);
  if (!safeFormulaPattern.test(expression)) throw new Error(`unsafe formula after substitution: ${expression}`);
  if (/\/\s*0+(?:\.0+)?(?:\D|$)/.test(expression)) throw new Error(`division by zero detected: ${expression}`);
  return parseArithmetic(expression);
}

function uniqueVariableCases(cases) {
  const seen = new Set();
  const result = [];
  for (const values of cases) {
    const key = JSON.stringify(values);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(values);
    }
  }
  return result;
}

function buildSingleVariableCases(key, range) {
  const cases = [];
  for (let value = range.min; value <= range.max; value += 1) {
    cases.push({ [key]: value });
  }
  return cases;
}

function buildBoundaryCombinations(entries) {
  const cases = [];
  const valuesByKey = entries.map(([key, range]) => [key, Array.from(new Set([range.min, range.mid, range.max]))]);

  function visit(index, current) {
    if (index === valuesByKey.length) {
      cases.push({ ...current });
      return;
    }
    const [key, values] = valuesByKey[index];
    for (const value of values) {
      current[key] = value;
      visit(index + 1, current);
    }
  }

  visit(0, {});
  return cases;
}

function buildRandomCases(entries) {
  const cases = [];
  for (let iteration = 0; iteration < randomIterations; iteration += 1) {
    const values = {};
    for (const [key, range] of entries) {
      values[key] = deterministicInteger(range, iteration, key.charCodeAt(0));
    }
    cases.push(values);
  }
  return cases;
}

function buildVariableCases(variableRanges) {
  const entries = Object.entries(variableRanges || {}).map(([key, range]) => [key, normalizeRange(range)]);
  if (entries.length === 0) return [{}];
  if (entries.length === 1) {
    const [[key, range]] = entries;
    return uniqueVariableCases(buildSingleVariableCases(key, range));
  }
  return uniqueVariableCases([...buildBoundaryCombinations(entries), ...buildRandomCases(entries)]);
}

function recordFailure(moduleId, questionIndex, variables, answer, distractors, type, detail = "") {
  failures.push({ moduleId, questionIndex, variables, answer, distractors, type, detail });
}

function assertValues(moduleId, questionIndex, variables, answer, distractors) {
  if (!Number.isInteger(answer) || answer < 0) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "negative value", "invalid answer");
  }
  if (distractors.some((value) => !Number.isInteger(value) || value < 0)) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "negative value", "invalid distractor");
  }
  if (distractors.includes(answer)) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "distractor equals answer");
  }
  if (new Set(distractors).size !== distractors.length) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "duplicate distractor");
  }
}

function assertQuestion(moduleId, questionIndex, template) {
  const where = `${moduleId} quizQuestions[${questionIndex}]`;
  if (!template || typeof template !== "object") fail(`${where}: template is not an object`);
  if (!Array.isArray(template.distractorFormulas) || template.distractorFormulas.length !== 3) {
    fail(`${where}: distractor count is not 3`);
  }

  const cases = buildVariableCases(template.variableRanges || {});
  for (const variables of cases) {
    let answer;
    let distractors;
    try {
      answer = evaluate(template.answerFormula, variables);
      distractors = template.distractorFormulas.map((formula) => evaluate(formula, variables));
    } catch (error) {
      recordFailure(moduleId, questionIndex, variables, null, [], "evaluation error", error.message);
      continue;
    }
    assertValues(moduleId, questionIndex, variables, answer, distractors);
  }
  return cases.length;
}

const source = JSON.parse(readFileSync(sourcePath, "utf8"));
if (!Array.isArray(source)) fail("source root is not an array");
const ids = source.map((module) => module.id);
if (JSON.stringify(ids) !== JSON.stringify(expectedIds)) fail(`unexpected ids: ${ids.join(", ")}`);

let questionCount = 0;
let caseCount = 0;
for (const module of source) {
  if (!Array.isArray(module.quizQuestions) || module.quizQuestions.length !== 5) {
    fail(`${module.id}: quizQuestions count is not 5`);
  }
  module.quizQuestions.forEach((template, questionIndex) => {
    questionCount += 1;
    caseCount += assertQuestion(module.id, questionIndex, template);
  });
}

if (failures.length > 0) {
  console.error(`check-p3-maths-m2-formulas: FAIL — ${failures.length} formula failure(s).`);
  for (const failure of failures) {
    const suffix = failure.detail ? `, detail ${JSON.stringify(failure.detail)}` : "";
    console.error(
      `${failure.moduleId} quizQuestions[${failure.questionIndex}]: ${failure.type}; variables ${JSON.stringify(
        failure.variables
      )}; answer ${JSON.stringify(failure.answer)}; distractors ${JSON.stringify(failure.distractors)}${suffix}`
    );
  }
  process.exit(1);
}

console.log(`check-p3-maths-m2-formulas: OK — ${source.length} module(s), ${questionCount} quiz question(s), ${caseCount} deterministic edge/random case(s).`);
