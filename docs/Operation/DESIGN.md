# 設計書

> このサイトの「**なぜそう作ったか**」を定義する。要件は [REQUIREMENTS.md](REQUIREMENTS.md)、仕様は [SPECIFICATION.md](SPECIFICATION.md) を参照。

## 1. アーキテクチャ

### 1.1 全体構成

```
[ユーザー]
   │ HTTPS
   ▼
[GitHub Pages]   ←  静的 HTML 配信（dist/）
   │                   ▲
   │                   │ deploy
   │            [GitHub Actions]
   │                   ▲
   │                   │ trigger
   │            ┌──────┴──────────────────────┐
   │            │ ① main push                │
   │            │ ② 日次 cron (JST 06/07/08時) │
   │            │ ③ 月次 cron (毎月 1 日)     │
   │            └─────────────────────────────┘
   │
   ├─→ [Cloudflare Web Analytics]  ← beacon.min.js でアクセス計測（Cookie 不要）
   │
   ├─→ [Formspree]                 ← Contact フォーム送信
   │       │
   │       ▼
   │   [Gmail]                     ← 通知メール
   │
   ├─→ [Google Search Console]     ← SEO 管理（meta + HTML 2 方式で所有権確認）
   │
   └─→ [Qiita API]                 ← ビルド時に上位記事を取得
```

### 1.2 技術選定理由

| 技術 | 選定理由 |
|---|---|
| **Astro v6** | JS ゼロデフォルトで最高のパフォーマンス。Content Collections で型安全なコンテンツ管理。i18n 標準サポート |
| **TypeScript** | 型システムで翻訳漏れを強制検出（`Labels = typeof ja`）、リファクタ耐性 |
| **GitHub Pages** | リポジトリと一体管理。無料。`git push` で自動デプロイ |
| **Formspree** | Cookie 不要。honeypot スパム対策。月 50 件無料 |
| **Cloudflare Web Analytics** | Cookie 不要（GDPR 配慮）。完全無料。Core Web Vitals 取得可能 |
| **SVG（CareerGraph）** | 外部ライブラリ依存ゼロ。cubic bezier で分岐・合流を正確に描画。レスポンシブ対応 |
| **Markdown + Content Collections** | コンテンツとプレゼンテーションの分離。型安全な frontmatter |
| **Vitest** | Astro 標準のテストランナー。pure 関数の単体テスト + カレンダーカバレッジ自動検証 |

## 2. データフロー

### 2.1 コンテンツ管理（言語別ディレクトリ）

```
src/content/blog/{ja,en}/*.md       ─┐
src/content/product/{ja,en}/*.md     │
src/content/project/{ja,en}/*.md     ├─→ getLocalizedCollection(coll, lang)
src/content/profile/{ja,en}/*.md     │      ↓
                                     │   {lang}/...md がなければ ja にフォールバック
                                     ↓
                                 ページ生成
```

`src/i18n/content.ts` の `getLocalizedCollection()` が言語フォールバックを担当。

### 2.2 UI ラベル管理（i18n）

```
src/i18n/ja.ts                       ← Single Source of Truth (SSOT)
       │
       ├─ type Labels = typeof ja    ← 型導出
       │
src/i18n/en.ts: const en: Labels    ← 同型を満たさないとビルドエラー
       │
       ▼
src/i18n/index.ts: getLabels(lang)  ← ロケール別に辞書を返す
       │
       ▼
ページから {t.section.key} で参照
```

`src/data/labels.ts` は後方互換シム（実体は `src/i18n/ja.ts` を再エクスポート）。新規コードでは `getLabels(lang)` を使う。

### 2.3 動的データ（月次バッチ更新）

```
[毎月 1 日 0:00 JST]
       ↓
.github/workflows/update-stats.yml
       │
       ├─ Qiita API → 記事数取得
       ├─ キャリア開始日 → エンジニア歴計算
       └─ featuredSlugs → 既存値を保持（手動キュレーション運用）
       ↓
src/data/dynamic-stats.json (auto commit)
       ↓
deploy.yml が自動起動 → 再ビルド・デプロイ
```

### 2.4 ビルドフロー

```
npm run build
   ├─ Content Collections の同期（Markdown → 型安全オブジェクト）
   ├─ astro check（型チェック）
   ├─ Vite ビルド（CSS / JS バンドル）
   ├─ 静的ルート生成（約 98 ページ：ja/en × 各種コンテンツ + リダイレクト + 404）
   ├─ sitemap-index.xml + sitemap-0.xml（@astrojs/sitemap、i18n 対応）
   ├─ rss.xml（src/pages/rss.xml.ts、ja 固定配信）
   └─ public/* を dist/ に無加工コピー
```

### 2.5 デプロイフロー

```
git push (main)
   ↓
GitHub Actions (deploy.yml)
   ├─ checkout
   ├─ Node.js 22 セットアップ
   ├─ npm ci
   ├─ npm run build
   ├─ upload-pages-artifact (dist/)
   └─ deploy-pages
   ↓
https://teppei19980914.github.io/HomePage/ に公開
```

## 3. コンポーネント設計

### 3.1 レイアウト構成

```
BaseLayout.astro
├── <head>
│   ├── meta（description, viewport, generator, google-site-verification）
│   ├── canonical（自言語 URL を絶対 URL で指定）
│   ├── hreflang（ja-JP / en-US / x-default の 3 種）
│   ├── OGP（og:locale + og:locale:alternate を含む）
│   ├── Twitter Card
│   ├── JSON-LD（WebSite or Article、inLanguage 含む）
│   ├── RSS リンク
│   ├── ClientRouter（View Transitions）
│   └── ダークモード初期化スクリプト（描画前に実行）
└── <body>
    ├── スクロールプログレスバー
    ├── Header（言語スイッチャー + ダークモードトグル + ナビ）
    ├── <main><slot /></main>
    ├── Footer
    ├── スクロールトップボタン
    ├── スクロール／reveal スクリプト
    └── Cloudflare Web Analytics（beacon.min.js）
```

### 3.2 コンポーネント一覧

| コンポーネント | 責務 |
|---|---|
| `BaseLayout.astro` | 共通レイアウト。SEO / OGP / Analytics / ダークモード / スクロール |
| `Header.astro` | ナビゲーション + 言語スイッチャー + ダークモードトグル |
| `Footer.astro` | コピーライト |
| `CareerGraph.astro` | SVG の Git ブランチ風キャリアグラフ（locale 対応） |
| `BlogCalendar.astro` | 月別投稿カレンダー（JST 基準で日付計算） |
| `ImageLightbox.astro` | 記事本文 `.content img` をクリック / タップで全画面拡大表示（blog 詳細 / product 詳細で使用）。リンク内画像と `data-no-lightbox` 属性付き画像は対象外。判定ロジックは `src/utils/image-lightbox.ts` に切り出し vitest で検証 |

### 3.3 ページ ↔ コンポーネント依存

```
src/pages/index.astro         → 言語検出リダイレクト（独立 HTML）
src/pages/404.astro           → カスタム 404（独立 HTML、旧 URL 救済）
src/pages/rss.xml.ts          → RSS（レイアウトなし、ja 固定）
src/pages/[lang]/             → BaseLayout を使う多言語ページ
   ├── index.astro            → BaseLayout
   ├── profile.astro          → BaseLayout, CareerGraph
   ├── contact.astro          → BaseLayout
   ├── blog/
   │   ├── index.astro        → BaseLayout, BlogCalendar
   │   ├── all.astro          → BaseLayout
   │   └── [...slug].astro    → BaseLayout, ImageLightbox（ogType="article"）
   ├── product/
   │   ├── index.astro        → BaseLayout
   │   └── [...slug].astro    → BaseLayout, ImageLightbox
   └── project/
       ├── index.astro        → BaseLayout
       ├── all.astro          → BaseLayout
       └── [...slug].astro    → BaseLayout
```

## 4. 多言語対応設計

### 4.1 i18n 型システム（翻訳漏れの強制検出）

```typescript
// src/i18n/ja.ts (SSOT)
export const ja = {
  blog: { title: "ブログ" },
  ...
};

// src/i18n/types.ts
export type Labels = typeof ja;

// src/i18n/en.ts
import type { Labels } from "./types";
export const en: Labels = {
  blog: { title: "Blog" },  // ← ja に新キー追加 → en で型エラー強制発生
  ...
};
```

### 4.2 URL ヘルパー

```typescript
import { localeUrl, rootUrl } from "../i18n/url";

localeUrl("ja", "blog/")   // → "/HomePage/ja/blog/"
localeUrl("en", "")        // → "/HomePage/en/"
rootUrl("rss.xml")         // → "/HomePage/rss.xml"（言語プレフィックスなし）
```

ハードコード（`<a href="/HomePage/blog/">`）は禁止。必ずヘルパー経由で生成する（`base` 変更や言語追加に強くなる）。

### 4.3 セキュリティ設計

- ロケール値は必ず `isLocale()` / `normalizeLocale()` でホワイトリスト検証
- `navigator.language` 等の外部ソースを信頼せず、常に `LOCALES` 列挙に対して判定
- リダイレクトは `window.location.replace()` を使用し履歴汚染を防止
- 翻訳辞書は全て TypeScript オブジェクトリテラル（XSS リスクなし、外部ソース経由の翻訳注入なし）

## 4.x ブログ検索とタグページ設計

### 4.x.1 タグページの静的生成

```
src/utils/blog-tags.ts
   ├── tagToSlug(tag): 日本語はそのまま / 英数字は小文字+ハイフン化
   ├── buildTagMap(posts): tag-slug → 記事リスト（date 降順）
   ├── buildTagDisplayMap(posts): slug → 表示名
   ├── shouldNoindex(count): 1 件以下なら true（thin content 対策）
   └── listTagsSorted(map): 記事数降順 + アルファベット順

src/pages/[lang]/blog/tag/[tag].astro
   └── getStaticPaths でロケール × タグの静的ページを全件生成
```

### 4.x.2 SEO 戦略

- 全タグページが**インデックス可能 URL**として sitemap に含まれる（@astrojs/sitemap が自動取得）
- 1 記事しかないタグページは `<meta name="robots" content="noindex, follow">` で「クロールはする、検索結果には出さない」運用 → [Google Search Central の thin content 対策](https://developers.google.com/search/docs/essentials/spam-policies#thin-content) に準拠
- 各タグページの description は最新記事タイトル + 公開日を含む動的テンプレート（120-160 字、CTR 向上目的）

### 4.x.3 ブログ一覧の検索機能

```
[ユーザー入力]
   ↓
全記事カードを埋め込んだ #blogSearchResults（既定 hidden）を表示モードに切替
data-search-hide が付いた通常ビュー（ピックアップ / 直近 / Qiita / カレンダー）を hidden 化
   ↓
data-search-* 属性（title / description / tags）に対する部分一致でカードごとに display 制御
マッチ判定ロジックは src/utils/blog-search.ts に純関数として切り出し（vitest で網羅）
   ↓
ヒット件数を aria-live で通知（アクセシビリティ配慮）
   ↓
クリア時: 通常ビューを復元し、検索結果セクションを再び hidden 化
```

**設計判断**:
- 検索インデックスを別 JSON で配信せず、HTML の `data-*` 属性に埋め込み（追加 fetch なし、キャッシュ管理不要）
- index ページの表示制限（直近 5 件＋ピックアップ）に左右されず**全記事**を検索対象にするため、独立した `#blogSearchResults` セクションに全記事カードを埋め込む。HTML は約 12KB（gzip 後）増えるが、検索 UX を「期待通り」にする費用対効果は十分
- 検索範囲は **タイトル + description + タグ** のみ（本文全文は除外）。スモールスタート方針
- 0 件ヒット時は通常ビューも検索結果も非表示にし、空メッセージのみを示す（古いカードや見出しが残らないクリーンな UX）
- 将来本文全文検索が必要になった場合は、`src/pages/blog-search-index.json.ts` を別途生成して遅延ロード方式に切り替え可能（既存 JS の構造はそのまま流用可能）

## 5. SEO 設計

### 5.1 メタタグ構成（BaseLayout.astro）

| メタ要素 | 用途 |
|---|---|
| `<meta name="description">` | 各ページの description（120-160 字目標） |
| `<link rel="canonical">` | 各言語ページの自言語 URL を絶対 URL で指定 |
| `<link rel="alternate" hreflang>` | ja-JP / en-US / x-default の 3 種を絶対 URL で出力 |
| `<meta property="og:*">` | OGP（locale + locale:alternate を含む） |
| `<meta name="twitter:*">` | Twitter Card（summary_large_image） |
| JSON-LD | WebSite（通常）/ Article（ブログ詳細）+ inLanguage |
| `<link rel="alternate" type="application/rss+xml">` | RSS フィード |
| `<meta name="google-site-verification">` | GSC 所有権確認（meta 方式） |

### 5.2 GSC 所有権確認の二重化

```
方式 1: meta タグ
  → BaseLayout.astro:101 の <meta name="google-site-verification" content="..." />

方式 2: HTML ファイル
  → public/google42479a91fae835e0.html
  → ビルド時に dist/ にコピー、URL: /HomePage/google42479a91fae835e0.html
```

両方式を併存させることで、片方が失敗してももう一方で所有権を維持できる。

### 5.3 ブログ記事の SEO 強化

ブログ詳細ページ（`blog/[...slug].astro`）では BaseLayout に追加 props を渡す:

```astro
<BaseLayout
  ogType="article"
  publishedDate={post.data.date.toISOString()}
  tags={post.data.tags}
/>
```

これにより:
- `og:type` が `article` に設定
- `article:published_time` メタタグ追加
- `keywords` メタタグにタグを設定
- JSON-LD が Article スキーマに切り替わる

### 5.4 レガシー URL リダイレクト

`astro.config.mjs` の `redirects` で 27 件以上の 301 相当リダイレクトを定義。

| リダイレクト群 | 件数 | 目的 |
|---|---|---|
| ロケール無し旧 URL → ja | 5 | i18n 移行（`/profile/` → `/ja/profile/` 等） |
| 旧ブログスラッグ → 日付プレフィックス付きスラッグ | 22 | ファイル名規則変更（`/blog/hello-world/` → `/blog/20260406-hello-world/`） |

## 6. セキュリティ設計

### 6.1 フォーム保護（Contact）

```
ユーザー入力
  ├── maxlength（クライアント側制限）
  │   ├── name: 100
  │   ├── email: 254
  │   └── message: 5000
  ├── required（必須チェック）
  ├── type="email"（形式チェック）
  ├── honeypot（_gotcha フィールド）
  │   ├── display:none で非表示
  │   └── ボットが入力 → Formspree がスパム判定
  └── Formspree サーバー側バリデーション
```

### 6.2 XSS 防止

```
Astro テンプレート: {variable} → 自動 HTML エスケープ

set:html の使用箇所（厳格管理）:
  ├── JSON-LD（JSON.stringify で安全）
  └── contact.astro の formNote（labels.ts の固定文字列のみ）
```

### 6.3 外部リンク安全化

`rehype-external-links` プラグインで Markdown 内の外部リンクに `target="_blank" rel="noopener noreferrer"` を自動付与。`window.opener` 漏洩・リファラ送信を抑止。

## 7. ダークモード設計

### 7.1 初期化フロー

```
1. <head> 内スクリプト（描画前に実行、フラッシュ防止）
   ├── localStorage の "theme" を確認
   ├── OS の prefers-color-scheme を確認
   └── <html> に "dark" クラスを付与/除去

2. astro:before-swap イベント（ページ遷移時）
   └── 遷移先の <html> にも "dark" クラスを付与
```

### 7.2 CSS 変数切替

```css
:root { --color-bg: #fafafa; ... }       /* ライト */
:root.dark { --color-bg: #0f172a; ... }  /* ダーク */
```

全コンポーネントが CSS 変数を参照するため、クラス切替だけで全体が切り替わる。

### 7.3 カラールール

- `--color-primary`（青）= リンク・インタラクティブ要素のみ
- `--color-accent`（紫）= 装飾・強調テキスト
- 強調表現に青文字を使わない（リンクと混同するため）

## 8. テスト設計

### 8.1 テスト構成

```
src/utils/
├── format.ts / format.test.ts                  ← 日付フォーマット
├── reading-time.ts / reading-time.test.ts      ← 読了時間計算（ja 500 字/分 + en 200 語/分）
├── share.ts / share.test.ts                    ← シェア URL 生成
└── blog-calendar.ts / blog-calendar.test.ts    ← カレンダーカバレッジ + 同日複数投稿禁止ルール強制
```

合計 33 テスト、すべて pure 関数の単体テスト。

### 8.2 ブログカレンダーの強制検証

`blog-calendar.test.ts` の `assertAllPostsCovered` が:
- 全 ja 記事が表示月リストに含まれること
- 全 ja 記事がカレンダーセルに正しく紐づくこと
- 1 日に 1 記事のルールを満たすこと（CLAUDE.md ルール）

を検証。記事追加・更新時に必ず実行（`npm test -- blog-calendar`）。

## 9. Claude Code との分業設計

### 9.1 役割分離

```
[本人]                              [Claude Code]
  ├─ 実装修正                          ├─ 公開前 SEO レビュー（毎回必須）
  ├─ 記事の作成・投稿                   └─ SEO 分析・改善提案（イベント駆動）
  ├─ コミット & プッシュ
  └─ 採否の最終判断
```

### 9.2 Claude Code への依頼形式

- **記事 SEO レビュー**: ドラフトを提示して依頼。title 30-60、description 120-160、内部リンク、検索意図マッチを公式情報根拠で指摘
- **SEO 分析**: GSC ダッシュボード PDF を `docs/AccessLog/` に追加した上で、気になる動きを起点に依頼
- **公式情報根拠**: 提案には Google Search Central / Web.dev / Schema.org 等の URL を必須で添付

詳細は [CLAUDE.md](../../CLAUDE.md) 参照。
