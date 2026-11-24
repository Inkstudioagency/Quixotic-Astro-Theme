/* Quixotic: packages region slider focus blur (GSAP). The active slide stays sharp; every other slide (aria-hidden)
   blurs 6px, easing 0.5s on each change. The first time a slider comes into view (also after switching tabs) it moves
   one slide on its own and stops, so blurred slides sit on both sides of the active one. Turn off: remove this script. */
window.Quixotic = window.Quixotic || [];
window.Quixotic.push(function () {
  if (!window.gsap) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".region-slider").forEach(function (slider) {
    var slides = slider.querySelectorAll(".w-slide");
    function paint(instant) {
      slides.forEach(function (slide) {
        var off = slide.getAttribute("aria-hidden") === "true";
        gsap.to(slide, { filter: off ? "blur(6px)" : "blur(0px)", duration: instant || reduce ? 0 : 0.5, ease: "power2.out", overwrite: true });
      });
    }
    var observer = new MutationObserver(function () { paint(false); });
    slides.forEach(function (slide) { observer.observe(slide, { attributes: true, attributeFilter: ["aria-hidden"] }); });
    paint(true);
    var next = slider.querySelector(".w-slider-arrow-right");
    if (!next || slides.length < 3 || !("IntersectionObserver" in window)) return;
    var seen = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      seen.disconnect();
      gsap.delayedCall(0.6, function () { next.click(); });
    }, { threshold: 0.4 });
    seen.observe(slider);
  });
});