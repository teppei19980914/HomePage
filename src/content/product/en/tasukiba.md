---
title: "Tasukiba — PM Platform Connecting Knowledge"
description: "Tasukiba passes knowledge between projects like a baton. WBS, risks, and retrospectives all connect with knowledge at the center. Built on Next.js + PostgreSQL."
tagline: "The more you run it, the better the next one goes. Project management that connects knowledge."
date: 2026-04-16
tags: ["Project Management", "Knowledge Management", "Business Software", "Next.js", "React", "TypeScript", "PostgreSQL", "Prisma"]
status: beta
order: 3
---

> **Leave the insights. Hand over the judgments. Make every project stronger.**
>
> A project management platform that supports the entire flow from planning through retrospective, with knowledge at the center.

## Sound Familiar?

"**If only that one insight had existed earlier, we could have estimated this far more accurately.**"
"**If the predecessor had left a record, we wouldn't have lost half a day to the same bug.**"

On real project floors, the same failures repeat themselves, while precious decisions and learnings get buried in individuals' heads or scattered documents. When the person leaves, the knowledge leaves with them.

To reduce that frustration through systems — that is the starting point of **Tasukiba**.

## What's in the Name

The name "Tasukiba (襷場)" comes from the place where one runner hands the relay baton (襷, *tasuki*) to the next. Tasukiba aims to be **the place where the person who ran one leg can reliably hand the baton of insight to the next**.

## Problems We Solve

| Problem on the floor | What Tasukiba does |
|---|---|
| Estimation rationale doesn't get retained, so we estimate from zero each time | Records estimate hours, rationale, and related knowledge as history |
| Risks and responses scatter, so prevention doesn't compound | Links knowledge to risk/issue management to suppress recurrence |
| Retrospectives become a formality and don't reach the next project | Builds the loop of retrospective → knowledge → reuse |
| Operations rely on individuals, so things collapse when they leave | Structures projects, tasks, and knowledge for continuous use |
| Quality, cost, and schedule balance is invisible | Visualizes plan vs. actual end-to-end |

## Main Features

We connected the features needed to run projects, with **knowledge sitting in the middle**, on a single platform.

| Feature | What it does |
|---|---|
| **Project management** | Manages state transitions from planning to retrospective |
| **Estimation management** | Builds high-accuracy estimates by referencing past records and knowledge |
| **WBS / task management** | Hierarchical task assignment and progress updates |
| **Gantt chart** | Time-series visualization of schedule, progress, slippage, and milestones |
| **Risk / issue management** | From filing to recording responses, with CSV export |
| **Knowledge management** | Full-text-searchable knowledge base, reusable across projects |
| **Retrospective** | Wraps up completed projects (KPT format) and auto-promotes them into knowledge |
| **My tasks** | Per-person task lists with progress-update shortcuts |

### What "Knowledge at the Center" Means

Most other project management tools place task management and knowledge management as separate modules. Tasukiba places **knowledge at the center**, with estimation, tasks, risks, and retrospectives all bidirectionally linked to it.

Just by going through your daily work, "knowledge that will help someone in the next project" naturally accumulates.

## Where It Fits

| Scene | What Tasukiba does for you |
|-------|----------------------------|
| **Want to apply insight across projects** | Full-text search + auto-suggestion brings up past insights when needed |
| **Know-how vanishes when people rotate out** | Structured knowledge and decision history slash handover cost |
| **Want to improve estimation accuracy** | Surfaces actual hours and retrospectives from past work as evidence |
| **The same risk patterns keep happening** | Similarity search by project attributes against past risks and responses |
| **Need to handle business data safely** | MFA, audit logs, and access control fit business-grade use |

## Status & Roadmap

- **2026-04-15**: All MVP phases complete
- **2026-04-23**: Repository organization phase complete. Team-onboarding ready
- **2026-05-01**: Pre-release (introduction-only public; external login is invite-only)
- **2026-06-01**: General release planned (cloud / on-premise / local — three environments)
- **Beyond**: Monitoring/alerting setup, incident response workflows, regular release cycle

After GA, the foundation is in place to expand into **AI features such as similar-project recommendation and risk pre-detection**.

## Community

Open channels for users and developers.

- [Discord server (real-time)](https://discord.gg/AYekewZg2S)
- GitHub Discussions: planned once the public repo is ready

---

## For Developers

The rest of this page covers the strengths, internal design, and tech stack — for those who care.

### Strengths — What Makes This Service

#### 1. A "Suggestive" Design Built Around Knowledge

Using the project's business domain, phase, and tech stack as keys, Tasukiba **automatically surfaces relevant insights, risks, and retrospectives from past projects**. It eliminates the "I can't search for what I don't know exists" problem.

#### 2. Take Security Head-On

As a service that holds business data, security is treated as a top-tier concern.

- Multi-factor authentication (MFA), required for admin roles
- Role-based access control to prevent cross-project unauthorized access
- Automatic logging of all data changes, auth events, and permission changes
- Password policy, account lockout, and auto-deletion of unused accounts
- Six-layer security scans run automatically through the development workflow
- Quarterly threat modeling instituted as a standing operational practice

#### 3. Quality Backed by Numbers

Aiming for "a service that keeps running" rather than "a service that runs," quality is managed numerically.

- **646** unit tests, all passing, continuously maintained
- **80%** code coverage enforced by CI (build fails below)
- E2E tests and visual regression tests automatically validated across 10 themes

#### 4. Designed Assuming AI-Driven Development

This service is **a repository designed around AI assistance**. Pre-commit checks, dangerous-code detection, and synchronized documentation updates are built in to keep development reproducible and high-quality. The capacity to maintain quality with a small team is reflected directly in the service itself.

#### 5. Treat Documentation as a First-Class Asset

Role-based document structure (newcomer / developer / operations admin), a newcomer guide that goes from environment setup to PR creation in 30 minutes, and historical decision records — all aimed at **a state where humans can take over even without AI**. The future of the service is not allowed to depend on a single person's head.

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) / React 19 / TypeScript |
| UI | shadcn/ui / Tailwind CSS |
| Backend | Next.js API Routes / Server Actions |
| Database | PostgreSQL 16 (full-text search via pg_trgm — no external search engine needed) |
| ORM | Prisma 7 |
| Auth | NextAuth.js (Auth.js) 5 + TOTP MFA |
| Testing | Vitest / Playwright |
| Deploy | Vercel + Supabase |

We aim for **zero runtime cost**, running on Vercel Hobby + Supabase Free until pre-release.

## In Closing

Tasukiba is not a service that surprises you with flashy new features. **The more projects you run, the more the organization's knowledge surely accumulates.** That quiet, but essential, mechanism is what we are building head-on.

Reduce the frustration on the project floor through systems, and become the place where the next runner can be reliably handed the baton — that is this service's role.
