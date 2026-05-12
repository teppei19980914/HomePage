---
title: "YumeHashi v2.1.0 — 4 Things I Did to Stretch Firestore's Free Tier"
description: "Running my Flutter Web app YumeHashi at zero monthly cost, I implemented 4 cost optimization measures in v2.1.0 — gzip compression, extended debounce, compact JSON, and size monitoring — to delay exceeding Firestore's free tier."
date: 2026-04-09
tags: ["Flutter", "Firestore", "Side Project", "Cost Optimization", "gzip", "Dart"]
---

## Summary

You ever look at a free-tier graph and feel a tiny spike of dread? "What happens when we hit the ceiling?"

I run my personal Flutter Web app [YumeHashi](/HomePage/en/product/yumehashi/) at zero monthly cost. The only variable cost knob is Firestore write volume, and current projections say the free tier holds until around DAU 3,000.

"Deal with it when we hit the limit" felt like the wrong answer. So I went ahead and added **free-tier-stretching** measures in v2.1.0 — proactively, before anyone noticed. All implemented without touching existing user data or security guarantees.

This article covers 4 optimizations:

1. **JSON indent removal** (compact format)
2. **Write debounce: 3s → 5s**
3. **gzip compression + Base64 + format versioning** (backward compatible)
4. **Document size monitoring and warnings**

---

## Background: YumeHashi's Sync Architecture

YumeHashi stores **1 Firestore document per user** that contains everything (dreams, goals, tasks, books, activity logs, notifications) as JSON. The primary store is browser-side SQLite. Firestore is "full JSON cloud backup."

```
[Browser SQLite (WASM)]  <-->  [users/{uid}] (Firestore)
        ^ Master                       ^ Backup
```

Firestore writes only happen in three situations: timestamp comparison on startup, after debounce on data changes, and unsynced data on app exit.

---

## Optimization 1: JSON Indent Removal

Use `json.encode(data)` for cloud sync exports, dropping indentation entirely. The pretty-printed export stays around — but only for local file backups, where humans actually need to read it.

Result: **~20% size reduction**.

---

## Optimization 2: Write Debounce 3s → 5s

```dart
static const _debounceDuration = Duration(seconds: 5); // changed from 3s
```

A one-line change with surprisingly large impact. In a typical scenario (editing 4-5 tasks back-to-back), 3s debounce splits into 2-3 writes; 5s consolidates the whole thing into 1. Since the local DB writes immediately, data is never lost even if the tab closes mid-debounce.

Result: **~30-40% write reduction**.

---

## Optimization 3: gzip Compression + Format Versioning

Compress the JSON string with **gzip**, then Base64-encode it for Firestore's text-only field. Base64 inflates by ~1.33x, but gzip's compression ratio on repetitive text (3-5x) blows past that easily.

To keep zero impact on existing users, I introduced **prefix-based format versioning**:

```dart
const String syncPayloadFormat2Prefix = 'gz1:';

String decodeSyncPayload(String payload) {
  if (!payload.startsWith(syncPayloadFormat2Prefix)) {
    return payload; // legacy format 1: plain JSON
  }
  final base64Body = payload.substring(syncPayloadFormat2Prefix.length);
  final compressed = base64Decode(base64Body);
  final decompressed = GZipDecoder().decodeBytes(compressed);
  return utf8.decode(decompressed);
}
```

- `gz1:` prefix identifies format 2 (compressed)
- JSON always starts with `{` or `[`, so no collision risk
- **Existing users auto-migrate to format 2 on their next write** — no flag day, no migration script

Note: compression and Base64 are reversible encodings, not encryption. Security still lives in Firestore Security Rules and HTTPS, like before.

Result: Combined with indent removal, **reduced to 1/4-1/5 of the original size**.

---

## Optimization 4: Document Size Monitoring

Pre-upload payload size check against Firestore's hard 1 MiB limit. If we cross 900 KB, a `debugPrint` warning fires. Combined with the existing policy of physically deleting 30-day-old read notifications and completed tasks, actually hitting 1 MiB in normal use is vanishingly unlikely.

---

## Combined Impact

| Axis | Reduction |
|---|---|
| Sync document size | **-70-80%** |
| Write count | -30-40% |
| Egress bandwidth | -70-80% |

The DAU 3,000 ceiling for Firestore's free tier has been pushed substantially further out. For a small personal app, "scaling 2-3x more while staying free" is a surprisingly comforting margin to sit on.

App: [Try YumeHashi](/HomePage/en/product/yumehashi/)
Repository: [GitHub Repository](https://github.com/teppei19980914/YumeHashi)

## Related Articles

- [YumeHashi's Tech Stack and 5 Implementation Challenges](/HomePage/en/blog/20260407-yumehashi-tech-stack/) — Startup speed, data growth, CI race conditions
- [From "YumeLog" to "YumeHashi" — Building a Bridge Between Dreams and Reality](/HomePage/en/blog/20260408-yumehashi-story/) — The philosophy behind the app
- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — Building an app in 3 weeks
