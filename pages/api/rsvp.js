export default async function handler(request, response) {
  try {
    return fetch('https://dash.lovpune.com/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    })
      .then(res => res.json())
      .then(data => response.status(200).json(data));
  } catch (error) {
    return response.status(500).json({ error });
  }
}
