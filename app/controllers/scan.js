const scanService = require("../services/scan");
const cardService = require("../services/card");
const moment = require("moment");
const axios = require("axios");

class Scan {
  async getScans(ctx) {
    let data = ctx.request.query;
    console.log(data);
    let result = await scanService.query(data);
    if (result) {
      ctx.body = {
        status: 200,
        msg: "获取扫描记录成功",
        data: result
      };
    } else {
      ctx.body = {
        status: 0,
        msg: "获取扫描记录失败",
        data: null
      };
    }
  }

  async create(ctx) {
    // 记录开始扫描时间
    const startScanTime = moment().format("YYYY-MM-DD HH:mm:ss");
    // 请求算法
    let { userId, img } = ctx.request.body;
    const { data: scanResult } = await axios.post(
      "http://100.118.118.221:10001/ocr",
      {
        image: img
      }
    );
    
    // 添加银行卡
    let cardResult = null;
    if (scanResult.data.validation === "True") {
      cardResult = await cardService.create({
        number: scanResult.data.cardNum,
        user_id: 0,
        type: scanResult.data.cardType,
        bank: scanResult.data.bank,
        create_time: moment().format("YYYY-MM-DD HH:mm:ss")
      });
    } else {
      ctx.body = {
        status: 0,
        msg: scanResult.errmsg
      };
      return;
    }
    // 扫描记录存入数据库
    const result = await scanService.create({
      user_id: userId,
      card_id: cardResult ? cardResult.insertId : 0,
      start_scan_time: startScanTime,
      end_scan_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      scan_result: scanResult.data.validation ? 1 : 0
    });

    if (result) {
      ctx.body = {
        status: 200,
        msg: "添加扫描记录成功",
        data: {
          id: cardResult.insertId,
          number: scanResult.data.cardNum,
          type: scanResult.data.cardType,
          bank: scanResult.data.bank
        }
      };
    } else {
      ctx.body = {
        status: 0,
        msg: "添加扫描记录失败",
        data: null
      };
    }
  }
}

module.exports = new Scan();
