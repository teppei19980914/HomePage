import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../data/labels";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: `${site.name} Blog`,
    description: site.defaultDescription,
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/HomePage/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
