import { describe, it, expect } from "vitest";
import { normalize, cardMatches } from "./blog-search";

describe("normalize", () => {
  it("文字列を小文字化し、連続空白を1つに圧縮し、前後空白を除去する", () => {
    expect(normalize("  Hello   World  ")).toBe("hello world");
    expect(normalize("AstroV6\t\nBlog")).toBe("astrov6 blog");
  });

  it("null / undefined / 空文字は空文字を返す", () => {
    expect(normalize(null)).toBe("");
    expect(normalize(undefined)).toBe("");
    expect(normalize("")).toBe("");
  });

  it("日本語はそのまま（小文字化は ASCII のみ影響）", () => {
    expect(normalize("言葉は刃物")).toBe("言葉は刃物");
  });
});

describe("cardMatches", () => {
  const card = {
    title: "「言葉は刃物」— 一度放った言葉が相手の中に残り続けるという話",
    description: "コミュニケーションについての考察記事。",
    tags: ["コミュニケーション", "チームビルディング"],
  };

  it("空クエリは常に true（全件表示）", () => {
    expect(cardMatches("", card)).toBe(true);
    expect(cardMatches("   ", card)).toBe(true);
  });

  it("タイトル部分一致でマッチする", () => {
    expect(cardMatches("言葉は刃物", card)).toBe(true);
    expect(cardMatches("一度放った", card)).toBe(true);
  });

  it("description 部分一致でマッチする", () => {
    expect(cardMatches("コミュニケーション", card)).toBe(true);
    expect(cardMatches("考察記事", card)).toBe(true);
  });

  it("タグ部分一致でマッチする (配列形式)", () => {
    expect(cardMatches("チームビルディング", card)).toBe(true);
  });

  it("タグ部分一致でマッチする (カンマ区切り文字列形式)", () => {
    const stringTagsCard = { ...card, tags: "コミュニケーション,チームビルディング" };
    expect(cardMatches("チームビルディング", stringTagsCard)).toBe(true);
  });

  it("大小文字非依存", () => {
    const enCard = { title: "Astro V6", description: "Blog", tags: ["TypeScript"] };
    expect(cardMatches("astro", enCard)).toBe(true);
    expect(cardMatches("typescript", enCard)).toBe(true);
    expect(cardMatches("BLOG", enCard)).toBe(true);
  });

  it("無関係なクエリは false", () => {
    expect(cardMatches("Python", card)).toBe(false);
    expect(cardMatches("xyz", card)).toBe(false);
  });

  it("前後空白・連続空白を含むクエリも正規化される", () => {
    expect(cardMatches("  言葉は刃物  ", card)).toBe(true);
  });
});
