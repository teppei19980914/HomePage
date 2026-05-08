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

### 1. たすきばの Discussions / コミュニティ連携の有効化

**背景**:
- たすきばの本体リポジトリは現在 private（`BusinessManagementPlatform`）で開発中
- LP は `/apps/tasukiba/` で公開準備中（**noindex 運用**）
- 各種リンク（公式サイト・GitHub・Discussions・Discord）は **「準備中」表示**

**実施タイミング**:
- `BusinessManagementPlatform` リポジトリを公開化したタイミング
- または、たすきばのリリース準備が整ったタイミング

**実施内容**:
1. `BusinessManagementPlatform` リポジトリを Public 化
2. リポジトリの **Settings → General → Features → Discussions** を有効化
3. `src/i18n/ja.ts` の `apps.tasukiba` ブロックを更新:
   - `repoUrl: "https://github.com/teppei19980914/BusinessManagementPlatform"`
   - `discussionsUrl: "https://github.com/teppei19980914/BusinessManagementPlatform/discussions"`
   - 必要に応じて `officialUrl` も
4. `src/i18n/en.ts` の対応箇所も同様に更新（型システムが翻訳漏れを強制検出）
5. `npm run build` でビルド確認、main へ commit & push

**関連ファイル**:
- `src/i18n/ja.ts`（`apps.tasukiba` ブロック）
- `src/i18n/en.ts`（同）

**補足**:
- 旧リポジトリ `AnonymousKnowledgePlatform` は実質廃止（リポジトリ自体は残存）。LP からのリンクなし

---

### 2. `/apps/` セクションの一般公開

**背景**:
- 現在 `/apps/` 配下は以下の制御で「直接 URL を知っている人だけアクセス可能」状態:
  - 全 4 ページ（hub + 3 アプリ）に `<meta name="robots" content="noindex, follow">` 付与
  - `astro.config.mjs` の sitemap フィルタで `/apps/` を除外
  - Header にナビ未追加
  - 既存 `/product/{slug}/` から `/apps/{slug}/` への内部リンクなし
- コンテンツ拡張中

**実施タイミング**:
- 各アプリ LP のコンテンツが「他人に見せられる品質」に達したとき
- 特にたすきばのリリース準備と合わせて公開するのが自然

**実施内容**:
1. `src/pages/[lang]/apps/index.astro` `yumehashi.astro` `defrago.astro` `tasukiba.astro` の `noindex={true}` を **削除**（または `false` に）
2. `astro.config.mjs` の sitemap フィルタから `/apps/` 除外条件を削除:
   ```js
   // Before
   filter: (page) =>
     !/^https:\/\/[^/]+\/HomePage\/$/.test(page) &&
     !/\/HomePage\/(ja|en)\/apps\//.test(page),
   // After
   filter: (page) => !/^https:\/\/[^/]+\/HomePage\/$/.test(page),
   ```
3. `src/components/Header.astro` にナビゲーション項目「Apps」を追加
4. `src/i18n/ja.ts` `src/i18n/en.ts` の `nav` ブロックに `apps` ラベル追加
5. （任意）`src/pages/[lang]/product/[...slug].astro` から対応する `/apps/{slug}/` へのリンク追加
6. `npm run build` で生成数確認（sitemap に `/apps/` 配下が含まれることを `dist/sitemap-0.xml` で確認）
7. main へ commit & push
8. デプロイ完了後、Google Search Console で各 `/apps/` URL を **URL 検査 → インデックス登録リクエスト**

**関連ファイル**:
- `src/pages/[lang]/apps/*.astro`（4 ファイル）
- `astro.config.mjs`
- `src/components/Header.astro`
- `src/i18n/ja.ts` `src/i18n/en.ts`（`nav` ブロック）
- 任意: `src/pages/[lang]/product/[...slug].astro`

---

### 3. Discord サーバーの作成と URL 設定

**背景**:
- 開発者とユーザーをつなげるコミュニティとして Discord を運営したい
- 現在は全 3 アプリの LP で「Discord（ユーザー・開発者向け）（準備中）」表示

**実施タイミング**:
- たすきばのリリースに合わせて、または個別アプリで利用者が増えてニーズが顕在化したタイミング

**実施内容**:
1. Discord サーバー作成
   - 案 a: 3 アプリで 1 サーバー共有（チャンネル分離）
   - 案 b: アプリ別に 3 サーバー分離
   - 推奨: 立ち上げ初期は **案 a**（運用工数を抑えつつコミュニティ規模を集約）
2. 永続招待リンク（Server Settings → Invites → Permanent）を取得
3. `src/i18n/ja.ts` の各アプリの `discordUrl` に URL 設定（3 箇所）
4. `src/i18n/en.ts` も同様に
5. ビルド確認、デプロイ

**関連ファイル**:
- `src/i18n/ja.ts`（`apps.yumehashi.discordUrl` `apps.defrago.discordUrl` `apps.tasukiba.discordUrl`）
- `src/i18n/en.ts`（同）

---

## 完了済み項目

（現時点なし）
