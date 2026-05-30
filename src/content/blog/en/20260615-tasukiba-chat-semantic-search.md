---
title: "Talking to Tasukiba — Phase 2 Chat Semantic Search Detail"
description: "Phase 2 brings chat semantic search, Tasukiba's second feature. Natural-language queries return past records, on the same embedding base as suggestions."
date: 2026-06-15
tags: ["tasukiba", "chat-semantic-search", "phase-2", "voyage-ai", "pgvector"]
seriesCategory: "design"
---

## "Wasn't there a retrospective last month about resource shortage?"

This series is walking through Tasukiba Knowledge Relay's **three unique features**, one by one.

1. **Suggestion engine** (Phase 1, released) — [I covered in B-2](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/), past assets get pushed to the screen at project create / issue file time
2. **Chat semantic search** (Phase 2, today's topic) — pull past assets via natural language
3. **The "Why?" feature** (Phase 3, [tomorrow's post](/HomePage/en/blog/20260616-tasukiba-why-feature/)) — suggestions get a "why this is related" explanation

Today is feature 2, **chat semantic search**. It's not something I can show on release day, but the experience I want to build in Phase 2 is worth publishing now.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## From structured form to natural language

[B-2's suggestion engine](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) takes a **structured form** as input:

```
Project name: E-commerce site renewal
Purpose: ...
Background: ...
Scope: ...
```

The moment that's saved, the suggestion engine runs and related past assets appear on screen. That's the Phase 1 experience.

Chat semantic search replaces the **entry point** with natural-language conversation:

```
User: "Wasn't there a retrospective last month about resource shortage?"

Tasuki Owl:
  Matching retrospective:

  - 2026-03-15: Sprint 5 retrospective
    > "QA resources were short, test phase slipped"
    > Related risk: R-005 (resource estimation accuracy)
    > Related knowledge: K-012 (criteria for QA automation)
```

"Fill in a form" becomes "speak to it." That's the only surface change. But **on the user's side, it's a completely different experience**.

## The same embedding foundation, with a different entrance

This is chat semantic search's **technical identity**.

> **The chat query is also vectorized through Voyage AI into 1,024 dimensions.**

As [B-2 covered](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/), every knowledge / risk / issue / retrospective / memo / project has a **Voyage embedding** stored in `content_embedding` at create/update time.

Chat semantic search just **runs the user's utterance through Voyage, then pgvector finds the closest assets**.

```
Utterance → Voyage → query vector
                       ↓
              Cosine similarity in pgvector
                       ↓
              Top-N retrieved
                       ↓
              Rendered as a chat reply
```

It looks like a new feature. Under the hood, **it's the same engine as the suggestion feature.** What changed is the entrance and the exit.

That's the design intent behind **"don't build the three features separately."** The embedding foundation built for the suggestion engine **gets reused as-is**, which keeps the Phase 2 marginal cost low.

## The experience I want to deliver — "ask the moment you wonder"

Forget the architecture for a moment. The experience matters more.

The moment I'm imagining:

> You're looking at the project management screen, and suddenly think, "wait, didn't we run into something similar on last year's project?"

In a typical world:

1. Try to remember which memo
2. Type keywords into search
3. Can't remember, give up

In Tasukiba's world, the Tasuki Owl is sitting in the bottom-right corner as a chat button. You click and just say, **"I think there was similar trouble on last year's DB migration project."**

A reply comes back. "Matching issue: 2025-09-12, Sprint 3 — 'Migration script underestimated row count, batch timed out.' Related risk: R-018 (batch execution time). Related knowledge: K-031 (PostgreSQL copy batch patterns)."

— that **"ask the moment you wonder"** distance is the experience Phase 2 is aiming at.

The suggestion engine is **a push notification at screen-transition time**. Chat semantic search is **a companion you can talk to the instant something occurs**. Two different surfaces, one shared foundation.

## "Chat" and "full-text search" are different things

I don't want anyone to misunderstand this, so I'll spell it out.

Tasukiba's chat semantic search is **not keyword-based full-text search**. It's also not a general-purpose LLM chat like ChatGPT.

| Kind | Mechanism | Can do | Cannot do |
|---|---|---|---|
| **Full-text search** | Keyword match | Find exact-match text | Surface variation, concept proximity |
| **General LLM chat** | Large language model | General conversation | Ground answers in your past data |
| **Tasukiba chat semantic search** | Embed query → similarity with your `content_embedding` | **Respond grounded in your past assets via semantic similarity** | Generate info that doesn't exist in your DB |

Tasukiba's chat is designed to **ground every answer in the assets your organization actually accumulated**. Hallucination risk is structurally minimized — and that's what makes it usable as **business SaaS**, not just a toy.

## The Tasuki Owl responds — coupled with mascot design

As [M-2 covered](/HomePage/en/blog/20260613-tasukiba-three-master-images/), the Tasuki Owl has **three master images**. One of them, the **chat-specific avatar**, was designed precisely for this feature.

The owl framed by a speech-bubble outline signals "you can talk to me" at a glance. The character direction from [A-5](/HomePage/en/blog/20260530-tasukiba-owl-origin/) — "quiet, watching, not pushy" — carries over into the chat UI.

Not "I'll teach you," but "let me help you notice." Not "look here," but "here, this is sitting on the table." The mascot's copy direction becomes the chat reply's voice directly.

## "But isn't this going to be expensive?"

A technical point worth raising.

"Calling Voyage on every chat query — won't that pile up costs?"

Actually, **query embedding cost is overwhelmingly smaller than asset embedding cost**.

| Scene | Voyage call | Cost feel |
|---|---|---|
| Asset create/update | 1 call (embedding the full asset body) | hundreds to thousands of tokens |
| Chat semantic search query | 1 call (embedding the utterance) | **tens of tokens** |
| Rendering results | **0 calls** (pgvector does it in DB) | $0 |

Voyage's pricing is a 200M-tokens/month free tier plus $0.02/1M tokens beyond ([B-3 pricing philosophy](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/)). A single chat query is tens of tokens, so **individual users' monthly chat usage fits entirely within the free tier**.

That makes chat one of the operations where [B-3](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/)'s "free without threatening business continuity" math holds. **Chat semantic search aims to be free and unlimited across all plans at Phase 2 launch.**

## Chat as a thread connecting "three places"

A closing note on the philosophy side.

In [A-2](/HomePage/en/blog/20260527-tasukiba-sunday-night/), I named five user experiences I want Tasukiba to deliver:

- A. First impression — no friction
- **B. Daily use — energy / a place to settle / fresh discovery**
- C. When things go wrong — quiet awareness
- D. Long-term — raises success rate
- E. As a personality — a trustworthy companion

Chat semantic search hits especially hard on B's **"a place to settle"** and **"fresh discovery."**

A lonely PM has **someone to talk to** sitting beside them. A casual utterance returns **records from your past self or team**. That's the temperature one layer beyond Tasukiba's "business SaaS but also a place" identity.

Tomorrow's post: the third unique feature, **the "Why?" feature**. Phase 3 brings suggestions with "why this is related" explanations. LLM re-ranking and the Pro plan differentiation.

## Related posts

- [The suggestion engine — putting "the past you forgot" back on screen](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) — series part 8, foundation chat sits on
- [Post-release roadmap — Tasukiba Phase 2/3](/HomePage/en/blog/20260609-tasukiba-post-release-roadmap/) — Phase 2 overview
- [Three plans, usage-based — pricing to continue](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/) — the math for "chat is free"

## About Tasukiba

Chat semantic search ships in Phase 2 (within 6 months of release). The current suggestion-feature experience is on the [product page](/HomePage/en/product/tasukiba/).
