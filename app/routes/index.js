const router = require('koa-router')();
const user = require('./user');
const scan = require('./scan');

router.get('/', async (ctx, next) => {
    let response = {
        status: 200,
    }
    ctx.body = response;
})
router.use('/user', user.routes(), user.allowedMethods());
router.use('/scan', scan.routes(), user.allowedMethods());

module.exports = router;