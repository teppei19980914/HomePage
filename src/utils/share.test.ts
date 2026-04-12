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
  it("should include u and quote parameters", () => {
    const url = buildFbShareUrl("https://example.com/blog/test/", "My Article");
    expect(url).toContain("facebook.com/sharer/sharer.php?");
    expect(url).toContain("u=https%3A%2F%2Fexample.com%2Fblog%2Ftest%2F");
    expect(url).toContain("quote=My%20Article");
  });

  it("should handle Japanese text", () => {
    const url = buildFbShareUrl("https://example.com/", "テスト | Teppei Suyama");
    expect(url).toContain("facebook.com/sharer/sharer.php");
    expect(url).toContain("quote=");
    expect(url).toContain(encodeURIComponent("テスト | Teppei Suyama"));
  });
});
