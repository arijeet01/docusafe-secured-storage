const pool = require('../config/connection_pool');
const utility = require('../helpers/utility');

//**********************  I  N  S  E  R  T  **********************

exports.insertSingle = async (table, param) => {
  let sql = 'INSERT INTO ?? SET ?';
  await pool.query('master_common_db', sql, [table, param]).catch(console.log);
};

//**********************  S E L E C T  **********************

exports.getAllUserDataByEmail = async (user_email) => {
  let sql = 'SELECT * FROM user_master_db WHERE user_email=?';
  let result = await pool
    .query('master_common_db', sql, [user_email])
    .catch(console.log);
  if (!utility.checkEmpty(result)) {
    result = result[0];
  }
  return result;
};

exports.getAllUserDataByMobile = async (user_mobile) => {
  let sql = 'SELECT * FROM user_master_db WHERE user_mobile=?';
  let result = await pool
    .query('master_common_db', sql, [user_mobile])
    .catch(console.log);
  if (!utility.checkEmpty(result)) {
    result = result[0];
  }
  return result;
};
