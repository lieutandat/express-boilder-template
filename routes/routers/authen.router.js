const express = require('express');
const authenRouter = express.Router();
const authorizeHandler = require('../middlewares/authorize');

const AuthenController = require('../../controllers/authen.controller');
const authenController = new AuthenController();

const excludeAuthen = ['/login'];
authenRouter.use(authorizeHandler(excludeAuthen));

authenRouter.post(
	'/login',
	authenController.loginValidate,
	authenController.login
);

module.exports = authenRouter;
