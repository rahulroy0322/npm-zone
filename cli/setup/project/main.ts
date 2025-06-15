import { join, relative } from "node:path";
import { error, logExit } from "../../utils";
import { ts } from "./ts";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { js } from "./js";

const rl = readline.createInterface({ input, output });

const isValidPackageName = (projectName: string) => {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName
  );
};

const createProject = async (
  cwd: string,
  name: string | undefined,
  type: "js" | "ts" = "js"
) => {
  if (!name) {
    const answer = await rl.question("What is the project name :>");

    if (!answer) {
      error("Please provide name to create project");
    }
    name = answer;
  }

  if (!isValidPackageName(name)) {
    error(`Invalid project name "${name}"`);
  }

  const root = relative(cwd, join(cwd, name));

  if (existsSync(root)) {
    error("Project already exists with this name");
  }
  console.log(`Scaffolding project in ${root}...`);

  await mkdir(root, { recursive: true });

  console.log(`Project created succesfully...`);

  if (type === "js") {
    await js(root, name);
  } else if (type === "ts") {
    await ts(root, name);
  }

  let doneMessage = "";
  const cdProjectName = relative(cwd, root);
  doneMessage += `Done. Now run:`;
  if (root !== cwd) {
    doneMessage += `\n  cd ${
      cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
    }`;
  }
  if (process.env.PNPM_HOME) {
    doneMessage += "\n  pnpm i";
    doneMessage += "\n  pnpm dev";
  } else {
    doneMessage += `\n  npm install`;
    doneMessage += `\n  npm run dev`;
  }
  logExit(doneMessage);
};

const project = async (commands: string[], cwd: string) => {
  if (!commands.length) {
    return error('"project" command neads a param to setup project');
  }

  switch (commands.at(0)) {
    case "ts":
    case "js":
      return await createProject(cwd, commands.at(1), commands.at(0)! as 'js'|'ts');
  }

  return error(
    '"project" command param should be `ts|js` got ' + commands.at(0)
  );
};

export { project };
