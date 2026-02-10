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
 * Dropdown navigation — robust hover with gap bridge + click fallback
 */
function initDropdowns() {
  const wraps = document.querySelectorAll('.arca-nav-dropdown-wrap');
  let activeDropdown = null;
  let closeTimer = null;

  wraps.forEach((wrap) => {
    const trigger = wrap.querySelector('.arca-nav-link');
    const dropdown = wrap.querySelector('.arca-nav-dropdown');
    if (!trigger || !dropdown) return;

    function open() {
      clearTimeout(closeTimer);
      // Close any other open dropdown
      if (activeDropdown && activeDropdown !== wrap) {
        closeDropdown(activeDropdown);
      }
      dropdown.style.opacity = '1';
      dropdown.style.visibility = 'visible';
      dropdown.style.transform = 'translateY(0)';
      dropdown.style.pointerEvents = 'auto';
      wrap.classList.add('is-open');
      activeDropdown = wrap;
    }

    function close() {
      closeTimer = setTimeout(() => {
        closeDropdown(wrap);
      }, 120); // 120ms grace period for gap crossing
    }

    wrap.addEventListener('mouseenter', open);
    wrap.addEventListener('mouseleave', close);

    // Focus-within for keyboard navigation
    wrap.addEventListener('focusin', open);
    wrap.addEventListener('focusout', (e) => {
      if (!wrap.contains(e.relatedTarget)) close();
    });

    // Click toggle for touch devices
    trigger.addEventListener('click', (e) => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        e.preventDefault();
        if (wrap.classList.contains('is-open')) {
          closeDropdown(wrap);
        } else {
          open();
        }
      }
    });
  });

  function closeDropdown(wrap) {
    const dropdown = wrap.querySelector('.arca-nav-dropdown');
    if (!dropdown) return;
    dropdown.style.opacity = '0';
    dropdown.style.visibility = 'hidden';
    dropdown.style.transform = 'translateY(-8px)';
    dropdown.style.pointerEvents = 'none';
    wrap.classList.remove('is-open');
    if (activeDropdown === wrap) activeDropdown = null;
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeDropdown) {
      closeDropdown(activeDropdown);
    }
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (activeDropdown && !activeDropdown.contains(e.target)) {
      closeDropdown(activeDropdown);
    }
  });
}

/**
 * Accordion — expand/collapse with data attributes
 * Webflow: add data-accordion="group" on wrapper, data-accordion-trigger on header,
 *          data-accordion-content on panel.
 * Also supports standalone triggers outside groups (independent toggle).
 */
function initAccordions() {
  // Track which triggers are inside groups so we don't double-bind
  const groupedTriggers = new Set();

  document.querySelectorAll('[data-accordion="group"]').forEach((group) => {
    const triggers = group.querySelectorAll('[data-accordion-trigger]');
    triggers.forEach((trigger) => {
      groupedTriggers.add(trigger);
      // Ensure aria-expanded is initialized
      if (!trigger.hasAttribute('aria-expanded')) {
        trigger.setAttribute('aria-expanded', 'false');
      }
      trigger.addEventListener('click', () => {
        let content = trigger.nextElementSibling;
        if (!content || !content.hasAttribute('data-accordion-content')) {
          // Check if trigger is wrapped in a container and content is after the container
          content = trigger.closest('[data-accordion-item]')?.querySelector('[data-accordion-content]');
        }
        if (!content) return;

        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Close others in this group (single-select mode)
        if (!isOpen) {
          triggers.forEach((t) => {
            t.setAttribute('aria-expanded', 'false');
            let c = t.nextElementSibling;
            if (!c || !c.hasAttribute('data-accordion-content')) {
              c = t.closest('[data-accordion-item]')?.querySelector('[data-accordion-content]');
            }
            if (c) {
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

  // Standalone accordion triggers (outside groups) — independent toggle
  document.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
    if (groupedTriggers.has(trigger)) return;
    trigger.addEventListener('click', () => {
      let content = trigger.nextElementSibling;
      if (!content || !content.hasAttribute('data-accordion-content')) {
        // Check if trigger is wrapped in a container and content is after the container
        content = trigger.closest('[data-accordion-item]')?.querySelector('[data-accordion-content]');
      }
      if (!content) return;

      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
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
}

/**
 * Parallax glow orbs — subtle mouse-tracking on decorative elements
 * Targets glow orb divs inside sections with position: relative.
 * Desktop only, uses requestAnimationFrame for performance.
 */
function initParallaxOrbs() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // Skip on touch devices

  const sections = document.querySelectorAll('section[style*="overflow: hidden"]');
  if (sections.length === 0) return;

  let mouseX = 0.5;
  let mouseY = 0.5;
  let rafId = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          // Only animate if section is in viewport
          if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

          const orbs = section.querySelectorAll('div[style*="radial-gradient"][style*="filter: blur"]');
          orbs.forEach((orb, i) => {
            const factor = i === 0 ? 15 : -10;
            const dx = (mouseX - 0.5) * factor;
            const dy = (mouseY - 0.5) * factor;
            orb.style.transform = `translate(${dx}px, ${dy}px)`;
          });
        });
        rafId = null;
      });
    }
  }, { passive: true });
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

/**
 * Staggered Reveals — assign --stagger-index CSS custom properties to
 * [data-animate] children inside [data-animate-stagger] parents so the
 * CSS transition-delay can produce a cascading entrance.
 */
function initStaggeredReveals() {
  document.querySelectorAll('[data-animate-stagger]').forEach((parent) => {
    const children = parent.querySelectorAll('[data-animate]');
    children.forEach((child, i) => {
      child.style.setProperty('--stagger-index', i);
    });
  });
}

/**
 * Magnetic Hover Effect — CTA buttons get a subtle magnetic pull toward
 * the cursor when hovered, creating a playful, tactile feel.
 */
function initMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  document.querySelectorAll('.arca-btn-primary, .arca-btn-primary-inverted, .arca-btn-secondary').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/**
 * Text Reveal — elements with [data-text-reveal] get a word-by-word
 * fade-up animation when they scroll into view.
 */
function initTextReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('[data-text-reveal]').forEach((el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map((word, i) =>
      `<span style="display:inline-block;opacity:0;transform:translateY(8px);transition:opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s;">${word}</span>`
    ).join(' ');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('span').forEach((span) => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(el);
  });
}

/**
 * Animated Borders — cards with .arca-card get an animated gradient
 * border on hover for a subtle glow effect.
 */
function initAnimatedBorders() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.arca-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.borderImage = 'linear-gradient(135deg, rgba(59,125,216,0.3), rgba(13,124,107,0.3)) 1';
      card.style.borderImageSlice = '1';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderImage = '';
      card.style.borderImageSlice = '';
    });
  });
}

/**
 * Page Entrance — orchestrated entrance animation: hero section children
 * get sequential transition delays for a polished first-paint feel.
 */
function initPageEntrance() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.querySelector('section:first-of-type');
  if (!hero) return;

  // Animate hero children sequentially
  const animatables = hero.querySelectorAll('[data-animate]');
  animatables.forEach((el, i) => {
    el.style.transitionDelay = `${150 + i * 80}ms`;
  });
}

/**
 * Scroll-linked Parallax — elements with [data-parallax] shift vertically
 * based on scroll position for a layered depth effect.
 */
function initScrollParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length === 0) return;

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${-offset * 0.1}px)`;
      });
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Cursor Glow Trail — a radial gradient glow follows the cursor when it
 * hovers over dark hero sections, adding ambient atmosphere.
 */
function initCursorGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  const darkSections = document.querySelectorAll('.arca-bg-blue-900, .arca-cta-section');
  if (darkSections.length === 0) return;

  const glow = document.createElement('div');
  glow.style.cssText = 'position:fixed;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(59,125,216,0.08) 0%,transparent 70%);pointer-events:none;z-index:0;opacity:0;transition:opacity 0.3s ease;transform:translate(-50%,-50%);';
  document.body.appendChild(glow);

  let isInDark = false;

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';

    // Check if cursor is over a dark section
    let overDark = false;
    darkSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom && e.clientX >= rect.left && e.clientX <= rect.right) {
        overDark = true;
      }
    });

    if (overDark && !isInDark) {
      glow.style.opacity = '1';
      isInDark = true;
    } else if (!overDark && isInDark) {
      glow.style.opacity = '0';
      isInDark = false;
    }
  }, { passive: true });
}

/**
 * Smooth Counters — elements with [data-smooth-counter] smoothly animate
 * their numeric value from 0 to the target when scrolled into view.
 * Formats with commas. Duration 2s with easeOutExpo.
 */
function initSmoothCounters() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const counters = document.querySelectorAll('[data-smooth-counter]');
  if (counters.length === 0) return;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function formatWithCommas(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function animateCounter(el) {
    const raw = el.textContent.trim();
    // Extract numeric value — strip commas, %, +, etc.
    const suffix = raw.replace(/^[\d,.\-]+/, '');
    const prefix = raw.replace(/[\d,.\-]+.*$/, '');
    const numericStr = raw.replace(/[^\d.\-]/g, '');
    const target = parseFloat(numericStr);
    if (isNaN(target)) return;

    const hasDecimal = numericStr.includes('.');
    const decimalPlaces = hasDecimal ? (numericStr.split('.')[1] || '').length : 0;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = target * easedProgress;

      if (hasDecimal) {
        el.textContent = prefix + current.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      } else {
        el.textContent = prefix + formatWithCommas(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    el.textContent = prefix + (hasDecimal ? (0).toFixed(decimalPlaces) : '0') + suffix;
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach((el) => observer.observe(el));
}

/**
 * Reveal Lines — horizontal <hr> or .arca-section-divider elements grow
 * from center outward when scrolled into view (width 0 -> 100% over 0.8s).
 */
function initRevealLines() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lines = document.querySelectorAll('hr, .arca-section-divider');
  if (lines.length === 0) return;

  lines.forEach((line) => {
    line.style.transform = 'scaleX(0)';
    line.style.transformOrigin = 'center';
    line.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'scaleX(1)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  lines.forEach((line) => observer.observe(line));
}

/**
 * Card Tilt — cards with .arca-card get a subtle 3D perspective tilt on
 * mousemove (max 3deg), reset on leave. Desktop only, reduced-motion safe.
 */
function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  const cards = document.querySelectorAll('.arca-card');
  if (cards.length === 0) return;

  cards.forEach((card) => {
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 3;
      const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 3;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * Image Reveal — images inside [data-animate] containers get a clip-path
 * wipe reveal (from left) when the parent becomes visible.
 */
function initImageReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const containers = document.querySelectorAll('[data-animate]');
  if (containers.length === 0) return;

  const imgContainers = [];

  containers.forEach((container) => {
    const imgs = container.querySelectorAll('img');
    if (imgs.length === 0) return;

    imgs.forEach((img) => {
      img.style.clipPath = 'inset(0 100% 0 0)';
      img.style.transition = 'clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s';
    });

    imgContainers.push(container);
  });

  if (imgContainers.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const imgs = entry.target.querySelectorAll('img');
        imgs.forEach((img) => {
          img.style.clipPath = 'inset(0 0 0 0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  imgContainers.forEach((container) => observer.observe(container));
}

/**
 * Typing Effect — elements with [data-typing] get a typing cursor effect.
 * Text types out character by character when scrolled into view.
 * Speed: 30ms per char. Blinking cursor at end. Only for short text (<50 chars).
 */
function initTypingEffect() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll('[data-typing]');
  if (elements.length === 0) return;

  // Inject cursor keyframes once
  if (!document.getElementById('arca-typing-style')) {
    const style = document.createElement('style');
    style.id = 'arca-typing-style';
    style.textContent = `
      @keyframes arca-blink-cursor {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .arca-typing-cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background: currentColor;
        margin-left: 2px;
        vertical-align: text-bottom;
        animation: arca-blink-cursor 0.8s step-end infinite;
      }
    `;
    document.head.appendChild(style);
  }

  function typeText(el, fullText) {
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'arca-typing-cursor';
    el.appendChild(cursor);

    let i = 0;
    function typeChar() {
      if (i < fullText.length) {
        const textNode = document.createTextNode(fullText.charAt(i));
        el.insertBefore(textNode, cursor);
        i++;
        setTimeout(typeChar, 30);
      } else {
        // Remove cursor after 3 seconds
        setTimeout(() => {
          cursor.style.transition = 'opacity 0.3s ease';
          cursor.style.opacity = '0';
          setTimeout(() => cursor.remove(), 300);
        }, 3000);
      }
    }
    typeChar();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.getAttribute('data-typing') || el.textContent.trim();
        if (text.length > 0 && text.length < 50) {
          typeText(el, text);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  elements.forEach((el) => {
    // Store original text in data attribute if not already set
    if (!el.getAttribute('data-typing') || el.getAttribute('data-typing') === '') {
      el.setAttribute('data-typing', el.textContent.trim());
    }
    el.style.minHeight = '1.2em'; // Prevent layout shift
    observer.observe(el);
  });
}

/**
 * Number Ticker — stat elements (.arca-stat-lg, .arca-stat-sm) inside
 * [data-animate] elements get a rapid random-digit scramble effect before
 * settling on their final value (like a slot machine). 1s scramble then 0.5s settle.
 */
function initNumberTicker() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const statEls = document.querySelectorAll('[data-animate] .arca-stat-lg, [data-animate] .arca-stat-sm');
  if (statEls.length === 0) return;

  function scramble(el) {
    const originalText = el.textContent.trim();
    // Identify which characters are digits vs non-digits
    const chars = originalText.split('');
    const digitIndices = [];
    chars.forEach((ch, i) => {
      if (/\d/.test(ch)) digitIndices.push(i);
    });

    if (digitIndices.length === 0) return;

    const scrambleDuration = 1000;
    const settleDuration = 500;
    const totalDuration = scrambleDuration + settleDuration;
    const startTime = performance.now();
    // Track which indices have settled
    const settled = new Set();

    function tick(now) {
      const elapsed = now - startTime;

      if (elapsed >= totalDuration) {
        el.textContent = originalText;
        return;
      }

      const currentChars = [...chars];

      if (elapsed < scrambleDuration) {
        // Full scramble phase — randomize all digit positions
        digitIndices.forEach((idx) => {
          currentChars[idx] = String(Math.floor(Math.random() * 10));
        });
      } else {
        // Settle phase — progressively lock digits from left to right
        const settleProgress = (elapsed - scrambleDuration) / settleDuration;
        const numToSettle = Math.floor(settleProgress * digitIndices.length);

        digitIndices.forEach((idx, i) => {
          if (i < numToSettle) {
            currentChars[idx] = chars[idx]; // Final value
            settled.add(idx);
          } else {
            currentChars[idx] = String(Math.floor(Math.random() * 10));
          }
        });
      }

      el.textContent = currentChars.join('');
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Find stat elements within this container
        const stats = entry.target.querySelectorAll('.arca-stat-lg, .arca-stat-sm');
        stats.forEach((stat) => scramble(stat));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observe the [data-animate] parents, not the stat elements themselves
  const observed = new Set();
  statEls.forEach((stat) => {
    const parent = stat.closest('[data-animate]');
    if (parent && !observed.has(parent)) {
      observed.add(parent);
      observer.observe(parent);
    }
  });
}

/**
 * Scroll Velocity Text — elements with [data-scroll-speed] subtly skew
 * based on scroll velocity (max skewY: 2deg). Creates a dynamic parallax feel.
 * Resets when scroll stops.
 */
function initScrollVelocityText() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll('[data-scroll-speed]');
  if (elements.length === 0) return;

  let lastScrollY = window.scrollY;
  let velocity = 0;
  let ticking = false;
  let resetTimer = null;

  function onScroll() {
    const currentScrollY = window.scrollY;
    velocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      velocity = 0;
      applySkew();
    }, 150);

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        applySkew();
        ticking = false;
      });
    }
  }

  function applySkew() {
    // Clamp velocity to produce max 2deg skew
    const skew = Math.max(-2, Math.min(2, velocity * 0.08));

    elements.forEach((el) => {
      el.style.transform = `skewY(${skew}deg)`;
      el.style.transition = velocity === 0 ? 'transform 0.4s ease' : 'transform 0.1s ease';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Hover Ripple — buttons (.arca-btn-primary, .arca-btn-secondary) get a
 * ripple effect originating from click/tap position. Creates a <span> with
 * radial gradient that expands and fades.
 */
function initHoverRipple() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Inject ripple keyframes once
  if (!document.getElementById('arca-ripple-style')) {
    const style = document.createElement('style');
    style.id = 'arca-ripple-style';
    style.textContent = `
      @keyframes arca-ripple-expand {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0.4;
        }
        100% {
          transform: translate(-50%, -50%) scale(4);
          opacity: 0;
        }
      }
      .arca-ripple-span {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 40%, transparent 70%);
        animation: arca-ripple-expand 0.6s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }

  const buttons = document.querySelectorAll('.arca-btn-primary, .arca-btn-secondary');

  buttons.forEach((btn) => {
    // Ensure the button can contain the ripple
    const pos = window.getComputedStyle(btn).position;
    if (pos === 'static') btn.style.position = 'relative';

    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'arca-ripple-span';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      btn.appendChild(ripple);

      // Clean up after animation
      ripple.addEventListener('animationend', () => ripple.remove());
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
  initDropdowns();
  initNavigation();
  initAccordions();
  initTabs();
  initScrollProgress();
  initTableOfContents();
  initBackToTop();
  initAnchorLinks();
  initFormValidation();
  initParallaxOrbs();

  // Enhanced visual effects
  initStaggeredReveals();
  initMagneticButtons();
  initTextReveals();
  initAnimatedBorders();
  initPageEntrance();
  initScrollParallax();
  initCursorGlow();

  // New animations — motion & delight
  initSmoothCounters();
  initRevealLines();
  initCardTilt();
  initImageReveal();
  initTypingEffect();
  initNumberTicker();
  initScrollVelocityText();
  initHoverRipple();

  // Auto-init scroll animations on data-attribute elements
  document.querySelectorAll('[data-animate]').forEach((el) => {
    scrollController.observe(el);
  });

  // Animate section dividers on scroll
  document.querySelectorAll('.arca-section-divider').forEach((el) => {
    scrollController.observe(el);
  });
}

export { init, scrollController, perfMonitor, pauseControl };
