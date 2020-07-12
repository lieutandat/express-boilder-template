const { celebrate, Joi } = require('celebrate');

const BaseController = require('./base-controller');
const userService = require('../services/user.service');


class UserController extends BaseController {

    constructor() {
        super(module);
    }

    getUsers = this.asyncHandler(async (req, res) => {
        const users = await userService.getUsersService();
        return this.ok(res, users);
    })

    createUser = this.asyncHandler(async (req, res) => {
        const user = req.body;
        const result = await userService.createUserService(user);
        return this.ok(res, result);
    })

    createUserValidate = celebrate({
        body: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    })

    updateUser = this.asyncHandler(async (req, res) => {
        const user = req.body;
        const result = await userService.updateUserService(user);
        return this.ok(res, result);
    })

    findUserByName = this.asyncHandler(async (req, res) => {
        const name = req.query.name;
        const result = await userService.findUserByNameService(name);
        return this.ok(res, result);
    })

    findUserByNameValidate = celebrate({
        query: {
            name: Joi.string().required()
        }
    })

    deleteUser = this.asyncHandler(async (req, res) => {
        const { id, email } = req.query;
        const result = await userService.deleteUserService({ id, email })
        return this.ok(res, result)
    })

    validateDeleteUser = celebrate({
        query: {
            id: Joi.string(),
            email: Joi.string()
        }
    })

}

module.exports = UserController