const scanService = require('../services/scan');
const moment = require('moment');

class Scan {
    async getScans(ctx) {
        let data = ctx.request.query;
        console.log(data);
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
        // 记录开始扫描时间
        const startScanTime = moment().format("YYYY-MM-DD HH:mm:ss");
        // TODO请求算法
        let data = ctx.request.body;

        // 扫描记录存入数据库
        let result = await scanService.create({
            card_id: 0,
            start_scan_time: moment().format("YYYY-MM-DD HH:mm:ss"),
            scan_result: 0,
        })
        if(result) {
            ctx.body = {
                status: 200,
                msg: '添加扫描记录成功',
                data: result,
            }
        } else {
            ctx.body = {
                status: 0,
                msg: '添加扫描记录失败',
                data: null,
            }
            return;
        }
        // 银行卡记录存入数据库
        const fakeInfo = {
            card_id: 2342335225552
        }

        // 轮询算法完成后更新扫描信息并创建对应银行卡记录 

        // setTimeout(() => {
        //     scanService.update({
        //         id: result.id,
        //         ...fakeInfo,
        //         scan_result: 1
        //     }) 
        //     // 创建银行卡               
        // }, 1000);
    }
}

module.exports = new Scan();