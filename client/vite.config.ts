import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
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
		}),
	],
	resolve: {
		alias: {
			'@shared/types': path.resolve(__dirname, '../shared/types'),
			'@enums' : path.resolve(__dirname, '../shared/types/enums.ts'),
		},
	},
});
