#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const contentPath = resolve(repoRoot, "app", "content.json");
const expectedIds = Array.from({ length: 6 }, (_, i) => `p3-maths-${String(i + 1).padStart(2, "0")}`);
const safeFormulaPattern = /^[\d\s+\-*/().]+$/;
const iterations = 100;

function fail(message) {
  console.error(`check-p3-maths-formulas: FAIL: ${message}`);
  process.exit(1);
}

function randomInteger(minimum, maximum) {
  const rawMin = Number.isFinite(minimum) ? minimum : 0;
  const rawMax = Number.isFinite(maximum) ? maximum : rawMin;
  const min = Math.ceil(Math.min(rawMin, rawMax));
  const max = Math.floor(Math.max(rawMin, rawMax));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildVariables(variableRanges) {
  return Object.fromEntries(
    Object.entries(variableRanges || {}).map(([key, range]) => [key, randomInteger(range.min, range.max)])
  );
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
  if (value < 0) throw new Error("formula result is negative");
  return value;
}

function evaluate(formula, variables) {
  const expression = substituteFormula(formula, variables);
  if (!safeFormulaPattern.test(expression)) throw new Error(`unsafe formula after substitution: ${expression}`);
  if (/\/\s*0+(?:\.0+)?(?:\D|$)/.test(expression)) throw new Error(`division by zero detected: ${expression}`);
  return parseArithmetic(expression);
}

function assertQuestion(moduleId, questionIndex, template) {
  const where = `${moduleId} quizQuestions[${questionIndex}]`;
  if (!template || typeof template !== "object") fail(`${where}: template is not an object`);
  if (!Array.isArray(template.distractorFormulas) || template.distractorFormulas.length !== 3) {
    fail(`${where}: distractor count is not 3`);
  }

  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const variables = buildVariables(template.variableRanges || {});
    let answer;
    let distractors;
    try {
      answer = evaluate(template.answerFormula, variables);
      distractors = template.distractorFormulas.map((formula) => evaluate(formula, variables));
    } catch (error) {
      fail(`${where}: ${error.message} with variables ${JSON.stringify(variables)}`);
    }

    if (!Number.isInteger(answer) || answer < 0) fail(`${where}: invalid answer ${answer}`);
    if (distractors.some((value) => !Number.isInteger(value) || value < 0)) {
      fail(`${where}: invalid distractors ${JSON.stringify(distractors)} with variables ${JSON.stringify(variables)}`);
    }
    if (distractors.includes(answer)) {
      fail(`${where}: distractor equals answer ${answer} with variables ${JSON.stringify(variables)}`);
    }
    if (new Set(distractors).size !== distractors.length) {
      fail(`${where}: duplicate distractors ${JSON.stringify(distractors)} with variables ${JSON.stringify(variables)}`);
    }
  }
}

const content = JSON.parse(readFileSync(contentPath, "utf8"));
const modules = expectedIds.map((id) => content.modules.find((module) => module.id === id));

for (const [index, module] of modules.entries()) {
  if (!module) fail(`missing module ${expectedIds[index]}`);
  if (!Array.isArray(module.quizQuestions) || module.quizQuestions.length !== 5) {
    fail(`${module.id}: quizQuestions count is not 5`);
  }
  module.quizQuestions.forEach((template, questionIndex) => assertQuestion(module.id, questionIndex, template));
}

console.log(`check-p3-maths-formulas: OK — ${modules.length} module(s), ${modules.length * 5} quiz question(s) × ${iterations} instance(s), arithmetic-safe non-negative distinct options.`);
