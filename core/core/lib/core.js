// #!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { log } = require("@hcn-cli-dev/utils");
const pkg = require("../package.json");
const program = require("commander");
const packageConfig = require("../package");
const { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME } = require("./const");
const colors = require("colors/safe");
const userHome = require("user-home");

module.exports = core;
let args;
let config;
function core() {
  prepare();
  registerCommand();
  // TODO
  //   console.log("hi studty");
}
function prepare() {
  checkPkgVersion();
  checkNodeVersion();
  checkRoot();
  checkUserHome();
  checkInputArgs();
  checkEnv();
  stupath();
}

function registerCommand() {
  console.log("ppppppppppppppppppppppppp");
  program.version(packageConfig.version).usage("<command> [options]");
  program
    .command("learn")
    .description("访问------")
    .action(() => {
      console.log("kkkkkkkkkkkkkkkk");
      log.success("欢迎学习", "zzzzzz");
      log.success("课程链接", "11111");
      log.success("课程介绍", "小宇宙燃烧吧");
      log.success("作者介绍", "hcnan@2222");
    });
  program.parse(process.argv);
  if (args._.length < 1) {
    program.outputHelp();
  }
  // if (args._.length < 1) {}
}
function checkPkgVersion() {
  log.notice("cli", pkg.version);
}

function checkNodeVersion() {
  // console.log(process.version); // 输出nodejs版本号
  // semver
  // gt(v1, v2): v1 > v2
  // gte(v1, v2): v1 >= v2
  // lt(v1, v2): v1 < v2
  // lte(v1, v2): v1 <= v2
  // eq(v1, v2): v1 == v2
  const semver = require("semver");
  if (semver.lte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(
      colors.red(
        `imooc-cli 需要安装 v${LOWEST_NODE_VERSION} 以上版本的 Node.js`
      )
    );
  }
}

function checkRoot() {
  const rootCheck = require("root-check");
  rootCheck(colors.red("请避免使用 root 账户启动本应用"));
}

function checkUserHome() {
  // 检查用户主目录
  if (!userHome || !fs.existsSync(userHome)) {
    throw new Error(colors.red("当前登录用户主目录不存在！"));
  }
}

function checkInputArgs() {
  log.verbose("开始校验输入参数");
  const minimist = require("minimist");
  args = minimist(process.argv.slice(2)); // 解析查询参数
  checkArgs(args); // 校验参数
  log.verbose("输入参数", args);
}
function checkEnv() {
  const dotenv = require("dotenv");
  dotenv.config({
    path: path.resolve(userHome, ".env"),
  });
  config = createCliConfig(); // 准备基础配置
  log.verbose("环境变量", config);
  // Node.js中的dotenv库的使用，由于项目不同需求，需要配置不同环境变量，按需加载不同的环境变量文件，使用dotenv
}
function createCliConfig() {
  const cliConfig = {
    home: userHome,
  };
  if (process.env.CLI_HOME) {
    cliConfig["cliHome"] = path.join(userHome, process.env.CLI_HOME);
  } else {
    cliConfig["cliHome"] = path.join(userHome, DEFAULT_CLI_HOME);
  }
  return cliConfig;
}
function checkArgs(args) {
  if (args.debug) {
    process.env.LOG_LEVEL = "verbose";
  } else {
    process.env.LOG_LEVEL = "info";
  }
  log.level = process.env.LOG_LEVEL;
}

function stupath() {
  // 当前文件的目录 D:\hcnworkers\cli-test\test-hi\core\core\lib （____dirname）
  // console.log(path.resolve(__dirname))
  // __filename D:\hcnworkers\cli-test\test-hi\core\core\lib\core.js
  // path.join(__dirname, DEFAULT_CLI_HOME) D:\hcnworkers\cli-test\test-hi\core\core\lib\.imooc-cli
  // let myPath2 = path.resolve(__dirname,'./img/so'); 解析为绝对路径
}

function checkGlobalUpdate() {}
