---
title: "16 Person-Days of Development Done in 2 Hours — Design Doc Completeness Determines Speed"
description: "In a personal project, AI-driven development completed 16 person-days of work in 2 hours. The biggest factor wasn't AI speed — it was the completeness of the design document that eliminated all decision-making."
date: 2026-04-24
tags: ["AI-Driven Development", "Design", "Productivity", "Side Project", "Essay"]
---

## 16 Person-Days Became 2 Hours

In a new personal project, I completed implementation that would take **16 person-days** manually using AI-driven development (Claude Code) in **about 2 hours**.

This article isn't about "AI is amazing." It's about how **design doc completeness sets the ceiling for development speed**.

---

## Why It Finished in 2 Hours

In AI-driven development, AI excels at "implementation" but struggles with "judgment."

| Task | AI Ability | Condition |
|------|-----------|-----------|
| Writing code | Excellent | If what to write is clear |
| Writing tests | Excellent | If what to test is clear |
| Choosing architecture | **Weak** | Too many options → hesitation |
| Designing data models | **Weak** | Requires business rule understanding |

**If you eliminate "judgment" from AI's work, AI runs at maximum speed.**

My DESIGN.md was 3,500 lines across 20 sections, pre-defining everything: tech stack, architecture, data models, API endpoints, permissions, and screen flows.

**I left AI zero room to think.** That's why it finished in 2 hours.

---

## Vague vs Complete Design Docs

| Aspect | Vague | Complete |
|--------|-------|---------|
| Tech | "Use React" | "Next.js 15 App Router + Prisma 7 + PostgreSQL 16" |
| Data | "Users and projects exist" | Full table definitions with columns, types, constraints |
| API | "Implement CRUD" | Endpoint list with paths, methods, request/response types |
| Permissions | "Admin and regular users" | RBAC matrix (role × resource × operation) |

Vague docs → AI asks questions at every step. Complete docs → AI implements without asking.

---

## Design Docs Are "Prepaid Development Time"

| Approach | Design | Implementation | Total |
|----------|--------|---------------|-------|
| No design | 0 hours | 20 hours (with rework) | 20 hours |
| Design first | 4 hours | 2 hours (no rework) | **6 hours** |

Time spent on design docs isn't consumption — it's **prepayment**.

---

## In Closing

Raising design doc completeness is tedious work. But it's **the only way to raise the ceiling of development speed**.

16 person-days became 2 hours not because AI was fast, but because **the design doc didn't let AI think**.

What exactly should you write to create a "complete" design doc? The next article breaks down the actual 20-section structure.

**[AI That Implements Without Hesitation — How to Write a 20-Section Design Doc](/HomePage/en/blog/20260425-design-doc-howto/) (Published April 25)**

## Related Articles

- [AI That Implements Without Hesitation — How to Write a 20-Section Design Doc](/HomePage/en/blog/20260425-design-doc-howto/) — The concrete structure
- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — AI development performance data
- ["Essentialism" and "Effortless" — The Two Wheels of What to Do and How to Do It](/HomePage/en/blog/20260419-essentialism-effortless/) — The thinking behind "what to do"
