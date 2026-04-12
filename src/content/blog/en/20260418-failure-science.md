---
title: '"Black Box Thinking" — Life Is Too Short to Experience Every Failure Yourself'
description: "Reading 'Black Box Thinking' revealed how ego blocks learning from failure. I explore the mechanisms of self-esteem-driven denial and how engineers can build systems to detect, report, and leverage failure."
date: 2026-04-18
tags: ["Reading", "Self-Growth", "Team Building", "Psychological Safety", "Essay"]
---

## "Failure Is the Mother of Success" — Do You Really Believe That?

Everyone knows the saying "failure is the mother of success." But when you actually fail, can you genuinely feel that way?

For me, the first emotions after failure were "frustration" and "embarrassment" — not "great, let's learn from this." My head knew I should learn from failure, but my heart rejected it. The book "Black Box Thinking" articulated this contradiction perfectly.

---

## Ego Blocks Learning

The most striking insight from this book: **"People refuse to learn from failure due to an intrinsic motivation called self-esteem."**

Admitting failure means admitting your abilities or judgment were wrong. The higher your self-esteem, the harder this becomes.

| Ego Defense Mechanism | Example |
|---|---|
| **Denying failure** | "That wasn't really a failure" |
| **Hiding failure** | Not reporting it, not documenting it |
| **Externalizing blame** | "The environment was bad" |
| **Refusing to learn** | Repeating the same pattern |

Looking back at myself, I recognize these patterns. When I shipped a bug, I blamed "unexpected test scenarios" when the real issue was my shallow design. My ego wouldn't let me admit it.

---

## Life Is Too Short to Experience Every Failure

Another key message: **"You don't need to experience every failure yourself."**

Life is finite. There isn't enough time to personally experience every failure pattern and learn from each one. That's why we need **systems for learning from others' failures**.

The book's comparison between aviation and healthcare was striking. Aviation meticulously analyzes black box data after every crash. Healthcare, for years, treated medical errors as individual failures rather than systemic learning opportunities.

**When failure is treated as an individual problem, organizations repeat the same failures.**

---

## The Biggest Failure of All

### 1. Focus Narrows Your View

A classic failure pattern: **excessive focus on the immediate task**. Concentration is powerful enough to make you lose track of time, but it also drastically narrows your vision.

In engineering: getting so absorbed in implementation that you miss the changing design assumptions. Writing tests so intensely that you miss the flawed test premise itself.

### 2. No System to Detect Failure

To leverage failure, you first need to **detect** it. This requires:
- **A system for reporting failures** — incident logs, near-miss tracking
- **People willing to report** — a culture where reporting isn't punished

### 3. The Biggest Failure Is Not Accumulating Failure Data

The book's most resonant claim: **"The biggest failure is not analyzing failures and accumulating them as data."**

Failures happen. That's unavoidable. But not analyzing them, not accumulating patterns, not applying lessons — that's **wasting the failure**. And that is the biggest failure of all.

---

## Applying This to Engineering

### Incident Response: Pattern Analysis, Not Blame

When incidents occur, focus on "why did this pattern happen" and "how to prevent recurrence" — not "who wrote this code." This connects to the [multi-perspective thinking from reading](/HomePage/en/blog/20260415-reading-and-perspective/).

### Code Review: A Culture Where Failure Can Be Reported

When receiving code review feedback, ego defense kicks in. Instead of reflexively explaining "there's a reason for this code," receive the feedback as "failure detection." As I wrote in ["Words Are Blades"](/HomePage/en/blog/20260412-power-of-words/), word choice matters for reviewers too, but receivers must be aware of their ego filter.

### Postmortems: Accumulating and Analyzing Failure

Postmortems are powerful systems for accumulating failure as data. But they only work with **psychological safety** as a foundation. In a "report and get punished" environment, no one shares failures honestly.

---

## In Closing

Failure is the mother of success — but only when there's a **system to accumulate, analyze, and share failure patterns** across the organization.

The biggest barrier to that system isn't technical — it's **human ego**. Admitting your own failure, sharing it, and turning it into learning. It sounds simple but may be the hardest thing of all.

Life is too short to experience every failure. That's exactly why we must learn from failure — and learn success from failure. The first step is asking yourself: "Am I unconsciously refusing to learn from my failures?"

## Related Articles

- [What Reading Gave Me Wasn't Knowledge — It Was the Habit of Thinking from Multiple Angles](/HomePage/en/blog/20260415-reading-and-perspective/) — Multi-perspective thinking from reading
- ["No Effort Goes Unrewarded" — How the Concept of Accumulating Luck Changed My Work](/HomePage/en/blog/20260414-effort-and-luck/) — What changed my definition of effort
- ["Words Are Blades" — How a Single Phrase Can Stay with Someone Forever](/HomePage/en/blog/20260412-power-of-words/) — Psychological safety and communication
