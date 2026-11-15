// Vanta.js CLOUDS sky background (falls back to the CSS sky if WebGL/CDN fails)
(function vanta() {
  try {
    if (window.VANTA && window.THREE) {
      window.VANTA.CLOUDS({
        el: "#vanta", mouseControls: true, touchControls: true, gyroControls: false,
        minHeight: 200, minWidth: 200,
        skyColor: 0x3a9bf0, cloudColor: 0xe6f4ff, cloudShadowColor: 0x24508f,
        sunColor: 0xffb347, sunGlareColor: 0xff8a5c, sunlightColor: 0xffe3a3, speed: 1.1
      });
    }
  } catch (e) { /* CSS fallback stays */ }
})();

// Sunslocked Games — games.json loader, live search, sparkles, mascot eye-tracking.
const grid = document.getElementById("games");
const search = document.getElementById("search");
let games = [];
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ARROW = '<span class="go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"/></svg></span>';

function render() {
  const q = search.value.trim().toLowerCase();
  const list = games.filter(g => g.title.toLowerCase().includes(q));
  grid.innerHTML = list.map((g, i) =>
    `<a class="card" style="--i:${i}" href="${esc(g.url)}" aria-label="${esc(g.title)}">
      <div class="thumb"><img src="${esc(g.image)}" alt="" loading="lazy"></div>
      <div class="bar"><span class="title">${esc(g.title)}</span>${ARROW}</div></a>`).join("");
}
search.addEventListener("input", render);
fetch("games.json").then(r => r.json()).then(d => { games = d; render(); }).catch(() => {});

// Mascot's face follows the cursor
addEventListener("pointermove", e => {
  const s = document.documentElement.style;
  s.setProperty("--px", ((e.clientX / innerWidth - .5) * 2).toFixed(2));
  s.setProperty("--py", ((e.clientY / innerHeight - .5) * 2).toFixed(2));
}, { passive: true });

// Twinkling sun-sparkles
(function sparkles() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.getElementById("sparkles"), ctx = c.getContext("2d");
  let w, h, dpr, list = [];
  const make = () => ({ x: Math.random() * w, y: Math.random() * h, r: 4 + Math.random() * 9, p: Math.random() * 6.28, s: .0008 + Math.random() * .0016, vy: -.05 - Math.random() * .12 });
  function size() { dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    list = Array.from({ length: Math.round(Math.min(34, w / 38)) }, make); }
  function star(x, y, r) { ctx.beginPath(); ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill(); }
  function tick(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of list) {
      s.y += s.vy; if (s.y < -20) { s.y = h + 20; s.x = Math.random() * w; }
      const k = (Math.sin(t * s.s * 6 + s.p) + 1) / 2;
      ctx.fillStyle = `rgba(255,255,255,${.25 + k * .7})`; star(s.x, s.y, s.r * (.55 + k * .6));
    }
    requestAnimationFrame(tick);
  }
  addEventListener("resize", size); size(); requestAnimationFrame(tick);
})();
