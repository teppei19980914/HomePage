import { describe, it, expect } from "vitest";
import {
  tagToSlug,
  buildTagMap,
  buildTagDisplayMap,
  shouldNoindex,
  listTagsSorted,
  type BlogEntry,
} from "./blog-tags";

function mkPost(id: string, dateStr: string, tags: string[], title = id): BlogEntry {
  // テスト用に最小限の BlogEntry 互換オブジェクトを作る
  return {
    id,
    body: "",
    collection: "blog",
    data: {
      title,
      description: title,
      date: new Date(dateStr),
      tags,
      draft: false,
      featured: false,
    },
  } as unknown as BlogEntry;
}

describe("tagToSlug", () => {
  it("英数字タグは小文字 + ハイフン化される", () => {
    expect(tagToSlug("Astro v6")).toBe("astro-v6");
    expect(tagToSlug("Power Automate")).toBe("power-automate");
    expect(tagToSlug("AI")).toBe("ai");
  });

  it("英数字タグの前後空白は除去される", () => {
    expect(tagToSlug("  Astro v6  ")).toBe("astro-v6");
  });

  it("英数字タグの記号類はハイフンに統一される", () => {
    expect(tagToSlug("Node.js")).toBe("node-js");
    expect(tagToSlug("CI/CD")).toBe("ci-cd");
  });

  it("英数字タグの先頭・末尾のハイフンは除去される", () => {
    expect(tagToSlug("--AI--")).toBe("ai");
  });

  it("日本語タグはそのまま返す", () => {
    expect(tagToSlug("個人開発")).toBe("個人開発");
    expect(tagToSlug("AI駆動開発")).toBe("AI駆動開発");
    expect(tagToSlug("エッセイ")).toBe("エッセイ");
  });

  it("日本語タグ前後の空白は除去される", () => {
    expect(tagToSlug("  個人開発  ")).toBe("個人開発");
  });
});

describe("buildTagMap", () => {
  it("タグ別に記事をグルーピングする", () => {
    const posts = [
      mkPost("a", "2026-04-01", ["Astro v6", "個人開発"]),
      mkPost("b", "2026-04-02", ["個人開発", "AI"]),
      mkPost("c", "2026-04-03", ["個人開発"]),
    ];
    const map = buildTagMap(posts);
    expect(map.get("個人開発")?.length).toBe(3);
    expect(map.get("astro-v6")?.length).toBe(1);
    expect(map.get("ai")?.length).toBe(1);
  });

  it("各タググループは date 降順", () => {
    const posts = [
      mkPost("old", "2026-04-01", ["X"]),
      mkPost("new", "2026-04-10", ["X"]),
      mkPost("mid", "2026-04-05", ["X"]),
    ];
    const map = buildTagMap(posts);
    const ids = (map.get("x") || []).map((p) => p.id);
    expect(ids).toEqual(["new", "mid", "old"]);
  });
});

describe("buildTagDisplayMap", () => {
  it("slug → 表示名の Map を返す", () => {
    const posts = [
      mkPost("a", "2026-04-01", ["Astro v6"]),
      mkPost("b", "2026-04-02", ["個人開発"]),
    ];
    const map = buildTagDisplayMap(posts);
    expect(map.get("astro-v6")).toBe("Astro v6");
    expect(map.get("個人開発")).toBe("個人開発");
  });

  it("同 slug に複数表記が衝突した場合、最初の表記を保持", () => {
    const posts = [
      mkPost("a", "2026-04-01", ["Astro V6"]), // 大文字
      mkPost("b", "2026-04-02", ["astro v6"]), // 小文字
    ];
    const map = buildTagDisplayMap(posts);
    expect(map.get("astro-v6")).toBe("Astro V6");
  });
});

describe("shouldNoindex", () => {
  it("記事 1 件以下は noindex", () => {
    expect(shouldNoindex(0)).toBe(true);
    expect(shouldNoindex(1)).toBe(true);
  });

  it("記事 2 件以上は index", () => {
    expect(shouldNoindex(2)).toBe(false);
    expect(shouldNoindex(10)).toBe(false);
  });
});

describe("listTagsSorted", () => {
  it("記事数降順で並ぶ", () => {
    const posts = [
      mkPost("a", "2026-04-01", ["popular", "rare"]),
      mkPost("b", "2026-04-02", ["popular"]),
      mkPost("c", "2026-04-03", ["popular", "mid"]),
      mkPost("d", "2026-04-04", ["mid"]),
    ];
    const map = buildTagMap(posts);
    const sorted = listTagsSorted(map);
    expect(sorted[0]).toEqual({ slug: "popular", count: 3 });
    expect(sorted[1]).toEqual({ slug: "mid", count: 2 });
    expect(sorted[2]).toEqual({ slug: "rare", count: 1 });
  });

  it("記事数が同じ場合はアルファベット順", () => {
    const posts = [
      mkPost("a", "2026-04-01", ["b-tag", "a-tag"]),
    ];
    const map = buildTagMap(posts);
    const sorted = listTagsSorted(map);
    expect(sorted[0].slug).toBe("a-tag");
    expect(sorted[1].slug).toBe("b-tag");
  });
});
