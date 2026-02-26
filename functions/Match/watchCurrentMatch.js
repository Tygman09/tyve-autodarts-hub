// functions/Match/watchCurrentMatch.js
const WebSocket = require("ws");
const axios = require("axios");

const AUTODART_MATCHES_URL = "https://api.autodarts.io/gs/v0/matches/";
const AUTODART_WEBSOCKET_URL = "wss://api.autodarts.io/ms/v0/subscribe";

function renderMatchState(data) {
  // Guard: sla over als essentiële data ontbreekt
  if (
    !data?.players?.length ||
    !data?.gameScores?.length ||
    data.player == null ||
    !data.players[data.player]
  ) return;

  console.clear();

  const player = data.players[data.player];
  const stats  = data.stats?.[data.player]?.legStats ?? null;
  const score  = data.gameScores[data.player];
  const turn   = data.turns?.at(-1);

  console.log("═".repeat(45));
  console.log(`🎯  AUTODARTS LIVE  —  ${data.variant} ${data.settings.baseScore}`);
  console.log("═".repeat(45));

  // Speler info
  console.log(`👤  ${player.name.padEnd(20)} Score: ${String(score).padStart(3)}`);
  console.log(`    Ronde ${data.round}  |  Leg ${data.leg}  |  Set ${data.set}`);
  console.log("─".repeat(45));

  // Huidige beurt
  if (turn) {
    const throws = turn.throws ?? [];
    const throwStr = throws.length
      ? throws.map(t => `${t.segment?.name ?? "?"}(${t.points})`).join("  ")
      : "Wachten op worp...";
    console.log(`🏹  Huidige beurt:  ${throwStr}`);
    console.log(`    Beurt score:    ${data.turnScore}${data.turnBusted ? "  💥 BUST!" : ""}`);
  }

  console.log("─".repeat(45));

  // Stats
  if (stats) {
    console.log(`📊  Gem: ${stats.average.toFixed(1).padStart(6)}  |  First9: ${stats.first9Average.toFixed(1).padStart(6)}`);
    console.log(`    Darts: ${stats.dartsThrown}  |  +60: ${stats.plus60}  |  +100: ${stats.plus100}  |  +140: ${stats.plus140}`);
  }

  // Krijtbord
  console.log("─".repeat(45));
  console.log("📋  Krijtbord:");
  const rows = data.chalkboards[0]?.rows ?? [];
  rows.forEach(row => {
    if (row.round === 0) return;
    const struck = row.isScoreStruck ? "~~" : "  ";
    console.log(`    Ronde ${String(row.round).padStart(2)}: ${struck}${String(row.score).padStart(3)}${struck}  (+${row.points})`);
  });

  console.log("═".repeat(45));
}

function watchCurrentMatch(accessToken, boardId, onMatchUpdate) {
  const ws = new WebSocket(AUTODART_WEBSOCKET_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  let currentMatchId = null;

  ws.on("open", () => {
    console.log("✅ WebSocket verbonden, wachten op match...");
    ws.send(JSON.stringify({
      channel: "autodarts.boards",
      type: "subscribe",
      topic: `${boardId}.matches`,
    }));
  });

  ws.on("message", async (raw) => {
    const msg = JSON.parse(raw);
    const data = msg.data;
    if (!data) return;

    // Match gestart
    if (msg.channel === "autodarts.boards" && data.event === "start") {
      currentMatchId = data.id;
      console.log("🎯 Match gestart:", currentMatchId);

      try {
        const res = await axios.get(AUTODART_MATCHES_URL + currentMatchId, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        renderMatchState(res.data);
        onMatchUpdate?.({ event: "match-started", match: res.data });
      } catch (e) {
        console.error("❌ Fout bij ophalen initiële match data:", e.response?.data ?? e.message);
      }

      // Subscribe altijd, ook als de initiële fetch mislukt
      ws.send(JSON.stringify({
        channel: "autodarts.matches",
        type: "subscribe",
        topic: `${currentMatchId}.state`,
      }));
    }

    // Match update (elke worp)
    if (msg.channel === "autodarts.matches") {
      renderMatchState(data);
      onMatchUpdate?.({ event: "match-updated", data });
    }

    // Match gestopt
    if (msg.channel === "autodarts.boards" &&
        (data.event === "finish" || data.event === "delete")) {
      console.log("\n🏁 Match afgelopen!");
      onMatchUpdate?.({ event: "match-stopped", data });

      if (currentMatchId) {
        ws.send(JSON.stringify({
          channel: "autodarts.matches",
          type: "unsubscribe",
          topic: `${currentMatchId}.state`,
        }));
        currentMatchId = null;
      }
    }
  });

  ws.on("close", () => console.log("🔌 WebSocket verbroken"));
  ws.on("error", (err) => console.error("❌ WebSocket fout:", err.message));

  return ws;
}

module.exports = { watchCurrentMatch };