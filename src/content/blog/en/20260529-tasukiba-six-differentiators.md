---
title: "Six Axes That Set Tasukiba Apart — From Stubborn Preference"
description: "Tasukiba's differentiation came from stubborn preferences, not market research. Six axes: semantic search, pricing, retrieval, community, autonomy, place."
date: 2026-05-29
tags: ["tasukiba", "business-saas", "differentiation", "product-strategy", "indie-saas"]
---

## "Different on purpose" isn't quite right

Tasukiba Knowledge Relay's differentiation **didn't come from market research**.

It's a little embarrassing to admit, but the order is reversed: I articulated my stubborn personal preferences, and then noticed afterward that the result was different. Six axes follow, and they don't escape my personal taste at any point.

I think indie developers should write this kind of post **without apologizing**. A SaaS built only from competitive analysis usually loses to competitive analysis. So here are the six, one by one.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## 1. Semantic search, not full-text search

Most existing project / knowledge / low-code tools are **great at storing data**. They're **weak at reusing it**, because search is implemented as keyword matching.

- Search for "security requirements," and your past **"data leak countermeasures"** doesn't show up
- Search for "QCD," and your **"quality, cost, schedule"** notes don't show up
- Full-text search itself is fast, but humans cannot scan 1,000 hits in a meeting

Tasukiba uses **semantic search**: Voyage AI embeddings plus PostgreSQL pgvector. Surface form can differ completely; semantic proximity still surfaces the record.

That's the **biggest single difference** from existing tools.

## 2. Not over-charging — pricing to continue

**Tasukiba doesn't price beyond what it needs.**

I'm not aiming to extract profit from this service. I value the service itself enough that I want **as many people using it as possible**.

Billing exists for one reason: **business continuity** — keeping the lights on so the service keeps running. "Pricing to extract" vs. **"pricing to continue"** — these point in opposite directions. Concretely:

- The Beginner plan (5 seats, $0/month) is built to actually be usable
- Usage-based billing only fires **when the user genuinely benefits from the operation**
- No deliberate friction in the cancel flow

A lot of competitors put their energy into upsell pressure. Tasukiba walks the other way. In [Notes on the science of spending](/HomePage/en/blog/20260517-art-of-spending-money/), I wrote that the first question about money is "what is this for?" — same question I'm answering as a service provider deciding how to charge customers.

## 3. The main characteristic is retrieval, not storage

This is, experientially, Tasukiba's biggest characteristic.

> **The system surfaces buried assets (knowledge, risks, issues, retrospectives, memos) at the right moment, so they don't stay buried.**

Most services are **pull** — the user goes to fetch. Tasukiba is **push** — the system delivers, without the user having to remember to ask.

As I wrote in [series part 1](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/), "data the decision-maker's eye never lands on gets treated as if it doesn't exist." Tasukiba is the system-side attempt to dissolve that.

**The defining feature isn't search and isn't storage — it's surfacing.** That's the decisive position relative to everything else on the market.

## 4. Community across tenant boundaries

Most SaaS is **lonely within a tenant**: everything happens inside the boundary, and the service-mediated connections to other tenants are limited to support stories shared by the vendor.

Tasukiba is building **community across tenant boundaries**, via Discord, attached to the product itself.

A place to talk, with peers from other organizations, off-business-clock. Half a step over the line that most business SaaS draws.

"Business SaaS with a community attached?" — people split here, between confusion and curiosity. I'm building for the second group.

## 5. User autonomy as default

Plan changes, cancellation, storage add-on downgrades — **users (tenant admins) complete these themselves, without a vendor in the middle as gatekeeper**.

- Plan change → instant switch from the tenant admin panel
- Cancellation → completes from the same panel, no email back-and-forth
- Storage add-on downgrade → slider, in the user's hands

The underlying belief is:

> **People are satisfied when they have agency.**

A vendor playing gatekeeper sits frontally against that. "We don't block who comes in, we don't block who leaves" — the same idea is in [The Courage to Be Disliked, Part 2 — separating tasks](/HomePage/en/blog/20260523-courage-to-be-disliked-separation-of-tasks/). **A user's decision to keep paying is their task**, not mine.

## 6. A business SaaS that's also a place to settle

The temperature of Tasukiba:

> **A tool that keeps project operations healthy, while quietly being a place to settle.**

Most business tools sit fully in "useful only for work." Tasukiba delivers the work value, and **carries a place to exhale** alongside it.

That's the temperature difference.

## The outline of Tasukiba

Lined up:

| Axis | Typical business SaaS | Tasukiba |
|---|---|---|
| Search | Full-text | Semantic |
| Pricing intent | Extract | Continue |
| Defining feature | Storage | Surfacing |
| Community design | Inside tenant | Across tenants |
| User authority | Gatekeeper | Self-service |
| Temperature | Work-only | Healthy ops + a place to settle |

All six together make the outline.

If I compress it into one sentence:

> **Semantic search that surfaces buried assets, with user autonomy as default and a community that crosses tenant boundaries.**

It's long. But carrying all six is what keeps Tasukiba Tasukiba.

Next time: the face of the service — **the birth of the official mascot, the Tasuki Owl**, and the three symbols it carries.

## Related posts

- [Why I obsess over a tidy UI — tracing it back to a high-school notebook](/HomePage/en/blog/20260528-tasukiba-simple-ui-roots/) — series part 3, UI philosophy
- [The Courage to Be Disliked, Part 2 — separating tasks](/HomePage/en/blog/20260523-courage-to-be-disliked-separation-of-tasks/) — the root of "give the user autonomy"
- [Notes on the science of spending](/HomePage/en/blog/20260517-art-of-spending-money/) — why I chose "pricing to continue"

## About Tasukiba

Tasukiba Knowledge Relay tries to be a business SaaS and a place to settle, both. See the [product page](/HomePage/en/product/tasukiba/) for how the six axes show up in the actual screens.
