/**
 * ArcaScience Global Bundle
 * Loaded on every page via Webflow Project Settings > Custom Code > Footer.
 *
 * Provides:
 *  - Scroll animation controller (IntersectionObserver-based)
 *  - Performance monitor (auto-degrades animations on slow devices)
 *  - Animation pause control (prefers-reduced-motion + user toggle)
 *  - Webflow-specific helpers (data-attribute driven)
 */

import { ScrollAnimationController } from '../animations/scroll-animation-controller.js';
import { AnimationPerformanceMonitor } from '../animations/performance-monitor.js';
import { AnimationPauseControl } from '../animations/animation-pause-control.js';

// ---- Webflow integration layer ----

/**
 * Navigation — sticky shrink on scroll
 */
function initNavigation() {
  const nav = document.querySelector('[data-nav="sticky"]');
  if (!nav) return;

  const SCROLL_THRESHOLD = 100;
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > SCROLL_THRESHOLD;
      nav.classList.toggle('is-scrolled', scrolled);
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Accordion — expand/collapse with data attributes
 * Webflow: add data-accordion="group" on wrapper, data-accordion-trigger on header,
 *          data-accordion-content on panel.
 */
function initAccordions() {
  document.querySelectorAll('[data-accordion="group"]').forEach((group) => {
    const triggers = group.querySelectorAll('[data-accordion-trigger]');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;
        if (!content || !content.hasAttribute('data-accordion-content')) return;

        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Close others in this group (single-select mode)
        if (!isOpen) {
          triggers.forEach((t) => {
            t.setAttribute('aria-expanded', 'false');
            const c = t.nextElementSibling;
            if (c && c.hasAttribute('data-accordion-content')) {
              c.style.maxHeight = '0';
              c.setAttribute('aria-hidden', 'true');
            }
          });
        }

        // Toggle current
        trigger.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.setAttribute('aria-hidden', 'false');
        } else {
          content.style.maxHeight = '0';
          content.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
}

/**
 * Tabs — keyboard accessible tabs
 * Webflow: data-tabs="group" on wrapper, data-tab-trigger on each tab,
 *          data-tab-panel on each panel. Match by index.
 */
function initTabs() {
  document.querySelectorAll('[data-tabs="group"]').forEach((group) => {
    const triggers = Array.from(group.querySelectorAll('[data-tab-trigger]'));
    const panels = Array.from(group.querySelectorAll('[data-tab-panel]'));

    function activate(index) {
      triggers.forEach((t, i) => {
        const active = i === index;
        t.setAttribute('aria-selected', String(active));
        t.classList.toggle('is-active', active);
        t.setAttribute('tabindex', active ? '0' : '-1');
      });
      panels.forEach((p, i) => {
        const active = i === index;
        p.classList.toggle('is-active', active);
        p.setAttribute('aria-hidden', String(!active));
      });
    }

    triggers.forEach((trigger, i) => {
      trigger.setAttribute('role', 'tab');
      trigger.addEventListener('click', () => activate(i));

      trigger.addEventListener('keydown', (e) => {
        let newIndex = i;
        if (e.key === 'ArrowRight') newIndex = (i + 1) % triggers.length;
        else if (e.key === 'ArrowLeft') newIndex = (i - 1 + triggers.length) % triggers.length;
        else return;

        e.preventDefault();
        activate(newIndex);
        triggers[newIndex].focus();
      });
    });

    panels.forEach((p) => p.setAttribute('role', 'tabpanel'));
    activate(0);
  });
}

/**
 * Scroll progress bar
 * Webflow: data-scroll-progress on the progress bar element
 */
function initScrollProgress() {
  const bar = document.querySelector('[data-scroll-progress]');
  if (!bar) return;

  let ticking = false;
  function update() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = pct + '%';
      ticking = false;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/**
 * Table of contents — highlight active section
 * Webflow: data-toc="wrapper" on the ToC, data-toc-link with href="#section-id"
 */
function initTableOfContents() {
  const toc = document.querySelector('[data-toc="wrapper"]');
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('[data-toc-link]'));
  const sections = links
    .map((link) => {
      const href = link.getAttribute('href');
      return href ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('is-active', href === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Back to top button
 * Webflow: data-back-to-top on the button
 */
function initBackToTop() {
  const btn = document.querySelector('[data-back-to-top]');
  if (!btn) return;

  let ticking = false;
  function update() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  update();
}

/**
 * Anchor link copy on heading hover
 * Webflow: headings with id attributes get a copy-link icon on hover
 */
function initAnchorLinks() {
  document.querySelectorAll('[data-anchor-link]').forEach((heading) => {
    if (!heading.id) return;

    const btn = document.createElement('button');
    btn.className = 'anchor-link-btn';
    btn.setAttribute('aria-label', 'Copy link to section');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-.8 9.45a.75.75 0 001.06-1.06l-1.25 1.25a2 2 0 01-2.83-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25z"/></svg>';

    btn.addEventListener('click', () => {
      const url = window.location.origin + window.location.pathname + '#' + heading.id;
      navigator.clipboard.writeText(url).then(() => {
        btn.classList.add('is-copied');
        setTimeout(() => btn.classList.remove('is-copied'), 1500);
      });
    });

    heading.style.position = 'relative';
    heading.appendChild(btn);
  });
}

/**
 * Form — freemail rejection
 * Webflow: data-form-email on the email input
 */
function initFormValidation() {
  const emailInputs = document.querySelectorAll('[data-form-email]');
  const freemailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com', 'protonmail.com'];

  emailInputs.forEach((input) => {
    input.addEventListener('blur', () => {
      const value = input.value.trim();
      if (!value) return;

      const domain = value.split('@')[1];
      const errorEl = input.parentElement.querySelector('[data-form-error]');

      if (domain && freemailDomains.includes(domain.toLowerCase())) {
        input.classList.add('is-error');
        if (errorEl) {
          errorEl.textContent = 'Please use your work email address.';
          errorEl.style.display = 'block';
        }
      } else {
        input.classList.remove('is-error');
        if (errorEl) errorEl.style.display = 'none';
      }
    });
  });
}

// ---- Public API ----

let scrollController = null;
let perfMonitor = null;
let pauseControl = null;

function init() {
  // Core animation systems
  scrollController = new ScrollAnimationController();
  perfMonitor = new AnimationPerformanceMonitor();
  pauseControl = new AnimationPauseControl();

  // Webflow component behaviors
  initNavigation();
  initAccordions();
  initTabs();
  initScrollProgress();
  initTableOfContents();
  initBackToTop();
  initAnchorLinks();
  initFormValidation();

  // Auto-init scroll animations on data-attribute elements
  document.querySelectorAll('[data-animate]').forEach((el) => {
    scrollController.observe(el);
  });
}

export { init, scrollController, perfMonitor, pauseControl };
