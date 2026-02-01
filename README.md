
A small demo app for Buzz Solutions: a Node.js/Express backend and a Vite + React frontend that fetches and displays images from Flickr's public feed.

Table of contents

- [Quick start](#quick-start)
- [Run together](#run-together)
- [Run separately](#run-separately)
- [Testing](#testing)

Quick start

Running frontend and backend together

To run the server and client concurrently use the included script. From the project root:

```bash
chmod +x ./scripts/start-dev.sh  # make executable (only needed once)
./scripts/start-dev.sh
```

The script starts both `server` (`npm start`) and `client` (`npm run dev`) and will stop both when you press Ctrl+C.

Running backend


1. Start the server

```bash
cd server
npm install
npm start
```

2. Start the client (in a separate terminal)

```bash
cd client
npm install
npm run dev
```

By default the server listens on `http://localhost:5000`. You can change the port with the `PORT` environment variable.

Testing

Frontend (Vitest)

```bash
cd client
npm install    # if you haven't already
npm test       # runs Vitest
```

Run in watch mode:

```bash
npm test -- --watch
```

Backend (Jest)

Unit tests live in `server/src/__tests__`. They mock network calls (for example, `axios`) so they don't hit the real Flickr API.

```bash
cd server
npm install    # installs dev + regular dependencies (only needed once)
npm test       # runs Jest
```

Run in watch mode:

```bash
npm test -- --watch
```
