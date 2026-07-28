import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "../..");
const content = JSON.parse(fs.readFileSync(path.join(REPO, "app/content.json")));

const OUT_DIR = path.join(REPO, "tools/audio-pipeline/recording-packages");
fs.mkdirSync(OUT_DIR, { recursive: true });

const SPEC = `**Technical spec:** MP3, 64kbps, mono, one clip per segment. There is no fixed duration
target: let each segment's natural spoken length determine it (typically well under one minute).

**Segmented-recording model.** Each formal-track module is broken into three clips. Record one clip for
each labelled segment, using its exact target filename. The app shows the matching text and opens the
quiz gate when segments 1 and 2 end, so no timestamp measurement or reconciliation is needed. Read only
the text under "Script to read"; segment labels and gate notes are structural instructions, not spoken text.`;

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

function formatFormalModuleChopped(m) {
  const segments = Array.isArray(m.segments) ? m.segments : [];
  const segmentBlocks = segments.map((segment) => [
    `**Segment ${segment.index} of ${segments.length}${segment.gate === "quiz" ? " — quiz gate follows" : " — lesson complete"}**`,
    "",
    `Target filename: \`${segment.audioFile}\``,
    "",
    "Script to read:",
    "",
    "> " + segment.audioScript.replace(/\n/g, "\n> "),
    "",
  ].join("\n"));
  return [
    `### \`${m.id}\` — ${m.titleEn} (${segments.length} segment clips)`,
    "",
    `**Title (Hausa):** ${m.titleHa}`,
    "",
    segmentBlocks.join("\n"),
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
  if (m.track !== "formal" || !Array.isArray(m.segments)) continue;
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
let totalFormalSegments = 0;
const indexLines = ["# AJAMIX Audio Recording Packages — index\n", `**Technical spec (applies to every formal-track segment):**\n\n${SPEC}\n\n---\n`];

for (const band of bandOrder) {
  const mods = byBand[band];
  if (!mods) continue;
  mods.sort((a, b) => (a.moduleNumber || 0) - (b.moduleNumber || 0));
  const segmentCount = mods.reduce((sum, m) => sum + m.segments.length, 0);
  const header = `# AJAMIX Audio Recording Package — ${band} (${mods.length} modules, ${segmentCount} segment clips)\n\n${SPEC}\n\n---\n\n`;
  const body = mods.map((m) => formatFormalModuleChopped(m)).join("\n\n");
  const outPath = path.join(OUT_DIR, `${band}-recording-package.md`);
  fs.writeFileSync(outPath, header + body + "\n");
  totalModules += mods.length;
  totalFormalSegments += segmentCount;
  indexLines.push(`- [\`${band}-recording-package.md\`](${band}-recording-package.md) — ${mods.length} modules, ${segmentCount} segment clips`);
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
console.log("total formal-track segment clips packaged:", totalFormalSegments);
console.log("total adult-track card clips packaged:", totalAdultCards);
