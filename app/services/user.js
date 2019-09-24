const db = require('../util/db');

const user = {
  /**
   * 创建用户
   * @param { object } user 用户信息
   * @return { object }     创建结果
   */
  async create(userInfo) {
    const result = await db.insertData('user', userInfo);
    return result;
  },

  /**
   * 登录
   * @param { object } data 登录信息
   * @return { object }     登录业务操作结果
   */
  async signIn(data) {
    const sql = `
        SELECT * from user
            where name="${data.name}" and password="${data.password}"
            limit 1`;
    let result = await db.query(sql);
    if (Array.isArray(result) && result.length > 0) {
      [result] = result;
    } else {
      result = null;
    }

    return result;
  },

  async getUserById(id) {
    const sql = `SELECT * from user where id="${id}"`;
    let result = await db.query(sql);
    if (Array.isArray(result) && result.length > 0) {
      return result[0];
    } else {
      throw new Error('无该Id对应的用户');
    }
  },

  async isExist(username) {
    const sql = `SELECT * from user where name="${username}"`;
    let result = await db.query(sql);
    if (Array.isArray(result) && result.length > 0) {
      result = false;
    } else {
      result = true;
    }
    return result;
  },
};

module.exports = user;
