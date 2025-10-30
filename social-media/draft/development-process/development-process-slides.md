---
marp: true
theme: default
paginate: true
---

# AI-Assisted Development Workflow
## A Structured Approach to Software Engineering with Claude and Codex

---

# Excursion: Github Universe 2025
## Github is the home for all developers and just announced Agent HQ which is proposed as the future of software development

---

## Agent HQ: The Future of Software Development?

**Any agent, any way you work — native to GitHub.**

- Unified, open ecosystem to orchestrate any agent, any time, anywhere
- Mission control to assign, steer, and track multiple agents
- Deep integrations: VS Code planning/customization, Copilot CLI, Copilot integrations
- Enterprise guardrails: agentic code review, AI control plane, usage metrics
- Works with your primitives: Git, pull requests, issues, Actions/self‑hosted runners
- 3rd‑party coding agents (Anthropic, OpenAI, Google, Cognition, xAI, more) within paid Copilot

---

## Who Agent HQ Is For

This is for very experienced developers who already run an AI‑assisted coding workflow — not beginners.

- Strong Git/PR/test discipline and governance in place
- Comfortable orchestrating multiple agents and supervising outcomes
- Skilled at prompt design and decomposing work into verifiable steps
- Brings existing toolchain: GitHub + Copilot + VS Code (+ Actions/runners)
- Goal is shipping faster with confidence — not “AI does everything”

---

# Excursion: Agent Landscape
## There are so many options to chose from that it feels like one is behind the curve and thus slower and less efficient

---

## The Agent Landscape (Beyond Claude/Codex/Copilot)

There are many high-quality coding assistants and tools:

<style scoped>
ul.two-col {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem 2rem;
  padding-left: 1.1em; /* keep bullets aligned */
}
ul.two-col li { margin: 0.1rem 0; }
</style>

<ul class="two-col">
  <li>Amazon Q Developer</li>
  <li>Google Gemini Code Assist</li>
  <li>Sourcegraph Cody</li>
  <li>Codeium</li>
  <li>Windsurf (AI IDE)</li>
  <li>Tabnine</li>
  <li>Cursor IDE</li>
  <li>JetBrains AI Assistant</li>
  <li>Replit AI (Ghostwriter)</li>
  <li>Continue (VS Code/JetBrains)</li>
  <li>Aider (CLI pair programmer)</li>
  <li>CodeRabbit (PR/code review)</li>
  <li>Cognition Devin</li>
  <li>OpenDevin (open source)</li>
  <li>Code Llama/Phind toolchains</li>
  <li>Lightning AI Studio/Truss agents</li>
</ul>

---

# Excursion: Developers & AI
## The job isn’t vanishing — it’s evolving toward orchestration, verification, and impact.

---

## The Doom Narrative

Some voices claim AI will replace developers:

- Headlines focus on demos, not production constraints
- Replacement myths ignore governance, security, and accountability
- Tooling shifts tasks, but ownership of outcomes remains human

---

## Reality Check: Still Software Engineering

- Even top engineers fight bugs, bad specs, and flaky infrastructure
- Treat AI like a senior teammate: fast and knowledgeable, but needs onboarding
- Provide clear scope, acceptance criteria, and tests to steer outputs
- Developers who wield AI remain essential — and multiply their leverage

## OpenAI cofounder Andrej Karpathy says it will take a decade before AI agents actually work

---

# Stay calm: Fundamentals have not changed
## An LLM does not inherently know the semantics or standards or edge cases. It still needs specifications, guardrails and tests to measure progress and success.

### This workflow shows you how to be successful using AI assistant

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

# Sensible Parallelism
## Where multiple agents actually help

- Research/PoCs: spike alternatives, wire new libs, answer “can this work?”
- System understanding: trace codepaths, map data flow, spot docs gaps
- Small maintenance: eliminate deprecation warnings, fix lints, unflake tests
- Pre-specified tasks: well-scoped changes with clear acceptance criteria
- Async/off-CPU: long-running research in cloud while you review locally

Note: Land one significant change at a time; keep the rest staged.

---

## Running Parallel Agents Safely

- Isolate work: separate branches/worktrees or temp checkouts; prefer containers
- Guardrails: approvals for prod repos; YOLO only for low-risk sandboxes
- Clear specs per agent: precise goals, exit criteria, and artifacts to return
- Review discipline: serialize reviews; merge only after verification/tests
- Context hygiene: kill runs that drift; stash agent notes for future prompts
- Tools that fit: Claude Code, Codex CLI/Cloud, Copilot Agent, Google Jules

Inspired by Simon Willison’s “Embracing the parallel coding agent lifestyle.”

---

# Next Tools: Frontend Focus
## Playwright (E2E) and Storybook (UI docs + interaction tests)

---

## Why These Tools Fit This Workflow

- Capture UI behavior as executable specs (stories and tests)
- Tight feedback loop for AI‑generated UI code
- Deterministic verification in CI for PR gates
- Incremental footprint; complements Claude + Codex + GitHub

---

## Playwright — End‑to‑End and Component Testing

- Cross‑browser automation: Chromium, WebKit, Firefox (headless or headed)
- Parallel tests, auto‑waits, network mocking, fixtures
- Tracing, screenshots, and video for debuggability
- Supports component testing for modern frameworks and full E2E via app URLs

```ts
// tests/todo.spec.ts
import { test, expect } from '@playwright/test'

test('add todo', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.getByPlaceholder('Add a task').fill('Buy milk')
  await page.getByRole('button', { name: 'Add' }).click()
  await expect(page.getByText('Buy milk')).toBeVisible()
})
```

---

## Playwright in an AI‑Assisted Flow

- Provide acceptance criteria and target selectors; ask AI to draft tests
- Prefer robust queries: `getByRole`, `getByLabelText`, `getByPlaceholder`
- Use `npx playwright codegen` to capture flows; have AI refactor to fixtures
- Keep E2E for critical paths; push most states to component tests
- CI: run Playwright on PRs; upload trace for failures

```sh
npm i -D @playwright/test
npx playwright install
npx playwright test
```

---

## Storybook — Isolated UI Development

- Build components in isolation; document states via stories
- Live docs and controls; accessibility checks via addon‑a11y
- Encode behavior with story `play` functions (Interaction Testing)
- Run interactions headlessly in CI via `@storybook/test-runner`

```ts
// Button.stories.ts
import { within, userEvent, expect } from '@storybook/test'

export const Filled = {
  args: { label: 'Save', disabled: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /save/i }))
    await expect(canvas.getByText(/saved/i)).toBeVisible()
  }
}
```

---

## Storybook in an AI‑Assisted Flow

- Ask AI to scaffold stories for every meaningful state and edge case
- Use `play` to turn acceptance criteria into executable interactions
- Reuse accessible queries via `@storybook/testing-library`
- Stories become the canonical spec AI reads and updates

---

## Storybook + Playwright Together

- Storybook Test Runner (built on Playwright) runs all `play` interactions in CI
- Optional visual checks: Playwright `toHaveScreenshot` or hosted visual review
- Strategy: stories cover states; Playwright E2E covers cross‑page flows
- Deterministic tests: mock APIs in stories; stub network in E2E where needed

---

## Minimal Setup (Frontend)

- Playwright: `npm i -D @playwright/test && npx playwright install`
- Storybook: `npx storybook@latest init` (framework specific)
- Add CI steps: build app, run Storybook tests, then Playwright E2E
- Save traces/screenshots as artifacts for quick AI‑assisted debugging

---

## Example Prompts for AI

**Playwright**
- “Given these acceptance criteria and routes, generate Playwright tests using `getByRole` selectors, add a fixture for logged‑in state, and mock the `GET /api/todos` response.”

**Storybook**
- “Create stories for `Button` covering default, loading, disabled, and destructive variants. Add a `play` function that clicks the button and asserts the `onClick` handler fired. Include basic a11y checks.”

---

# Questions?

**Remember:** This workflow applies the same proven practices that worked before AI—clear requirements, incremental implementation, continuous testing, and human oversight.

AI accelerates the "implement" step, but does not eliminate the need for the other steps.
