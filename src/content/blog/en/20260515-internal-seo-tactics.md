---
title: "5 Internal SEO Tricks — Tag Pages, noindex, Redirects"
description: "Code-level walkthrough of 5 internal SEO tricks: dynamic tag pages, 120-160 char descriptions, noindex for thin tags, URL canonicals, and an internal-link hub."
date: 2026-05-15
tags: ["SEO", "Internal SEO", "Astro", "Tag Pages", "Thin Content"]
---

## SEO Wins Through Reproducible Mechanisms, Not One-Off Tactics

In the [previous post](/HomePage/en/blog/20260514-seo-one-month-report/) I shared that, in one month, Clicks went up 733% and Impressions 496%.

This post goes one layer deeper: **what implementation tricks I baked in**, with code. All of this runs on Astro v6 static-site generation, but the *thinking* applies to any framework (Next.js / Nuxt / Hugo, etc.).

> **Audience**: people running a personal blog who want concrete examples of internal SEO implementation, who'd rather build "doesn't break" than "be careful."

## Trick 1: Generate Tag Pages **Statically + Dynamically**

A common question: "Are tags worth it for a personal blog?" — yes. **Tags are SEO assets that increase your indexable URL count**.

But there's a catch — tag pages have to exist as **standalone URLs that Google can actually see**. If you filter by tags via URL parameters in client JS only, Google can't index them. Dead end.

### Implementation

Astro's `getStaticPaths` generates one static page per tag × locale.

```typescript
// src/pages/[lang]/blog/tag/[tag].astro
export async function getStaticPaths() {
  const paths = [];
  for (const lang of LOCALES) {
    const posts = (await getLocalizedCollection("blog", lang)).filter(isPublished);
    const tagMap = buildTagMap(posts);
    for (const [tagSlug, tagPosts] of tagMap.entries()) {
      paths.push({ params: { lang, tag: tagSlug }, props: { posts: tagPosts } });
    }
  }
  return paths;
}
```

That's it. URLs like `/HomePage/ja/blog/tag/AI駆動開発/` get auto-generated for every tag, every locale. On my site that adds **122 indexable pages** (ja 58 + en 64).

Source: [Sitemaps overview - Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) (more indexable URLs, more chances to rank)

## Trick 2: **noindex** Single-Article Tag Pages

This is where many personal blogs get tripped up. Generate every tag page indiscriminately and you'll create lots of pages with **just one article**, which Google may flag as **thin content** (lacking unique added value).

Source: [Spam policies - Thin content](https://developers.google.com/search/docs/essentials/spam-policies#thin-content)

### Implementation

Output `<meta name="robots" content="noindex, follow">` for tag pages with ≤ 1 article.

```typescript
// src/utils/blog-tags.ts
export function shouldNoindex(articleCount: number): boolean {
  return articleCount <= 1;
}

// src/pages/[lang]/blog/tag/[tag].astro
const noindex = shouldNoindex(posts.length);
<BaseLayout noindex={noindex}>
```

Why `noindex, follow`:
- **noindex**: keep it out of search results (avoid thin-content judgment)
- **follow**: but still crawl the links (preserve crawl path to individual articles)

Source: [Block search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

## Trick 3: Enforce **120-160 Character** Descriptions Mechanically

The description is the biggest CTR mover. Google snippet display caps around **120-160 characters**. Too short = no information; too long = truncated.

### Implementation

Rule enforcement via CLAUDE.md + CI:

1. Pre-publish SEO review (Claude Code) checks the character count mechanically
2. Hub-page descriptions are centralized in `src/i18n/{ja,en}.ts`
3. Dynamic tag-page descriptions use a template

```typescript
const description = blog.tag.descriptionTemplate
  .replace("{tag}", tagDisplay)        // "AI-driven development"
  .replace("{count}", String(count))   // 17
  .replace("{latest}", latest.title)   // latest article title
  .replace("{date}", latestDate);      // 2026-05-12
```

Including **latest article + count + date dynamically** keeps the snippet looking fresh — exactly what [Snippet best practices](https://developers.google.com/search/docs/appearance/snippet) recommend.

## Trick 4: Don't Throw Away Past URLs — Use **Redirects**

i18n migration or URL-structure changes that 404 old URLs throw away your accumulated indexing and backlinks. Astro's `redirects` builds static HTML + meta refresh + canonical, which functions as a pseudo-301.

### Implementation

```js
// astro.config.mjs
redirects: {
  // Recovers 404s from i18n migration (5 entries)
  "/profile/": "/HomePage/ja/profile/",
  "/product/": "/HomePage/ja/product/",
  "/contact/": "/HomePage/ja/contact/",
  "/blog/":    "/HomePage/ja/blog/",
  "/project/": "/HomePage/ja/project/",
  // Recovers 404s from blog-slug changes (22 entries)
  "/ja/blog/hello-world/": "/HomePage/ja/blog/20260406-hello-world/",
  // ...
},
```

At build time, each redirect source gets a dedicated HTML:

```html
<meta http-equiv="refresh" content="0;url=/HomePage/ja/profile/">
<meta name="robots" content="noindex">
<link rel="canonical" href="https://.../HomePage/ja/profile/">
```

Google learns the canonical URL via this mechanism and **transfers ranking equity to the new URL**.

Source: [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

## Trick 5: A Tag-Hub Page to **Concentrate Internal Links**

Just generating individual tag pages isn't enough — they end up deep in the crawl tree (root → blog → article → tag).

A `/blog/tags/` **tag-hub page** that lists every tag concentrates internal links. Tag pages now sit **within 2 clicks** of the blog index, and Google understands the site structure faster.

### Implementation

```astro
// src/pages/[lang]/blog/tags.astro
const tagMap = buildTagMap(posts);
const tagsSorted = listTagsSorted(tagMap); // sorted by article count, desc

<ul class="tag-cloud">
  {tagsSorted.map(({ slug, count }) => (
    <li>
      <a href={localeUrl(lang, `blog/tag/${slug}/`)}>
        #{displayMap.get(slug)} <span>({count})</span>
      </a>
    </li>
  ))}
</ul>
```

Source: [Crawling and indexing best practices](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) — internal-link hubs improve crawl efficiency

## Closing

All five tricks are **implementation patterns aligned with Google's official guidance, adapted for static sites**. No tricks, no shortcuts.

The core idea: **build it as a system**. CI checks, the TypeScript type system, build-time auto-generation, test verification — use these to create a state where things **don't break by default** rather than "I'll be careful."

This is the final post in a 3-part series. If you've read this far, please try even one of these on your own blog. Watching the numbers move a month later is genuinely satisfying.

## Related Articles

- [Personal Blog SEO — How I Lifted Avg. Position to 18 at Zero Cost](/HomePage/en/blog/20260513-seo-tactics-for-personal-blog/) — Part 1 of the series (the 9 tactics)
- [Personal Blog: 1 Month, Clicks +733%, Impressions +496% — A Real Report](/HomePage/en/blog/20260514-seo-one-month-report/) — Part 2 (results analysis)
- [Why I Built This Homepage — Walking with Astro v6](/HomePage/en/blog/20260418-astro-v6-homepage/) — Site design rationale
