---
title: "The Claude Code prompt playbook was hiding in the official docs — kicking off a new series"
description: "Starting a series built on Anthropic's Claude Code best practices and the Claude 4 prompt engineering guide. Here's the overview and a quick look at how reading the official docs concretely changed my day-to-day development."
date: 2026-04-28
tags: ["Claude Code", "AI-driven development", "prompt engineering", "personal project", "learning"]
---

## Are you using Claude Code "by feel"?

I run three personal products powered by AI-driven development, and I lean on Claude Code heavily for all of them. But for a long time I was using it purely by instinct — "Claude feels smart today" or "Claude is off today" — as if the model's performance was a weather report.

What pulled me out of that mode was sitting down and actually reading **Anthropic's official best practices** front to back.

My first reaction after finishing them:

> "Oh. The answer was here the whole time."

## What I read

Only two sources:

- [Best Practices for Claude Code — Anthropic official](https://code.claude.com/docs/en/best-practices)
- [Prompting best practices for Claude 4 — Anthropic official](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices)

They're in English, but they're also short. Half a day alongside your normal coding and you can get through both. Despite that, few Japanese write-ups cover them comprehensively, which is part of what inspired this series.

## What changed in my workflow

### 1. I always attach a way for Claude to verify itself

Anthropic says this is "the single highest-leverage thing you can do." **Always ship a test, a screenshot, or an expected output alongside your prompt**. That one habit pushed my generated-code quality up a visible notch.

### 2. I stopped being afraid of `/clear`

The official rule: if you've had to correct Claude more than twice on the same issue in a session, run `/clear`. Performance degrades as context fills. **The myth that "longer sessions make Claude smarter" is just that — a myth.**

### 3. I stopped going straight to code

Explore → Plan → Code → Commit. **Skipping Plan produces correct solutions to the wrong problem.** For anything non-trivial I now always enter Plan Mode first.

## What the series will cover

Over the next week or so I'll publish a series called **"Claude Prompt Mastery: The Complete Guide"** on this site.

| Part | Topic |
|---|---|
| 1 | Three core principles (Golden Rule / context management / verification) |
| 2 | The Explore → Plan → Code → Commit workflow |
| 3 | 11 development prompt patterns |
| 4 | Five techniques for writing clearer instructions (CLAUDE.md / XML / Few-shot etc.) |
| 5 | How to mix and match Claude Code-only features |
| 6 | 13 thinking-mode prompt patterns |
| 7 | 18 everyday-life prompt patterns |
| 8 | Series wrap-up |

## Notation for trust level

To separate official statements from my own opinion, every post uses the following labels.

| Label | Meaning |
|---|---|
| 🟢 Official quote | Direct quote or translation from the docs |
| 🟡 Official content | Described in the docs (mechanism / feature / step) |
| 🔵 My interpretation | My reorganization or prioritization of official info |

## A deeper reference lives on Qiita

The homepage version focuses on personal takeaways and readability. The Qiita version is a **reference-grade writeup with full official quotations** — if you want the deep dive, visit my Qiita profile.

- [Qiita profile](https://qiita.com/teppei19980914)

## Related posts

- ["The testing phase disappeared" — comparing AI-driven and traditional development across the full lifecycle](/HomePage/en/blog/20260410-ai-driven-development/) — what AI-driven development actually looks like
- [From "built but never used" to running three products at zero monthly cost](/HomePage/en/blog/20260427-zero-cost-and-claude-code/) — how Claude Code changed personal development for me
