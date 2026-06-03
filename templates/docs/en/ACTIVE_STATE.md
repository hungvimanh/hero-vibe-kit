# Project Active State

**Last Updated:** {{DATE}}
**Current Global Phase:** 0 — Initialization & Setup

> 📌 **The "Active Features" table below IS the durable cross-session backlog.** It is the primary source of state when resuming.
> `TaskCreate`/`TaskList` only live **within the current session** (in-memory, lost when the session closes) — use them to track current work, NOT as a long-term backlog. Whenever a feature's status changes → update this table and the corresponding MR/issue (if any).

## Active Features in Pipeline

| Feature / Epic | Path | Current phase | Branch / MR | Status | PRD | TDD |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| N/A | N/A | N/A | - | Idle | - | - |

## Blockers / Pending Actions
- Waiting for the Product Owner to propose the first feature/idea.
- Decide the tech stack → fill the placeholders in [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md).
- Decide the design direction → update [TEAM_ROSTER.md](./TEAM_ROSTER.md) §4.

## Context budget discipline
This file is an index, not a report. Keep it short enough to read at session start.

Keep here:
- active goals and current phase/status,
- open blockers and next actions,
- decisions that still affect current work,
- links to canonical PRDs, TDDs, reports, MRs, issues, or archived notes.

Do not paste long investigation notes, transcripts, screenshots, logs, PRDs, or completed reports here. Summarize in 1–2 lines and link the source. When work is no longer active, archive durable details under `docs/reports/` (or the canonical artifact path) and replace the table entry with a short link if future agents may need it.

## Session Resume Protocol
*An AI starting or resuming tracked work READS this section:*
1. Read [AGENCY_WORKFLOW.md](./AGENCY_WORKFLOW.md) (SSOT) for the router & paths.
2. Read [ARTIFACTS_AND_STORAGE.md](./ARTIFACTS_AND_STORAGE.md) only if you need artifact locations for PRDs, TDDs, reports, design assets, or help content.
3. Look at the "Active Features" table above + any **open MRs** (`git branch`, MR list) — do NOT rely on the previous session's TaskList (it's gone).
4. By each feature's path & phase:
   - **Read-only/Fast**: continue/finish then open the MR.
   - **Standard/Full at Phase 1–2**: continue brainstorming/planning with the user (via the Plan Mode gate).
   - **Standard/Full at Phase 3–4**: open only the linked PRD/TDD/reports needed for the current step, check code & branch status, recreate tasks with `TaskCreate`, ask the user before resuming code/test.
5. Update this table when durable work state changes.
