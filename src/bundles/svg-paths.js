/**
 * ArcaScience SVG Path Animation Bundle
 * Animates SVG paths using stroke-dashoffset technique.
 *
 * Webflow usage:
 *   <svg data-svg-animate>
 *     <path data-svg-path data-svg-delay="200" d="M10 10 L100 100" />
 *   </svg>
 *
 * Attributes:
 *   data-svg-animate  — container SVG, triggers animation on scroll
 *   data-svg-path     — individual path to animate
 *   data-svg-delay    — stagger delay in ms (default: 0)
 *   data-svg-duration — animation duration in ms (default: 1200)
 */

import { SVGPathAnimator } from '../animations/svg-path-animator.js';

const animators = [];

function init(options = {}) {
  const selector = options.selector || '[data-svg-animate]';
  const svgs = document.querySelectorAll(selector);

  if (svgs.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSVG(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  svgs.forEach((svg) => observer.observe(svg));
}

function animateSVG(container) {
  const paths = container.querySelectorAll('[data-svg-path]');

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    paths.forEach((path) => {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
      path.style.opacity = '1';
    });
    return;
  }

  paths.forEach((path) => {
    const delay = parseInt(path.getAttribute('data-svg-delay'), 10) || 0;
    const duration = parseInt(path.getAttribute('data-svg-duration'), 10) || 1200;
    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.opacity = '1';

    setTimeout(() => {
      path.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      path.style.strokeDashoffset = '0';
    }, delay);
  });
}

export { init };
