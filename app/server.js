const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const routes = require('./routes/index');
const config = require('./config/config');

const { createAllTables } = require('./controllers/init');

const app = new Koa();

app.use(logger());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(bodyParser());

app.use(routes.routes(), routes.allowedMethods());

app.listen(config.port);
console.log('server listening on port ' + config.port);

// createAllTables();

module.exports = app;