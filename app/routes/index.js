const router = require('koa-router')();
const user = require('./user');

router.use('/user', user.routes(), user.allowedMethods());
router.get('/', async (ctx, next) => {
    let response = {
        status: 200,
    }
    ctx.body = response;
})

module.exports = router;