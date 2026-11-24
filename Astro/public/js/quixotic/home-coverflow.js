/* Home destinations 3D slider (GSAP) with arrow + dot navigation. The [data-dest-coverflow] Collection List becomes a
   3D coverflow: the middle card faces you, each side card turns 30deg, sits 60px further back and dims to 75%. Every
   1.5s the row glides one card along (0.7s, power2.inOut) in an endless loop, only while the section is on screen.
   Navigation below the slider ([data-dest-nav]): [data-dest-prev] / [data-dest-next] buttons move one card; the dots
   wrapper [data-dest-dots] holds one styled dot ([data-dest-dot]) that is copied once per destination, the active dot
   gets the is-active combo class. Autoplay pauses while the visitor hovers the slider or focuses a control.
   Card gap: 20px (5px under 768px). Built for 6 items. Turn off: remove data-dest-coverflow from the Collection List
   (the native swipe row comes back). Reduced motion: no 3D slider, controls hidden. */
window.Quixotic = window.Quixotic || [];
window.Quixotic.push(function () {
  var root = document.querySelector("[data-dest-coverflow]");
  if (!window.gsap || !window.ScrollTrigger || !root) return;
  gsap.registerPlugin(ScrollTrigger);
  var items = root.querySelectorAll(".w-dyn-item");
  var count = items.length;
  var nav = document.querySelector("[data-dest-nav]");
  var BASE = 609, pos = 0, loop = null, timer = null, onScreen = false, hold = false, dots = [];
  function index() { return ((pos % count) + count) % count; }
  function paint() {
    dots.forEach(function (dot, i) {
      var on = i === index();
      dot.classList.toggle("is-active", on);
      dot.setAttribute("aria-current", on ? "true" : "false");
    });
  }
  function autoplay() {
    if (timer) timer.kill();
    timer = loop && onScreen && !hold ? gsap.delayedCall(1.5, function () { go(1); }) : null;
  }
  function go(steps) {
    pos += steps;
    paint();
    if (loop) gsap.to(loop, { time: BASE + pos, duration: Math.min(0.7 + 0.15 * (Math.abs(steps) - 1), 1.2), ease: "power2.inOut", overwrite: true });
    autoplay();
  }
  if (nav) {
    var wrap = nav.querySelector("[data-dest-dots]");
    var tpl = wrap && wrap.querySelector("[data-dest-dot]");
    if (tpl) {
      wrap.innerHTML = "";
      items.forEach(function (item, i) {
        var dot = tpl.cloneNode(true);
        var title = item.querySelector(".destination-coverflow-title");
        dot.setAttribute("aria-label", "Go to " + (title ? title.textContent.trim() : "destination " + (i + 1)));
        dot.addEventListener("click", function () {
          var d = (((i - index()) % count) + count) % count;
          if (d > count / 2) d -= count;
          if (d) go(d);
        });
        wrap.appendChild(dot);
        dots.push(dot);
      });
    }
    var prev = nav.querySelector("[data-dest-prev]"), next = nav.querySelector("[data-dest-next]");
    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    nav.addEventListener("focusin", function () { hold = true; autoplay(); });
    nav.addEventListener("focusout", function () { hold = false; autoplay(); });
    paint();
  }
  root.addEventListener("mouseenter", function () { hold = true; autoplay(); });
  root.addEventListener("mouseleave", function () { hold = false; autoplay(); });
  ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: function (self) { onScreen = self.isActive; autoplay(); } });
  function build(g) {
    loop = gsap.timeline({ paused: true })
      .to(items, {
        keyframes: {
          "0%": { xPercent: 300, x: 3 * g, z: -180, rotationY: -90, autoAlpha: 0, zIndex: 70 },
          "8.333%": { xPercent: 250, x: 2.5 * g, z: -150, rotationY: -75, autoAlpha: 1, zIndex: 75 },
          "16.667%": { xPercent: 200, x: 2 * g, z: -120, rotationY: -60, autoAlpha: 1, zIndex: 80 },
          "33.333%": { xPercent: 100, x: g, z: -60, rotationY: -30, autoAlpha: 1, zIndex: 90 },
          "50%": { xPercent: 0, x: 0, z: 0, rotationY: 0, autoAlpha: 1, zIndex: 100 },
          "66.667%": { xPercent: -100, x: -g, z: -60, rotationY: 30, autoAlpha: 1, zIndex: 90 },
          "83.333%": { xPercent: -200, x: -2 * g, z: -120, rotationY: 60, autoAlpha: 1, zIndex: 80 },
          "91.667%": { xPercent: -250, x: -2.5 * g, z: -150, rotationY: 75, autoAlpha: 1, zIndex: 75 },
          "100%": { xPercent: -300, x: -3 * g, z: -180, rotationY: 90, autoAlpha: 0, zIndex: 70 },
          easeEach: "none"
        },
        snap: { zIndex: 1 }, duration: 6, ease: "none", stagger: { each: 1, repeat: -1 }
      }, 0)
      .to(root.querySelectorAll(".w-dyn-item > :first-child"), {
        keyframes: { "0%": { filter: "brightness(0.75)" }, "33.333%": { filter: "brightness(0.75)" }, "50%": { filter: "brightness(1)" }, "66.667%": { filter: "brightness(0.75)" }, "100%": { filter: "brightness(0.75)" }, easeEach: "none" },
        duration: 6, ease: "none", stagger: { each: 1, repeat: -1 }
      }, 0)
      .time(BASE + pos);
    autoplay();
    return function () { loop = null; autoplay(); };
  }
  var mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    gsap.set(root, { perspective: 1200 });
    gsap.set(root.querySelector(".w-dyn-items"), { display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "auto", width: "100%", overflow: "visible", scrollSnapType: "none", transformStyle: "preserve-3d" });
    gsap.set(items, { gridArea: "1 / 1", justifySelf: "center" });
  });
  mm.add("(prefers-reduced-motion: reduce)", function () { if (nav) gsap.set(nav, { display: "none" }); });
  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", function () { return build(20); });
  mm.add("(max-width: 767.98px) and (prefers-reduced-motion: no-preference)", function () { return build(5); });
});
