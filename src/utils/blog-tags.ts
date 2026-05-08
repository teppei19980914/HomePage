/**
 * ブログタグ周りのユーティリティ。
 *
 * - タグ名 → URL slug 変換（日本語タグはそのまま、英数字は小文字+ハイフン化）
 * - タグごとの記事カウント
 * - 1 記事しかないタグの判定（noindex 対象）
 */

import type { CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

/**
 * タグ名を URL slug に正規化する。
 *
 * - 日本語タグはそのまま使用（例: "個人開発" → "個人開発"）
 * - 英数字は小文字化 + 空白/記号をハイフン化（例: "Astro v6" → "astro-v6"）
 * - 表記ゆれ統一目的（"Astro v6" / "Astrov6" → "astro-v6" / "astrov6" として別扱いになる点は frontmatter 側の表記統一が前提）
 */
export function tagToSlug(tag: string): string {
  // 全体に日本語が含まれる場合はそのまま返す（URL エンコードはブラウザ任せ）
  if (/[぀-ヿ㐀-鿿ｦ-ﾟ]/.test(tag)) {
    return tag.trim();
  }
  // 英数字タグは小文字 + 空白/記号をハイフンに
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * 全記事から tag → 記事リストの Map を構築する。
 * 記事は date 降順でソート。
 */
export function buildTagMap(posts: BlogEntry[]): Map<string, BlogEntry[]> {
  const map = new Map<string, BlogEntry[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagToSlug(tag);
      if (!map.has(slug)) map.set(slug, []);
      map.get(slug)!.push(post);
    }
  }
  // 各タグ内を date 降順にソート
  for (const list of map.values()) {
    list.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  }
  return map;
}

/**
 * タグ slug → 表示名の Map を構築する。
 * 同じ slug に複数の表示名がぶつかった場合は、最初に出現したものを採用する。
 */
export function buildTagDisplayMap(posts: BlogEntry[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagToSlug(tag);
      if (!map.has(slug)) map.set(slug, tag);
    }
  }
  return map;
}

/**
 * タグページを noindex にすべきか判定する（記事が 1 件以下なら noindex）。
 * Google Search Central の "thin content" 対策。
 */
export function shouldNoindex(articleCount: number): boolean {
  return articleCount <= 1;
}

/**
 * タグ一覧（記事数降順、同数ならアルファベット順）を返す。
 */
export function listTagsSorted(
  tagMap: Map<string, BlogEntry[]>,
): Array<{ slug: string; count: number }> {
  return [...tagMap.entries()]
    .map(([slug, posts]) => ({ slug, count: posts.length }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.slug.localeCompare(b.slug);
    });
}
