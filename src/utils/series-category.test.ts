/**
 * 連載ブログのテーマ分類（seriesCategory）に関するテスト。
 *
 * 2 種類のテストで「連載ブログのテーマ別アコーディオン」を守る:
 *   1. groupSeriesPostsByCategory のロジック（ユニット）
 *   2. 実記事データとの整合性（連載記事が必ず有効な seriesCategory を持つ）
 *
 * 2 は「連載記事を新規作成/予約投稿したのに seriesCategory を付け忘れた」場合を
 * ビルド前に検知するための自動点検として機能する。CLAUDE.md のコミット前
 * チェックで必ず実行される。
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  BLOG_SERIES,
  groupSeriesPostsByCategory,
  isSeriesPostSlug,
  SERIES_CATEGORY_FALLBACK,
  type BlogSeries,
  type SeriesPostLike,
} from "./blog-series";

// ============================================================
// Unit tests: groupSeriesPostsByCategory
// ============================================================

const testSeries: BlogSeries = {
  key: "test",
  slugMatch: "test",
  productSlug: "test",
  categoryOrder: ["a", "b", "c"],
};

function mkPost(dateStr: string, seriesCategory?: string): SeriesPostLike & { id: string } {
  return { id: `${dateStr}-${seriesCategory ?? "none"}`, data: { date: new Date(dateStr), seriesCategory } };
}

describe("groupSeriesPostsByCategory", () => {
  it("categoryOrder の順でグループを返す", () => {
    const posts = [
      mkPost("2026-05-03", "c"),
      mkPost("2026-05-01", "a"),
      mkPost("2026-05-02", "b"),
    ];
    const groups = groupSeriesPostsByCategory(posts, testSeries);
    expect(groups.map((g) => g.key)).toEqual(["a", "b", "c"]);
  });

  it("各グループ内は日付降順に並ぶ（最新が先頭）", () => {
    const posts = [
      mkPost("2026-05-10", "a"),
      mkPost("2026-05-01", "a"),
      mkPost("2026-05-05", "a"),
    ];
    const groups = groupSeriesPostsByCategory(posts, testSeries);
    expect(groups).toHaveLength(1);
    expect(groups[0].posts.map((p) => p.data.date.valueOf())).toEqual([
      new Date("2026-05-10").valueOf(),
      new Date("2026-05-05").valueOf(),
      new Date("2026-05-01").valueOf(),
    ]);
  });

  it("記事が 0 件のカテゴリは返さない", () => {
    const posts = [mkPost("2026-05-01", "a")];
    const groups = groupSeriesPostsByCategory(posts, testSeries);
    expect(groups.map((g) => g.key)).toEqual(["a"]);
  });

  it("未設定・未知カテゴリの記事は other グループに入り末尾に置かれる", () => {
    const posts = [
      mkPost("2026-05-01", "a"),
      mkPost("2026-05-02"), // 未設定
      mkPost("2026-05-03", "unknown"), // categoryOrder に無い
    ];
    const groups = groupSeriesPostsByCategory(posts, testSeries);
    expect(groups.map((g) => g.key)).toEqual(["a", SERIES_CATEGORY_FALLBACK]);
    expect(groups[1].posts).toHaveLength(2);
  });

  it("空配列は空配列を返す", () => {
    expect(groupSeriesPostsByCategory([], testSeries)).toEqual([]);
  });
});

// ============================================================
// Integration test: 実記事データとの整合性点検
// ============================================================
// 連載記事（slug が series.slugMatch を含む非 draft 記事）は、必ず
// categoryOrder に含まれる seriesCategory を持たなければならない。
// 付け忘れがあればここで検知し、LP で「その他」送りになるのを防ぐ。
// ============================================================

interface BlogFile {
  id: string;
  seriesCategory?: string;
}

function listBlogFiles(locale: "ja" | "en"): BlogFile[] {
  const dir = join(process.cwd(), "src", "content", "blog", locale);
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const result: BlogFile[] = [];
  for (const file of files) {
    const content = readFileSync(join(dir, file), "utf-8");
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const fm = fmMatch[1];
    const draftMatch = fm.match(/^draft:\s*(true|false)/m);
    if (draftMatch && draftMatch[1] === "true") continue;
    const catMatch = fm.match(/^seriesCategory:\s*"?([A-Za-z0-9_-]+)"?\s*$/m);
    result.push({
      id: file.replace(/\.md$/, ""),
      seriesCategory: catMatch?.[1],
    });
  }
  return result;
}

describe("連載記事の seriesCategory 整合性", () => {
  for (const series of BLOG_SERIES) {
    for (const locale of ["ja", "en"] as const) {
      it(`${series.key} (${locale}): 全連載記事が有効な seriesCategory を持つ`, () => {
        const files = listBlogFiles(locale);
        if (files.length === 0) return; // 記事がない環境ではスキップ
        const seriesFiles = files.filter((f) => isSeriesPostSlug(f.id, series));
        const invalid = seriesFiles.filter(
          (f) => !f.seriesCategory || !series.categoryOrder.includes(f.seriesCategory),
        );
        // 期待: 連載記事は 1 件以上存在し、すべて有効なカテゴリを持つ
        expect(seriesFiles.length).toBeGreaterThan(0);
        expect(invalid.map((f) => `${f.id} (seriesCategory=${f.seriesCategory ?? "未設定"})`)).toEqual([]);
      });
    }
  }
});
