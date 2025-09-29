---
title: "Modernising WTA Baseline Without Missing a Tournament"
description: "Replacing ICAD with containerised .NET services, Vue interfaces, and Azure analytics—while rankings, prize money, and player operations kept running."
draft: false
external: false
date: 2024-04-12
order: 5
tags:
  - project
---

Baseline sits at the heart of the WTA tour. Acceptance lists, prize money, rankings, and player support all hinge on it. When I was asked to retire the decades-old ICAD system, failure wasn't an option—players still expect rankings every Monday morning. I owned the architecture for every component we touched—from the containers we shipped to the analytics pipelines that fed regulators.

## Keeping the Tour Moving

- **Zero downtime tolerance.** Tournaments, regulators, and broadcasters rely on fresh data. We planned migration waves around competition calendars and provided fallbacks for every service cutover.
- **Hybrid data reality.** Sybase remained the system of record; Azure SQL shouldered analytics and modern features. We built connectors and caching layers that respected both worlds.
- **Stakeholders beyond engineering.** Operations, KPMG and ITF all had skin in the game. Roadmaps, risk logs, and comms packs turned architecture into a shared conversation.

## Architecture In Practice

1. **Modular services on Kubernetes.** I containerised .NET Core domains—tournaments, finance, player services—and defined their interface contracts so teams could iterate independently while still deploying to a unified Azure footprint.

2. **Data orchestration with guardrails.** I designed ODBC/Dapper bridges to pull from Sybase, built validation services to reconcile deltas, and curated Azure SQL views to feed Power BI without letting legacy quirks leak everywhere.

3. **Security uplift baked in.** I led the Azure AD SSO rollout, scoped the APIs, and drove targeted remediation (including the OMIGOD review) so the new platform didn't just match ICAD—it surpassed it in resilience.

4. **Reporting foundation from day one.** I delivered curated aggregates, a masquerading exporter, and automated CSV pipelines so weekly reports and regulator submissions kept flowing.

## Delivery Moments That Matter

- **Acceptance lists and rankings automated** with parameterised rules I crafted, freeing operations to focus on edge cases instead of spreadsheets.
- **Player development tooling rebuilt** after I reverse engineered legacy PowerBuilder screens, giving coaches and analysts a richer experience.
- **ITF imports unblocked** through patient stakeholder work—sometimes diplomacy and late-night SQL tweaks from me went hand-in-hand.
- **Visibility for leadership.** I translated backlog burn-downs into tour-level assurances, building trust during a sensitive transition.

## Lessons Worth Sharing

Replacing mission-critical systems is as much about governance as code. By pairing containerised services with relentless communication, I delivered a modern platform end-to-end without missing a single tournament deadline. Today Baseline is a foundation the WTA can evolve instead of a liability they tiptoe around.
