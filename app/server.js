const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const routes = require('./routes/index');
const config = require('./config/config');

const app = new Koa();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(bodyParser());

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(routes.routes(), routes.allowedMethods());

app.listen(config.port);
console.log('listening on port ' + config.port);
// http.createServer(app.callback()).listen(config.port).on('listening', function() {
//     console.log('listening on port ' + config.port);
// })

module.exports = app;