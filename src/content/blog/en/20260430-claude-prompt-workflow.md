---
title: "Never let Claude jump straight into code — the Explore → Plan → Code → Commit workflow"
description: "The Claude Code official best practices recommend a four-stage workflow: Explore, Plan, Code, Commit. Here's why skipping Plan Mode produces 'correct solutions to the wrong problem', and how the discipline has saved me hours in practice."
date: 2026-04-30
tags: ["Claude Code", "AI-driven development", "workflow", "prompt engineering", "learning"]
---

## Series part 3

[The previous post](/HomePage/en/blog/20260429-claude-prompt-principles/) covered the three core principles. This post is about **the development workflow** that turns those principles into execution.

The Claude Code docs lay it out in a single, memorable pattern: **Explore → Plan → Code → Commit**.

## Jumping straight to code is the worst anti-pattern

From the official guide:

> Letting Claude jump straight to coding can produce code that solves the wrong problem. Use Plan Mode to separate exploration from execution.

**Skip exploration and planning and you'll get working code that solves the wrong problem.** I've been burned many times:

- "Add an API endpoint" → Claude designs one that conflicts with an existing route
- "Fix this bug" → Symptoms disappear but the root cause is still there
- "Refactor this" → Claude rebuilds it in a style the rest of the codebase doesn't use

Every one of those was my fault for skipping Explore and Plan.

## The four stages

### Step 1 — Explore

First, have Claude read the codebase:

> "Read through the authentication module in `src/auth/`. Don't write code yet — just summarize what you find."

The key phrase is **"Don't write code yet."** Without it Claude will start "helpfully fixing" things as it reads.

### Step 2 — Plan

Then have it draft a plan:

> "Now propose a plan to add rate limiting to `/api/login`. Include: (1) files to modify, (2) new dependencies if any, (3) testing strategy."

Make it enumerate **files, dependencies, and testing strategy**. This is where I review. If the direction feels off, I push back before a single line is written.

### Step 3 — Code

Only once the plan is approved do we start implementing:

> "Now implement the plan above. Run the tests after each file change."

**Run tests incrementally** so regressions surface immediately.

### Step 4 — Commit

After implementation, tests, and build pass, commit:

> "Summarize the changes in 1-2 sentences for the commit message. Focus on 'why', not 'what'."

## When you can skip Plan Mode

The guide is explicit that **simple, localized changes don't need the full ritual**:

> For simple, localized changes (typo fix, single variable rename, trivial refactor), you can skip Plan Mode.

The rule of thumb: if the change stays inside a single function, skip Explore and Plan. If it touches multiple files or modules, do all four stages.

## A moment Plan Mode saved me

When I was building the scheduled-publishing feature for my blog, I asked Claude to "add scheduled publishing." Its first proposal involved **introducing a new database table**.

But this site is a static SSG with no database. **Plan Mode let me catch that** before any code was written. The real implementation just reads the `date` frontmatter and filters via an `isPublished()` function — a fraction of the change.

If I'd gone straight to code, I'd have paid for wiring up an unnecessary database.

## Pass concrete context during Explore

The quality of the plan depends on the quality of the Explore-stage context:

| Context to share | Why |
|---|---|
| Explicit paths to relevant files | So Claude doesn't guess |
| Existing test files | Reveals expected behavior |
| Implementations of similar features | Teaches codebase conventions |
| Relevant commit messages | Conveys intent |

## Recap — how to make the workflow stick

| Stage | Do | Don't |
|---|---|---|
| Explore | Read, summarize | Let Claude start editing |
| Plan | Review the plan | Proceed without a plan |
| Code | Run tests as you go | Declare "done" without verification |
| Commit | Let Claude summarize in 1-2 lines | Hand-write every commit message |

**Just by refusing to jump to code, AI-driven development transforms.**

## Related posts

- [Treat Claude like a brilliant new intern — the three principles Anthropic prioritizes](/HomePage/en/blog/20260429-claude-prompt-principles/) — principles
- [The Claude Code prompt playbook was hiding in the official docs — kicking off a new series](/HomePage/en/blog/20260428-claude-code-prompt-guide/) — series overview
- Reference-grade Qiita version: [Qiita profile](https://qiita.com/teppei19980914)
