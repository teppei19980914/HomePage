---
title: "Six Months to Ship an AI Operations Secretary — A Solo-Dev Recap"
description: "From 2025-12 kickoff to 2026-06-01 release, a month-by-month retrospective of building Tasukiba, my AI operations secretary for project management and semantic search. 450+ improvements, shipped solo in 480 hours alongside a day job. The honest timeline."
date: 2026-06-14
tags: ["tasukiba", "indie-saas", "ai-assisted-dev", "claude-code", "retrospective"]
seriesCategory: "milestone"
---

## The six-month map

To close the series's first half: a month-by-month retrospective of Tasukiba Knowledge Relay's six-month build.

```
2025-12: Kickoff (vision + tech stack)
   ↓
2026-01: Foundation (auth + multi-tenant)
   ↓
2026-02: Core (project + knowledge)
   ↓
2026-03: Suggestion engine (Voyage + pgvector)
   ↓
2026-04: Performance + billing
   ↓
2026-05: Finishing (quality gates + docs)
   ↓
2026-06-01: Release
```

Six months to MVP release. The distance from [the problem in series part 1](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/) to here, logged by month.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## Month 1 (2025-12) — kickoff

**Done**:

- Articulating the vision (basis for `docs/vision/README.md`)
- Tech stack research
- Deciding on the name "Tasukiba"
- Prototype on Next.js + Prisma + Supabase

**Learned**:

- **Writing the vision first** — becomes the judgment criterion later
- **Choose the tech stack early** — changing it later hurts

Key ADRs: ADR-0001 (multi-tenant), ADR-0004 (Prisma)

## Month 2 (2026-01) — foundation

**Done**:

- NextAuth v5 for auth
- Credentials + MFA (TOTP)
- Multi-tenant base design
- Service-layer authorization pattern

**Learned**:

- **Auth: boring library is fine** — NextAuth is enough
- **Block tenant crossing from day one** — bolting it on later is painful
- **`viewerTenantId` as required argument** is effective

Key ADRs: ADR-0005 (two-stage auth), ADR-0009 (MFA)

## Month 3 (2026-02) — core

**Done**:

- Project CRUD
- Knowledge / risks / issues / retrospectives
- WBS / Gantt
- CSV import

**Learned**:

- **Care about details in the core** — UI consistency decides later experience
- **Write tests as you go** — writing them later is hell
- **UX details like fullscreen dialog toggle** matter

Key ADRs: ADR-0010 (state machine), ADR-0011 (soft delete), ADR-0017 (WBS import)

## Month 4 (2026-03) — suggestion engine

**Done**:

- Voyage AI embedding integration
- pgvector + HNSW index
- 3-axis weighted score
- Graceful Degradation Mode

**Learned**:

- **Semantic search is in a different class** vs full-text
- **Cost optimization** — `visibility='draft'` doesn't need embedding
- **Fail-safe design** — keeps running through external-API outages

Suggestion-engine internals: as written in [B-2](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/).

Key ADRs: ADR-0003 (suggestion engine), ADR-0008 (graceful degradation)

## Month 5 (2026-04) — performance + billing

**Done**:

- Performance work (N+1 elimination, 1.8s → 0.7s, 60% improvement)
- Stripe Metered Billing integration
- ApiCallLog source-of-truth model
- DB / file capacity usage billing

**Learned**:

- **N+1 elimination is powerful** — simple fix, large effect
- **Billing invariant is critical** — root of business continuity
- **3-layer synchronization** (current / cron snapshot / history queries) is necessary

Pricing detail: [as written in B-3](/HomePage/en/blog/20260603-tasukiba-pricing-philosophy/).

Key ADRs: ADR-0002 (per-call billing), ADR-0006 (Stripe), ADR-0020 (DB capacity)

## Month 6 (2026-05) — finishing

**Done**:

- 5-stage quality gate complete (lint / tsc / test / coverage / build)
- E2E coverage enforced in CI
- Docs restructured
- Mascot introduced ([as written in M-1](/HomePage/en/blog/20260612-tasukiba-mascot-4-candidates/))
- ADR-0019 billing redesign

**Learned**:

- **Last month before release: finishing only** — no new features
- **Mascot introduction changes temperature** — brand formation
- **Doc restructuring boosts maintainability**

Key ADRs: ADR-0014 (CRUD redesign), ADR-0019 (billing redesign), ADR-0021 (file capacity)

## Cumulative stats

```
Total stats (2025-12 → 2026-05):
  - PRs: 450+
  - Lines of code: ~40,000
  - Tests: 1,500+ (unit) + 100+ (E2E)
  - ADRs: 21
  - KDD: 16,000 lines
  - Docs: 60+ files
  - Env vars: 30+
  - Tables: 30+
```

Solo, in six months. Honestly.

## "Without AI-driven development, this wouldn't have shipped"

Frankly: without AI assistance, six months to release would have been impossible.

- Code generation: ~70–80% by Claude Code
- Documentation: Claude drafts ADRs / KDD
- Review assistance: ask Claude to review

The feeling is that AI **multiplies code-writing speed by 5–10x**. **Judgment with me, execution with AI** — that division. A surprise: typing up "reproducible patterns" (in the sense of [the psychological-safety post](/HomePage/en/blog/20260521-designing-psychological-safety/)) gets dramatically easier when paired with AI.

## Time investment

Alongside a day job:

- Weeknights: 1–2 hours × 5 = 10 hours/week
- Weekends: 4–6 hours × 2 = 10 hours/week
- Total: **20 hours/week**

6 months ≈ 24 weeks = **480 hours**.

That's about **3 months of full-time development**. Without AI assistance, easily 5–10x that.

## What was hardest about solo development

### 1. Deciding everything alone

Design, business, legal — all alone. No reviewer.

Countermeasures:

- Make decisions visible via ADR
- Ask Claude Code "is this decision reasonable?"
- Let decisions sit for a few days before committing

### 2. Sustaining focus

Day job + indie development drains energy.

Countermeasures:

- Keep one day off per weekend
- When attention scatters, switch tasks
- Health first

### 3. The fear of releasing

"Will it actually work?" "Are there bugs?"

Countermeasures:

- Quality gates as structural guarantee
- Phased release (Dogfooding period)
- Emergency-response SOP ready

## What I'd do again

- **Write the vision first** — judgment stays stable across 6 months
- **Log ADR / KDD immediately** — future-you is grateful
- **Buy time with AI-driven development** — solo 6-month MVP is achievable
- **Set up quality gates early** — once CI is in, later work is easier
- **Dogfooding** — using it yourself maintains quality ([covered in L-2](/HomePage/en/blog/20260610-tasukiba-dogfooding-plan/))

## What I wouldn't do again

- **Over-featuring** — should have stuck strictly to MVP-essential
- **Premature optimization** — some perf work could have waited until post-release
- **Perfect UI** — some details ate more time than they returned

The lesson: **decide "what not to do" first** matters as much as the to-do list.

## The next six months

Post-release 6 months (2026-06 → 11):

- Phase 2 implementation (chat semantic search)
- Stripe live + initial tenants
- Dogfooding-driven improvements
- First teammate joining (planned)

Release was not the end — it's **a new start**.

## Connecting to year ten

[The year-ten vision in L-3](/HomePage/en/blog/20260611-tasukiba-ten-year-vision/):

- "Cash cow" generating stable revenue
- Live proof of a psychologically safe organization
- Capital for multiple ventures

— the first step toward all of that is this six-month MVP. **Small concrete results, connected to a long dream.**

## Summary

| Month | Focus | Outcome |
|---|---|---|
| Dec | Kickoff | Vision + tech stack |
| Jan | Foundation | Auth + multi-tenant |
| Feb | Core | Project + knowledge |
| Mar | Suggestion engine | Voyage + pgvector |
| Apr | Performance + billing | 60% improvement + Stripe |
| May | Finishing | Quality gates + mascot |

Six months to MVP, recorded as a personal experience. Hopefully useful as **realistic effort estimation** for anyone considering indie SaaS.

## First half of the series — wrapping up here (plus 2 technical bonus posts)

Thank you for staying with the first 20 posts of the Tasukiba Knowledge Relay series.

| Chapter | Theme | Count |
|---|---|---|
| A | Origin & philosophy | 6 |
| B | Product overview & release | 4 |
| K | Community, hiring, culture | 4 |
| L | Post-release & roadmap | 3 |
| M | Mascot (bonus) | 2 |
| O | Six-month retrospective (this post) | 1 |
| **Total** | | **20** |

The series then closes with **two technical bonus posts**. Two of Tasukiba's three unique features that haven't been deep-dived yet:

- 6/15: [Talking to Tasukiba in natural language — Phase 2 chat semantic search](/HomePage/en/blog/20260615-tasukiba-chat-semantic-search/)
- 6/16: [Suggestions with a "Why" — Phase 3 LLM re-ranking](/HomePage/en/blog/20260616-tasukiba-why-feature/)

Coming over the next two days. The deeper technical writing goes to Qiita, but **at the depth where homepage readers can grasp what kind of SaaS this is**, these two posts are worth keeping here.

That's the real first-half wrap. The second half continues based on **how things actually unfold** — Phase 2 / Phase 3 progress, Dogfooding insights, teammate-joining stories.

Tasukiba Knowledge Relay is always at the [product page](/HomePage/en/product/tasukiba/). Come say hi on Discord, anytime.

— Pass the **tasuki** forward.

## Related posts

- [Three master images for the mascot](/HomePage/en/blog/20260613-tasukiba-three-master-images/) — series part 19, mascot ops
- [An hour a day was evaporating — why I built Tasukiba](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/) — series part 1, the starting point of this six-month journey
- [A "cash cow in ten years" — what I want Tasukiba to do in my life](/HomePage/en/blog/20260611-tasukiba-ten-year-vision/) — where this six-month MVP is headed

## About Tasukiba

Tasukiba Knowledge Relay is a business SaaS shipped on 2026-06-01 after six months of solo development. See the [product page](/HomePage/en/product/tasukiba/) and give it a try.
