/* Quixotic: number counters (GSAP). Each number is a span with data-counter-number inside its stat; the suffix
   ("+", "K+", "%", "/5") sits in its own span. GSAP counts the number up from 0 once when it scrolls into view.
   Whole numbers: data-counter-number with an empty value. One decimal (4.9): data-counter-number = decimal.
   Turn off: remove data-counter-number from the span (the number stays as typed). Reduced motion: no count-up. */
window.Quixotic = window.Quixotic || [];
window.Quixotic.push(function () {
  if (!window.gsap || !window.ScrollTrigger || !document.querySelector("[data-counter-number]")) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", function () {
    ScrollTrigger.batch("[data-counter-number]:not([data-counter-number='decimal'])", {
      start: "top 88%", once: true,
      onEnter: function (batch) { gsap.from(batch, { textContent: 0, duration: 1.8, ease: "power2.out", snap: { textContent: 1 } }); }
    });
    ScrollTrigger.batch("[data-counter-number='decimal']", {
      start: "top 88%", once: true,
      onEnter: function (batch) { gsap.from(batch, { textContent: 0, duration: 1.8, ease: "power2.out", snap: { textContent: 0.1 } }); }
    });
  });
});
