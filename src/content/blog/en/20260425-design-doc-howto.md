---
title: "AI That Implements Without Hesitation — How to Write a 20-Section, 3,500-Line Design Doc"
description: "Publishing the structure of the design doc that reduced 16 person-days to 2 hours in AI-driven development. The roles and priorities of 20 sections, and the 'must-write' points for each."
date: 2026-04-25
tags: ["AI-Driven Development", "Design", "Productivity", "Side Project", "New Programmers"]
---

## Publishing the Table of Contents

In [the previous article](/HomePage/en/blog/20260424-design-doc-speed/), I wrote that design doc completeness determines development speed. So what exactly makes a "complete" design doc?

Here's the structure that achieved 16 person-days → 2 hours.

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

The **7 ★★★ sections** are what prevent AI from having to think.

---

## "Must-Write" Points for Each Section

### Tech Stack: Write versions and rationale

Not "Use React" but "Next.js 15.x (App Router) — SSR/SSG integration needed."

### Data Model: Write down to column constraints

AI asks questions every time if types and constraints are ambiguous.

### API Design: List every endpoint

Path, method, auth requirement, response type — all in one table.

### Permission Design: RBAC matrix

Without this, AI asks "who can do this?" for every operation.

### Screen Flow: Express as directory structure

Maps 1:1 to routing, so AI never hesitates about file placement.

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

Start with just the 7 ★★★ sections. That alone will dramatically change AI-driven development speed.

## Related Articles

- [16 Person-Days Done in 2 Hours — Design Doc Completeness Determines Speed](/HomePage/en/blog/20260424-design-doc-speed/) — Why completeness matters
- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — AI development performance data
- ["Black Box Thinking" — Life Is Too Short to Experience Every Failure Yourself](/HomePage/en/blog/20260418-failure-science/) — Accumulating judgments as systems
