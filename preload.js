const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getCachedLogin:   ()         => ipcRenderer.invoke("get-cached-login"),
  login:            (data)     => ipcRenderer.invoke("login", data),
  goToMenu:         ()         => ipcRenderer.invoke("go-to-menu"),
  getBoards:        ()         => ipcRenderer.invoke("get-boards"),
  getMatchHistory:  ()         => ipcRenderer.invoke("get-match-history"),
  getCurrentMatch:  ()         => ipcRenderer.invoke("get-current-match"),
  watchMatchStart:  ()         => ipcRenderer.invoke("watch-match-start"),
  logout:           ()         => ipcRenderer.invoke("logout"),
  onMatchUpdate:    (callback) => ipcRenderer.on("match-update", (_, data) => callback(data)),
});