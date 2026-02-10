# ArcaScience Motion & Animation Architecture
## Agent 5 — Motion & Animation Architect Deliverable

**Version:** 1.0.0
**Date:** 2026-02-09
**Classification:** Internal Design Systems Documentation

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Animation Concepts — Section A](#2-animation-concepts)
3. [Scroll-Based Animation Strategy — Section B](#3-scroll-based-animation-strategy)
4. [Micro-Interactions — Section C](#4-micro-interactions)
5. [Motion Storytelling Logic — Section D](#5-motion-storytelling-logic)
6. [Technical Implementation Guidelines — Section E](#6-technical-implementation-guidelines)
7. [DO / DON'T Rules — Section F](#7-do--dont-rules)
8. [Motion Token Reference](#8-motion-token-reference)
9. [Accessibility Specification](#9-accessibility-specification)

---

## 1. Design Philosophy

### The ArcaScience Motion Principle

> **"Every frame of motion must teach. Every transition must build trust. Every animation must earn its render cycle."**

ArcaScience motion design follows three immutable laws:

1. **Explanatory Motion** — Animation exists to make complex pharmaceutical data comprehensible. If removing an animation would lose no information, the animation should not exist.

2. **Scientific Precision** — Timing curves, spatial relationships, and data representations must feel calibrated, not arbitrary. Motion should evoke the rigor of a controlled clinical trial, not the spectacle of a consumer product launch.

3. **Earned Attention** — Pharma executives and safety scientists are time-constrained and skepticism-trained. Motion must reward their attention with clarity, not test their patience with decoration.

### Visual DNA Reference Points

| Reference            | What We Take                                        | What We Reject                          |
|----------------------|-----------------------------------------------------|-----------------------------------------|
| Nature journal       | Precision diagrams, measured reveals, data-first     | Static-only thinking                    |
| Bloomberg Terminal   | Information density, real-time data motion            | Visual austerity, no visual hierarchy   |
| Apple product pages  | Scroll-driven storytelling, spatial depth            | Consumer playfulness, emotional excess  |
| PubMed / ClinicalTrials.gov | Authority of structured data display       | Zero motion, pure utility               |

### Motion Personality

- **Deliberate** — Nothing moves without purpose
- **Measured** — Easing curves favor controlled deceleration, never bounce
- **Layered** — Complex ideas unfold in choreographed sequences
- **Respectful** — Never forces the user to wait for an animation to finish before accessing content

---

## 2. Animation Concepts

---

### 2.1 Homepage Hero Animation

#### What It Shows
A data-flow visualization depicting the ArcaScience pipeline: raw pharmaceutical data (represented as structured data points — not abstract particles) entering the platform on the left, passing through a schematic representation of the AI processing core, and emerging on the right as structured regulatory-ready outputs (a PSUR document silhouette, an RMP framework, a benefit-risk matrix).

The visualization is a horizontal flow diagram rendered as an animated SVG. It is NOT a particle system, NOT a WebGL globe, and NOT an abstract gradient animation. It is a functional schematic that happens to move.

#### Visual Composition (left to right, 1440px viewport)

```
[Left Zone: Data Sources]          [Center: AI Core]           [Right Zone: Outputs]

  Clinical Trials ─────┐                                       ┌──── PSUR Document
  Real-World Evidence ──┤     ┌─────────────────────┐          ├──── RMP Framework
  Literature ───────────┼────▶│  24 AI Models Grid   │────▶    ├──── Benefit-Risk Matrix
  Regulatory Data ──────┤     │  (4×6 node matrix)   │         ├──── Safety Signals
  Safety Reports ───────┘     └─────────────────────┘          └──── Decision Report
```

#### How It Moves

**Phase 1 — Data Entry (0ms–1200ms):**
- Five data source labels fade in sequentially from left, staggered by 150ms each.
- Each label is preceded by a small monochrome icon specific to its data type (a flask for clinical trials, a document stack for literature, etc.).
- As each label appears, a horizontal connection line draws from right-to-left using `stroke-dashoffset` animation, connecting to the central processing zone.
- Lines are 1px solid, color `#4A6FA5` (the platform's primary blue), with a subtle 2px glow using an SVG `<feGaussianBlur>` filter at 0.3 opacity.

**Phase 2 — Data Flow (1200ms–2400ms):**
- Small data point indicators (3px circles) travel along the connection lines from left toward center.
- Each line carries 3–5 data points, spaced 80ms apart.
- Data points move at a constant velocity (no easing) to evoke systematic processing, not organic movement.
- Points are colored by source type: clinical trials (#3B82F6), RWE (#10B981), literature (#8B5CF6), regulatory (#F59E0B), safety (#EF4444).

**Phase 3 — AI Processing (2400ms–4200ms):**
- The central 4x6 grid of AI model nodes illuminates sequentially.
- Each node is a 12px rounded rectangle that transitions from `#E5E7EB` (dormant gray) to its active color over 200ms.
- Illumination pattern follows a diagonal wave from top-left to bottom-right, with 75ms stagger between nodes.
- Once illuminated, nodes pulse at a slow 3-second cycle (opacity 0.7 to 1.0) to indicate ongoing processing.
- A thin progress bar beneath the grid fills from left to right over the 1800ms duration of this phase.

**Phase 4 — Output Generation (4200ms–5400ms):**
- Connection lines draw rightward from the AI core to five output labels.
- Output labels fade in with a 100ms stagger.
- Each output is accompanied by a miniature document/chart icon that scales from 0.8 to 1.0.
- The benefit-risk matrix output has a special treatment: a tiny 2-axis chart sketch that draws its axes and a single data point.

**Phase 5 — Steady State / Loop (5400ms+):**
- Data points continue flowing left-to-right at reduced frequency (one point per line every 2 seconds).
- AI grid nodes maintain their slow pulse.
- The entire visualization holds in this ambient state indefinitely.
- On subsequent loops, Phases 1–4 do NOT replay. Only the steady-state persists.

#### Duration and Loop Behavior
- **Initial sequence:** 5400ms total
- **Loop:** Ambient steady-state only (data points flowing, nodes pulsing)
- **Replay trigger:** Only if the user scrolls away and returns, and at least 30 seconds have elapsed

#### Connection to Headline
The headline sits above or overlaid on the visualization:
> "From 100 Billion Data Points to Regulatory-Ready Decisions"

The animation literally shows this transformation. The data points entering on the left are the "100 billion data points." The outputs on the right are the "regulatory-ready decisions." The AI core in the center is the "how."

#### Technical Approach
- **Rendering:** Inline SVG, animated via CSS custom properties and minimal JavaScript for stagger control
- **SVG Dimensions:** `viewBox="0 0 1200 400"`, responsive via `preserveAspectRatio="xMidYMid meet"`
- **Animation Engine:** CSS `@keyframes` for all repeating animations (flow, pulse); JavaScript `requestAnimationFrame` only for the initial stagger sequencing
- **No external libraries** for the hero — pure SVG + CSS + vanilla JS
- **Total SVG payload:** Target < 15KB gzipped
- **Performance:** All animations use `transform` and `opacity` only — no layout-triggering properties. GPU-composited layers for the data flow paths.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, the animation skips directly to the fully-revealed steady state with no motion. All elements visible, no flow animation, nodes at static full color.

---

### 2.2 Platform Pipeline Visualization

#### Overview
The 6-step ArcaScience pipeline is presented as a horizontal (desktop) or vertical (mobile) connected sequence:

```
1. Clinical       2. Data Intelligence    3. AI Processing    4. Strategic    5. Decision       6. Automated
   Framing           Engine (24 models)      (100B+ pts)         Analysis       Intelligence      Outputs
   [  ◇  ] ──────▶ [  ◇  ] ──────────▶ [  ◇  ] ──────▶ [  ◇  ] ────▶ [  ◇  ] ──────▶ [  ◇  ]
```

Each step is a "station" — a contained card with an icon, title, brief description, and an expandable detail panel.

#### Scroll-Triggered Behavior

The pipeline uses **scroll-linked progressive reveal**, not auto-play.

**Trigger Model:**
- The pipeline section enters the viewport when its top edge crosses the 75% mark of the viewport height.
- Each station activates when it crosses the 60% viewport mark (giving a natural left-to-right / top-to-bottom reveal as the user scrolls).

**Per-Station Animation Sequence (triggered individually):**

1. **Station Card Entrance (0ms–400ms):**
   - Card translates from `translateY(30px)` and `opacity: 0` to final position.
   - Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — a controlled ease-out.

2. **Icon Activation (200ms–600ms, overlapping with card):**
   - The station icon draws itself using SVG `stroke-dashoffset` animation.
   - Total draw time: 400ms.
   - Once drawn, the icon fills with color from center outward (radial fill using a `clipPath` animation).

3. **Connector Line Draw (400ms–800ms):**
   - The connecting line/arrow to the next station draws from left to right.
   - This only fires once the current station has fully entered.
   - A subtle directional arrowhead appears at the end of the line.

4. **Data Flow Particles (800ms+):**
   - Once the connector is drawn, small data indicators begin flowing along the connector toward the next station.
   - These are 2px circles that traverse the path over 1200ms each, at a rate of one every 800ms.
   - This ambient flow persists as long as the station is in viewport.

**Scroll Speed Mapping:**
- Pipeline reveal is NOT 1:1 with scroll position (that creates a fragile, jerky experience).
- Instead, scroll position triggers animation START, and animations complete on their own timeline.
- If the user scrolls quickly through the entire pipeline, all six stations trigger in rapid succession with a 150ms stagger — the animations overlap gracefully.

#### Interactive Elements

**Hover (desktop):**
- Hovering a station card elevates it with `translateY(-4px)` and increases `box-shadow` from `0 1px 3px rgba(0,0,0,0.1)` to `0 8px 24px rgba(0,0,0,0.12)`.
- Transition: 200ms ease-out.
- The station icon increases saturation by 10% and scales to 1.05.
- Data flow particles on adjacent connectors speed up by 30%.

**Click to Expand:**
- Clicking a station card expands it downward (or into a modal on mobile) to reveal:
  - A detailed description of the pipeline step (2-3 sentences).
  - Key metrics or capabilities (e.g., "24 concurrent AI models" for step 2).
  - A mini-visualization specific to that step (described in the SVG component specs).
- Expansion animation: height auto-transition using `max-height` from 0 to calculated value, 350ms ease-out.
- Other station cards do NOT collapse — multiple can be expanded simultaneously.
- An "×" button in the expanded area collapses with the reverse animation.

**Focus (keyboard navigation):**
- Tab moves focus between stations.
- Focused station receives a 2px outline in `#4A6FA5` with 2px offset.
- Enter/Space triggers the expand interaction.

#### Technical Approach
- **Layout:** CSS Grid (desktop: `grid-template-columns: repeat(6, 1fr)`; mobile: single column)
- **Animations:** IntersectionObserver API to trigger, CSS `@keyframes` for all transitions
- **Connectors:** SVG `<line>` or `<path>` elements positioned between grid cells
- **Data flow:** CSS `offset-path` animation along the SVG connector paths
- **Expand/collapse:** CSS transitions on `max-height` and `opacity` with JS toggle
- **Library:** None required — vanilla IntersectionObserver + CSS

---

### 2.3 Benefit-Risk Balance Visualization

#### Concept
This is the signature visualization of the ArcaScience platform. It communicates the core intellectual framework: that benefits and risks are not static binary categories but dynamic, multi-dimensional, and temporally evolving quantities.

#### Visual Structure

The visualization has three layers:

**Layer 1 — The Balance Scale (primary visual)**

A stylized analytical balance rendered in SVG. NOT a literal medieval scale — a modern, schematic representation:

```
                    ┌──────────────────────────────┐
                    │         Pivot Point           │
                    │            ▽                  │
            ┌───────┴───────────────────────┴──────┐
            │                                       │
     ┌──────┴──────┐                        ┌──────┴──────┐
     │   BENEFITS   │                        │    RISKS     │
     │              │                        │              │
     │  ■ Efficacy  │                        │  ■ AEs       │
     │  ■ QoL       │                        │  ■ SAEs      │
     │  ■ Survival  │                        │  ■ Drug Int. │
     │  ■ Response  │                        │  ■ Tox.      │
     └──────────────┘                        └──────────────┘
```

- The balance beam is a 2px horizontal line that can TILT based on the relative weight of benefits vs. risks.
- Each side contains stacked weighted blocks. Block height is proportional to the magnitude of that factor.
- Benefits are rendered in shades of `#10B981` (green spectrum). Risks in shades of `#EF4444` (red spectrum).
- The tilt of the beam is calculated as: `rotation = clamp(-15deg, (totalBenefit - totalRisk) / maxDelta * 15, 15deg)`.

**Layer 2 — The Timeline (beneath the scale)**

A horizontal timeline spanning the drug lifecycle:

```
Phase I ──── Phase II ──── Phase III ──── Approval ──── Post-Marketing
  │              │               │             │              │
  ▼              ▼               ▼             ▼              ▼
[scale state] [scale state]  [scale state] [scale state] [scale state]
```

- As the user drags a slider or the animation auto-plays through lifecycle phases, the scale above REBALANCES.
- In early phases (Phase I), risk blocks are larger (limited efficacy data, safety unknowns).
- As the lifecycle progresses, benefit blocks grow (more efficacy evidence), and risk blocks may shift in composition (known risks replace unknown risks).

**Layer 3 — The Confidence Envelope (subtle overlay)**

- A translucent band around each block indicates the confidence interval of that estimate.
- Wider bands = lower confidence. Narrower bands = higher confidence.
- As the lifecycle progresses, bands narrow (more data = more certainty).
- Band color: same as block color but at 15% opacity.

#### How It Evolves Over Time

**Auto-play Mode (default on first view):**
1. Timeline begins at Phase I (0ms).
2. Over 8 seconds, the playhead moves rightward through all five lifecycle stages.
3. At each stage transition (every ~1600ms), the scale rebalances:
   - Blocks resize with a 400ms `ease-in-out` transition.
   - The beam tilts with a 600ms `cubic-bezier(0.34, 1.56, 0.64, 1)` — a slight overshoot that settles, evoking a real balance finding equilibrium.
   - Confidence bands contract with a 500ms ease-out.
4. After completing the full lifecycle, the animation holds at post-marketing state for 3 seconds, then resets and pauses (does NOT loop automatically).

**Interactive Mode (activated by any user interaction):**
- **Timeline scrubbing:** User can click/drag the timeline playhead to any lifecycle stage. Scale updates in real-time with 200ms transitions.
- **Factor hover:** Hovering a benefit or risk block highlights it and shows a tooltip with the factor name, current magnitude (unitless 1–10 scale), and confidence level (High/Medium/Low).
- **Factor toggle:** Clicking a factor block toggles it on/off, allowing the user to see how the balance changes without that factor. Block fades to 20% opacity and the scale rebalances.
- **Scenario comparison:** A "Compare" toggle splits the visualization into two side-by-side scales (drug vs. comparator), each with independent factor weights.

#### Data Representation
- All values are illustrative/demonstrative (not connected to real data on the marketing site).
- Benefit factors (default set): Efficacy, Quality of Life, Survival Improvement, Treatment Response Rate.
- Risk factors (default set): Adverse Events, Serious Adverse Events, Drug Interactions, Organ Toxicity.
- Each factor has a weight (1–10) and confidence (0–1) at each lifecycle stage.
- Data is stored as a JSON configuration object, allowing easy updates.

#### Technical Approach
- **Rendering:** SVG for the scale structure, CSS transitions for rebalancing
- **Interaction:** Vanilla JavaScript event handlers
- **Timeline:** HTML `<input type="range">` styled as the lifecycle timeline, with `input` event driving SVG updates
- **Responsive:** Scale stacks vertically on mobile (benefits above, risks below, no tilt — instead, a horizontal bar chart comparison)
- **Data format:** JSON configuration object embedded in the component
- **Reduced motion:** Transitions reduced to 0ms; all states accessible via timeline scrubbing without animation

---

### 2.4 AI Insight Generation Animation

#### Concept
This visualization answers: "What does it look like when 24 AI models process pharmaceutical data simultaneously?"

The answer is NOT a neural network graphic or a brain metaphor. It is an **orchestration diagram** — showing parallel processes converging to consensus.

#### Visual Structure

```
         RAW DATA INPUT
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│Model 1│ │Model 2│ │ ...24 │   ← 24 model nodes in a 6×4 grid
│ NLP   │ │ Stats │ │ Pred. │
│ ░░░░  │ │ ░░▓░  │ │ ░░░░  │   ← Progress bars per model
└───┬───┘ └───┬───┘ └───┬───┘
    │         │         │
    └─────────┼─────────┘
              │
              ▼
    ┌─────────────────┐
    │  CONSENSUS LAYER │
    │  Confidence: 94% │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ STRUCTURED       │
    │ INSIGHT OUTPUT   │
    └─────────────────┘
```

#### Animation Sequence

**Phase 1 — Data Ingestion (0ms–800ms):**
- The "Raw Data Input" block appears at top, containing a representation of unstructured data: a grid of small monochrome rectangles of varying widths (suggesting text lines, table rows, data fields).
- These rectangles fade in rapidly in a typewriter pattern (left-to-right, top-to-bottom), 30ms apart.

**Phase 2 — Distribution (800ms–1400ms):**
- Lines draw downward from the data block to the 24 model nodes.
- Lines branch from a single trunk into 6 primary branches, then 4 sub-branches each.
- Drawing uses `stroke-dashoffset`, total time 600ms with cascade.
- Data fragments (tiny 2px squares) flow down the lines into the model nodes.

**Phase 3 — Parallel Processing (1400ms–4000ms):**
- Each of the 24 model nodes activates independently.
- Inside each node, a miniature progress bar fills from left to right.
- Fill times are DIFFERENT per model (range: 800ms–2200ms), reflecting that different model types process at different speeds.
- Each node has a label indicating its model type. Label categories:
  - NLP Models (6): Text extraction, sentiment, entity recognition, classification, summarization, translation
  - Statistical Models (6): Bayesian inference, frequentist analysis, survival analysis, dose-response, meta-analysis, regression
  - Predictive Models (6): Signal detection, trend forecasting, risk scoring, patient stratification, outcome prediction, comparative effectiveness
  - Validation Models (6): Consistency checks, cross-validation, bias detection, completeness scoring, confidence calibration, uncertainty quantification
- As each model completes (progress bar full), its border color transitions from `#D1D5DB` (gray) to `#10B981` (green) over 200ms.
- Incomplete models remain gray-bordered with their progress bars still filling.

**Phase 4 — Convergence (3200ms–4800ms, overlapping with Phase 3 as models complete):**
- As models complete, result lines draw downward from each model node to the Consensus Layer.
- Lines arrive at different times (matching model completion times).
- The Consensus Layer has a confidence meter that increments as each model's results arrive.
- Confidence starts at 0% and climbs non-linearly: rapid initial gains (first 10 models → ~70%), slower refinement (last 14 models → 94%).
- The confidence number uses a counting animation (`countUp` pattern) with `font-variant-numeric: tabular-nums` for stable digit width.

**Phase 5 — Output Crystallization (4800ms–5800ms):**
- The Consensus Layer emits a single line downward to the Insight Output block.
- The Insight Output block transitions from a blurred/ghosted state to sharp and fully opaque.
- Inside the output block, structured content appears: a title line, 3 bullet points, and a confidence badge — all fading in sequentially at 100ms intervals.
- The confidence badge shows "94% Confidence" in green.

**Phase 6 — Ambient State (5800ms+):**
- Model nodes maintain a subtle idle pulse (opacity 0.85 to 1.0, 4-second cycle).
- One data fragment per second flows through the system (input → random model → consensus → output), maintaining a sense of continuous operation.

#### Confidence Level Representation
- **0–40%:** Red (#EF4444) — "Insufficient"
- **41–70%:** Amber (#F59E0B) — "Developing"
- **71–90%:** Blue (#3B82F6) — "Substantial"
- **91–100%:** Green (#10B981) — "High Confidence"
- The color transitions smoothly as the percentage climbs during Phase 4.

#### Speed and Rhythm
- The overall animation is **deliberate, not fast**. Total duration ~6 seconds.
- The rhythm is: *gather (fast) → distribute (medium) → process (slow, parallel) → converge (medium) → crystallize (slow, satisfying)*.
- This mirrors the actual analytical process: data collection is mechanical, processing takes time, synthesis requires careful convergence.

#### Technical Approach
- **Rendering:** SVG for structure, CSS animations for progress bars and transitions
- **Model grid:** CSS Grid within SVG `<foreignObject>` or pure SVG `<rect>` + `<text>` elements
- **Progress bars:** SVG `<rect>` with animated `width` attribute via CSS
- **Confidence counter:** JavaScript `requestAnimationFrame` loop with eased interpolation
- **Stagger control:** CSS custom properties `--model-delay` set per node via JS on initialization
- **Payload:** < 20KB SVG, < 3KB JS

---

### 2.5 Safety Signal Detection Visualization

#### Concept
This visualization shows how the ArcaScience platform identifies meaningful safety signals from the noise of massive datasets. It uses a timeline-based approach where the x-axis is time and the y-axis is signal strength.

#### Visual Structure

```
Signal Strength
    │
    │                                    ╱╲    ← Confirmed Signal
    │                              ╱────╱  ╲───
    │                        ╱────╱
    │  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╱┄┄┄┄┄┄┄┄┄┄┄┄┄┄ Detection Threshold
    │           ╱╲     ╱───╱
    │     ╱╲╱──╱  ╲───╱        ← Emerging Signal
    │ ╱──╱  ╲╱╱
    │╱        ╱                   ← Background Noise
    └──────────────────────────────────────── Time
        Q1    Q2    Q3    Q4    Q1    Q2
```

#### Animation Sequence

**Phase 1 — Axis and Baseline (0ms–600ms):**
- The x-axis (time) draws left-to-right, 400ms.
- The y-axis (signal strength) draws bottom-to-top, 400ms (staggered 200ms after x-axis starts).
- Time labels (quarters) fade in along x-axis, 50ms stagger each.
- A horizontal dashed line appears at the detection threshold level, drawing left-to-right over 300ms. Label "Detection Threshold" fades in at its right end.

**Phase 2 — Background Noise (600ms–2000ms):**
- A low-amplitude, high-frequency noise line draws from left to right along the timeline.
- This is a procedurally generated SVG `<path>` with Perlin-like noise (pre-calculated, not runtime-computed).
- The line draws using `stroke-dashoffset` over 1400ms.
- Color: `#9CA3AF` (gray) at 60% opacity.
- Amplitude stays well below the detection threshold.

**Phase 3 — Signal Emergence (2000ms–4000ms):**
- From a specific point on the timeline (e.g., Q2 of the first year), the noise line begins to deviate upward.
- The deviation is rendered as a second SVG path that branches from the noise line, colored in `#F59E0B` (amber) — "emerging signal."
- This amber line draws progressively over 2000ms, showing a gradual upward trend with noise-like fluctuations.
- At the point of divergence, a small pulsing circle appears (8px, `#F59E0B`, pulse cycle 1.5s) with a tooltip-ready label: "Signal Detected — Under Review."

**Phase 4 — Threshold Crossing (4000ms–5200ms):**
- The amber signal line crosses the detection threshold.
- At the exact crossing point, a visual event occurs:
  - The threshold line briefly brightens (opacity flash to 1.0 for 200ms).
  - The signal line color transitions from amber (`#F59E0B`) to red (`#EF4444`) over 300ms.
  - A new pulsing marker appears at the crossing point: a concentric ring animation (two rings expanding outward from the crossing point, fading as they expand, 1-second cycle).
  - Label: "Threshold Exceeded — Escalation Required."

**Phase 5 — Confirmed Signal (5200ms–6500ms):**
- The now-red signal line continues drawing rightward, showing the signal's persistence above threshold.
- Additional data points appear along the line as small circles (4px), each with a subtle entrance animation (scale 0 → 1, 150ms).
- The signal line shows both continued presence above threshold and some variation (demonstrating that it's real data, not a flat line).

**Phase 6 — Ambient State (6500ms+):**
- The visualization is complete and static.
- Hovering any data point reveals a tooltip with simulated details: date, signal strength value, contributing data sources, confidence level.
- The noise baseline continues a very subtle oscillation (CSS animation, 0.5px vertical shift, 8-second cycle) to maintain a sense of "live monitoring."

#### Severity/Urgency Communication Through Motion

| Severity Level | Visual Treatment |
|---|---|
| **Background noise** | Gray, thin (1px), no markers, steady motion |
| **Emerging signal** | Amber, medium (1.5px), single pulse marker, moderate draw speed |
| **Threshold crossed** | Red, thick (2px), concentric ring animation, flash event at crossing |
| **Confirmed critical** | Deep red, thick (2.5px), persistent pulse, elevated section background tint |

Motion speed also communicates urgency:
- Noise draws steadily (constant velocity).
- Emerging signals draw with slight acceleration (ease-in).
- Threshold crossings have a momentary pause (100ms) then accelerated continuation — the "pause before the alarm" pattern that mimics human recognition.

#### Technical Approach
- **Rendering:** Pure SVG, no Canvas (accessibility: SVG elements can carry `aria-label`)
- **Path generation:** Pre-computed SVG `<path>` data stored in component, not dynamically generated
- **Animation:** CSS `stroke-dashoffset` for path drawing, CSS `@keyframes` for pulse/ring effects
- **Tooltips:** HTML elements positioned absolutely relative to SVG data points, shown on hover
- **Scroll trigger:** IntersectionObserver, animation plays once when 50% of the component is visible
- **Responsive:** On mobile, the timeline compresses and scrolls horizontally within a touch-scrollable container

---

### 2.6 Evidence Synthesis Visualization

#### Concept
This visualization shows how multiple data sources converge into a complete evidence picture. The visual metaphor is a **mosaic that assembles** — each data source contributes tiles to a larger picture, and gaps in the mosaic reveal where evidence is missing.

#### Visual Structure

A rectangular evidence matrix (16 columns x 8 rows = 128 cells):

```
                    Evidence Dimensions →
                    Efficacy  Safety  Dosing  Populations  Comparators  ...
    Clinical     │ ■ ■ ■ ■ │ ■ ■ ■ │ ■ □ □ │ ■ ■ □ □    │ ■ □ □ □    │
    Trials       │ ████████ │ ██████ │ ██░░░ │ ████░░░░   │ ██░░░░░░  │
    ─────────────┼──────────┼────────┼───────┼────────────┼───────────│
    Real-World   │ ■ ■ □ □ │ ■ ■ ■ │ ■ ■ □ │ ■ ■ ■ ■    │ ■ ■ □ □    │
D   Evidence     │ ████░░░░ │ ██████ │ ████░ │ ████████   │ ████░░░░  │
a   ─────────────┼──────────┼────────┼───────┼────────────┼───────────│
t   Published    │ ■ ■ ■ □ │ ■ ■ □ │ ■ □ □ │ ■ □ □ □    │ ■ ■ ■ □    │
a   Literature   │ ██████░░ │ ████░░ │ ██░░░ │ ██░░░░░░   │ ██████░░  │
    ─────────────┼──────────┼────────┼───────┼────────────┼───────────│
S   Regulatory   │ ■ ■ □ □ │ ■ ■ ■ │ ■ ■ ■ │ ■ □ □ □    │ □ □ □ □    │
o   Filings      │ ████░░░░ │ ██████ │ ██████│ ██░░░░░░   │ ░░░░░░░░  │
u   ─────────────┼──────────┼────────┼───────┼────────────┼───────────│
r   Spontaneous  │ □ □ □ □ │ ■ ■ ■ │ □ □ □ │ ■ ■ □ □    │ □ □ □ □    │
c   Reports      │ ░░░░░░░░ │ ██████ │ ░░░░░ │ ████░░░░   │ ░░░░░░░░  │
e
s

■ = Evidence present (filled tile)    □ = Evidence gap (empty tile)
```

#### Animation Sequence

**Phase 1 — Grid Scaffold (0ms–500ms):**
- The empty grid structure fades in: row labels on the left, column headers on top.
- Grid lines appear as 1px `#E5E7EB` borders.
- All 128 cells are present but empty (light gray `#F9FAFB` fill).

**Phase 2 — Source-by-Source Fill (500ms–4500ms):**
- Data source rows populate one at a time, top to bottom, with 800ms per row.
- Within each row, tiles fill left-to-right with 40ms stagger per tile.
- Filled tiles transition from `#F9FAFB` to their source color:
  - Clinical Trials: `#3B82F6` (blue)
  - Real-World Evidence: `#10B981` (green)
  - Published Literature: `#8B5CF6` (purple)
  - Regulatory Filings: `#F59E0B` (amber)
  - Spontaneous Reports: `#06B6D4` (cyan)
- Each tile fills with a scale animation: `scale(0.5) → scale(1.0)`, 200ms ease-out.
- Gap tiles (empty evidence) remain at `#F9FAFB` with a subtle dashed border (1px dashed `#D1D5DB`) to distinguish "assessed and missing" from "not yet assessed."

**Phase 3 — Completeness Scoring (4500ms–5500ms):**
- A percentage counter appears below the grid: "Evidence Completeness: 0%"
- The counter animates from 0% to the calculated completeness (e.g., 67%) over 1000ms.
- A horizontal progress bar beneath the counter fills correspondingly.
- Progress bar uses a gradient from red (0%) through amber (50%) to green (100%).
- At 67%, the bar would be solidly in the amber-to-green transition zone.

**Phase 4 — Gap Highlighting (5500ms–6500ms):**
- Empty tiles that represent critical evidence gaps pulse with a soft red glow (border transitions to `#FCA5A5`, 1-second pulse cycle).
- A label appears: "Critical Gaps Identified: 3 areas require additional evidence."
- Lines connect from the pulsing gap tiles to a small annotation callout.

#### How Gaps Are Shown
- Unfilled tiles are not invisible — they are explicitly present as empty containers with dashed borders.
- Critical gaps (defined by the data model as high-importance evidence dimensions with no source coverage) receive the red pulse treatment.
- On hover, any gap tile shows a tooltip: "No [source type] evidence available for [dimension]. Recommended action: [action]."

#### Technical Approach
- **Rendering:** CSS Grid for the matrix layout (not SVG — this is fundamentally a grid of HTML elements)
- **Tiles:** Individual `<div>` elements with CSS transitions
- **Animation:** CSS transitions triggered by adding a `.filled` class via IntersectionObserver + JS stagger
- **Tooltips:** CSS-only tooltips using `::after` pseudo-elements (no JS library)
- **Responsive:** On mobile, the grid becomes horizontally scrollable with sticky row labels
- **Data:** JSON configuration defining which cells are filled vs. gaps

---

### 2.7 Regulatory Output Generation Visualization

#### Concept
A before/after split showing the manual document creation process (slow, error-prone, fragmented) versus the ArcaScience automated process (fast, consistent, comprehensive).

#### Visual Structure

A horizontal split-screen:

```
┌─────────────────────────────┬─────────────────────────────┐
│      MANUAL PROCESS         │      ARCASCIENCE AI         │
│                             │                             │
│  📄 → 👤 → ⏱ → 📄          │  📊 → 🤖 → ✓ → 📄          │
│                             │                             │
│  Timeline: 12-16 weeks      │  Timeline: Hours to days    │
│  Sources: 3-4 consulted     │  Sources: All integrated    │
│  Consistency: Variable      │  Consistency: Validated     │
│                             │                             │
│  [Document Preview:         │  [Document Preview:         │
│   scattered, incomplete,    │   structured, complete,     │
│   inconsistent formatting]  │   consistent formatting]    │
│                             │                             │
└─────────────────────────────┴─────────────────────────────┘
```

#### Animation Sequence

**Left Side — Manual Process (plays simultaneously with right side):**

1. **Document fragments appear** (0ms–2000ms):
   - 8–10 small document snippets (styled as paper fragments with slightly different background tints, suggesting different authors/formats) drop in from various positions.
   - Each fragment enters with `translateY(-20px)` → final position, slight rotation (random +-3deg), staggered 200ms apart.
   - Fragments overlap slightly, creating a messy, collage-like appearance.

2. **Manual review** (2000ms–4000ms):
   - A cursor icon moves between fragments (suggesting human review).
   - Red underline annotations appear on 3 fragments (suggesting errors found).
   - A clock icon appears and its hands rotate from 12 to 4 (representing weeks of elapsed time), 2000ms.

3. **Final manual output** (4000ms–5000ms):
   - Fragments compress/merge into a single document silhouette.
   - The document has visible inconsistencies: uneven section heights, a red warning badge, a "67% Complete" label.

**Right Side — ArcaScience Process (plays simultaneously):**

1. **Data sources connect** (0ms–1000ms):
   - Five data source icons appear in a neat vertical stack on the left edge.
   - Lines draw from each source toward a central AI processing node — clean, parallel, orderly.

2. **AI Processing** (1000ms–2500ms):
   - The AI node (styled as the ArcaScience logo mark or a simplified version) activates with the node illumination pattern from the AI Insight animation.
   - A progress ring around the node fills from 0% to 100% over 1500ms.

3. **Output generation** (2500ms–3500ms):
   - A single, clean document silhouette emerges from the right side of the AI node.
   - The document builds itself section-by-section from top to bottom: header, executive summary, data tables, risk assessment, conclusions — each section appears as a neatly formatted block, staggered 150ms apart.
   - A green checkmark badge appears: "100% Complete."

4. **Comparison metrics** (3500ms–5000ms):
   - Below each side, comparison metrics fade in:
     - Time: "12-16 weeks" (red) vs. "2-3 days" (green)
     - Coverage: "Partial" (amber) vs. "Comprehensive" (green)
     - Consistency: "Variable" (amber) vs. "Validated" (green)
   - Each metric pair appears simultaneously, 200ms stagger between pairs.

#### Document Types Shown
The visualization can cycle through three document types (user-selectable via tabs above the comparison):
- **PSUR** (Periodic Safety Update Report)
- **RMP** (Risk Management Plan)
- **CTD Module** (Common Technical Document)

Each tab selection cross-fades the document previews (300ms) while keeping the overall structure identical.

#### Technical Approach
- **Layout:** CSS Grid, two equal columns with a vertical divider
- **Document fragments:** Styled HTML `<div>` elements with box-shadow and slight rotation
- **AI node:** Inline SVG with CSS animation
- **Document builder:** Stacked `<div>` elements with staggered `opacity` and `translateY` transitions
- **Metrics:** HTML with CSS counter animation for numbers
- **Tab switching:** CSS class toggle with `opacity` transition
- **Reduced motion:** Both sides show final state immediately, no build-up animation

---

### 2.8 Data Scale Visualization

#### Concept
Communicating "100+ billion data points" is a design challenge — the number is too large to be intuitive. This visualization makes the scale tangible through progressive comparison.

#### Visual Structure and Animation

**Approach: Cascading Scale Comparison**

The animation presents a sequence of data scale comparisons, each dwarfing the previous:

```
Step 1:  "A single clinical trial generates ~10,000 data points"
         [■]  (1 small square)

Step 2:  "A drug's full clinical program: ~1 million data points"
         [■■■■■■■■■■■■■■■■■■■■] (100 squares in a 10×10 grid)

Step 3:  "All published clinical trials in a therapeutic area: ~100 million"
         [████████████████████] (the 10×10 grid shrinks to a dot;
         [████████████████████]  1000 dots fill a new grid)
         [████████████████████]

Step 4:  "ArcaScience AS Profiling Base 100b®: 100+ billion data points"
         [The previous grid shrinks to a single pixel]
         [A massive field of density fills the entire frame]
         [Counter: 100,000,000,000+]
```

#### Detailed Animation

**Step 1 (0ms–1500ms):**
- Text label fades in: "A single clinical trial"
- A single 16px square fades in, colored `#3B82F6`.
- Below it: "~10,000 data points"
- Pause 500ms for comprehension.

**Step 2 (1500ms–3500ms):**
- The single square shrinks to 4px and repositions to the top-left of a forming 10x10 grid.
- 99 additional 4px squares fill in, row by row, 15ms per square.
- Text updates: "A complete clinical program" / "~1,000,000 data points"
- The grid is compact — about 60px x 60px total.

**Step 3 (3500ms–5500ms):**
- The 10x10 grid shrinks to a single 4px dot.
- 999 more dots fill a new, larger grid pattern (approximately 32x32 arrangement, filling a 200x200px area).
- Dots appear in a radial pattern from center outward, 5ms per dot.
- Text: "All trials in a therapeutic area" / "~100,000,000 data points"

**Step 4 (5500ms–8000ms):**
- The entire dot grid shrinks to near-invisibility.
- A density visualization fills the frame: a rectangle that fills with a fine-grain pattern (1px dots at 50% density), expanding from center outward.
- The expansion takes 1500ms and fills the entire component area (approximately 800x300px).
- Text: "ArcaScience AS Profiling Base 100b(R)" / "100,000,000,000+ data points"
- The counter animates from 0 to 100,000,000,000+ over 2000ms with accelerating speed (starts slow, ends fast — the opposite of most counters — to emphasize the incomprehensible acceleration of scale).
- `font-variant-numeric: tabular-nums` keeps digits aligned.

**Therapeutic Area Breadth (8000ms–10000ms):**
- The dense field subdivides into colored regions (like a treemap).
- Each region represents a therapeutic area: Oncology, Cardiology, Neurology, Immunology, Rare Diseases, Infectious Disease, etc.
- Regions appear with staggered 100ms entrance, each with its own color from the ArcaScience palette.
- Labels appear inside each region.
- Largest regions (most data) are visually dominant; smallest (emerging areas) are still visible but proportionally smaller.

#### Technical Approach
- **Rendering:** Canvas API for the dense dot patterns (SVG would create too many DOM nodes at scale)
- **Canvas setup:** `<canvas>` element with resolution matched to device pixel ratio
- **Steps 1-3:** SVG overlaid on canvas (few elements, need crisp rendering)
- **Step 4:** Canvas-rendered density pattern (efficient for thousands of dots)
- **Text:** HTML overlaid on the canvas/SVG (for accessibility and crisp font rendering)
- **Counter:** JavaScript with `requestAnimationFrame` and custom easing
- **Treemap:** Pre-calculated positions (not a runtime treemap algorithm), rendered as SVG `<rect>` elements
- **Fallback:** Static infographic image for `prefers-reduced-motion` and Canvas-unsupported environments
- **Performance:** Canvas operations batched; dot pattern pre-rendered to offscreen canvas, then drawn as single `drawImage` call

---

## 3. Scroll-Based Animation Strategy

### 3.1 Trigger Architecture

All scroll-based animations use the **IntersectionObserver API** with the following standard configuration:

```javascript
const defaultObserverOptions = {
  root: null,           // viewport
  rootMargin: '0px 0px -20% 0px',  // trigger when element is 80% into viewport
  threshold: [0, 0.25, 0.5, 0.75, 1.0]  // granular visibility tracking
};
```

**Trigger Rules:**
- **Content blocks** (text, cards, simple elements): Trigger at 25% visibility. Animation: fade-in + subtle translateY(20px→0). Duration: 400ms.
- **Data visualizations** (charts, diagrams, interactive elements): Trigger at 50% visibility. Animation: full sequence plays once. Duration: varies per component.
- **Hero elements:** Trigger immediately on page load (no scroll dependency).
- **Background decorative elements** (subtle grid patterns, section dividers): Trigger at 0% (as soon as any part enters viewport). Animation: immediate, no delay.

### 3.2 Scroll Speed and Animation Timing

**Principle: Scroll triggers, time animates.**

Animations are NOT scrubbed by scroll position (no `scroll-timeline` or scroll-linked animation). Scroll position ONLY determines WHEN an animation begins. Once triggered, the animation plays on its own timeline at its own speed.

Rationale: Scroll-scrubbed animations create a jerky, unpredictable experience on variable-speed input devices (trackpads, touch, scroll wheels all behave differently). For a platform that must feel precise and trustworthy, time-based animations triggered by scroll are more reliable.

**Exception:** The Benefit-Risk Balance timeline scrubber IS directly user-controlled, but this is an explicit interaction, not a scroll-linked animation.

### 3.3 Progressive Reveal Strategy

Each page follows a **three-act reveal structure**:

**Act 1 — Immediate (above the fold):**
- Hero content is visible on load with no scroll required.
- Hero animation begins automatically after a 200ms delay (allowing the page to settle).
- Navigation is fully visible and functional immediately.

**Act 2 — The Scroll Journey (first 3–4 viewport heights):**
- Primary content sections reveal as the user scrolls.
- Each section has a single primary animation that plays on first entry.
- Sections that have been scrolled past retain their final animation state (no reverse animation on scroll-up).
- If the user scrolls back up to a previously animated section, it remains in its completed state — no replay.

**Act 3 — Deep Content (beyond 4 viewport heights):**
- Animations become simpler and faster (200ms fade-ins only).
- No complex multi-phase animations this deep — user is in "reading mode" and motion should not interrupt.
- Interactive elements (expandable cards, tabs) still have their interaction animations but no scroll-triggered entrance animations.

### 3.4 Parallax Policy

**Default: No parallax.**

Parallax creates a sense of playfulness and depth that is inappropriate for a scientific platform. It also causes motion sickness for some users and performs poorly on many devices.

**Permitted exception:** A subtle (maximum 10% differential) parallax may be used on the homepage hero ONLY, where a background data pattern moves at 90% of scroll speed while foreground content moves at 100%. This creates a minimal depth effect without the "floating" feeling of aggressive parallax.

**All other pages: Zero parallax.** Content scrolls at uniform speed.

### 3.5 Product Pages vs. Content Pages

| Aspect | Product Pages | Content Pages (Blog, Case Studies) |
|---|---|---|
| Animation density | Higher — visualizations, interactive demos | Lower — text-focused, minimal animation |
| Trigger point | 50% visibility for key visuals | 25% visibility for content blocks |
| Entrance animations | Full sequences (fade + translate + custom) | Simple fade-in only |
| Interactive elements | Expand/collapse, hover states, scrubbers | Hover states only |
| Scroll depth | Animations throughout | Animations only in first 2 viewport heights |
| Performance budget | 60fps with complex SVG | 60fps with simple CSS only |

---

## 4. Micro-Interactions

### 4.1 Button Hover States

**Primary Buttons (CTA: "Request Demo", "Contact Us"):**
```css
.btn-primary {
  background: #4A6FA5;
  color: #FFFFFF;
  padding: 12px 28px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  transform: translateX(-100%);
  transition: transform 400ms ease;
}

.btn-primary:hover {
  background: #3D5F8F;
  box-shadow: 0 4px 12px rgba(74, 111, 165, 0.3);
  transform: translateY(-1px);
}

.btn-primary:hover::after {
  transform: translateX(100%);
}

.btn-primary:active {
  transform: translateY(0px);
  box-shadow: 0 2px 4px rgba(74, 111, 165, 0.2);
  transition-duration: 80ms;
}

.btn-primary:focus-visible {
  outline: 2px solid #4A6FA5;
  outline-offset: 2px;
}
```

The hover has a subtle 1px upward lift, a deepened background, a soft shadow expansion, and a single left-to-right light sweep (the `::after` element). The light sweep is restrained — 8% white opacity maximum. The active state snaps back down instantly (80ms) for tactile feedback.

**Secondary Buttons (ghost style):**
```css
.btn-secondary {
  background: transparent;
  color: #4A6FA5;
  border: 1px solid #4A6FA5;
  padding: 12px 28px;
  border-radius: 6px;
  transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-secondary:hover {
  background: rgba(74, 111, 165, 0.06);
  border-color: #3D5F8F;
  color: #3D5F8F;
}

.btn-secondary:active {
  background: rgba(74, 111, 165, 0.12);
  transition-duration: 80ms;
}
```

No lift, no shadow — just a subtle background fill and color deepening. Ghost buttons should not compete with primary CTAs for visual attention.

### 4.2 Navigation Transitions

**Desktop Navigation:**
- Menu items have a 1px underline that draws from center outward on hover (200ms ease-out). This uses `background-size` animation:
```css
.nav-link {
  background-image: linear-gradient(#4A6FA5, #4A6FA5);
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: center bottom;
  transition: background-size 200ms ease-out;
  padding-bottom: 4px;
}

.nav-link:hover {
  background-size: 100% 1px;
}

.nav-link.active {
  background-size: 100% 2px;
}
```

- Active page link has a 2px underline (persistent, no animation).
- Dropdown menus appear with `opacity: 0 → 1` and `translateY(-8px) → 0` over 150ms. They disappear with `opacity: 1 → 0` over 100ms (faster out than in — standard UX pattern).

**Mobile Navigation:**
- Hamburger icon transforms to X with a 250ms animation: top and bottom bars rotate to form X, middle bar fades to opacity 0.
- Navigation panel slides in from right with `translateX(100%) → 0`, 300ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Menu items stagger in by 50ms each after the panel has opened.
- Background overlay fades in at 200ms.

### 4.3 Card Interactions

**Platform Feature Cards / Content Cards:**
```css
.card {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 24px;
  background: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card:hover {
  border-color: #D1D5DB;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
```

- Hover lift is minimal — 2px only. This is not a consumer product; cards should not leap off the page.
- The shadow transition creates depth without exaggeration.
- Card icons (if present) increase saturation by ~10% on card hover (achieved via CSS `filter: saturate(1.1)` on the icon element, 250ms transition).

**Expandable Cards (used in pipeline, FAQ sections):**
- Expand animation: content area grows from `max-height: 0` to calculated height over 350ms ease-out.
- A chevron icon rotates from 0deg to 180deg (pointing down → up) over 250ms.
- Expanded content fades from `opacity: 0` to `1` over 200ms, delayed 150ms after height animation starts (so content appears as space opens).

### 4.4 Data Point Hover Reveals

Used on all interactive visualizations (benefit-risk scale, safety signals, evidence matrix, etc.):

```css
.data-point {
  cursor: pointer;
  transition: transform 150ms ease-out;
}

.data-point:hover {
  transform: scale(1.3);
}

.data-tooltip {
  position: absolute;
  background: #1F2937;
  color: #FFFFFF;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.4;
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 120ms ease-out, transform 120ms ease-out;
  max-width: 240px;
  z-index: 100;
}

.data-point:hover + .data-tooltip,
.data-tooltip.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Tooltip content structure:**
```
┌──────────────────────────┐
│ Factor: Efficacy Score   │
│ Value: 7.4 / 10          │
│ Confidence: High (92%)   │
│ Source: Phase III RCT     │
│ Updated: 2025-Q4         │
└──────────────────────────┘
```

- Tooltips appear after a 100ms delay (preventing accidental triggers on mouse pass-through).
- Tooltips position themselves intelligently: above the point by default, below if near viewport top, left/right adjusted to stay within bounds.
- On touch devices, tooltips show on tap and dismiss on tap-elsewhere.

### 4.5 Form Field Interactions

**Text Inputs:**
```css
.form-input {
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 15px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.form-input:focus {
  border-color: #4A6FA5;
  box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.15);
  outline: none;
}

.form-input:invalid:not(:focus):not(:placeholder-shown) {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input.valid {
  border-color: #10B981;
}
```

- Focus ring uses a 3px box-shadow (not outline) for rounded corners compatibility.
- Validation states transition colors smoothly — no jarring red flash.
- Label floats above input on focus using `transform: translateY(-24px) scale(0.85)`, 200ms ease-out.

**Submit Button Loading State:**
- On submit, the button text fades to 0 opacity over 150ms.
- A 16px CSS spinner appears in the button center (border-based spinner, not an SVG).
- Button background desaturates slightly and `pointer-events: none` is applied.
- Button width is locked to prevent layout shift.
- On success: spinner fades out, a checkmark draws itself (SVG path animation, 300ms), then button text returns.
- On error: spinner fades out, button returns to normal state, error message appears below form with `translateY(-8px) → 0` fade-in.

### 4.6 Loading States

**Page-Level Loading (rare — site should be SSR/SSG):**
- The ArcaScience logo mark renders as a simple SVG.
- A horizontal progress bar beneath the logo fills left-to-right.
- Bar color: `#4A6FA5`.
- No spinning, no pulsing, no bouncing dots. A progress bar is honest and measurable.

**Component-Level Loading (for dynamic data in interactive demos):**
- A skeleton screen pattern: rectangular placeholder shapes with a subtle left-to-right shimmer animation.
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F3F4F6 0%,
    #E5E7EB 40%,
    #F3F4F6 80%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

- Skeleton shapes match the dimensions of the content they replace (not generic rectangles).
- Transition from skeleton to real content: skeleton fades out (200ms) while real content fades in (200ms), with a 100ms overlap.

### 4.7 Page Transitions

**Approach: Minimal but present.**

Given that ArcaScience is likely a multi-page application (not a SPA), page transitions are limited to what the browser can support natively plus CSS enhancements:

- **Using View Transitions API** (where supported):
```css
::view-transition-old(root) {
  animation: fade-out 150ms ease-out;
}

::view-transition-new(root) {
  animation: fade-in 200ms ease-in;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

- **Fallback (no View Transitions API):** Content on new page fades in from `opacity: 0` on `DOMContentLoaded`, 200ms. No exit animation.

- **Navigation persistence:** The top navigation bar does NOT participate in page transitions — it remains stable and fixed to provide spatial continuity.

### 4.8 Tooltip Animations

**Standard Tooltips (informational):**
- Appear after 200ms hover delay.
- Enter: `opacity 0→1, translateY(4px→0)`, 120ms ease-out.
- Exit: `opacity 1→0`, 80ms ease-out (no translate on exit — faster, less distracting).
- Arrow pointer (CSS triangle) is static, no animation.
- Maximum width: 280px. Text wraps. Never truncates with ellipsis.

**Rich Tooltips (on data visualizations, with structured data):**
- Appear after 100ms hover delay (faster because the user is exploring data intentionally).
- Enter: same as standard.
- Content may include: bold labels, tabular numbers, colored status indicators.
- Positioned with 8px offset from the trigger point.
- On touch devices: triggered by tap, dismissed by tapping outside or a close button within the tooltip.

---

## 5. Motion Storytelling Logic

### 5.1 Narrative Arc Per Page

Every page on the ArcaScience site follows a cinematic pacing model adapted for scroll:

```
Viewport 1 (Above Fold):     HOOK — Bold statement + primary animation
                              Speed: Immediate, confident

Viewport 2:                   CONTEXT — What problem does this solve?
                              Speed: Measured, explanatory

Viewport 3:                   EVIDENCE — How does it work? Show the pipeline/data.
                              Speed: Deliberate, allowing comprehension

Viewport 4:                   PROOF — Results, metrics, case studies
                              Speed: Quick reveals, data-dense

Viewport 5+:                  RESOLUTION — CTA, next steps, trust signals
                              Speed: Calm, stable, no animation
```

### 5.2 Pacing Rules

**When to Speed Up:**
- Metric counters and numerical reveals (fast counting builds excitement around scale).
- Transition between major sections (quick fade to maintain momentum).
- Sequential list items that follow a pattern the user already understands (stagger can tighten after the first 2-3 items establish the rhythm).

**When to Slow Down:**
- Any animation that explains a NEW concept (the benefit-risk balance, the AI ensemble processing).
- The first time a visualization type appears on a page (subsequent instances of the same type can animate faster).
- Data flow animations — data should move at a pace where the user can track individual elements.

**When to Stop:**
- After a complex visualization has completed, allow 2+ seconds of static display before the next animated section enters.
- In text-heavy sections, no animation competes with reading.
- In the footer and final CTA area — no motion, pure stability.

### 5.3 Eye Guidance Through Motion

Motion is used to direct the user's gaze in a specific sequence:

1. **Entry animation draws the eye to the TOP of a section** (the headline/key statement).
2. **A delayed secondary animation draws the eye DOWN to the visualization** (200-400ms after the headline).
3. **Within the visualization, animation flows LEFT-TO-RIGHT** (matching Western reading direction and the pipeline's conceptual flow from input to output).
4. **Completion signals (checkmarks, final states) anchor the eye at a REST POINT** before the user scrolls to the next section.

**Specific Techniques:**
- Stagger delays of child elements guide the eye in the intended reading order.
- Brighter/more saturated colors animate in LAST — the eye is drawn to the final, most colorful element, which should be the key takeaway.
- Motion that stops (an animation completing) draws the eye as strongly as motion that starts. Use completion as a guiding event.

### 5.4 Cumulative Understanding

Animations across the page build on each other:

1. **Homepage Hero:** Introduces the concept of "data in → AI → insights out." User now has a mental model.
2. **Pipeline Section:** Expands the middle part (the AI) into 6 detailed steps. User refines their mental model.
3. **Benefit-Risk Section:** Zooms into ONE type of insight (benefit-risk analysis). User now understands depth.
4. **AI Models Section:** Shows HOW the AI produces that insight (24 models). User understands mechanism.
5. **Safety Signal Section:** Shows a SPECIFIC application (signal detection). User understands practical value.
6. **Evidence Section:** Shows the BREADTH of data inputs. User understands comprehensiveness.
7. **Output Section:** Shows the RESULT (automated documents). User understands the deliverable.
8. **Scale Section:** Shows the MAGNITUDE (100B data points). User is impressed by scale.

Each animation ASSUMES the user has seen the previous ones. Later animations can be more abstract because the visual vocabulary has been established. For example, the "data flow" visual language (small circles moving along paths) introduced in the hero is reused without re-explanation in later sections.

### 5.5 Repeat Visit Freshness

On repeat visits, the SAME animations play — but they feel different because:

1. **No animation replays on scroll-back** within a session. Once seen, a section stays in its completed state.
2. **On new page loads**, animations replay from scratch. This is intentional — each visit is a complete narrative.
3. **Interactive elements provide depth** that was not discovered on the first visit. A returning user might hover data points, expand pipeline stages, or scrub the benefit-risk timeline — discovering new layers of information within static-seeming completed animations.
4. **No randomization.** Every visit produces identical animations. This builds familiarity and trust — the interface is predictable, which for pharma professionals is a feature, not a bug.

---

## 6. Technical Implementation Guidelines

### 6.1 Recommended Libraries and Frameworks

| Purpose | Recommended | Rationale |
|---|---|---|
| Scroll observation | Native `IntersectionObserver` | Zero dependency, excellent browser support, sufficient for trigger-based (non-scrubbed) animations |
| CSS animations | Native CSS `@keyframes` + `transition` | Zero dependency, GPU-accelerated, best performance |
| SVG path animations | Native SVG + CSS `stroke-dashoffset` | No library needed for path drawing effects |
| Complex stagger sequencing | Vanilla JS with `requestAnimationFrame` | For the initial hero and AI model animations where CSS stagger is insufficient |
| Number counting animations | Custom utility (see implementation files) | ~500 bytes, no need for CountUp.js |
| Canvas rendering (data scale viz) | Native Canvas API | No library needed for dot patterns |
| View Transitions | Native View Transitions API | Progressive enhancement, no polyfill |

**Libraries we explicitly DO NOT recommend:**

| Library | Why Not |
|---|---|
| GSAP / GreenSock | Powerful but unnecessary — our animations are not complex enough to justify 27KB+ |
| Three.js / WebGL | Inappropriate — we are not building 3D visualizations. Adds massive bundle weight. |
| Lottie / Bodymovin | Appropriate for designer-driven animations but adds 50KB+ of runtime. Our SVG animations are simple enough to code directly. |
| Framer Motion | React-specific, 30KB+, overkill for our animation needs |
| Anime.js | Good library but unnecessary when native CSS + minimal JS suffices |
| AOS (Animate On Scroll) | Too generic, not customizable enough, and we need IntersectionObserver anyway |
| Particles.js | Explicitly banned — particle effects are decorative, not explanatory |

**The only acceptable external library:**

If the team needs a lightweight IntersectionObserver-based scroll animation utility, consider writing a custom one (~1KB) or using a minimal library like `motion` (previously `Framer Motion Lite`) ONLY if the framework demands it. The total animation-related JS bundle should not exceed 5KB gzipped.

### 6.2 Performance Budgets

| Metric | Target | Hard Limit |
|---|---|---|
| Animation frame rate | 60fps | Never below 30fps |
| Animation JS bundle (gzipped) | < 3KB | 5KB absolute maximum |
| Total SVG payload per page | < 30KB | 50KB absolute maximum |
| Largest Contentful Paint impact | < 100ms added | 200ms added maximum |
| Total Blocking Time from animations | 0ms | 50ms maximum |
| Canvas memory (data scale viz) | < 4MB | 8MB maximum |
| Concurrent CSS animations | < 20 | 30 maximum |
| DOM mutations per animation frame | 0 | 2 maximum (batch with rAF) |

**Performance Testing Protocol:**
- Test all animations on a mid-range Android device (e.g., Pixel 6a or equivalent).
- Test with Chrome DevTools Performance panel, 4x CPU throttling.
- Any animation that drops below 30fps under throttling must be simplified.
- Test with `will-change` properties and verify they are removed after animation completes (to free GPU memory).

### 6.3 Fallback Strategies for Low-Power Devices

**Detection:**
```javascript
const isLowPower = () => {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

  // Check for low-end device signals
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
  if (navigator.deviceMemory && navigator.deviceMemory <= 2) return true;

  // Check for data saver mode
  if (navigator.connection && navigator.connection.saveData) return true;

  return false;
};
```

**Degradation Tiers:**

| Tier | Condition | Behavior |
|---|---|---|
| **Full** | Default (high-power device, no reduced motion) | All animations as specified |
| **Reduced** | `prefers-reduced-motion: reduce` OR low hardware | No scroll-triggered animations. Interactive animations only (hover, click). All transitions reduced to 100ms. No Canvas animations — static images instead. |
| **Minimal** | Data saver mode OR JS disabled | Static SVG images with all elements visible. No animation. No Canvas. CSS transitions only for essential interactions (focus states). |

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 100ms !important;
    scroll-behavior: auto !important;
  }

  .animation-container {
    /* Show final state immediately */
    opacity: 1 !important;
    transform: none !important;
  }

  .hero-animation .data-flow-particle {
    display: none;
  }

  .hero-animation .model-node {
    opacity: 1;
    fill: var(--node-active-color);
  }
}
```

### 6.4 Accessibility Requirements

**WCAG 2.2 AA Compliance:**

1. **No content is ONLY available through animation.** Every piece of information communicated by motion must also be available in a static state (visible labels, alt text, ARIA descriptions).

2. **`prefers-reduced-motion` is respected everywhere.** See Tier system above.

3. **No auto-playing animations that cannot be paused.**
   - All auto-playing visualizations (hero, AI models, data scale) must have a visible pause/play toggle.
   - Toggle is a `<button>` with `aria-label="Pause animation"` / `aria-label="Play animation"`.
   - Toggle state is communicated via `aria-pressed`.

4. **No flashing or strobing.** No animation element may flash more than 3 times per second.

5. **Animation does not trap focus.** Keyboard navigation skips decorative animation elements. Interactive animation elements are in the tab order with clear focus indicators.

6. **SVG accessibility:**
   - All informational SVGs have `role="img"` and an `aria-label` describing the complete visualization.
   - Interactive SVG elements have `role="button"` or `role="slider"` as appropriate.
   - Complex SVGs have a `<desc>` element with a full text description.

7. **Color is not the sole differentiator.** In visualizations where color indicates category (evidence types, risk levels), shapes, patterns, or labels provide redundant coding.

8. **Screen reader announcements.** When an animation reaches a key state (e.g., confidence reaches 94% in the AI visualization), use `aria-live="polite"` to announce the result to screen readers.

### 6.5 Graceful Degradation Summary

```
Full Experience:      CSS + SVG + Canvas + JS animations
                      ↓ (prefers-reduced-motion)
Reduced Experience:   CSS transitions only + static SVG + no Canvas
                      ↓ (JS disabled)
Minimal Experience:   Static HTML + CSS + <img> fallbacks
                      ↓ (CSS disabled / text browser)
Text Experience:      All content available as text with ARIA labels
```

---

## 7. DO / DON'T Rules

### DO Rules

**DO-1: Animate to explain, never to decorate.**
Every animation must answer a question: "What does this motion help the user understand?" If the answer is "nothing — it just looks nice," remove it. Example: Data points flowing through the pipeline EXPLAIN how the platform processes information. A pulsing gradient background DECORATES without explaining.

**DO-2: Use consistent easing across all animations.**
Standard easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for entrances. `ease-out` for micro-interactions. `ease-in-out` for state transitions. Never use `linear` (feels mechanical), `ease-in` alone (feels like falling), or `bounce`/spring easings (feels playful/consumer).

**DO-3: Maintain the scientific visual vocabulary throughout.**
Data flows left-to-right. Processes are represented as node-and-edge diagrams. Quantities are represented as proportional areas. Time is always a horizontal axis. Confidence is always represented by width of a band or a percentage. Once established, never deviate.

**DO-4: Keep animation durations between 150ms and 800ms for interactions, and under 8 seconds for narrative sequences.**
150ms is the threshold for feeling "instant." 800ms is the threshold for feeling "purposeful." Above 800ms, an interaction animation feels sluggish. Narrative sequences (auto-play visualizations) may be longer but should never exceed 8 seconds before reaching a meaningful pause point.

**DO-5: Always provide a static final state that is fully comprehensible without having seen the animation.**
If a user scrolls past quickly, if they have reduced motion enabled, or if they arrive at a section via anchor link, the final rendered state must convey 100% of the information. Animation is an enhancement layer, never the sole carrier of meaning.

**DO-6: Use `transform` and `opacity` for ALL animations.**
These are the only two CSS properties that are guaranteed to be GPU-composited and trigger neither layout nor paint. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, `border`, `font-size`, `color` (use `opacity` layering instead), or `background-color` (use pseudo-element `opacity` instead).

**DO-7: Stagger child element animations to guide reading order.**
When multiple elements appear in a section, stagger their entrance by 50–150ms in the order the user should read them: headline first, then subheadline, then primary visual, then supporting text, then CTA. This creates a natural visual hierarchy through time.

**DO-8: Remove `will-change` after animation completes.**
Applying `will-change: transform` before an animation promotes the element to its own compositor layer, improving performance. But leaving it on permanently wastes GPU memory. Add it via JS before animation start, remove it in the `animationend` / `transitionend` handler.

**DO-9: Test every animation on a 60Hz AND a 120Hz display.**
Animations that look smooth on 120Hz can look choppy on 60Hz. Ensure all animations are designed for the lowest common display refresh rate. Use duration-based (not frame-count-based) animations to ensure consistency.

**DO-10: Use real data shapes in visualizations, not abstract representations.**
When showing "data flowing through a pipeline," use visual elements that evoke real pharmaceutical data: table rows, molecule indicators, document icons, structured text blocks. Never use generic circles, triangles, or abstract shapes that could represent anything.

**DO-11: Respect the user's scroll momentum.**
Never hijack scroll. Never lock scroll during an animation. Never change scroll speed. Never use scroll-snap on full-page sections. The user owns their scroll, always.

**DO-12: Make interactive elements discoverable through subtle motion.**
If a data point is hoverable, give it a micro-pulse on first appearance (a single 400ms scale(1.0→1.05→1.0) pulse) to signal interactivity. This is the ONLY acceptable use of decorative motion — when it teaches the user that interaction is available.

### DON'T Rules

**DON'T-1: Never use particle effects, floating elements, or ambient decorative motion.**
No particle.js backgrounds, no floating molecule SVGs, no ambient dots drifting across sections. These signal "creative agency website" not "enterprise pharmaceutical platform." Every moving element must be tied to a data concept.

**DON'T-2: Never use bounce, elastic, or spring easing curves.**
These evoke playfulness and consumer software. ArcaScience is an analytical platform for safety scientists. The only acceptable overshoot is in the benefit-risk balance beam (where it physically simulates a balance settling), and even that is a damped, controlled oscillation.

**DON'T-3: Never animate text content (characters, words, lines).**
No typewriter effects on headlines. No words fading in one at a time. No characters animating individually. Text must appear as a complete, readable block. The ONLY exception: number counters (e.g., counting up to "100 billion") where the animation communicates scale.

**DON'T-4: Never use loading animations as a delay tactic.**
If content is available, show it immediately. Never insert an artificial delay to make an animation play before revealing content. Skeleton screens are acceptable ONLY when actual data is being fetched asynchronously.

**DON'T-5: Never use color transitions as the primary animation.**
Color shifting (hue rotation, gradient animation, color breathing) is decorative. Use color CHANGES (discrete state transitions: gray → green to indicate completion) but never continuous color animation as the main visual event.

**DON'T-6: Never use 3D transforms (perspective, rotateX, rotateY) on content elements.**
3D flips, card rotations, and perspective transforms evoke consumer product marketing. ArcaScience content exists on a flat, trustworthy plane. The only 2.5D effect permitted is the subtle hero parallax (and even that is discouraged).

**DON'T-7: Never auto-play animations in a loop without user consent.**
The hero's ambient state (data points flowing) is acceptable because it is low-intensity and does not restart a narrative. But a complex visualization should NEVER loop back and replay its full sequence automatically. Play once, hold the final state.

**DON'T-8: Never use animation to hide slow performance.**
If a section takes time to render, use a skeleton screen — do not add an entrance animation to mask the delay. Users (especially technical pharma users) will notice the mismatch between the animation's apparent purpose and its actual purpose.

**DON'T-9: Never animate elements that are outside the viewport.**
Use IntersectionObserver to ensure animations only run for visible elements. Offscreen animations waste CPU/GPU cycles and drain battery on mobile devices.

**DON'T-10: Never exceed 20 simultaneous CSS animations on a single page.**
Even GPU-composited animations have overhead. If a page view has more than 20 elements animating simultaneously (e.g., a large grid where every cell animates at once), implement viewport-based batching: only animate elements in and near the viewport.

**DON'T-11: Never use motion as a substitute for clear information hierarchy.**
If a user cannot determine the most important element on a page within 1 second of static viewing, the layout has failed — and no amount of animation will fix it. Motion should AMPLIFY a clear visual hierarchy, not create one from scratch.

**DON'T-12: Never use CSS `animation-play-state` as the sole mechanism for pause/play.**
While it pauses CSS animations, it does not pause JavaScript-driven animations (rAF loops, counters). The pause/play toggle must control ALL animation sources through a unified state manager.

---

## 8. Motion Token Reference

### Duration Tokens

```css
:root {
  /* Interaction durations */
  --duration-instant: 80ms;     /* Active/pressed states */
  --duration-fast: 150ms;       /* Micro-interactions (hover, focus) */
  --duration-normal: 250ms;     /* Standard transitions (cards, buttons) */
  --duration-measured: 400ms;   /* Entrance animations, reveals */
  --duration-deliberate: 600ms; /* Complex state changes */
  --duration-narrative: 800ms;  /* Visualization phases */

  /* Easing curves */
  --ease-default: cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* Controlled ease-out */
  --ease-entrance: cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* Same as default */
  --ease-exit: cubic-bezier(0.55, 0.06, 0.68, 0.19);      /* Ease-in for exits */
  --ease-state: ease-in-out;                                 /* State transitions */
  --ease-balance: cubic-bezier(0.34, 1.56, 0.64, 1);       /* Slight overshoot for balance beam only */

  /* Stagger delays */
  --stagger-tight: 50ms;       /* List items, repeated small elements */
  --stagger-normal: 100ms;     /* Cards, section children */
  --stagger-relaxed: 150ms;    /* Major section elements */
  --stagger-narrative: 200ms;  /* Pipeline stations, sequential reveals */

  /* Scroll trigger offsets */
  --scroll-trigger-content: 25%;    /* Text/card visibility to trigger */
  --scroll-trigger-visual: 50%;     /* Visualization visibility to trigger */
}
```

### Transition Shorthands

```css
/* Standard transitions — apply these as mixins or utility classes */

.transition-micro {
  transition-property: transform, opacity, box-shadow;
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-default);
}

.transition-standard {
  transition-property: transform, opacity, box-shadow, border-color;
  transition-duration: var(--duration-normal);
  transition-timing-function: var(--ease-default);
}

.transition-reveal {
  transition-property: transform, opacity;
  transition-duration: var(--duration-measured);
  transition-timing-function: var(--ease-entrance);
}
```

### Animation State Classes

```css
/* Applied by IntersectionObserver */
.anim-hidden {
  opacity: 0;
  transform: translateY(20px);
}

.anim-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-measured) var(--ease-entrance),
              transform var(--duration-measured) var(--ease-entrance);
}

/* Stagger children */
.anim-stagger > *:nth-child(1) { transition-delay: 0ms; }
.anim-stagger > *:nth-child(2) { transition-delay: var(--stagger-normal); }
.anim-stagger > *:nth-child(3) { transition-delay: calc(var(--stagger-normal) * 2); }
.anim-stagger > *:nth-child(4) { transition-delay: calc(var(--stagger-normal) * 3); }
.anim-stagger > *:nth-child(5) { transition-delay: calc(var(--stagger-normal) * 4); }
.anim-stagger > *:nth-child(6) { transition-delay: calc(var(--stagger-normal) * 5); }
```

---

## 9. Accessibility Specification

### Pause Control Component

Every page with auto-playing animations must include a global animation pause control:

```html
<button
  class="animation-toggle"
  aria-label="Pause all animations"
  aria-pressed="false"
  data-animation-state="playing"
>
  <svg class="icon-pause" aria-hidden="true"><!-- pause icon --></svg>
  <svg class="icon-play" aria-hidden="true" style="display:none"><!-- play icon --></svg>
</button>
```

**Placement:** Fixed position, bottom-right corner, 16px from edges. Z-index above all content. Subtle appearance: 32px circular button, `#F3F4F6` background, `#6B7280` icon, 80% opacity until hovered.

**Behavior:**
- Clicking toggles ALL animations on the page (CSS and JS).
- State persists in `sessionStorage` across page navigations within the session.
- If `prefers-reduced-motion: reduce` is detected, the control starts in "paused" state.

### Screen Reader Descriptions

Every major visualization includes a complete text alternative:

```html
<figure role="img" aria-label="Platform pipeline visualization showing six sequential processing stages">
  <svg><!-- visualization --></svg>
  <figcaption class="sr-only">
    The ArcaScience platform processes pharmaceutical data through six stages:
    1. Clinical Framing: defining the analysis scope and objectives.
    2. Data Intelligence Engine: 24 AI models identify relevant data sources.
    3. AI Processing: analysis of 100+ billion data points.
    4. Strategic Analysis: pattern recognition and insight extraction.
    5. Decision Intelligence: benefit-risk assessment and recommendations.
    6. Automated Outputs: generation of PSUR, RMP, and CTD documents.
  </figcaption>
</figure>
```

### Keyboard Interaction Map

| Visualization | Key | Action |
|---|---|---|
| Benefit-Risk Balance | Left/Right Arrow | Scrub timeline backward/forward |
| Benefit-Risk Balance | Space | Toggle auto-play |
| Benefit-Risk Balance | Tab | Move between interactive factors |
| Benefit-Risk Balance | Enter | Toggle factor on/off |
| Pipeline | Tab | Move between stations |
| Pipeline | Enter/Space | Expand/collapse station detail |
| Evidence Matrix | Tab | Move between cells |
| Evidence Matrix | Enter | Show cell detail tooltip |
| All | Escape | Close any expanded/detail view |

---

*End of Motion & Animation Architecture Document*
*Agent 5 — ArcaScience Design System*
