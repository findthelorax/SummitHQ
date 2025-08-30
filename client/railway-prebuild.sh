#!/bin/bash
set -e  # <-- this makes the script exit immediately if any command fails

# tsconfig.json
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

# check VITE_API_URL
if [ -z "$VITE_API_URL" ]; then
  echo "❌ ERROR: VITE_API_URL is not set"
  exit 1
fi

# write .env.production
cat > .env.production <<EOF
VITE_API_URL=$VITE_API_URL
EOF

# run vite build
vite build
