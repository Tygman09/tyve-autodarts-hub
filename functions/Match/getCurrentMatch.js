const axios = require("axios");

const headers = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/json, text/plain, */*",
});

async function getCurrentMatch(accessToken) {
  const response = await axios.get(
    "https://api.autodarts.io/as/v0/matches/filter?size=5&page=0&sort=-created_at",
    { headers: headers(accessToken) }
  );

  // Debug: bekijk de structuur
  console.log("API response:", JSON.stringify(response.data, null, 2));

  const data = response.data;

  // Probeer de array te vinden in de response
  const matches = Array.isArray(data)
    ? data
    : Array.isArray(data.content)
    ? data.content
    : Array.isArray(data.results)
    ? data.results
    : Array.isArray(data.items)
    ? data.items
    : [];

  const active = matches.find((m) => !m.finished_at);
  return active ?? null;
}

async function getMatch(accessToken, matchId) {
  const response = await axios.get(
    `https://api.autodarts.io/as/v0/matches/${matchId}`,
    { headers: headers(accessToken) }
  );
  return response.data;
}

module.exports = { getCurrentMatch, getMatch };