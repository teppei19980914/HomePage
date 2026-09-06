---
title: "Let AI Draft the Monthly Report, Keep the Final Call for Yourself — Why Michinari Never Auto-Submits"
description: "Facing a monthly report or biannual review, you can't recall what you actually did this period. Michinari, my side-project app, generates monthly and biannual report drafts from your daily work logs, but never trusts its own self-assessment blindly and always leaves submission to you by hand."
date: 2026-09-09
tags: ["Productivity", "Michinari", "Side Project", "AI-Driven Development", "Study Management"]
---

Facing a monthly report or a biannual review, you can't recall what you actually did this period. The busier things get, the more logging gets pushed off, until you're stuck dredging up memories right when it's time to write. The work feature in [Michinari](/HomePage/en/blog/20260831-michinari-story/), my side-project app, exists to reduce exactly that burden.

## Daily logs with no fixed fields

You register a project and log the day's work in free text — no fixed input fields. Locking a format in place makes the act of writing itself a chore, and logging quickly drops off. For each daily entry, AI responds by putting your effort into words. This isn't meant as an evaluation — it's a hand for verbalizing what you did that day.

## Turning accumulated logs into a report draft

Once logs accumulate, you can generate a **monthly report draft**: a summary of your work, this month's goal, a 5-level self-assessment, a reflection, a proposed goal for next month, and any notices to share. The same mechanism produces a **biannual review draft** (split March–August and September–February). I prioritized getting to a draft form first, because the effort of recalling everything from a blank page felt heavier than the actual writing.

A short entry like "spent this week aligning on specs, made less implementation progress than planned" is enough. Left to accumulate, by month's end it gets woven into a summary like "focused on requirements alignment this month, and the shift into implementation lagged behind plan." The goal is to cut the work of reconstructing the whole picture from a blank page — **the material for grasping the flow of the month is already sitting there**, waiting to be shaped.

## Designed so AI's judgment is never taken at face value

The thing I was most careful about here: **never letting the generated content be used as-is**. The 5-level self-assessment in particular can swing high or low based purely on the AI's tone. That's exactly why, once generated, you always review and edit it yourself. There's no auto-submission to any form, either — the design assumes you check the content and transcribe it yourself.

This mirrors the same design principle from [Everything Vanished Before I Hit "y"](/HomePage/en/blog/20260829-vibe-coding-tool-safety-design/) — drawing a clear line between what you hand to AI and what a human confirms last. Convenience shouldn't come at the cost of handing over the final judgment call.

## A draft in service of honest self-assessment

A report is exactly the kind of document where it's easy to inflate facts conveniently, or, in the opposite direction, undersell your own results. As I wrote in [Trust Comes Before Technical Skill for Engineers](/HomePage/en/blog/20260805-trust-before-technical-skill/), sharing things honestly without hiding anything is the foundation of trust. The AI's draft is only ever a starting point — adding your own words on top of it is what lets you cut the burden of reporting while keeping that honesty intact.

## Closing

The work of writing a report or review sheet doesn't disappear. But once AI takes on the part where you dredge everything up from a blank page, all that's left for a person to do is "read the draft and fix it." Michinari's work feature is designed to leave exactly that last confirmation step in human hands.

## Related posts

- [From Plans That Never Survive Contact With Reality to an App You Just Follow — Why I Built Michinari](/HomePage/en/blog/20260831-michinari-story/) — the app's overall design philosophy
- [Everything Vanished Before I Hit "y" — Safety Design for a Self-Built AI Coding Tool](/HomePage/en/blog/20260829-vibe-coding-tool-safety-design/) — the same principle of drawing a line between AI's job and human confirmation
- [Trust Comes Before Technical Skill for Engineers](/HomePage/en/blog/20260805-trust-before-technical-skill/) — why sharing honestly without hiding anything is the foundation of trust
