#! /usr/bin/env node

import { setup } from "./setup/main";

setup().finally(() => {
  process.exit(0);
});



