# 要件定義書

> このサイトが「**何を実現したいか**」を定義する。実装の詳細は [SPECIFICATION.md](SPECIFICATION.md)、設計判断は [DESIGN.md](DESIGN.md) を参照。

## 1. プロジェクト概要

| 項目 | 内容 |
|---|---|
| プロジェクト名 | HomePage |
| 目的 | 個人の紹介・案件獲得・ブランディング・技術発信を目的とした個人ホームページ |
| 公開 URL | https://teppei19980914.github.io/HomePage/ |
| 想定ユーザー | 案件発注者、採用担当者、技術者コミュニティ、検索流入したエンジニア |
| 運用形態 | 個人運用、月額 0 円、AI 駆動開発（Claude Code）併用 |

## 2. 機能要件

### 2.1 ページ構成

| ページ | 主な要素 |
|---|---|
| **Home**（`/{lang}/`）| Hero（名前・実績数値・CTA）、強み、プロダクト、直近ブログ、Profile / Contact 導線 |
| **Profile**（`/{lang}/profile/`）| 基本情報、スキル、資格、キャリアグラフ（SVG）、学歴、思想（Mindset/Direction の 2 グループ）、SNS リンク |
| **Product**（`/{lang}/product/`、`/{lang}/product/{slug}/`）| 個人開発プロダクト一覧・詳細。ステータス（active / beta / archived / suspended）対応 |
| **Project**（`/{lang}/project/`、`/{lang}/project/{slug}/`、`/{lang}/project/all/`）| 参画プロジェクト一覧（直近 5 件）・詳細・全件ページ |
| **Blog**（`/{lang}/blog/`、`/{lang}/blog/{slug}/`、`/{lang}/blog/all/`）| ブログ記事一覧（ピックアップ + 直近 + 投稿カレンダー + Qiita 上位記事）・詳細・全件ページ |
| **Contact**（`/{lang}/contact/`）| お問い合わせフォーム（Formspree 連携）+ 稼働状況の説明 |
| **404**（`/404.html`）| カスタム 404。旧 URL を検出して新 URL へクライアントサイド誘導 |

### 2.2 多言語対応

| 項目 | 要件 |
|---|---|
| サポート言語 | 日本語（`ja`、デフォルト）/ 英語（`en`）|
| URL 戦略 | 両言語ともプレフィックス付与（`/{lang}/...`）|
| 言語検出 | ルート（`/HomePage/`）にアクセスすると `localStorage` → `navigator.language` の優先順位で判定し自動リダイレクト |
| ラベル管理 | `src/i18n/ja.ts` を Single Source of Truth とし、`src/i18n/en.ts` は同じ型を満たす（型システムで翻訳漏れを強制検出）|
| コンテンツ管理 | `src/content/{blog,product,project,profile}/{ja,en}/*.md` の言語別ディレクトリ。指定ロケールにファイルが無ければ ja にフォールバック |
| SEO | `<html lang>` 動的化、hreflang（ja-JP / en-US / x-default）、`og:locale` + `og:locale:alternate`、JSON-LD `inLanguage` |

### 2.3 共通 UI 機能

| 機能 | 要件 |
|---|---|
| ダークモード | デフォルトダーク。トグルで切替、`localStorage` に保存。OS 設定 `prefers-color-scheme` を尊重 |
| ページ遷移 | Astro `ClientRouter`（旧 `ViewTransitions`）による SPA 風遷移 |
| スクロールアニメーション | `IntersectionObserver` で `.reveal` 要素をフェードイン |
| スクロールプログレスバー | 画面上部にカラフルな進捗バー（読み終わり可視化）|
| スクロールトップボタン | 300px 以上スクロールで右下に表示 |
| レスポンシブ | モバイル / タブレット / デスクトップ対応 |
| 言語スイッチャー | Header に配置。ゼロ JS（`<a>` リンクのみ）で実装 |
| 投稿カレンダー（Blog 一覧）| 月別グリッドで投稿日を可視化、未来日付の記事は「公開予定」表示 |

### 2.4 コンテンツ管理

| 対象 | 管理方法 |
|---|---|
| ブログ記事 | `src/content/blog/{ja,en}/YYYYMMDD-slug.md`。一日一投稿、ja → en の翻訳ペア必須 |
| プロダクト | `src/content/product/{ja,en}/{slug}.md` |
| プロジェクト | `src/content/project/{ja,en}/{slug}.md` |
| プロフィール思想セクション | `src/content/profile/{ja,en}/{philosophy,motto,dream,goal}.md` |
| Qiita 上位記事 | ビルド時に Qiita API から取得（直近 1 年・Organization 未紐付け・likes + stocks×2 で上位 5 件）|
| ピックアップ記事 | `src/data/dynamic-stats.json` の `featuredSlugs`（月次バッチで自動更新、または手動指定）|
| UI ラベル | `src/i18n/ja.ts` / `src/i18n/en.ts` に集約（ハードコーディング禁止）|

### 2.5 SEO 機能

| 機能 | 要件 |
|---|---|
| sitemap | `@astrojs/sitemap` で自動生成、i18n オプションで hreflang 自動付与 |
| robots.txt | `public/robots.txt` で sitemap を宣言 |
| OGP / Twitter Card | 全ページに付与 |
| canonical URL | 各言語ページの自言語 URL を canonical 化 |
| RSS フィード | `/rss.xml`（ja 固定、`<atom:link rel="self">` 付き）|
| 構造化データ | JSON-LD で WebSite / Article スキーマ |
| GSC 所有権確認 | meta タグ + HTML ファイル（`public/google42479a91fae835e0.html`）の 2 方式併用 |
| 旧 URL リダイレクト | `astro.config.mjs` の `redirects` で 27 件以上の 301 相当リダイレクト |

### 2.6 Claude Code との連携

| 役割 | 担当 |
|---|---|
| 実装・コード変更・記事作成・コミット & プッシュ | 本人 |
| 記事公開前の SEO レビュー | Claude Code（**毎回必須**）|
| SEO データ分析・改善提案 | Claude Code（**イベント駆動**: 必要な時に依頼）|

詳細は [CLAUDE.md](../../CLAUDE.md) の「Claude Code 運用スコープ」を参照。

## 3. 非機能要件

### 3.1 パフォーマンス

| 項目 | 目標値 | 補足 |
|---|---|---|
| LCP（Largest Contentful Paint） | 2.5 秒以内 | Cloudflare Web Analytics でモニター |
| FID（First Input Delay） | 100ms 以内 | 同上 |
| CLS（Cumulative Layout Shift） | 0.1 以下 | 同上 |
| ビルドサイズ | 300KB 以下 | HTML + CSS + JS の合計 |
| クライアント JS | ~15KB | ClientRouter + テーマ切替 + 言語検出 + Analytics |
| ビルド時間 | 10 秒以内 | 約 98 ページ生成、CI 上で計測 |
| 読了時間（ブログ記事）| 3〜5 分 | `estimateReadingTime()` で計測（ja 500 字/分 + en 200 語/分）|

### 3.2 SEO 品質基準

| 項目 | 基準 |
|---|---|
| 記事 title | 30〜60 文字、主要キーワードを含む |
| 記事 description | 120〜160 文字、主要 + 副次キーワードを含む |
| URL slug | 英小文字 + ハイフン（日本語・スペース不可） |
| H1 重複なし | frontmatter `title` のみが H1、Markdown 内の `#` 見出しは禁止 |
| 内部リンク | 各記事から既存記事へ最低 3 件の相互リンク |
| 裸 URL | 禁止（説明的なアンカーテキストを使用） |

### 3.3 セキュリティ

| 項目 | 要件 |
|---|---|
| XSS 防止 | Astro テンプレートの自動エスケープ、`set:html` は固定文字列のみ |
| スパム防止 | Formspree honeypot（`_gotcha` フィールド）|
| 入力検証 | フォームに `maxlength` 設定（name:100 / email:254 / message:5000）|
| 外部リンク | `rel="noopener noreferrer"` 必須（`rehype-external-links` で自動付与）|
| 機密情報 | ソースコードにハードコードしない。GitHub Secrets で管理 |
| ロケール検証 | URL パラメータ `lang` は `LOCALES` ホワイトリスト検証 |

### 3.4 運用

| 項目 | 要件 |
|---|---|
| 月額コスト | **0 円**（全サービス無料枠内）|
| デプロイ | `git push` で自動デプロイ + 日次 cron（UTC 21:00 / JST 6:00）+ 月次 cron（毎月 1 日）|
| Cookie | 使用しない（バナー表示不要、GDPR 対応）|
| メンテナンス | 四半期に `npm audit` / `npm update` 実施 |
| バックアップ | Git リポジトリ自体がバックアップ。GitHub の冗長性に依存 |
| 障害復旧 | ビルド失敗時の手順を OPERATIONS.md §4 に明記 |

## 4. 制約条件

| 制約 | 理由 |
|---|---|
| 静的サイト生成（SSG）のみ | GitHub Pages はサーバーサイド処理不可 |
| Formspree 月 50 件制限 | 無料プラン上限 |
| GitHub Pages 帯域 月 100GB | 月 20 万 PV 程度で到達 |
| UI テキストのハードコーディング禁止 | i18n ラベル辞書（`src/i18n/{ja,en}.ts`）に一元管理 |
| ja/en 翻訳ペア必須 | 多言語対応の品質維持 |
| 一日一投稿（ブログ）| 同一日に複数記事を作らない、blog-calendar test で強制検証 |
| ファイル名規則（ブログ）| `YYYYMMDD-slug.md`、blog-calendar test で強制検証 |
| 公式情報根拠（Claude Code 提案）| SEO 提案は必ず公式情報の URL を根拠として明示 |

## 5. 用語定義

| 用語 | 意味 |
|---|---|
| **SSOT** | Single Source of Truth。本プロジェクトでは UI ラベルが `src/i18n/ja.ts` に集約されることを指す |
| **Content Collection** | Astro の型安全な Markdown 管理機能 |
| **ピックアップ記事** | Home ページの「Featured Articles」枠に表示する記事。`dynamic-stats.json` で指定 |
| **イベント駆動** | スケジュールではなく、特定の事象（順位変動・CTR 急落など）を契機に Claude Code に依頼する運用形態 |
| **公開予定** | 未来日付の記事。本番ビルドでは個別ページ非生成、カレンダーには「公開予定」として表示 |
