# Claude Code アカウント切り替え手順書

会社メールアドレスで契約している Claude Code を個人メールアドレスの契約に切り替える際、過去の会話履歴・MEMORY・設定をすべて引き継ぐための手順書。

## 前提

- **GitHub**: 個人アカウントを使用中 → **影響なし**。リポジトリ・コミット履歴・PR は GitHub 側に保存されており、Claude Code のアカウント切り替えとは無関係。
- **Claude Code**: 現在は勤務先で支給された会社メールでログイン。経費支払いが終わる前に個人メールへ移行する必要がある。
- **会話履歴の実体**: Claude Code の会話履歴・MEMORY は **ローカル PC のファイル** として保存されており、Anthropic サーバー側のアカウントには紐づかない。したがって「同じ PC 上で新アカウントにログインし直す」だけで履歴は維持される。

## 保存場所一覧

すべて `$env:USERPROFILE\.claude\` 配下に保存されている。

| パス | 内容 | 引き継ぎ必須度 |
|---|---|---|
| `.claude\projects\c--Users-<UserName>-GitHub-Private-HomePage\*.jsonl` | このリポジトリの会話履歴（全セッション） | ★★★ |
| `.claude\projects\c--Users-<UserName>-GitHub-Private-HomePage\memory\MEMORY.md` | 永続メモリのインデックス | ★★★ |
| `.claude\projects\c--Users-<UserName>-GitHub-Private-HomePage\memory\*.md` | 個別メモリファイル（user / feedback / project / reference） | ★★★ |
| `.claude\projects\<他プロジェクト>\` | 他リポジトリの会話履歴 | ★★☆ |
| `.claude\settings.json` | CLI 全体設定 | ★★☆ |
| `.claude\history.jsonl` | グローバルコマンド履歴 | ★☆☆ |
| `.claude\todos\` | TodoWrite の状態 | ★☆☆ |
| `.claude\plans\` | プラン履歴 | ★☆☆ |
| `.claude\plugins\` | インストール済みプラグイン | ★★☆ |
| `.claude\shell-snapshots\` | シェル環境スナップショット | ★☆☆ |

**ポイント**: 重要なのは `projects\` と `settings.json`。この 2 つさえバックアップされていれば、最悪の事態でも履歴は復元可能。

## 切り替え手順

### Step 1. 事前バックアップ（必須）

新アカウント登録前に、`.claude` ディレクトリ全体を zip 化して別フォルダに保管する。

```powershell
# PowerShell で実行

# 1. 保管先ディレクトリを作成(存在しない場合のみ)
New-Item -ItemType Directory -Path "$env:USERPROFILE\Backup" -Force | Out-Null

# 2. 壊れたシンボリックリンクを削除(debug\latest が古い診断ログを指して
#    dangling link になっていると Compress-Archive が失敗するため)
Remove-Item "$env:USERPROFILE\.claude\debug\latest" -Force -ErrorAction SilentlyContinue

# 3. 重要データのみを zip 化(debug/ cache/ shell-snapshots/ など
#    再生成可能な診断データは除外)
$items = @(
  "$env:USERPROFILE\.claude\projects",
  "$env:USERPROFILE\.claude\settings.json",
  "$env:USERPROFILE\.claude\history.jsonl",
  "$env:USERPROFILE\.claude\todos",
  "$env:USERPROFILE\.claude\plans",
  "$env:USERPROFILE\.claude\plugins"
) | Where-Object { Test-Path $_ }

Compress-Archive -Path $items `
  -DestinationPath "$env:USERPROFILE\Backup\claude-backup-$(Get-Date -Format 'yyyyMMdd').zip" `
  -Force
```

**除外している理由**:
- `debug\` `cache\` `statsig\` `telemetry\` `shell-snapshots\` `session-env\` — 診断・キャッシュ用途で再生成される。会話履歴は含まれない
- `file-history\` `downloads\` `backups\` — 編集履歴や一時ファイル。必要なら個別に追加可

保管先の例:
- `$env:USERPROFILE\Backup\` （ローカル）
- OneDrive / Google Drive の個人アカウント（クラウド）
- 外付け SSD / USB

**重要**: バックアップ zip は個人アカウントのクラウドに置くこと。会社アカウントのクラウドに置いてしまうと、経費停止時にアクセスできなくなる。

### Step 2. 現アカウントの契約状況を記録

後で比較・検証できるように、以下をスクリーンショット or テキストで残しておく。

- 現在のプラン（Pro / Team / Enterprise 等）
- 残クレジット・次回請求日
- ログイン中メールアドレス
- `claude --version` の出力

```powershell
claude --version > "$env:USERPROFILE\Backup\claude-version-before.txt"
```

### Step 3. 新アカウント登録（個人メール）

1. ブラウザで <https://claude.ai/> にアクセス
2. 個人メールアドレスで新規アカウントを作成
3. 必要に応じて Pro / Max プランを契約（支払いは個人カード）

**注意**: 会話履歴やクレジットは **アカウント間で移行できない**。新アカウントは真っさらな状態から始まる。ただし、過去のローカル会話履歴は PC 上に残っているので Claude Code CLI 経由では引き続き参照可能。

### Step 4. Claude Code CLI からログアウト

```bash
claude logout
```

これで現在の会社アカウントのトークンが削除される。**この時点で `.claude\projects\` や `memory\` は削除されない** ので安心。

### Step 5. 新アカウントでログイン

```bash
claude login
```

ブラウザが開くので、個人メールで作成したアカウントでサインインする。

### Step 6. 動作検証

1. `cd $env:USERPROFILE\GitHub\Private\HomePage` でリポジトリに移動
2. `claude` で対話を開始
3. 過去のセッションが `--resume` オプションで復元できることを確認
   ```bash
   claude --resume
   ```
4. MEMORY が正しく読み込まれていることを確認（「ユーザープロフィールを覚えていますか？」等と聞いてみる）
5. `docs/Operation/` 等のファイルを読めるか検証

### Step 7. 会社アカウントの解約

動作検証が完了してから、**会社アカウント側を解約する**。順序を逆にすると、万が一新アカウントで問題が起きた際にロールバックできない。

- Anthropic Console にログイン（会社メール）
- Billing → Cancel subscription
- 経費担当に解約完了を連絡

## 他リポジトリ（ユメハシ / Defrago 等）の扱い

**同じ作業を繰り返す必要はない**。`.claude\projects\` には PC 上の全プロジェクトがフラットに並んでおり、1 回の zip バックアップで全リポジトリの履歴・MEMORY が含まれる。ログインも `claude logout` / `claude login` は CLI 全体の認証切り替えなので PC 単位で 1 回だけで OK。

切り替え後、各リポジトリで **動作検証だけ** 実施する:

```powershell
cd "$env:USERPROFILE\GitHub\Private\YumeHashi"
claude --resume

cd "$env:USERPROFILE\GitHub\Private\Defrago"
claude --resume
```

カレントディレクトリに応じて `.claude\projects\c--...-<プロジェクト名>\` が自動参照されるため、`cd` して起動するだけで対応する履歴・MEMORY が読み込まれる。

## 引き継ぎの仕組み（なぜ履歴が残るのか）

Claude Code の会話履歴は **完全にローカルファイル** として保存されている。具体的には:

```
.claude\projects\c--Users-<UserName>-GitHub-Private-HomePage\
  ├── <session-uuid>.jsonl     ← 各セッションの会話ログ
  ├── <session-uuid>\          ← ツール実行結果等
  └── memory\
      ├── MEMORY.md             ← メモリインデックス
      ├── user_profile.md
      ├── project_homepage.md
      └── feedback_no_hardcoding.md
```

ディレクトリ名はカレントディレクトリの絶対パスをエスケープしたもの（`c--Users-<UserName>-GitHub-Private-HomePage`）なので、**同じ PC の同じパスで `claude` を起動する限り、どのアカウントでログインしていても同じ履歴が読み込まれる**。

つまり:
- アカウント = Anthropic サーバーの認証情報 + 課金情報
- 会話履歴 = ローカル PC のファイル

この 2 つは独立しているため、アカウント切り替えで履歴が消えることはない。

## トラブルシューティング

### 新アカウントログイン後に履歴が見えない

1. `$env:USERPROFILE\.claude\projects\` の存在確認
2. カレントディレクトリが `$env:USERPROFILE\GitHub\Private\HomePage` であることを確認（別パスで起動すると別のプロジェクトディレクトリが作られる）
3. バックアップ zip から復元:
   ```powershell
   Expand-Archive -Path "$env:USERPROFILE\Backup\claude-backup-YYYYMMDD.zip" `
     -DestinationPath "$env:USERPROFILE\" -Force
   ```

### MEMORY が反映されない

`MEMORY.md` は会話開始時に自動読み込みされる。読み込まれていない場合は:
1. `.claude\projects\c--...\memory\MEMORY.md` の存在確認
2. ファイル内容が壊れていないか確認
3. Claude Code を再起動

### CLI が古いバージョンで起動する

```bash
npm update -g @anthropic-ai/claude-code
```

## 推奨タイミング

- **経費停止の 1 ヶ月前** に個人アカウントを登録し、2 アカウント並行期間を確保
- 並行期間中に個人アカウントでの動作検証を完了させる
- 経費停止日の数日前に会社アカウントを解約

2 アカウント並行させる利点: 万が一個人アカウント側で課金トラブルが起きても、会社アカウントにすぐ戻せる。

## チェックリスト

- [ ] `.claude` ディレクトリ全体を zip でバックアップ
- [ ] バックアップを個人クラウド / 外部ストレージに保管
- [ ] 現プランの契約状況を記録
- [ ] 個人メールで新アカウント登録 + プラン契約
- [ ] `claude logout` 実行
- [ ] `claude login` で新アカウントログイン
- [ ] HomePage リポジトリで `claude --resume` が動作することを確認
- [ ] MEMORY が正しく読み込まれることを確認
- [ ] 会社アカウント解約
- [ ] 経費担当への連絡
