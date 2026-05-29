import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// ============================================================
// 製品ページ: URL ハッシュによる details アコーディオン展開 (2026-05-29)
//
// 利用規約 (#terms) / 特商法 (#tokushoho) 等への直接リンクで、
// 対象アコーディオンが「開いた状態」で表示されることを保証する。
// この振る舞いは [...slug].astro の openHashAccordion が担う。
// ============================================================

const read = (rel: string) =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf-8");

const slugPage = read("./[lang]/product/[...slug].astro");
const userJa = read("../content/product/ja/tasukiba-user.md");
const userEn = read("../content/product/en/tasukiba-user.md");

describe("製品ページ: ハッシュでアコーディオンを開く", () => {
  it("openHashAccordion が実装され details を開く", () => {
    expect(slugPage).toContain("openHashAccordion");
    expect(slugPage).toMatch(/node\.open\s*=\s*true/);
  });

  it("初期表示・ハッシュ変更・ページ遷移の各タイミングで実行される", () => {
    expect(slugPage).toMatch(/window\.addEventListener\("hashchange", openHashAccordion\)/);
    expect(slugPage).toMatch(/astro:after-swap/);
  });
});

describe("直接リンク対象 id の存在", () => {
  it("ja: 利用規約 (#terms) と 特商法 (#tokushoho) のアコーディオン id が存在する", () => {
    expect(userJa).toContain('id="terms"');
    expect(userJa).toContain('id="tokushoho"');
  });

  it("en: 特商法 (#tokushoho) の id が存在する（利用規約は未翻訳のため ja へリンク）", () => {
    expect(userEn).toContain('id="tokushoho"');
    expect(userEn).toContain("/HomePage/ja/product/tasukiba-user/#terms");
  });
});
