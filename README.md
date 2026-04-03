# Claude Code Level 5 テンプレート

新しいリポジトリに Claude Code の運用環境（Level 5）を即座にセットアップするためのテンプレートです。

## テンプレートの内容

```
ClaudeCodeTemplate/
├── README.md              # 本ファイル（運用手順）
├── setup.sh               # 対話式セットアップスクリプト
├── CLAUDE.md              # プロジェクトルール（テンプレート）
└── .claude/
    ├── settings.json      # 許可設定 + Hooks
    ├── skills/
    │   ├── fix-issue.md   # 問題修正スキル（/fix-issue）
    │   ├── release.md     # リリーススキル（/release）
    │   ├── check-deploy.md # デプロイ確認スキル（/check-deploy）
    │   └── update-labels.md # ラベル更新スキル（/update-labels）
    └── agents/
        ├── security-reviewer.md    # セキュリティレビュー
        ├── performance-reviewer.md # パフォーマンスレビュー
        └── label-checker.md        # ハードコード文字列検出
```

## セットアップ手順

### 方法1: スクリプトで自動セットアップ（推奨）

```bash
# 1. 新しいリポジトリに移動
cd /path/to/new-repo

# 2. セットアップスクリプトを実行
bash "C:\Users\SF02512\GitHub\Private\ClaudeCodeTemplate\setup.sh"
```

対話形式でプロジェクト情報を入力すると、テンプレートがコピーされプレースホルダが自動置換されます。

```
=== Claude Code Level 5 セットアップ ===
プロジェクト名 (例: ユメログ): MyProject
技術スタック (例: Flutter / Dart): Python / FastAPI
テストコマンド (例: flutter test): pytest
静的解析コマンド (例: flutter analyze): ruff check .
ビルドコマンド (例: flutter build web): docker build .
フォーマットコマンド (例: dart format --fix): ruff format
プロジェクトの絶対パス: C:\Users\SF02512\GitHub\Private\MyProject
```

### 方法2: 手動コピー

```bash
# 1. ファイルをコピー
cp -r "C:\Users\SF02512\GitHub\Private\ClaudeCodeTemplate\.claude" /path/to/new-repo/
cp "C:\Users\SF02512\GitHub\Private\ClaudeCodeTemplate\CLAUDE.md" /path/to/new-repo/

# 2. プレースホルダを手動で置換（全ファイル内の以下を書き換え）
```

## プレースホルダ一覧

テンプレート内の `{{...}}` をプロジェクトに合わせて書き換えてください。

| プレースホルダ | 説明 | Flutter の例 | Python の例 |
|---|---|---|---|
| `{{PROJECT_NAME}}` | プロジェクト名 | ユメログ | MyAPI |
| `{{TECH_STACK}}` | 技術スタック | Flutter / Dart | Python / FastAPI |
| `{{TEST_COMMAND}}` | テスト実行 | `flutter test` | `pytest` |
| `{{ANALYZE_COMMAND}}` | 静的解析 | `flutter analyze` | `ruff check .` |
| `{{BUILD_COMMAND}}` | ビルド | `flutter build web` | `docker build .` |
| `{{FORMAT_COMMAND}}` | フォーマット | `dart format --fix` | `ruff format` |
| `{{PROJECT_DIR}}` | 絶対パス | `c:\Users\...\GrowthEngine` | `/home/user/myapi` |

## セットアップ後の構成

新しいリポジトリに以下が作成されます（テンプレート自体はコピーされません）:

```
new-repo/
├── CLAUDE.md              # プロジェクトルール（毎セッション自動読み込み）
└── .claude/
    ├── settings.json      # 許可設定 + Hooks
    ├── skills/            # スキル（4ファイル）
    └── agents/            # エージェント（3ファイル）
```

## 各レベルの機能

| Level | 構成 | 機能 | トークン効果 |
|---|---|---|---|
| **2** | CLAUDE.md | ルール自動読み込み | 基準 |
| **3** | + Skills | `/fix-issue` 等でオンデマンド手順注入 | -64% |
| **4** | + Hooks | 自動フォーマット + セッション終了時チェック | -67% |
| **5** | + Agents | セキュリティ/パフォーマンス並行レビュー | **-70%** |

## Skills の使い方

| コマンド | 用途 |
|---|---|
| `/fix-issue` | 問題の調査・修正 + 全チェック実施 |
| `/release` | バージョンアップ・リリース作業 |
| `/check-deploy` | CI/CDデプロイ失敗の調査・修正 |
| `/update-labels` | ラベル・メッセージの変更と横展開 |

## Hooks の動作

### PostToolUse（ファイル編集ごと）

ファイル編集後に自動フォーマットを実行します。

### Stop（セッション終了時）

以下が自動実行され、問題があれば報告されます:

1. **静的解析** — 静的解析コマンドを実行
2. **テスト** — テストコマンドを実行
3. **AIチェック** — 横展開/セキュリティ/パフォーマンス/テスト整合性/ドキュメント更新を確認

## Agents の使い方

| 指示例 | 起動するAgent |
|---|---|
| 「セキュリティチェックして」 | security-reviewer |
| 「パフォーマンスチェックして」 | performance-reviewer |
| 「ハードコードの文字列が残ってないかチェック」 | label-checker |

## カスタマイズ

### スキルの追加

`.claude/skills/` に新しい `.md` ファイルを作成:

```markdown
---
name: my-skill
description: スキルの説明
---

# スキル名

## 手順
1. ...
```

### エージェントの追加

`.claude/agents/` に新しい `.md` ファイルを作成:

```markdown
---
name: my-agent
description: エージェントの説明
tools:
  - Read
  - Grep
  - Bash
---

# エージェント名

## チェック項目
1. ...
```

### Hook の追加

`.claude/settings.json` の `hooks` セクションに追記。

## テンプレートの更新

テンプレート自体を改善した場合は、このリポジトリを更新してください。既存プロジェクトへの反映は各プロジェクト側で手動実施します。

## 元プロジェクト

このテンプレートは [GrowthEngine（ユメログ）](https://github.com/teppei19980914/GrowthEngine) の開発運用から抽出されました。
