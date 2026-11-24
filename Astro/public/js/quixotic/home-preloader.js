/* Home preloader (GSAP). On every Home load a small card flips through blurred travel photos, the last one (the hero
   photo) comes into focus, the logo fades and the card grows into the hero card (inset 24px / 20px, 16px radius;
   8px on phones), then the navbar and hero text fade in. Page scrolling is locked (overflow hidden) while it plays.
   The .preloader class is Display: None so the Designer canvas stays visible; this script shows it on the live site.
   Turn off: remove the data-preloader attribute from the Preloader element. Reduced motion: no preloader. */
(function () {
  if (!window.gsap || !document.querySelector("[data-preloader]")) return;
  function finish() {
    gsap.set("[data-preloader]", { display: "none", pointerEvents: "none" });
    gsap.set("html", { clearProps: "overflow" });
    gsap.set(".section_header, .section_hero .hero-heading-block, .section_hero .hero-bottom-block", { clearProps: "opacity,transform,visibility" });
  }
  var mm = gsap.matchMedia();
  mm.add("(min-width: 480px) and (prefers-reduced-motion: no-preference)", function () {
    gsap.set("[data-preloader]", { paddingTop: "20px", paddingBottom: "20px", paddingLeft: "24px", paddingRight: "24px" });
  });
  mm.add("(max-width: 479.98px) and (prefers-reduced-motion: no-preference)", function () {
    gsap.set("[data-preloader]", { paddingTop: "8px", paddingBottom: "8px", paddingLeft: "8px", paddingRight: "8px" });
  });
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    gsap.set("[data-preloader]", { display: "flex" });
    gsap.set(".section_header, .section_hero .hero-heading-block, .section_hero .hero-bottom-block", { opacity: 0 });
    gsap.set("html", { overflow: "hidden" });
    gsap.delayedCall(8, finish);
  });
  window.Webflow = window.Webflow || [];
  window.Webflow.push(function () {
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      gsap.timeline({ onComplete: finish })
        .fromTo("[data-preloader-card]", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0)
        .set("[data-preloader] .preloader-image", { opacity: 0 }, 0).set("[data-preloader] .preloader-image:nth-child(1)", { opacity: 1 }, 0)
        .set("[data-preloader] .preloader-image", { opacity: 0 }, 0.35).set("[data-preloader] .preloader-image:nth-child(2)", { opacity: 1 }, 0.35)
        .set("[data-preloader] .preloader-image", { opacity: 0 }, 0.65).set("[data-preloader] .preloader-image:nth-child(3)", { opacity: 1 }, 0.65)
        .set("[data-preloader] .preloader-image", { opacity: 0 }, 0.95).set("[data-preloader] .preloader-image:nth-child(1)", { opacity: 1 }, 0.95)
        .set("[data-preloader] .preloader-image", { opacity: 0 }, 1.2).set("[data-preloader] .preloader-image:nth-child(2)", { opacity: 1 }, 1.2)
        .set("[data-preloader] .preloader-image", { opacity: 0 }, 1.45).set("[data-preloader] .preloader-image:nth-child(3)", { opacity: 1 }, 1.45)
        .set("[data-preloader] .preloader-image", { opacity: 0 }, 1.7).set("[data-preloader] .preloader-image:nth-child(4)", { opacity: 1 }, 1.7)
        .to("[data-preloader] .preloader-image:nth-child(4)", { filter: "blur(0px)", duration: 0.6, ease: "power2.out" }, 1.8)
        .to("[data-preloader] .preloader-logo", { opacity: 0, duration: 0.35, ease: "power1.out" }, 2.1)
        .to("[data-preloader-card]", { width: "100%", height: "100%", borderRadius: "16px", scale: 1, duration: 0.65, ease: "power4.inOut" }, 2.7)
        .to("[data-preloader]", { backgroundColor: "rgba(0,0,0,0)", duration: 0.35, ease: "none" }, 3.05)
        .to("[data-preloader]", { opacity: 0, duration: 0.5, ease: "power1.out" }, 3.4)
        .fromTo(".section_header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 3.45)
        .fromTo(".section_hero .hero-heading-block, .section_hero .hero-bottom-block", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }, 3.45);
    });
  });
})();
