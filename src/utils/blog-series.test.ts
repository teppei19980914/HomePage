import { describe, it, expect } from "vitest";
import {
  BLOG_SERIES,
  findSeriesForSlug,
  getSeriesByKey,
  isSeriesPostSlug,
} from "./blog-series";

describe("BLOG_SERIES", () => {
  it("tasukiba 連載が定義されている", () => {
    const tasukiba = BLOG_SERIES.find((s) => s.key === "tasukiba");
    expect(tasukiba).toBeDefined();
    expect(tasukiba?.slugMatch).toBe("tasukiba");
    expect(tasukiba?.productSlug).toBe("tasukiba");
  });

  it("key は一意である", () => {
    const keys = BLOG_SERIES.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("findSeriesForSlug", () => {
  it("slug に tasukiba を含む記事は tasukiba 連載にヒットする", () => {
    expect(findSeriesForSlug("20260530-tasukiba-owl-origin")?.key).toBe("tasukiba");
    expect(findSeriesForSlug("20260507-tasukiba-launch")?.key).toBe("tasukiba");
    expect(findSeriesForSlug("20260526-tasukiba-why-i-made-it")?.key).toBe("tasukiba");
  });

  it("連載に属さない記事は undefined", () => {
    expect(findSeriesForSlug("20260418-astro-v6-homepage")).toBeUndefined();
    expect(findSeriesForSlug("20260406-hello-world")).toBeUndefined();
  });
});

describe("getSeriesByKey", () => {
  it("既存キーで連載定義を逆引きできる", () => {
    expect(getSeriesByKey("tasukiba")?.productSlug).toBe("tasukiba");
  });

  it("未知のキーは undefined", () => {
    expect(getSeriesByKey("does-not-exist")).toBeUndefined();
  });
});

describe("isSeriesPostSlug", () => {
  const tasukiba = getSeriesByKey("tasukiba")!;

  it("連載に属する slug は true", () => {
    expect(isSeriesPostSlug("20260530-tasukiba-owl-origin", tasukiba)).toBe(true);
  });

  it("連載に属さない slug は false", () => {
    expect(isSeriesPostSlug("20260418-astro-v6-homepage", tasukiba)).toBe(false);
  });
});
