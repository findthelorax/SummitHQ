#!/bin/bash

# Create a complete tsconfig.json that doesn't extend a parent file
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

# Now proceed with the build
vite build