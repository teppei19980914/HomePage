---
title: "Claude を「優秀な新人インターン」として扱う — 公式が教える 3 つの最重要原則"
description: "Anthropic 公式のプロンプトエンジニアリングガイドから、Claude を使いこなすうえで最初に押さえるべき 3 原則「ゴールデンルール・コンテキスト管理・検証手段」を紹介します。実務で使い続けた体感を添えてお届けします。"
date: 2026-04-29
tags: ["Claude Code", "AI駆動開発", "プロンプトエンジニアリング", "Anthropic", "新人プログラマ応援"]
---

## 連載第 2 回です

[前回](/HomePage/ja/blog/20260428-claude-code-prompt-guide/)で連載の全体像をお伝えしました。今回はいよいよ本題 — **Claude プロンプトの最重要 3 原則** です。

公式ドキュメントには原則がいくつもありますが、**この 3 つを押さえれば 90 点取れる** というものに絞りました。

## 原則 1. ゴールデンルール — 「文脈のない新人」でも迷わず実行できるか

公式が最初に提示する原則は、こう書かれています。

> Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too.

翻訳すると、**「そのプロンプトを、文脈をほとんど持たない同僚に見せて実行してもらえるか？ もし彼らが迷うなら、Claude も迷う」**。

公式は Claude を「職場初日のインターン」と表現しています。

> Think of Claude as a brilliant but new employee who lacks context on your norms and workflows.

**優秀だけど、あなたの職場の慣習を知らない新人**。だから具体的に、明示的に伝える必要がある。

### 私の体感

この原則を知る前の私のプロンプトは、「いい感じにして」系が多かったです。今見返すと恥ずかしい。「このコンポーネントをリファクタして」とだけ投げて、自分の脳内にあった「こうなってほしい」を勝手に共有しているつもりになっていた。

**自分のルールは、Claude には見えていない**。これを痛感してから、プロンプトに必ず「コンテキスト」「ゴール」「制約」を書くようになりました。

## 原則 2. コンテキストウィンドウの管理

Claude Code の公式ベストプラクティスには、こう書かれています。

> Most best practices are based on one constraint: Claude's context window fills up fast, and performance degrades as it fills.

**コンテキストが埋まると性能が劣化する**。これは Claude の基本制約です。

### 公式が提示する具体策

| 操作 | 用途 |
|---|---|
| `/clear` | タスク切替時にコンテキストをリセット |
| `Esc` | Claude を途中で止める（コンテキストは保持）|
| `Esc + Esc` / `/rewind` | チェックポイントに戻る |
| `/compact <instructions>` | コンテキストを要約して圧縮 |

そして、公式の最も強い警告がこれです。

> If you've corrected Claude more than twice on the same issue in one session, the context is cluttered with failed approaches. Run `/clear` and start fresh.

**同じ指摘を 2 回以上したら `/clear`**。失敗した試行でコンテキストが汚染されるより、新しいセッションで改善した指示を出す方が効率的です。

### 私の体感

これを知らなかった頃、私は「このセッション、さっきまで賢かったのに急に質が落ちた…」ということをしばしば経験していました。原因はコンテキスト汚染でした。

**1 タスク = 1 セッション** を守るだけで、ハルシネーション率が目に見えて減ります。

## 原則 3. 検証手段を必ず提供する — 最高優先度

公式が "the single highest-leverage thing you can do"（**単独で最も効果が大きいこと**）と明言している原則です。

> Include tests, screenshots, or expected outputs so Claude can check itself.

**テスト・スクショ・期待出力のいずれかを必ず添える**。これで Claude は自己検証できるようになります。

### Before / After

| 戦略 | ❌ Before | ✅ After |
|---|---|---|
| 検証基準 | "implement a function that validates email" | "validateEmail 関数を実装。`user@example.com` → true、`invalid` → false、実装後にテストを走らせて結果を報告" |
| UI 検証 | "make the dashboard look better" | "[スクショ添付] このデザインに合わせて。実装後に画面キャプチャを取って比較、差分を列挙して修正" |

### 私の体感

これは本当に効きます。私は HomePage の開発中、**各 Astro コンポーネント修正後に必ず `npm run build` を走らせて結果報告**してもらうようにしています。結果として、ビルド壊しを Claude 自身が検知して自動修復してくれる率が激増しました。

## 3 原則の優先順位

| 原則 | 公式のキーフレーズ |
|---|---|
| 1. ゴールデンルール | "If they'd be confused, Claude will be too" |
| 2. コンテキスト管理 | "performance degrades as it fills" |
| 3. 検証手段の提供 | "single highest-leverage thing" |

**今日から 1 つだけ始めるなら、検証手段を添える習慣から**。これだけで生成コードの質が変わります。

## 関連記事

- [Claude Code の「プロンプト術」は公式に答えがあった — 連載スタート記](/HomePage/ja/blog/20260428-claude-code-prompt-guide/) — 連載の全体像
- Qiita 版（より詳細なリファレンス）: [Qiita 筆者ページ](https://qiita.com/teppei19980914)
