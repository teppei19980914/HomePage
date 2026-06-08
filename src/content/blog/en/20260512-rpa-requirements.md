---
title: "RPA 40h/Month Savings — A Requirements Pattern That Works"
description: "A real RPA engagement that delivered 40h/month savings: target selection, As-Is/To-Be decomposition, Power Automate design, and operations built for handover."
date: 2026-05-12
tags: ["RPA", "Power Platform", "Power Automate", "Requirements", "Business Improvement"]
---

## "We Adopted RPA, But the Effect Wasn't What We Expected"

Ever rolled out RPA with high hopes and quietly watched it become "yet another thing to maintain"?

You hear it often: automated, yet maintenance still eats time monthly; the business got forced to fit the tool and the floor turned confused; "we just replaced an Excel macro" was the whole project.

In a past engagement I delivered **40 hours per month of savings**. Here is the requirements pattern I now use, in **five steps**. This isn't about tool selection (UiPath / Power Automate / WinActor) — it's about **the tool-independent way to approach requirements**.

## Why Picking the Wrong Target Kills the Effect

Roughly 80% of failed RPA projects fail because **the wrong target was chosen during requirements**.

| Failure pattern | What goes wrong |
|---|---|
| High-exception process | RPA becomes a tangle of branches; maintenance exceeds manual |
| Low-frequency process | Savings too small; ROI never appears |
| Rules that change often | RPA breaks monthly; the team falls back to manual |

The requirements step needs a built-in judgment for **"is this process automation-friendly?"**

## Step 1: RPA Target Selection — Four Judgment Lenses

Score each candidate against these four lenses.

| Lens | High score when | Common NG |
|---|---|---|
| **Frequency** | Daily or weekly | A few times / month, irregular |
| **Volume** | 30+ minutes per run × 10+ runs/month | 5-minute task |
| **Rule stability** | No rule changes in the past year | Spec changes monthly |
| **Exception ratio** | 3 or fewer exception patterns | Endless exceptions |

Score, and **start only with processes that score high on all four**. If even one lens is NG, consider alternatives (process redesign, SaaS, scripting) instead.

### The Courage Not to Automate

In experience, **30–50% of "RPA candidates" are better off not being automated at all**. Narrowing to the truly effective processes is the precondition for 40h/month savings.

## Step 2: Business Decomposition — Document Both As-Is and To-Be

Once a target is chosen, decompose **both the current process (As-Is) and the post-RPA process (To-Be)**. The common failure is "automating the As-Is verbatim."

### As-Is Decomposition Lenses

| Lens | What to confirm |
|---|---|
| Input | Where it comes from (mail / file / system / web) |
| Process | What judgments and transformations are involved |
| Output | Where it's written / who is notified |
| Exceptions | Patterns from the past year and how they were handled |

### Use To-Be to Redesign the Business Itself

RPA is **an opportunity to redesign the business**. Instead of mirroring As-Is, ask:

- Is this step actually necessary? (Or is it a habit from the past?)
- Can input/output formats be unified?
- Where exactly is the boundary between human judgment and rule-able decisions?

In my experience, **savings from process redesign** often exceed savings from RPA itself.

## Step 3: Power Automate Design Patterns

Using **Power Automate** as the example tool (the thinking applies to other RPA tools).

### Recommended Flow Structure

```
[Trigger]
   ↓
[Input retrieval (connector)]
   ↓
[Input validation (variables + conditions)]
   ↓
[Main processing (parallel where possible)]
   ↓
[Output write]
   ↓
[Result notification (success and failure)]
   ↓
[Error handling (Try-Catch structure)]
```

### Five Design Rules

1. **Guarantee idempotency** — same input must yield same result no matter how many times it runs
2. **Don't swallow errors** — every error is sent to a destination (Teams / email)
3. **Provide a test-data execution mode** — a flag that lets you validate without touching production data
4. **Keep logs** — record start/end time, processed count, failed count
5. **Always set timeouts** — prevent infinite loops

### Integrating with the Business DB (Power Automate × PostgreSQL)

When the business system is PostgreSQL, Power Automate can connect directly, but **placing an API gateway in between is operationally safer**.

```
Power Automate
   ↓ (HTTP)
Cloud API (REST)
   ↓ (internal)
PostgreSQL
```

Why:
- Credentials don't sit on the Power Automate side (lower leakage risk)
- DB schema changes can be absorbed at the API layer
- Logging, audit, and rate limiting concentrate at the API layer

It's more upfront cost than direct connection, but **operations effort drops significantly**, which directly sustains the 40h/month savings.

## Step 4: Operations Design Built for Handover

Don't let the 40 hours saved get eaten back by operations. Operations must be designed **assuming a handover**.

Maintain a **three-document set** — business flow diagram (As-Is / To-Be / exceptions), operations manual (per-error response and contacts), maintenance manual (test perspective on change / release procedure) — **in Git**, in the same repo and review process as the RPA flow. "It's running, so it's fine" is the biggest risk.

Measure monthly: **time saved**, **failure count**, **manual intervention time**. "Time saved − manual intervention" is the **real saving**. If it turns negative, stop and reassess.

## Step 5: Phased Release — Don't Cut Manual All at Once

RPA release, like test automation release, should **never stop manual; transition in phases**.

```
Week 1: RPA in trial run, manual in parallel (cross-check results)
Week 2: RPA primary in part of cases, manual as backup
Week 3-4: RPA primary, manual only in exceptions
Week 5+: RPA full operation, monthly improvement cycle
```

During the parallel period, **confirm RPA results match manual results** before stopping manual. This minimizes business impact from any RPA bugs.

## The Numbers from a Real Engagement

For reference, the breakdown from a project I worked on.

| Stage | Monthly manual effort | Effect |
|---|---|---|
| Before (all manual) | ~60h / month | Baseline |
| Phase 1 (process redesign only) | ~40h / month | **−33%** (Step 2 effect) |
| Phase 2 (RPA complete) | ~25h / month | **−58%** (partial automation) |
| Phase 3 (after stable ops) | ~20h / month | **−67%** (~40h saved total) |

**A 33% cut from process redesign alone** was the surprising finding. Before grabbing RPA, you can cut substantially **just by redesigning the business**.

## Closing Thoughts

The key to 40h/month RPA savings isn't the tool — it's **the quality of requirements**. Target selection (four lenses plus the courage not to automate), decomposition (don't mirror As-Is; redesign in To-Be), design patterns, operations design, and phased release — these five steps deliver the result.

If you have a candidate process sitting in front of you right now, you might try just the four selection lenses on it before opening any tool. Half the answer usually lives there.

See also [the RPA implementation engagement](/HomePage/en/project/implem-rpa/).

## Related Articles

- [How I Cut Regression Test Effort by 90% — Selection, Automation, Operations](/HomePage/en/blog/20260511-test-effort-reduction/) — The same pattern applied to test effort
- [AI That Implements Without Hesitation — How to Write a 20-Section, 3,500-Line Design Doc](/HomePage/en/blog/20260426-design-doc-howto/) — The next phase after fixing requirements: the design doc
