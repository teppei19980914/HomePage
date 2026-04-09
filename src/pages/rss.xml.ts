import rss from "@astrojs/rss";
import { site } from "../data/labels";
import { getLocalizedCollection, stripLocale } from "../i18n/content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getLocalizedCollection("blog", "ja"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: `${site.name} Blog`,
    description: site.defaultDescription,
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      // RSS は ja 固定配信のため link URL に /ja/ プレフィックスを含める
      link: `/HomePage/ja/blog/${stripLocale(post.id)}/`,
      categories: post.data.tags,
    })),
  });
}
