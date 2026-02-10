/**
 * ArcaScience Webflow Build
 * Bundles JS modules + CSS into Webflow-embeddable assets.
 *
 * Output:
 *   dist/
 *     arcascience-global.min.js    — global head/body script (design tokens, scroll observer, perf monitor, pause control)
 *     arcascience-hero.min.js      — homepage hero animation bundle
 *     arcascience-countup.min.js   — count-up numbers (metrics sections)
 *     arcascience-svg-paths.min.js — SVG path drawing for pipeline diagrams
 *     arcascience-global.min.css   — all design tokens + micro-interactions
 *     webflow-embeds/              — ready-to-paste <script>/<style> snippets per page
 */

import { build, context } from 'esbuild';
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const WATCH = process.argv.includes('--watch');

const COMMON = {
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  format: 'iife',
  charset: 'utf8',
};

const entries = [
  {
    name: 'arcascience-global',
    entryPoints: ['src/bundles/global.js'],
    globalName: 'ArcaScience',
  },
  {
    name: 'arcascience-hero',
    entryPoints: ['src/bundles/hero.js'],
    globalName: 'ArcaScienceHero',
  },
  {
    name: 'arcascience-countup',
    entryPoints: ['src/bundles/countup.js'],
    globalName: 'ArcaScienceCountUp',
  },
  {
    name: 'arcascience-svg-paths',
    entryPoints: ['src/bundles/svg-paths.js'],
    globalName: 'ArcaScienceSVG',
  },
];

mkdirSync('dist/webflow-embeds', { recursive: true });

async function run() {
  // JS bundles
  for (const entry of entries) {
    const opts = {
      ...COMMON,
      entryPoints: entry.entryPoints,
      globalName: entry.globalName,
      outfile: `dist/${entry.name}.min.js`,
    };

    if (WATCH) {
      const ctx = await context(opts);
      await ctx.watch();
      console.log(`[watch] ${entry.name}`);
    } else {
      await build(opts);
      console.log(`[built] ${entry.name}.min.js`);
    }
  }

  // CSS bundle
  const cssOpts = {
    entryPoints: ['src/bundles/global.css'],
    outfile: 'dist/arcascience-global.min.css',
    bundle: true,
    minify: true,
    sourcemap: true,
    charset: 'utf8',
  };

  if (WATCH) {
    const ctx = await context(cssOpts);
    await ctx.watch();
    console.log('[watch] CSS');
  } else {
    await build(cssOpts);
    console.log('[built] arcascience-global.min.css');
  }

  // Generate Webflow embed snippets
  if (!WATCH) {
    generateEmbeds();
  }

  console.log('\nDone. Assets in dist/');
}

/**
 * Generate copy-paste-ready Webflow embed snippets.
 * Each snippet is an HTML file containing <script> or <style> tags
 * that reference CDN URLs (to be replaced with actual hosting).
 */
function generateEmbeds() {
  const CDN = 'https://cdn.arcascience.ai/webflow';

  // Global head embed (every page)
  writeFileSync(
    'dist/webflow-embeds/head-global.html',
    `<!-- ArcaScience Global — paste into Webflow Project Settings > Custom Code > Head -->
<link rel="preconnect" href="${CDN}" crossorigin>
<link rel="stylesheet" href="${CDN}/arcascience-global.min.css">
<script>
  /* Inline critical: set reduced-motion class before paint */
  (function(){
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.documentElement.classList.add('reduced-motion');
    }
  })();
</script>
`
  );

  // Global body embed (every page)
  writeFileSync(
    'dist/webflow-embeds/body-global.html',
    `<!-- ArcaScience Global — paste into Webflow Project Settings > Custom Code > Footer -->
<script src="${CDN}/arcascience-global.min.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (window.ArcaScience) {
      ArcaScience.init();
    }
  });
</script>
`
  );

  // Homepage body embed
  writeFileSync(
    'dist/webflow-embeds/body-homepage.html',
    `<!-- ArcaScience Homepage — paste into Homepage custom code (before </body>) -->
<script src="${CDN}/arcascience-hero.min.js" defer></script>
<script src="${CDN}/arcascience-countup.min.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Hero animation
    if (window.ArcaScienceHero) {
      ArcaScienceHero.init({ container: '[data-hero-animation]' });
    }
    // Count-up metrics in credibility bar
    if (window.ArcaScienceCountUp) {
      ArcaScienceCountUp.init({ selector: '[data-countup]' });
    }
  });
</script>
`
  );

  // Platform pages body embed
  writeFileSync(
    'dist/webflow-embeds/body-platform.html',
    `<!-- ArcaScience Platform Pages — paste into Platform page custom code (before </body>) -->
<script src="${CDN}/arcascience-svg-paths.min.js" defer></script>
<script src="${CDN}/arcascience-countup.min.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Pipeline diagram path animations
    if (window.ArcaScienceSVG) {
      ArcaScienceSVG.init({ selector: '[data-svg-animate]' });
    }
    // Count-up metrics
    if (window.ArcaScienceCountUp) {
      ArcaScienceCountUp.init({ selector: '[data-countup]' });
    }
  });
</script>
`
  );

  // Evidence / Case Studies embed
  writeFileSync(
    'dist/webflow-embeds/body-evidence.html',
    `<!-- ArcaScience Evidence Pages — paste into Evidence page custom code (before </body>) -->
<script src="${CDN}/arcascience-countup.min.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (window.ArcaScienceCountUp) {
      ArcaScienceCountUp.init({ selector: '[data-countup]' });
    }
  });
</script>
`
  );

  console.log('[generated] webflow-embeds/');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
