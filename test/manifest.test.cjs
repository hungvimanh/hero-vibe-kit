'use strict';
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const manifest = require(path.join(__dirname, '..', 'skills.manifest.json'));

test('manifest has the 3 design groups', () => {
  const g = manifest.groups;
  assert.ok(g.process, 'process group present');
  assert.ok(g.brand, 'brand group present');
  assert.ok(g['design-direction'], 'design-direction group present');
  assert.ok(g['design-tools'], 'design-tools group present');
  assert.ok(!g.design, 'old conflated design group removed');
});

test('design-direction is pick-one; design-tools is not', () => {
  assert.strictEqual(manifest.groups['design-direction'].pickOne, true);
  assert.notStrictEqual(manifest.groups['design-tools'].pickOne, true);
});

test('every skill has a name and a source string', () => {
  for (const [name, group] of Object.entries(manifest.groups)) {
    for (const s of group.skills) {
      assert.ok(typeof s.name === 'string' && s.name.length, `${name}: skill name`);
      assert.ok(typeof s.source === 'string' && s.source.length, `${name}/${s.name}: source (use "<TBD>" if unknown, never empty)`);
    }
  }
});

test('design-direction contains the taste skills and brand is separate', () => {
  const dir = manifest.groups['design-direction'].skills.map((s) => s.name);
  assert.ok(dir.includes('minimalist-ui') && dir.includes('design-taste-frontend'));
  assert.ok(!dir.includes('brandkit'), 'brandkit lives in the brand group');
  assert.deepStrictEqual(manifest.groups.brand.skills.map((s) => s.name), ['brandkit']);
});
