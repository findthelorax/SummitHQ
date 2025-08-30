#!/bin/bash
set -e

# --- Write a standalone tsconfig.json (same as yours) ---
cat > tsconfig.json << 'EOF'
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true
    },
    "include": ["src"]
}
EOF

# --- Ensure VITE_API_URL is set ---
# On Railway, you add VITE_API_URL as an Environment Variable in the dashboard.
# This check will fail the build early if it's missing.
if [ -z "$VITE_API_URL" ]; then
  echo "❌ ERROR: VITE_API_URL is not set in Railway environment variables."
  exit 1
fi

# --- Expose VITE_API_URL to Vite build ---
# Vite picks up env vars from .env files OR from the process env if prefixed with VITE_
# To be safe, we'll generate a .env.production here.
cat > .env.production <<EOF
VITE_API_URL=$VITE_API_URL
EOF

echo "✅ Using VITE_API_URL=$VITE_API_URL"

# --- Build frontend ---
vite build
