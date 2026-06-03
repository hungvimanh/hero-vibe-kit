# Team Roster & Agent Personas

> Personas are **thinking lenses**, not mandatory ceremony for every task. Routing, gates, and phase sequencing live in [AGENCY_WORKFLOW.md](./AGENCY_WORKFLOW.md) (SSOT).

## 1. Main Agent (Lead)
Holds the session, talks to the user, and orchestrates sub-agents. Rotates hats:
- **BA** — clarify requirements, write the PRD, get sign-off (Gate 1).
- **System Architect** — explore architecture, run impact analysis, write the TDD, lock contracts, split tasks (Gate 2).
- **Scrum Master** — manages [ACTIVE_STATE.md](./ACTIVE_STATE.md), links artifacts, and coordinates handoff.
- **Design/UX lens** — flows/wireframes and locked visual direction; see [DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md).

## 2. Path-triggered delegation
Sub-agent delegation reduces main-thread context and enforces specialist review. The path decides; the user does not need to ask for sub-agents.

- **Fast path** → sub-agents optional; main agent may implement directly.
- **Standard path** → MUST spawn a review sub-agent (QA/code-review) before completion.
- **Full path** → MUST delegate Dev implementation + spawn QA as sub-agents.
- **Brownfield first change** → if `docs/BROWNFIELD_DISCOVERY.md` exists and the request touches > 2 files or **Needs confirmation** areas, treat as Standard (gate + review sub-agent).

## 3. Sub-agent prompt contract
Sub-agents do NOT inherit the Main Agent's conversation, skills, or context. Every spawn prompt must be SELF-CONTAINED and concise:
1. Role/persona + specific deliverable.
2. Files/areas to inspect and files to avoid.
3. PRD/TDD/report links when they exist.
4. Skills/tools to invoke, when relevant.
5. Done criteria from [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md).
6. Output format: findings, risks, decisions, next steps, and file/path citations — not transcripts.

| Role | Skills/Tools | Job |
|------|--------------|-----|
| **Frontend Dev** | locked design direction, test-driven-development | Implement UI per the TDD and design system |
| **Backend Dev** | test-driven-development | Logic / API / DB schema, safe & efficient |
| **Code Reviewer** (`code-reviewer`) | code-review, simplify | Review diffs: correctness, security, cleanliness |
| **QA / Security** | security-review, systematic-debugging, verification-before-completion, verify | Break the code, find bugs, ensure execution flows are intact |

## 4. Design direction & profile
Design standards, skill routing, and the "pick exactly one direction" rule live in [DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md). Lock these per project (in the first PRD/Design Brief):
- Design profile for {{PROJECT_NAME}}: **`<TBD — system-strict | branded-product | expressive>`**
- Chosen visual direction: **`<TBD — fill when the first UI feature appears>`**

## 5. Parallelization and worktrees
- Only spawn FE & BE in parallel after the API/interface contract is locked.
- Use `isolation: "worktree"` when multiple agents may edit overlapping files.
