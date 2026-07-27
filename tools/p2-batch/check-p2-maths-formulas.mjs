#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const batchPath = resolve(here, "p2-maths.json");
const SAFE_FORMULA_PATTERN = /^[\d\s+\-*/().]+$/;
const ITERATIONS = 100;

function fail(message) {
  console.error(`check-p2-maths-formulas: FAIL: ${message}`);
  process.exit(1);
}

function randomInteger(minimum, maximum) {
  const min = Math.ceil(Math.min(Number(minimum), Number(maximum)));
  const max = Math.floor(Math.max(Number(minimum), Number(maximum)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isStaticTemplate(template) {
  const ranges = template.variableRanges || {};
  return Object.keys(ranges).every((key) => Number(ranges[key]?.min) === 0 && Number(ranges[key]?.max) === 0);
}

function buildVariables(variableRanges) {
  return Object.fromEntries(
    Object.entries(variableRanges || {}).map(([key, range]) => [key, randomInteger(range.min, range.max)])
  );
}

function substituteFormula(formula, variables) {
  let expression = String(formula || "");
  for (const key of Object.keys(variables).sort((left, right) => right.length - left.length)) {
    const value = String(variables[key]);
    expression = expression
      .replace(new RegExp(`\\{${key}\\}`, "g"), value)
      .replace(new RegExp(`\\b${key}\\b`, "g"), value);
  }
  return expression.trim();
}

function parseArithmetic(expression) {
  const tokens = expression.match(/\d+(?:\.\d+)?|[+\-*/()]/g) || [];
  let position = 0;
  const peek = () => tokens[position];
  const consume = () => tokens[position++];
  function expr() {
    let left = term();
    while (peek() === "+" || peek() === "-") {
      const op = consume();
      const right = term();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }
  function term() {
    let left = factor();
    while (peek() === "*" || peek() === "/") {
      const op = consume();
      const right = factor();
      if (op === "/" && right === 0) throw new Error("division by zero");
      left = op === "*" ? left * right : left / right;
    }
    return left;
  }
  function factor() {
    if (peek() === "(") {
      consume();
      const value = expr();
      if (consume() !== ")") throw new Error("missing closing parenthesis");
      return value;
    }
    const token = consume();
    if (token === undefined) throw new Error("unexpected end of expression");
    const value = Number(token);
    if (!Number.isFinite(value)) throw new Error(`unexpected token ${token}`);
    return value;
  }
  const value = expr();
  if (position !== tokens.length) throw new Error(`unexpected token ${tokens[position]}`);
  if (!Number.isFinite(value)) throw new Error("formula result is not finite");
  if (!Number.isInteger(value)) throw new Error("formula result is not an integer");
  if (value < 0) throw new Error("formula result is negative");
  return value;
}

function evaluate(formula, variables) {
  const expression = substituteFormula(formula, variables);
  if (!SAFE_FORMULA_PATTERN.test(expression)) throw new Error(`unsafe formula after substitution: ${expression}`);
  return parseArithmetic(expression);
}

function assertStatic(moduleId, questionIndex, template) {
  const where = `${moduleId} quizQuestions[${questionIndex}]`;
  const correctAnswer = String(template.answerFormula || "").trim();
  const distractors = (template.distractorFormulas || []).map((value) => String(value).trim());
  if (!correctAnswer) fail(`${where}: static answer is empty`);
  if (distractors.length !== 3) fail(`${where}: static distractor count is not 3`);
  const options = [correctAnswer, ...distractors].map((value) => value.toLowerCase());
  if (new Set(options).size !== 4) fail(`${where}: static options are not distinct`);
}

function assertParameterized(moduleId, questionIndex, template) {
  const where = `${moduleId} quizQuestions[${questionIndex}]`;
  if ((template.distractorFormulas || []).length !== 3) fail(`${where}: distractor count is not 3`);

  for (let iteration = 0; iteration < ITERATIONS; iteration += 1) {
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

    const allOptions = [answer, ...distractors];
    if (new Set(allOptions).size !== 4) {
      fail(`${where}: duplicate numeric options ${JSON.stringify(allOptions)} with variables ${JSON.stringify(variables)}`);
    }
    if (distractors.includes(answer)) {
      fail(`${where}: distractor equals answer ${answer} with variables ${JSON.stringify(variables)}`);
    }

    // The checks above mirror the quiz engine's safe-eval constraints: arithmetic-only
    // formulas, whole-number non-negative results, and four distinct options.
  }
}

const batch = JSON.parse(readFileSync(batchPath, "utf8"));
if (!Array.isArray(batch)) fail("p2-maths.json is not an array");

let staticQuestions = 0;
let parameterizedQuestions = 0;

for (const module of batch) {
  if (!module.id || !Array.isArray(module.quizQuestions)) fail(`invalid module shape near ${JSON.stringify(module.id)}`);
  module.quizQuestions.forEach((template, index) => {
    if (isStaticTemplate(template)) {
      staticQuestions += 1;
      assertStatic(module.id, index, template);
    } else {
      parameterizedQuestions += 1;
      assertParameterized(module.id, index, template);
    }
  });
}

console.log(`check-p2-maths-formulas: OK — ${batch.length} module(s), ${parameterizedQuestions} parameterized question(s) × ${ITERATIONS} instance(s), ${staticQuestions} static question(s), equivalent safe-eval constraints.`);
