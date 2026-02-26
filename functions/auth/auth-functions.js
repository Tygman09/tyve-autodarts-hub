const axios = require("axios");

const TOKEN_URL = "https://login.autodarts.io/realms/autodarts/protocol/openid-connect/token";
const CLIENT_ID = "developer-darts-caller";
const CLIENT_SECRET = "e7ex8OkiE3SAN0HhHfqCj1Iap5RhQARu";

let _accessToken = null;
let _refreshToken = null;
let _refreshTimer = null;

async function Login(email, password) {
  try {
    const response = await axios.post(TOKEN_URL, new URLSearchParams({
      grant_type:    "password",
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username:      email,
      password:      password,
    }));

    const { access_token, refresh_token, expires_in } = response.data;
    _accessToken  = access_token;
    _refreshToken = refresh_token;
    _scheduleRefresh(expires_in);
    return _accessToken;
  } catch {
    return null;
  }
}

async function _refresh() {
  try {
    const response = await axios.post(TOKEN_URL, new URLSearchParams({
      grant_type:    "refresh_token",
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: _refreshToken,
    }));

    const { access_token, refresh_token, expires_in } = response.data;
    _accessToken  = access_token;
    _refreshToken = refresh_token;
    _scheduleRefresh(expires_in);
  } catch {
    console.error("❌ Token vernieuwen mislukt");
    _accessToken  = null;
    _refreshToken = null;
  }
}

function _scheduleRefresh(expiresIn) {
  if (_refreshTimer) clearTimeout(_refreshTimer);
  const delay = Math.max((expiresIn - 30) * 1000, 5000);
  _refreshTimer = setTimeout(_refresh, delay);
}

function getToken() {
  return _accessToken;
}

function getPlayerInfo(token) {
  const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  return {
    name:     payload.name,
    username: payload.preferred_username,
    email:    payload.email,
    userId:   payload.sub,
  };
}

module.exports = { Login, getToken, getPlayerInfo };