---
title: "Clean Core Reality Check: Why It's Hard for Big SAP Landscapes"
description: "The gap between SAP's Clean Core promise and the messy reality of enterprise brownfield systems with decades of custom code."
draft: false
external: false
date: 2025-10-02
order: 3
tags:
  - musing
  - sap
  - enterprise-architecture
---

When SAP talks about Clean Core, they paint an image: minimal custom code in the ERP kernel, most business logic pushed outward into side-by-side extensions, and upgrades that "just work." It sounds compelling. But after working in large enterprises with decades of customization, I see a gap between promise and feasibility. This is a reality check from a cloud development architect's lens: what fails in the rhetoric, what works in practice, and how to get pragmatic progress.

## The Ideal vs. the Chaos in Real Landscapes

### What SAP claims Clean Core will deliver

- **Upgrade-safe core:** fewer regressions because standard code isn't touched
- **Side-by-side extensibility:** new features live outside the kernel (BTP, APIs, events)
- **Ongoing pruning:** custom artifacts get audited, deprecated, or refactored
- **Governance guardrails:** new custom code must adhere to rules, use released APIs
- **Better agility:** innovation decoupled from core release cycles

These are valid goals. SAP emphasizes that Clean Core is not *no custom code ever*, but controlled, upgrade-friendly custom code. Clean Core means decoupled, upgrade-stable extensions, not the elimination of all customizations. 

### Why many enterprises struggle to live the ideal

**1. Deep, entangled legacy code**  
Custom logic often merges into SAP's standard paths, depends on internal implementation details, or tweaks behavior at granular hooks. Extracting such logic is risky, expensive, and sometimes impossible without breaking behavior.

**2. Unexposed extension points**  
ABAP Cloud only permits usage of publicly released APIs and objects. Some business rules touch standard modules that have no released API or event hook. If none exists, the only options are wrapping, re-implementation, or submitting an influence request to SAP. 

**3. Operational cost of governance**  
Discipline is required: code reviews, static checks, architecture oversight, custom-object registries. ATC (ABAP Test Cockpit) is SAP’s standard enforcement tool for Clean Core and ABAP Cloud compliance, but many organizations lack the maturity or resources to sustain this rigor. 

**4. Performance and consistency constraints**  
Offloading logic into remote services or APIs introduces latency, network failure risks, and data consistency challenges, especially for high-frequency transactions or tightly coupled operations. SAP’s own guidance suggests using Embedded Steampunk (ABAP Cloud on-stack) for high-throughput or tightly coupled cases, and side-by-side extensibility for decoupled innovation. 

**5. Migration & legacy inertia**  
For brownfield landscapes, the initial cost of auditing, refactoring, validating, and replacing existing custom code is large. Some pieces are "stuck"—too risky to refactor.

**6. Strategic distrust**  
Some believe Clean Core is SAP's way to limit customer flexibility or force conformity. That suspicion is stakeholder perception rather than SAP policy—but it remains a real factor in adoption debates.

## What Actually Happens When You Try Clean Core

- You find many custom objects you thought were innocuous are heavily dependent on core internals.  
- Attempts to externalize logic introduce fragile integration seams rather than clean separation.  
- Custom-code drift creeps in despite governance—"just this one hack" becomes accepted practice.  
- Latency or data sync issues manifest in production because consistency guarantees were compromised.  
- The upgrade cycle still causes friction because residual custom patches or workarounds remain.  

In practice, achieving a pure Clean Core is rare. Most mature landscapes land somewhere in between: a mix of "safe core + guarded custom" with continuous remediation.

## What to Do Differently

### Measure first

- Use SAP’s **Custom Code Migration app** or SAP Readiness Check to inventory all custom artifacts.  
- Classify custom code by risk, coupling, business value, and refactorability.  
- Identify which custom logic is low-hanging: modular, loosely coupled, nonperformance-critical.  

**Example:** Run the Custom Code Migration app on your S/4HANA system. Export the findings, which include object type, scope, priority, and BTP/ABAP Cloud readiness. Build a spreadsheet with columns for complexity score, usage frequency, and whether it uses released APIs. Tag each enhancement as green (safe to externalize), yellow (needs deeper analysis), or red (tightly coupled, high migration risk). This heat map tells you where to invest effort first. 

### Selective refactoring

- Move modular logic to BTP or microservices where it fits cleanly.  
- Keep high-throughput, latency-sensitive logic closer to core; isolate and observe it.  
- Introduce facades or API wrappers to insulate core calls from external dependencies.  

**Example:** A pricing routine executing 10,000 times per hour during order entry will suffer if moved to an external service—latency and reliability matter more than architectural purity. Instead, implement it through a released Cloud BAdI and keep it in-core via ABAP Cloud. Add unit tests and monitor it closely. But a monthly sales aggregation report? Perfect for a CAP service on BTP with OData exposure—decoupled, testable, and upgrade-safe. 

### Enforce guardrails

- Define a taxonomy of extension types (key user, developer/ABAP Cloud, side-by-side).   
- Automate static analysis or code inspection to flag nonconformant modifications.  
- Maintain a registry of active custom artifacts and dependencies.  

**Example:** Configure ATC with a custom check variant that blocks direct access to standard tables, flags non-released function modules, and requires approval for kernel modifications. Integrate ATC into your CI/CD pipeline so violations surface automatically in code reviews. Maintain a central registry mapping every custom object to its business owner, risk tier, and planned remediation timeline. 

### Continuous remediation

- Every upgrade or patch cycle should include time to revisit custom code.  
- Debrief new custom work: what portion can be done cleanly? What will be technical debt?  
- Incorporate clean-core backlog items into your roadmap.  

**Example:** After each quarterly SAP Note cycle, run a two-day "custom code retrospective." Review what broke, which warnings appeared, and which deprecated APIs were flagged. Create backlog items to address them. For new development, mandate a "clean core impact assessment" during design: Will this use released APIs? Can it be built side-by-side? If not, document why and schedule a future refactoring story.

### Accept compromise

- You may never reach "100% clean core" in large systems; treat Clean Core as a direction, not a binary goal.  
- Decide which custom logic you will leave in place (with strong tests and isolation) and which you will refactor over time.  
- Focus on reducing risk, not chasing purity at prohibitive cost.  

**Example:** Suppose you have 15 custom user exits in a critical logistics module. Full externalization would take six months and risk destabilizing production. Instead, isolate those exits behind a facade layer, add regression tests, and version-lock dependencies. Treat this as "controlled technical debt" and allocate 10% of each sprint to incremental decoupling. SAP itself now frames Clean Core in “levels” of maturity, legitimizing incremental adoption rather than all-or-nothing purity. 

## The Bottom Line

Clean Core is a useful architectural ideal, especially when aligned with cloud principles. But in big, mature SAP landscapes, it is rarely achievable in full. The real task is to move incrementally: measure your custom debt, refactor what you can, enforce guardrails, and continually push the envelope. Your aim is less to declare "clean core achieved," and more to reduce coupling, limit drift, and gradually shift toward safer extensibility over time. 