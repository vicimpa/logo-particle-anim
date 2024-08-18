import { defineConfig } from 'vite';
import paths from "vite-tsconfig-paths";
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  root: "./src",
  publicDir: "../public",
  build: {
    emptyOutDir: true,
    outDir: "../dist"
  },
  plugins: [
    paths({ root: ".." }),
    svelte({ configFile: "../svelte.config.js" }),
  ],
});
