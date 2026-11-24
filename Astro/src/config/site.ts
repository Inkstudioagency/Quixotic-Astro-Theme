// Global site settings. Edit these values to rebrand the theme.

export const SITE = {
  name: "Quixotic",
  /** Default <title> and description (used by the home page and as fallbacks). */
  title: "Quixotic - Travel Agency Astro Theme",
  description:
    "Quixotic is a travel agency Astro theme for tour operators: curated destinations, holiday packages, traveler reviews, FAQs and a blog, ready to launch.",
  /** Default social share image (path inside /public). */
  ogImage: "/images/open-graph-image-1200x630.webp",
  locale: "en",
} as const;

/**
 * The interaction runtime (public/js/webflow.js) binds page-specific animations
 * through the `data-wf-page` / `data-wf-site` attributes on <html>.
 * These IDs must stay exactly as exported, or scroll/hover animations stop working.
 */
export const WF_SITE_ID = "6b03d8352323461141e8bb2a";

export const WF_PAGE_IDS = {
  home: "6b03d8352323461141e8bb05",
  about: "6b03d8352323461141e8bb08",
  blog: "6b03d8352323461141e8bb0a",
  contact: "6b03d8352323461141e8bb09",
  destinations: "6b03d8352323461141e8bb0e",
  packages: "6b03d8352323461141e8bb0c",
  styleGuide: "6b03d8352323461141e8bb06",
  notFound: "6b03d8352323461141e8bb12",
  blogPost: "6b03d8352323461141e8bb07",
  blogCategory: "6b03d8352323461141e8bb14",
  destination: "6b03d8352323461141e8bb0d",
  package: "6b03d8352323461141e8bb0b",
  // Utility pages restored from the published site (not part of the original export).
  instructions: "6af61f5f090698eb77baf2ee",
  licenses: "6af61f4bda7fd21616141c5d",
  changelog: "6af61f418f170d113e6a4b4e",
} as const;

export type WfPage = keyof typeof WF_PAGE_IDS;
