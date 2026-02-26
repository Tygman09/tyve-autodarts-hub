const output     = document.getElementById("output");
const liveBox    = document.getElementById("live-box");
const liveStatus = document.getElementById("live-status");
const liveContent = document.getElementById("live-content");
const title      = document.getElementById("page-title");

let toastTimer = null;

function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  toast.innerHTML = message;
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), duration);
}

function setActive(btnId) {
  document.querySelectorAll(".sidebar button").forEach(b => b.classList.remove("active"));
  document.getElementById(btnId).classList.add("active");
}

function showOutput(html) {
  liveBox.classList.remove("active");
  output.style.display = "block";
  output.innerHTML = html;
}

function renderLiveMatch(match) {
  if (!match) {
    liveContent.innerHTML = `<p style="color:#aaa">Geen actieve wedstrijd gevonden.</p>`;
    return;
  }

  const { players, stats, chalkboards, settings, round, set, leg, player: activePlayer } = match;

  const infoHtml = `
    <div class="match-info">
      <span>🎯 <strong>${match.variant ?? "X01"}</strong></span>
      <span>Start: <strong>${settings?.baseScore ?? 501}</strong></span>
      <span>In: <strong>${settings?.inMode ?? "-"}</strong></span>
      <span>Uit: <strong>${settings?.outMode ?? "-"}</strong></span>
      <span>Ronde: <strong>${round ?? "-"}</strong></span>
      <span>Set: <strong>${set ?? "-"}</strong> | Leg: <strong>${leg ?? "-"}</strong></span>
    </div>
  `;

  const playersHtml = `
    <div class="scoreboard">
      ${players.map((p, i) => {
        const s = stats?.[i];
        const score = chalkboards?.[i]?.rows?.slice(-1)[0]?.score ?? "-";
        const lastPoints = chalkboards?.[i]?.rows?.slice(-1)[0]?.points ?? 0;
        const avg = s?.legStats?.average?.toFixed(1) ?? "-";
        const darts = s?.legStats?.dartsThrown ?? "-";
        const isActive = i === activePlayer;
        const avatar = p.avatarUrl
          ? `<img src="${p.avatarUrl}" alt="${p.name}" onerror="this.style.display='none'">`
          : "";

        return `
          <div class="player-card ${isActive ? "active-player" : ""}">
            <div class="player-avatar">${avatar}</div>
            <div class="player-name">${p.name}</div>
            <div class="player-score">${score}</div>
            <div class="player-points">${lastPoints > 0 ? `+${lastPoints}` : ""}</div>
            <div class="player-stats">
              <span><strong>${avg}</strong>gem.</span>
              <span><strong>${darts}</strong>pijlen</span>
              <span><strong>${s?.legStats?.plus100 ?? 0}</strong>100+</span>
              <span><strong>${s?.legStats?.total180 ?? 0}</strong>180</span>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  const chalkHtml = chalkboards ? `
    <div class="chalkboard">
      <table>
        <thead>
          <tr>
            <th>Ronde</th>
            ${players.map(p => `<th>${p.name}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${chalkboards[0].rows.map((_, rowIdx) => `
            <tr>
              <td>${rowIdx === 0 ? "Start" : rowIdx}</td>
              ${chalkboards.map(cb => {
                const row = cb.rows[rowIdx];
                return `<td class="${row?.isScoreStruck ? "struck" : ""}">${row?.score ?? "-"}</td>`;
              }).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  ` : "";

  liveContent.innerHTML = infoHtml + playersHtml + chalkHtml;
}

// Boards
document.getElementById("btn-boards").addEventListener("click", async () => {
  setActive("btn-boards");
  title.textContent = "📋 Borden";
  showOutput("⏳ Laden...");
  const boards = await window.api.getBoards();
  if (!boards || boards.length === 0) return showOutput("Geen borden gevonden.");
  showOutput(boards.map(b => `
    <div class="match-card">
      <h3>${b.name ?? "Onbekend bord"}</h3>
      <p style="color:#aaa;font-size:13px">ID: ${b.id}</p>
    </div>
  `).join(""));
});

// Wedstrijd historie
document.getElementById("btn-history").addEventListener("click", async () => {
  setActive("btn-history");
  title.textContent = "📜 Wedstrijd historie";
  showOutput("⏳ Laden...");
  const matches = await window.api.getMatchHistory();
  if (!matches || matches.length === 0) return showOutput("Geen wedstrijden gevonden.");
  showOutput(matches.map(m => `
    <div class="match-card">
      <h3>${m.variant ?? "Onbekend"} — ${m.finished_at ? new Date(m.finished_at).toLocaleString("nl-NL") : "Bezig"}</h3>
      <p style="color:#aaa;font-size:13px">ID: ${m.id}</p>
    </div>
  `).join(""));
});

// Huidige wedstrijd
document.getElementById("btn-current").addEventListener("click", async () => {
  setActive("btn-current");
  title.textContent = "🎯 Huidige wedstrijd";
  showOutput("⏳ Laden...");
  const match = await window.api.getCurrentMatch();
  if (!match) return showOutput("<p style='color:#aaa'>Geen actieve wedstrijd gevonden.</p>");
  output.style.display = "block";
  liveBox.classList.remove("active");
  output.innerHTML = "";
  // Hergebruik renderLiveMatch maar in output div
  const tempDiv = document.createElement("div");
  tempDiv.id = "live-content";
  output.appendChild(tempDiv);
  const tempStatus = document.createElement("div");
  output.prepend(tempStatus);
  renderLiveMatch(match);
});

// Live volgen
document.getElementById("btn-live").addEventListener("click", async () => {
  setActive("btn-live");
  title.textContent = "🔴 Live wedstrijd volgen";
  output.style.display = "none";
  liveBox.classList.add("active");
  liveStatus.textContent = "⏳ Verbinden met wedstrijd...";
  liveContent.innerHTML = "";
  await window.api.watchMatchStart();
});

let lastPlayer = -1;
let lastBusted = false;

window.api.onMatchUpdate((update) => {
  if (update.event === "match-started") {
    liveStatus.textContent = "🟢 Wedstrijd gestart";
    renderLiveMatch(update.data ?? update.match);
    showToast("🎯 Wedstrijd gestart!");

  } else if (update.event === "match-stopped") {
    liveStatus.textContent = "🏁 Wedstrijd gestopt";
    const match = update.data;
    if (match && match.winner >= 0) {
      const winner = match.players?.[match.winner];
      showToast(`🏆 ${winner?.name ?? "Speler"} wint de wedstrijd!`, 6000);
    } else {
      showToast("🏁 Wedstrijd gestopt", 3000);
    }

  } else if (update.event === "match-updated") {
    liveStatus.textContent = "🟢 Live";
    const match = update.data;
    renderLiveMatch(match);

    // Busted
    if (match.turnBusted && !lastBusted) {
      const player = match.players?.[match.player];
      showToast(`💥 BUSTED! — ${player?.name ?? "Speler"}`, 3000);
    }
    lastBusted = match.turnBusted;

    // Checkout / leg gewonnen
    if (match.gameWinner >= 0) {
      const winner = match.players?.[match.gameWinner];
      showToast(`🏆 ${winner?.name ?? "Speler"} wint!`, 6000);
    } else if (match.player !== lastPlayer && lastPlayer !== -1) {
      // Beurt gewisseld — check of vorige speler uitgegooid heeft (score = 0)
      const prevChalk = match.chalkboards?.[lastPlayer]?.rows?.slice(-1)[0];
      if (prevChalk?.score === 0) {
        const winner = match.players?.[lastPlayer];
        showToast(`✅ CHECKOUT! — ${winner?.name ?? "Speler"}`, 4000);
      }
    }
    lastPlayer = match.player;
  }
});

// Uitloggen
document.getElementById("btn-logout").addEventListener("click", async () => {
  await window.api.logout();
});