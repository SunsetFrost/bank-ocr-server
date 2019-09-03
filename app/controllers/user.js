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

        let result = {
            status: 0,
            msg: '',
            data: null,
        }

        let userResult = await userService.signIn(data);
        if(userResult) {
            if(userResult.name === data.name) {
                result.status = 1;
                result.msg = '登录成功';
            }
        } else {
            result.msg = '用户名或密码错误';
        }
    }

    async signUp(ctx) {
        let data = ctx.request.body;

        let result = await userService.create({
            ...data,
            create_time: new Date().getTime(),
        })

        if(result && result.insertId * 1 > 0) {
            ctx.body = {
                status: 200,
                msg: '注册成功',
            }
        } else {
            ctx.body = {
                status: 0,
                msg: '注册失败',
            }
        }
    }
}

module.exports = new User();