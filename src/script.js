document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. LENIS SMOOTH SCROLL SETUP (disabled if user prefers reduced motion)
  // =================================================================
  let lenis;
  if (!prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Connect Lenis to GSAP's ticker
    lenis.on('scroll', () => {});
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // 2. GSAP SCROLL-IN ANIMATIONS (skipped if reduced motion)
  // =================================================================
  gsap.registerPlugin(ScrollTrigger);
  const projectCards = gsap.utils.toArray('.project-card');

  if (prefersReducedMotion) {
    // Ensure cards are simply visible without animation
    projectCards.forEach((card) => {
      card.style.opacity = 1;
      card.style.transform = 'none';
    });
  } else {
    projectCards.forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }

  // 3. Mobile menu toggle (phones only)
  // =================================================================
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('primary-menu');
  const backdrop = document.getElementById('menu-backdrop');

  function closeMenu() {
    if (!nav || !hamburger) return;
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (!nav || !hamburger) return;
    nav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  if (hamburger && nav && menu) {
    // Detect iPad/iPadOS (covers iPadOS 13+ which can report as Mac)
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIpad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIpad) {
      document.body.classList.add('no-hamburger');
    }

    hamburger.addEventListener('click', (e) => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu(); else openMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target)) return;
      if (backdrop && backdrop.contains(e.target)) { closeMenu(); return; }
      closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Reset on resize to tablet/desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });

    // Close on menu link click for better UX
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => { if (window.innerWidth < 1024) closeMenu(); });
    });
  }
});