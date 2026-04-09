// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://teppei19980914.github.io",
  base: "/HomePage/",
  output: "static",
  // ===== 多言語対応 =====
  // ja / en の 2 言語をサポート。両言語とも URL にプレフィックスを付与する。
  //  /HomePage/ja/...  → 日本語
  //  /HomePage/en/...  → 英語
  //  /HomePage/       → ルート: クライアントサイドで navigator.language を検出し
  //                     適切な言語ページへリダイレクト
  //
  // ページは src/pages/[lang]/ 配下で単一ソースから両言語分を生成する。
  // getStaticPaths で LOCALES を列挙し、Astro.params.lang で locale を受け取る。
  // 未翻訳コンテンツは getLocalizedCollection 側で ja にフォールバックする。
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // i18n ルーティングを自動認識して hreflang 付き sitemap を生成
      i18n: {
        defaultLocale: "ja",
        locales: {
          ja: "ja-JP",
          en: "en-US",
        },
      },
    }),
  ],
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
