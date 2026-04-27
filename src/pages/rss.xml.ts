import rss from "@astrojs/rss";
import { site } from "../data/labels";
import { getLocalizedCollection, stripLocale, isPublished } from "../i18n/content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getLocalizedCollection("blog", "ja"))
    .filter(isPublished)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  // フィードの帰属サイト URL は base (/HomePage/) を含めた絶対 URL を使う。
  // bare ドメイン (https://teppei19980914.github.io/) は GitHub Pages 上で 404 となり、
  // Google から「親サイト不在の孤立フィード」と判定されインデックス不可になる。
  const siteOrigin = context.site!.toString().replace(/\/$/, "");
  const baseUrl = import.meta.env.BASE_URL; // "/HomePage/"
  const channelLink = `${siteOrigin}${baseUrl}ja/blog/`;
  const selfHref = `${siteOrigin}${baseUrl}rss.xml`;

  return rss({
    title: `${site.name} Blog`,
    description: site.defaultDescription,
    site: channelLink,
    // <atom:link rel="self"> でフィード自身の URL を宣言する (RSS ベストプラクティス)
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: `<atom:link href="${selfHref}" rel="self" type="application/rss+xml" />`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      // RSS は ja 固定配信のため link URL に /ja/ プレフィックスを含める
      link: `${baseUrl}ja/blog/${stripLocale(post.id)}/`,
      categories: post.data.tags,
    })),
  });
}
