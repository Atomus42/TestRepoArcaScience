/**
 * ArcaScience Animation Module Index
 * ====================================
 * Central export point for all animation utilities.
 *
 * Production imports:
 *   import { ScrollAnimationController, countUp, SVGPathAnimator } from './animations';
 *
 * Development imports (tree-shaken in production):
 *   import { AnimationPerformanceMonitor } from './animations/performance-monitor';
 */

export { ScrollAnimationController } from './scroll-animation-controller.js';
export { countUp } from './count-up.js';
export {
  SVGPathAnimator,
  AnimationSequence,
  createFlowParticle,
  illuminateGrid,
} from './svg-path-animator.js';

// Performance monitor is intentionally NOT exported from the index.
// Import it directly in development builds:
//   import { AnimationPerformanceMonitor } from './animations/performance-monitor.js';
