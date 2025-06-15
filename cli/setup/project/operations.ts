import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const write = async (root: string, file: string, content: string) =>
  await writeFile(join(root, file), content);

export { write };
