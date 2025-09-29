---
title: "SAP Sailing Analytics: Turning Invisible Races into Data-Driven Spectacle"
description: "How I engineered SAP’s sailing analytics platform so fans, broadcasters, and crews could see the tactics unfolding in real time."
draft: false
external: false
date: 2023-07-22
order: 9
tags:
  - project
---

Sailing is notoriously hard to follow from the shore. When SAP partnered with the Extreme Sailing Series, we needed to make split-second maneuvers and invisible wind shifts visible to everyone. I architected SAP Sailing Analytics—from the first Kieler Woche prototype to Olympic-scale deployments—so telemetry, storytelling, and operations worked in concert.

## Engineering the Platform

- **Cloud-first, event-ready.** I designed geo-distributed AWS infrastructure with ALBs, WAF, Route53, and automated AMIs so we could spin up replicas for any regatta, anywhere, and recover in minutes when the weather—or the hardware—acted up.
- **Domain-driven services.** We transitioned from brittle Python scripts to a Java/OSGi + GWT architecture that exposes reusable services, automated builds, and comprehensive test coverage—critical when you’re upgrading mid-season.
- **Real-time pipelines.** Garmin, TracTrac, and Bravo sensors stream into event-driven pipelines (Lambda, S3, Redis) that I orchestrated to filter, enrich, and broadcast GPS fixes, foiling data, and wind estimations without choking under broadcast loads.

## Bringing the Race to Life

Raw telemetry is just numbers until you give it context. I co-shaped the domain model and caching strategy so head-to-head battles, mark roundings, and tactical shifts surface instantly on mobile dashboards, broadcast graphics, and coach tools. Fans see why a boat tacked early; crews review foil stability between races; commentators have data-backed stories instead of guesswork.

## Leading in the Field

For several seasons I was on site with race crews, SAP sponsorship leads, and broadcast partners—patching services during live heats, coaching local operators, and feeding improvements back into the platform roadmap. I co-built the automation vision for our cloud orchestrator so replica sets, sharded Mongo clusters, and blue/green upgrades became push-button tasks.

## Outcomes That Matter

- The platform scales from single regattas to global tours and Olympic showcases without sacrificing resilience or cost control.
- Fans stay engaged because they finally understand the decisions happening on the water, not just the finish order.
- Sailors and coaches gain competitive insight from telemetry that used to vanish into the spray.

Sailing may be unpredictable, but your data pipeline doesn’t have to be. By marrying disciplined architecture with on-the-water empathy, I helped SAP turn a niche spectator sport into a data-driven experience that keeps audiences hooked.
