---
title: "Writing instructions Claude gets right on the first try — CLAUDE.md, motivation, XML, few-shot"
description: "Are you repeating the same instructions to Claude every session? Anthropic's prompt engineering guide highlights five techniques that raise prompt quality across the board: CLAUDE.md, stating motivation, XML structuring, few-shot examples, and document ordering."
date: 2026-05-02
tags: ["Claude Code", "AI-driven development", "prompt engineering", "CLAUDE.md", "learning"]
---

## Series part 5

[Part 4](/HomePage/en/blog/20260501-claude-prompt-dev-patterns/) covered 11 prompt patterns. This post is about the **five techniques** that sharpen any prompt template.

## Technique 1 — Persist project rules in `CLAUDE.md`

From the Claude Code best practices:

> Create a `CLAUDE.md` at the root of your repository. Claude will automatically read it at the start of every session.

**Put a `CLAUDE.md` at the repo root and Claude loads it automatically each session.**

Inside, put the things you keep repeating.

### Excerpt from my HomePage `CLAUDE.md`

```markdown
## Text management rules (top priority)
- No hard-coding of UI text
- i18n: ja / en in src/i18n/ja.ts and src/i18n/en.ts

## Pre-commit checks (required every time)
1. Horizontal check
2. Security check
3. Performance check
4. Deploy check — npx astro check → npm test → npm run build
```

This alone eliminated all my "please put UI text in the i18n file, not inline" instructions.

## Technique 2 — Include the reason behind the rule

From the guide:

> Explain the reasoning behind a rule, not just the rule itself.

**State the why.** Claude can then generalize to edge cases.

| ❌ | ✅ |
|---|---|
| "Don't write comments." | "Only write comments for WHY. The WHAT is expressed by well-named identifiers, so comments just add noise." |
| "Use the i18n module." | "Centralize text in i18n so missing translations surface as compile errors at build time." |

**Reasoning enables judgment, not just compliance.** Same as onboarding a new engineer.

## Technique 3 — Structure complex prompts with XML tags

For prompts longer than a few lines, XML tags work wonders:

```
<context>
Astro v6 + TypeScript personal homepage.
Hosted on GitHub Pages.
</context>

<task>
Add scheduled publishing to blog posts.
</task>

<constraints>
- Serverless (GitHub Actions only)
- Must not break existing tests
</constraints>

<output_format>
1. Design in 200 chars max
2. List of files to change
3. Test additions
</output_format>
```

**Section boundaries alone clarify Claude's output structure.** My rule: if the prompt passes 5 lines, I switch to XML.

## Technique 4 — Include 3–5 diverse examples (few-shot)

From the guide:

> Including 3-5 diverse examples dramatically improves Claude's output quality.

```
Write commit messages in this format.

Example 1: "fix: correct timezone bug that prevented scheduled posts from firing"
Example 2: "feat: add a calendar component to the blog"
Example 3: "refactor: extract TOC logic into pure functions for testability"

Rules:
- Start with a type (fix/feat/refactor/docs)
- One-line gist
- Explain the WHY
```

**Teaching by example outperforms prose.** Less room for misinterpretation.

## Technique 5 — Put long documents first, questions last

Subtle but effective. From the guide:

> When working with long documents, put the document first and the question at the end of the prompt.

**Place long context on top, put the question/instruction at the bottom.** Attention mechanics mean the last instructions weigh heaviest.

```
<document>
[Paste long document here]
</document>

Given the document above, please answer:
1. ...
2. ...
```

Reverse order (question first, doc after) can make Claude "forget" the question by the time it finishes reading.

## When to use which technique

| Situation | Technique |
|---|---|
| Repeating the same project rules | 1. CLAUDE.md |
| Rules aren't followed / don't generalize | 2. Add reasoning |
| Prompt exceeds 5 lines | 3. XML tags |
| Need consistent output format | 4. Few-shot |
| Referencing long documents | 5. Doc first, question last |

## My take — CLAUDE.md has the best ROI

Of the five, **CLAUDE.md is by far the highest leverage**. Write it once, benefit every session.

Putting the "pre-commit checks" list into my HomePage `CLAUDE.md` means Claude runs tests, builds, and security checks before every commit automatically. Done manually I'd forget. Done as a rule, it's permanent.

## Related posts

- [Delegate development to Claude — 11 copy-paste prompt patterns](/HomePage/en/blog/20260501-claude-prompt-dev-patterns/) — pattern collection
- [Treat Claude like a brilliant new intern — three core principles](/HomePage/en/blog/20260429-claude-prompt-principles/) — principles
- Reference-grade Qiita version: [Qiita profile](https://qiita.com/teppei19980914)
