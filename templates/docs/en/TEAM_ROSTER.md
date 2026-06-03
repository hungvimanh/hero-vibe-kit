# Team Roster & Agent Personas

> Personas are **thinking lenses**, not mandatory ceremony for every task. The process & paths: see [AGENCY_WORKFLOW.md](./AGENCY_WORKFLOW.md) (SSOT).

## 1. Main Agent (Lead)
Holds the session, talks to the user, orchestrates sub-agents. Rotates hats:
- **BA** — `brainstorming`: clarify requirements, write the PRD, get sign-off (Gate 1).
- **System Architect** — `gitnexus_exploring` + `gitnexus_impact`: design, write the TDD, lock the API contract + threat model, split tasks (Gate 2).
- **Scrum Master** — manages [ACTIVE_STATE.md](./ACTIVE_STATE.md), updates CLAUDE.md, and uses Serena for semantic code navigation when configured.
- **Design/UX lens** — `brainstorming` (+ visual companion) for flows/wireframes; the locked direction for visual; see [DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md).

## 2. Sub-agents (Dev / QA)
Spawned via the `Agent` tool when the work is large enough (Standard/Full path).

> ⚠️ **Sub-agents do NOT inherit the Main Agent's conversation, skills, or context.** So **every spawn prompt must be SELF-CONTAINED**, including:
> 1. Links to the specific **PRD/TDD** files to read.
> 2. Persona + **the skill names to invoke** (be explicit, e.g. "use the `test-driven-development` skill").
> 3. **Done criteria** (point to the matching path in [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md)).
> 4. The list of relevant files/areas + constraints (API contract).

| Role | Skills/Tools | Job |
|------|--------------|-----|
| **Frontend Dev** | the locked design direction (see §3), test-driven-development | Implement the UI per the TDD, follow the design system |
| **Backend Dev** | test-driven-development | Logic / API / DB schema, safe & efficient |
| **Code Reviewer** (`code-reviewer`) | code-review, simplify | Review diffs: correctness, security, cleanliness |
| **QA / Security** | security-review, systematic-debugging, verification-before-completion, verify | Break the code, find bugs, ensure execution flows are intact |

## 3. Design direction & profile
Design standards, skill routing, and the "pick exactly one direction" rule live in [DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md). Lock these per project (in the first PRD/Design Brief):
- Design profile for {{PROJECT_NAME}}: **`<TBD — system-strict | branded-product | expressive>`**
- Chosen visual direction: **`<TBD — fill when the first UI feature appears>`**
> Do NOT invoke multiple design skills at once within one feature → avoids inconsistent UI.

## 4. Delegation rules
1. **Don't write the bulk of the code in the main thread** if the work is large → delegate to sub-agents.
2. **Conditional parallelization**: only spawn FE & BE in parallel **after the API contract is locked in Phase 2**.
3. **Worktrees**: use `isolation: "worktree"` when multiple agents may edit overlapping files.
