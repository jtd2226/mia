export function getLatestVideos() {
  const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const query = `?part=snippet&maxResults=10&playlistId=UUWbxgF1kHtSeI6i7lJXz9Sw&key=${process.env.YT_API_KEY}`;
  return fetch(`${url}${query}`)
    .then(r => r.json())
    .then(body =>
      body.items
        .filter(item => item.snippet)
        .filter(item => item.snippet.publishedAt)
        .filter(item => item.snippet.resourceId)
        .filter(item => item.snippet.resourceId.videoId)
        .sort(
          (a, b) =>
            new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        )
        .map(
          item =>
            `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`
        )
    );
}
