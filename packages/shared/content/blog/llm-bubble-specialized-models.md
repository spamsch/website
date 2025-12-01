---
title: "Beyond the LLM Bubble: The Specialized Models Actually Powering Production AI"
description: "Why HuggingFace download data shows we’re in an LLM hype bubble—not an AI one—and how to design a practical, multi-model stack for real workloads."
draft: false
external: false
date: 2025-11-25
order: 3
tags:
  - musing
  - ai/ml
  - architecture
---

“We’re in an LLM bubble, not an AI bubble.”

When Clem Delangue, HuggingFace’s CEO, said this in a recent TechCrunch interview, it sounded like a nice soundbite.

But the download stats back him up in ways that most AI conversations completely miss.

While everyone argues about whether GPT-5.1 or Claude Opus 4.5 is better at creative writing, production teams are quietly downloading and deploying a completely different set of models.

## The Download Data No One Is Posting on LinkedIn

Look at what’s actually getting pulled from HuggingFace:

- Encoder‑only models (the BERT family and friends) account for roughly **45% of downloads**.
- Decoder‑only LLMs (the models we all talk about) sit at about **9.5%**.
- Classic BERT, released in 2018, still pulls **tens of millions of downloads per month** in 2025.

If you judged AI only by conference talks and X threads, you’d think the world runs entirely on giant chat models.

If you judged AI by download logs and production deployments, you’d reach a very different conclusion: **most real workloads are powered by small, specialized models that almost never show up in hype cycles.**

## The Models Nobody Talks About (But Everyone Uses)

Here’s a quick tour of the model families that actually ship to production, along with what they’re good at and why they beat LLMs for those jobs.

### BERT-Family Encoders: The Workhorses of Text

The big story in encoders isn’t just “BERT is still alive.” It’s that BERT has grown up.

**ModernBERT**, released at the end of 2024, is the first major architectural refresh in years:

- Context window up to **8,192 tokens** (vs 512 for classic BERT)
- RoPE positional embeddings and Flash Attention
- Trained on **2T+ tokens**, including code
- Still lightweight enough to run comfortably on CPUs

What these models do that LLMs can’t do efficiently:

- **Reranking** — Models like `ms-marco-MiniLM-L-6-v2` are ~90MB and rerank search results **10–100x faster** than an LLM.
- **Classification** — Sentiment, spam detection, routing, intent mapping with **95%+ accuracy** in milliseconds.
- **Embeddings** — Sentence-transformers chew through **thousands of documents per minute on CPU**.
- **NER and extraction** — Names, dates, organizations, amounts—without sending data to a $0.01/request API.

When you see a “smart search” feature, a relevance tweak, or a classification pipeline in production, odds are high it’s a BERT-family encoder, not a chat model, doing the heavy lifting.

### Time Series Foundation Models: Forecasting Without Chat

Your demand forecasting does not need GPT-5.

It needs something like **Chronos‑2** (Amazon, 2025) or **TimesFM 2.5** (Google).

These are transformer architectures trained specifically on time series. Chronos‑2 tokenizes numeric values the way an LLM tokenizes words and then performs **zero‑shot forecasting** on data it has never seen before:

- ~**200M parameters**
- Runs comfortably on a **single GPU**
- Built for forecasting, not conversation

Amazon and Google built these for themselves first. Their internal teams discovered what many others are now learning: **throwing chat models at sensor data is a terrible idea.**

### Object Detection: Real-Time Vision on Real Hardware

In factories, warehouses, and robotics, vision workloads need **real‑time inference on constrained hardware**, not a giant multimodal model in the cloud.

That’s why families like **YOLO** and **RF‑DETR** still dominate:

- **RF‑DETR** hits around **60%+ mAP** while running at **100+ FPS** on an NVIDIA T4.
- **YOLO11/YOLOv12** variants run at **25+ FPS on a Raspberry Pi‑class device**.

Try asking an LLM-with-vision endpoint to process 25 frames per second of video on a $50 computer. The economics break instantly.

### Code Models: Local, Cheap, and Good Enough

Specialized code models like **DeepSeek‑Coder V2** are another example of targeted design beating raw scale:

- Mixture‑of‑Experts architecture with **16B parameters total, ~2.4B active** at inference.
- Runs on a **single RTX 4090**.
- Competitive with or ahead of much larger models like CodeLlama‑34B.
- Trained on hundreds of programming languages.

Cost: **$0/month** if you self‑host.  
Data privacy: **full control**.

For many teams, a tuned local code model plus good tooling beats “throw everything at a 200B‑parameter chat model in the cloud.”

### Document Understanding: Layout-Aware, Not Just Text-Aware

OCR reads text. It does not understand documents.

Models like **LayoutLMv3** and **Donut** do something different: they treat documents as **structured layouts** with spatial relationships, not just sequences of characters.

That means they can learn that:

- “INVOICE NUMBER” is a key
- The value beneath it is the corresponding value
- Tables, sections, signatures, headers, and footers all carry structural meaning

If your workload involves invoices, receipts, forms, or contracts, a layout‑aware transformer plus OCR often beats any general‑purpose LLM for accuracy, latency, and cost.

### Graph Neural Networks: Keeping the Structure Intact

Some data is naturally graph‑shaped:

- Fraud detection with transaction graphs
- Molecular modelling with atoms and bonds
- Recommendation systems based on user–item relationships
- Knowledge graphs in enterprises

LLMs flatten everything into a sequence. In the process, they lose much of the structure that actually matters.

Graph Neural Networks (using libraries like DGL or PyG) work with the graph directly, propagating information along edges instead of pretending everything is just a line of tokens. For inherently relational problems, they’re usually the right tool.

### Anomaly Detection: Learning “Normal” Instead of Predicting the Next Token

In IoT, cybersecurity, and industrial monitoring, the question is often simple:

> “Is this behavior normal?”

Autoencoder‑style anomaly detectors are built for exactly that:

- Train on “normal” behavior until the model learns to reconstruct it well.
- At inference, feed new data through the model.
- Large reconstruction error = “something weird is happening.”

In production, these models reach **F1 scores above 0.9** on many anomaly benchmarks and run on edge hardware with no external API latency.

No prompt engineering. No chat interface. Just a specialized model solving a specialized problem.

## The Actual Pattern: One Model Was Never Going to Be Enough

Every one of these model families exists because someone tried to use a giant LLM for their problem and ran into hard limits:

- Time series has **temporal dependencies** that generic text transformers don’t handle optimally.
- Graphs have **relational structure** that sequences destroy.
- Object detection needs **real‑time inference on constrained edge hardware**.
- Document understanding requires **spatial awareness** and layout reasoning.
- Anomaly detection needs **reconstruction‑based learning**, not next‑token prediction.

The bubble isn’t “AI is overhyped and useless.”

The bubble is believing that **GPT‑5.1 (or any single LLM) should be your first choice for every problem.**

HuggingFace download stats tell the real story: encoder models alone are into **hundreds of millions to billions of downloads per month**. Specialized vision, document, and time series models are quietly powering the “boring” systems that actually run in production.

## Designing an Application-Level Mixture of Experts

So what do you do with this reality?

One pattern I’m seeing work consistently is **Mixture of Experts at the application level**: instead of one massive model trying to do everything, you deploy many small experts and route requests between them.

Think of a stack that looks roughly like this:

- A **small, fast LLM** (e.g. an 8B model) for day‑to‑day reasoning and chat.
- A **larger LLM** (e.g. 32B) for harder reasoning you selectively route to.
- A **BERT‑family embedder** for semantic search and retrieval that runs happily on CPU.
- A **cross‑encoder reranker** for search quality without breaking your latency budget.
- A **zero‑shot classifier** for routing, tagging, and policy decisions.
- A **time series forecaster** for demand/energy/financial predictions.
- An **object detector** for real‑time video or image streams.
- A **code model** for local development assistance.
- A **document understanding model** for invoices, receipts, and forms.
- An **anomaly detector** for “something feels off” signals.
- Optional diffusion or image models when you truly need generation.

With an orchestration layer (for example, something like `llamafarm` or any other router you prefer), your configuration might conceptually look like:

```yaml
models:
  # General-purpose LLMs
  - name: fast
    model: qwen3:8b
    default: true

  - name: powerful
    model: qwen3:32b

  # Text encoders
  - name: embedder
    model: nomic-ai/modernbert-embed-base

  - name: reranker
    model: cross-encoder/ms-marco-MiniLM-L-6-v2

  - name: classifier
    model: facebook/bart-large-mnli

  # Time series
  - name: forecaster
    model: amazon/chronos-t5-base

  # Vision
  - name: detector
    model: ultralytics/yolov12n

  # Code
  - name: coder
    model: deepseek-ai/deepseek-coder-6.7b-instruct

  # Documents
  - name: doc-parser
    model: microsoft/layoutlmv3-base

  # Anomaly detection
  - name: anomaly-detector
    model: alibaba-damo/genad
```

The exact models don’t matter as much as the **structure**:

- Route each request to the smallest, cheapest expert that can do the job well.
- Use LLMs for what they’re good at: reasoning, generation, glue logic, and orchestration.
- Let specialized models handle tasks where structure, latency, or constraints really matter.

The teams I see consistently succeeding with AI are not the ones with the largest GPT‑5 budget. They’re the ones who realized that:

> A 90MB reranker + 8B LLM + domain‑specific embeddings often beats a 200B‑parameter model for 90% of real workloads.

## How to Start Using AI Like This

If your current stack is “we send everything to a big chat model,” here’s how to pivot without a full rewrite.

1. **Map your workloads**
   - Search and retrieval?
   - Classification and routing?
   - Forecasting?
   - Vision?
   - Document processing?
   - Anomaly detection?

2. **Identify where structure matters**
   - Time, graphs, spatial layout, edge constraints, privacy requirements.
   - These are usually red flags that you want something other than a generic LLM.

3. **Swap in one specialized model at a time**
   - Replace LLM‑based reranking with a cross‑encoder.
   - Replace LLM‑based classification with a zero‑shot classifier.
   - Add a time series model for forecasting instead of prompting an LLM with CSVs.

4. **Keep the LLM as the coordinator**
   - Let the LLM decide which expert to call based on the request.
   - Use tools/functions and a routing layer so you can experiment safely.

5. **Measure end‑to‑end, not just benchmarks**
   - Track latency, cost, and task‑level metrics (conversion, fraud caught, tickets resolved).
   - Specialized models often look “boring” on leaderboards but exceptional in real systems.

## The Real Bubble

The bubble Delangue is pointing at isn’t “AI is a fad.”

It’s the idea that if we just keep scaling one model, on one interface, that model will magically solve **all** our problems.

What’s actually happening is quieter and far more interesting:

- Specialized models are eating production AI.
- Encoder‑only models dominate download charts.
- Vision, time series, document, graph, and anomaly models are quietly doing the real work.
- LLMs are becoming one powerful component in a much larger toolbox—not the toolbox itself.

If you’re serious about building durable, cost‑effective AI systems, the question isn’t:

> “Which frontier LLM is best this week?”

It’s:

> “What is the right mixture of small, specialized experts for my real workloads—and how do I orchestrate them well?”

Curious what specialized models you’re running in production.  
What does your stack look like?

