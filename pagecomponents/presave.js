import { useEffect } from 'react';
import Request from 'network/cache';
const scope =
  'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email';
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const response_type = 'code';
const redirect_uri = 'http://localhost:5000/presave';
const spotify = Request.path('https://accounts.spotify.com');
function login() {
  const url = spotify.path('authorize').query({
    client_id,
    client_secret,
    response_type,
    redirect_uri,
    scope,
  }).fullURL;
  location.replace(url);
}
function authorize(code) {
  const grant_type = 'authorization_code';
  return (
    spotify.POST.path('api/token')
      // .headers({
      //   Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
      // })
      .form({ grant_type, code, redirect_uri, client_id, client_secret })
      .send()
      .then(saveCredentials)
  );
}
function saveCredentials(credentials) {
  fetch('/api/spotify/store', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
    .then(r => r.json())
    .then(data => (data.error ? console.error(data.error) : console.log(data)))
    .catch(console.error);
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
