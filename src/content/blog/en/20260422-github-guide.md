---
title: 'From "What Is Git?" to GitHub Actions — The Big Picture New Engineers Wish They Knew'
description: "A step-by-step guide covering Git, branches, GitHub, GitHub Actions, and GitHub Pages. Includes real CI/CD configurations (auto-deploy, scheduled publishing, stress testing) from two personal projects with actual code."
date: 2026-04-22
tags: ["Git", "GitHub", "GitHub Actions", "CI/CD", "New Programmers"]
---

## Target Audience

- You've started using Git/GitHub but can't see the big picture
- You can type `git add` and `git commit` but don't know why
- You've heard of GitHub Actions and CI/CD but haven't tried them

## Introduction — I Started From "I Don't Understand Git" Too

Honestly: when I started my career, I **didn't even know the difference between Git and GitHub**.

When a senior said "submit a pull request," I had to look up what that meant. Everyone starts from zero — and understanding comes from researching.

This article is for my past self: **"If I'd known just this, I wouldn't have been scared."** Based on official documentation, with real configurations from actual projects.

---

## The Big Picture — Git / GitHub / GitHub Actions

| Concept | What It Is | Official Site |
|---------|-----------|---------------|
| **Git** | Version control system (software) | [git-scm.com](https://git-scm.com/) |
| **GitHub** | Git repository hosting service | [github.com](https://github.com/) |
| **GitHub Actions** | CI/CD automation built into GitHub | [GitHub Actions Docs](https://docs.github.com/en/actions) |

**Git is required for GitHub to work.** GitHub is a service built on top of Git.

---

## Part 1: Git — Why Version Control Matters

### Git's 3 Areas

```
[Working Directory]  →  [Staging Area]  →  [Local Repository]
   Edit files         git add          git commit
                    Select changes    Record changes
```

**"Why separate `git add` and `git commit`?"** Because sometimes you want to commit only part of your changes — e.g., committing just the bug fix before the new feature.

### 5 Essential Commands

| Command | Meaning | When to Use |
|---------|---------|-------------|
| `git status` | Check state | **When in doubt, run this** |
| `git add <file>` | Stage changes | Before commit |
| `git commit -m "msg"` | Record changes | At logical checkpoints |
| `git log --oneline` | View history | Finding past commits |
| `git diff` | View changes | Final check before commit |

---

## Part 2: Branches — Why You Should Never Touch Main Directly

Branches are **parallel universes**. Work in a separate timeline without affecting production.

```
main:     A --- B --- C --- D (production)
               \
feature:        E --- F --- G (in development)
```

Even if feature branch fails, main is untouched. **Merge only when complete.** Use GitHub's branch protection rules ("Require a pull request before merging") to enforce this.

---

## Part 3: GitHub — Sharing and Reviewing Code

### Pull Requests = "Please Review This Code"

A PR is a **request to merge your branch into main**. It creates a space for code review — teammates catch bugs and design issues you'd miss.

### Issues = Task Management

Write `closes #42` in a PR, and the issue auto-closes on merge.

---

## Part 4: GitHub Actions — Automation on Push

### 6 Real Workflows from Personal Projects

Below are configurations actually running on this homepage and [YumeHashi](/HomePage/en/product/yumehashi/).

#### ① Auto Deploy on Push to Main

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: "0 21 * * *"  # Daily JST 6:00
  workflow_dispatch:       # Manual trigger too
```

**Result: `git push` automatically updates the site.**

#### ② Scheduled Blog Publishing via Cron

Articles with future `date` fields automatically publish when the daily build runs at the scheduled time.

#### ③ Monthly Batch: Auto-Update Dynamic Data

Qiita article count auto-fetched via API → JSON updated → auto commit → push → deploy triggers. **No manual updates needed.**

#### ④ PR CI: Auto Test + Version Check

[YumeHashi](/HomePage/en/product/yumehashi/) runs `flutter analyze` + `flutter test` + version 4-file set consistency check on every PR. **Prevents merging without passing tests or forgetting version updates.**

#### ⑤ Weekly Stress Test + Auto Issue Creation

Every Sunday, stress tests run automatically. If performance thresholds are exceeded, a GitHub Issue is automatically created. **Quality monitored weekly without human intervention.**

#### ⑥ Deploy-Time Version Stamp

```yaml
- run: |
    VERSION=$(grep '^version:' pubspec.yaml | sed 's/version: //')
    sed -i "s|const appVersion = '.*';|const appVersion = '$VERSION';|" lib/app_version.dart
```

Embeds deploy timestamp directly into the build output.

---

## Part 5: GitHub Pages — Free Website Hosting

| Item | Details |
|------|---------|
| **Cost** | Free (public repos) |
| **URL** | `https://<username>.github.io/<repo>/` |
| **HTTPS** | Automatic |

This homepage runs on GitHub Pages at **zero monthly cost**.

---

## Summary

```
[Your PC]
  │ git add / git commit
  ▼
[Local Repository]
  │ git push
  ▼
[GitHub]
  ├── Pull Request → Code Review → Merge
  ├── Issues → Task Management
  └── GitHub Actions
       ├── push → test / build / deploy
       ├── PR → lint / test / version check
       ├── cron → scheduled publish / monthly batch / weekly stress test
       └── manual → workflow_dispatch
            ▼
       [GitHub Pages] → Free hosting
```

| Your Situation | Next Step |
|---|---|
| Never used Git | Experience `git status` → `git add` → `git commit` |
| Use Git but afraid of branches | Try `git checkout -b` and submit a PR |
| Know GitHub but not Actions | Copy the `deploy.yml` above and run it in your repo |

## Related Articles

- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — CI/CD performance data with GitHub Actions
- [YumeHashi's Tech Stack and 5 Implementation Challenges](/HomePage/en/blog/20260407-yumehashi-tech-stack/) — Practical GitHub Actions challenges and solutions
- [Qiita CLI × Claude Code — Automating Article Management](/HomePage/en/blog/20260421-qiita-cli-automation/) — Building scheduled publishing with GitHub Actions
