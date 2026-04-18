/* =====================================================
   NISBadges — Main JS
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- AOS Init ---- */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });

  /* ---- Live Clock + Date (navbar) ---- */
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function updateClock() {
    const now = new Date();
    const h   = String(now.getHours()).padStart(2, '0');
    const m   = String(now.getMinutes()).padStart(2, '0');
    const s   = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${h}:${m}:${s}`;
    const dateStr = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    // Navbar (desktop)
    const nt = document.getElementById('navbar-time');
    const nd = document.getElementById('navbar-date');
    if (nt) nt.textContent = timeStr;
    if (nd) nd.textContent = dateStr;

    // Navbar (mobile collapsed)
    const ntm = document.getElementById('navbar-time-mobile');
    const ndm = document.getElementById('navbar-date-mobile');
    if (ntm) ntm.textContent = timeStr;
    if (ndm) ndm.textContent = dateStr;

    // Hero stats bar clock (if present on page)
    const hc = document.getElementById('live-clock');
    if (hc) hc.textContent = timeStr;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---- Animated View Counter ---- */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const startVal = 0;
    function step(ts) {
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(startVal + eased * (target - startVal)).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const viewsEl = document.getElementById('page-views');
  if (viewsEl) {
    const raw = parseInt(viewsEl.dataset.count || '0', 10);
    animateCounter(viewsEl, raw, 1400);
  }

  /* ---- Navbar Scroll Shadow ---- */
  const navbar = document.querySelector('.nb-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar && navbar.classList.add('scrolled');
    } else {
      navbar && navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---- Particle Canvas Background ---- */
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const NUM_PARTICLES = 55;

  const particles = Array.from({ length: NUM_PARTICLES }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.8 + 0.4,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.4 + 0.1,
    // random hue shift for subtle color variety
    hue: Math.floor(Math.random() * 3),
  }));

  const COLORS = [
    '100,165,250',  // blue
    '167,139,250',  // violet
    '52,211,153',   // emerald
  ];

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLORS[p.hue]},${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${0.07 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });

});
