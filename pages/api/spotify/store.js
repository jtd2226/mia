import database from 'firebase';

export default function handler(request, response) {
  const { refresh_token, email } = JSON.parse(request.body);
  return database
    .collection('users')
    .doc(email)
    .set({
      refresh_token,
    })
    .then(() => response.status(200).json({ success: true }))
    .catch(error => response.status(500).json({ error }));
}
