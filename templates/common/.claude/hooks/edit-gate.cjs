#!/usr/bin/env node
'use strict';
/*
 * edit-gate.cjs — plan-gate enforcement for Edit/Write tool calls (v1.0.0)
 * Claude Code: PreToolUse (matcher: Edit, Write)
 *
 * Blocks Edit/Write on standard/full paths when:
 *   1. phase ∈ {planning, discovery}
 *   2. phase = null AND gates.plan.required = true
 *   3. gates.plan.required = true AND gates.plan.status ≠ approved
 *
 * Lean paths (read-only, fast, null) → always exit 0.
 * Safe file paths → always exit 0.
 * HVK_SKIP_EDIT_GATE=1 → emergency override.
 * Any read/parse error → fail-safe exit 0.
 */
const fs = require('fs');
const path = require('path');

const SAFE_PREFIXES = ['docs/', 'i18n/', 'tests/', '__tests__/', '.hero-vibe-kit/'];
const SAFE_PATTERNS = [/\.config\.[^/]+$/, /\.json$/];
const LEAN_PATHS = ['read-only', 'fast', null, undefined];
const LEAN_MODES = ['tiny', 'small', null, undefined];
const BLOCKING_PHASES = ['planning', 'discovery'];

let raw = '';
process.stdin.on('data', (d) => { raw += d; });
process.stdin.on('end', () => {
  let payload = {};
  try { payload = JSON.parse(raw || '{}'); } catch (_) { process.exit(0); }

  const toolName = payload.tool_name;
  if (toolName !== 'Edit' && toolName !== 'Write') process.exit(0);

  if (process.env.HVK_SKIP_EDIT_GATE === '1') process.exit(0);

  const cwd = (payload && payload.cwd) || process.cwd();
  const filePath = (payload.tool_input && payload.tool_input.file_path) || '';

  const sessionPath = path.join(cwd, '.hero-vibe-kit', 'session.json');
  let session;
  try { session = JSON.parse(fs.readFileSync(sessionPath, 'utf8')); } catch (_) { process.exit(0); }
  if (!session || typeof session !== 'object') process.exit(0);

  if (LEAN_PATHS.includes(session.path) || LEAN_MODES.includes(session.mode)) process.exit(0);

  const gated = ['standard', 'full'];
  if (!gated.includes(session.path) && !gated.includes(session.mode)) process.exit(0);

  const rel = path.relative(cwd, filePath).replace(/\\/g, '/');
  if (isSafe(rel)) process.exit(0);

  const phase = session.phase;
  const planGate = session.gates && session.gates.plan;

  if (BLOCKING_PHASES.includes(phase)) block(session, `phase=${phase}`);
  if (phase == null && planGate && planGate.required) block(session, 'phase not set and plan gate is required');
  if (planGate && planGate.required && planGate.status !== 'approved') block(session, `plan gate status=${planGate.status || 'pending'}`);

  process.exit(0);
});

function isSafe(rel) {
  if (SAFE_PREFIXES.some((p) => rel.startsWith(p))) return true;
  if (SAFE_PATTERNS.some((rx) => rx.test(rel))) return true;
  return false;
}

function block(session, reason) {
  const msg =
    `hero-vibe-kit: edit blocked — ${session.path || session.mode} path, ${reason}.\n\n` +
    `To unblock:\n` +
    `  - Advance to implementation phase via the phase-handoff skill, OR\n` +
    `  - Approve the plan gate (session.json gates.plan.status = "approved")\n\n` +
    `Safe paths (always allowed): docs/, tests/, i18n/, *.json, *.config.*\n` +
    `Override (emergency): HVK_SKIP_EDIT_GATE=1`;
  process.stderr.write('⛔ ' + msg + '\n\n');
  process.exit(2);
}
