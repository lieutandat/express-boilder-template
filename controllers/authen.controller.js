const { celebrate, Joi } = require('celebrate');

const BaseController = require('./base-controller');
const authenService = require('../services/authen.service');


class AuthenController extends BaseController {

    constructor() {
        super(module);
    }

    login = this.asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const token = await authenService.loginService(email, password);
        if(token) {
            return this.ok(res, { token: token })
        } 
        return this.custom(res, 401, false)
    })

    loginValidate = celebrate({
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    })

}

module.exports = AuthenController