---
title: "Personal Blog: 1 Month, +733% Clicks, +496% Impressions"
description: "One month of Search Console data: Clicks 6→50, Impressions 77→459, CTR 7.8%→10.89%, Position 38→18.97 — quantitative review of what moved the numbers."
date: 2026-05-14
tags: ["SEO", "Personal Blog", "Search Console", "Analysis", "Retrospective"]
---

## "7× in One Month" Sounds Like a Sales Pitch

Ever scrolled past a "I 10x'd my traffic in 30 days" headline and instinctively rolled your eyes?

Honestly, me too. When someone says "search traffic 7×'d in one month," it usually reads as marketing copy.

But this is the actual **Google Search Console data** for my personal blog ([this site](/HomePage/en/)). Nothing inflated, just the numbers.

The baseline is low so the absolute values are still modest. Even so, I wanted to record — in a reproducible way — how cleanly **personal-blog SEO can move when you do the basics right**.

The [previous post](/HomePage/en/blog/20260513-seo-tactics-for-personal-blog/) listed the SEO tactics I implemented. This post quantifies **how far those tactics moved the numbers**.

## Numbers That Moved (Month-Over-Month)

| Metric | April (baseline) | May | Change |
|---|---|---|---|
| Url Clicks | 6 | **50** | **+733%** |
| Impressions | 77 | **459** | **+496%** |
| URL CTR | 7.80% | **10.89%** | **+3.09pp** |
| Average Position | 38.00 | **18.97** | **−19.03 (improved)** |

> Period: from launch (2026-04-04) to early May. Source: [Google Search Console](https://search.google.com/search-console).

### Visualized

```
Clicks:        ▍▍▍▍▍▍ (6)
                ↓ +733%
               ▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍ (50)

Impressions:   ▍▍ (77)
                ↓ +496%
               ▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍▍ ... (459)

Position:      38 ───────────────────→ 18.97 (page 4 → page 2)
```

We are now on **page 2** of search results. Page 1 (top 10) is still ahead, but this is the position from which long-tail queries can win.

## What Moved the Needle Most — Top 3

### #1: Rewriting Descriptions to 120–160 Characters (+3pp CTR)

At launch, the descriptions of my hub pages (`/blog/`, `/profile/`, etc.) were 6–25 characters, and Google was returning **"Crawled, currently not indexed"**.

```
Before: "Blog posts" (10 chars)
After:  "Daily blog by software engineer Teppei Suyama on AI-driven
         development, workflow automation, and personal projects with
         Astro v6, Flutter, and Claude Code." (155 chars)
```

This is exactly what [Google's snippet best practices](https://developers.google.com/search/docs/appearance/snippet) recommend: unique descriptions that reflect the page's actual content.

### #2: Daily Publishing Compounded (+496% Impressions)

From launch (4/4) to the GSC cutoff (5/1), I published **25 articles in ja**, one per day. This worked harder than expected.

| Phase | Articles | Impressions |
|---|---|---|
| Just after launch (4/10) | ~7 | 77 |
| Cutoff (5/1) | ~25 | **459 (+496%)** |

Three reasons:

1. **Indexable URL count grows linearly** — 1 article = 1 indexable URL. 25× the entry points exposed to Google
2. **Google reads "live site" signals** — official [Site quality guidelines](https://developers.google.com/search/docs/essentials) treat freshness as a ranking input
3. **Long-tail capture multiplies** — each article's title / description / body picks up unique keywords, surfacing in unexpected queries

In GSC I started seeing impressions for queries I never specifically targeted — "a5:sql," "riverpod flutter," "fastapi htmx." Long-tail capture was less about **deliberately writing for it** and more about **organic byproduct of daily publishing**.

> Per-article effect is tiny, but **consistency multiplies**. Even now under a "consolidate before scaling" policy, daily publishing is the one thing I keep going.

### #3: Recovering Old URLs via 301 Redirects

When I migrated to i18n (`/profile/` → `/ja/profile/`), **old URLs Google had indexed started returning 404**. Adding `redirects` recovered ~9 clicks / ~121 impressions per month that were being lost.

Source: [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

## Tactics Whose Effect Was Unclear

Not every tactic measurably moved numbers.

| Tactic | Effect |
|---|---|
| Featured-article rotation (`featuredSlugs`) | UI-only on Home; impact on inbound queries is uncertain |
| RSS feed | No subscriber metric available on GitHub Pages |
| OGP image tweaks | No direct SEO impact (indirect via social shares is hard to measure) |

There are tactics worth doing whose effect is hard to attribute — that's the honest reality.

## Position 3 But Zero Clicks — There's Still Room

What surprised me in GSC was multiple queries at **position 3 with zero clicks**.

For example, my [Janet's Law article](/HomePage/en/blog/20260413-janets-law-time/) holds **average position 3** for a relevant query, but clicks were 0. The likely cause: title/description not matching searcher intent.

Top position ≠ automatic clicks. To improve CTR, **the click-trigger power of title/description matters**. I'm currently rewriting that article's title/description to match the actual query intent ("Janet's Law", "countermeasures").

## Plays for June

Theme: **"consolidate before scaling"**:

- [Add tag pages](/HomePage/en/blog/20260515-internal-seo-tactics/) (scheduled) — adds ~120 indexable URLs, captures more long-tail
- Rewrite title/description on top-ranked, zero-click queries
- Target one month later: 100 clicks, 1000 impressions, position ≤ 15

## Closing

This past month let me confirm — quantitatively — that **personal blogs can actually do SEO**.

No special tools. No paid plans. Just the **basics that Google officially recommends**, implemented thoughtfully on a static site, one at a time.

If you've been quietly assuming your own blog's invisible, you might try just opening Search Console today and looking at your top-impression / zero-click queries. The gaps that show up are usually the easiest wins.

The implementation steps are in the [previous post](/HomePage/en/blog/20260513-seo-tactics-for-personal-blog/). The internal-implementation tricks are in the [next post (publishing 5/15)](/HomePage/en/blog/20260515-internal-seo-tactics/). I hope they're useful as the middle chapter of a 3-part series.

## Related Articles

- [Personal Blog SEO — How I Lifted Avg. Position to 18 at Zero Cost](/HomePage/en/blog/20260513-seo-tactics-for-personal-blog/) — The 9 tactics implemented
- [Why I Built This Homepage — Walking with Astro v6](/HomePage/en/blog/20260418-astro-v6-homepage/) — Site design rationale
