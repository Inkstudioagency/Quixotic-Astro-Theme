# Quixotic CMS (Strapi 5)

Strapi backend for the Quixotic Astro theme. It provides the two CMS systems the theme renders:

| CMS | Content type | Key fields |
| --- | --- | --- |
| Travel | **Package** (`api::package.package`) | name, slug, summary, thumbnail, gallery, location, duration, price, rating, review count, overview (Blocks), `inclusions` component, repeatable `itinerary` day component, additional info, `homeTabs` component (which Home region tabs show it) |
| Travel | **Destination** (`api::destination.destination`) | name, slug, tagline, card image, hero image, facts, five Blocks rich-text sections, gallery, **packages** (many-to-many, ordered) |
| Blog | **Blog** (`api::blog.blog`) | title, slug, summary, thumbnail, author name and image, read time, published date, **category** (many-to-one), three Blocks content parts, three inline images |
| Blog | **Blog Category** (`api::blog-category.blog-category`) | name, slug, description |

Components: `travel.inclusions`, `travel.itinerary-day`, `travel.home-tabs`. All types use Draft & Publish; the site only shows published entries.

## Run it

```sh
cp .env.example .env    # then replace every "tobemodified" secret
npm install
npm run develop         # admin at http://localhost:1337/admin
```

On first boot `src/seed.js` imports the demo content from `data/cms.json` and `data/images` (the same content the theme bundles), publishes it, and gives the **Public** role read access (`find`, `findOne`) to the four collections. Set `SEED_DEMO_CONTENT=false` to start empty.

Then in the Astro project set `STRAPI_URL=http://localhost:1337` and run `npm run dev` or `npm run build`.

If you prefer a private API, remove the Public permissions, create a read-only API token (Settings > API Tokens) and set it as `STRAPI_TOKEN` in the Astro `.env`.

## Strapi MCP server

The MCP server is enabled in `config/server.js` (`mcp.enabled`, needs Strapi 5.47+). It lets AI clients list, create, update and publish entries and manage the Media Library, using tools generated per content type (`list_package`, `create_blog`, `publish_destination`, …).

1. In the admin panel create an **Admin token** (Settings > Admin tokens) with only the permissions the client needs, and copy it.
2. Connect a client, e.g. Claude Code:

   ```sh
   claude mcp add strapi-mcp --transport http http://localhost:1337/mcp -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```

The MCP server manages entries and media only. Content-type schemas live in `src/api/*/content-types` and `src/components` (edit them in code or with the Content-Type Builder in development). File uploads go through the Media Library first. See https://docs.strapi.io/cms/features/strapi-mcp-server.

## Rebuilding the site on publish

The Astro site is static. Add a webhook (Settings > Webhooks) on entry publish/unpublish that calls your host's build hook (Netlify, Vercel, Cloudflare Pages).

## Deploying

Any Node.js host works (Strapi Cloud, Render, Railway, a VPS). For production use PostgreSQL or MySQL (`DATABASE_CLIENT` and related variables in `.env`) instead of the default SQLite file, and a cloud upload provider if the host's disk is not persistent.
