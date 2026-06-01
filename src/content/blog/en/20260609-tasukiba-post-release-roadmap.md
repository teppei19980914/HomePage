---
title: "One Week After Release — AI Operations Secretary Tasukiba's Phase 2/3 Roadmap"
description: "The June 1, 2026 release of AI operations secretary Tasukiba was only Phase 1 done. Phase 2 brings chatbot semantic search and live payments; Phase 3 brings answer re-ranking, multilingual support, and a public API. The roadmap for strengthening your project management, shared one week in."
date: 2026-06-09
tags: ["tasukiba", "ai-operations-secretary", "project-management", "roadmap", "semantic-search"]
seriesCategory: "business"
---

## One week of operation made the picture sharper than I expected

It's been a little over a week since [the June 1, 2026 release](/HomePage/en/blog/20260601-tasukiba-release-knowledge-relay/).

What surprised me: **the "next six months" I'd sketched vaguely before release came into focus after just one week of operation**. Early-user behavior, the first feedback in, log patterns showing "fix this one thing and a lot gets easier" — when I wrote it all out, the roadmap stood up much more crisply than I'd expected.

The thing worth holding in mind, though, is the obvious one that gets missed: **release isn't "the end" — it's "Phase 1 complete."** Phase 2 and Phase 3 are queued behind it.

Today opens Chapter L — **post-release and roadmap**. First topic: the **Phase 2 / Phase 3 / beyond** picture Tasukiba Knowledge Relay is drawing. I'm separating what I'm now confident I'll do (after a week of operation) from what I'm honestly leaving open ("priority may shift").

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## The overall map

The release plan has three phases.

| Phase | Window | Main milestones |
|---|---|---|
| **Phase 1 (MVP)** | through 2026-06-01 | Suggestion engine / multi-tenant / billing foundation |
| **Phase 2** | release through 6 months | Chatbot semantic search / Stripe live billing / Dogfooding feedback |
| **Phase 3** | 6 months through 2 years | LLM re-ranking / multilingual / public API |

Capability expands step by step.

## Phase 1 (MVP) — what's live at release

What runs as of release:

- **Multi-tenant foundation** (tenant creation / member management / system roles / project roles)
- **Project management** (7-state one-way state machine / WBS / Gantt / task CSV import)
- **Asset management** (knowledge / risks / issues / retrospectives / memos / attachments / visibility control)
- **Suggestion engine v1** (3-axis weighted score / Voyage embedding + pgvector / Graceful Degradation Mode)
- **Auth / security** (NextAuth Credentials + MFA TOTP / tokenVersion multi-layer defense / security score 90/100 enforced)
- **Billing foundation** (per-API-call usage billing / DB and file usage billing / ApiCallLog source of truth / Stripe Metered Billing wiring ready)

MVP-complete on the business-SaaS basics.

## Phase 2 — within six months

### 1. Chatbot semantic search

Phase 1's suggestion engine took **structured input (project purpose/background/scope)**. Phase 2 extends it to **natural-language chat input**.

The experience target:

> User: "Wasn't there a retrospective last month about resource shortage?"
>
> Chat: "Here's the matching retrospective:
>   - 2026-03-15: Sprint 5 retrospective
>     > 'QA resources were short, test phase slipped'
>     > Related risk: R-005 (resource estimation accuracy)
>     > Related knowledge: K-012 (criteria for introducing QA automation)"

Natural-language queries surface past assets. Extending the [suggestion engine in B-2](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) from structured forms to dialogue.

### 2. Stripe live billing

Phase 1 built the Stripe **wiring**, but production runs on **manual invoice operations** (risk hedge).

Phase 2:

- Acquire Stripe production account
- Identity verification, bank account registration
- Webhook connection (live)
- Migrate initial tenants to automatic billing

— reach "fully operational commercial SaaS."

### 3. Dogfooding feedback

Post-release, [I'll be using Tasukiba for my own project management](/HomePage/en/blog/20260610-tasukiba-dogfooding-plan/). Feedback from that goes back into Phase 2:

- Suggestion engine precision tuning
- UI improvements
- Bug fixes
- Feature request evaluation

This is the largest fuel source for Phase 2.

## Phase 3 — six months through two years

### 1. LLM re-ranking

Run Phase 1's suggestion results (3-axis weighted score order) through an LLM for re-ranking.

```
Phase 1 suggestion results (3-axis weighted score)
  ↓
LLM re-ranking (Pro plan)
  ↓
Final suggestion results (with relevance explanation)
```

Concretely:

- Send top-N (e.g. top 20) to Anthropic Sonnet
- LLM generates "why this is relevant" text
- User sees **suggestions with reasons**

This is the Pro plan's differentiator. Beginner / Expert get up to 3-axis score; Pro gets the LLM-explained version.

### 2. Multilingual

Phase 1 is Japanese only. Phase 3 puts English support on the table.

- UI translation
- Voyage embeddings are already multilingual (mixed JA/EN OK in the same model)
- Re-evaluate suggestion accuracy under multilingual conditions

### 3. Public API

Open Tasukiba's API for external system integration.

- REST API (OpenAPI schema)
- Auth: API Key + OAuth2
- Use cases:
  - Call suggestions from an existing PM tool
  - Hit Tasukiba from Slack / Teams chat
  - Custom integrations (BPM / ERP)

Public API widens Tasukiba's **ecosystem**.

## Beyond Phase 3

Past three phases, with **no fixed dates**:

- AI agent (operate Tasukiba via API as an agent)
- Industry-specific templates (construction, manufacturing, SaaS dev)
- Automated CSAT / NPS integration
- Auto-categorization of knowledge + auto-generated reports

These get prioritized by Phase 1–3 progress and user feedback.

## Why I publish the roadmap

Tasukiba **publishes** the roadmap.

Three reasons:

1. Users can **predict** "when does this feature show up?"
2. Users can **decide** "if I need this feature, I should pick another service"
3. Transparency builds trust

A lot of SaaS treats the roadmap as confidential. Tasukiba walks the other way. Same root as ["the UI doesn't lie" in B-4](/HomePage/en/blog/20260604-tasukiba-user-autonomy-ui/).

## "The roadmap isn't a promise" — stated

That said, the roadmap **isn't a promise**.

- User feedback shifts priorities
- Technical discoveries surface new features
- Market changes force direction changes

The roadmap updates periodically, with this in mind.

Users get the explicit label: **"the roadmap is a plan, not a commitment."** As [A-3 said about ambiguity by domain](/HomePage/en/blog/20260528-tasukiba-simple-ui-roots/), **future plans are a domain where ambiguity functions as breathing room**.

## First 30 days checklist

The first 30 days post-release matter.

- **Day 0**: release day. Final production verification, Discord announcement
- **Day 1–3**: initial-user signup follow-up, support
- **Day 4–7**: usage-log analysis, catch unexpected behavior
- **Day 8–14**: ship the first feedback fixes
- **Day 15–30**: lock down the Phase 2 plan

That cadence sets up the post-release ops shape.

## Summary

| Phase | Window | Content |
|---|---|---|
| Phase 1 (MVP) | through 2026-06-01 | Core capabilities |
| Phase 2 | through 6 months | Chatbot / Stripe live / Dogfooding |
| Phase 3 | through 2 years | LLM re-ranking / multilingual / API |
| Beyond | TBD | AI agent / industry templates / ecosystem |

Stepwise phases mean **value ships at every phase**.

Tomorrow: **Dogfooding plan — using my own service on my own projects**. The center of Tasukiba's strategy: "don't sell what you don't use yourself."

## Related posts

- [Two-year monetization check, but the service doesn't stop](/HomePage/en/blog/20260608-tasukiba-two-scenarios/) — series part 14, Chapter K close
- [The suggestion feature — putting "the past you forgot" back on screen](/HomePage/en/blog/20260602-tasukiba-suggestion-feature/) — current state of the suggestion engine Phase 2 extends
- [Return autonomy to the user — a UI with no gatekeeper](/HomePage/en/blog/20260604-tasukiba-user-autonomy-ui/) — root of publishing the roadmap

## About Tasukiba

Tasukiba Knowledge Relay keeps expanding after Phase 1. See the [product page](/HomePage/en/product/tasukiba/) for the current feature set and roadmap.
