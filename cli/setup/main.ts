import { error } from "../utils";
import { showHelp } from "./help";
import { project } from "./project/main";

const commands = {
  help: showHelp,
  project,
};

const cwd = process.cwd()

const processSetupCommand = async (args: string[]) => {
  const options = args.slice(3);

  const command = args[2] as keyof typeof commands;

  if (!(command in commands)) {
    error(`unknown command "${command}"`);
  }

  await commands[command]?.(options,cwd)
};

const setup = async () => {
  const args = process.argv;

  if (args.length === 2) {
    args.push("help");
  }
  try {
    return await processSetupCommand(args);
  } catch (e) {
    return error((e as Error).message);
  }
};

export { setup };
