/* About: hero curtain + gallery zoom (GSAP + ScrollTrigger that Webflow already loads).
   Hero [data-about-hero-scroll], 992px and up: the hero stays put while the Story panel slides over it; the photo zooms
   to 1.08 and dims to 0.4 (scrub 0.5), the title scrolls up with the page and fades over the first 40%.
   Under 992px: the photo drifts down 30%, the title moves up 64px and fades.
   Gallery [data-about-gallery-zoom], 992px and up: the section is 300vh tall with a sticky row; the centre tile
   [data-gallery-zoom-tile] grows to the full row (width / height 100%, radius 16px to 0) over the first 80vh of scroll and
   pushes the side tiles out; the photo / Background Video inside stays cover-fitted, never stretched. Under 992px: static row.
   Turn off: remove the attribute from the section. Reduced motion: nothing runs. */
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  var mm = gsap.matchMedia();
  if (document.querySelector("[data-about-hero-scroll]")) {
    mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.fromTo("[data-about-hero-scroll]", { yPercent: 0 }, { yPercent: 100, ease: "none", force3D: true,
        scrollTrigger: { trigger: "[data-about-hero-scroll]", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
      gsap.fromTo("[data-about-hero-scroll] .hero-bg-image", { scale: 1, opacity: 1 }, { scale: 1.08, opacity: 0.4, ease: "none",
        scrollTrigger: { trigger: "[data-about-hero-scroll]", start: "top top", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true } });
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-about-hero-scroll]", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } })
        .fromTo("[data-about-hero-scroll] .page-hero-content", { y: 0 }, { y: "-100vh", duration: 1 }, 0)
        .fromTo("[data-about-hero-scroll] .page-hero-content", { opacity: 1 }, { opacity: 0, duration: 0.4 }, 0);
    });
    mm.add("(max-width: 991.98px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.fromTo("[data-about-hero-scroll] .hero-bg-image", { yPercent: 0 }, { yPercent: 30, ease: "none",
        scrollTrigger: { trigger: "[data-about-hero-scroll]", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-about-hero-scroll]", start: "top top", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true } })
        .fromTo("[data-about-hero-scroll] .hero-bg-image", { scale: 1, opacity: 1 }, { scale: 1.08, opacity: 0.4, duration: 1 }, 0)
        .fromTo("[data-about-hero-scroll] .page-hero-content", { y: 0, opacity: 1 }, { y: -64, opacity: 0, duration: 0.4 }, 0.25);
    });
  }
  if (document.querySelector("[data-about-gallery-zoom] [data-gallery-zoom-tile]")) {
    mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.set("[data-about-gallery-zoom]", { minHeight: "300vh", paddingBottom: 0 });
      gsap.set("[data-about-gallery-zoom] + *", { marginTop: "-100vh" });
      gsap.set("[data-gallery-zoom-tile]", { zIndex: 2 });
      gsap.fromTo("[data-gallery-zoom-tile]", { borderRadius: "16px" }, { width: "100%", height: "100%", borderRadius: "0px", ease: "none",
        scrollTrigger: { trigger: "[data-about-gallery-zoom]", start: "top top", end: "+=80%", scrub: 0.5, invalidateOnRefresh: true } });
    });
  }
  gsap.delayedCall(0.05, ScrollTrigger.refresh);
});
