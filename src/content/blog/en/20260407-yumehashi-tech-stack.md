---
title: "YumeHashi's Tech Stack and 5 Implementation Challenges Solved by v2.1.0"
description: "A deep dive into the serverless architecture (Flutter Web + Drift + Riverpod + Firebase) behind YumeHashi, a side project running at zero monthly cost, and 5 real implementation challenges solved with code."
date: 2026-04-07
tags: ["Flutter", "Dart", "Drift", "Riverpod", "Firebase", "Side Project", "AI-Driven Development", "Performance"]
---

## Introduction

[YumeHashi](/HomePage/en/product/yumehashi/) is a personal Flutter Web app that breaks dreams into goals, goals into tasks, and turns them into action. Renamed from "YumeLog" in April 2026, it's now at v2.1.0.

This article focuses on the **technical internals**:

- The tech stack and selection rationale
- Serverless, zero-cost infrastructure design
- 5 implementation challenges encountered during operation and their solutions

---

## Architecture Overview

```
[User (Browser)]
      | HTTPS
      v
[GitHub Pages] ---- Flutter Web build artifacts (static hosting)
      |
      +-- [Firebase Auth]      Anonymous → Email auth
      +-- [Firestore]          Full JSON sync (3s debounce + SHA-256 diff)
      +-- [Google Apps Script]  Stripe proxy / feedback
      |         +-- [Stripe]   $2/month subscription
      +-- [GitHub Gist API]    Remote config (invite codes, settings)
      +-- [Browser SQLite]     Drift ORM + drift_worker.js (WASM)
```

The key design: **primary storage is browser-side SQLite**. Firestore is a "full JSON cloud backup." Most reads and writes complete locally, keeping Firestore free-tier writes (20,000/day) well within bounds up to DAU 3,000.

### Key Tech Stack

| Layer | Technology | Why |
|---|---|---|
| UI | Flutter (Dart) | Single codebase for Web / Windows |
| State | Riverpod | Compile-time DI, testable |
| Local DB | Drift (SQLite) | Type-safe queries, WASM for Web |
| Auth | Firebase Auth | Seamless anonymous → email migration |
| Payment | Stripe (via Apps Script) | No secret keys on client |

Running at **zero monthly cost** for over a year. The only variable cost factor is Firestore writes (DAU 3,000 threshold).

---

## 5 Implementation Challenges

### Challenge #1: Slow Initial Load

HAR analysis showed First Paint at 3.4s (cached), 6-10s cold start.

**Problem:** Apps Script's Stripe verification took 1.8s, blocking the serial dependency chain.

**Solution:** Three-pronged approach — cache premium state before `runApp()`, defer external calls via `addPostFrameCallback`, and add preconnect/preload hints to `index.html`.

### Challenge #2: Inbox Data Growth

After 1 year of operation, accumulated notifications pressured memory and Firestore. **Solution:** Auto-delete read notifications older than 30 days. Unread notifications protected regardless of age — deleting unread items would erode user trust.

### Challenge #3: Completed Task Accumulation

After 10 months, task list rendering became noticeably slower on real devices. **Solution:** Default-hide completed tasks + auto-delete completed tasks older than 30 days via `DataRetentionService`. Added FAQ entry: "Export data you want to keep before it's auto-deleted."

### Challenge #4: Duplicate Announcements

**Problem:** Removing entries from `announcements.json` didn't remove them from users' inboxes.

**Solution:** Treat `announcements.json` as the single source of truth — delete DB records whose dedup_key no longer exists in JSON.

### Challenge #5: CI Version Check Race Condition

**Problem:** CI's version-check ran after merge due to queue delay, comparing identical versions.

**Solution:** Skip check when `git merge-base --is-ancestor HEAD origin/main` — meaning the PR is already merged.

---

## AI-Driven Development Stats

| Item | Value |
|---|---|
| Time to first release | 3 weeks (from zero Flutter experience) |
| Current version | v2.1.0 |
| Test cases | 847 (unit + widget + integration) |
| Source lines | ~30,000 (lib/ + test/) |
| Commits | 160+ |

App: [YumeHashi](/HomePage/en/product/yumehashi/) (free trial available). Repository: [GitHub](https://github.com/teppei19980914/YumeHashi).

## Related Articles

- [From "YumeLog" to "YumeHashi" — Building a Bridge Between Dreams and Reality](/HomePage/en/blog/20260408-yumehashi-story/) — The rename story and development philosophy
- [Firestore Free Tier Optimization — 4 Things I Did](/HomePage/en/blog/20260409-yumehashi-cost-optimization/) — gzip compression, debounce, format versioning
- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — Building an app in 3 weeks
