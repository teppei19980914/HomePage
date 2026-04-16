/**
 * ブログカレンダーのロジック + 実記事データとの整合性テスト。
 *
 * このテストは「記事の追加・更新・削除時にカレンダー表示を壊さない」ための
 * 自動点検として機能する。CLAUDE.md のコミット前チェックで必ず実行される。
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  toDateKey,
  toMonthKey,
  buildDayMap,
  buildMonthList,
  buildMonthGrid,
  entriesForMonth,
  assertAllPostsCovered,
  type BlogPostLike,
} from "./blog-calendar";

// ============================================================
// Unit tests (ロジック)
// ============================================================

function mkPost(id: string, dateStr: string, title = id): BlogPostLike {
  return { id, data: { date: new Date(dateStr), title } };
}

describe("toDateKey", () => {
  it("formats date as YYYY-MM-DD", () => {
    expect(toDateKey(new Date(2026, 3, 5))).toBe("2026-04-05");
    expect(toDateKey(new Date(2026, 11, 31))).toBe("2026-12-31");
  });
});

describe("toMonthKey", () => {
  it("formats month as YYYY-MM", () => {
    expect(toMonthKey(new Date(2026, 0, 15))).toBe("2026-01");
    expect(toMonthKey(new Date(2026, 11, 31))).toBe("2026-12");
  });
});

describe("buildDayMap", () => {
  const now = new Date(2026, 3, 17);

  it("groups posts by date and marks future dates as scheduled", () => {
    const posts = [
      mkPost("past", "2026-04-10"),
      mkPost("today", "2026-04-17"),
      mkPost("future", "2026-04-20"),
    ];
    const map = buildDayMap(posts, now);
    expect(map.get("2026-04-10")?.[0].scheduled).toBe(false);
    expect(map.get("2026-04-17")?.[0].scheduled).toBe(false);
    expect(map.get("2026-04-20")?.[0].scheduled).toBe(true);
  });

  it("allows multiple posts on the same date", () => {
    const posts = [mkPost("a", "2026-04-10"), mkPost("b", "2026-04-10")];
    const map = buildDayMap(posts, now);
    expect(map.get("2026-04-10")?.length).toBe(2);
  });
});

describe("buildMonthList", () => {
  const now = new Date(2026, 3, 17);

  it("includes current month even with no posts", () => {
    const months = buildMonthList([], now);
    expect(months.some((m) => m.key === "2026-04")).toBe(true);
  });

  it("includes all months with posts", () => {
    const posts = [
      mkPost("a", "2025-12-01"),
      mkPost("b", "2026-06-15"),
    ];
    const months = buildMonthList(posts, now);
    expect(months.some((m) => m.key === "2025-12")).toBe(true);
    expect(months.some((m) => m.key === "2026-06")).toBe(true);
  });

  it("includes ±contextMonths around current month", () => {
    const months = buildMonthList([], now, 2);
    expect(months.some((m) => m.key === "2026-02")).toBe(true);
    expect(months.some((m) => m.key === "2026-06")).toBe(true);
  });

  it("returns months sorted ascending", () => {
    const posts = [mkPost("a", "2025-06-01"), mkPost("b", "2027-03-10")];
    const months = buildMonthList(posts, now);
    const keys = months.map((m) => m.key);
    const sorted = [...keys].sort();
    expect(keys).toEqual(sorted);
  });
});

describe("buildMonthGrid", () => {
  const now = new Date(2026, 3, 17);

  it("pads leading empty cells based on first day weekday", () => {
    // 2026-04-01 is Wednesday (weekday=3)
    const cells = buildMonthGrid(2026, 3, new Map(), now);
    expect(cells[0].day).toBe(null);
    expect(cells[1].day).toBe(null);
    expect(cells[2].day).toBe(null);
    expect(cells[3].day).toBe(1);
  });

  it("marks today correctly", () => {
    const cells = buildMonthGrid(2026, 3, new Map(), now);
    const today = cells.find((c) => c.day === 17);
    expect(today?.isToday).toBe(true);
  });

  it("length is always a multiple of 7", () => {
    for (let m = 0; m < 12; m++) {
      const cells = buildMonthGrid(2026, m, new Map(), now);
      expect(cells.length % 7).toBe(0);
    }
  });

  it("attaches entries to the correct day", () => {
    const posts = [mkPost("p", "2026-04-17")];
    const map = buildDayMap(posts, now);
    const cells = buildMonthGrid(2026, 3, map, now);
    const day17 = cells.find((c) => c.day === 17);
    expect(day17?.entries.length).toBe(1);
    expect(day17?.entries[0].post.id).toBe("p");
  });
});

describe("entriesForMonth", () => {
  const now = new Date(2026, 3, 17);

  it("returns posts of the specified month in date order", () => {
    const posts = [
      mkPost("c", "2026-04-20"),
      mkPost("a", "2026-04-03"),
      mkPost("b", "2026-04-10"),
    ];
    const map = buildDayMap(posts, now);
    const list = entriesForMonth(2026, 3, map);
    expect(list.map((x) => x.day)).toEqual([3, 10, 20]);
  });

  it("excludes posts of other months", () => {
    const posts = [mkPost("other", "2026-05-01")];
    const map = buildDayMap(posts, now);
    expect(entriesForMonth(2026, 3, map)).toHaveLength(0);
  });
});

describe("assertAllPostsCovered", () => {
  it("passes when all posts are covered", () => {
    const posts = [mkPost("a", "2026-04-10")];
    const months = [{ key: "2026-04", year: 2026, month: 3 }];
    expect(() => assertAllPostsCovered(posts, months)).not.toThrow();
  });

  it("throws when a post is not in any visible month", () => {
    const posts = [mkPost("orphan", "2030-01-01")];
    const months = [{ key: "2026-04", year: 2026, month: 3 }];
    expect(() => assertAllPostsCovered(posts, months)).toThrow(/not in any visible month/);
  });
});

// ============================================================
// Integration test: 実記事データとの整合性点検
// ============================================================
// 記事を新規作成/更新/削除したときに自動で回帰検知するための仕組み。
// src/content/blog/ja 配下の全 .md ファイルを読んでカレンダーに漏れなく
// 反映されることを保証する。
// ============================================================

function listBlogDates(locale: "ja" | "en"): BlogPostLike[] {
  const dir = join(process.cwd(), "src", "content", "blog", locale);
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const posts: BlogPostLike[] = [];
  for (const file of files) {
    const content = readFileSync(join(dir, file), "utf-8");
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const fm = fmMatch[1];
    const dateMatch = fm.match(/^date:\s*(.+?)\s*$/m);
    const titleMatch = fm.match(/^title:\s*"?([^"\n]+)"?\s*$/m);
    const draftMatch = fm.match(/^draft:\s*(true|false)/m);
    if (!dateMatch) continue;
    if (draftMatch && draftMatch[1] === "true") continue;
    posts.push({
      id: file.replace(/\.md$/, ""),
      data: {
        date: new Date(dateMatch[1]),
        title: titleMatch?.[1] ?? file,
      },
    });
  }
  return posts;
}

describe("Blog calendar — 実記事データとの整合性", () => {
  const now = new Date();

  it("ja: 全記事の date が表示月に含まれる", () => {
    const posts = listBlogDates("ja");
    if (posts.length === 0) return; // 記事がない環境ではスキップ
    const months = buildMonthList(posts, now);
    expect(() => assertAllPostsCovered(posts, months)).not.toThrow();
  });

  it("ja: 全記事がカレンダーセルに正しく紐づく", () => {
    const posts = listBlogDates("ja");
    if (posts.length === 0) return;
    const dayMap = buildDayMap(posts, now);
    const months = buildMonthList(posts, now);
    const foundIds = new Set<string>();
    for (const { year, month } of months) {
      for (const cell of buildMonthGrid(year, month, dayMap, now)) {
        for (const e of cell.entries) foundIds.add(e.post.id);
      }
    }
    const missing = posts.filter((p) => !foundIds.has(p.id));
    expect(missing.map((p) => p.id)).toEqual([]);
  });

  it("ja: 1 日に 1 記事までの運用ルール(CLAUDE.md)が守られている", () => {
    // 同じ日に複数記事があっても表示自体は可能だが、運用ルール違反として検知する。
    const posts = listBlogDates("ja");
    if (posts.length === 0) return;
    const dayMap = buildDayMap(posts, now);
    const duplicates: string[] = [];
    for (const [dateKey, entries] of dayMap.entries()) {
      if (entries.length > 1) {
        duplicates.push(
          `${dateKey}: ${entries.map((e) => e.post.id).join(", ")}`,
        );
      }
    }
    expect(duplicates).toEqual([]);
  });

  it("en: 全記事がカレンダーセルに正しく紐づく(記事がある場合のみ)", () => {
    const posts = listBlogDates("en");
    if (posts.length === 0) return;
    const dayMap = buildDayMap(posts, now);
    const months = buildMonthList(posts, now);
    const foundIds = new Set<string>();
    for (const { year, month } of months) {
      for (const cell of buildMonthGrid(year, month, dayMap, now)) {
        for (const e of cell.entries) foundIds.add(e.post.id);
      }
    }
    const missing = posts.filter((p) => !foundIds.has(p.id));
    expect(missing.map((p) => p.id)).toEqual([]);
  });
});
