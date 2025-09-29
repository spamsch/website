---
title: "Vector Search Reality Check: Why Your RAG System Isn’t Finding What You Think"
description: "The uncomfortable truth about vector databases and what actually happens when you search millions of high-dimensional embeddings."
draft: false
external: false
date: 2024-04-10
order: 1
tags:
  - musing
---

After shipping multiple RAG systems into production, I’ve learned that vector databases rarely work the way most developers assume. Here’s what is actually happening under the hood and why it matters for your AI applications.

## The Brutal Math Reality

When you’re searching through millions of embeddings, brute-force similarity search is computationally heavy. A linear scan across even modest vector collections (100k+ documents) will push response times well beyond interactive latency budgets unless heavily optimized or GPU-accelerated.

But the deeper issue isn’t just compute—it’s geometry.

In high-dimensional spaces, distances concentrate: as dimensionality grows, the difference between the nearest and farthest neighbor shrinks. This phenomenon (the “curse of dimensionality”) makes naive notions of “closeness” less discriminative. In a 1536-dimensional embedding space, the absolute nearest neighbor may not be significantly closer than the 10th nearest. Similarity becomes noisier exactly when you need precision.

## What’s Actually Happening: HNSW Graphs

Most production vector databases don’t linearly compare embeddings. They use approximate nearest neighbor (ANN) algorithms, most commonly HNSW (Hierarchical Navigable Small World) graphs:

- **Layer 0:** Dense graph containing all vectors
- **Higher layers:** Progressively sparser shortcut graphs for fast traversal
- **Search strategy:** Start from the top, descend layer by layer with greedy hops toward closer nodes

The result isn’t your mathematically exact nearest neighbors. It’s an approximation, good enough for most retrieval but sensitive to index construction parameters and the underlying data distribution.

## Indexing Strategy Trade-offs

### HNSW (Default Choice)
- **Good for:** General-purpose similarity with high recall
- **Watch out for:** Memory overhead scales roughly linearly with dataset size × `M` (degree)
- **Production tip:** Tune `M` (max connections per node) and `efConstruction`; balance recall against index size and latency

### IVF (Inverted File Index)
- **Good for:** Very large datasets where clustering can speed search
- **Watch out for:** Vectors near cluster boundaries may be missed
- **Production tip:** Combine with quantization for efficiency; increase the number of probed clusters for higher recall

### Product Quantization (PQ)
- **Good for:** Memory-constrained environments
- **Watch out for:** Quantization introduces error; high compression reduces recall
- **Production tip:** Often used with IVF (IVF-PQ) rather than standalone

## The RAG Performance Reality

From real-world deployments, some consistent lessons emerge:

- **95% recall is often sufficient.** In practice, LLMs tolerate imperfect retrieval. Slightly suboptimal neighbors usually don’t harm output quality if the retrieved context is semantically relevant.
- **Metadata filtering changes the game.** Adding filters (date, author, doc type) reduces the candidate pool. ANN indexes alone don’t handle this gracefully. Hybrid search (ANN + keyword/structured filters) is essential.
- **Updates are costly.** Incremental updates in HNSW can be slow; large insertions may trigger rebalancing. Most production setups batch new data rather than ingesting in real time.
- **Distribution dominates.** Performance depends heavily on vector distribution. Clustered embeddings index and search differently than uniformly spread ones. Algorithm choice and parameter tuning must align with this distribution.

## What I Do Differently Now

### Measure What Matters
Don’t optimize for recall@k alone. Track metrics that correlate with user outcomes (answer relevance, satisfaction). Slightly “worse” recall can yield better downstream results.

### Design for Hybrid Search
Combine ANN with lexical and structured search. Pure vector similarity rarely solves production retrieval by itself.

### Plan for Data Distribution
Know your embedding space. If your data is tightly clustered (e.g., domain-specific corpora), different ANN settings work better than for broad, diverse corpora.

### Optimize Per Use Case
Recall and latency requirements differ. Customer support chatbots tolerate lower recall than legal research assistants. Tune for your application, not a benchmark.

## The Bottom Line

Vector databases are powerful, but they are approximate by construction. The real goal isn’t “perfect similarity”—it’s retrieving context that actually improves LLM responses.

Measure system performance end to end. Users don’t care about cosine similarity scores; they care about answer quality.
