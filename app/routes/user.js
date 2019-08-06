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

module.exports = router;