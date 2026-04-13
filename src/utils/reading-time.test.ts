import { describe, it, expect } from "vitest";
import { estimateReadingTime } from "./reading-time";

describe("estimateReadingTime", () => {
  it("should return 1 for very short text", () => {
    expect(estimateReadingTime("短い文章")).toBe(1);
  });

  it("should return 1 for empty string", () => {
    expect(estimateReadingTime("")).toBe(1);
  });

  it("should calculate reading time for Japanese text", () => {
    // 500文字 = 1分、1000文字 = 2分
    const text = "あ".repeat(1000);
    expect(estimateReadingTime(text)).toBe(2);
  });

  it("should calculate reading time for English text", () => {
    // 200 words = 1 min, 400 words = 2 min
    const words = Array(400).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(2);
  });

  it("should exclude frontmatter", () => {
    const md = `---
title: "テスト"
date: 2026-01-01
---

短い本文です。`;
    expect(estimateReadingTime(md)).toBe(1);
  });

  it("should exclude code blocks", () => {
    const md = `本文です。

\`\`\`javascript
const x = 1;
const y = 2;
// このコードは読了時間に含めない
\`\`\`

本文の続きです。`;
    expect(estimateReadingTime(md)).toBe(1);
  });

  it("should handle mixed Japanese and English", () => {
    // 500 Japanese chars + 200 English words = 2 min
    const ja = "あ".repeat(500);
    const en = Array(200).fill("word").join(" ");
    expect(estimateReadingTime(ja + " " + en)).toBe(2);
  });

  it("should handle markdown with images and links", () => {
    const md = `## 見出し

![画像の説明](image.png)

[リンクテキスト](https://example.com) は本文です。`;
    // 画像は除外、リンクテキストは残る
    expect(estimateReadingTime(md)).toBe(1);
  });
});
