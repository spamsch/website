---
title: "Engineering WAAS eJet: From Battery Packs to Cloud Telemetry"
description: "How I turned an electric surfboard concept into a certified, connected product with hardware, firmware, IoT, and operations moving in lockstep."
draft: false
external: false
date: 2024-05-08
order: 4
tags:
  - project
---

Building WAAS eJet wasn’t a software project with hardware on the side. It was a full-stack adventure—power electronics, CAN networks, Zephyr firmware, LTE telemetry, rental experiences, and compliance documentation—wrapped into one programme. As co-founder and CTO, I lived in every layer.

## Designing the System End-to-End

- **Hardware foundation.** I co-developed a 14S8P battery pack with SCUD, specified IP68 enclosures, and lined up UN38.3/IEC 62133 certification from day one.
- **Propulsion and control.** I selected Plettenberg NOVA motors, tuned VESC-based controllers, and enforced redundant safety states so riders stayed safe while extracting 8 kW of fun.
- **Brains on board.** I defined the STM32H743 mainboard with dual CAN, Zigbee, LTE/GNSS, and eMMC storage as the telemetry, OTA, and rental hub.
- **Charging ecosystem.** I designed the multi-pack charging stations with load shedding, telemetry, and serviceable modules so fleet ops could scale with confidence.

## Software, Firmware, and Cloud in Sync

1. **Zephyr RTOS on the board** so the firmware I specced delivered deterministic control loops, CAN orchestration, and PPP-based LTE connectivity to cloud services.
2. **Telemetry pipeline** that I architected to stream ride data, geofences, and health checks into the cloud backend where renters, partners, and support teams get real-time insights.
3. **State machines for rentals** I designed captured every journey—OFF → STANDBY → READY → ACTIVE → FAULT—so app experiences and service workflows stayed in sync.
4. **Operations cockpit** with revenue tracking, fleet health, and alerting that I shaped from real dealer feedback, not just guesswork.

## Leadership Beyond Engineering

- Raised €4 million by guiding investors through a credible roadmap that balanced prototype milestones, certification risk, and manufacturing readiness.
- Coordinated international partners (Byte Lab, SCUD, firmware contractors, UX teams) to deliver increments without losing sight of integration points.
- Embedded compliance thinking from the first schematic—covering Machinery, LVD, EMC, RED, Battery Regulation 2023/1542, and RoHS—so market entry isn’t an afterthought.

## Why It Matters

WAAS eJet proved that hardware and cloud don’t have to be siloed. When you treat telemetry, rentals, charging, and compliance as one product, you can move fast without gambling on safety or regulatory resets. The playbook I built there now guides how I approach every hardware-plus-software engagement.
