import test from 'node:test';
import assert from 'node:assert/strict';
import { applicationLink } from './application-links.mjs';

test('stable application-specific links', () => {
  assert.equal(applicationLink('dwp'), 'https://jamelwilliams.com/?utm_source=dwp&utm_medium=application&utm_campaign=dwp_creative_director');
  assert.equal(applicationLink('asc'), 'https://jamelwilliams.com/?utm_source=asc&utm_medium=application&utm_campaign=asc_creative_design_director');
});
test('deep links retain unrelated query values and fragments, replacing stale attribution', () => {
  const url = new URL(applicationLink('asc', 'https://jamelwilliams.com/work/?view=grid&utm_source=old&utm_source=duplicate&utm_content=cv&gclid=old#projects'));
  assert.equal(url.pathname, '/work/');
  assert.equal(url.hash, '#projects');
  assert.equal(url.searchParams.get('view'), 'grid');
  assert.deepEqual(url.searchParams.getAll('utm_source'), ['asc']);
  assert.equal(url.searchParams.has('utm_content'), false);
  assert.equal(url.searchParams.has('gclid'), false);
});
test('reject unknown applications and noncanonical destinations', () => {
  assert.throws(() => applicationLink('unknown'));
  for (const url of ['http://jamelwilliams.com/', 'https://example.com/', 'https://jamelwilliams.com.evil.test/']) {
    assert.throws(() => applicationLink('dwp', url));
  }
});
