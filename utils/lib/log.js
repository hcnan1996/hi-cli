const log = require("npmlog");
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info"; //自定义
log.heading = "hcn---"; // 前缀
log.addLevel("success", 2000, { fg: "green", bold: true });

module.exports = log;
