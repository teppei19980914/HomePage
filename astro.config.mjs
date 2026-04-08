// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://teppei19980914.github.io",
  base: "/HomePage/",
  output: "static",
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          // 外部リンク（http/https）を別タブで開く。
          // 離脱を抑え、HomePage に戻りやすくするための設計。
          target: "_blank",
          // セキュリティ: window.opener の漏洩防止 + リファラ送信抑止
          rel: ["noopener", "noreferrer"],
        },
      ],
    ],
  },
});
