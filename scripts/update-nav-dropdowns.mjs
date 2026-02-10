#!/usr/bin/env node
/**
 * Updates all 59 webflow page templates with proper dropdown navigation menus.
 * Replaces the empty placeholder dropdown divs with fully-populated dropdown menus.
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const PAGES_DIR = join(process.cwd(), 'webflow-pages');

// The old nav patterns to find and replace
const OLD_PLATFORM_DROPDOWN = `        <!-- Platform dropdown -->
        <div style="position: relative;">
          <a href="/platform-overview" class="arca-nav-link">Platform</a>
          <!-- Webflow: Use Dropdown component. Items below. -->
        </div>`;

const OLD_PLATFORM_DROPDOWN_ACTIVE = `        <!-- Platform dropdown -->
        <div style="position: relative;">
          <a href="/platform-overview" class="arca-nav-link is-active">Platform</a>
          <!-- Webflow: Use Dropdown component. Items below. -->
        </div>`;

const OLD_SOLUTIONS_DROPDOWN = `        <!-- Solutions dropdown -->
        <div style="position: relative;">
          <a href="/solution-therapeutic-area" class="arca-nav-link">Solutions</a>
        </div>`;

const OLD_SOLUTIONS_DROPDOWN_ACTIVE = `        <!-- Solutions dropdown -->
        <div style="position: relative;">
          <a href="/solution-therapeutic-area" class="arca-nav-link is-active">Solutions</a>
        </div>`;

// New dropdown with full menu items
function platformDropdown(isActive) {
  const activeClass = isActive ? ' is-active' : '';
  return `        <!-- Platform dropdown -->
        <div style="position: relative;" class="arca-nav-dropdown-wrap">
          <a href="/platform-overview" class="arca-nav-link${activeClass}">Platform <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left: 4px; vertical-align: middle;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <div class="arca-nav-dropdown" style="position: absolute; top: 100%; left: -12px; min-width: 260px; padding: 8px 0; background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(209,213,222,0.5); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.08); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity 200ms ease, transform 200ms ease, visibility 200ms; z-index: 100;">
            <a href="/platform-overview" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Platform Overview</a>
            <a href="/platform-how-it-works" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">How It Works</a>
            <a href="/platform-data-intelligence" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Data Intelligence</a>
            <a href="/platform-ai-models" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">AI Models</a>
            <a href="/platform-outputs" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Regulatory Outputs</a>
            <a href="/platform-integrations" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Integrations</a>
            <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(35,86,160,0.15), transparent); margin: 6px 12px;"></div>
            <a href="/security-compliance" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Security &amp; Compliance</a>
          </div>
        </div>`;
}

function solutionsDropdown(isActive) {
  const activeClass = isActive ? ' is-active' : '';
  return `        <!-- Solutions dropdown -->
        <div style="position: relative;" class="arca-nav-dropdown-wrap">
          <a href="/solution-therapeutic-area" class="arca-nav-link${activeClass}">Solutions <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left: 4px; vertical-align: middle;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <div class="arca-nav-dropdown" style="position: absolute; top: 100%; left: -12px; min-width: 260px; padding: 8px 0; background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(209,213,222,0.5); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.08); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity 200ms ease, transform 200ms ease, visibility 200ms; z-index: 100;">
            <p style="padding: 6px 16px 4px; font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-400); margin: 0;">By Approach</p>
            <a href="/solution-therapeutic-area" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">By Therapeutic Area</a>
            <a href="/solution-lifecycle-phase" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">By Lifecycle Phase</a>
            <a href="/solution-role" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">By Role</a>
            <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(35,86,160,0.15), transparent); margin: 6px 12px;"></div>
            <p style="padding: 6px 16px 4px; font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-400); margin: 0;">By Stage</p>
            <a href="/solution-early-development" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Early Development</a>
            <a href="/solution-late-development" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Late Development</a>
            <a href="/solution-post-marketing" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Post-Marketing</a>
            <a href="/solution-market-access" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Market Access</a>
          </div>
        </div>`;
}

// Also add Evidence, Company, and Resources dropdowns
const OLD_EVIDENCE_LINK = `        <a href="/evidence-case-studies-hub" class="arca-nav-link">Evidence</a>`;
const OLD_EVIDENCE_LINK_ACTIVE = `        <a href="/evidence-case-studies-hub" class="arca-nav-link is-active">Evidence</a>`;

function evidenceDropdown(isActive) {
  const activeClass = isActive ? ' is-active' : '';
  return `        <div style="position: relative;" class="arca-nav-dropdown-wrap">
          <a href="/evidence-case-studies-hub" class="arca-nav-link${activeClass}">Evidence <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left: 4px; vertical-align: middle;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <div class="arca-nav-dropdown" style="position: absolute; top: 100%; left: -12px; min-width: 220px; padding: 8px 0; background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(209,213,222,0.5); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.08); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity 200ms ease, transform 200ms ease, visibility 200ms; z-index: 100;">
            <a href="/evidence-case-studies-hub" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Case Studies</a>
            <a href="/evidence-publications" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Publications</a>
            <a href="/evidence-metrics" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Platform Metrics</a>
          </div>
        </div>`;
}

const OLD_COMPANY_LINK = `        <a href="/about" class="arca-nav-link">Company</a>`;
const OLD_COMPANY_LINK_ACTIVE = `        <a href="/about" class="arca-nav-link is-active">Company</a>`;

function companyDropdown(isActive) {
  const activeClass = isActive ? ' is-active' : '';
  return `        <div style="position: relative;" class="arca-nav-dropdown-wrap">
          <a href="/about" class="arca-nav-link${activeClass}">Company <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left: 4px; vertical-align: middle;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <div class="arca-nav-dropdown" style="position: absolute; top: 100%; left: -12px; min-width: 200px; padding: 8px 0; background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(209,213,222,0.5); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.08); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity 200ms ease, transform 200ms ease, visibility 200ms; z-index: 100;">
            <a href="/about" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">About ArcaScience</a>
            <a href="/leadership" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Leadership</a>
            <a href="/careers" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Careers</a>
            <a href="/science-methodology" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Science &amp; Methodology</a>
          </div>
        </div>`;
}

const OLD_RESOURCES_LINK = `        <a href="/resources" class="arca-nav-link">Resources</a>`;
const OLD_RESOURCES_LINK_ACTIVE = `        <a href="/resources" class="arca-nav-link is-active">Resources</a>`;

function resourcesDropdown(isActive) {
  const activeClass = isActive ? ' is-active' : '';
  return `        <div style="position: relative;" class="arca-nav-dropdown-wrap">
          <a href="/resources" class="arca-nav-link${activeClass}">Resources <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left: 4px; vertical-align: middle;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <div class="arca-nav-dropdown" style="position: absolute; top: 100%; right: -12px; min-width: 220px; padding: 8px 0; background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(209,213,222,0.5); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.08); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity 200ms ease, transform 200ms ease, visibility 200ms; z-index: 100;">
            <a href="/resources" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Resource Hub</a>
            <a href="/resources-whitepapers" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Whitepapers</a>
            <a href="/resources-webinars" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Webinars &amp; Events</a>
            <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(35,86,160,0.15), transparent); margin: 6px 12px;"></div>
            <a href="/resources-faq" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">FAQ</a>
            <a href="/resources-glossary" style="display: block; padding: 8px 16px; font-size: 0.875rem; color: var(--grey-800); text-decoration: none; border-radius: 6px; margin: 0 4px; transition: background 150ms ease;">Glossary</a>
          </div>
        </div>`;
}

async function main() {
  const files = await readdir(PAGES_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));

  let updated = 0;

  for (const file of htmlFiles) {
    const filePath = join(PAGES_DIR, file);
    let content = await readFile(filePath, 'utf-8');
    let changed = false;

    // Platform dropdown
    if (content.includes(OLD_PLATFORM_DROPDOWN_ACTIVE)) {
      content = content.replace(OLD_PLATFORM_DROPDOWN_ACTIVE, platformDropdown(true));
      changed = true;
    } else if (content.includes(OLD_PLATFORM_DROPDOWN)) {
      content = content.replace(OLD_PLATFORM_DROPDOWN, platformDropdown(false));
      changed = true;
    }

    // Solutions dropdown
    if (content.includes(OLD_SOLUTIONS_DROPDOWN_ACTIVE)) {
      content = content.replace(OLD_SOLUTIONS_DROPDOWN_ACTIVE, solutionsDropdown(true));
      changed = true;
    } else if (content.includes(OLD_SOLUTIONS_DROPDOWN)) {
      content = content.replace(OLD_SOLUTIONS_DROPDOWN, solutionsDropdown(false));
      changed = true;
    }

    // Evidence dropdown
    if (content.includes(OLD_EVIDENCE_LINK_ACTIVE)) {
      content = content.replace(OLD_EVIDENCE_LINK_ACTIVE, evidenceDropdown(true));
      changed = true;
    } else if (content.includes(OLD_EVIDENCE_LINK)) {
      content = content.replace(OLD_EVIDENCE_LINK, evidenceDropdown(false));
      changed = true;
    }

    // Company dropdown
    if (content.includes(OLD_COMPANY_LINK_ACTIVE)) {
      content = content.replace(OLD_COMPANY_LINK_ACTIVE, companyDropdown(true));
      changed = true;
    } else if (content.includes(OLD_COMPANY_LINK)) {
      content = content.replace(OLD_COMPANY_LINK, companyDropdown(false));
      changed = true;
    }

    // Resources dropdown
    if (content.includes(OLD_RESOURCES_LINK_ACTIVE)) {
      content = content.replace(OLD_RESOURCES_LINK_ACTIVE, resourcesDropdown(true));
      changed = true;
    } else if (content.includes(OLD_RESOURCES_LINK)) {
      content = content.replace(OLD_RESOURCES_LINK, resourcesDropdown(false));
      changed = true;
    }

    // Remove the standalone Science link since it's now in Company dropdown
    // (but keep it if it's the active page)
    const OLD_SCIENCE_LINK = `        <a href="/science-methodology" class="arca-nav-link">Science</a>`;
    const OLD_SCIENCE_LINK_ACTIVE = `        <a href="/science-methodology" class="arca-nav-link is-active">Science</a>`;

    if (content.includes(OLD_SCIENCE_LINK_ACTIVE)) {
      // Keep Science as active in nav but remove standalone link (it's in Company dropdown)
      content = content.replace(OLD_SCIENCE_LINK_ACTIVE, '');
      changed = true;
    } else if (content.includes(OLD_SCIENCE_LINK)) {
      content = content.replace(OLD_SCIENCE_LINK, '');
      changed = true;
    }

    if (changed) {
      await writeFile(filePath, content, 'utf-8');
      updated++;
      console.log(`[updated] ${file}`);
    } else {
      console.log(`[skipped] ${file} — no matching nav patterns found`);
    }
  }

  console.log(`\nDone. Updated ${updated} of ${htmlFiles.length} files.`);
}

main().catch(console.error);
