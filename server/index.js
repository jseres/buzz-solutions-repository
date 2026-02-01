const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

// Simple CORS middleware to allow requests from the client dev server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    return res.sendStatus(204);
  }
  next();
});
app.get('/api/photos', async (req, res) => {
  try {
    const tags = req.query.tags;
    let url = 'https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
    console.log(url)
    console.log("helllooo")
    if (tags) url += `&tags=${encodeURIComponent(tags)}`;
    console.log("inside if")

    // Simpler retry: try up to 3 times, waiting longer between each attempt
    const maxAttempts = 3;
    let response;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        response = await axios.get(url, { timeout: 10000, headers: { 'User-Agent': 'flickr-proxy/1.0' } });
        break;
      } catch (err) {
        if (attempt === maxAttempts) {
          console.error('Error fetching Flickr feed after retries:', err.message || err);
          const status = err.response && err.response.status;
          if (status === 429) {
            return res.status(429).json({ error: 'Flickr rate limit exceeded. Please try again later.' });
          }
          return res.status(500).json({ error: 'Failed to fetch Flickr feed' });
        }

        const waitMs = 3000 * attempt; // waits: 3000ms, 6000ms
        console.warn(`Request failed (attempt ${attempt}/${maxAttempts}). Waiting ${waitMs}ms before retry...`);
        await new Promise((r) => setTimeout(r, waitMs));
      }
    }

    res.json(response.data);
  } catch (err) {
    console.error('Error fetching Flickr feed:', err.message || err);
    res.status(500).json({ error: 'Failed to fetch Flickr feed' });
  }
});

app.listen(PORT, () => console.log(`Flickr proxy server listening on http://localhost:${PORT}`));
