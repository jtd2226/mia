import database from 'firebase';

export default function handler(request, response) {
  const body = JSON.parse(request.body);
  const {
    user: { email },
  } = body;
  return database
    .collection('users')
    .doc(email)
    .set(body)
    .then(() => response.status(200).json({ success: true }))
    .catch(error => response.status(500).json({ error }));
}
