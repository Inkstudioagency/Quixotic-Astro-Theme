'use strict';

/**
 * Demo-content importer for the Quixotic theme.
 *
 * Runs once on boot (see src/index.js) when the database has no Destinations yet:
 *  1. uploads every image in data/images to the Media Library (with its alt text),
 *  2. creates Blog Categories, Blogs, Packages and Destinations from data/cms.json
 *     (the same content the Astro theme bundles in src/data/cms.json), published,
 *  3. lets the Public role read (find / findOne) those four collections, so the
 *     Astro site can fetch content without a token.
 *
 * Disable with SEED_DEMO_CONTENT=false.
 */
const fs = require('fs');
const path = require('path');

const MIME = { '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const PUBLIC_READ = ['blog-category', 'blog', 'package', 'destination'];

async function uploadImages(strapi, data, dir) {
  // One Media Library file per image, reused wherever the image appears.
  const alts = new Map();
  JSON.stringify(data, (key, value) => {
    if (value && typeof value === 'object' && typeof value.url === 'string' && value.url.startsWith('/images/cms/')) {
      const name = value.url.split('/').pop();
      if (!alts.has(name) || (!alts.get(name) && value.alt)) alts.set(name, value.alt || '');
    }
    return value;
  });

  const uploader = strapi.plugin('upload').service('upload');
  const ids = new Map();
  for (const [name, alt] of alts) {
    const filepath = path.join(dir, name);
    if (!fs.existsSync(filepath)) {
      strapi.log.warn(`[seed] missing image ${name}`);
      continue;
    }
    const [file] = await uploader.upload({
      data: { fileInfo: { name, alternativeText: alt || null } },
      files: {
        filepath,
        originalFilename: name,
        mimetype: MIME[path.extname(name).toLowerCase()] || 'application/octet-stream',
        size: fs.statSync(filepath).size,
      },
    });
    ids.set(name, file.id);
  }
  strapi.log.info(`[seed] uploaded ${ids.size} images`);
  return (media) => (media && media.url ? ids.get(media.url.split('/').pop()) ?? null : null);
}

async function grantPublicRead(strapi) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  if (!role) return;
  for (const api of PUBLIC_READ) {
    for (const action of ['find', 'findOne']) {
      const name = `api::${api}.${api}.${action}`;
      const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action: name, role: role.id } });
      if (!exists) await strapi.db.query('plugin::users-permissions.permission').create({ data: { action: name, role: role.id } });
    }
  }
  strapi.log.info('[seed] Public role can read blog-categories, blogs, packages and destinations');
}

module.exports = async function seed(strapi) {
  if (process.env.SEED_DEMO_CONTENT === 'false') return;

  const existing = await strapi.documents('api::destination.destination').count();
  if (existing > 0) return;

  const root = strapi.dirs.app.root;
  const dataFile = path.join(root, 'data', 'cms.json');
  if (!fs.existsSync(dataFile)) {
    strapi.log.warn('[seed] data/cms.json not found, skipping demo content');
    return;
  }
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  strapi.log.info('[seed] importing Quixotic demo content…');

  const media = await uploadImages(strapi, data, path.join(root, 'data', 'images'));
  const gallery = (list) => (list || []).map(media).filter(Boolean);
  const create = (uid, fields) => strapi.documents(uid).create({ data: fields, status: 'published' });

  const categoryIds = {};
  for (const c of data.blogCategories) {
    const doc = await create('api::blog-category.blog-category', { name: c.name, slug: c.slug, description: c.description });
    categoryIds[c.slug] = doc.documentId;
  }

  for (const b of data.blogs) {
    await create('api::blog.blog', {
      title: b.title,
      slug: b.slug,
      summary: b.summary,
      thumbnail: media(b.thumbnail),
      authorName: b.authorName,
      authorImage: media(b.authorImage),
      readTime: b.readTime,
      publishedDate: b.publishedDate,
      category: categoryIds[b.category] ?? null,
      contentPart1: b.contentPart1,
      imagePairLeft: media(b.imagePairLeft),
      imagePairRight: media(b.imagePairRight),
      contentPart2: b.contentPart2,
      wideImage: media(b.wideImage),
      contentPart3: b.contentPart3,
    });
  }

  const packageIds = {};
  for (const p of data.packages) {
    const doc = await create('api::package.package', {
      name: p.name,
      slug: p.slug,
      summary: p.summary,
      metaDescription: p.metaDescription,
      thumbnail: media(p.thumbnail),
      gallery: gallery(p.gallery),
      location: p.location,
      duration: p.duration,
      price: p.price,
      rating: p.rating,
      reviewCount: p.reviewCount,
      overview: p.overview,
      inclusions: p.inclusions,
      itinerary: p.itinerary,
      additionalInfo: p.additionalInfo,
      tripType: p.tripType,
      region: p.region,
      homeTabs: p.homeTabs,
    });
    packageIds[p.slug] = doc.documentId;
  }

  // Created in CSV order, so createdAt reproduces the original "newest first" ordering.
  for (const d of data.destinations) {
    await create('api::destination.destination', {
      name: d.name,
      slug: d.slug,
      tagline: d.tagline,
      summary: d.summary,
      heroText: d.heroText,
      cardImage: media(d.cardImage),
      heroImage: media(d.heroImage),
      tourCount: d.tourCount,
      bestTimeToVisit: d.bestTimeToVisit,
      climate: d.climate,
      startingPrice: d.startingPrice,
      overview: d.overview,
      whyVisit: d.whyVisit,
      topExperiences: d.topExperiences,
      bookingBenefits: d.bookingBenefits,
      travelNotes: d.travelNotes,
      gallery: gallery(d.gallery),
      packages: { connect: d.packages.map((slug) => ({ documentId: packageIds[slug] })).filter((x) => x.documentId) },
    });
  }

  await grantPublicRead(strapi);
  strapi.log.info(
    `[seed] done: ${data.blogCategories.length} categories, ${data.blogs.length} blogs, ${data.packages.length} packages, ${data.destinations.length} destinations`,
  );
};
