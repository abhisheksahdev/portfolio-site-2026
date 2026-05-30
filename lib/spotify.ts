const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  if (!refresh_token) {
    throw new Error("No refresh token available. Please re-authenticate.");
  }

  if (!client_id || !client_secret) {
    throw new Error("Missing Spotify client credentials");
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const body = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", refresh_token);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Spotify token refresh error:", {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
      refresh_token: refresh_token
        ? `${refresh_token.substring(0, 10)}...`
        : "NOT SET",
    });
    throw new Error(
      `Token refresh failed: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
