// Content of the Instructions page. Each section renders with the original
// Instructions layout classes (see Instructions.astro). `html` fields allow <strong>/<code>.

type Block =
  | { type: "p"; html: string }
  | { type: "h3"; text: string }
  | { type: "callout"; html: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; title: string; html: string; code: string };

interface Section {
  id: string;
  nav: string;
  title: string;
  blocks: Block[];
}

export const sections: Section[] = [
  {
    id: "getting-started",
    nav: "Getting started",
    title: "Getting Started",
    blocks: [
      {
        type: "p",
        html: "Quixotic is a static Astro theme. Every page is built from Astro components in <strong>src/components</strong>, the travel and blog content comes from Strapi (or from the bundled demo content when no CMS is connected), and the motion is a handful of small GSAP scripts documented below.",
      },
      {
        type: "ol",
        items: [
          "Install and run: <strong>npm install</strong>, then <strong>npm run dev</strong> and open http://localhost:4321. <strong>npm run build</strong> writes the finished site to <strong>dist/</strong>.",
          "Copy <strong>.env.example</strong> to <strong>.env</strong> and set <strong>SITE_URL</strong> to your domain, so canonical links and social images use absolute URLs.",
          "Open the Style Guide page first. It shows every heading, text size, colour, button and form field the theme uses.",
          "Replace the logo: swap <strong>public/images/quixotic-logo.svg</strong> (used by the Navbar, Footer and Preloader) and the favicons in <strong>public/images</strong>.",
          "Update the site name and default SEO title, description and Open Graph image in <strong>src/config/site.ts</strong>. Each page sets its own title and description on its <strong>BaseLayout</strong>.",
        ],
      },
    ],
  },
  {
    id: "variables",
    nav: "Variables",
    title: "Colours, Spacing And Typography",
    blocks: [
      {
        type: "p",
        html: "Every colour, font, size, line height, letter spacing, spacer and radius is a CSS custom property in the <strong>:root</strong> block at the top of <strong>public/css/quixotic-astro-theme.webflow.css</strong>. Change a variable once and the whole site updates.",
      },
      {
        type: "ul",
        items: [
          "<strong>--_color---*</strong> holds the palettes (Primary, Gray, White, Black and Accent) and the semantic tokens that point to them: text, background, border and button colours.",
          "<strong>--_sizes---*</strong> holds the spacer scale, container widths, radius, blur and preloader sizes. Responsive values are redefined inside the media queries below the root block.",
          "<strong>--_typography---*</strong> holds the two Google font families, weights, the H1 to H6 and paragraph sizes, line heights and letter spacing.",
        ],
      },
      {
        type: "callout",
        html: "To rebrand quickly, change <strong>--_color---primary-color--400</strong> for the magenta accent, <strong>--_color---primary-color--700</strong> for the dark plum sections and <strong>--_color---gray-color--200</strong> for the cream page background. The semantic tokens pick up the new values automatically.",
      },
    ],
  },
  {
    id: "components",
    nav: "Components",
    title: "Components",
    blocks: [
      {
        type: "p",
        html: "Pages in <strong>src/pages</strong> only list their sections. Each section is its own component, grouped by page in <strong>src/components</strong>; shared pieces live in <strong>global</strong>, <strong>shared</strong> and <strong>cms</strong>.",
      },
      {
        type: "ul",
        items: [
          "<strong>Header</strong> and <strong>Footer</strong> (src/components/global) sit on every page through <strong>src/layouts/BaseLayout.astro</strong>. The current page link is highlighted automatically.",
          "<strong>CTA</strong>, <strong>FAQ</strong> and <strong>Testimonials</strong> (src/components/shared) are shared sections used on the Home, About and listing pages.",
          "<strong>BlogCard</strong>, <strong>PackageCard</strong>, <strong>BlogCategoryFilter</strong>, <strong>RichText</strong> and <strong>Img</strong> (src/components/cms) render CMS content wherever it appears.",
        ],
      },
      {
        type: "callout",
        html: "Keep the existing class names when you edit markup: the styles and the scroll animations are attached to them.",
      },
      { type: "h3", text: "Background Videos" },
      {
        type: "p",
        html: "The Home process image, the Testimonials video cards, the About gallery and the Footer wordmark are background videos. Each one has an MP4 and a WebM source plus a poster image in <strong>public/videos</strong>.",
      },
      {
        type: "ul",
        items: [
          "To change a video, replace the three files (keep the names) or update the <strong>data-video-urls</strong>, <strong>data-poster-url</strong> and <strong>source</strong> paths in the component.",
          "The Footer wordmark is a video masked by <strong>public/images/quixotic-footer-wordmark-stencil.svg</strong>; replace that SVG to change the word.",
        ],
      },
    ],
  },
  {
    id: "cms",
    nav: "CMS collections",
    title: "CMS With Strapi",
    blocks: [
      {
        type: "p",
        html: "Two CMS systems power the dynamic pages. Content is read at build time by <strong>src/lib/cms</strong>; set <strong>STRAPI_URL</strong> in .env to use your Strapi server, or leave it empty to use the bundled demo content in <strong>src/data/cms.json</strong>.",
      },
      {
        type: "ul",
        items: [
          "<strong>Travel: Packages</strong>: name, slug, thumbnail, gallery, location, duration, price, rating, review count, summary, overview, inclusions, day-by-day itinerary, additional info and the Home tabs it appears in. Pages: /packages and /package/[slug].",
          "<strong>Travel: Destinations</strong>: name, slug, tagline, card image, hero image, facts, five rich-text sections, gallery and the related Packages (in the order you set). Pages: /destinations and /destination/[slug].",
          "<strong>Blog: Blogs</strong>: title, slug, summary, thumbnail, author, read time, published date, category, three rich-text parts and three inline images. Pages: /blog and /blog/[slug].",
          "<strong>Blog: Blog Categories</strong>: name, slug and description. Each post picks one category; every category gets a /blog-category/[slug] page and a filter tab.",
        ],
      },
      {
        type: "callout",
        html: "The site is static: after publishing changes in Strapi, rebuild it. Point a Strapi webhook (Settings, Webhooks) at your host's build hook to rebuild automatically.",
      },
    ],
  },
  {
    id: "forms",
    nav: "Forms",
    title: "Forms",
    blocks: [
      {
        type: "p",
        html: "The trip search, contact, booking and newsletter forms keep their original markup, success and error messages. <strong>public/js/quixotic/forms.js</strong> sends every submission to the URL in <strong>PUBLIC_FORM_ENDPOINT</strong>.",
      },
      {
        type: "ol",
        items: [
          "Create a form endpoint with any form service (Formspree, Getform, Basin) or your own serverless function.",
          "Set <strong>PUBLIC_FORM_ENDPOINT</strong> in .env and rebuild. Each submission includes the form name and the page path.",
          "Without an endpoint the success message is shown and nothing is sent, so the demo stays usable.",
        ],
      },
    ],
  },
  {
    id: "svg-code",
    nav: "SVG code",
    title: "SVG Icons",
    blocks: [
      {
        type: "p",
        html: "Icons are inline SVGs inside the components, so they inherit the text colour through <strong>currentColor</strong> and need no extra requests.",
      },
      {
        type: "ul",
        items: [
          "To change an icon, replace the &lt;svg&gt; element in the component. Keep <strong>width=\"100%\" height=\"100%\"</strong> so it fills its icon box.",
          "Use <strong>stroke=\"currentColor\"</strong> or <strong>fill=\"currentColor\"</strong> so hover colours keep working, and <strong>aria-hidden=\"true\"</strong> on decorative icons.",
        ],
      },
    ],
  },
  {
    id: "interactions",
    nav: "Interactions",
    title: "Interactions",
    blocks: [
      {
        type: "p",
        html: "Scroll reveals, hover states, the menu, tabs and sliders run on <strong>public/js/webflow.js</strong>, the original interaction runtime. It is matched to each page through the <strong>data-wf-page</strong> and <strong>data-wf-site</strong> IDs in <strong>src/config/site.ts</strong>.",
      },
      {
        type: "ul",
        items: [
          "Elements with <strong>data-reveal</strong>, <strong>section-title</strong> or <strong>page-load-*</strong> attributes fade in on scroll or page load. Remove the attribute to show an element without motion.",
          "When you add a new page, reuse one of the existing <strong>wfPage</strong> values so its reveal animations keep working.",
        ],
      },
      {
        type: "callout",
        html: "Do not change the IDs in src/config/site.ts or edit webflow.js: the animations are bound to them.",
      },
    ],
  },
  {
    id: "preloader-animation",
    nav: "Preloader animation",
    title: "Preloader Animation",
    blocks: [
      {
        type: "p",
        html: "On the Home page a small card flips through blurred travel photos, the last one comes into focus and the card grows into the hero. It is <strong>src/components/global/Preloader.astro</strong>, animated by <strong>public/js/quixotic/home-preloader.js</strong>.",
      },
      {
        type: "ul",
        items: [
          "Change the photos by editing the images inside Preloader.astro; the last image should match the hero photo.",
          "Turn it off by removing <strong>\"home-preloader\"</strong> from the scripts list in src/pages/index.astro. Visitors who prefer reduced motion never see it.",
        ],
      },
    ],
  },
  {
    id: "gsap-animations",
    nav: "GSAP animations",
    title: "GSAP Animations",
    blocks: [
      {
        type: "p",
        html: "GSAP, ScrollTrigger and SplitText are self-hosted in <strong>public/js/vendor</strong>. Each effect is a short script in <strong>public/js/quixotic</strong> with its values and its off switch documented at the top of the file.",
      },
      {
        type: "ul",
        items: [
          "<strong>Every page</strong>: counters.js (number count-up), cta-expand.js (CTA grows to full screen), hero-curtain.js (inner page hero), packages-slide-blur.js and nav-scroll-hide.js.",
          "<strong>Home</strong>: home-coverflow.js (3D destination slider) and home-marquee.js (ribbons and testimonial columns).",
          "<strong>About</strong>: about-hero-gallery.js and about-effects.js (team rise, why spread, awards stack).",
        ],
      },
      {
        type: "callout",
        html: "Site-wide scripts are listed in <strong>siteScripts</strong> in src/layouts/BaseLayout.astro; page scripts are passed with the <strong>scripts</strong> prop of BaseLayout.",
      },
    ],
  },
  {
    id: "lenis",
    nav: "Lenis smooth scroll",
    title: "Lenis Smooth Scroll",
    blocks: [
      {
        type: "p",
        html: "Lenis smooths mouse-wheel scrolling and keeps ScrollTrigger animations in sync. Add <strong>data-lenis-prevent</strong> to an element that needs its own native scroll.",
      },
      {
        type: "code",
        title: "Lenis Smooth Scroll",
        html: "<strong>Lives in:</strong> public/js/quixotic/lenis.js, loaded by BaseLayout. <strong>Values:</strong> lerp 0.1 (lower is smoother), autoRaf true. <strong>Remove:</strong> delete \"lenis\" from siteScripts and the two Lenis lines in BaseLayout; native scrolling takes over and every animation keeps working.",
        code: `var lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
lenis.on("scroll", ScrollTrigger.update);`,
      },
    ],
  },
  {
    id: "custom-code",
    nav: "Custom code",
    title: "Scripts And Environment",
    blocks: [
      {
        type: "p",
        html: "All scripts load at the end of the page in the same order as the original template: jQuery, webflow.js, GSAP, Lenis, then the Quixotic scripts. No framework runs in the browser.",
      },
      {
        type: "code",
        title: "Environment Variables",
        html: "Copy <strong>.env.example</strong> to <strong>.env</strong>. Only <strong>PUBLIC_</strong> variables reach the browser; the Strapi token is used at build time only.",
        code: `SITE_URL=https://www.example.com
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=            # optional read-only API token
STRAPI_REQUIRED=false    # true: fail the build if Strapi is unreachable
PUBLIC_FORM_ENDPOINT=    # e.g. https://formspree.io/f/xxxxxxx`,
      },
    ],
  },
  {
    id: "utility-pages",
    nav: "Utility pages",
    title: "Utility Pages",
    blocks: [
      {
        type: "p",
        html: "The Style Guide, Licenses, Changelog, Instructions and 404 pages are ready to use. Each one sets the <strong>noindex</strong> prop on BaseLayout so search engines skip it.",
      },
      {
        type: "ul",
        items: [
          "The 404 page keeps the shared Navbar and Footer so visitors can always find their way back. Astro serves it for any unknown URL.",
          "Update the Licenses page when you add assets from a new source, and log your own changes on the Changelog page.",
        ],
      },
    ],
  },
];
