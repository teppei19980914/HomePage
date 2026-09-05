---
title: "From Built-and-Never-Used to Three Apps at Zero Cost"
description: "Engineer who built local-only apps met Claude Code, cleared the server hurdle, runs three products at zero cost — and the constraint-driven design behind it."
date: 2026-04-27
tags: ["Personal Dev", "Claude Code", "Zero Cost", "Design", "GitHub Pages", "Vercel"]
---

## Programming Study Without a Goal

Ever spent months "learning programming" and quietly wondered, *what am I actually building toward?*

Before my career as an engineer began, I was practicing programming as "study for study's sake."

Type the sample code from a book or website into the IDE, run it, see output in the console. If it works, move on to the next chapter. Nothing wrong with that — except I had no honest answer to **what I wanted to build through all this learning**.

"I learned Java syntax." "I can write SQL." Knowledge was stacking up. But I had no real sense of producing anything with it. Input piling up with no outlet for output. That state lasted years.

## The "Built and Never Used" Loop

I eventually started building personal apps. Then I hit another wall.

**I had no idea how to publish what I built to the internet.**

More precisely, I was held back by assumptions: "I have to build a server." "Servers cost money." Looking at the AWS or Azure service catalog, simulating monthly bills, I'd flinch and retreat — and end up only building apps that ran locally.

This is how the **"built and never used" loop** was born.

1. Have an idea
2. Build a locally-running app
3. Get bored because only I use it
4. Abandon it and move to the next idea
5. Back to 1

I cycled through this many times. Technical skill rose slowly. Nothing reached anyone else. Frustration was the only thing that piled up.

## Meeting Claude Code

The turning point was meeting Claude Code.

What Claude Code changed for me wasn't only coding speed. **The hurdle of server setup dropped dramatically** — that was the actual biggest shift.

"Static sites can be hosted free on GitHub Pages." "Vercel deploys Next.js as-is." "Supabase has a free PostgreSQL tier." I'd vaguely known these — but the actual steps — writing config files, building CI/CD, hooking up domains — was a region I couldn't step into alone.

With Claude Code, I could walk through those **concrete steps** one at a time. As a result, I published an app to the internet for the first time, and gained an environment where someone besides me could touch what I'd built.

## Constraint-Driven Design

Once I could publish, learning sped up. What deepened it by another level was **constraint-driven design**.

If you use AWS or Azure freely, technical constraints almost vanish. But **that's not interesting**.

So I imposed a rule on myself: **operations cost must be ¥0 / month**.

Under that rule, every technical choice becomes a series of trade-offs.

| Decision | Choice without constraint | Choice under "¥0" |
|---|---|---|
| Hosting | EC2 / ECS | GitHub Pages / Vercel (free tier) |
| Database | RDS | Supabase Free / local Drift DB |
| Auth | Cognito | NextAuth.js + DIY |
| Email | SES | Resend (free tier) / Formspree |
| Storage | S3 | inside the Git repository / browser IndexedDB |
| Batch jobs | Lambda + EventBridge | GitHub Actions (cron) |

By repeatedly asking, "if the service I want is paid, how do I deliver the same experience for free?", I came to deeply understand each service's essential function and its cost structure. This is **design skill that only practice teaches** — not the textbook.

## The Pursuit of Maintenance-Free

Beyond ¥0 cost, the other thing I'm chasing is **maintenance-free**.

In personal dev, "operations after building" is the actual final boss. Manual deployment, manual data updates — that operational drag drains motivation, and the product quietly gets abandoned.

So I built a daily automated batch on GitHub Actions, automating:

- **Scheduled blog publishing** — articles whose `date` is today or earlier auto-publish
- **External API data fetching** — periodically pull Qiita articles into the site
- **Build & deploy** — main-branch push triggers automatic deployment

So all I do is write an article and push to Git. The rest carries through to publication on its own. Zero server-tending. **Zero cost, zero maintenance.**

## The Products Currently Live

Currently, three products run at ¥0 / month operations cost.

| Product | Tech stack | Hosting |
|---|---|---|
| [YumeHashi](/HomePage/en/product/yumehashi/) | Flutter Web / Drift / Riverpod | GitHub Pages |
| [Defrago](/HomePage/en/product/defrago/) | Flutter Web / Drift / Riverpod | GitHub Pages |
| [HomePage](/HomePage/en/) | Astro / TypeScript | GitHub Pages |

All three at **completely ¥0** monthly.

## Claude Code as an Up-Front Investment

Claude Code carries a monthly subscription. Undeniably a cost.

But I treat it as **an up-front investment**.

Before Claude Code, I was trapped in the "build local, abandon, repeat" loop. Today I publish three products, run a portfolio site, and ship blog posts on a regular cadence.

The difference is dialogue with Claude Code. The return I get — in the form of **skill growth** — clearly exceeds what I pay.

## From "Goal-less Learning" to "Practice Under Constraint"

Looking back, my programming learning had three phases.

1. **Input phase** — learning syntax via books and the web (no goal)
2. **Local phase** — building apps but unable to publish (no outlet)
3. **Publishing phase** — designing under constraint and shipping to the internet (now)

Phase 1 → 2 happened naturally. Phase 2 → 3, however, required **an external trigger**. For me, that trigger was Claude Code.

If you're in the same "build and never use" loop today, here's the one thing I want to say.

> **Servers don't have to cost money. Publishing is much easier than you imagine.**

GitHub Pages, Vercel, Supabase — mountains of free infrastructure. And as a partner who walks through the configuration steps with you, AI tools are extremely capable.

Once you take that first step, the speed of learning shifts dramatically. Beyond "build and never use" lies a different view entirely: **"build and deliver."**

## Related Articles

- ["Tests Disappeared as a Phase" — Comparing AI-Driven and Traditional Development](/HomePage/en/blog/20260410-ai-driven-development/) — Concrete data from development with Claude Code
- [From "YumeLog" to "YumeHashi" — Building a Bridge Between Dreams and Reality](/HomePage/en/blog/20260408-yumehashi-story/) — Development philosophy behind the ¥0 products
- [Why I Built This Homepage — Walking with Astro v6](/HomePage/en/blog/20260418-astro-v6-homepage/) — The tech stack and design decisions behind this site
- [Everything Vanished Before I Hit "y" — Safety Design for a Self-Built AI Coding Tool](/HomePage/en/blog/20260829-vibe-coding-tool-safety-design/) — Where the encounter with Claude Code led: designing safety for AI file operations
