---
title: "Michinari: AI Study Planner for Exams, Reading & Work Logs"
description: "Michinari tracks exams, reading, and work logs in one free Windows app. AI re-plans your schedule daily and drafts reports, with data kept on your PC."
tagline: "Just follow the path it shows you."
date: 2026-08-31
tags: ["AI Study Management", "Certification Exams", "Reading Log", "Side Project", "Windows", "FastAPI"]
repo: "https://github.com/teppei19980914/Michinari"
status: active
order: 1
---

## Does this sound familiar?

- A study plan falls apart within days and becomes useless
- Rebuilding a plan to catch up feels like too much work, so you just abandon it
- You cram terms before an exam, then can't recall them on the day
- You read a book but forget the content, with no sense that the time you spent is adding up to anything
- Facing a monthly report or a biannual review, you can't recall what you actually did this period

**Michinari** is a free Windows app that takes on the burden of "keep recording" and "look back and reflect" for you. No installer needed — just run the downloaded executable and start.

The name comes from a phrase Japanese car navigation systems use — "continue along the road" (michinari ni susunde kudasai). It carries two meanings: you can reach your destination just by following the path shown to you, and that path redraws itself the moment your situation changes. The story behind why I built it is in [Why I Built Michinari](/HomePage/en/blog/20260831-michinari-story/).

## Three goal types, one app

You register goals under three different types, and the screen adapts to each one — so you can manage very different kinds of effort side by side.

### Certification exam — the plan re-plans itself

Register the exam date and materials, and it calculates **today's workload** automatically.

- If you fall behind, it doesn't pile the backlog onto tomorrow — it rebalances the load across the remaining days
- It warns you the moment you fall behind, prompting you to revisit the plan
- You can pre-designate rest days that are never treated as "slacking off"
- After the exam, register the pass/fail result and score, and AI traces back through your daily logs to analyze **why you got that result**
- Terms you want to remember go into a **flashcard deck** (bulk paste from Excel supported). Quiz yourself with flip cards, typed input, or four-choice questions, on your own schedule

The mechanics behind a plan that never collapses are detailed in [Why Michinari's Exam Schedule Never Piles Up](/HomePage/en/blog/20260903-michinari-adaptive-study-plan/).

### Reading — turn what you read into an asset

Register a book and log what you read, prompted to recall it.

- Entering the current page is optional — a short note like "I got this far today" is enough to keep going
- No quotas, no completion-rate pressure. AI responds to what you write and surfaces connections with past entries
- When you finish, generate a **completion report** summarizing the book and what you felt and noticed
- Finished and abandoned books line up on a **bookshelf**, where you can revisit all the entries and reports for that book

How logging without quotas still becomes a lasting asset is explained in [How Michinari Turns Logs Into an Asset Without Quotas](/HomePage/en/blog/20260906-michinari-reading-as-asset/).

### Work — draft your reports and review sheets for you

Register a project and log your day's work in free text.

- No fixed fields — just write. AI responds to each day's log by putting your effort into words
- From accumulated logs, generate drafts of **monthly reports** (summary, this month's goals, a 5-point achievement rating, reflection, next month's goals) and **biannual review drafts**
- Generated content is never submitted automatically — it's designed so **you always review and edit it** before use
- You can register **team members** per project, and if you're set as the reviewer, generate **AI evaluation report** drafts from your daily logs and AI feedback history (sensitive member details can only be saved once you've confirmed consent)

The design that hands drafting to AI while keeping the final call with you is covered in [Why Michinari Never Auto-Submits](/HomePage/en/blog/20260909-michinari-report-draft-generation/).

## Shared features

| Feature | What it does |
| --- | --- |
| Home screen | See today's tasks, progress, and anything that needs attention at a glance |
| Calendar | View logged days, rest days, and exam dates color-coded by month |
| Spaced-repetition quiz (exam & reading) | AI builds quizzes from your logs and flashcards and serves a few "today's review" questions on the home screen |
| Milestone celebrations | A character celebrates with you when logs hit a milestone — streaks, books finished, exam progress, and more |
| Analytics | Review your accumulated progress as charts and lists, tailored to each goal type |
| Export | Export your records as a readable document, including an option to share with personal details redacted |
| Data management | Back up and restore all your records at once |

## AI features and privacy

Daily feedback, plan revision suggestions, pass/fail cause analysis, reading completion reports, report drafts — these AI features become available once you connect to "NewtonX," an internal AI platform. Without that setup, the core features (logging, viewing, calendar, analytics, flashcards, spaced-repetition quizzes) still work exactly the same.

Your records are stored **only on your PC** and are never sent to any external server. An internet connection is only needed when you use an AI feature.

## Get started in 3 steps

No engineering background needed — you can be up and running in a few minutes.

1. **Download** — open the [latest release page](https://github.com/teppei19980914/Michinari/releases/latest) and download `Michinari-v◯.◯.◯.zip`
2. **Unzip** — right-click the downloaded zip and choose "Extract All" to unzip it anywhere (you'll get a `Michinari` folder)
3. **Launch** — double-click **`Michinari.exe`** inside the `Michinari` folder

Your browser opens automatically within a few seconds, showing the app. The app itself waits in the system tray (bottom-right, next to the clock). On first launch, since nothing is registered yet, a welcome screen lets you pick reading, work, or exam to get started.

<details>
<summary>If it doesn't open correctly</summary>

- **Browser doesn't open automatically**: type `http://127.0.0.1:8100` into your browser's address bar
- **"Windows protected your PC" warning appears**: this is a warning Windows shows for apps made by an individual developer. Click "More info" → "Run anyway" after reviewing the details
- **No icon in the system tray**: click the "^" button in the tray to reveal hidden icons

</details>

No installer is required, and uninstalling is just deleting the `Michinari` folder. Usage instructions are in the `ユーザ手順書.pdf` (user guide) bundled in the download, or in the in-app "Help" screen.

## Built for peace of mind

- **Your records stay on your own PC.** They're never sent to an external server
- **No internet connection required.** It only connects when you use an AI feature
- Runs on **Windows**. Use an up-to-date browser such as Chrome or Edge
- Upgrading is just replacing the old folder with the new one and launching it — your existing records carry over automatically

## Tech stack

| Category | Technology |
|---|---|
| Backend | Python 3.12+ / FastAPI / SQLAlchemy 2.0 / Alembic |
| Frontend | TypeScript / Vite / React 19 / Tailwind CSS 4 |
| Distribution | Packaged as a Windows executable (`.exe`) |

## Need help?

Start with the in-app "Help" screen, which covers every screen, every setting, and common questions. If that doesn't solve it, let me know via [GitHub Issues](https://github.com/teppei19980914/Michinari/issues).

Source code and developer docs are also published on the [GitHub repository](https://github.com/teppei19980914/Michinari). I also built a goal-management app called "[YumeHashi](/HomePage/en/product/yumehashi/)" (currently closed to new users) — worth a look if you're curious about my earlier work.
