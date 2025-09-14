/* ===== Happy Birthday intro → then lock to HDB ===== */

(function () {
  const INTRO_DONE_KEY = "hdbIntroDone";
  const c = document.getElementById("c");
  const hdb = document.getElementById("hdbSection");

  // Allow ?restart=1 to replay the intro
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("restart") === "1") localStorage.removeItem(INTRO_DONE_KEY);
  } catch (e) {}

  function showHDB() {
    if (!hdb) return;
    c && (c.style.display = "none");
    hdb.removeAttribute("hidden");
    hdb.style.display = "block";
  }

  // If we've already finished once, skip intro forever
  if (localStorage.getItem(INTRO_DONE_KEY) === "1") {
    showHDB();
    return;
  }

  /* ==============================
     Minimal scaffolding for canvas
     ============================== */
  const ctx = c.getContext("2d");
  function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  // ------------------------------------------------------------------
  // Your existing fireworks/balloons animation code can live here.
  // If you already have Letter/Shard/etc. classes, paste them below
  // and call finishIntro() once the animation completes.
  // ------------------------------------------------------------------

  // --- DEMO PLACEHOLDER ANIMATION (10s), replace with your own ---
  // If you already have a working animation, delete this section
  // and just call finishIntro() when your animation is done.
  let start = performance.now();
  function loop(t) {
    const elapsed = (t - start) / 1000;
    // simple animated background
    ctx.fillStyle = `hsl(${(elapsed * 40) % 360} 70% 8%)`;
    ctx.fillRect(0, 0, c.width, c.height);

    // simple confetti-like dots
    const N = 300;
    for (let i = 0; i < N; i++) {
      const x = (i * 9973 + (elapsed * 60 * (i % 5 + 1))) % c.width;
      const y = (i * 7919 + elapsed * 50 * (i % 7 + 1)) % c.height;
      ctx.beginPath();
      ctx.arc(x, y, 1.5 + ((i % 5) === 0 ? 1 : 0), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${(i * 15) % 360} 90% 60% / 0.8)`;
      ctx.fill();
    }

    if (elapsed < 10) {
      requestAnimationFrame(loop);
    } else {
      finishIntro();
    }
  }
  requestAnimationFrame(loop);
  // --- END DEMO PLACEHOLDER ---

  function finishIntro() {
    // Persist that we've completed the intro once
    try {
      localStorage.setItem(INTRO_DONE_KEY, "1");
    } catch (e) {}
    showHDB();
  }
})();
