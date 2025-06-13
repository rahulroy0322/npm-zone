import chalk from "chalk";

const stringify = (msg: unknown): string => {
  if (typeof msg === "string") {
    return msg;
  }
  if (
    typeof msg === "bigint" ||
    typeof msg === "boolean" ||
    typeof msg === "number"
  ) {
    return String(msg);
  }

  if (msg === null || msg === undefined) {
    return "";
  }

  if (typeof msg === "object") {
    msg = Object.entries(msg as object)
      .reduce((acc, [key, val]) => {
        if (val === undefined) {
          return acc;
        } else if (Array.isArray(val) || typeof val === "object") {
          acc.push(`${key} -> ${stringify(val)}`);
        } else {
          acc.push(`${key} -> ${val}`);
        }

        return acc;
      }, [] as string[])
      .join("\n");
  }

  return String(msg);
};

const log = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.log(`${chalk.dim('"LOG":')} ${msg} ${chalk.dim(':"END"')}`);
};
const info = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.info(
    `${chalk.cyan('"LOG":')} ${chalk.cyan.underline(msg)} ${chalk.cyan(
      ':"END"'
    )}`
  );
};

const warn = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.warn(
    `${chalk.yellow('"INFO":')} ${chalk.yellow.underline(msg)} ${chalk.yellow(
      ':"END"'
    )}`
  );
};
const error = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.error(
    `${chalk.red('"INFO":')} ${chalk.red.underline(msg)} ${chalk.red(
      ':"END"'
    )}`
  );
};

const debug = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.debug(
    `${chalk.magenta.visible('"INFO":')} ${chalk.magenta.visible.underline(msg)} ${chalk.magenta.visible(
      ':"END"'
    )}`
  );
};

const success = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.log(
    `${chalk.green('"INFO":')} ${chalk.green.underline(msg)} ${chalk.green(
      ':"END"'
    )}`
  );
};

const logger = {
  log,
  warn,
  info,
  error,
  debug,
  success
};

export { logger };
