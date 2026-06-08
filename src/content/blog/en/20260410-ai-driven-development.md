---
title: '"The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared'
description: "A developer with zero Flutter experience used Claude Code to ship a production app in 3 weeks. This article compares every phase — from planning to testing — with real data showing 6-9x faster delivery and 6x higher test density."
date: 2026-04-10
tags: ["AI-Driven Development", "Claude Code", "Flutter", "Side Project", "Productivity", "New Programmers"]
featured: true
---

Ever had a senior tell you "you can't ship anything serious in 3 weeks"? I used to nod along too.

Then I shipped a production-quality web app in 3 weeks — with zero Flutter experience and zero scratch-development experience — using AI (Claude Code). It surprised me as much as anyone.

This article shares what changed in each phase, and by exactly how much, compared to traditional human-led development. With real numbers.

## Judge the quality yourself — try the app built in 3 weeks

It opens right in your browser. Free, no account required.

**[Try YumeHashi](/HomePage/en/product/yumehashi/)**

If you find yourself thinking "this was *really* built in 3 weeks?" — then the point of AI-driven development just landed.

---

## Developer Background

First, let me be transparent about my starting point — because context matters.

| Item | Value |
|---|---|
| Age | 27 |
| IT Industry Experience | ~5 years |
| Scratch Development Experience | **None** (only package/low-code) |
| Flutter / Dart Experience | **None** (this was my first project) |
| Mobile / Web App Development | **None** |

In other words, I started with **zero experience in the framework, language, and architecture design**. This is not a hidden expert story.

**Author's portfolio**: [Developer Homepage](https://teppei19980914.github.io/HomePage/)

---

## Before: How Long Would Traditional Development Take?

Here's the scale of the app, to set the scene:

| Item | Value |
|---|---|
| Lines of Code | ~48,000 (including tests) |
| Test Cases | 813 |
| Major Features | 32 |
| Screens | 8 screens + 21 dialogs |
| DB Tables | 6 tables |

Based on IPA's Software Development Data White Paper and COCOMO II estimates, traditional development would take **6-9 months**. Framework learning alone would eat 1-2 months.

---

## After: AI-Driven Development Results

| Metric | Traditional (Estimated) | AI-Driven (Actual) | Impact |
|---|---|---|---|
| **Development Period** | 6-9 months | **21 days** | 6-9x faster |
| **Code Production Rate** | 50-100 lines/day | **2,281 lines/day** | 23-46x |
| **Test Density** | 0-3 cases/KLOC | **16.9 cases/KLOC** | 6x+ |
| **Learning Cost** | 1-2 months | **0 days** | Eliminated |

The biggest single shift is **zero learning cost**. I wrote production code on day one without studying Flutter at all. That part still feels unreal when I say it out loud.

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

The interesting insight: **testing as a separate phase basically disappeared**. The AI generates tests alongside the code, so the dedicated test phase folds into development itself.

---

## How Is This Possible?

It's not magic. It's **systems**. Claude Code has 5 optimization levels.

| Level | Addition | What Gets Automated |
|---|---|---|
| 1 | Raw prompts | Nothing (manual every time) |
| 2 | + CLAUDE.md | Project rules auto-loaded |
| 3 | + Skills | Procedures injected on demand |
| 4 | + Hooks | Code formatting, test execution automatic |
| 5 | + Agents | Security/performance reviews run in parallel |

At Level 5, the human's job shrinks to **"decide what to build"** and **"verify it works."** Everything else is conveyor belt.

---

## What AI Can and Can't Do

| Role | Human | AI |
|---|---|---|
| **What to build** | Product vision, domain design | - |
| **How to build** | Final UX decisions | Architecture, tech selection, implementation |
| **Quality** | Manual testing, visual checks | Test generation, static analysis, security |
| **Release** | Commit & push | Automated checklist execution |

AI is not omniscient. The "keyboard covers the input field on mobile" bug? Only caught through human device testing. AI doesn't have thumbs.

**AI works best as an "engine that rapidly materializes human decisions."** The decisions still belong to you.

---

## What Did I Build?

The app built with this system is "[YumeHashi](/HomePage/en/product/yumehashi/)" (originally "YumeLog" and later renamed — see [the story behind the rename](/HomePage/en/blog/20260408-yumehashi-story/)).

**An app that turns dreams into action.** Three steps:

1. **Write it down** — Put your dream into words
2. **Break it down** — Decompose dreams into goals, goals into tasks
3. **Keep going** — Your activities light up as constellations

The app packs 32 features. For the deep tech stack write-up, see the [tech stack article](/HomePage/en/blog/20260407-yumehashi-tech-stack/).

---

## Frequently Asked Questions About AI-Driven Development

### Q. What is AI-driven development?

A. It's an approach where the specification is the single source of truth and implementation is delegated to an AI coding agent (Claude Code in this article). The human decides *what* to build; the AI handles design, implementation, and test generation. This article shows the effect with real numbers — shipping an app in three weeks in a language I'd never used.

### Q. How is it different from traditional development?

A. The biggest differences are learning cost and the testing phase. Traditionally, learning a framework takes 1–2 months; with AI-driven development you can start from day zero. And because the AI generates tests alongside the implementation, testing disappears as a separate phase. My estimate shows roughly 90% time reduction across the whole lifecycle.

### Q. Can someone with no programming experience build an app this way?

A. Yes — I started with zero Flutter and zero scratch-development experience. But you still need the judgment to decide *what* to build and whether the quality is good enough. The AI is an engine that materializes decisions fast; it can't replace the decisions themselves.

### Q. What are the downsides or caveats?

A. The AI can't catch device-dependent issues like "the keyboard hides the input field on mobile." Final UX judgment and real-device testing remain human work. And the knowledge of the person giving instructions strongly shapes the quality of the result — an easily overlooked caveat.

## Judge the quality yourself — try the app built in 3 weeks

It opens right in your browser. Free, no account required.

**[Try YumeHashi](/HomePage/en/product/yumehashi/)**

If you find yourself thinking "this was *really* built in 3 weeks?" — that's the whole pitch, landing.
