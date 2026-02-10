/**
 * ArcaScience Count-Up Bundle
 * Animated number counters for metrics sections.
 *
 * Webflow usage:
 *   <span data-countup="100" data-countup-suffix="B+" data-countup-duration="2000">0</span>
 *
 * Attributes:
 *   data-countup        — target number (required)
 *   data-countup-suffix — text appended after number (e.g., "B+", "%", "x")
 *   data-countup-prefix — text prepended before number (e.g., "$", "€")
 *   data-countup-duration — animation duration in ms (default: 2000)
 *   data-countup-decimals — decimal places (default: 0)
 */

import { countUp } from '../animations/count-up.js';

function init(options = {}) {
  const selector = options.selector || '[data-countup]';
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach((el) => observer.observe(el));
}

function startCountUp(el) {
  const end = parseFloat(el.getAttribute('data-countup')) || 0;
  const suffix = el.getAttribute('data-countup-suffix') || '';
  const prefix = el.getAttribute('data-countup-prefix') || '';
  const duration = parseInt(el.getAttribute('data-countup-duration'), 10) || 2000;
  const decimals = parseInt(el.getAttribute('data-countup-decimals'), 10) || 0;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = prefix + formatNumber(end, decimals) + suffix;
    return;
  }

  countUp({
    element: el,
    end,
    duration,
    decimals,
    suffix,
    prefix,
  });
}

function formatNumber(value, decimals) {
  if (decimals > 0) {
    return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export { init };
