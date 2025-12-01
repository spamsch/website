We're in an LLM bubble, not an AI bubble

Everyone is busy debating whether GPT‑5.1 or Claude Opus 4.5 is better at creative writing. But if you look at HuggingFace download stats, a very different story emerges.

For anyone outside the ML bubble: HuggingFace is the main open ecosystem where teams publish and download open‑source AI models, so its traffic is a good proxy for what people actually use.

Encoder‑only models (BERT family) account for around 45% of downloads. Decoder‑only LLMs sit under 10%. Classic BERT, released in 2018, still does tens of millions of downloads per month in 2025.

Quick explainer: BERT‑style models are fast, compact text encoders that turn words and sentences into vectors for search, classification, and extraction — they don’t chat, but they quietly power a huge amount of “smart” language functionality in production systems.

The quiet reality: the models nobody talks about on LinkedIn are the ones actually running in production.

+ Text‑understanding models (BERT‑family)
  - Power search bars that “just find the right thing,” suggest related articles, and decide whether a support ticket is about billing or a technical issue.
  - Drive spam filters, sentiment analysis (“is this customer happy or angry?”), and document tagging at scale.
  - Run fast on normal servers, often without GPUs, so they’re cheap to deploy.

+ Time‑series models (Chronos‑2, TimesFM)
  - Forecast demand for products, energy usage, website traffic, or call‑center volumes from historical curves.
  - Help retailers order the right stock, utilities balance the grid, and finance teams project revenue.
  - Designed specifically for numbers over time, not for chatting about CSV files.

+ Object‑detection models (YOLO, RF‑DETR)
  - Look at camera feeds and answer “what’s in this frame and where?” in real time.
  - Count boxes on a conveyor belt, spot missing safety helmets, detect defects on a production line, or track vehicles in a parking lot.
  - Run on cheap edge devices close to the cameras, so you don’t need to stream all your video to the cloud.

+ Code models (DeepSeek‑Coder and friends)
  - Act as local coding copilots: suggest functions, write tests, and refactor files.
  - Run on a single developer machine or one on‑prem GPU, so you keep code and IP in your own environment.
  - Good enough that many teams no longer need to send source code to a big external LLM.

+ Document‑understanding models (LayoutLMv3, Donut)
  - Read invoices, receipts, forms, and contracts as structured documents, not just flat text.
  - Understand that “INVOICE NUMBER” is a label and the number beneath it is the value, or that a table of line items belongs together.
  - Automate data entry, reconciliation, and compliance workflows that used to mean humans staring at PDFs.

+ Graph and anomaly‑detection models
  - Look at **relationships**: who pays whom, which devices talk to which servers, which products are bought together.
  - Help banks flag suspicious payments, recommend “people also bought…”, and spot strange behaviour in factory sensors or network logs.
  - Learn what “normal” looks like and raise a flag when something deviates strongly from that pattern.

Every one of these exists because “just throw a chat model at it” turned out to be slow, expensive, or simply not fit for purpose:

- Time‑based data (like sales over months) needs models that understand history and seasonality.
- Graph‑shaped data (like payments between accounts) needs models that keep the connections, not flatten everything into a sentence.
- Cameras on factory floors need decisions in milliseconds on a small box, not a round‑trip to a huge cloud model.
- Document processing needs models that see page layout, not just lines of text.
- Anomaly detection needs models that learn “normal operations” and highlight weird behaviour, not models that generate paragraphs.

The bubble isn’t “AI is useless.”
The bubble is believing GPT‑5.1 should be your default for every problem.

What’s actually working in the teams I see:

- Small, fast LLM (e.g. 8B) for most reasoning
- Bigger LLM (e.g. 32B) only when necessary
- BERT‑style encoders for embeddings, classification and reranking
- Dedicated models for time series, detection, anomaly, and document parsing
- An application‑level “Mixture of Experts” architecture: many small, specialized models orchestrated together instead of one giant model in the middle

The teams getting durable value aren’t the ones with the biggest GPT budget. They’re the ones whose stack looks like:

- 90MB reranker + domain‑specific embeddings + 8B LLM as the orchestrator
  > all running on a single mid‑range GPU server (think one A10G / 4090‑class machine, or an equivalent managed inference endpoint) — and still beating a 200B model for 90% of real workloads

If you’re planning your AI roadmap for 2026, the question isn’t:
“Which frontier LLM wins the benchmark war?”

The better question is:
“What is the right mix of small, specialized experts for my workloads — and how do I route traffic between them?”

Curious what specialized models you’re actually running in production today. What does your stack look like?

#AI #GenAI #MLOps #NLP #MachineLearning #Engineering #Architecture
