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
  /**
   * テーマ別アコーディオンの表示順（カテゴリキーの配列）。
   * 各キーは記事 frontmatter の seriesCategory および i18n の
   * blogSeries.categories のキーと対応する。
   */
  categoryOrder: string[];
}

/**
 * 連載の定義一覧（単一ソース）。
 * 新しい連載を追加する場合はここにエントリを足すだけでよい。
 */
export const BLOG_SERIES: BlogSeries[] = [
  {
    key: "tasukiba",
    slugMatch: "tasukiba",
    productSlug: "tasukiba",
    categoryOrder: ["origin", "design", "business", "team", "brand", "milestone"],
  },
];

/** seriesCategory 未設定・未知カテゴリの記事をまとめるフォールバックキー */
export const SERIES_CATEGORY_FALLBACK = "other";

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

/** グルーピング対象の記事が満たすべき最小形状（コレクション型に依存しない）。 */
export interface SeriesPostLike {
  data: { seriesCategory?: string; date: Date };
}

/** テーマ別グループ（1 つのアコーディオンに対応）。 */
export interface SeriesCategoryGroup<T extends SeriesPostLike> {
  /** カテゴリキー（i18n blogSeries.categories のキー、または "other"） */
  key: string;
  /** 日付降順に並んだ記事（最新が先頭） */
  posts: T[];
}

/**
 * 連載記事をテーマ（seriesCategory）別にグループ化する。
 *
 * - グループは series.categoryOrder の順で返す
 * - 各グループ内は日付降順（最新記事が先頭、スクロールで過去へ遡れる並び）
 * - categoryOrder に無い／未設定の記事は "other" グループにまとめて末尾に置く
 * - 記事が 0 件のカテゴリは返さない（空のアコーディオンを描画しない）
 */
export function groupSeriesPostsByCategory<T extends SeriesPostLike>(
  posts: T[],
  series: BlogSeries,
): SeriesCategoryGroup<T>[] {
  const order = series.categoryOrder;
  const byCategory = new Map<string, T[]>();
  for (const post of posts) {
    const cat = post.data.seriesCategory;
    const key = cat && order.includes(cat) ? cat : SERIES_CATEGORY_FALLBACK;
    const bucket = byCategory.get(key);
    if (bucket) bucket.push(post);
    else byCategory.set(key, [post]);
  }

  // 最新記事を先頭に（降順）。ユーザは最新を最初に見て、スクロールで過去へ遡れる。
  const sortByDateDesc = (a: T, b: T) => b.data.date.valueOf() - a.data.date.valueOf();
  const groups: SeriesCategoryGroup<T>[] = [];
  for (const key of order) {
    const bucket = byCategory.get(key);
    if (bucket && bucket.length > 0) {
      groups.push({ key, posts: [...bucket].sort(sortByDateDesc) });
    }
  }
  const others = byCategory.get(SERIES_CATEGORY_FALLBACK);
  if (others && others.length > 0) {
    groups.push({
      key: SERIES_CATEGORY_FALLBACK,
      posts: [...others].sort(sortByDateDesc),
    });
  }
  return groups;
}
