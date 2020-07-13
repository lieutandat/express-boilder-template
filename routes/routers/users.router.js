const express = require('express');

const userRouter = express.Router();
const authorizeHandler = require('../middlewares/authorize');

const UserController = require('../../controllers/user.controller');

const userController = new UserController();

const excludeAuthen = ['/register'];
userRouter.use(authorizeHandler(excludeAuthen));

userRouter.get('/all', userController.getUsers);
userRouter.post(
  '/register',
  userController.createUserValidate,
  userController.createUser,
);
userRouter.put('/update', userController.updateUser);
userRouter.get(
  '/findByName',
  userController.findUserByNameValidate,
  userController.findUserByName,
);
userRouter.delete(
  '/delete',
  userController.validateDeleteUser,
  userController.deleteUser,
);
module.exports = userRouter;
