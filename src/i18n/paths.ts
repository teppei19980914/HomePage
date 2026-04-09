// ============================================================
// i18n/paths.ts — getStaticPaths のロケール対応ヘルパー
//
// [lang] 動的ルート上のページで使用する。
// すべてのサポートロケール分のパスを自動生成する。
// ============================================================

import { LOCALES, type Locale } from "./types";
import { getLocalizedCollection, stripLocale, type LocalizedCollection } from "./content";

/**
 * 静的ルート用の getStaticPaths ヘルパー。
 * [lang] を含むすべてのロケール分のパスを返す。
 *
 * @example
 * // src/pages/[lang]/profile.astro
 * export const getStaticPaths = localeStaticPaths;
 */
export function localeStaticPaths() {
  return LOCALES.map((lang) => ({
    params: { lang },
    props: { lang },
  }));
}

/**
 * コンテンツコレクションの詳細ページ用 getStaticPaths ヘルパー。
 * ロケール × エントリのクロス積でパスを生成する。
 *
 * @example
 * // src/pages/[lang]/blog/[...slug].astro
 * export const getStaticPaths = () =>
 *   localeContentPaths("blog", (e) => !e.data.draft);
 */
export async function localeContentPaths<C extends LocalizedCollection>(
  collection: C,
  filter?: (entry: Awaited<ReturnType<typeof getLocalizedCollection<C>>>[number]) => boolean,
) {
  const paths = [];
  for (const lang of LOCALES) {
    const entries = await getLocalizedCollection(collection, lang);
    const filtered = filter ? entries.filter(filter) : entries;
    for (const entry of filtered) {
      paths.push({
        params: { lang, slug: stripLocale(entry.id) },
        props: { entry, lang },
      });
    }
  }
  return paths;
}
