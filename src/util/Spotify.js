let accessToken;
const clientID = "bde60e93bf6240298f875e03899bdd39";
const redirectUrl = "http://localhost:3000";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInUrl = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);
    
        if (tokenInUrl && expiryTime) {
            accessToken = tokenInUrl[1];
            const expiresIn = Number(expiryTime[1]);
        
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("accessToken", null, "/");    
        return accessToken;
        }

    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    window.location = redirect;
    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: {Authorization: `bearer ${accessToken}`},
        })
        .then((response) => response.json())
        .then(jsonResponse => {
            if (!jsonResponse) {
        
                console.error("Response error");
            };
            console.log(jsonResponse);
            
            return jsonResponse.tracks.items.map((t) => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri,
            }))
        })
    },

};

export {Spotify};