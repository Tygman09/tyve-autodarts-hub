const axios = require("axios");

async function getMatchHistory(accessToken) {
  const response = await axios.get("https://api.autodarts.io/as/v0/matches/filter", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json, text/plain, */*",
    },
  });
  return response.data;
}

module.exports = { getMatchHistory };