---
title: "Claude Prompt Mastery — complete guide index across 9 posts"
description: "Wrapping up a nine-day series on Claude prompting. Built on the Anthropic official docs, the series covers three core principles, a workflow, and 42 ready-to-paste patterns. This index shows which post to read depending on what you're trying to accomplish."
date: 2026-05-06
tags: ["Claude Code", "AI-driven development", "prompt engineering", "summary", "learning"]
---

## Series wrap-up

Nine days and a lot of words later, the **"Claude Prompt Mastery"** series comes to a close here.

As I wrote [on day one](/HomePage/en/blog/20260428-claude-code-prompt-guide/), the playbook was hiding in the official docs. Built on those sources, the series delivered **42 patterns + 18 principles** across 8 guide posts.

This final post is a directory — **which post to open for which need**.

## The whole series

| Part | Title | Focus |
|---|---|---|
| 1 | [Series kick-off](/HomePage/en/blog/20260428-claude-code-prompt-guide/) | Big picture + what changed for me |
| 2 | [Three core principles](/HomePage/en/blog/20260429-claude-prompt-principles/) | Golden Rule / context / verification |
| 3 | [Workflow](/HomePage/en/blog/20260430-claude-prompt-workflow/) | Explore → Plan → Code → Commit |
| 4 | [11 dev patterns](/HomePage/en/blog/20260501-claude-prompt-dev-patterns/) | Implement, review, debug, refactor |
| 5 | [5 instruction techniques](/HomePage/en/blog/20260502-claude-prompt-instructions/) | CLAUDE.md / XML / few-shot |
| 6 | [Claude Code-only features](/HomePage/en/blog/20260503-claude-code-features/) | Skills / Subagents / Hooks / Plan Mode |
| 7 | [13 thinking patterns](/HomePage/en/blog/20260504-claude-prompt-thinking-patterns/) | Research, learning, decisions |
| 8 | [18 daily-life patterns](/HomePage/en/blog/20260505-claude-prompt-daily-patterns/) | Writing, career, emotions, daily tasks |

## Reading guide by goal

### "I just started using Claude — where do I begin?"

1. [Part 2 — three principles](/HomePage/en/blog/20260429-claude-prompt-principles/)
2. [Part 3 — workflow](/HomePage/en/blog/20260430-claude-prompt-workflow/)
3. [Part 4 — dev patterns](/HomePage/en/blog/20260501-claude-prompt-dev-patterns/) (paste templates from here)

**That covers 90 % of daily usage.**

### "I've been using Claude but the quality is inconsistent"

1. [Part 5 — instruction techniques](/HomePage/en/blog/20260502-claude-prompt-instructions/) (get a `CLAUDE.md` set up)
2. [Part 6 — Claude Code features](/HomePage/en/blog/20260503-claude-code-features/)

**A proper `CLAUDE.md` alone lifts quality a notch.**

### "I want to use Claude beyond code"

1. [Part 7 — thinking patterns](/HomePage/en/blog/20260504-claude-prompt-thinking-patterns/)
2. [Part 8 — everyday patterns](/HomePage/en/blog/20260505-claude-prompt-daily-patterns/)

## Five rules distilled from the whole series

### Rule 1 — Always attach a way for Claude to verify

Anthropic explicitly calls this "the single highest-leverage thing you can do." **Test, screenshot, or expected output. Always.** Quality jumps on day one.

### Rule 2 — Never jump straight to code

Follow **Explore → Plan → Code → Commit**. Plan Mode is non-negotiable for multi-file changes.

### Rule 3 — Fear context pollution

**Correct Claude twice on the same thing → `/clear`.** Long sessions don't make Claude smarter.

### Rule 4 — Persist rules in `CLAUDE.md`

Put **things you keep repeating** into `CLAUDE.md`. Aim for ~150 lines.

### Rule 5 — Write as if Claude is an intern on day one

Claude is brilliant but doesn't know your team's conventions. **"Would a context-less colleague follow this?"** is the right litmus test before hitting send.

## What changed for me (personal)

### Development

- Personal-project velocity **roughly 5× higher**
- Test coverage rose naturally (Claude writes them)
- I can now **pick up unfamiliar frameworks and ship on day one**
- Self-review culture survives even as a solo developer

### Thinking

- Making Claude argue against me **surfaces blind spots**
- Decision frameworks became reflex, **ad-hoc calls diminished**
- Journal-style reflection finally stuck

### Life

- Less time **bottling up worries** alone
- I can **evaluate life choices across multiple axes** now
- Fewer "I don't know why I picked this" decisions

The Claude Code subscription isn't cheap, but against this, **it pays for itself many times over**.

## What's next

This series is a snapshot of where I am today. Anthropic updates the docs. Claude Code ships frequently. **"Complete guide" is the title, not the end.** Anything new worth sharing will appear in future posts.

## Primary sources

- [Best Practices for Claude Code — Anthropic official](https://code.claude.com/docs/en/best-practices)
- [Prompting best practices for Claude 4 — Anthropic official](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices)

## Reference-grade version on Qiita

The homepage version prioritizes personal takeaways and readability. The **reference-grade series, with full official quotations**, is on Qiita.

- [Qiita profile](https://qiita.com/teppei19980914)

Thank you for reading.

## Related posts

- [Series kick-off](/HomePage/en/blog/20260428-claude-code-prompt-guide/)
- ["The testing phase disappeared" — AI-driven vs. traditional development](/HomePage/en/blog/20260410-ai-driven-development/)
- [From "built but never used" to running three products at zero monthly cost](/HomePage/en/blog/20260427-zero-cost-and-claude-code/)
