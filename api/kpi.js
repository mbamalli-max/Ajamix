const { createClient } = require("@supabase/supabase-js");

const ALLOWED_EVENT_TYPES = new Set([
  "module_started",
  "module_completed",
  "quiz_passed",
  "use_today_yes",
  "use_today_deferred",
  "use_today_note",
  "tomorrow_check_yes",
  "tomorrow_check_no",
  "share_initiated",
  "referral_unlocked",
  "second_module_started",
]);

const PII_BLOCKLIST = ["displayName", "name", "email", "phone", "address", "pin", "pinHash"];

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch (_error) {
    return res.status(400).json({ error: "bad json" });
  }

  const events = Array.isArray(body && body.events) ? body.events : [];
  if (events.length === 0 || events.length > 50) {
    return res.status(400).json({ error: "events must be 1–50 items" });
  }

  const valid = [];

  for (const eventRecord of events) {
    if (!eventRecord || !ALLOWED_EVENT_TYPES.has(eventRecord.type)) {
      continue;
    }

    const payload = eventRecord.payload && typeof eventRecord.payload === "object"
      ? { ...eventRecord.payload }
      : {};

    if (eventRecord.moduleId) {
      payload.moduleId = String(eventRecord.moduleId);
    }

    if (typeof eventRecord.ts === "number" && Number.isFinite(eventRecord.ts)) {
      payload.clientTs = eventRecord.ts;
    }

    const hasPII = PII_BLOCKLIST.some((key) => key in payload);
    if (hasPII) {
      return res.status(400).json({ error: "pii_rejected" });
    }

    valid.push({
      event_type: eventRecord.type,
      payload,
    });
  }

  if (valid.length === 0) {
    return res.status(200).json({ accepted: 0 });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: "env" });
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { error } = await supabase.from("events").insert(valid);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "db" });
  }

  return res.status(200).json({ accepted: valid.length });
};
