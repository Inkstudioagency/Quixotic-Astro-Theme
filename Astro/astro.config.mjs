// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and absolute social-share image URLs. Set SITE_URL in .env.
  site: SITE_URL || "https://quixotic-astro-theme.vercel.app",
  // Keep the template's markup byte-for-byte: Webflow layouts rely on the whitespace
  // between inline elements, which HTML compression would remove.
  compressHTML: false,
  build: {
    format: "directory",
    // Emit bundled CSS as /_astro/*.css files instead of inlining it.
    inlineStylesheets: "never",
  },
});
