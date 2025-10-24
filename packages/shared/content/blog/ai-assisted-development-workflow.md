---
title: "AI-Assisted Development Workflow: A Practical Reality Check"
description: "How to integrate Claude and AI tools into software development without sacrificing code quality, learning, or engineering discipline."
draft: false
external: false
date: 2025-10-24
order: 2
tags:
  - musing
  - opinion
  - ai/ml
---

After months of integrating AI tools into production development workflows, I've learned that effective AI-assisted development looks nothing like the hype. This is a reality check on what actually works—and what produces maintainable, high-quality code.

## Setting Realistic Expectations

If you've read about developers launching dozens of agents in parallel, generating thousands of lines of code in minutes, or completing features in a fraction of the usual time—that approach produces poor code.

The reality of effective AI-assisted development mirrors the principles that have worked for decades:

1. **Clearly define what you want** — vague prompts generate vague code
2. **Provide focused, relevant context** — LLMs have no memory; they need explicit knowledge for each task
3. **Break work into discrete todos** — one well-scoped task at a time, not monolithic generation
4. **Establish feedback mechanisms** — unit tests and human checkpoints catch errors early
5. **Iterate deliberately** — generate, review, test, refine; never blindly merge generated code

Large Language Models must be treated as new development engineers: highly capable, fast learners, but with **zero working memory**. Each task requires a clean onboarding process that provides context, scope, and constraints.

## What This Workflow Optimizes For

**Code quality** — tested, reviewed, maintainable implementations
**Developer productivity** — focus on architecture and design while AI handles boilerplate
**Reproducibility** — deterministic workflows that produce consistent results
**Knowledge preservation** — all context, decisions, and iterations captured in version control

**What it does not optimize for:**

**Raw speed** — generating 10,000 lines of untested code in 5 minutes is worthless
**Massive parallelism** — running 20 agents simultaneously creates coordination chaos
**Autonomous operation** — human checkpoints are mandatory, not optional
**"AI does everything"** — developers remain responsible for architecture, review, and integration

The time savings come from **eliminating repetitive work** (boilerplate, test scaffolding, routine refactoring), not from bypassing proper software engineering discipline. If you follow this workflow rigorously, expect 20-40% productivity gains on well-defined tasks, not 10x mythical breakthroughs.

## Preserving Developer Learning and Growth

**This workflow ensures developers continue to learn and gain experience.** This is critical because humans need to stay in the loop—and will for the foreseeable future.

Other AI-assisted workflows that emphasize full automation and "AI does everything" approaches have a dangerous side effect: **they make developers dumber and software more error-prone.** When developers become passive consumers of AI-generated code without understanding what's being produced, several problems emerge:

1. **Skill atrophy** — Developers lose the ability to debug, architect, or reason about code they didn't write and don't understand
2. **Blind trust** — Without reviewing and testing each increment, subtle bugs and architectural flaws accumulate undetected
3. **Context loss** — When AI generates thousands of lines without human checkpoints, no one understands the system anymore
4. **Inability to maintain** — Code that no human has read or understood becomes unmaintainable the moment something breaks
5. **Loss of judgment** — Developers who don't practice making design decisions lose the ability to make good ones

## The Core Workflow Components

I use three tools and one principle:

**Claude** — code generation, refactoring, test scaffolding
**Codex** — reasoning, architectural review, second opinions (via MCP)
**GitHub** — version control, CI/CD, review integration
**Unit tests** — the operational checkpoints that validate every step

This constraint ensures predictable maintenance, compliance, and security overhead. There's no need for Code Rabbit, AutoGen, Crew AI, or others. The foundational models perform well and just need proper workflow structure.

## Roles and Responsibilities

**Claude — Code Generation Engine**

- Acts as the **primary code generation tool** for all implementation work
- Accepts high-level input and **directly generates code**, tests, and documentation
- Performs refactoring, scaffolding, debugging, and iterative development
- Maintains short-term conversational state for the current task only
- **Optionally** consults Codex through MCP when a second opinion is needed

**Codex — Architectural Advisor (via MCP)**

- Connected to Claude through **Model Context Protocol** as an external endpoint
- **Not used for code generation** — only for review, validation, and advisory opinions
- Invoked **selectively** when Claude or the developer needs architectural feasibility assessment, design trade-off analysis, or validation that the proposed approach aligns with project standards
- **Never writes code directly** — only provides opinions that inform Claude's generation work

**The Developer**

- Defines and owns the task scope and acceptance criteria
- Provides the explicit onboarding context to the LLMs
- Reviews AI output and integrates validated results
- Maintains test discipline — each functional increment must be validated by a unit test checkpoint

## The Task Lifecycle

Every feature or bug fix follows a deterministic lifecycle: **define → onboard → iterate → implement → test → review → merge**.

### 1. Task Definition

Every task begins as a Markdown file in `sessions/tasks/`. This file is the single source of truth for the task scope and serves as onboarding material for both humans and LLMs.

**Example task file:**

```markdown
---
status: pending
branch: feature/status-endpoint
created: 2025-10-22
success_criteria:
  - Returns HTTP 200 with correct JSON payload
  - Unit tests cover success and DB-failure scenarios
  - Endpoint appears in OpenAPI schema
---

# Add `/api/status` Endpoint

## Context
Our monitoring tools require a lightweight backend endpoint that returns the current service status, including database connectivity and version metadata.

## Scope
Implement a new GET endpoint `/api/status` in the FastAPI backend.

## Acceptance Criteria
- Returns HTTP 200 and JSON payload
- Unit test covers positive and simulated DB-down scenarios
- Endpoint included in OpenAPI schema
```

### 2. Implementation by Claude

Claude analyzes the relevant codebase files, proposes an implementation approach, and after approval generates:

- The feature code
- Corresponding unit tests
- Any necessary documentation updates

The developer reviews the generated code before proceeding.

### 3. Optional: Request Codex Second Opinion

If architectural validation is needed **before** committing, the developer can ask Claude to consult Codex via MCP.

**Example:**

"Before we commit this, can you get Codex's opinion on whether this status endpoint design aligns with our monitoring architecture?"

Claude sends the context and code to Codex, which responds with architectural feedback:

```
✅ Design is sound.

⚠️ Consider adding response time measurement for the DB check.

💡 Suggest wrapping DB call in try/except to return db_connected: false
   rather than error on failure.
```

Claude can then regenerate the implementation incorporating Codex's suggestions.

### 4. Unit Test Checkpoint

Each implemented step requires at least one unit test confirming correctness. Tests are the feedback mechanism that validates LLM output.

**Critical principle:** Tests are not optional or "nice to have"—they're the only way to verify that generated code actually works. The same rule that applied before AI still applies: **untested code is broken code until proven otherwise.**

```bash
pytest -q --disable-warnings
..
2 passed in 0.45s
```

If tests pass, the task is considered functionally complete. If tests fail, the implementation is incomplete regardless of how much code was generated. Never proceed to the next todo until the current one has passing tests.

**This is where velocity gains come from:** Claude generates the test scaffolding and initial implementation quickly, but the human developer must verify correctness before moving forward.

### 5. Pull Request and Automated Review

After pushing, the Claude Code GitHub Action runs automatically, performing an independent AI review:

- Code style compliance
- Missing or insufficient tests
- Architectural and security issues
- Ambiguous or incomplete documentation

This serves as the final automated gate before human approval and merge.

## When to Use Claude vs. Codex

**Use Claude for all code generation.** Consult Codex when you need architectural validation, design trade-off analysis, or a second opinion on complex decisions.

### Decision Matrix

| Situation | Use Claude | Consult Codex |
|-----------|-----------|---------------|
| Feature implementation with clear requirements | ✅ Generate code | ❌ Not needed |
| Bug fix with known solution | ✅ Generate fix | ❌ Not needed |
| Refactoring with unclear impact | ✅ Generate code | ✅ Review design |
| Multiple architectural approaches exist | ✅ Implement chosen approach | ✅ Evaluate trade-offs first |
| Performance optimization strategy | ✅ Implement optimization | ✅ Validate approach |
| Simple CRUD endpoint | ✅ Generate code | ❌ Not needed |
| New system integration | ✅ Generate integration code | ✅ Review integration pattern |
| Database schema migration | ✅ Generate migration | ✅ Review if major schema change |

## What I Do Differently Now

### Mandatory Test Checkpoints

Every LLM-generated code change must be coupled with a corresponding or updated test. This forms the validation baseline before merge. The same discipline that prevented bugs in the decades before AI remains essential: write the test, verify it passes, then move to the next todo.

### Structured Task Files

All project standards—structure, conventions, and code guidelines—live in version-controlled Markdown files in `/docs/`. These serve as canonical references for both human developers and AI tools.

### Incremental Implementation

Break complex tasks into discrete todos. Implement one at a time. Review and test each increment before proceeding. This prevents the "black box" problem where thousands of lines of code appear without anyone understanding it.

### Human Checkpoints

Reviews and integration decisions remain with humans. AI accelerates execution speed on tasks you already understand, freeing mental bandwidth to tackle harder architectural problems.

### Deterministic Workflows

Each workflow run is reproducible from the same inputs. Session logs, task references, and resulting commits are linked for traceability. This ensures transparency, compliance, and reproducibility.

## The Bottom Line

AI-assisted development is a force multiplier, not a replacement for engineering discipline. The real productivity gain comes from eliminating boilerplate while maintaining the same rigor that made software work before AI existed.

**Measure system performance end to end.** Users don't care whether a human or an AI wrote the code; they care about whether it works, is maintainable, and solves their problem.

The workflows that work long-term are the ones that treat AI as a **highly capable assistant that still needs context, guidance, and verification**—not as a magic code factory that can operate autonomously.
