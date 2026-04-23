---
title: "Delegate development to Claude — 11 copy-paste prompt patterns for coding, review, and debugging"
description: "When you hand off development tasks to Claude, what kinds of prompts reliably produce high-quality code? Here are 11 battle-tested patterns I use daily for implementation, review, debugging, refactoring, test generation, and more."
date: 2026-05-01
tags: ["Claude Code", "AI-driven development", "prompt engineering", "personal project", "learning"]
---

## Series part 4

[Part 3](/HomePage/en/blog/20260430-claude-prompt-workflow/) covered the four-stage workflow. This post shows the **prompt templates** I actually send at each stage.

These 11 patterns are all ones I use in my personal products. They work in Claude Code, Claude Web, and the Claude API.

## 1 — Implementation

```
Please add {{feature}} to {{file/module}}.

Context:
- Project: {{short description}}
- Similar existing implementation: {{path}}

Verification:
- Run {{test command}} after implementing and report results
- Ensure the build passes
```

**Context + verification criteria** is the key combo.

## 2 — Code review

```
Please review {{file path}}.

Angles:
- Security (XSS / SQL injection / secret leaks)
- Performance (N+1 / unnecessary re-renders / DB calls in loops)
- Readability (naming / function decomposition / comment balance)

Output:
- List issues by priority (High/Mid/Low)
- Attach line numbers and proposed fixes
```

**Explicit angles** keep Claude comprehensive.

## 3 — Debugging

```
I'm getting the following error:
{{full error message}}

Reproduction:
1. {{step 1}}
2. {{step 2}}

Please:
- Identify the root cause (don't mask symptoms)
- Propose a fix with reasoning
- Suggest a regression test
```

Always include **"don't mask symptoms, find the root cause."**

## 4 — Refactoring

```
Please refactor {{file path}}.

Goal: {{business goal}}
Constraints:
- Don't break existing tests
- Keep API compatibility
- One commit = one concern
```

**List constraints first.** That's what stops runaway refactors.

## 5 — Test generation

```
Write Vitest unit tests for {{target file}}.

Coverage:
- Happy path (three representative inputs)
- Edge cases (empty / null / type mismatch)
- Boundary values

File location: {{target}}.test.ts
```

## 6 — Documentation

```
Write JSDoc for {{function name}}.

Include:
- One-line summary
- @param for each parameter
- @returns
- Two @example usage snippets
```

## 7 — Design review

```
I'd like to discuss the design of {{feature}}.

Requirements:
{{bullet list}}

My current idea is {{proposal}}, and I want to discuss:
- Weaknesses of my design
- At least two alternative designs
- Trade-offs for each
```

**Force at least two alternatives** to widen the design space.

## 8 — Technology selection

```
Help me pick a technology for {{problem}}.

Constraints:
- Constraint 1: {{budget/time/scale}}
- Constraint 2: {{team skills}}

Candidates: {{A, B, C}}
Axes: learning curve / operational cost / scalability / ecosystem
Output: comparison table + final recommendation with reasoning
```

## 9 — Understanding existing code

```
Please read {{file/directory}} and tell me:

- Responsibility (what this module does)
- Top 5 functions and their roles
- Dependencies (what it depends on, what depends on it)
- Weaknesses (refactor candidates if any)
```

**Ideal for onboarding to a new repo.**

## 10 — Migration

```
Migrate from {{old version}} to {{new version}}.

Steps:
1. Extract the list of breaking changes from the official CHANGELOG
2. grep files impacted by each change
3. Propose fixes per file for my review before implementing
```

## 11 — Command generation

```
Write a {{shell type}} command that does {{action}}.

Environment: {{OS / shell}}
Constraints: {{no install / POSIX compliant / etc.}}
```

## Tips for using these patterns

1. **Replace `{{ }}` with your specific context** and paste
2. **Combine patterns** freely (e.g., 1 + 5 for "implement + generate tests")
3. **Always include verification criteria** (see [Principle 3](/HomePage/en/blog/20260429-claude-prompt-principles/))

## My take — patterns stabilize output quality

I used to spend three minutes every time crafting a prompt. Now I just **pick a pattern and fill the blanks** — prompt creation time dropped by an order of magnitude.

More importantly: **consistent templates produce consistent output quality**. When my prompts varied wildly in structure, so did Claude's output. Standardizing the structure stabilized the output. (The same lesson applies to writing design docs, actually.)

## Related posts

- [Never let Claude jump straight into code — the Explore → Plan → Code → Commit workflow](/HomePage/en/blog/20260430-claude-prompt-workflow/) — workflow
- [Treat Claude like a brilliant new intern — the three principles Anthropic prioritizes](/HomePage/en/blog/20260429-claude-prompt-principles/) — principles
- Reference-grade Qiita version with full prompts: [Qiita profile](https://qiita.com/teppei19980914)
