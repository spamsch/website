---
title: "Designing a RFID Laundry Platform for 60 Million Weekly Scans"
description: "How I engineered a SAP BTP architecture that ingests 60 million RFID events per week while staying fast, governable, and ready for SaaS expansion."
draft: false
external: false
date: 2023-11-05
order: 6
tags:
  - project
---

When a customer asked me to digitise industrial laundry logistics, the brief sounded deceptively simple: ingest every garment scan, keep customer analytics sub‑10 seconds, and do it on SAP Business Technology Platform. In practice that meant handling ~60 million RFID events every week, harmonising legacy ERP semantics, and proving a roadmap from MVP to SaaS.

## Framing the Challenge

- **Volume at the edge:** 12 million garments scanned five times a week; events arrive in bursts from data gateways.
- **Heterogeneous master data:** Proprietary system still mediates on‑prem ERP payloads that need to coexist with new cloud services.
- **Analytics without lag:** Warehouse teams, sales, and customers expect dashboards and alerts in under ten seconds.
- **Regulated operations:** Access models, retention rules, and audit trails must satisfy industrial customers across Europe.

## Architecture Decisions That Held Up

1. **Kyma for event-first services.** I stood up a microservice mesh on SAP BTP Kyma with NATS queues as the ingestion backbone. Functions normalise payloads, stamp metadata, and route events into downstream processors without blocking edge gateways.

2. **Tiered storage strategy.** I kept hot data in SAP HANA Cloud with columnar compression and adaptive indexes. Once utilisation hit 40 %, scripted jobs aged events into SAP IQ so ad‑hoc analytics still performed while costs stayed predictable.

3. **Governed APIs over BISS semantics.** I reused the canonical vocab from the legacy proxy so mobile apps, customer portals, and ERP integrations speak the same language. Token‑secured REST endpoints expose inventory, route, and SLA KPIs without double modelling.

4. **Infrastructure as a product.** I treated subaccounts, CI/CD, monitoring, and runbooks as first-class deliverables. Provisioning packs captured network layouts, identity trust, and release cadences so bardusch operations could adopt the platform without hand-holding.

## Delivery Highlights

- **Ingestion readiness:** I had 90 % of the NATS-backed pipeline production-ready before mass device rollout, complete with dedupe, replay, and fault simulation.
- **Master data services:** Customer and inventory APIs reached 60 % functional coverage with documentation and Postman collections I walked through with the business.
- **Operational tooling:** I directed the Kyma admin UI modules so support teams could inspect events, monitor hardware health, and manage tenants without direct database access.
- **Stakeholder alignment:** Weekly artefacts—architecture dashboards, KPI workshops, and a living wiki—kept bardusch leadership, logistics, and IT on the same page, even when early hardware delays threatened timelines.

## What I Took Forward

Large-scale IoT on SAP BTP works when you treat ingestion, storage, and documentation as one system. By baking governance and observability into the first release, I gave the customer a platform they can scale, repackage as SaaS, and hand over to operations with confidence. That blueprint has since become my default playbook for high-volume, compliance-heavy data platforms.
