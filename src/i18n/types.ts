// ============================================================
// types.ts — 多言語対応の型定義
//
// ja.ts を単一情報源とし、その構造から Labels 型を導出する。
// これにより、新しいラベルを ja.ts に追加すると en.ts は型エラーとなり、
// 翻訳漏れをビルド時に検出できる。
// ============================================================

import type { ja } from "./ja";

/**
 * UI ラベルのスキーマ。
 * ja.ts の構造から自動導出されるため、手動でメンテナンスする必要はない。
 * 各言語の辞書ファイルは `Labels` 型を満たす必要がある。
 */
export type Labels = typeof ja;

/**
 * サポートするロケール一覧。
 * 将来的に "zh" / "ko" 等を追加する場合は、このユニオン型を拡張した上で
 * LOCALES 定数・辞書ファイル・astro.config.mjs の i18n 設定も更新すること。
 */
export type Locale = "ja" | "en";

/**
 * サポートロケールの配列（実行時用）
 */
export const LOCALES: readonly Locale[] = ["ja", "en"] as const;

/**
 * デフォルトロケール。未対応言語や判定不能時のフォールバック先として使用する。
 */
export const DEFAULT_LOCALE: Locale = "ja";

/**
 * 文字列がサポート対象の Locale かどうかを判定する型ガード。
 * URL パスやクエリから取得した任意の文字列を安全に Locale 型にナローイングするために使用する。
 *
 * @example
 * const raw = Astro.params.lang;
 * const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
 */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/**
 * Locale コード → BCP-47 形式のマッピング。
 * Intl.DateTimeFormat / toLocaleString などに渡す際に使用する。
 */
export const BCP47: Record<Locale, string> = {
  ja: "ja-JP",
  en: "en-US",
};
