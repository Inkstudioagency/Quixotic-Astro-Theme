/* Quixotic: Lenis smooth scroll, synced with Webflow's GSAP ScrollTrigger.
   Turn off: remove "lenis" from siteScripts in src/layouts/BaseLayout.astro. */
window.Quixotic = window.Quixotic || [];
window.Quixotic.push(function () {
  if (!window.Lenis || !window.ScrollTrigger) return;
  var lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
});
