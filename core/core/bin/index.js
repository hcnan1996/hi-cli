#!/usr/bin/env node

const imporLocal = require("import-local");
const { log1 } = require("@hcn-cli-dev/utils");

if (imporLocal(__filename)) {
  require("npmlog").info("cli", "本地版本");
} else {
  require("../lib/core")(process.argv.slice(2));
}
