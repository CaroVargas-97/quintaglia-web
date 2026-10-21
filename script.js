/* ===========================================================
   QUINTAGLIA — interacciones
=========================================================== */
(function () {
  /* --- Arrancar siempre arriba al cargar (salvo que la URL tenga ancla #) --- */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('load', () => { if (!location.hash) window.scrollTo(0, 0); });

  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  /* --- Nav: sólido al hacer scroll --- */
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Menú mobile --- */
  if (toggle && menu) {
    toggle.addEventListener('click', () => nav.classList.toggle('menu-open'));
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('menu-open'))
    );
  }

  /* --- Reveal al entrar en viewport --- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* --- Parallax suave en el hero --- */
  const heroImg = document.getElementById('heroImg');
  if (heroImg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let latest = 0, ticking = false;
    const update = () => {
      heroImg.style.transform = `translateY(${latest * 0.18}px)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      latest = window.scrollY;
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* --- Año del footer --- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Tabs de tipologías (páginas de proyecto) --- */
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const btns = group.querySelectorAll('[data-target]');
    const panels = group.querySelectorAll('.tab-panel');
    btns.forEach(btn => btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector('#' + btn.dataset.target);
      if (panel) panel.classList.add('active');
    }));
  });

  /* --- Pop-up de cercanos (WOOD) --- */
  const locModal = document.getElementById('locModal');
  if (locModal) {
    const closeLoc = () => locModal.classList.remove('open');
    document.querySelectorAll('.loc-card').forEach(c =>
      c.addEventListener('click', () => locModal.classList.add('open'))
    );
    const lx = document.getElementById('locModalX');
    if (lx) lx.addEventListener('click', closeLoc);
    locModal.addEventListener('click', e => { if (e.target === locModal) closeLoc(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLoc(); });
  }

  /* --- Lightbox de galería --- */
  const lb = document.getElementById('lightbox');
  if (lb) {
    const lbImg = lb.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(el => {
      el.addEventListener('click', () => {
        lbImg.src = el.dataset.lightbox || el.querySelector('img').src;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', () => lb.classList.remove('open'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  /* --- Formulario (demo: sin backend todavía) --- */
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    if (!nombre || !email) {
      msg.style.color = '#7a2d2d';
      msg.textContent = 'Por favor completá tu nombre y email.';
      return;
    }
    msg.style.color = '#2b5e35';
    msg.textContent = '¡Gracias, ' + nombre.split(' ')[0] + '! Recibimos tu consulta y te contactaremos pronto.';
    form.reset();
  });
})();
