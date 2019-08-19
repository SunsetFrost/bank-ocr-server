const router = require('koa-router')();
const User = require('../controller/user');

router.get('/', async (ctx, next) => {
    const users = User.getUsers();
    let response = {
        status: 200,
        users
    }
    ctx.body = response;
})

router.post('/login', async (ctx, next) => {
    const test = ctx.request.body;
    console.log(test);
    const { username, password } = ctx.request.body;
    // TODO check user
    ctx.body = {
        status: 200,
        type: 'success',
        msg: '登陆成功',
        data: {
            username,
            password
        }
    }
})

module.exports = router;