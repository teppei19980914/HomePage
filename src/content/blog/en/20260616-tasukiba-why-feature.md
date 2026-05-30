---
title: 'Suggestions With a "Why" — Tasukiba Phase 3 LLM Re-ranking'
description: "Phase 3 brings the 'Why?' feature — suggestions include 'why this is related' via LLM re-ranking. Tasukiba Pro plan differentiator, powered by Claude Sonnet."
date: 2026-06-16
tags: ["tasukiba", "why-feature", "llm-re-ranking", "phase-3", "pro-plan"]
seriesCategory: "design"
---

## Suggestions get a "why" alongside them

This is the last of the three unique features in the series.

1. [Suggestion engine (Phase 1)](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) — structured-form inputs surface past assets
2. [Chat semantic search (Phase 2)](/HomePage/en/blog/20260615-tasukiba-chat-semantic-search/) — natural-language pull of past assets
3. **The "Why?" feature (Phase 3, today's topic)** — suggestions come with a "why this is related" explanation

Today is feature 3, **the "Why?" feature**. Tasukiba's **Pro plan differentiator**, written alongside the technical decision behind it — LLM re-ranking.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## "Relevance 0.82" alone isn't enough

[B-2's suggestion engine](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) lines up related assets by 3-axis weighted score. On screen, that looks like:

```
Related knowledge
  - "Stripe Webhook idempotency design" (relevance 0.82)
  - "PII masking design for e-commerce" (relevance 0.79)
  - ...
```

That's useful. But after using it for a while, a small itch stayed with me.

> **What does "0.82" actually mean?**

The number is there. The cosine similarity is 0.82 — fine. But **translating that into a business judgment** is left to the user. "I'll skim this one." "This one probably isn't relevant today." That call still happens in the human head.

For suggestions to actually **get used**, I started to think, **"why this is related"** needs to be readable in human language. One step further down.

## What the "Why?" feature looks like

After implementation, the screen looks like this:

```
Related knowledge (Pro plan, with "Why?")
  - "Stripe Webhook idempotency design" (relevance 0.82)
    💡 Why: The payment processing mentioned in your new "E-commerce
       renewal" project and the webhook idempotency in this knowledge
       both address the same problem — "same operation received
       multiple times must yield a single outcome" — in different
       contexts.

  - "PII masking design for e-commerce" (relevance 0.79)
    💡 Why: The "member feature" included in your scope overlaps
       with the PII (personally identifiable information) subject
       of this knowledge.
```

What was just a number now has **a sentence a human can read and accept**. With that, **"should I open this?" becomes a 3-second decision**.

## The technical structure — what LLM re-ranking is

A bit on the technical side (deep details go to Qiita; the skeleton stays here).

The "Why?" feature applies **two-stage ranking** to the suggestion results.

```
[Step 1] Pick top-N (e.g. top 20) by 3-axis weighted score
            ↓
[Step 2] Pass those N to Anthropic Claude Sonnet
            ↓
            LLM generates "why this is related" text
            ↓
            LLM also reorders by its own judgment
            ↓
[Step 3] Display top-K (e.g. 5) with "Why?" attached
```

This pattern is called **LLM re-ranking**. Stage 1 (3-axis score) does **wide, fast, cheap** filtering. Stage 2 (LLM) does **deep, slow, expensive** judgment.

### Why two stages

Stage 1 (3-axis weighted score):

- **Wide**: narrows from ~50 candidates
- **Fast**: pgvector computes in-DB (hundreds of ms)
- **Cheap**: no external API call ([B-2's "zero cost at search time"](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/))

Stage 2 (LLM re-ranking):

- **Deep**: contextual judgment beyond numerical similarity
- **Slow**: LLM call takes 1–several seconds
- **Expensive**: Sonnet usage billing applies

**Running stage 1 over everything is cheap and fast but produces no "why." Running stage 2 over everything explodes cost and time.**

So we split: **stage 1 narrows, stage 2 explains.** That separation is directly connected to [B-3's pricing philosophy](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/): "charge only for what was used, only on operations that need it."

## Why this is the Pro plan differentiator

The "Why?" feature is positioned as the **Pro plan differentiator** in [B-3's three-plan structure](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/).

| Plan | Monthly | Suggestion output |
|---|---|---|
| Beginner | $0 | 3-axis weighted score (numbers only) |
| Expert | $0 + Haiku usage | 3-axis weighted score (numbers only) |
| **Pro** | **$0 + Sonnet usage** | **3-axis score + "Why?" explanation** |

Only Pro uses the Sonnet model, for **cost reasons**. Haiku could generate "Why?" text, but at the quality bar needed for business use, **Sonnet is markedly more reliable** — that's the current call.

For users willing to pay for **one layer of deeper experience**, Pro adds **words alongside the numbers**. That's the Phase 3 differentiation.

## Hallucination prevention — what we don't let the LLM do

This is where I spend the most thought.

LLMs sometimes lie (hallucinate). If the "Why?" feature returns a fabricated reason, it could **push the user toward the wrong business decision**. That directly damages trust as a business SaaS.

Tasukiba's "Why?" feature defines a **"don't do" list** for the LLM upfront.

| LLM is allowed to | LLM is not allowed to |
|---|---|
| Articulate "relevance" between candidate and query | Generate information not in the candidate |
| Summarize the candidate's content | Inject general knowledge or speculation |
| Provide grounds for "why related" | Fabricate numerical scores |

At the prompt level, **"don't bring in information not in the candidate as a reason"** is strongly constrained. A separate check function will also verify the LLM's output and **block the response if a named entity appears that doesn't exist in the candidate**.

Not "LLM is useful, hand it everything," but **"narrow the LLM's job precisely."** Same stance as [A-4's differentiation axes](/HomePage/en/blog/20260529-tasukiba-six-differentiators/): "don't compromise on functionality; never accept UI complexity." Same root.

## The "Why?" feature completes Tasukiba's experience

Lining up the three unique features:

| Feature | Experience | Embedding foundation | Additional tech |
|---|---|---|---|
| Suggestion engine | **Past assets line up as numbers** | Voyage + pgvector | — |
| Chat semantic search | **Past assets pulled by conversation** | Voyage + pgvector | Voyage (query embedding) |
| **"Why?" feature** | **Reasons line up beside the numbers** | Voyage + pgvector | **Claude Sonnet (LLM re-ranking)** |

These three aren't separate features. They're **three different surfaces on the same embedding foundation**. The "surfacing" core from [B-2](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) deepens in stages: Phase 1 → 2 → 3.

## One sentence

The "Why?" feature, compressed:

> **A feature that puts human words next to the numbers.**

The suggestion engine puts "the past you forgot" on screen. Chat semantic search sits beside you as "a companion you can talk to." And the "Why?" feature writes, alongside each candidate, **"why is this one sitting here, right now?"**

With these three, Tasukiba's unique features reach completion. Phase 3 (within 2 years) is the implementation target — but the "Why?"-equipped experience is, in my mind, **the feature that genuinely takes on the problem named in [series part 1](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/)**: "humans aren't spending time on the work only humans can do."

That closes the technical bonus chapters. From here, I'll keep writing as things unfold — Dogfooding learnings, post-release operational impressions, on a flexible cadence.

## Related posts

- [Talking to Tasukiba in natural language — Phase 2 chat semantic search](/HomePage/en/blog/20260615-tasukiba-chat-semantic-search/) — bonus chapter 1
- [The suggestion engine — putting "the past you forgot" on screen](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) — shared embedding foundation
- [Three plans, usage-based — pricing to continue](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/) — Pro plan differentiator basis

## About Tasukiba

The "Why?" feature is the core of Tasukiba Knowledge Relay's Pro plan (Phase 3, within 2 years). The current suggestion-feature experience is on the [product page](/HomePage/en/product/tasukiba/).
