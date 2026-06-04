---
title: "Starting at $0 — Pricing the AI Operations Secretary Tasukiba, All 3 Plans Open"
description: "AI operations secretary Tasukiba's three plans (Beginner/Expert/Pro) and usage billing are designed to last, not to maximize profit. Fixed $0/month, the case for free ops, capacity-based usage billing, and self-service cancellation — every pricing decision behind your project management, explained."
date: 2026-06-03
tags: ["tasukiba", "ai-operations-secretary", "project-management", "pricing", "indie-saas"]
seriesCategory: "business"
---

## The pricing table was, honestly, the hardest decision of the six months

Honestly: across the entire build of Tasukiba Knowledge Relay, what I struggled with the most wasn't tech selection or UI — it was **the pricing table**.

"What price keeps the service alive, and still lets users join without guilt?" In front of that question, I built spreadsheet after spreadsheet, deleted them, built them again. What I eventually landed on is the line in today's post: **"pricing to continue, not pricing to extract."**

I'm not aiming to extract profit from this service to begin with. As I wrote in [series part 1](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/), I'm betting on the value of the service itself, and I want **as many people using it as possible**.

Billing exists for one reason: **keeping the service alive for ten years**. "Not to extract — to continue." Written down, it sounds obvious. More than half of the time I spent on the pricing table, though, was me fighting the impulse to quietly conflate those two.

Today's post unpacks how that belief lands in three plans and usage-based detail. It's [the science-of-spending post](/HomePage/en/blog/20260517-art-of-spending-money/) — "what is the money for?" — answered from the receiving end this time.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## The three plans

| Plan | Seats | Monthly fixed | Usage (Project upsert) | Auto-tag model |
|---|---|---|---|---|
| **Beginner** | up to 5 | $0 | free up to 50/month, then billed | Haiku |
| **Expert** | unlimited | $0 | ¥10 / call | Haiku |
| **Pro** | unlimited | $0 | ¥15 / call | Sonnet ("Why?" feature = LLM re-ranking) |

> ※ The usage prices above are for **LLM calls** (tag extraction, "Why?" explanations). Embedding (asset entry, chat semantic search) is billed separately: **free up to 100/month on Beginner, ¥5/call on Expert・Pro**. DB capacity and file storage are usage-based too (below).

### What's behind the choices

- **Every plan: $0 monthly fixed** — months you don't use cost zero
- **Usage billed per "business operation"** — many internal API calls collapse into a single user-visible charge
- **No seat-based markup** — large teams aren't penalized (Expert / Pro have unlimited seats)

## Why "project upsert: 50 free / month" on Beginner

Beginner has an unusual shape — "first 50 project create/update calls/month are free; after that, billed."

That's the **balance between abuse prevention and adoption**.

- **Abuse prevention**: prevent mass project creation that explodes LLM costs
- **Adoption**: typical use (a handful to dozens of projects per month) is fully free

The number 50 comes from my own usage logs as **"a multiple of the realistic project count for an individual or small team."** Normal use never reaches 50. Reaching it is the signal that **"you should probably move to Expert."**

## No downgrade back to Beginner

ADR-0013:

> **Once a tenant is on Expert or Pro, they cannot return to Beginner.**

This is abuse prevention.

- Prevents the cycle: go Expert → create lots of projects → downgrade to Beginner for the free tier → go back to Expert
- Beginner is **the entry point for first-time users**, not a refuge for heavy users

By blocking the downgrade path, Beginner stays as **a real free tier for genuinely new users**.

This is an exception to ["return autonomy to the user," which I'll write about tomorrow](/HomePage/en/blog/20260604-tasukiba-user-autonomy-ui/). When exceptions exist, **say honestly why** — that's a Tasukiba design rule.

## DB and file storage: also usage-based

Cost components outside the plan:

- **DB capacity** — ADR-0020, usage-based, monthly charge per GB
- **File storage** — ADR-0021, usage-based, monthly charge per GB

Both are **"pay for what you actually used, after the fact."**

Why post-pay instead of pre-pay? Because **"billed for what I used this month"** is intuitive, and doesn't generate wasted prepayment.

A "pricing to extract" design would prefer monthly prepayment, locking in revenue even on unused capacity. Tasukiba deliberately **doesn't take that direction**.

## Cancellation and downgrade are UI-self-service

Plan changes, cancellation, storage add-on downgrades — **all self-service**.

- **Cancellation**: a "Cancel tenant" button completes it from the tenant settings panel. No vendor round-trip.
- **Downgrade**: a slider on the same panel.
- **Re-signup after cancellation**: same email, instant.

"We don't block who comes in, we don't block who leaves" — pushed down to the click level. The full story in tomorrow's [B-4](/HomePage/en/blog/20260604-tasukiba-user-autonomy-ui/).

## The billing invariant — for transparency

Billing-backing data is **recomputed on dashboard navigation, with a manual "recompute" button next to it**, keeping numbers live.

Cron-cache isn't relied on for billing because **the goal is to make mis-billing physically impossible**.

When a user sees "this month's bill," and it's a snapshot from yesterday, they get uneasy. **"This is the live number, right now"** is what builds trust.

`ApiCallLog` → screen → invoice → CSV → Stripe API — **every path reads from the same source of truth (`ApiCallLog` SUM)**. That's Tasukiba's "billing invariant for business continuity," and it's structurally enforced.

## One sentence

Compressed:

> **Charge only for what was used, only for what should be charged, scaled to its unit cost, transparently. Keep the system's own automation and learning support free.**

That's a different place to stand from "maximize extraction." It's a choice grounded in numbers, and a choice grounded in values.

Tomorrow closes Chapter B: how "return autonomy to the user" lands at the screen level.

## Related posts

- [The suggestion feature — putting "the past you forgot" back on screen](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) — series part 8, suggestion engine
- [Notes on the science of spending](/HomePage/en/blog/20260517-art-of-spending-money/) — where "what is the money for?" came from
- [Six axes that set Tasukiba apart](/HomePage/en/blog/20260529-tasukiba-six-differentiators/) — why "pricing to continue" is one of the differentiation axes

## About Tasukiba

Tasukiba Knowledge Relay starts at $0/month across all three plans. See the [product page](/HomePage/en/product/tasukiba/) for plan details and the usage-based formula.
