/**
 * ArcaScience Global Animation Pause Control
 * =============================================
 * Provides a unified mechanism to pause/resume ALL animations on the page.
 *
 * This component:
 *   1. Creates a fixed-position pause/play toggle button (bottom-right corner)
 *   2. Manages global animation state across CSS and JS animations
 *   3. Persists user preference in sessionStorage
 *   4. Auto-activates if prefers-reduced-motion is detected
 *   5. Integrates with ScrollAnimationController and individual component controllers
 *
 * Usage:
 *   import { AnimationPauseControl } from './animation-pause-control.js';
 *
 *   const pauseControl = new AnimationPauseControl();
 *   pauseControl.init();
 *
 *   // Register component controllers to be paused/resumed
 *   pauseControl.register(heroController);    // Must implement .pause() and .resume()
 *   pauseControl.register(scrollController);
 *
 * @module AnimationPauseControl
 * @version 1.0.0
 */

/**
 * SVG icon for the pause state (two vertical bars).
 * @type {string}
 */
const PAUSE_ICON = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="3" y="2" width="3" height="10" rx="0.5" fill="currentColor"/>
  <rect x="8" y="2" width="3" height="10" rx="0.5" fill="currentColor"/>
</svg>`;

/**
 * SVG icon for the play state (triangle).
 * @type {string}
 */
const PLAY_ICON = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M4 2.5L11 7L4 11.5V2.5Z" fill="currentColor"/>
</svg>`;

const STORAGE_KEY = 'as-animation-paused';

export class AnimationPauseControl {
  constructor() {
    /** @type {{ pause: Function, resume: Function }[]} */
    this._controllers = [];

    /** @type {boolean} */
    this._isPaused = false;

    /** @type {HTMLButtonElement | null} */
    this._button = null;

    /** @type {HTMLStyleElement | null} */
    this._styleSheet = null;
  }

  /**
   * Initialize the pause control.
   * Creates the toggle button and checks for saved state.
   */
  init() {
    // Check for saved state
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (savedState === 'true' || reducedMotion) {
      this._isPaused = true;
    }

    this._createButton();
    this._createPauseStyleSheet();

    // Apply initial state
    if (this._isPaused) {
      this._applyPausedState();
    }

    // Listen for reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches && !this._isPaused) {
        this.pause();
      }
    });
  }

  /**
   * Register a controller that implements .pause() and .resume().
   * @param {{ pause: Function, resume: Function }} controller
   */
  register(controller) {
    if (!controller || typeof controller.pause !== 'function' || typeof controller.resume !== 'function') {
      console.warn('AnimationPauseControl: controller must implement pause() and resume()');
      return;
    }
    this._controllers.push(controller);

    // If already paused, immediately pause the new controller
    if (this._isPaused) {
      controller.pause();
    }
  }

  /**
   * Unregister a controller.
   * @param {{ pause: Function, resume: Function }} controller
   */
  unregister(controller) {
    this._controllers = this._controllers.filter((c) => c !== controller);
  }

  /**
   * Pause all animations.
   */
  pause() {
    this._isPaused = true;
    this._applyPausedState();
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }

  /**
   * Resume all animations.
   */
  resume() {
    this._isPaused = false;
    this._applyResumedState();
    sessionStorage.setItem(STORAGE_KEY, 'false');
  }

  /**
   * Toggle pause/resume.
   */
  toggle() {
    if (this._isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  /**
   * @returns {boolean}
   */
  get isPaused() {
    return this._isPaused;
  }

  /**
   * Create the toggle button element and append to body.
   * @private
   */
  _createButton() {
    const btn = document.createElement('button');
    btn.className = 'as-animation-toggle';
    btn.setAttribute('aria-label', this._isPaused ? 'Play animations' : 'Pause all animations');
    btn.setAttribute('aria-pressed', this._isPaused ? 'true' : 'false');
    btn.setAttribute('data-animation-toggle', '');
    btn.innerHTML = this._isPaused ? PLAY_ICON : PAUSE_ICON;

    // Inline styles to ensure the button renders regardless of stylesheet load order
    btn.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #E5E7EB;
      background: #F3F4F6;
      color: #6B7280;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
      transition: opacity 200ms ease, background-color 200ms ease;
      z-index: 9998;
      padding: 0;
    `;

    btn.addEventListener('mouseenter', () => {
      btn.style.opacity = '1';
      btn.style.backgroundColor = '#E5E7EB';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.opacity = '0.8';
      btn.style.backgroundColor = '#F3F4F6';
    });

    btn.addEventListener('click', () => {
      this.toggle();
    });

    document.body.appendChild(btn);
    this._button = btn;
  }

  /**
   * Create a <style> element that pauses all CSS animations when active.
   * @private
   */
  _createPauseStyleSheet() {
    const style = document.createElement('style');
    style.id = 'as-animation-pause-styles';
    style.textContent = `
      .as-animations-paused *,
      .as-animations-paused *::before,
      .as-animations-paused *::after {
        animation-play-state: paused !important;
        transition-duration: 0ms !important;
      }

      /* Keep essential interaction transitions even when paused */
      .as-animations-paused button,
      .as-animations-paused a,
      .as-animations-paused input,
      .as-animations-paused select {
        transition-duration: 100ms !important;
      }
    `;
    document.head.appendChild(style);
    this._styleSheet = style;
  }

  /**
   * Apply the paused state across all animation systems.
   * @private
   */
  _applyPausedState() {
    // Pause CSS animations via class on document
    document.documentElement.classList.add('as-animations-paused');

    // Pause registered JS controllers
    this._controllers.forEach((c) => c.pause());

    // Update button
    if (this._button) {
      this._button.innerHTML = PLAY_ICON;
      this._button.setAttribute('aria-label', 'Play animations');
      this._button.setAttribute('aria-pressed', 'true');
    }
  }

  /**
   * Apply the resumed state across all animation systems.
   * @private
   */
  _applyResumedState() {
    // Resume CSS animations
    document.documentElement.classList.remove('as-animations-paused');

    // Resume registered JS controllers
    this._controllers.forEach((c) => c.resume());

    // Update button
    if (this._button) {
      this._button.innerHTML = PAUSE_ICON;
      this._button.setAttribute('aria-label', 'Pause all animations');
      this._button.setAttribute('aria-pressed', 'false');
    }
  }

  /**
   * Clean up: remove button, stylesheet, and all registrations.
   */
  destroy() {
    if (this._button && this._button.parentNode) {
      this._button.parentNode.removeChild(this._button);
    }
    if (this._styleSheet && this._styleSheet.parentNode) {
      this._styleSheet.parentNode.removeChild(this._styleSheet);
    }
    document.documentElement.classList.remove('as-animations-paused');
    this._controllers = [];
  }
}
