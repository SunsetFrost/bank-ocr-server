const moment = require('moment');
const jwt = require('jsonwebtoken');
const cardService = require('../services/card');

class Card {
  async getCards(ctx) {
    const data = ctx.request.query;
    const { userId } = jwt.decode(ctx.cookies.get('token'));

    const newData = {
      user_id: userId,
      ...data,
    };

    const result = await cardService.query(newData);
    if (result) {
      ctx.body = {
        status: 200,
        msg: '获取扫描记录成功',
        data: result,
      };
    } else {
      ctx.body = {
        status: 0,
        msg: '获取扫描记录失败',
        data: null,
      };
    }
  }

  async create(ctx) {
    const data = ctx.request.body;

    const result = await cardService.create({
      ...data,
      create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    });

    if (result) {
      ctx.body = {
        status: 200,
        msg: '添加银行卡成功',
      };
    } else {
      ctx.body = {
        status: 0,
        msg: '添加银行卡失败',
      };
    }
  }

  async updateOne(ctx) {
    const id = ctx.params.card_id;
    const data = ctx.request.body;
    const { userId } = jwt.decode(ctx.cookies.get('token'));

    const newData = {
      user_id: userId,
      ...data,
    };

    const result = await cardService.update({
      id,
      ...newData,
    });
    if (result) {
      ctx.body = {
        status: 200,
        msg: '更新银行卡成功',
      };
    } else {
      ctx.body = {
        status: 0,
        msg: '更新银行卡失败',
      };
    }
  }
}

module.exports = new Card();
