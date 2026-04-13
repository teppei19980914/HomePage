---
title: "個人開発アプリ『ユメハシ』の技術スタックと、v2.1.0 までに解決した5つの実装課題"
description: "Flutter Web + Drift + Riverpod + Firebase で月額 0 円運用する個人開発アプリ『ユメハシ』の技術スタックと、v2.1.0 までに解決した起動速度・データ肥大化・CI レース条件など 5 つの実装課題をコード付きで解説します。"
date: 2026-04-07
tags: ["Flutter", "Dart", "Drift", "Riverpod", "Firebase", "個人開発", "AI駆動開発"]
---

## はじめに

[ユメハシ（YumeHashi）](https://teppei19980914.github.io/YumeHashi/) は、夢を目標に、目標をタスクに分解して行動に変える Flutter Web アプリです。この記事では**技術的な裏側**にフォーカスします。

---

## 全体アーキテクチャ

```
[ブラウザ]
  ├── [ブラウザ内 SQLite]  ← マスターデータ（Drift ORM + WASM）
  ├── [Firestore]          ← クラウドバックアップ（JSON 全量同期）
  ├── [Firebase Auth]      ← 匿名認証 → メール連携
  ├── [Apps Script]        ← Stripe 決済プロキシ
  └── [GitHub Pages]       ← 静的ホスティング（月額 0 円）
```

ポイントは**データの主記憶がブラウザ内 SQLite** であること。Firestore は「バックアップ」なので、読み取り課金が DAU に比例しません。この設計で **DAU 3,000 人まで無料枠内**で運用できます。

### 主要技術スタック

| レイヤ | 技術 | 選定理由 |
|---|---|---|
| UI | Flutter (Dart) | 単一コードベースで Web / Windows 対応 |
| 状態管理 | Riverpod | コンパイル時依存解決、テスト容易 |
| ローカル DB | Drift (SQLite) | 型安全クエリ、WASM で Web 対応 |
| 認証 | Firebase Auth | 匿名 → メール連携のシームレス移行 |
| 決済 | Stripe (via Apps Script) | クライアントに秘密鍵を持たせない |

### インフラコスト

運用 1 年で**月額 0 円**を維持。唯一のコスト変動要因は Firestore の書き込み回数で、DAU 3,000 人が閾値です。

### なぜ Flutter Web を選んだか

| 候補 | メリット | デメリット |
|---|---|---|
| **Flutter Web** | マルチプラットフォーム、宣言的 UI | 初回ロードが重い |
| React + Next.js | Web 最適化 | モバイルは別途必要 |

リッチな UI（タイムライン、星座ダッシュボード）を多用するため Flutter Web を選択。初回ロードの重さは課題 #1 で対処しました。

---

## v2.1.0 までに解決した 5 つの実装課題

### 課題 #1: 初回アクセスが遅い（6〜10 秒）

HAR ファイルで計測したところ、キャッシュありでも First Paint まで 3.4 秒。コールドスタートでは 6〜10 秒。

**原因:** Apps Script の Stripe 検証が 1.8 秒かかり、直列依存チェーンのブロッカーになっていた。

**解決策:**
1. キャッシュされたプレミアム状態を `runApp()` 前に同期適用（外部通信を待たない）
2. 外部通信を `addPostFrameCallback` で初回描画後に遅延実行
3. `index.html` に preconnect / preload ヒントを追加

### 課題 #2: 受信ボックスのデータ肥大化

運用 1 年で蓄積された通知がメモリと Firestore を圧迫。**解決策:** 「既読かつ 30 日経過した通知は物理削除」ポリシーを導入。未読通知は期間にかかわらず保護する設計が重要です。

### 課題 #3: 完了タスクの増大

10 ヶ月運用した実機でタスク一覧の描画が体感で重くなり始めた。**解決策:** 完了タスクをデフォルト非表示 + 30 日経過で物理削除。`DataRetentionService` が起動時に 1 回実行。ユーザーへの事前告知として FAQ に「残したいデータは事前にエクスポートを」を追加。

### 課題 #4: 重複告知

**原因:** `announcements.json` から削除したエントリが DB に残り続けていた。

**解決策:** JSON を「唯一のソース」として扱い、JSON にない dedup_key を持つ通知を DB から削除。

### 課題 #5: CI のバージョンチェックがレース条件で誤検知

**原因:** GitHub Actions のキュー遅延でマージ後に CI が走り、main と PR のバージョンが一致して誤判定。

**解決策:** `git merge-base --is-ancestor` で「すでにマージ済み」を検出し、version-check をスキップ。

---

## AI 駆動開発の実績

| 項目 | 数値 |
|---|---|
| 初回リリースまで | 3 週間（未経験の Flutter/Dart から） |
| テスト件数 | 847 件 |
| ソースコード行数 | 約 30,000 行 |

アプリは [ユメハシ（YumeHashi）](https://teppei19980914.github.io/YumeHashi/) で試せます。リポジトリは [GitHub](https://github.com/teppei19980914/YumeHashi) で公開しています。

## 関連記事

- [『ユメログ』から『ユメハシ』へ — 夢と現実のあいだに、橋を架ける](/HomePage/ja/blog/20260408-yumehashi-story/) — アプリ改名の経緯と開発哲学
- [Firestore 無料枠を先延ばしするためにやった 4 つのこと](/HomePage/ja/blog/20260409-yumehashi-cost-optimization/) — gzip 圧縮・デバウンス・format バージョニング
- [AI 駆動開発 vs 従来開発の全工程比較](/HomePage/ja/blog/20260410-ai-driven-development/) — 3 週間でアプリを作った実績データ
