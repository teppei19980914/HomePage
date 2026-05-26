# 公式マスコット「たすきフクロウ」(LP / HomePage)

> 製品「たすきば Knowledge Relay」の公式マスコット。LP / 製品紹介ページでの利用ガイド。

本ドキュメントは LP 視点での運用ルールを記述する。マスコットの選定根拠・象徴・デザイン規範の
正規ドキュメントは **製品リポ** (`BusinessManagementPlatform/docs/design/MASCOT.md`) を参照。

## 概要

| 項目 | 値 |
|---|---|
| 名前 | たすきフクロウ |
| 制定日 | 2026-05-26 |
| 元画像 | `docs/design/assets/mascot-owl-source.png` (1254×1254 PNG) |
| 派生画像 | `public/mascot-owl.png` (512×512), `public/favicon-32.png` (32×32), `public/apple-touch-icon.png` (180×180), `public/og-image.png` (1200×630) |
| 再生成スクリプト | `scripts/generate-mascot-derivatives.cjs` |

## 選定根拠 (要約)

フクロウは「知恵」「記憶」「夜でも見守る」の象徴で、プロダクトの 3 軸 — プロジェクト管理 /
ナレッジ管理 / セキュリティ — を最も自然に統合できる。羽でドキュメントを抱える構図 + 胸元の
盾と鍵穴 + 背景の円形バリアが、それぞれ「知見」「セキュリティ」「守護」を視覚化する。

詳細な選定理由・デザイン要素・コピーの方向性は製品リポの MASCOT.md を参照。

## LP での使い方

| 配置先 | 内容 |
|---|---|
| Header (`Header.astro`) | 左端にロゴ 32×32 + サービス名「たすきば」(モバイルはアイコンのみ) |
| Favicon | `public/favicon-32.png` (PNG 32×32) と `public/favicon.ico` (legacy fallback) |
| Apple touch icon | `public/apple-touch-icon.png` (180×180) |
| OG image (SNS シェア) | `public/og-image.png` (左にロゴ + 右にサービス名・タグライン) |
| 製品紹介ページ | 必要に応じて `<img src="/mascot-owl.png">` を挿入可 |

## 派生画像の再生成

元画像 `docs/design/assets/mascot-owl-source.png` を更新したら、以下を実行:

```bash
node scripts/generate-mascot-derivatives.cjs
```

`sharp` パッケージを利用 (本リポの devDependency)。

## ライセンス・著作権

元画像は OpenAI の ChatGPT (DALL·E) で 2026-05-26 に生成。OpenAI 利用規約により
ユーザに商用利用権が帰属する。
