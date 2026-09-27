const initMotion = () => {

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  const loader = document.querySelector('[data-page-loader]');
  if (loader) {
    const seen = sessionStorage.getItem('gv-intro-seen');
    if (seen || reduce) loader.classList.add('is-done');
    else {
      sessionStorage.setItem('gv-intro-seen', '1');
      window.setTimeout(() => loader.classList.add('is-done'), 900);
    }
  }

  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('[data-scroll-progress]');
  if (!window.__gvScrollMotion) {
    window.__gvScrollMotion = true;
    let ticking = false;
    const paintScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 12);
    if (progress) {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
    }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(paintScroll); }
    }, { passive: true });
    paintScroll();
  }

  document.querySelectorAll('.timeline').forEach((el) => {
    if (reduce) el.classList.add('is-visible');
    else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
      }, {threshold:.18});
      observer.observe(el);
    }
  });

  document.querySelectorAll('[data-gv-reveal]').forEach((el, i) => {
    if (reduce) { el.classList.add('is-visible'); return; }
    el.style.transitionDelay = `${Math.min(i * 45, 300)}ms`;
  });

  if (fine && !reduce && !window.__gvCursorMotion) {
    window.__gvCursorMotion = true;
    const cursor = document.querySelector('[data-cursor]');
    let cx = -100, cy = -100, tx = -100, ty = -100, raf = 0;
    const renderCursor = () => {
      cx += (tx - cx) * .18; cy += (ty - cy) * .18;
      if (cursor) cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(renderCursor);
    };
    window.addEventListener('pointermove', (e) => {
      tx=e.clientX; ty=e.clientY; cursor?.classList.add('is-visible');
    }, {passive:true});
    renderCursor();
    document.querySelectorAll('a,button,[data-cursor-hover]').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor?.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => cursor?.classList.remove('is-hover'));
    });

    document.querySelectorAll('.gv-system-card,.gv-proof-tile,.gv-note-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(1100px) rotateX(${(-y*3.2).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateY(-5px)`;
        card.style.setProperty('--spot-x', `${(x+.5)*100}%`);
        card.style.setProperty('--spot-y', `${(y+.5)*100}%`);
      });
      card.addEventListener('pointerleave', () => { card.style.transform=''; });
    });
  }
};
document.addEventListener('astro:page-load', initMotion);
if (document.readyState !== 'loading') initMotion();
else document.addEventListener('DOMContentLoaded', initMotion);
