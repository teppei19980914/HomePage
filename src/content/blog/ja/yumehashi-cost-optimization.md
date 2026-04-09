---
title: "個人開発アプリ『ユメハシ』v2.1.0 — Firestore 無料枠を先延ばしするためにやった4つのこと"
description: "月額 0 円運用している Flutter Web アプリ『ユメハシ』で、Firestore の無料枠を少しでも長く延ばすために v2.1.0 で導入したコスト最適化施策（gzip 圧縮、デバウンス拡大、JSON コンパクト化、サイズ監視）を紹介します。"
date: 2026-04-08
tags: ["Flutter", "Firestore", "個人開発", "コスト最適化", "gzip", "Dart"]
category: work
---

## この記事のまとめ

個人開発の Flutter Web アプリ [ユメハシ（YumeHashi）](https://teppei19980914.github.io/YumeHashi/) を月額 0 円で運用しています。現状のコスト変動要因は Firestore の書き込み回数だけで、DAU 3,000 人を超えるまでは無料枠内に収まる試算です。

ただ、「無料枠を超えそうになったら対応する」では遅いので、今のうちに **無料枠の期間を先延ばしする** 施策を v2.1.0 に入れました。既存ユーザーの動作・セキュリティには一切影響しない形で実装しています。

この記事では、以下の 4 点を紹介します。

1. **JSON のインデント削除**（コンパクト形式）
2. **書き込みデバウンスを 3 秒 → 5 秒に拡大**
3. **gzip 圧縮 + Base64 + format バージョニング**（後方互換あり）
4. **ドキュメントサイズの監視と警告**

リリース作業はユメハシの [OPERATIONS.md](https://github.com/teppei19980914/YumeHashi/blob/main/docs/OPERATIONS.md) にあるバージョン 4 点セット（`pubspec.yaml` / `app_version.dart` / `announcements.json` / `settings_page_test.dart`）の更新ルールに沿って行いました。

---

## 前提: ユメハシの同期アーキテクチャ

ユメハシはユーザーごとに **1 Firestore ドキュメント** を持ち、その中に全データ（夢・目標・タスク・書籍・活動ログ・通知）を JSON として詰めてアップロードする設計です。読み書きはブラウザ内 SQLite が主で、Firestore は「全量 JSON のバックアップ」という位置付けです。

```
[ブラウザ内 SQLite (WASM)]  ←→  [users/{uid}] (Firestore)
        ↑ マスター                       ↑ バックアップ
```

この設計の良いところは、Firestore の read/write がユーザーアクションに比例しないことです。ユーザーが何回タスク一覧を開こうが、Firestore への問い合わせは発生しません（ローカル DB を読むだけ）。

Firestore の書き込みは以下の 3 種類だけです。

- 起動時: タイムスタンプ比較で必要なら 1 回
- データ変更時: 3 秒デバウンス + ハッシュ比較後に 1 回
- アプリ離脱時: 未同期データがあれば 1 回

それでも、ユーザーが日中に繰り返しデータ変更すると書き込み回数は積み上がります。さらにドキュメントサイズが大きいほど下り帯域を消費します。そこで v2.1.0 では **書き込み回数の削減** と **ドキュメントサイズの削減** の両面で最適化を入れました。

---

## 課題認識: Firestore の課金軸を整理する

まず Firestore の課金軸をおさらいします。

| 課金軸 | 単価の目安 | 無料枠の目安 |
|---|---|---|
| 読み取り | $0.06 / 100K docs | 50,000 docs / 日 |
| 書き込み | $0.18 / 100K docs | 20,000 docs / 日 |
| ストレージ | $0.18 / GiB / 月 | 1 GiB |
| 下り帯域 | $0.12 / GiB 前後 | 10 GiB / 月 |

> ※ 上記はあくまで執筆時点の参考値です。リージョン・プラン・改定により変動するため、正確な料金は [Firebase の公式料金ページ](https://firebase.google.com/pricing) を必ずご確認ください。

重要なのは **書き込みは「操作回数（document writes）」で課金され、ドキュメントサイズには依存しない** ことです。1 KB の書き込みでも 100 KB の書き込みでも、課金上は同じ「1 write」です。

つまり施策の効果は以下のように分かれます。

| 施策 | 直接的コスト削減 | 間接的メリット |
|---|---|---|
| 書き込み回数を減らす | ⭐⭐⭐ 大 | 体感速度向上 |
| ドキュメントサイズを減らす | ⭐ 小 | 1 MiB 上限の回避・下り帯域削減・体感速度向上 |

**書き込み回数を減らすのが本丸** ですが、サイズ削減も無視できません。Firestore には「1 ドキュメント = 最大 1 MiB」という硬い上限があり、これに当たると書き込み自体が失敗するからです。

---

## 施策 1: JSON のインデント削除（コンパクト形式）

これまで `data_export_service.exportData()` は `JsonEncoder.withIndent('  ')` を使って整形済み JSON を返していました。ユーザーがローカル保存したバックアップファイルを開いたとき読みやすいように、という配慮です。

しかし **クラウド同期ではインデントは無駄** です。人間が直接読むわけではないので、空白 2 つ × 全行 ぶんのバイト数をそっくり削減できます。

```dart
// 追加した新メソッド
Future<String> exportDataCompact() async {
  final data = await _buildExportMap();
  return json.encode(data);  // ← インデントなし
}
```

既存の `exportData()`（整形済み）はローカルファイル書き出し専用として残し、`SyncManager` だけが新しい `exportDataCompact()` を呼ぶようにしました。**ローカルファイルの見た目は変わらないので、ユーザーが手動バックアップを開いても違和感がありません**。

効果: サイズ **約 20% 削減**（データ内容によります）。

---

## 施策 2: 書き込みデバウンスを 3 秒 → 5 秒に拡大

ユメハシでは、ユーザーがタスクを編集するたびに `SyncManager.requestSync()` が呼ばれます。これを 3 秒のデバウンスでまとめて 1 回の Firestore 書き込みに集約していました。

```dart
// 変更前
static const _debounceDuration = Duration(seconds: 3);

// 変更後
static const _debounceDuration = Duration(seconds: 5);
```

1 行の変更ですが、効果は意外と大きいです。ユーザーが連続してタスクを編集する典型的なシナリオ（スケジュール画面で 4〜5 個のタスクを次々編集）を想定すると、3 秒デバウンスだと途中で区切れて 2〜3 回の書き込みになりますが、5 秒デバウンスなら 1 回に収まる確率が上がります。

**「ローカル DB は即座に書き込まれるので、デバウンス中にタブを閉じてもデータは失われない」** のがポイントです。`syncOnExit()` もデバウンスをキャンセルして即実行するので、離脱時の同期も保証されます。

効果: 書き込み回数 **約 30〜40% 削減**（使用パターン依存）。

---

## 施策 3: gzip 圧縮 + Base64 + format バージョニング

これが今回の本命です。Firestore の `data` フィールドに保存する JSON 文字列を **gzip で圧縮** して Base64 にエンコードします。

### なぜ Base64 が必要か

Firestore の文字列フィールドは UTF-8 のテキストしか保存できず、生のバイナリは格納できません。gzip 出力はバイナリなので、Base64 で ASCII にエンコードする必要があります。

Base64 エンコードはサイズを約 1.33 倍に膨らませますが、gzip の圧縮率（繰り返しの多いテキストで 3〜5 倍）のほうが圧倒的に大きいので、トータルでは大幅に縮みます。

### format バージョニングと後方互換性

**ここが一番悩んだ設計ポイント** でした。既存ユーザーは Firestore にプレーン JSON 文字列を保存済みです。新バージョンをリリースした瞬間に既存データが読めなくなると大事故です。

解決策として、**プレフィックスによる format バージョニング** を導入しました。

```dart
// lib/services/sync_payload_codec.dart
const String syncPayloadFormat2Prefix = 'gz1:';

String encodeSyncPayload(String jsonString) {
  final bytes = utf8.encode(jsonString);
  final gzipped = GZipEncoder().encode(bytes);
  if (gzipped == null) return jsonString; // フォールバック
  return '$syncPayloadFormat2Prefix${base64Encode(gzipped)}';
}

String decodeSyncPayload(String payload) {
  if (!payload.startsWith(syncPayloadFormat2Prefix)) {
    return payload; // legacy (format 1) プレーン JSON をそのまま返す
  }
  final base64Body = payload.substring(syncPayloadFormat2Prefix.length);
  final compressed = base64Decode(base64Body);
  final decompressed = GZipDecoder().decodeBytes(compressed);
  return utf8.decode(decompressed);
}
```

ポイント:

- **プレフィックス `gz1:`** で format 2（圧縮形式）を識別
- JSON の先頭は必ず `{` か `[` なので `gz1:` と衝突しない
- `decodeSyncPayload` は両形式を透過的に扱う
- **既存ユーザーは次回の書き込みタイミングで自動的に format 2 へ移行** する

これで **既存ユーザーに一切影響を与えず** に新形式へ移行できます。v2.1.0 リリース直後、既存ユーザーが初めてデータを変更した時点で、自動的に圧縮形式のデータが Firestore に書き込まれる挙動です。

### セキュリティへの影響

圧縮と Base64 はどちらも **可逆エンコーディング** であり、暗号化ではありません。機密性は従来通り Firestore Security Rules（ユーザー `uid` ベースのアクセス制御）と HTTPS で担保されます。このコーデックは純粋にコスト削減目的です。

### 効果

繰り返しパターンの多いデータ（タスクやログが多数並ぶ JSON）では、圧縮率が特に高くなります。ユメハシの典型的なペイロードで測ったところ、**gzip 単体で 1/3〜1/4 に縮小**、Base64 の膨張を加味しても **元の 25〜35%** まで縮みました。インデント削除と合わせると **元の 1/4〜1/5** です。

---

## 施策 4: ドキュメントサイズ監視と警告

Firestore の 1 ドキュメント上限 1 MiB に近づいたことを検知するために、アップロード前にペイロードサイズをチェックする処理を入れました。

```dart
void _warnIfPayloadTooLarge(String payload) {
  final size = payload.length;
  if (size > _payloadWarningBytes) { // 900 KB
    debugPrint(
      '[SyncManager] WARNING: アップロードペイロードが大きいです '
      '(${(size / 1024).toStringAsFixed(1)} KB / 上限 1024 KB). '
      '古い完了タスクや既読通知の整理を検討してください.',
    );
  }
}
```

現状は `debugPrint` で開発者ログに出すだけの控えめな実装ですが、将来ユーザーの受信ボックスへ警告通知を出したり、自動クリーンアップを強化する判断材料にできます。

v2.1.0 で既に導入している「30 日で既読通知・完了タスクを物理削除」のポリシーと組み合わせれば、通常の使い方で 1 MiB を超えることはまずありません。

---

## テスト設計 — 後方互換性を壊さないために

今回のような「既存データを触る変更」では、テストを厚く書くことが最も重要です。追加したテストは以下の 10 件です。

### `sync_payload_codec_test.dart`（8 件）
- 圧縮エンコード・デコードの往復
- 日本語を含む JSON の往復
- legacy format 1（プレーン JSON）が透過的に読める
- 繰り返しデータでの圧縮効率が 50% 超であること
- 空文字列・プレフィックス検出などのエッジケース

### `sync_manager_test.dart`（2 件追加 + 1 件修正）
- **legacy format 1 を保存している既存ユーザーのダウンロード** — 既存ユーザーのデータが無傷で読めることを検証
- **format 2 で端末 A → 端末 B のラウンドトリップ** — 圧縮ペイロードが別端末で正しく復元される

特に重要なのは「legacy format 1 のダウンロード」テストです。これが落ちるということは「既存ユーザーのデータが読めなくなる」を意味するので、絶対に落としてはいけません。

---

## リリース作業 — バージョン 4 点セット更新

ユメハシの [OPERATIONS.md](https://github.com/teppei19980914/YumeHashi/blob/main/docs/OPERATIONS.md) に定めているリリース手順に従って、以下の 4 ファイルを同時に更新します。

| # | ファイル | 更新内容 |
|---|---|---|
| 1 | `pubspec.yaml` | version は 2.1.0 のまま（機能追加ではないため据え置き） |
| 2 | `lib/app_version.dart` | `releaseHistory` の v2.1.0 エントリに「クラウド同期のコスト削減」の一行を追記 |
| 3 | `assets/announcements.json` | 既存の 2.1.0 告知を維持（コスト最適化はユーザーから見えないため告知を増やさない） |
| 4 | `test/pages/settings_page_test.dart` | 2.1.0 のまま |

加えて、以下のドキュメントも更新しました。

- `docs/DESIGN.md` — `sync_payload_codec.dart` の追加と format 2 の設計を反映
- `docs/INFRASTRUCTURE.md` — Firestore 関連の更新履歴にコスト最適化を記録
- `docs/OPERATIONS.md` — 既存ユーザーの Firestore ドキュメントが初回同期後に自動移行する挙動を明記

変更行数は合計 **367 insertions / 21 deletions**、テスト件数は 847 → 857 に増えました。

---

## 想定効果と今後

ここまでの施策を重ねた効果の試算です（実測ではなく、圧縮率と挙動から計算）。

| 軸 | 削減率 |
|---|---|
| 同期ドキュメントサイズ | **−70〜80%** |
| 書き込み回数 | −30〜40% |
| 下り帯域 | −70〜80% |

Firestore の無料枠 DAU 3,000 人の閾値が、さらに先延ばしされる想定です。小さな個人開発アプリにとって、「あと 2〜3 倍スケールしても無料のまま戦える」のは精神的に大きな余裕につながります。

次に余地が残っているのは **起動時の Firestore 読み取りを間引く** 施策ですが、これはマルチデバイスで使うユーザーの体感速度に影響する可能性があるので、運用で必要になってから追加する予定です。

---

## まとめ

- Firestore のコスト最適化は「書き込み回数の削減」と「ドキュメントサイズの削減」の 2 軸
- v2.1.0 では **JSON インデント削除 + デバウンス 5 秒 + gzip 圧縮 + サイズ監視** の 4 点セット
- 既存ユーザーへの影響をゼロにするため、**format バージョニング** で後方互換性を確保
- セキュリティは従来の Firestore Security Rules + HTTPS のまま（圧縮は暗号化ではないので、機密性に寄与しない）
- **「無料枠を超えてから対応する」のではなく、今のうちに延命する** ほうが心理的な負担が少ない

個人開発で同じようにサーバーレス × 無料枠運用をしている方の参考になれば嬉しいです。

アプリ: [https://teppei19980914.github.io/YumeHashi/](https://teppei19980914.github.io/YumeHashi/)
リポジトリ: [https://github.com/teppei19980914/YumeHashi](https://github.com/teppei19980914/YumeHashi)
