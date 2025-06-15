/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import { gitIgnore, pkg, prettier, prettierIgnore, readme } from './file';
import { write } from './operations';

const formatPkg = (name: string) => {
  const _pkg = pkg(name);

  // @ts-expect-error
  delete _pkg.devDependencies.tsx;
  // @ts-expect-error
  delete _pkg.devDependencies['@types/node'];
  // @ts-expect-error
  delete _pkg.devDependencies.typescript;
  // @ts-expect-error
  delete _pkg.devDependencies['typescript-eslint'];

  // @ts-expect-error
  delete _pkg.scripts.build;
  // @ts-expect-error
  delete _pkg.scripts.dev;

  _pkg.scripts.start = 'node src/main.js';

  if (!Object.keys(_pkg.devDependencies).length) {
    // @ts-expect-error
    delete _pkg.devDependencies;
  }

  return _pkg;
};
const js = async (root: string, name: string) => {
  console.log('Package json creating...');

  const pkg = formatPkg(name);

  await write(root, 'package.json', JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Package json created succesfully...`);

  console.log('README creating...');
  await write(root, 'readme.md', readme(name));
  console.log(`README created succesfully...`);

  console.log('gitignore creating...');
  await write(root, '.gitignore', gitIgnore);
  console.log(`gitignore created succesfully...`);

  console.log('prettierrc creating...');
  await write(
    root,
    '.prettierrc',
    JSON.stringify(prettier('js'), null, 2) + '\n'
  );
  console.log(`prettierrc created succesfully...`);

  console.log('prettierignore creating...');
  await write(root, '.prettierignore', prettierIgnore);
  console.log(`prettierignore created succesfully...`);

  console.log('src dir creating...');
  await mkdir(join(root, 'src'));
  console.log(`src dir created succesfully...`);

  console.log('main file creating...');
  await write(root, 'src/main.js', `console.log('working');`);
  console.log(`main file created succesfully...`);
};

export { js };
