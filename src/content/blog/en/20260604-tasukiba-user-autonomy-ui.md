---
title: "Return Autonomy — Tasukiba's UI Without a Gatekeeper"
description: "Plan changes, cancellations, downgrades — all without vendor round-trip in Tasukiba. Data export, self-role exception, UI = API authorization equivalence."
date: 2026-06-04
tags: ["tasukiba", "ux", "ui-design", "user-autonomy", "product-philosophy"]
seriesCategory: "design"
---

## The one sentence behind the design

Tasukiba's UI is held together by one belief.

> **Humans are satisfied when they have agency.**

A vendor playing gatekeeper sits frontally against that. Tasukiba walks the other way.

Concretely:

- Plan changes, cancellation, storage add-on downgrades
- Member adds, role changes, leaving
- Data export (CSV / Markdown / Excel)

All of these are **UI that completes without vendor round-trips**. Today, the closing post of Chapter B, is about that.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## The friction trap in typical business SaaS

Many business SaaS deliberately add friction to cancellation and shrink operations.

- Bury the cancel button in a deep menu
- "Please pick 10 reasons for cancellation" — a psychological wall
- "Please contact support" — an intermediate step

The intent is to buy time to win the user back. Business-rationally, it's not wrong.

From the user's side, though, this is **a design that takes away freedom**. The moment you decide "I want to leave here," the service catches your sleeve. It leaves a bad taste. Tasukiba doesn't want to leave that taste.

This is essentially the same idea as [The Courage to Be Disliked, Part 2 — separating tasks](/HomePage/en/blog/20260523-courage-to-be-disliked-separation-of-tasks/). **Whether the user keeps using the service is the user's task** — not mine. My task is only: provide value that makes them want to keep using it.

## "Don't block who comes in, don't block who leaves" — implemented

The screen-level reality:

### Plan change

In the tenant settings panel, the "Plan" section:

1. Current plan (e.g. Beginner)
2. **"Change to Expert" / "Change to Pro"** buttons
3. A "confirm change" dialog with pricing preview
4. **Immediate switch**

No vendor approval. Tenant admin's authority is enough.

### Cancellation

At the bottom of the same panel:

1. **"Cancel tenant"** button
2. Confirmation dialog ("all of X's data will be deleted")
3. **Immediate cancellation**

No "pick a reason" intermediate. An optional **"send feedback"** link sits beside it — sending feedback isn't required.

### Storage add-on downgrade

If you've expanded storage:

1. Current capacity and usage shown
2. Slider to pick new capacity
3. **"Next invoice reduced by ¥xx"** in real time
4. Confirm — immediate

No "please consult support before downgrading." Just the slider.

## Export — "your data is yours"

Tasukiba lets you take your data out, anytime.

| Entity | Format |
|---|---|
| Knowledge | Markdown, bulk download |
| Risks / Issues | CSV export |
| Retrospectives | CSV / Markdown |
| Memos | Markdown |
| Projects | CSV (with tasks) |

This preserves a state where **you can leave Tasukiba at any time**.

When your data feels like a hostage, you can't relax into the service. When you can take it out at any time, you can relax — and **keep using it**.

"Earn trust by guaranteeing freedom" — straight line back to the "non-dependent distance" I wrote about in [series part 2](/HomePage/en/blog/20260527-tasukiba-sunday-night/).

## Operational rules for not playing gatekeeper

As the operator, I run things so that **"please stop here"** isn't a thing I say.

- Plan-change pre-approval → not required
- Cancellation reason interview → optional
- Member-add cap → configurable, but at the tenant admin's discretion
- Role-change vendor approval → not required

Exceptions: **legal compliance / security violation response only**. Those are exceptions for user safety, not for vendor convenience.

## The one exception: blocking self-role downgrade

There's exactly one place user freedom is restricted.

> **An admin cannot lower their own role.**

This is the safety net for "what if the last admin leaves the tenant" (ADR-0014). Role changes get audit-logged, and **only another admin can change a role**.

This isn't about **"restricting users."** It's about **"preventing operational accidents."**

When such an exception exists, the UI **states the reason in plain language**.

> "You cannot change your own role. Please ask another admin."

The restriction stops feeling arbitrary. And: when Tasukiba says "no," it always offers **an alternative path** alongside the no. That's a rule.

## "UI = API authorization equivalence"

Slightly technical, but Tasukiba holds the principle:

> **A button you can't click in the UI is a request the API won't accept.**

ADR-0014. Concretely:

- UI disables a button → simultaneously the API returns 403 Forbidden
- UI hides a menu → simultaneously the API path is inaccessible

This is the structural enforcement of **"what you see equals what you can do."**

The experience of "the button was there, I clicked it, and I got a 403" is **the UI lying**. Tasukiba refuses to let the UI lie.

## One line

Tasukiba's UI design compresses to one line: **return autonomy to the user.**

- Plan change / cancellation / downgrade → self-service
- Data export → anytime
- Self-role-change block → exception, with the reason stated
- UI = API authorization equivalence → the UI doesn't lie

Some of this looks like **"extra work for the operator with no upside."** It did take a lot of implementation time.

But what's being handed to the user is **freedom**. And, as [The Courage to Be Disliked, Part 3 — here and now](/HomePage/en/blog/20260524-courage-to-be-disliked-here-and-now/) puts it, **freedom is the ground that trust grows on**. Short-term it's a sub-optimal choice. Long-term, I believe it's the only shape that keeps going.

## Chapter B done

Four Chapter B posts complete:

- [B-1: release announcement + service overview](/HomePage/en/blog/20260601-tasukiba-release-knowledge-relay/)
- [B-2: the suggestion feature](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/)
- [B-3: pricing philosophy](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/)
- B-4 (this post): return autonomy to the user

Chapter K next — **community, hiring, culture**. Tomorrow: **"empathy as the hiring filter"** — gathering people by values, not by technical skill.

## Related posts

- [Three plans, usage-based — pricing to continue, not to extract](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/) — series part 9, pricing
- [The Courage to Be Disliked, Part 2 — separating tasks](/HomePage/en/blog/20260523-courage-to-be-disliked-separation-of-tasks/) — root of "hand over agency"
- [The Courage to Be Disliked, Part 3 — here and now](/HomePage/en/blog/20260524-courage-to-be-disliked-here-and-now/) — "freedom is the ground that trust grows on"

## About Tasukiba

Tasukiba Knowledge Relay's UI is built on the conviction that autonomy belongs with the user. See the [product page](/HomePage/en/product/tasukiba/) for actual screens and self-service flows.
