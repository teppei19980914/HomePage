/**
 * ブログ投稿カレンダーのデータ構築ロジック。
 *
 * BlogCalendar.astro の Astro テンプレート層から切り出したユニットテスト可能な純粋関数群。
 * 記事の追加・更新・削除があった場合はこのモジュールのテストが必ず走るため、
 * カレンダー表示のリグレッションを検知できる。
 */

export interface BlogPostLike {
  id: string;
  data: { date: Date; title: string };
}

export interface PostEntry<T extends BlogPostLike = BlogPostLike> {
  post: T;
  scheduled: boolean;
}

export interface MonthSpec {
  key: string;
  year: number;
  month: number;
}

export interface Cell<T extends BlogPostLike = BlogPostLike> {
  day: number | null;
  key: string | null;
  isToday: boolean;
  entries: PostEntry<T>[];
}

/**
 * Date を "YYYY-MM-DD" 形式の文字列に変換する(タイムゾーン依存を避けるためローカル時間で)。
 */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Date を "YYYY-MM" 形式の月キーに変換する。
 */
export function toMonthKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/**
 * 記事を日付キーでグループ化する。未来日付は scheduled: true。
 */
export function buildDayMap<T extends BlogPostLike>(
  posts: T[],
  now: Date,
): Map<string, PostEntry<T>[]> {
  const todayKey = toDateKey(now);
  const map = new Map<string, PostEntry<T>[]>();
  for (const post of posts) {
    const key = toDateKey(post.data.date);
    const scheduled = key > todayKey;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push({ post, scheduled });
  }
  return map;
}

/**
 * 表示対象月の一覧を構築する。
 * - 記事が存在する月
 * - 当月 ±contextMonths (ナビゲーションで空月が連続しないように)
 */
export function buildMonthList<T extends BlogPostLike>(
  posts: T[],
  now: Date,
  contextMonths = 3,
): MonthSpec[] {
  const set = new Set<string>();
  set.add(toMonthKey(now));
  for (const post of posts) {
    set.add(toMonthKey(post.data.date));
  }
  for (let offset = -contextMonths; offset <= contextMonths; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    set.add(toMonthKey(d));
  }
  return Array.from(set)
    .map((key) => {
      const [y, m] = key.split("-").map(Number);
      return { key, year: y, month: m - 1 };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
}

/**
 * 指定した年月のカレンダーグリッド(週の始まりは日曜)を構築する。
 */
export function buildMonthGrid<T extends BlogPostLike>(
  year: number,
  month: number,
  dayMap: Map<string, PostEntry<T>[]>,
  now: Date,
): Cell<T>[] {
  const todayKey = toDateKey(now);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();
  const cells: Cell<T>[] = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push({ day: null, key: null, isToday: false, entries: [] });
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    const key = toDateKey(date);
    cells.push({
      day: d,
      key,
      isToday: key === todayKey,
      entries: dayMap.get(key) ?? [],
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, key: null, isToday: false, entries: [] });
  }
  return cells;
}

/**
 * 指定した年月に存在する記事のリストを日付順で返す。
 */
export function entriesForMonth<T extends BlogPostLike>(
  year: number,
  month: number,
  dayMap: Map<string, PostEntry<T>[]>,
): { key: string; day: number; entries: PostEntry<T>[] }[] {
  const list: { key: string; day: number; entries: PostEntry<T>[] }[] = [];
  const lastDay = new Date(year, month + 1, 0);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    const key = toDateKey(date);
    const entries = dayMap.get(key);
    if (entries && entries.length > 0) {
      list.push({ key, day: d, entries });
    }
  }
  return list;
}

/**
 * 全記事の date がいずれかの月パネルでレンダリングされることを保証する検算。
 *
 * 記事追加時にカレンダーで表示されないケース(例: 月リスト構築に漏れる等)を検知する。
 * 表示月リストに含まれない date があれば throw する。
 */
export function assertAllPostsCovered<T extends BlogPostLike>(
  posts: T[],
  months: MonthSpec[],
): void {
  const monthKeys = new Set(months.map((m) => m.key));
  const missing: { id: string; date: string }[] = [];
  for (const post of posts) {
    const key = toMonthKey(post.data.date);
    if (!monthKeys.has(key)) {
      missing.push({ id: post.id, date: post.data.date.toISOString() });
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `Blog calendar coverage error: ${missing.length} post(s) not in any visible month.\n` +
        missing.map((m) => `  - ${m.id} (${m.date})`).join("\n"),
    );
  }
}
