---
title: "Engineering eJet: From Battery Packs to a Multi‑Tenant IoT Platform"
description: "How I turned an electric surfboard concept into a certified, connected product with a cloud‑native platform—hardware, firmware, data, and operations moving in lockstep."
draft: false
external: false
date: 2025-02-01
order: 4
tags:
  - project
  - architecture
---

Building an eJet surfboard wasn’t a software project with hardware on the side. It was a full‑stack programme—power electronics, CAN networks, Zephyr firmware, LTE telemetry, rental experiences, and compliance—delivered as a cloud‑native product. As the architect, I owned the end‑to‑end design and contributed hands‑on across device, data, and backend.

## Designing the System End-to-End

- **Hardware foundation.** I co-developed a 14S8P battery pack with SCUD, specified IP68 enclosures, and lined up UN38.3/IEC 62133 certification from day one.
- **Propulsion and control.** I tuned VESC-based controllers, and enforced redundant safety states so riders stayed safe while extracting 8 kW of fun.
- **Brains on board.** I defined the STM32H743 mainboard with dual CAN, Zigbee, LTE/GNSS, and eMMC storage as the telemetry, OTA, and rental hub.
- **Charging ecosystem.** I designed the multi-pack charging stations with load shedding, telemetry, and serviceable modules so fleet ops could scale with confidence.

## SaaS IoT Architecture Highlights

- **Multi‑tenant by design.** Tenants (dealers, rental fleets, partners) are isolated at the data and access layers with tenancy‑aware authZ, quotas, and usage metering so the platform is SaaS‑ready from day one.
- **Microservices and APIs.** Containerised FastAPI services expose fleet, telemetry, rental, and OTA domains. Background workers handle ingestion, rules, and geofences without blocking user traffic.
- **Edge to cloud communication.** Devices use secure provisioning and publish telemetry over cellular links (MQTT) into scaled RabbitMQ clusters; the platform supports offline/spotty coverage, durable buffering, and safe, staged, signed OTA rollouts.
- **Streaming data pipeline.** An event backbone fans in ride metrics, health checks, and alerts into time‑series storage and long‑term archives, powering real‑time dashboards and historical analytics.
- **Observability first.** Traces, metrics, and logs with SLOs and alerting across ingestion, APIs, and OTA pipelines so issues are caught before riders or partners feel them.
- **Security and integrity.** mTLS device identity, encrypted transport, least‑privilege IAM, audit trails, signed OTA updates, and device key rotation—industrial safety and data integrity are non‑negotiable.
- **Infrastructure‑as‑code & CI/CD.** Declarative environments, reproducible releases, blue/green rollouts, and automated smoke tests; standardized for AWS with managed services where they add reliability.

## Platform Stack

- **Backend:** Python (FastAPI) running on AWS.
- **Device ingress:** RabbitMQ with MQTT for sensor streaming.
- **Mobile apps:** AWS Amplify for auth, hosting, and delivery.
- **Notifications:** Amazon SNS for mobile and email messaging.
- **Triggers:** AWS Lambda for rules and workflow orchestration.
- **Infra & delivery:** IaC with automated CI/CD, blue/green rollouts, and staged OTA updates.

## Software, Firmware, and Cloud in Sync

1. **Zephyr RTOS on the board** so the firmware I specced delivered deterministic control loops, CAN orchestration, and PPP-based LTE connectivity to cloud services.
2. **Telemetry pipeline** that I architected to stream ride data, geofences, and health checks into the cloud backend where renters, partners, and support teams get real‑time insights.
3. **State machines for rentals** I designed every journey—OFF → STANDBY → READY → ACTIVE → FAULT—so app experiences and service workflows stayed in sync.
4. **Operations cockpit** with revenue tracking, fleet health, and alerting that I shaped from real dealer feedback, not just guesswork.
5. **Reliability & scale** via AWS container orchestration, RabbitMQ clustering, horizontal scaling on critical paths, and backpressure controls at ingestion so edge devices never stall.
6. **Triggers and notifications** with Lambda‑driven rules and SNS fan‑out for alerts, customer communications, and workflow automation.

## Hands‑On Contributions That Mattered

- Designed device and cloud data models, telemetry schemas, and OTA manifests; implemented core ingestion and tenancy‑aware APIs.
- Stood up CI/CD, environment promotion, and infrastructure blueprints so new regions/tenants could be brought online with confidence.
- Stood up CI/CD, environment promotion, and infrastructure blueprints so new regions/tenants could be brought online with confidence; delivered mobile apps via Amplify.
- Partnered with product and operations to convert field feedback into changes in rules engines, dashboards, and service procedures.

## Leadership Beyond Engineering

- Raised €4 million by guiding investors through a credible roadmap that balanced prototype milestones, certification risk, and manufacturing readiness.
- Coordinated international partners to deliver increments without losing sight of integration points.
- Embedded compliance thinking from the first schematic—covering Machinery, LVD, EMC, RED, Battery Regulation 2023/1542, and RoHS—so market entry isn’t an afterthought.

## Why It Matters

This project proved that hardware and cloud don’t have to be siloed. When you treat telemetry, rentals, charging, and compliance as one product, you can move fast without gambling on safety or regulatory resets. The playbook from eJet is the same one I apply to SaaS‑grade IoT platforms: secure by default, observable, multi‑tenant, and ready for production at scale.
