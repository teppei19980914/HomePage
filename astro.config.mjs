// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://teppei19980914.github.io",
  base: "/HomePage",
  output: "static",
  integrations: [sitemap()],
});
