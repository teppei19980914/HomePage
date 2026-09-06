---
title: "Michinari — A Study Management App Where AI Re-Plans Your Exam, Reading, and Work Goals Daily"
description: "Michinari manages certification exams, reading, and work reporting in one app. It automatically re-plans your schedule when you fall behind, has AI reflect on your daily logs, and drafts monthly reports and reading summaries. Data stays on your PC and is never sent to any server."
tagline: "Just follow the path it shows you."
date: 2026-08-31
tags: ["Study Management", "Certification Exams", "Reading Log", "Side Project", "Windows", "FastAPI"]
repo: "https://github.com/teppei19980914/Michinari"
status: active
order: 4
---

## Does this sound familiar?

- A study plan falls apart within days and becomes useless
- Rebuilding a plan to catch up feels like too much work, so you just abandon it
- You read a book but forget the content, with no sense that the time you spent is adding up to anything
- Facing a monthly report or a biannual review, you can't recall what you actually did this period

**Michinari** is a Windows app that takes on the burden of "keep recording" and "look back and reflect" for you.

The name comes from a phrase Japanese car navigation systems use — "continue along the road" (michinari ni susunde kudasai). It carries two meanings: you can reach your destination just by following the path shown to you, and that path redraws itself the moment your situation changes.

## Three goal types, one app

You register goals under three different types, and the screen adapts to each one.

| Goal type | What it does |
|---|---|
| **Certification exam** | Register the exam date and materials, and it calculates today's workload automatically. If you fall behind, it doesn't pile the backlog onto tomorrow — it rebalances the load across the remaining days |
| **Reading** | Register a book and log what you read, prompted to recall it. When you finish, generate a completion report summarizing the book and what you felt and noticed |
| **Work** | Register a project and log your day's work in free text. From accumulated logs, generate drafts of monthly and biannual reports |

For exam plans, it warns you the moment you fall behind and lets you pre-designate rest days that are never treated as "slacking off." Drafts generated from work logs are designed to always require your own review and edits before you use them — never submitted automatically.

## Shared features

| Feature | What it does |
|---|---|
| Home screen | See today's tasks, progress, and anything that needs attention at a glance |
| Calendar | View logged days, rest days, and exam dates color-coded by month |
| Daily log | Record the day's progress and reflect on it through conversation with AI |
| Analytics | Review your accumulated progress as charts and lists |
| Export | Export your records as a readable document, including an option to share with personal details redacted |
| Data management | Back up and restore all your records at once |

## AI features and privacy

Daily feedback, plan revision suggestions, pass/fail cause analysis, reading completion reports, report drafts — these AI features become available once you connect to "NewtonX," an internal AI platform. Without that setup, the core features (logging, viewing, calendar, analytics) still work exactly the same.

Your records are stored only on your PC and are never sent to any external server. An internet connection is only needed when you use an AI feature.

## Tech stack

| Category | Technology |
|---|---|
| Backend | Python 3.12+ / FastAPI / SQLAlchemy 2.0 / Alembic |
| Frontend | TypeScript / Vite / React 19 / Tailwind CSS 4 |
| Distribution | Packaged as a Windows executable (`.exe`) |

## Getting started

Download the latest zip from the [releases page](https://github.com/teppei19980914/Michinari/releases), unzip it, and launch `Michinari.exe` inside the `Michinari` folder. Your browser opens automatically within a few seconds, showing the app.
