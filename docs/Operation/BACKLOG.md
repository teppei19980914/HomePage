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

（現在アクティブ項目なし）

---

## 完了済み項目

### ✅ たすきばの公開リポジトリ整備とリンク反映（2026-05 完了）

**実施内容**:
- `BusinessManagementPlatform` リポジトリを Public 化
- リポジトリの **Settings → General → Features → Discussions** を有効化
- `src/content/product/ja/tasukiba.md` / `en/tasukiba.md` の frontmatter に `repo` を追加（product ページのヘッダーから GitHub リンクが表示されるようになった）
- 開発者向けサブページ `tasukiba-dev.md` に GitHub Discussions リンクを反映し、Step 2-4 のコンタクト導線を Discord から Discussions に移行
- 「現在のたすきばの状態」表と「募集タイミング」セクションの Private/Public 表記を実態に合わせて更新

**補足**:
- 親ページ `tasukiba.md` には現在「コミュニティ」セクション自体がないため、プレースホルダ「公開リポジトリ整備後に開設予定」の置換作業は発生せず
- 旧リポジトリ `AnonymousKnowledgePlatform` は実質廃止（リポジトリ自体は残存）。LP からのリンクなし
- `url`（公式サイト URL）は正式リリース後に追加検討

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
