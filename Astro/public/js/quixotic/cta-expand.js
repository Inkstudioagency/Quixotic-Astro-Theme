/* Quixotic: CTA expand (GSAP scroll animation). The CTA capsule grows into a full-screen photo (100vw x 100vh) while
   the section scrolls past; the stage padding goes to 0 so the photo reaches every screen edge. The photo never scales.
   Hook: data-cta-expand on the CTA component's .section_cta.
   Values: scroll length 230vh, scrub 0.8, start radius per screen size (270.5px / 224px / 24px = half the capsule height).
   Turn off: remove data-cta-expand (the static capsule stays). Reduced motion: off. */
window.Quixotic = window.Quixotic || [];
window.Quixotic.push(function () {
  if (!window.gsap || !window.ScrollTrigger || !document.querySelector("[data-cta-expand]")) return;
  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();
  function expand(radius) {
    return function () {
      gsap.set("[data-cta-expand] .is-cta-track", { height: "230vh" });
      gsap.timeline({ scrollTrigger: { trigger: "[data-cta-expand] .is-cta-track", start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true } })
        .fromTo("[data-cta-expand] .cta-card", { borderRadius: radius }, { width: "100%", height: "100%", maxWidth: "100%", borderRadius: "0px", ease: "none", duration: 1 }, 0)
        .to("[data-cta-expand] .is-cta-stage", { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, ease: "none", duration: 1 }, 0)
        .to({}, { duration: 0.2 });
    };
  }
  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", expand("270.5px"));
  mm.add("(min-width: 480px) and (max-width: 767.98px) and (prefers-reduced-motion: no-preference)", expand("224px"));
  mm.add("(max-width: 479.98px) and (prefers-reduced-motion: no-preference)", expand("24px"));
  gsap.delayedCall(0.05, ScrollTrigger.refresh);
});
