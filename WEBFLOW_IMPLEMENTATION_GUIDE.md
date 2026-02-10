# ArcaScience — Webflow Implementation Guide

## Overview

This repository contains everything needed to implement the ArcaScience website in Webflow: design system tokens, production-ready animation bundles, component CSS classes, page structure templates, and copy-paste-ready embed snippets.

**Architecture**: Webflow handles layout, CMS, and hosting. Custom code (JS + CSS) handles animations, micro-interactions, and behaviors that go beyond Webflow's native capabilities.

---

## Repository Structure

```
repo/
├── dist/                              # Built assets (run `npm run build`)
│   ├── arcascience-global.min.js      # 19KB — loaded on every page
│   ├── arcascience-hero.min.js        # 7.7KB — homepage only
│   ├── arcascience-countup.min.js     # 2.4KB — pages with metrics
│   ├── arcascience-svg-paths.min.js   # 1.4KB — pages with pipeline diagrams
│   ├── arcascience-global.min.css     # 26KB — loaded on every page
│   └── webflow-embeds/                # Copy-paste HTML snippets
│       ├── head-global.html           # Paste into Project Settings > Head
│       ├── body-global.html           # Paste into Project Settings > Footer
│       ├── body-homepage.html         # Paste into Homepage > Before </body>
│       ├── body-platform.html         # Paste into Platform pages > Before </body>
│       └── body-evidence.html         # Paste into Evidence pages > Before </body>
├── src/
│   ├── bundles/                       # Entry points for esbuild
│   │   ├── global.js                  # Scroll animations, nav, accordion, tabs, forms
│   │   ├── global.css                 # Full design system + component CSS
│   │   ├── hero.js                    # Homepage hero SVG animation
│   │   ├── countup.js                 # Animated number counters
│   │   └── svg-paths.js              # SVG path drawing for pipelines
│   ├── animations/                    # Core animation modules
│   ├── components/                    # SVG assets, configs
│   └── styles/                        # Motion tokens, micro-interactions
├── webflow-pages/                     # HTML structural blueprints
│   ├── homepage.html                  # 10-section homepage structure
│   ├── platform-overview.html         # Platform overview page
│   └── contact-demo.html             # Contact / demo request page
├── build.mjs                          # esbuild build script
├── package.json                       # npm config
└── *.md                               # Strategy documents (5 files)
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Build all assets
npm run build

# Watch mode (auto-rebuild on changes)
npm run build:watch
```

---

## Webflow Setup: Step by Step

### Step 1: Host the Built Assets

Upload the contents of `dist/` to a CDN or static file host. Options:
- **Webflow Assets**: Upload via Project Settings > Integrations (limited to certain file types)
- **AWS S3 + CloudFront**: Recommended for production
- **Netlify / Vercel**: Quick setup for staging

Update the CDN URLs in the embed snippets (replace `https://cdn.arcascience.ai/webflow/`).

### Step 2: Add Global Custom Code

In Webflow, go to **Project Settings > Custom Code**.

**Head Code** — paste the contents of `dist/webflow-embeds/head-global.html`:
```html
<link rel="stylesheet" href="YOUR_CDN_URL/arcascience-global.min.css">
<script>
  (function(){
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.documentElement.classList.add('reduced-motion');
    }
  })();
</script>
```

**Footer Code** — paste the contents of `dist/webflow-embeds/body-global.html`:
```html
<script src="YOUR_CDN_URL/arcascience-global.min.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (window.ArcaScience) ArcaScience.init();
  });
</script>
```

### Step 3: Add Fonts

Self-host Inter and Literata fonts (do NOT use Google Fonts CDN — performance and privacy):
1. Download Inter Variable and Literata Variable from Google Fonts
2. Convert to WOFF2
3. Upload to CDN
4. Add @font-face declarations in the Head Code or in Webflow's custom fonts

### Step 4: Add Page-Specific Code

For the **Homepage**, paste `dist/webflow-embeds/body-homepage.html` into the page's custom code (Settings > Custom Code for that page, in the "Before `</body>` tag" field).

For **Platform pages**, use `body-platform.html`.

For **Evidence/Case Study** pages, use `body-evidence.html`.

---

## Data Attributes Reference

These data attributes drive JS behaviors. Add them to Webflow elements via the "Custom Attributes" panel in the element settings.

### Global (every page)

| Attribute | Element | Behavior |
|-----------|---------|----------|
| `data-nav="sticky"` | Nav wrapper | Sticky navigation with scroll-shrink |
| `data-animate` | Any element | Fade-in on scroll (IntersectionObserver) |
| `data-scroll-progress` | Thin div at top | Scroll progress bar |
| `data-back-to-top` | Button (fixed) | Back-to-top button, visible after 600px scroll |
| `data-anchor-link` | Any heading with `id` | Hover shows copy-link icon |

### Accordion

| Attribute | Element | Behavior |
|-----------|---------|----------|
| `data-accordion="group"` | Wrapper div | Groups accordion items |
| `data-accordion-trigger` | Header/button | Click to expand/collapse |
| `data-accordion-content` | Panel div | Content that expands (must follow trigger) |

Add `aria-expanded="false"` to each trigger. Add `aria-hidden="true"` to each content panel.

### Tabs

| Attribute | Element | Behavior |
|-----------|---------|----------|
| `data-tabs="group"` | Wrapper div | Groups tab set |
| `data-tab-trigger` | Tab button | Click to switch |
| `data-tab-panel` | Panel div | Content shown for active tab |

### Count-Up Numbers

| Attribute | Element | Behavior |
|-----------|---------|----------|
| `data-countup="100"` | `<span>` | Target number to count to |
| `data-countup-suffix="B+"` | Same element | Text appended after number |
| `data-countup-prefix="$"` | Same element | Text prepended before number |
| `data-countup-duration="2000"` | Same element | Animation duration (ms) |
| `data-countup-decimals="1"` | Same element | Decimal places |

Example:
```html
<span data-countup="100" data-countup-suffix="B+" data-countup-duration="2000">0</span>
```

### SVG Path Animation

| Attribute | Element | Behavior |
|-----------|---------|----------|
| `data-svg-animate` | `<svg>` container | Triggers animation on scroll |
| `data-svg-path` | `<path>` inside SVG | Path to animate via stroke-dashoffset |
| `data-svg-delay="200"` | Same `<path>` | Stagger delay (ms) |
| `data-svg-duration="1200"` | Same `<path>` | Animation duration (ms) |

### Hero Animation

| Attribute | Element | Behavior |
|-----------|---------|----------|
| `data-hero-animation` | Container div | Hero animation target |
| `data-hero-replay` | Button inside container | Click to replay animation |

### Forms

| Attribute | Element | Behavior |
|-----------|---------|----------|
| `data-form-email` | Email input | Validates work email (rejects freemail) |
| `data-form-error` | Span/div after input | Error message container |

### Table of Contents

| Attribute | Element | Behavior |
|-----------|---------|----------|
| `data-toc="wrapper"` | ToC container | Groups ToC links |
| `data-toc-link` | Anchor link in ToC | Highlights on scroll position, needs `href="#id"` |

---

## CSS Class Reference

### Typography

| Class | Usage |
|-------|-------|
| `.arca-display-lg` | H1 hero headlines (3.5rem → 2rem mobile) |
| `.arca-display-sm` | Section headlines (2.5rem → 1.75rem mobile) |
| `.arca-heading-1` | Page headings (2rem) |
| `.arca-heading-2` | Section headings (1.5rem) |
| `.arca-heading-3` | Card/component headings (1.25rem) |
| `.arca-body-lg` | Lead paragraphs (1.125rem) |
| `.arca-body-md` | Standard body text (1rem) |
| `.arca-body-sm` | Secondary text, descriptions (0.875rem) |
| `.arca-caption` | Meta text, timestamps (0.75rem) |
| `.arca-label` | Section labels, uppercase (0.6875rem) |
| `.arca-stat-lg` | Large metrics (3rem) |
| `.arca-stat-sm` | Smaller metrics (2rem) |
| `.arca-quote` | Testimonial text (Literata italic) |
| `.arca-mono` | Code, technical text (IBM Plex Mono) |

### Buttons

| Class | Usage |
|-------|-------|
| `.arca-btn-primary` | Blue background, white text. Main CTAs. |
| `.arca-btn-secondary` | Blue border, transparent. Secondary CTAs. |
| `.arca-btn-tertiary` | Text link with arrow. Inline links. |
| `.arca-btn-primary-inverted` | White background, blue text. On dark backgrounds. |

Add `<span class="arca-arrow">&rarr;</span>` inside `.arca-btn-tertiary` for the animated arrow.

### Cards

| Class | Usage |
|-------|-------|
| `.arca-card` | Standard card (border, hover lift) |
| `.arca-card-colored-top` | Add colored top border |
| `.arca-card-colored-top.is-data` | Teal top (Data module) |
| `.arca-card-colored-top.is-analytics` | Indigo top (Decision module) |
| `.arca-card-colored-top.is-output` | Green top (Output module) |

### Module Tags

| Class | Usage |
|-------|-------|
| `.arca-module-tag.is-data` | Teal tag for Data Intelligence |
| `.arca-module-tag.is-analytics` | Indigo tag for Decision Intelligence |
| `.arca-module-tag.is-output` | Green tag for Automated Outputs |

### Colors

Background: `.arca-bg-blue-900`, `.arca-bg-blue-600`, `.arca-bg-blue-50`, `.arca-bg-grey-50`, `.arca-bg-white`

Text: `.arca-text-blue-600`, `.arca-text-grey-900`, `.arca-text-grey-800`, `.arca-text-grey-600`, `.arca-text-white`

### Layout Components

| Class | Usage |
|-------|-------|
| `.arca-nav` | Fixed navigation bar |
| `.arca-nav-link` | Nav link (add `.is-active` for current page) |
| `.arca-credibility-bar` | Dark metric bar |
| `.arca-credibility-metric` | Individual metric in bar |
| `.arca-section-label` | Uppercase section label above headings |
| `.arca-testimonial` | Testimonial block |
| `.arca-testimonial-quote` | Quote text |
| `.arca-testimonial-attribution` | Author name/title |
| `.arca-cta-section` | Full-width blue CTA |
| `.arca-compliance-badges` | Flex container for badges |
| `.arca-compliance-badge` | Individual badge (grayscale → color on hover) |

### Forms

| Class | Usage |
|-------|-------|
| `.arca-form-field` | Text input / select (48px height) |
| `.arca-form-label` | Field label |
| `.arca-form-error` | Error message (hidden by default) |
| `.arca-form-field.is-error` | Error state on input |

---

## Webflow Designer Workflow

### Creating a New Page

1. **Set page SEO**: Title, meta description (see `arcascience-content-strategy.md` SEO section)
2. **Add page custom code** if it needs specific JS bundles (hero, countup, svg-paths)
3. **Build sections top-to-bottom** using the HTML template as reference
4. **Add `data-animate`** to any element that should fade in on scroll
5. **Add combo classes** for typography, colors, and components
6. **Add custom attributes** via element settings panel for behaviors

### Section Rhythm Pattern

Follow this pattern on every page (from UX design system):
```
Breathing (hero)
Dense (feature cards, tables)
Narrative (text + visual)
Dense (more features)
Breathing (testimonial or metric bar)
Dense (detailed content)
Breathing (CTA section)
Dense (footer)
```

### Content Width

- Max content width: **1120px**, centered
- Body text columns: max **680px** (72 characters)
- Two-column layouts: **7/5 or 8/4 split** (not 6/6)

---

## CMS Collections (Webflow CMS)

Set up these CMS collections in Webflow for dynamic content:

### Case Studies
- **Fields**: Title, Client Name, Therapeutic Area (ref), Development Phase (option), Challenge (rich text), Approach (rich text), Outcome (rich text), Key Metric, Featured Image, Published Date
- **Used on**: Case Studies hub, homepage featured study, related sidebars

### Team Members
- **Fields**: Name, Title, Bio (rich text), Headshot (image), LinkedIn URL, Department (option), Order (number), Is Leadership (switch)
- **Used on**: Team page, About page

### Resources (Blog Posts, Whitepapers)
- **Fields**: Title, Type (option: blog/whitepaper/webinar/regulatory-update), Topic Tags (multi-ref), Therapeutic Area (multi-ref), Author (ref to Team), Excerpt (plain text), Body (rich text), Published Date, Reading Time, Featured (switch), Gated (switch)
- **Used on**: Resource hub, blog, sidebar recommendations

### Therapeutic Areas
- **Fields**: Name, Slug, Description, Icon (SVG), Case Study Count, Data Coverage Description
- **Used on**: TA pages, filters

### Open Positions
- **Fields**: Title, Department (option), Location, Type (full-time/contract), Description (rich text), Apply URL
- **Used on**: Careers page

### Regulatory Updates
- **Fields**: Title, Regulatory Body (FDA/EMA/PMDA), Guideline Reference, Impact Summary, Full Analysis (rich text), Published Date
- **Used on**: Regulatory Intelligence feed

---

## Performance Checklist

Before publishing:

- [ ] All images in WebP format with JPEG fallback
- [ ] Hero images eager-loaded with `loading="eager"`
- [ ] Below-fold images lazy-loaded with `loading="lazy"`
- [ ] Fonts self-hosted (not Google Fonts CDN)
- [ ] `font-display: swap` set on all font-face declarations
- [ ] JS bundles loaded with `defer` attribute
- [ ] Global CSS loaded in `<head>` (not async)
- [ ] No auto-playing video anywhere
- [ ] No parallax effects
- [ ] No scroll-jacking
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Lighthouse score > 90 on Performance
- [ ] CLS < 0.1

---

## Accessibility Checklist

- [ ] Skip-to-main-content link as first focusable element
- [ ] All interactive elements have visible focus states (2px blue-400 outline)
- [ ] Heading hierarchy: one H1 per page, no skipped levels
- [ ] All images have descriptive `alt` text (or `alt=""` if decorative)
- [ ] Complex diagrams have text descriptions below
- [ ] Accordion and tab components have proper ARIA attributes
- [ ] Form fields have associated labels
- [ ] Error messages linked via `aria-describedby`
- [ ] Color is never the only way to convey information
- [ ] Touch targets minimum 44x44px

---

## Anti-Patterns (Do NOT Implement)

These patterns are explicitly banned per the design and conversion strategy:

1. **No chatbot pop-ups** — the "Talk to a Scientist" CTA in the header is sufficient
2. **No exit-intent popups** — they signal desperation to enterprise buyers
3. **No auto-playing video** — unexpected audio in professional environments
4. **No parallax scrolling** — consumer-entertainment feel, inappropriate for pharma
5. **No scroll-triggered entrance animations** (fade-in-from-bottom on every element) — `data-animate` does a subtle 12px translateY, which is the maximum
6. **No countdown timers or urgency language** — "Act now" is banned
7. **No "Learn More" buttons** — always use specific language ("Explore the Platform", "Read Case Study")
8. **No carousels that auto-rotate** — if content rotates, user must control it
9. **No gradient text** — undermines precision aesthetic
10. **No generic icons** (lightbulb for innovation, rocket for speed) — icons only for recognizable domain concepts

---

## File Hosting Recommendations

| Asset Type | Host | Cache Policy |
|------------|------|--------------|
| JS bundles | CDN (S3+CloudFront or similar) | `max-age=31536000, immutable` (content-hashed filenames) |
| CSS bundle | CDN | `max-age=31536000, immutable` |
| Font files | CDN (same-origin or CORS-enabled) | `max-age=31536000, immutable` |
| Images | Webflow Assets or CDN | `max-age=86400` (24h) |
| SVG embeds | Inline in Webflow (Embed component) | N/A (inline) |

---

## Contact

For implementation questions, refer to the strategy documents:
- **Site Architecture**: `ARCASCIENCE_SITE_ARCHITECTURE.md`
- **Content Strategy**: `arcascience-content-strategy.md`
- **UX Design System**: `ARCASCIENCE_UX_DESIGN_SYSTEM.md`
- **Motion Architecture**: `MOTION_ARCHITECTURE.md`
- **Conversion Strategy**: `conversion-trust-architecture.md`
