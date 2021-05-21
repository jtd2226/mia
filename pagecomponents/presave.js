import { useEffect } from 'react';
import Request from 'network/cache';
const scope =
  'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email';
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const response_type = 'code';
const redirect_uri = 'http://localhost:5000/presave';
const spotify = {
  auth: Request.path('https://accounts.spotify.com'),
  api: Request.path('https://api.spotify.com/v1'),
  setSession(session) {
    spotify.session = session;
    localStorage.setItem('email', session.email);
    spotify.api = spotify.api.headers({
      Authorization: `Bearer ${session.access_token}`,
    });
  },
};

if (process.browser) {
  spotify.token = spotify.auth.POST.path('api/token').headers({
    Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
  });
}

function login() {
  const url = spotify.auth.path('authorize').query({
    client_id,
    client_secret,
    response_type,
    redirect_uri,
    scope,
  }).fullURL;
  location.replace(url);
}

function refresh() {
  const refresh_token = '???';
  return spotify.token.form({
    grant_type: 'refresh_token',
    refresh_token,
  });
}

function authorize(code) {
  const grant_type = 'authorization_code';
  return spotify.token
    .form({ grant_type, code, redirect_uri })
    .send()
    .then(session => {
      spotify.setSession(session);
      return spotify.api
        .path('me')
        .send()
        .then(user => ({ user, session }));
    })
    .then(saveCredentials);
}

function saveCredentials(credentials) {
  return Request.POST.path('/api/spotify/store').json(credentials).send();
}

function getMiasSong() {
  return spotify.api
    .path('search')
    .query({
      q: 'upc:195939895060',
      type: 'track,album',
    })
    .then(data => {
      console.log(data);
    });
}

/*
curl -X "PUT" "https://api.spotify.com/v1/me/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
*/
function likeMiasSong() {
  return getMiasSong().then(({ id }) =>
    spotify.api.PUT.path('me/tracks').query({ ids: id })
  );
}

export default function PreSave() {
  // const [session, loading] = useSession();

  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search);
    const code = urlQuery.get('code');
    if (code) authorize(code);
  }, []);

  return (
    <button
      onClick={() => {
        login();
      }}
    >
      Click here
    </button>
  );
}
