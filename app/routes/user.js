const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    let response = {
        status: 200,
        users: [],
    }
    ctx.body = response;
})

module.exports = router;