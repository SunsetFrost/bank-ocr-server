const cardService = require('../services/card');
const moment = require('moment');

class Card {
    async getCards(ctx) {
        let data = ctx.request.query;

        let result = await cardService.query(data);
        if(result) {
            ctx.body = {
                status: 200,
                msg: '获取扫描记录成功',
                data: result,
            }
        } else {
            ctx.body = {
                status: 0,
                msg: '获取扫描记录失败',
                data: null,
            }
        }
    }

    async create(ctx) {
        let data = ctx.request.body;

        // 扫描记录存入数据库
        let result = await cardService.create({
            number: '0',
            user_id: 0,
            create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        if(result) {
            ctx.body = {
                status: 200,
                msg: '添加银行卡成功',
            }
        } else {
            ctx.body = {
                status: 0,
                msg: '添加银行卡失败',
            }
            return;
        }
    }

    async updateOne(ctx) {
        const id = ctx.params.card_id;
        const data = ctx.request.body;

        const result = await cardService.update({
                id,
                ...data,
            }
        )
        if(result) {
            ctx.body = {
                status: 200,
                msg: '更新银行卡成功',
            }
        } else {
            ctx.body = {
                status: 0,
                msg: '更新银行卡失败',
            }
            return;
        }
    }
}

module.exports = new Card();