const axios = require('axios');

async function fetchPhotos(tags) {
  const base = 'https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
  let url = base;
  if (tags) url += `&tags=${encodeURIComponent(tags)}`;

  // Simple single-request behavior: wait for the axios request to complete
  const response = await axios.get(url, { timeout: 10000, headers: { 'User-Agent': 'flickr-proxy/1.0' } });
  return response.data;
}

module.exports = { fetchPhotos };
