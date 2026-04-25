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
    contractType: z.enum(["employee", "contract"]),
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
