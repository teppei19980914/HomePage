---
title: "Defrago"
description: "An app that defragments your mental memory so the brain focuses on what matters. Python / FastAPI / HTMX / SQLite with a capture-clarify-engage-review PDCA."
tagline: "The simplicity of taking the shortest path to the goal."
date: 2026-04-03
tags: ["Python", "FastAPI", "HTMX", "SQLite", "SQLAlchemy"]
url: "https://defrago.onrender.com/"
repo: "https://github.com/teppei19980914/Defrago"
status: active
order: 2
---

## Defragment Your Mind.

"I have to do this." "Don't forget that." Is your head a scattered list of tasks?

Working memory is severely limited. As long as unprocessed tasks fragment your memory and keep occupying it, **you cannot focus on the tasks where humans need to actually perform**.

**Defrago**, like a PC's disk defragmenter, defragments the worries and tasks scattered in your head and points your brain's resources at the work you should actually focus on.

> **Defrago** = Defragment + Go
> Sort the scattered thinking, then act on it immediately.

## Concept

**The simplicity of taking the shortest path to the goal**

Unnecessary features were ruthlessly stripped away in pursuit of a design where the user never gets lost, never has to think, and reaches focus on a task as fast as possible. Not "more," but "less, but the shortest path to the goal." This philosophy sits at the root of every design decision in Defrago.

## Three Design Principles

| Principle | Description |
|------|------|
| **Zero-Friction Capture** | Drive the cost of writing things down to zero. Externalize the moment a thought arises. |
| **One Screen, One Decision** | The judgment required on each screen is always exactly one. Never get lost, never overthink. |
| **Think Less, Do More** | The app guides the decision flow. Don't spend brain on management — spend it on action. |

## Fast PDCA — Four Phases

A PDCA cycle for releasing the fragmentation in your head and pointing brain resources at what should be focused on.

```
Capture → Clarify → Engage → Review → (loop)
```

| Phase | What you do |
|---------|-----------|
| **Capture** | Write everything that bothers you into the Inbox. Empty your head with zero friction. |
| **Clarify** | A wizard guides Yes/No answers, auto-classifying into task / project / instant action. |
| **Engage** | Filter to what to do now. Status changes are one tap. |
| **Review** | Reflect on completed tasks and re-plan projects. Keep the cycle running. |

### Importance × Urgency Matrix

| Quadrant | Importance | Urgency | Action |
|------|--------|--------|-----------|
| **Q1** Necessity | High | High | Do now |
| **Q2** Effectiveness | High | Low | Plan it |
| **Q3** Illusion | Low | High | Consider delegating |
| **Q4** Waste | Low | Low | Defer/delete |

## Architecture

```
src/defrago/
├── models.py              # Data models (StrEnum + dataclass)
├── repository_protocol.py # Repository protocol
├── logic/                 # Business logic (web-independent)
│   ├── collection.py      # Capture
│   ├── clarification.py   # Clarify
│   ├── execution.py       # Engage
│   └── review.py          # Review
└── web/                   # FastAPI web application
    ├── app.py             # App factory
    ├── routers/           # Phase routers
    ├── templates/         # Jinja2 + HTMX partials
    └── static/            # CSS + HTMX
```

### Design Approach

- **Logic layer separation**: Business logic is fully isolated from the web layer via a repository protocol
- **Three-tier architecture**: Model → Logic → Web
- **HTMX**: Interactive UI without page transitions. SPA experience delivered server-side.
- **SQLite persistence**: Lightweight, zero-config

## Tech Stack

| Category | Technology |
|---------|------|
| Web | FastAPI + Jinja2 + HTMX |
| DB | SQLite + SQLAlchemy |
| Testing | pytest + httpx |
| Quality | ruff + mypy (strict) |
| CI/CD | GitHub Actions + Render |
