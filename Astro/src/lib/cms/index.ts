// Single entry point for CMS content.
//
// - STRAPI_URL set   → content is fetched from Strapi at build time (or per request in dev).
// - STRAPI_URL unset → the bundled demo content in src/data/cms.json is used.
// If Strapi is configured but unreachable, the build logs a warning and falls back to
// the bundled content, unless STRAPI_REQUIRED=true (recommended for production builds).
//
// All ordering rules reproduce the original template's collection-list settings.
import { loadBundled } from "./bundled";
import { loadStrapi } from "./strapi";
import type { Blog, BlogCategory, CmsData, Destination, HomeTabs, Package } from "./types";

export type * from "./types";

const env = import.meta.env;
const STRAPI_URL = String(env.STRAPI_URL ?? "").replace(/\/+$/, "");
const STRAPI_TOKEN = String(env.STRAPI_TOKEN ?? "") || undefined;
const STRAPI_REQUIRED = String(env.STRAPI_REQUIRED ?? "") === "true";

let cache: Promise<CmsData> | undefined;

async function load(): Promise<CmsData> {
  if (!STRAPI_URL) return loadBundled();
  try {
    return await loadStrapi({ url: STRAPI_URL, token: STRAPI_TOKEN });
  } catch (error) {
    if (STRAPI_REQUIRED) throw error;
    console.warn(`[cms] Strapi unavailable (${(error as Error).message}); using bundled content.`);
    return loadBundled();
  }
}

/** Loads all CMS content once per build (dev server: once per server start). */
export function getCms(): Promise<CmsData> {
  cache ??= load();
  return cache;
}

const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, "en");
const newestBlog = (a: Blog, b: Blog) => b.publishedDate.localeCompare(a.publishedDate);

// ---- Blog

/** All posts, newest published first. */
export async function getBlogs(): Promise<Blog[]> {
  return [...(await getCms()).blogs].sort(newestBlog);
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return [...(await getCms()).blogCategories].sort(byName);
}

export async function getBlogsByCategory(slug: string): Promise<Blog[]> {
  return (await getBlogs()).filter((b) => b.category?.slug === slug);
}

/** The two newest posts other than the current one. */
export async function getRelatedBlogs(slug: string, limit = 2): Promise<Blog[]> {
  return (await getBlogs()).filter((b) => b.slug !== slug).slice(0, limit);
}

// ---- Travel

/** All packages, A–Z by name. */
export async function getPackages(): Promise<Package[]> {
  return [...(await getCms()).packages].sort(byName);
}

/** Packages shown in one region tab of the home page slider (A–Z, max 4). */
export async function getHomeTabPackages(tab: keyof HomeTabs, limit = 4): Promise<Package[]> {
  return (await getPackages()).filter((p) => p.homeTabs[tab]).slice(0, limit);
}

/** "You may also like": three other packages, Z–A by name. */
export async function getRelatedPackages(slug: string, limit = 3): Promise<Package[]> {
  return (await getPackages())
    .filter((p) => p.slug !== slug)
    .reverse()
    .slice(0, limit);
}

/** All destinations, A–Z by name (home page slider). */
export async function getDestinations(): Promise<Destination[]> {
  return [...(await getCms()).destinations].sort(byName);
}

/** Destinations page grid: newest first. */
export async function getDestinationsNewestFirst(): Promise<Destination[]> {
  return [...(await getCms()).destinations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// ---- Formatting

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** "2026-08-27" → "Aug 27, 2026" (matches the original template). */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  return Number.isNaN(date.getTime()) ? iso : dateFormat.format(date);
}
