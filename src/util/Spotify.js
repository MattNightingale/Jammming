let accessToken;
const clientID = "bde60e93bf6240298f875e03899bdd39";
const redirectUrl = "https://jammming-coral.vercel.app/";


const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
};

const base64URLEncode = (buffer) => {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
};

const generateCodeChallenge = async (verifier) => {
  const hashed = await sha256(verifier);
  return base64URLEncode(new Uint8Array(hashed));
};

const Spotify = {
  async getAccessToken() {
    if (accessToken) return accessToken;

    // Check for authorization code in URL
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      // Exchange code for token
      const codeVerifier = localStorage.getItem("code_verifier");

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientID,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUrl,
          code_verifier: codeVerifier,
        }),
      });

      const data = await response.json();
      accessToken = data.access_token;
      const expiresIn = data.expires_in;

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("", "", "/");

      localStorage.removeItem("code_verifier");
      return accessToken;
    }

    // No token and no code, redirect to Spotify auth
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem("code_verifier", codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&scope=playlist-modify-public&redirect_uri=${redirectUrl}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    window.location = redirect;
  },

  async search(term) {
    accessToken = await Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) {
          console.error("Response error");
        }
        console.log(jsonResponse);

        return jsonResponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
        }));
      });
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const aToken = await Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${aToken}` };
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: header,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: header,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },

  async getUserProfile() {
    const aToken = await Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${aToken}` };
    return fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then((response) => response.json())
      .then((jsonResponse) => ({
        name: jsonResponse.display_name,
        id: jsonResponse.id,
      }));
  },
};

export { Spotify };
