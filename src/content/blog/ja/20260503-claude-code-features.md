---
title: "Claude Code 固有機能の使い分け — Skills / Subagents / Hooks を公式準拠で整理"
description: "Claude Code には Web 版や API 版にはない強力な機能群があります。Skills・Subagents・Hooks・Auto Mode・Plan Mode など、どれをいつ使うかを公式ベストプラクティスに沿って整理します。個人開発で実際にどう組み合わせているかも共有します。"
date: 2026-05-03
tags: ["Claude Code", "AI駆動開発", "Skills", "Subagents", "新人プログラマ応援"]
---

## 連載第 6 回です

[前回](/HomePage/ja/blog/20260502-claude-prompt-instructions/)で指示の書き方 5 技法をお伝えしました。今回は **Claude Code の固有機能** の使い分けです。

Web 版の Claude や API 版にはない、Claude Code 専用機能がいくつもあります。それぞれの特徴と、いつ使うべきかを整理します。

## Claude Code 固有機能 一覧

公式が紹介している主な機能:

| 機能 | 何をするか |
|---|---|
| **Skills** | 再利用可能な手順書・ノウハウを Claude に注入 |
| **Subagents** | タスクを分離した副エージェントが並行実行 |
| **Hooks** | ツール実行時の自動スクリプト挿入 |
| **Plan Mode** | コードを書かせず計画のみ立てさせる |
| **Auto Mode** | 対話なしの自動実行 |
| **Slash Commands** | `/clear`・`/compact`・`/rewind` 等の便利操作 |

## Claude に「質問させる」— 逆インタビューの威力

これは公式が推奨する、**意外と使われていない技法**。

> When starting a complex task, ask Claude to ask you clarifying questions before implementation.

通常は自分から情報を提供しますが、**Claude に質問を並べさせる** とヒアリング漏れが減ります。

```
{{やりたいこと}} を実装したいです。
まず、実装前に確認したいことを最大 5 個、質問として挙げてください。
```

私はこれを **新機能の設計フェーズで必ず使う** ようにしています。自分では当たり前に思っていた前提が、実は明文化されていないことが浮き彫りになります。

## サブエージェントで調査を分離する

大規模な調査タスクでは、**Subagents に一部を任せる** と本体のコンテキストが埋まりません。

公式:

> Delegate exploratory research to subagents so the main agent's context stays focused on execution.

たとえば「既存コードの〇〇パターンを全部洗い出して」というタスクは、Subagent に任せて結果サマリだけ受け取る。メイン Claude のコンテキストは「実装」に集中できます。

## Writer/Reviewer パターン

公式が推奨する協働パターン:

> Have one Claude session write code, then start a fresh Claude session to review it.

**書く Claude とレビューする Claude を分ける**。これは [原則 2（コンテキスト管理）](/HomePage/ja/blog/20260429-claude-prompt-principles/) にも繋がります。

| 役割 | セッション |
|---|---|
| Writer | コード生成に特化、テスト通ったらタスク完了 |
| Reviewer | 新しい `/clear` したセッション。書いたコードを外部視点でレビュー |

**第三者の目で見る** ことで、Writer が気付けなかった問題が浮上します。

## 非対話モード（Auto Mode）で自動化

対話なしで Claude Code を自動実行する機能。CI/CD との相性が抜群です。

公式:

> Use `--print` flag for non-interactive automation.

私は HomePage の CI で、「PR 作成時に Claude が自動レビューしてコメント」という運用を設計中です。これが動けば、人間のレビュー工数がさらに削減できそうです。

## 避けるべきアンチパターン（公式明記）

公式が **明示的に「やるな」** と書いているパターン:

| ❌ アンチパターン | なぜ悪い |
|---|---|
| 同じセッションで何時間も作業 | コンテキスト汚染 → `/clear` 推奨 |
| 「いい感じに」系の曖昧指示 | ゴールデンルール違反 |
| 検証なしで完了判定 | ハルシネーション温床 |
| Plan Mode を飛ばす | 間違った問題を解く |
| 巨大 CLAUDE.md | 逆にコンテキスト圧迫 |

特に最後の **「巨大 CLAUDE.md」問題** は見落としがち。公式は「150 行程度に抑える」のを推奨しています。詳細は Skills に委譲するのが正解。

## 私の HomePage での組み合わせ例

実際に私が組んでいる構成:

| 仕組み | どう使っているか |
|---|---|
| `CLAUDE.md` (最重要ルールのみ) | 150 行目安。プロジェクト固有の守備範囲 |
| `.claude/skills/` | 「ブログ記事追加手順」「SEO チェック手順」等の手順書 |
| Hooks | Stop フック で自動テスト実行 + コミット前チェック |
| Plan Mode | 複数ファイルに影響する変更で必ず使用 |
| `/clear` | 1 タスク完了後は必ず |

これで **「何度も同じ指示をする」が消滅** しました。

## コスト削減優先度ランキング（筆者解釈）

Claude のトークン消費を抑える観点で、効果の大きい順に並べると:

| 順位 | 手段 | 効果 |
|---|---|---|
| 1 | `/clear` の徹底 | 最大効果。コンテキスト汚染を元から断つ |
| 2 | Plan Mode の活用 | 無駄な書き直しを防ぐ |
| 3 | CLAUDE.md 整備 | 毎回の指示繰り返しを削減 |
| 4 | Subagents で調査分離 | メイン Claude の集中力維持 |
| 5 | 検証手段の事前提供 | 書き直し回数を減らす |

## まとめ — 機能の使い分け早見表

| いま困っていること | 使う機能 |
|---|---|
| 同じ指示を繰り返している | CLAUDE.md |
| 複雑なタスクで迷走する | Plan Mode |
| セッションが賢さを失ってきた | `/clear` |
| 巨大な調査を任せたい | Subagents |
| 書いたコードをレビューしたい | Writer/Reviewer |
| CI で自動化したい | Auto Mode |

## 関連記事

- [Claude に「1 回で伝える」指示の書き方](/HomePage/ja/blog/20260502-claude-prompt-instructions/) — 指示の 5 技法
- [Claude に「いきなりコード」を書かせない — EPCC の 4 段階](/HomePage/ja/blog/20260430-claude-prompt-workflow/) — Plan Mode の詳細
- Qiita 版（公式引用付き）: [Qiita 筆者ページ](https://qiita.com/teppei19980914)
