/// <reference types="vitest" />
import { defineConfig, type Plugin } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";
import { renameSync, mkdirSync, rmSync } from "fs";

function fixHtmlPaths(): Plugin {
  return {
    name: "fix-html-paths",
    closeBundle() {
      const srcDir = resolve(__dirname, "dist/src/newtab");
      const destDir = resolve(__dirname, "dist/newtab");
      const htmlFile = resolve(srcDir, "index.html");
      const destFile = resolve(destDir, "index.html");

      try {
        mkdirSync(destDir, { recursive: true });
        renameSync(htmlFile, destFile);
        rmSync(resolve(__dirname, "dist/src"), {
          recursive: true,
          force: true,
        });
      } catch {
        // Files may already be in correct location
      }
    },
  };
}

export default defineConfig({
  plugins: [
    svelte(),
    viteStaticCopy({
      targets: [
        { src: "manifest.json", dest: "." },
        { src: "manifest.firefox.json", dest: "." },
      ],
    }),
    fixHtmlPaths(),
  ],
  build: {
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, "src/newtab/index.html"),
      },
      output: {
        entryFileNames: "newtab/index.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    outDir: "dist",
    emptyDirOnBuild: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
