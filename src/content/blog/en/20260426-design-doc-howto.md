---
title: "AI That Implements Without Hesitation — How to Write a 20-Section, 3,500-Line Design Doc"
description: "Publishing the structure of the design doc that reduced 16 person-days to 2 hours in AI-driven development. The roles and priorities of 20 sections, and the 'must-write' points for each."
date: 2026-04-26
tags: ["AI-Driven Development", "Design", "Productivity", "Side Project", "New Programmers"]
---

## Publishing the Table of Contents

You know that feeling when AI keeps asking, "and what about X?" mid-implementation? Honestly, every one of those questions is a hole in your design doc.

In [the previous article](/HomePage/en/blog/20260425-design-doc-speed/), I argued that design doc completeness sets development speed. So what exactly makes a "complete" design doc?

Here's the structure that pulled off 16 person-days → 2 hours.

---

## The 20 Sections

| # | Section | Priority | Role |
|---|---------|----------|------|
| 1 | Document overview | ★☆☆ | Purpose, audience, related docs |
| 2 | **Tech stack** | ★★★ | What to use (with rationale) |
| 3 | **Architecture** | ★★★ | System diagram, layer structure |
| 4 | **Data model** | ★★★ | ER diagram, table relationships |
| 5 | **Table definitions** | ★★★ | Column names, types, constraints |
| 6 | State transitions | ★★☆ | Status transition rules |
| 7 | **API design** | ★★★ | Endpoints, request/response types |
| 8 | **Permission design** | ★★★ | Role × resource × operation matrix |
| 9 | Security | ★★☆ | Auth, CSRF, input validation |
| 10 | Infrastructure | ★★☆ | Docker, environment variables |
| 11 | **Screen flow** | ★★★ | Which screen leads where |
| 12-20 | Testing, seeds, etc. | ★☆☆ | As needed |

The **7 ★★★ sections** are what keep AI from having to think.

---

## "Must-Write" Points for Each Section

### Tech Stack: Write versions and rationale

Not "Use React" but "Next.js 15.x (App Router) — SSR/SSG integration needed."

### Data Model: Write down to column constraints

If types and constraints are fuzzy, AI asks questions every single time.

### API Design: List every endpoint

Path, method, auth requirement, response type — all in one table.

### Permission Design: RBAC matrix

Without this, AI asks "who can do this?" for every operation. Painful.

### Screen Flow: Express as directory structure

It maps 1:1 to routing, so AI never hesitates about file placement.

---

## Writing Order

| Order | Section | Why |
|-------|---------|-----|
| 1 | Tech stack | Everything else depends on this |
| 2 | Data model + tables | Data determines API |
| 3 | API design | Derived from data model |
| 4 | Permissions | "Who can do what" for each API |
| 5 | Architecture + screen flow | Visualize the big picture |
| 6 | Rest | Add as needed |

---

## In Closing

Start with just the 7 ★★★ sections. Even that, on its own, dramatically changes AI-driven development speed.

If your next AI session pauses to ask questions, you might try noting which one and turning it into a section in your design doc. That's how a complete design doc grows — one missing answer at a time.

## Related Articles

- [16 Person-Days Done in 2 Hours — Design Doc Completeness Determines Speed](/HomePage/en/blog/20260425-design-doc-speed/) — Why completeness matters
- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — AI development performance data
