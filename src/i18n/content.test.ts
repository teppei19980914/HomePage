import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// content.ts は astro:content を import するが、isPublished 自体はそれに依存しない。
// vitest では astro:content を解決できないためモックする。
vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
}));

import { isPublished, getProductDetailUrl } from "./content";

// ============================================================
// isPublished — 予約投稿の公開判定テスト
//
// 予約投稿機能の心臓部。未来日付の記事を「JST の今日以前か」で
// 公開/非公開に振り分ける。日次 cron ビルドがこの判定を使って
// 予約日に記事を自動公開する。
//
// ここでの最重要保証:
//   GitHub Actions の scheduled workflow は遅延することがある。
//   cron が JST 早朝の何時に走っても（06:11 でも遅延した 07:41 でも）、
//   その日(JST)の記事が必ず公開対象になること。
// ============================================================

function entry(dateStr: string, draft = false) {
  return { data: { draft, date: new Date(dateStr) } };
}

// ============================================================
// getProductDetailUrl — プロダクト詳細ページの遷移先 URL 判定テスト
//
// `landingPage` を設定したプロダクト (例: 独立した静的 LP を持つ tasukiba-user)
// はそちらへ、未設定のプロダクトは通常の Content Collections 詳細ページへ遷移する。
// ============================================================
describe("getProductDetailUrl", () => {
  const base = import.meta.env.BASE_URL;

  it("landingPage が設定されている場合はルート相対パスへ遷移する", () => {
    const product = { id: "ja/tasukiba-user", data: { landingPage: "products/tasukiba-lp/" } };
    expect(getProductDetailUrl(product, "ja")).toBe(`${base}products/tasukiba-lp/`);
  });

  it("landingPage はロケールに関わらず同じパスに解決される", () => {
    const product = { id: "en/tasukiba-user", data: { landingPage: "products/tasukiba-lp/" } };
    expect(getProductDetailUrl(product, "en")).toBe(`${base}products/tasukiba-lp/`);
  });

  it("landingPage が未設定の場合は通常の詳細ページ URL を返す", () => {
    const product = { id: "ja/tasukiba", data: {} };
    expect(getProductDetailUrl(product, "ja")).toBe(`${base}ja/product/tasukiba/`);
  });
});

describe("isPublished", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.useRealTimers();
  });

  describe("本番ビルド (DEV=false)", () => {
    beforeEach(() => {
      vi.stubEnv("DEV", false);
    });

    it("draft: true の記事は日付に関わらず非公開", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-05-29T00:00:00Z"));
      expect(isPublished(entry("2026-05-29", true))).toBe(false);
      expect(isPublished(entry("2026-01-01", true))).toBe(false);
    });

    it("date が JST で今日の記事は公開される", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-05-29T03:00:00Z")); // JST 5/29 12:00
      expect(isPublished(entry("2026-05-29"))).toBe(true);
    });

    it("date が JST で過去の記事は公開される", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-05-29T03:00:00Z"));
      expect(isPublished(entry("2026-05-28"))).toBe(true);
      expect(isPublished(entry("2026-04-06"))).toBe(true);
    });

    it("date が JST で未来（明日以降）の記事は非公開", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-05-29T03:00:00Z")); // JST 5/29
      expect(isPublished(entry("2026-05-30"))).toBe(false);
      expect(isPublished(entry("2026-06-16"))).toBe(false);
    });

    // --- cron 遅延耐性: ここが今回の修正の核心 ---
    it("cron が予定どおり JST 06:11 に走れば当日(JST)記事が公開される", () => {
      vi.useFakeTimers();
      // cron "11 21 * * *" = UTC 21:11（前日）= JST 5/29 06:11
      vi.setSystemTime(new Date("2026-05-28T21:11:00Z"));
      expect(isPublished(entry("2026-05-29"))).toBe(true);
    });

    it("cron が遅延して JST 07:41 に走っても当日(JST)記事が公開される", () => {
      vi.useFakeTimers();
      // 実際に観測された遅延ケース: UTC 22:41（前日）= JST 5/29 07:41
      vi.setSystemTime(new Date("2026-05-28T22:41:00Z"));
      expect(isPublished(entry("2026-05-29"))).toBe(true);
    });

    it("バックアップ cron (JST 08:11) で走っても当日(JST)記事が公開される", () => {
      vi.useFakeTimers();
      // cron "11 23 * * *" = UTC 23:11（前日）= JST 5/29 08:11
      vi.setSystemTime(new Date("2026-05-28T23:11:00Z"));
      expect(isPublished(entry("2026-05-29"))).toBe(true);
    });

    // --- タイムゾーン境界 ---
    it("UTC 14:59（JST はまだ前日 23:59）では翌日付の記事は非公開", () => {
      vi.useFakeTimers();
      // UTC 5/28 14:59 = JST 5/28 23:59（まだ 5/28）
      vi.setSystemTime(new Date("2026-05-28T14:59:00Z"));
      expect(isPublished(entry("2026-05-29"))).toBe(false);
      expect(isPublished(entry("2026-05-28"))).toBe(true);
    });

    it("UTC 15:00（JST 0:00 ちょうど）に日付が切り替わり当日記事が公開される", () => {
      vi.useFakeTimers();
      // UTC 5/28 15:00 = JST 5/29 00:00
      vi.setSystemTime(new Date("2026-05-28T15:00:00Z"));
      expect(isPublished(entry("2026-05-29"))).toBe(true);
    });
  });

  describe("dev サーバー (DEV=true)", () => {
    beforeEach(() => {
      vi.stubEnv("DEV", true);
    });

    it("未来日付でも公開される（ローカルプレビュー用）", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-05-29T00:00:00Z"));
      expect(isPublished(entry("2026-12-31"))).toBe(true);
    });

    it("draft: true は dev でも非公開", () => {
      expect(isPublished(entry("2026-05-29", true))).toBe(false);
    });
  });
});
