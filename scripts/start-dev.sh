#!/usr/bin/env zsh
set -euo pipefail

# Start both server and client concurrently from the project root.
# - Uses `npm --prefix` so you can run the script from the repo root.
# - Traps exit signals and stops both child processes.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SERVER_DIR="$ROOT_DIR/server"
CLIENT_DIR="$ROOT_DIR/client"

echo "Starting server (in $SERVER_DIR)..."
npm --prefix "$SERVER_DIR" start &
SERVER_PID=$!
echo "  server PID: $SERVER_PID"

echo "Starting client (in $CLIENT_DIR)..."
npm --prefix "$CLIENT_DIR" run dev &
CLIENT_PID=$!
echo "  client PID: $CLIENT_PID"

cleanup() {
  echo "\nStopping processes..."
  kill "$CLIENT_PID" 2>/dev/null || true
  kill "$SERVER_PID" 2>/dev/null || true
  wait 2>/dev/null || true
}

trap "cleanup; exit" INT TERM EXIT

echo "Both processes started. Press Ctrl+C to stop."

wait
