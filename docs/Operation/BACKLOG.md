# Backlog / 予定作業

> ホームページの将来的な作業項目を蓄積するドキュメント。
> 着手時期は未定だが忘れないように記録しておくもの。
> 完了したら本ドキュメントから削除し、必要なら他の運用ドキュメント（OPERATIONS.md / SPECIFICATION.md など）に反映する。

## ドキュメント運用ルール

- 新規項目は「アクティブ項目」に番号付きで追加
- 各項目には **背景・実施タイミング・実施内容・関連ファイル** を最低限明記
- 完了した項目は「完了済み項目」に移動するか、不要なら削除
- 完了時に他ドキュメントへの反映が必要なら、その時点で対応

---

## アクティブ項目

### 1. たすきばの公開リポジトリ整備とリンク反映

**背景**:
- たすきばの本体リポジトリは現在 private（`BusinessManagementPlatform`）で開発中
- 統合済み `/product/tasukiba/` ページの「コミュニティ」セクションには Discord のみ掲載、GitHub Discussions は「公開リポジトリ整備後に開設予定」と記載

**実施タイミング**:
- `BusinessManagementPlatform` リポジトリを公開化したタイミング
- または、たすきばの正式リリース準備が整ったタイミング

**実施内容**:
1. `BusinessManagementPlatform` リポジトリを Public 化
2. リポジトリの **Settings → General → Features → Discussions** を有効化
3. `src/content/product/ja/tasukiba.md` の frontmatter に `repo` を追加:
   ```yaml
   repo: "https://github.com/teppei19980914/BusinessManagementPlatform"
   ```
4. 同 md の「コミュニティ」セクションに Discussions URL を追加（プレースホルダ「公開リポジトリ整備後に開設予定」を置換）
5. 必要に応じて `url`（公式サイト URL）も追加
6. `src/content/product/en/tasukiba.md` も同様に更新
7. `npm run build` でビルド確認、main へ commit & push

**関連ファイル**:
- `src/content/product/ja/tasukiba.md`（frontmatter + コミュニティセクション）
- `src/content/product/en/tasukiba.md`（同）

**補足**:
- 旧リポジトリ `AnonymousKnowledgePlatform` は実質廃止（リポジトリ自体は残存）。LP からのリンクなし

---

---

## 完了済み項目

### ✅ `/apps/` と `/product/` の統合（A 案: 完全統合、2026-05 完了）

**実施内容**:
- `/apps/{slug}/` と `/product/{slug}/` の二重管理を解消し、`/product/` 側に一本化
- product 配下の各 md にユーザ向け（悩み・3 ステップ・機能・ユースケース）を前段、技術詳細を後段に再構成
- `/apps/` 配下の 4 ページ（hub + 3 アプリ）と `app` Content Collection を撤去
- 旧 `/apps/{slug}/` URL は `astro.config.mjs` の redirects で `/product/{slug}/` へリダイレクト
- sitemap の `/apps/` 除外条件と i18n の `apps` namespace（ja/en）を撤去

**根拠**:
- 採用担当者と一般ユーザの想定読者層は混在しており、個人サイト規模では別 URL を維持する SEO メリットより二重管理コストの方が大きい
- 一本化により被リンク・内部リンクが集約、Google Search Central の canonicalization ガイダンスに沿った構成

### ✅ Discord サーバーの作成と URL 設定（2026-05 完了）

**実施内容**:
- Discord サーバーを 3 アプリで共有する形で作成
- 各アプリ用の招待リンク（`https://discord.gg/...` 形式）を取得
- `/product/{slug}/` 各 md の「コミュニティ」セクションに Discord 招待リンクを反映（3 アプリ × 2 言語 = 6 箇所）
