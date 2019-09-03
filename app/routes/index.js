const router = require('koa-router')();
const user = require('./user');

router.get('/', async (ctx, next) => {
    let response = {
        status: 200,
    }
    ctx.body = response;
})
router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;