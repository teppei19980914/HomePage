# 運用手順書

## 1. 日常運用

### 1.1 ブログ記事の投稿

1. `src/content/blog/` に `.md` ファイルを作成
2. frontmatter（title, description, date, tags）を記入
3. 本文を Markdown で執筆
4. `npm run dev` でローカル確認
5. git commit & push → 自動デプロイ

### 1.2 プロダクトの追加

1. `src/content/product/` に `.md` ファイルを作成
2. frontmatter（title, description, tagline, tags, url, status, order）を記入
3. git commit & push → 自動デプロイ

### 1.3 プロジェクトの追加

1. `src/content/project/` に `.md` ファイルを作成
2. frontmatter（title, description, period, role, company, contractType, tags, order）を記入
3. git commit & push → 自動デプロイ

### 1.4 UIテキストの変更

1. `src/data/labels.ts` の該当箇所を編集
2. **ハードコーディング禁止** — ページファイルに直接テキストを書かない
3. git commit & push → 自動デプロイ

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

## 3. 定期メンテナンス

### 3.1 月次

- [ ] Cloudflare Web Analytics でアクセス状況を確認
- [ ] Formspree ダッシュボードで送信数を確認（月50件上限）
- [ ] Google Search Console でインデックス状況・検索クエリを確認

### 3.2 四半期

- [ ] `npm audit` で脆弱性を確認
- [ ] `npm update` で依存パッケージを更新
- [ ] About ページのスキル・資格・経歴が最新か確認
- [ ] Profile ページの情報が最新か確認

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

### 5.1 記事投稿後

1. Google Search Console で記事 URL のインデックス登録をリクエスト
2. SNS でシェア（被リンク効果）
3. Qiita の関連記事からホームページへリンクを追加

### 5.2 検索パフォーマンスの確認

- Search Console の「検索パフォーマンス」で検索クエリ・表示回数・クリック数を確認
- 表示回数が多いがクリック数が少いキーワード → タイトル・description の改善
