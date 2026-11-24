/* Quixotic: navbar hide on scroll (GSAP). Scrolling down past 120px slides the .section_header fully above the screen
   (its own height + top offset + 40px, so its shadow is gone too); scrolling up (6px or more) brings it back.
   Slide: 0.9s sine.out, soft enough to match Lenis smooth scroll.
   It stays visible while the menu is open or a nav control has keyboard focus. Turn off: remove this script.
   Reduced motion: instant (no slide). */
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  var header = document.querySelector(".section_header");
  if (!window.gsap || !header) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var last = window.scrollY, hidden = false;
  function held() {
    var pop = header.querySelector(".nav-popover");
    try { return (!!pop && pop.matches(":popover-open")) || !!header.querySelector(":focus-visible"); } catch (e) { return false; }
  }
  function offset() {
    var bar = header.querySelector(".nav-wrapper") || header;
    return -(bar.getBoundingClientRect().bottom - (gsap.getProperty(header, "y") || 0) + 40);
  }
  function set(hide) {
    if (hide === hidden) return;
    hidden = hide;
    gsap.to(header, { y: hide ? offset() : 0, duration: reduce ? 0 : 0.9, ease: "sine.out", overwrite: "auto" });
  }
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (held()) { set(false); last = y; return; }
    if (Math.abs(y - last) < 6) return;
    set(y > last && y > 120);
    last = y;
  }, { passive: true });
  header.addEventListener("focusin", function () { if (held()) set(false); });
});