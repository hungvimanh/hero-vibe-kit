# Contributing to hero-vibe-kit

Thanks for helping improve hero-vibe-kit! It eats its own dog food — contributions follow the workflow template in `templates/docs/en/AGENCY_WORKFLOW.md`, mirrored in Vietnamese.

## Repo layout
```
bin/        CLI entry (hero-vibe-kit.js)
src/        CLI logic (detect, config, render, merge, init, update, doctor, integrations, links)
templates/  what gets installed into a consumer project
  docs/{en,vi}/   bilingual docs (keep BOTH in sync, including ARTIFACTS_AND_STORAGE)
  common/.claude/ hooks + settings.json
  skills/         VENDORED core process skills (MIT, from obra/superpowers) + NOTICE
  CLAUDE.md.tmpl AGENTS.md.tmpl
presets/    solo | small-team | enterprise
test/       node:test suites (hooks, links, init-smoke, manifest, skills-vendor)
skills.manifest.json  vendored core (process) + referenced design/taste skills
```

## Rules of thumb
- **Zero runtime dependencies.** CLI uses only Node built-ins. Keep it that way.
- **Bilingual parity.** Any change to `templates/docs/en/*` must be mirrored in `templates/docs/vi/*` (same files, same structure, same internal links). `npm test` checks link integrity for both.
- **Placeholders**: use `{{PROJECT_NAME}}`, `{{DATE}}`, `{{TEAM_SIZE}}`, `{{BRANCHING_MODEL}}` for values rendered at init. Use `<TBD>` for values the *user* fills later (e.g. stack commands).
- **Managed regions**: never instruct users to hand-edit inside `<!-- hero-vibe-kit:start/end -->`.
- **Skills.** Only the curated MIT-licensed core process skills are vendored under `templates/skills/` (with `NOTICE` attribution); they install into a consumer's `.claude/skills/`. Vendored skills are English-only (the bilingual-parity rule applies to `templates/docs/{en,vi}` only). Reference everything else (design/taste, GitNexus, Serena) in `skills.manifest.json` and install via their CLI — don't redistribute non-permissive or unattributed skills/tools.
- **Hooks must stay portable** (Node, cross-platform) and fail-safe (never block on parse errors).

## Before opening a PR
```bash
npm test          # hooks self-tests + bilingual link integrity + init/brownfield smoke
node bin/hero-vibe-kit.js init --dir /tmp/x --yes && node bin/hero-vibe-kit.js doctor --dir /tmp/x
```
- Add a `CHANGELOG.md` entry under *Unreleased*.
- Keep PRs scoped (see the task router); use Conventional Commits.

## Releasing
Bump `package.json` version (SemVer), move the CHANGELOG *Unreleased* section under the new version, tag, publish.
