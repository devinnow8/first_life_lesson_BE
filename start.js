const sls = require("serverless-http");
const app = require("./server");
module.exports.run = sls(app);