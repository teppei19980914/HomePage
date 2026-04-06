# インフラ構成書

## 1. 全体構成図

```
[ユーザー]
    │
    ▼
[GitHub Pages]  ← 静的HTML配信
    │               ↑
    │          [GitHub Actions]  ← CI/CD（自動ビルド＆デプロイ）
    │               ↑
    │          [git push (main)]
    │
    ├── [Cloudflare Web Analytics]  ← アクセス解析（beacon.min.js）
    │
    ├── [Formspree]  ← お問い合わせフォーム送信
    │       │
    │       ▼
    │   [Gmail]  ← 通知メール
    │
    └── [Google Search Console]  ← SEO管理
```

## 2. サービス詳細

### 2.1 GitHub Pages（ホスティング）

| 項目 | 値 |
|---|---|
| リポジトリ | https://github.com/teppei19980914/HomePage |
| 公開URL | https://teppei19980914.github.io/HomePage/ |
| リポジトリ可視性 | Public |
| Source | GitHub Actions |
| 帯域制限 | 月100GB（ソフトリミット） |
| ストレージ制限 | 1GB（推奨） |
| カスタムドメイン | 未設定 |
| HTTPS | 強制（GitHub Pages デフォルト） |

### 2.2 GitHub Actions（CI/CD）

| 項目 | 値 |
|---|---|
| ワークフロー | `.github/workflows/deploy.yml` |
| トリガー | `main` ブランチへの push + 手動（workflow_dispatch） |
| ランナー | ubuntu-latest |
| Node.js | 22 |
| ビルドコマンド | `npm ci` → `npm run build` |
| デプロイ | `actions/upload-pages-artifact` → `actions/deploy-pages` |
| 無料枠 | Public リポジトリは無制限 |

### 2.3 Formspree（お問い合わせフォーム）

| 項目 | 値 |
|---|---|
| 管理画面 | https://formspree.io/ |
| アカウント | tepei09141998@gmail.com |
| フォーム名 | HomePage Contact |
| Endpoint | `https://formspree.io/f/xykbnzvv` |
| 無料枠 | 月50件 |
| スパム対策 | honeypot フィールド（`_gotcha`） |
| 通知先 | tepei09141998@gmail.com |
| 推奨設定 | 「Restrict to domain」を `teppei19980914.github.io` に設定 |

### 2.4 Cloudflare Web Analytics（アクセス解析）

| 項目 | 値 |
|---|---|
| 管理画面 | https://dash.cloudflare.com/ → Analytics & logs → Web analytics |
| アカウント | GitHub 連携（Teppei09141998@gmail.com） |
| Token | `d882ef0019134c4eb5d6473c4396f90c` |
| 実装箇所 | `src/layouts/BaseLayout.astro`（`</body>` 直前） |
| Cookie | 不使用（バナー不要） |
| 無料枠 | 完全無料（上限なし） |
| データ保持 | 直近6ヶ月 |
| 取得可能項目 | PV数、人気ページ、リファラー、国・デバイス別、Core Web Vitals |

### 2.5 Google Search Console（SEO）

| 項目 | 値 |
|---|---|
| 管理画面 | https://search.google.com/search-console |
| プロパティ | `https://teppei19980914.github.io/HomePage/` |
| 確認方法 | HTML メタタグ |
| 確認タグ | `f_jGq-vRpKheGaLTbGylmxYO7tMV8xx9R4lUvNQMo3o` |
| 実装箇所 | `src/layouts/BaseLayout.astro`（`<head>` 内） |
| サイトマップ | `https://teppei19980914.github.io/HomePage/sitemap-index.xml` |

## 3. コスト

### 3.1 現在のコスト: 0円/月

| サービス | 無料枠 | コスト発生条件 |
|---|---|---|
| GitHub Pages | 帯域 月100GB | 超過時は一時停止（課金なし） |
| GitHub Actions | Public リポジトリ無制限 | なし |
| Formspree | 月50件 | 超過時は送信ブロック（課金なし） |
| Cloudflare Web Analytics | 完全無料 | なし |
| Google Search Console | 完全無料 | なし |

### 3.2 スケーリング時の選択肢

| 状況 | 対応 | コスト |
|---|---|---|
| PV が月20万超 | Cloudflare Pages に移行 | 無料 |
| お問い合わせ月50件超 | Formspree 有料プラン | $8/月 |
| カスタムドメイン | ドメイン取得 + GitHub Pages or Cloudflare Pages | ~$10/年 |

## 4. セキュリティ

### 4.1 通信

- 全通信 HTTPS（GitHub Pages 強制）
- 外部リソース: Cloudflare CDN（beacon.min.js）、Formspree API

### 4.2 認証情報

| 情報 | 保管場所 | 備考 |
|---|---|---|
| Cloudflare Token | BaseLayout.astro（HTML埋め込み） | フロントエンド用。書き込み専用で安全 |
| Google 確認タグ | BaseLayout.astro（meta タグ） | 公開前提の値 |
| Formspree Endpoint | contact.astro（form action） | 公開前提の値 |

※ APIキー・シークレット等の機密情報はソースコードに含まれていない

## 5. 監視

| 対象 | 方法 | 頻度 |
|---|---|---|
| サイト稼働 | GitHub Pages のステータス | 自動 |
| ビルド成否 | GitHub Actions のワークフロー | push 毎 |
| アクセス状況 | Cloudflare Web Analytics | 月次確認 |
| SEO | Google Search Console | 月次確認 |
| フォーム送信数 | Formspree ダッシュボード | 月次確認 |
| 脆弱性 | `npm audit` | 四半期 |
