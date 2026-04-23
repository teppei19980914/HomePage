---
title: "Claude に「1 回で伝える」指示の書き方 — CLAUDE.md・動機説明・XML・Few-shot の 5 技法"
description: "同じ指示を何度も繰り返していませんか。Anthropic 公式のプロンプトエンジニアリングガイドから、プロンプト品質を底上げする 5 つの技法を解説します。CLAUDE.md・動機説明・XML タグ・Few-shot・配置順序の活用で、Claude の理解力は大きく変わります。"
date: 2026-05-02
tags: ["Claude Code", "AI駆動開発", "プロンプトエンジニアリング", "CLAUDE.md", "新人プログラマ応援"]
---

## 連載第 5 回です

[前回](/HomePage/ja/blog/20260501-claude-prompt-dev-patterns/)でプロンプトの 11 パターンを紹介しました。今回は、そのパターンをさらに磨き上げるための **指示の書き方** に焦点を当てます。

Anthropic 公式が推奨する 5 技法を、実際にどう使っているかと合わせて紹介します。

## 技法 1. CLAUDE.md でプロジェクトルールを永続化

Claude Code 公式ベストプラクティス:

> Create a `CLAUDE.md` at the root of your repository. Claude will automatically read it at the start of every session.

**リポジトリのルートに `CLAUDE.md` を置くと、Claude が毎セッション自動で読み込みます**。

ここに書くべきは、**「毎回 Claude に指示していること」** です。

### 私の HomePage CLAUDE.md の抜粋

```markdown
## テキスト管理ルール（最重要）
- UIテキストのハードコーディングは禁止
- 多言語対応: ja / en の 2 言語を src/i18n/ja.ts / src/i18n/en.ts で管理

## コミット前チェック（毎回必須）
1. 横展開チェック
2. セキュリティチェック
3. パフォーマンスチェック
4. デプロイチェック — npx astro check → npm test → npm run build
```

これで、**毎回「UI テキストは i18n に置いてね」と言わなくて済む** ようになりました。

## 技法 2. 動機・理由を添える

公式の推奨:

> Explain the reasoning behind a rule, not just the rule itself.

**なぜそのルールか、の理由を書く** と、Claude は応用が効くようになります。

### Before / After

| ❌ | ✅ |
|---|---|
| 「コメントは書くな」 | 「コメントは WHY のみ書く。WHAT は well-named identifier で表現されるから冗長になる」 |
| 「i18n に集約して」 | 「i18n に集約する理由は、翻訳漏れをビルド時にコンパイルエラーで検知するため」 |

**理由があるから、エッジケースでも Claude が判断できる**。これは人間の新人と同じですね。

## 技法 3. XML タグで構造化する

複雑なプロンプトで有効なのが XML タグでの構造化:

```
<context>
プロジェクトは Astro v6 + TypeScript の個人ホームページ。
ホスティングは GitHub Pages。
</context>

<task>
ブログ記事の予約投稿機能を追加したい。
</task>

<constraints>
- サーバレス（GitHub Actions のみで完結）
- 既存のテストを壊さない
</constraints>

<output_format>
1. 設計案を最大 200 字で
2. 修正が必要なファイル一覧
3. テスト追加案
</output_format>
```

**セクションが明確に分かれるだけで、Claude の出力構造も整います**。私はプロンプトが 5 行を超えたら XML を使うようにしています。

## 技法 4. Few-shot（例示）を 3〜5 個入れる

公式の推奨:

> Including 3-5 diverse examples dramatically improves Claude's output quality.

**多様な例を 3〜5 個** 入れると出力品質が劇的に上がる。

```
次の形式でコミットメッセージを書いてください。

例 1: "fix: タイムゾーン bug で予約投稿が発火しない問題を修正"
例 2: "feat: ブログにカレンダーコンポーネントを追加"
例 3: "refactor: TOC ロジックを純粋関数として切り出してテスト可能に"

書式のルール:
- 先頭に type (fix/feat/refactor/docs) を付ける
- 要点は 1 行で
- WHY を含める
```

**「例で語る」が最強の指示方法** です。自然言語で書くより誤解が少ない。

## 技法 5. 長文は「長文を上に、質問を下に」

これは地味ですが、効きます。

公式:

> When working with long documents, put the document first and the question at the end of the prompt.

**ドキュメントや長文のコンテキストを上に置き、質問や指示を末尾に書く**。モデルの注意機構的に、末尾の指示が最も強く反映されます。

```
<document>
[長文ドキュメントをここに貼る、数千文字]
</document>

上記ドキュメントを踏まえて、以下の質問に答えてください:
1. ...
2. ...
```

逆順（質問 → ドキュメント）にすると、ドキュメントを読む頃には質問を忘れることがあります。

## 5 技法の使い分け

| 場面 | 使う技法 |
|---|---|
| プロジェクト内で毎回同じルールを伝える | 1. CLAUDE.md |
| ルールが守られない・応用が効かない | 2. 動機を添える |
| プロンプトが 5 行以上になる | 3. XML タグ |
| 出力形式を揃えたい | 4. Few-shot |
| 長文ドキュメントを参照させる | 5. 長文上、質問下 |

## 私の体感 — CLAUDE.md が一番コスパ良い

5 技法の中でも、**CLAUDE.md は圧倒的にコスパが良い** です。1 回書けば全セッションで有効。

私の HomePage では、`CLAUDE.md` に「コミット前チェック」を書いたことで、**毎コミット前に Claude が自動でテスト・ビルド・セキュリティチェックを走らせる** 運用が定着しました。これを手動で毎回指示していたら、確実にどこかで忘れます。

## 関連記事

- [Claude に開発を任せる — 実装・レビュー・デバッグで使えるプロンプト 11 パターン](/HomePage/ja/blog/20260501-claude-prompt-dev-patterns/) — プロンプト型集
- [Claude を「優秀な新人インターン」として扱う — 公式が教える 3 つの最重要原則](/HomePage/ja/blog/20260429-claude-prompt-principles/) — 原則編
- Qiita 版（公式引用全文付き）: [Qiita 筆者ページ](https://qiita.com/teppei19980914)
