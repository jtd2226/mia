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
