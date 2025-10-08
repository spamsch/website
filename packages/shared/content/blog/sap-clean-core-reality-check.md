---
title: "Clean Core Reality Check: Why It’s Hard for Big SAP Landscapes"
description: "The gap between SAP's Clean Core promise and the messy reality of enterprise brownfield systems with decades of custom code — and how BTP helps close it."
draft: false
external: false
date: 2025-10-02
order: 3
tags:
  - musing
  - sap
  - enterprise-architecture
---

When SAP describes **Clean Core**, it evokes a future: minimal kernel modifications, side-by-side extensions, and upgrades that “just work.” It’s the right direction. But in large brownfield environments, reality rarely cooperates. Having spent years architecting on SAP BTP, HANA, and connected services, I see Clean Core less as a code hygiene program and more as an **integration architecture challenge**. This is a reality check — and a pragmatic view of how to use BTP to make Clean Core achievable in practice.

## My Lens: Experience First, Theory Second

Before “Clean Core” was branded as a strategy, I already applied the same principle successfully as an architect: isolate the ERP core, externalize orchestration, and integrate via clear contracts. In early times RFCs, DIAG and Dynpro were the best choices. Now it is like this: The core handles transactions; BTP and its services handle intelligence, coordination, and user interaction. That separation works — but only if the boundaries are explicit and governed.

When SAP introduced the **four extensibility levels (A–D)**, it formalized what many architects had been doing informally: treating the ERP core as a stable nucleus, with different degrees of permissible coupling around it. For someone coming from BTP architecture, this classification finally connects to real deployment design.

## SAP’s Four Levels: A More Granular Clean Core

| Level | Description | Use Cases / Risk |
|-------|--------------|------------------|
| **A** | The cleanest form — in-core ABAP Cloud or side-by-side on BTP using released APIs, events, or OData services | Ideal for extensions, analytics, or automation without touching the kernel |
| **B** | Classic ABAP using officially released APIs, BAdIs, or framework exits | Transitional zone where core still hosts logic under guardrails |
| **C** | Involves internal or unreleased objects, wrapped or tracked with caution | Needed when no public interface exists; document and monitor rigorously |
| **D** | Non-compliant: modifications or implicit enhancements | Should be eliminated or sandboxed out of upgrade-critical paths |

## Why Enterprises Struggle to Achieve Clean Core

### 1. Deep Legacy Entanglement
Custom logic is interwoven with standard processes. Detangling it safely is expensive and can jeopardize existing business behavior.

### 2. Missing or Unreleased Extension Points
Many classic SAP modules still lack event exposure or APIs. Without those, the only clean way out is replication or abstraction.

### 3. Governance Overhead
Clean Core is not only a coding rule but a process discipline — requiring code reviews, ATC checks, change control, and documentation.

### 4. Latency and Data Integrity
Offloading computation to external systems introduces latency and potential data drift. BTP can mitigate this, but only if you design sync patterns and event pipelines correctly.

### 5. Migration & Inertia
Auditing, refactoring, and replacing legacy custom code takes time, budget, and buy-in. Without executive alignment, progress stalls.

### 6. Organizational Distrust
Some stakeholders interpret Clean Core as SAP’s way to centralize control. The truth is simpler: it’s a technical necessity for continuous delivery in hybrid landscapes.

## Where BTP Becomes the Enabler

### 1. Clean Extension Layer
BTP is the **landing zone for extension logic** that doesn’t belong inside S/4HANA. CAP (Cloud Application Programming Model) or Kyma workloads provide managed runtime environments for microservices that consume and expose released SAP APIs.  

- **CAP for structured extensions:** build service layers around released APIs, OData, or CDS views.  
- **SAP Build and UI5:** push user experience adaptations off the ERP stack.  
- **Event Mesh and Integration Suite:** decouple synchronous core calls into asynchronous processes, protecting upgrade stability.

### 2. Data Persistence & Analytics
HANA Cloud on BTP can serve as the **extension data layer** — hosting analytical replicas, pre-aggregations, or cross-system joins without polluting the transactional schema.  

- Mirror relevant business objects via Change Data Capture (CDC) or ODP.  
- Create virtual tables or federated queries for read-only insight.  
- Keep heavy computations (aggregation, forecasting, scoring) out of ERP memory.  

This shifts performance and innovation pressure off the core while keeping data accessible with low latency.

### 3. Integration Governance
SAP Integration Suite, combined with API Management, provides a **policy-driven perimeter** for Clean Core. You can define:

- Which APIs are released for external use.  
- Who can consume them and how they’re versioned.  
- How backward compatibility and change tracking are enforced.

This is architectural Clean Core, not code-level purity — but it’s equally critical.

### 4. Continuous Compliance
With CI/CD on BTP (via Cloud Transport Management or GitLab pipelines), you can automate static analysis and ATC scans for all ABAP Cloud or CAP services before transport. That ensures compliance to Clean Core rules at build time rather than after deployment.

### 5. Gradual Offloading Strategy
Use BTP to **depressurize the core incrementally**:

- Start with low-risk modules like reporting, analytics, or workflow automation.  
- Externalize step by step: pricing logic → document generation → approval flows → custom UI components.  
- Retain transactional integrity in S/4 while moving orchestration and intelligence to BTP.  

Over time, BTP becomes your extensibility perimeter — the zone where new innovation happens without touching the ERP kernel.

## A Pragmatic Playbook

### Measure First
Inventory custom code with the Custom Code Migration app or Readiness Check. Classify by coupling, business value, and migration difficulty. Map to the A–D levels.

### Selective Refactoring
- Push modular logic outward to CAP, Integration Suite, or Functions.  
- Keep performance-critical routines in ABAP Cloud via released APIs.  
- For unreleased internals, use a façade and treat it as managed debt.

### Enforce Guardrails
Implement ATC with custom rules to detect internal calls. Maintain an extension registry that records the level (A–D), business owner, and lifecycle plan for each artifact.

### Continuous Remediation
Reassess after every upgrade cycle. Move Level C/D artifacts upward where possible. Include Clean Core compliance in change advisory boards.

### Accept Compromise
Clean Core isn’t binary. It’s iterative debt reduction. The point is not zero custom code but **controlled, observable, and upgrade-stable custom logic**.

## The Real Architectural Lesson

Clean Core is not a constraint; it’s an **operating model for evolution**.  
BTP, when used as the integration and innovation layer, makes that evolution sustainable. It offers the elasticity, tooling, and decoupling the ERP core was never designed for.

Treat Clean Core as a journey where the ERP kernel becomes leaner, BTP becomes richer, and enterprise agility improves through separation of concerns. The outcome is not just technical cleanliness — it’s operational resilience and architectural freedom.

## From the Field: Clean Core in Practice

Below are concrete snapshots where I’ve architected SAP solutions and steered Clean Core from slideware into operating reality. Some are lightly anonymised; one is a composite to illustrate common decisions.

### Trade Finance on BTP (Real)

- Context: Multi‑tenant BTP platform for factoring and treasury workflows. I owned the landscape: XSUAA roles/scopes, approuters, Spring services, and HANA Cloud schemas. Connectivity bridged to S/4HANA via destinations and principal propagation.
- Clean Core stance: All workflow orchestration lived in CAP/Spring (Level A). S/4 exposure limited to released APIs and events for postings, business partners, and attachments (Level A/B). No kernel mods.
- What made it hard: Legacy spreadsheets encoded eligibility rules. Business wanted “the same behavior.” We translated rules into explicit services and versioned contracts, then ran them in shadow mode before cutover.
- What worked: API Management as the perimeter and CTMS/GitLab pipelines enforcing evidence at every promotion. Upgrades became routine because the core surface area stayed small.
- Result: We shipped without touching the kernel, passed independent pen tests, and kept auditors happy with deterministic runbooks and point‑in‑time recovery rehearsals.

### RFID Laundry at 60M Events/Week (Real)

- Context: Industrial IoT workload on BTP Kyma. NATS queues ingested RFID scans; hot data in HANA Cloud, warm in SAP IQ. Legacy ERP remained the record for some master data.
- Clean Core stance: ERP integrations used governed REST semantics; no direct table writes. Orchestration, dedupe, replay, and analytics sat outside the core (Level A). Where the proxy system spoke proprietary payloads, we applied a canonical vocabulary and adapters.
- What made it hard: Master data heterogeneity and bursty ingestion from gateways. Pushing “clever logic” into ERP would have been tempting—but wrong for upgrades and scale.
- What worked: Event‑first design, tiered storage, and a stable contract that mobile apps, customer portals, and ERP all shared. We could evolve features without renegotiating ERP internals.

### Pricing & Approvals Strangler (Composite)

- Context: Brownfield S/4 with decades of Z‑pricing, PDF generation, and approval exits.
- Clean Core move: Externalised pricing adjustments and approvals to CAP services on BTP (Level A); kept a small ABAP Cloud wrapper to subscribe to business events and publish decisions back via released APIs (Level A/B).
- Managed debt: One edge case required an unreleased read for batch determination. We encapsulated it behind a façade, logged usage, and set a remediation target (Level C treated as temporary).
- Result: Document creation, approvals, and “special pricing” logic moved out of upgrade paths. When S/4 upgraded, the ABAP wrapper and CAP contracts remained stable.

## Patterns That Keep Me Out of Level D

- Event the seams: Prefer events + idempotent consumers over deep synchronous calls across the core boundary.
- Façade any internals: If you must touch unreleased objects, wrap them, tag them (owner, risk, removal plan), and monitor at runtime.
- Shadow before cutover: Run externalised logic in observe‑only mode to build confidence without risking business flow.
- Registry for extensions: Maintain an inventory of Level A–D artifacts with owners, SLAs, and audit notes; review after every release.
- API perimeter first: Put API Management in front of S/4 and BTP services early; how you expose and version today determines your upgrade pain later.

## Anti‑Patterns I Avoid

- “Tiny change in the core” for speed that becomes a permanent D‑level dependency.
- UI embedded in ERP for workflows that belong in BTP apps.
- Point RFCs that bypass governance instead of using destinations and released interfaces.
- Analytical joins in the transactional schema when HANA Cloud or federation fits better.

## A Final Reality Check

You don’t adopt Clean Core by decree—you earn it release by release. In the projects above, the win wasn’t zero custom code; it was relocating intent: transactions in S/4, orchestration and intelligence on BTP, with clear contracts between them. That’s the version of Clean Core that survives audits, upgrades, and growth.
