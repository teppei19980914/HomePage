# 設計書

## 1. アーキテクチャ

### 1.1 全体構成

```
[ブラウザ] → [GitHub Pages (静的HTML)] ← [GitHub Actions (ビルド)]
                    ↓                           ↑
              [Cloudflare Analytics]      [git push (main)]
                    ↓
              [Formspree (フォーム送信)]
                    ↓
              [Gmail (通知)]
```

### 1.2 技術選定理由

| 技術 | 選定理由 |
|---|---|
| Astro | JS ゼロデフォルトで最高のパフォーマンス。Content Collections で型安全なコンテンツ管理 |
| GitHub Pages | リポジトリと一体管理。無料。git push で自動デプロイ |
| Formspree | Cookie 不要。honeypot スパム対策。月50件無料 |
| Cloudflare Web Analytics | Cookie 不要（バナー不要）。完全無料。PV・人気ページ取得可能 |
| SVG（CareerGraph） | ライブラリ依存なし。cubic bezier で分岐・合流を正確に描画。レスポンシブ対応 |

## 2. データフロー

### 2.1 コンテンツ管理

```
src/content/blog/*.md       → Content Collections → getCollection("blog")     → ページ生成
src/content/product/*.md    → Content Collections → getCollection("product")  → ページ生成
src/content/project/*.md    → Content Collections → getCollection("project")  → ページ生成
src/content/profile/*.md    → Content Collections → getEntry("profile", ...) → Profile ページのセクションに挿入
src/data/labels.ts          → import              → 全ページで参照（UI ラベル専用）
```

**コンテンツ配置の原則**: 長文の narrative コンテンツ（ブログ記事、プロダクト紹介、プロジェクト紹介、Profile の Philosophy/Dream/Motto）は `src/content/` に Markdown で配置する。UI ラベル・ボタン文言・ページタイトル等の短文は `src/data/labels.ts` に集約する。

### 2.2 ビルドフロー

```
npm run build
  ├── Content Collections の同期（Markdown → 型安全オブジェクト）
  ├── 型チェック
  ├── Vite ビルド（CSS/JS バンドル）
  ├── 静的ルート生成（16ページ + RSS + sitemap）
  └── dist/ に出力
```

### 2.3 デプロイフロー

```
git push (main)
  → GitHub Actions トリガー
    ├── checkout
    ├── Node.js 22 セットアップ
    ├── npm ci
    ├── npm run build
    ├── upload-pages-artifact (dist/)
    └── deploy-pages
  → https://teppei19980914.github.io/HomePage/ に公開
```

## 3. コンポーネント設計

### 3.1 レイアウト

```
BaseLayout.astro
  ├── <head>
  │   ├── メタタグ（description, viewport, generator）
  │   ├── Google Search Console 確認タグ
  │   ├── canonical URL
  │   ├── OGP メタタグ
  │   ├── Twitter Card メタタグ
  │   ├── JSON-LD 構造化データ
  │   ├── RSS リンク
  │   ├── favicon
  │   ├── ClientRouter（ページ遷移）
  │   └── ダークモード初期化スクリプト
  ├── <body>
  │   ├── スクロールプログレスバー
  │   ├── Header コンポーネント
  │   ├── <main> → slot（ページ固有コンテンツ）
  │   ├── Footer コンポーネント
  │   ├── スクロールトップボタン
  │   ├── スクロールエフェクトスクリプト
  │   └── Cloudflare Web Analytics スクリプト
```

### 3.2 コンポーネント一覧

| コンポーネント | 責務 |
|---|---|
| `BaseLayout.astro` | 共通レイアウト。SEO / OGP / Analytics / ダークモード / スクロール |
| `Header.astro` | ナビゲーション（横スクロール対応）+ ダークモードトグル |
| `Footer.astro` | コピーライト表示 |
| `CareerGraph.astro` | SVG の Git ブランチ風キャリアグラフ |

### 3.3 ページ ← コンポーネント 依存関係

```
index.astro         → BaseLayout
profile.astro       → BaseLayout
about.astro         → BaseLayout, CareerGraph
contact.astro       → BaseLayout
blog/index.astro    → BaseLayout
blog/[...slug].astro → BaseLayout
product/index.astro → BaseLayout
product/[...slug].astro → BaseLayout
project/index.astro → BaseLayout
project/[...slug].astro → BaseLayout
rss.xml.ts          → （レイアウトなし）
```

## 4. SEO 設計

### 4.1 メタタグ構成（BaseLayout.astro）

```html
<!-- 基本 -->
<meta name="description" content="{description}" />
<link rel="canonical" href="{canonicalUrl}" />

<!-- OGP -->
<meta property="og:title" content="{siteTitle}" />
<meta property="og:description" content="{description}" />
<meta property="og:type" content="website|article" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:image" content="{ogImageUrl}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />

<!-- JSON-LD -->
<script type="application/ld+json">
  WebSite スキーマ（通常ページ）
  Article スキーマ（ブログ記事）
</script>

<!-- RSS -->
<link rel="alternate" type="application/rss+xml" href="/HomePage/rss.xml" />
```

### 4.2 ブログ記事の SEO 強化

ブログ詳細ページ（`blog/[...slug].astro`）では追加の Props を渡す:

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

## 5. セキュリティ設計

### 5.1 フォーム保護

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

### 5.2 XSS 防止

```
Astro テンプレート: {variable} → 自動 HTML エスケープ
set:html の使用箇所:
  ├── JSON-LD（JSON.stringify で安全）
  └── contact.astro formNote（labels.ts の固定文字列のみ）
```

## 6. ダークモード設計

### 6.1 初期化フロー

```
1. <head> 内スクリプト（描画前に実行）
   ├── localStorage の "theme" を確認
   ├── OS の prefers-color-scheme を確認
   └── <html> に "dark" クラスを付与/除去

2. astro:before-swap イベント（ページ遷移時）
   └── 遷移先の <html> にも "dark" クラスを付与
```

### 6.2 CSS 変数切替

```css
:root { --color-bg: #fafafa; ... }          /* ライト */
:root.dark { --color-bg: #0f172a; ... }     /* ダーク */
```

全コンポーネントが CSS 変数を参照するため、クラス切替だけで全体が切り替わる。

## 7. テキスト管理設計

### 7.1 labels.ts の構造

```typescript
export const site = { ... }        // サイト共通
export const nav = { ... }         // ナビゲーション
export const home = { ... }        // Home ページ
export const profile = { ... }     // Profile ページ
export const about = { ... }       // About ページ
export const careerGraph = { ... } // Career グラフ
export const blog = { ... }        // Blog ページ
export const product = { ... }     // Product ページ
export const project = { ... }     // Project ページ
export const contact = { ... }     // Contact ページ
export const common = { ... }      // 共通（戻るリンク等）
export const footer = { ... }      // Footer
```

### 7.2 使用パターン

```astro
---
import { about } from "../data/labels";
---
<h1>{about.title}</h1>
<p>{about.description}</p>
{about.certifications.items.map((cert) => (
  <li>{cert.date} {cert.name}</li>
))}
```
