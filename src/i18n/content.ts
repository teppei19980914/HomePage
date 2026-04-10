// ============================================================
// i18n/content.ts — Content Collections のロケール対応ヘルパー
//
// Content Collections 内のエントリは `{locale}/{slug}` 形式の id を持つ。
// 例: src/content/blog/ja/hello-world.md → id = "ja/hello-world"
//
// このモジュールは以下を提供する:
//  - getLocalizedCollection: 指定ロケールのエントリ一覧を返す
//  - getLocalizedEntry: 指定ロケール+slug のエントリを返す(フォールバック付き)
//  - stripLocale: エントリ id からロケールプレフィックスを除去し素の slug を返す
//  - entryLocale: エントリ id からロケールを抽出する
//
// フォールバック動作:
//  - 指定ロケールで見つからない場合は DEFAULT_LOCALE で再検索する
//  - これにより未翻訳コンテンツは自動的に日本語版が表示される
// ============================================================

import { getCollection, getEntry } from "astro:content";
import { DEFAULT_LOCALE, type Locale } from "./types";

/** ロケール対応のコレクション名 */
export type LocalizedCollection = "blog" | "product" | "project" | "profile";

/**
 * エントリ id からロケールを抽出する。
 * @example entryLocale("ja/hello-world") => "ja"
 */
export function entryLocale(id: string): Locale {
  const prefix = id.split("/")[0];
  return prefix === "en" ? "en" : "ja";
}

/**
 * エントリ id からロケールプレフィックスを除いた slug を返す。
 * これが URL の :slug 部分になる。
 * @example stripLocale("ja/hello-world") => "hello-world"
 * @example stripLocale("en/category/foo") => "category/foo"
 */
export function stripLocale(id: string): string {
  return id.replace(/^(ja|en)\//, "");
}

/**
 * 指定ロケールのコレクション全件を取得する。
 * 該当ロケールのエントリが 1 件もなければ、自動的にデフォルトロケールへフォールバックする。
 *
 * @param name - コレクション名
 * @param locale - 取得したいロケール
 * @returns そのロケールに属するエントリ配列
 */
export async function getLocalizedCollection<C extends LocalizedCollection>(
  name: C,
  locale: Locale,
) {
  const all = await getCollection(name);
  const prefix = `${locale}/`;
  const filtered = all.filter((e) => e.id.startsWith(prefix));

  // フォールバック: 該当ロケールに 1 件もなければデフォルトロケールを返す
  if (filtered.length === 0 && locale !== DEFAULT_LOCALE) {
    const defaultPrefix = `${DEFAULT_LOCALE}/`;
    return all.filter((e) => e.id.startsWith(defaultPrefix));
  }
  return filtered;
}

/**
 * 指定ロケール + slug のエントリを取得する。
 * 該当エントリが存在しなければデフォルトロケール版にフォールバックする。
 *
 * @param name - コレクション名
 * @param slug - ロケールプレフィックスを含まない素の slug
 * @param locale - 取得したいロケール
 * @returns エントリと、フォールバックしたかどうかのフラグ
 */
export async function getLocalizedEntry<C extends LocalizedCollection>(
  name: C,
  slug: string,
  locale: Locale,
): Promise<{ entry: Awaited<ReturnType<typeof getEntry>>; usedFallback: boolean } | null> {
  // 指定ロケール優先
  const primary = await getEntry(name, `${locale}/${slug}`);
  if (primary) {
    return { entry: primary, usedFallback: false };
  }
  // フォールバック: デフォルトロケール
  if (locale !== DEFAULT_LOCALE) {
    const fallback = await getEntry(name, `${DEFAULT_LOCALE}/${slug}`);
    if (fallback) {
      return { entry: fallback, usedFallback: true };
    }
  }
  return null;
}

// ============================================================
// 予約投稿フィルタ
//
// ブログ記事の `date` フィールドがビルド日時以前であるかを判定する。
// これにより、未来の日付を持つ記事はビルド時に除外され、
// 日次 cron ビルドで予約日に自動公開される。
//
// 判定基準（本番ビルド時）:
//   - draft: true → 非公開
//   - date が今日以前 → 公開
//   - date が明日以降 → 非公開
//
// dev サーバー時:
//   - draft: true → 非公開（draft は明示的な非公開指示なので dev でも除外）
//   - date が未来 → **公開する**（プレビュー用。修正漏れを事前に確認できる）
//
// GitHub Actions は UTC で動作するため、JST で翌日 9:00 AM 以降に反映される。
// ============================================================

/**
 * ブログ記事が公開対象かどうかを判定する。
 *
 * - **本番ビルド**: `draft: false` かつ `date` がビルド日時以前の記事のみ公開
 * - **dev サーバー**: `draft: false` の記事をすべて公開（未来日付も含む）
 *
 * @param entry - blog コレクションのエントリ（`data.draft` と `data.date` を持つ）
 * @returns 公開すべきなら true
 *
 * @example
 * const posts = (await getLocalizedCollection("blog", lang)).filter(isPublished);
 */
export function isPublished(entry: { data: { draft?: boolean; date: Date } }): boolean {
  if (entry.data.draft) return false;
  // dev サーバーでは日付フィルタをスキップし、全記事をプレビュー可能にする
  if (import.meta.env.DEV) return true;
  const now = new Date();
  return entry.data.date <= now;
}
