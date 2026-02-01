const express = require('express');
const photosRouter = require('./src/routes/photos');
const corsMiddleware = require('./src/middleware/cors');

const app = express();

// Register CORS middleware so the frontend can call this API
app.use(corsMiddleware);

// Routes
app.use('/api', photosRouter);

module.exports = app;
