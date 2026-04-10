---
title: "個人開発アプリ『ユメハシ』の技術スタックと、v2.1.0 までに解決した5つの実装課題"
description: "Flutter Web + Drift(SQLite WASM) + Riverpod + Firebase のサーバーレス構成で月額 0 円運用している個人開発アプリ『ユメハシ』。起動速度・データ肥大化・CI レース条件など v2.1.0 までに直面した 5 つの実装課題と解決策を、コード付きで振り返ります。"
date: 2026-04-07
tags: ["Flutter", "Dart", "Drift", "Riverpod", "Firebase", "個人開発", "AI駆動開発", "パフォーマンス"]
---

## はじめに

[ユメハシ（YumeHashi）](https://teppei19980914.github.io/YumeHashi/) は、夢を目標に、目標をタスクに分解して行動に変える個人開発の Flutter Web アプリです。2026 年 4 月に旧名「ユメログ」から改名し、現在 v2.1.0 まで運用しています。

この記事では、アプリそのものの紹介ではなく **技術的な裏側** にフォーカスします。

- 採用した技術スタックとその選定理由
- サーバーレス × 無料枠 0 円運用のインフラ構成
- 運用を続ける中で直面した 5 つの実装課題と、その解決策

個人開発で「コスト 0 円」「サーバーレス」「Flutter Web」のどれか 1 つでも検討している方の参考になれば嬉しいです。

---

## 1. 全体アーキテクチャ

```
[ユーザー (ブラウザ)]
      │ HTTPS
      ▼
[GitHub Pages] ──── Flutter Web ビルド成果物（静的ホスティング）
      │
      ├── [Firebase Auth]      匿名認証 → メール連携
      ├── [Firestore]          JSON 全量同期（3秒デバウンス + SHA-256 差分検出）
      ├── [Google Apps Script] Stripe 決済プロキシ / フィードバック受付
      │         └── [Stripe]   月額 200 円サブスクリプション
      ├── [GitHub Gist API]    リモート設定（招待コード・ユーザー設定）
      └── [ブラウザ内 SQLite]  Drift ORM + drift_worker.js（WASM）
```

ポイントは **データの主記憶はブラウザ内 SQLite** にあることです。Firestore は「全量 JSON のクラウドバックアップ」として利用しており、読み書きの大部分はローカルで完結します。これにより Firestore の無料枠（書き込み 20,000 回/日）を DAU 3,000 人規模まで消費しません。

### 技術スタック一覧

| レイヤ | 技術 | バージョン | 選定理由 |
|---|---|---|---|
| UI フレームワーク | Flutter | 3.27+ | 単一コードベースで Web / Windows 対応、宣言的 UI |
| 言語 | Dart | ^3.11 | 強い型、null safety、pub.dev エコシステム |
| 状態管理 | Riverpod | ^2.5 | コンパイル時依存解決、テスト容易性 |
| ローカル DB | Drift (SQLite) | ^2.18 | 型安全なクエリビルダ、WASM で Web 対応 |
| ルーティング | go_router | ^14.0 | 宣言的 URL、Web の履歴対応 |
| グラフ | fl_chart | ^0.68 | 星座ダッシュボード・統計で活躍 |
| 認証 | firebase_auth_web | ^5.12 | 匿名 → メール連携のシームレス移行 |
| 同期 | cloud_firestore_web | ^4.x | JSON 一括 put/get で十分 |
| 決済 | Stripe (via Apps Script) | — | クライアントに秘密鍵を持たせない |

### インフラのコスト試算

運用 1 年経過時点で **月額コスト 0 円** を維持できています。

| サービス | 無料枠 | 現在の使用量 | コスト発生閾値 |
|---|---|---|---|
| GitHub Pages | 1 GB 帯域/月 | ~100 MB | 超大規模アクセスのみ |
| Firebase Auth | 50,000 回/月 | 数百回 | 同上 |
| Firestore 書き込み | 20,000 回/日 | 数百回 | **DAU 3,000 人** |
| Firestore ストレージ | 1 GB | 数 MB | 同上 |
| Google Apps Script | URL Fetch 20,000 回/日 | 数十回 | 個人利用では実質無制限 |
| GitHub Actions | 2,000 分/月 | 200〜300 分 | 超大規模のみ |

「唯一のコスト変動要因は Firestore」という設計が、無料枠運用の鍵になっています。

---

## 2. なぜこの技術スタックにしたのか

### なぜ Flutter Web か — React + Next.js ではなく

「個人開発で未経験技術を 3 週間で習得する」制約の中で、以下を評価しました。

| 候補 | メリット | デメリット |
|---|---|---|
| **Flutter Web** | マルチプラットフォーム展開可、宣言的 UI、Dart が静的型付きで堅い | Web の初回ロードが重い（CanvasKit 5.5 MB） |
| React + Next.js | Web に最適化、SSR 対応 | モバイルは React Native が別途必要 |
| PWA (HTML/JS) | 軽量、学習コスト低 | 複雑な UI 構築が困難 |

ユメハシではスケジュールのタイムライン表示、星座ダッシュボード、ドラッグ並び替えなど **リッチな UI** を多用します。さらに将来的な Windows デスクトップ展開も視野に入れていたため、Flutter Web を選びました。初回ロードの重さは後述のクリティカルパス最適化で緩和しています。

### なぜ Drift SQLite（Firestore 直読みではない）か

Firestore を主記憶にすると以下の問題が発生します。

- **読み取り料金が DAU に比例**して発生する（1 ユーザーがタスク一覧を開くだけで数十回の read）
- オフライン動作が弱い
- 複雑な JOIN・集計（実施率計算・連続記録判定）がクライアント側で非効率

そこで **ブラウザ内 SQLite をマスタ**、**Firestore をバックアップ** という役割分担にしました。同期は `SyncManager` が 3 秒デバウンス + SHA-256 ハッシュ比較で実施し、変更がない場合は書き込みゼロです。

### なぜ Apps Script を Stripe のプロキシにするか

- Stripe の API キーをクライアントに持たせられない
- Cloud Functions / Lambda を使うと最低料金や常駐コストがかかる
- Google Apps Script は **URL Fetch 20,000 回/日** の無料枠があり、個人開発の Stripe 検証用途なら十分

Apps Script を CORS プロキシ兼シークレット金庫として利用し、「Checkout Session 作成」「契約状態検証」「Customer Portal URL 取得」を代行させます。ただしこの設計には代償があり、これが後述の課題 #1（起動時の遅延）の主因になります。

---

## 3. v2.1.0 までに解決した 5 つの実装課題

運用を続ける中で実際に直面した課題と、その解決策を紹介します。いずれもユーザーの不満や計測結果からの逆算で修正したもので、机上の空論ではありません。

### 課題 #1: 初回アクセスの体感速度が遅い

**症状:** 開発者ツールで計測したところ、キャッシュ温存状態でも First Paint まで 3.4 秒、コールドスタート推定 6〜10 秒。

**原因:** HAR ファイルをダンプして集計した結果、以下の **直列依存チェーン** が判明しました。

```
+0   ms  HTML 取得
+84  ms  flutter_bootstrap.js
+227 ms  canvaskit.wasm (5.5 MB、cache hit でも 453ms)
+242 ms  main.dart.js (4.1 MB)
+640 ms  Flutter 起動完了、フォント取得
+842 ms  Firebase JS 取得
+1032 ms identitytoolkit/lookup (匿名認証)
+1096 ms getProjectConfig (755ms)
+1339 ms script.google.com/exec (1.3s) ← Apps Script の Stripe 検証
+2680 ms script.googleusercontent.com (489ms) ← Apps Script のリダイレクト先
+3416 ms 全データ同期完了
```

最大のブロッカーは **Apps Script 呼び出しの 1.8 秒** でした。Google のサーバーレスランタイムはコールドスタートが遅く、さらに 302 リダイレクトで往復するため、単発でも 1.3〜1.8 秒かかります。

**解決策:** 3 段階で対応しました。

#### (1) キャッシュされたプレミアム状態を `runApp()` 前に同期適用

`lib/services/startup_premium_sync.dart` を新設しました。

```dart
void applyCachedPremiumState(SharedPreferences prefs) {
  final stripeService = StripeService(prefs);
  if (stripeService.isSubscriptionActive) {
    setSubscriptionPremium(enabled: true);
  }
  if (stripeService.isTrialActive) {
    setTrialPremium(enabled: true);
  }
}
```

ポイントは **「有効化のみ」を行い、「無効化」はサーバー検証に委ねる** こと。これによって、別端末で契約したユーザーを誤って非プレミアム扱いする事故を防ぎます。

#### (2) 外部通信を `addPostFrameCallback` 経由で遅延実行

```dart
runApp(...);

WidgetsBinding.instance.addPostFrameCallback((_) {
  _initRemoteConfigAsync(prefs, container);
  _initInviteCodeAsync(prefs);
  _verifySubscriptionAsync(prefs);
  _initAnonymousAuth();
  _runDataRetentionCleanup(container);
});
```

Stripe 検証・Firebase Auth・リモート設定の取得を初回フレーム描画の **後** に回すことで、First Paint がネットワーク競合の影響を受けなくなります。

#### (3) `index.html` に preconnect / preload ヒントを追加

```html
<link rel="preconnect" href="https://www.gstatic.com" crossorigin>
<link rel="preconnect" href="https://firestore.googleapis.com">
<link rel="preconnect" href="https://identitytoolkit.googleapis.com">
<link rel="dns-prefetch" href="https://script.google.com">
<link rel="preload" href="main.dart.js" as="script">
```

ブラウザへの取得指示のみで動作への影響はゼロ。コールドスタートで 1〜2 秒の短縮を見込めます。

**結果:** プレミアムユーザーが起動直後に有料機能へアクセスした際の「一瞬ロックされる」問題が完全に解消しました。

---

### 課題 #2: 受信ボックスのデータ肥大化

**懸念:** 運用 1 年で蓄積したタスク・通知が増え続けると、描画パフォーマンスの劣化と Firestore 書き込み量の増加が起こります。特に受信ボックス通知は、リリース告知を毎回追加する運用だったため、既読通知がメモリを圧迫していました。

**解決策:** 「既読かつ作成から 30 日経過した通知は物理削除」するポリシーを導入しました。

```dart
// NotificationDao に追加
Future<int> deleteReadNotificationsOlderThan(DateTime threshold) {
  return (delete(notifications)
        ..where((t) => t.isRead.equals(true))
        ..where((t) => t.createdAt.isSmallerThanValue(threshold)))
      .go();
}
```

**未読通知は期間にかかわらず保護** する設計が重要です。ユーザーが見逃した重要な情報を消してしまうと不信感を招きます。

### 課題 #3: 完了タスクのデータ増大

**懸念:** タスクのステータスが `completed` になった後もレコードは残り続け、スケジュール画面に表示され続けます。10 ヶ月運用した実機テストでは、タスク一覧の描画が体感で重くなり始めました。

**解決策:** 二段構えで対応しました。

#### (a) 完了タスクをデフォルト非表示にするフィルタ

```dart
// ganttTasksProvider
if (!showCompleted) {
  tasks = tasks
      .where((t) => t.status != TaskStatus.completed && t.progress < 100)
      .toList();
}
```

メニューから切り替え可能で、`SharedPreferences` で永続化します。**デフォルトで非表示** にすることで、タスク数が増えても描画パフォーマンスが劣化しない設計です。

#### (b) 30 日経過した完了タスクの物理削除

```dart
// TaskDao に追加
Future<int> deleteCompletedOlderThan(DateTime threshold) {
  return (delete(tasks)
        ..where((t) => t.status.equals('completed'))
        ..where((t) => t.updatedAt.isSmallerThanValue(threshold)))
      .go();
}
```

**ユーザーへの事前告知が必須** なので、FAQ に「残したいデータは事前にエクスポートを」という項目を追加しました。`DataRetentionService` が起動時に 1 回だけ実行します。

### 課題 #4: 受信ボックスで重複告知が発生する

**症状:** `announcements.json` から旧エントリを削除したにもかかわらず、既存ユーザーの受信ボックスには古い通知が残り続けていました。

**原因:** `syncSystemNotificationsFromJson` が **新規追加のみ** を行い、JSON から削除されたエントリを DB から除去する処理がなかったためです。

```dart
// 修正前: 新規のみ insert
if (await _notificationDao.existsByDedupKey(dedupKey)) continue;
// ...insert
```

**解決策:** 「`announcements.json` を受信ボックスの **唯一のソース** として扱う」ように仕様変更しました。

```dart
// 修正後: JSON にない dedup_key を持つシステム通知を DB から削除
final jsonDedupKeys = items
    .map((e) => e['dedup_key']?.toString() ?? '')
    .where((k) => k.isNotEmpty)
    .toSet();

await _notificationDao.deleteByTypeWhereDedupKeyNotIn(
  NotificationType.system.value,
  jsonDedupKeys,
);
```

`NotificationType.system` のみを対象にすることで、リマインダー・実績通知などの **dedup_key を持たない別種類の通知** は影響を受けません。単純に見えますが、「どの範囲を削除するか」の線引きで小さなリグレッションを起こしやすい箇所です。

### 課題 #5: CI のバージョンチェックがレース条件で誤検知する

**症状:** PR マージ後に CI が赤 X を出す。

**原因:** CI の `version-check` ジョブが `origin/main` の `pubspec.yaml` と PR ブランチの `pubspec.yaml` を比較する設計になっていました。GitHub Actions のキュー遅延で CI 実行が merge 後になると、origin/main はすでにマージ済みの内容になっており、両者の version が一致して「バージョンが更新されていない」と誤判定します。

```
00:58:06 PR #3 作成
00:58:20 PR #3 マージ完了 (14 秒後)
00:58:23 Deploy 成功 ✅
00:59:36 CI (version-check) がやっと開始（キュー待ち）
01:03:23 CI 失敗 ❌ ← main と PR が両方 2.0.0
```

**解決策:** 「PR の HEAD SHA がすでに `origin/main` に含まれている場合は version-check をスキップする」ようにしました。

```yaml
# .github/workflows/test.yml
- name: Check version update
  run: |
    if git merge-base --is-ancestor HEAD origin/main 2>/dev/null; then
      echo "PR is already merged, skipping version check"
      exit 0
    fi
    # 通常のバージョンチェック...
```

`git merge-base --is-ancestor` で「現在のコミットが main の祖先かどうか」を判定できます。マージ後であれば HEAD は必ず main の祖先になるので、ここで早期リターンします。

---

## 4. AI 駆動開発の実績

ユメハシは **Claude Code による AI 駆動開発** で構築しました。主要な数字をまとめます。

| 項目 | 数値 |
|---|---|
| 初回リリースまでの期間 | 3 週間（未経験の Flutter/Dart から） |
| 現在のバージョン | v2.1.0 |
| テスト件数 | 847 件（単体 + Widget + 統合） |
| ソースコード行数 | 約 30,000 行（lib/ + test/） |
| コミット数 | 160+ |
| ドキュメント | REQUIREMENTS / SPECIFICATION / DESIGN / OPERATIONS / INFRASTRUCTURE の 5 点セット + lessons-learned |

AI 駆動開発の肝は「AI に丸投げしない」ことです。具体的には以下のルールを守っています。

- **CLAUDE.md に運用ガイドを集約** — レベル最適化で 150 行以内に維持
- **Skills / Hooks / Agents の使い分け** — 繰り返し作業は Skills、品質ゲートは Hooks、並行レビューは Agents
- **テスト必須** — ソースコード変更はテスト追加・修正とセットでしかコミットしない
- **ドキュメント同時更新** — 変更は必ず該当する docs/ ファイルに反映する

---

## 5. まとめと今後

この記事では以下を紹介しました。

1. **アーキテクチャ** — Flutter Web + Drift + Riverpod + Firebase + Apps Script のサーバーレス構成
2. **コスト** — 月額 0 円を維持する無料枠設計
3. **技術選定の理由** — Flutter Web / Drift SQLite / Apps Script プロキシ
4. **実装課題と解決** — 起動速度、データ肥大化、重複告知、CI レース条件
5. **AI 駆動開発の数字** — 3 週間で初回リリース、847 テスト、v2.1.0 まで

個人開発は「動くものを作る」ところがゴールになりがちですが、**運用を続ける中で見つかる課題** のほうがよほど多く、よほど学びが深いと感じています。今後も v2.2.0 以降で新機能を追加しつつ、運用で見えた課題を解決していく予定です。

アプリは [https://teppei19980914.github.io/YumeHashi/](https://teppei19980914.github.io/YumeHashi/) で試せます（体験版あり）。リポジトリは [GitHub](https://github.com/teppei19980914/YumeHashi) で公開しています。

同じような構成で個人開発している方、これから始めようとしている方の参考になれば嬉しいです。

## 関連記事

- [『ユメログ』から『ユメハシ』へ — 夢と現実のあいだに、橋を架ける](/HomePage/ja/blog/yumehashi-story/) — アプリ改名の経緯と開発哲学
- [Firestore 無料枠を先延ばしするためにやった 4 つのこと](/HomePage/ja/blog/yumehashi-cost-optimization/) — gzip 圧縮・デバウンス・format バージョニング
- [AI 駆動開発 vs 従来開発の全工程比較](/HomePage/ja/blog/ai-driven-development/) — 3 週間でアプリを作った実績データ
