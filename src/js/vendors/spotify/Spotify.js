function debounce(fn, wait = 400) {
    let timeout = null;
    return (...args) => {
        clearTimeout(timeout);
        return new Promise((resolve) => {
            timeout = setTimeout(() => {
                timeout = null;
                resolve(fn(...args));
            }, wait);
        });
    };
}

export default class Spotify {
    static baseURL = "https://api.spotify.com/v1/";
    static client_id = "2d38679d03b04cdfb39384814e2b8d0e";

    static scopes = ["user-read-currently-playing", "user-read-playback-state"];

    static loginURL = `https://accounts.spotify.com/authorize?client_id=${
        Spotify.client_id
    }&response_type=token&redirect_uri=${
        location.origin
    }&scope=${Spotify.scopes.join("%20")}&show_dialog=true`;
    static access_token;

    static GET_Request = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Spotify.access_token}`,
        },
    };

    static login() {
        console.log("logging in");
        fetch(this.loginURL).then(console.log);
    }

    static loginButton() {
        const button = document.createElement("a");
        button.innerHTML = "LOGIN";
        button.href = Spotify.loginURL;
        return button;
    }

    static async authenticate() {
        const formData = new FormData();
        formData.append("grant_type", "client_credentials");

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(
                    Spotify.clientId + ":03013c1224e34de0ba46dd98e1f38739"
                )}`,
            },
            body: new URLSearchParams(formData),
        });
        const json = await response.json();

        Spotify.access_token = json.access_token;
    }

    static async fetch(url, request) {
        if (!Spotify.access_token) await Spotify.authenticate();
        request.headers.Authorization = `Bearer ${Spotify.access_token}`;
        const response = await fetch(Spotify.baseURL + url, request);
        return await response.json();
    }

    static GET(url) {
        return Spotify.fetch(url, Spotify.GET_Request);
    }

    // mia's id: 5cbHD2ZEOKgTdLt9i8IOlE
    static async getTopTracks(artistId) {
        const json = await Spotify.GET(
            `artists/${artistId}/top-tracks?country=US`
        );
        return json.tracks;
    }

    static search = debounce((string) =>
        Spotify.GET(
            `search?q=${encodeURIComponent(string)}&type=artist%2Ctrack%2Calbum`
        )
    );

    static playlists = debounce((string) =>
        Spotify.GET(`search?q=${encodeURIComponent(string)}&type=playlist`)
    );
}
