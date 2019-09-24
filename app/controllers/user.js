const Mock = require('mockjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const config = require('../config/config');

class User {
  getUsers(ctx) {
    const users = Mock.mock({
      'users|100': [
        {
          'id|+1': 1,
          username: '@CNAME',
          'password|6-15': '@character()',
          address: '@city(true)',
          desc: '@paragraph(1)',
          'register-date': '@datetime("yyyy-MM-dd A HH:mm")',
        },
      ],
    });
    ctx.body = users.users;
  }

  async signIn(ctx) {
    const data = ctx.request.body;

    const result = {
      status: 0,
      msg: '',
      data: null,
    };

    const userResult = await userService.signIn({
      name: data.username,
      password: data.password,
    });

    if (userResult) {
      if (userResult.name === data.username) {
        // 生成token
        const token = jwt.sign(
          {
            userId: userResult.id,
          },
          config.jwt.key,
        );

        ctx.cookies.set('token', token, {
          maxAge: 86400000,
          httpOnly: true,
        });

        result.status = 1;
        result.msg = '登录成功';
      }
    } else {
      result.msg = '用户名或密码错误';
    }

    ctx.body = result;
  }

  signOut(ctx) {
    const token = jwt.sign(
      {
        userId: '',
      },
      config.jwt.key,
    );

    ctx.cookies.set('token', token, {
      maxAge: 86400000,
      httpOnly: true,
    });

    ctx.body = {
      status: 200,
      msg: '退出登录成功',
    };
  }

  async signUp(ctx) {
    const data = ctx.request.body;

    const result = await userService.create({
      name: data.username,
      password: data.password,
      create_time: new Date().getTime(),
    });

    if (result && result.insertId * 1 > 0) {
      ctx.body = {
        status: 200,
        msg: '注册成功',
      };
    } else {
      ctx.body = {
        status: 0,
        msg: '注册失败',
      };
    }
  }

  async checkLogin(ctx) {
    const { userId } = jwt.decode(ctx.cookies.get('token'));
    if (userId && userId !== '') {
      const user = await userService.getUserById(userId);
      ctx.body = {
        status: 200,
        msg: '用户已登录',
        data: {
          username: user.name,
        },
      };
    } else {
      throw new Error('用户尚未登录');
    }
  }

  async isUserExist(ctx) {
    const { username } = ctx.request.body;
    const result = await userService.isExist(username);
    if (result) {
      ctx.body = {
        status: 200,
        msg: '用户名可用',
      };
    } else {
      throw new Error('用户名已存在');
    }
  }
}

module.exports = new User();
