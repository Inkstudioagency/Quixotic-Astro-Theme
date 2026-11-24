// Normalised content model used by every component.
// Both content sources (bundled JSON and Strapi) are converted to these shapes,
// so components never deal with source-specific response formats.

export interface Media {
  url: string;
  alt: string;
}

// ---- Strapi Blocks rich text (https://docs.strapi.io/cms/features/content-type-builder#blocks)

export interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface LinkNode {
  type: "link";
  url: string;
  children: TextNode[];
}

export type InlineNode = TextNode | LinkNode;

export interface ListItemNode {
  type: "list-item";
  children: InlineNode[];
}

export interface ListNode {
  type: "list";
  format: "ordered" | "unordered";
  children: (ListItemNode | ListNode)[];
}

export type Block =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: "quote"; children: InlineNode[] }
  | { type: "code"; children: TextNode[] }
  | { type: "image"; image: { url: string; alternativeText?: string | null; width?: number; height?: number } }
  | ListNode;

export type Blocks = Block[];

// ---- Blog CMS

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}

export interface Blog {
  title: string;
  slug: string;
  summary: string;
  thumbnail: Media | null;
  authorName: string;
  authorImage: Media | null;
  readTime: string;
  /** ISO date (YYYY-MM-DD). */
  publishedDate: string;
  category: BlogCategory | null;
  contentPart1: Blocks;
  imagePairLeft: Media | null;
  imagePairRight: Media | null;
  contentPart2: Blocks;
  wideImage: Media | null;
  contentPart3: Blocks;
}

// ---- Travel CMS (destinations + packages)

export interface PackageInclusions {
  stay: string;
  wellness: string;
  entryFees: string;
  guide: string;
  meals: string;
  tasting: string;
  transfers: string;
  boatTrip: string;
}

export interface ItineraryDay {
  title: string;
  details: string;
}

/** Which region tabs of the home-page "Packages" slider show this package. */
export interface HomeTabs {
  europe: boolean;
  asia: boolean;
  africa: boolean;
  americas: boolean;
}

export interface Package {
  name: string;
  slug: string;
  summary: string;
  metaDescription: string;
  thumbnail: Media | null;
  gallery: Media[];
  location: string;
  duration: string;
  price: string;
  rating: string;
  reviewCount: string;
  overview: Blocks;
  inclusions: PackageInclusions;
  itinerary: ItineraryDay[];
  additionalInfo: string;
  tripType: string;
  region: string;
  homeTabs: HomeTabs;
  /** ISO timestamp, used for "newest first" ordering. */
  createdAt: string;
}

export interface Destination {
  name: string;
  slug: string;
  tagline: string;
  summary: string;
  heroText: string;
  /** Portrait card image (home slider + destinations grid). */
  cardImage: Media | null;
  /** Full-width hero background on the destination page. */
  heroImage: Media | null;
  tourCount: string;
  bestTimeToVisit: string;
  climate: string;
  startingPrice: string;
  overview: Blocks;
  whyVisit: Blocks;
  topExperiences: Blocks;
  bookingBenefits: Blocks;
  travelNotes: Blocks;
  gallery: Media[];
  /** Related packages, in editor-defined order. */
  packages: Package[];
  /** ISO timestamp; the destinations page lists newest first. */
  createdAt: string;
}

export interface CmsData {
  blogCategories: BlogCategory[];
  blogs: Blog[];
  packages: Package[];
  destinations: Destination[];
}
