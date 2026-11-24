# Quixotic: Travel Agency Astro Theme

Quixotic is a travel agency theme for tour operators: curated destinations, holiday packages, traveler reviews, FAQs and a blog. Content for the travel and blog sections is managed in **Strapi**, with bundled demo content so the theme works out of the box.

- Astro 7, static output, no client-side framework
- 15 pages plus dynamic routes for packages, destinations, blog posts and blog categories
- Strapi 5 CMS integration (optional) with an automatic fallback to bundled content
- GSAP scroll animations, Lenis smooth scroll, a Home preloader and a 3D destination slider
- Working forms through any form endpoint (Formspree, Getform, Basin…)

## Quick start

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

Requires Node.js 22.23.4 or newer (Astro 7).

## Configuration

Copy `.env.example` to `.env`:

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Your production URL, used for canonical links and social-share images. |
| `STRAPI_URL` | Strapi server URL, e.g. `http://localhost:1337`. Leave empty to use the bundled content. |
| `STRAPI_TOKEN` | Optional read-only Strapi API token (build-time only, never sent to the browser). |
| `STRAPI_REQUIRED` | `true` makes the build fail when Strapi is unreachable instead of falling back. |
| `PUBLIC_FORM_ENDPOINT` | Where forms are POSTed. Empty: forms show their success message without sending (demo mode). |

Site name, default SEO title, description and social image live in `src/config/site.ts`.

## Content (Strapi)

Two CMS systems drive the dynamic sections:

| CMS | Collections | Pages |
| --- | --- | --- |
| Travel | Packages, Destinations (destination ↔ packages relation) | `/packages`, `/package/[slug]`, `/destinations`, `/destination/[slug]`, Home slider and region tabs |
| Blog | Blogs, Blog Categories (post → category relation) | `/blog`, `/blog/[slug]`, `/blog-category/[slug]`, Home latest posts |

The Strapi project lives in `../strapi` (see its README). Start it, then set `STRAPI_URL` and run `npm run dev` or `npm run build`. Content is fetched at build time, so rebuild after publishing changes. A Strapi webhook pointed at your host's build hook automates this.

Without `STRAPI_URL`, pages render from `src/data/cms.json`, the same demo content the Strapi seed imports.

## Project structure

```text
public/
  css/               theme styles (CSS variables at the top of quixotic-astro-theme.webflow.css)
  images/ videos/    static assets (images/cms holds the demo CMS images)
  js/webflow.js      interaction runtime (menus, tabs, sliders, scroll reveals)
  js/vendor/         jQuery, GSAP, ScrollTrigger, SplitText, Lenis, WebFont (self-hosted)
  js/quixotic/       theme scripts: animations, forms, smooth scroll
src/
  components/        one folder per page, plus global/, shared/ and cms/ (cards, rich text, images)
  config/site.ts     site settings and interaction page IDs
  data/cms.json      bundled demo content
  layouts/BaseLayout.astro
  lib/cms/           content loading (Strapi or bundled), ordering rules, Blocks renderer
  pages/             routes
```

The in-site **Instructions** page (`/instructions`) explains colours, components, CMS, forms and every animation script in detail.

## Deployment

The build output in `dist/` is plain static files and can be hosted anywhere (Netlify, Vercel, Cloudflare Pages, GitHub Pages, any web server). Set the environment variables in your host's dashboard.

## Credits

Fonts: Instrument Serif and Plus Jakarta Sans (SIL Open Font License). Photos: Lummi. Videos: Pexels. Icons: Hugeicons. Details on the `/licenses` page.
