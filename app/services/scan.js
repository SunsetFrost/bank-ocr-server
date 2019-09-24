const db = require('../util/db');

const scan = {
  /**
   * 创建扫描记录
   * @param { object } scan 扫描信息
   * @return { object }
   */
  async create(data) {
    try {
      const result = await db.insertData('scan', data);
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
    // status 值为1表示删除
    let sqlBase = 'SELECT * from scan where status is null and ';
    const keys = Object.keys(data);
    for (const key of keys) {
      sqlBase += `${key}=${data[key]} and `;
    }

    let sql = '';
    if (JSON.stringify(data) === '{}') {
      sql = sqlBase.slice(0, sqlBase.lastIndexOf(' where'));
    } else {
      sql = sqlBase.slice(0, sqlBase.lastIndexOf(' and '));
    }

    const result = await db.query(sql);
    return result;
  },

  /**
   * 更新扫描记录
   * @param { object } data 更新内容
   * @return { object } 更新结果
   */
  async update(data) {
    let sqlBase = 'UPDATE scan SET ';
    for (const key in data) {
      if (key !== 'id') {
        sqlBase += `${key}="${data[key]}", `;
      }
    }

    let sql = sqlBase.slice(0, sqlBase.lastIndexOf(', '));
    sql += `WHERE id=${data.id}`;
    try {
      const result = await db.query(sql);
      return result;
    } catch (error) {
      return null;
    }
  },
};

module.exports = scan;
