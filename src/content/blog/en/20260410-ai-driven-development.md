---
title: '"The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared'
description: "A developer with zero Flutter experience used Claude Code to ship a production app in 3 weeks. This article compares every phase — from planning to testing — with real data showing 6-9x faster delivery and 6x higher test density."
date: 2026-04-10
tags: ["AI-Driven Development", "Claude Code", "Flutter", "Side Project", "Productivity", "New Programmers"]
featured: true
---

Starting from zero Flutter and zero scratch-development experience, I built a production-quality web app in 3 weeks with AI (Claude Code).

This article shares exactly what changed — and by how much — compared to traditional human-led development, with real numbers.

## Judge the quality yourself — try the app built in 3 weeks

It opens right in your browser. Free, no account required.

**[Try YumeHashi](https://teppei19980914.github.io/YumeHashi/)**

If you feel "this was really built in 3 weeks?", then the power of AI-driven development has been communicated.

---

## Developer Background

First, let me be transparent about my starting point.

| Item | Value |
|---|---|
| Age | 27 |
| IT Industry Experience | ~5 years |
| Scratch Development Experience | **None** (only package/low-code) |
| Flutter / Dart Experience | **None** (this was my first project) |
| Mobile / Web App Development | **None** |

In other words, I started with **zero experience in the framework, language, and architecture design**.

**Author's portfolio**: [Developer Homepage](https://teppei19980914.github.io/HomePage/)

---

## Before: How Long Would Traditional Development Take?

Here's the scale of the app:

| Item | Value |
|---|---|
| Lines of Code | ~48,000 (including tests) |
| Test Cases | 813 |
| Major Features | 32 |
| Screens | 8 screens + 21 dialogs |
| DB Tables | 6 tables |

Based on IPA's Software Development Data White Paper and COCOMO II model estimates, traditional development would take **6-9 months**. Framework learning alone would be 1-2 months.

---

## After: AI-Driven Development Results

| Metric | Traditional (Estimated) | AI-Driven (Actual) | Impact |
|---|---|---|---|
| **Development Period** | 6-9 months | **21 days** | 6-9x faster |
| **Code Production Rate** | 50-100 lines/day | **2,281 lines/day** | 23-46x |
| **Test Density** | 0-3 cases/KLOC | **16.9 cases/KLOC** | 6x+ |
| **Learning Cost** | 1-2 months | **0 days** | Eliminated |

The biggest impact is **zero learning cost**. I started writing production code on day one without studying Flutter at all.

---

## Phase-by-Phase Breakdown

| Phase | AI-Driven (Actual) | Traditional (Est.) | Reduction |
|---|---|---|---|
| Planning | 1 day | 1-2 weeks | 70-85% |
| Requirements | 1 day | 2-4 weeks | 80-90% |
| Specification | 2 days | 3-6 weeks | 80-90% |
| Design | 1 day | 2-4 weeks | 80-90% |
| Development | 14 days | 3-6 months | 85-95% |
| Testing | **Parallel with dev** | 1-2 months | **90-95%** |
| **Total** | **~21 days** | **7-14 months** | **~90%** |

The key insight: **testing disappeared as a separate phase**. The AI generates tests simultaneously with code, eliminating the dedicated testing phase entirely.

---

## How Is This Possible?

It's not magic — it's **systems**. Claude Code has 5 optimization levels.

| Level | Addition | What Gets Automated |
|---|---|---|
| 1 | Raw prompts | Nothing (manual each time) |
| 2 | + CLAUDE.md | Project rules auto-loaded |
| 3 | + Skills | Procedures injected on demand |
| 4 | + Hooks | Code formatting, test execution automatic |
| 5 | + Agents | Security/performance reviews run in parallel |

At Level 5, the human's job is only **"decide what to build"** and **"verify it works."**

---

## What AI Can and Can't Do

| Role | Human | AI |
|---|---|---|
| **What to build** | Product vision, domain design | - |
| **How to build** | Final UX decisions | Architecture, tech selection, implementation |
| **Quality** | Manual testing, visual checks | Test generation, static analysis, security |
| **Release** | Commit & push | Automated checklist execution |

AI isn't omniscient. The "keyboard covers the input field on mobile" issue was only found through human device testing.

**AI functions as an "engine that rapidly materializes human decisions."**

---

## What Did I Build?

The app built with this system is "[YumeHashi](https://teppei19980914.github.io/YumeHashi/)" (originally developed as "YumeLog" and later renamed — see [the story behind the rename](/HomePage/en/blog/20260408-yumehashi-story/)).

**An app that turns dreams into action.** 3 steps:

1. **Write it down** — Put your dream into words
2. **Break it down** — Decompose dreams into goals, goals into tasks
3. **Keep going** — Your activities light up as constellations

---

## Judge the quality yourself — try the app built in 3 weeks

It opens right in your browser. Free, no account required.

**[Try YumeHashi](https://teppei19980914.github.io/YumeHashi/)**

If you feel "this was really built in 3 weeks?", then the power of AI-driven development has been communicated.
