/**
 * ArcaScience Animation Performance Monitor
 * ===========================================
 * Development-time utility for monitoring animation performance against
 * the budgets defined in the Motion Architecture.
 *
 * Performance Budgets (from MOTION_ARCHITECTURE.md):
 *   - Animation frame rate: 60fps target, never below 30fps
 *   - Animation JS bundle (gzipped): < 3KB target, 5KB max
 *   - Total SVG payload per page: < 30KB target, 50KB max
 *   - Concurrent CSS animations: < 20 target, 30 max
 *   - DOM mutations per animation frame: 0 target, 2 max
 *
 * Usage:
 *   import { AnimationPerformanceMonitor } from './performance-monitor.js';
 *
 *   // In development only:
 *   if (process.env.NODE_ENV === 'development') {
 *     const monitor = new AnimationPerformanceMonitor();
 *     monitor.start();
 *   }
 *
 * The monitor will:
 *   1. Track frame rates during animations and warn if they drop below 30fps
 *   2. Count concurrent CSS animations and warn at thresholds
 *   3. Measure animation-related JS execution time per frame
 *   4. Log performance reports to the console
 *
 * NOTE: This module should NEVER be included in production builds.
 *       Use tree-shaking or conditional imports to exclude it.
 *
 * @module AnimationPerformanceMonitor
 * @version 1.0.0
 */

/**
 * Performance budget thresholds.
 */
const BUDGETS = {
  FPS_TARGET: 60,
  FPS_MINIMUM: 30,
  CONCURRENT_ANIMATIONS_TARGET: 20,
  CONCURRENT_ANIMATIONS_MAX: 30,
  FRAME_BUDGET_MS: 16.67, // 1000ms / 60fps
  SVG_PAYLOAD_TARGET_KB: 30,
  SVG_PAYLOAD_MAX_KB: 50,
};

/**
 * @typedef {Object} FrameSample
 * @property {number} timestamp — Performance.now() timestamp
 * @property {number} fps — Instantaneous FPS (1000 / frame duration)
 * @property {number} concurrentAnimations — Number of CSS animations running
 * @property {number} frameDuration — Time since last frame in ms
 */

/**
 * @typedef {Object} PerformanceReport
 * @property {number} averageFps — Average FPS over the monitoring period
 * @property {number} minFps — Lowest recorded FPS
 * @property {number} maxConcurrentAnimations — Peak concurrent animations
 * @property {number} droppedFrames — Frames below 30fps
 * @property {number} totalFrames — Total frames measured
 * @property {number} totalSvgPayloadKb — Total SVG content size on page
 * @property {string[]} warnings — List of budget violations
 */

export class AnimationPerformanceMonitor {
  constructor() {
    /** @type {FrameSample[]} */
    this.samples = [];

    /** @type {number | null} */
    this._rafId = null;

    /** @type {number} */
    this._lastFrameTime = 0;

    /** @type {boolean} */
    this._isRunning = false;

    /** @type {number} */
    this._reportInterval = 5000; // Report every 5 seconds

    /** @type {number | null} */
    this._reportTimer = null;

    /** @type {string[]} */
    this._warnings = [];
  }

  /**
   * Start monitoring. Begins measuring frame rates and animation counts.
   *
   * @param {Object} [options]
   * @param {number} [options.reportIntervalMs=5000] — How often to log reports
   * @param {boolean} [options.showOverlay=false] — Show an on-screen FPS overlay
   */
  start(options = {}) {
    if (this._isRunning) {
      console.warn('[AS-PerfMon] Already running');
      return;
    }

    this._isRunning = true;
    this._reportInterval = options.reportIntervalMs || 5000;
    this._lastFrameTime = performance.now();
    this.samples = [];
    this._warnings = [];

    console.info(
      '%c[AS-PerfMon] Animation Performance Monitor started',
      'color: #4A6FA5; font-weight: bold'
    );
    console.info(
      `%c  Budgets: ${BUDGETS.FPS_TARGET}fps target, ` +
      `${BUDGETS.FPS_MINIMUM}fps minimum, ` +
      `<${BUDGETS.CONCURRENT_ANIMATIONS_TARGET} concurrent animations`,
      'color: #6B7280'
    );

    // Start frame loop
    this._tick();

    // Start periodic reporting
    this._reportTimer = setInterval(() => {
      this._logReport();
    }, this._reportInterval);

    // Initial SVG payload check
    this._checkSvgPayload();

    if (options.showOverlay) {
      this._createOverlay();
    }
  }

  /**
   * Stop monitoring and log final report.
   */
  stop() {
    if (!this._isRunning) return;

    this._isRunning = false;

    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    if (this._reportTimer !== null) {
      clearInterval(this._reportTimer);
      this._reportTimer = null;
    }

    this._logReport();
    this._removeOverlay();

    console.info(
      '%c[AS-PerfMon] Monitor stopped',
      'color: #4A6FA5; font-weight: bold'
    );
  }

  /**
   * Get the current performance report.
   * @returns {PerformanceReport}
   */
  getReport() {
    if (this.samples.length === 0) {
      return {
        averageFps: 0,
        minFps: 0,
        maxConcurrentAnimations: 0,
        droppedFrames: 0,
        totalFrames: 0,
        totalSvgPayloadKb: this._measureSvgPayload(),
        warnings: [...this._warnings],
      };
    }

    const fpsValues = this.samples.map((s) => s.fps).filter((fps) => fps > 0 && fps < 200);
    const avgFps = fpsValues.reduce((sum, fps) => sum + fps, 0) / fpsValues.length;
    const minFps = Math.min(...fpsValues);
    const maxAnimations = Math.max(...this.samples.map((s) => s.concurrentAnimations));
    const droppedFrames = fpsValues.filter((fps) => fps < BUDGETS.FPS_MINIMUM).length;

    const warnings = [...this._warnings];

    if (minFps < BUDGETS.FPS_MINIMUM) {
      warnings.push(
        `FPS dropped below ${BUDGETS.FPS_MINIMUM}: recorded ${Math.round(minFps)}fps`
      );
    }

    if (maxAnimations > BUDGETS.CONCURRENT_ANIMATIONS_MAX) {
      warnings.push(
        `Concurrent animations exceeded max (${BUDGETS.CONCURRENT_ANIMATIONS_MAX}): ` +
        `recorded ${maxAnimations}`
      );
    } else if (maxAnimations > BUDGETS.CONCURRENT_ANIMATIONS_TARGET) {
      warnings.push(
        `Concurrent animations exceeded target (${BUDGETS.CONCURRENT_ANIMATIONS_TARGET}): ` +
        `recorded ${maxAnimations}`
      );
    }

    return {
      averageFps: Math.round(avgFps * 10) / 10,
      minFps: Math.round(minFps * 10) / 10,
      maxConcurrentAnimations: maxAnimations,
      droppedFrames,
      totalFrames: this.samples.length,
      totalSvgPayloadKb: this._measureSvgPayload(),
      warnings,
    };
  }

  /**
   * Frame measurement loop.
   * @private
   */
  _tick() {
    if (!this._isRunning) return;

    const now = performance.now();
    const frameDuration = now - this._lastFrameTime;
    this._lastFrameTime = now;

    // Avoid division by zero and skip the first frame (no delta)
    const fps = frameDuration > 0 ? 1000 / frameDuration : 0;

    // Count concurrent CSS animations
    const concurrentAnimations = this._countConcurrentAnimations();

    this.samples.push({
      timestamp: now,
      fps,
      concurrentAnimations,
      frameDuration,
    });

    // Keep only last 600 samples (~10 seconds at 60fps) to prevent memory growth
    if (this.samples.length > 600) {
      this.samples = this.samples.slice(-600);
    }

    // Update overlay if present
    this._updateOverlay(fps, concurrentAnimations);

    this._rafId = requestAnimationFrame(() => this._tick());
  }

  /**
   * Count the number of currently running CSS animations on the page.
   * @returns {number}
   * @private
   */
  _countConcurrentAnimations() {
    // Use getAnimations() API if available (modern browsers)
    if (typeof document.getAnimations === 'function') {
      return document.getAnimations().filter(
        (anim) => anim.playState === 'running'
      ).length;
    }

    // Fallback: count elements with non-none animation-name
    // This is expensive — only do it every 10th frame
    if (this.samples.length % 10 !== 0) {
      return this.samples.length > 0
        ? this.samples[this.samples.length - 1].concurrentAnimations
        : 0;
    }

    let count = 0;
    const all = document.querySelectorAll('*');
    for (let i = 0; i < all.length; i++) {
      const style = getComputedStyle(all[i]);
      if (style.animationName && style.animationName !== 'none') {
        const playState = style.animationPlayState;
        if (playState === 'running') count++;
      }
    }
    return count;
  }

  /**
   * Measure total SVG payload on the current page.
   * @returns {number} — Size in KB
   * @private
   */
  _measureSvgPayload() {
    const svgs = document.querySelectorAll('svg');
    let totalBytes = 0;
    svgs.forEach((svg) => {
      totalBytes += new Blob([svg.outerHTML]).size;
    });
    return Math.round((totalBytes / 1024) * 10) / 10;
  }

  /**
   * Check SVG payload against budgets.
   * @private
   */
  _checkSvgPayload() {
    const payloadKb = this._measureSvgPayload();

    if (payloadKb > BUDGETS.SVG_PAYLOAD_MAX_KB) {
      const msg = `SVG payload (${payloadKb}KB) exceeds maximum budget (${BUDGETS.SVG_PAYLOAD_MAX_KB}KB)`;
      this._warnings.push(msg);
      console.warn(`%c[AS-PerfMon] ${msg}`, 'color: #EF4444; font-weight: bold');
    } else if (payloadKb > BUDGETS.SVG_PAYLOAD_TARGET_KB) {
      const msg = `SVG payload (${payloadKb}KB) exceeds target budget (${BUDGETS.SVG_PAYLOAD_TARGET_KB}KB)`;
      this._warnings.push(msg);
      console.warn(`%c[AS-PerfMon] ${msg}`, 'color: #F59E0B');
    }
  }

  /**
   * Log a performance report to the console.
   * @private
   */
  _logReport() {
    const report = this.getReport();

    if (report.totalFrames === 0) return;

    const fpsColor =
      report.averageFps >= BUDGETS.FPS_TARGET ? '#10B981' :
      report.averageFps >= BUDGETS.FPS_MINIMUM ? '#F59E0B' :
      '#EF4444';

    console.groupCollapsed(
      `%c[AS-PerfMon] Performance Report — ${report.averageFps}fps avg`,
      `color: ${fpsColor}; font-weight: bold`
    );

    console.table({
      'Average FPS': report.averageFps,
      'Minimum FPS': report.minFps,
      'Dropped Frames (<30fps)': report.droppedFrames,
      'Total Frames': report.totalFrames,
      'Max Concurrent Animations': report.maxConcurrentAnimations,
      'SVG Payload (KB)': report.totalSvgPayloadKb,
    });

    if (report.warnings.length > 0) {
      console.warn('Budget Violations:');
      report.warnings.forEach((w) => console.warn(`  - ${w}`));
    } else {
      console.info('%cAll budgets within limits', 'color: #10B981');
    }

    console.groupEnd();
  }

  /**
   * Create a small on-screen overlay showing current FPS.
   * @private
   */
  _createOverlay() {
    if (document.getElementById('as-perf-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'as-perf-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = `
      position: fixed;
      top: 8px;
      right: 8px;
      background: rgba(31, 41, 55, 0.9);
      color: #FFFFFF;
      font-family: ui-monospace, monospace;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
      z-index: 99999;
      pointer-events: none;
      line-height: 1.4;
      font-variant-numeric: tabular-nums;
    `;
    overlay.innerHTML = `
      <div>FPS: <span id="as-perf-fps">--</span></div>
      <div>Anim: <span id="as-perf-anim">--</span></div>
    `;
    document.body.appendChild(overlay);
  }

  /**
   * Update the on-screen overlay.
   * @param {number} fps
   * @param {number} animations
   * @private
   */
  _updateOverlay(fps, animations) {
    const fpsEl = document.getElementById('as-perf-fps');
    const animEl = document.getElementById('as-perf-anim');
    if (!fpsEl || !animEl) return;

    // Update every 5th frame to avoid unnecessary DOM writes
    if (this.samples.length % 5 !== 0) return;

    const roundedFps = Math.round(fps);
    fpsEl.textContent = roundedFps;
    fpsEl.style.color =
      roundedFps >= 55 ? '#10B981' :
      roundedFps >= 30 ? '#F59E0B' :
      '#EF4444';

    animEl.textContent = animations;
    animEl.style.color =
      animations <= BUDGETS.CONCURRENT_ANIMATIONS_TARGET ? '#10B981' :
      animations <= BUDGETS.CONCURRENT_ANIMATIONS_MAX ? '#F59E0B' :
      '#EF4444';
  }

  /**
   * Remove the on-screen overlay.
   * @private
   */
  _removeOverlay() {
    const overlay = document.getElementById('as-perf-overlay');
    if (overlay) overlay.remove();
  }
}
