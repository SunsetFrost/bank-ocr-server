const Koa = require('koa')

const routes = require('./routes/index');
const config = require('./config/config');

const app = new Koa();

app.use(routes.routes(), routes.allowedMethods());

app.listen(config.port);
console.log('listening on port ' + config.port);
// http.createServer(app.callback()).listen(config.port).on('listening', function() {
//     console.log('listening on port ' + config.port);
// })

module.exports = app;