import { useEffect } from 'react';

// Elements that slide in when scrolled into view (staggered among siblings).
const REVEAL = [
  '.hero .label', '.hero h1', '.hero .sub', '.hero .ctas', '.facts > div',
  '.sec .label', '.h2', '.lead', '.sub-h',
  '.sv', '.results > div', '.st', '.disp', '.mini', '.ev', '.flow > div', '.pr', '.channels',
  '.doc', '.about-top p', '.dept', '.leader', '.shield', '.pt', '.pc', '.addons', '.quote',
  '.faq-item', '.ch > *', '.form', '.strip', '.toast',
].join(',');

// Numbers that count up the first time they appear.
const COUNT = '.facts b, .results b, .ops .k b, .mini b';
// Cards that get a soft light following the cursor.
const SPOT = '.sv, .pc, .dept, .pr, .quote, .card, .k, .glass';

function countUp(el: HTMLElement) {
  const text = el.dataset.final ?? el.textContent ?? '';
  el.dataset.final = text;
  const m = text.match(/(\d[\d,]*\.?\d*)/);
  if (!m) return;
  const target = parseFloat(m[1].replace(/,/g, ''));
  const decimals = (m[1].split('.')[1] || '').length;
  const [pre, post] = [text.slice(0, m.index), text.slice((m.index ?? 0) + m[1].length)];
  const start = performance.now(), dur = 1400;
  const step = (t: number) => {
    const p = Math.min(1, (t - start) / dur);
    const v = target * (1 - Math.pow(1 - p, 3));
    const shown = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US');
    el.textContent = pre + shown + post;
    if (p < 1) requestAnimationFrame(step); else el.textContent = text;
  };
  requestAnimationFrame(step);
}

export function useSiteEffects(deps: unknown[] = []) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    // Scroll reveal
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add('in');
        el.querySelectorAll<HTMLElement>(COUNT).forEach((n) => !reduce && countUp(n));
        if (el.matches(COUNT) && !reduce) countUp(el);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    if (!reduce) {
      els.forEach((el) => {
        const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL)) : [];
        const i = Math.max(0, sibs.indexOf(el));
        el.style.setProperty('--rv-delay', `${Math.min(i, 6) * 70}ms`);
        el.classList.add('rv');
        io.observe(el);
      });
      // Count-ups that are not inside a revealed element (for example in the tablet)
      const cio = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { countUp(e.target as HTMLElement); cio.unobserve(e.target); }
      }), { threshold: 0.5 });
      document.querySelectorAll<HTMLElement>('.ops .k b').forEach((n) => cio.observe(n));
    }

    // Cursor light on cards + hero parallax (desktop pointers only)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let raf = 0;
    const onMove = (ev: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        root.style.setProperty('--px', (ev.clientX / window.innerWidth - 0.5).toFixed(3));
        root.style.setProperty('--py', (ev.clientY / window.innerHeight - 0.5).toFixed(3));
        const card = (ev.target as Element | null)?.closest?.(SPOT) as HTMLElement | null;
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${ev.clientX - r.left}px`);
          card.style.setProperty('--my', `${ev.clientY - r.top}px`);
        }
      });
    };
    if (fine && !reduce) window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
