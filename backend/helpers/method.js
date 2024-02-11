const query = require('../helpers/query');
const utility = require('../helpers/utility');
const bcrypt = require('bcrypt');
const constants = require('../config/constant');

exports.authentication_status = async (user_email, user_password) => {
  let correct_data = await query.getAllUserDataByEmail(user_email);

  let encrypted_user_password = correct_data.user_password;
  flag = bcrypt.compareSync(user_password, encrypted_user_password);
  return flag;
};

exports.user_id = async (email) => {
  let data = await query.getAllUserDataByEmail(email);
  let user_id = data.user_id;
  let string_user_id = user_id + '';
  let encrypted_id = await utility.encryptData(string_user_id);
  let encrypted_email = await utility.encryptData(email);
  let usrid = encrypted_id + ':::' + user_id + ':::' + encrypted_email;
  return usrid;
};

exports.admin_id = async (email) => {
  let data = await query.getAllUserDataByEmail(email);
  let user_id = data.user_id;
  let string_user_id = user_id + '';
  let customer_email = data.customer_email;
  let encrypted_id = await utility.encryptData(string_user_id);
  let encrypted_email = await utility.encryptData(customer_email);
  let usrid = encrypted_id + ':::' + user_id + ':::' + encrypted_email;
  return usrid;
};
