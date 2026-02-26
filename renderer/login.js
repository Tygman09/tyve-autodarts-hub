const status = document.getElementById("status");

window.addEventListener("DOMContentLoaded", async () => {
  const cached = await window.api.getCachedLogin();
  if (cached.username) {
    document.getElementById("cached-name").textContent = `Eerdere login: ${cached.username}`;
    document.getElementById("cached").style.display = "block";
    document.getElementById("email").value    = cached.username;
    document.getElementById("password").value = cached.password;
    document.getElementById("boardId").value  = cached.boardId ?? "";
  }
});

document.getElementById("btn-use-cached").addEventListener("click", async () => {
  const cached = await window.api.getCachedLogin();
  await doLogin(cached.username, cached.password, cached.boardId, false);
});

document.getElementById("btn-login").addEventListener("click", async () => {
  const email    = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const boardId  = document.getElementById("boardId").value.trim();
  await doLogin(email, password, boardId, true);
});

async function doLogin(email, password, boardId, save) {
  if (!boardId) {
    status.textContent = "❌ Vul je Board ID in.";
    return;
  }
  status.textContent = "⏳ Inloggen...";
  const result = await window.api.login({ email, password, boardId, save });
  if (result.success) {
    status.textContent = `✔ Welkom, ${result.user.name}!`;
    setTimeout(() => window.api.goToMenu(), 800);
  } else {
    status.textContent = "❌ Inloggen mislukt. Controleer je gegevens.";
  }
}