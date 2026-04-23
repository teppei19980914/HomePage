---
title: "Treat Claude like a brilliant new intern — the three principles Anthropic prioritizes"
description: "Anthropic's official prompt engineering guide distills everything down to three principles: the Golden Rule, context-window management, and always providing a way for Claude to verify its own work. Here is what those principles look like in daily practice."
date: 2026-04-29
tags: ["Claude Code", "AI-driven development", "prompt engineering", "Anthropic", "learning"]
---

## Series part 2

[Part 1](/HomePage/en/blog/20260428-claude-code-prompt-guide/) covered the overall shape of the series. This post zeroes in on the three prompt principles the official guide highlights above everything else.

Nail these three and you're already at 90 percent.

## Principle 1 — The Golden Rule: would a context-less coworker know what to do?

The guide opens with this principle:

> Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too.

Anthropic describes Claude as a **brilliant new hire who doesn't yet know your team's conventions**:

> Think of Claude as a brilliant but new employee who lacks context on your norms and workflows.

Competent, eager — but missing all the tribal knowledge. So you need to spell things out explicitly.

### My take

Looking back, my earliest prompts were full of vague asks like "clean this up" or "make it nicer." I was assuming Claude shared the picture in my head. It didn't. Rewriting those prompts to include explicit **context, goal, and constraints** was a turning point.

## Principle 2 — Manage the context window

The root-level rule in Claude Code's best practices:

> Most best practices are based on one constraint: Claude's context window fills up fast, and performance degrades as it fills.

**A filled context window makes Claude worse, not smarter.** Cost and quality move on the same axis here.

### Built-in tools

| Command | Use |
|---|---|
| `/clear` | Reset context between tasks |
| `Esc` | Stop Claude mid-response (context preserved) |
| `Esc + Esc` / `/rewind` | Roll back to an earlier checkpoint |
| `/compact <instructions>` | Summarize the current context |

And the strongest piece of guidance:

> If you've corrected Claude more than twice on the same issue in one session, the context is cluttered with failed approaches. Run `/clear` and start fresh.

**Correct Claude twice on the same thing → `/clear`.** Starting fresh with a sharper prompt beats trying to salvage a polluted session.

### My take

Before I knew this, I'd keep thinking: "Claude was sharp an hour ago — why is it suddenly mediocre?" The answer was always context pollution. **One task equals one session** is a surprisingly powerful rule.

## Principle 3 — Always provide a way to verify (highest priority)

Anthropic explicitly calls this "the single highest-leverage thing you can do":

> Include tests, screenshots, or expected outputs so Claude can check itself.

### Before / After

| Strategy | ❌ Before | ✅ After |
|---|---|---|
| Verification criteria | "implement a function that validates email" | "Write `validateEmail`. Tests: `user@example.com` → true; `invalid` → false. Run tests after implementing and report results." |
| UI changes | "make the dashboard look better" | "[screenshot attached] Match this design. After implementing, capture the result, compare to the screenshot, list diffs, and fix them." |

### My take

This really does move the needle. In my HomePage work I always ask Claude to run `npm run build` after touching Astro components and report the result. It's dramatically reduced the amount of "silent regressions" where Claude breaks the build and doesn't notice.

## Priority recap

| Principle | Key phrase |
|---|---|
| 1. Golden Rule | "If they'd be confused, Claude will be too" |
| 2. Context management | "performance degrades as it fills" |
| 3. Verification | "single highest-leverage thing" |

**If you only adopt one thing today, make it verification.** The quality difference is immediate.

## Related posts

- [The Claude Code prompt playbook was hiding in the official docs — kicking off a new series](/HomePage/en/blog/20260428-claude-code-prompt-guide/) — series overview
- Reference-grade Qiita version: [Qiita profile](https://qiita.com/teppei19980914)
