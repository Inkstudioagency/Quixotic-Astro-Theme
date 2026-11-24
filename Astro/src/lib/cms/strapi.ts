// Strapi 5 content source (REST API, flat v5 response format).
// Every collection is fetched once per build with `populate=*`; relations are then
// resolved by slug, so deep populate queries are not needed.
import type {
  Blocks,
  Blog,
  BlogCategory,
  CmsData,
  Destination,
  HomeTabs,
  ItineraryDay,
  Media,
  Package,
  PackageInclusions,
} from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Entry = Record<string, any>;

export interface StrapiOptions {
  /** Base URL of the Strapi server, e.g. http://localhost:1337 (no trailing slash). */
  url: string;
  /** Optional read-only API token (needed when the Public role has no `find` permission). */
  token?: string;
}

async function fetchAll(opts: StrapiOptions, collection: string): Promise<Entry[]> {
  const out: Entry[] = [];
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

  for (let page = 1; ; page++) {
    const query = `populate=*&pagination[page]=${page}&pagination[pageSize]=100&status=published`;
    const res = await fetch(`${opts.url}/api/${collection}?${query}`, { headers });
    if (!res.ok) throw new Error(`Strapi GET /api/${collection} responded ${res.status} ${res.statusText}`);
    const json = (await res.json()) as { data: Entry[]; meta?: { pagination?: { pageCount?: number } } };
    out.push(...json.data);
    if (page >= (json.meta?.pagination?.pageCount ?? 1)) break;
  }
  return out;
}

const str = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
const blocks = (v: unknown): Blocks => (Array.isArray(v) ? (v as Blocks) : []);

function media(opts: StrapiOptions, file: Entry | null | undefined): Media | null {
  if (!file?.url) return null;
  // Local upload provider returns "/uploads/..."; cloud providers return absolute URLs.
  const url = /^https?:\/\//.test(file.url) ? file.url : `${opts.url}${file.url}`;
  return { url, alt: str(file.alternativeText) };
}

const mediaList = (opts: StrapiOptions, files: unknown): Media[] =>
  (Array.isArray(files) ? files : []).map((f) => media(opts, f)).filter((m): m is Media => Boolean(m));

function toCategory(e: Entry): BlogCategory {
  return { name: str(e.name), slug: str(e.slug), description: str(e.description) };
}

function toPackage(opts: StrapiOptions, e: Entry): Package {
  const inc: Entry = e.inclusions ?? {};
  const tabs: Entry = e.homeTabs ?? {};
  const inclusions: PackageInclusions = {
    stay: str(inc.stay),
    wellness: str(inc.wellness),
    entryFees: str(inc.entryFees),
    guide: str(inc.guide),
    meals: str(inc.meals),
    tasting: str(inc.tasting),
    transfers: str(inc.transfers),
    boatTrip: str(inc.boatTrip),
  };
  const homeTabs: HomeTabs = {
    europe: Boolean(tabs.europe),
    asia: Boolean(tabs.asia),
    africa: Boolean(tabs.africa),
    americas: Boolean(tabs.americas),
  };
  const itinerary: ItineraryDay[] = (Array.isArray(e.itinerary) ? e.itinerary : []).map((d: Entry) => ({
    title: str(d.title),
    details: str(d.details),
  }));
  return {
    name: str(e.name),
    slug: str(e.slug),
    summary: str(e.summary),
    metaDescription: str(e.metaDescription),
    thumbnail: media(opts, e.thumbnail),
    gallery: mediaList(opts, e.gallery),
    location: str(e.location),
    duration: str(e.duration),
    price: str(e.price),
    rating: str(e.rating),
    reviewCount: str(e.reviewCount),
    overview: blocks(e.overview),
    inclusions,
    itinerary,
    additionalInfo: str(e.additionalInfo),
    tripType: str(e.tripType),
    region: str(e.region),
    homeTabs,
    createdAt: str(e.createdAt),
  };
}

export async function loadStrapi(opts: StrapiOptions): Promise<CmsData> {
  const [rawCategories, rawBlogs, rawPackages, rawDestinations] = await Promise.all([
    fetchAll(opts, "blog-categories"),
    fetchAll(opts, "blogs"),
    fetchAll(opts, "packages"),
    fetchAll(opts, "destinations"),
  ]);

  const blogCategories = rawCategories.map(toCategory);
  const categoryBySlug = new Map(blogCategories.map((c) => [c.slug, c]));

  const blogs: Blog[] = rawBlogs.map((e) => ({
    title: str(e.title),
    slug: str(e.slug),
    summary: str(e.summary),
    thumbnail: media(opts, e.thumbnail),
    authorName: str(e.authorName),
    authorImage: media(opts, e.authorImage),
    readTime: str(e.readTime),
    publishedDate: str(e.publishedDate),
    category: e.category?.slug ? (categoryBySlug.get(e.category.slug) ?? toCategory(e.category)) : null,
    contentPart1: blocks(e.contentPart1),
    imagePairLeft: media(opts, e.imagePairLeft),
    imagePairRight: media(opts, e.imagePairRight),
    contentPart2: blocks(e.contentPart2),
    wideImage: media(opts, e.wideImage),
    contentPart3: blocks(e.contentPart3),
  }));

  const packages = rawPackages.map((e) => toPackage(opts, e));
  const packageBySlug = new Map(packages.map((p) => [p.slug, p]));

  const destinations: Destination[] = rawDestinations.map((e) => ({
    name: str(e.name),
    slug: str(e.slug),
    tagline: str(e.tagline),
    summary: str(e.summary),
    heroText: str(e.heroText),
    cardImage: media(opts, e.cardImage),
    heroImage: media(opts, e.heroImage),
    tourCount: str(e.tourCount),
    bestTimeToVisit: str(e.bestTimeToVisit),
    climate: str(e.climate),
    startingPrice: str(e.startingPrice),
    overview: blocks(e.overview),
    whyVisit: blocks(e.whyVisit),
    topExperiences: blocks(e.topExperiences),
    bookingBenefits: blocks(e.bookingBenefits),
    travelNotes: blocks(e.travelNotes),
    gallery: mediaList(opts, e.gallery),
    // Relation order is the order set in the Strapi admin.
    packages: (Array.isArray(e.packages) ? e.packages : [])
      .map((p: Entry) => packageBySlug.get(str(p.slug)))
      .filter((p: Package | undefined): p is Package => Boolean(p)),
    createdAt: str(e.createdAt),
  }));

  return { blogCategories, blogs, packages, destinations };
}
