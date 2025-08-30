#!/bin/bash
set -e  # <-- this makes the script exit immediately if any command fails

echo "🔹 Railway prebuild script"

# Copy standalone TS config for Railway
cp tsconfig.railway.json tsconfig.json

# check VITE_API_URL
if [ -z "$VITE_API_URL" ]; then
  echo "❌ ERROR: VITE_API_URL is not set"
  exit 1
fi

# Write .env.production if VITE_API_URL exists
if [ ! -z "$VITE_API_URL" ]; then
  echo "VITE_API_URL=$VITE_API_URL" > .env.production
fi

# Build Vite
vite build

echo "✅ Vite build completed"