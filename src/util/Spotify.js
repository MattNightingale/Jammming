let accessToken;
const clientID = "bde60e93bf6240298f875e03899bdd39";
const redirectUrl = "https://jammming-xi.vercel.app/";

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
            headers: {Authorization: `Bearer ${accessToken}`},
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

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) return;
        const aToken = Spotify.getAccessToken();
        const header = {Authorization: `Bearer ${aToken}`};
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, {headers: header})
        .then(response => response.json())
        .then((jsonResponse) => {
            const userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header, 
                method: "POST",
                body: JSON.stringify({name: name}),
            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: header,
                    method: "POST",
                    body: JSON.stringify({uris: trackUris}),
                });
            });
        });
    }
};

export {Spotify};
