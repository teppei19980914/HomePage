import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

// ============================================================
// BaseLayout のアイコン/OG 撤去ガード (2026-05-29)
//
// たすきば製品マスコット「たすきフクロウ」は個人ホームページの顔
// (ファビコン / OG 画像) として不適切なため撤去した。
// 派生画像の再導入や <link rel="icon"> の復活を防ぐ回帰テスト。
//
// たすきば紹介ページ/記事本文の挿絵 (public/mascot-owl.png) は
// コンテンツとして維持するため、ここでは対象外。
// ============================================================

const layoutSrc = readFileSync(
  fileURLToPath(new URL("./BaseLayout.astro", import.meta.url)),
  "utf-8",
);

const publicPath = (name: string) =>
  fileURLToPath(new URL(`../../public/${name}`, import.meta.url));

describe("BaseLayout: ファビコン/OG 画像の撤去", () => {
  it("ファビコン関連の <link rel=icon> / apple-touch-icon を出力しない", () => {
    expect(layoutSrc).not.toMatch(/rel="icon"/);
    expect(layoutSrc).not.toMatch(/rel="apple-touch-icon"/);
  });

  it("撤去した画像ファイルを参照しない", () => {
    for (const asset of ["favicon-32.png", "apple-touch-icon.png", "favicon.ico", "og-image.png"]) {
      expect(layoutSrc).not.toContain(asset);
    }
  });

  it("og:image / twitter:image メタタグを出力しない", () => {
    expect(layoutSrc).not.toMatch(/property="og:image"/);
    expect(layoutSrc).not.toMatch(/name="twitter:image"/);
  });

  it("Twitter カードは画像なしの summary (summary_large_image を使わない)", () => {
    expect(layoutSrc).toMatch(/name="twitter:card" content="summary"/);
    expect(layoutSrc).not.toContain("summary_large_image");
  });
});

describe("public: 撤去した画像が物理的に存在しない", () => {
  it("favicon / OG 画像ファイルが削除されている", () => {
    for (const asset of ["favicon-32.png", "apple-touch-icon.png", "favicon.ico", "og-image.png"]) {
      expect(existsSync(publicPath(asset))).toBe(false);
    }
  });

  it("たすきば本文用の mascot-owl.png はコンテンツとして維持されている", () => {
    expect(existsSync(publicPath("mascot-owl.png"))).toBe(true);
  });
});
