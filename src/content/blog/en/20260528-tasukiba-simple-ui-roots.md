---
title: "Tasukiba's Tidy UI — Roots in a High-School Notebook"
description: "Tasukiba's UI is built on one belief: things belong where they belong. The root traces back to a high-school notebook redesigned for the reader every term."
date: 2026-05-28
tags: ["tasukiba", "ui-design", "design-philosophy", "indie-saas", "essay"]
---

## Why I'm so stubborn about "simple"

Tasukiba's UI is built on a stubborn personal belief.

> **Things belong where they belong.**
> **I want to work in a tidy environment.**

That's my personal philosophy. And it ends up driving the UI decisions almost line by line.

Where does this come from? When I trace it, there are a few origin moments. Today's post is about those.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## 1. The high-school notebook that kept getting the top grade

In high-school Japanese-classics class, we submitted our notebooks every three months.

After exams, the teacher returned them with grades. Mine got **S+ — the highest grade, every single term, and I was the only one in the class.**

When she handed them back, she'd announce it as "the cleanest notebook in class." Every term.

What I was actually doing wasn't drawing pretty letters. I was, term after term, **redesigning the layout for the reader** — the future me, the night-before-exam me, the teacher about to grade it.

Don't use too many colors. Leave white space. Same-purpose information goes in the same place. Set up-front rules for where digressions get parked.

In retrospect, that was UI design.

## 2. *The Courage to Be Disliked* sharpened it into a worldview

A book that shaped my way of thinking is *The Courage to Be Disliked* — a popular take on Adlerian psychology. As I wrote in [The Courage to Be Disliked, Part 1 — drop the trauma view, live by teleology](/HomePage/en/blog/20260522-courage-to-be-disliked-teleology/), its core message is:

> **Separate other people's tasks from your own, and put your attention only on yours.**

The world is simpler than you think; if you can live simply, many interpersonal problems also dissolve. After reading the book, I started thinking about almost everything more simply.

Tasukiba's design philosophy is a direct descendant. Every button on every screen, I keep asking: **"is this really this screen's responsibility?"** That habit is almost a port of the book's central idea into UI design.

## 3. I've seen too many "scattered information" workplaces

Once I started working, I saw a lot of environments where **information was scattered, never organized**.

During development phases especially, operations and maintenance get deprioritized, and information gets sprayed across three folders, two chat tools, and someone's email body. We've all seen that handover.

Every time I saw it, I felt the same thing.

> **Just by tidying this up, the organization would change.**

This accumulated frustration is the same fuel as

- "anger at the structural waste of creative time" ([series part 1](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/))
- "wanting to build tidy environments" (this post)

Same root, different surface.

## Five definitions of "tidy UI"

I've made my definition of "tidy" explicit.

### 1. White space exists

Don't cram. Let elements breathe.

### 2. Color is restrained

Too much text, too much color: both drain energy. Aim for a screen you can look at for eight hours without fatigue.

### 3. Consistency is enforced

Same-purpose buttons get **the same color, the same position, the same label, across screens**. Users shouldn't have to think "wait, where's that here?" — that should never happen.

### 4. Nothing extra (the math of subtraction)

Functionality: don't compromise. **UI complexity: never accept it.** These two are different problems, not one trade-off.

### 5. The eye moves naturally

Issue list, risk list, retrospective list, memo list — structurally similar screens get **the same button placement**. Move screens, same actions stay in place.

## "If it shouldn't be there, don't put it there"

The contrapositive of "things belong where they belong" is **"if it shouldn't be there, don't put it there."**

Personally, I don't buy or keep things I don't value. The same applies to UI.

- Unused features: not in the UI
- Excessive decoration, gradients, animations: out
- Unnecessary confirmation dialogs: out

"Just in case" is usually an excuse. Only keep the confirmations that actually matter.

## Exception: ambiguity has a place — but a specific one

There's one nuance.

### Areas to be unambiguous

Things at the **core of user trust, that will never change** — like tenant isolation. Vague language here rots the root.

### Areas to leave room

Things where **evolution is realistically expected** — like "future LLM extensions." Users actually want to read these with anticipation. Some vagueness functions as breathing room.

Not "always explicit" or "always vague," but **switching by domain**. The reasoning is essentially "task separation" from *The Courage to Be Disliked* — figure out which thing is which kind of thing, first.

## Functionality and UI complexity are different problems

I'll close with the sentence I want to repeat throughout this series.

> **Functionality, don't compromise. UI complexity, never accept it.**

That's the reference I check every time I face a concrete decision.

Some people might find Tasukiba "plain." That impression is probably right. I'm not spending effort on making features look flashy. I'm spending it on **a screen that doesn't tire you out, no matter how many times you open it**.

That goal might have started in a high-school classical-literature notebook.

Next time: where Tasukiba stands in the market, articulated as **six axes of differentiation** — not from market research, but as a side effect of stubborn preference.

## Related posts

- [Changing Sunday night and Monday morning — Tasukiba's worldview](/HomePage/en/blog/20260527-tasukiba-sunday-night/) — series part 2, the worldview chapter
- [The Courage to Be Disliked, Part 1 — drop the trauma view, live by teleology](/HomePage/en/blog/20260522-courage-to-be-disliked-teleology/) — where simple thinking comes from
- [Think Again and the Binary Bias I Couldn't See in Myself](/HomePage/en/blog/20260525-think-again-binary-bias/) — questioning the "fully explicit vs. fully vague" dichotomy

## About Tasukiba

Tasukiba Knowledge Relay's UI is held together by the math of subtraction. See the [product page](/HomePage/en/product/tasukiba/) for actual screens and the felt sense of "tidy."
