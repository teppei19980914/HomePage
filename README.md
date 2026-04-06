# HomePage - 運用ドキュメント

須山 哲平の個人ホームページ。Astro + GitHub Pages で構築。

## ドキュメント一覧

| ドキュメント | 内容 |
|---|---|
| [README.md](README.md) | 運用ドキュメント（本ファイル） |
| [CLAUDE.md](CLAUDE.md) | Claude Code 運用ガイド |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | 要件定義書（機能要件・非機能要件・制約条件） |
| [docs/SPECIFICATION.md](docs/SPECIFICATION.md) | 仕様書（ページ仕様・UI仕様・スキーマ定義） |
| [docs/DESIGN.md](docs/DESIGN.md) | 設計書（アーキテクチャ・データフロー・コンポーネント設計・セキュリティ設計） |
| [docs/OPERATIONS.md](docs/OPERATIONS.md) | 運用手順書（日常運用・デプロイ・メンテナンス・障害対応・SEO運用） |
| [docs/INFRASTRUCTURE.md](docs/INFRASTRUCTURE.md) | インフラ構成書（全体構成・サービス詳細・コスト・セキュリティ・監視） |

## 目次

1. [技術スタック](#技術スタック)
2. [ディレクトリ構成](#ディレクトリ構成)
3. [ローカル開発](#ローカル開発)
4. [コンテンツ管理](#コンテンツ管理)
5. [テキスト管理ルール](#テキスト管理ルール)
6. [デプロイ](#デプロイ)
7. [外部サービス](#外部サービス)
8. [SEO](#seo)
9. [セキュリティ](#セキュリティ)
10. [パフォーマンス](#パフォーマンス)
11. [コスト管理](#コスト管理)
12. [定期メンテナンス](#定期メンテナンス)
13. [トラブルシューティング](#トラブルシューティング)

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Astro v6 / TypeScript |
| ホスティング | GitHub Pages（Public リポジトリ） |
| CI/CD | GitHub Actions（`.github/workflows/deploy.yml`） |
| お問い合わせ | Formspree（Cookie 不要） |
| アクセス解析 | Cloudflare Web Analytics（Cookie 不要） |
| SEO | sitemap / robots.txt / OGP / JSON-LD / RSS / Google Search Console |

---

## ディレクトリ構成

```
HomePage/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions デプロイ設定
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── og-image.svg            # OGP 画像
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── CareerGraph.astro   # Git ブランチ風キャリアグラフ（SVG）
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── content/                # Markdown コンテンツ（Content Collections）
│   │   ├── blog/               # ブログ記事
│   │   ├── product/            # プロダクト紹介
│   │   └── project/            # プロジェクト実績
│   ├── data/
│   │   └── labels.ts           # 全 UI テキストの一元管理
│   ├── layouts/
│   │   └── BaseLayout.astro    # 共通レイアウト（SEO / OGP / Analytics 含む）
│   ├── pages/                  # ページ
│   │   ├── index.astro         # Home
│   │   ├── profile.astro       # Profile
│   │   ├── about.astro         # About（スキル・資格・キャリア）
│   │   ├── contact.astro       # Contact（Formspree フォーム）
│   │   ├── blog/               # Blog 一覧 + 詳細
│   │   ├── product/            # Product 一覧 + 詳細
│   │   ├── project/            # Project 一覧 + 詳細
│   │   └── rss.xml.ts          # RSS フィード生成
│   ├── styles/
│   │   └── global.css          # グローバルスタイル
│   ├── utils/
│   │   ├── format.ts
│   │   └── format.test.ts
│   └── content.config.ts       # Content Collections スキーマ定義
├── astro.config.mjs
├── CLAUDE.md                   # Claude Code 運用ガイド
├── dev.bat                     # ローカル開発用バッチ
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## ローカル開発

### 前提条件

- Node.js 22 以上
- npm

### 起動方法

```bash
# 方法1: バッチファイル（ブラウザも自動起動）
dev.bat をダブルクリック

# 方法2: コマンド
npm run dev
# → http://localhost:4321/HomePage/ でアクセス
```

### 主要コマンド

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run preview` | ビルド結果プレビュー |
| `npm run check` | Astro 型チェック |
| `npm test` | テスト実行 |
| `npm run format` | Prettier フォーマット |

### 注意事項

- Content Collections の変更（新しいコレクション追加、`content.config.ts` の変更）は **dev サーバーの再起動が必要**
- ダークモードの切替テストは **Ctrl + Shift + R**（ハードリロード）で確認

---

## コンテンツ管理

### ブログ記事の追加

`src/content/blog/` に `.md` ファイルを追加:

```markdown
---
title: "記事タイトル"
description: "記事の説明文"
date: 2026-04-05
tags: ["技術", "Flutter"]
draft: false
---

## 本文

ここに Markdown で記事を書く...
```

| フィールド | 必須 | 説明 |
|---|---|---|
| `title` | はい | 記事タイトル |
| `description` | はい | 一覧に表示される説明文 |
| `date` | はい | 投稿日（YYYY-MM-DD） |
| `tags` | いいえ | タグの配列 |
| `draft` | いいえ | `true` で非表示 |

### プロダクトの追加

`src/content/product/` に `.md` ファイルを追加:

```markdown
---
title: "アプリ名"
description: "アプリの説明"
tagline: "キャッチフレーズ"
date: 2026-04-05
tags: ["React", "TypeScript"]
url: "https://example.com"
repo: "https://github.com/..."
status: active
order: 3
---

本文...
```

| フィールド | 必須 | 説明 |
|---|---|---|
| `status` | いいえ | `active` / `beta` / `archived` |
| `order` | いいえ | 表示順（数値が大きいほど先） |
| `url` | いいえ | 体験用 URL |
| `repo` | いいえ | GitHub リポジトリ URL（Private の場合は省略） |

### プロジェクトの追加

`src/content/project/` に `.md` ファイルを追加:

```markdown
---
title: "プロジェクト名"
description: "概要"
period: "2025年5月 - 現在"
role: "PL / TL"
company: "会社名"
companyUrl: "https://..."
contractType: employee
tags: ["React", "TypeScript"]
order: 50
---

本文...
```

| フィールド | 必須 | 説明 |
|---|---|---|
| `contractType` | はい | `employee`（正社員）/ `contract`（業務委託） |
| `order` | いいえ | 表示順（数値が大きいほど新しい、先に表示） |

---

## テキスト管理ルール

**UI テキストのハードコーディングは禁止。**

すべてのテキスト（ラベル、説明文、キャッチコピー等）は `src/data/labels.ts` に定義し、各ページから import して使用する。

```typescript
// labels.ts から import
import { about } from "../data/labels";

// テンプレートで使用
<h1>{about.title}</h1>
```

### 対象

- ページタイトル・説明文
- セクション見出し
- ボタンラベル
- エラーメッセージ
- aria-label
- フォームの placeholder

### 対象外

- HTML タグの属性値（class, style 等）
- CSS の値
- Markdown コンテンツ（`src/content/`）
- 技術名（C#, Python 等のスキル名）

---

## デプロイ

### 自動デプロイ

`main` ブランチに push すると GitHub Actions が自動実行:

1. `npm ci` — 依存関係インストール
2. `npm run build` — ビルド
3. GitHub Pages にデプロイ

### 公開 URL

```
https://teppei19980914.github.io/HomePage/
```

### 手動デプロイが必要なケース

- GitHub Pages の Settings > Pages > Source が「GitHub Actions」であることを確認
- リポジトリが Public であることを確認

---

## 外部サービス

### GitHub Pages

- **用途**: サイトホスティング
- **URL**: https://github.com/teppei19980914/HomePage
- **管理**: リポジトリの Settings > Pages

### Formspree

- **用途**: お問い合わせフォーム送信先
- **Endpoint**: `https://formspree.io/f/xykbnzvv`
- **管理画面**: https://formspree.io/ （tepei09141998@gmail.com）
- **無料枠**: 月50件
- **推奨設定**: ダッシュボードで「Restrict to domain」を `teppei19980914.github.io` に設定

### Cloudflare Web Analytics

- **用途**: アクセス解析（Cookie 不要）
- **Token**: `d882ef0019134c4eb5d6473c4396f90c`
- **管理画面**: https://dash.cloudflare.com/ → Analytics & logs → Web analytics
- **確認可能な項目**: PV数、人気ページ、リファラー、国・デバイス別、Core Web Vitals

### Google Search Console

- **用途**: SEO（インデックス管理・検索分析）
- **プロパティ**: `https://teppei19980914.github.io/HomePage/`
- **管理画面**: https://search.google.com/search-console
- **確認メタタグ**: `f_jGq-vRpKheGaLTbGylmxYO7tMV8xx9R4lUvNQMo3o`

---

## SEO

### 実装済み項目

| 項目 | ファイル |
|---|---|
| sitemap.xml | ビルド時に自動生成（`@astrojs/sitemap`） |
| robots.txt | `public/robots.txt` |
| OGP メタタグ | `BaseLayout.astro`（全ページ） |
| Twitter Card | `BaseLayout.astro`（全ページ） |
| canonical URL | `BaseLayout.astro`（全ページ） |
| JSON-LD 構造化データ | `BaseLayout.astro`（WebSite / Article スキーマ） |
| RSS フィード | `src/pages/rss.xml.ts` |
| OG 画像 | `public/og-image.svg` |
| Google 所有権確認 | `BaseLayout.astro`（meta タグ） |

### SEO 効果を高めるためのアクション

1. **ブログ記事を定期的に投稿する**（最低月2〜3件）
2. **Qiita の記事からホームページへリンクを貼る**（被リンク効果大）
3. **専門性の高いキーワードで記事を書く**（例: 「Pleasanter カスタマイズ」「Power Automate 自動化」）
4. **Search Console で定期的にインデックス状況を確認する**

---

## セキュリティ

### 実装済み対策

| 対策 | 内容 |
|---|---|
| XSS 防止 | Astro テンプレートの自動エスケープ |
| スパム防止 | Formspree honeypot フィールド（`_gotcha`） |
| 入力長制限 | name:100, email:254, message:5000 |
| 外部リンク | 全箇所 `rel="noopener noreferrer"` 付与 |
| 機密情報 | APIキー等のハードコードなし |

### 推奨追加対策

- Formspree ダッシュボードで「Restrict to domain」を有効化
- 定期的に `npm audit` を実行し、脆弱性を確認

---

## パフォーマンス

### 設計方針

- **ゼロ JS デフォルト**: Astro の静的生成を最大活用。`client:*` ディレクティブ未使用
- **クライアント JS 最小限**: テーマ切替、スクロール効果、フォーム送信、Cloudflare Analytics のみ（~15KB）
- **CSS 共通化**: `global.css` に共通スタイルを集約、各ページの重複を排除

### ビルドサイズ

- HTML 16 ページ
- CSS ~12KB
- JS ~15KB（ClientRouter）
- 合計 ~289KB

---

## コスト管理

**現在のコスト: 0円/月**

| サービス | 無料枠 | コスト発生条件 |
|---|---|---|
| GitHub Pages | 帯域 月100GB | 月20万PV程度で到達（課金なし、一時停止） |
| GitHub Actions | Public リポジトリ無制限 | なし |
| Formspree | **月50件** | 超過時は送信ブロック（課金なし） |
| Cloudflare Web Analytics | 完全無料 | なし |
| Google Search Console | 完全無料 | なし |
| Astro | OSS 無料 | なし |

**最大リスク**: Formspree の月50件制限。スパム対策（honeypot）で消費を抑制。

---

## 定期メンテナンス

### 月次

- [ ] Cloudflare Web Analytics でアクセス状況を確認
- [ ] Formspree ダッシュボードで送信数を確認（月50件上限）
- [ ] Google Search Console でインデックス状況・検索クエリを確認

### 四半期

- [ ] `npm audit` で脆弱性を確認
- [ ] `npm update` で依存パッケージを更新
- [ ] About ページのスキル・資格・経歴が最新か確認
- [ ] Profile ページの情報が最新か確認

### 年次

- [ ] Copyright の年号を確認（ビルド時に自動更新されるため通常は不要）
- [ ] 外部リンク（会社 URL 等）のリンク切れを確認

---

## トラブルシューティング

### ビルドが失敗する

```bash
rm -rf .astro dist node_modules
npm install
npm run build
```

### dev サーバーでコンテンツが表示されない

Content Collections の変更後は dev サーバーの再起動が必要:
1. `q + Enter` で停止
2. `dev.bat` で再起動

### ダークモードが切り替え時にフラッシュする

`BaseLayout.astro` の `<head>` 内にダークモード初期化スクリプトが配置されていることを確認。`astro:before-swap` イベントで遷移先にもダークモードを適用。

### リンクが 404 になる

`astro.config.mjs` の `base` が `/HomePage/` （末尾スラッシュ付き）であることを確認。

### Formspree の送信がブロックされる

月50件の上限に達した可能性。Formspree ダッシュボードで確認し、翌月まで待つか有料プラン（月$8〜）に変更。

### Google Search Console でサイトマップが「取得できませんでした」

初回送信時は数時間〜1日で「成功」に変わる。翌日も同じ場合は、URL が正しいか確認: `https://teppei19980914.github.io/HomePage/sitemap-index.xml`
