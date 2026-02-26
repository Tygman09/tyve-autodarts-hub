const axios = require("axios");

async function getBoards(accessToken) {
  const response = await axios.get("https://api.autodarts.io/bs/v0/boards", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json, text/plain, */*",
    },
  });
  return response.data;
}

module.exports = { getBoards };