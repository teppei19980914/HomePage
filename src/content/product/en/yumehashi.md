---
title: "YumeHashi — Turn Dreams Into Daily Action"
description: "YumeHashi turns dreams into daily action via three steps (write, break, keep going) plus 12-constellation gamification. Built on Flutter Web. Signups paused."
tagline: "With a dream, even the largest wall can be crossed."
date: 2026-04-03
tags: ["Dreams", "Goal Management", "Gamification", "Flutter", "Dart", "Firebase", "Riverpod", "SQLite"]
url: "https://teppei19980914.github.io/YumeHashi/"
repo: "https://github.com/teppei19980914/YumeHashi"
status: suspended
order: 1
---

## Sound Familiar?

- I have things I want to do, but I don't know where to start
- I set goals, but they slip out of my head before I notice
- Every day is too busy to spend time on what I dream about

**YumeHashi** was made for exactly that.

> **YumeHashi** = Yume (dream) + Hashi (bridge)
> An app that bridges "what you want to do" and "what you do today."

## Design Philosophy

> **Move those who are still. Support those who are moving.**

People act by inertia. Those moving keep moving; those still stay still.

YumeHashi is designed to combine two things in a single app: **a trigger to take that first step**, and **a system that keeps you moving** afterward.

## Three Steps to Turn Dreams into Action

```
Write down → Break down → Keep going → (loop)
```

| Step | What you do |
|------|-------------|
| **Step 1. Write it down** | Put your dream into words. Once written, your brain starts treating it as a "goal." |
| **Step 2. Break it down** | Decompose into 3 layers — dream → goal → task. The big wall becomes a daily series of small actions. |
| **Step 3. Keep going** | Your accumulated activity lights up as a constellation. Completing the 12 constellations is your proof of growth. |

### How decomposition looks

```
Dream: become an IT engineer
  └ Goal: get an AWS certification (within 3 months)
      └ Task: work through the textbook one chapter at a time
      └ Task: take practice exams
```

"I want to become an IT engineer." "I want to be able to speak English." A small one-liner is enough to start.

## Main Features

| Feature | Description |
|---------|-------------|
| **Dream / goal / task management** | Organize "what you want to do" in a 3-layer hierarchy. Discovery guides help when you don't know what to set as a goal. |
| **Schedule** | Visualize tasks on a timeline. Auto-reminders as deadlines approach. Excel / CSV export supported. |
| **Book management** | Manage learning books with a bookshelf-style UI. Set reading schedules and record post-reading reviews. |
| **Statistics & analysis** | Visualize activity time, streaks, and per-goal progress. Feel "how much you actually pushed yourself" in numbers. |
| **Constellation system** | Each piece of activity lights a star, and the 12 constellations form a gamified continuity boost. |
| **Dashboard** | Today's status, streaks, personal bests, inbox — customize the information you want on one screen. |

## Where It Fits

| Scene | How to use it |
|-------|---------------|
| **Aiming for a certification** | Set the exam date as a goal and manage study tasks via the schedule |
| **Considering a career change** | Write the "person you want to become" as a dream, then decompose required skills into goals |
| **Building a reading habit** | Register books, set a reading schedule, and consolidate learning via post-read reviews |
| **Wanting to make daily activity visible** | Log activities and reflect via statistics; streaks help maintain motivation |
| **Wanting to actually achieve this year's resolution** | Decompose dream → goal → task and translate it into daily action |

## A Note from the Developer

> In my student years there was a stretch where I couldn't hold any dream and saw no hope in the future.
>
> Books opened me to the idea that "to live vividly, you need a dream."
>
> So I built an app that turns dreams into language and then into action.
>
> **YumeHashi is an app that supports the very first step.**
>
> Once you take that step, the next ones come naturally.

## Current Status

> **New user signups are paused**
>
> Service continues for existing users, but new registrations are temporarily on hold. Once a resumption date is decided, we'll announce it on this page.

## Community

Open channels for users and developers.

- [GitHub Discussions (questions, ideas, talk)](https://github.com/teppei19980914/YumeHashi/discussions)

---

## For Developers

The rest of this page covers the tech stack and key design decisions — for those who care.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Flutter / Dart |
| State management | Riverpod |
| Database | Drift ORM + SQLite |
| Routing | go_router |
| Cloud | Firebase (Auth + Firestore) |
| Charts | fl_chart |
| Theme | Catppuccin (Mocha / Latte) |
| CI/CD | GitHub Actions → GitHub Pages |

### Key Design Decisions

- **Local-first**: Drift (SQLite) keeps the app working offline; cloud sync is supplementary
- **Riverpod for state**: Plays well with static analysis and is easy to test
- **Catppuccin theme**: Dark and light both supported, balancing legibility and consistency
- **GitHub Pages delivery**: Zero running cost. Flutter Web's `web` build is hosted directly
