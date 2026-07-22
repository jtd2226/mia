export default async function handler(request, response) {
  try {
    const results = await fetch('http://dash.lovpune.com/api/rsvp', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(request.body),
    }).then(r => r.json());
    return response.status(200).json(results);
  } catch (error) {
    return response
      .status(500)
      .json({ error: error?.message ?? error ?? 'Unknown Error' });
  }
}
