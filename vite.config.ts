import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from '@unocss/svelte-scoped/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		UnoCSS({
			injectReset: '@unocss/reset/tailwind.css',
		}),
		sveltekit(),
	],
	server: {
		host: '127.0.0.1',
		port: 5173,
		allowedHosts: ['css.anybet.fi'],
		hmr: {
			protocol: 'wss',
			host: 'css.anybet.fi',
			clientPort: 443,
		},
	},
});
