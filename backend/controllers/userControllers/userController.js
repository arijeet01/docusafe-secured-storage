const utility = require('../../helpers/utility');
const dbquery = require('../../helpers/query');
const methods = require('../../helpers/method');
const dbcon = require('../../config/connection_pool');
const constants = require('../../config/constant');

exports.user_signup = async (req, res) => {
  if (utility.checkEmpty(constants.dbconn)) {
    constants.dbconn = await dbcon.connection().catch((e) => {
      console.log(e);
    });
  }

  console.log('----------------------------- input --' + req.body.input);
  const input = req.body.input;
  const fname = input.fname;
  const lname = input.lname;
  const user_email = input.user_email;
  const user_mobile = input.user_mobile;
  const user_password = input.user_password;
  console.log(req.body); 
  console.log(req.body.input);
  let response = {};
  //checking for empties 
  if (utility.checkEmpty(fname)) {   
    response['status'] = 'error'; 
    response['msg'] = 'Empty First Name';
    return res.send(response); 
  } 

  if (utility.checkEmpty(user_mobile)) {
    response['status'] = 'error';
    response['msg'] = 'Empty Customer Mobile';
    return res.send(response);
  }

  if (utility.checkEmpty(user_email)) {
    response['status'] = 'error';
    response['msg'] = 'Empty Customer Email';
    return res.send(response);
  }

  if (utility.checkEmpty(user_password)) {
    response['status'] = 'error';
    response['msg'] = 'Empty Customer Password';
    return res.send(response);
  }

  if (utility.checkEmailFormat(user_email)) {
    response['status'] = 'error';
    response['msg'] = 'Enter Correct Email';
    return res.send(response);
  }

  let email_duplicacy_data = await dbquery.getAllUserDataByEmail(user_email);
  if (!utility.checkEmpty(email_duplicacy_data)) {
    response['status'] = 'error'; 
    response['msg'] = 'email_duplicacy';
    return res.send(response);
  }

  let mobile_duplicacy_data = await dbquery.getAllUserDataByMobile(user_mobile);
  if (!utility.checkEmpty(mobile_duplicacy_data)) {
    response['status'] = 'error';
    response['msg'] = 'mobile_duplicacy';
    return res.send(response);
  }

  

  let encrypted_password = await utility.encryptData(user_password);
  // db, table, params;
  let params = {};
  params['user_fname'] = fname;
  params['user_lname'] = lname;
  params['user_mobile'] = user_mobile;
  params['user_email'] = user_email;
  params['user_password'] = encrypted_password;

  //pending customer image
  await dbquery.insertSingle('user_master_db', params);

  response['status'] = 'success';
  response['msg'] = 'registered';
  return res.send(response);
};

exports.user_signin = async (req, res) => {
  try {
    if (utility.checkEmpty(constants.dbconn)) {
      constants.dbconn = await dbcon.connection().catch((e) => {
        console.log(e);
      });
    }
    let input = req.body.input;
    let user_email = input.user_email;
    let user_password = input.user_password;
    console.log(
      '-------------------------------- ' + req.body.input.user_password
    );
    let response = {};
   
    if (utility.checkEmpty(user_email)) {
      response['status'] = 'error';
      response['msg'] = 'Enter email to login';
      return res.send(response);
    }
    if (utility.checkEmpty(user_password)) {
      response['status'] = 'error';
      response['msg'] = 'Enter password to login';
      return res.send(response);
    }

    let user_id = await methods.user_id(user_email);
    let details = await dbquery.getAllUserDataByEmail(user_email);
    if (utility.checkEmpty(details)) {
      response['status'] = 'error';
      response['msg'] = 'no_such_email_user';
      return res.send(response);
    }
    let authentication_status = await methods.authentication_status(
      user_email,
      user_password
    );
    if (!authentication_status) {
      response['status'] = 'error';
      response['msg'] = 'wrong_email_or_password';
      return res.send(response);
    }

    // console.log(details);
    let profile_pic = details.user_profile_url;
    let first_name = details.user_fname;
    let last_name = details.user_lname;
    let mobile = details.user_mobile;
    let email = details.user_email;
    let user = details.user_id;
    response['status'] = 'success';
    response['msg'] = '';
    response['user_id'] = user_id;
    response['profile_pic'] = profile_pic;
    response['first_name'] = first_name;
    response['last_name'] = last_name;
    response['mobile'] = mobile;
    response['email'] = email;
    response['user'] = user;
    return res.send(response);
  } catch (error) {
    console.log(error);
  }
};

