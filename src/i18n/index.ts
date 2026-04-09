// ============================================================
// i18n/index.ts — 多言語辞書のエントリポイント
//
// 使用例:
//   import { getLabels } from "../i18n";
//   const t = getLabels(Astro.currentLocale);
//   <h1>{t.profile.title}</h1>
// ============================================================

import { ja } from "./ja";
import { en } from "./en";
import { DEFAULT_LOCALE, isLocale, type Labels, type Locale } from "./types";

export { ja, en };
export { LOCALES, DEFAULT_LOCALE, isLocale, BCP47 } from "./types";
export type { Labels, Locale };

/**
 * ロケール別の辞書マップ。
 * 新しい言語を追加する場合は、辞書ファイル作成後にここに登録する。
 */
const DICTIONARIES: Record<Locale, Labels> = {
  ja,
  en,
};

/**
 * 指定ロケールのラベル辞書を返す。
 * 未対応ロケールまたは undefined が渡された場合は DEFAULT_LOCALE の辞書を返す。
 *
 * @param locale - 取得したいロケール(null/undefined/不正値を許容)
 * @returns そのロケールのラベル辞書。ロケールが不正ならデフォルト言語の辞書
 *
 * @example
 * const t = getLabels(Astro.currentLocale);  // 常に安全に辞書を取得
 * const t = getLabels("en");                  // 明示的に英語を取得
 * const t = getLabels("fr");                  // 未対応 → 日本語にフォールバック
 */
export function getLabels(locale: unknown): Labels {
  if (isLocale(locale)) {
    return DICTIONARIES[locale];
  }
  return DICTIONARIES[DEFAULT_LOCALE];
}

/**
 * 指定文字列を安全に Locale 型に変換する。
 * 不正値は DEFAULT_LOCALE にフォールバックする。
 *
 * URL パラメータ、navigator.language、localStorage 等の
 * 外部ソースから得た文字列を正規化する際に使用する。
 */
export function normalizeLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
