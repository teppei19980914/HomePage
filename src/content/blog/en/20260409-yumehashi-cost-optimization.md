---
title: "YumeHashi v2.1.0 — 4 Things I Did to Stretch Firestore's Free Tier"
description: "Running my Flutter Web app YumeHashi at zero monthly cost, I implemented 4 cost optimization measures in v2.1.0 — gzip compression, extended debounce, compact JSON, and size monitoring — to delay exceeding Firestore's free tier."
date: 2026-04-09
tags: ["Flutter", "Firestore", "Side Project", "Cost Optimization", "gzip", "Dart"]
---

## Summary

I run my personal Flutter Web app [YumeHashi](https://teppei19980914.github.io/YumeHashi/) at zero monthly cost. The only variable cost factor is Firestore write volume, and current projections show the free tier holds until DAU 3,000.

However, "deal with it when we hit the limit" is too late, so I proactively added **free tier lifetime extension** measures in v2.1.0. All implemented without any impact on existing users' data or security.

This article covers 4 optimizations:

1. **JSON indent removal** (compact format)
2. **Write debounce extended from 3s → 5s**
3. **gzip compression + Base64 + format versioning** (backward compatible)
4. **Document size monitoring and warnings**

---

## Background: YumeHashi's Sync Architecture

YumeHashi stores **1 Firestore document per user**, containing all data (dreams, goals, tasks, books, activity logs, notifications) as JSON. The primary data store is browser-side SQLite, with Firestore serving as a "full JSON cloud backup."

```
[Browser SQLite (WASM)]  <-->  [users/{uid}] (Firestore)
        ^ Master                       ^ Backup
```

---

## Optimization 1: JSON Indent Removal

Previously, exported JSON used `JsonEncoder.withIndent('  ')` for readability. But **cloud sync doesn't need indentation** — no human reads it directly.

```dart
Future<String> exportDataCompact() async {
  final data = await _buildExportMap();
  return json.encode(data);  // No indentation
}
```

Result: **~20% size reduction**.

---

## Optimization 2: Write Debounce 3s → 5s

```dart
// Before
static const _debounceDuration = Duration(seconds: 3);
// After
static const _debounceDuration = Duration(seconds: 5);
```

A one-line change with significant impact. In typical scenarios (editing 4-5 tasks sequentially), 3s debounce splits into 2-3 writes; 5s debounce consolidates to 1.

Result: **~30-40% write reduction**.

---

## Optimization 3: gzip Compression + Format Versioning

The main event. Compress the JSON string with **gzip**, then Base64-encode it for Firestore's text-only field.

### Backward Compatibility via Prefix Versioning

```dart
const String syncPayloadFormat2Prefix = 'gz1:';

String encodeSyncPayload(String jsonString) {
  final bytes = utf8.encode(jsonString);
  final gzipped = GZipEncoder().encode(bytes);
  if (gzipped == null) return jsonString; // fallback
  return '$syncPayloadFormat2Prefix${base64Encode(gzipped)}';
}

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

**Existing users automatically migrate to format 2 on their next write** — zero impact, zero downtime.

Result: Combined with indent removal, **reduced to 1/4-1/5 of original size**.

---

## Optimization 4: Document Size Monitoring

Pre-upload payload size check against Firestore's hard 1 MiB limit:

```dart
void _warnIfPayloadTooLarge(String payload) {
  final size = payload.length;
  if (size > _payloadWarningBytes) { // 900 KB
    debugPrint('[SyncManager] WARNING: Large payload '
      '(${(size / 1024).toStringAsFixed(1)} KB / limit 1024 KB).');
  }
}
```

---

## Combined Impact

| Axis | Reduction |
|---|---|
| Sync document size | **-70-80%** |
| Write count | -30-40% |
| Egress bandwidth | -70-80% |

The DAU 3,000 threshold for Firestore's free tier is pushed even further. For a small personal app, "scaling 2-3x more while staying free" provides significant peace of mind.

App: [Try YumeHashi](https://teppei19980914.github.io/YumeHashi/)
Repository: [GitHub Repository](https://github.com/teppei19980914/YumeHashi)

## Related Articles

- [YumeHashi's Tech Stack and 5 Implementation Challenges](/HomePage/en/blog/20260407-yumehashi-tech-stack/) — Startup speed, data growth, CI race conditions
- [From "YumeLog" to "YumeHashi" — Building a Bridge Between Dreams and Reality](/HomePage/en/blog/20260408-yumehashi-story/) — The philosophy behind the app
- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — Building an app in 3 weeks
