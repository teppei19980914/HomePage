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
   └── Auto-calculate scheduled date
   ↓
③ Git managed (daily branch → PR → merge to main)
   ↓
④ GitHub Actions auto-executes
   ├── On main merge → publish immediately → ID commit-back
   └── Daily 20:00 JST → publish 1 scheduled article
```

---

## Step 1: Managing Articles with Qiita CLI

[Qiita CLI](https://github.com/increments/qiita-cli) is Qiita's official command-line tool.

```bash
npm install @qiita/qiita-cli --save-dev
npx qiita init && npx qiita login && npx qiita pull
```

This syncs all your Qiita articles as Markdown files in `public/`. My account had **213 articles** pulled in one shot.

---

## Step 2: Automating Article Improvement with Claude Code

The `.claude/skills/improve-article.md` skill defines the full improvement process. Telling Claude Code "improve this article" triggers a 10-step automated improvement — including **accumulative trend analysis** that builds a pattern library over time rather than overwriting.

---

## Step 3: Scheduled Publishing — 1 Article per Day

Just specify the scheduled date in frontmatter:

```yaml
ignorePublish: true                    # Reserved state
scheduled_publish_date: "2026-04-15"   # Auto-publishes on this date
```

A GitHub Actions cron job runs at **20:00 JST daily** and publishes 1 scheduled article. The next date is auto-calculated from the latest existing scheduled date — no manual date math needed.

### Why 20:00 JST

| Time Slot | Effect |
|---|---|
| **Morning (9:00-12:00)** | Gets initial traction (work-time searches) |
| **Evening (20:00-22:00)** | **Read deeply** (post-work reading) |
| Weekends | PV drops to 1/5 of weekdays |

**Wednesday has the highest Qiita PV** in data, so when batch-writing multiple articles, the most viral candidate gets the Wednesday slot.

---

## Step 4: The Article ID Trap — The Same Article Published 4 Times

When Qiita CLI creates a new article, the frontmatter `id` is `null`. When merged to main, `publish.yml` runs `qiita publish --all`. Qiita CLI treats `id: null` articles as **new articles every time**.

The default workflow had **no mechanism to commit the Qiita-assigned ID back to the repository**.

```text
1st merge → publish id:null article → Qiita assigns ID
          → but repo still has id:null
2nd merge → still id:null → published again as new...
```

Result: **the same article was published 4 times**. Then deleting the duplicates on Qiita left files with deleted IDs locally — triggering **404 errors** that broke the entire workflow.

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

| Lesson | Details |
|---|---|
| **`id: null` + `ignorePublish: false` is dangerous** | Publishes as new on every merge |
| **ID commit-back is essential** | Qiita CLI doesn't persist IDs to the repo by default |
| **Test systems with 1 article first** | Validate before bulk operations |

---

## Step 5: Git Workflow — Daily Branch Automation

Claude Code Hooks automate the daily branch workflow.

**SessionStart Hook**: Detects previous day branches → commits & pushes uncommitted changes → auto-creates PRs → deletes merged branches → creates today's branch.

**Stop Hook**: Runs secret scan → auto-commits changes → SEO check. **No manual commits needed.**

---

## Before / After

| Aspect | Before | After |
|---|---|---|
| **Editing** | Qiita browser editor | Local Markdown + Git |
| **SEO** | Manual each time | Skill auto-optimizes + Stop Hook checks |
| **Timing** | Publish immediately | 20:00 JST scheduled (Wednesday strategy) |
| **Article IDs** | Manual (duplicate risk) | Auto commit-back after publish |

---

## In Closing

Building this system, I fell into the "article ID duplicate" trap. But **incorporating those failures into the system** means I can now run scheduled publishing with confidence.

## Related Articles

- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — Building an app in 3 weeks with AI
- ["Black Box Thinking" — Life Is Too Short to Experience Every Failure Yourself](/HomePage/en/blog/20260418-failure-science/) — Systematizing failure
- ["Essentialism" and "Effortless" — The Two Wheels of What to Do and How to Do It](/HomePage/en/blog/20260419-essentialism-effortless/) — The philosophy of systematization
