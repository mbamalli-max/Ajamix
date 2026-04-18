module.exports = (req, res) => res.status(200).json({
  ok: true,
  ts: new Date().toISOString(),
  version: "v3.0-phase0",
});
