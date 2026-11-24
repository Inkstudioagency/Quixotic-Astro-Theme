/* About: team rise + why spread + awards stack (GSAP + ScrollTrigger + SplitText that Webflow already loads).
   Turn off one effect: remove its attribute (Settings > Custom attributes): data-about-team-rise (section_about-team),
   data-about-why-spread (section_about-why), data-about-awards-stack (section_about-awards).
   992px and up = scrubbed effects (scrub 0.5); under 992px = cards fade up 32px once; reduced motion = static.
   Team: the photo row pins (80vh); each arched photo grows from 30% of its height (clip-path) left to right (stagger
   0.17) and its name box rides on the photo's bottom edge (from -224px = 70% of the 320px photo). Pin position by
   screen height: under 604px bottom - 24px, 604-899px centred + 50px, 900-975px top 100px, 976px+ centred.
   Why: the ring scales in, the four cards grow out of their inner corner, the heading letters brighten, button last.
   Awards (4 cards): the stack pins under its heading (240vh); each card slides up over the previous one and every covered
   card steps back (scale -0.06, y -20px, content opacity -0.2 per level, min 0.5). On short screens the stack scales
   down to fit (0.4 to 1 by screen height); the incoming card starts one screen (100vh divided by that scale) below. */
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  var mm = gsap.matchMedia();
  mm.add("(max-width: 991.98px) and (prefers-reduced-motion: no-preference)", function () {
    gsap.set("[data-about-team-rise] .about-team-card, [data-about-why-spread] .about-why-card, [data-about-awards-stack] .about-award-card", { autoAlpha: 0, y: 32 });
    ScrollTrigger.batch("[data-about-team-rise] .about-team-card, [data-about-why-spread] .about-why-card, [data-about-awards-stack] .about-award-card", {
      start: "top 92%", once: true,
      onEnter: function (batch) { gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }); }
    });
  });
  /* 1. Team */
  if (document.querySelector("[data-about-team-rise] .about-team-grid")) {
    mm.add("(min-width: 992px) and (max-height: 603.98px) and (prefers-reduced-motion: no-preference)", function () {
      ScrollTrigger.create({ trigger: "[data-about-team-rise] .about-team-grid", pin: true, pinSpacing: true, invalidateOnRefresh: true, start: "bottom bottom-=24", end: "+=80%" });
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-about-team-rise] .about-section-wrapper", start: "top bottom", endTrigger: "[data-about-team-rise] .about-team-grid", end: "bottom 20%-=24", scrub: 0.5, invalidateOnRefresh: true, refreshPriority: -1 } })
        .fromTo("[data-about-team-rise] .about-team-image-wrap", { clipPath: "inset(0% 0% 70% 0% round 0px 0px 12px 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px 0px 12px 12px)", duration: 0.49, stagger: 0.17 }, 0)
        .fromTo("[data-about-team-rise] .about-team-info", { y: -224 }, { y: 0, duration: 0.49, stagger: 0.17 }, 0);
    });
    mm.add("(min-width: 992px) and (min-height: 604px) and (max-height: 899.98px) and (prefers-reduced-motion: no-preference)", function () {
      ScrollTrigger.create({ trigger: "[data-about-team-rise] .about-team-grid", pin: true, pinSpacing: true, invalidateOnRefresh: true, start: "center center+=50", end: "+=80%" });
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-about-team-rise] .about-section-wrapper", start: "top bottom", endTrigger: "[data-about-team-rise] .about-team-grid", end: "center -30%+=50", scrub: 0.5, invalidateOnRefresh: true, refreshPriority: -1 } })
        .fromTo("[data-about-team-rise] .about-team-image-wrap", { clipPath: "inset(0% 0% 70% 0% round 0px 0px 12px 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px 0px 12px 12px)", duration: 0.49, stagger: 0.17 }, 0)
        .fromTo("[data-about-team-rise] .about-team-info", { y: -224 }, { y: 0, duration: 0.49, stagger: 0.17 }, 0);
    });
    mm.add("(min-width: 992px) and (min-height: 900px) and (max-height: 975.98px) and (prefers-reduced-motion: no-preference)", function () {
      ScrollTrigger.create({ trigger: "[data-about-team-rise] .about-section-wrapper", pin: true, pinSpacing: true, invalidateOnRefresh: true, start: "top 100px", end: "+=80%" });
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-about-team-rise] .about-section-wrapper", start: "top bottom", end: "top -80%+=100", scrub: 0.5, invalidateOnRefresh: true, refreshPriority: -1 } })
        .fromTo("[data-about-team-rise] .about-team-image-wrap", { clipPath: "inset(0% 0% 70% 0% round 0px 0px 12px 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px 0px 12px 12px)", duration: 0.49, stagger: 0.17 }, 0)
        .fromTo("[data-about-team-rise] .about-team-info", { y: -224 }, { y: 0, duration: 0.49, stagger: 0.17 }, 0);
    });
    mm.add("(min-width: 992px) and (min-height: 976px) and (prefers-reduced-motion: no-preference)", function () {
      ScrollTrigger.create({ trigger: "[data-about-team-rise] .about-section-wrapper", pin: true, pinSpacing: true, invalidateOnRefresh: true, start: "center center", end: "+=80%" });
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-about-team-rise] .about-section-wrapper", start: "top bottom", end: "center -30%", scrub: 0.5, invalidateOnRefresh: true, refreshPriority: -1 } })
        .fromTo("[data-about-team-rise] .about-team-image-wrap", { clipPath: "inset(0% 0% 70% 0% round 0px 0px 12px 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px 0px 12px 12px)", duration: 0.49, stagger: 0.17 }, 0)
        .fromTo("[data-about-team-rise] .about-team-info", { y: -224 }, { y: 0, duration: 0.49, stagger: 0.17 }, 0);
    });
  }
  /* 2. Why */
  if (document.querySelector("[data-about-why-spread] .about-why-grid")) {
    mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", function () {
      var wt = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-about-why-spread] .about-why-grid", start: "top 80%", end: "center 55%", scrub: 0.5 } })
        .fromTo("[data-about-why-spread] .about-why-ring", { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5 }, 0)
        .fromTo("[data-about-why-spread] .about-why-column:first-child .about-why-card:first-child", { scale: 0.6, x: "2rem", autoAlpha: 0, transformOrigin: "100% 100%" }, { scale: 1, x: 0, autoAlpha: 1, duration: 0.55 }, 0.1)
        .fromTo("[data-about-why-spread] .about-why-column:first-child .about-why-card:last-child", { scale: 0.6, x: "2rem", autoAlpha: 0, transformOrigin: "100% 0%" }, { scale: 1, x: 0, autoAlpha: 1, duration: 0.55 }, 0.25)
        .fromTo("[data-about-why-spread] .about-why-column:last-child .about-why-card:first-child", { scale: 0.6, x: "-2rem", autoAlpha: 0, transformOrigin: "0% 100%" }, { scale: 1, x: 0, autoAlpha: 1, duration: 0.55 }, 0.15)
        .fromTo("[data-about-why-spread] .about-why-column:last-child .about-why-card:last-child", { scale: 0.6, x: "-2rem", autoAlpha: 0, transformOrigin: "0% 0%" }, { scale: 1, x: 0, autoAlpha: 1, duration: 0.55 }, 0.3)
        .fromTo("[data-about-why-spread] .about-why-content .secondary-button", { autoAlpha: 0, y: "1rem" }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.8);
      if (window.SplitText) {
        var split = new SplitText("[data-about-why-spread] .about-why-content h2", { type: "words,chars" });
        wt.fromTo(split.chars, { opacity: 0.25 }, { opacity: 1, duration: 0.5, stagger: { amount: 0.3 } }, 0.1);
      }
    });
  }
  /* 3. Awards: one block per screen-height band (stack scale, pin position, incoming card start) */
  if (document.querySelector("[data-about-awards-stack] .about-awards-grid")) {
    mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.set("[data-about-awards-stack] .about-section-wrapper", { rowGap: "2rem" });
      gsap.set("[data-about-awards-stack] .about-awards-grid", { display: "grid", gridTemplateColumns: "22rem", gridTemplateRows: "auto", justifyContent: "center", paddingTop: 60, transformOrigin: "50% 0%" });
      gsap.set("[data-about-awards-stack] .about-award-card", { gridArea: "1 / 1", transformOrigin: "50% 0%" });
    });
    mm.add("(min-width: 992px) and (max-height: 639.98px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.set("[data-about-awards-stack] .about-awards-grid", { scale: 0.4, marginBottom: -304.8 });
      gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: { trigger: "[data-about-awards-stack] .about-section-wrapper", pin: true, pinSpacing: true, scrub: 0.5, invalidateOnRefresh: true, start: "top 112px", end: "+=240%" } })
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(2)", { y: "250vh" }, { y: 0 }, 0)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(3)", { y: "250vh" }, { y: 0 }, 1)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(4)", { y: "250vh" }, { y: 0 }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }, { scale: 0.82, y: -60, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }, { opacity: 0.5, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3)", { scale: 0.94, y: -20, ease: "none" }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3) > *", { opacity: 0.8, ease: "none" }, 2)
        .to({}, { duration: 0.3 });
    });
    mm.add("(min-width: 992px) and (min-height: 640px) and (max-height: 719.98px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.set("[data-about-awards-stack] .about-awards-grid", { scale: 0.5, marginBottom: -254 });
      gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: { trigger: "[data-about-awards-stack] .about-section-wrapper", pin: true, pinSpacing: true, scrub: 0.5, invalidateOnRefresh: true, start: "top 112px", end: "+=240%" } })
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(2)", { y: "200vh" }, { y: 0 }, 0)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(3)", { y: "200vh" }, { y: 0 }, 1)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(4)", { y: "200vh" }, { y: 0 }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }, { scale: 0.82, y: -60, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }, { opacity: 0.5, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3)", { scale: 0.94, y: -20, ease: "none" }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3) > *", { opacity: 0.8, ease: "none" }, 2)
        .to({}, { duration: 0.3 });
    });
    mm.add("(min-width: 992px) and (min-height: 720px) and (max-height: 799.98px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.set("[data-about-awards-stack] .about-awards-grid", { scale: 0.66, marginBottom: -172.72 });
      gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: { trigger: "[data-about-awards-stack] .about-section-wrapper", pin: true, pinSpacing: true, scrub: 0.5, invalidateOnRefresh: true, start: "top 112px", end: "+=240%" } })
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(2)", { y: "151.5vh" }, { y: 0 }, 0)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(3)", { y: "151.5vh" }, { y: 0 }, 1)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(4)", { y: "151.5vh" }, { y: 0 }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }, { scale: 0.82, y: -60, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }, { opacity: 0.5, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3)", { scale: 0.94, y: -20, ease: "none" }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3) > *", { opacity: 0.8, ease: "none" }, 2)
        .to({}, { duration: 0.3 });
    });
    mm.add("(min-width: 992px) and (min-height: 800px) and (max-height: 899.98px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.set("[data-about-awards-stack] .about-awards-grid", { scale: 0.82, marginBottom: -91.44 });
      gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: { trigger: "[data-about-awards-stack] .about-section-wrapper", pin: true, pinSpacing: true, scrub: 0.5, invalidateOnRefresh: true, start: "top 112px", end: "+=240%" } })
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(2)", { y: "122vh" }, { y: 0 }, 0)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(3)", { y: "122vh" }, { y: 0 }, 1)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(4)", { y: "122vh" }, { y: 0 }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }, { scale: 0.82, y: -60, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }, { opacity: 0.5, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3)", { scale: 0.94, y: -20, ease: "none" }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3) > *", { opacity: 0.8, ease: "none" }, 2)
        .to({}, { duration: 0.3 });
    });
    mm.add("(min-width: 992px) and (min-height: 900px) and (max-height: 979.98px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: { trigger: "[data-about-awards-stack] .about-section-wrapper", pin: true, pinSpacing: true, scrub: 0.5, invalidateOnRefresh: true, start: "top 112px", end: "+=240%" } })
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(2)", { y: "100vh" }, { y: 0 }, 0)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(3)", { y: "100vh" }, { y: 0 }, 1)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(4)", { y: "100vh" }, { y: 0 }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }, { scale: 0.82, y: -60, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }, { opacity: 0.5, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3)", { scale: 0.94, y: -20, ease: "none" }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3) > *", { opacity: 0.8, ease: "none" }, 2)
        .to({}, { duration: 0.3 });
    });
    mm.add("(min-width: 992px) and (min-height: 980px) and (prefers-reduced-motion: no-preference)", function () {
      gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: { trigger: "[data-about-awards-stack] .about-section-wrapper", pin: true, pinSpacing: true, scrub: 0.5, invalidateOnRefresh: true, start: "center center", end: "+=240%" } })
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(2)", { y: "100vh" }, { y: 0 }, 0)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(3)", { y: "100vh" }, { y: 0 }, 1)
        .fromTo("[data-about-awards-stack] .about-award-card:nth-child(4)", { y: "100vh" }, { y: 0 }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }, { scale: 0.82, y: -60, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(1) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }, { opacity: 0.5, ease: "none" }], duration: 3 }, 0)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2)", { keyframes: [{ scale: 0.94, y: -20, ease: "none" }, { scale: 0.88, y: -40, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(2) > *", { keyframes: [{ opacity: 0.8, ease: "none" }, { opacity: 0.6, ease: "none" }], duration: 2 }, 1)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3)", { scale: 0.94, y: -20, ease: "none" }, 2)
        .to("[data-about-awards-stack] .about-award-card:nth-child(3) > *", { opacity: 0.8, ease: "none" }, 2)
        .to({}, { duration: 0.3 });
    });
  }
  gsap.delayedCall(0.1, function () { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
});
