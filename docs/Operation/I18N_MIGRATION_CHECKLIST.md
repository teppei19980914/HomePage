# 多言語対応デプロイ後チェックリスト

多言語対応(ja / en の URL プレフィックス戦略)への移行に伴い、デプロイ後に手動で実施が必要な項目の一覧です。

## 背景

従来: `/HomePage/profile/` などプレフィックスなしの単一言語運用
変更後:
- `/HomePage/` → 言語検出リダイレクト
- `/HomePage/ja/...` → 日本語版
- `/HomePage/en/...` → 英語版
- 旧 URL は `src/pages/404.astro` 経由で新 URL に自動リダイレクト

---

## 🔴 デプロイ直後に実施(必須)

### 1. 動作確認

以下の URL が期待通り動作するか確認する。

| URL | 期待動作 |
|---|---|
| `https://teppei19980914.github.io/HomePage/` | ブラウザ言語に応じて `/ja/` または `/en/` にリダイレクト |
| `https://teppei19980914.github.io/HomePage/ja/` | 日本語トップページ表示 |
| `https://teppei19980914.github.io/HomePage/en/` | 英語トップページ表示(ラベルのみ英語、Markdown コンテンツは日本語のフォールバック) |
| `https://teppei19980914.github.io/HomePage/ja/profile/` | 日本語プロフィール |
| `https://teppei19980914.github.io/HomePage/en/profile/` | 英語プロフィール |
| `https://teppei19980914.github.io/HomePage/profile/` (旧 URL) | カスタム 404 ページ経由で `/ja/profile/` または `/en/profile/` へ自動リダイレクト |
| `https://teppei19980914.github.io/HomePage/unknown/` | カスタム 404 ページ → `/ja/` or `/en/` トップへ誘導 |

### 2. 言語スイッチャーの動作確認

- Header 右上の「日本語 / English」切替ボタンが表示される
- クリックすると同じページの別言語版に遷移する
- 現在表示中の言語に `active` クラスが付く
- クリック後 `localStorage.preferred-locale` に選択が保存される (DevTools → Application → Local Storage で確認)

### 3. hreflang / og:locale の検証

DevTools の Elements タブで各ページの `<head>` に以下が存在するか確認:

```html
<html lang="ja">  <!-- または "en" -->
<link rel="alternate" hreflang="ja-JP" href="...">
<link rel="alternate" hreflang="en-US" href="...">
<link rel="alternate" hreflang="x-default" href="...">
<meta property="og:locale" content="ja_JP">  <!-- または "en_US" -->
<meta property="og:locale:alternate" content="en_US">  <!-- 逆 -->
```

### 4. JavaScript 無効環境の確認

Chrome DevTools の設定で JavaScript を無効化し、以下を確認:

- `/HomePage/` → `<noscript>` の meta refresh で `/ja/` に遷移する
- `/HomePage/ja/profile/` → ページは正常表示される (画面アニメーションは無効化、`.reveal` / `.fade-in` は `<noscript>` CSS で強制表示)
- 404 ページ → meta refresh で `/ja/` に 3 秒後遷移

---

## 🟠 デプロイ後 24 時間以内に実施(SEO 影響大)

### 5. Google Search Console の対応

**プロパティ**: `https://teppei19980914.github.io/HomePage/`

#### 5.1 sitemap 再送信

1. Search Console → サイトマップ
2. 既存の `sitemap-index.xml` の状態を確認
3. 一旦「サイトマップを削除」してから、同じ URL で再登録(内容が全面的に変わったため)
   - URL: `sitemap-index.xml`

#### 5.2 旧 URL の削除リクエスト

既存ページが既にインデックス済みの場合、旧 URL をクロール対象から除外する:

1. Search Console → 削除 → 新しいリクエスト
2. 以下の URL を**一時削除**(約 6 か月間)申請:
   - `https://teppei19980914.github.io/HomePage/profile/`
   - `https://teppei19980914.github.io/HomePage/product/`
   - `https://teppei19980914.github.io/HomePage/project/`
   - `https://teppei19980914.github.io/HomePage/blog/`
   - `https://teppei19980914.github.io/HomePage/contact/`
   - 既にインデックス済みの各 blog 記事・project 詳細ページ
3. 「このプレフィックスで始まる URL をすべて削除」を選ぶと上記を一括指定できる

> ⚠️ 一時削除は**検索結果から消すだけ**で、インデックス自体は残る。恒久的には 404 ページ(旧 URL → 新 URL への誘導)とカノニカルで自然に再評価される。

#### 5.3 主要ページの再インデックス申請

新 URL を Google にクロールしてもらうため、以下を URL 検査 → 「インデックス登録をリクエスト」:

- [ ] `https://teppei19980914.github.io/HomePage/`
- [ ] `https://teppei19980914.github.io/HomePage/ja/`
- [ ] `https://teppei19980914.github.io/HomePage/en/`
- [ ] `https://teppei19980914.github.io/HomePage/ja/profile/`
- [ ] `https://teppei19980914.github.io/HomePage/en/profile/`
- [ ] `https://teppei19980914.github.io/HomePage/ja/project/`
- [ ] `https://teppei19980914.github.io/HomePage/en/project/`
- [ ] `https://teppei19980914.github.io/HomePage/ja/product/`
- [ ] `https://teppei19980914.github.io/HomePage/ja/blog/`
- [ ] 主要ブログ記事: `hello-world`, `yumehashi-story`, `yumehashi-tech-stack`, `yumehashi-cost-optimization` (各 ja/en)

> 1 日あたり 10〜20 件程度の URL 検査リクエストが上限目安。無理なく分散して実施する。

#### 5.4 International Targeting レポート確認

Search Console → レガシー ツール → インターナショナル ターゲティング → 「言語」タブで hreflang エラーがないか確認。初回クロール後 1〜2 週間でデータが反映される。

### 6. OGP キャッシュの更新

既存のブログ記事が SNS で既にシェアされている場合、プラットフォーム側のキャッシュを更新する必要がある:

- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator) で以下の URL を検証・再取得:
  - 新 URL: `https://teppei19980914.github.io/HomePage/ja/blog/yumehashi-story/`
  - 新 URL: `https://teppei19980914.github.io/HomePage/ja/blog/yumehashi-tech-stack/`
  - 新 URL: `https://teppei19980914.github.io/HomePage/ja/blog/yumehashi-cost-optimization/`
  - 新 URL: `https://teppei19980914.github.io/HomePage/ja/blog/hello-world/`

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) で同様に「新しい情報を取得」を実行

- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) で同様に再取得

### 7. Cloudflare Web Analytics ダッシュボード確認

- Top Pages レポートで新 URL がカウントされ始めているか
- 旧 URL のトラフィックが 404 にどれだけ向かっているか
- 言語別アクセス比率(URL パターンから ja / en を推定)

---

## 🟡 デプロイ後 1 週間以内に実施

### 8. 外部プロフィールの URL 更新

以下のサービス・媒体にホームページ URL を掲載している場合、**ルート URL `https://teppei19980914.github.io/HomePage/`** を指すように更新する(言語検出リダイレクトで正しく着地する):

- [ ] **GitHub Profile README** (`teppei19980914/teppei19980914` リポジトリ)
- [ ] **Qiita プロフィール** 自己紹介欄
- [ ] **Wantedly プロフィール**
- [ ] **LinkedIn** プロフィール (利用している場合)
- [ ] **Zenn / note / はてブ** (利用している場合)
- [ ] **メール署名** の URL
- [ ] **名刺の QR コード**(物理名刺が存在する場合、次回刷り直し時に確認)

> 言語プレフィックスなしのルート URL を使うのがベスト。言語検出でユーザーの環境に合わせたページに着地する。

### 9. LT 資料 (pptx) の QR コード再確認

以前作成した LT 資料の QR コードが正しく新サイトに誘導するか確認:

- [ ] `docs/PR/LT/HomePage_開発者用.pptx` の QR コード
- [ ] `docs/PR/LT/HomePage_経営者や採用担当者用.pptx` の QR コード

両ファイルともルート URL (`https://teppei19980914.github.io/HomePage/`) を QR 化しているはずなので、言語検出リダイレクトで正しく動作します。万一印刷済み物理物がある場合は要確認。

### 10. Qiita 記事からの被リンク(ある場合)

過去の Qiita 記事にホームページへのリンクがあれば、可能なら新 URL に更新。ただし 404 ページ経由で自動リダイレクトされるため、**緊急度は低い**。

### 11. 各種ドキュメント更新

- [x] `README.md` — 更新済み
- [x] `docs/Operation/SPECIFICATION.md` — 更新済み (§0 多言語対応)
- [x] `docs/Operation/OPERATIONS.md` — 例示 URL 更新済み
- [x] `CLAUDE.md` — 更新済み
- [ ] `docs/Operation/DESIGN.md` — アーキテクチャ図に i18n / 404 追記(任意)
- [ ] `docs/Operation/INFRASTRUCTURE.md` — 特に変更不要
- [ ] `docs/Operation/REQUIREMENTS.md` — 「多言語対応」を非機能要件に追加(任意)

---

## 🟢 中長期(必要になったら)

### 12. ブラウザ言語検出バナーの追加検討

現状: 初回訪問時のみ `/HomePage/` で自動検出 → `/ja/` or `/en/` へリダイレクト。それ以降は選択した言語が localStorage に保存される。

将来課題: ユーザーが `/ja/` 直接アクセスしてきた場合でもブラウザ言語が en なら「View in English」のバナーを出す UX 改善。Y/N を記憶する設計が必要。

### 13. Markdown コンテンツの英訳

現状: `src/content/**/en/` は空で、`getLocalizedCollection` は ja にフォールバック。

優先順位:
1. `src/content/profile/en/philosophy.md` / `motto.md` / `dream.md` / `goal.md`
2. `src/content/product/en/yumehashi.md` / `defrago.md`
3. `src/content/project/en/*.md` (6 件)
4. `src/content/blog/en/*.md` (優先度最低、ユーザー指示により翻訳保留)

### 14. 多言語 RSS フィード

現状: `/HomePage/rss.xml` は ja 固定配信。

将来課題: `/HomePage/en/rss.xml` を追加して英語記事の RSS も配信する。ただし英語記事が存在しないうちは不要。

### 15. Intl.NumberFormat / DateTimeFormat の活用拡大

現状: `BCP47[lang]` を `toLocaleDateString` に渡して日付を言語対応済み。

将来課題: 年齢・社会人歴等の数値にも `Intl.NumberFormat(BCP47[lang])` を適用するかどうか(英語版では「27 yr」を「27 years old」等に変えるか)。

### 16. 動的 OGP 画像

現状: `public/og-image.png` を全言語共通で使用。

将来課題: 言語別 OGP 画像を用意して、SNS シェア時のクリック率を上げる。

---

## 移行作業ログ

| 日付 | 作業 |
|---|---|
| 2026-04-09 | 多言語対応 Phase 1〜7 実装完了、main ブランチへマージ・デプロイ |
| TBD | Google Search Console 対応 |
| TBD | OGP キャッシュ更新 |
| TBD | 外部プロフィール URL 更新 |

※ 実施日を追記してチェックリストとして活用する。
