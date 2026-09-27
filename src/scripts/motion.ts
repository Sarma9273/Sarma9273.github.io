const initMotion = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  const loader = document.querySelector('[data-page-loader]');
  if (loader instanceof HTMLElement) {
    const seen = sessionStorage.getItem('gv-intro-seen');
    if (seen || reduce) loader.classList.add('is-done');
    else {
      sessionStorage.setItem('gv-intro-seen', '1');
      window.setTimeout(() => loader.classList.add('is-done'), 900);
    }
  }

  if (!window.__gvScrollMotion) {
    window.__gvScrollMotion = true;
    let ticking = false;
    const paintScroll = () => {
      const y = window.scrollY;
      const header = document.querySelector('[data-header]');
      const progress = document.querySelector('[data-scroll-progress]');
      header?.classList.toggle('is-scrolled', y > 12);
      if (progress instanceof HTMLElement) {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paintScroll);
      }
    }, { passive: true });
    paintScroll();
  }

  document.querySelectorAll('.timeline').forEach((el) => {
    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .18 });
    observer.observe(el);
  });

  const revealItems = document.querySelectorAll('[data-reveal], [data-gv-reveal]');
  revealItems.forEach((el, i) => {
    if (el instanceof HTMLElement && el.hasAttribute('data-gv-reveal')) {
      el.style.transitionDelay = reduce ? '0ms' : `${Math.min(i * 45, 300)}ms`;
    }
    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
    }
  });
  if (!reduce && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach((el) => {
      if (!el.classList.contains('is-visible')) observer.observe(el);
    });
  }

  if (fine && !reduce && !window.__gvCursorMotion) {
    window.__gvCursorMotion = true;
    const cursor = document.querySelector('[data-cursor]');
    let cx = -100, cy = -100, tx = -100, ty = -100;
    const renderCursor = () => {
      cx += (tx - cx) * .18;
      cy += (ty - cy) * .18;
      if (cursor instanceof HTMLElement) {
        cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      }
      requestAnimationFrame(renderCursor);
    };
    window.addEventListener('pointermove', (event) => {
      tx = event.clientX;
      ty = event.clientY;
      document.querySelector('[data-cursor]')?.classList.add('is-visible');
      const target = event.target instanceof Element ? event.target.closest('.gv-system-card,.gv-proof-tile,.gv-note-card,[data-tilt]') : null;
      if (target instanceof HTMLElement) {
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        target.style.transform = `perspective(1100px) rotateX(${(-y * 3.2).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-5px)`;
        target.style.setProperty('--spot-x', `${(x + .5) * 100}%`);
        target.style.setProperty('--spot-y', `${(y + .5) * 100}%`;
      }
    }, { passive: true });
    document.addEventListener('pointerover', (event) => {
      const target = event.target instanceof Element ? event.target.closest('a,button,[data-cursor-hover]') : null;
      if (target) document.querySelector('[data-cursor]')?.classList.add('is-hover');
    }, { passive: true });
    document.addEventListener('pointerout', (event) => {
      const target = event.target instanceof Element ? event.target.closest('a,button,[data-cursor-hover]') : null;
      const related = event.relatedTarget instanceof Element ? event.relatedTarget.closest('a,button,[data-cursor-hover]') : null;
      if (target && !related) document.querySelector('[data-cursor]')?.classList.remove('is-hover');
      const tilt = event.target instanceof Element ? event.target.closest('.gv-system-card,.gv-proof-tile,.gv-note-card,[data-tilt]') : null;
      if (tilt instanceof HTMLElement && !tilt.contains(event.relatedTarget instanceof Node ? event.relatedTarget : null)) {
        tilt.style.transform = '';
      }
    }, { passive: true });
    renderCursor();
  }
};

document.addEventListener('astro:page-load', initMotion);
if (document.readyState !== 'loading') initMotion();
else document.addEventListener('DOMContentLoaded', initMotion);
