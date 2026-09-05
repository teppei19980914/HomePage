---
title: "Everything Vanished Before I Hit \"y\" — Safety Design for a Self-Built AI Coding Tool"
description: "I built a vibe-coding tool in Python and Streamlit bridging an internal AI platform with local source code. Here's the safety design behind its auto-merge feature, learned from real near-misses — a careless approval and an AI hallucination."
date: 2026-08-29
tags: ["Python", "Streamlit", "AI-Driven Development", "Vibe Coding", "Generative AI"]
---

Approve an AI's answer with a single "y" and the entire file implementation vanishes. Why did I build a tool that behaves like that on purpose? Using an internal AI assistant platform at work and its SDK, I built a CLI/GUI tool that reflects changes into a local project through nothing but chat.

## What I built

A client that bridges conversation with the AI and local source code. It has two interfaces — CLI (console) and GUI (Streamlit) — sharing identical functionality: browsing assistants and chats, sending questions with relevant local code auto-attached for context, and auto-merging AI-suggested code into the `target_project` folder after human approval. That last feature, auto-merge, is both the biggest selling point and the one I spent the most design effort on.

Copy-pasting answers into an editor by hand kills the conversational rhythm and risks mixing up files. The goal was to turn everything from sending a question to reflecting it in a file into one seamless tool. Architecturally, I kept the CLI and GUI as thin input/output layers only, sharing all the actual logic — communication with the AI, diff generation, file writes — underneath. That separation is why adding the GUI never changed the CLI's behavior at all.

## Safety design for auto-merge

Writing an AI's answer straight to a local file is convenient, but it carries real risk of accidents. Running it in practice, I layered on these defenses:

| Defense | What it does |
|---|---|
| Mandatory human approval | Show a before/after diff and confirm with y/N per file |
| Automatic backups | Save the original content as `.bak<timestamp>` before overwriting |
| Restricted write scope | Validate paths in two stages so nothing can be written outside the target project folder |
| Atomic writes | Write to a temp file and swap it in, so a crash mid-write never corrupts the file |

## Approve a partial answer carelessly, and the whole implementation disappears

This tool writes whatever code block the AI outputs as the file's entire new content — it deliberately has no logic to intelligently merge partial diffs. So if the AI answers with only one function, intending "I just fixed this part," and I approve it with "y" without checking closely, every other function in that file gets wiped out and overwritten.

This nearly happened for real. I caught it because the diff screen showed an unusually large number of deleted lines. That near-miss is what drove home a design principle: the diff confirmation screen is the last line of defense, and it only works if a human actually reads it.

## A fixed-size preview was feeding the AI just enough to lie convincingly

Early on, I attached only the first 8KB of each file as a preview when sending project context to the AI. One file exceeded 8KB, so the part that actually mattered was invisible to the AI — yet when I asked why auto-merge wasn't working, it explained a function that didn't exist, citing it as confidently as if it had read the real code, right down to line numbers. Told that convincingly, I nearly believed it myself. It's a textbook hallucination, but experiencing it firsthand taught me how dangerous it is when missing information surfaces as a plausible-sounding explanation rather than a clear "I don't have enough context" signal. I fixed it by sending full file contents only for files relevant to the question, and just a filename list for everything else. The most effective way to stop an AI from describing things it can't see as if it could turns out to be simple: describe what it actually can see, accurately.

## Where AI's job ends and a human's confirmation begins

What stuck with me most from this project is that the whole quality of a tool like this comes down to exactly where you draw the line between what you hand to AI and what a human confirms last. Always show a diff before applying a change. Keep backups and atomic writes so failure is always recoverable. Design the information fed to the AI carefully to starve out hallucinations. I've written these principles down piece by piece, each time after tripping over an incident.

Vibe coding massively speeds up how fast you can write code — but without a safety net sized to match that speed, it's disturbingly easy to pile up changes you can't take back. Finding that balance was the single biggest lesson from building this tool.

## Related posts

- ["The Testing Phase Disappeared" — AI-Driven vs Traditional Development Compared](/HomePage/en/blog/20260410-ai-driven-development/) — real performance data from building alongside AI in a vibe-coding workflow
- [Qiita CLI × Claude Code — Automating Article Management](/HomePage/en/blog/20260421-qiita-cli-automation/) — another case of bridging an AI tool with a local environment
- [How I Went From "Build It, Never Use It" to Shipping Apps at Zero Operating Cost](/HomePage/en/blog/20260427-zero-cost-and-claude-code/) — the encounter with Claude Code that changed how I build
