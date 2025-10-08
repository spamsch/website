---
title: "Clean Core Reality Check: Why It’s Hard for Big SAP Landscapes"
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

When SAP describes **Clean Core**, it evokes a future: minimal kernel modifications, side-by-side extensions, and upgrades that “just work.” That’s a worthy vision. But having worked across many large enterprises with decades of tangled custom code, I see a persistent gap between that promise and what’s feasible. This is my reality check: what breaks, what can be salvaged, and how to chart a pragmatic path forward.

## My Lens: Experience First, Theory Second

Long before “Clean Core” became SAP’s branded concept, I led projects where we followed its spirit: isolate custom logic, limit coupling, and treat architectural hygiene as a deliverable. Over time, I’ve seen what works, what fails, and how SAP’s evolving model dovetails (or clashes) with real technical debt.

Because of that experience, when SAP recently refined Clean Core into four extensibility levels — A, B, C, and D — I recognized it as a more useful framing for what I’d instinctively practiced. But it also reveals exactly where many teams get stuck.

## SAP’s Four Levels: A More Granular Clean Core

SAP has moved away from a binary “clean vs dirty” view. The new model defines:

| Level | Description | Use Cases / Risk |
|-------|--------------|------------------|
| **A** | The cleanest form — in-core ABAP Cloud or side-by-side CAP / SAP Build using released APIs and extension points | Best for new logic, lightweight enhancements, future-proofing |
| **B** | Classic ABAP using officially released APIs, BAdIs, exits, frameworks | Goes beyond what Level A can cover, but sticks to supported paths |
| **C** | Involves internal or unreleased objects, wrapped or tracked with caution | A “conditional” zone — allowed with governance and changelog discipline |
| **D** | Non-compliant: system modifications, implicit enhancements, unsupported techniques | Declared “dirty core” territory to avoid or remediate |

This shift matters. It gives you a **scale** to reason about trade-offs rather than an all-or-nothing judgment. In mature landscapes, few reach “pure A”; many settle between **A + B + C** with continuous cleanup.

## Why Enterprises Struggle to Achieve Clean Core

### 1. Deep Legacy Entanglement
Decades of enhancements often weave custom logic into the standard flow. Untangling that is dangerous and expensive. Sometimes you break visible behavior; sometimes you break hidden side effects.

### 2. Missing or Unreleased Extension Points
The kernel logic you need to tweak may have no released API, BAdI, or event. You either wrap it, re-implement, or file influence requests with SAP. That gap forces compromises.

### 3. Governance Overhead Is Real
Clean Core demands discipline: code reviews, ATC checks, extension registries, change tracking. Many organizations don’t have the structure or culture to sustain this long term.

### 4. Latency, Consistency, Reliability
Moving logic off-core (via APIs or microservices) introduces latency, failure modes, and consistency challenges. For high-frequency, tightly coupled operations, side-by-side isn’t always acceptable.

### 5. Migration & Debt Inertia
Auditing, refactoring, validating, and replacing custom code is expensive — especially when some enhancements are low visibility but high risk. Some get “frozen” rather than touched.

### 6. Skepticism & Politics
Some view Clean Core as SAP trying to constrain flexibility. That perception, regardless of validity, slows adoption.

## What Happens in Practice

- You uncover “innocent-looking” custom objects that depend on core internals.  
- Attempts to externalize yield brittle seams rather than clean decoupling.  
- Governance slips: “just this patch” becomes normalized.  
- Latency or sync issues surface in production.  
- Upgrades still hurt because some Level C/D artifacts persist.

Most real SAP estates end up somewhere in a “guarded custom” zone, not a pristine core.

## A Pragmatic, Experience-Grounded Playbook

### 1. Measure First
Use SAP’s Custom Code Migration app or Readiness Check to inventory all custom objects, annotate usage, coupling, and degree of reliance on released APIs.  
Classify each artifact into A / B / C / D using SAP’s API or Repository tools.

**Hands-on pattern:** export the code list, score each on complexity, frequency, API usage, and risk. Shade into green (safe to externalize), yellow (needs vetting), red (stay internal for now). That heat map frames your roadmap.

### 2. Selective Refactoring
- Push modular, loosely coupled logic outward (BTP, CAP) when possible.  
- For high-throughput or latency-sensitive routines, keep them in-core (via ABAP Cloud) using released APIs.  
- Where no released API exists, wrap internals behind facades, log influence requests, and treat them as **temporary Level C debt**.

**Example:** a pricing routine executed thousands of times per hour stays in-core via a released BAdI with unit tests and monitoring. A monthly report runs in CAP off-core.

### 3. Enforce Guardrails
- Define a clear taxonomy: which extension types are allowed (key user, ABAP Cloud, side-by-side).  
- Configure ATC with custom checks to block nonreleased object access or direct kernel modifications.  
- Maintain an extension registry mapping each custom object to its business owner, risk level, and remediation plan.

### 4. Continuous Remediation
- After each patch or upgrade, rescan custom objects.  
- Record violations or drift and create backlog stories.  
- Include a “clean core impact review” in new feature design: Will this new work fit into Level A/B? If not, document why.

### 5. Embrace Pragmatic Trade-Offs
- Aim for directionality over perfection.  
- Accept some Level C artifacts temporarily (with strong governance).  
- Never normalize Level D. Treat it as debt to be paid.  
- Gradually push your estate toward safer, upgradeable forms.

### 6. Leverage SAP’s Conceptual Guidance
SAP’s four-level model gives clarity about boundary conditions and risk tiers. It legitimizes incremental approaches and helps structure stakeholder discussions.  
Use SAP tools like the API Hub and Cloudification Repository to classify objects into levels A–D.

Also remember: Clean Core is not about zero custom code — it’s about **controlled, decoupled, upgrade-safe custom logic** rather than hacks.

## Summary: Clean Core as a Journey, Not a Destination

Clean Core is a powerful, necessary ideal. But in large, brownfield SAP landscapes, reaching “100% clean” is unlikely. The true value lies in incremental improvement: reduce coupling, limit drift, enforce guardrails, and continuously push your custom estate toward safer extensibility modes.

Your goal isn’t fanatical purity — it’s sustainable evolution. Over time, you decrease risk, improve upgrade resilience, and make innovation safer, not more painful.