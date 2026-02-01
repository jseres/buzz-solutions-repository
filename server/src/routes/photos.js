const express = require('express');
const router = express.Router();
const { getPhotos } = require('../controllers/photosController');

// GET /api/photos
router.get('/photos', getPhotos);

module.exports = router;
