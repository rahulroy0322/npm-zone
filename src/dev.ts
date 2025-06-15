/* eslint-disable no-magic-numbers */
import { logger } from './main';

const logs = [
  'some useful log',
  undefined,
  null,
  {
    msg: 'some message',
    number: 90,
    bool: true,
    nested: {
      key: 'val',
      other: 'other',
    },
    array: [
      'some',
      'val',
      1,
      2,
      3,
      {
        key: 'val',
      },
    ],
    null: null,
    undefined: undefined,
  },
];

for (const key in logger) {
  const _log = logger[key as keyof typeof logger];
  for (const log of logs) {
    _log(log);
  }
  _log('\n');
}
