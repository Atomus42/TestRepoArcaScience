/**
 * ArcaScience Count-Up Utility
 * =============================
 * Lightweight animated number counter for data scale visualizations.
 *
 * Features:
 *   - Custom easing (default: ease-out-quad for smooth deceleration)
 *   - Locale-aware number formatting (1,000,000 vs 1.000.000)
 *   - Suffix support ("100B+", "24 models", "94%")
 *   - Respects prefers-reduced-motion (shows final value immediately)
 *   - Tabular numeral enforcement for digit stability
 *   - Callback support for external state synchronization
 *
 * Usage:
 *   import { countUp } from './count-up.js';
 *
 *   countUp({
 *     element: document.querySelector('.counter'),
 *     start: 0,
 *     end: 100000000000,
 *     duration: 2000,
 *     suffix: '+',
 *     prefix: '',
 *     locale: 'en-US',
 *     onUpdate: (value) => {},
 *     onComplete: () => {},
 *   });
 *
 * @module countUp
 * @version 1.0.0
 * Size: ~500 bytes gzipped
 */

/**
 * Ease-out quadratic: fast start, slow finish.
 * Appropriate for counters where initial acceleration creates excitement
 * and final deceleration provides readability at the target number.
 * @param {number} t — Progress 0..1
 * @returns {number} — Eased progress 0..1
 */
function easeOutQuad(t) {
  return t * (2 - t);
}

/**
 * Ease-in quadratic: slow start, fast finish.
 * Use for the Data Scale visualization where the counter accelerates
 * to emphasize the incomprehensible scale of 100B data points.
 * @param {number} t — Progress 0..1
 * @returns {number} — Eased progress 0..1
 */
function easeInQuad(t) {
  return t * t;
}

/**
 * @typedef {Object} CountUpOptions
 * @property {HTMLElement} element — The DOM element to update with the count
 * @property {number} [start=0] — Starting number
 * @property {number} end — Target number
 * @property {number} [duration=2000] — Animation duration in milliseconds
 * @property {string} [suffix=''] — Text appended after the number (e.g., '+', '%')
 * @property {string} [prefix=''] — Text prepended before the number (e.g., '$', '>')
 * @property {string} [locale='en-US'] — Locale for number formatting
 * @property {number} [decimals=0] — Number of decimal places
 * @property {'ease-out' | 'ease-in' | 'linear'} [easing='ease-out'] — Easing function
 * @property {function(number): void} [onUpdate] — Callback on each frame with current value
 * @property {function(): void} [onComplete] — Callback when animation completes
 */

/**
 * Animate a number counting up (or down) within a DOM element.
 *
 * @param {CountUpOptions} options
 * @returns {{ cancel: function(): void }} — Object with cancel method to stop animation
 */
export function countUp(options) {
  const {
    element,
    start = 0,
    end,
    duration = 2000,
    suffix = '',
    prefix = '',
    locale = 'en-US',
    decimals = 0,
    easing = 'ease-out',
    onUpdate,
    onComplete,
  } = options;

  if (!element) {
    throw new Error('countUp: element is required');
  }

  if (typeof end !== 'number') {
    throw new Error('countUp: end must be a number');
  }

  // Ensure tabular nums for stable digit width
  element.style.fontVariantNumeric = 'tabular-nums';

  // Respect reduced motion: show final value immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const formatted = formatNumber(end, locale, decimals);
    element.textContent = `${prefix}${formatted}${suffix}`;
    if (onUpdate) onUpdate(end);
    if (onComplete) onComplete();
    return { cancel: () => {} };
  }

  // Select easing function
  const easeFn =
    easing === 'ease-in' ? easeInQuad :
    easing === 'linear' ? (t) => t :
    easeOutQuad;

  let rafId = null;
  let startTime = null;
  let cancelled = false;

  function frame(timestamp) {
    if (cancelled) return;

    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeFn(progress);

    const currentValue = start + (end - start) * easedProgress;
    const displayValue = decimals > 0 ? currentValue : Math.round(currentValue);

    const formatted = formatNumber(displayValue, locale, decimals);
    element.textContent = `${prefix}${formatted}${suffix}`;

    if (onUpdate) onUpdate(displayValue);

    if (progress < 1) {
      rafId = requestAnimationFrame(frame);
    } else {
      // Ensure we display the exact end value (avoid floating point drift)
      const finalFormatted = formatNumber(end, locale, decimals);
      element.textContent = `${prefix}${finalFormatted}${suffix}`;
      if (onUpdate) onUpdate(end);
      if (onComplete) onComplete();
    }
  }

  rafId = requestAnimationFrame(frame);

  return {
    cancel() {
      cancelled = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    },
  };
}

/**
 * Format a number with locale-aware separators and decimal places.
 *
 * @param {number} value
 * @param {string} locale
 * @param {number} decimals
 * @returns {string}
 */
function formatNumber(value, locale, decimals) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
