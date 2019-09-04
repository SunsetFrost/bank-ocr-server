const db = require('../util/db');

const scan = {
    /**
     * 创建扫描记录
     * @param { object } scan 扫描信息
     * @return { object }
     */
    async create(scan) {
        try {
            let result = await db.insertData('scan', scan);
            return result;            
        } catch (error) {
            return null;
        }
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
            sqlBase += `${key}=${data[key]} and `;
        }
        let sql = '';
        if(JSON.stringify(data) === '{}') {
            sql = sqlBase.slice(0, sqlBase.lastIndexOf(' where'));
        } else {
            sql = sqlBase.slice(0, sqlBase.lastIndexOf(' and '));
        }
        console.log(sql);
        let result = await db.query(sql);
        // if(!Array.isArray(result) || result.length === 0) {
        //     result = null;
        // }
        return result;
    },

    /**
     * 更新扫描记录
     * @param { object } data 更新内容
     * @return { object } 更新结果
     */
    async update(data) {
        let sqlBase = 'UPDATE scan SET ';
        for (let key in data) {
            if(key !== 'id') {
                sqlBase += `${key}="${data[key]}", `;
            }
        }

        let sql = sqlBase.slice(0, sqlBase.lastIndexOf(', '));
        sql += `WHERE id=${data.id}`;
        try {
            let result = await db.query(sql);   
            return result;
        } catch (error) {
            return null;
        }
    },
}

module.exports = scan;