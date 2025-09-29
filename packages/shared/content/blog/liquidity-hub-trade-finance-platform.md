---
title: "Running Trade Finance on SAP BTP"
description: "Designing a multi-tenant SAP BTP landscape with factoring workflows, CI/CD discipline, and disaster-recovery drills that keep financiers and regulators comfortable."
draft: false
external: false
date: 2024-06-10
order: 3
tags:
  - project
  - architecture
---

This project digitises trade finance for funders, trustees, and corporates. It’s part factoring engine, part treasury cockpit, and part compliance machine. My job as Cloud Development Architect was to architect every layer—approuters, Spring services, HANA schemas, integration paths, and operations—so every invoice, funding note, and audit trail lived in a platform stakeholders could trust. That required deep knowledge of SAP BTP primitives, from XSUAA and destinations to HANA Cloud sizing, to make the whole stack predictable under audit pressure.

## The Environment We Built

- **Three BTP landscapes.** I carved out separate subaccounts with dedicated approuters, Spring Boot services, and HANA schemas so upgrades never crossed wires.
- **XSUAA everywhere.** I defined role-based scopes to protect REST APIs, funding workflows, and admin consoles while keeping audit logs straightforward.
- **Connectivity to SAP S/4HANA.** I engineered destinations and connectivity services to bridge secure tunnels without leaking credentials or exposing brittle middleware.

## Workflows with Financial Discipline

1. **Factoring domain model.** I modelled FinanceDocuments to represent invoices, eligibility checks, and cash-out events, then orchestrated workflows that enforce segregation of duties and evidence capture for every transition.
2. **Promotion pipeline.** I set up GitLab automation to move changes from developer sandboxes → QA → customer UAT → production with mandatory test evidence at each gate.
3. **Disaster recovery.** I drafted and rehearsed the HANA point-in-time recovery plan, Cloud Foundry region failover, and human-in-the-loop runbooks during production DR drills.
4. **Pen test readiness.** I prepared OpenAPI specs, certificate packs, and hardening guides so independent testers could execute without surprises.

## Outcomes That Stuck

- **Launch readiness sign-off** from Orbian leadership thanks to the RACI charts, service desks, and incident playbooks I authored.
- **Design partners on-boarded** with confidence because they saw the same transparency in documentation that regulators expect.
- **Operations autonomy** once I handed over dashboards, logs, and alerting tuned to their workflows—not generic cloud metrics.

## Takeaway

Enterprise fintech is a trust business. By marrying SAP BTP services with disciplined engineering practices, I delivered a platform where auditors, funders, and developers can work together without friction. This project is proof that cloud agility and regulated environments aren’t mutually exclusive.
