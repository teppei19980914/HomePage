import { describe, it, expect } from "vitest";
import { shouldEnhanceImage } from "./image-lightbox";

describe("shouldEnhanceImage", () => {
  it("returns true for a standalone image", () => {
    expect(
      shouldEnhanceImage({ src: "/img/a.png", parentTagName: "P" }),
    ).toBe(true);
  });

  it("returns false when src is empty", () => {
    expect(shouldEnhanceImage({ src: "", parentTagName: "P" })).toBe(false);
  });

  it("returns false when wrapped in <a> (link takes precedence)", () => {
    expect(
      shouldEnhanceImage({ src: "/img/a.png", parentTagName: "A" }),
    ).toBe(false);
  });

  it("is case-insensitive for parent tag name", () => {
    expect(
      shouldEnhanceImage({ src: "/img/a.png", parentTagName: "a" }),
    ).toBe(false);
  });

  it("returns false when data-no-lightbox is set", () => {
    expect(
      shouldEnhanceImage({
        src: "/img/a.png",
        parentTagName: "P",
        hasNoLightboxAttr: true,
      }),
    ).toBe(false);
  });

  it("treats missing parentTagName as standalone", () => {
    expect(shouldEnhanceImage({ src: "/img/a.png" })).toBe(true);
  });
});
