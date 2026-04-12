import { describe, it, expect } from "vitest";
import { buildXShareUrl, buildFbShareUrl } from "./share";

describe("buildXShareUrl", () => {
  it("should encode page URL and text", () => {
    const url = buildXShareUrl("https://example.com/blog/test/", "Hello World");
    expect(url).toContain("https://x.com/intent/tweet?");
    expect(url).toContain("url=https%3A%2F%2Fexample.com%2Fblog%2Ftest%2F");
    expect(url).toContain("text=Hello%20World");
  });

  it("should handle Japanese text", () => {
    const url = buildXShareUrl("https://example.com/", "テスト記事 | Teppei Suyama");
    expect(url).toContain("x.com/intent/tweet");
    expect(url).toContain(encodeURIComponent("テスト記事 | Teppei Suyama"));
  });
});

describe("buildFbShareUrl", () => {
  it("should include only u parameter", () => {
    const url = buildFbShareUrl("https://example.com/blog/test/");
    expect(url).toBe(
      "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fblog%2Ftest%2F",
    );
  });

  it("should not include quote parameter", () => {
    const url = buildFbShareUrl("https://example.com/");
    expect(url).not.toContain("quote=");
  });
});
