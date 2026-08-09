# Blog Draft Generator（NewtonX連携）

ブログ記事の「たたき台」を NewtonX の AI アシスタントに渡して ja/en 2言語のドラフトを
生成し、レビュー・編集してから `src/content/blog/{ja,en}/` に書き込むローカル GUI。

commit と push はこのツールでは行わない。CLAUDE.md のルール通り、内容を確認のうえ
ユーザーが手動で実施する。

## 前提

- NewtonX の PAT 設定が済んでいること（`~/.newtonx/config.json`）。未設定の場合:
  ```bash
  myvenv\Scripts\python.exe newtonx_adk\tools\setup_config.py
  ```
- リポジトリ直下に Python 仮想環境 `myvenv/` がある前提（既に `newtonx-adk` インストール済み）。

## セットアップ

```bash
myvenv\Scripts\pip.exe install -r tools\blog-generator\requirements.txt
```

## 起動

```bash
myvenv\Scripts\streamlit.exe run tools\blog-generator\app.py --server.address localhost
```

ブラウザで `http://localhost:8501` が開く。`--server.address localhost` を付けない場合、
Streamlit は既定でLAN内から到達可能なアドレスにもバインドする（NewtonXのPATを扱うツールのため、
信頼できないネットワーク上では付けておくことを推奨）。

## 使い方

1. サイドバーでアシスタント・公開日（既存最新日 + 2〜4日）を確認する
2. たたき台のテキストを貼り付けて「NewtonX で生成」を押す
3. ja / en タブでタイトル・description・tags・本文を確認・編集する
   （下部にリアルタイムで SEO チェック結果が出る: 文字数・内部リンク実在確認・裸URL・読了時間など）
4. slug（英語のファイル名部分）を確認し、「src/content/blog/ に書き込む」を押す
5. 「npm test -- blog-calendar」「astro check」「npm run build」を実行して結果を確認する
6. 問題なければ `git status` の内容を見ながら、**自分で** `git add` / `git commit` / `git push` する

## 内部リンクの hallucination 対策

プロンプトには既存記事の一覧（stem・title・description の先頭60文字）を埋め込み、
「この一覧に実在する stem 以外は使わない」よう指示している。書き込み前のチェックでも
本文中の `/HomePage/{lang}/blog/{stem}/` を抽出し、実在するファイルと突き合わせて検証する
（`checks.check_internal_links`）。

## ファイル構成

- `app.py` — Streamlit 本体
- `blog_repo.py` — 既存記事の読み取り・frontmatter 組み立て・ファイル書き込み・npm実行
- `checks.py` — SEO/品質チェック（reading-time.ts のロジック移植を含む）
- `newtonx_gen.py` — NewtonX ADK 呼び出し（終端マーカー方式での継続取得、JSON抽出）
- `prompts.py` — 生成プロンプトのテンプレート（ルールを変えたい場合はここを編集）
