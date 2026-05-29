# 製品マスコット「たすきフクロウ」(HomePage 内での利用)

> 製品「たすきば Knowledge Relay」の公式マスコット。HomePage 内のたすきば紹介ページ・関連記事での利用ガイド。

本ドキュメントは HomePage 視点での運用ルールを記述する。マスコットの選定根拠・象徴・デザイン規範の
正規ドキュメントは **製品リポ** (`BusinessManagementPlatform/docs/design/MASCOT.md`) を参照。

> **重要 (2026-05-29)**: たすきフクロウは **たすきば製品のマスコット** であり、個人ホームページ
> 自身の顔ではない。ホームページのファビコン / OG 画像 / Header ロゴには **使用しない**。
> HomePage 内ではあくまで「たすきばを紹介するコンテンツの挿絵」としてのみ使う。

## 概要

| 項目 | 値 |
|---|---|
| 名前 | たすきフクロウ |
| 制定日 | 2026-05-26 |
| 元画像 | `docs/design/assets/mascot-owl-source.png` (1254×1254 PNG) |
| 派生画像 | `public/mascot-owl.png` (512×512) のみ。※ favicon / apple-touch-icon / og-image は撤去済 (2026-05-29) |
| 再生成スクリプト | `scripts/generate-mascot-derivatives.cjs` |

## 選定根拠 (要約)

フクロウは「知恵」「記憶」「夜でも見守る」の象徴で、プロダクトの 3 軸 — プロジェクト管理 /
ナレッジ管理 / セキュリティ — を最も自然に統合できる。羽でドキュメントを抱える構図 + 胸元の
盾と鍵穴 + 背景の円形バリアが、それぞれ「知見」「セキュリティ」「守護」を視覚化する。

詳細な選定理由・デザイン要素・コピーの方向性は製品リポの MASCOT.md を参照。

## HomePage での使い方

| 配置先 | 内容 |
|---|---|
| たすきば製品紹介ページ | `src/content/product/{ja,en}/tasukiba.md` で `<img src="/HomePage/mascot-owl.png">` を挿入 |
| たすきば関連ブログ記事 | マスコット由来・たすきば紹介系の記事本文に挿絵として挿入 |

### 使ってはいけない箇所 (ホームページ自身の顔)

| 箇所 | 方針 |
|---|---|
| Favicon (ブラウザタブ) | 設定しない (たすきば製品アイコンを個人サイトの顔にしないため) |
| Apple touch icon | 設定しない |
| OG image / Twitter card | 設定しない。リンク共有はテキストのみの `summary` カード |
| Header ロゴ | 設定しない (ナビゲーションのみ) |

## 派生画像の再生成

元画像 `docs/design/assets/mascot-owl-source.png` を更新したら、以下を実行:

```bash
node scripts/generate-mascot-derivatives.cjs
```

`sharp` パッケージを利用 (本リポの devDependency)。

## ライセンス・著作権

元画像は OpenAI の ChatGPT (DALL·E) で 2026-05-26 に生成。OpenAI 利用規約により
ユーザに商用利用権が帰属する。
