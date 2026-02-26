# 🎯 Autodarts Hub

<div align="center">

![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub License](https://img.shields.io/github/license/Tygman09/tyve-autodarts-hub?style=for-the-badge)


**🇳🇱 [Nederlands](#-nederlands) · 🇬🇧 [English](#-english) · 🇩🇪 [Deutsch](#-deutsch)**

</div>

---

## 🇳🇱 Nederlands

### Wat is dit?

Autodarts Hub is een open-source Electron desktop applicatie voor [Autodarts](https://autodarts.io). Het is gebouwd als **persoonlijk platform** — een startpunt om op verder te bouwen en uit te breiden met nieuwe functies en programma's.

Voel je vrij om te forken, aan te passen en je eigen ding te maken.

### ✨ Huidige functies

- 🔐 Automatisch inloggen met lokale cache
- 🔄 Token auto-refresh — sessie verloopt nooit
- 📋 Borden overzicht
- 📜 Wedstrijd historie
- 🎯 Huidige wedstrijd snapshot
- 🔴 Live scorebord via WebSocket
- 🔔 Toast meldingen bij busted, checkout en winst

### 🚀 Installatie

```bash
git clone https://github.com/jouwusername/autodarts-hub.git
cd autodarts-hub
npm install
npm start
```

### 📁 Structuur

```
autodarts-hub/
├── main.js                    # Electron hoofdproces & IPC
├── preload.js                 # Renderer bridge
├── loginCache.json            # Lokale login cache
├── renderer/
│   ├── index.html             # Loginscherm
│   ├── login.js
│   ├── menu.html              # Hoofdmenu & scorebord
│   └── menu.js
└── functions/
    ├── auth/
    │   └── auth-functions.js
    ├── playerInformation/
    │   ├── getBoards.js
    │   ├── getPlayerInfo.js
    │   └── matchHistory.js
    └── Match/
        ├── getCurrentMatch.js
        └── watchCurrentMatch.js
```

### ⚙️ Configuratie

Bij het eerste gebruik vul je je e-mail, wachtwoord én board ID in via het inlogscherm. Deze worden lokaal gecached zodat je ze niet opnieuw hoeft in te voeren.

> ⚠️ Voeg `loginCache.json` toe aan `.gitignore`

### 🙏 Credits

Grote dank aan **[@lbormann](http://github.com/lbormann/)** voor de inspiratie en een aantal functies waar ik naar gekeken heb. Zijn projecten zijn een geweldige bron voor de Autodarts community.

---

## 🇬🇧 English

### What is this?

Autodarts Hub is an open-source Electron desktop application for [Autodarts](https://autodarts.io). It's built as a **personal platform** — a foundation to build upon and extend with new features and programs over time.

Feel free to fork it, modify it, and make it your own.

### ✨ Current features

- 🔐 Auto-login with local credential cache
- 🔄 Token auto-refresh — session never expires
- 📋 Boards overview
- 📜 Match history
- 🎯 Current match snapshot
- 🔴 Live scoreboard via WebSocket
- 🔔 Toast notifications for busted, checkout and win events

### 🚀 Installation

```bash
git clone https://github.com/yourusername/autodarts-hub.git
cd autodarts-hub
npm install
npm start
```

### 📁 Structure

```
autodarts-hub/
├── main.js                    # Electron main process & IPC
├── preload.js                 # Renderer bridge
├── loginCache.json            # Local login cache
├── renderer/
│   ├── index.html             # Login screen
│   ├── login.js
│   ├── menu.html              # Main menu & scoreboard
│   └── menu.js
└── functions/
    ├── auth/
    │   └── auth-functions.js
    ├── playerInformation/
    │   ├── getBoards.js
    │   ├── getPlayerInfo.js
    │   └── matchHistory.js
    └── Match/
        ├── getCurrentMatch.js
        └── watchCurrentMatch.js
```

### ⚙️ Configuration

On first launch, enter your email, password and board ID in the login screen. These are cached locally so you won't need to enter them again.

> ⚠️ Add `loginCache.json` to your `.gitignore`

### 🛠️ Built with

| Tool | Purpose |
|------|---------|
| [Electron](https://electronjs.org) | Desktop framework |
| [Axios](https://axios-http.com) | HTTP requests |
| [ws](https://github.com/websockets/ws) | WebSocket client |
| Autodarts Keycloak | Auth & token management |

### 🙏 Credits

Big thanks to **[@lbormann](http://github.com/lbormann/)** for the inspiration and several functions I referenced while building this. His projects are an invaluable resource for the Autodarts community.

---

## 🇩🇪 Deutsch

### Was ist das?

Autodarts Hub ist eine Open-Source Electron Desktop-Anwendung für [Autodarts](https://autodarts.io). Sie wurde als **persönliche Plattform** entwickelt — eine Grundlage, die kontinuierlich mit neuen Funktionen und Programmen erweitert werden soll.

Fork es, passe es an und mach es zu deinem eigenen Projekt.

### ✨ Aktuelle Funktionen

- 🔐 Automatischer Login mit lokalem Cache
- 🔄 Token Auto-Refresh — Sitzung läuft nie ab
- 📋 Boards-Übersicht
- 📜 Spielverlauf
- 🎯 Aktuelles Spiel Snapshot
- 🔴 Live-Anzeigetafel via WebSocket
- 🔔 Toast-Benachrichtigungen bei Busted, Checkout und Sieg

### 🚀 Installation

```bash
git clone https://github.com/deinusername/autodarts-hub.git
cd autodarts-hub
npm install
npm start
```

### 📁 Struktur

```
autodarts-hub/
├── main.js                    # Electron Hauptprozess & IPC
├── preload.js                 # Renderer Bridge
├── loginCache.json            # Lokaler Login-Cache
├── renderer/
│   ├── index.html             # Anmeldebildschirm
│   ├── login.js
│   ├── menu.html              # Hauptmenü & Anzeigetafel
│   └── menu.js
└── functions/
    ├── auth/
    │   └── auth-functions.js
    ├── playerInformation/
    │   ├── getBoards.js
    │   ├── getPlayerInfo.js
    │   └── matchHistory.js
    └── Match/
        ├── getCurrentMatch.js
        └── watchCurrentMatch.js
```

### ⚙️ Konfiguration

Beim ersten Start gibst du deine E-Mail, dein Passwort und deine Board-ID im Anmeldebildschirm ein. Diese werden lokal gespeichert, sodass du sie nicht erneut eingeben musst.

> ⚠️ `loginCache.json` zur `.gitignore` hinzufügen

### 🛠️ Technologien

| Tool | Zweck |
|------|-------|
| [Electron](https://electronjs.org) | Desktop-Framework |
| [Axios](https://axios-http.com) | HTTP-Anfragen |
| [ws](https://github.com/websockets/ws) | WebSocket-Client |
| Autodarts Keycloak | Authentifizierung & Token-Verwaltung |

### 🙏 Danksagung

Großer Dank gilt **[@lbormann](http://github.com/lbormann/)** für die Inspiration und einige Funktionen, die ich als Referenz verwendet habe. Seine Projekte sind eine wertvolle Ressource für die gesamte Autodarts-Community.

---

<div align="center">

Gemaakt met ❤️ voor de Autodarts community · Made with ❤️ for the Autodarts community · Gemacht mit ❤️ für die Autodarts-Community

</div>
