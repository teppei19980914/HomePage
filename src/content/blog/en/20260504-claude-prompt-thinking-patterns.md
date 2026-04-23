---
title: "Claude isn't 'just a coding AI' — 13 prompt patterns for research, learning, and decisions"
description: "Claude is a powerful partner for research, learning, and decision-making, not only coding. Here are 13 ready-to-paste patterns I use to accelerate my thinking, with personal examples from development and everyday work."
date: 2026-05-04
tags: ["Claude Code", "AI-driven development", "prompt engineering", "learning strategy", "growth"]
---

## Series part 7

[Part 6](/HomePage/en/blog/20260503-claude-code-features/) covered Claude Code's unique features. This post shifts gears: **using Claude for tasks that don't involve writing code**.

Claude gets described as "the coding AI," but it's equally strong at research, learning, and decision-making. I rely on it daily as a "thinking partner."

## B. Research & learning

### 1 — Technology survey

```
Please research {{technology}} from these angles:

- Overview (3 lines)
- Comparison with at least 3 similar technologies
- Pros / cons of adoption
- Well-known adopters and use cases
```

### 2 — Reading official docs

```
Please read this official documentation and tell me:
{{URL or pasted content}}

- The 5 core concepts
- Points where beginners typically get stuck
- A 30-minute starter project idea
```

### 3 — Drafting a study plan

```
I want to achieve {{goal}} in {{timeframe}}. Please draft a study plan.

- My current level: {{experience and knowledge}}
- Weekly milestones
- Resources and deliverables per week
```

### 4 — Comparison

```
Compare {{A}} vs {{B}} vs {{C}} across:
- Learning curve / operational cost / ecosystem / real-world adoption

Output: matrix + the most balanced option on each axis with reasoning
```

### 5 — Checking your understanding

```
Here's my current understanding of {{concept}}:
{{bullet list of how you understand it}}

Please point out:
- What I have right
- What I have wrong
- Important pieces I'm missing
```

**This is the killer pattern.** Voicing your current mental model and having Claude audit it exposes misconceptions fast.

### 6 — Case studies

```
Find 5 real-world examples of solving {{problem}}.

For each:
- Company (within public info)
- Stack used
- Key decision drivers
- Measurable outcomes
```

### 7 — Steelman the opposition

```
List at least 5 counterarguments to {{my claim}}.

- Reasoning behind each
- Which counterargument is strongest
- What additional evidence would strengthen my claim
```

**Use weekly to find blind spots.**

## C. Thinking & decisions

### 8 — Issue triage

```
Read this discussion and extract the issues:
{{minutes / transcript}}

Output:
- Up to 5 issues
- Arguments for / against each
- Unresolved items and the decision-maker for each
```

### 9 — Decision framework

```
Evaluate the following decision:
{{decision}}

- Pros (5+)
- Cons (5+)
- Cost of doing nothing
- Is it reversible or irreversible?
- How will 1-year-future me see this?
```

**"How will 1-year-future me see this?"** snaps you out of short-term thinking.

### 10 — Debate

```
I hold position {{A}}. You take position {{B}} and argue against me.
Do 3 rounds. At the end, summarize which side was stronger on which axis.
```

### 11 — Summarization

```
Summarize the long text below:
{{long text}}

Three levels:
- One-line summary (≤140 chars)
- Three-line summary
- 20-line summary (cover all key points)
```

### 12 — Applying frameworks

```
Analyze {{problem}} using these frames:
- MECE decomposition
- 5W1H
- Before / After
```

### 13 — Metacognition

```
I've been stuck on {{worry}}.
- What problem am I actually trying to solve?
- What is the essence of this worry?
- What decision am I postponing?
```

**When you're looping in your own head**, Claude is willing to tell you "the premise of your question might be wrong" without flinching.

## Tips

| Tip | Why |
|---|---|
| Always specify output format | Thinking-mode prompts get vague answers without it |
| Always include counter-arguments | Claude tends to flatter; force it to push back |
| Chain patterns | Pattern 5 (understanding) → 7 (counterarguments) → 9 (decision) is a killer combo |

## My take — Claude as a "thinking warm-up"

I used to struggle to reach conclusions when discussing tech decisions with teammates. Now I **debate with Claude first**.

- Claude counterargues my position → blind spots emerge
- Claude compares candidates → evaluation axes become objective
- Check decisions with a "1-year-future" lens → short-term bias removed

The upshot: my conversations with teammates start from a **much sharper set of questions**. Claude isn't a replacement; it's a **warm-up partner** for thinking.

## Related posts

- [Claude Code-only features](/HomePage/en/blog/20260503-claude-code-features/) — tooling edition
- [Treat Claude like a brilliant new intern](/HomePage/en/blog/20260429-claude-prompt-principles/) — principles
- Reference-grade Qiita version: [Qiita profile](https://qiita.com/teppei19980914)
