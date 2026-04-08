# 要件定義書

## 1. プロジェクト概要

| 項目 | 内容 |
|---|---|
| プロジェクト名 | HomePage |
| 目的 | 個人の紹介・案件獲得・ブランディングを目的とした個人ホームページ |
| 対象ユーザー | 案件発注者、採用担当者、技術者コミュニティ |
| 公開URL | https://teppei19980914.github.io/HomePage/ |

## 2. 機能要件

### 2.1 ページ構成

| ページ | 機能 |
|---|---|
| Home | Hero（名前・キャッチコピー・サマリー・CTA）、強み3カード、プロダクト2カード、直近ブログ4件+Qiita、Profile導線、Contact CTA |
| Profile | 基本情報、スキル、資格、キャリア（gitグラフ）、学歴、哲学、夢、座右の銘、SNSリンク、CTA（アコーディオンUI） |
| Product | 個人開発プロダクト一覧・詳細（Content Collections） |
| Project | 参画プロジェクト一覧・詳細（Content Collections） |
| Blog | ブログ記事一覧・詳細（Content Collections）+ Qiita 人気記事（ビルド時API取得） |
| Contact | お問い合わせフォーム（Formspree連携）+ 稼働状況（業務委託のみ、平日19:00以降/土日祝、2営業日以内に返信） |

### 2.2 共通機能

| 機能 | 説明 |
|---|---|
| ダークモード | デフォルトダーク。ライト/ダーク切替。ユーザー設定を localStorage に保存 |
| ページ遷移アニメーション | Astro ClientRouter による SPA風遷移 |
| スクロールアニメーション | セクションのフェードイン表示（IntersectionObserver） |
| スクロールプログレスバー | 画面上部にカラフルな進捗バー |
| スクロールトップボタン | 300px以上スクロールで右下に表示 |
| レスポンシブ対応 | モバイル・タブレット・デスクトップに対応 |
| SEO | sitemap / OGP / JSON-LD / RSS / canonical URL |
| アクセス解析 | Cloudflare Web Analytics（Cookie不要） |

### 2.3 コンテンツ管理

| 項目 | 方式 |
|---|---|
| ブログ記事 | Markdown ファイル追加（src/content/blog/）+ Qiita API（ビルド時取得） |
| プロダクト | Markdown ファイル追加（src/content/product/） |
| プロジェクト | Markdown ファイル追加（src/content/project/） |
| UIテキスト | src/data/labels.ts で一元管理 |

## 3. 非機能要件

### 3.1 パフォーマンス

| 項目 | 要件 |
|---|---|
| LCP | 2.5秒以内 |
| FID | 100ms以内 |
| CLS | 0.1以下 |
| ビルドサイズ | 300KB以下 |
| クライアントJS | 最小限（~15KB） |

### 3.2 セキュリティ

| 項目 | 要件 |
|---|---|
| XSS防止 | Astro テンプレートの自動エスケープ |
| スパム防止 | Formspree honeypot |
| 入力検証 | フォームに maxlength 設定 |
| 外部リンク | rel="noopener noreferrer" 必須 |
| 機密情報 | ソースコードにハードコードしない |

### 3.3 運用

| 項目 | 要件 |
|---|---|
| コスト | 月額0円（全サービス無料枠内） |
| デプロイ | git push で自動デプロイ（GitHub Actions）+ 定期ビルド（4/1, 9/15 cron） |
| Cookie | 使用しない（バナー表示不要） |
| メンテナンス | 定期的な依存パッケージ更新 |

## 4. 制約条件

| 制約 | 理由 |
|---|---|
| 静的サイト生成（SSG）のみ | GitHub Pages はサーバーサイド処理不可 |
| Formspree 月50件制限 | 無料プランの上限 |
| GitHub Pages 帯域 月100GB | 月20万PV程度で到達 |
| UIテキストのハードコーディング禁止 | labels.ts に一元管理 |
