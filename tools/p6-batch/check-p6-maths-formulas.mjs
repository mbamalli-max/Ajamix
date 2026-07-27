#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(here, "p6-maths.json");
const expectedIds = Array.from({ length: 24 }, (_, index) => `p6-maths-${String(index + 1).padStart(2, "0")}`);
const safeFormulaPattern = /^[\d\s+\-*/().]+$/;
const randomIterations = 100;
const minimumGeneratedValue = 0;
const maximumGeneratedValue = 1000000;
const failures = [];

function fail(message) {
  console.error(`check-p6-maths-formulas: FAIL: ${message}`);
  process.exit(1);
}

function normalizeRange(range) {
  const rawMin = Number(range?.min);
  const rawMax = Number(range?.max);
  if (!Number.isFinite(rawMin) || !Number.isFinite(rawMax)) throw new Error(`invalid range ${JSON.stringify(range)}`);
  const min = Math.ceil(Math.min(rawMin, rawMax));
  const max = Math.floor(Math.max(rawMin, rawMax));
  if (max < min) throw new Error(`invalid range ${JSON.stringify(range)}`);
  if (min === max) throw new Error(`fake fixed variable range ${JSON.stringify(range)}`);
  return { min, max };
}

function deterministicInteger(range, iteration, salt) {
  const span = range.max - range.min + 1;
  return range.min + ((iteration * 37 + salt * 17 + iteration * iteration) % span);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractFormulaIdentifiers(formula) {
  return Array.from(new Set(String(formula || "").match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || []));
}

function extractTemplateVariables(templateHa) {
  return Array.from(new Set(String(templateHa || "").match(/\{[a-zA-Z_][a-zA-Z0-9_]*\}/g) || []).values()).map((value) =>
    value.slice(1, -1)
  );
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

function buildBoundaryCombinations(entries) {
  const cases = [];
  const valuesByKey = entries.map(([key, range]) => [key, [range.min, range.max]]);

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

function recordFailure(moduleId, questionIndex, variables, answer, distractors, type, detail = "") {
  failures.push({ moduleId, questionIndex, variables, answer, distractors, type, detail });
}

function assertValues(moduleId, questionIndex, variables, answer, distractors) {
  if (!Number.isInteger(answer) || answer < minimumGeneratedValue) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "answer below 0");
  }
  if (distractors.some((value) => !Number.isInteger(value) || value < minimumGeneratedValue)) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "distractor below 0");
  }
  if (answer > maximumGeneratedValue) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "answer above 1,000,000");
  }
  if (distractors.some((value) => value > maximumGeneratedValue)) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "distractor above 1,000,000");
  }
  if (distractors.includes(answer)) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "distractor equals answer");
  }
  if (new Set([answer, ...distractors]).size !== 4) {
    recordFailure(moduleId, questionIndex, variables, answer, distractors, "duplicate options");
  }
}

function assertQuestion(moduleId, questionIndex, question) {
  const where = `${moduleId} quizQuestions[${questionIndex}]`;
  if (!question || typeof question !== "object") fail(`${where}: question is not an object`);
  if (typeof question.templateHa !== "string" || question.templateHa.trim() === "") fail(`${where}: templateHa is missing`);
  if (typeof question.answerFormula !== "string" || question.answerFormula.trim() === "") {
    fail(`${where}: answerFormula is missing`);
  }
  if (!Array.isArray(question.distractorFormulas) || question.distractorFormulas.length !== 3) {
    fail(`${where}: distractor count is not 3`);
  }
  if (!question.variableRanges || typeof question.variableRanges !== "object" || Array.isArray(question.variableRanges)) {
    fail(`${where}: variableRanges is missing or invalid`);
  }

  const entries = Object.entries(question.variableRanges).map(([key, range]) => {
    try {
      return [key, normalizeRange(range)];
    } catch (error) {
      fail(`${where}.${key}: ${error.message}`);
    }
  });
  if (entries.length === 0) fail(`${where}: every quiz question must be parameterized`);

  const rangeKeys = new Set(entries.map(([key]) => key));
  const templateVariables = extractTemplateVariables(question.templateHa);
  if (templateVariables.length === 0) fail(`${where}: templateHa has no variable placeholders`);
  for (const key of templateVariables) {
    if (!rangeKeys.has(key)) fail(`${where}: template variable {${key}} is missing from variableRanges`);
  }

  const formulas = [question.answerFormula, ...question.distractorFormulas];
  const formulaVariables = formulas.flatMap((formula) => extractFormulaIdentifiers(formula));
  for (const key of formulaVariables) {
    if (!rangeKeys.has(key)) fail(`${where}: formula variable ${key} is missing from variableRanges`);
  }
  for (const key of rangeKeys) {
    if (!templateVariables.includes(key) && !formulaVariables.includes(key)) {
      fail(`${where}: variableRanges.${key} is unused`);
    }
  }

  const deterministicCases = uniqueVariableCases(buildBoundaryCombinations(entries));
  const randomCases = buildRandomCases(entries);
  for (const variables of [...deterministicCases, ...randomCases]) {
    let answer;
    let distractors;
    try {
      answer = evaluate(question.answerFormula, variables);
      distractors = question.distractorFormulas.map((formula) => evaluate(formula, variables));
    } catch (error) {
      recordFailure(moduleId, questionIndex, variables, null, [], "invalid formula", error.message);
      continue;
    }
    assertValues(moduleId, questionIndex, variables, answer, distractors);
  }

  return { deterministic: deterministicCases.length, random: randomCases.length };
}

const source = JSON.parse(readFileSync(sourcePath, "utf8"));
if (!Array.isArray(source)) fail("source root is not an array");
const ids = source.map((module) => module.id);
if (JSON.stringify(ids) !== JSON.stringify(expectedIds)) fail(`unexpected ids: ${ids.join(", ")}`);

let questionCount = 0;
let deterministicCaseCount = 0;
let randomCaseCount = 0;
for (const module of source) {
  if (!Array.isArray(module.quizQuestions) || module.quizQuestions.length !== 5) {
    fail(`${module.id}: quizQuestions count is not 5`);
  }
  module.quizQuestions.forEach((question, questionIndex) => {
    questionCount += 1;
    const counts = assertQuestion(module.id, questionIndex, question);
    deterministicCaseCount += counts.deterministic;
    randomCaseCount += counts.random;
  });
}

if (failures.length > 0) {
  console.error(`check-p6-maths-formulas: FAIL — ${failures.length} formula issue(s).`);
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

const totalCaseCount = deterministicCaseCount + randomCaseCount;
console.log(
  `check-p6-maths-formulas: PASS — ${source.length} module(s), ${questionCount} quiz question(s), ${deterministicCaseCount} deterministic edge case(s), ${randomCaseCount} random case(s), ${totalCaseCount} total case(s); all generated answers/distractors stayed within 0–1,000,000.`
);
