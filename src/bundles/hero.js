/**
 * ArcaScience Hero Animation Bundle
 * Loaded only on the homepage.
 *
 * Orchestrates the 5-phase hero SVG animation:
 *   Phase 1: Data sources appear (0–1200ms)
 *   Phase 2: Data flows along connection paths (1200–2400ms)
 *   Phase 3: AI processing nodes illuminate (2400–4200ms)
 *   Phase 4: Outputs materialize (4200–5400ms)
 *   Phase 5: Ambient state — subtle looping (5400ms+)
 */

import { HeroAnimationController } from '../components/hero-animation-controller.js';

let instance = null;

function init(options = {}) {
  const container = document.querySelector(
    options.container || '[data-hero-animation]'
  );
  if (!container) return;

  // Inject SVG if not already present
  const svgEl = container.querySelector('svg');
  if (!svgEl) {
    // SVG is expected to be placed inside the Webflow div via embed.
    // If missing, skip initialization.
    console.warn('[ArcaScienceHero] No SVG found inside', container);
    return;
  }

  instance = new HeroAnimationController(container);

  // Expose replay method for Webflow interactions
  container.addEventListener('click', (e) => {
    if (e.target.closest('[data-hero-replay]')) {
      instance.replay();
    }
  });
}

function replay() {
  if (instance) instance.replay();
}

export { init, replay };
