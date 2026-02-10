/**
 * ArcaScience Hero Animation Controller
 * =======================================
 * Orchestrates the homepage hero SVG animation sequence.
 *
 * This controller manages the 5-phase animation:
 *   Phase 1 (0–1200ms):    Data source labels fade in sequentially
 *   Phase 2 (1200–2400ms): Data flow particles travel along input connections
 *   Phase 3 (2400–4200ms): AI model nodes illuminate in diagonal wave
 *   Phase 4 (4200–5400ms): Output connection lines draw and labels appear
 *   Phase 5 (5400ms+):     Ambient steady state (periodic data flow particles)
 *
 * Usage:
 *   import { HeroAnimationController } from './hero-animation-controller.js';
 *
 *   const svgElement = document.querySelector('.hero-svg');
 *   const hero = new HeroAnimationController(svgElement);
 *   hero.play();
 *
 * HTML Requirements:
 *   - The SVG must contain elements with these data attributes:
 *     - [data-source] on source groups
 *     - [data-model] on model node rects
 *     - [data-output] on output groups
 *     - [data-progress="core"] on the progress bar fill rect
 *     - .connection-line-input and .connection-line-output classes on paths
 *
 * @module HeroAnimationController
 * @version 1.0.0
 */

import {
  SVGPathAnimator,
  AnimationSequence,
  createFlowParticle,
  illuminateGrid,
} from '../animations/svg-path-animator.js';

/**
 * Check reduced motion preference.
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export class HeroAnimationController {
  /**
   * @param {SVGElement} svgElement — The root <svg> element containing the hero visualization
   */
  constructor(svgElement) {
    if (!svgElement) throw new Error('HeroAnimationController: SVG element required');

    this.svg = svgElement;
    this.sequence = new AnimationSequence();
    this._ambientIntervalId = null;
    this._isPaused = false;
    this._hasPlayed = false;

    // Cache element references
    this.sources = Array.from(svgElement.querySelectorAll('[data-source]'));
    this.modelNodes = Array.from(svgElement.querySelectorAll('.model-node'));
    this.outputs = Array.from(svgElement.querySelectorAll('[data-output]'));
    this.inputLines = Array.from(svgElement.querySelectorAll('.connection-line-input'));
    this.outputLines = Array.from(svgElement.querySelectorAll('.connection-line-output'));
    this.progressBar = svgElement.querySelector('[data-progress="core"]');
  }

  /**
   * Play the full animation sequence.
   * If reduced motion is preferred, shows the final state immediately.
   */
  play() {
    if (this._hasPlayed) return;
    this._hasPlayed = true;

    if (prefersReducedMotion()) {
      this._showFinalState();
      return;
    }

    this._buildSequence();
    this.sequence.play();
  }

  /**
   * Build the timed animation sequence.
   * @private
   */
  _buildSequence() {
    const seq = this.sequence;

    // ── Phase 1: Data Source Labels (0ms–1200ms) ──
    this.sources.forEach((source, index) => {
      const delay = index * 150; // 150ms stagger
      seq.add(() => {
        this._fadeIn(source, 300, delay);
      }, 0);
    });

    // Prepare input connection lines
    this.inputLines.forEach((line) => {
      const animator = new SVGPathAnimator(line);
      animator.prepare();
    });

    // Draw input connection lines (staggered with source labels)
    this.inputLines.forEach((line, index) => {
      const startTime = 200 + index * 150; // Start 200ms after first source
      seq.add(() => {
        const animator = new SVGPathAnimator(line);
        animator.draw({ duration: 500 });
      }, startTime);
    });

    // ── Phase 2: Data Flow Particles (1200ms–2400ms) ──
    const particleColors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

    this.inputLines.forEach((line, index) => {
      // 3 particles per line, 80ms apart
      for (let p = 0; p < 3; p++) {
        seq.add(() => {
          createFlowParticle({
            path: line,
            container: this.svg,
            duration: 800,
            radius: 1.5,
            color: particleColors[index % particleColors.length],
          });
        }, 1200 + index * 120 + p * 80);
      }
    });

    // ── Phase 3: AI Model Grid Illumination (2400ms–4200ms) ──
    seq.add(() => {
      illuminateGrid({
        nodes: this.modelNodes,
        columns: 6,
        stagger: 75,
        activeDuration: 200,
        dormantColor: '#E5E7EB',
        activeColor: '#10B981',
      });
    }, 2400);

    // Progress bar fill (concurrent with grid illumination)
    seq.add(() => {
      if (this.progressBar) {
        this.progressBar.style.transition = 'width 1800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        // Force reflow
        this.progressBar.getBoundingClientRect();
        this.progressBar.setAttribute('width', '268');
      }
    }, 2400);

    // ── Phase 4: Output Connections and Labels (4200ms–5400ms) ──
    // Prepare output lines
    this.outputLines.forEach((line) => {
      const animator = new SVGPathAnimator(line);
      animator.prepare();
    });

    // Draw output lines
    this.outputLines.forEach((line, index) => {
      seq.add(() => {
        const animator = new SVGPathAnimator(line);
        animator.draw({ duration: 400, delay: index * 100 });
      }, 4200);
    });

    // Fade in output labels
    const outputGroups = Array.from(this.svg.querySelectorAll('.output-group'));
    outputGroups.forEach((group, index) => {
      seq.add(() => {
        this._fadeIn(group, 250, 0);
        // Scale icon from 0.8 to 1.0
        const icon = group.querySelector('rect, circle, polyline, polygon, line');
        if (icon) {
          icon.style.transition = 'transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          icon.style.transformOrigin = 'center';
          icon.style.transform = 'scale(1)';
        }
      }, 4400 + index * 100);
    });

    // ── Phase 5: Ambient State (5400ms+) ──
    seq.add(() => {
      this._startAmbientFlow();
    }, 5400);
  }

  /**
   * Fade in an SVG group element.
   * @param {SVGElement} element
   * @param {number} duration — in ms
   * @param {number} delay — in ms
   * @private
   */
  _fadeIn(element, duration, delay) {
    element.style.transition = `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`;
    // Force current state
    element.getBoundingClientRect();
    element.style.opacity = '1';
  }

  /**
   * Start the ambient steady-state flow: one particle per line every 2 seconds.
   * @private
   */
  _startAmbientFlow() {
    if (this._isPaused) return;

    const particleColors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];
    let lineIndex = 0;

    this._ambientIntervalId = setInterval(() => {
      if (this._isPaused) return;

      const allLines = [...this.inputLines, ...this.outputLines];
      const line = allLines[lineIndex % allLines.length];
      const color = particleColors[lineIndex % particleColors.length];

      createFlowParticle({
        path: line,
        container: this.svg,
        duration: 1200,
        radius: 1.5,
        color: color,
      });

      lineIndex++;
    }, 2000);
  }

  /**
   * Show the final state immediately (for reduced motion).
   * @private
   */
  _showFinalState() {
    // Show all sources
    this.sources.forEach((source) => {
      source.style.opacity = '1';
    });

    // Show all connection lines
    [...this.inputLines, ...this.outputLines].forEach((line) => {
      line.style.strokeDasharray = 'none';
      line.style.strokeDashoffset = '0';
    });

    // Activate all model nodes
    this.modelNodes.forEach((node) => {
      node.setAttribute('fill', '#10B981');
    });

    // Show all outputs
    const outputGroups = Array.from(this.svg.querySelectorAll('.output-group'));
    outputGroups.forEach((group) => {
      group.style.opacity = '1';
    });

    // Fill progress bar
    if (this.progressBar) {
      this.progressBar.setAttribute('width', '268');
    }
  }

  /**
   * Pause all animations (ambient flow stops).
   */
  pause() {
    this._isPaused = true;
    if (this._ambientIntervalId) {
      clearInterval(this._ambientIntervalId);
      this._ambientIntervalId = null;
    }
    this.sequence.cancel();
  }

  /**
   * Resume ambient flow (does not replay the initial sequence).
   */
  resume() {
    this._isPaused = false;
    if (this._hasPlayed && !this._ambientIntervalId) {
      this._startAmbientFlow();
    }
  }

  /**
   * Clean up all intervals and animation frames.
   */
  destroy() {
    this.pause();
    this.sequence.clear();
  }
}
