const UserRespository = require('../repositories/user.respository');
const { verifyPassword } = require('../core/utils/hash-password.utils');

async function loginService(email, password) {
    const user = await UserRespository.findUserBy({email: email})
    return verifyPassword(password, user.get('salt'), user.get('hash'))
}

module.exports = {
    loginService
}