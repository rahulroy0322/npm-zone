import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { relative } from 'node:path';

import { setup } from './setup/main';

process.argv = ['', '', 'project', 'ts', 'first'];

const DEBUG = false;

const main = async () => {
  if (!DEBUG && existsSync('first')) {
    await rm(relative(process.cwd(), 'first'), {
      recursive: true,
    });
  }

  setup().finally(() => {
    process.exit(0);
  });
};

main();
