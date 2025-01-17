import assert from 'node:assert/strict';
import test from 'node:test';
import { main } from '../../src/index.js';
import { resolve } from '../../src/util/path.js';
import baseArguments from '../helpers/baseArguments.js';
import baseCounters from '../helpers/baseCounters.js';

const cwd = resolve('fixtures/plugins/commitlint');

test('Find dependencies with the Commitizen plugin', async () => {
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
  });

  assert(issues.unlisted['.commitlintrc.json']['@commitlint/config-conventional']);
  assert(issues.unlisted['commitlint.config.js']['@commitlint/config-conventional']);
  assert(issues.unlisted['package.json']['@commitlint/config-conventional']);
  assert(issues.unlisted['.commitlintrc.json']['commitlint-plugin-tense']);
  assert(issues.unlisted['commitlint.config.js']['commitlint-plugin-tense']);
  assert(issues.unlisted['package.json']['commitlint-plugin-tense']);

  assert.deepEqual(counters, {
    ...baseCounters,
    devDependencies: 1,
    unlisted: 6,
    processed: 1,
    total: 1,
  });
});
