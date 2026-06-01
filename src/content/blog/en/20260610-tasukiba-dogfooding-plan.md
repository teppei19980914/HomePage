---
title: "I Won't Sell a Tool I Don't Use Daily — Dogfooding My AI Operations Secretary"
description: "Tasukiba, my AI operations secretary, runs on one premise: I'm the first user. From day one, all my day-job project management flows through it. It surfaces past knowledge by semantic search, and I sharpen it in the field every single day. Here's why."
date: 2026-06-10
tags: ["tasukiba", "dogfooding", "product-quality", "indie-saas", "ai-assisted-dev"]
seriesCategory: "business"
---

## "I'm the first user," all the way through

When I was building Tasukiba, I kept one premise upfront.

> **Don't break the "I'm the first user" premise — ever.**

From the day after release, **all of my day-job project management goes through Tasukiba**. Today, the second post of Chapter L, is about **Dogfooding** — which Tasukiba places at the center of the strategy.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## What "Dogfooding" means

The term comes from **"eat your own dog food."** In software, it means "actually use your own product, with your own team."

Examples:

- Microsoft engineers use Office
- Slack runs on Slack internally
- GitHub teams develop on GitHub

— using it yourself naturally acquires user perspective. That's the core.

## Why Dogfooding matters

**Without** Dogfooding:

- You build features from imagined "should-be"
- You don't know how it actually feels
- Bugs and UX problems stay invisible
- It ends at "shipped, done"

**With** Dogfooding:

- You use it, so painful spots **hurt immediately**
- Bugs are caught fast
- UX improvements happen as part of daily use
- "Keep building" motivation stays alive

Dogfooding is the **floor on product quality**. It's the flip side of ["selling what you don't use yourself feels dishonest" in K-4](/HomePage/en/blog/20260608-tasukiba-two-scenarios/).

## Tasukiba Dogfooding plan

I'm involved in multiple day-job projects. Post-release, **all of that project management runs on Tasukiba**.

### Use scenes

| Scene | How |
|---|---|
| **Starting a new engagement** | Create project → suggestion engine surfaces relevant past knowledge |
| **WBS management** | Task hierarchy / Gantt progress |
| **Risk / issue management** | File risks as they surface → at resolution, promote to knowledge |
| **Retrospectives** | KPT per sprint → semantic search across past retrospective lessons |
| **Knowledge accumulation** | Record technical / business judgments → retrieve on the next engagement |

## What user perspective reveals

Once Dogfooding starts, I'll hit things I didn't notice while building. Guaranteed.

Predictable surprises:

- "This screen I look at every day is a little slow" → performance fix
- "This operation, used often, takes too many steps" → UX simplification
- "Suggestion results aren't as good as expected" → engine tuning
- "I want this filter" → feature addition

Without Dogfooding, these stay invisible forever.

## The "no-AI, hand-build one feature" challenge around June 15

A slightly unusual plan: **around June 15 (±1 week), implement one feature without AI assistance**.

- I currently develop with Claude Code assistance
- For this challenge, I **deliberately stop** and hand-build
- The point is to catch AI-driven habits and traps

Concretely:

- Pick a small new feature
- No Claude Code at all; IDE typing only
- Docs / KDD / ADR also by hand
- Record the time taken

— this measures my AI dependency. If dependency is too high, transitioning to human-driven development gets hard. Same root as [the "reproduce" stage in the psychological-safety post](/HomePage/en/blog/20260521-designing-psychological-safety/): **what you can't reproduce by hand, you don't really understand**.

## Real projects reveal real risk

Risks I see by using Tasukiba on my own work:

- Putting my project info into Tasukiba → **handling PII / confidential info**
- Suggestion engine inaccuracy → **drag on real business efficiency**
- A bug deleting data → **business continuity risk**

Facing these myself makes the response serious.

"Other people's risk" and "my own risk" carry completely different urgency.

## Processing Dogfooding feedback

Issues found via Dogfooding:

1. **Logged as GitHub issues** (with "my use case" written explicitly)
2. **Prioritized** (P0–P3)
3. **Reflected into Phase 2 roadmap**
4. **Implemented**
5. **Re-verified through Dogfooding**

Running this loop moves Tasukiba closer to **"a service I can use every day."**

## Dogfooding as competitive advantage

A SaaS without Dogfooding and a SaaS with Dogfooding have very different long-term competitiveness.

- Without: stops at "built and shipped"
- With: **"improves every day"**

Tasukiba aims at "improves every day." Dogfooding is the engine that makes that possible.

## Where Dogfooding fails — acknowledged honestly

Dogfooding has limits.

- My use case doesn't represent every user's
- One person can't cover every industry's conventions
- "I like it" doesn't mean every user will

So:

- Dogfooding is **necessary, not sufficient**
- User feedback also gets collected
- Stay aware of diverse use cases

**Dogfooding + user feedback** — both wheels needed.

## Predictable "Dogfooding failure" scenarios

Scenarios where Dogfooding might fail later:

| Failure | Mitigation |
|---|---|
| My use case is biased (PM/PL layer; weak on engineer-individual cases) | When members join, Dogfood their cases too |
| Psychological barrier to entering my own data (scary to put real project info in) | If I can't trust it, I can't recommend it to others → motivation to harden security |
| Day-job load makes it hard to keep using | Simplify input → aim for "record in 3 seconds" UI |

All of these are catchable through Dogfooding itself.

## Summary

| Dogfooding role | Effect |
|---|---|
| Naturally acquires user perspective | No reliance on imagination |
| Immediate bug / UX discovery | Fast improvement cycle |
| Risk recognition as personal | Serious response |
| Source of competitive advantage | A service that improves daily |

Tasukiba puts Dogfooding at the center and aims at **a service that improves every day**.

Tomorrow closes Chapter L, and the series's middle act, with the **"cash cow in ten years"** scenario — what I want Tasukiba to do in my life.

## Related posts

- [Post-release roadmap — Phase 2 and Phase 3 of Tasukiba](/HomePage/en/blog/20260609-tasukiba-post-release-roadmap/) — series part 15, roadmap
- [Two-year monetization check, but the service doesn't stop](/HomePage/en/blog/20260608-tasukiba-two-scenarios/) — origin of "keep running it for myself"
- [Psychological safety isn't reached by "knowing it"](/HomePage/en/blog/20260521-designing-psychological-safety/) — kinship between "reproducibility" and "Dogfooding"

## About Tasukiba

Tasukiba Knowledge Relay is built, and run, as a service I use every day. Try it from the [product page](/HomePage/en/product/tasukiba/).
