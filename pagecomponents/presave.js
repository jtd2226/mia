import { useEffect } from 'react';

const scopes =
  'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email';

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

  // useEffect(() => {
  //   if (session) console.log({ session });
  //   else if (loading) console.log('loading');
  //   else signIn();
  // }, [session, loading]);

  return (
    <button
      onClick={() => {
        saveCredentials({
          refresh_token: 'blah',
          email: 'naysaymoreno@gmail.com',
        });
      }}
    >
      Click here
    </button>
  );
}
