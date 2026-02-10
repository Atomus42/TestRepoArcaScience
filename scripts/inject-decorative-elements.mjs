/**
 * inject-decorative-elements.mjs
 *
 * Injects category-specific decorative SVG illustrations, glow orbs,
 * background patterns, and section dividers into all 59 page templates.
 *
 * Run: node scripts/inject-decorative-elements.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = join(process.cwd(), 'webflow-pages');
const SENTINEL = '<!-- arca-decor-injected -->';

// ─── Page Category Detection ────────────────────────────────────────────────

function getCategory(filename) {
  if (filename === 'homepage.html') return 'homepage';
  if (filename === 'security-compliance.html') return 'security'; // handled manually
  if (filename.startsWith('platform-')) return 'platform';
  if (filename.startsWith('ta-')) return 'therapeutic-area';
  if (filename.startsWith('phase-')) return 'phase';
  if (filename.startsWith('role-')) return 'role';
  if (filename.startsWith('evidence-')) return 'evidence';
  if (filename.startsWith('resource') || filename === 'resources.html') return 'resource';
  if (filename.startsWith('solution-')) return 'solution';
  if (['about.html', 'leadership.html', 'careers.html'].includes(filename)) return 'company';
  if (filename.startsWith('legal-')) return 'legal';
  if (filename === '404.html') return '404';
  if (filename === 'case-study.html') return 'case-study';
  if (filename === 'contact.html') return 'contact';
  if (filename === 'science-methodology.html') return 'science';
  return 'generic';
}

// ─── SVG Illustrations per Category ─────────────────────────────────────────

const SVG_PLATFORM = `
    <!-- arca-decor: platform circuit SVG -->
    <svg width="480" height="340" viewBox="0 0 480 340" fill="none" aria-hidden="true" style="position: absolute; right: -30px; top: 50%; transform: translateY(-50%); opacity: 0.1; pointer-events: none; z-index: 0;">
      <circle cx="120" cy="80" r="4" fill="rgba(59,125,216,0.6)"/>
      <circle cx="240" cy="60" r="3" fill="rgba(59,125,216,0.4)"/>
      <circle cx="360" cy="80" r="4" fill="rgba(59,125,216,0.6)"/>
      <circle cx="180" cy="170" r="6" fill="rgba(59,125,216,0.7)"/>
      <circle cx="300" cy="170" r="6" fill="rgba(59,125,216,0.7)"/>
      <circle cx="240" cy="170" r="10" fill="rgba(59,125,216,0.9)" opacity="0.8"/>
      <circle cx="120" cy="260" r="4" fill="rgba(59,125,216,0.5)"/>
      <circle cx="240" cy="280" r="3" fill="rgba(59,125,216,0.4)"/>
      <circle cx="360" cy="260" r="4" fill="rgba(59,125,216,0.5)"/>
      <line x1="120" y1="80" x2="180" y2="170" stroke="rgba(59,125,216,0.25)" stroke-width="1"/>
      <line x1="240" y1="60" x2="240" y2="170" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <line x1="360" y1="80" x2="300" y2="170" stroke="rgba(59,125,216,0.25)" stroke-width="1"/>
      <line x1="180" y1="170" x2="240" y2="170" stroke="rgba(59,125,216,0.3)" stroke-width="1.5"/>
      <line x1="240" y1="170" x2="300" y2="170" stroke="rgba(59,125,216,0.3)" stroke-width="1.5"/>
      <line x1="180" y1="170" x2="120" y2="260" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <line x1="240" y1="170" x2="240" y2="280" stroke="rgba(59,125,216,0.15)" stroke-width="1"/>
      <line x1="300" y1="170" x2="360" y2="260" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <rect x="220" y="150" width="40" height="40" rx="6" stroke="rgba(59,125,216,0.3)" stroke-width="1" fill="none"/>
      <path d="M80 170 L120 80" stroke="rgba(59,125,216,0.1)" stroke-width="1" stroke-dasharray="4 4"/>
      <path d="M400 170 L360 80" stroke="rgba(59,125,216,0.1)" stroke-width="1" stroke-dasharray="4 4"/>
    </svg>`;

const SVG_MOLECULE = `
    <!-- arca-decor: molecule network SVG -->
    <svg width="420" height="320" viewBox="0 0 420 320" fill="none" aria-hidden="true" style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); opacity: 0.12; pointer-events: none; z-index: 0;">
      <circle cx="210" cy="160" r="16" stroke="rgba(13,124,107,0.5)" stroke-width="1.5" fill="none"/>
      <circle cx="210" cy="160" r="6" fill="rgba(13,124,107,0.3)"/>
      <circle cx="290" cy="100" r="10" stroke="rgba(13,124,107,0.4)" stroke-width="1" fill="none"/>
      <circle cx="130" cy="100" r="10" stroke="rgba(13,124,107,0.4)" stroke-width="1" fill="none"/>
      <circle cx="290" cy="220" r="10" stroke="rgba(13,124,107,0.4)" stroke-width="1" fill="none"/>
      <circle cx="130" cy="220" r="10" stroke="rgba(13,124,107,0.4)" stroke-width="1" fill="none"/>
      <circle cx="350" cy="160" r="7" stroke="rgba(13,124,107,0.3)" stroke-width="1" fill="none"/>
      <circle cx="70" cy="160" r="7" stroke="rgba(13,124,107,0.3)" stroke-width="1" fill="none"/>
      <circle cx="330" cy="60" r="5" fill="rgba(13,124,107,0.2)"/>
      <circle cx="90" cy="60" r="5" fill="rgba(13,124,107,0.2)"/>
      <circle cx="330" cy="260" r="5" fill="rgba(13,124,107,0.2)"/>
      <circle cx="90" cy="260" r="5" fill="rgba(13,124,107,0.2)"/>
      <line x1="210" y1="160" x2="290" y2="100" stroke="rgba(13,124,107,0.3)" stroke-width="1.5"/>
      <line x1="210" y1="160" x2="130" y2="100" stroke="rgba(13,124,107,0.3)" stroke-width="1.5"/>
      <line x1="210" y1="160" x2="290" y2="220" stroke="rgba(13,124,107,0.3)" stroke-width="1.5"/>
      <line x1="210" y1="160" x2="130" y2="220" stroke="rgba(13,124,107,0.3)" stroke-width="1.5"/>
      <line x1="290" y1="100" x2="350" y2="160" stroke="rgba(13,124,107,0.2)" stroke-width="1"/>
      <line x1="130" y1="100" x2="70" y2="160" stroke="rgba(13,124,107,0.2)" stroke-width="1"/>
      <line x1="290" y1="100" x2="330" y2="60" stroke="rgba(13,124,107,0.15)" stroke-width="1"/>
      <line x1="130" y1="100" x2="90" y2="60" stroke="rgba(13,124,107,0.15)" stroke-width="1"/>
      <line x1="290" y1="220" x2="330" y2="260" stroke="rgba(13,124,107,0.15)" stroke-width="1"/>
      <line x1="130" y1="220" x2="90" y2="260" stroke="rgba(13,124,107,0.15)" stroke-width="1"/>
    </svg>`;

const SVG_TIMELINE = `
    <!-- arca-decor: timeline SVG -->
    <svg width="460" height="200" viewBox="0 0 460 200" fill="none" aria-hidden="true" style="position: absolute; right: 0; bottom: 20px; opacity: 0.1; pointer-events: none; z-index: 0;">
      <line x1="40" y1="100" x2="420" y2="100" stroke="rgba(67,56,202,0.4)" stroke-width="2" stroke-dasharray="6 4"/>
      <circle cx="80" cy="100" r="8" stroke="rgba(67,56,202,0.5)" stroke-width="1.5" fill="rgba(67,56,202,0.1)"/>
      <circle cx="160" cy="100" r="8" stroke="rgba(67,56,202,0.5)" stroke-width="1.5" fill="rgba(67,56,202,0.1)"/>
      <circle cx="240" cy="100" r="12" stroke="rgba(67,56,202,0.6)" stroke-width="2" fill="rgba(67,56,202,0.15)"/>
      <circle cx="320" cy="100" r="8" stroke="rgba(67,56,202,0.5)" stroke-width="1.5" fill="rgba(67,56,202,0.1)"/>
      <circle cx="400" cy="100" r="8" stroke="rgba(67,56,202,0.5)" stroke-width="1.5" fill="rgba(67,56,202,0.1)"/>
      <path d="M80 80 L80 50" stroke="rgba(67,56,202,0.2)" stroke-width="1"/>
      <path d="M160 80 L160 60" stroke="rgba(67,56,202,0.15)" stroke-width="1"/>
      <path d="M240 75 L240 40" stroke="rgba(67,56,202,0.25)" stroke-width="1"/>
      <path d="M320 80 L320 60" stroke="rgba(67,56,202,0.15)" stroke-width="1"/>
      <path d="M400 80 L400 50" stroke="rgba(67,56,202,0.2)" stroke-width="1"/>
      <rect x="65" y="35" width="30" height="14" rx="2" stroke="rgba(67,56,202,0.2)" stroke-width="0.5" fill="none"/>
      <rect x="225" y="25" width="30" height="14" rx="2" stroke="rgba(67,56,202,0.3)" stroke-width="0.5" fill="none"/>
      <rect x="385" y="35" width="30" height="14" rx="2" stroke="rgba(67,56,202,0.2)" stroke-width="0.5" fill="none"/>
    </svg>`;

const SVG_DASHBOARD = `
    <!-- arca-decor: dashboard wireframe SVG -->
    <svg width="400" height="300" viewBox="0 0 400 300" fill="none" aria-hidden="true" style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); opacity: 0.08; pointer-events: none; z-index: 0;">
      <rect x="40" y="40" width="320" height="220" rx="8" stroke="rgba(59,125,216,0.4)" stroke-width="1.5" fill="none"/>
      <line x1="40" y1="80" x2="360" y2="80" stroke="rgba(59,125,216,0.3)" stroke-width="1"/>
      <rect x="55" y="55" width="40" height="12" rx="2" fill="rgba(59,125,216,0.15)"/>
      <rect x="110" y="55" width="30" height="12" rx="2" fill="rgba(59,125,216,0.1)"/>
      <rect x="155" y="55" width="30" height="12" rx="2" fill="rgba(59,125,216,0.1)"/>
      <line x1="140" y1="80" x2="140" y2="260" stroke="rgba(59,125,216,0.15)" stroke-width="1"/>
      <rect x="55" y="95" width="70" height="10" rx="2" fill="rgba(59,125,216,0.12)"/>
      <rect x="55" y="115" width="70" height="10" rx="2" fill="rgba(59,125,216,0.08)"/>
      <rect x="55" y="135" width="70" height="10" rx="2" fill="rgba(59,125,216,0.08)"/>
      <rect x="55" y="155" width="70" height="10" rx="2" fill="rgba(59,125,216,0.08)"/>
      <rect x="55" y="175" width="70" height="10" rx="2" fill="rgba(59,125,216,0.08)"/>
      <rect x="160" y="95" width="180" height="80" rx="4" stroke="rgba(59,125,216,0.2)" stroke-width="1" fill="none"/>
      <line x1="175" y1="160" x2="175" y2="130" stroke="rgba(59,125,216,0.2)" stroke-width="8"/>
      <line x1="200" y1="160" x2="200" y2="120" stroke="rgba(59,125,216,0.25)" stroke-width="8"/>
      <line x1="225" y1="160" x2="225" y2="140" stroke="rgba(59,125,216,0.15)" stroke-width="8"/>
      <line x1="250" y1="160" x2="250" y2="110" stroke="rgba(59,125,216,0.3)" stroke-width="8"/>
      <line x1="275" y1="160" x2="275" y2="125" stroke="rgba(59,125,216,0.2)" stroke-width="8"/>
      <line x1="300" y1="160" x2="300" y2="135" stroke="rgba(59,125,216,0.15)" stroke-width="8"/>
      <line x1="325" y1="160" x2="325" y2="115" stroke="rgba(59,125,216,0.25)" stroke-width="8"/>
      <rect x="160" y="190" width="85" height="55" rx="4" stroke="rgba(59,125,216,0.15)" stroke-width="1" fill="none"/>
      <rect x="255" y="190" width="85" height="55" rx="4" stroke="rgba(59,125,216,0.15)" stroke-width="1" fill="none"/>
    </svg>`;

const SVG_CHART = `
    <!-- arca-decor: evidence chart SVG -->
    <svg width="380" height="280" viewBox="0 0 380 280" fill="none" aria-hidden="true" style="position: absolute; right: -10px; top: 50%; transform: translateY(-50%); opacity: 0.1; pointer-events: none; z-index: 0;">
      <rect x="60" y="40" width="280" height="200" rx="6" stroke="rgba(22,128,60,0.3)" stroke-width="1" fill="none"/>
      <line x1="90" y1="200" x2="310" y2="200" stroke="rgba(22,128,60,0.2)" stroke-width="1"/>
      <line x1="90" y1="160" x2="310" y2="160" stroke="rgba(22,128,60,0.08)" stroke-width="1" stroke-dasharray="4 4"/>
      <line x1="90" y1="120" x2="310" y2="120" stroke="rgba(22,128,60,0.08)" stroke-width="1" stroke-dasharray="4 4"/>
      <line x1="90" y1="80" x2="310" y2="80" stroke="rgba(22,128,60,0.08)" stroke-width="1" stroke-dasharray="4 4"/>
      <polyline points="100,180 140,150 180,160 220,110 260,90 300,70" stroke="rgba(22,128,60,0.4)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="100,190 140,170 180,175 220,140 260,130 300,120" stroke="rgba(13,124,107,0.3)" stroke-width="1.5" fill="none" stroke-dasharray="6 3" stroke-linecap="round"/>
      <circle cx="220" cy="110" r="4" fill="rgba(22,128,60,0.4)"/>
      <circle cx="300" cy="70" r="4" fill="rgba(22,128,60,0.5)"/>
    </svg>`;

const SVG_FUNNEL = `
    <!-- arca-decor: solution funnel SVG -->
    <svg width="400" height="320" viewBox="0 0 400 320" fill="none" aria-hidden="true" style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); opacity: 0.09; pointer-events: none; z-index: 0;">
      <path d="M80 60 L320 60 L260 160 L260 240 L140 240 L140 160 Z" stroke="rgba(59,125,216,0.35)" stroke-width="1.5" fill="none"/>
      <line x1="100" y1="90" x2="300" y2="90" stroke="rgba(59,125,216,0.15)" stroke-width="1"/>
      <line x1="120" y1="120" x2="280" y2="120" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="140" y1="160" x2="260" y2="160" stroke="rgba(59,125,216,0.1)" stroke-width="1"/>
      <circle cx="150" cy="75" r="3" fill="rgba(59,125,216,0.3)"/>
      <circle cx="200" cy="70" r="3" fill="rgba(59,125,216,0.25)"/>
      <circle cx="250" cy="75" r="3" fill="rgba(59,125,216,0.3)"/>
      <circle cx="175" cy="105" r="3" fill="rgba(59,125,216,0.25)"/>
      <circle cx="225" cy="105" r="3" fill="rgba(59,125,216,0.25)"/>
      <circle cx="200" cy="140" r="3" fill="rgba(59,125,216,0.2)"/>
      <circle cx="200" cy="200" r="5" fill="rgba(59,125,216,0.35)"/>
      <path d="M185 260 L200 280 L215 260" stroke="rgba(59,125,216,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`;

const SVG_NETWORK = `
    <!-- arca-decor: company network SVG -->
    <svg width="400" height="300" viewBox="0 0 400 300" fill="none" aria-hidden="true" style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); opacity: 0.1; pointer-events: none; z-index: 0;">
      <circle cx="200" cy="150" r="14" stroke="rgba(59,125,216,0.4)" stroke-width="1.5" fill="rgba(59,125,216,0.08)"/>
      <circle cx="120" cy="80" r="10" stroke="rgba(59,125,216,0.3)" stroke-width="1" fill="rgba(59,125,216,0.05)"/>
      <circle cx="280" cy="80" r="10" stroke="rgba(59,125,216,0.3)" stroke-width="1" fill="rgba(59,125,216,0.05)"/>
      <circle cx="120" cy="220" r="10" stroke="rgba(59,125,216,0.3)" stroke-width="1" fill="rgba(59,125,216,0.05)"/>
      <circle cx="280" cy="220" r="10" stroke="rgba(59,125,216,0.3)" stroke-width="1" fill="rgba(59,125,216,0.05)"/>
      <circle cx="60" cy="150" r="7" stroke="rgba(59,125,216,0.2)" stroke-width="1" fill="none"/>
      <circle cx="340" cy="150" r="7" stroke="rgba(59,125,216,0.2)" stroke-width="1" fill="none"/>
      <circle cx="200" cy="50" r="7" stroke="rgba(59,125,216,0.2)" stroke-width="1" fill="none"/>
      <circle cx="200" cy="250" r="7" stroke="rgba(59,125,216,0.2)" stroke-width="1" fill="none"/>
      <line x1="200" y1="150" x2="120" y2="80" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <line x1="200" y1="150" x2="280" y2="80" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <line x1="200" y1="150" x2="120" y2="220" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <line x1="200" y1="150" x2="280" y2="220" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <line x1="120" y1="80" x2="60" y2="150" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="280" y1="80" x2="340" y2="150" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="120" y1="80" x2="200" y2="50" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="280" y1="80" x2="200" y2="50" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="120" y1="220" x2="200" y2="250" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="280" y1="220" x2="200" y2="250" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
    </svg>`;

const SVG_BOOK = `
    <!-- arca-decor: resource book SVG -->
    <svg width="320" height="260" viewBox="0 0 320 260" fill="none" aria-hidden="true" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); opacity: 0.08; pointer-events: none; z-index: 0;">
      <path d="M160 50 L160 220" stroke="rgba(59,125,216,0.3)" stroke-width="1.5"/>
      <path d="M160 50 Q100 40 60 60 L60 220 Q100 200 160 220" stroke="rgba(59,125,216,0.25)" stroke-width="1.5" fill="none"/>
      <path d="M160 50 Q220 40 260 60 L260 220 Q220 200 160 220" stroke="rgba(59,125,216,0.25)" stroke-width="1.5" fill="none"/>
      <line x1="80" y1="90" x2="140" y2="85" stroke="rgba(59,125,216,0.15)" stroke-width="1"/>
      <line x1="80" y1="110" x2="140" y2="105" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="80" y1="130" x2="140" y2="125" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="80" y1="150" x2="140" y2="145" stroke="rgba(59,125,216,0.1)" stroke-width="1"/>
      <line x1="180" y1="85" x2="240" y2="90" stroke="rgba(59,125,216,0.15)" stroke-width="1"/>
      <line x1="180" y1="105" x2="240" y2="110" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="180" y1="125" x2="240" y2="130" stroke="rgba(59,125,216,0.12)" stroke-width="1"/>
      <line x1="180" y1="145" x2="240" y2="150" stroke="rgba(59,125,216,0.1)" stroke-width="1"/>
      <path d="M140 230 L160 245 L180 230" stroke="rgba(59,125,216,0.2)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`;

const SVG_CONTACT = `
    <!-- arca-decor: contact wave SVG -->
    <svg width="500" height="200" viewBox="0 0 500 200" fill="none" aria-hidden="true" style="position: absolute; left: 0; bottom: 0; width: 100%; opacity: 0.06; pointer-events: none; z-index: 0;">
      <path d="M0 150 Q125 100 250 150 Q375 200 500 150 L500 200 L0 200 Z" fill="rgba(59,125,216,0.3)"/>
      <path d="M0 160 Q125 120 250 160 Q375 200 500 160" stroke="rgba(59,125,216,0.4)" stroke-width="1" fill="none"/>
    </svg>`;

const SVG_SCIENCE = `
    <!-- arca-decor: science DNA helix SVG -->
    <svg width="360" height="340" viewBox="0 0 360 340" fill="none" aria-hidden="true" style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); opacity: 0.1; pointer-events: none; z-index: 0;">
      <path d="M120 30 Q180 80 180 120 Q180 160 120 200 Q60 240 60 280 Q60 310 120 340" stroke="rgba(13,124,107,0.35)" stroke-width="1.5" fill="none"/>
      <path d="M240 30 Q180 80 180 120 Q180 160 240 200 Q300 240 300 280 Q300 310 240 340" stroke="rgba(13,124,107,0.35)" stroke-width="1.5" fill="none"/>
      <line x1="145" y1="55" x2="215" y2="55" stroke="rgba(13,124,107,0.2)" stroke-width="1"/>
      <line x1="170" y1="90" x2="190" y2="90" stroke="rgba(13,124,107,0.15)" stroke-width="1"/>
      <line x1="175" y1="120" x2="185" y2="120" stroke="rgba(13,124,107,0.12)" stroke-width="1"/>
      <line x1="145" y1="165" x2="215" y2="165" stroke="rgba(13,124,107,0.2)" stroke-width="1"/>
      <line x1="115" y1="200" x2="245" y2="200" stroke="rgba(13,124,107,0.2)" stroke-width="1"/>
      <line x1="90" y1="240" x2="270" y2="240" stroke="rgba(13,124,107,0.15)" stroke-width="1"/>
      <line x1="75" y1="275" x2="285" y2="275" stroke="rgba(13,124,107,0.12)" stroke-width="1"/>
      <circle cx="145" cy="55" r="3" fill="rgba(13,124,107,0.3)"/>
      <circle cx="215" cy="55" r="3" fill="rgba(13,124,107,0.3)"/>
      <circle cx="180" cy="120" r="4" fill="rgba(13,124,107,0.25)"/>
      <circle cx="115" cy="200" r="3" fill="rgba(13,124,107,0.25)"/>
      <circle cx="245" cy="200" r="3" fill="rgba(13,124,107,0.25)"/>
    </svg>`;

const SVG_404 = `
    <!-- arca-decor: 404 broken circuit SVG -->
    <svg width="400" height="300" viewBox="0 0 400 300" fill="none" aria-hidden="true" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); opacity: 0.1; pointer-events: none; z-index: 0;">
      <circle cx="200" cy="150" r="12" stroke="rgba(59,125,216,0.4)" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>
      <circle cx="120" cy="80" r="6" fill="rgba(59,125,216,0.3)"/>
      <circle cx="280" cy="80" r="6" fill="rgba(59,125,216,0.3)"/>
      <circle cx="120" cy="220" r="6" fill="rgba(59,125,216,0.3)"/>
      <circle cx="280" cy="220" r="6" fill="rgba(59,125,216,0.3)"/>
      <line x1="120" y1="80" x2="185" y2="140" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <line x1="280" y1="80" x2="215" y2="140" stroke="rgba(59,125,216,0.2)" stroke-width="1" stroke-dasharray="6 4"/>
      <line x1="120" y1="220" x2="185" y2="160" stroke="rgba(59,125,216,0.2)" stroke-width="1" stroke-dasharray="6 4"/>
      <line x1="280" y1="220" x2="215" y2="160" stroke="rgba(59,125,216,0.2)" stroke-width="1"/>
      <text x="190" y="156" font-size="18" fill="rgba(59,125,216,0.25)" font-family="monospace">?</text>
    </svg>`;

// ─── Glow Orb Templates ─────────────────────────────────────────────────────

function makeGlowOrbs(color = 'blue') {
  const colors = {
    blue: { primary: 'rgba(59, 125, 216, 0.12)', secondary: 'rgba(13, 124, 107, 0.08)' },
    teal: { primary: 'rgba(13, 124, 107, 0.12)', secondary: 'rgba(59, 125, 216, 0.06)' },
    indigo: { primary: 'rgba(67, 56, 202, 0.12)', secondary: 'rgba(59, 125, 216, 0.06)' },
    green: { primary: 'rgba(22, 128, 60, 0.10)', secondary: 'rgba(13, 124, 107, 0.06)' },
  };
  const c = colors[color] || colors.blue;
  return `
      <!-- arca-decor: glow orbs -->
      <div style="position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, ${c.primary} 0%, transparent 70%); border-radius: 50%; filter: blur(60px); pointer-events: none; animation: as-float 8s ease-in-out infinite; z-index: 0;"></div>
      <div style="position: absolute; bottom: -80px; left: -80px; width: 400px; height: 400px; background: radial-gradient(circle, ${c.secondary} 0%, transparent 70%); border-radius: 50%; filter: blur(60px); pointer-events: none; animation: as-float 10s ease-in-out infinite reverse; z-index: 0;"></div>`;
}

function makeCtaOrbs() {
  return `
      <!-- arca-decor: CTA glow orbs -->
      <div style="position: absolute; top: -60px; left: -60px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%); border-radius: 50%; filter: blur(40px); pointer-events: none; animation: as-float 7s ease-in-out infinite; z-index: 0;"></div>
      <div style="position: absolute; bottom: -40px; right: -40px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%); border-radius: 50%; filter: blur(40px); pointer-events: none; animation: as-float 9s ease-in-out infinite reverse; z-index: 0;"></div>`;
}

// ─── Category Config ─────────────────────────────────────────────────────────

const CATEGORY_CONFIG = {
  homepage: { skip: true },
  security: { skip: true }, // enhanced manually
  platform: {
    heroSvg: SVG_PLATFORM,
    glowColor: 'blue',
    sectionBgClass: 'arca-bg-dots',
  },
  'therapeutic-area': {
    heroSvg: SVG_MOLECULE,
    glowColor: 'teal',
    sectionBgClass: 'arca-bg-rings',
  },
  phase: {
    heroSvg: SVG_TIMELINE,
    glowColor: 'indigo',
    sectionBgClass: 'arca-bg-cross',
  },
  role: {
    heroSvg: SVG_DASHBOARD,
    glowColor: 'blue',
    sectionBgClass: 'arca-bg-dots',
  },
  evidence: {
    heroSvg: SVG_CHART,
    glowColor: 'green',
    sectionBgClass: 'arca-bg-mesh',
  },
  resource: {
    heroSvg: SVG_BOOK,
    glowColor: 'blue',
    sectionBgClass: 'arca-bg-mesh',
  },
  solution: {
    heroSvg: SVG_FUNNEL,
    glowColor: 'blue',
    sectionBgClass: 'arca-bg-dots',
  },
  company: {
    heroSvg: SVG_NETWORK,
    glowColor: 'blue',
    sectionBgClass: 'arca-bg-mesh',
  },
  contact: {
    heroSvg: SVG_CONTACT,
    glowColor: 'blue',
    sectionBgClass: 'arca-bg-mesh',
  },
  science: {
    heroSvg: SVG_SCIENCE,
    glowColor: 'teal',
    sectionBgClass: 'arca-bg-rings',
  },
  legal: {
    heroSvg: null,
    glowColor: 'blue',
    sectionBgClass: null, // legal pages stay clean
  },
  '404': {
    heroSvg: SVG_404,
    glowColor: 'blue',
    sectionBgClass: 'arca-bg-dots',
  },
  'case-study': {
    heroSvg: SVG_CHART,
    glowColor: 'green',
    sectionBgClass: 'arca-bg-mesh',
  },
  generic: {
    heroSvg: null,
    glowColor: 'blue',
    sectionBgClass: 'arca-bg-mesh',
  },
};

// ─── Injection Logic ─────────────────────────────────────────────────────────

function processPage(filename) {
  const filepath = join(PAGES_DIR, filename);
  let html = readFileSync(filepath, 'utf-8');

  // Skip already-injected pages
  if (html.includes(SENTINEL)) {
    console.log(`  [skip] ${filename} — already injected`);
    return false;
  }

  const category = getCategory(filename);
  const config = CATEGORY_CONFIG[category];

  if (!config || config.skip) {
    console.log(`  [skip] ${filename} — category "${category}" skipped`);
    return false;
  }

  let modified = false;

  // 1. Inject glow orbs + SVG into dark hero sections (arca-bg-blue-900)
  const darkHeroRegex = /(<section[^>]*class="[^"]*arca-bg-blue-900[^"]*"[^>]*)(>)/;
  const darkHeroMatch = html.match(darkHeroRegex);
  if (darkHeroMatch) {
    const openTag = darkHeroMatch[0];
    // Add position: relative; overflow: hidden to the section if not present
    let newOpenTag = openTag;
    if (!openTag.includes('position: relative')) {
      if (openTag.includes('style="')) {
        newOpenTag = newOpenTag.replace('style="', 'style="position: relative; overflow: hidden; ');
      } else {
        newOpenTag = newOpenTag.replace('>', ' style="position: relative; overflow: hidden;">');
      }
    } else if (!openTag.includes('overflow: hidden')) {
      newOpenTag = newOpenTag.replace('position: relative;', 'position: relative; overflow: hidden;');
    }

    // Build decorative elements
    let decorElems = '\n' + SENTINEL;
    decorElems += makeGlowOrbs(config.glowColor);
    if (config.heroSvg) {
      decorElems += '\n' + config.heroSvg;
    }
    decorElems += '\n';

    // Inject right after the opening section tag
    html = html.replace(openTag, newOpenTag + decorElems);

    // Ensure the first inner div has position: relative; z-index: 1
    // Find the first <div after the section opening
    const afterSection = html.indexOf(newOpenTag + decorElems) + (newOpenTag + decorElems).length;
    const nextDivStart = html.indexOf('<div', afterSection);
    if (nextDivStart !== -1 && nextDivStart - afterSection < 200) {
      const nextDivEnd = html.indexOf('>', nextDivStart);
      const divTag = html.substring(nextDivStart, nextDivEnd + 1);
      if (!divTag.includes('z-index')) {
        let newDivTag;
        if (divTag.includes('style="')) {
          newDivTag = divTag.replace('style="', 'style="position: relative; z-index: 1; ');
        } else {
          newDivTag = divTag.replace('>', ' style="position: relative; z-index: 1;">');
        }
        html = html.substring(0, nextDivStart) + newDivTag + html.substring(nextDivEnd + 1);
      }
    }

    modified = true;
  }

  // 2. Add section background pattern class to grey-50 sections
  if (config.sectionBgClass) {
    const greyPattern = /class="([^"]*arca-bg-grey-50[^"]*)"/g;
    html = html.replace(greyPattern, (match, classes) => {
      if (classes.includes(config.sectionBgClass)) return match;
      return `class="${classes} ${config.sectionBgClass}"`;
    });
    modified = true;
  }

  // 3. Add glow orbs to CTA sections
  const ctaRegex = /(<section[^>]*class="[^"]*arca-cta-section[^"]*"[^>]*)(>)/;
  const ctaMatch = html.match(ctaRegex);
  if (ctaMatch && !html.includes('arca-decor: CTA glow orbs')) {
    const ctaOpenTag = ctaMatch[0];
    let newCtaTag = ctaOpenTag;
    if (!ctaOpenTag.includes('position: relative')) {
      if (ctaOpenTag.includes('style="')) {
        newCtaTag = newCtaTag.replace('style="', 'style="position: relative; overflow: hidden; ');
      } else {
        newCtaTag = newCtaTag.replace('>', ' style="position: relative; overflow: hidden;">');
      }
    }
    const ctaDecor = '\n' + makeCtaOrbs() + '\n';
    html = html.replace(ctaOpenTag, newCtaTag + ctaDecor);

    // Ensure the CTA inner content div has z-index
    const ctaInsertEnd = html.indexOf(newCtaTag + ctaDecor) + (newCtaTag + ctaDecor).length;
    const nextCtaDiv = html.indexOf('<div', ctaInsertEnd);
    if (nextCtaDiv !== -1 && nextCtaDiv - ctaInsertEnd < 200) {
      const nextCtaDivEnd = html.indexOf('>', nextCtaDiv);
      const ctaDivTag = html.substring(nextCtaDiv, nextCtaDivEnd + 1);
      if (!ctaDivTag.includes('z-index')) {
        let newCtaDivTag;
        if (ctaDivTag.includes('style="')) {
          newCtaDivTag = ctaDivTag.replace('style="', 'style="position: relative; z-index: 1; ');
        } else {
          newCtaDivTag = ctaDivTag.replace('>', ' style="position: relative; z-index: 1;">');
        }
        html = html.substring(0, nextCtaDiv) + newCtaDivTag + html.substring(nextCtaDivEnd + 1);
      }
    }

    modified = true;
  }

  // 4. Add section dividers between major sections (before grey-50 sections)
  // Insert a gradient divider before each arca-bg-grey-50 section
  const dividerHtml = '\n    <div class="arca-section-divider" aria-hidden="true"></div>\n';
  html = html.replace(/(\n\s*<section[^>]*class="[^"]*arca-bg-grey-50)/g, (match) => {
    // Don't double-insert
    if (html.substring(html.indexOf(match) - 80, html.indexOf(match)).includes('arca-section-divider')) {
      return match;
    }
    return dividerHtml + match;
  });

  if (modified) {
    writeFileSync(filepath, html, 'utf-8');
    console.log(`  [done] ${filename} — category: ${category}`);
  }
  return modified;
}

// ─── Main ────────────────────────────────────────────────────────────────────

const files = readdirSync(PAGES_DIR).filter(f => f.endsWith('.html')).sort();
console.log(`\nInjecting decorative elements into ${files.length} pages...\n`);

let count = 0;
for (const file of files) {
  if (processPage(file)) count++;
}

console.log(`\nDone. ${count} pages updated, ${files.length - count} skipped.\n`);
