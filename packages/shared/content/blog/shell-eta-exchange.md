---
title: "Architecting Shell's ETA Exchange: Email Ingestion That Maritime Ops Can Trust"
description: "How I turned a proof of concept for extracting voyage timestamps from masters' emails into a secure, human-led machine-assisted platform roadmap."
draft: false
external: false
date: 2024-02-28
order: 7
tags:
  - project
  - architecture
---

Shell Shipping & Maritime asked me to prove whether ETA Exchange—an email ingestion and NLP pipeline for voyage timestamps—could work in the real world. I owned the architecture, security posture, and ML stack that made the proof of concept credible and gave Shell a path to production.

## Designing the Platform

- **Segregated ingestion.** I designed a private-cloud setup with ingress, segregated mail retrieval, VPN-backed identity, and redundant SQL storage so vessel masters' emails stayed compliant from day one.
- **Composable services.** Mail retrieval, NLP parsing, and report analysis ran as discrete microservices behind an API gateway, giving operators a clear control plane and future consumers a stable REST interface.
- **Human-led machine-assisted workflow.** I formalised how analysts approve or correct extracted timestamps, capturing feedback loops that keep accuracy at 100% while the models learn.
- **Observability** came baked in with Prometheus and Grafana so we could prove operational viability before scaling usage.

## Making the Models Useful

Rules-only parsing collapsed once we saw how varied noon reports really are, so I pivoted the PoC toward a combined machine learning + rules engine. I curated the datasets, coordinated specialist support, and delivered iterations that benchmarked well across AAMIRA, AL NUAMAN, AL KHATTIYA, and other vessels.

## Running the Engagement

I coordinated the cross-functional team—backend engineers, data scientists, and partners like PortXchange—while staying the technical face for Shell. Weekly demos exposed parser coverage, governance packs kept risks visible, and rollout workshops aligned commercial, freight, and digital stakeholders on what production would require.

## Outcomes

- Proved the extraction stack could deliver accurate ETA/ETD timestamps from unstructured email content.
- Documented the runway from desirability trials to a human-led launch and eventually machine-led operations.
- Delivered the architectural blueprint Shell needs to turn ETA Exchange into a market-ready service without guessing where the risks hide.

Maritime ops run on trust. By pairing disciplined architecture with human-in-the-loop safeguards, I showed Shell how to automate timestamp intelligence without gambling on data quality or compliance.
