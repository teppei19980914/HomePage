---
title: "Ending the Kind of Reading You Forget Instantly — How Michinari Turns Logs Into an Asset Without Quotas"
description: "You read a book but forget the content, with no sense that the time you spent is adding up to anything. Michinari's reading feature logs entries with no page-count requirement and no quota, has AI surface connections across past entries, and generates a summary-and-insight report when you finish."
date: 2026-09-06
tags: ["Reading Log", "Michinari", "Side Project", "Study Management", "AI-Driven Development"]
---

You read a book, and before long you've forgotten the content. As I wrote in [What Reading Gave Me Wasn't Knowledge — It Was the Habit of Thinking from Multiple Angles](/HomePage/en/blog/20260415-reading-and-perspective/), I don't think the value of reading comes down to knowledge alone. Still, the feeling that "I know I read it, but nothing seems to have stuck" is one I've carried for a long time. The reading feature in [Michinari](/HomePage/en/blog/20260831-michinari-story/), my side-project app, is one answer to that feeling.

## Logging with no quota attached

In Michinari, you register a book and log what you read that day, prompted to recall it. Entering a page number is optional — a short note like "got this far today" is enough to keep the habit going. I deliberately left out any completion rate or quota pressure. Bringing numeric targets into reading tends to shift the goal from reading itself to chasing a number.

## AI surfaces connections across past entries

AI responds to what you write. What mattered here was making its role about **surfacing connections to past entries**, not judging your reaction. It's hard to notice on your own that an insight you wrote days ago actually connects to what you read today. Having the AI trace across entries and point out the relationship lets fragmented reading notes gradually take shape as a single thread.

## A completion report when you finish

When you finish a book, you can generate a completion report summarizing the book along with **what you felt and what you noticed**. The point isn't just summarizing the content — it's recording your own reaction. Even without rereading the book six months later, I wanted the completion report alone to let you look back at what you were thinking at the time.

## Seeing the accumulation on a calendar

"No sense that the time I spent is adding up to anything" isn't just about what's in the log — it's also about **how it's displayed**. Michinari's calendar screen shows logged days color-coded by month. Even without remembering everything you wrote, just seeing a row of colored days gives you a visual sense of "I've kept this going." Reading logs sit on the same calendar as exam and work logs, so reading isn't treated as a special case — it's naturally part of the same ongoing accumulation.

## Redacted for sharing

Records can be exported as a readable document. Since there are times you'd want to share them with someone else, I also built an option to **export with personal details redacted**. Reading notes tend to mix in specific details from your life or work alongside your reactions. Having a sharing-ready format built in from the start means you don't have to hold back while writing.

## Closing

I don't think a reading log should be managed by quota — it only becomes an asset once you look back on it. Michinari's reading feature focuses on three things: lowering the barrier to writing, surfacing connections, and leaving something you can revisit once you finish. As I wrote about [the 1.01 rule](/HomePage/en/blog/20260814-daily-one-percent-growth/), I believe even 15 minutes of logging a day adds up into a real asset over time.

## Related posts

- [From Plans That Never Survive Contact With Reality to an App You Just Follow — Why I Built Michinari](/HomePage/en/blog/20260831-michinari-story/) — the app's overall design philosophy
- [What Reading Gave Me Wasn't Knowledge — It Was the Habit of Thinking from Multiple Angles](/HomePage/en/blog/20260415-reading-and-perspective/) — an essay on what reading really gives you
- [The 1.01 Rule: What It Means to End Today at Your Best](/HomePage/en/blog/20260814-daily-one-percent-growth/) — accumulating small logs over time
