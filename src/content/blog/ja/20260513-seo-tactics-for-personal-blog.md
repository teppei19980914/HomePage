---
title: "個人ブログの SEO 対策 — 月額 0 円で平均掲載順位 18 位まで上げた具体的な手順"
description: "公開 1 か月で平均掲載順位 38 → 18.97、CTR 7.8% → 10.89% を達成した個人ブログの具体的 SEO 施策を公開。sitemap・hreflang・description 最適化・GSC 連携・redirects 設定まで実例ベースで紹介します。"
date: 2026-05-13
tags: ["SEO", "個人ブログ", "GitHub Pages", "Astro", "Search Console"]
---

## 「個人ブログの SEO はやれることが少ない」は誤解だった

「個人ブログなんて、どうせ検索に出ないでしょ」

そう思って、書くこと自体を半ば諦めかけたことありませんか？私は正直、ありました。

ところが、開設 1 か月で **平均掲載順位 38 → 18.97（検索結果 4 ページ目 → 2 ページ目）**、CTR 7.8% → 10.89% に改善できました。やったのは、Google が公式に推奨している基本対策を、1 つずつ静的サイト用に実装しただけです。

本記事では、月額 0 円の個人ブログ（GitHub Pages + Astro）で **実際に効いた SEO 施策 9 つ** を、根拠と実装手順付きで公開します。

> **対象読者**: 個人サイト・ブログを公開しているがアクセスが伸び悩んでいる人 / 静的サイトでどこまで SEO ができるか知りたい人

## 前提: 静的サイトでも SEO はフルでやれる

「動的サイトじゃないと SEO は不利」というのは古い情報です。Google 公式の [Search Essentials](https://developers.google.com/search/docs/essentials) を読むと、要件はすべて HTML レベル — 静的サイトでも 100% 実装できます。

むしろ静的サイトの方が:

- **表示速度が圧倒的に速い**（Core Web Vitals 有利）
- **HTML が事前生成済み**（クロール・レンダリングがスムーズ）
- **インフラトラブルが起きにくい**（GitHub Pages の SLA が高い）

など、有利な点が多いです。

## 効いた SEO 施策 9 つ

### 1. sitemap.xml の自動生成

Astro なら `@astrojs/sitemap` を入れて `astro.config.mjs` に登録するだけで、ビルド時に sitemap が自動生成されます。

```js
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: "https://teppei19980914.github.io",
  integrations: [sitemap({ i18n: { defaultLocale: "ja", locales: { ja: "ja-JP", en: "en-US" } } })],
});
```

公式根拠: [Sitemaps overview - Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

### 2. canonical URL の絶対 URL 化

各ページの正規 URL を **絶対 URL** で `<link rel="canonical">` に明示。相対 URL は Google 公式で「使うべきではない」と明記されています。

```astro
const canonicalUrl = new URL(Astro.url.pathname, Astro.site).toString();
<link rel="canonical" href={canonicalUrl} />
```

公式根拠: [Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

### 3. hreflang による多言語対応

ja / en 両言語に同等のコンテンツがある場合、hreflang を全 3 種（自言語 / 他言語 / x-default）出力します。

```html
<link rel="alternate" hreflang="ja-JP" href="https://.../ja/blog/..." />
<link rel="alternate" hreflang="en-US" href="https://.../en/blog/..." />
<link rel="alternate" hreflang="x-default" href="https://.../ja/blog/..." />
```

公式根拠: [Tell Google about localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)

### 4. description を 120-160 字の本気の説明文に

description は検索結果のスニペットに使われる **CTR 直結の要素**。私のサイトでは初期にハブページの description が「ブログ記事一覧」（6 字）になっていて、Google が「クロール済み・インデックス未登録」を返していました。120-160 字の具体的な説明に書き直しただけで CTR が改善。

公式根拠: [Snippet best practices](https://developers.google.com/search/docs/appearance/snippet)

### 5. JSON-LD で構造化データ

WebSite / Article スキーマを `<script type="application/ld+json">` で出力し、Google にコンテンツの構造を機械的に伝えます。

公式根拠: [Introduction to structured data markup](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

### 6. OGP / Twitter Card

SNS シェア時の表示が変わるだけでなく、SNS 経由の被リンクが SEO 評価に間接的に効きます。

### 7. redirects で旧 URL を救済（GitHub Pages でも可能）

過去にインデックス済みの URL 構造を変更した場合、放置すると 404 → SEO 評価が下がります。Astro の `redirects` を使うと **静的 HTML + meta refresh + canonical** の組み合わせで擬似的な 301 として機能します。

```js
redirects: {
  "/profile/": "/HomePage/ja/profile/",  // i18n 移行で発生した 404 を救済
},
```

公式根拠: [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

### 8. Google Search Console の連携 + サイトマップ送信

公開直後にやるべき作業 No.1。GSC に所有権を確認して sitemap を送信すると、Google にサイトの存在を能動的に伝えられます。HTML 検証ファイル方式と meta タグ方式の **二重化** が安全（片方が失敗してももう一方で所有権を維持）。

### 9. ブログ更新を継続する

クロール頻度の改善、インデックス可能 URL の増加、ロングテールクエリの捕捉、すべてに効きます。私は 1 日 1 投稿のペースで運用しています。

## 効果が薄かった/不要だった施策

逆に、よく言われるが効果を実感しなかった or 不要だった施策も書いておきます。

| やらなくてよかったこと | 理由 |
|---|---|
| キーワード密度の調整 | 自然な文章で書けば自然に出てくる |
| メタキーワード（`<meta name="keywords">`）| Google は使っていない（[公式アナウンス](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)）|
| 内部リンクの「アンカーテキスト最適化」 | 自然なリンク文言で十分。逆に作為的だと評価が下がる |

## 順位向上を「再現可能な仕組み」にする 3 つのコツ

施策の単発実装ではなく、**継続して維持する仕組み** が大事です。

1. **ビルド時に SEO ルールを強制**: title 30-60 字 / description 120-160 字を CI でチェック
2. **記事追加時のコミット前チェック**: 自前のチェックリスト（CLAUDE.md）で機械的に確認
3. **月次で GSC データを確認**: 順位低下 / CTR 急落の早期検知

## さいごに

個人ブログの SEO は、**地味な公式対策の積み上げ** で十分上位を狙えます。特別な裏技も、有料ツールも要りません。GitHub Pages + Astro の月額 0 円でも、ここまで動きました。

もし、自分のサイトの description を最後に見直したのがいつだったか思い出せないなら、まずはそこから 1 か所だけ手を入れてみてください。検索からの最初のクリックは、たいていそこで決まっています。

次回の記事では、本記事で紹介した施策が実際にどれだけ数値を動かしたかの **1 か月成果発表** を、Search Console データで定量的に振り返ります。

## 関連記事

- [このホームページに込めた思い — Astro v6 という、まだ日本で知られていないフレームワークと歩む](/HomePage/ja/blog/20260418-astro-v6-homepage/) — Astro v6 でサイトを作った経緯と設計判断
- [「作っては使わない」を繰り返していた私が、運用コスト 0 円でアプリを公開できるようになった話](/HomePage/ja/blog/20260427-zero-cost-and-claude-code/) — 月額 0 円運用の技術選定の詳細
