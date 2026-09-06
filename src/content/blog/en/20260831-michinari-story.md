---
title: "From Plans That Never Survive Contact With Reality to an App You Just Follow — Why I Built Michinari"
description: "After years of study plans, reading habits, and work logs falling apart, I built Michinari — an app where AI re-plans your schedule daily and reflects on your logs with you. This covers where the name comes from and the design idea behind letting a system carry the planning so you can focus on execution."
date: 2026-08-31
tags: ["Side Project", "Michinari", "Study Management", "AI-Driven Development", "Essay"]
---

A study plan drifts off track within the first few days. Rebuilding a plan to catch up feels like too much work, so it just gets abandoned. You read a book but forget the content, with no sense that the time you spent is adding up to anything. Facing a monthly report, you can't recall what you actually did. I've repeated every one of these failures myself. To take on the burden of "keep recording" and "look back and reflect," I built a Windows app called **Michinari**.

## Why I stopped managing my own plans

A certification exam study plan usually drifts within the first few days. Try to catch up, and today's workload spikes, you can't sustain that weight, and you fall behind again. I've been caught in this loop more times than I can count. The same goes for reading and work logs — relying on willpower alone means they're the first thing cut whenever things get busy.

So with Michinari, I designed it so **the system itself takes on the work of re-planning**. All a person has to do is execute what's in front of them today. Instead of piling a missed day's backlog onto tomorrow, the system rebalances the load across the remaining time and remaining amount. I wanted to shrink the part that depends on willpower and leave people free to focus purely on execution.

## Where the name comes from

The name "Michinari" comes from a phrase Japanese car navigation systems use — "continue along the road" (michinari ni susunde kudasai). It carries two overlapping meanings: you can reach your destination just by following the path shown to you, and that path redraws itself the moment your situation changes.

A car navigation system doesn't scold you for taking a wrong turn. It doesn't blame you for getting stuck in traffic. It just quietly redraws the best route from wherever you are now to your destination. I thought study and work plans deserved the same attitude.

## What the three goal types share

Michinari has three independent goal types — certification exams, reading, and work — and each behaves differently. Exams get automatic daily reallocation of study load, reading gets accumulated logs and a completion report, and work gets monthly and biannual report drafts generated from daily logs. I'll dig into each mechanism in its own separate article.

What they share is a single idea: **push as much of the burden of planning, tracking progress, and reflecting onto the system as possible**. I wanted to leave a person with exactly one thing: "do what's in front of you today." That's also why I kept input fields to a minimum — writing free-text notes is enough to keep the habit going.

## Why bundle all three into one app

Exam prep, reading, and work are completely different in what they cover and how they progress. I still bundled them into a single app because I wanted **one place to open**. The home screen shows today's tasks and progress at a glance, and the calendar shows logged days, rest days, and exam dates all color-coded on one screen. Splitting goal types across separate apps has burned me before — one of them always ends up neglected while the others get opened. Keeping a single entry point is part of the design for staying consistent, too.

## Built to stay entirely local

Your records are stored only on your PC and are never sent to an external server. An internet connection is only needed when you use an AI feature. The daily reflections and plan revision suggestions run on an internal AI platform called "NewtonX" — the same platform behind the tool I wrote about in [Everything Vanished Before I Hit "y"](/HomePage/en/blog/20260829-vibe-coding-tool-safety-design/), a tool I built to bridge AI with a local environment. Without setting up the AI features, the core functions — logging, viewing, calendar, analytics — still work exactly the same.

## Closing

I built this app for a version of myself who was bad at both "keeping going" and "looking back." If you've been stuck in the same place, I'd be glad if you tried just one of the three goal types — exams, reading, or work — and let the app carry you along.

You can find the app itself at [Michinari](/HomePage/en/product/michinari/). The next article covers how it automatically re-plans exam study schedules.

## Related posts

- [Everything Vanished Before I Hit "y" — Safety Design for a Self-Built AI Coding Tool](/HomePage/en/blog/20260829-vibe-coding-tool-safety-design/) — another product built on the same AI platform Michinari uses
- [How I Went From "Build It, Never Use It" to Shipping Apps at Zero Operating Cost](/HomePage/en/blog/20260427-zero-cost-and-claude-code/) — the mindset behind continuing to build side projects
- [The 1.01 Rule: What It Means to End Today at Your Best](/HomePage/en/blog/20260814-daily-one-percent-growth/) — accumulating progress through systems rather than willpower
