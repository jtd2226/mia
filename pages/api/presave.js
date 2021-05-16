export default function handler(request, response) {
  const credentials = JSON.parse(request.body);
  console.log(credentials);
  // TODO: save credentials in firestore
  return response.status(200).json({ success: true });
}
