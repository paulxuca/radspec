import test from 'ava';
import list from '../../src/types/list';

test('Type: list', t => {
  t.true(list.isType('uint256[]'));
});
