---
title: 'Tasukiba, the AI Operations Secretary — Semantic Search Surfaces "The Past You Forgot"'
description: "The core of AI operations secretary Tasukiba is its suggestion engine. Unlike ordinary project management tools where you search yourself, semantic search auto-surfaces your knowledge management history at three moments. Why push beats pull, the 3-axis score, and zero-cost-at-suggestion-time design."
date: 2026-06-02
tags: ["tasukiba", "ai-operations-secretary", "semantic-search", "project-management", "knowledge-management"]
seriesCategory: "design"
---

## The core feature is actually "suggestion"

Tasukiba Knowledge Relay is an **AI operations secretary**. It is a project-management tool and a knowledge-management tool too — but both of those are **means**.

The core feature is the **suggestion engine**.

From the accumulated:

- knowledge
- risks
- issues
- retrospectives
- memos
- past projects themselves

— the system automatically lines up **"what's related to what the user is doing right now."**

This is the day after the release announcement ([B-1](/HomePage/en/blog/20260601-tasukiba-release-knowledge-relay/)), so today I'll write about the feature I poured the most time and stubbornness into — what experience it actually creates.

👉 [Tasukiba product page](/HomePage/en/product/tasukiba/)

## Three places where suggestions appear

Three moments, each with slightly different meaning.

### 1. When you create or update a project

When you create a new project, the `purpose` / `background` / `scope` fields feed into a search that produces **up to 50 related items**.

```
[New project: e-commerce site renewal]

  → Related knowledge (10)
     - "Stripe webhook idempotency design"   (relevance 0.82)
     - "E-commerce PII masking design"       (relevance 0.79)
     - ...

  → Past risks (10)
     - "Session expiry during cart operation" (relevance 0.71)
     - ...

  → Past issues (10)
  → Retrospective lessons (10)
  → Related memos (10)
```

"A similar problem happened on this past project" — the system says it, before you remember to ask. Past projects you'd forgotten about quietly come into your visual field.

### 2. The "reference" tab inside a project

A project detail page has a "Reference" tab. **You can re-pull suggestion candidates at any time.** Update the project's content, and the candidates update too.

"What were those suggestions again?" — one click away.

### 3. Inline suggestions while filing a risk or issue

On the new-risk or new-issue screen, as you type, **past similar filings appear in real time below the form**.

"This problem happened before, and here's how it was resolved." Past-you (or past-team) ends up tutoring present-you. That's the experience I'm aiming for.

## Why push, not pull

Most services are **pull** — the user goes to fetch information.
Tasukiba is **push** — the system delivers, without the user having to remember to ask.

The reason is one line.

> **If the system doesn't surface the past project before the user thinks to look for it, that past project stays "as if it didn't exist," forever.**

This is the system-side dissolution of the problem in [series part 1](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/): "data the decision-maker's eye never lands on gets treated as if it doesn't exist." The suggestion engine is the active answer to that.

## The moment a Voyage AI Embedding is generated

Behind the suggestion engine sits one specific technology: **Voyage AI Embedding**. A short detour into it (I'll keep the deep technical version for Qiita, but the concept belongs here).

**Embedding** is the process of converting text into a list of 1,024 numbers — a vector. Tasukiba uses the **voyage-4-lite** model: feed it any text (knowledge, risk, retrospective), and you get back a 1,024-dimensional vector that acts as a kind of **"semantic coordinate."**

Two texts with close meaning end up close in this vector space. "Security requirements" and "data leak countermeasures" have completely different surface form, but their **number sequences land near each other**. That's the property Embedding gives you.

Tasukiba generates an Embedding at six specific moments:

| Moment | Target | What happens |
|---|---|---|
| **Project create / update** | `purpose / background / scope` | Voyage produces a 1,024-dim vector, stored in `content_embedding` |
| **Knowledge create / update** | title + body | same |
| **Risk create / update** | description | same |
| **Issue create / update** | description | same |
| **Retrospective create / update** | KPT body | same |
| **Memo create / update** | body | same |

In short, Voyage AI is called **only at create/update time** — the vector is stored in PostgreSQL's `content_embedding` column. **At read time and search time, Voyage is never called again.**

That single design decision is what makes the "zero cost at search time" structure (below) possible.

## The 3-axis weighted score

Ranking is a sum of three axes.

| Axis | Weight | Role | Source |
|---|---|---|---|
| **Tag similarity** | 0.3 | Jaccard, supporting role | businessDomainTags / techStackTags / processTags |
| **String similarity** | 0.2 | pg_trgm, robust to surface variation | purpose + background + scope |
| **Semantic similarity** | 0.5 | Voyage embedding cosine similarity | each entity's content_embedding (1,024 dims) |

Semantic gets **weight 0.5** because that's the differentiation axis itself.

"Security requirements" and "data leak countermeasures" don't share surface form, but they share meaning. That bridge is what semantic similarity exists for.

### The formula, in slightly more detail

The 3-axis weighted score can be written as:

```
score = 0.3 × tag_jaccard + 0.2 × string_pg_trgm + 0.5 × cos(query_vec, candidate_vec)
```

- `tag_jaccard` — **Jaccard coefficient** over business-domain, tech-stack, and process tags (0–1 overlap)
- `string_pg_trgm` — PostgreSQL `pg_trgm` extension's **trigram similarity** (robust to surface variation)
- `cos(query_vec, candidate_vec)` — **Cosine similarity** between Voyage embeddings (the angle between vectors)

Three completely different kinds of similarity, **combined into one weighted score**. That's the heart of Tasukiba's judgment logic.

## All candidates compete on one stage

Tag full-text search and vector search don't run on separate rails. Tasukiba evaluates everything on **one unified scoring scale**.

- Candidate with embedding → contributes via semantic similarity
- Candidate with embedding = NULL → semantic similarity = 0 (still scored on tag + string)

Every candidate is judged on the same 3-axis scale, every time.

This is why **the suggestion feature stays alive when external APIs are down** — graceful degradation (weight redistribution). That story gets its own post later.

## Tunable volume

For each category, the suggestion engine returns:

- score threshold **≥ 0.05**
- max items **10**

5 categories × 10 = **up to 50** candidates.

This reflects the **"recall over precision"** design choice.

Not "high-precision top 3," but **"high-recall, segmented display."** Since the user evaluates with their eyes, **avoiding the miss** matters more than narrowing.

## Suggestion-time cost is zero

This is one of Tasukiba's structural advantages.

> **No matter how many times you open the suggestion screen, no external API is called.**

The reason is structural:

- Voyage embeddings are **generated once at creation** and stored in `content_embedding`
- The suggestion screen only triggers **in-database similarity computation** via pgvector

Which means:

- Voyage's usage-based pricing **doesn't scale with screen views**
- If Voyage has an outage, **the suggestion feature stays up** (fail-safe)

"Zero cost at search time + failure tolerance" is one of the core design decisions. The **"only charge what was actually used" pricing stance** only works because of structural choices like this.

## Chat and "Why?" — Phase 2/3 on the same embedding foundation

The "Embedding generated once at create/update, computed in-DB afterward" foundation isn't only there for the suggestion engine.

Tasukiba's **three unique characteristics** all stand on top of it.

| Feature | Phase | Input | Output |
|---|---|---|---|
| **Suggestion engine** | Phase 1 (released) | Structured input on project / issue forms | Up to 50 related candidates across 5 categories |
| **Chat semantic search** | Phase 2 (~6 months) | Natural-language query | Conversational pull of past assets |
| **"Why?" feature** | Phase 3 (~2 years) | Top-N suggestion candidates | LLM-generated "why this is related" explanations |

These three aren't built as separate engines. They all **read the same `content_embedding` column**. The "surfacing" differentiation axis I described in [series part 4](/HomePage/en/blog/20260529-tasukiba-six-differentiators/) evolves through these three, step by step.

Each gets its own deep-dive post (the next 1–2 days). For now, what matters is this: **the suggestion engine's embedding foundation underlies every future Tasukiba experience.**

## One sentence

Compressed:

> **Hand "oh, I forgot about that" back to the user — from the system side.**

That's where the energy goes. Equal in weight to ["if it shouldn't be there, don't put it there"](/HomePage/en/blog/20260528-tasukiba-simple-ui-roots/) is **"if it should be there, put it there at the right moment."**

Next post: how the "pricing to continue, not to extract" stance lands in three plans and usage-based billing.

## Related posts

- [Release announcement — Tasukiba Knowledge Relay launches June 1, 2026](/HomePage/en/blog/20260601-tasukiba-release-knowledge-relay/) — series part 7, release
- [Six axes that set Tasukiba apart](/HomePage/en/blog/20260529-tasukiba-six-differentiators/) — why the suggestion engine is the differentiating core
- [An hour a day was evaporating — why I built Tasukiba](/HomePage/en/blog/20260526-tasukiba-why-i-made-it/) — origin of the "data that isn't seen doesn't exist" problem

## About Tasukiba

The [product page](/HomePage/en/product/tasukiba/) walks through the suggestion feature. Phase 2 Chat Semantic Search and Phase 3 the "Why?" feature, both built on top of this engine, will get their own dedicated deep-dives.
