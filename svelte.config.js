import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import { config as mdsvexConfig } from './mdsvex.config.js';
import { defineConfig } from "vite";
import compress from "vite-plugin-compression";
import { viteSingleFile } from "vite-plugin-singlefile";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: [".svelte", ...mdsvexConfig.extensions],
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: defineConfig({
			plugins: [
				compress({ algorithm: "brotliCompress" }),
				viteSingleFile()
			],
			build: {
				minify: "esbuild",
				assetsInlineLimit: 100000000,
				chunkSizeWarningLimit: 100000000,
				brotliSize: false,
				rollupOptions: {
					inlineDynamicImports: true,
					output: {
						manualChunks: () => "app.js",
					},
				},
			}
		})
	}
};

export default config;
