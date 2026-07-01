import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    // 連載ブログのテーマ分類キー（src/utils/blog-series.ts の categoryOrder と対応）。
    // 連載記事の LP 表示時にこのキーでテーマ別アコーディオンにグルーピングする。
    // 連載記事は必ず設定する（src/utils/series-category.test.ts で検証）。
    seriesCategory: z.string().optional(),
  }),
});

const product = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/product" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    status: z.enum(["active", "beta", "archived", "suspended"]).default("active"),
    order: z.number().default(0),
    parent: z.string().optional(),
    audience: z.enum(["user", "firstLogin", "developer"]).optional(),
    // 詳細ページの代わりに独立した静的 LP (public/ 配下) へ遷移させたい場合のルート相対パス。
    // 設定するとプロダクト一覧・親ページの子カードのリンク先がこちらに差し替わる。
    landingPage: z.string().optional(),
    // 連載ブログのキー（src/utils/blog-series.ts の BlogSeries.key と対応）。
    // 設定すると LP 下部にこのプロダクトの連載ブログ一覧セクションを表示する。
    blogSeriesKey: z.string().optional(),
  }),
});

const project = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/project" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    period: z.string(),
    role: z.string(),
    company: z.string(),
    companyUrl: z.string().url().optional(),
    contractType: z.enum(["employee", "contract", "personal"]),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

// Profile ページの長文セクション (Philosophy / Motto / Dream / Goal)
// group で "思想" (mindset: 抽象的な価値観) と "方向性" (direction: 具体的な目指す先) に分類
const profile = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/profile" }),
  schema: z.object({
    title: z.string(),
    quote: z.string(),
    order: z.number().default(0),
    group: z.enum(["mindset", "direction"]),
  }),
});

export const collections = { blog, product, project, profile };
