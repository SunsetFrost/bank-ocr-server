const db = require('../util/db');

const user = {
    /**
     * 创建用户
     * @param { object } user 用户信息
     * @return { object }     创建结果
     */
    async create(user) {
        let result = await db.insertData('user', user);
        return result;
    },

    /**
     * 登录
     * @param { object } data 登录信息
     * @return { object }     登录业务操作结果
     */
    async signIn( data ) {
        let _sql = `
        SELECT * from user
            where name="${data.name}" and password="${data.password}"
            limit 1`;
        let result = await db.query(_sql);
        if(Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null;
        }
        return result;
    }
}

module.exports = user;