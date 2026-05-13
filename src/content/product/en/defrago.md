---
title: "Defrago — A GTD App to Defragment Your Mind"
description: "Defrago defragments your mind: capture into Inbox, classify with 4 buttons, then engage and review without hesitation. Essentialism redesign v2.0.0."
tagline: "The simplicity of taking the shortest path to the goal."
date: 2026-04-03
tags: ["GTD", "Task Management", "Productivity", "Python", "FastAPI", "HTMX", "PostgreSQL"]
url: "https://defrago.onrender.com/"
repo: "https://github.com/teppei19980914/Defrago"
status: active
order: 2
---

## Your Brain Is Not a Task Warehouse

"I have to do this." "I can't forget that." Is your head packed with tasks?

Working memory is severely limited. As long as unprocessed tasks occupy that memory, your true creative capacity stays out of reach.

**Defrago** is a GTD task-management app that writes everything in your head into safe external storage and guides your brain into flow.

> **Defrago** = Defragment + Go
> Sort the scattered thinking, then act on it immediately.

## The 3 Design Principles of Defrago

| Principle | Description |
|------|------|
| **Zero-Friction Capture** | Drive the cost of writing things down to zero. Externalize the moment a thought arises. |
| **One Screen, One Decision** | The judgment required on each screen is always exactly one. Never get lost, never overthink. |
| **Think Less, Do More** | The app guides the decision flow. Don't spend brain on management — spend it on action. |

## The 4 GTD Phases

```
Capture → Clarify → Engage → Review → (loop)
```

| Phase | What you do |
|---------|-----------|
| **Capture** | Write everything that bothers you into the Inbox. Empty your head with zero friction. Sort it later. |
| **Clarify** | Pick from 4 classification buttons: delegate, project, do now, or task. |
| **Engage** | Filter to what to do now. Status change is one tap. |
| **Review** | Reflect on completed tasks and re-plan projects. Keep the GTD cycle running. |

### The 4 Clarify Buttons

In the Clarify phase, for each Inbox item, **pick one of 4 buttons**. No hesitation.

| Classification | Description |
|------|------|
| **Delegation** | Not for you. Hand it off to someone, or delete it. |
| **Project** | Needs 2+ steps. Plan via the 6-step Natural Planning model. |
| **Do Now** | Completes within 2 minutes. Do it now, or in the very near future. |
| **Task** | Has time/location. Set schedule and priority. |

Deleted items stay in the trash for **30 days**. Misclicks are safe.

## Project Planning — The Natural Planning Model

Big projects are structured by the GTD theory's 6-step model.

```
Step 1-2  Define purpose & desired outcome
          → Judgment criteria become clear; hesitation disappears

Step 3    Brainstorm
          → No judgment; surface every related element

Step 4-5  Organize & support material
          → Sort tasks, set deadlines, store reference docs

Step 6    Identify the next action
          → "What I do today" becomes obvious
```

## Redesigned Around Essentialism (v2.0.0)

Defrago v2.0.0 adopted **essentialism** — strip out complexity, focus on what is essential.

| Feature | v1 | v2 (Essentialism) |
|------|-----|-------|
| **Prioritization** | 10 levels by importance × urgency | Intuitive 4-bucket sorting |
| **Calendar** | A separate classification | Folded into "Do Now" as tasks |
| **Phase count** | 5 phases (Capture → Clarify → **Organize** → Engage → Review) | 4 phases (Capture → Clarify → Engage → Review) |
| **Classification** | Wizard (Yes/No questions) | 4 buttons (Delegate / Project / Do Now / Task) |
| **After delete** | Completely deleted | Recoverable for 30 days via trash |

The result: **shorter time to decide, faster transition from decision to action**.

## How to Use

### 1. Empty your head (Capture)

Open the Inbox and write everything that's on your mind. Don't worry about accuracy or order. The goal is to get "I'll think about it later" out of your brain.

### 2. Pick one of 4 buttons to clarify

For each Inbox item, pick one of the 4 buttons. No hesitation.

### 3. Act (Engage)

The dashboard tells you what to do next. You just do it.

### 4. Review

Review completed tasks, re-plan projects. **The GTD cycle keeps turning** so your head stays clear.

## Multi-user & Data Isolation

- Anyone can sign up freely (username: 3–50 chars of alphanumeric, hyphen, underscore)
- Passwords are securely hashed with bcrypt
- All GTD items are grouped by `user_id`; only the logged-in user's data is shown
- Notifications and projects are scoped per user (multi-tenant ready)

## The Icon Bar

Auxiliary tools accessible from the header icon bar.

| Icon | Function |
|------|---------|
| **Notifications** | Release notes and task-related notices |
| **Achievements** | A record of completed tasks and project completions |
| **Help** | Usage guide and tutorials |
| **Contact** | Send feedback to the dev team |

## Community

Open channels for users and developers.

- [GitHub Discussions (questions, ideas, talk)](https://github.com/teppei19980914/Defrago/discussions)

---

## For Developers

The rest of this page covers the tech stack and internals — for those who care.

### Architecture

The logic layer and the web layer are fully separated, in a 3-tier structure.

```
src/defrago/
├── models.py              # Data models (StrEnum + dataclass)
├── repository_protocol.py # Repository protocol
├── logic/                 # Business logic (web-independent)
│   ├── collection.py      # Capture
│   ├── clarification.py   # Clarify (4-button)
│   ├── execution.py       # Engage
│   └── review.py          # Review
└── web/                   # FastAPI web application
    ├── app.py             # App factory
    ├── routers/           # Phase routers
    ├── templates/         # Jinja2 + HTMX partials
    └── static/            # CSS + HTMX
```

| Aspect | Approach |
|--------|----------|
| Logic isolation | Business logic is fully isolated from the web layer via a repository protocol |
| Tiers | Model → Logic → Web (three tiers) |
| Interaction | HTMX delivers SPA-like UX without page transitions, server-side |
| Persistence | Production PostgreSQL / development SQLite + SQLAlchemy |

### Tech Stack

| Layer | Technology |
|---------|------|
| Web | FastAPI + Jinja2 + HTMX |
| DB | PostgreSQL (production) / SQLite (development) + SQLAlchemy |
| Auth | bcrypt (password hashing) |
| Testing | pytest + httpx |
| Quality | ruff + mypy (strict) |
| Deploy | Docker + Render + Neon PostgreSQL |
