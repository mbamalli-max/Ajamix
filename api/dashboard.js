const { createClient } = require("@supabase/supabase-js");

function setSameOriginCors(req, res) {
  const origin = req.headers.origin;
  const host = req.headers.host;
  let isSameOrigin = !origin;

  if (origin && host) {
    try {
      const parsedOrigin = new URL(origin);
      isSameOrigin = parsedOrigin.host === host;
    } catch (_error) {
      isSameOrigin = false;
    }
  }

  if (origin && isSameOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  return isSameOrigin;
}

module.exports = async function handler(req, res) {
  const isAllowedOrigin = setSameOriginCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(isAllowedOrigin ? 204 : 403).end();
  }

  if (!isAllowedOrigin) {
    return res.status(403).json({ error: "forbidden" });
  }

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: "env" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const { data, error } = await supabase
    .from("events")
    .select("event_type, created_at");

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "db" });
  }

  const eventRows = Array.isArray(data) ? data : [];
  const counts = {};
  const eventDays = new Set();
  const cutoff = Date.now() - (7 * 24 * 60 * 60 * 1000);
  let eventsLast7Days = 0;

  eventRows.forEach((row) => {
    const type = row && row.event_type ? row.event_type : "unknown";
    counts[type] = (counts[type] || 0) + 1;

    const createdAt = row && row.created_at ? row.created_at : "";
    const createdAtTs = Date.parse(createdAt);

    if (createdAt) {
      eventDays.add(createdAt.slice(0, 10));
    }

    if (Number.isFinite(createdAtTs) && createdAtTs >= cutoff) {
      eventsLast7Days += 1;
    }
  });

  const moduleStarted = counts.module_started || 0;
  const moduleCompleted = counts.module_completed || 0;
  const useTodayYes = counts.use_today_yes || 0;
  const useTodayDeferred = counts.use_today_deferred || 0;
  const useTodayYesRate = useTodayYes + useTodayDeferred
    ? useTodayYes / (useTodayYes + useTodayDeferred)
    : 0;

  return res.status(200).json({
    kpis: {
      totalActiveDays: eventDays.size,
      eventsLast7Days,
      moduleStarted,
      moduleCompleted,
      quizPassed: counts.quiz_passed || 0,
      useTodayYesRate,
      shareInitiated: counts.share_initiated || 0,
      counts,
    },
  });
};
