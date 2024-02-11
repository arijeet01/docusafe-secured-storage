const express = require('express');
const userController = require('../controllers/userControllers/userController.js');
const app = express();

app.use('/auth/user/signup', userController.user_signup);
app.use('/auth/user/signin', userController.user_signin);

module.exports = app;
