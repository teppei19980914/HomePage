# HomePage

> 須山 哲平の個人ホームページ（[公開 URL](https://teppei19980914.github.io/HomePage/)）。
> Astro v6 + GitHub Pages で構築、月額 0 円で運用しています。

## 1. はじめに読むもの

| 目的 | 読むファイル |
|---|---|
| **「とりあえず動かしたい」** | この README の [§3 ローカル開発](#3-ローカル開発) |
| **「ブログ記事を投稿したい」** | [§4.1 ブログ記事の投稿](#41-ブログ記事の投稿) |
| **「Claude Code に何を依頼できるか知りたい」** | [CLAUDE.md](CLAUDE.md) の「Claude Code 運用スコープ」 |
| **「サイト全体の構成を把握したい」** | [docs/Operation/SPECIFICATION.md](docs/Operation/SPECIFICATION.md) |
| **「障害が起きた」** | [docs/Operation/OPERATIONS.md](docs/Operation/OPERATIONS.md) §4 障害対応 |

## 2. ドキュメント一覧

| ドキュメント | 役割 |
|---|---|
| [README.md](README.md) | **全体の入口**（本ファイル）。日常的な作業はここから |
| [CLAUDE.md](CLAUDE.md) | Claude Code との作業分担・運用スコープ・依頼方法 |
| [docs/Operation/REQUIREMENTS.md](docs/Operation/REQUIREMENTS.md) | 要件定義（機能要件・非機能要件・制約） |
| [docs/Operation/SPECIFICATION.md](docs/Operation/SPECIFICATION.md) | 仕様（ページ仕様・UI 仕様・スキーマ） |
| [docs/Operation/DESIGN.md](docs/Operation/DESIGN.md) | 設計（アーキテクチャ・データフロー・コンポーネント） |
| [docs/Operation/OPERATIONS.md](docs/Operation/OPERATIONS.md) | 運用手順（日常運用・デプロイ・メンテナンス・SEO 運用） |
| [docs/Operation/INFRASTRUCTURE.md](docs/Operation/INFRASTRUCTURE.md) | インフラ構成（外部サービス・コスト・セキュリティ） |
| [docs/Operation/BACKLOG.md](docs/Operation/BACKLOG.md) | 予定作業（着手時期未定の TODO 蓄積。完了したら他 docs に反映 or 削除） |
| [docs/AccessLog/](docs/AccessLog/) | 月次 SEO ダッシュボード（GSC データ転記） |
| [docs/Operation/I18N_MIGRATION_CHECKLIST.md](docs/Operation/I18N_MIGRATION_CHECKLIST.md) | 多言語対応デプロイ後チェックリスト |

## 3. ローカル開発

### 3.1 前提条件

- Node.js **22 以上**
- npm

### 3.2 起動

```bash
# 方法 A: バッチで起動（ブラウザも自動）
dev.bat                  # ダブルクリックで OK

# 方法 B: コマンドで起動
npm install              # 初回のみ
npm run dev              # → http://localhost:4321/HomePage/
```

### 3.3 主要コマンド

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（`dist/` 配下に出力、約 98 ページ） |
| `npm run preview` | ビルド結果プレビュー |
| `npm run check` | Astro 型チェック（`@astrojs/check`） |
| `npm test` | Vitest 実行（33 テスト） |
| `npm run format` | Prettier フォーマット |

### 3.4 注意事項

- Content Collections（`src/content/*` または `content.config.ts`）の変更は **dev サーバーの再起動が必要**
- ダークモード切替テストは **Ctrl + Shift + R**（ハードリロード）
- 未来日付の記事（`date` が今日より後）は本番ビルドで自動的に非公開（`isPublished` フィルタ）

---

## 4. コンテンツ管理

> **多言語対応**: 全コンテンツは ja/en 両方を作成する。ja を先に書いてから en に翻訳する流れ。

### 4.1 ブログ記事の投稿

#### Step 1. ファイル作成

`src/content/blog/{ja,en}/YYYYMMDD-slug.md` を作成（**ja → en の順**）。
ファイル名規則: `YYYYMMDD-英小文字スラッグ.md`、日付は既存最新の翌日（一日一投稿）。

#### Step 2. frontmatter 記入

```markdown
---
title: "記事タイトル（30〜60 字）"
description: "記事の説明文（120〜160 字、主要キーワードを含める）"
date: 2026-05-15
tags: ["AI駆動開発", "個人開発"]   # 具体的に
draft: false                        # 任意（true で非表示）
featured: false                     # 任意（Home ピックアップ枠の手動指定用）
---
```

#### Step 3. 本文を Markdown で執筆

- 内部リンクは `/HomePage/{ja,en}/blog/{slug}/` の形で書く
- 裸 URL は使わず、説明的なアンカーテキストを使用
- 関連記事リンクを末尾に最低 3〜4 件付ける（相互リンクで SEO 強化）

#### Step 4. **Claude Code に SEO レビューを依頼（公開前必須）**

Claude Code に以下を依頼:
- title 30-60 字 / description 120-160 字 の検証
- 内部リンクの有効性
- 検索意図とのマッチ
- 公式情報（Google Search Central 等）に基づく改善提案

#### Step 5. ローカル確認 → デプロイ

```bash
npm run dev                                   # ローカル動作確認
npm test -- blog-calendar                    # カレンダー反映を自動検証
git add . && git commit -m "..." && git push  # main 自動デプロイ
```

---

### 4.2 プロダクトの追加

`src/content/product/{ja,en}/{slug}.md` に作成。

```markdown
---
title: "プロダクト名"
description: "120〜160 字"
tagline: "キャッチフレーズ"
date: 2026-05-15
tags: ["Flutter", "Dart"]
url: "https://..."          # 任意
repo: "https://github.com/..."  # 任意
status: active              # active | beta | archived | suspended
order: 1                    # 表示順（昇順）
---
```

`status` の意味:
- `active`: 公開中、リンク有効
- `beta`: 開発中（一覧で半透明表示）
- `archived`: アーカイブ
- `suspended`: 新規受付停止中（ページは残るがアプリ導線は非活性）

### 4.3 プロジェクトの追加

`src/content/project/{ja,en}/{slug}.md` に作成。

```markdown
---
title: "プロジェクト名"
description: "120〜160 字"
period: "2025年5月 - 現在"
role: "PL / TL"
company: "会社名"
companyUrl: "https://..."   # 任意
contractType: employee      # employee | contract
tags: ["Power Platform"]
order: 50                   # 数値が大きいほど新しく、先頭に表示
---
```

### 4.4 プロフィールセクションの編集

`src/content/profile/{ja,en}/{philosophy,motto,dream,goal}.md` を編集。

```markdown
---
title: "Philosophy"
quote: "知った気にならない。いつまでも学び続ける。"
order: 1
group: mindset              # mindset | direction
---

本文（Markdown）...
```

### 4.5 UI テキストの変更

> **ハードコーディング禁止**: ページ・コンポーネントに直接テキストを書かない。

UI ラベル（ボタン、見出し、placeholder 等）はすべて `src/i18n/ja.ts` / `src/i18n/en.ts` に集約。

```typescript
// src/i18n/ja.ts に追加
home: {
  newSection: {
    title: "新セクション",
  },
},

// src/i18n/en.ts に同じ構造で追加（型システムで強制される）
home: {
  newSection: {
    title: "New Section",
  },
},
```

ページ側での参照:
```typescript
const t = getLabels(lang);
<h1>{t.home.newSection.title}</h1>
```

`src/data/labels.ts` は後方互換シム（実体は `src/i18n/ja.ts`）。新規コードでは `getLabels(lang)` を使う。

### 4.6 内部リンクの生成

```typescript
import { localeUrl } from "../../i18n/url";

// 推奨
<a href={localeUrl(lang, "blog/")}>ブログ</a>
// → /HomePage/{lang}/blog/

// 禁止（言語プレフィックスを含まない）
<a href="/HomePage/blog/">ブログ</a>
```

---

## 5. デプロイ

### 5.1 自動デプロイ

`main` ブランチに push すると GitHub Actions が自動実行。

```
git push (main) → GitHub Actions → npm ci → npm run build → GitHub Pages
```

Actions タブの結果を確認（緑チェックで成功）。

### 5.2 公開 URL 構造

| URL | 役割 |
|---|---|
| `https://teppei19980914.github.io/HomePage/` | 言語検出リダイレクト（JS で `/ja/` または `/en/` へ） |
| `https://teppei19980914.github.io/HomePage/ja/...` | 日本語版 |
| `https://teppei19980914.github.io/HomePage/en/...` | 英語版 |

旧 URL（`/HomePage/profile/` など、ロケール無し）は `astro.config.mjs` の redirects で `/HomePage/ja/...` に 301 相当のリダイレクト。

### 5.3 デプロイ後の SEO 対応

ブログ記事や新規ページを公開した後、Google Search Console で **URL 検査 → インデックス登録をリクエスト**。詳細は [OPERATIONS.md §2.3](docs/Operation/OPERATIONS.md#23-リリース後の-seo-対応)。

---

## 6. Claude Code との作業分担

[CLAUDE.md](CLAUDE.md) に詳細記載。要約:

| 作業 | 担当 |
|---|---|
| 実装修正・コード変更 | **本人** |
| 記事の作成・投稿 | **本人（原則）** |
| コミット & プッシュ | **本人** |
| **記事の設計 → 執筆代行** | **Claude Code（例外: 本人から明示的に依頼があった時のみ）** |
| **記事公開前の SEO レビュー** | **Claude Code（毎回必須）** |
| **SEO データ分析・改善提案** | **Claude Code（イベント駆動: 必要な時に依頼）** |

Claude Code への依頼例:
- 「`docs/AccessLog/202605xx_*.pdf` を分析して、6 月の SEO 対策を提案して」
- 「この記事ドラフトを SEO レビューして」
- 「`/ja/blog/` の CTR が下がってきた。原因と対策を公式情報ベースで提案して」

---

## 7. 外部サービスとコスト

### 7.1 サービス一覧（すべて 0 円運用）

| サービス | 用途 | 無料枠 |
|---|---|---|
| [GitHub Pages](https://pages.github.com/) | ホスティング | 月 100GB 帯域 |
| [GitHub Actions](https://github.com/features/actions) | CI/CD | Public リポジトリ無制限 |
| [Formspree](https://formspree.io/) | お問い合わせフォーム | 月 50 件 |
| [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) | アクセス解析（Cookie 不要） | 完全無料 |
| [Google Search Console](https://search.google.com/search-console) | SEO 管理 | 完全無料 |
| [Qiita API](https://qiita.com/api/v2/docs) | Tech Blog セクション | 認証不要 |

### 7.2 機密情報

ソースコード内に APIキー・トークンの埋め込みなし。GitHub Secrets 経由で管理しているのは `.github/workflows/update-stats.yml` の Cloudflare Analytics 用トークンのみ。詳細は [INFRASTRUCTURE.md §4](docs/Operation/INFRASTRUCTURE.md#4-セキュリティ)。

---

## 8. SEO 設計

### 8.1 実装済み

| 項目 | 場所 |
|---|---|
| `sitemap-index.xml` / `sitemap-0.xml` | `@astrojs/sitemap` 自動生成（i18n 対応） |
| `robots.txt` | `public/robots.txt` |
| OGP / Twitter Card | `BaseLayout.astro` |
| canonical URL | `BaseLayout.astro`（言語ごとに自言語 URL を canonical 化） |
| hreflang（ja-JP / en-US / x-default） | `BaseLayout.astro` |
| `<html lang>` 動的化 | `BaseLayout.astro` |
| JSON-LD（WebSite / Article） | `BaseLayout.astro`（`inLanguage` 含む） |
| RSS（`/rss.xml`、ja 固定配信） | `src/pages/rss.xml.ts` |
| Google 所有権確認 | meta タグ + HTML ファイル（`public/google42479a91fae835e0.html`） |
| URL リダイレクト（旧 → 新） | `astro.config.mjs` の `redirects` |
| カスタム 404 | `src/pages/404.astro`（旧 URL → 新 URL 自動誘導） |

### 8.2 月次 SEO レビューサイクル

詳細は [OPERATIONS.md §3.2](docs/Operation/OPERATIONS.md#32-月次月初30-分)。

1. 月初に GSC ダッシュボードを PDF エクスポート → `docs/AccessLog/YYYYMMDD_HomePage_SEO_ダッシュボード.pdf`
2. テンプレートをコピーして数値転記 → `docs/AccessLog/YYYYMMDD_HomePage_SEO_ダッシュボード.md`
3. **気になる動きがあれば Claude Code に分析・提案を依頼**（イベント駆動）

---

## 9. パフォーマンス・コスト目安

| 項目 | 値 |
|---|---|
| HTML 生成数 | 約 **220+ ページ**（ja/en × 各種コンテンツ + タグ別ページ ~120 + リダイレクト + 言語検出 + 404） |
| ビルド時間 | 約 5〜8 秒 |
| クライアント JS | ~15KB（ClientRouter + テーマ切替 + 言語検出 + Cloudflare Analytics） |
| 月額運用コスト | **0 円** |

---

## 10. トラブルシューティング

### 10.1 ビルドが失敗する

```bash
rm -rf .astro dist node_modules
npm install
npm run build
```

### 10.2 dev サーバーでコンテンツが反映されない

Content Collections や `content.config.ts` を変更した直後は dev サーバーの再起動が必要:

```bash
# dev サーバーで q + Enter で停止
# 再度 npm run dev または dev.bat
```

### 10.3 Formspree の送信がブロックされる

月 50 件の上限に達した可能性。ダッシュボードで確認、翌月まで待つか有料プラン（$8/月〜）に変更。

### 10.4 ダークモード切替時にフラッシュする

`BaseLayout.astro` の `<head>` 内のダークモード初期化スクリプトを確認。`astro:before-swap` で遷移先にも適用。

### 10.5 Google Search Console でサイトマップが取得できない

URL を確認: `https://teppei19980914.github.io/HomePage/sitemap-index.xml`。初回送信は数時間〜1 日で「成功」になる。

### 10.6 GSC 所有権確認が失敗する

HTML ファイル方式の場合、ファイルが **`public/` 配下** にあることを確認（リポジトリ直下では Astro ビルドの対象外）。

---

## 11. プロジェクト概要

| 項目 | 内容 |
|---|---|
| 技術スタック | Astro v6 / TypeScript / Markdown / Vitest |
| 多言語対応 | ja（デフォルト）/ en、URL プレフィックス方式 `/{lang}/...` |
| コンテンツ管理 | Content Collections（blog / product / project / profile）+ i18n ラベル辞書 |
| ホスティング | GitHub Pages（Public リポジトリ） |
| CI/CD | GitHub Actions（push 時 + 日次 cron + 月次 cron） |
| アクセス解析 | Cloudflare Web Analytics（Cookie 不要） |
| お問い合わせ | Formspree |
| SEO | sitemap / robots / OGP / hreflang / JSON-LD / RSS / GSC 連携 |

詳しくは [docs/Operation/REQUIREMENTS.md](docs/Operation/REQUIREMENTS.md)（要件定義書）を参照。
