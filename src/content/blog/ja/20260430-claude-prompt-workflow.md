---
title: "Claude に「いきなりコード」を書かせない — Explore → Plan → Code → Commit の 4 段階"
description: "Claude Code 公式ベストプラクティスが提示する開発ワークフロー、Explore → Plan → Code → Commit の 4 段階を解説します。Plan Mode を挟むだけで、なぜ AI 駆動開発の品質が劇的に上がるのかを個人開発の実体験を添えてお伝えします。"
date: 2026-04-30
tags: ["Claude Code", "AI駆動開発", "ワークフロー", "プロンプトエンジニアリング", "新人プログラマ応援"]
---

## 連載第 3 回です

[前回](/HomePage/ja/blog/20260429-claude-prompt-principles.md/)で 3 原則をお伝えしました。今回はそれを実装に落とす際の **開発ワークフロー** の話です。

Claude Code 公式ベストプラクティスが提示する型があります。それが **Explore → Plan → Code → Commit** の 4 段階です。

## いきなりコードは最悪のパターン

公式はこう書いています。

> Letting Claude jump straight to coding can produce code that solves the wrong problem. Use Plan Mode to separate exploration from execution.

**いきなりコードを書かせると、「間違った問題に対する正しい解」が生まれる**。これ、私も何度も踏みました。

- 「API エンドポイントを追加して」と投げたら、既存のエンドポイントと衝突する設計が出てくる
- 「このバグ直して」と投げたら、症状は直るが根本原因に触れていない
- 「リファクタして」と投げたら、プロジェクトの流儀を無視した設計に作り替えられる

全部、**文脈（Explore）と計画（Plan）を Claude にスキップさせたから** でした。

## 推奨される 4 段階ワークフロー

### Step 1. Explore（探索）

まず Claude にコードベースを読ませる。

> "Read through the authentication module in `src/auth/`. Don't write code yet — just summarize what you find."

ポイントは **"Don't write code yet"** を明示すること。これを書かないと、読みながら「ついでに修正」して来ます。

### Step 2. Plan（計画）

次に、実装計画を立てさせる。

> "Now propose a plan to add rate limiting to `/api/login`. Include: (1) files to modify, (2) new dependencies if any, (3) testing strategy."

**ファイル・依存・テスト戦略まで** 列挙させる。ここで私がレビューし、方針に違和感があれば修正依頼します。

### Step 3. Code（実装）

計画が承認できたら、初めて実装に入る。

> "Now implement the plan above. Run the tests after each file change."

**テストを各段階で走らせる** ことで、途中で壊れても検知できます。

### Step 4. Commit（コミット）

実装が完了し、テスト・ビルドが通ったらコミット。

> "Summarize the changes in 1-2 sentences for the commit message. Focus on 'why', not 'what'."

## Plan Mode のスキップ条件

公式は「**タスクが十分にシンプルなら Plan は飛ばしていい**」とも書いています。

> For simple, localized changes (typo fix, single variable rename, trivial refactor), you can skip Plan Mode.

この判断は **変更の影響範囲** で決まります。1 関数内で閉じる変更なら Explore と Plan を省略して OK。複数ファイル・複数モジュールにまたがる場合は必ず 4 段階を回します。

## 私の体感 — Plan Mode で救われた場面

HomePage 開発中、ブログの予約投稿機能を実装したときのこと。「予約投稿機能を追加して」と投げたら、最初の提案は **新しい DB テーブルを追加する** 設計でした。

でも HomePage は SSG で DB を持たない。**Plan Mode で気付いて引き返せた** おかげで、実際の実装は `frontmatter` の `date` を見て `isPublished()` で判定する、という最小の変更で済みました。

いきなりコードに入っていたら、DB 導入の無駄な実装が走っていたところです。

## 具体的なコンテキストを渡す

Plan の精度を上げるには、**Explore 段階で渡す情報の質** が重要です。公式の推奨:

| 渡す情報 | 理由 |
|---|---|
| 関連ファイルへの明示的なパス | 読むべき箇所を迷わせない |
| 既存のテストファイル | 期待される動作の参照 |
| 類似機能の実装 | プロジェクト流儀の学習 |
| 過去のコミットメッセージ | 意図の理解 |

## まとめ — ワークフロー定着のコツ

| 段階 | やること | やらせないこと |
|---|---|---|
| Explore | 読ませる・要約させる | 実装に手を出させない |
| Plan | 計画をレビュー | Plan なしで進めない |
| Code | テストを並行実行 | レビューなしで完了判定しない |
| Commit | 1-2 行で要約 | 手動で書かず Claude に任せる |

**「いきなり Code」をやめるだけで、AI 駆動開発の質は劇的に変わります**。

## 関連記事

- [Claude を「優秀な新人インターン」として扱う — 公式が教える 3 つの最重要原則](/HomePage/ja/blog/20260429-claude-prompt-principles/) — 原則編
- [Claude Code の「プロンプト術」は公式に答えがあった — 連載スタート記](/HomePage/ja/blog/20260428-claude-code-prompt-guide/) — 連載の全体像
- Qiita 版（より詳細なリファレンス）: [Qiita 筆者ページ](https://qiita.com/teppei19980914)
