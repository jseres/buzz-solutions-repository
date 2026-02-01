# Flickr Public Feed Viewer

This project contains a NodeJS backend (Express) and a React frontend (Vite) that fetches images from Flickr's public feed and displays them in a stylish manner

Quick start:

1. Start the server:

```bash
cd flickr-app/server
npm install
npm start
```

2. Start the client(In a seperate terminal):

```bash
cd ../client
npm install
npm run dev
```

The client expects the server at `http://localhost:5000`.

Notes:
- The server proxies requests to `https://www.flickr.com/services/feeds/photos_public.gne` to avoid CORS issues.
- Search by tag(s) using the search box (comma-separated tags accepted by Flickr).
