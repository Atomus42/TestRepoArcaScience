/**
 * ArcaScience SVG Path Animator
 * ==============================
 * Utility for animating SVG path drawing (stroke-dashoffset technique)
 * and managing SVG-based visualization sequences.
 *
 * This handles:
 *   - Path "draw" animations (the line appears to draw itself)
 *   - Node illumination sequences (grid of AI model nodes)
 *   - Data flow particles along SVG paths
 *   - Coordinated multi-phase animation sequences
 *
 * Usage:
 *   import { SVGPathAnimator, AnimationSequence } from './svg-path-animator.js';
 *
 *   // Single path draw
 *   const animator = new SVGPathAnimator(pathElement);
 *   animator.draw({ duration: 600 });
 *
 *   // Multi-phase sequence
 *   const seq = new AnimationSequence();
 *   seq.add(() => animator.draw({ duration: 600 }), 0);
 *   seq.add(() => otherAnimator.draw({ duration: 400 }), 300);
 *   seq.play();
 *
 * @module SVGPathAnimator
 * @version 1.0.0
 */

/**
 * Check if reduced motion is preferred.
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate an SVG path element to "draw" itself using stroke-dashoffset.
 */
export class SVGPathAnimator {
  /**
   * @param {SVGPathElement | SVGLineElement | SVGCircleElement} element
   */
  constructor(element) {
    if (!element) throw new Error('SVGPathAnimator: element is required');
    this.element = element;
    this._totalLength = null;
  }

  /**
   * Get the total length of the path (cached after first call).
   * @returns {number}
   */
  get totalLength() {
    if (this._totalLength === null) {
      if (typeof this.element.getTotalLength === 'function') {
        this._totalLength = this.element.getTotalLength();
      } else {
        // Fallback for elements without getTotalLength (e.g., <line>)
        this._totalLength = 100;
      }
    }
    return this._totalLength;
  }

  /**
   * Prepare the element for animation by setting stroke-dasharray and dashoffset.
   * Call this before the element is visible to avoid a flash of the full stroke.
   */
  prepare() {
    const len = this.totalLength;
    this.element.style.strokeDasharray = `${len}`;
    this.element.style.strokeDashoffset = `${len}`;
  }

  /**
   * Animate the path drawing from hidden to fully visible.
   *
   * @param {Object} [options]
   * @param {number} [options.duration=600] — Duration in ms
   * @param {number} [options.delay=0] — Delay before starting in ms
   * @param {string} [options.easing='cubic-bezier(0.25, 0.46, 0.45, 0.94)'] — CSS easing
   * @param {'forward' | 'reverse'} [options.direction='forward'] — Draw direction
   * @returns {Promise<void>} — Resolves when animation completes
   */
  draw(options = {}) {
    const {
      duration = 600,
      delay = 0,
      easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      direction = 'forward',
    } = options;

    return new Promise((resolve) => {
      // Reduced motion: show immediately
      if (prefersReducedMotion()) {
        this.element.style.strokeDasharray = '';
        this.element.style.strokeDashoffset = '0';
        resolve();
        return;
      }

      const len = this.totalLength;

      // Prepare initial state
      this.element.style.strokeDasharray = `${len}`;
      this.element.style.strokeDashoffset =
        direction === 'forward' ? `${len}` : `${-len}`;

      // Apply transition
      this.element.style.transition =
        `stroke-dashoffset ${duration}ms ${easing} ${delay}ms`;

      // Force reflow to ensure the initial state is rendered
      // eslint-disable-next-line no-unused-expressions
      this.element.getBoundingClientRect();

      // Animate to drawn state
      this.element.style.strokeDashoffset = '0';

      // Resolve after animation completes
      const totalTime = duration + delay;
      setTimeout(() => {
        // Clean up inline transition to allow CSS control
        this.element.style.transition = '';
        resolve();
      }, totalTime + 50); // 50ms buffer
    });
  }

  /**
   * Reverse: animate the path "erasing" itself.
   *
   * @param {Object} [options]
   * @param {number} [options.duration=400]
   * @param {string} [options.easing='cubic-bezier(0.55, 0.06, 0.68, 0.19)']
   * @returns {Promise<void>}
   */
  erase(options = {}) {
    const {
      duration = 400,
      easing = 'cubic-bezier(0.55, 0.06, 0.68, 0.19)',
    } = options;

    return new Promise((resolve) => {
      if (prefersReducedMotion()) {
        this.element.style.strokeDashoffset = `${this.totalLength}`;
        resolve();
        return;
      }

      const len = this.totalLength;
      this.element.style.strokeDasharray = `${len}`;
      this.element.style.transition = `stroke-dashoffset ${duration}ms ${easing}`;
      this.element.style.strokeDashoffset = `${len}`;

      setTimeout(() => {
        this.element.style.transition = '';
        resolve();
      }, duration + 50);
    });
  }

  /**
   * Reset the path to its hidden (pre-animation) state without animation.
   */
  reset() {
    const len = this.totalLength;
    this.element.style.transition = 'none';
    this.element.style.strokeDasharray = `${len}`;
    this.element.style.strokeDashoffset = `${len}`;
  }
}


/**
 * Coordinate multiple timed animation steps into a single sequence.
 *
 * Example:
 *   const seq = new AnimationSequence();
 *   seq.add(() => pathAnimator.draw({ duration: 600 }), 0);       // At t=0ms
 *   seq.add(() => fadeIn(nodeElement, 400), 300);                   // At t=300ms
 *   seq.add(() => pathAnimator2.draw({ duration: 400 }), 600);     // At t=600ms
 *   seq.play().then(() => console.log('Sequence complete'));
 */
export class AnimationSequence {
  constructor() {
    /** @type {{ fn: Function, startTime: number }[]} */
    this.steps = [];

    /** @type {number[]} */
    this._timeoutIds = [];

    /** @type {boolean} */
    this._isPlaying = false;

    /** @type {boolean} */
    this._isCancelled = false;
  }

  /**
   * Add an animation step to the sequence.
   *
   * @param {Function} fn — A function that starts the animation. May return a Promise.
   * @param {number} startTime — When to execute this step, in ms from sequence start.
   * @returns {AnimationSequence} — For chaining
   */
  add(fn, startTime) {
    this.steps.push({ fn, startTime });
    return this;
  }

  /**
   * Play the sequence. Steps execute at their designated start times.
   *
   * @returns {Promise<void>} — Resolves when all steps have been initiated
   *                           (NOT when all animations have completed — use
   *                           individual step Promises for that).
   */
  play() {
    if (this._isPlaying) {
      console.warn('AnimationSequence: already playing');
      return Promise.resolve();
    }

    this._isPlaying = true;
    this._isCancelled = false;

    // If reduced motion, execute all steps immediately (no timing)
    if (prefersReducedMotion()) {
      this.steps.forEach((step) => step.fn());
      this._isPlaying = false;
      return Promise.resolve();
    }

    // Sort steps by start time
    const sorted = [...this.steps].sort((a, b) => a.startTime - b.startTime);

    const lastStartTime = sorted.length > 0
      ? sorted[sorted.length - 1].startTime
      : 0;

    return new Promise((resolve) => {
      sorted.forEach((step) => {
        const id = setTimeout(() => {
          if (!this._isCancelled) {
            step.fn();
          }
        }, step.startTime);
        this._timeoutIds.push(id);
      });

      // Resolve after the last step has been initiated + buffer
      const resolveId = setTimeout(() => {
        this._isPlaying = false;
        resolve();
      }, lastStartTime + 100);
      this._timeoutIds.push(resolveId);
    });
  }

  /**
   * Cancel all pending steps in the sequence.
   */
  cancel() {
    this._isCancelled = true;
    this._timeoutIds.forEach((id) => clearTimeout(id));
    this._timeoutIds = [];
    this._isPlaying = false;
  }

  /**
   * Reset the sequence: clear all steps.
   */
  clear() {
    this.cancel();
    this.steps = [];
  }
}


/**
 * Create a data flow particle that moves along an SVG path.
 *
 * @param {Object} options
 * @param {SVGPathElement} options.path — The SVG path to follow
 * @param {SVGElement} options.container — The SVG element to append the particle to
 * @param {number} [options.duration=1200] — Transit time in ms
 * @param {number} [options.radius=2] — Particle radius in px
 * @param {string} [options.color='#3B82F6'] — Particle fill color
 * @param {string} [options.easing='linear'] — Use 'linear' for constant velocity (data flow)
 * @returns {{ cancel: Function }} — Object with cancel method
 */
export function createFlowParticle(options) {
  const {
    path,
    container,
    duration = 1200,
    radius = 2,
    color = '#3B82F6',
    easing = 'linear',
  } = options;

  if (prefersReducedMotion()) {
    return { cancel: () => {} };
  }

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('r', radius);
  circle.setAttribute('fill', color);
  circle.setAttribute('opacity', '0.8');
  container.appendChild(circle);

  const totalLength = path.getTotalLength();
  let startTime = null;
  let rafId = null;
  let cancelled = false;

  function animate(timestamp) {
    if (cancelled) return;

    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    let progress = Math.min(elapsed / duration, 1);

    // Apply easing if not linear
    if (easing !== 'linear') {
      progress = progress * (2 - progress); // ease-out-quad
    }

    const point = path.getPointAtLength(progress * totalLength);
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);

    if (progress < 1) {
      rafId = requestAnimationFrame(animate);
    } else {
      // Remove particle after reaching the end
      setTimeout(() => {
        if (circle.parentNode) {
          circle.parentNode.removeChild(circle);
        }
      }, 50);
    }
  }

  rafId = requestAnimationFrame(animate);

  return {
    cancel() {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (circle.parentNode) circle.parentNode.removeChild(circle);
    },
  };
}


/**
 * Illuminate a grid of SVG node elements in a diagonal wave pattern.
 * Used for the AI model grid animation (24 nodes in a 4x6 grid).
 *
 * @param {Object} options
 * @param {SVGElement[]} options.nodes — Array of SVG elements (rects, circles, etc.)
 * @param {number} options.columns — Number of columns in the grid
 * @param {number} [options.stagger=75] — Delay between diagonal wave steps in ms
 * @param {number} [options.activeDuration=200] — Duration of each node's activation transition
 * @param {string} [options.dormantColor='#E5E7EB'] — Color when inactive
 * @param {string} [options.activeColor='#10B981'] — Color when active
 * @param {string} [options.attribute='fill'] — SVG attribute to animate (fill, stroke, etc.)
 * @returns {Promise<void>}
 */
export function illuminateGrid(options) {
  const {
    nodes,
    columns,
    stagger = 75,
    activeDuration = 200,
    dormantColor = '#E5E7EB',
    activeColor = '#10B981',
    attribute = 'fill',
  } = options;

  return new Promise((resolve) => {
    if (prefersReducedMotion()) {
      nodes.forEach((node) => {
        node.setAttribute(attribute, activeColor);
      });
      resolve();
      return;
    }

    // Calculate diagonal index for each node
    // In a grid, diagonal index = row + column
    const rows = Math.ceil(nodes.length / columns);
    const maxDiag = rows + columns - 2;

    nodes.forEach((node, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      const diagIndex = row + col;

      // Set initial color
      node.setAttribute(attribute, dormantColor);
      node.style.transition = `${attribute} ${activeDuration}ms ease-in-out`;

      const delay = diagIndex * stagger;
      setTimeout(() => {
        node.setAttribute(attribute, activeColor);
      }, delay);
    });

    // Resolve after the last node has transitioned
    const lastDelay = maxDiag * stagger + activeDuration;
    setTimeout(resolve, lastDelay + 50);
  });
}
