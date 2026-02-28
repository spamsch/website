Your AI pipeline probably leaks personal data. And no, GPT won't fix that.

Every time you send customer text to a cloud LLM, you're shipping names, addresses, and phone numbers along with it. Most teams know this is a problem. Few have a systematic answer.

The reflex is: "We'll ask the LLM to redact PII first." That's a billion-parameter cannon for a 100M-parameter target. Slow, expensive, unreliable — and you've already sent the PII to the cloud before the model can "redact" it.

The real solution is boring, small, and local.

++ What actually works

PII anonymization is a Named Entity Recognition (NER) task: find tokens that represent a person, address, or phone number, and mask them. No generative model needed.

+ Small NER models (local, no GPU required)
  - GLiNER PII (Knowledgator): zero-shot, under 500M params, define PII categories at runtime. Runs on CPU, F1 ~81%. Edge variants for constrained environments.
  - Tanaos Text Anonymizer: fine-tuned RoBERTa at 0.1B params, trained on synthetic PII data. MIT-licensed, fully offline.
  - Classical BERT-family NER: still the workhorse. Fast, cheap, well-understood.

+ Frameworks
  - Microsoft Presidio: open-source, combines regex + NER + context-aware detection. Production-grade.
  - Hybrid pipelines (rules + ML): precision ~95%, recall ~89% — better than either approach alone.

++ Why this matters beyond compliance

GDPR and the EU AI Act are the obvious drivers. But the practical case is just as strong:

- Anonymize locally, then send clean text to your cloud model. Keep the utility, lose the liability.
- PII in your RAG corpus becomes PII in your model's outputs. Anonymize at ingestion.
- A 100M NER model on CPU costs fractions of a cent per document. A frontier LLM costs 10–100x more for the same job.

++ The pattern that ships

1. Ingest text
2. Run a local NER model to detect and mask PII
3. Pass clean text to your LLM or analytics pipeline
4. Keep a reversible mapping (token → original) in a secured store for de-anonymization
5. Human review: spot-check samples, measure recall, fix gaps

Not glamorous. A small model, a regex layer, a lookup table. But it's the difference between "we think we're compliant" and "we can prove it."

++ Where I stand

PII anonymization is a problem where small, specialized models decisively beat large generative ones — on cost, speed, accuracy, and privacy. The irony of using a cloud LLM to "protect" personal data should not be lost on anyone.

If your pipeline touches personal data without a local anonymization step before it leaves your network — fix that first.

#AI #Privacy #GDPR #NLP #PII #DataProtection #MachineLearning #Engineering
