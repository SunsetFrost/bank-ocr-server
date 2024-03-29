const mysql = require('mysql');
const config = require('../config/config');

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

const createTable = function (sql) {
  return query(sql, []);
};

const findDataById = function (table, id) {
  const _sql = 'SELECT * FROM ?? WHERE id = ? ';
  return query(_sql, [table, id, start, end]);
};

const findDataByPage = function (table, keys, start, end) {
  const _sql = 'SELECT ?? FROM ??  LIMIT ? , ?';
  return query(_sql, [keys, table, start, end]);
};

const insertData = function (table, values) {
  const _sql = 'INSERT INTO ?? SET ?';
  return query(_sql, [table, values]);
};

const updateData = function (table, values, id) {
  const _sql = 'UPDATE ?? SET ? WHERE id = ?';
  return query(_sql, [table, values, id]);
};

const deleteDataById = function (table, id) {
  const _sql = 'DELETE FROM ?? WHERE id = ?';
  return query(_sql, [table, id]);
};

const select = function (table, keys) {
  const _sql = 'SELECT ?? FROM ?? ';
  return query(_sql, [keys, table]);
};

const count = function (table) {
  const _sql = 'SELECT COUNT(*) AS total_count FROM ?? ';
  return query(_sql, [table]);
};

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
};
