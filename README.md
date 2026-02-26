# 🎯 Autodarts Desktop

Een strakke Electron desktop applicatie voor [Autodarts](https://autodarts.io) — volg je wedstrijden live, bekijk je statistieken en beheer je borden vanuit één overzichtelijke interface.

---

## ✨ Features

- 🔐 **Automatisch inloggen** — inloggegevens worden lokaal gecached
- 🔄 **Token auto-refresh** — sessie verloopt nooit tijdens gebruik
- 📋 **Borden overzicht** — bekijk al je gekoppelde Autodarts borden
- 📜 **Wedstrijd historie** — overzicht van je gespeelde wedstrijden
- 🎯 **Huidige wedstrijd** — snapshot van de actieve wedstrijd
- 🔴 **Live volgen** — real-time scorebord via WebSocket
- 🔔 **Meldingen** — toast notificaties bij busted, checkout en winst

---

## 🖥️ Schermafbeeldingen

| Login | Live Scorebord |
|-------|---------------|
| Inlogscherm met cache | Real-time wedstrijd weergave |

---

## 🚀 Installatie

### Vereisten
- [Node.js](https://nodejs.org) v18 of hoger
- Een [Autodarts](https://autodarts.io) account

### Stappen

```bash
# 1. Clone de repository
git clone https://github.com/jouwusername/autodarts-desktop.git
cd autodarts-desktop

# 2. Installeer dependencies
npm install

# 3. Start de applicatie
npm start
