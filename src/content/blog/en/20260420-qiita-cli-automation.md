---
title: "Qiita CLI × Claude Code — Automating Article Management with Trend Analysis, SEO, and Scheduled Publishing"
description: "I built a system combining Qiita CLI, Claude Code, and GitHub Actions to manage articles entirely in Git. This covers the full journey including a duplicate article ID trap and data-driven publishing time optimization."
date: 2026-04-20
tags: ["Qiita", "Claude Code", "AI-Driven Development", "GitHub Actions", "Automation"]
---

Every time I published on Qiita, I edited in the browser. No Git management, no diffs, manual SEO every time.

To solve this, I built a system with **Qiita CLI + Claude Code + GitHub Actions** to automate article management from creation to publishing.

This article covers the full process, including the **duplicate article ID trap** I fell into and **data-driven publishing time optimization**.

---

## 3 Problems to Solve

| Problem | Details |
|---|---|
| **Browser editing every time** | Writing in Qiita's editor → no Git management, no diffs |
| **Ad-hoc SEO** | Manually optimizing titles and tags each time |
| **Can't sustain daily posting** | Want to batch-write but spread publication timing |

---

## System Overview

```text
① Share draft with Claude Code
   ↓
② /improve-article skill auto-executes
   ├── Qiita trend analysis (fetches latest each time)
   ├── SEO 6-point check
   ├── Improve structure and expression (without changing content)
   └── Auto-calculate scheduled date
   ↓
③ Git managed (daily branch → PR → merge to main)
   ↓
④ GitHub Actions auto-executes
   ├── On main merge → publish immediately → ID commit-back
   └── Daily 20:00 JST → publish 1 scheduled article
```

---

## The Article ID Trap — The Same Article Published 4 Times

This was the hardest part. When Qiita CLI creates a new article, the frontmatter `id` is `null`.

```yaml
id: null          # Not yet published to Qiita
ignorePublish: false
```

When merged to main, `publish.yml` runs `qiita publish --all`. Qiita CLI treats `id: null` articles as **new articles every time**.

The default workflow had **no mechanism to commit the Qiita-assigned ID back to the repository**.

```text
1st merge → publish id:null article → Qiita assigns ID
          → but repo still has id:null
2nd merge → still id:null → published again as new
3rd merge → still id:null → published yet again...
```

Result: **the same article was published 4 times**.

### The Fix: ID Commit-Back

```yaml
- name: Commit updated article IDs
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    if ! git diff --quiet public/; then
      git add public/
      git commit -m "chore: update article IDs after publish"
      git push
    fi
```

### Lessons Learned

| Lesson | Details |
|---|---|
| **`id: null` + `ignorePublish: false` is dangerous** | Publishes as new on every merge |
| **ID commit-back is essential** | Qiita CLI doesn't persist IDs to the repo by default |
| **Test systems with 1 article first** | Validate before bulk operations |

---

## Why 20:00 JST — Data-Driven Publishing

| Time Slot | Effect |
|---|---|
| **Morning (9:00-12:00)** | Gets initial traction (work-time searches) |
| **Evening (20:00-22:00)** | **Read deeply** (post-work reading) |
| Weekends | PV drops to 1/5 of weekdays |

**Wednesday has the highest Qiita PV** (31,759 PV in data), fitting the Thursday trend update → Sunday Best 20 → Wednesday newsletter flow.

---

## Before / After

| Aspect | Before | After |
|---|---|---|
| **Editing** | Qiita browser editor | Local Markdown + Git |
| **SEO** | Manual each time | Skill auto-optimizes + Stop Hook checks |
| **Trends** | Gut feeling | Fetch and accumulate each time |
| **Timing** | Publish immediately | 20:00 JST scheduled (Wednesday strategy) |
| **Commits** | Manual | Stop Hook auto-commits |
| **Article IDs** | Manual (duplicate risk) | Auto commit-back after publish |

---

## In Closing

Building this system, I fell into the "article ID duplicate" trap. The same article published 4 times, deleted articles caused 404 errors, and publishing time optimization required data research.

But **incorporating those failures into the system** means I can now run scheduled publishing with confidence.

## Related Articles

- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — Building an app in 3 weeks with AI
- ["Black Box Thinking" — Life Is Too Short to Experience Every Failure Yourself](/HomePage/en/blog/20260418-failure-science/) — Systematizing failure
- ["Essentialism" and "Effortless" — The Two Wheels of What to Do and How to Do It](/HomePage/en/blog/20260419-essentialism-effortless/) — The philosophy of systematization
