---
title: "Why I Built This Homepage — Walking with Astro v6"
description: "Why I built this homepage and what I poured into it. Plus the characteristics of Astro v6, a framework still under-documented in Japanese."
date: 2026-04-18
tags: ["Homepage", "Essay", "Astro", "Astro v6", "Personal Dev", "Publishing"]
---

## Why I Built My Own Homepage

Honestly, with X, Wantedly, and Qiita, you can already cover most of "letting people find you online." So why bother with a custom homepage?

I asked myself that for a while. Then I built one anyway.

The reason came out simpler than I expected: **I wanted my words, my work, and my thoughts in one place**. Even if a platform's spec changes, even if a service shuts down, the words accumulated here stay mine. And quietly knowing this place is fully owned by me — it gives me a kind of stillness I didn't realize I needed.

## "Leaving" Rather Than "Publishing"

When you build a homepage, the word "publishing" comes up a lot. What I'm doing feels a touch quieter than that.

**The closest word is "leaving."**

I write every day, turn small technical experiments into posts, and put the impressions of books I read into words. Less to deliver to someone else, more to **hand a future-me the line "this is what I was thinking back then."**

Of course it would be wonderful if someone reads it. But primarily, this is an archive for myself. Just as the YumeHashi app is a tool to "write down dreams and leave them," this homepage is a tool to "write down thinking and leave it."

## I Want to Be the Kind of Person You Can "Already Have Met"

When meeting someone for the first time, the thing I value most is **letting them know me beforehand**.

LinkedIn and Wantedly are great — but they end up rendering "me, fitted to a template." Certs in a list. Engagements. Quantitative results. All factual. None of it really carries **what the person is thinking about, or what moves them**.

This homepage is here to fill that gap.

The profile carries my philosophy and motto. The blog carries my view of work and reading notes. The product page carries the three apps I built. The project page carries the path I walked as a full-time engineer. **My intent: someone meeting me for the first time can walk this site for 30 minutes and see the outline of who I am.**

That's "the state of having already met before meeting." A preparation that lets people judge not just my technical capability, but whether I look trustworthy as a human.

## The Aesthetic of Keeping Personal-Dev Cost at Zero

This homepage runs on **a complete ¥0 / month** operations cost.

That's less about saving money and more about my **aesthetic**. With AWS or paid SaaS, I could build a far more luxurious site. But constraints sharpen design. The eye for "only what's truly needed" gets trained.

- Hosting on GitHub Pages (static sites, free)
- Blog posts in Markdown, managed in Git
- Scheduled publishing via a daily cron in GitHub Actions
- Contact form on Formspree's free tier
- External API integration via build-time fetch from Qiita

All assembled from free tools, with **maintenance also automated**. Write an article, push to Git, and the rest carries through to publication on its own. The time I saved went into creating the state of "I can focus on writing only."

## Astro v6 — An Option Still Sparsely Documented in Japan

This homepage runs on **Astro v6**.

Compared to Next.js or Nuxt, **Japanese-language tech articles are still few**. Official docs are English-first, and v5-era Japanese articles are mixed in, so search results often surface stale information. In this section, I'll share — terminology and all — a little of what I learned while choosing and implementing Astro v6.

### Characteristics of Astro v6

Astro is a **static site generator (SSG)** built on a design philosophy called **island architecture**. The whole page is pre-built as static HTML, and only the interactive parts hydrate as "islands" of JavaScript. The result: **zero JS by default**, and very fast page loads.

Major features:

- **Content Collections**: A type-safe way to manage Markdown / MDX / JSON. Zod-based schema definitions automatically reflect `frontmatter` types into TypeScript
- **ClientRouter (formerly ViewTransitions)**: SPA-like page transitions using the browser's View Transitions API. Renamed in v6
- **File-based routing**: The directory layout under `src/pages/` becomes the URL structure. Dynamic segments like `[lang]` or `[...slug]` are supported out of the box
- **i18n**: URL strategy with `prefixDefaultLocale`, fallback via `defaultLocale`, etc., built in
- **glob loader**: Loader contract for Content Collections. v6 requires explicit declaration via `defineCollection` (a breaking change from v5)
- **Integrations**: A rich set of official modules including `@astrojs/sitemap`, `@astrojs/mdx`, `@astrojs/react`, etc.

Scoped CSS (`data-astro-cid-*`-based scoping) and integration with rehype plugins like `rehype-external-links` are smooth, and Astro is **very strong for the use case of statically building an SEO-friendly site**. It also gets along well with TypeScript strict mode, which is reassuring for anyone who cares about type checking.

That said, **the v5 → v6 migration deserves caution**. Content Collections requiring an explicit loader, the rename to `ClientRouter`, the trailing-slash requirement on the `base` path — several breaking changes that Japanese articles haven't fully caught up with. I plan to do a deeper technical write-up on this elsewhere (a serious tech post aimed at Qiita).

## The Outline Rises Slowly Through Continued Writing

Since starting this homepage, I've been writing the blog every day.

One post per day. Each post around 3–5 minutes to read. Nothing grandiose — just **today's noticings, the impressions of a book I read, or notes on something I'm building**.

Here's what I noticed by continuing: **the act of accumulating posts is what makes the outline of yourself rise**. Any single post may not mean much on its own. But once 20, 30 posts pile up, the reader starts perceiving "ah, this person thinks like *this*."

A viral hit can't give you that. It's **the kind of trust only those who paid the cost of continuity can quietly accumulate**.

## What This Site Aims For

| Aim | Concretely |
|---|---|
| **A place where my outline reaches you** | Philosophy / motto / dream / goal made explicit on the profile |
| **A place where the work I built lines up** | Three personal-dev products published and actually usable |
| **A place where my thinking is left** | Daily posts on the blog |
| **A place where you've already met me before meeting me** | Before a work conversation, my human shape is visible |
| **A place that lasts at zero cost and zero hassle** | Free tools and automation that let it continue |

Technically beautiful, operationally sustainable, and above all **true to me** — those three coexisting are why I can keep writing every day.

## To Whoever Read This Far

Thank you for reading.

If you're wavering on whether to build your own homepage, **you might try taking the step**. There are things you can't leave on social platforms that you can leave on your own site. It becomes **an archive of your words** that doesn't shift when a platform's specs do.

And if Astro v6 caught your eye but the information feels sparse, the source code of this site itself is one sample. It's fully open at [the HomePage repository](https://github.com/teppei19980914/HomePage) — explore however you like.

If this homepage becomes a doorway to knowing me, and a small spark for you to build your own place, then for me this site has done its job.

## Related Articles

- [About Me in 5 Minutes — How to Walk Through This Site](/HomePage/en/blog/20260417-about-me-guide/) — How to navigate this site to grasp me fastest
- [From "Built and Never Used" to "Apps Live at Zero Cost"](/HomePage/en/blog/20260427-zero-cost-and-claude-code/) — The technical choices behind the zero-cost operation
- [From "YumeLog" to "YumeHashi" — Building a Bridge Between Dreams and Reality](/HomePage/en/blog/20260408-yumehashi-story/) — The ideological backdrop behind "leaving"
