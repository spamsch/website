---
marp: true
theme: default
paginate: true
---

# AI-Assisted Development Workflow
## A Structured Approach to Software Engineering with Claude and Codex

---

## Setting Realistic Expectations

This workflow will **not** produce dramatic speed gains promoted in AI development hype.

**The Reality:**
- No "thousands of lines in minutes"
- No "dozens of agents in parallel"
- No "10x mythical breakthroughs"

**What You'll Actually Get:**
- 20-40% productivity gains on well-defined tasks
- Elimination of repetitive work
- Maintained code quality and discipline

---

## What This Workflow Optimizes For

- **Code quality** — tested, reviewed, maintainable implementations
- **Developer productivity** — focus on architecture while AI handles boilerplate
- **Reproducibility** — deterministic workflows with consistent results
- **Knowledge preservation** — all context and decisions captured in version control

**Time savings come from eliminating repetitive work, not from bypassing proper engineering discipline.**

---

## What This Workflow Does NOT Optimize For

- **Raw speed** — generating 10,000 lines of untested code is worthless
- **Massive parallelism** — running 20 agents simultaneously creates chaos
- **Autonomous operation** — human checkpoints are mandatory
- **"AI does everything"** — developers remain responsible for architecture and review

---

## Preserving Developer Learning and Growth

**Other AI workflows make developers dumber. This one keeps you sharp.**

**You remain actively engaged:**
- You define the task
- You review the generated code
- You write or validate tests
- You make architectural decisions
- You iterate incrementally
- You integrate and verify

**Result:** AI accelerates execution on tasks you understand, freeing bandwidth for harder problems. You become **more capable**, not dependent.

---

## Primary Objectives (1/2)

1. **Accelerate onboarding to AI-assisted development**
   - Clear, reproducible process for using Claude, Codex, and cc-sessions

2. **Enforce minimal tool footprint**
   - Claude (code generation)
   - Codex (reasoning, review)
   - GitHub (version control, CI/CD)
   - No need for Code Rabbit, AutoGen, Cursor, or Windsurf

3. **Institutionalize structured iteration**
   - Definition → Iteration → Execution → Review

---

## Primary Objectives (2/2)

4. **Codify best practices in markdown**
   - All standards in `/docs/` as canonical references for humans and AI

5. **Standardize repository workflow**
   - `main` (stable) → `dev` (integration) → `feature/*` (PRs)
   - Every PR requires automated Claude review + human approval

6. **Make unit tests the operational checkpoints**
   - Every implementation step = at least one verifiable test
   - **If it's not tested, it's not done**

---

<style scoped>
section {
   font-size: 22px;
}
</style>

## Why Not Code Rabbit, AutoGen, Cursor, or Windsurf?

**Minimal tool footprint reduces complexity:**
- Each additional tool = more subscriptions, maintenance, security reviews, and training
- More tools = more context switching and cognitive overhead
- Tool sprawl creates vendor lock-in and increases attack surface

**Tools don't solve planning problems:**
- Code Rabbit won't fix vague requirements
- AutoGen won't compensate for poor architecture decisions
- Cursor won't eliminate the need for human review
- **Garbage in, garbage out** — tools amplify your process, good or bad

**Three tools are sufficient:**
- Claude + Codex + GitHub provide complete coverage
- Adding more tools optimizes for hype, not results

---

## Key Roles Overview

**Human Developer**
- Defines task scope and acceptance criteria

**Claude — Code Generation Engine**
- Primary tool for all implementation work

**Codex — Architectural Advisor (via MCP)**
- Review, validation, and advisory opinions only

**cc-sessions — Orchestrator**
- Deterministic execution and coordination

---

## Task Lifecycle

**Define → Onboard → Iterate → Implement → Test → Review → Merge**

1. **Task Definition** — `mek:` creates structured task file in `sessions/tasks/`
2. **Onboarding** — `start^:` loads task, creates branch, provides context
3. **Implementation** — `yert` executes approved todos with Claude
4. **Testing** — Unit tests verify each increment
5. **Optional Review** — Codex validates architecture when needed
6. **Commit** — `finito` automates completion workflow
7. **PR Review** — Claude Code Action + human approval
8. **Merge** — feature → dev → main

---

## When to Use Claude vs. Codex

| Situation | Claude | Codex |
|-----------|--------|-------|
| Feature with clear requirements | ✅ Generate | ❌ Not needed |
| Bug fix with known solution | ✅ Generate fix | ❌ Not needed |
| Refactoring with unclear impact | ✅ Generate code | ✅ Review design |
| Multiple architectural approaches | ✅ Implement | ✅ Evaluate first |
| Performance optimization | ✅ Implement | ✅ Validate approach |
| Simple CRUD endpoint | ✅ Generate | ❌ Not needed |

**Rule:** Use Claude for **all code generation**. Consult Codex for **architectural validation and trade-off analysis**.

---

## Expected Outcomes

✅ Developers understand how to collaborate with AI without sacrificing code quality

✅ LLMs can rejoin projects by reading structured onboarding material

✅ Review and documentation quality improve through structured iteration

✅ Teams achieve **sustainable 20-40% velocity gains** through boilerplate elimination

✅ Development remains predictable and reproducible

✅ Workflow can be adopted across multiple projects with minimal adaptation

---

## Getting Started

**Quick Setup:**
1. Register Codex as MCP server: `claude mcp add --transport stdio -s user codex -- codex -m gpt-5-codex mcp-server`
2. Install cc-sessions into your project `npx cc-sessions`
2. Configure notification hooks (optional)
3. Create your first task: `mek: Your task description`
4. Start implementation: `start^: sessions/tasks/your-task.md`
5. Execute todos: `yert`
6. Complete task: `finito`

---

## CC Sessions

**Key Trigger Phrases:**
- `mek:` — Create task
- `start^:` — Load task and begin
- `yert` — Implement approved todos
- `finito` — Complete and merge

---

# Questions?

**Remember:** This workflow applies the same proven practices that worked before AI—clear requirements, incremental implementation, continuous testing, and human oversight.

AI accelerates the "implement" step, but does not eliminate the need for the other steps.
