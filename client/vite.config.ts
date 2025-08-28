import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isRailway = !!process.env.RAILWAY_ENVIRONMENT;
    const frontendPort = parseInt(env.VITE_FRONTEND_PORT || '5173', 10);

    return {
        plugins: [
            react(),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: {
                    name: 'Summit HQ',
                    short_name: 'SummitHQ',
                    start_url: '/',
                    display: 'standalone',
                    background_color: '#ffffff',
                    theme_color: '#0f172a',
                    icons: [
                        {
                            src: '/pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: '/pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                    ],
                },
                // Add this configuration to fix the precaching issue
                workbox: {
                    maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB
                },
            }),
        ],
        server: {
            port: frontendPort,
        },
        // Railway-specific settings
        ...(isRailway && {
            esbuild: {
                jsx: 'automatic',
                jsxImportSource: 'react',
            },
            optimizeDeps: {
                force: true
            },
            // Override TypeScript settings
            typescript: {
                tsconfig: './tsconfig.railway.json',
                noEmit: false,
                skipTypeCheck: true
            },
            // Add code splitting to reduce bundle size
            build: {
                rollupOptions: {
                    output: {
                        manualChunks: {
                            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                            'ui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
                            'grid-vendor': ['ag-grid-react', 'ag-grid-community']
                        }
                    }
                }
            }
        })
    };
});