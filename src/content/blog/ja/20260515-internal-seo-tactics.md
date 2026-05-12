---
title: "ブログの内部 SEO で実装した 5 つの工夫 — タグページ・description・noindex・正規化"
description: "個人ブログで実装した内部 SEO の 5 つの工夫を具体コード付きで公開。タグページの動的生成、description 120-160 字統一、1 記事タグの noindex 化、URL 正規化、内部リンクハブ — 順位向上に効いた仕組みを紹介します。"
date: 2026-05-15
tags: ["SEO", "内部SEO", "Astro", "タグページ", "thin content"]
---

## SEO は施策ではなく「再現可能な仕組み」で勝つ

「SEO 対策をしても、続かなくて結局腐っていく」

そんな経験、ありませんか？私も以前、何度かやらかしています。

[前回の成果発表記事](/HomePage/ja/blog/20260514-seo-one-month-report/)で、個人ブログ 1 か月で Clicks +733% / Impressions +496% を達成したと書きました。

そこから一歩深掘りして、本記事では **「実装上どんな工夫を仕掛けたか」** を、コード付きで公開します。すべて Astro v6 の静的サイトでの実装ですが、考え方自体は他のフレームワーク（Next.js / Nuxt / Hugo 等）でも応用できます。

> **対象読者**: 個人ブログを運用していて、内部 SEO 実装のリアルな例を知りたい人 / 「やる」より「腐らない仕組みにする」を重視したい人

## 工夫 1: タグページを **動的に静的生成** する

「個人ブログでもタグはやった方が良いのか？」の問いに対しては、**やった方が良い**との回答になります。むしろ **タグはインデックス可能 URL を増やす SEO 資産** です。

ただし注意点があります — タグページが **検索結果に表示される単独 URL** として価値を持たないと、SEO 効果はありません。クライアント JS で URL パラメータでフィルタする方式は、**Google から見えない**のでアウト。

### 実装

Astro の `getStaticPaths` で、全タグ × 全ロケールのページを静的生成します。

```typescript
// src/pages/[lang]/blog/tag/[tag].astro
export async function getStaticPaths() {
  const paths = [];
  for (const lang of LOCALES) {
    const posts = (await getLocalizedCollection("blog", lang)).filter(isPublished);
    const tagMap = buildTagMap(posts);
    for (const [tagSlug, tagPosts] of tagMap.entries()) {
      paths.push({ params: { lang, tag: tagSlug }, props: { posts: tagPosts } });
    }
  }
  return paths;
}
```

これだけで、`/HomePage/ja/blog/tag/AI駆動開発/` のような **インデックス可能な URL** が全タグ分自動生成されます。私のサイトでは ja 58 タグ + en 64 タグ = **計 122 ページ** が増えました。

公式根拠: [Sitemaps overview - Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)（インデックス可能 URL の増加が直接効く）

## 工夫 2: 1 記事しかないタグは **noindex** にする

ここが多くの個人ブログがハマる罠。タグページを全部生成しただけだと、**1 記事しか紐付かないタグページ** がたくさん発生します。これは Google から「**thin content**（実質的に独自の付加価値がほとんどないコンテンツ）」と判定される可能性があります。

公式: [Spam policies - Thin content](https://developers.google.com/search/docs/essentials/spam-policies#thin-content)

### 実装

記事数 1 件以下のタグページに `<meta name="robots" content="noindex, follow">` を出力します。

```typescript
// src/utils/blog-tags.ts
export function shouldNoindex(articleCount: number): boolean {
  return articleCount <= 1;
}

// src/pages/[lang]/blog/tag/[tag].astro
const noindex = shouldNoindex(posts.length);
<BaseLayout noindex={noindex}>
```

`noindex, follow` の意図:
- **noindex**: 検索結果には出さない（thin content 判定を回避）
- **follow**: でもリンクは追ってほしい（個別記事へのクロール経路は維持）

公式根拠: [Block search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

## 工夫 3: description を **120-160 字** で機械的に統一

CTR を最も大きく動かすのが description。Google スニペットで表示される情報量は **120-160 字程度**で切れます。短すぎると情報量不足、長すぎると途中で切られる。

### 実装

CLAUDE.md と CI チェックでルール強制:

1. 記事公開前に Claude Code が SEO レビューで文字数を機械チェック
2. ハブページ（`/blog/`、`/profile/` 等）は `src/i18n/{ja,en}.ts` で長文 description を一元管理
3. 動的に生成されるタグページは description テンプレートで動的展開

```typescript
const description = blog.tag.descriptionTemplate
  .replace("{tag}", tagDisplay)        // 「AI駆動開発」
  .replace("{count}", String(count))   // 17
  .replace("{latest}", latest.title)   // 最新記事タイトル
  .replace("{date}", latestDate);      // 2026-05-12
```

**動的に「最新記事 + 件数 + 公開日」を含める** ことで、検索結果のスニペットがフレッシュに見える。これは [Google の Snippet best practices](https://developers.google.com/search/docs/appearance/snippet) で推奨されているパターンです。

## 工夫 4: URL リダイレクトで **過去資産を捨てない**

i18n 対応や URL 構造変更で過去 URL が 404 になると、せっかく蓄積したインデックス・被リンクが失われます。Astro の `redirects` 機能で、**静的 HTML + meta refresh + canonical** の組み合わせが擬似 301 として機能します。

### 実装

```js
// astro.config.mjs
redirects: {
  // i18n 移行で発生した 404 の救済（5 件）
  "/profile/": "/HomePage/ja/profile/",
  "/product/": "/HomePage/ja/product/",
  "/contact/": "/HomePage/ja/contact/",
  "/blog/":    "/HomePage/ja/blog/",
  "/project/": "/HomePage/ja/project/",
  // ブログスラッグ変更時の救済（22 件）
  "/ja/blog/hello-world/": "/HomePage/ja/blog/20260406-hello-world/",
  // ...
},
```

ビルド時に各リダイレクト元に専用 HTML が生成されます:

```html
<meta http-equiv="refresh" content="0;url=/HomePage/ja/profile/">
<meta name="robots" content="noindex">
<link rel="canonical" href="https://.../HomePage/ja/profile/">
```

これで Google は canonical 経由で正規 URL を学習し、**新 URL に評価を引き継いでくれる** 仕組みです。

公式根拠: [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

## 工夫 5: タグ一覧ハブで **内部リンクを集約** する

個別タグページを作っただけでは、サイト内のクロール深度が深くなります（`/blog/` から個別記事を経由してタグページに到達）。

`/blog/tags/` という **タグ一覧ハブページ** を作り、全タグページへのリンクを集約。これでタグページが **2 クリック以内** にクロール可能になり、Google にとってサイト構造が理解しやすくなります。

### 実装

```astro
// src/pages/[lang]/blog/tags.astro
const tagMap = buildTagMap(posts);
const tagsSorted = listTagsSorted(tagMap); // 記事数降順

<ul class="tag-cloud">
  {tagsSorted.map(({ slug, count }) => (
    <li>
      <a href={localeUrl(lang, `blog/tag/${slug}/`)}>
        #{displayMap.get(slug)} <span>({count})</span>
      </a>
    </li>
  ))}
</ul>
```

公式根拠: [Crawling and indexing best practices](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) — 内部リンクハブはクロール効率を上げる

## さいごに

5 つの工夫はどれも、**Google 公式の推奨に沿った静的サイト用の実装** です。特別な裏技はありません。

ポイントは「**仕組みとして組み込む**」こと。CI チェック、TypeScript の型システム、ビルド時の自動生成、テストでの検証 — これらを使って、**気をつけて運用** ではなく **そもそも壊れない** 状態を作ります。

3 部作の最終回として、ここまで読んでくださって本当にありがとうございます。もし「自分のサイトでもひとつ試してみようかな」と感じてもらえたら、まずはタグページの動的生成あたりから手を付けるのがおすすめです。1 か月後の Search Console の数字が、ちょっとした楽しみになります。

## 関連記事

- [個人ブログの SEO 対策 — 月額 0 円で平均掲載順位 18 位まで上げた具体的な手順](/HomePage/ja/blog/20260513-seo-tactics-for-personal-blog/) — 3 部作の前編（実装した SEO 施策 9 つ）
- [個人ブログ 1 か月で Clicks +733% / Impressions +496% を達成した話](/HomePage/ja/blog/20260514-seo-one-month-report/) — 3 部作の中編（成果分析）
- [このホームページに込めた思い — Astro v6 という、まだ日本で知られていないフレームワークと歩む](/HomePage/ja/blog/20260418-astro-v6-homepage/) — サイトの設計判断
