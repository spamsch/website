# Goals

This documentation defines a standardized, opinionated developer workflow that enables teams to integrate AI tools into daily software development without losing structure, review quality, or code discipline.

## Setting Realistic Expectations

This workflow will **not** produce the dramatic speed gains often promoted in AI development hype. You may have read about developers launching dozens of agents in parallel, generating thousands of lines of code in minutes, or completing features in a fraction of the usual time. **That approach produces poor code.**

The reality of effective AI-assisted development mirrors the principles that have worked for decades:

1. **Clearly define what you want** — vague prompts generate vague code
2. **Provide focused, relevant context** — LLMs have no memory; they need explicit knowledge for each task
3. **Break work into discrete todos** — one well-scoped task at a time, not monolithic generation
4. **Establish feedback mechanisms** — unit tests and human checkpoints catch errors early
5. **Iterate deliberately** — generate, review, test, refine; never blindly merge generated code

Large Language Models (LLMs) must be treated as new development engineers: highly capable, fast learners, but with **zero working memory**. Each task requires a clean onboarding process that provides context, scope, and constraints. LLMs cannot easily recall prior sessions or infer implicit knowledge. Every interaction must reestablish the working environment, requirements, and coding standards explicitly.

**What this workflow optimizes for:**
- **Code quality** — tested, reviewed, maintainable implementations
- **Developer productivity** — focus on architecture and design while AI handles boilerplate
- **Reproducibility** — deterministic workflows that produce consistent results
- **Knowledge preservation** — all context, decisions, and iterations captured in version control

**What this workflow does not optimize for:**
- **Raw speed** — generating 10,000 lines of untested code in 5 minutes is worthless
- **Massive parallelism** — running 20 agents simultaneously creates coordination chaos
- **Autonomous operation** — human checkpoints are mandatory, not optional
- **"AI does everything"** — developers remain responsible for architecture, review, and integration

The time savings come from **eliminating repetitive work** (boilerplate, test scaffolding, routine refactoring), not from bypassing proper software engineering discipline. If you follow this workflow rigorously, expect 20-40% productivity gains on well-defined tasks, not 10x mythical breakthroughs.

## Preserving Developer Learning and Growth

**This workflow ensures developers continue to learn and gain experience.** This is critical because humans need to stay in the loop—and will for the foreseeable future.

Other AI-assisted workflows that emphasize full automation and "AI does everything" approaches have a dangerous side effect: **they make developers dumber and software more error-prone.** When developers become passive consumers of AI-generated code without understanding what's being produced, several problems emerge:

1. **Skill atrophy** — Developers lose the ability to debug, architect, or reason about code they didn't write and don't understand
2. **Blind trust** — Without reviewing and testing each increment, subtle bugs and architectural flaws accumulate undetected
3. **Context loss** — When AI generates thousands of lines without human checkpoints, no one understands the system anymore
4. **Inability to maintain** — Code that no human has read or understood becomes unmaintainable the moment something breaks
5. **Loss of judgment** — Developers who don't practice making design decisions lose the ability to make good ones

**This workflow keeps developers actively engaged:**

- **You define the task** — forces you to think clearly about requirements and scope
- **You review the generated code** — ensures you understand what was created and why
- **You write or validate tests** — confirms you understand the expected behavior
- **You make architectural decisions** — Codex provides opinions, but you decide
- **You iterate incrementally** — each small step builds understanding rather than creating a black box
- **You integrate and verify** — you remain responsible for the system's correctness

By maintaining human checkpoints at every stage, you continue to build expertise in:
- System architecture and design patterns
- Debugging and problem-solving
- Code review and quality assessment
- Test strategy and verification
- Trade-off analysis and decision-making

**The result:** AI accelerates your execution speed on tasks you already understand, freeing mental bandwidth to tackle harder architectural problems and learn new domains. You become a **more capable developer**, not a dependent one.

Workflows that treat AI as a black-box code factory produce developers who can't function when the AI fails, makes a mistake, or encounters a novel problem. This workflow treats AI as a **force multiplier for capable developers**, not a replacement for developer judgment and understanding.

## Primary Objectives

1. **Accelerate onboarding to AI-assisted development.**  
   Provide developers with a clear, reproducible process for using Claude, Codex, and cc-sessions within a GitHub-based workflow.

2. **Enforce minimal tool footprint.**  
   Restrict subscriptions and dependencies to three core systems:  
   - **Claude** — code generation, refactoring, test scaffolding  
   - **Codex** — reasoning, code review, documentation refinement  
   - **GitHub** — version control, CI/CD, review integration  
   This constraint ensures predictable maintenance, compliance, and security
   overhead. There is no need for Code Rabbit, AutoGen, Crew AI or others. This
   also holds for Cursor or Windsurf. The foundational models are performing
   well and just need a bit more setup.

3. **Institutionalize structured iteration.**  
   Establish a process where each development task moves through a defined sequence:
   - **Definition:** clear, scoped description of what needs to be achieved  
   - **Iteration:** AI-assisted refinement through cc-sessions until the task is well specified  
   - **Execution:** implementation with AI assistance  
   - **Review:** automated PR review by Claude and human verification before merge  

4. **Codify best practices in markdown.**  
   Maintain all project standards—structure, conventions, and code guidelines—in version-controlled Markdown files located in `/docs/`. These serve as canonical references for both human developers and AI tools.

5. **Standardize repository workflow.**  
   Adopt a unified branching model:
   - `main` — stable, deployable branch  
   - `dev` — integration branch for ongoing work  
   - `feature/*` — short-lived branches tied to open pull requests  
   Every PR must pass automated Claude review (`anthropic/claude-code-action`) and at least one human review.

6. **Foster traceability and accountability.**  
   Each AI interaction, code generation, and revision cycle must be traceable via cc-sessions metadata and commit messages. This ensures transparency, compliance, and reproducibility.

7. **Make unit tests the operational checkpoints.**
   Every implementation step must result in at least one verifiable unit test. Tests serve as objective checkpoints marking task progression, confirming each functional milestone, and ensuring correctness across iterative AI-assisted development. Each LLM-generated code change must be coupled with a corresponding or updated test, forming the validation baseline before merge.

   **This is the critical feedback mechanism.** Without tests, LLM-generated code is unverified speculation. With tests, each todo becomes a provable increment. This principle applies equally to human-written and AI-generated code—if it's not tested, it's not done. The same discipline that prevented bugs in the decades before AI remains essential: write the test, verify it passes, then move to the next todo.

## Desired Outcomes

- Developers understand how to effectively collaborate with AI tools without fragmenting the workflow or sacrificing code quality for speed.
- LLMs can rejoin any project or feature discussion by reading structured onboarding material instead of relying on prior chat history.
- Review and documentation quality improve through structured iteration loops and mandatory testing checkpoints.
- Teams achieve **sustainable, measurable velocity gains** (20-40% on routine tasks) through elimination of boilerplate work, not through bypassing proper engineering discipline.
- Development remains predictable and reproducible—AI assistance accelerates execution, but human judgment governs architecture and integration decisions.
- The workflow can be adopted across multiple projects with minimal adaptation.

# Roles and Responsibilities

The workflow defines clear separation of responsibilities between human developers, AI systems, and orchestration components. Each role has a precise purpose, strict context boundaries, and deterministic interaction flow. This prevents ambiguity, feedback loops, and context loss.

## Human Developer

- Defines and owns the task scope and acceptance criteria using **cc-sessions task creation protocol** (`mek:` trigger phrase).
- Never manually creates task files — always uses cc-sessions to ensure proper structure and frontmatter.
- Initiates structured sessions through **cc-sessions** (`start^:`, `yert`, `finito`).
- Provides the explicit onboarding context to the LLMs (no implicit assumptions).
- Reviews AI output and integrates validated results into feature branches.
- Maintains test discipline — each functional increment must be validated by a unit test checkpoint.

## Claude — Code Generation and Implementation Engine

- Acts as the **primary code generation tool** for all implementation work.
- Accepts high-level input (task description, questions, refinement requests) and **directly generates code**, tests, and documentation.
- Performs refactoring, scaffolding, debugging, and iterative code development.
- Maintains short-term conversational state for the current task only. No persistent memory.
- Responsible for translating human intent into working code implementations.
- Provides summaries, explanations, and iteration guidance back to the developer.
- **Optionally** consults Codex through **MCP (Model Context Protocol)** when a second opinion or architectural review is needed.

## Codex — Second Opinion and Architectural Advisor (via MCP)

- Connected to Claude through **MCP** as an external LLM endpoint.
- **Not used for code generation** — only for review, validation, and advisory opinions.
- Invoked **selectively** when Claude or the developer needs:
  - Architectural feasibility assessment before implementation begins
  - Review of complex design decisions or trade-offs
  - Validation that proposed approach aligns with project standards
  - Second opinion on refactoring strategies or test coverage gaps
- Evaluates proposals, identifies risks, and suggests alternative approaches.
- Returns structured feedback (review notes, architectural concerns, validation results) to Claude.
- **Never writes code directly** — only provides opinions that inform Claude's generation work.

## cc-sessions — Orchestrator

- Serves as the deterministic **execution and coordination layer**.
- Handles session metadata, context assembly, model routing, and iteration sequencing.
- Guarantees that each workflow run is reproducible from the same inputs.
- Captures all input/output artifacts from Claude and Codex, including intermediate reasoning steps, code suggestions, and reviews.
- Ensures that session logs, task references, and resulting commits are linked for traceability.
- Enforces the task progression sequence: **define → iterate → implement → test → review → merge**.

**Key trigger phrases:**
- **`mek:`** — Create new task files with interactive prompts
- **`start^:`** — Load existing task, checkout branch, begin implementation
- **`yert`** — Implement approved todo items from the current task
- **`finito`** — Complete task workflow: commit, merge, cleanup, update status

**Configuration:**
- All settings stored in `sessions/sessions-config.json`
- Task state tracked in `sessions/sessions-state.json`
- Customizable trigger phrases, git workflows, and feature toggles

## Claude Code GitHub Action — Final Review Layer

- Triggered automatically after a push or PR creation.  
- Executes an **independent AI review** using Anthropic’s `claude-code-action`.  
- Operates with read-only access to the PR diff, tests, and documentation.  
- Checks for:
  - Code style compliance  
  - Missing or insufficient tests  
  - Architectural and security issues  
  - Ambiguous or incomplete documentation  
- Posts a structured review comment in the PR and sets the GitHub status accordingly.  
- Serves as the final automated gate before human approval and merge.

## Interaction Flow Summary

Developer → Claude (Code Generation & Implementation)
→ [Optional] MCP → Codex (Second Opinion / Architectural Review)
→ cc-sessions (Context and Iteration Orchestration)
→ GitHub Push → Claude Code Action (Final PR Review)

This architecture enforces separation of concerns:
- **Claude** interfaces with the human, generates code, and implements solutions.
- **Codex** provides optional second opinions and architectural validation when requested.
- **cc-sessions** guarantees deterministic execution and traceability.
- **Claude Code Action** acts as the last autonomous review gate before human merge approval.

# Task Lifecycle

The workflow defines a deterministic, test-driven lifecycle for every development task.
Each task is a closed loop: **define → onboard → iterate → implement → test → review → merge**.
No work proceeds without a defined task file, contextual onboarding, and corresponding unit tests.

**Important:** This lifecycle applies the same proven practices that worked before AI—clear requirements, incremental implementation, continuous testing, and human oversight. AI accelerates the "implement" step, but does not eliminate the need for the other steps. Trying to skip directly to "mass generation" without proper definition, testing, and review produces unmaintainable code regardless of how fast it was generated.

## 1. Task Definition

Every feature or bug fix begins as a Markdown file in `sessions/tasks/`.
This file is the single source of truth for the task scope and serves as the onboarding material for both human developers and LLMs.

**cc-sessions** requires task files to include frontmatter that tracks status, branch references, and success criteria. This enables automatic branch discipline and progress tracking.

**Creating a new task:**

Always use the cc-sessions task creation protocol via the `mek:` trigger phrase:

```
mek: Add /api/status endpoint for monitoring
```

This initiates the task creation workflow where Claude:
1. Interactively prompts for task details (context, scope, acceptance criteria)
2. Generates a properly formatted task file with frontmatter in `sessions/tasks/`
3. Automatically creates the associated git branch
4. Establishes context manifests through codebase analysis
5. Ensures task persistence across sessions

**Never manually create task files.** The cc-sessions protocol ensures correct structure, frontmatter, and integration with the workflow automation system.

**Example task file:**

`sessions/tasks/2025-10-22-add-status-endpoint.md`
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
It should return:
```json
{ "status": "ok", "db_connected": true, "version": "1.2.5" }
```

## Acceptance Criteria
- Returns HTTP 200 and JSON payload as above
- Unit test covers positive and simulated DB-down scenarios
- Endpoint included in OpenAPI schema

## 2. Onboarding the LLM

The developer initiates a session using **cc-sessions** trigger phrases.

**cc-sessions Workflow (Developer → Claude)**

```
start^: sessions/tasks/2025-10-22-add-status-endpoint.md
```

The `start^:` trigger phrase tells cc-sessions to:
- Load the task file and parse frontmatter
- Create or checkout the associated feature branch
- Provide task context to Claude
- Prepare Claude to propose an implementation approach (DAIC enforcement)

**Claude Behavior**
- Reads the task description and frontmatter
- Extracts core requirements and success criteria
- Retrieves relevant files (`main.py`, `routes/`, `db.py`, etc.) via repo search
- Proposes implementation approach for developer approval
- Prepares to generate implementation code after approval

## 3. Implementation by Claude

After the task is loaded via `start^:`, Claude proposes an implementation approach (DAIC enforcement). Once the developer approves the approach, Claude generates the implementation.

**Incremental implementation with cc-sessions:**

If the task has been broken into todos, use:
```
yert
```

This tells Claude to implement **only the approved todo items** from the current task, maintaining incremental progress discipline.

**Claude's Code Generation**

Claude analyzes:
- `app/main.py` — FastAPI app structure
- `app/routes/` — existing route patterns
- `app/db.py` — database connection utilities

Claude generates:
- `app/routes/status.py` — new status endpoint
- `tests/test_status.py` — unit tests covering success and DB failure cases

**Example Output**

```python
# app/routes/status.py
from fastapi import APIRouter
from app.db import get_db_connection
import app

router = APIRouter()

@router.get("/api/status")
async def get_status():
    """Returns service health status."""
    db_ok = get_db_connection() is not None
    return {
        "status": "ok",
        "db_connected": db_ok,
        "version": app.__version__
    }
```

The developer reviews the generated code.

## 3a. Optional: Request Codex Second Opinion

If the developer wants architectural validation **before** committing, they can ask Claude to consult Codex.

**Developer → Claude**

"Before we commit this, can you get Codex's opinion on whether this status endpoint design aligns with our monitoring architecture?"

**Claude → Codex (via MCP)**

CONTEXT: Proposed /api/status endpoint implementation.
CODE: [generated status.py above]
QUESTION: Does this design align with standard health check patterns? Any architectural concerns?

**Codex Response → Claude**

✅ Design is sound.
⚠️ Consider adding response time measurement for the DB check.
💡 Suggest wrapping DB call in try/except to return db_connected: false rather than error on failure.

**Claude → Developer**

Codex suggests two improvements:
1. Add DB connection timing
2. Handle DB errors gracefully in the endpoint

Would you like me to update the implementation?

The developer confirms and Claude regenerates the improved version.

## 4. Commit

Developer commits the Claude-generated code manually, through Claude's assisted commit function, or using cc-sessions workflow completion.

**Manual commit:**
```bash
git checkout -b feature/status-endpoint
# apply suggested changes
pytest tests/test_status.py
git add app/routes/status.py tests/test_status.py
git commit -m "Add /api/status endpoint and tests"
git push origin feature/status-endpoint
```

**Or use cc-sessions completion:**
```
finito
```

The `finito` trigger automates the complete task completion workflow:
- Commits all changes with a properly formatted commit message
- Updates task status to `completed` in frontmatter
- Merges to target branch (if configured)
- Cleans up temporary state
- Updates `sessions/sessions-state.json`


## 5. Unit Test Checkpoint

Each implemented step requires at least one unit test confirming correctness.
The test suite acts as a live checklist for task progression.

**Critical principle:** Tests are the feedback mechanism that validates LLM output. This is not optional or "nice to have"—it's the only way to verify that generated code actually works. The same rule that applied before AI still applies: **untested code is broken code until proven otherwise.**

**Checkpoint Verification**

```bash
pytest -q --disable-warnings
..
2 passed in 0.45s
```

If tests pass, the task is considered functionally complete. If tests fail, the implementation is incomplete regardless of how much code was generated. Never proceed to the next todo until the current one has passing tests.

**This is where velocity gains come from:** Claude generates the test scaffolding and initial implementation quickly, but the human developer must verify correctness before moving forward. Skipping this step to "go faster" inevitably creates technical debt that slows future work.

## 6. Pull Request and Automated Review

Create a PR against dev:

```bash
gh pr create --base dev --head feature/status-endpoint --title "Add /api/status endpoint" --body "Implements sessions/tasks/2025-10-22-add-status-endpoint.md"
```

Once pushed, the Claude Code GitHub Action runs automatically.

Automated Claude Review Output (PR comment)

### Claude Code Review

**Findings**
- ✅ Code style conforms to guidelines.
- ✅ Endpoint properly registered.
- ⚠ Missing docstring in `get_status()` function.

**Tests**
- 2 unit tests detected and passing.
- No coverage regressions.

**Verdict**
READY TO MERGE after adding minimal function docstring.

Developer adds the missing docstring, pushes the change, and the action reruns successfully.

## 7. Merge and Deployment

After Claude's approval and one human review, the PR merges into dev.
A subsequent CI run deploys to staging.
Once validated, it merges into main.

Merge Sequence

feature/status-endpoint → dev → main

**Final State**
- Task status updated to `completed` in frontmatter
- Task file in `sessions/tasks/` reflects final state
- All tests passing
- PR reviewed by Claude Code Action and human reviewer
- Session state captured in `sessions/sessions-state.json`

Lifecycle Summary

Stage	Responsible Entity	Output	Checkpoint
Define	Developer	sessions/tasks/<id>.md	Task file created with frontmatter
Onboard	cc-sessions + Claude	Structured context	Task loaded, branch created
Implement	Claude	Code + tests	Generated
Review (optional)	Codex (via MCP)	Architectural feedback	Design validated
Commit	Developer	Committed code	Unit tests pass
PR Review	Claude Code Action	Automated review	All tests + checks pass
Merge	Human + CI	Code merged	Production ready

Each task thus becomes a reproducible, test-verifiable trace through the workflow — from structured definition to verified deployment.

# When to Use Claude vs. Codex: Practical Examples

Understanding when to use each tool is critical to an efficient workflow. Claude handles all code generation; Codex provides strategic review and validation.

## Scenario 1: Simple Feature Implementation

**Task:** Add a new user profile field to store timezone preference.

**Workflow:**
1. Developer uses cc-sessions to create task: `mek: Add timezone field to user profile`
2. Claude interactively prompts for details and generates `sessions/tasks/2025-10-22-add-timezone-field.md`
3. Developer starts implementation: `start^: sessions/tasks/2025-10-22-add-timezone-field.md`
4. **Claude generates:**
   - Database migration
   - Model updates
   - API endpoint changes
   - Unit tests
5. Developer reviews, commits, and pushes
6. **No Codex consultation needed** — straightforward implementation with clear requirements

**Why Claude only?**
The task is well-defined with no architectural ambiguity. Claude can generate the complete solution without needing a second opinion.

---

## Scenario 2: Architectural Decision Required

**Task:** Implement real-time notifications for user activity.

**Workflow:**
1. Developer creates task: `mek: Implement real-time notifications for user activity`
2. Claude prompts for details; developer notes uncertainty about approach (WebSockets vs. Server-Sent Events vs. polling)
3. Developer starts task: `start^: sessions/tasks/2025-10-22-realtime-notifications.md`
4. Developer asks Claude: "Before implementing, consult Codex on the best approach for real-time notifications given our current FastAPI + React stack"
5. **Claude → Codex (via MCP):**
   ```
   CONTEXT: FastAPI backend, React frontend, Nginx reverse proxy, 5000 concurrent users expected
   QUESTION: WebSockets vs SSE vs long-polling for user activity notifications?
   CONSTRAINTS: Must work behind Nginx, minimal infrastructure changes
   ```
6. **Codex responds:**
   ```
   ✅ Recommend Server-Sent Events (SSE)
   REASONING:
   - Nginx has native SSE proxy support
   - Simpler than WebSockets (no upgrade handshake complexity)
   - Built-in reconnection in EventSource API
   - FastAPI has excellent SSE support via StreamingResponse

   ⚠️ WebSockets would require additional Nginx configuration
   ❌ Long-polling creates unnecessary load at 5000 users
   ```
7. **Claude implements SSE solution** based on Codex's recommendation
8. Developer commits the Claude-generated implementation

**Why involve Codex?**
The task has multiple valid approaches with different trade-offs. Codex provides architectural analysis before Claude generates code, preventing costly rewrites.

---

## Scenario 3: Code Review During Refactoring

**Task:** Refactor authentication middleware to support multiple token types.

**Workflow:**
1. Developer creates task: `mek: Refactor auth middleware to support JWT and API key authentication`
2. Developer starts task: `start^: sessions/tasks/2025-10-22-refactor-auth-middleware.md`
3. **Claude generates** the refactored middleware code
4. Developer reviews and notices increased complexity
5. Developer asks Claude: "Get Codex's opinion on whether this refactoring maintains good separation of concerns"
6. **Claude → Codex:**
   ```
   CONTEXT: Refactored auth middleware (see attached code)
   QUESTION: Does this maintain clean separation of concerns? Any architectural red flags?
   ```
7. **Codex responds:**
   ```
   ⚠️ CONCERNS:
   - Single middleware handles two different auth strategies (violates SRP)
   - Token validation logic mixed with request handling

   💡 SUGGESTION:
   - Split into two middleware: JWTAuthMiddleware and APIKeyAuthMiddleware
   - Create shared base class: BaseAuthMiddleware
   - Use strategy pattern for token validation
   ```
8. Developer asks Claude: "Implement Codex's suggested strategy pattern approach"
9. **Claude regenerates** the improved implementation
10. Developer commits the final version

**Why both tools?**
Claude generates the initial refactoring quickly, but Codex provides critical architectural review that catches design issues before they're committed.

---

## Scenario 4: Pure Implementation (No Opinion Needed)

**Task:** Fix a bug where user emails aren't being validated properly.

**Workflow:**
1. Developer creates task: `mek: Fix email validation bug`
2. Claude prompts for bug details (steps to reproduce, expected vs actual behavior)
3. Developer starts task: `start^: sessions/tasks/2025-10-22-email-validation-bug.md`
4. **Claude:**
   - Reads the bug report
   - Analyzes the existing validation code
   - Generates the fix with updated regex and tests
5. Developer commits immediately
6. **No Codex consultation** — bug fixes rarely need architectural review

**Why Claude only?**
Bug fixes are tactical corrections with clear correctness criteria. Codex's strategic review adds no value here.

---

## Decision Matrix

| Situation | Use Claude | Consult Codex |
|-----------|-----------|---------------|
| Feature implementation with clear requirements | ✅ Generate code | ❌ Not needed |
| Bug fix with known solution | ✅ Generate fix | ❌ Not needed |
| Refactoring with unclear impact | ✅ Generate code | ✅ Review design |
| Multiple architectural approaches exist | ✅ Implement chosen approach | ✅ Evaluate trade-offs first |
| Performance optimization strategy | ✅ Implement optimization | ✅ Validate approach |
| Simple CRUD endpoint | ✅ Generate code | ❌ Not needed |
| New system integration | ✅ Generate integration code | ✅ Review integration pattern |
| Test coverage improvement | ✅ Generate tests | ❌ Not needed |
| Database schema migration | ✅ Generate migration | ✅ Review if major schema change |

**General Rule:**
Use Claude for **all code generation**. Consult Codex when you need **architectural validation, design trade-off analysis, or a second opinion on complex decisions**.

# Setup

Minimal configuration to wire Claude, Codex (via MCP), and notification hooks. Snippets are exact; adapt paths and model IDs to your environment.

## 1) Register Codex as an MCP server for Claude

**Command**
```bash
claude mcp add --transport stdio -s user codex -- codex -m gpt-5-codex -c model_reasoning_effort=medium mcp-server
```

What it does
	•	claude mcp add — registers an MCP server for Claude Desktop.
	•	--transport stdio — launches the server over STDIN/STDOUT; required for local processes.
	•	-s user — stores the config in the user-scoped settings (not workspace-only).
	•	codex — logical server name as it will appear in Claude’s tools list.
	•	-- codex ... mcp-server — executable and args after -- are passed verbatim to the server:
	•	codex — your MCP server binary or script name on PATH.
	•	-m gpt-5-codex — model identifier used by the server.
	•	-c model_reasoning_effort=medium — server-specific config flag (key=value).
	•	mcp-server — subcommand telling the binary to run in MCP mode.

Result
	•	Claude exposes tools from the codex MCP server.
	•	Calls from Claude to Codex travel via MCP with deterministic stdio transport.

Verification

claude mcp list
claude mcp inspect codex


2) Voice/OS notification when Claude finishes an action or run

Config fragment

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "deno run --allow-run jsr:@wyattjoh/claude-code-notification"
          }
        ]
      }
    ]
  }
}
```

What it does
	•	Attaches a Stop hook to Claude Code’s run lifecycle.
	•	On completion, executes the command to trigger a system notification (and optional voice output depending on the notifier).
	•	deno run --allow-run jsr:@wyattjoh/claude-code-notification — runs the notifier script via Deno; --allow-run permits spawning platform-specific notifiers.

Placement
	•	Insert into the Claude Code configuration file (project or user scope), under the root-level hooks key.
	•	Ensure deno is installed and jsr:@wyattjoh/claude-code-notification is resolvable.

Verification
	•	Trigger any Claude Code run (e.g., format, review). On completion, an OS notification (and, if configured, voice feedback) fires.

⸻

3) Notes for deterministic operation
	•	Pin model IDs (-m gpt-5-codex) and reasoning configs (model_reasoning_effort=medium) to avoid drift.
	•	Keep MCP servers silent on stdout except for JSON-RPC frames; log to stderr or files.


