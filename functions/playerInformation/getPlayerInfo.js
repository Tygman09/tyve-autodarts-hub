const axios = require("axios");

function getPlayerInfo(accessToken) {
  const payload = JSON.parse(
    Buffer.from(accessToken.split(".")[1], "base64").toString("utf-8")
  );
  return {
    name: payload.name,
    username: payload.preferred_username,
    email: payload.email,
    userId: payload.sub,
  };
}

module.exports = { getPlayerInfo };