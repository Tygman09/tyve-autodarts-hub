const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { Login, getToken } = require("./functions/auth/auth-functions.js");
const { getBoards } = require("./functions/playerInformation/getBoards.js");
const { getPlayerInfo } = require("./functions/playerInformation/getPlayerInfo.js");
const { getMatchHistory } = require("./functions/playerInformation/matchHistory.js");
const { getCurrentMatch } = require("./functions/Match/getCurrentMatch.js");
const { watchCurrentMatch } = require("./functions/Match/watchCurrentMatch.js");
const fs = require("fs");

let mainWindow;
let loginCache = {};

try {
  loginCache = JSON.parse(fs.readFileSync("loginCache.json", "utf-8"));
} catch {
  loginCache = { username: "", password: "", boardId: "" };
}

function createWindow(page) {
  if (mainWindow) mainWindow.close();
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "renderer", page));
}

app.whenReady().then(() => {
  createWindow("index.html");
});

ipcMain.handle("get-cached-login", () => loginCache);

ipcMain.handle("login", async (_, { email, password, boardId, save }) => {
  const token = await Login(email, password);
  if (!token) return { success: false };

  if (save) {
    loginCache.username = email;
    loginCache.password = password;
    loginCache.boardId  = boardId;
    fs.writeFileSync("loginCache.json", JSON.stringify(loginCache, null, 2));
  }

  return { success: true, user: getPlayerInfo(token) };
});

ipcMain.handle("go-to-menu", () => {
  createWindow("menu.html");
});

ipcMain.handle("get-boards", async () => {
  return await getBoards(getToken());
});

ipcMain.handle("get-match-history", async () => {
  return await getMatchHistory(getToken());
});

ipcMain.handle("get-current-match", async () => {
  return await getCurrentMatch(getToken());
});

ipcMain.handle("watch-match-start", (event) => {
  watchCurrentMatch(getToken(), loginCache.boardId, (update) => {
    event.sender.send("match-update", update);
  });
});

ipcMain.handle("logout", () => {
  loginCache = { username: "", password: "", boardId: "" };
  fs.writeFileSync("loginCache.json", JSON.stringify(loginCache, null, 2));
  createWindow("index.html");
});