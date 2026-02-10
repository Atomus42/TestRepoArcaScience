# ArcaScience UX/UI Design System & Interaction Specification

**Version:** 1.0
**Date:** 2026-02-09
**Author:** Agent 4 — UX/UI & Interaction Designer
**Audience:** Design team, front-end engineering, product leadership

---

## Table of Contents

- [A. UX Principles](#a-ux-principles)
- [B. Page Layouts](#b-page-layouts)
- [C. Design System Rules](#c-design-system-rules)
- [D. Interaction Patterns](#d-interaction-patterns)
- [E. Expert-Friendly UX Patterns](#e-expert-friendly-ux-patterns)
- [F. Responsive Strategy](#f-responsive-strategy)

---

# A. UX Principles

Seven foundational principles govern every design decision on the ArcaScience platform site. These are not aspirational; they are constraints that must be verifiable in every component, page, and interaction.

---

## Principle 1: Evidence-First Hierarchy

**Description:** Every page leads with verifiable claims, quantified outcomes, or concrete data rather than subjective marketing language. The visual hierarchy must place evidence (numbers, peer-reviewed references, regulatory citations, methodology details) above or at the same level as narrative text.

**How it manifests:** Headlines state measurable outcomes. Supporting data appears inline, not buried in footnotes. Methodology references link directly to source material. Numbers are never rounded or vague when precision is available.

**DO:** Display "24 AI models processing 100+ billion data points across the full drug lifecycle" as a primary statement, with each number linking to its methodology explanation.

**DO NOT:** Display "Our powerful AI transforms drug safety" with a stock photo of a scientist looking at a screen. This is the pattern of a consumer SaaS company, not a scientific platform.

---

## Principle 2: Structured Density

**Description:** The target audience (VP Drug Safety, CMO, Head of Regulatory Affairs, pharmacovigilance scientists) processes dense information professionally. The site must deliver high information density without creating visual chaos. The goal is Bloomberg Terminal legibility, not Medium article airiness.

**How it manifests:** Content areas use defined information-density zones: high-density (data tables, pipeline visualizations, technical specifications), medium-density (explanatory narrative with inline evidence), and low-density (hero statements, CTAs, whitespace breathing zones). These zones alternate rhythmically.

**DO:** Present a pipeline visualization showing all 24 models with their inputs, outputs, and interconnections in a single scrollable section, with expandable detail panels for each model.

**DO NOT:** Spread one piece of information across five animated scroll-triggered sections that require 30 seconds of scrolling to piece together.

---

## Principle 3: Progressive Depth

**Description:** Serve both the 30-second scanner (VP evaluating whether to schedule a demo) and the 30-minute reader (pharmacovigilance scientist validating methodology). Every content block must have three layers: headline insight, supporting context, and deep detail — accessible without page changes when possible.

**How it manifests:** Expandable sections, tabbed content panels, and inline detail drawers allow users to control their own depth. The default view shows the headline layer. One click reaches context. Two clicks reaches detail. No content requires more than two interactions to access from its parent section.

**DO:** Show a use case card with the headline "Post-Marketing Surveillance: Continuous signal detection across 40+ global safety databases" — clicking reveals methodology, clicking further reveals the specific databases and data schemas.

**DO NOT:** Force users to navigate to a separate page for every detail, creating a navigation maze that breaks context.

---

## Principle 4: Scientific Credibility Encoding

**Description:** Visual design choices must encode credibility at a subconscious level. This means restrained color usage, precise typography, consistent data formatting, and visual patterns borrowed from peer-reviewed publications and regulatory documents rather than from consumer software.

**How it manifests:** Data is presented in formats familiar to the audience: structured tables with clear headers, numbered figure references, citation-style methodology links, and classification taxonomies (like MedDRA, WHO-ART). Visual embellishments are removed unless they carry information.

**DO:** Format a comparison table with clear column headers, alternating row backgrounds at 2% opacity difference, right-aligned numbers, and footnotes keyed with superscript numbers.

**DO NOT:** Use gradient-filled cards with rounded corners, drop shadows, and emoji icons to present regulatory compliance features.

---

## Principle 5: Navigational Transparency

**Description:** At every point on the site, the user must know exactly where they are, what is available at this depth level, and how to reach any other section. Pharmaceutical professionals are trained in document navigation (ICH guidelines, FDA guidance documents) — the site must meet that expectation.

**How it manifests:** Persistent breadcrumbs, visible section indicators in the navigation, scroll-position-aware table of contents for long pages, and clear labeling of content type (overview, technical detail, regulatory reference, case study).

**DO:** Implement a sticky left-rail table of contents on long pages (Science & Methodology, Platform Overview) that highlights the current section and shows reading progress.

**DO NOT:** Hide all navigation behind a hamburger menu on desktop, or use only visual scroll cues (dots, progress bars) without text labels.

---

## Principle 6: Functional Minimalism

**Description:** Every visual element must earn its presence by conveying information, enabling interaction, or creating necessary visual separation. Decorative elements are permitted only when they reinforce the scientific/precision brand identity (e.g., subtle grid patterns, data-inspired textures). No element exists solely for aesthetic pleasure.

**How it manifests:** Icons are used only when they accelerate comprehension (not for decoration). Animation occurs only to communicate state changes or guide attention (not for entrance effects). Color is applied only to encode meaning (not for visual variety).

**DO:** Use a subtle animated transition when a user expands a detail panel, with the panel sliding open over 200ms to confirm the action was registered.

**DO NOT:** Animate every section entrance with fade-up effects, use parallax scrolling on background images, or add particle effects to hero sections.

---

## Principle 7: Trust Architecture

**Description:** Trust is built through consistency, precision, and transparency — not through claims of trustworthiness. The site must demonstrate trust through its behavior: consistent interaction patterns, precise data presentation, transparent methodology, and visible compliance posture.

**How it manifests:** Compliance badges (FDA 21 CFR Part 11, GDPR, ISO 27001, HDS, HIPAA) appear in a persistent footer element, not as a marketing splash. Security information is accessible from every page. Methodology is never hidden. Error states and edge cases are handled gracefully with informative messages.

**DO:** Place a persistent, understated compliance bar in the footer showing certification badges with links to full compliance documentation. On the Security & Compliance page, present actual audit frameworks and control descriptions.

**DO NOT:** Create a pop-up modal announcing "We are SOC 2 certified!" or use trust badges as hero-section decorative elements.

---

# B. Page Layouts

Each page layout is described at wireframe-level specificity. Sections are listed top-to-bottom in scroll order. Grid references use a 12-column system at 1280px desktop viewport (details in Section C).

---

## Page 1: Homepage

### Purpose
Convert expert visitors into demo requests by establishing ArcaScience as the credible, technically superior AI-driven BRA platform within 60 seconds of scanning, while providing enough depth for extended evaluation.

### Section 1: Navigation Bar
- **Layout:** Full-width, 72px height. Logo left-aligned (columns 1-2). Primary nav links centered (columns 4-9): Platform, Use Cases, Science, Resources, Company. Right-aligned CTA "Request Demo" button (columns 11-12).
- **Density:** Low.
- **Behavior:** Becomes sticky on scroll with a 1px bottom border and slight background opacity increase (from transparent to white at 95% opacity). Active page indicated by 2px bottom border on nav item, color: primary blue.
- **Mobile:** Collapses to logo + hamburger. Demo CTA remains visible as a small button beside hamburger.

### Section 2: Hero
- **Layout:** Full-width container, max-content-width 1120px centered. Two-column layout: left column (columns 1-7) contains headline, subheadline, and dual CTA. Right column (columns 8-12) contains a static, high-fidelity platform screenshot or a simplified pipeline schematic diagram (not an illustration, not an abstract graphic).
- **Content:**
  - H1: Direct, outcome-focused statement. Example: "AI-Driven Benefit-Risk Analysis Across the Full Drug Lifecycle." Max 12 words.
  - Subheadline: One sentence with specifics. Example: "24 specialized AI models processing 100+ billion data points to deliver continuous, quantified benefit-risk assessments from early development through post-marketing." Max 30 words.
  - Primary CTA: "Request a Demo" (filled button).
  - Secondary CTA: "See the Platform" (text link with right arrow).
- **Density:** Low. Maximum 80 words total in this section.
- **Scroll behavior:** Fixed position until scroll begins; content scrolls naturally (no parallax).
- **Mobile:** Single column. Image moves below text. CTAs stack vertically, full-width.

### Section 3: The Challenge
- **Layout:** Full-width, light grey background (#F7F8FA). Max-content-width container. Section label "The Challenge" in uppercase small caps, 12px, tracked at 1.5px. Below, a three-column grid (columns 1-4, 5-8, 9-12), each containing a challenge card.
- **Content per card:** A single-line statistic or fact in bold (e.g., "18-24 months average BRA cycle time"), followed by 2-3 sentences explaining the pain point. No icons.
- **Density:** Medium.
- **Scroll behavior:** Standard scroll. No animation on entrance.
- **Mobile:** Cards stack vertically with 24px vertical gap.

### Section 4: Platform Overview
- **Layout:** Max-content-width container. Section header centered: "The ArcaScience Platform" with 1-sentence descriptor. Below, a horizontal pipeline diagram spanning full content width (all 12 columns), showing the four platform pillars left-to-right: Data Intelligence Engine > Decision Intelligence > Automated Regulatory Outputs > Continuous Monitoring Loop. Each pillar is a clickable zone.
- **Content:** Pipeline diagram with labeled nodes and connecting arrows. Below the diagram, four brief descriptors (one per pillar) in a 4-column grid, each 3-4 lines.
- **Density:** High in the diagram, medium in the descriptors.
- **Interactive elements:** Hovering a pipeline stage highlights it and reveals a tooltip with a key capability. Clicking navigates to the corresponding subpage.
- **Mobile:** Pipeline rotates to vertical orientation. Each stage becomes a tappable card in a vertical stack.

### Section 5: Key Differentiators
- **Layout:** Full-width, white background. Max-content-width container. Two-column layout: left column (columns 1-5) contains a vertical stack of 4-5 differentiator items; right column (columns 6-12) contains a supporting data visualization or annotated screenshot that updates based on which differentiator is active/hovered.
- **Content per differentiator:** Bold title (one line), 2-sentence description with at least one specific metric or capability reference.
- **Density:** Medium.
- **Interactive elements:** Clicking/hovering a differentiator item on the left updates the visual on the right with a 150ms crossfade. Active item has a left border highlight (3px, primary blue).
- **Mobile:** Single column. Visual appears above each differentiator item inline.

### Section 6: Credibility Bar
- **Layout:** Full-width, dark background (#1A1E2E). Max-content-width container. Single row of credibility indicators: number of publications/validations, regulatory framework compliance logos, customer segments served, data points processed.
- **Content:** 4-5 metrics displayed in large type (40px numbers) with small labels beneath (14px). Example: "100B+ / Data Points Processed" | "24 / AI Models" | "5 / Compliance Certifications."
- **Density:** Low (but high-impact).
- **Mobile:** 2x2 grid or horizontal scroll carousel.

### Section 7: Use Case Preview
- **Layout:** Max-content-width container. Section header with brief intro. Below, a 2x2 grid of use case cards (Early Dev, Late Dev, Post-Marketing, Market Access).
- **Content per card:** Use case name as H3, 2-line summary of the BRA challenge addressed, a "Learn More" text link. Subtle category label (e.g., "Development Phase" or "Commercial Phase") in upper-left of card.
- **Density:** Medium.
- **Interactive elements:** Cards have hover state: 1px border becomes visible, slight (2px) upward translate, no shadow changes.
- **Mobile:** 2x1 stacked grid (two columns on tablet, single column on mobile).

### Section 8: Social Proof / Testimonial
- **Layout:** Full-width, light grey background. Max-content-width container. Centered testimonial block: large pull quote (24px, italic serif), attribution below (name, title, organization), company logo to the right of attribution.
- **Content:** One testimonial at a time. If multiple, use a simple left/right arrow to navigate (no auto-rotation).
- **Density:** Low. This is a breathing zone.
- **Mobile:** Full-width, text size reduced to 20px.

### Section 9: CTA Section
- **Layout:** Full-width, primary blue gradient background (subtle, not aggressive). Centered text block: headline "See ArcaScience in Action," 1-sentence supporting text, primary CTA button "Request a Demo" (white button on blue background).
- **Density:** Low.
- **Mobile:** Identical layout, full-width button.

### Section 10: Footer
- **Layout:** Full-width, dark background (#12151F). Four-column grid: Column 1 — logo and 1-sentence company descriptor. Column 2 — Platform links (4-5 items). Column 3 — Company links (About, Team, Careers, Contact). Column 4 — Resources links (Blog, Case Studies, Whitepapers). Below the grid, a full-width separator line, then a single row: left-aligned copyright, center-aligned compliance badges (small, 24px height icons for FDA, GDPR, ISO, HDS, HIPAA), right-aligned legal links (Privacy, Terms).
- **Density:** Medium.
- **Mobile:** Single column stack. Compliance badges wrap to second line.

---

## Page 2: Platform Overview

### Purpose
Provide a comprehensive, technically credible view of the full ArcaScience platform architecture and its 24 AI models, enabling technical evaluators to understand the complete pipeline.

### Section 1: Page Header
- **Layout:** Full-width, 400px height, dark background with subtle grid-pattern texture. Breadcrumb above H1. H1: "The ArcaScience Platform." Subheadline: 2 sentences describing the end-to-end pipeline. No image.
- **Density:** Low.
- **Mobile:** Reduced to 280px height.

### Section 2: Pipeline Architecture Diagram
- **Layout:** Full-width, 12-column span. A detailed, interactive pipeline diagram showing the data flow from raw inputs (safety databases, clinical trial data, literature, real-world evidence) through the three platform pillars to outputs (regulatory documents, dashboards, continuous monitoring alerts). Each node in the pipeline represents a distinct AI model or processing stage.
- **Density:** High. This is the centerpiece.
- **Interactive elements:**
  - Nodes are clickable. Clicking a node opens an inline detail panel below the diagram (pushes content down, does not overlay).
  - Detail panel shows: model name, input data types, processing methodology (2-3 sentences), output format, and a "Deep Dive" link to the relevant subpage.
  - A legend in the upper-right corner color-codes node types: data ingestion (teal), processing (blue), analysis (indigo), output (green).
  - Zoom controls (+/- buttons) in upper-left for users who want to examine the diagram at full fidelity.
- **Mobile:** Diagram becomes a vertical flowchart. Nodes are tappable. Detail panels appear inline below each tapped node.

### Section 3: Pillar Deep-Dives (Three Blocks)
- **Layout:** Three consecutive full-width sections, alternating white/light-grey backgrounds. Each section is a two-column layout: one column for text content (H2 pillar name, 3-4 paragraphs of technical description, bullet list of key capabilities), other column for an annotated diagram or screenshot. Columns alternate sides (text-left/image-right, then text-right/image-left).
- **Content:**
  - Block A: Data Intelligence Engine — data sources, ingestion pipeline, NLP/ML processing.
  - Block B: Decision Intelligence — analytics models, visualization engine, quantitative BRA frameworks.
  - Block C: Automated Regulatory Outputs — document generation, template compliance, audit trails.
- **Density:** High in text column, medium in visual column.
- **Interactive elements:** Capability bullet items are expandable: clicking reveals a 2-3 sentence technical detail and, where applicable, a link to the relevant Science & Methodology section.
- **Mobile:** Single column. Text above, visual below. Expandable items remain functional.

### Section 4: Integration & Data Flow
- **Layout:** Max-content-width container. H2 header. A horizontal diagram showing external system integrations: safety databases (FAERS, EudraVigilance, VigiBase), clinical data systems, literature databases, RWE sources. Below the diagram, a specification table listing each integration with columns: Source, Data Type, Update Frequency, Volume.
- **Density:** High.
- **Mobile:** Table becomes horizontally scrollable. Diagram becomes vertical.

### Section 5: Technical Specifications
- **Layout:** Max-content-width container. H2 header. A two-column table layout: left column lists specification categories (Data Processing Capacity, Model Count, Latency, Uptime SLA, Compliance Certifications, Deployment Options), right column lists values.
- **Density:** High.
- **Interactive elements:** Each specification row is expandable to show additional technical context.
- **Mobile:** Table becomes single-column stacked key-value pairs.

### Section 6: CTA
- Same pattern as Homepage Section 9, with text variant: "Explore the Platform with Your Data."

---

## Page 3: Data Intelligence Engine

### Purpose
Technical deep-dive for data scientists, pharmacovigilance experts, and technical evaluators to understand the AI/ML architecture, data processing pipeline, and model validation methodology.

### Section 1: Page Header
- **Layout:** Standard page header pattern (breadcrumb, H1 "Data Intelligence Engine," subheadline describing the engine's role in the pipeline). Visual indicator showing this module's position in the overall platform pipeline (a mini-pipeline with this stage highlighted).
- **Density:** Low-Medium.

### Section 2: Architecture Overview
- **Layout:** Full content-width technical architecture diagram. Shows data ingestion layer, preprocessing pipeline, feature extraction, model ensemble architecture, and output layer. Uses standard system-architecture diagramming conventions (not marketing infographics).
- **Density:** High.
- **Interactive elements:** Each layer is clickable to scroll-jump to its detailed section below. Hover reveals brief description tooltip.

### Section 3: Data Sources & Ingestion
- **Layout:** Two-column. Left: categorized list of data source types (pharmacovigilance databases, clinical trial registries, biomedical literature, real-world evidence, regulatory submissions). Right: data flow diagram showing ingestion, normalization, and quality assurance pipeline.
- **Content:** Each data source category includes: source name(s), data volume, update frequency, format, and normalization approach.
- **Density:** High.
- **Interactive elements:** Expandable detail for each data source.

### Section 4: AI/ML Model Portfolio
- **Layout:** Max-content-width container. An interactive table/grid showing all relevant AI models in this engine. Columns: Model Name, Type (NLP, Classification, Clustering, etc.), Input, Output, Validation Status, Performance Metrics.
- **Density:** Very high.
- **Interactive elements:**
  - Column sorting.
  - Row click expands to show model card: training methodology, validation approach, performance benchmarks, limitations/known biases, and last validation date.
  - Filter controls above table: filter by model type, input data type, validation status.
- **Mobile:** Table becomes a card-based list with key fields visible and expandable detail.

### Section 5: NLP & Text Processing
- **Layout:** Two-column. Left: technical description of NLP pipeline (entity extraction, relation extraction, sentiment analysis in medical text, MedDRA coding, etc.). Right: annotated example showing raw text input and structured output.
- **Density:** High.
- **Interactive elements:** Toggle between example types (adverse event report, clinical trial narrative, literature abstract).

### Section 6: Validation & Quality Assurance
- **Layout:** Max-content-width container. Describes model validation framework: cross-validation approach, holdout test sets, external validation, ongoing monitoring. Includes a process diagram showing the validation lifecycle.
- **Content:** Specific metrics where possible (F1 scores, AUC values, inter-annotator agreement).
- **Density:** High.

### Section 7: CTA
- Contextual CTA: "See How Our Models Perform on Your Data — Request a Technical Demo."

---

## Page 4: Decision Intelligence

### Purpose
Showcase the analytics, visualization, and dashboard capabilities that transform processed data into actionable benefit-risk insights.

### Section 1: Page Header
- Standard page header pattern. H1: "Decision Intelligence." Pipeline position indicator.

### Section 2: Dashboard Showcase
- **Layout:** Full content-width. A high-fidelity, static screenshot (or series of screenshots) of the actual dashboard interface, annotated with callout labels pointing to key features. Not a mockup or illustration — this must look like the real product.
- **Density:** High.
- **Interactive elements:** Clickable callout labels that scroll to the relevant feature description below.
- **Mobile:** Screenshot becomes horizontally scrollable with pinch-to-zoom enabled.

### Section 3: Analytical Frameworks
- **Layout:** Three-column grid. Each column describes a BRA analytical framework supported by the platform (e.g., MCDA — Multi-Criteria Decision Analysis, FDA Benefit-Risk Framework, EMA PROACT-URL). Each includes: framework name, brief description, how ArcaScience implements it, and a thumbnail visualization of output.
- **Density:** Medium-High.
- **Interactive elements:** Each framework card expands to show a full example output visualization with methodology notes.

### Section 4: Visualization Capabilities
- **Layout:** A gallery grid (3 columns, 2-3 rows) of visualization types: forest plots, tornado diagrams, value trees, risk-benefit planes, cumulative risk curves, Kaplan-Meier curves, heat maps. Each cell shows a labeled thumbnail.
- **Density:** Medium.
- **Interactive elements:** Clicking a thumbnail opens a lightbox showing the full-size visualization with annotations explaining what it shows and when it is used.
- **Mobile:** 2-column grid. Lightbox becomes full-screen overlay.

### Section 5: Collaboration & Workflow
- **Layout:** Two-column. Left: workflow diagram showing how teams collaborate within the platform (role-based views, annotation, review/approval workflows, audit trails). Right: feature list with brief descriptions.
- **Density:** Medium.

### Section 6: CTA
- "Experience the Dashboard — Request a Personalized Walkthrough."

---

## Page 5: Automated Regulatory Outputs

### Purpose
Demonstrate the platform's ability to generate compliant regulatory documents, reducing manual effort and ensuring consistency.

### Section 1: Page Header
- Standard page header pattern. H1: "Automated Regulatory Outputs." Pipeline position indicator.

### Section 2: Document Types
- **Layout:** Max-content-width container. A structured list/table of document types the platform generates. Columns: Document Type, Regulatory Framework, Typical Use, Generation Time.
- **Content:** Include PBRER (Periodic Benefit-Risk Evaluation Report), DSUR (Development Safety Update Report), BRA sections for regulatory submissions, Safety Narratives, Aggregate Reports.
- **Density:** High.
- **Interactive elements:** Each row expands to show: document structure preview (table of contents), customization options, and a sample output thumbnail.

### Section 3: Generation Process
- **Layout:** Horizontal process diagram (4-5 steps): Data Selection > Template Configuration > AI-Assisted Drafting > Review & Annotation > Export & Submission. Each step is a labeled node with a brief description below.
- **Density:** Medium.
- **Interactive elements:** Clicking a step reveals a detail panel with 3-4 bullet points about that stage.

### Section 4: Compliance & Audit Trail
- **Layout:** Two-column. Left: description of how generated documents maintain compliance (21 CFR Part 11 electronic signatures, version control, change tracking, audit trail). Right: annotated screenshot of the audit trail interface.
- **Density:** Medium-High.

### Section 5: Template Library
- **Layout:** Card grid (3 columns) showing template categories with count of templates per category. Each card: template category name, number of templates, regulatory frameworks covered, brief description.
- **Density:** Medium.

### Section 6: CTA
- "See a Document Generated from Your Data — Request a Demo."

---

## Page 6A: Use Case — Early Development

### Purpose
Address the specific BRA challenges in early-phase drug development (Phase I-II), showing how ArcaScience supports go/no-go decisions.

### Section 1: Page Header
- **Layout:** Standard page header with use case category label ("Use Case: Development Phase"), H1: "Benefit-Risk Analysis for Early Development," subheadline describing the Phase I-II context. Right-aligned: a small lifecycle diagram with "Early Development" stage highlighted.
- **Density:** Low-Medium.

### Section 2: The Challenge
- **Layout:** Full-width, light grey background. Max-content-width container. Two columns: left (columns 1-6) contains 3-4 paragraphs describing early development BRA challenges (limited safety data, preclinical-to-clinical translation, go/no-go decision uncertainty). Right (columns 7-12) contains a data visualization showing the decision complexity (e.g., a simplified decision tree or uncertainty diagram).
- **Density:** Medium-High.

### Section 3: The ArcaScience Approach
- **Layout:** Vertical stepped process (numbered steps 01-04), each step as a horizontal card spanning full content width. Each card contains: step number, step title, 2-3 sentence description, and a small inline diagram or icon indicating the platform module involved.
- **Density:** Medium.
- **Interactive elements:** Each step card is expandable to reveal detailed methodology and example outputs.

### Section 4: Key Capabilities
- **Layout:** Three-column capability grid. Each capability: title, 2-3 sentence description, linked platform module.
- **Density:** Medium.

### Section 5: Example Outcome
- **Layout:** Full-width, dark background. A single case-study-style narrative: "How ArcaScience Supported a Go/No-Go Decision for [Anonymized Compound]." Brief narrative (150-200 words) with key metrics highlighted in large type within the text flow.
- **Density:** Medium.

### Section 6: Related Resources
- **Layout:** Three-column card grid linking to relevant case studies, whitepapers, or methodology papers.
- **Density:** Low.

### Section 7: CTA
- "Discuss Your Early Development BRA Needs — Contact Our Team."

---

## Page 6B: Use Case — Late Development

### Structure
Follows identical structural pattern as Page 6A, with content adapted for Phase III and submission-stage BRA challenges: larger datasets, regulatory submission preparation, PBRER/DSUR generation, advisory committee preparation.

**Key content differences:**
- Challenge section emphasizes regulatory submission pressure, advisory committee readiness, competitive label positioning.
- Approach section highlights integrated safety-efficacy analysis, submission-ready document generation, and scenario modeling.
- Example outcome focuses on an NDA/MAA submission support scenario.

---

## Page 6C: Use Case — Post-Marketing

### Structure
Follows identical structural pattern as Page 6A, with content adapted for post-marketing surveillance: continuous signal detection, PBRER updates, label change assessment, risk management plan evaluation.

**Key content differences:**
- Challenge section emphasizes real-world data complexity, signal-to-noise ratio in spontaneous reports, continuous monitoring burden.
- Approach section highlights real-time signal detection, automated periodic reporting, and proactive risk management.
- Example outcome focuses on a signal detection and regulatory response scenario.

---

## Page 6D: Use Case — Market Access

### Structure
Follows identical structural pattern as Page 6A, with content adapted for HTA submissions and payer negotiations: comparative effectiveness, value demonstration, economic modeling support.

**Key content differences:**
- Challenge section emphasizes HTA body requirements, value demonstration burden, payer evidence demands.
- Approach section highlights comparative BRA, economic model inputs, and HTA submission support.
- Example outcome focuses on a successful HTA submission scenario.

---

## Page 7: Science & Methodology

### Purpose
The most technically dense page on the site. Establishes ArcaScience's scientific credibility by documenting the methodological foundations, validation approaches, and academic contributions.

### Section 1: Page Header
- H1: "Science & Methodology." Subheadline: "The scientific foundations behind ArcaScience's AI-driven benefit-risk analysis."

### Section 2: Left-Rail Table of Contents (Persistent)
- **Layout:** Sticky left column (columns 1-3) containing a hierarchical table of contents with section numbers and titles. Highlights current section based on scroll position. Main content occupies columns 4-12.
- **Behavior:** ToC remains visible during scroll on desktop. On mobile, it collapses into a dropdown at the top of the page.

### Section 3: Methodological Framework
- **Layout:** Full content area (columns 4-12). H2 header. 4-6 paragraphs describing the overarching BRA methodology: regulatory science foundations (ICH, FDA, EMA frameworks), how quantitative and qualitative approaches are integrated, and the role of AI in augmenting human judgment.
- **Density:** Very High. This reads like a methodology section of a journal article.
- **Interactive elements:** Inline citation links (superscript numbers) that open a reference popover on click showing the full citation with a link to the source.

### Section 4: AI/ML Approach
- **Layout:** Columns 4-12. H2 header. Subsections covering: model architecture decisions, training data curation, validation methodology (k-fold cross-validation, external validation sets, prospective validation), bias detection and mitigation, explainability approach (SHAP values, attention visualization, etc.).
- **Density:** Very High.
- **Interactive elements:** Expandable sections for each subsection, allowing readers to skip to areas of interest. Code-block-style formatting for mathematical formulas or model specifications.

### Section 5: Data Quality Framework
- **Layout:** Columns 4-12. H2 header. Description of data quality controls: source verification, deduplication, normalization, missing data handling, data freshness monitoring.
- **Density:** High.

### Section 6: Validation Results
- **Layout:** Columns 4-12. H2 header. Table of validation results for key models: Model Name, Validation Type, Dataset, Key Metric, Result, Date.
- **Density:** Very High.

### Section 7: Publications & Presentations
- **Layout:** Columns 4-12. H2 header. Chronological list of publications, conference presentations, and whitepapers. Each entry: title, authors, venue, date, link to full text or abstract.
- **Density:** High.
- **Interactive elements:** Filter by year, type (publication, presentation, whitepaper), topic.

### Section 8: Advisory Board / Scientific Advisors
- **Layout:** Columns 4-12. H2 header. Grid of advisor cards (2 columns within the content area): name, title, institutional affiliation, brief bio (2-3 lines), photo (small, professional headshot).
- **Density:** Medium.

---

## Page 8: About / Company

### Purpose
Establish organizational credibility: mission, founding story, company values, and strategic positioning.

### Section 1: Page Header
- H1: "About ArcaScience." Brief mission statement as subheadline.

### Section 2: Mission & Vision
- **Layout:** Max-content-width, centered text block. Mission statement in larger type (20px), followed by 2-3 paragraphs of vision description.
- **Density:** Low-Medium.

### Section 3: Founding Story
- **Layout:** Two-column. Left: narrative text (3-4 paragraphs). Right: timeline of key milestones (founding, key partnerships, product launches, regulatory milestones).
- **Density:** Medium.
- **Interactive elements:** Timeline entries are hoverable to reveal additional detail.

### Section 4: Company Values
- **Layout:** Three-column grid. Each value: title, 2-3 sentence description. No icons unless they are meaningful and unique.
- **Density:** Medium.

### Section 5: By the Numbers
- **Layout:** Full-width, dark background. Single row of 4-5 key company metrics (team size, data points processed, models deployed, compliance certifications, global reach).
- **Density:** Low.

### Section 6: Partners & Ecosystem
- **Layout:** Logo grid of key partners, academic collaborators, and technology partners. Logos displayed at uniform size (120px width max), grayscale, with color on hover.
- **Density:** Low.

### Section 7: CTA
- "Join Us in Transforming Drug Safety — See Open Positions" | "Request a Demo."

---

## Page 9: Team / Leadership

### Purpose
Showcase the depth of scientific, regulatory, and technical expertise on the team.

### Section 1: Page Header
- H1: "Leadership Team." Subheadline emphasizing combined expertise.

### Section 2: Leadership Grid
- **Layout:** Grid of leadership cards, 3 columns. Each card: professional headshot (square, 200x200px, subtle rounded corners at 4px), name, title, 2-3 line bio emphasizing relevant background (previous roles, publications, regulatory experience). LinkedIn icon link.
- **Density:** Medium.
- **Interactive elements:** Clicking a card expands to a full bio panel (inline, pushes content down) with extended background, key publications/achievements, and areas of expertise.
- **Mobile:** 2-column grid on tablet, single column on phone. Expanded bios remain inline.

### Section 3: Advisory Board
- **Layout:** Separate section below leadership. Same card pattern but with smaller cards (2-column layout) and shorter bios. Emphasis on institutional affiliations and domain expertise.
- **Density:** Medium.

### Section 4: Team Culture Statement
- **Layout:** Brief (150-word) statement about team culture and approach to scientific integrity. Optional: 1-2 candid team photos in a simple 2-column layout.
- **Density:** Low.

---

## Page 10: Careers

### Purpose
Attract expert-level talent by showcasing the technical depth, mission, and culture.

### Section 1: Page Header
- H1: "Careers at ArcaScience." Subheadline: value proposition for candidates.

### Section 2: Why ArcaScience
- **Layout:** Three-column grid of value propositions for employees: mission impact, technical challenge, team caliber. Each with a title and 3-4 sentence description.
- **Density:** Medium.

### Section 3: Open Positions
- **Layout:** Filterable list of open positions. Filter bar at top: Department (Engineering, Data Science, Regulatory, Operations), Location, Type (Full-time, Contract). Below, a list of position cards: title, department, location, brief description (1 line), "View Details" link.
- **Density:** Medium.
- **Interactive elements:**
  - Filters are dropdown selects that immediately filter the list.
  - Clicking "View Details" expands the card inline to show full job description, requirements, and an "Apply" button.
- **Mobile:** Filters become a single "Filter" button that opens a bottom sheet with filter options. List remains single-column.

### Section 4: Benefits & Perks
- **Layout:** Simple two-column list of benefits with brief descriptions.
- **Density:** Low-Medium.

---

## Page 11: Contact / Demo Request

### Purpose
Convert interested prospects into qualified demo requests with minimal friction while collecting enough information to personalize the demo.

### Section 1: Page Header
- H1: "Request a Demo" (primary) or "Contact Us" (secondary). Subheadline setting expectation: "Share your details and we'll schedule a personalized walkthrough within 48 hours."

### Section 2: Form + Context (Side by Side)
- **Layout:** Two-column. Left column (columns 1-7): the form. Right column (columns 8-12): trust-building context.
- **Form fields (left):**
  - Full Name (required, text)
  - Work Email (required, email validation)
  - Company Name (required, text)
  - Job Title (required, text)
  - Department (required, dropdown: Drug Safety, Regulatory Affairs, Clinical Development, Medical Affairs, Market Access, Other)
  - Primary Interest (optional, dropdown: Platform Demo, Specific Use Case, Technical Deep Dive, Partnership, General Inquiry)
  - Message (optional, textarea, 500 char max)
  - Consent checkbox: "I agree to ArcaScience's Privacy Policy" (linked).
  - Submit button: "Request Demo" (primary style).
- **Trust-building context (right):**
  - "What to Expect" — 3-step process: 1. We review your request (24 hrs). 2. We prepare a customized walkthrough. 3. 45-minute live demo with Q&A.
  - Compliance note: "Your data is protected under GDPR. We do not share your information with third parties."
  - Optional: small testimonial from a satisfied demo recipient.
- **Density:** Medium.
- **Form behavior:** Real-time validation (green checkmark on valid fields). Error messages appear below each field in red (not as alerts). Submit button is disabled until all required fields are valid.
- **Mobile:** Single column. Trust-building context moves below the form. Form fields become full-width.

---

## Page 12: Resources Hub

### Purpose
Central repository for all content: whitepapers, case studies, webinar recordings, blog posts, regulatory guides. Serves both lead generation and credibility establishment.

### Section 1: Page Header
- H1: "Resources." Subheadline: "Research, guides, and insights for benefit-risk analysis professionals."

### Section 2: Filter Bar
- **Layout:** Full content-width, sticky below nav on scroll. Contains: text search input (left), filter dropdowns (Content Type: All, Whitepaper, Case Study, Blog Post, Webinar, Regulatory Guide; Topic: BRA Methodology, AI/ML, Regulatory, Data Science, Industry Trends; Date: Newest First, Oldest First).
- **Density:** Low (functional).
- **Interactive elements:** Filters apply immediately without page reload. Active filters shown as removable chips below the filter bar.
- **Mobile:** Filter bar collapses to a "Filter & Sort" button that opens a bottom sheet.

### Section 3: Resource Grid
- **Layout:** Three-column grid of resource cards. Each card: content type label (colored tag, top-left), title (H3), 2-line excerpt, publication date, estimated read time, "Read More" link.
- **Density:** Medium.
- **Interactive elements:** Cards link to individual resource pages. Infinite scroll or "Load More" button for pagination (not numbered pages).
- **Mobile:** Single-column card list.

### Section 4: Featured Resource
- **Layout:** Full content-width, highlighted card at the top of the grid (spanning all 3 columns) for a pinned/featured resource. Larger thumbnail, extended excerpt.
- **Density:** Medium.

---

## Page 13: Case Studies

### Purpose
Provide evidence of platform effectiveness through detailed, anonymized case studies.

### Section 1: Page Header
- H1: "Case Studies." Subheadline: "Evidence of impact across the drug lifecycle."

### Section 2: Case Study List
- **Layout:** Vertical stack of case study cards, each spanning full content width. Each card: left section (30%) with metadata (therapeutic area, development phase, challenge type, company type — e.g., "Top-10 Pharma"), right section (70%) with title, 3-line summary, key result metric (highlighted in large type), and "Read Case Study" link.
- **Density:** Medium.
- **Interactive elements:** Filter bar above the list: Therapeutic Area, Development Phase, Challenge Type.
- **Mobile:** Cards become single-column. Metadata moves above the narrative content.

### Section 3: Individual Case Study Layout (Template)
- **Structure:** H1 title, metadata bar (phase, therapeutic area, date), then a structured layout:
  - "The Challenge" section (2-3 paragraphs).
  - "The Approach" section (process diagram + narrative).
  - "The Results" section (key metrics in highlighted boxes, supporting narrative).
  - "Key Takeaways" section (bulleted list).
  - Related case studies (3-card grid at bottom).
- **Density:** Medium-High.

---

## Page 14: Security & Compliance

### Purpose
Provide comprehensive, detailed security and compliance documentation for procurement teams, IT security reviewers, and regulatory evaluators.

### Section 1: Page Header
- H1: "Security & Compliance." Subheadline: "Enterprise-grade security meeting the highest standards in pharmaceutical data protection."

### Section 2: Compliance Framework Overview
- **Layout:** Max-content-width container. Five-column grid of compliance certification cards (FDA 21 CFR Part 11, GDPR, ISO 27001, HDS, HIPAA). Each card: certification logo, certification name, brief scope description (2 lines), link to detailed section below.
- **Density:** Medium.

### Section 3: Detailed Compliance Sections (Accordion)
- **Layout:** Vertical stack of expandable sections, one per certification/framework. Each section header shows the certification name and a summary statement. Expanded view shows:
  - Scope of compliance.
  - Key controls implemented.
  - Audit frequency and last audit date.
  - Relevant documentation (links to downloadable PDFs where appropriate: SOC 2 report summary, DPA template, etc.).
- **Density:** High when expanded.
- **Interactive elements:** Accordion expand/collapse. All sections collapsed by default. Clicking opens one section at a time (others auto-close), unless the user holds Shift (then multiple stay open).

### Section 4: Security Architecture
- **Layout:** Two-column. Left: narrative description of security architecture (data encryption at rest and in transit, key management, access controls, network security, incident response). Right: architecture diagram showing security layers.
- **Density:** High.

### Section 5: Data Processing & Privacy
- **Layout:** Structured content covering data processing locations, data retention policies, data subject rights, DPA availability, sub-processor list.
- **Density:** High.

### Section 6: Penetration Testing & Audits
- **Layout:** Table showing assessment type, frequency, last conducted date, and summary finding (e.g., "No critical findings").
- **Density:** Medium.

### Section 7: Contact
- "Have Security Questions? Contact Our Security Team" with a direct email link and an option to request a Security Whitepaper.

---

## Page 15: For Investors

### Purpose
Provide a high-level strategic view for potential investors, VCs, and strategic partners. Emphasize market opportunity, team, traction, and differentiation.

### Section 1: Page Header
- H1: "For Investors." Subheadline: "Transforming pharmaceutical benefit-risk analysis with AI."

### Section 2: Market Opportunity
- **Layout:** Full content-width. 2-3 paragraphs describing the market: size of pharmaceutical safety and regulatory market, current inefficiencies, regulatory tailwinds driving AI adoption. Key market figures displayed in large type (40px) inline: TAM, SAM, SOM.
- **Density:** Medium-High.

### Section 3: The Solution
- **Layout:** Condensed version of the platform overview: pipeline diagram (simplified, 4 nodes), 1-sentence description per node.
- **Density:** Medium.

### Section 4: Traction & Milestones
- **Layout:** Horizontal timeline or vertical milestone list. Each milestone: date, event, significance.
- **Density:** Medium.

### Section 5: Differentiation
- **Layout:** Comparison table: ArcaScience vs. Manual BRA Process vs. Legacy Tools vs. Consulting Firms. Rows: Speed, Cost, Consistency, Compliance, Data Coverage, Scalability.
- **Density:** High.

### Section 6: Team
- **Layout:** Condensed leadership grid (2x2 or 3-across) with key team members. Links to full Team page.
- **Density:** Medium.

### Section 7: Contact for Investment Inquiries
- **Layout:** Simple section with direct contact information for investor relations. Separate from the general demo request form. "For investment inquiries, contact [Name] at [email]."
- **Density:** Low.

---

# C. Design System Rules

---

## C.1 Typography

### Font Pairing

**Primary Heading Font:** Inter (or equivalent high-quality sans-serif: Sohne, Untitled Sans, or Neue Haas Grotesk). Inter is recommended for its extensive weight range (100-900), excellent legibility at all sizes, and tabular numeral support critical for data-heavy content.

**Secondary / Body Font:** Same family (Inter) at lighter weights. A single font family reduces cognitive load and maintains the scientific precision aesthetic. Do not introduce a second sans-serif.

**Accent / Scientific Context Font:** IBM Plex Mono for code blocks, data labels, model identifiers, or any content that benefits from monospace formatting (API references, data schemas, regulatory document codes). Use sparingly.

**Pull Quotes / Testimonials only:** Literata (a serif designed for digital reading) at italic weight. This is the ONLY context where a serif font appears. It creates a clear visual distinction for quoted material.

### Type Scale

All sizes specified in rem (base: 16px = 1rem). Line heights specified as multipliers.

| Token Name    | Size (rem) | Weight | Line Height | Letter Spacing | Usage                                          |
|---------------|------------|--------|-------------|----------------|-------------------------------------------------|
| display-lg    | 3.5        | 600    | 1.1         | -0.02em        | Homepage hero H1 only                          |
| display-sm    | 2.5        | 600    | 1.15        | -0.015em       | Page-level H1 on subpages                      |
| heading-1     | 2.0        | 600    | 1.2         | -0.01em        | Section H2 headers                             |
| heading-2     | 1.5        | 600    | 1.25        | -0.005em       | Subsection H3 headers                          |
| heading-3     | 1.25       | 600    | 1.3         | 0              | H4 within content blocks                       |
| body-lg       | 1.125      | 400    | 1.6         | 0              | Introductory paragraphs, subheadlines          |
| body-md       | 1.0        | 400    | 1.65        | 0              | Standard body text                             |
| body-sm       | 0.875      | 400    | 1.6         | 0              | Secondary body text, card descriptions         |
| caption        | 0.75       | 500    | 1.5         | 0.02em         | Figure labels, metadata, timestamps            |
| label          | 0.6875     | 600    | 1.4         | 0.08em         | Section labels, category tags (uppercase)      |
| mono           | 0.875      | 400    | 1.5         | 0              | Code, data identifiers, technical references   |
| stat-lg        | 3.0        | 700    | 1.0         | -0.02em        | Large statistic displays (credibility bar)     |
| stat-sm        | 2.0        | 700    | 1.0         | -0.01em        | Inline statistics within content               |

### Typography Rules

1. **Maximum line length:** 72 characters (approximately 680px at body-md size). Scientific text becomes difficult to track at longer line lengths. Content containers should enforce this maximum.

2. **Paragraph spacing:** 1.5em between paragraphs. No first-line indent.

3. **Heading spacing:** Headings have 2.5em top margin and 0.75em bottom margin, creating clear section breaks.

4. **Number formatting:** All statistics and data use tabular numerals (font-variant-numeric: tabular-nums). Thousands separated by commas. Decimals aligned in tables.

5. **Bold usage:** Bold (600 weight) within body text is reserved for key terms on first use, metric values, and proper nouns of platform features. Do not bold for emphasis on ordinary words.

6. **Italic usage:** Reserved for publication titles, Latin terms (in vivo, in vitro), and testimonial quotations (using Literata).

---

## C.2 Color Logic

### Primary Palette

| Token Name       | Hex       | RGB              | Usage                                                      |
|------------------|-----------|------------------|------------------------------------------------------------|
| blue-900         | #0A1628   | 10, 22, 40       | Primary dark background (footer, hero overlays)            |
| blue-800         | #12203D   | 18, 32, 61       | Secondary dark background (code blocks, dark sections)     |
| blue-700         | #1A3A6B   | 26, 58, 107      | Dark accent (active nav indicators, selected states)       |
| blue-600         | #2356A0   | 35, 86, 160      | Primary brand color (CTAs, links, key headings)            |
| blue-500         | #3B7DD8   | 59, 125, 216     | Interactive hover states, secondary buttons                |
| blue-400         | #6FA3E8   | 111, 163, 232    | Tertiary accents, icon fills                               |
| blue-100         | #E8F0FB   | 232, 240, 251    | Light backgrounds for highlighted content blocks           |
| blue-50          | #F4F7FC   | 244, 247, 252    | Alternate section background                               |

### Neutral Palette

| Token Name       | Hex       | RGB              | Usage                                                      |
|------------------|-----------|------------------|------------------------------------------------------------|
| grey-900         | #1A1E2E   | 26, 30, 46       | Primary text color                                         |
| grey-800         | #2D3348   | 45, 51, 72       | Secondary text (subtitles, descriptions)                   |
| grey-600         | #5A6178   | 90, 97, 120      | Tertiary text (captions, metadata)                         |
| grey-400         | #9098AD   | 144, 152, 173    | Disabled text, placeholder text                            |
| grey-200         | #D1D5DE   | 209, 213, 222    | Borders, dividers                                          |
| grey-100         | #E8EAF0   | 232, 234, 240    | Subtle backgrounds, table alternate rows                   |
| grey-50          | #F7F8FA   | 247, 248, 250    | Page background for light alternate sections               |
| white            | #FFFFFF   | 255, 255, 255    | Primary page background, card backgrounds                  |

### Semantic Colors

| Token Name       | Hex       | RGB              | Usage                                                      |
|------------------|-----------|------------------|------------------------------------------------------------|
| teal-600         | #0D7C6B   | 13, 124, 107     | Data/input indicators, Data Intelligence module            |
| teal-100         | #E0F5F1   | 224, 245, 241    | Light background for data-related content                  |
| indigo-600       | #4338CA   | 67, 56, 202      | Analytics/AI indicators, Decision Intelligence module      |
| indigo-100       | #EEF0FF   | 238, 240, 255    | Light background for analytics content                     |
| green-600        | #16803C   | 22, 128, 60      | Output/success indicators, Regulatory Outputs module       |
| green-100        | #E4F5E9   | 228, 245, 233    | Light background for output content, success states        |
| amber-600        | #B45309   | 180, 83, 9       | Warning states, attention required                         |
| amber-100        | #FFF7E0   | 255, 247, 224    | Warning background                                         |
| red-600          | #C81E1E   | 200, 30, 30      | Error states, critical alerts                              |
| red-100          | #FDE8E8   | 253, 232, 232    | Error background                                           |

### Color Rules

1. **Content type coding:** Each platform pillar has an assigned color used consistently across the site. Data Intelligence = teal. Decision Intelligence = indigo. Regulatory Outputs = green. This appears in pipeline diagram nodes, section labels, page accent elements, and navigation indicators.

2. **CTA color:** Primary CTA buttons always use blue-600 background with white text. Secondary CTAs use blue-600 text with transparent background and 1px blue-600 border. Tertiary CTAs use blue-600 text with no border (underline on hover).

3. **Trust color = blue.** The primary palette is overwhelmingly blue and grey-blue. Blue communicates precision, reliability, and institutional authority. It is not "tech startup blue" (which tends toward brighter, more saturated tones). ArcaScience blue is desaturated and dark-leaning, closer to Bloomberg or Nature.

4. **Action color = blue-600.** All clickable, interactive, or actionable elements use blue-600 as their resting color. Hover state shifts to blue-500. Active/pressed state shifts to blue-700. This creates a single, consistent "this is interactive" signal.

5. **No decorative color.** Colors are never applied for visual variety. If an element has color, it must encode meaning: module identity, state (success, error, warning), interactivity, or content-type categorization.

6. **Dark sections.** Dark backgrounds (blue-900, grey-900) are used sparingly: hero section, credibility bars, footer, and CTA sections. Maximum two dark sections per page (excluding footer). Text on dark backgrounds uses white (100% opacity for headings, 85% opacity for body, 65% opacity for secondary text).

7. **WCAG AA compliance.** All text-background combinations must meet WCAG AA contrast ratios: 4.5:1 for body text, 3:1 for large text (18px+ or 14px+ bold). The specified palette has been designed with these ratios. blue-600 on white achieves 5.2:1. grey-900 on white achieves 13.5:1. white on blue-900 achieves 14.8:1.

---

## C.3 Layout Rhythm

### Grid System

**Desktop (1280px+ viewport):**
- 12-column grid.
- Max content width: 1120px, centered.
- Column gutter: 24px.
- Outer margin: auto-calculated to center the 1120px container.
- Column width: approximately 69px each (1120px minus 11 gutters of 24px = 856px / 12 = ~69px per column, though in practice columns are fluid fractions).

**Tablet (768px-1279px):**
- 8-column grid.
- Max content width: 720px, centered.
- Column gutter: 20px.
- Outer margin: 24px minimum.

**Mobile (320px-767px):**
- 4-column grid.
- Max content width: 100% minus 16px outer margin each side.
- Column gutter: 16px.

### Spacing Scale

All spacing uses an 8px base unit. Named tokens:

| Token   | Value | Usage                                                  |
|---------|-------|--------------------------------------------------------|
| space-1 | 4px   | Tight inner padding (between icon and label)           |
| space-2 | 8px   | Minimum padding, small element gaps                    |
| space-3 | 12px  | Compact card padding, inline element spacing           |
| space-4 | 16px  | Standard card inner padding, form field spacing        |
| space-5 | 24px  | Standard column gutter, card outer gap                 |
| space-6 | 32px  | Section inner padding top/bottom                       |
| space-7 | 48px  | Standard section spacing                               |
| space-8 | 64px  | Major section spacing on desktop                       |
| space-9 | 96px  | Page section top/bottom padding                        |
| space-10| 128px | Hero section vertical padding                          |

### Whitespace Philosophy

1. **Whitespace is structural, not decorative.** It creates hierarchy by defining groups. Elements within a group have space-4 to space-5 gaps. Groups within a section have space-7 gaps. Sections have space-9 vertical padding.

2. **Content width for readability.** Body text columns never exceed 680px (approximately 72 characters). In a 12-column layout, body text typically occupies 7 columns (approximately 640px). Wide-format content (tables, diagrams, pipeline visualizations) may span the full 12 columns.

3. **Asymmetric layouts create attention.** Two-column layouts use a 7/5 or 8/4 split, not 6/6. The wider column holds the primary content. This creates an implicit reading hierarchy.

4. **Vertical rhythm.** Maintain consistent vertical spacing within content blocks. Body text line-height (1.65) combined with paragraph spacing (1.5em) creates a baseline-aligned rhythm. Headings break this rhythm deliberately to mark section boundaries.

### Section-to-Section Rhythm

Sections on a page alternate between three density patterns to maintain reading engagement:

1. **Dense Section** (high information: tables, diagrams, feature lists) — typically white background, full content width utilized, 480-800px height.
2. **Narrative Section** (medium information: 2-3 paragraphs with supporting visual) — typically white or grey-50 background, narrower text column (7 columns), 400-600px height.
3. **Breathing Section** (low information: hero, CTA, credibility bar, testimonial) — typically full-width with distinct background color, centered content, 200-400px height.

Pattern: Begin each page with a Breathing section (hero), followed by alternating Dense/Narrative sections, interspersed with Breathing sections every 3-4 Dense/Narrative sections. End with a Breathing section (CTA) and Dense section (footer).

---

## C.4 Component Patterns

### Cards

**Feature Card (Platform capabilities, use case summaries):**
- Dimensions: Responsive within column grid. Minimum height 240px.
- Structure: 1px border (grey-200). 4px border-radius. 24px inner padding. Optional: colored top border (3px) matching module color.
- Content: Optional category label (label token, uppercase, module color). Title (heading-3). Description (body-sm, 3 lines max, line-clamped with ellipsis). Link text at bottom ("Learn More" or "Explore," body-sm, blue-600, with right-pointing 16px arrow icon).
- States: Default (1px grey-200 border). Hover (border transitions to grey-400 over 150ms, 2px upward translateY). No box-shadow at any state.
- No background color (white). No decorative images. No icons unless they encode the module identity (in which case: 24px, single-color, top-left corner).

**Team Member Card:**
- Dimensions: Responsive within column grid. Minimum height 320px.
- Structure: No border. No border-radius. White background.
- Content: Professional headshot (square, 200x200px on desktop, fills card width on mobile. 4px border-radius). Name (heading-3, space-3 below image). Title (body-sm, grey-600). Bio (body-sm, 3 lines, line-clamped). LinkedIn icon (20px, grey-400, hover: blue-600).
- States: Default (no visual embellishment). Hover (image opacity 95%, subtle indication of clickability). Click expands bio inline.

**Resource Card (Blog posts, whitepapers, case studies):**
- Dimensions: Responsive within column grid.
- Structure: 1px border (grey-200). 4px border-radius. No padding on top (for content-type color bar). 24px padding on sides and bottom.
- Content: 4px top bar colored by content type (whitepaper = indigo-600, case study = teal-600, blog = blue-600, webinar = green-600, regulatory guide = grey-600). Title (heading-3). Excerpt (body-sm, 2 lines). Metadata row: publication date (caption, grey-600), read time (caption, grey-600), content type tag (label token, colored to match top bar).
- States: Same hover pattern as Feature Card.

### Data Visualization Containers

**Standard Chart Container:**
- Structure: White background. 1px border (grey-200). 4px border-radius. 24px padding.
- Header: Chart title (heading-3, left-aligned). Optional subtitle (body-sm, grey-600). Optional control row (time range selector, metric toggle) right-aligned on same line as title.
- Body: Chart visualization area. Minimum height 320px.
- Footer: Optional. Source attribution (caption, grey-600). Legend (if not inline in chart).
- Behavior: Charts are static images or SVGs for the marketing site (not live data). If any chart is interactive, it must function identically with keyboard navigation.

**Pipeline Diagram Container:**
- Structure: Full content-width. No border. Light grid-pattern background (subtle, 8px grid, grey-100 lines at 50% opacity) to reinforce technical precision.
- Content: SVG-based pipeline diagram with standardized node shapes (rectangles for processes, cylinders for data stores, parallelograms for inputs/outputs) and directional connectors.
- Behavior: Nodes are clickable regions. Active node has a blue-600 border highlight (2px). Connection lines animate briefly (200ms dash-offset transition) when a node is selected to show data flow direction.

### Expandable / Collapsible Sections

**Accordion Item:**
- Structure: Full content-width. Bottom border (1px, grey-200). 16px vertical padding.
- Header (collapsed): Title (heading-3, left-aligned). Expand icon (16px chevron, right-aligned, grey-600). Entire header row is clickable.
- Body (expanded): Slides open over 200ms (ease-out timing). Content area with 16px top padding. Chevron rotates 180 degrees.
- Behavior: In single-select mode (default), opening one item closes others. Multi-select mode available on the Security & Compliance page (activated by Shift+click or a "Expand All" link).
- Accessibility: Aria-expanded attribute on header. Aria-controls linking header to content panel. Content panel has role="region."

**Inline Detail Drawer:**
- Structure: Appears below the triggering element (card, table row, pipeline node). Full content-width. Light grey background (grey-50). 24px padding. Top border (2px, blue-600).
- Content: Variable. Typically 2-3 paragraphs + metadata + links to deeper content.
- Behavior: Opens with 200ms slide-down animation. Close button (X icon) in upper-right corner. Also closes when another element's drawer is opened.

### Comparison Tables

**Structure:**
- Full content-width. 1px outer border (grey-200). 4px border-radius.
- Header row: grey-50 background. Column headers in label token (uppercase, grey-600). Sticky header on vertical scroll within container.
- Data rows: Alternating white/grey-50 backgrounds (2% opacity difference). 16px vertical padding per row. 24px horizontal padding per cell.
- Number cells: Right-aligned, tabular-nums.
- Text cells: Left-aligned.
- Highlight row/column: If one column represents ArcaScience, its column header and cells have a blue-50 background, and the header has a 2px bottom border in blue-600.

**Checkmark/X patterns:** Use a filled circle checkmark (green-600) and an unfilled circle X (grey-400) for boolean comparisons. Do not use emoji. Icons are 16px.

### Process / Pipeline Visualizations

**Horizontal Process (3-6 steps):**
- Structure: Full content-width. Steps displayed as horizontal nodes connected by arrows. Each node: numbered label (stat-sm, blue-600), title (heading-3), brief description (body-sm, 2 lines). Arrow connectors between nodes are simple SVG lines with arrowhead markers.
- Behavior: Steps can be clickable (to reveal detail below) or static. If clickable, active step has blue-600 background with white text; inactive steps have grey-50 background with grey-900 text.
- Mobile: Rotates to vertical layout. Connectors become downward-pointing arrows between stacked cards.

### Testimonial / Quote Pattern

**Structure:**
- Centered within content width. Max width 800px.
- Pull quote in Literata italic, body-lg size (1.125rem). No quotation marks in the text (they are implied by the visual treatment).
- A 3px left border in blue-400 runs the full height of the quote (left-aligned layout) OR the quote is centered with no border and a 48px open-quote glyph above in grey-200 (centered layout).
- Attribution below: Name (body-md, 600 weight), Title and Organization (body-sm, grey-600). Optional company logo (24px height, grayscale) to the right of attribution.

### CTA Patterns

**Primary CTA Button:**
- Dimensions: Auto width (padding 16px 32px). Height 48px. 4px border-radius.
- Colors: blue-600 background, white text (body-md, 600 weight).
- States: Hover (blue-500 background, 150ms transition). Active (blue-700 background). Focus (2px blue-400 outline with 2px offset). Disabled (grey-300 background, grey-500 text).

**Secondary CTA Button:**
- Dimensions: Same as primary.
- Colors: Transparent background, blue-600 text, 1px blue-600 border.
- States: Hover (blue-50 background). Active (blue-100 background). Focus (same as primary).

**Tertiary CTA (Text Link):**
- Colors: blue-600 text, no border, no background.
- Decoration: No underline by default. Underline on hover (1px, blue-600). Right arrow icon (16px) to the right of text, 4px gap.
- States: Hover (underline appears, arrow translates 4px right over 150ms).

**CTA Section Block (Full-width):**
- Structure: Full-width container. Background: blue-600 (solid) or a subtle gradient from blue-700 to blue-600. Centered content: headline (heading-1, white), supporting text (body-lg, white at 85% opacity), primary CTA button (white background, blue-600 text — inverted).
- Vertical padding: space-9 (96px) top and bottom.

---

# D. Interaction Patterns

---

## D.1 Progressive Concept Revelation

### Three-Layer Depth Model

Every complex concept on the site is presented in three accessible layers:

**Layer 1 — Headline (always visible):** A single statement summarizing the concept. Example: "24 AI models process safety signals across the full drug lifecycle." This appears as a heading or bold introductory statement. It is never interactive; it is always visible.

**Layer 2 — Context (one interaction away):** A 2-4 sentence explanation providing context, methodology overview, and key evidence. Access methods:
- On Feature Cards: Click card or "Learn More" to expand inline drawer.
- On Pipeline Nodes: Click node to reveal detail panel below diagram.
- On Table Rows: Click row to expand detail section.
- On Accordion Items: Click header to expand content.

**Layer 3 — Detail (two interactions away):** Full technical depth. Access methods:
- "Deep Dive" link within Layer 2 content, navigating to the relevant section on the Science & Methodology page or a dedicated subpage.
- Modal overlays are NOT used for Layer 3 content. Deep content always has its own URL (for shareability and bookmarking).

### Implementation Rules

1. Layer 1 must be independently meaningful. A user who reads only Layer 1 content should have a correct (if incomplete) understanding.
2. Layer 2 must be accessible without page navigation. It opens inline on the current page.
3. Layer 3 content always has a dedicated URL with a back-link to the source page.
4. Progressive disclosure animations are uniformly 200ms, ease-out timing function.
5. Disclosed content never covers or obscures other content. It pushes subsequent content down (inline drawer pattern), never overlays (no modals for content).

---

## D.2 Hover States and Micro-Feedback

### Hover Behavior Matrix

| Element Type              | Hover Response                                                         | Timing |
|---------------------------|------------------------------------------------------------------------|--------|
| Navigation links          | Text color: grey-900 to blue-600. Underline appears (1px).            | 150ms  |
| Primary CTA button        | Background: blue-600 to blue-500.                                      | 150ms  |
| Secondary CTA button      | Background: transparent to blue-50.                                    | 150ms  |
| Tertiary CTA (text link)  | Underline appears. Arrow icon translates 4px right.                   | 150ms  |
| Card (feature, resource)  | Border: grey-200 to grey-400. TranslateY: -2px.                      | 150ms  |
| Table row                 | Background: current to grey-50.                                        | 100ms  |
| Pipeline node             | Border: none to blue-600 (2px). Tooltip appears below node.          | 200ms  |
| Expandable header         | Background: current to grey-50. Chevron color: grey-600 to blue-600. | 150ms  |
| Team member photo         | Opacity: 100% to 95%. Subtle scale: 1.0 to 1.01.                     | 200ms  |
| Logo in partner grid      | Filter: grayscale(100%) to grayscale(0%).                             | 200ms  |

### Rules

1. **No hover-only content.** Any information revealed on hover (tooltips, etc.) must also be accessible via click/tap for touch devices.
2. **Tooltips** appear after a 300ms delay (to avoid flickering during casual mouse movement), stay visible for as long as the cursor remains, and disappear 200ms after cursor leaves.
3. **No cursor changes** beyond the browser defaults: pointer for clickable elements, text for selectable text, default for everything else.

---

## D.3 Navigation Interaction

### Sticky Navigation Bar

- **Behavior:** Nav bar starts at full height (72px) with transparent background on pages with dark hero sections (Homepage, For Investors), or white background on other pages. On scroll past the hero section (or past 100px on non-hero pages), the nav bar becomes sticky with: white background at 97% opacity, backdrop-blur(8px), 1px bottom border (grey-200), reduced height (64px). Transition: 200ms.
- **Active page indicator:** 2px bottom border in blue-600 on the active top-level nav item.
- **Dropdown menus:** Platform and Use Cases nav items have dropdown menus on hover (desktop). Dropdowns appear after 200ms hover delay, have white background with 1px border (grey-200), 4px border-radius, 8px box-shadow (0 4px 12px rgba(0,0,0,0.08)). Each dropdown item has the same hover pattern as nav links.
- **Mobile:** Hamburger menu icon (24px, right-aligned, before Demo CTA button). Opens a full-screen overlay (white background, vertical list of all nav items, 200ms slide-from-right animation). Subitems are expandable accordions within the mobile menu.

### Scroll Indicators

- **Long pages (Science & Methodology, Security & Compliance):** A thin (2px) progress bar at the very top of the viewport (above the nav bar), colored blue-600, showing page scroll progress from 0% to 100%.
- **Table of Contents pages:** The sticky left-rail ToC highlights the current section. Highlight is a 3px left border on the active item (blue-600) and bold text weight. All other items show normal weight.

### Breadcrumbs

- **Display:** On all pages except Homepage. Positioned above the H1, inside the page header. Format: "Home > [Parent] > [Current Page]." Text token: caption, grey-600. Links: grey-600, hover: blue-600 with underline. Current page: grey-900, not linked.
- **Mobile:** Breadcrumbs truncated to show only "< [Parent Page]" as a back link.

---

## D.4 Overview-to-Detail View Switching

### Split Content Pattern

On pages where users need to switch between an overview and a detail view (Platform Overview pipeline, AI/ML Model Portfolio table):

1. **Overview state (default):** All items visible at summary level. Compact display.
2. **Selection:** User clicks an item.
3. **Detail state:** Selected item expands inline. Other items remain visible but compress or dim slightly (opacity 70%) to maintain context. A "Close" action (X button or clicking another item) returns to overview state.

This pattern avoids the disorientation of full-page navigation for exploring details within a structured set.

---

## D.5 Tab and Toggle Patterns

### Horizontal Tab Bar

- **Usage:** For multi-perspective content within a single section (e.g., showing the same platform capability from different stakeholder perspectives, or switching between data source types).
- **Structure:** Horizontal row of tab labels. Active tab: blue-600 text, 2px bottom border (blue-600). Inactive tabs: grey-600 text, no border. Hover: grey-900 text.
- **Content:** Tab content area appears below with 16px top padding. Content transitions with a 150ms opacity fade (no slide animation).
- **Accessibility:** Role="tablist" on container, role="tab" on each tab, role="tabpanel" on content area. Arrow keys navigate between tabs.
- **Mobile:** If more than 4 tabs, the tab bar becomes horizontally scrollable with a subtle right-edge fade indicating more tabs.

### Toggle Switch

- **Usage:** For binary content switches (e.g., "Annual/Monthly" pricing if applicable, "Simplified/Detailed" view toggle).
- **Structure:** Two labels flanking a toggle track (40px wide, 24px tall, 12px border-radius). Active side: blue-600 track background. Inactive side: grey-300 track background. Knob: white, 20px circle with subtle shadow.
- **Transition:** 200ms.
- **Accessibility:** Role="switch," aria-checked.

---

## D.6 Search and Filter Patterns

### Resource Hub Search

- **Structure:** Text input (full width of filter bar, approximately 320px). 40px height. 4px border-radius. 1px border (grey-200). Left-aligned search icon (16px, grey-400) inside the input. Placeholder text: "Search resources..." (grey-400).
- **Behavior:**
  - Searches on keypress with a 300ms debounce.
  - Results filter the grid below in real time (no page reload).
  - If no results: display "No resources match your search. Try adjusting your filters." in the grid area.
- **Focus state:** Border changes to blue-600 (2px). Outer glow (0 0 0 3px blue-100).

### Filter Dropdowns

- **Structure:** Select-style dropdowns, 160px width, 40px height, matching the search input's visual style.
- **Behavior:** Selecting a filter value immediately filters the results. Multiple filters are cumulative (AND logic). Active filters appear as removable chips (inline tags) between the filter bar and the content grid. Each chip shows the filter value and a small X to remove.
- **Clear all:** "Clear Filters" text link (tertiary CTA style) appears when any filter is active.

---

## D.7 Form Design for Demo Requests

### Trust-Building Form Design

1. **Field count:** Maximum 7 fields visible at once (including the message textarea). This matches research on form completion rates for B2B enterprise contexts — enough to qualify the lead without creating abandonment.

2. **Field layout:** Single column. Each field label above the input (not inline/floating). Labels in body-sm (600 weight). Inputs are 48px height, full width of the form column, 1px grey-200 border, 4px border-radius.

3. **Validation:**
   - Real-time: green checkmark icon (16px, green-600) appears inside the right edge of an input when its value is valid.
   - Error: red border (1px, red-600), error message below the field (body-sm, red-600). Error message appears with a 150ms fade-in.
   - Email validation includes format check and domain validation (reject freemail: gmail.com, yahoo.com, hotmail.com) with a helpful message: "Please use your work email address."

4. **Submit button:** Full width of form column. Primary CTA style. Changes to a loading state (spinner icon replacing text) on click. On success: button transitions to green-600 background with checkmark icon and "Request Submitted" text. Form is replaced by a confirmation message with next-step expectation.

5. **Privacy:** The consent checkbox is positioned directly above the submit button. It links to the Privacy Policy (opens in new tab). No pre-checked boxes.

6. **Autofill:** Form fields use appropriate autocomplete attributes (name, email, organization-title) to support browser autofill.

---

# E. Expert-Friendly UX Patterns

---

## E.1 Serving Users Who Already Know BRA

These are pharmacovigilance scientists, regulatory affairs directors, and clinical safety leaders who understand benefit-risk analysis methodology and are evaluating ArcaScience's technical capability.

### Patterns for Expert Users

1. **Skip the primer.** Do not force expert users through introductory content. On technically dense pages (Data Intelligence Engine, Science & Methodology), the introductory paragraph is brief (2-3 sentences) and the user can immediately reach technical depth via the table of contents or by scrolling past the intro.

2. **Use professional terminology without explanation.** Terms like MedDRA, CIOMS, PBRER, DSUR, FAERS, EudraVigilance, ICH E2C(R2), MCDA, SMQ, PT, HLT, SOC — these appear without inline definitions. A glossary page is available (linked from the footer) for users who need term definitions, but the primary content assumes professional vocabulary.

3. **Provide anchored section links.** Every H2 and H3 heading generates a URL anchor. When a user hovers over a heading, a small link icon (16px, grey-400) appears to the left, allowing them to copy a direct link to that section. This supports internal sharing ("Look at Section 3.2 of their methodology page").

4. **Show methodology, not just outcomes.** Expert users distrust claims without methodology. Every capability claim on the site links to the Science & Methodology page's relevant section. The site never says "our AI is the best" — it says "our NLP pipeline achieves F1 0.92 on MedDRA coding against the [Named] benchmark dataset, validated on [N] cases."

5. **Comparison-ready content.** Expert users will compare ArcaScience against alternatives. The comparison table on the For Investors page is a starting point, but individual feature descriptions should also include specificity that enables comparison: processing speed, data volume capacity, update frequency, compliance certifications.

---

## E.2 Serving First-Time Visitors

These are executives, investors, and professionals from adjacent fields who may not know ArcaScience specifically, and may need context about AI-driven BRA.

### Patterns for New Visitors

1. **Homepage does the orientation work.** The homepage (Sections 2-7) moves from broad problem statement to specific solution to credibility evidence. A first-time visitor who reads only the homepage should understand: what BRA is, why it's hard, what ArcaScience does differently, and why it's credible.

2. **Use Cases as entry points.** The four use case pages serve as persona-specific entry points. A VP Drug Safety focused on post-marketing can go directly to that use case page and see content framed for their context.

3. **Visual pipeline as mental model.** The horizontal pipeline diagram (Data > Decision > Output) appears on the Homepage and Platform Overview page. It provides a structural mental model that orients all subsequent detailed content. Every subpage shows its position within this pipeline.

4. **"What to expect" on the demo form.** First-time visitors evaluating whether to commit to a demo see a clear process description alongside the form, reducing uncertainty.

---

## E.3 Keyboard Navigation and Accessibility

### WCAG 2.1 AA Compliance (minimum)

1. **Focus indicators:** All interactive elements have visible focus states. Focus ring: 2px solid blue-400 with 2px offset from the element. Focus ring is visible in both light and dark color schemes.

2. **Tab order:** Logical, following the visual layout top-to-bottom, left-to-right. Skip-navigation link ("Skip to main content") is the first focusable element on every page.

3. **Aria landmarks:** Every page has: header (role="banner"), main (role="main"), nav (role="navigation"), footer (role="contentinfo"). Sections within main use aria-labelledby pointing to their heading.

4. **Heading hierarchy:** Strict sequential heading levels (H1 > H2 > H3). No skipped levels. One H1 per page.

5. **Image alt text:** All informational images have descriptive alt text. Decorative images have alt="". Complex diagrams (pipeline, architecture) have both alt text summarizing the diagram and a "Detailed description" expandable text block below with a full textual description.

6. **Keyboard interaction:**
   - Tab/Shift+Tab: Navigate between interactive elements.
   - Enter/Space: Activate buttons, expand accordions, select tabs.
   - Arrow keys: Navigate within tab bars, dropdown menus, and table rows.
   - Escape: Close expanded drawers, tooltips, dropdown menus, mobile nav overlay.

7. **Screen reader announcements:** Dynamic content changes (filter results updating, drawer expanding, form validation messages) use aria-live regions. Polite for non-urgent updates, assertive for error messages.

8. **Color independence:** All information conveyed by color is also conveyed by text label, icon shape, or position. Pipeline module colors are always accompanied by text labels.

9. **Reduced motion:** Respect prefers-reduced-motion media query. When active: all animations are instant (0ms duration), scroll behavior is auto (no smooth scroll), and parallax effects (none exist, but as a safeguard) are disabled.

---

## E.4 In-Page Information Architecture

### Table of Contents (Long Pages)

Implemented on: Science & Methodology, Security & Compliance, Platform Overview.

- **Desktop:** Sticky left rail (columns 1-3). Lists all H2 and H3 headings as a nested, indented list. Current section highlighted with left border (3px, blue-600) and bold text. Other sections in grey-600, regular weight. Clicking a ToC item smooth-scrolls to that section.
- **Mobile:** Collapses into a dropdown button at the top of the content area, below the page header. Button label shows current section name. Tapping opens a full-width dropdown listing all sections.

### Anchor Links

- Every H2 and H3 generates a URL slug anchor (e.g., #ai-ml-approach).
- Heading hover reveals a link icon that, when clicked, copies the full URL with anchor to clipboard and shows a brief "Link copied" tooltip (1.5 seconds).

### Back-to-Top

- A small (40px square) "Back to top" button appears in the bottom-right corner of the viewport after the user scrolls past 600px. Button: grey-50 background, 1px grey-200 border, 4px border-radius, upward arrow icon (16px, grey-600). Hover: grey-100 background. Click: smooth-scrolls to page top.

---

## E.5 Avoiding Startup-Gimmicky Patterns

### Explicitly Prohibited Patterns

The following design patterns are banned from the ArcaScience site. Each is listed with the reason for exclusion.

1. **Parallax scrolling.** Reason: Creates a consumer-entertainment feel. Pharmaceutical professionals associate parallax with marketing sites, not scientific platforms.

2. **Scroll-triggered entrance animations (fade-in, slide-up, zoom-in).** Reason: Delays information access. Expert users scanning quickly will see blank sections waiting to animate. This is disrespectful of their time.

3. **Auto-playing video.** Reason: Creates unexpected noise in professional environments (offices, conferences). Video, if present, must be user-initiated.

4. **Carousels/sliders that auto-rotate.** Reason: Users cannot control the pace. If multiple items must be shown, use a static grid or a manually-navigated slider with clear controls.

5. **Chatbot pop-ups or interstitial modals.** Reason: Interrupts the evaluation flow. The contact page serves this need. A persistent "Request Demo" button in the nav is sufficient.

6. **Gradient text or animated gradient backgrounds.** Reason: Undermines the precision aesthetic. Gradients are permitted only in CTA section backgrounds (subtle, two-step, same hue family).

7. **Excessive iconography.** Reason: Generic icons (lightbulb for "innovation," shield for "security," rocket for "speed") are meaningless to expert audiences. Icons are used only when they represent a specific, recognizable concept (e.g., database cylinder for data sources, document icon for regulatory outputs).

8. **"Trusted by" logos without context.** Reason: Displaying partner/customer logos without specifying the nature of the relationship (customer, research partner, data provider) reduces credibility with expert audiences who know the difference.

9. **Infinite scroll on the homepage.** Reason: The homepage has a defined structure (10 sections). The user must be able to reach the footer without endless scrolling.

10. **Loading screens or skeleton states on the marketing site.** Reason: The marketing site should deliver fully rendered HTML on first paint. No client-side rendering delays for marketing content. SSR or static generation is mandatory.

---

# F. Responsive Strategy

---

## F.1 Breakpoint System

| Name        | Min Width | Max Width | Grid Columns | Content Max Width | Use Case                     |
|-------------|-----------|-----------|--------------|-------------------|------------------------------|
| mobile-sm   | 320px     | 479px     | 4            | 100% - 32px       | Small phones                 |
| mobile-lg   | 480px     | 767px     | 4            | 100% - 32px       | Large phones, small tablets  |
| tablet      | 768px     | 1023px    | 8            | 720px              | Tablets, small laptops       |
| desktop-sm  | 1024px    | 1279px    | 12           | 960px              | Small desktop, laptops       |
| desktop-lg  | 1280px    | none      | 12           | 1120px             | Standard desktop             |

### Approach: Desktop-First with Systematic Downscaling

The primary audience uses desktop devices in office environments. The design is created at 1280px+ first, then systematically adapted downward. Mobile is not an afterthought, but desktop is the optimization target.

---

## F.2 Layout Adaptation Rules

### Two-Column to Single-Column Collapse

All two-column content layouts (text + visual, text + form, text + diagram) collapse to single-column at the tablet breakpoint (768px). Order:
- If text is the primary content: text appears first (top), visual second (below).
- If visual is the primary content (dashboard showcase, pipeline diagram): visual appears first, text second.

### Grid Density Reduction

| Component       | Desktop Columns | Tablet Columns | Mobile Columns |
|-----------------|-----------------|----------------|----------------|
| Feature cards   | 3               | 2              | 1              |
| Use case cards  | 2 (2x2)        | 2              | 1              |
| Team cards      | 3               | 2              | 1              |
| Resource cards  | 3               | 2              | 1              |
| Stat numbers    | 4-5 across      | 2x2            | 2x2 or stack   |

### Navigation Adaptation

- **Desktop (1024px+):** Full horizontal nav with dropdown menus.
- **Tablet (768px-1023px):** If all nav items fit, maintain horizontal layout with reduced spacing. If they do not fit, switch to hamburger menu. Demo CTA button remains visible.
- **Mobile (< 768px):** Hamburger menu. Full-screen overlay when open. Demo CTA remains as a small button adjacent to hamburger.

---

## F.3 Content Deprioritization on Mobile

### Preserved at All Sizes
- All primary content (headlines, body text, CTAs).
- All interactive elements (forms, filters, expandable sections).
- All navigation paths.

### Adjusted on Mobile
- **Pipeline diagrams:** Rotate from horizontal to vertical. Nodes stack vertically with downward arrows.
- **Comparison tables:** Become horizontally scrollable with a subtle "scroll for more" indicator (gradient edge fade + small right arrow).
- **Side-by-side text+visual layouts:** Collapse to stacked single-column.
- **Left-rail table of contents:** Becomes a dropdown button at top of content.
- **Credibility bar metrics:** Reduce from single row to 2x2 grid.

### Removed on Mobile
- **Hover tooltips:** Replaced with tap-to-reveal behavior. Tooltip content appears inline below the tapped element.
- **Diagram zoom controls:** Replaced with standard pinch-to-zoom.
- **Multi-column footer:** Collapses to single column with expandable section groups.

---

## F.4 Touch-Friendly Interaction Replacements

| Desktop Pattern           | Mobile Replacement                                        |
|---------------------------|-----------------------------------------------------------|
| Hover to preview          | Tap to expand inline detail                               |
| Hover tooltip             | Tap target reveals tooltip inline (below element)         |
| Pipeline node hover       | Tap node to select, detail panel opens below              |
| Differentiator hover      | Differentiator items become tappable cards with inline visual |
| Right-click / context     | Long-press (if needed), but avoided where possible        |
| Dropdown on hover         | Tap to open dropdown, tap elsewhere to close              |
| Drag-to-scroll table      | Horizontal swipe with momentum                            |

### Touch Target Sizes

- Minimum touch target: 44x44px (WCAG 2.1 requirement).
- Interactive elements spaced at least 8px apart to prevent mis-taps.
- CTA buttons: minimum 48px height on mobile (matching desktop size).

---

## F.5 Data Visualization Scaling

### Charts and Graphs
- **Desktop:** Full-size within container (minimum 320px height).
- **Tablet:** Maintain aspect ratio. If container width shrinks below 600px, axis labels reduce in font size (from caption to a smaller caption at 10px, minimum legible size).
- **Mobile:** Charts become horizontally scrollable if they contain more than 5 data series or 10 data points on the x-axis. A "scroll to see full chart" indicator appears. Alternatively, provide a "View Full Chart" button that opens a full-screen landscape overlay.

### Pipeline Diagrams
- **Desktop:** Horizontal layout, full content width.
- **Tablet:** Horizontal if it fits (simplified label sizes). If more than 6 nodes, switch to vertical.
- **Mobile:** Always vertical. Each node becomes a full-width card in a vertical stack. Connecting arrows are replaced with downward-pointing chevrons between cards.

### Tables
- **Desktop:** Full table layout with all columns visible.
- **Tablet:** If more than 5 columns, the table becomes horizontally scrollable. First column (row identifier) is sticky/fixed.
- **Mobile:** Tables with more than 3 columns convert to a card-based layout: each row becomes a card, each column becomes a key-value pair within the card. Alternatively, maintain table format with horizontal scroll and sticky first column.

---

## Appendix: Implementation Notes

### Performance Requirements
- First Contentful Paint (FCP): < 1.2 seconds on 3G connection.
- Cumulative Layout Shift (CLS): < 0.1.
- All pages must be server-side rendered (SSR) or statically generated. No client-side rendering for marketing content.
- Images: WebP format with JPEG fallback. Lazy-loaded below the fold. Hero images eager-loaded with preload hint.
- Fonts: Self-hosted (not Google Fonts CDN) for performance and privacy. Subset to Latin character set. Font-display: swap.

### Technology Recommendations
- Framework: Next.js (App Router) with static generation for marketing pages.
- Styling: Tailwind CSS with the custom design token system defined above, or CSS Modules with design tokens as CSS custom properties.
- Diagrams: SVG-based (hand-crafted or D3.js for interactive pipeline diagrams). No raster images for diagrams.
- Animation: CSS transitions only (no JavaScript animation libraries). Transition properties limited to: opacity, transform, background-color, border-color, box-shadow.
- Testing: Automated accessibility testing with axe-core in CI pipeline. Lighthouse performance budget enforcement.

### Design Token Export Format
All colors, typography, spacing, and component tokens should be maintained in a single source-of-truth file (JSON or YAML) and consumed by both design tools (Figma via Tokens Studio plugin) and the codebase (via build-time transformation to CSS custom properties or Tailwind config).

---

*End of ArcaScience UX/UI Design System specification.*
