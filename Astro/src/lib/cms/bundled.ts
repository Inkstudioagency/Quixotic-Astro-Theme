// Bundled content source: src/data/cms.json (generated from the original CMS exports).
// Used when no Strapi URL is configured, and as a fallback when Strapi is unreachable.
// Relations are stored as slugs in the JSON and resolved here.
import raw from "../../data/cms.json";
import type { Blog, BlogCategory, CmsData, Destination, Package } from "./types";

type RawData = typeof raw;

export function loadBundled(): CmsData {
  const data = raw as RawData;
  const blogCategories: BlogCategory[] = data.blogCategories;
  const categoryBySlug = new Map(blogCategories.map((c) => [c.slug, c]));

  const blogs: Blog[] = data.blogs.map((b) => ({
    ...(b as unknown as Omit<Blog, "category">),
    category: categoryBySlug.get(b.category) ?? null,
  }));

  const packages = data.packages as unknown as Package[];
  const packageBySlug = new Map(packages.map((p) => [p.slug, p]));

  const destinations: Destination[] = data.destinations.map((d) => ({
    ...(d as unknown as Omit<Destination, "packages">),
    packages: d.packages.map((slug) => packageBySlug.get(slug)).filter((p): p is Package => Boolean(p)),
  }));

  return { blogCategories, blogs, packages, destinations };
}
