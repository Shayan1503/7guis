import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */

const dev = process.env.NODE_ENV === 'development'
const config = {
	kit: {
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				if (path === '/not-found') {
					return;
				}

				throw new Error(message);
			}
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		paths: {
			base: dev ? '' : '/7guis',
		}
	},
	preprocess: vitePreprocess()
};
export default config;