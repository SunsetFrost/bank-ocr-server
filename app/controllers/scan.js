const scanService = require('../services/scan');

class Scan {
    async getScans(ctx) {
        let data = ctx.request.body;
        let result = await scanService.query(data);
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
        // 获取银行卡图片调用算法服务

        // 添加扫描记录

        // 轮询算法完成后返回银行卡信息并创建对应银行卡记录
    }
}