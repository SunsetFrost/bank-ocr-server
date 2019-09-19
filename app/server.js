const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const jwt = require("jsonwebtoken");

const routes = require("./routes/index");
const config = require("./config/config");

const { createAllTables } = require("./controllers/init");

const app = new Koa();

// 初始化数据库表
if (config.isInit) {
  createAllTables();
}

app.use(logger());

app.use(
  cors({
    origin: function(ctx) {
      return ctx.request.header.origin; 
    },
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

app.use(
  bodyParser({
    jsonLimit: "5mb", // 控制body的parse转换大小 default 1mb
    formLimit: "4096kb" //  控制你post的大小  default 56kb
  })
);

app.use(routes.routes(), routes.allowedMethods());

app.listen(config.port);
console.log("server listening on port " + config.port);

module.exports = app;
