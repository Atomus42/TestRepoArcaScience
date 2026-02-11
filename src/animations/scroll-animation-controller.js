/**
 * ArcaScience Scroll Animation Controller
 * ========================================
 * Manages all scroll-triggered animations using IntersectionObserver.
 *
 * Design Principles:
 *   - Scroll TRIGGERS animations; it does not SCRUB them.
 *   - Animations play once on first entry into the viewport.
 *   - No reverse animations on scroll-up (completed sections stay completed).
 *   - Deep-page content (beyond 4 viewport heights) uses simplified animations.
 *   - Performance: single IntersectionObserver instance per threshold group.
 *
 * Usage:
 *   import { ScrollAnimationController } from './scroll-animation-controller.js';
 *   const controller = new ScrollAnimationController();
 *   controller.init();
 *
 * HTML API:
 *   <div data-animate="slide-up">           — Animates on scroll (fade + translateY)
 *   <div data-animate="fade">               — Fade only
 *   <div data-animate="slide-right">        — Fade + translateX
 *   <div data-animate="scale">              — Fade + scale
 *   <div data-animate-stagger>              — Parent: children animate with stagger
 *   <div data-animate-threshold="visual">   — Custom threshold: "content" (25%) or "visual" (50%)
 *   <div data-animate-delay="200">          — Additional delay in ms before animation starts
 *
 * @module ScrollAnimationController
 * @version 1.0.0
 */

/**
 * Check if the user prefers reduced motion.
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if the device is likely low-power.
 * @returns {boolean}
 */
function isLowPowerDevice() {
  if (prefersReducedMotion()) return true;

  const nav = navigator;

  // Low CPU core count
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) return true;

  // Low memory (Chrome-only API)
  if (nav.deviceMemory && nav.deviceMemory <= 2) return true;

  // Data saver mode
  if (nav.connection && nav.connection.saveData) return true;

  return false;
}

/**
 * @typedef {'content' | 'visual' | 'immediate'} ThresholdType
 */

/**
 * Threshold values matching the CSS custom properties in motion-tokens.css.
 * These determine what percentage of the element must be visible before triggering.
 * @type {Record<ThresholdType, number>}
 */
const THRESHOLD_MAP = {
  content: 0.25,
  visual: 0.50,
  immediate: 0,
};

/**
 * Root margin that shifts the trigger point upward, so elements animate
 * before they reach the exact center of the viewport.
 * "0px 0px -20% 0px" means the effective viewport is 80% of the actual height.
 */
const ROOT_MARGIN = '0px 0px -20% 0px';

/**
 * The CSS class added to elements when they should animate.
 */
const ANIMATED_CLASS = 'is-visible';

/**
 * Main controller class.
 */
export class ScrollAnimationController {
  /**
   * @param {Object} [options]
   * @param {boolean} [options.respectReducedMotion=true] — Skip animations if user prefers reduced motion
   * @param {boolean} [options.onceOnly=true] — Animate only on first viewport entry (no re-animation on scroll back)
   * @param {number} [options.deepPageThreshold=4] — After this many viewport heights, simplify animations
   */
  constructor(options = {}) {
    this.respectReducedMotion = options.respectReducedMotion !== false;
    this.onceOnly = options.onceOnly !== false;
    this.deepPageThreshold = options.deepPageThreshold || 4;

    /** @type {IntersectionObserver[]} */
    this.observers = [];

    /** @type {Set<Element>} */
    this.animatedElements = new Set();

    /** @type {boolean} */
    this.isPaused = false;

    /** @type {boolean} */
    this.isInitialized = false;
  }

  /**
   * Initialize the controller. Finds all [data-animate] elements and sets up observers.
   * Call this after the DOM is ready.
   */
  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // If reduced motion is preferred, show everything immediately
    if (this.respectReducedMotion && prefersReducedMotion()) {
      this._showAllImmediately();
      return;
    }

    // If low-power device, use simplified animations
    if (isLowPowerDevice()) {
      this._initSimplified();
      return;
    }

    this._initFull();
    this._setupPauseControl();
    this._watchReducedMotionChange();
  }

  /**
   * Full initialization: separate observers for each threshold level.
   * @private
   */
  _initFull() {
    const elements = document.querySelectorAll('[data-animate]');
    if (elements.length === 0) return;

    // Group elements by their threshold type
    /** @type {Map<ThresholdType, Element[]>} */
    const groups = new Map();

    elements.forEach((el) => {
      const thresholdType = el.dataset.animateThreshold || 'content';
      if (!groups.has(thresholdType)) {
        groups.set(thresholdType, []);
      }
      groups.get(thresholdType).push(el);

      // Set stagger indices for children of [data-animate-stagger] parents
      this._setStaggerIndices(el);
    });

    // Create one IntersectionObserver per threshold group
    groups.forEach((groupElements, thresholdType) => {
      const threshold = THRESHOLD_MAP[thresholdType] || THRESHOLD_MAP.content;

      const observer = new IntersectionObserver(
        (entries) => this._handleIntersections(entries),
        {
          root: null,
          rootMargin: ROOT_MARGIN,
          threshold: [threshold],
        }
      );

      groupElements.forEach((el) => observer.observe(el));
      this.observers.push(observer);
    });
  }

  /**
   * Simplified initialization for low-power devices.
   * Uses a single observer with minimal threshold.
   * @private
   */
  _initSimplified() {
    const elements = document.querySelectorAll('[data-animate]');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animatedElements.add(entry.target);
            // Simplified: just show immediately, no fancy animation
            entry.target.style.transition = 'opacity 100ms ease';
            entry.target.classList.add(ANIMATED_CLASS);
            if (this.onceOnly) observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: [0] }
    );

    elements.forEach((el) => observer.observe(el));
    this.observers.push(observer);
  }

  /**
   * Show all animated elements immediately (for reduced motion).
   * @private
   */
  _showAllImmediately() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => {
      el.classList.add(ANIMATED_CLASS);
      el.style.transition = 'none';
      this.animatedElements.add(el);
    });
  }

  /**
   * Handle intersection entries: trigger animation for newly visible elements.
   * @param {IntersectionObserverEntry[]} entries
   * @private
   */
  _handleIntersections(entries) {
    if (this.isPaused) return;

    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (this.animatedElements.has(entry.target)) return;

      const el = entry.target;
      this.animatedElements.add(el);

      // Apply optional delay
      const delay = parseInt(el.dataset.animateDelay, 10) || 0;

      if (delay > 0) {
        setTimeout(() => this._animateElement(el), delay);
      } else {
        this._animateElement(el);
      }

      // Unobserve if we only animate once
      if (this.onceOnly) {
        // Find the observer that tracks this element and unobserve
        this.observers.forEach((observer) => {
          observer.unobserve(el);
        });
      }
    });
  }

  /**
   * Apply the animation class to an element.
   * Manages will-change for performance.
   * @param {Element} el
   * @private
   */
  _animateElement(el) {
    // Promote to compositor layer before animation
    el.style.willChange = 'transform, opacity';

    // Add the animated class (CSS handles the actual transition)
    el.classList.add(ANIMATED_CLASS);

    // Remove will-change after transition completes to free GPU memory
    const cleanup = () => {
      el.style.willChange = '';
      el.removeEventListener('transitionend', cleanup);
    };
    el.addEventListener('transitionend', cleanup, { once: true });

    // Fallback cleanup if transitionend never fires (e.g., display:none, etc.)
    const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000;
    setTimeout(cleanup, duration + 100);
  }

  /**
   * Set CSS custom property --as-stagger-index on children of stagger containers.
   * @param {Element} el
   * @private
   */
  _setStaggerIndices(el) {
    const parent = el.closest('[data-animate-stagger]');
    if (!parent) return;

    const children = parent.querySelectorAll('[data-animate]');
    children.forEach((child, index) => {
      child.style.setProperty('--as-stagger-index', index);
    });
  }

  /**
   * Set up the global animation pause control button.
   * Looks for a button with [data-animation-toggle].
   * @private
   */
  _setupPauseControl() {
    const toggle = document.querySelector('[data-animation-toggle]');
    if (!toggle) return;

    // Restore state from sessionStorage
    const savedState = sessionStorage.getItem('as-animation-paused');
    if (savedState === 'true') {
      this.pause();
      toggle.setAttribute('aria-pressed', 'true');
      toggle.setAttribute('aria-label', 'Play animations');
    }

    toggle.addEventListener('click', () => {
      if (this.isPaused) {
        this.resume();
        toggle.setAttribute('aria-pressed', 'false');
        toggle.setAttribute('aria-label', 'Pause all animations');
        sessionStorage.setItem('as-animation-paused', 'false');
      } else {
        this.pause();
        toggle.setAttribute('aria-pressed', 'true');
        toggle.setAttribute('aria-label', 'Play animations');
        sessionStorage.setItem('as-animation-paused', 'true');
      }
    });
  }

  /**
   * Listen for changes to the prefers-reduced-motion media query.
   * If the user toggles it on mid-session, immediately show all elements.
   * @private
   */
  _watchReducedMotionChange() {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', (e) => {
      if (e.matches) {
        this._showAllImmediately();
      }
    });
  }

  /**
   * Pause all scroll-triggered animations.
   * Already-animated elements remain visible; new elements will not animate until resumed.
   */
  pause() {
    this.isPaused = true;
    // Show all currently hidden elements immediately (so no content is invisible)
    const hidden = document.querySelectorAll('[data-animate]:not(.is-visible)');
    hidden.forEach((el) => {
      el.classList.add(ANIMATED_CLASS);
      el.style.transition = 'none';
    });
  }

  /**
   * Resume scroll-triggered animations.
   * Elements that were force-shown during pause will not re-animate.
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Observe an individual element for scroll-triggered animation.
   * @param {Element} el
   */
  observe(el) {
    if (!el || this.animatedElements.has(el)) return;
    if (this.respectReducedMotion && prefersReducedMotion()) {
      el.classList.add(ANIMATED_CLASS);
      el.style.transition = 'none';
      this.animatedElements.add(el);
      return;
    }
    // Use first observer, or create one if needed
    if (this.observers.length === 0) {
      const threshold = THRESHOLD_MAP.content;
      const observer = new IntersectionObserver(
        (entries) => this._handleIntersections(entries),
        { root: null, rootMargin: ROOT_MARGIN, threshold: [threshold] }
      );
      this.observers.push(observer);
    }
    this.observers[0].observe(el);
  }

  /**
   * Disconnect all observers and clean up.
   */
  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.animatedElements.clear();
    this.isInitialized = false;
  }
}

/**
 * Auto-initialize on DOMContentLoaded if this module is loaded via script tag.
 * For ES module usage, import and call .init() manually.
 */
if (typeof window !== 'undefined' && !window.__AS_SCROLL_CONTROLLER__) {
  window.__AS_SCROLL_CONTROLLER__ = true;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const controller = new ScrollAnimationController();
      controller.init();
      window.asScrollController = controller;
    });
  } else {
    const controller = new ScrollAnimationController();
    controller.init();
    window.asScrollController = controller;
  }
}
