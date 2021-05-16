function saveCredentials(credentials) {
  fetch('/api/presave', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }).catch(console.error);
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
