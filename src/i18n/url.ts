// ============================================================
// i18n/url.ts — ロケール対応の URL 生成ヘルパー
//
// 内部リンクは必ずこのヘルパーを経由して生成する。
// ハードコード (`${BASE_URL}profile/`) は言語プレフィックスを含まないため禁止。
//
// 使用例:
//   const t = localeUrl("ja", "profile/");          // "/HomePage/ja/profile/"
//   const t = localeUrl("en", "blog/hello-world/"); // "/HomePage/en/blog/hello-world/"
//   const t = localeUrl("ja", "");                  // "/HomePage/ja/"
// ============================================================

import type { Locale } from "./types";

/**
 * 指定ロケール + 相対パスから絶対 URL (base 含む) を生成する。
 *
 * @param locale - 対象ロケール
 * @param path - base 以降のパス (先頭スラッシュなし、末尾スラッシュ推奨)
 * @returns `${BASE_URL}${locale}/${path}` の形式
 *
 * @example
 * localeUrl("ja", "profile/")       // "/HomePage/ja/profile/"
 * localeUrl("en", "blog/")          // "/HomePage/en/blog/"
 * localeUrl("ja", "")               // "/HomePage/ja/"
 */
export function localeUrl(locale: Locale, path = ""): string {
  const base = import.meta.env.BASE_URL; // "/HomePage/" 等、末尾スラッシュあり
  // path 先頭のスラッシュを剥がす(`/profile/` でも `profile/` でも動くように)
  const cleanPath = path.replace(/^\/+/, "");
  return `${base}${locale}/${cleanPath}`;
}

/**
 * ベース URL (言語プレフィックスなし) を返す。
 * 言語検出用リダイレクトページなど、ロケールが未確定な場面で使用する。
 */
export function rootUrl(path = ""): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\/+/, "");
  return `${base}${cleanPath}`;
}
