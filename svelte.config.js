import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */

const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		paths: {
			base: process.argv.includes('dev') ? '/7guis' : process.env.BASE_PATH
		}
	},
	preprocess: vitePreprocess()
};
export default config;