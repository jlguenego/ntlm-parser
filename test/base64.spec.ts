import assert from 'assert';

import {decode} from '../src/misc';

describe('Base64 Unit Test', () => {
  it('should decode base64', () => {});
  const str = '02000001';
  const base64 = Buffer.from(str, 'hex').toString('base64');
  const arrayBuffer = decode(base64);
  const str2 = Buffer.from(arrayBuffer).toString('hex');
  assert.strictEqual(str, str2);
});
