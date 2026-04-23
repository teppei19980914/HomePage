// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://teppei19980914.github.io",
  base: "/HomePage/",
  output: "static",
  // ===== リダイレクト =====
  // ブログ記事のファイル名に日付接頭辞を追加した際の旧 URL → 新 URL リダイレクト。
  // Google Search Console でインデックス済みだった旧 URL への 301 相当の転送。
  // 静的ビルドでは <meta http-equiv="refresh"> を含む HTML が生成される。
  redirects: {
    "/ja/blog/hello-world/": "/HomePage/ja/blog/20260406-hello-world/",
    "/ja/blog/yumehashi-tech-stack/": "/HomePage/ja/blog/20260407-yumehashi-tech-stack/",
    "/ja/blog/yumehashi-story/": "/HomePage/ja/blog/20260408-yumehashi-story/",
    "/ja/blog/yumehashi-cost-optimization/": "/HomePage/ja/blog/20260409-yumehashi-cost-optimization/",
    "/ja/blog/ai-driven-development/": "/HomePage/ja/blog/20260410-ai-driven-development/",
    "/ja/blog/mbti-intj-working-style/": "/HomePage/ja/blog/20260411-mbti-intj-working-style/",
    "/ja/blog/power-of-words/": "/HomePage/ja/blog/20260412-power-of-words/",
    "/ja/blog/janets-law-time/": "/HomePage/ja/blog/20260413-janets-law-time/",
    "/ja/blog/effort-and-luck/": "/HomePage/ja/blog/20260414-effort-and-luck/",
    "/ja/blog/reading-and-perspective/": "/HomePage/ja/blog/20260415-reading-and-perspective/",
    "/ja/blog/money-and-people/": "/HomePage/ja/blog/20260416-money-and-people/",
    "/ja/blog/about-me-guide/": "/HomePage/ja/blog/20260417-about-me-guide/",
    "/en/blog/hello-world/": "/HomePage/en/blog/20260406-hello-world/",
    "/en/blog/yumehashi-tech-stack/": "/HomePage/en/blog/20260407-yumehashi-tech-stack/",
    "/en/blog/yumehashi-story/": "/HomePage/en/blog/20260408-yumehashi-story/",
    "/en/blog/yumehashi-cost-optimization/": "/HomePage/en/blog/20260409-yumehashi-cost-optimization/",
    "/en/blog/ai-driven-development/": "/HomePage/en/blog/20260410-ai-driven-development/",
    "/en/blog/mbti-intj-working-style/": "/HomePage/en/blog/20260411-mbti-intj-working-style/",
    "/en/blog/power-of-words/": "/HomePage/en/blog/20260412-power-of-words/",
    "/en/blog/janets-law-time/": "/HomePage/en/blog/20260413-janets-law-time/",
    "/en/blog/effort-and-luck/": "/HomePage/en/blog/20260414-effort-and-luck/",
    "/en/blog/reading-and-perspective/": "/HomePage/en/blog/20260415-reading-and-perspective/",
    "/en/blog/money-and-people/": "/HomePage/en/blog/20260416-money-and-people/",
    "/en/blog/about-me-guide/": "/HomePage/en/blog/20260417-about-me-guide/",
  },
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
      // ルート /HomePage/ は言語検出のための JS リダイレクトページで、
      // @astrojs/sitemap がデフォルトロケール扱いすることで
      // hreflang="ja-JP" が自身(/HomePage/)と /HomePage/ja/ の両方に
      // 宣言され、サイトマップ検証が失敗する(Google Search Console で
      // 「サイトマップを読み込めませんでした」になる)。
      // 言語検出用の中間ページはサイトマップに含めない。
      filter: (page) => !/^https:\/\/[^/]+\/HomePage\/$/.test(page),
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
