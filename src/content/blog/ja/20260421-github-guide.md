---
title: "「Git って何？」から GitHub Actions まで — 新卒エンジニアが最初に知りたかった全体像"
description: "Git・ブランチ・GitHub・GitHub Actions・GitHub Pages を段階的に解説。個人ホームページとユメハシで実際に動いている CI/CD 構成（自動デプロイ・予約投稿・ストレステスト）をコード付きで公開します。"
date: 2026-04-21
tags: ["Git", "GitHub", "GitHub Actions", "CI/CD", "新人プログラマ応援"]
---

## この記事の対象読者

- Git / GitHub を使い始めたが、全体像がつかめていない方
- `git add` `git commit` は打てるが、なぜそうするのか分かっていない方
- GitHub Actions や CI/CD という言葉を聞いたことはあるが、触ったことがない方

## はじめに — 私も「Git が分からない」からスタートした

正直に言います。新卒の頃、私は **Git と GitHub の違いすら分かっていませんでした**。

先輩に「プルリクエスト出しておいて」と言われ、プルリクエストについて調べたことを覚えています。つまり、だれしも最初は初めてのことであり、調べることで理解が深まります。（まったく当たり前ではありますが...）

あの頃の自分に向けて、**「最初にこれだけ知っておけば怖くない」** という全体像をまとめました。公式ドキュメントをベースに、実際の開発で使っている構成も添えてお見せします。

---

## 全体像 — Git / GitHub / GitHub Actions の関係

まず、よく混同される 3 つの概念を整理します。

| 概念 | 何か | 公式サイト |
|------|------|-----------|
| **Git** | バージョン管理システム（ソフトウェア） | [git-scm.com](https://git-scm.com/) |
| **GitHub** | Git リポジトリのホスティングサービス | [github.com](https://github.com/) |
| **GitHub Actions** | GitHub に組み込まれた CI/CD 自動化機能 | [GitHub Actions ドキュメント](https://docs.github.com/ja/actions) |

一言でまとめると:

```
Git = ローカルPC上のバージョン管理ツール
GitHub = Git のデータをクラウドに保存・共有するサービス
GitHub Actions = GitHub 上で自動処理を実行する仕組み
```

**Git がなければ GitHub は使えません。** GitHub は Git の上に乗っかっているサービスです。

> 参考: [Git 公式ドキュメント — Git とは](https://git-scm.com/book/ja/v2/%E4%BD%BF%E3%81%84%E5%A7%8B%E3%82%81%E3%82%8B-Git%E3%81%A8%E3%81%AF%E4%BD%95%E3%81%8B%EF%BC%9F)

---

## Part 1: Git — 「なぜバージョン管理が必要なのか」

### ファイル名で管理する限界

バージョン管理がない世界では、こうなります:

```
企画書_最終版.docx
企画書_最終版_修正.docx
企画書_最終版_修正_確定.docx
企画書_最終版_修正_確定_本当の最終版.docx
```

笑い話のようですが、コードでこれをやると**どれが正しいバージョンか分からなくなり、チーム開発が崩壊**します。

Git はこの問題を解決します。**ファイルの変更履歴を自動で記録**し、いつでも過去の状態に戻せます。

### Git の 3 つのエリア

Git を理解する最初のステップは、**3 つのエリア**を知ることです。

```
[ワーキングディレクトリ]  →  [ステージングエリア]  →  [ローカルリポジトリ]
     作業場所          git add         git commit
  ファイルを編集      変更を選択       変更を記録
```

| エリア | 役割 | コマンド |
|--------|------|---------|
| **ワーキングディレクトリ** | 実際にファイルを編集する場所 | — |
| **ステージングエリア** | 「次のコミットに含める変更」を選ぶ場所 | `git add` |
| **ローカルリポジトリ** | 変更履歴が記録される場所 | `git commit` |

> 参考: [Git 公式ドキュメント — Git の基本](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E5%9F%BA%E6%9C%AC-%E5%A4%89%E6%9B%B4%E5%86%85%E5%AE%B9%E3%81%AE%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%81%B8%E3%81%AE%E8%A8%98%E9%8C%B2)

**「なぜ `git add` と `git commit` を分けるのか？」** と疑問に思いませんか？

答えは、**変更の一部だけをコミットしたい場合があるから**です。例えば、バグ修正と新機能追加を同時に作業した場合、バグ修正だけを先にコミットしたい。`git add` で「このファイルだけ」と選べるのが、ステージングエリアの存在理由です。

### よく使うコマンド 7 選

| コマンド | 意味 | 使う場面 |
|---------|------|---------|
| `git init` | リポジトリを新規作成 | プロジェクト開始時 |
| `git clone <URL>` | リモートリポジトリをコピー | 既存プロジェクトに参加時 |
| `git status` | 変更状態を確認 | **迷ったらまずこれ** |
| `git add <file>` | 変更をステージング | コミット前 |
| `git commit -m "メッセージ"` | 変更を記録 | 区切りの良いタイミングで |
| `git log --oneline` | 履歴を確認 | 過去のコミットを探す時 |
| `git diff` | 変更内容を確認 | コミット前の最終確認 |

> 参考: [Git 公式ドキュメント — コマンドリファレンス](https://git-scm.com/docs)

---

## Part 2: ブランチ — 「なぜ main を直接触ってはいけないのか」

### ブランチとは何か

ブランチは **「並行世界」** です。main ブランチ（本番）に影響を与えずに、別の世界線で作業できます。

```
main:     A --- B --- C --- D（本番）
               \
feature:        E --- F --- G（開発中の新機能）
```

feature ブランチで失敗しても、main は無傷です。**新機能が完成してからマージ（合流）** すれば、本番に反映されます。

> 参考: [Git 公式ドキュメント — ブランチとマージ](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E6%A9%9F%E8%83%BD-%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E3%81%A8%E3%83%9E%E3%83%BC%E3%82%B8%E3%81%AE%E5%9F%BA%E6%9C%AC)

### 基本的なブランチ運用

```bash
# 1. 新しいブランチを作成して切り替え
git checkout -b feature/add-login

# 2. 作業してコミット
git add .
git commit -m "ログイン機能を追加"

# 3. リモートにプッシュ
git push -u origin feature/add-login

# 4. GitHub 上でプルリクエストを作成
#    → レビュー → マージ
```

### 「main に直接 push して壊した」を防ぐ

これを防ぐには **ブランチ保護ルール** を設定します。

GitHub の Settings → Branches → Branch protection rules で:

- **Require a pull request before merging** — 直接 push を禁止
- **Require approvals** — レビューなしのマージを禁止

> 参考: [GitHub ドキュメント — ブランチ保護ルール](https://docs.github.com/ja/repositories/configuring-branches-and-merges-in-your-repository/managing-a-branch-rule/about-branch-rules)

---

## Part 3: GitHub — 「コードを共有し、レビューする場所」

### プルリクエスト（PR）= 「このコード、見てください」

プルリクエストは **「自分のブランチの変更を main にマージしてほしい」というリクエスト** です。

```
feature/add-login → main へのマージをリクエスト
  ↓
レビュワーがコードを確認
  ↓
LGTM（Looks Good To Me）→ マージ
```

PR がなぜ重要かというと、**コードレビューの場** になるからです。自分では気づかないバグや設計の問題を、チームメンバーが指摘してくれます。

> 参考: [GitHub ドキュメント — プルリクエスト](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)

### Issues = 「やるべきことの管理」

Issues はタスク管理ツールです。バグ報告、機能要望、改善提案を Issue として登録し、PR で解決します。

```
Issue #42: ログインページのバグ修正
  ↓
PR #43: fix: ログインページのバリデーション修正 (closes #42)
  ↓
マージ → Issue #42 が自動的に閉じる
```

コミットメッセージや PR に `closes #42` と書くと、マージ時に Issue が自動で閉じます。

> 参考: [GitHub ドキュメント — Issue のリンク](https://docs.github.com/ja/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)

---

## Part 4: GitHub Actions — 「push したら自動で動く仕組み」

ここからが、Git / GitHub を「使える」から「活用できる」にレベルアップするパートです。

### GitHub Actions とは

GitHub Actions は **「特定のイベントが起きたら、自動で処理を実行する」** 仕組みです。

```
トリガー（いつ実行するか）
  ├── push → main にコードが push されたとき
  ├── pull_request → PR が作成されたとき
  ├── schedule → 毎日決まった時刻に（cron）
  └── workflow_dispatch → 手動実行ボタン

ジョブ（何を実行するか）
  ├── テストを実行
  ├── ビルドを実行
  ├── デプロイを実行
  └── 任意のスクリプトを実行
```

> 参考: [GitHub Actions ドキュメント — ワークフローについて](https://docs.github.com/ja/actions/about-github-actions/understanding-github-actions)

### 実例: 個人開発プロジェクトで実際に動いている 6 つのワークフロー

以下は、このホームページと個人開発アプリ [ユメハシ（YumeHashi）](/HomePage/ja/product/yumehashi/) で実際に動いている構成です。

#### ① main に push → 自動ビルド & デプロイ

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]    # main に push されたら実行
  schedule:
    - cron: "0 21 * * *" # 毎日 JST 6:00 に実行（予約投稿用）
  workflow_dispatch:      # 手動実行も可能

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
```

**`git push` するだけでサイトが自動更新されます。**

#### ② cron（定時実行）で予約投稿を実現

```yaml
schedule:
  - cron: "0 21 * * *"   # 毎日 UTC 21:00 = JST 6:00
```

cron の書式は `分 時 日 月 曜日` です。

| 式 | 意味 |
|---|------|
| `"0 21 * * *"` | 毎日 UTC 21:00 |
| `"0 15 1 * *"` | 毎月 1 日 UTC 15:00 |
| `"30 9 * * 1-5"` | 平日 UTC 9:30 |

これを使って、**ブログ記事の予約投稿** を実現しています。記事の `date` フィールドが「今日以前」になった日のビルドで、自動的に記事が公開されます。

> 参考: [GitHub Actions ドキュメント — ワークフローのトリガー](https://docs.github.com/ja/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule)

#### ③ 月次バッチで動的データを自動更新

```yaml
# .github/workflows/update-stats.yml
name: Update Dynamic Stats

on:
  schedule:
    - cron: "0 15 1 * *"  # 毎月 1 日 JST 0:00
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Fetch stats and update JSON
        run: |
          # Qiita API から記事数を取得
          ITEMS=$(curl -sf "https://qiita.com/api/v2/users/teppei19980914" | jq '.items_count')
          # JSON ファイルを更新
          # → auto commit → push → deploy.yml が自動起動
```

**手動で数字を更新する必要がありません。** 毎月 1 日に自動で最新の数字に更新されます。

#### ④ PR 時の自動テスト + バージョン整合性チェック

[ユメハシ](/HomePage/ja/product/yumehashi/) では、**PR を出した時点で自動テストとバージョン整合性チェック**が走ります。

```yaml
# .github/workflows/test.yml（抜粋）
name: CI

on:
  pull_request:
    branches: [main]   # main への PR が対象

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter analyze        # 静的解析（エラー0件でないと失敗）
      - run: flutter test --coverage # 全テスト実行 + カバレッジ計測

  version-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0   # 全履歴が必要（main との比較のため）
      - name: Check version update (4-file set)
        run: |
          MAIN_VERSION=$(git show origin/main:pubspec.yaml | grep '^version:')
          PR_VERSION=$(grep '^version:' pubspec.yaml)
          if [ "$MAIN_VERSION" = "$PR_VERSION" ]; then
            echo "::error::バージョンが更新されていません"
            exit 1
          fi
```

**「テストを通さずにマージしてしまう」「バージョン更新を忘れたままリリースする」事故を完全に防止しています。**

#### ⑤ 週次ストレステスト + 閾値超過時の自動 Issue 起票

```yaml
# .github/workflows/stress-test.yml（抜粋）
name: Stress Test (Weekly)

on:
  schedule:
    - cron: '0 3 * * 0'   # 毎週日曜 12:00 JST
  workflow_dispatch:

permissions:
  contents: write   # 結果のコミット用
  issues: write     # Issue 自動作成用

jobs:
  stress-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter test test_stress/data_volume_stress_test.dart
        continue-on-error: true   # 失敗しても次のテストに進む
      - run: flutter test test_stress/rendering_stress_test.dart
        continue-on-error: true

      # 閾値超過があれば Issue を自動作成
      - uses: actions/github-script@v7
        with:
          script: |
            const report = JSON.parse(fs.readFileSync('test_stress/results/latest.json'));
            const failed = report.measurements.filter(m => !m.passed);
            if (failed.length > 0) {
              await github.rest.issues.create({
                owner: context.repo.owner,
                repo: context.repo.repo,
                title: `[Performance] ボトルネック検出`,
                labels: ['performance', 'bug'],
              });
            }
```

**「パフォーマンスが劣化したら自動で Issue が立つ」仕組みです。** 週に 1 回、誰も手を動かさなくても品質が監視されます。

#### ⑥ デプロイ時のバージョンスタンプ自動書き換え

```yaml
# .github/workflows/deploy.yml（抜粋）
- name: Sync version and stamp deploy timestamp
  run: |
    VERSION=$(grep '^version:' pubspec.yaml | sed 's/version: //' | sed 's/+.*//')
    sed -i "s|const appVersion = '.*';|const appVersion = '$VERSION';|" lib/app_version.dart
    DEPLOY_TIME=$(TZ=Asia/Tokyo date '+%Y/%m/%d')
    sed -i "s|const deployedAt = '.*';|const deployedAt = '$DEPLOY_TIME';|" lib/app_version.dart
```

**`sed` コマンドでソースコード内の定数を書き換え**、ビルド成果物にデプロイ日時を埋め込んでいます。

---

## Part 5: GitHub Pages — 「無料でサイトを公開する」

GitHub Pages は **Git リポジトリから直接 Web サイトを公開できる** 無料サービスです。

| 項目 | 内容 |
|------|------|
| **料金** | 無料（Public リポジトリ） |
| **URL** | `https://<ユーザー名>.github.io/<リポジトリ名>/` |
| **HTTPS** | 自動で有効（証明書も自動発行） |
| **カスタムドメイン** | 設定可能 |

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
| Git を触ったことがない | `git init` → `git add` → `git commit` を体験する |
| Git は使えるがブランチが怖い | `git checkout -b` でブランチを切って PR を出してみる |
| GitHub は使えるが Actions を知らない | 上の `deploy.yml` をコピーして自分のリポジトリで動かしてみる |
| Actions は知っているが CI/CD を組んだことがない | ユメハシの `test.yml`（PR 時の品質ゲート）を参考にしてみる |

## 関連記事

- [「テスト工程が消滅した」— AI 駆動開発 vs 従来開発を全工程で比較してみた](/HomePage/ja/blog/20260410-ai-driven-development/) — GitHub Actions を活用した CI/CD の実績データ
- [ユメハシの技術スタックと 5 つの実装課題](/HomePage/ja/blog/20260407-yumehashi-tech-stack/) — CI レース条件など GitHub Actions の実践的な課題と解決
- [Qiita CLI × Claude Code で記事管理を自動化した](/HomePage/ja/blog/20260420-qiita-cli-automation/) — GitHub Actions で予約投稿を実現した構築記録
