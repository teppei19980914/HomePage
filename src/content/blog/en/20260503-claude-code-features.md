---
title: "Claude Code-only features — Skills, Subagents, Hooks, Plan Mode explained"
description: "Claude Code has features the Web and API versions don't. This post organizes the most important ones — Skills, Subagents, Hooks, Plan Mode, Auto Mode — and shows how I combine them in my personal projects."
date: 2026-05-03
tags: ["Claude Code", "AI-driven development", "Skills", "Subagents", "learning"]
---

## Series part 6

[Part 5](/HomePage/en/blog/20260502-claude-prompt-instructions/) covered five instruction techniques. This post is about **Claude Code–specific features** and how to decide which to reach for.

## Feature list

From the official docs:

| Feature | What it does |
|---|---|
| **Skills** | Inject reusable how-to guides / domain knowledge |
| **Subagents** | Spawn a separate agent to run a subtask in isolation |
| **Hooks** | Auto-run scripts on tool invocations |
| **Plan Mode** | Force Claude to plan without writing code |
| **Auto Mode** | Run non-interactively |
| **Slash Commands** | `/clear`, `/compact`, `/rewind`, etc. |

## Let Claude interview you — the reverse-interview trick

Surprisingly underused, and explicitly recommended by Anthropic:

> When starting a complex task, ask Claude to ask you clarifying questions before implementation.

Instead of front-loading all context, **ask Claude to list its questions first**:

```
I want to implement {{goal}}.
Before we start, please list up to 5 questions you'd want me to answer first.
```

I use this every time I design a new feature. It surfaces assumptions I never spelled out.

## Offload research to Subagents

For heavy exploration, **delegate to a subagent** so the main session's context stays focused.

> Delegate exploratory research to subagents so the main agent's context stays focused on execution.

"Find every instance of pattern X in the codebase" is the perfect Subagent task — you only want the summary back in your main session.

## The Writer / Reviewer pattern

Officially recommended collaboration mode:

> Have one Claude session write code, then start a fresh Claude session to review it.

**Separate the session that writes from the session that reviews.**

| Role | Session |
|---|---|
| Writer | Dedicated to generation; done when tests pass |
| Reviewer | A fresh `/clear`ed session; reviews the code from the outside |

**An outsider's eye catches things the Writer couldn't.**

## Non-interactive automation

With the `--print` flag, Claude Code runs without interaction — ideal for CI.

> Use `--print` flag for non-interactive automation.

I'm designing a CI flow where "Claude auto-reviews every PR and posts comments" based on this. If it ships, human review load drops another tier.

## Anti-patterns the docs explicitly warn against

| ❌ Anti-pattern | Why |
|---|---|
| Working for hours in the same session | Context pollution → `/clear` |
| Vague "make it nice" asks | Violates the Golden Rule |
| Marking tasks done without verification | Hallucination breeding ground |
| Skipping Plan Mode | Right solution to the wrong problem |
| Giant `CLAUDE.md` | Ironically, more context pressure |

The **giant CLAUDE.md pitfall** is easy to fall into. The official guidance: keep it around 150 lines, and push details to Skills.

## How I combine features on HomePage

| Tool | How I use it |
|---|---|
| `CLAUDE.md` (rules only) | ~150 lines, project-wide guardrails |
| `.claude/skills/` | "Add a blog post" / "SEO check" procedures |
| Hooks | Stop-hook runs tests + pre-commit checks automatically |
| Plan Mode | Mandatory for any multi-file change |
| `/clear` | Always after each task |

The net effect: **"repeating the same instructions" has disappeared from my workflow.**

## Cost-reduction priority (my interpretation)

Ranked by impact on Claude's token usage:

| Rank | Lever | Effect |
|---|---|---|
| 1 | Disciplined `/clear` | Kills context pollution at the source |
| 2 | Plan Mode | Prevents wasted rewrites |
| 3 | Well-maintained CLAUDE.md | Eliminates repeat instructions |
| 4 | Subagents for research | Keeps the main agent focused |
| 5 | Upfront verification criteria | Fewer iteration cycles |

## Which feature for which problem

| Problem | Feature |
|---|---|
| Repeating the same instructions | CLAUDE.md |
| Complex tasks going off the rails | Plan Mode |
| Session feels like it's lost its edge | `/clear` |
| Huge investigation task | Subagents |
| Want to review what Claude wrote | Writer / Reviewer |
| Need to run inside CI | Auto Mode |

## Related posts

- [Writing instructions Claude gets right on the first try](/HomePage/en/blog/20260502-claude-prompt-instructions/) — instruction techniques
- [Never let Claude jump straight into code — the EPCC workflow](/HomePage/en/blog/20260430-claude-prompt-workflow/) — Plan Mode in depth
- Reference-grade Qiita version: [Qiita profile](https://qiita.com/teppei19980914)
