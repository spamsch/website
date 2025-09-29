---
title: "Launching Privacy-First Live Streaming on AWS"
description: "What it took to ship a browser-based streaming platform with zero registration, monetisation hooks, and a go-to-market story that resonated with investors."
draft: false
external: false
date: 2024-07-02
order: 7
tags:
  - project
---

Before "privacy-first" became a marketing trope, Brainrepublic committed to it in 2015. No account creation. No personal data retention. Just experts going live in the browser with optional pay-per-minute billing. Turning that promise into a product meant I had to thread architecture, positioning, and stakeholder expectations together.

## Product Constraints We Embraced

- **Low-latency streaming** over the public internet without native apps.
- **Zero stored PIIs**, so every subsystem—from payments to chat—needed ephemeral tokens and selective logging.
- **Enterprise white-label** in the roadmap, demanding multi-tenant isolation and custom branding hooks.
- **Investor trust** built on a credible architecture and monetisation story.

## Architecture Playbook

1. **Python services on AWS.** I combined managed media pipelines with custom coordination services so live rooms spun up fast and scaled elastically.
2. **Privacy guardrails.** I enforced short-lived credentials, vaulted secrets, and anonymised analytics to keep our "no data retained" promise enforceable in code.
3. **Monetisation ready.** I planned integrations for pay-per-minute billing and marketplace workflows beside the streaming core so revenue experiments didn’t require rewrites.
4. **Observability without surveillance.** I instrumented performance metrics and failure tracing without collecting user identities, keeping operators informed and lawyers comfortable.

## Beyond the Code

- Authored the competitive analysis to focus the roadmap on differentiators (HD quality, embedding, mobile roadmap).
- Crafted launch messaging and press packs with Faktwerk PR, making sure the product narrative matched what the architecture could deliver.
- Equipped investors with a pitch deck that translated my technical moat—privacy, modularity, AWS scalability—into growth levers.

## Outcome

Brainrepublic launched as a polished, trustworthy streaming portal that felt effortless for hosts and safe for viewers. More importantly, it gave the founders a platform ready for white-label deals and future mobile expansion because the architecture led with principles, not hacks.
