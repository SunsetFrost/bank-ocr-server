const moment = require('moment');
const cardService = require('../services/card');
const { getUserId } = require('../util/common');

class Card {
  async getCards(ctx) {
    const data = ctx.request.query;
    const userId = getUserId(ctx);

    const newData = {
      user_id: userId,
      ...data,
    };

    const result = await cardService.query(newData);
    if (Array.isArray(result) && result.length > 0) {
      ctx.body = {
        status: 200,
        msg: '获取银行卡记录成功',
        data: result,
      };
    } else {
      throw Error('获取银行卡记录为空');
    }
  }

  async getCardsByNumber(ctx) {
    const { number } = ctx.request.query;
    const userId = getUserId(ctx);

    const result = await cardService.queryByNumber(number, userId);
    if (Array.isArray(result) && result.length > 0) {
      ctx.body = {
        status: 200,
        msg: '获取银行卡记录成功',
        data: result,
      };
    } else {
      throw Error('获取银行卡记录为空');
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
    const userId = getUserId(ctx);

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
