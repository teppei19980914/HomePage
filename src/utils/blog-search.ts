/**
 * ブログ記事の検索ロジック（純粋関数）。
 *
 * クライアントサイドJSとSSGテンプレート両方から利用可能にするため、
 * DOM 依存のない部分のみを切り出している。マッチ判定はタイトル / 概要 / タグ
 * の部分一致（大小文字非依存・連続空白を1つに正規化）。
 */

export function normalize(s: string | null | undefined): string {
  return (s ?? "").toLowerCase().replace(/\s+/g, " ").trim();
}

export interface SearchFields {
  title: string;
  description: string;
  /** カンマ区切り文字列 ("a,b,c") もしくは配列。配列なら内部で join される */
  tags: string | string[];
}

/**
 * 検索クエリが対象カードのいずれかのフィールドに部分一致するか。
 * 空クエリは常に true (= 全件表示)。
 */
export function cardMatches(query: string, card: SearchFields): boolean {
  const q = normalize(query);
  if (!q) return true;
  const tagsStr = Array.isArray(card.tags) ? card.tags.join(",") : card.tags;
  return (
    normalize(card.title).includes(q) ||
    normalize(card.description).includes(q) ||
    normalize(tagsStr).includes(q)
  );
}
