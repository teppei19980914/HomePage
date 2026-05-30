---
title: "Launching 'Tasukiba Knowledge Relay' — a project platform that passes knowledge like a baton"
description: "My fourth personal product, 'Tasukiba Knowledge Relay', enters trial operation. It is a project-management platform built around knowledge — the insights one team accumulates get handed down to the next team, like a relay baton."
date: 2026-05-07
tags: ["personal project", "Tasukiba", "project management", "knowledge management", "Next.js"]
seriesCategory: "milestone"
---

## Starting my fourth personal product

Ever felt that quiet pain on a kickoff day — "wait, hasn't someone already figured this out before?"

Following YumeHashi, Defrago, and HomePage, my **fourth personal product** is entering trial operation.

**"Tasukiba Knowledge Relay"** — a project management platform where the insights captured on one project are **handed like a baton** to the next team.

👉 **[Product page](/HomePage/en/product/tasukiba/)**

## Why build this

On every project I've worked on, I've watched the same scenes play:

> "If only this insight had been written down, we could have estimated much better."
>
> "If the previous person had left notes, we wouldn't have wasted half a day on the same trouble."

Precious judgment and lessons live in **individual heads, scattered docs, or quietly leave with the people who depart**. The same mistakes repeat. Organizational knowledge never compounds.

Tasukiba exists to shrink that frustration through tooling.

## Where the name comes from

"Tasukiba" (襷場) refers to **the place where relay runners hand off the sash (襷, tasuki)** in the Japanese ekiden marathon.

> Where one runner, who just sprinted their leg, can reliably hand the baton — the insights — to the next.

**The runners are the team members. The platform carries the baton.** That division of labor is the core of the service.

## What's different from other PM tools

A lot of project-management tools keep task management and knowledge management as **separate modules**. Notion, Jira, Asana — all excellent — but **knowledge is rarely at the center of the model**.

Tasukiba puts **knowledge at the center**, with estimates, tasks, risks, and retrospectives all linking bidirectionally into it.

| Typical tool | Tasukiba |
|---|---|
| Task / knowledge as separate modules | **Knowledge is central**, everything links to it |
| Retrospectives vanish into minutes | Retrospectives auto-promote to knowledge |
| Estimates start from scratch | **Auto-suggest** from past knowledge |
| Handoff breaks when people leave | Structured to survive handoffs |

## Vision — "The more you run it, the stronger it gets"

The single line I want to convey:

> **The more projects you run, the better the next one goes.**

Every project adds to organizational knowledge. When a new project kicks off, the baton from the previous ones is already in hand. **Quiet, but fundamental — that's the goal.**

## Stack & priorities

### Tech stack

- **Frontend**: Next.js 16 (App Router) / React 19 / TypeScript
- **UI**: shadcn/ui / Tailwind CSS
- **Database**: PostgreSQL 16 (full-text search via pg_trgm)
- **Auth**: NextAuth.js 5 + TOTP MFA
- **Deploy**: Vercel + Supabase (free tier)

### Priorities

| Priority | How |
|---|---|
| Security | MFA required / RBAC / 6-layer scans / quarterly STRIDE |
| Quality | **646 unit tests** / 80 % coverage enforced |
| AI-driven dev | Repo engineered from the ground up for AI assistance |
| Documentation | Role-based 3-directory structure / 30-min onboarding |

Built to be **not just "a service that works," but a service that keeps working.**

## Roadmap

| Date | Milestone |
|---|---|
| 2026-04-15 | MVP phases complete |
| 2026-04-23 | Repo cleanup done, trial operation starts |
| 2026-05-01 | Pre-release (announcement only) |
| **2026-06-01** | **Official release** (3 deployment modes) |

Post-release, AI features like **similar-project recommendations** and **risk prediction** are next in line.

## A theme across four products

YumeHashi is "turning dreams into goals." Defrago is "defragmenting a fragmented mind." HomePage is "productizing yourself." Tasukiba is "**passing knowledge to the next person**."

Looking at the four side by side, a shared theme rises: **giving form to things that don't yet have shape**. Dreams, thoughts, self-image, knowledge — all things normally scattered across heads and meeting notes, all getting a structured place to live.

That's probably a reflection of what I quietly care about.

## Currently in trial operation

Tasukiba isn't officially released yet. On the product page it shows as **"in development — stay tuned"** with a grayed-out appearance, but **the article itself is readable**.

- 👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

Looking forward to the official release in June 2026. If you've ever lost a colleague mid-project and felt your team's "history" walk out the door with them, I'd love to hear how you've handled it.

## Continued in a series

After this trial-run post, I started a deeper series on building Tasukiba — covering the origin philosophy, the suggestion engine, billing, community, the roadmap, and the six-month retrospective. Suggested entry points:

- [An hour a day was evaporating — why I built Tasukiba](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/) — series part 1, the original problem statement
- [Release announcement — Tasukiba Knowledge Relay launches June 1, 2026](/HomePage/en/blog/20260601-tasukiba-release-knowledge-relay/) — the official launch post
- [Six months to a SaaS — a solo-development retrospective](/HomePage/en/blog/20260614-tasukiba-6-month-retrospective/) — closing post of the series's first half

## Related posts

- [From "Yumelog" to "YumeHashi" — building a bridge between dreams and reality](/HomePage/en/blog/20260408-yumehashi-story/) — philosophy of my first personal product
- [From "built but never used" to running three products at zero monthly cost](/HomePage/en/blog/20260427-zero-cost-and-claude-code/) — Tasukiba aims for the same zero-cost operation
