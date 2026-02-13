import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import UnoCSS from '@unocss/svelte-scoped/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		UnoCSS({
			configOrPath: './uno.config.ts',
		}),
	],
	kit: {
		adapter: adapter(),
	},
};

export default config;
