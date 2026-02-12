---
title: "Text Classification Without ML: When Compression Beats Logistic Regression"
description: "Python 3.14's new zstd module enables a text classifier that matches TF-IDF accuracy at 6x the speed—no training, no feature engineering, no sklearn."
draft: false
external: false
date: 2025-12-15
order: 1
tags:
  - musing
  - ai/ml
  - opinion
---

A compression algorithm just matched a trained logistic regression classifier at 91% accuracy—and ran 6x faster.

No feature engineering. No vectorization. No model training. Just a dictionary-based compressor measuring how well new text "fits" each category's patterns.

If that sounds too simple to be real, the information theory behind it has been solid for decades. What changed is that Python 3.14 ships a `compression.zstd` module that makes this approach practical for the first time.

## The Core Idea: Compression as Classification

The insight comes from Kolmogorov complexity: **the length of the shortest program that produces a given string is a measure of that string's complexity.** We can't compute Kolmogorov complexity directly, but compression length approximates it.

Here's how that becomes a classifier:

1. Maintain a separate compressor for each text category
2. "Train" each compressor by feeding it text from that category
3. To classify a new document, compress it with every category's compressor
4. **The compressor that produces the smallest output wins**

Why does this work? A compressor trained on sports articles has learned patterns like "goal," "match," "season," "tournament." When it encounters a new sports article, it compresses efficiently because those patterns are already in its dictionary. Feed it a medical paper, and the compression is poor—the patterns don't match.

This is not a theoretical curiosity. On the 20 newsgroups dataset (3,387 documents across 4 categories), the zstd classifier hit **91% accuracy in 1.9 seconds**. A TF-IDF + logistic regression pipeline on the same data scored 91.8% in 12 seconds.

## Why Zstd Specifically?

Not every compression algorithm is suited for this. Gzip and LZW don't expose the right APIs for incremental dictionary management. Zstd does:

- **Dictionary training**: Feed it category-specific text and it builds an optimized compression dictionary
- **Incremental compression**: Maintain internal state across documents without rebuilding from scratch
- **Fast dictionary rebuilds**: Reconstructing a compressor takes tens of microseconds, making frequent updates feasible
- **Tunable compression levels**: Range 1–22, letting you trade accuracy for speed depending on your workload

The Python 3.14 `compression.zstd` module wraps all of this in a clean API. Before this, you needed C bindings or third-party wrappers that added friction.

## The Implementation Is Surprisingly Simple

The entire classifier fits in roughly 60 lines of Python. It maintains three data structures per class:

- **A text buffer** (sliding window of recent samples, capped by configurable size)
- **A trained compressor** (rebuilt periodically from the buffer)
- **A rebuild counter** (tracks when to reconstruct the compressor)

Learning is appending text to the right buffer. Classification is compressing the input with each class's compressor and returning the one with the smallest output. That's it.

Three parameters control behavior:

| Parameter | Default | Effect |
|---|---|---|
| **Window size** | 1 MB | Larger buffers learn more patterns but use more memory |
| **Compression level** | 3 | Higher levels (up to 22) improve accuracy at computational cost |
| **Rebuild frequency** | Every 100 samples | More frequent rebuilds track distribution shifts; less frequent ones save CPU |

No hyperparameter search needed. The defaults work well out of the box.

## Where This Gets Interesting

The compression approach has properties that traditional ML pipelines don't:

**Streaming-native.** The classifier updates incrementally. New documents flow in, buffers adjust, compressors rebuild. There's no batch retraining step. For applications where text categories evolve over time—support tickets, content moderation, log classification—this is a significant operational advantage.

**Language-agnostic.** The compressor doesn't care about tokenization, stop words, or stemming. It learns byte-level patterns. Switch from English to German or Japanese and the approach still works without changing a single line of code. Try that with a TF-IDF pipeline.

**No dependencies.** The entire implementation uses Python's standard library starting with 3.14. No numpy, no sklearn, no torch. For environments where dependency management is a constraint—embedded systems, serverless functions, air-gapped networks—this matters.

**Explainability is intuitive.** "This document compressed best with the sports compressor" is easier to explain to a stakeholder than "the model's softmax output for class 3 was 0.87."

## When Not to Use This

I'm not suggesting you rip out your production classifiers. The compression approach has clear limitations:

- **Accuracy ceiling**: 91% is competitive for a zero-dependency solution, but if you need 97%+, you still need a proper ML pipeline
- **Multi-label classification**: The approach assigns exactly one class—the best compressor wins. Overlapping categories need a different strategy
- **Short texts**: Compression needs enough bytes to find patterns. Single-sentence inputs may not compress differently enough across categories
- **High cardinality**: With dozens of categories, the cost of compressing against every class grows linearly

For well-scoped problems—routing support tickets, classifying log lines, filtering content streams—this is a serious option. For nuanced NLP tasks with fine-grained categories, stick with supervised models.

## The Broader Pattern: Right-Sizing Your Tools

This is a recurring theme in production AI: **the best solution is often the simplest one that meets your accuracy threshold.**

We've seen it with BERT-family encoders still dominating HuggingFace downloads over LLMs. We've seen it with hybrid search outperforming pure vector retrieval. And now we're seeing it with a compression algorithm matching a trained classifier at a fraction of the complexity.

The instinct to reach for the most sophisticated tool—fine-tuned transformers, complex ML pipelines, managed AI services—often introduces operational overhead that isn't justified by marginal accuracy gains.

A compression-based classifier you can deploy in a single Python file, with zero dependencies, that runs in under 2 seconds and updates incrementally? For the right use case, that's not a hack. That's good engineering.

What's your simplest model that still ships?
