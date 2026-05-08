---
title: "Personal Blog SEO — Lift Position to 18 at Zero Cost"
description: "From position 38 to 18.97 and CTR 7.8% to 10.89% in a month — the SEO playbook on a zero-cost personal blog: sitemap, hreflang, descriptions, GSC, redirects."
date: 2026-05-13
tags: ["SEO", "Personal Blog", "GitHub Pages", "Astro", "Search Console"]
---

## "Personal Blogs Can't Win at SEO" Was a Myth

I used to think personal sites had no chance against the giants in SEO. So I never bothered.

Then, in one month after publishing, I went from **avg. position 38 → 18.97** (page 4 → page 2 of search results) and CTR **7.8% → 10.89%**. All I did was implement the basics that Google officially recommends — adapted for a static site.

This article is the **9 SEO tactics that actually moved the needle** on a zero-cost personal blog (GitHub Pages + Astro), with rationale and implementation steps.

> **Audience**: anyone who runs a personal site or blog and finds it under-trafficked / wants to know how far SEO goes on a static site.

## Premise: Static Sites Can Do Full SEO

"Dynamic sites have an SEO advantage" is outdated. Read Google's official [Search Essentials](https://developers.google.com/search/docs/essentials) — every requirement is HTML-level. Static sites can implement 100% of it.

In fact, static sites are **stronger** in:

- Page speed (Core Web Vitals)
- Pre-built HTML (smoother crawl/render)
- Reliability (GitHub Pages is ironclad)

## The 9 Tactics That Worked

### 1. Auto-generate sitemap.xml

Add `@astrojs/sitemap` and configure in `astro.config.mjs`. Sitemap is generated at build time.

```js
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: "https://teppei19980914.github.io",
  integrations: [sitemap({ i18n: { defaultLocale: "ja", locales: { ja: "ja-JP", en: "en-US" } } })],
});
```

Source: [Sitemaps overview - Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

### 2. Use Absolute URLs for Canonicals

Each page's canonical must be an **absolute URL**. Google's docs explicitly say relative URLs should not be used.

```astro
const canonicalUrl = new URL(Astro.url.pathname, Astro.site).toString();
<link rel="canonical" href={canonicalUrl} />
```

Source: [Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

### 3. hreflang for Multi-language

If you have ja/en parity, output hreflang for self-language, the other language, and x-default.

```html
<link rel="alternate" hreflang="ja-JP" href="https://.../ja/blog/..." />
<link rel="alternate" hreflang="en-US" href="https://.../en/blog/..." />
<link rel="alternate" hreflang="x-default" href="https://.../ja/blog/..." />
```

Source: [Tell Google about localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)

### 4. Make Descriptions 120–160 Real Characters

The description is shown as the search result snippet — it directly affects CTR. Initially, my hub-page descriptions were as short as 6 characters ("blog list"), and Google flagged them as "Crawled, currently not indexed." Rewriting to 120–160 character explicit descriptions immediately moved CTR.

Source: [Snippet best practices](https://developers.google.com/search/docs/appearance/snippet)

### 5. JSON-LD Structured Data

Output WebSite / Article schema in `<script type="application/ld+json">` to feed Google a machine-readable structure.

Source: [Introduction to structured data markup](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

### 6. OGP / Twitter Card

Drives social shares, which indirectly feed SEO via backlinks.

### 7. Redirects to Save Old URLs (Yes, on GitHub Pages)

If you change the URL structure of pages already indexed by Google, leaving them 404 hurts SEO. Astro's `redirects` builds static HTML + meta refresh + canonical, which functions as a pseudo-301.

```js
redirects: {
  "/profile/": "/HomePage/ja/profile/",  // recovers 404s from i18n migration
},
```

Source: [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

### 8. Connect Search Console + Submit Sitemap

The single most impactful day-1 action. Verify ownership and submit the sitemap so Google actively learns of your site. Use **both** the meta-tag method and the HTML-file method (so one failure doesn't drop verification).

### 9. Keep Publishing

Crawl frequency, indexable URL count, long-tail query capture — all benefit. I publish daily.

## Tactics That Didn't Move the Needle

| Skipped | Why |
|---|---|
| Keyword-density tuning | Natural writing surfaces keywords naturally |
| `<meta name="keywords">` | Google does not use it ([official statement](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)) |
| "Anchor-text optimization" inside the site | Natural anchor text is fine; over-tuned anchors look manipulative |

## Three Tricks to Make It Reproducible

A one-shot install is brittle. The point is **a system that maintains it**:

1. **Enforce SEO rules at build time** — title 30-60 / description 120-160 checked in CI
2. **Pre-commit checklist on every article add** — mechanical check via the project checklist (CLAUDE.md)
3. **Monthly GSC check** — early detection of position drops or CTR collapses

## Closing

SEO for a personal blog is mostly **a quiet stack of official basics**. No tricks, no paid tools required. GitHub Pages + Astro at zero cost is enough.

The next article will quantify how far the above tactics moved my actual numbers — a one-month before/after report from Search Console.

## Related Articles

- [Why I Built This Homepage — Walking with Astro v6](/HomePage/en/blog/20260418-astro-v6-homepage/) — Why and how this site was built
- [From Built-and-Never-Used to Three Apps at Zero Cost](/HomePage/en/blog/20260427-zero-cost-and-claude-code/) — Technical choices behind zero-cost ops
- [An Objective Self-Portrait — Five Strengths, Five Weaknesses](/HomePage/en/blog/20260510-objective-self-portrait/) — About the author
