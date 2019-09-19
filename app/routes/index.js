const router = require('koa-router')();
const user = require('./user');
const scan = require('./scan');
const card = require('./card');

router.get('/', async (ctx, next) => {
  // let response = {
  //     status: 200,
  // }
  // ctx.body = response;
  next();
});
router.use('/api/user', user.routes(), user.allowedMethods());
router.use('/api/scan', scan.routes(), user.allowedMethods());
router.use('/api/card', card.routes(), card.allowedMethods());

module.exports = router;
