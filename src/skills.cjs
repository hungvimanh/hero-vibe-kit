'use strict';
const fs = require('fs');
const path = require('path');
const { exists, ensureDir } = require('./util.cjs');

// Recursively copy a directory tree, returning the number of files written.
function copyTree(srcDir, dstDir) {
  let files = 0;
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, entry.name);
    const d = path.join(dstDir, entry.name);
    if (entry.isDirectory()) files += copyTree(s, d);
    else { ensureDir(path.dirname(d)); fs.copyFileSync(s, d); files++; }
  }
  return files;
}

// Install vendored core skills (templates/skills/<name>/) into the consumer's
// native Claude Code skills dir (.claude/skills/<name>/). Framework-managed:
// overwrites the framework's own skill dirs and the NOTICE file, but never
// touches skill dirs the user added themselves.
function installSkills(pkgRoot, target) {
  const src = path.join(pkgRoot, 'templates', 'skills');
  if (!exists(src)) return { skills: 0, files: 0 };
  const dstRoot = path.join(target, '.claude', 'skills');
  let skills = 0, files = 0;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      files += copyTree(path.join(src, entry.name), path.join(dstRoot, entry.name));
      skills++;
    } else {
      ensureDir(dstRoot);
      fs.copyFileSync(path.join(src, entry.name), path.join(dstRoot, entry.name));
      files++;
    }
  }
  return { skills, files };
}

module.exports = { installSkills, copyTree };
