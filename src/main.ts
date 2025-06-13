import color from 'cli-color'

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
  console.log(`${color.blue('"LOG":')} ${msg} ${color.blue(':"END"')}`);
};
const info = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.info(
    `${color.cyan('"LOG":')} ${color.cyan.underline(msg)} ${color.cyan(
      ':"END"'
    )}`
  );
};

const warn = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.warn(
    `${color.yellow('"INFO":')} ${color.yellow.underline(msg)} ${color.yellow(
      ':"END"'
    )}`
  );
};
const error = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.error(
    `${color.red('"INFO":')} ${color.red.underline(msg)} ${color.red(
      ':"END"'
    )}`
  );
};

const debug = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.debug(
    `${color.magenta('"INFO":')} ${color.magenta.underline(msg)} ${color.magenta(
      ':"END"'
    )}`
  );
};

const success = (msg: unknown) => {
  msg = stringify(msg).trim();
  console.log(
    `${color.green('"INFO":')} ${color.green.underline(msg)} ${color.green(
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
