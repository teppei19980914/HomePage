---
title: "「Git って何？」から GitHub Actions まで — 新卒エンジニアが最初に知りたかった全体像"
description: "Git・ブランチ・GitHub・GitHub Actions・GitHub Pages を段階的に解説。個人ホームページとユメハシで実際に動いている CI/CD 構成（自動デプロイ・予約投稿・ストレステスト）をコード付きで公開します。"
date: 2026-04-22
tags: ["Git", "GitHub", "GitHub Actions", "CI/CD", "新人プログラマ応援"]
---

## この記事の対象読者

- Git / GitHub を使い始めたが、全体像がつかめていない方
- `git add` `git commit` は打てるが、なぜそうするのか分かっていない方
- GitHub Actions や CI/CD という言葉を聞いたことはあるが、触ったことがない方

## はじめに — 私も「Git が分からない」からスタートした

正直に言います。新卒の頃、私は **Git と GitHub の違いすら分かっていませんでした**。

先輩に「プルリクエスト出しておいて」と言われ、プルリクエストについて調べたことを覚えています。つまり、だれしも最初は初めてのことであり、調べることで理解が深まります。

あの頃の自分に向けて、**「最初にこれだけ知っておけば怖くない」** という全体像をまとめました。公式ドキュメントをベースに、実際の開発で使っている構成も添えてお見せします。

---

## 全体像 — Git / GitHub / GitHub Actions の関係

| 概念 | 何か | 公式サイト |
|------|------|-----------|
| **Git** | バージョン管理システム（ソフトウェア） | [git-scm.com](https://git-scm.com/) |
| **GitHub** | Git リポジトリのホスティングサービス | [github.com](https://github.com/) |
| **GitHub Actions** | GitHub に組み込まれた CI/CD 自動化機能 | [GitHub Actions ドキュメント](https://docs.github.com/ja/actions) |

**Git がなければ GitHub は使えません。** GitHub は Git の上に乗っかっているサービスです。

---

## Part 1: Git — 「なぜバージョン管理が必要なのか」

### Git の 3 つのエリア

```
[ワーキングディレクトリ]  →  [ステージングエリア]  →  [ローカルリポジトリ]
     作業場所          git add         git commit
```

**「なぜ `git add` と `git commit` を分けるのか？」** 答えは、変更の一部だけをコミットしたい場合があるから。バグ修正と新機能追加を同時に作業した場合、バグ修正だけを先にコミットしたいとき、`git add` で「このファイルだけ」と選べます。

### よく使うコマンド 5 選

| コマンド | 意味 | 使う場面 |
|---------|------|---------|
| `git status` | 変更状態を確認 | **迷ったらまずこれ** |
| `git add <file>` | 変更をステージング | コミット前 |
| `git commit -m "メッセージ"` | 変更を記録 | 区切りの良いタイミングで |
| `git log --oneline` | 履歴を確認 | 過去のコミットを探す時 |
| `git diff` | 変更内容を確認 | コミット前の最終確認 |

> 参考: [Git 公式ドキュメント — コマンドリファレンス](https://git-scm.com/docs)

---

## Part 2: ブランチ — 「なぜ main を直接触ってはいけないのか」

ブランチは **「並行世界」** です。main ブランチ（本番）に影響を与えずに、別の世界線で作業できます。

```
main:     A --- B --- C --- D（本番）
               \
feature:        E --- F --- G（開発中の新機能）
```

feature ブランチで失敗しても、main は無傷です。さらに、GitHub の Settings → Branches → Branch protection rules で **「Require a pull request before merging」** を設定すると、直接 push を禁止できます。

---

## Part 3: GitHub — 「コードを共有し、レビューする場所」

プルリクエストは **「自分のブランチの変更を main にマージしてほしい」というリクエスト** です。コードレビューの場となり、自分では気づかないバグや設計の問題をチームメンバーが指摘してくれます。

Issue にはタスク管理としての役割があります。PR に `closes #42` と書くと、マージ時に Issue が自動で閉じます。

---

## Part 4: GitHub Actions — 「push したら自動で動く仕組み」

### 実例: 個人開発プロジェクトで実際に動いている 6 つのワークフロー

以下は、このホームページと個人開発アプリ [ユメハシ（YumeHashi）](/HomePage/ja/product/yumehashi/) で実際に動いている構成です。

#### ① main に push → 自動ビルド & デプロイ

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: "0 21 * * *" # 毎日 JST 6:00（予約投稿用）
  workflow_dispatch:      # 手動実行も可能
```

**`git push` するだけでサイトが自動更新されます。**

#### ② cron（定時実行）で予約投稿を実現

cron の書式は `分 時 日 月 曜日` です。`"0 21 * * *"` は「毎日 UTC 21:00」を意味します。記事の `date` フィールドが「今日以前」になった日のビルドで、自動的に記事が公開されます。

#### ③ 月次バッチで動的データを自動更新

Qiita API から記事数を取得して JSON ファイルを更新 → auto commit → push → deploy.yml が自動起動。**手動で数字を更新する必要がありません。**

#### ④ PR 時の自動テスト + バージョン整合性チェック

[ユメハシ](/HomePage/ja/product/yumehashi/) では PR 時に `flutter analyze` + `flutter test` + バージョン 4 点セットのチェックが自動実行されます。**テストを通さずにマージしてしまう・バージョン更新を忘れたままリリースする事故を完全に防止しています。**

#### ⑤ 週次ストレステスト + 閾値超過時の自動 Issue 起票

毎週日曜 12:00 JST にストレステストが自動実行され、パフォーマンスが閾値を超えた場合に Issue が自動作成されます。**週に 1 回、誰も手を動かさなくても品質が監視されます。**

#### ⑥ デプロイ時のバージョンスタンプ自動書き換え

`sed` コマンドでソースコード内の定数を書き換え、ビルド成果物にデプロイ日時を埋め込んでいます。

---

## Part 5: GitHub Pages — 「無料でサイトを公開する」

GitHub Pages は **Git リポジトリから直接 Web サイトを公開できる** 無料サービスです。URL は `https://<ユーザー名>.github.io/<リポジトリ名>/`、HTTPS は自動で有効になります。

このホームページも GitHub Pages で**月額 0 円**で運用しています。

> 参考: [GitHub Pages ドキュメント](https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages)

---

## まとめ — 全体像をもう一度

```
[あなたのPC]
  │ git add / git commit
  ▼
[ローカルリポジトリ]
  │ git push
  ▼
[GitHub（リモートリポジトリ）]
  │
  ├── Pull Request → コードレビュー → マージ
  ├── Issues → タスク管理
  │
  └── GitHub Actions（自動実行）
       ├── push 時 → テスト / ビルド / デプロイ
       ├── PR 時 → 静的解析 / テスト / バージョンチェック
       ├── cron → 予約投稿 / 月次バッチ / 週次ストレステスト
       └── 手動 → workflow_dispatch
            │
            ▼
       [GitHub Pages]
         → 無料でサイト公開
```

| あなたの状況 | 次にやること |
|---|---|
| Git を触ったことがない | `git status` → `git add` → `git commit` を体験する |
| Git は使えるがブランチが怖い | `git checkout -b` でブランチを切って PR を出してみる |
| GitHub は使えるが Actions を知らない | 上の `deploy.yml` をコピーして自分のリポジトリで動かしてみる |

## 関連記事

- [「テスト工程が消滅した」— AI 駆動開発 vs 従来開発を全工程で比較してみた](/HomePage/ja/blog/20260410-ai-driven-development/) — GitHub Actions を活用した CI/CD の実績データ
- [ユメハシの技術スタックと 5 つの実装課題](/HomePage/ja/blog/20260407-yumehashi-tech-stack/) — CI レース条件など GitHub Actions の実践的な課題と解決
- [Qiita CLI × Claude Code で記事管理を自動化した](/HomePage/ja/blog/20260421-qiita-cli-automation/) — GitHub Actions で予約投稿を実現した構築記録
