const db = require('../util/db');

const scan = {
    /**
     * 创建扫描记录
     * @param { object } scan 扫描信息
     * @return { object }
     */
    async create(scan) {
        let result = await db.insertData('scan', scan);
        return result;
    },

    /**
     * 查询扫描记录
     * @param { object } data 查询内容
     * @return { object } 符合的扫描列表
     */
    async query(data) {
        // 遍历对象拼接查询语句
        let sqlBase = 'SELECT * from scan where ';
        for (let key in data) {
            sqlBase += `${key}="${data[key]}" and `;
        }
        let sql = sqlBase.slice(0, str.lastIndexOf(' and '));
        let result = await db.query(sql);
        if(!Array.isArray(result) || result.length === 0) {
            result = null;
        }
        return result;
    }
}

module.exports = scan;