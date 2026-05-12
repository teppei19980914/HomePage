---
title: '"Black Box Thinking" — Life Is Too Short to Experience Every Failure Yourself'
description: "Reading 'Black Box Thinking' revealed how ego blocks learning from failure. I explore the mechanisms of self-esteem-driven denial and how engineers can build systems to detect, report, and leverage failure."
date: 2026-04-19
tags: ["Reading", "Self-Growth", "Team Building", "Psychological Safety", "Essay"]
---

## "Failure Is the Mother of Success" — Do You Really Believe That?

Everyone repeats "failure is the mother of success." But ever had that moment — fresh off an actual failure — where the line just felt hollow?

For me, the first feelings after a failure were "frustration" and "embarrassment." Not "great, time to learn." My head knew I should learn from failure. My heart, meanwhile, was busy looking for an exit. The book *Black Box Thinking* put exact words on that contradiction.

---

## Ego Blocks Learning

The single sharpest insight from this book: **"People refuse to learn from failure because of an intrinsic motivation called self-esteem."**

Admitting failure means admitting your judgment or ability was wrong. The higher your self-esteem, the harder that admission gets.

| Ego Defense Mechanism | Example |
|---|---|
| **Denying failure** | "That wasn't really a failure" |
| **Hiding failure** | Not reporting, not documenting |
| **Externalizing blame** | "The environment was bad" |
| **Refusing to learn** | Quietly repeating the same pattern |

When I look back at myself, every one of these has my fingerprints on it. When I shipped a bug, I blamed "unexpected test scenarios" — when the real story was a shallow design. My ego just wouldn't let that sentence out.

---

## Life Is Too Short to Experience Every Failure

Another core line: **"You don't need to experience every failure yourself."**

Life is finite. You will not have time to personally encounter every failure pattern and learn from each one. Which is exactly why we need **systems for learning from other people's failures**.

The book's comparison between aviation and healthcare hits hard. Aviation meticulously analyzes black box data after every crash. Healthcare, for years, treated medical errors as personal failures rather than systemic learning opportunities.

**When failure stays an individual problem, the organization repeats it.** Quietly. Forever.

---

## The Biggest Failure of All

### 1. Focus Narrows Your View

A familiar failure pattern: **over-focus on the immediate task**. Concentration is powerful enough to dissolve your sense of time — and that same focus dramatically narrows your field of view.

In engineering: you get so absorbed in implementation that you miss the design assumptions silently shifting underneath. You write tests so hard you stop questioning whether the test premise itself was wrong.

### 2. No System to Detect Failure

To leverage failure, you first have to **detect** it. That needs:
- **A reporting system** — incident logs, near-miss tracking
- **People willing to report** — a culture where reporting isn't punished

### 3. The Biggest Failure Is Not Accumulating Failure Data

The book's most resonant claim: **"The biggest failure is not analyzing failures and accumulating them as data."**

Failures happen. That's not avoidable. But not analyzing them, not stacking up patterns, not feeding lessons forward — that's **wasting the failure**. And that, the book argues, is the biggest failure of all.

---

## Applying This to Engineering

### Incident Response: Pattern Analysis, Not Blame

When incidents happen, point the conversation at "why did this pattern happen" and "how do we prevent recurrence" — not "who wrote this code." This ties straight to the [multi-perspective thinking from reading](/HomePage/en/blog/20260415-reading-and-perspective/).

### Code Review: A Culture Where Failure Can Be Reported

When code review feedback lands, ego defense fires up instantly. Instead of reflexively explaining "there's a reason for this," try receiving the feedback as "failure detection." As I wrote in ["Words Are Blades"](/HomePage/en/blog/20260412-power-of-words/), reviewers need to choose words carefully too — and receivers need to be aware of their own ego filter.

### Postmortems: Accumulating and Analyzing Failure

Postmortems are powerful systems for turning failure into data. They only work, though, with **psychological safety** as a floor. In a "report and get punished" environment, no one shares failures honestly. They just get better at hiding them.

---

## In Closing

Failure is the mother of success — but only when there's a **system that accumulates, analyzes, and shares failure patterns** across the organization.

The biggest barrier to that system isn't technical. It's **human ego**. Admitting your own failure, sharing it, and turning it into learning sounds simple — and may quietly be the hardest thing of all.

Life is too short to experience every failure firsthand. That's exactly why we have to learn from failure, and learn success from failure too. If you wanted one first step, it might be the question: *"Am I unconsciously refusing to learn from a failure I had this week?"*

## Related Articles

- [What Reading Gave Me Wasn't Knowledge — It Was the Habit of Thinking from Multiple Angles](/HomePage/en/blog/20260415-reading-and-perspective/) — Multi-perspective thinking from reading
- ["Words Are Blades" — How a Single Phrase Can Stay with Someone Forever](/HomePage/en/blog/20260412-power-of-words/) — Psychological safety and communication
