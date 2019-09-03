const userService = require('../services/user');
const Mock = require('mockjs');

class User {
    constructor() {}

    getUsers(ctx) {
        const users = Mock.mock({
            'users|100': [
                {
                'id|+1': 1,
                'username': '@CNAME',
                'password|6-15': '@character()',
                'address': '@city(true)',
                'desc': '@paragraph(1)',
                'register-date': '@datetime("yyyy-MM-dd A HH:mm")'
                }
            ]
        })
        ctx.body = users.users;
    }

    async signIn(ctx) {
        let data = ctx.request.body;
        console.log(data);
        let result = {
            status: 0,
            msg: '',
            data: null,
        }

        let userResult = await userService.signIn(data);
        console.log(userResult);
        if(userResult) {
            if(userResult.name === data.name) {
                result.status = 1;
                result.msg = '登录成功';
            }
        } else {
            result.msg = '用户名或密码错误';
        }

        ctx.body = result;
    }
}

module.exports = new User();