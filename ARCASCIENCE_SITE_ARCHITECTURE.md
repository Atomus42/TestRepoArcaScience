# ArcaScience Website Information Architecture
## Complete Site Map, Navigation Logic & Page Strategy

**Prepared by:** Agent 2 -- Website Information Architect
**Date:** 2026-02-09
**Scope:** Full-site redesign for enterprise healthtech platform targeting pharma decision-makers

---

## Table of Contents

- [A. Complete Hierarchical Site Map](#a-complete-hierarchical-site-map)
- [B. Page Purposes & User Intent Matrix](#b-page-purposes--user-intent-matrix)
- [C. Navigation Logic](#c-navigation-logic)
- [D. Content Hierarchy Principles](#d-content-hierarchy-principles)
- [E. Missing Pages Analysis](#e-missing-pages-analysis)

---

## A. Complete Hierarchical Site Map

### Design Rationale

The architecture follows three governing principles derived from how expert pharma users actually navigate:

1. **Workflow-aligned, not org-chart-aligned.** Pages map to what users are trying to accomplish (evaluate a platform for PSUR automation, understand AI validation methodology, assess regulatory compliance posture), not to internal company departments.
2. **Three-click depth maximum.** Any piece of information is reachable in three clicks or fewer from the homepage. Expert users abandon sites that bury critical technical detail.
3. **Persona-aware entry architecture.** The site provides clear, fast pathways for each of the six target audiences without requiring them to self-identify through a persona selector (which pharma executives find patronizing).

---

### Primary Navigation (Header -- Max 6 Items)

```
1. Platform
2. Solutions
3. Evidence
4. Company
5. Resources
6. [CTA Button] Request Demo
```

### Utility Navigation (Top-Right Strip)

```
- Client Login
- Contact
- EN / FR (language toggle)
```

---

### Full Page Hierarchy

```
HOME (/)

1. PLATFORM (/platform)
   |
   |-- Platform Overview (/platform/overview)
   |     The AI Benefit-Risk Decision Engine -- end-to-end pipeline explanation
   |
   |-- How It Works (/platform/how-it-works)
   |     Six-stage pipeline: Clinical Framing > Data Intelligence > AI Processing
   |     > Strategic Analysis > Decision Intelligence > Automated Outputs
   |
   |-- AS Profiling Base 100b (/platform/data)
   |     The 100+ billion data point foundation -- sources, coverage, update cadence
   |
   |-- AI Models (/platform/ai-models)
   |     24 proprietary models -- methodology, validation, performance benchmarks
   |
   |-- Automated Outputs (/platform/outputs)
   |   |-- PSUR / PBRER Generation (/platform/outputs/psur-pbrer)
   |   |-- Risk Management Plans (/platform/outputs/rmp)
   |   |-- CTD Module 2.5 (/platform/outputs/ctd-2-5)
   |   |-- HEOR & Market Access Reports (/platform/outputs/heor)
   |   |-- Signal Detection Reports (/platform/outputs/signal-detection)
   |
   |-- Integrations & Interoperability (/platform/integrations)
   |     API documentation, data format support, existing system compatibility
   |
   |-- Security & Compliance (/platform/security)
   |   |-- Trust Center (/platform/security/trust-center)
   |   |     SOC 2, ISO 27001, HDS, HIPAA certifications & documentation
   |   |-- FDA 21 CFR Part 11 Compliance (/platform/security/fda-21-cfr-part-11)
   |   |-- GDPR & Data Privacy (/platform/security/gdpr)
   |   |-- Audit Trail & Data Integrity (/platform/security/audit-trail)
   |   |-- AI Governance Framework (/platform/security/ai-governance)

2. SOLUTIONS (/solutions)
   |
   |-- Solutions Overview (/solutions/overview)
   |     Matrix view: by lifecycle phase x by therapeutic area x by output type
   |
   |-- By Drug Lifecycle Phase
   |   |-- Preclinical & Phase I (/solutions/phase/preclinical-phase-1)
   |   |-- Phase II (/solutions/phase/phase-2)
   |   |-- Phase III (/solutions/phase/phase-3)
   |   |-- Regulatory Submission (/solutions/phase/submission)
   |   |-- Post-Marketing Surveillance (/solutions/phase/post-marketing)
   |   |-- Market Access & HTA (/solutions/phase/market-access)
   |
   |-- By Therapeutic Area
   |   |-- Oncology (/solutions/therapeutic-area/oncology)
   |   |-- Immunology (/solutions/therapeutic-area/immunology)
   |   |-- Dermatology (/solutions/therapeutic-area/dermatology)
   |   |-- Rare Diseases (/solutions/therapeutic-area/rare-diseases)
   |   |-- Neurology (/solutions/therapeutic-area/neurology)
   |   |-- Cardiology (/solutions/therapeutic-area/cardiology)
   |   |-- Respiratory (/solutions/therapeutic-area/respiratory)
   |   |-- Infectious Disease (/solutions/therapeutic-area/infectious-disease)
   |   |-- Gastroenterology (/solutions/therapeutic-area/gastroenterology)
   |   |-- Endocrinology (/solutions/therapeutic-area/endocrinology)
   |   |-- Hematology (/solutions/therapeutic-area/hematology)
   |   |-- Pediatrics (/solutions/therapeutic-area/pediatrics)
   |   |-- All Therapeutic Areas (/solutions/therapeutic-area)
   |
   |-- By Role / Audience
   |   |-- For Drug Safety & Pharmacovigilance Leaders (/solutions/role/drug-safety)
   |   |-- For Regulatory Affairs (/solutions/role/regulatory-affairs)
   |   |-- For Clinical Operations (/solutions/role/clinical-operations)
   |   |-- For Market Access & HEOR (/solutions/role/market-access-heor)
   |   |-- For Chief Medical Officers (/solutions/role/cmo)

3. EVIDENCE (/evidence)
   |
   |-- Evidence Overview (/evidence/overview)
   |     All proof points in one place -- the "Why ArcaScience" proof layer
   |
   |-- Case Studies (/evidence/case-studies)
   |   |-- [Individual case study pages, e.g.]
   |   |-- Sanofi: Dermatology BRA Acceleration (/evidence/case-studies/sanofi-dermatology)
   |   |-- AstraZeneca: Oncology Signal Detection (/evidence/case-studies/astrazeneca-oncology)
   |   |-- Takeda: Rare Disease Submission (/evidence/case-studies/takeda-rare-disease)
   |   |-- GSK: Post-Marketing Surveillance (/evidence/case-studies/gsk-post-marketing)
   |   |-- ICON: CRO Partnership Model (/evidence/case-studies/icon-cro)
   |   |-- Paris Brain Institute: COVID-19 Literature Analysis (/evidence/case-studies/paris-brain-institute-covid)
   |   |-- [Additional case studies as available]
   |
   |-- Platform Performance Metrics (/evidence/metrics)
   |     60% faster evaluation, 9x insights, 70% cost reduction -- methodology behind claims
   |
   |-- Scientific Publications (/evidence/publications)
   |     Peer-reviewed papers, conference proceedings, preprints
   |
   |-- Validation & Methodology (/evidence/validation)
   |     How AI models are validated, bias testing, accuracy benchmarks, comparison studies
   |
   |-- Regulatory Acceptance (/evidence/regulatory-acceptance)
   |     50+ submissions accepted by FDA/EMA/PMDA -- submission tracker, authority feedback
   |
   |-- Client Testimonials (/evidence/testimonials)
   |     Named quotes from pharma leaders at client organizations

4. COMPANY (/company)
   |
   |-- About ArcaScience (/company/about)
   |     Origin story, mission, the problem being solved, founding vision
   |
   |-- Our Vision (/company/vision)
   |     Where the company and the BRA field are heading -- thought leadership positioning
   |
   |-- Leadership Team (/company/leadership)
   |     Founders, C-suite, advisory board -- with scientific credentials prominently displayed
   |
   |-- Scientific Advisory Board (/company/scientific-advisory-board)
   |     External experts, KOLs, their credentials, and their role in platform development
   |
   |-- Partners & Ecosystem (/company/partners)
   |     Technology partners, data partners, academic collaborations, CRO partnerships
   |
   |-- Investors (/company/investors)
   |     Funding history, investor profiles, financial milestones, board composition
   |
   |-- Careers (/company/careers)
   |   |-- Open Positions (/company/careers/positions)
   |   |-- Engineering at ArcaScience (/company/careers/engineering)
   |   |-- Science at ArcaScience (/company/careers/science)
   |   |-- Life at ArcaScience (/company/careers/culture)
   |
   |-- Press & News (/company/news)
   |   |-- Press Releases (/company/news/press-releases)
   |   |-- Media Coverage (/company/news/media)
   |   |-- Awards & Recognition (/company/news/awards)
   |
   |-- Contact (/company/contact)
   |     Paris office, Sunnyvale office, department-specific contacts, demo request form

5. RESOURCES (/resources)
   |
   |-- Resource Hub (/resources/hub)
   |     Filterable library of all content assets
   |
   |-- Whitepapers & Reports (/resources/whitepapers)
   |     Gated content -- deep technical and strategic papers
   |
   |-- Blog / Insights (/resources/insights)
   |     Thought leadership, regulatory updates, industry analysis
   |
   |-- Webinars & Events (/resources/webinars)
   |     Upcoming and on-demand recorded sessions
   |
   |-- Technical Documentation (/resources/documentation)
   |     API docs, integration guides, data dictionaries, user manuals
   |
   |-- Glossary of BRA Terms (/resources/glossary)
   |     Industry-standard definitions -- SEO value and user utility
   |
   |-- Regulatory Intelligence (/resources/regulatory-intelligence)
   |     Tracking regulatory changes at FDA, EMA, PMDA relevant to BRA
   |
   |-- FAQ (/resources/faq)
   |     Organized by topic: platform, pricing, compliance, data, implementation
   |
   |-- ROI Calculator (/resources/roi-calculator)
   |     Interactive tool: input current BRA costs/timelines, see ArcaScience projected savings
```

---

### Footer Architecture

```
FOOTER
|
|-- Column 1: Platform
|     Platform Overview
|     How It Works
|     AS Profiling Base 100b
|     AI Models
|     Automated Outputs
|     Integrations
|     Security & Compliance
|
|-- Column 2: Solutions
|     By Lifecycle Phase
|     By Therapeutic Area
|     For Drug Safety Leaders
|     For Regulatory Affairs
|     For Clinical Operations
|     For Market Access & HEOR
|
|-- Column 3: Evidence
|     Case Studies
|     Publications
|     Validation & Methodology
|     Regulatory Acceptance
|     Performance Metrics
|
|-- Column 4: Company
|     About Us
|     Leadership
|     Scientific Advisory Board
|     Partners
|     Careers
|     News
|     Contact
|
|-- Column 5: Resources
|     Resource Hub
|     Whitepapers
|     Blog / Insights
|     Webinars
|     Documentation
|     FAQ
|     ROI Calculator
|
|-- Bottom Bar (Legal Strip)
|     (C) 2026 ArcaScience
|     Privacy Policy (/legal/privacy)
|     Terms of Use (/legal/terms)
|     Cookie Policy (/legal/cookies)
|     Cookie Settings (modal trigger)
|     Accessibility Statement (/legal/accessibility)
|     Sitemap (/sitemap)
|
|-- Trust Badge Row
|     ISO 27001 | SOC 2 | HIPAA | HDS | GDPR | FDA 21 CFR Part 11
|
|-- Office Addresses
|     Paris: 8, rue Jean-Antoine de Baif, 75013, Paris
|     Sunnyvale: 440 N Wolfe Rd, Sunnyvale, CA 94085, USA
|
|-- Social Links
|     LinkedIn | X (Twitter)
```

---

### Legal / Utility Pages (Not in Primary Nav)

```
LEGAL & UTILITY
|
|-- Privacy Policy (/legal/privacy)
|-- Terms of Use (/legal/terms)
|-- Cookie Policy (/legal/cookies)
|-- Accessibility Statement (/legal/accessibility)
|-- Sitemap (/sitemap)
|-- 404 Error Page (/404)
|-- Client Login Portal (external link or /login)
|-- Unsubscribe / Email Preferences (/preferences)
```

---

## B. Page Purposes & User Intent Matrix

### HOME (/)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Rapidly assess whether ArcaScience is a credible, relevant platform for my organization's BRA needs |
| **Target Audience(s)** | All six audiences; homepage must serve as a universal entry point |
| **Key Content Elements** | (1) One-line value proposition: "AI-powered benefit-risk intelligence for pharmaceutical leaders" (2) Visual pipeline overview -- six-stage platform diagram (3) Key metrics: 60% faster, 9x insights, 70% cost reduction, 50+ submissions, 20+ clients (4) Client logos: Sanofi, AstraZeneca, GSK, Takeda, ICON (5) Three pathway CTAs: "See the Platform," "Explore Solutions," "View Evidence" |
| **Success Metric** | Visitor navigates to a second page (bounce rate < 40%); time on page > 45 seconds |
| **Primary CTA** | "Request a Demo" (persistent header button) + "See How It Works" (hero section) |

---

### 1. PLATFORM Pages

#### Platform Overview (/platform/overview)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand what the platform does at a strategic level before diving into specifics |
| **Target Audience(s)** | Pharma executives (VP Drug Safety, CMO, Head of Regulatory), investors |
| **Key Content Elements** | (1) End-to-end pipeline visual with brief explanation of each stage (2) Differentiation from CROs and manual BRA processes (3) Data foundation summary (100b data points) (4) AI model count and methodology headline (5) Compliance badge strip |
| **Success Metric** | Click-through to "How It Works" or a specific output page |
| **Primary CTA** | "See How It Works" |

#### How It Works (/platform/how-it-works)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand the technical workflow from data ingestion to final output -- "Show me the machinery" |
| **Target Audience(s)** | Clinical operations leaders, safety & PV teams, technical evaluators |
| **Key Content Elements** | (1) Six-stage sequential walkthrough with diagrams: Clinical Framing, Data Intelligence, AI Processing, Strategic Analysis, Decision Intelligence, Automated Outputs (2) Data flow architecture diagram (3) Sample inputs and outputs at each stage (4) Time-to-output benchmarks per stage (5) Short video or interactive demo |
| **Success Metric** | Visitor views at least 4 of 6 stages; clicks through to AI Models or Outputs |
| **Primary CTA** | "Explore Our AI Models" or "See Output Examples" |

#### AS Profiling Base 100b (/platform/data)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Evaluate data coverage, quality, and relevance to my therapeutic areas and regulatory jurisdictions |
| **Target Audience(s)** | Safety & PV teams, clinical operations, technical due diligence (investors) |
| **Key Content Elements** | (1) 100+ billion data points: breakdown by source type (literature, RWE, regulatory submissions, clinical trial registries) (2) Therapeutic area coverage map (3) Geographic and regulatory jurisdiction coverage (4) Data update cadence and freshness guarantees (5) Data quality and curation methodology |
| **Success Metric** | Visitor finds their therapeutic area or data type of interest; downloads data coverage sheet |
| **Primary CTA** | "Download Data Coverage Sheet" (gated) |

#### AI Models (/platform/ai-models)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Assess AI model rigor, transparency, and trustworthiness -- "Can I defend using this to my regulator?" |
| **Target Audience(s)** | Safety & PV teams, regulatory affairs, scientific evaluators, investors |
| **Key Content Elements** | (1) Overview of 24 proprietary models with categorization (NLP, predictive, generative, signal detection, etc.) (2) Validation methodology -- how models are tested, benchmarked, and updated (3) Explainability approach -- how outputs trace back to source data (4) Bias detection and mitigation (5) Comparison to manual BRA and competing AI approaches (6) Links to published validation studies |
| **Success Metric** | Visitor reads at least 2 model descriptions; clicks through to validation evidence |
| **Primary CTA** | "Read Validation Methodology" or "Request Technical Deep Dive" |

#### Automated Outputs -- Hub (/platform/outputs)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | See exactly what the platform produces and whether it matches what my team needs to submit |
| **Target Audience(s)** | Regulatory affairs, safety & PV teams, clinical operations |
| **Key Content Elements** | (1) List of all output types with brief descriptions (2) Sample output previews (redacted) (3) Regulatory authority acceptance rates (4) Customization options per output type (5) Time-to-generate benchmarks |
| **Success Metric** | Visitor clicks into at least one specific output type |
| **Primary CTA** | "See a Sample Output" (gated) |

#### PSUR/PBRER Generation (/platform/outputs/psur-pbrer)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Determine if ArcaScience can automate or accelerate my PSUR/PBRER workflow specifically |
| **Target Audience(s)** | Safety & PV teams, regulatory affairs |
| **Key Content Elements** | (1) PSUR/PBRER-specific pipeline walkthrough (2) Before/after timeline comparison (manual vs. ArcaScience) (3) Compliance with ICH E2C(R2) guidelines (4) Sample table of contents and structure (5) Integration with existing safety databases |
| **Success Metric** | Visitor downloads sample or requests demo specific to PSUR |
| **Primary CTA** | "Request PSUR Demo" |

#### Risk Management Plans (/platform/outputs/rmp)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Evaluate how the platform supports RMP creation and updates per EU GVP Module V |
| **Target Audience(s)** | Regulatory affairs, safety & PV teams |
| **Key Content Elements** | (1) RMP structure and content automation (2) Safety specification generation (3) Pharmacovigilance plan support (4) Risk minimization measures documentation (5) RMP update automation for periodic revisions |
| **Success Metric** | Visitor requests demo or downloads sample RMP section |
| **Primary CTA** | "See RMP Capabilities" |

#### CTD Module 2.5 (/platform/outputs/ctd-2-5)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Assess whether ArcaScience can produce submission-ready CTD 2.5 clinical overviews |
| **Target Audience(s)** | Regulatory affairs, clinical operations |
| **Key Content Elements** | (1) CTD 2.5 structure adherence (2) Automated benefit-risk summary generation (3) Cross-referencing with CTD modules 2.7 and 5 (4) Regulatory authority formatting requirements (5) Time-to-generate vs. traditional medical writing |
| **Success Metric** | Visitor requests sample CTD 2.5 output |
| **Primary CTA** | "Request Sample Output" |

#### HEOR Reports (/platform/outputs/heor)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Evaluate ArcaScience's ability to produce market access and health economics evidence |
| **Target Audience(s)** | Market access & HEOR professionals |
| **Key Content Elements** | (1) Types of HEOR outputs supported (cost-effectiveness, budget impact, burden of illness) (2) Data sources used for HEOR analyses (3) HTA body requirements coverage (NICE, G-BA, HAS, CADTH, PBAC) (4) Integration with clinical BRA data (5) Sample report structure |
| **Success Metric** | Visitor from market access team requests demo |
| **Primary CTA** | "Explore HEOR Capabilities" |

#### Signal Detection Reports (/platform/outputs/signal-detection)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand how the platform identifies and reports safety signals from its data ecosystem |
| **Target Audience(s)** | Safety & PV teams, clinical operations |
| **Key Content Elements** | (1) Signal detection methodology (disproportionality analysis, NLP-based, predictive) (2) Data sources for signal generation (3) Signal prioritization and scoring (4) Integration with PSUR and RMP workflows (5) Comparison to traditional signal detection tools |
| **Success Metric** | Visitor requests technical briefing on signal detection |
| **Primary CTA** | "Request Signal Detection Briefing" |

#### Integrations & Interoperability (/platform/integrations)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Determine whether the platform fits into my existing technology stack (Veeva, IQVIA, internal systems) |
| **Target Audience(s)** | IT decision-makers, clinical operations, safety & PV teams |
| **Key Content Elements** | (1) API architecture and documentation (2) Supported data formats (E2B, MedDRA, CDISC, HL7 FHIR) (3) Integration partners (safety databases, EDC systems, RIM systems) (4) SSO and authentication support (5) Implementation timeline and support model |
| **Success Metric** | Visitor accesses API documentation or contacts integration team |
| **Primary CTA** | "View API Documentation" |

#### Security & Compliance -- Hub (/platform/security)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Verify that the platform meets my organization's security, regulatory, and data governance requirements |
| **Target Audience(s)** | IT security, regulatory affairs, procurement, legal/compliance |
| **Key Content Elements** | (1) Certification overview: ISO 27001, SOC 2, HIPAA, HDS, GDPR, FDA 21 CFR Part 11 (2) Trust Center link (3) Data residency and sovereignty information (4) Encryption standards (at rest and in transit) (5) Penetration testing and vulnerability management |
| **Success Metric** | Visitor downloads security whitepaper or accesses Trust Center |
| **Primary CTA** | "Access Trust Center" |

#### Trust Center (/platform/security/trust-center)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Access downloadable compliance documentation for procurement and vendor assessment |
| **Target Audience(s)** | IT security, procurement, legal/compliance |
| **Key Content Elements** | (1) Downloadable SOC 2 report summary (2) ISO 27001 certificate (3) HIPAA compliance documentation (4) Penetration test summaries (5) Sub-processor list (6) Data Processing Agreement template |
| **Success Metric** | Visitor downloads at least one compliance document |
| **Primary CTA** | "Download Compliance Package" |

#### FDA 21 CFR Part 11 (/platform/security/fda-21-cfr-part-11)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Confirm that the platform meets FDA electronic records and electronic signatures requirements |
| **Target Audience(s)** | Regulatory affairs, QA, IT |
| **Key Content Elements** | (1) How the platform implements Part 11 requirements (2) Audit trail capabilities (3) Electronic signature workflow (4) Access controls and user authentication (5) System validation approach |
| **Success Metric** | Visitor confirms Part 11 compliance; proceeds to demo request |
| **Primary CTA** | "Request Compliance Briefing" |

#### GDPR & Data Privacy (/platform/security/gdpr)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand how patient data and personal data are handled under EU data protection law |
| **Target Audience(s)** | Legal/compliance, data protection officers, EU-based clients |
| **Key Content Elements** | (1) Data processing roles (controller vs. processor) (2) Lawful basis for processing (3) Data subject rights implementation (4) Cross-border data transfer mechanisms (5) Data retention policies |
| **Success Metric** | DPO or legal counsel confirms GDPR adequacy |
| **Primary CTA** | "Download DPA Template" |

#### Audit Trail & Data Integrity (/platform/security/audit-trail)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Verify that every AI-generated output is traceable to source data and every user action is logged |
| **Target Audience(s)** | QA, regulatory affairs, safety & PV teams |
| **Key Content Elements** | (1) Audit trail architecture (2) Data lineage from source to output (3) Immutable logging (4) Export capabilities for inspections (5) ALCOA+ compliance |
| **Success Metric** | Visitor confirms audit trail meets inspection readiness requirements |
| **Primary CTA** | "See Audit Trail in Action" (demo) |

#### AI Governance Framework (/platform/security/ai-governance)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand how ArcaScience governs AI model development, deployment, and monitoring ethically and responsibly |
| **Target Audience(s)** | Regulatory affairs, safety & PV teams, investors, ethics committees |
| **Key Content Elements** | (1) AI ethics principles (2) Model lifecycle governance (development, validation, deployment, monitoring, retirement) (3) Human-in-the-loop requirements (4) Bias detection and mitigation protocols (5) Alignment with EU AI Act and FDA AI/ML guidance |
| **Success Metric** | Visitor downloads AI governance whitepaper |
| **Primary CTA** | "Download AI Governance Framework" |

---

### 2. SOLUTIONS Pages

#### Solutions Overview (/solutions/overview)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Find the specific solution relevant to my role, therapeutic area, or lifecycle phase |
| **Target Audience(s)** | All pharma audiences |
| **Key Content Elements** | (1) Interactive matrix: lifecycle phase x therapeutic area x output type (2) Quick-filter by role (3) "Most popular" solutions highlighted (4) Comparison: ArcaScience vs. manual BRA vs. CRO outsourcing (5) Client success metrics per solution category |
| **Success Metric** | Visitor self-selects into at least one specific solution page |
| **Primary CTA** | Dynamic based on selection -- "See [Solution] Details" |

#### Lifecycle Phase Pages (6 pages: Preclinical/Phase I through Market Access)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand how ArcaScience specifically supports BRA at my current development stage |
| **Target Audience(s)** | Clinical operations, regulatory affairs, safety & PV (varies by phase) |
| **Key Content Elements** | (1) Phase-specific BRA challenges and how the platform addresses them (2) Relevant data sources and AI models activated for this phase (3) Typical outputs generated (4) Case study excerpt relevant to this phase (5) Regulatory authority expectations at this phase |
| **Success Metric** | Visitor reads phase content and clicks to case study or requests phase-specific demo |
| **Primary CTA** | "See [Phase] Case Study" or "Request [Phase]-Specific Demo" |

#### Therapeutic Area Pages (12+ pages)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Confirm ArcaScience has depth in my specific therapeutic area -- data coverage, model tuning, regulatory experience |
| **Target Audience(s)** | Safety & PV teams, clinical operations, medical affairs |
| **Key Content Elements** | (1) TA-specific data coverage statistics (2) Relevant adverse event landscape (3) TA-specific AI model capabilities (4) Regulatory submission history in this TA (5) Relevant case study or publication |
| **Success Metric** | Visitor finds their TA, confirms data coverage, requests TA-specific briefing |
| **Primary CTA** | "Request [TA] Briefing" |

#### Role / Audience Pages (5 pages)

##### For Drug Safety & Pharmacovigilance Leaders (/solutions/role/drug-safety)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | See how this platform transforms my team's PSUR, signal detection, and RMP workflows |
| **Target Audience(s)** | VP Drug Safety, Head of PV, PV Directors |
| **Key Content Elements** | (1) Pain points addressed: manual literature review, PSUR timelines, signal noise (2) Workflow before vs. after ArcaScience (3) Time and cost savings specific to PV teams (4) Integration with existing safety databases (Argus, Vault Safety) (5) Testimonials from PV leaders |
| **Success Metric** | PV leader requests demo or shares page with team |
| **Primary CTA** | "See How PV Teams Use ArcaScience" |

##### For Regulatory Affairs (/solutions/role/regulatory-affairs)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Evaluate whether ArcaScience can accelerate my submission timelines and improve submission quality |
| **Target Audience(s)** | Head of Regulatory, Regulatory Affairs Directors |
| **Key Content Elements** | (1) Submission-ready output formats (2) Regulatory authority acceptance track record (3) CTD 2.5 and RMP automation (4) Multi-authority submission support (FDA, EMA, PMDA) (5) Audit trail and compliance assurance |
| **Success Metric** | Regulatory leader requests submission-focused demo |
| **Primary CTA** | "See Submission Capabilities" |

##### For Clinical Operations (/solutions/role/clinical-operations)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand how BRA intelligence from ArcaScience can inform protocol design and trial decision-making |
| **Target Audience(s)** | VP Clinical Operations, Clinical Development leads |
| **Key Content Elements** | (1) Early-phase BRA to inform go/no-go decisions (2) Comparator and competitive landscape analysis (3) Adverse event prediction for protocol risk mitigation (4) Biomarker and efficacy marker identification (5) Integration with clinical data management systems |
| **Success Metric** | Clinical operations lead sees value for early-phase decisions |
| **Primary CTA** | "Explore Early-Phase BRA" |

##### For Market Access & HEOR (/solutions/role/market-access-heor)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Determine if ArcaScience can produce the health economics evidence I need for HTA submissions and pricing negotiations |
| **Target Audience(s)** | Market access directors, HEOR leads |
| **Key Content Elements** | (1) HEOR report capabilities (2) HTA body coverage (NICE, G-BA, HAS, etc.) (3) Real-world evidence integration (4) Cost-effectiveness and budget impact modeling inputs (5) BRA-to-value story translation |
| **Success Metric** | Market access professional requests HEOR-focused demo |
| **Primary CTA** | "See HEOR Capabilities" |

##### For Chief Medical Officers (/solutions/role/cmo)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Assess strategic value of AI-driven BRA for my portfolio-level medical decisions |
| **Target Audience(s)** | CMOs, VP Medical Affairs |
| **Key Content Elements** | (1) Portfolio-level benefit-risk intelligence (2) Competitive landscape analysis across TAs (3) Decision support for labeling strategy (4) Medical affairs evidence generation (5) Board-ready executive summaries |
| **Success Metric** | CMO requests executive briefing |
| **Primary CTA** | "Request Executive Briefing" |

---

### 3. EVIDENCE Pages

#### Evidence Overview (/evidence/overview)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Find the proof that ArcaScience delivers on its claims -- for my own evaluation or to build an internal business case |
| **Target Audience(s)** | All audiences, especially during vendor evaluation |
| **Key Content Elements** | (1) Headline metrics: 50+ submissions, 20+ clients, 70K+ patients supported (2) Featured case studies (3) Publication count and journal impact (4) Regulatory acceptance summary (5) Path to detailed evidence by type |
| **Success Metric** | Visitor navigates to at least one specific evidence type |
| **Primary CTA** | "Explore Case Studies" |

#### Case Studies (/evidence/case-studies)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | See how a company like mine used ArcaScience and what results they achieved |
| **Target Audience(s)** | All pharma audiences; critical for mid-funnel evaluation |
| **Key Content Elements** | (1) Filterable by therapeutic area, lifecycle phase, output type, and company size (2) Each case study: Challenge, Approach, Results, Client Quote (3) Quantified outcomes (time saved, cost reduced, insights generated) (4) Before/after comparisons (5) Regulatory authority acceptance confirmation |
| **Success Metric** | Visitor reads at least one full case study; downloads PDF version |
| **Primary CTA** | "Download Full Case Study" (gated) |

#### Individual Case Study Pages (6+ pages)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Deep-dive into a specific client engagement relevant to my situation |
| **Target Audience(s)** | Pharma evaluators building internal business cases |
| **Key Content Elements** | (1) Client context and challenge (2) ArcaScience solution deployed (3) Implementation timeline (4) Quantified results (5) Client testimonial quote (6) Related case studies |
| **Success Metric** | Visitor downloads PDF; shares internally; requests similar engagement |
| **Primary CTA** | "Request Similar Analysis for Your Organization" |

#### Platform Performance Metrics (/evidence/metrics)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Scrutinize the methodology behind ArcaScience's performance claims before presenting them to my leadership |
| **Target Audience(s)** | Technical evaluators, procurement, investors |
| **Key Content Elements** | (1) Methodology for each metric (60% faster, 9x insights, 70% cost reduction) (2) Baseline definitions and comparison methodology (3) Sample sizes and statistical confidence (4) Independent validation where available (5) Customer-reported vs. internal benchmarks |
| **Success Metric** | Evaluator gains confidence in metric validity |
| **Primary CTA** | "Download Performance Methodology Paper" |

#### Scientific Publications (/evidence/publications)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Review ArcaScience's peer-reviewed scientific output to assess academic credibility |
| **Target Audience(s)** | Scientists, medical affairs, investors, academic collaborators |
| **Key Content Elements** | (1) Full publication list with citations (2) Journal names and impact factors (3) Conference presentations and posters (4) Filterable by topic, year, and author (5) Links to PubMed, DOI |
| **Success Metric** | Scientist reads or downloads at least one publication |
| **Primary CTA** | "Access Full Publication" (links to journal or PDF) |

#### Validation & Methodology (/evidence/validation)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Evaluate the scientific rigor of the AI models and whether outputs would withstand regulatory scrutiny |
| **Target Audience(s)** | Safety & PV teams, regulatory affairs, scientific evaluators, investors |
| **Key Content Elements** | (1) Validation framework overview (2) Model-by-model performance metrics (accuracy, precision, recall, F1) (3) Cross-validation methodology (4) External validation studies (5) Ongoing monitoring and model drift detection |
| **Success Metric** | Technical evaluator confirms validation approach meets their standards |
| **Primary CTA** | "Request Validation Deep Dive" |

#### Regulatory Acceptance (/evidence/regulatory-acceptance)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Confirm that regulatory authorities have accepted ArcaScience-generated outputs in real submissions |
| **Target Audience(s)** | Regulatory affairs, safety & PV teams, CMOs |
| **Key Content Elements** | (1) Submission count by authority (FDA, EMA, PMDA, others) (2) Submission count by output type (PSUR, RMP, CTD 2.5) (3) Acceptance rate and any queries/deficiencies received (4) Timeline of regulatory acceptance milestones (5) Anonymized authority feedback excerpts |
| **Success Metric** | Regulatory leader confirms acceptable track record |
| **Primary CTA** | "See Submission Track Record Details" |

#### Client Testimonials (/evidence/testimonials)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Hear from peers at recognized pharma companies about their experience |
| **Target Audience(s)** | All pharma audiences |
| **Key Content Elements** | (1) Named quotes with title, company, and photo (2) Video testimonials where available (3) Organized by role and therapeutic area (4) Linked to relevant case studies (5) Net Promoter Score or satisfaction metrics |
| **Success Metric** | Visitor finds a testimonial from a peer in a similar role or company |
| **Primary CTA** | "See Their Full Story" (links to case study) |

---

### 4. COMPANY Pages

#### About ArcaScience (/company/about)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand who this company is, why it exists, and whether it has the credibility to be a long-term partner |
| **Target Audience(s)** | All audiences, especially first-time visitors and investors |
| **Key Content Elements** | (1) Founding story: Romain Clement's personal motivation after brain cancer remission (2) Mission statement (3) Key milestones timeline (founding, first client, COVID-19 deployment, funding, client count) (4) Team size and composition (science vs. engineering split) (5) Office locations and global footprint |
| **Success Metric** | Visitor understands the company's credibility and mission; navigates to Leadership or Evidence |
| **Primary CTA** | "Meet Our Team" |

#### Our Vision (/company/vision)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand where ArcaScience and AI-driven BRA are heading -- is this a company building for the next decade? |
| **Target Audience(s)** | Investors, executive sponsors, potential hires |
| **Key Content Elements** | (1) Vision for the future of BRA (2) Industry trends driving the vision (regulatory complexity, data explosion, AI maturation) (3) Roadmap themes (not dates): patient-facing solutions, expanded TAs, global regulatory coverage (4) Thought leadership positioning (5) ArcaScience's role in the broader AI-in-pharma ecosystem |
| **Success Metric** | Investor or executive sees long-term strategic value |
| **Primary CTA** | "Read Our Latest Insights" |

#### Leadership Team (/company/leadership)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Assess whether the leadership team has the domain expertise and track record to deliver |
| **Target Audience(s)** | Investors, pharma executives (during vendor evaluation), potential hires |
| **Key Content Elements** | (1) Founders with scientific credentials prominently displayed (2) C-suite bios with relevant pharma/regulatory experience (3) LinkedIn links (4) Published work and speaking engagements (5) Photo headshots -- professional, not casual |
| **Success Metric** | Visitor confirms leadership credibility; clicks LinkedIn or views publications |
| **Primary CTA** | "Contact Our Team" |

#### Scientific Advisory Board (/company/scientific-advisory-board)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Evaluate the caliber of external scientific advisors guiding the platform's development |
| **Target Audience(s)** | Safety & PV teams, regulatory affairs, investors |
| **Key Content Elements** | (1) SAB member bios with institutional affiliations (2) Relevant expertise areas (pharmacoepidemiology, regulatory science, AI/ML, specific TAs) (3) Publications and h-index (4) Role in ArcaScience's validation and methodology (5) KOL status in their fields |
| **Success Metric** | Visitor recognizes names or institutions; confirms scientific rigor |
| **Primary CTA** | "See Our Methodology" (links to Evidence > Validation) |

#### Partners & Ecosystem (/company/partners)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand who ArcaScience works with and whether they integrate with my existing vendors |
| **Target Audience(s)** | Clinical operations, IT, procurement |
| **Key Content Elements** | (1) Technology partners (cloud, data, AI infrastructure) (2) Data partners (RWE providers, literature databases) (3) Academic collaborations (Paris Brain Institute, universities) (4) CRO partnerships (ICON) (5) Partner program for system integrators or consultancies |
| **Success Metric** | Visitor identifies a relevant partner; understands ecosystem fit |
| **Primary CTA** | "Become a Partner" or "Explore Integrations" |

#### Investors (/company/investors)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Evaluate ArcaScience as an investment opportunity or understand financial backing |
| **Target Audience(s)** | Investors, financial analysts, potential partners |
| **Key Content Elements** | (1) Funding history: pre-seed (1.3M EUR), seed ($7M) (2) Investor profiles: The Moon Venture, Pleiade Venture, Plug&Play, Bpifrance, AKKA Technologies (3) Key financial milestones (break-even achieved) (4) Board composition (5) Market opportunity: 11.1B EUR BRA market |
| **Success Metric** | Investor requests meeting or downloads investor materials |
| **Primary CTA** | "Contact Investor Relations" |

#### Careers -- Hub (/company/careers)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Evaluate ArcaScience as a potential employer |
| **Target Audience(s)** | Scientists, engineers, business professionals |
| **Key Content Elements** | (1) Mission-driven employer value proposition (2) Team composition and growth trajectory (3) Links to role-specific pages (Engineering, Science) (4) Benefits and compensation philosophy (5) Current open position count |
| **Success Metric** | Candidate views at least one open position |
| **Primary CTA** | "View Open Positions" |

#### Open Positions (/company/careers/positions)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Find and apply for a specific role |
| **Target Audience(s)** | Active job seekers |
| **Key Content Elements** | (1) Filterable job listings by department, location, seniority (2) Detailed job descriptions (3) Application form or ATS integration (4) "No matching role? Send us your CV" option (5) Hiring process overview |
| **Success Metric** | Candidate submits application |
| **Primary CTA** | "Apply Now" |

#### Engineering at ArcaScience (/company/careers/engineering)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand what it's like to build AI products at a pharma-tech company |
| **Target Audience(s)** | Software engineers, ML engineers, data engineers |
| **Key Content Elements** | (1) Tech stack and architecture overview (2) Engineering culture and practices (3) Scale of data and AI challenges (4) Open-source contributions if any (5) Team profiles and blog posts from engineers |
| **Success Metric** | Engineer applies or bookmarks a position |
| **Primary CTA** | "See Engineering Roles" |

#### Science at ArcaScience (/company/careers/science)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand research opportunities and scientific impact potential |
| **Target Audience(s)** | Pharmacoepidemiologists, biostatisticians, clinical scientists |
| **Key Content Elements** | (1) Scientific mission and publication culture (2) Collaboration with academic institutions (3) Conference participation (4) Scientific team profiles (5) Impact metrics (publications, submissions supported) |
| **Success Metric** | Scientist applies or reaches out |
| **Primary CTA** | "See Science Roles" |

#### Life at ArcaScience (/company/careers/culture)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Get a sense of company culture, values, and work environment |
| **Target Audience(s)** | All potential hires |
| **Key Content Elements** | (1) Company values (2) Paris and Sunnyvale office culture (3) Remote work policies (4) Team events and community (5) Diversity and inclusion commitment |
| **Success Metric** | Candidate feels cultural alignment |
| **Primary CTA** | "Join Us" |

#### Press & News -- Hub (/company/news)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Find the latest company announcements and media coverage |
| **Target Audience(s)** | Journalists, investors, potential clients |
| **Key Content Elements** | (1) Reverse-chronological news feed (2) Filter by type: press releases, media coverage, awards (3) Media kit download (logo, boilerplate, founder photos) (4) Press contact information (5) RSS feed |
| **Success Metric** | Journalist finds story material; investor sees recent momentum |
| **Primary CTA** | "Download Media Kit" or "Contact Press" |

#### Press Releases (/company/news/press-releases)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Access official company announcements |
| **Target Audience(s)** | Journalists, investors |
| **Key Content Elements** | (1) Dated press releases in reverse chronological order (2) Structured format: headline, date, body, boilerplate, contact (3) Share buttons (4) Related coverage links (5) Embeddable quotes |
| **Success Metric** | Journalist uses content for article |
| **Primary CTA** | "Contact Press" |

#### Media Coverage (/company/news/media)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | See what third parties are saying about ArcaScience |
| **Target Audience(s)** | Evaluators seeking third-party validation, investors |
| **Key Content Elements** | (1) Media mentions with publication logos (TechFundingNews, SiliconANGLE, EU-Startups, HIT Consultant, PharmiWeb) (2) Links to original articles (3) Key quote excerpts (4) Coverage timeline showing momentum (5) Analyst mentions |
| **Success Metric** | Visitor sees credible third-party coverage |
| **Primary CTA** | "Read Full Article" (external link) |

#### Awards & Recognition (/company/news/awards)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | See industry recognition and competitive positioning |
| **Target Audience(s)** | Evaluators, investors, potential hires |
| **Key Content Elements** | (1) Award listings with awarding body, date, and category (2) Conference competition wins (3) Analyst report inclusions (4) Industry ranking appearances (5) Logo badges |
| **Success Metric** | Visitor sees credible recognition |
| **Primary CTA** | "Learn More About Our Platform" |

#### Contact (/company/contact)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Reach a specific person or team at ArcaScience |
| **Target Audience(s)** | All audiences |
| **Key Content Elements** | (1) Multi-purpose contact form with department routing (demo, partnerships, press, careers, general) (2) Paris and Sunnyvale office addresses with maps (3) Direct email: contact@arcascience.ai (4) Response time expectation (5) Calendar booking link for demo |
| **Success Metric** | Form submission completed |
| **Primary CTA** | "Send Message" or "Book a Demo" |

---

### 5. RESOURCES Pages

#### Resource Hub (/resources/hub)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Browse and filter all ArcaScience content assets to find what's relevant to my needs |
| **Target Audience(s)** | All audiences, especially during evaluation and ongoing relationship |
| **Key Content Elements** | (1) Filterable content library: by type (whitepaper, blog, webinar, documentation), by topic, by therapeutic area, by role (2) Featured/promoted content (3) Most popular downloads (4) Recently added content (5) Search functionality |
| **Success Metric** | Visitor finds and accesses at least one content piece |
| **Primary CTA** | Dynamic per content type |

#### Whitepapers & Reports (/resources/whitepapers)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Access in-depth thought leadership or technical papers to inform my evaluation or share with colleagues |
| **Target Audience(s)** | All pharma audiences; gated content for lead generation |
| **Key Content Elements** | (1) Whitepaper titles with abstracts (2) Topic categorization (3) Page count and reading time (4) Download form (name, email, company, role) (5) Related content suggestions |
| **Success Metric** | Visitor downloads whitepaper (lead captured) |
| **Primary CTA** | "Download Whitepaper" |

#### Blog / Insights (/resources/insights)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Read ArcaScience's perspective on BRA, AI in pharma, regulatory trends, and industry developments |
| **Target Audience(s)** | All audiences; primary SEO entry point |
| **Key Content Elements** | (1) Blog posts in reverse chronological order (2) Category filters (BRA methodology, regulatory updates, AI in pharma, company news) (3) Author attribution with credentials (4) Reading time estimates (5) Social sharing buttons (6) Related posts |
| **Success Metric** | Visitor reads article, subscribes to newsletter, or navigates to platform pages |
| **Primary CTA** | "Subscribe to Insights" |

#### Webinars & Events (/resources/webinars)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Register for upcoming events or watch recorded sessions to learn from ArcaScience experts |
| **Target Audience(s)** | All pharma audiences; strong mid-funnel engagement |
| **Key Content Elements** | (1) Upcoming webinars with registration (2) On-demand recorded webinars (3) Conference appearances and speaking slots (4) Event calendar (5) Topic and speaker details |
| **Success Metric** | Registration for upcoming webinar or view of recorded session |
| **Primary CTA** | "Register Now" or "Watch Recording" |

#### Technical Documentation (/resources/documentation)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Access technical specifications, API documentation, and implementation guides |
| **Target Audience(s)** | IT teams, integration engineers, technical evaluators |
| **Key Content Elements** | (1) API reference documentation (2) Data format specifications (E2B, MedDRA, CDISC) (3) Integration guides (4) User manuals (5) Release notes and changelog |
| **Success Metric** | Technical user finds needed documentation; reduced support ticket volume |
| **Primary CTA** | "Access Full Documentation" (may require login) |

#### Glossary of BRA Terms (/resources/glossary)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Look up a specific term, or use as a reference during evaluation discussions |
| **Target Audience(s)** | Cross-functional teams new to BRA, SEO-driven organic traffic |
| **Key Content Elements** | (1) Alphabetized glossary of benefit-risk analysis terminology (2) ICH, FDA, EMA terminology with authoritative definitions (3) ArcaScience-specific terminology explained (4) Cross-links to relevant platform and solution pages (5) Search functionality |
| **Success Metric** | Organic search entry; visitor navigates to platform or solution pages from glossary |
| **Primary CTA** | "See How We Apply [Term]" (contextual links to platform) |

#### Regulatory Intelligence (/resources/regulatory-intelligence)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Stay current on regulatory changes that affect my BRA obligations and strategy |
| **Target Audience(s)** | Regulatory affairs, safety & PV teams |
| **Key Content Elements** | (1) Regulatory update feed (FDA, EMA, PMDA guideline changes) (2) Impact analysis for each update (3) ArcaScience platform response to regulatory changes (4) Expert commentary (5) Downloadable regulatory briefs |
| **Success Metric** | Visitor bookmarks page, subscribes to regulatory alerts, or shares with team |
| **Primary CTA** | "Subscribe to Regulatory Alerts" |

#### FAQ (/resources/faq)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Get quick answers to common questions about the platform, pricing, implementation, and compliance |
| **Target Audience(s)** | All audiences, especially during early evaluation |
| **Key Content Elements** | (1) Categorized Q&A: Platform, Data, AI Models, Compliance, Pricing, Implementation, Support (2) Expandable/collapsible format (3) Search functionality (4) "Didn't find your answer?" routing to contact (5) Structured data markup for Google featured snippets |
| **Success Metric** | Visitor finds answer; reduced inbound support queries |
| **Primary CTA** | "Still Have Questions? Contact Us" |

#### ROI Calculator (/resources/roi-calculator)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Build a quantified business case for adopting ArcaScience by inputting my organization's current BRA costs and timelines |
| **Target Audience(s)** | Pharma executives building internal business cases, procurement |
| **Key Content Elements** | (1) Interactive calculator with inputs: current BRA team size, annual BRA spend, PSURs per year, average time per PSUR, CRO spend (2) Output: projected time savings, cost savings, ROI timeline (3) Methodology explanation (4) Downloadable PDF of results (5) "Share with your CFO" email function |
| **Success Metric** | Visitor completes calculation and downloads results |
| **Primary CTA** | "Download Your ROI Report" (gated) or "Discuss These Numbers With Us" |

---

### Legal & Utility Pages

#### Privacy Policy (/legal/privacy)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand how ArcaScience handles personal data collected through the website |
| **Target Audience(s)** | Legal/compliance, DPOs, any privacy-conscious visitor |
| **Key Content Elements** | (1) Data collected (2) Purpose of processing (3) Legal basis (4) Data retention (5) Rights and how to exercise them (6) Contact DPO |
| **Success Metric** | Legal compliance; visitor able to find privacy information |
| **Primary CTA** | "Contact Data Protection Officer" |

#### Terms of Use (/legal/terms)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Review legal terms governing use of the website |
| **Target Audience(s)** | Legal/compliance |
| **Key Content Elements** | (1) Acceptable use (2) Intellectual property (3) Limitation of liability (4) Governing law (5) Dispute resolution |
| **Success Metric** | Legal compliance |
| **Primary CTA** | N/A |

#### Cookie Policy (/legal/cookies)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Understand what cookies the site uses and manage preferences |
| **Target Audience(s)** | Privacy-conscious visitors, EU visitors |
| **Key Content Elements** | (1) Cookie types (essential, analytics, marketing) (2) Third-party cookies (3) How to manage preferences (4) Cookie consent mechanism (5) Cookie list with purposes and durations |
| **Success Metric** | GDPR/ePrivacy compliance |
| **Primary CTA** | "Manage Cookie Preferences" |

#### Accessibility Statement (/legal/accessibility)

| Attribute | Detail |
|---|---|
| **Primary User Intent** | Confirm site meets accessibility standards and find help if needed |
| **Target Audience(s)** | Users with disabilities, compliance reviewers |
| **Key Content Elements** | (1) WCAG 2.1 AA compliance statement (2) Known limitations (3) Assistive technology support (4) Feedback mechanism (5) Contact for accessibility help |
| **Success Metric** | Accessibility compliance; users with disabilities can use the site |
| **Primary CTA** | "Report an Accessibility Issue" |

---

## C. Navigation Logic

### C.1 How Expert Pharma Users Navigate

Expert users in pharmaceutical organizations do not browse websites linearly from homepage through a marketing funnel. Their behavior patterns are fundamentally different from generic B2B SaaS buyers:

**Pattern 1: The Technical Validator**
A pharmacovigilance director has been told by their VP to evaluate ArcaScience. They arrive via a Google search or a colleague's shared link. Their path:
```
Google "ArcaScience PSUR automation"
  --> PSUR/PBRER Output Page (/platform/outputs/psur-pbrer)
    --> AI Models (/platform/ai-models)
      --> Validation & Methodology (/evidence/validation)
        --> Security & Compliance (/platform/security)
          --> Request Demo
```
They skip the homepage entirely. They want technical proof before engaging sales.

**Pattern 2: The Executive Evaluator**
A VP of Drug Safety at a top-20 pharma company hears about ArcaScience at a conference. Their path:
```
Direct visit to homepage (/)
  --> Platform Overview (/platform/overview)
    --> For Drug Safety Leaders (/solutions/role/drug-safety)
      --> Case Study (relevant TA) (/evidence/case-studies/[specific])
        --> ROI Calculator (/resources/roi-calculator)
          --> Request Demo
```
They want to quickly assess strategic fit, then build an internal business case.

**Pattern 3: The Regulatory Compliance Check**
A procurement team at a pharma company is conducting vendor due diligence. Their path:
```
Direct link to Security & Compliance (/platform/security)
  --> Trust Center (/platform/security/trust-center)
    --> FDA 21 CFR Part 11 (/platform/security/fda-21-cfr-part-11)
      --> GDPR (/platform/security/gdpr)
        --> Integrations (/platform/integrations)
          --> Download compliance package
```
They may never look at the platform's features. They only care about compliance posture.

**Pattern 4: The Investor**
A VC analyst is evaluating ArcaScience after reading a press article. Their path:
```
Media Coverage (/company/news/media) or direct homepage
  --> About ArcaScience (/company/about)
    --> Investors (/company/investors)
      --> Leadership Team (/company/leadership)
        --> Platform Performance Metrics (/evidence/metrics)
          --> Vision (/company/vision)
            --> Contact Investor Relations
```
They are evaluating team, traction, market, and product-market fit.

**Pattern 5: The Job Seeker**
An ML engineer finds ArcaScience via LinkedIn. Their path:
```
LinkedIn job post
  --> Open Positions (/company/careers/positions)
    --> Engineering at ArcaScience (/company/careers/engineering)
      --> AI Models (/platform/ai-models) -- to understand the technical challenge
        --> About ArcaScience (/company/about) -- mission alignment
          --> Apply
```

---

### C.2 Cross-Linking Strategy

Every page in the site must have deliberate cross-links to related pages. Cross-linking serves three purposes: (1) SEO internal link equity distribution, (2) reducing dead-end pages, and (3) supporting the non-linear navigation patterns described above.

**Principle: Every page has at least 3 contextual cross-links and 1 CTA.**

| Page Type | Cross-Links To |
|---|---|
| Platform pages | Related output pages, relevant case studies, validation evidence, integration page |
| Solution (phase) pages | Relevant outputs, therapeutic area pages with phase overlap, case studies from that phase |
| Solution (TA) pages | Data coverage details, relevant case studies, relevant publications, role pages |
| Solution (role) pages | Most relevant outputs, case studies featuring that role, ROI calculator |
| Evidence pages | Platform pages that explain what was measured, solution pages that apply the evidence |
| Case study pages | Platform output page used, therapeutic area page, role page, similar case studies |
| Resource pages | Platform and solution pages relevant to the content topic |
| Company pages | Evidence pages (from leadership to publications, from about to case studies) |

**Persistent cross-links on every page:**
- "Request Demo" button (header, persistent)
- Related content sidebar or bottom module (3 contextually relevant pages)
- Breadcrumb navigation showing hierarchy position
- "Back to [parent]" link for deep pages

---

### C.3 Organic Search Entry Points

The following pages are designed to capture organic search traffic for high-intent queries:

| Search Query Pattern | Landing Page |
|---|---|
| "AI benefit risk analysis pharma" | Homepage or Platform Overview |
| "automated PSUR generation" | PSUR/PBRER Output Page |
| "AI pharmacovigilance platform" | For Drug Safety Leaders |
| "benefit risk assessment [therapeutic area]" | Therapeutic Area Pages |
| "FDA 21 CFR Part 11 AI platform" | FDA 21 CFR Part 11 Page |
| "PSUR automation software" | PSUR/PBRER Output Page |
| "AI risk management plan pharma" | RMP Output Page |
| "benefit risk analysis definition" | Glossary |
| "ArcaScience review" | Evidence Overview or Case Studies |
| "pharmacovigilance AI cost reduction" | Platform Performance Metrics or ROI Calculator |
| "CTD 2.5 automation" | CTD 2.5 Output Page |
| "HEOR report generation AI" | HEOR Output Page |
| "AI signal detection pharma" | Signal Detection Output Page |
| "benefit risk analysis [drug name]" | Relevant Therapeutic Area Page |
| "[regulatory update] impact on BRA" | Regulatory Intelligence Blog Posts |

---

### C.4 Audience-Specific Navigation Paths

#### Path: VP Drug Safety at Novartis

**Goal:** Evaluate whether ArcaScience can replace or augment current BRA workflows for a portfolio of 40+ marketed products.

```
Homepage (/) -- 10 seconds
  Sees client logos (peers), key metrics
  Clicks "Platform" in nav

Platform Overview (/platform/overview) -- 30 seconds
  Scans six-stage pipeline
  Clicks "Automated Outputs" in subnav

PSUR/PBRER Generation (/platform/outputs/psur-pbrer) -- 2 minutes
  Reads workflow, checks ICH E2C(R2) compliance
  Sees "Related Case Study" sidebar link, clicks

Case Study: GSK Post-Marketing (/evidence/case-studies/gsk-post-marketing) -- 3 minutes
  Reads quantified results
  Clicks "For Drug Safety Leaders" in breadcrumb/related links

For Drug Safety Leaders (/solutions/role/drug-safety) -- 2 minutes
  Sees before/after workflow comparison
  Clicks "Calculate Your ROI" banner

ROI Calculator (/resources/roi-calculator) -- 4 minutes
  Inputs current team costs
  Downloads ROI report
  Clicks "Discuss These Numbers With Us"

Contact/Demo Request (/company/contact) -- 1 minute
  Books demo via calendar link
```

**Total time: ~12 minutes. 7 pages. No dead ends. Clear value progression.**

#### Path: Head of Regulatory at Pfizer

```
Google search: "automated CTD 2.5 clinical overview AI"

CTD 2.5 Output Page (/platform/outputs/ctd-2-5) -- direct entry
  Reads capabilities, formatting compliance
  Clicks "Regulatory Acceptance Track Record"

Regulatory Acceptance (/evidence/regulatory-acceptance) -- 2 minutes
  Sees 50+ submissions, FDA/EMA/PMDA breakdown
  Clicks "For Regulatory Affairs"

For Regulatory Affairs (/solutions/role/regulatory-affairs) -- 2 minutes
  Sees multi-authority support, submission-ready formats
  Clicks "Security & Compliance" (due diligence)

Security & Compliance (/platform/security) -- 1 minute
  Confirms FDA 21 CFR Part 11, ISO 27001
  Clicks "Trust Center"

Trust Center (/platform/security/trust-center) -- 3 minutes
  Downloads SOC 2 summary and DPA
  Clicks "Request Demo"
```

#### Path: Investor Analyst at a Life Sciences VC

```
Press article on TechFundingNews links to ArcaScience

Homepage (/) -- scans quickly
  Clicks "Company" > "Investors"

Investors (/company/investors) -- 2 minutes
  Reviews funding history, investor profiles
  Clicks "Leadership Team"

Leadership (/company/leadership) -- 2 minutes
  Checks founder credentials, SAB
  Clicks "Scientific Advisory Board"

SAB (/company/scientific-advisory-board) -- 1 minute
  Confirms KOL involvement
  Clicks "Evidence" > "Performance Metrics"

Performance Metrics (/evidence/metrics) -- 3 minutes
  Reviews methodology behind 60%/9x/70% claims
  Clicks "Vision"

Vision (/company/vision) -- 2 minutes
  Assesses market strategy
  Clicks "Contact" to request investor meeting
```

---

## D. Content Hierarchy Principles

### D.1 The Three-Layer Depth Model

Every content domain in the site follows a consistent three-layer depth model that matches how expert users consume information:

```
Layer 1: OVERVIEW (Strategic)
  - Who: Executives, first-time visitors
  - Depth: 30-second scan
  - Content: Value proposition, key metrics, visual summary
  - Format: Hero section + 3-5 bullet points + CTA
  - Example: Platform Overview page

Layer 2: DETAIL (Operational)
  - Who: Functional leaders, evaluators
  - Depth: 2-5 minute read
  - Content: How it works, capabilities, specifications, workflow comparisons
  - Format: Structured sections with headings, diagrams, feature lists
  - Example: How It Works, Output-specific pages, Role pages

Layer 3: EVIDENCE (Proof)
  - Who: Technical validators, procurement, scientists
  - Depth: 5-15 minute read, downloadable assets
  - Content: Validation data, case studies, publications, compliance documentation
  - Format: Data tables, methodology descriptions, downloadable PDFs, citations
  - Example: Validation & Methodology, Case Studies, Trust Center
```

**Every content domain (Platform, Solutions, Evidence) has pages at all three layers.**

### D.2 Content Prominence Rules by Page Type

#### Platform Pages

```
1. MOST PROMINENT: What it does (capability statement)
2. How it does it (methodology / workflow)
3. Why it's trustworthy (validation, compliance)
4. What others say (testimonial snippet)
5. LEAST PROMINENT: Company context (link to About)
```

#### Solution Pages

```
1. MOST PROMINENT: Your problem (pain point the audience recognizes)
2. Our solution (how ArcaScience addresses it)
3. Proof it works (case study excerpt, metric)
4. How to get started (implementation simplicity)
5. LEAST PROMINENT: Related solutions (cross-sell)
```

#### Evidence Pages

```
1. MOST PROMINENT: The data/proof itself (metrics, findings, results)
2. Methodology (how the data was generated or validated)
3. Context (what it means for the visitor's situation)
4. Downloadable asset (PDF, full report)
5. LEAST PROMINENT: Next steps (demo request)
```

#### Company Pages

```
1. MOST PROMINENT: Credentials and track record
2. Mission and vision (why this matters)
3. People and their expertise
4. Traction and momentum
5. LEAST PROMINENT: Call to action
```

### D.3 Regulatory and Scientific Content Layering

Pharmaceutical audiences require a specific content layering approach that is distinct from generic B2B:

**Principle 1: Lead with regulatory context, not marketing claims.**

Every platform capability page should open with the regulatory requirement it addresses (e.g., "ICH E2C(R2) requires periodic benefit-risk evaluation...") before describing how ArcaScience meets that requirement. This establishes relevance and credibility before any marketing language.

**Principle 2: Every claim must link to evidence.**

Performance metrics (60% faster, 9x insights, 70% cost reduction) must be hyperlinked to the Performance Metrics page where methodology is explained. No unsupported claims anywhere in the site.

**Principle 3: Source attribution is mandatory.**

When referencing data, guidelines, or standards, provide inline citations or links. Pharma professionals are trained to trace claims to sources. A site that doesn't cite sources signals lack of rigor.

**Principle 4: Technical depth is available but not mandatory.**

Use progressive disclosure: summary visible, detail expandable or linked. A VP scans the summary; a PV scientist clicks into the methodology. Both are served on the same page without either being frustrated.

**Principle 5: Compliance is a feature, not a footnote.**

Security and compliance content gets equal architectural prominence to platform features. In the current site, compliance is buried. In the new architecture, it has its own section under Platform with five dedicated sub-pages plus a Trust Center.

### D.4 Visual and Structural Standards

| Element | Standard |
|---|---|
| **Page length** | Long-form pages (Platform, Solutions) should be scannable with clear section headers every 200-300 words. No wall-of-text pages. |
| **Above the fold** | Every page must communicate its core value proposition above the fold: a clear headline, 1-2 sentence description, and primary CTA. |
| **Diagrams** | The platform pipeline, data architecture, and workflow comparisons must be diagrammatic, not textual. Expert users process visual pipelines faster than bullet lists. |
| **Data tables** | Performance metrics, data coverage, and regulatory acceptance data should be presented in structured tables, not narrative paragraphs. |
| **Downloadable assets** | Every evidence and technical page must offer a downloadable PDF for offline review and internal sharing. Gated where appropriate for lead generation. |
| **Breadcrumbs** | Every page below the top level must have breadcrumb navigation. Expert users navigate laterally and need to reorient. |
| **Search** | Site-wide search must be available and performant. Pharma users often search for specific terms (drug names, regulatory references, therapeutic areas). |

---

## E. Missing Pages Analysis

### Pages the Current ArcaScience Site Lacks

The current ArcaScience site structure (`Our Platform | Decision Intelligence | Our Team | Contact | Vision | About Us | Join Us | Publications/Reports | FAQ | News` with placeholder use case content) has significant gaps when compared against best-in-class enterprise healthtech platforms (Veeva, IQVIA, Medidata) and pharma buyer expectations.

---

#### 1. Security & Compliance Section (Entire Section Missing)

**Current state:** No dedicated security, compliance, or trust pages exist.

**Why it matters:** Every enterprise pharma procurement process requires vendor security assessment. Without a Security & Compliance section, ArcaScience forces prospects to request this information manually, adding friction and extending sales cycles. Competitors like Veeva prominently display SOC 2, ISO 27001, and GxP compliance. IQVIA has an entire AI Governance framework visible on their site. A pharma company's IT security team, legal department, and procurement function will all visit this section as a prerequisite to approving any vendor. Its absence signals either immaturity or lack of awareness of enterprise requirements.

**Pages needed:**
- Security & Compliance Hub
- Trust Center (downloadable certifications and documentation)
- FDA 21 CFR Part 11 Compliance
- GDPR & Data Privacy
- Audit Trail & Data Integrity
- AI Governance Framework

---

#### 2. Case Studies (None Exist)

**Current state:** No case studies on the site despite having Sanofi, AstraZeneca, GSK, Takeda, and ICON as clients.

**Why it matters:** Case studies are the single most influential content type for B2B pharma buyers during vendor evaluation. When a VP of Drug Safety at a mid-size pharma sees that ArcaScience delivered measurable results for Sanofi or AstraZeneca, the credibility transfer is immediate. Without case studies, ArcaScience's client logos are unsubstantiated name-drops. Case studies provide the proof layer that converts evaluators into demo requesters.

**Pages needed:**
- Case Studies Hub (filterable)
- Individual case study pages (minimum 4-6 at launch)

---

#### 3. Role-Based / Audience-Specific Solution Pages (None Exist)

**Current state:** Use cases are organized only by lifecycle phase, and those are placeholder content.

**Why it matters:** Pharma buyers search for solutions relevant to their role, not just their drug's development phase. A VP of Drug Safety and a Head of Market Access have completely different needs from the same platform. Veeva organizes by role (Clinical, Regulatory, Safety, Quality, Medical, Commercial). IQVIA segments by function. Without role-based pages, ArcaScience forces every visitor to mentally translate generic platform descriptions into their specific context, which most won't bother doing.

**Pages needed:**
- For Drug Safety & Pharmacovigilance Leaders
- For Regulatory Affairs
- For Clinical Operations
- For Market Access & HEOR
- For Chief Medical Officers

---

#### 4. Therapeutic Area Pages (None Exist)

**Current state:** No therapeutic area content despite claiming 12 TA coverage.

**Why it matters:** Pharma professionals think in therapeutic areas. An oncology safety lead wants to know: "Does this platform have depth in oncology data? Has it been used for oncology submissions?" Without TA-specific pages, ArcaScience cannot capture organic search traffic for queries like "AI benefit-risk analysis oncology" and cannot demonstrate TA-specific expertise.

**Pages needed:**
- 12+ therapeutic area pages
- All Therapeutic Areas hub page

---

#### 5. Validation & Methodology Page (Missing)

**Current state:** No page explaining how AI models are validated, tested, or benchmarked.

**Why it matters:** AI in pharma faces a trust deficit. Regulatory professionals and safety scientists will not recommend a platform they cannot defend to their regulators. The single most important trust-building page for a scientific audience is the one that explains validation methodology. IQVIA publishes their "Healthcare-grade AI" validation framework. Medidata publishes trial assurance methodology. ArcaScience's 24 proprietary AI models are a differentiator, but without visible validation evidence, they're a liability.

**Pages needed:**
- Validation & Methodology (how AI models are validated)
- AI Models (detailed model descriptions and performance)

---

#### 6. Integrations & Interoperability Page (Missing)

**Current state:** No integration information.

**Why it matters:** Enterprise pharma companies run complex technology ecosystems: Veeva Vault Safety, Oracle Argus, IQVIA Vigilance, various EDC systems, RIM systems. The first question any IT evaluator asks is: "Does this integrate with what we already have?" Without an integrations page, ArcaScience appears to be a standalone tool rather than an enterprise-ready platform. This is a procurement blocker.

**Pages needed:**
- Integrations & Interoperability page
- Technical Documentation / API reference

---

#### 7. ROI Calculator (Missing)

**Current state:** Performance metrics are mentioned but not interactive.

**Why it matters:** Pharma evaluation processes require internal business cases. A director who sees "70% cost reduction" needs to translate that into their specific context: "What does that mean for my 8-person PV team processing 25 PSURs per year?" An interactive ROI calculator lets evaluators build their own business case with organization-specific inputs, generating a downloadable report they can present to their CFO. This is a proven conversion tool in enterprise B2B SaaS.

**Pages needed:**
- ROI Calculator (interactive tool)

---

#### 8. Regulatory Intelligence / Thought Leadership Blog (Weak)

**Current state:** "News" page exists but appears to be company announcements, not regulatory intelligence or thought leadership.

**Why it matters:** Pharma professionals actively seek regulatory intelligence -- tracking FDA, EMA, and PMDA guideline changes, new requirements, and industry trends. A dedicated regulatory intelligence feed positions ArcaScience as a thought leader and creates a reason for repeat visits. IQVIA's blog and regulatory update feeds are among their highest-traffic pages. This is also the primary SEO content engine for the site.

**Pages needed:**
- Blog / Insights (thought leadership)
- Regulatory Intelligence feed
- Webinars & Events page

---

#### 9. Scientific Advisory Board Page (Missing)

**Current state:** "Our Team" exists but no SAB is visible.

**Why it matters:** A Scientific Advisory Board signals that the platform's methodology has been reviewed and endorsed by recognized experts. For a company claiming 24 proprietary AI models in pharmacoepidemiology, the absence of a visible SAB raises questions about scientific governance. Competitors prominently feature advisory boards with KOL credentials.

**Pages needed:**
- Scientific Advisory Board page

---

#### 10. Investor Relations Page (Missing)

**Current state:** No dedicated investor content despite having raised $7M+ from institutional investors.

**Why it matters:** ArcaScience has institutional investors (The Moon Venture, Pleiade Venture, Plug&Play, Bpifrance) and may be raising again. A dedicated investor page with funding history, board composition, market opportunity, and contact information serves both current investor relations and future fundraising. It also signals financial stability to enterprise pharma buyers who care about vendor longevity.

**Pages needed:**
- Investors page

---

#### 11. Partners & Ecosystem Page (Missing)

**Current state:** Partners not visible despite having ICON and Paris Brain Institute as named collaborators.

**Why it matters:** Enterprise pharma buyers evaluate vendors within their broader ecosystem. "Who do you partner with?" and "Can I use you alongside my existing CRO?" are standard evaluation questions. A Partners page also enables co-marketing with integration and data partners, expanding reach.

**Pages needed:**
- Partners & Ecosystem page

---

#### 12. Webinars & Events Page (Missing)

**Current state:** No visible webinar or event content.

**Why it matters:** Webinars are the highest-engagement content format in enterprise pharma B2B marketing. They provide a low-commitment way for evaluators to see the platform in action before requesting a formal demo. On-demand recorded webinars serve as evergreen content assets. Conference appearances signal industry presence.

**Pages needed:**
- Webinars & Events page (upcoming + on-demand)

---

#### 13. Accessibility Statement (Missing)

**Current state:** No accessibility statement.

**Why it matters:** Enterprise pharma companies increasingly include accessibility compliance (WCAG 2.1 AA) in vendor assessments. Additionally, certain US federal procurement requirements (Section 508) mandate accessibility. European Accessibility Act requirements are also expanding. The absence of an accessibility statement can be a procurement disqualifier.

**Pages needed:**
- Accessibility Statement

---

#### 14. Output-Specific Pages (Missing)

**Current state:** The platform is described generically. Individual output types (PSUR, RMP, CTD 2.5, HEOR) do not have dedicated pages.

**Why it matters:** A regulatory affairs professional searching for "automated PSUR generation" needs to land on a page that speaks specifically to PSUR automation, not a generic platform overview. Output-specific pages serve as high-intent organic search landing pages and provide the depth evaluators need to assess fit for their specific workflow.

**Pages needed:**
- PSUR/PBRER Generation
- Risk Management Plans
- CTD Module 2.5
- HEOR Reports
- Signal Detection Reports

---

#### 15. Glossary (Missing)

**Current state:** No glossary.

**Why it matters:** A glossary of BRA terms serves dual purposes: (1) SEO capture of informational queries ("what is benefit-risk analysis," "PSUR definition," "pharmacovigilance signal detection") that drive top-of-funnel traffic, and (2) user utility for cross-functional teams who may not be BRA specialists. This is a proven SEO strategy in specialized B2B domains.

**Pages needed:**
- Glossary of BRA Terms

---

### Summary: Gap Severity Assessment

| Gap | Business Impact | Urgency |
|---|---|---|
| Security & Compliance | Deal-blocking; procurement cannot approve | Critical |
| Case Studies | Conversion-blocking; no proof layer | Critical |
| Role-Based Solution Pages | Discovery-blocking; visitors can't self-serve | High |
| Output-Specific Pages | SEO and conversion loss | High |
| Validation & Methodology | Trust-blocking for scientific audiences | High |
| Integrations | Procurement and IT blocker | High |
| Therapeutic Area Pages | SEO loss, credibility gap | Medium-High |
| ROI Calculator | Business case builder missing | Medium-High |
| Regulatory Intelligence Blog | SEO engine, thought leadership gap | Medium |
| Scientific Advisory Board | Scientific credibility signal | Medium |
| Investor Relations | Fundraising and stability signal | Medium |
| Partners & Ecosystem | Ecosystem credibility | Medium |
| Webinars & Events | Engagement and mid-funnel gap | Medium |
| Accessibility Statement | Procurement compliance | Medium |
| Glossary | SEO, user utility | Lower |

---

## Appendix: Page Count Summary

| Section | Page Count |
|---|---|
| Home | 1 |
| Platform (incl. all sub-pages) | 15 |
| Solutions (phases + TAs + roles) | 24 |
| Evidence | 10+ (grows with case studies) |
| Company | 14 |
| Resources | 9 |
| Legal & Utility | 6 |
| **Total** | **~79 pages** |

This is consistent with best-in-class enterprise healthtech platforms. Veeva's site has 200+ pages. IQVIA has 500+. At 79 pages, ArcaScience has comprehensive coverage without content bloat.

---

*This architecture is designed to serve a Head of Drug Safety at Novartis who needs to find PSUR automation proof in under 60 seconds, a VP of Regulatory at Pfizer who needs compliance documentation for procurement, and an ML engineer in Paris who wants to understand the technical challenge before applying. All from the same site, all within three clicks.*
