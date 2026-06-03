'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { checkLinks } = require('../src/links.cjs');

function relativeFiles(root) {
  const out = [];
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else out.push(path.relative(root, p).split(path.sep).join('/'));
    }
  }
  walk(root);
  return out.sort();
}

for (const lang of ['en', 'vi']) {
  test(`doc links resolve (${lang})`, () => {
    const dir = path.join(__dirname, '..', 'templates', 'docs', lang);
    const { broken, checked } = checkLinks([dir]);
    assert.ok(checked > 0, 'should check some links');
    assert.deepStrictEqual(broken, [], 'no broken links: ' + JSON.stringify(broken));
  });
}

test('template docs language trees have identical relative file sets', () => {
  const docsRoot = path.join(__dirname, '..', 'templates', 'docs');
  assert.deepStrictEqual(relativeFiles(path.join(docsRoot, 'vi')), relativeFiles(path.join(docsRoot, 'en')));
});
