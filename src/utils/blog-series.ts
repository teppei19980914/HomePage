/**
 * ブログ「連載」周りのユーティリティ。
 *
 * 連載とは、特定プロダクトについて継続的に書いている記事群のこと。
 * 連載記事はファイル名 slug に共通文字列（slugMatch）を含む点で判定する。
 * slug ベースなので ja / en どちらの記事でも同一に判定でき、言語非依存。
 *
 * - ブログ記事 → プロダクト LP の導線（記事側で findSeriesForSlug を使用）
 * - プロダクト LP → 連載記事一覧の導線（LP 側で getSeriesByKey + isSeriesPostSlug を使用）
 *
 * 連載の定義はこのファイルの BLOG_SERIES を単一ソースとする（ハードコード分散を避ける）。
 */

export interface BlogSeries {
  /** 連載の一意キー（プロダクト frontmatter の blogSeriesKey と対応） */
  key: string;
  /** 連載記事の slug に含まれる共通文字列（部分一致で判定） */
  slugMatch: string;
  /** 連載が紐づくプロダクトの slug（LP への内部リンク生成に使用） */
  productSlug: string;
}

/**
 * 連載の定義一覧（単一ソース）。
 * 新しい連載を追加する場合はここにエントリを足すだけでよい。
 */
export const BLOG_SERIES: BlogSeries[] = [
  { key: "tasukiba", slugMatch: "tasukiba", productSlug: "tasukiba" },
];

/**
 * 記事 slug が属する連載を返す（無ければ undefined）。
 * slug は stripLocale 済みのもの（例: "20260530-tasukiba-owl-origin"）を想定。
 */
export function findSeriesForSlug(slug: string): BlogSeries | undefined {
  return BLOG_SERIES.find((s) => slug.includes(s.slugMatch));
}

/**
 * 連載キーから連載定義を返す（無ければ undefined）。
 * プロダクト frontmatter の blogSeriesKey から逆引きする用途。
 */
export function getSeriesByKey(key: string): BlogSeries | undefined {
  return BLOG_SERIES.find((s) => s.key === key);
}

/**
 * 記事 slug が指定連載に属するか判定する。
 */
export function isSeriesPostSlug(slug: string, series: BlogSeries): boolean {
  return slug.includes(series.slugMatch);
}
