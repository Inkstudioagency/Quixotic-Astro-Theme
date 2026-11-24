/* Home marquee loops (GSAP). Each [data-marquee] track holds two identical groups and loops by 50% of its width
   (left / right) or height (up / down). The duration (seconds) of each track per screen size is written in the tweens:
   ribbon 1, ribbon 2 (lavender, runs right), ribbon 3 (coral), Discover row, testimonial columns 1-3 (column 2 runs down).
   The horizontal tracks reverse while the visitor scrolls up and drift 80px with the scroll.
   Turn off: remove data-marquee from a track. Reduced motion: off. */
window.Quixotic = window.Quixotic || [];
window.Quixotic.push(function () {
  if (!window.gsap || !window.ScrollTrigger || !document.querySelector("[data-marquee]")) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  var mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    gsap.fromTo(".ribbon-band:not(.is-lavender):not(.is-coral) > [data-marquee]", { x: 80 }, { x: -80, ease: "none", scrollTrigger: { trigger: ".ribbon-band:not(.is-lavender):not(.is-coral)", start: "top bottom", end: "bottom top", scrub: 0.6 } });
    gsap.fromTo(".ribbon-band.is-lavender > [data-marquee]", { x: -80 }, { x: 80, ease: "none", scrollTrigger: { trigger: ".ribbon-band.is-lavender", start: "top bottom", end: "bottom top", scrub: 0.6 } });
    gsap.fromTo(".ribbon-band.is-coral > [data-marquee]", { x: 80 }, { x: -80, ease: "none", scrollTrigger: { trigger: ".ribbon-band.is-coral", start: "top bottom", end: "bottom top", scrub: 0.6 } });
    gsap.fromTo(".section_discover > [data-marquee]", { x: 80 }, { x: -80, ease: "none", scrollTrigger: { trigger: ".section_discover", start: "top bottom", end: "bottom top", scrub: 0.6 } });
  });
  mm.add("(min-width: 1440px) and (prefers-reduced-motion: no-preference)", function () {
    var loops = gsap.timeline()
      .fromTo(".ribbon-band:not(.is-lavender):not(.is-coral) > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 32.04, ease: "none", repeat: -1 }, 0)
      .fromTo(".ribbon-band.is-lavender > [data-marquee]", { xPercent: -50 }, { xPercent: 0, duration: 20.64, ease: "none", repeat: -1 }, 0)
      .fromTo(".ribbon-band.is-coral > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 27.34, ease: "none", repeat: -1 }, 0)
      .fromTo(".section_discover > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 45.49, ease: "none", repeat: -1 }, 0)
      .time(600);
    gsap.fromTo(".testimonial-column:not(.is-second):not(.is-third) > [data-marquee]", { yPercent: 0 }, { yPercent: -50, duration: 60.45, ease: "none", repeat: -1 });
    gsap.fromTo(".testimonial-column.is-second > [data-marquee]", { yPercent: -50 }, { yPercent: 0, duration: 69.06, ease: "none", repeat: -1 });
    gsap.fromTo(".testimonial-column.is-third > [data-marquee]", { yPercent: 0 }, { yPercent: -50, duration: 39.68, ease: "none", repeat: -1 });
    ScrollTrigger.observe({ target: window, type: "scroll",
      onUp: function () { gsap.to(loops, { timeScale: -1, duration: 0.6, ease: "power2.out", overwrite: true }); },
      onDown: function () { gsap.to(loops, { timeScale: 1, duration: 0.6, ease: "power2.out", overwrite: true }); } });
  });
  mm.add("(min-width: 768px) and (max-width: 1439.98px) and (prefers-reduced-motion: no-preference)", function () {
    var loops = gsap.timeline()
      .fromTo(".ribbon-band:not(.is-lavender):not(.is-coral) > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 28.36, ease: "none", repeat: -1 }, 0)
      .fromTo(".ribbon-band.is-lavender > [data-marquee]", { xPercent: -50 }, { xPercent: 0, duration: 18.86, ease: "none", repeat: -1 }, 0)
      .fromTo(".ribbon-band.is-coral > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 24.44, ease: "none", repeat: -1 }, 0)
      .fromTo(".section_discover > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 37.77, ease: "none", repeat: -1 }, 0)
      .time(600);
    gsap.fromTo(".testimonial-column:not(.is-second):not(.is-third) > [data-marquee]", { yPercent: 0 }, { yPercent: -50, duration: 67.36, ease: "none", repeat: -1 });
    gsap.fromTo(".testimonial-column.is-second > [data-marquee]", { yPercent: -50 }, { yPercent: 0, duration: 81.72, ease: "none", repeat: -1 });
    gsap.fromTo(".testimonial-column.is-third > [data-marquee]", { yPercent: 0 }, { yPercent: -50, duration: 42.32, ease: "none", repeat: -1 });
    ScrollTrigger.observe({ target: window, type: "scroll",
      onUp: function () { gsap.to(loops, { timeScale: -1, duration: 0.6, ease: "power2.out", overwrite: true }); },
      onDown: function () { gsap.to(loops, { timeScale: 1, duration: 0.6, ease: "power2.out", overwrite: true }); } });
  });
  mm.add("(min-width: 480px) and (max-width: 767.98px) and (prefers-reduced-motion: no-preference)", function () {
    var loops = gsap.timeline()
      .fromTo(".ribbon-band:not(.is-lavender):not(.is-coral) > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 24.5, ease: "none", repeat: -1 }, 0)
      .fromTo(".ribbon-band.is-lavender > [data-marquee]", { xPercent: -50 }, { xPercent: 0, duration: 16.27, ease: "none", repeat: -1 }, 0)
      .fromTo(".ribbon-band.is-coral > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 21.11, ease: "none", repeat: -1 }, 0)
      .fromTo(".section_discover > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 28.97, ease: "none", repeat: -1 }, 0)
      .time(600);
    gsap.fromTo(".testimonial-column:not(.is-second):not(.is-third) > [data-marquee]", { yPercent: 0 }, { yPercent: -50, duration: 60.57, ease: "none", repeat: -1 });
    gsap.fromTo(".testimonial-column.is-second > [data-marquee]", { yPercent: -50 }, { yPercent: 0, duration: 70.14, ease: "none", repeat: -1 });
    ScrollTrigger.observe({ target: window, type: "scroll",
      onUp: function () { gsap.to(loops, { timeScale: -1, duration: 0.6, ease: "power2.out", overwrite: true }); },
      onDown: function () { gsap.to(loops, { timeScale: 1, duration: 0.6, ease: "power2.out", overwrite: true }); } });
  });
  mm.add("(max-width: 479.98px) and (prefers-reduced-motion: no-preference)", function () {
    var loops = gsap.timeline()
      .fromTo(".ribbon-band:not(.is-lavender):not(.is-coral) > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 16.47, ease: "none", repeat: -1 }, 0)
      .fromTo(".ribbon-band.is-lavender > [data-marquee]", { xPercent: -50 }, { xPercent: 0, duration: 10.45, ease: "none", repeat: -1 }, 0)
      .fromTo(".ribbon-band.is-coral > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 13.99, ease: "none", repeat: -1 }, 0)
      .fromTo(".section_discover > [data-marquee]", { xPercent: 0 }, { xPercent: -50, duration: 18.32, ease: "none", repeat: -1 }, 0)
      .time(600);
    gsap.fromTo(".testimonial-column:not(.is-second):not(.is-third) > [data-marquee]", { yPercent: 0 }, { yPercent: -50, duration: 49.18, ease: "none", repeat: -1 });
    ScrollTrigger.observe({ target: window, type: "scroll",
      onUp: function () { gsap.to(loops, { timeScale: -1, duration: 0.6, ease: "power2.out", overwrite: true }); },
      onDown: function () { gsap.to(loops, { timeScale: 1, duration: 0.6, ease: "power2.out", overwrite: true }); } });
  });
});
