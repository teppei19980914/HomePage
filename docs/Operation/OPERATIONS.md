# 運用手順書

> このサイトを「**どう運用するか**」を定義する。要件は [REQUIREMENTS.md](REQUIREMENTS.md)、仕様は [SPECIFICATION.md](SPECIFICATION.md)、Claude Code との作業分担は [CLAUDE.md](../../CLAUDE.md) を参照。

## 0. 役割分担サマリ

| 作業 | 担当 |
|---|---|
| 実装修正・コード変更 | 本人 |
| 記事の作成・投稿・コミット & プッシュ | 本人（**原則**） |
| **記事の設計 → 執筆代行** | **Claude Code（例外: 本人が明示的に依頼した時のみ）** |
| **記事公開前の SEO レビュー** | **Claude Code（毎回必須）** |
| **SEO データ分析・改善提案** | **Claude Code（イベント駆動）** |

## 1. 日常運用

### 1.1 ブログ記事の投稿

1. `src/content/blog/{ja,en}/YYYYMMDD-slug.md` を作成（ja → en の順）
2. frontmatter（title, description, date, tags）を記入
3. 本文を Markdown で執筆
4. **Claude Code に SEO レビューを依頼（公開前必須）** — title 30-60 字 / description 120-160 字 / 内部リンク / 検索意図とのマッチを公式情報ベースで指摘してもらう
5. 指摘を反映後、`npm run dev` でローカル確認
6. git commit & push → 自動デプロイ

### 1.2 プロダクトの追加

1. `src/content/product/{ja,en}/{slug}.md` を ja/en 両方作成
2. frontmatter（title, description, tagline, tags, url, status, order）を記入
3. status は `active` / `beta` / `archived` / `suspended` のいずれか
4. `npm run dev` で動作確認 → git commit & push

### 1.3 プロジェクトの追加

1. `src/content/project/{ja,en}/{slug}.md` を ja/en 両方作成
2. frontmatter（title, description, period, role, company, contractType, tags, order）を記入
3. `npm run dev` で動作確認 → git commit & push

### 1.4 プロフィール思想セクションの編集

1. `src/content/profile/{ja,en}/{philosophy,motto,dream,goal}.md` を編集
2. group は `mindset`（philosophy, motto）または `direction`（dream, goal）
3. `npm run dev` で動作確認 → git commit & push

### 1.5 UI テキストの変更

1. `src/i18n/ja.ts` を編集（**SSOT**）
2. `src/i18n/en.ts` で同じキーを翻訳（型システムで漏れを強制検出）
3. **ハードコーディング禁止** — ページ・コンポーネントに直接テキストを書かない
4. `getLabels(lang)` 経由で参照
5. git commit & push → 自動デプロイ

## 2. デプロイ

### 2.1 自動デプロイ

`main` ブランチに push すると GitHub Actions が自動実行:

```
git push → GitHub Actions → npm ci → npm run build → GitHub Pages にデプロイ
```

公開URL: `https://teppei19980914.github.io/HomePage/`

### 2.2 デプロイの確認

- GitHub リポジトリの Actions タブでビルド状況を確認
- 緑のチェックマーク = 成功
- 赤の × = 失敗（ログを確認して修正）

### 2.3 リリース後の SEO 対応

デプロイ完了後、以下を実施する。

#### ブログ記事を投稿した場合（毎回必須）

1. [Google Search Console](https://search.google.com/search-console) にアクセス
2. 左メニュー「URL 検査」
3. 新しい記事の URL を入力（例: `https://teppei19980914.github.io/HomePage/ja/blog/記事ID/` / 英語版が存在する場合は `/en/blog/...` も）
4. 「インデックス登録をリクエスト」をクリック

#### 新しいページを追加した場合（Product / Project 等）

1. 上記と同様に URL 検査でインデックス登録をリクエスト

#### 既存ページの SEO を改善した場合（description 変更、コンテンツ追加等）

1. 上記と同様に該当ページの URL で再リクエスト

#### サイト構成を大幅に変更した場合（ページ追加/削除が多い場合）

1. 左メニュー「サイトマップ」
2. `sitemap-index.xml` を再送信

※ サイトマップは `npm run build` 時に自動生成されるため、手動でのファイル編集は不要。
※ Google は定期的にサイトをクロールするため、リクエストしなくてもいずれ反映されるが、リクエストすると数日で反映される。

## 3. 定期メンテナンス

### 3.1 週次（5 分）

- [ ] Looker Studio ダッシュボード（ブックマーク）を開き、異常がないか目視確認
  - 急激な表示回数の低下 → クロールエラーやインデックス除外の可能性
  - 掲載順位の急落 → Google アルゴリズム更新 or コンテンツ品質の問題

### 3.2 月次（月初、30 分）

- [ ] Looker Studio ダッシュボードを PDF エクスポートし `docs/AccessLog/YYYYMMDD_HomePage_SEO_ダッシュボード.pdf` に保存
- [ ] `docs/AccessLog/TEMPLATE_SEO_ダッシュボード.md` をコピーし `YYYYMMDD_HomePage_SEO_ダッシュボード.md` にリネーム、Looker Studio の数値を転記
- [ ] 自分で前月比を確認し、以下のような **気になる動き** があった時のみ Claude Code に分析・提案を依頼（イベント駆動）:
  - 表示回数（Impressions）の前月比減少
  - CTR の急落
  - 伸びているクエリ・新しく現れたクエリの活用余地
  - 表示されているがクリックされないページ
- [ ] Cloudflare Web Analytics でアクセス状況を確認
- [ ] Formspree ダッシュボードで送信数を確認（月50件上限）
- [ ] Google Search Console でインデックス状況を確認

### 3.3 四半期

- [ ] `npm audit` で脆弱性を確認
- [ ] `npm update` で依存パッケージを更新
- [ ] Profile ページの情報が最新か確認（スキル・資格・経歴・目標）
- [ ] 過去 3 ヶ月の SEO レポート PDF を比較し、中期トレンドを分析
- [ ] 検索トレンドの変化に応じたコンテンツ戦略の見直し

### 3.3 年次

- [ ] 外部リンク（会社 URL 等）のリンク切れを確認
- [ ] 各外部サービスの無料枠・利用規約の変更を確認

## 4. 障害対応

### 4.1 ビルド失敗時

```bash
rm -rf .astro dist node_modules
npm install
npm run build
```

### 4.2 Formspree 月上限到達時

- Formspree ダッシュボードで送信数を確認
- スパムが原因の場合: honeypot が機能しているか確認
- 正当な送信が多い場合: 有料プラン（月$8〜）への変更を検討

### 4.3 GitHub Pages 帯域上限到達時

- 月100GB を超えると一時的にサイトが停止
- 課金は発生しない
- 翌月に自動復旧
- 恒常的に超過する場合: Cloudflare Pages への移行を検討

## 5. SEO 運用

### 5.1 記事投稿前

**Claude Code に SEO レビューを依頼（毎回必須）**:
- title 30-60 字 / description 120-160 字の検証
- 内部リンクの有効性
- 検索意図とのマッチ
- 公式情報（Google Search Central / Web.dev / Schema.org）に基づく改善提案

### 5.2 記事投稿後

1. [Google Search Console](https://search.google.com/search-console) で記事 URL のインデックス登録をリクエスト
2. SNS でシェア（被リンク効果）
3. Qiita の関連記事からホームページへリンクを追加

### 5.3 検索パフォーマンスの確認とイベント駆動の分析依頼

月次の定型確認（§3.2）に加え、以下のような **気になる動き** があれば Claude Code に分析・提案を依頼する:

| シグナル | 想定原因・依頼内容 |
|---|---|
| 表示回数の急減 | クロールエラー / インデックス除外 / アルゴリズム更新の影響を分析 |
| CTR の急落 | title / description の魅力不足 → スニペット最適化提案 |
| 順位上位（10 位以内）でクリック 0 のクエリ | 検索意図とコンテンツのズレ → 改善提案 |
| 新しく現れた高インプレッションクエリ | コンテンツ拡充の余地 → 新規記事ネタ提案 |
| GSC「クロール済み・インデックス未登録」の発生 | description 短すぎ / コンテンツ薄い等の品質シグナル分析 |

依頼時は `docs/AccessLog/` に該当月のダッシュボード PDF + Markdown を配置した上で参照を渡す。
