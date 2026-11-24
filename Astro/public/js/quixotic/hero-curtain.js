/* Quixotic: inner page hero curtain (GSAP scroll animation; Blog, Packages, Destinations, Destination pages).
   The hero [data-hero-curtain] stays put while the next section slides over it; the photo zooms to 1.08 and dims to
   0.4, the title holds, then moves up 64px and fades. Under 992px the photo only drifts down 30% (parallax). Scrub 0.5.
   Turn off: remove data-hero-curtain from the hero. Reduced motion: off. */
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  if (!window.gsap || !window.ScrollTrigger || !document.querySelector("[data-hero-curtain]")) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  var mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-hero-curtain]", start: "top top", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true } })
      .fromTo("[data-hero-curtain] .hero-bg-image", { scale: 1, opacity: 1 }, { scale: 1.08, opacity: 0.4, duration: 1 }, 0)
      .fromTo("[data-hero-curtain] .page-hero-row, [data-hero-curtain]:not(:has(.page-hero-row)) .page-hero-content", { y: 0, opacity: 1 }, { y: -64, opacity: 0, duration: 0.4 }, 0.25);
  });
  mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", function () {
    gsap.fromTo("[data-hero-curtain]", { yPercent: 0 }, { yPercent: 100, ease: "none", force3D: true,
      scrollTrigger: { trigger: "[data-hero-curtain]", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
  });
  mm.add("(max-width: 991.98px) and (prefers-reduced-motion: no-preference)", function () {
    gsap.fromTo("[data-hero-curtain] .hero-bg-image", { yPercent: 0 }, { yPercent: 30, ease: "none",
      scrollTrigger: { trigger: "[data-hero-curtain]", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
  });
  gsap.delayedCall(0.05, ScrollTrigger.refresh);
});
