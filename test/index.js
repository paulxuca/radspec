import test from 'ava';
import { evaluate } from '../src';

test('Evaluate - Decentraland example', async t => {
  const call = {
    transaction: {
      to: '0x959e104E1a4dB6317fA58F8295F586e1A978c297',
      data:
        '0x4080704900000000000000000000000000000000000000000000000000000000000008670000000000000000000000000000000000000000000000000000000000000060000000000000000000000000f16a25a1b4e6434bacf9d037d69d675dcf8526990000000000000000000000000000000000000000000000000000000000000004ffffffffffffffffffffffffffffff6a00000000000000000000000000000014ffffffffffffffffffffffffffffff6a00000000000000000000000000000015ffffffffffffffffffffffffffffff6a00000000000000000000000000000016ffffffffffffffffffffffffffffff6a00000000000000000000000000000017',
    },
    abi: [
      {
        constant: false,
        inputs: [
          { name: 'estateId', type: 'uint256' },
          { name: 'landIds', type: 'uint256[]' },
          { name: 'destinatary', type: 'address' },
        ],
        name: 'transferManyLands',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  };

  const expression =
    'Transferred lands `@formatList(landIds)` from estate `estateId` to `destinatary`';

  const result = await evaluate(expression, call, {
    returnType: 'object',
    userHelpers: {
      formatList: () => list => {
        if (Array.isArray(list)) {
          return {
            type: 'list',
            objValue: list,
            value: `${list}`,
          };
        }

        return {
          type: 'string',
          value: `${list}`,
        };
      },
    },
  });

  t.snapshot(result);
});

test('radspec#evaluate', async t => {
  const expression = 'Will multiply `a` by 7 and return `a * 7`.';
  const call = {
    abi: [
      {
        name: 'multiply',
        constant: false,
        type: 'function',
        inputs: [
          {
            name: 'a',
            type: 'uint256',
          },
        ],
        outputs: [
          {
            name: 'd',
            type: 'uint256',
          },
        ],
      },
    ],
    transaction: {
      to: '0x8521742d3f456BD237E312d6E30724960f72517A',
      data:
        '0xc6888fa1000000000000000000000000000000000000000000000000000000000000007a',
    },
  };

  t.is(
      await evaluate(expression, call),
      'Will multiply 122 by 7 and return 854.'
  );
});
