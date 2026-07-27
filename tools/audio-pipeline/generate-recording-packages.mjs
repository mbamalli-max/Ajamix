import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "../..");
const content = JSON.parse(fs.readFileSync(path.join(REPO, "app/content.json")));

const OUT_DIR = path.join(REPO, "tools/audio-pipeline/recording-packages");
fs.mkdirSync(OUT_DIR, { recursive: true });

const SPEC = `**Technical spec:** MP3, 64kbps, mono. Target duration 3–5 minutes per module — no hard
per-module target beyond this range; let the script's natural spoken length determine it.

**Markers:** \`[INTRO]\`, \`[MAIN]\`, \`[PAUSE N]\`, \`[OUTRO]\` are delivery cues for where to pause
naturally — they are not spoken aloud. At each \`[PAUSE N]\` marker, the listed question is where the
app will pause playback and show an interactive quiz question to the learner; the question/answer
options below are for the reader's context only (so pacing and tone can anticipate the pause), not
text to read aloud.

**Pause timing note:** the app triggers each pause based on a timestamp (\`pauseAtMs\`) that is
currently a placeholder estimate from content authoring, not measured from real narration. After this
module is recorded, the actual playback time of each \`[PAUSE N]\` moment in the final audio must be
measured and reconciled back into \`content.json\` — a separate step after recording, not something the
reader needs to worry about.`;

const ADULT_SPEC = `**Technical spec:** MP3, 64kbps, mono, one clip per card. No hard duration target per
clip — most run a few seconds to ~20 seconds; let each card's natural spoken length determine it.

**Chopped-recording model.** Each adult-track module (Vocational Skills, Philosophy, Critical
Thinking) is broken into its on-screen "lesson cards" (intro/prose, glossary term, worked example,
closing prose). Record **one short clip per card**, not one continuous file per module — the app
advances to the next card automatically when a card's clip finishes playing, so what's heard always
matches what's on screen with no timestamp measurement needed after recording. Read only the text
under "Script to read" for each card; card headings like "Prose card" / "Glossary card" / "Example
card" below are structural labels for the reader, not spoken text.`;

function joinAsSentences(parts) {
  return parts
    .filter(Boolean)
    .map((s) => s.trim().replace(/[.!?]+$/, ""))
    .join(". ")
    .concat(".");
}

function scriptForLessonCard(section) {
  const type = String((section && section.type) || "").toLowerCase();
  const ha = (field) => (field && typeof field === "object" ? field.ha : field) || "";

  if (type === "glossary-card") {
    const term = ha(section.term);
    const definition = ha(section.definition);
    return joinAsSentences([term, definition]);
  }
  if (type === "example") {
    const title = ha(section.title);
    const scenario = ha(section.scenario);
    const takeaway = ha(section.takeaway);
    return joinAsSentences([title, scenario, takeaway]);
  }
  // prose (or unrecognized type falling back to heading+body)
  const heading = ha(section.heading);
  const body = ha(section.body);
  return joinAsSentences([heading, body]);
}

function cardLabel(section) {
  const type = String((section && section.type) || "").toLowerCase();
  if (type === "glossary-card") return "Glossary card";
  if (type === "example") return "Example card";
  return "Prose card";
}

function audioFileForCard(m, index) {
  const dir = path.posix.dirname(m.audioFile || `audio/unknown/${m.id}.mp3`);
  const n = String(index + 1).padStart(2, "0");
  return `${dir}/${m.id}-${n}.mp3`;
}

function formatAdultModuleChopped(m) {
  const sections = Array.isArray(m.lessons) ? m.lessons : [];
  const cardBlocks = sections.map((section, index) => {
    const adapted = typeof section.audioScript === "string" && section.audioScript.trim().length > 0;
    const script = adapted ? section.audioScript : scriptForLessonCard(section);
    return [
      `**Card ${index + 1} of ${sections.length} — ${cardLabel(section)}**`,
      "",
      `Target filename: \`${audioFileForCard(m, index)}\``,
      "",
      ...(adapted ? [] : ["(NOT YET ADAPTED — mechanical extraction)", ""]),
      "Script to read:",
      "",
      "> " + (script || "(no readable text on this card)").replace(/\n/g, "\n> "),
      "",
    ].join("\n");
  });

  return [
    `### \`${m.id}\` — ${m.titleEn} (${sections.length} cards)`,
    "",
    `**Title (Hausa):** ${m.titleHa}`,
    "",
    cardBlocks.join("\n"),
    "---",
  ].join("\n");
}

function formatModule(m, { adult = false } = {}) {
  const pauses = (m.microPauses || [])
    .map((p, i) => {
      const opts = (p.options || []).join(", ");
      return `- **[PAUSE ${i + 1}]** — question shown to the learner: "${p.questionHa}" (correct answer: "${p.correctAnswer}"; options: ${opts})`;
    })
    .join("\n");

  const script = adult ? (m.textExplanationHa || "") : (m.audioScript || "");

  return [
    `### \`${m.id}\` — ${m.titleEn}`,
    "",
    `**Target filename:** \`${m.audioFile}\``,
    `**Title (Hausa):** ${m.titleHa}`,
    "",
    "**Script to read:**",
    "",
    "> " + script.replace(/\n/g, "\n> "),
    "",
    adult
      ? "**Pause context:** none — no in-app pauses for this track."
      : (pauses ? "**Pause context (not read aloud):**\n\n" + pauses : "**Pause context:** none for this module."),
    "",
    "---",
  ].join("\n");
}

const byBand = {};
const bySubjectAdult = {};
for (const m of content.modules) {
  if (m.gradeband === "adult" && m.track === "vocational") {
    if (!m.textExplanationHa) continue;
    bySubjectAdult[m.subject] = bySubjectAdult[m.subject] || [];
    bySubjectAdult[m.subject].push(m);
    continue;
  }
  if (!m.audioScript) continue;
  const band = m.gradeband || "unknown";
  byBand[band] = byBand[band] || [];
  byBand[band].push(m);
}

const bandOrder = ["nursery1", "nursery2", "p1", "p2", "p3", "p4", "p5", "p6"];
const adultSubjectSlugs = {
  "Vocational Skills": "vocational",
  Philosophy: "falsafa",
  "Critical Thinking": "critical-thinking",
};
const adultSubjectOrder = ["Vocational Skills", "Philosophy", "Critical Thinking"];

let totalModules = 0;
const indexLines = ["# AJAMIX Audio Recording Packages — index\n", `**Technical spec (applies to every formal-track module):**\n\n${SPEC}\n\n---\n`];

for (const band of bandOrder) {
  const mods = byBand[band];
  if (!mods) continue;
  mods.sort((a, b) => (a.moduleNumber || 0) - (b.moduleNumber || 0));
  const header = `# AJAMIX Audio Recording Package — ${band} (${mods.length} modules)\n\n${SPEC}\n\n---\n\n`;
  const body = mods.map((m) => formatModule(m)).join("\n\n");
  const outPath = path.join(OUT_DIR, `${band}-recording-package.md`);
  fs.writeFileSync(outPath, header + body + "\n");
  totalModules += mods.length;
  indexLines.push(`- [\`${band}-recording-package.md\`](${band}-recording-package.md) — ${mods.length} modules`);
}

indexLines.push(`\n**Technical spec (applies to every adult-track module):**\n\n${ADULT_SPEC}\n\n---\n`);
let totalAdultCards = 0;
for (const subject of adultSubjectOrder) {
  const mods = bySubjectAdult[subject];
  if (!mods) continue;
  mods.sort((a, b) => (a.moduleNumber || 0) - (b.moduleNumber || 0));
  const slug = adultSubjectSlugs[subject];
  const cardCount = mods.reduce((sum, m) => sum + (Array.isArray(m.lessons) ? m.lessons.length : 0), 0);
  const header = `# AJAMIX Audio Recording Package — ${subject} (${mods.length} modules, ${cardCount} card clips)\n\n${ADULT_SPEC}\n\n---\n\n`;
  const body = mods.map((m) => formatAdultModuleChopped(m)).join("\n\n");
  const outPath = path.join(OUT_DIR, `${slug}-recording-package.md`);
  fs.writeFileSync(outPath, header + body + "\n");
  totalModules += mods.length;
  totalAdultCards += cardCount;
  indexLines.push(`- [\`${slug}-recording-package.md\`](${slug}-recording-package.md) — ${mods.length} modules, ${cardCount} card clips (${subject})`);
}

fs.writeFileSync(path.join(OUT_DIR, "README.md"), indexLines.join("\n") + "\n");

console.log("bands written:", bandOrder.filter((b) => byBand[b]).length);
console.log("adult subjects written:", adultSubjectOrder.filter((s) => bySubjectAdult[s]).length);
console.log("total modules packaged:", totalModules);
console.log("total adult-track card clips packaged:", totalAdultCards);
