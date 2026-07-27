import { createRequire } from "node:module";
import { validateRecord } from "./compositor.mjs";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const RADII = [50, 90, 130, 170, 210, 250, 300];
const ANGLES = Array.from({ length: 8 }, (_, index) => index * Math.PI / 4);
const EDGE_MARGIN = 10;
const BOX_BUFFER = 8;
const SAMPLE_STRIDE = 4;
const NEAR_WHITE_THRESHOLD = 0.92;
const CALLOUT_OFFSET = 0.01;
// A 32px pin is large enough for a bold numeral at 1536px wide while still
// fitting blank pockets that cannot accommodate a full label card.
const PIN_DIAMETER = 32;
const LEGEND_ROW_HEIGHT = 46;
const LEGEND_PADDING = 20;

const overlaps = (a, b, buffer = 0) =>
  a.x < b.x + b.width + buffer &&
  a.x + a.width + buffer > b.x &&
  a.y < b.y + b.height + buffer &&
  a.y + a.height + buffer > b.y;

const lineHitsBox = (line, box) =>
  Math.min(line.x1, line.x2) <= box.x + box.width &&
  Math.max(line.x1, line.x2) >= box.x &&
  Math.min(line.y1, line.y2) <= box.y + box.height &&
  Math.max(line.y1, line.y2) >= box.y;

function estimateBox(text, font) {
  const maxLineCharCount = [...text].length;
  return {
    width: Math.ceil(maxLineCharCount * font.size * 0.58 + 34 + 12),
    height: Math.ceil(font.size * font.lineHeight + 28 + 12),
  };
}

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function candidateBox(targetPoint, radius, angle, size, canvas) {
  if (size.width > canvas.width - EDGE_MARGIN * 2 || size.height > canvas.height - EDGE_MARGIN * 2) return null;
  const centerX = targetPoint.x + Math.cos(angle) * radius;
  const centerY = targetPoint.y + Math.sin(angle) * radius;
  return {
    x: Math.round(clamp(centerX - size.width / 2, EDGE_MARGIN, canvas.width - size.width - EDGE_MARGIN)),
    y: Math.round(clamp(centerY - size.height / 2, EDGE_MARGIN, canvas.height - size.height - EDGE_MARGIN)),
    ...size,
  };
}

function calloutFrom(box, targetPoint) {
  const right = box.x + box.width;
  const bottom = box.y + box.height;
  let perimeterX = clamp(targetPoint.x, box.x, right);
  let perimeterY = clamp(targetPoint.y, box.y, bottom);

  if (
    targetPoint.x >= box.x &&
    targetPoint.x <= right &&
    targetPoint.y >= box.y &&
    targetPoint.y <= bottom
  ) {
    const edges = [
      { distance: targetPoint.x - box.x, x: box.x, y: targetPoint.y, nx: -1, ny: 0 },
      { distance: right - targetPoint.x, x: right, y: targetPoint.y, nx: 1, ny: 0 },
      { distance: targetPoint.y - box.y, x: targetPoint.x, y: box.y, nx: 0, ny: -1 },
      { distance: bottom - targetPoint.y, x: targetPoint.x, y: bottom, nx: 0, ny: 1 },
    ].sort((a, b) => a.distance - b.distance);
    const nearest = edges[0];
    return {
      x1: nearest.x + nearest.nx * CALLOUT_OFFSET,
      y1: nearest.y + nearest.ny * CALLOUT_OFFSET,
      x2: targetPoint.x,
      y2: targetPoint.y,
      arrow: true,
    };
  }

  const deltaX = targetPoint.x - perimeterX;
  const deltaY = targetPoint.y - perimeterY;
  const distance = Math.hypot(deltaX, deltaY);
  if (distance) {
    perimeterX += deltaX / distance * CALLOUT_OFFSET;
    perimeterY += deltaY / distance * CALLOUT_OFFSET;
  }
  return {
    x1: perimeterX,
    y1: perimeterY,
    x2: targetPoint.x,
    y2: targetPoint.y,
    arrow: true,
  };
}

async function nearWhiteFraction(image, box) {
  const region = await sharp(image.data, {
    raw: {
      width: image.width,
      height: image.height,
      channels: image.channels,
    },
  })
    .extract({ left: box.x, top: box.y, width: box.width, height: box.height })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let nearWhite = 0;
  let sampled = 0;
  for (let y = 0; y < region.info.height; y += SAMPLE_STRIDE) {
    for (let x = 0; x < region.info.width; x += SAMPLE_STRIDE) {
      const index = (y * region.info.width + x) * region.info.channels;
      if (region.data[index] > 245 && region.data[index + 1] > 245 && region.data[index + 2] > 245) {
        nearWhite += 1;
      }
      sampled += 1;
    }
  }
  return nearWhite / sampled;
}

function makeLabel(id, text, box, font, callout) {
  return {
    id,
    mode: "latin",
    box,
    font,
    lines: [{ script: "latin", direction: "ltr", text }],
    ...(callout ? { callout } : {}),
  };
}

function titleLabel(title, canvas, font) {
  const box = { x: 40, y: 20, width: canvas.width - 80, height: 170 };
  const preferredSize = Math.max(font.size * 1.5, 40);
  const singleLineSize = Math.floor((box.width - 34) / Math.max([...title].length, 1) / 0.58);
  const size = Math.max(26, Math.min(preferredSize, singleLineSize));
  const titleFont = { ...font, size };
  if (singleLineSize >= 26) return makeLabel("title", title, box, titleFont);

  const words = title.split(/\s+/);
  const midpoint = Math.ceil(words.length / 2);
  return {
    ...makeLabel("title", title, box, titleFont),
    lines: [
      { script: "latin", direction: "ltr", text: words.slice(0, midpoint).join(" ") },
      { script: "latin", direction: "ltr", text: words.slice(midpoint).join(" ") },
    ],
  };
}

function makePin(id, number, box, font, callout) {
  return {
    ...makeLabel(id, String(number), box, { ...font, size: 18, lineHeight: 1 }),
    kind: "pin",
    pinNumber: number,
    callout,
  };
}

function legendLabels(entries, canvas, artworkHeight, font) {
  if (!entries.length) return { footerHeight: 0, labels: [] };
  const columns = entries.length === 1 ? 1 : 2;
  const rows = Math.ceil(entries.length / columns);
  const footerHeight = LEGEND_PADDING * 2 + rows * LEGEND_ROW_HEIGHT;
  const columnWidth = Math.floor((canvas.width - LEGEND_PADDING * 2) / columns);
  return {
    footerHeight,
    labels: entries.map((entry, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const prefix = entry.pinNumber ? `${entry.pinNumber}. ` : "• ";
      return {
        ...makeLabel(
          `${entry.id}-legend`,
          `${prefix}${entry.text}`,
          {
            x: LEGEND_PADDING + column * columnWidth,
            y: artworkHeight + LEGEND_PADDING + row * LEGEND_ROW_HEIGHT,
            width: columnWidth,
            height: LEGEND_ROW_HEIGHT,
          },
          { ...font, size: 18, lineHeight: 1.1 },
        ),
        kind: "legend",
      };
    }),
  };
}

export async function autoPlaceLabels(input) {
  const { baseArtwork, canvas, title, labels, font } = input;
  const raw = await sharp(baseArtwork, { animated: false })
    .resize(canvas.width, canvas.height, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const image = {
    data: raw.data,
    width: raw.info.width,
    height: raw.info.height,
    channels: raw.info.channels,
  };
  const reservedTopBand = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: Math.round(canvas.height * 0.22),
  };
  const placed = [];
  const unplaceable = [];
  const fallbackEntries = [];

  if (title) {
    placed.push(titleLabel(title.textHa, canvas, font));
  }

  for (const label of labels) {
    const size = estimateBox(label.text, font);
    let placement = null;

    candidateSearch:
    for (const radius of RADII) {
      for (const angle of ANGLES) {
        const box = candidateBox(label.targetPoint, radius, angle, size, canvas);
        if (!box || overlaps(box, reservedTopBand)) continue;
        if (placed.some((other) => overlaps(box, other.box, BOX_BUFFER))) continue;
        if (placed.some((other) => other.callout && lineHitsBox(other.callout, box))) continue;
        if (await nearWhiteFraction(image, box) < NEAR_WHITE_THRESHOLD) continue;

        const callout = calloutFrom(box, label.targetPoint);
        if (lineHitsBox(callout, box)) continue;
        if (placed.some((other) => lineHitsBox(callout, other.box))) continue;

        placement = makeLabel(label.id, label.text, box, { ...font }, callout);
        break candidateSearch;
      }
    }

    if (placement) {
      placed.push(placement);
      continue;
    }

    // Tier 1: repeat the identical blank-space search with a 32px marker.
    const pinSize = { width: PIN_DIAMETER, height: PIN_DIAMETER };
    let pinPlacement = null;
    const pinNumber = fallbackEntries.filter((entry) => entry.pinNumber).length + 1;
    pinSearch:
    for (const radius of RADII) {
      for (const angle of ANGLES) {
        const box = candidateBox(label.targetPoint, radius, angle, pinSize, canvas);
        if (!box || overlaps(box, reservedTopBand)) continue;
        if (placed.some((other) => overlaps(box, other.box, BOX_BUFFER))) continue;
        if (placed.some((other) => other.callout && lineHitsBox(other.callout, box))) continue;
        if (await nearWhiteFraction(image, box) < NEAR_WHITE_THRESHOLD) continue;

        const callout = calloutFrom(box, label.targetPoint);
        if (lineHitsBox(callout, box)) continue;
        if (placed.some((other) => lineHitsBox(callout, other.box))) continue;
        pinPlacement = makePin(`${label.id}-pin`, pinNumber, box, font, callout);
        break pinSearch;
      }
    }
    if (pinPlacement) {
      placed.push(pinPlacement);
      fallbackEntries.push({ ...label, pinNumber });
    } else {
      // Tier 2 never needs artwork blank space, so it is always representable.
      fallbackEntries.push({ ...label, pinNumber: null });
    }
  }

  const legend = legendLabels(fallbackEntries, canvas, canvas.height, font);
  const finalCanvas = { ...canvas, height: canvas.height + legend.footerHeight };
  placed.push(...legend.labels);

  const record = {
    version: "1.0",
    baseArtwork,
    canvas: finalCanvas,
    artworkHeight: canvas.height,
    labels: placed,
    fallback: {
      pinDiameter: PIN_DIAMETER,
      pinPlaced: fallbackEntries.filter((entry) => entry.pinNumber).length,
      legendOnly: fallbackEntries.filter((entry) => !entry.pinNumber).length,
    },
  };
  const errors = validateRecord(record);
  if (errors.length) {
    throw new Error(`Auto-placed overlay record failed validation:\n${errors.join("\n")}`);
  }
  return { record, unplaceable };
}
