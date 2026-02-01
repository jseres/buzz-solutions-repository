const flickrService = require('../services/flickrService');

async function getPhotos(req, res) {
  try {
    const tags = req.query.tags;
    const data = await flickrService.fetchPhotos(tags);
    res.json(data);
  } catch (err) {
    console.error('Error in photosController:', err && err.message ? err.message : err);
    const msg = (err && err.message) ? err.message : 'Failed to fetch Flickr feed';
    res.status(500).json({ error: msg });
  }
}

module.exports = { getPhotos };
