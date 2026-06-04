---
title: "Tasukiba, an AI Operations Secretary, Ships Today — Six Months in Review"
description: "Tasukiba Knowledge Relay launches June 1, 2026: an AI operations secretary for project management and knowledge management that uses semantic search to surface past project knowledge, risks, issues, retrospectives, and notes at project start. Three plans from $0/month, the tech stack, and core features — delivered with launch-day emotion intact."
date: 2026-06-01
tags: ["tasukiba", "release", "business-saas", "nextjs", "indie-saas"]
seriesCategory: "milestone"
---

## We're live

As of today, June 1, 2026, **Tasukiba Knowledge Relay** is officially live.

I'm writing this at 6 a.m. I reviewed the deploy logs three times, watched the health check pass, confirmed the production DB migration ran cleanly, and then went to the kitchen to make tea. The procedure was rehearsed many times. My hands were shaking a little anyway, this morning.

Six months ago, [I started writing the prototype](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/) half-doubting that a real launch day would actually happen. Late nights, weekends, small commits stacking up in a private GitHub repo no one would see. I'd like to tell that earlier version of me what today looks like — but the honest version is closer to: **"glad it actually works."**

Today, I'll set Chapter A's philosophy aside for one post and write **what the service actually does, screen by screen**, at release-day temperature. Tech-stack tables, three-plan numbers, plain feature explanations. Behind each of those, six months of small decisions are quietly waiting. I just wanted to mention that up front.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## Summary

| Item | Detail |
|---|---|
| **Name** | Tasukiba Knowledge Relay |
| **Release** | June 1, 2026 |
| **Target users** | Managerial roles at organizations that run projects continuously (PM / PL / team lead) |
| **Core feature** | When launching a new project, **semantic suggestions** of past project knowledge, risks, issues, retrospectives, memos |
| **Plans** | Beginner ($0, up to 5 seats) / Expert ($0 + usage) / Pro ($0 + usage + Sonnet) |

## What Tasukiba actually does

In one line: **a service that surfaces accumulated knowledge at the right moment.**

I'm deliberately writing "surface" instead of "search" or "store" — because the core mechanic is that **the system delivers candidates before the user goes hunting for them**.

When you launch a new project:

1. You enter the project's purpose, background, and scope
2. Tasukiba scores all past project assets via semantic search
3. **Up to 50 candidates** appear — 5 categories × up to 10 items each — ranked by relevance

By the end of that flow, the knowledge, risks, issues, retrospective lessons, and related memos from similar past projects are **already on your screen, without you having to remember to ask**.

## Why semantic search

Most existing project-management tools are great at storing data and weak at reusing it. Search is implemented as full-text keyword matching, which means:

- Search "security requirements" — past "data leak countermeasures" doesn't surface
- Search "QCD" — past "quality, cost, schedule" notes don't surface
- Full-text search is fast, but humans can't scan 1,000 hits in a meeting

Tasukiba uses **Voyage AI Embedding + PostgreSQL pgvector**.

- Voyage produces 1,024-dimensional vectors
- pgvector ranks by cosine similarity
- The final ranking is a **3-axis weighted score**: tag overlap (Jaccard, 0.3) + string similarity (pg_trgm, 0.2) + semantic similarity (Voyage, 0.5)

This catches **both surface-form variation and semantic proximity** in the same pass.

## Main screens

| Screen | Function |
|---|---|
| **Dashboard** | Your projects' state, recent activity, suggested candidates |
| **Project management** | 7-state one-way state machine, member management, settings |
| **WBS / Gantt** | Task hierarchy, resizable columns, CSV import |
| **Knowledge** | Markdown input, attachments, auto tag extraction |
| **Risks / Issues** | Resolution tracking, automatic surfacing of similar past cases |
| **Retrospectives** | KPT / Try-Action structure |
| **Memos** | Free-form notes, two visibility levels (private / shared) |
| **Estimation** | Effort calculation |
| **My Tasks** | Cross-project task view |
| **Tenant Admin** | User management, role changes, billing state, API usage |

## Pricing stance

I'll write about this in detail in a separate post, but Tasukiba's stance is **"pricing to continue, not pricing to extract."**

- **Beginner** (5 seats, $0/month) — for individuals and small teams. Project create/update is free up to 50 calls per month. Embedding for asset entry (knowledge / risk / issue / retrospective / memo) and chat semantic search is **free up to 100/month**.
- **Expert** (unlimited seats, $0/month) — usage-based for project create/update (¥10/call). Haiku model for auto tag extraction. Embedding is ¥5/call.
- **Pro** (unlimited seats, $0/month) — Expert + Sonnet model (¥15/call). LLM re-ranking with "why is this related" explanations, Pro-only. Embedding is ¥5/call.

Detail in ADR-0019 / ADR-0020 / ADR-0021, which I'll unpack later in the series.

## Tech stack

| Layer | Choice |
|---|---|
| Language | TypeScript 5.x |
| Frontend | Next.js 16.x (App Router) |
| UI | React 19.x + shadcn/ui + Tailwind CSS |
| ORM | Prisma 7.x (pg adapter) |
| DB | PostgreSQL 16.x (Supabase, pgvector) |
| Auth | NextAuth.js (Auth.js) 5.x + Credentials + TOTP MFA |
| Embedding | Voyage AI (voyage-4-lite, 1,024 dims) |
| LLM | Anthropic Claude (Haiku / Sonnet) |
| Billing | Stripe Metered Billing |
| Email | Brevo |
| Hosting | Netlify + Supabase (migrated from Vercel) |
| Testing | Vitest + Playwright |
| CI/CD | GitHub Actions (security score 90/100 enforced) |

## What "indie" honestly means

Tasukiba is built by me (teppei), alone, alongside a day job. Co-developers are coming, but for now it's me + Claude Code (only when needed).

So from the start, the energy has gone into **enforcing quality through structure, not individual will**.

- **Burn every quality gate into CI** (lint / tsc / test / E2E / Visual / Security)
- **Capture every trap in KDD (Knowledge-Driven Development)** — 16,000+ lines so far
- **Record every design decision as an ADR** — 21 so far
- **Keep the 3-layer docs (requirements / design / spec) current**

This is, paradoxically, **investment for the human developers who will join later**. As I wrote in [the psychological-safety post](/HomePage/en/blog/20260521-designing-psychological-safety/), reproducibility doesn't arrive without documentation.

## Coming next

Release is not the finish line. The series continues.

| Chapter | Theme | When |
|---|---|---|
| **B** | Product overview, screens, pricing, release scope (3 more) | Early June |
| **K** | Community, hiring, culture (4) | Mid June |
| **L** | Post-release vision (3) | Mid-to-late June |
| **Bonus** | Mascot / 6-month retrospective (3) | Late June |

## Closing

Tasukiba isn't aiming at hyper-growth. It's aiming at **returning the hour that quietly evaporates from someone's workday**.

Quiet. Also serious.

Release is the start, not the end. The [product page](/HomePage/en/product/tasukiba/) is open. If any of this resonates, come say hi on Discord.

Tomorrow's post: **the suggestion feature**, screen by screen.

## Related posts

- [I want to call it graduation, not leaving — why Tasukiba chose Discord](/HomePage/en/blog/20260531-tasukiba-graduation-culture/) — series part 6, Chapter A close
- [An hour a day was evaporating — why I built Tasukiba](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/) — series part 1, the origin problem
- [Trial run of Tasukiba Knowledge Relay](/HomePage/en/blog/20260507-tasukiba-launch/) — the first public announcement

## About Tasukiba

Tasukiba Knowledge Relay is a knowledge-centric business SaaS, free to start at $0/month. The [product page](/HomePage/en/product/tasukiba/) has the overview, screens, and plan detail.
