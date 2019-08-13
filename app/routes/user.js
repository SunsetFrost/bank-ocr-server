const router = require('koa-router')();
const User = require('../controller/user');

router.get('/', async (ctx, next) => {
    const users = User.getUsers();
    console.log(users);
    let response = {
        status: 200,
        users
    }
    ctx.body = response;
})

router.post('/login', async (ctx, next) => {
    const userInfo = ctx.request.data;
    // TODO check user
    ctx.body = {
        status: 200,
        type: 'success',
        msg: '登陆成功',
        data: userInfo
    }
})

module.exports = router;