# Quixotic: Travel Agency Astro Theme

Quixotic is a travel agency theme for [Astro](https://astro.build): curated destinations, holiday packages, traveler reviews, FAQs and a blog, with smooth GSAP scroll animations. The travel and blog content is managed in **Strapi**, and bundled demo content means the theme works out of the box with no backend.

**Live demo:** https://quixotic-astro-theme.vercel.app

## Features

- **Astro 7**, static output, no client-side framework
- Home, About, Destinations, Packages, Blog, Contact, Style Guide, Instructions, Licenses, Changelog and 404 pages
- Dynamic routes: `/package/[slug]`, `/destination/[slug]`, `/blog/[slug]`, `/blog-category/[slug]`
- **Strapi 5** CMS with two content systems (Travel and Blog), demo-content seeding and the Strapi MCP server enabled
- GSAP scroll animations, Lenis smooth scroll, a Home preloader, a 3D destination slider and region tabs
- Contact, booking and newsletter forms that post to any form endpoint (Formspree, Getform, Basin…)
- Fully responsive, with per-page SEO titles, descriptions, canonical URLs and Open Graph images

## Project structure

| Folder | What it is |
| --- | --- |
| `Astro/` | The theme: the site you build and deploy |
| `strapi/` | Strapi 5 CMS (Packages, Destinations, Blogs, Blog Categories) with demo-content seed |

## Quick start

Requires **Node.js 22.23.4+**.

```sh
cd Astro
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in Astro/dist
```

The site runs on the bundled demo content until you connect Strapi.

## Use Strapi (optional)

```sh
cd strapi
cp .env.example .env   # replace the "tobemodified" secrets
npm install
npm run develop        # admin: http://localhost:1337/admin
```

The first start imports the demo content. Then set `STRAPI_URL=http://localhost:1337` in `Astro/.env` and rebuild the site. See [`Astro/README.md`](Astro/README.md) and [`strapi/README.md`](strapi/README.md) for all options, including the MCP server.

## Deploy

The repository includes a `vercel.json` that builds `Astro/`. Import the repository in Vercel (or any static host: build command `cd Astro && npm install && npm run build`, output `Astro/dist`) and set `SITE_URL`, plus `STRAPI_URL` and `PUBLIC_FORM_ENDPOINT` if you use them.

## Credits

Design by [Ink Studio](https://inks.studio). Fonts: Instrument Serif and Plus Jakarta Sans (SIL Open Font License). Photos: Lummi. Videos: Pexels. Icons: Hugeicons.
