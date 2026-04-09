# HomePage - Claude Code 運用ガイド

## プロジェクト概要

- **HomePage** — Astro v6 / TypeScript の個人ホームページ
- **ホスティング**: GitHub Pages（Public リポジトリ）
- **詳細ドキュメント**: `docs/REQUIREMENTS.md` / `docs/SPECIFICATION.md` / `docs/DESIGN.md`

## テキスト管理ルール（最重要）

- **UIテキストのハードコーディングは禁止**
- 多言語対応: ja / en の 2 言語を `src/i18n/ja.ts` / `src/i18n/en.ts` で管理
- ja.ts が Single Source of Truth、`typeof ja` → `Labels` 型を en.ts が満たす必要あり（翻訳漏れはビルド時エラー）
- ページ内では `getLabels(lang)` 経由で取得、`localeUrl(lang, path)` で内部リンク生成
- 旧 `src/data/labels.ts` は後方互換シムとして残存（新規コードは i18n から import 推奨）
- Markdown コンテンツは `src/content/{blog,product,project,profile}/{ja,en}/*.md` 配下
- 新しいテキストを追加する場合は必ず ja.ts に先に追加 → en.ts で翻訳（または ja 継承）

## 運用フロー

1. Claude Code がソースコード修正 + テスト追加
2. ユーザーがローカルで動作確認（`dev.bat`）→ main にコミット & プッシュ
3. GitHub Actions が自動ビルド → GitHub Pages にデプロイ

## コミットルール

- テストコードの追加・修正を伴わないソースコード変更はコミットしない
- コミットメッセージは変更内容を端的に記述する
- コミット & プッシュはユーザーが手動で実施

## コミット前チェック（毎回必須）

1. **横展開チェック** — 同一パターンを検索し漏れなく対応。labels.ts のハードコード検出
2. **セキュリティチェック** — XSS、外部リンク rel 属性、フォームバリデーション、機密情報
3. **パフォーマンスチェック** — 未使用依存、CSS重複、ビルドサイズ
4. **デプロイチェック** — `npx astro check` → `npm test` → `npm run build` をローカル実行
5. **単体テスト** — テスト数の増減を確認
6. **ドキュメント最新化** — 変更内容に応じて以下を必ず最新化する
   - `README.md` — 運用手順に変更がある場合
   - `docs/OPERATIONS.md` — 運用フロー・外部サービスに変更がある場合
   - `docs/REQUIREMENTS.md` — 機能要件・非機能要件に変更がある場合
   - `docs/SPECIFICATION.md` — ページ仕様・UI仕様に変更がある場合
   - `docs/DESIGN.md` — アーキテクチャ・設計に変更がある場合
   - `docs/INFRASTRUCTURE.md` — インフラ・外部サービス構成に変更がある場合

## 色使いルール

- `--color-primary`（青）= リンク・インタラクティブ要素のみ
- `--color-accent`（紫）= 装飾・強調テキスト
- 強調表現に青文字を使わない（リンクと混同するため）

## Astro v6 注意点

- Content Collections は `glob` loader 必須
- `ViewTransitions` → `ClientRouter` に名前変更
- `astro.config.mjs` の `base` は末尾スラッシュ必須（`/HomePage/`）
- ブログリンクには `data-astro-reload` 属性が必要（ClientRouter との互換性のため）
- **i18n**: `prefixDefaultLocale: true` により両言語とも `/ja/...` / `/en/...` で配信。ルート `/HomePage/` は言語検出リダイレクトページ
- **ページ実装**: `src/pages/[lang]/` 配下に単一ソース。`getStaticPaths = localeStaticPaths` で全ロケール分を自動生成

## 外部 API 連携

- **Qiita API**: ビルド時に Qiita 記事を取得し、likes + stocks*2 でスコアリング、上位10件を Blog ページに表示

## Claude Code レベル最適化ルール

- **CLAUDE.md**: 150行以内を維持。詳細は Skills / docs に移行
- **Skills**: 繰り返し使う作業手順を配置
- **Hooks**: 自動化可能な品質チェックを追加
- **Agents**: 独立して並行実行できるレビュー作業を配置
