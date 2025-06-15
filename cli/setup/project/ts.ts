import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { write } from "./operations";
import {
  gitIgnore,
  pkg,
  prettier,
  prettierIgnore,
  readme,
  tsconfig,
} from "./file";

const ts = async (root: string, name: string) => {
  console.log("Package json creating...");
  await write(root, "package.json", JSON.stringify(pkg(name), null, 2) + "\n");
  console.log(`Package json created succesfully...`);

  console.log("tsconfig creating...");
  await write(root, "tsconfig.json", JSON.stringify(tsconfig, null, 2) + "\n");
  console.log(`tsconfig created succesfully...`);

  console.log("README creating...");
  await write(root, "readme.md", readme(name));
  console.log(`README created succesfully...`);

  console.log("gitignore creating...");
  await write(root, ".gitignore", gitIgnore);
  console.log(`gitignore created succesfully...`);

  console.log("prettierrc creating...");
  await write(root, ".prettierrc", JSON.stringify(prettier(), null, 2) + "\n");
  console.log(`prettierrc created succesfully...`);

  console.log("prettierignore creating...");
  await write(root, ".prettierignore", prettierIgnore);
  console.log(`prettierignore created succesfully...`);

  console.log("src dir creating...");
  await mkdir(join(root, "src"));
  console.log(`src dir created succesfully...`);

  console.log("main file creating...");
  await write(root, "src/main.ts", `console.log('working');`);
  console.log(`main file created succesfully...`);
};

export { ts };
