const UserRespository = require('../repositories/user.respository');
const HashPasswordUtils = require('../core/utils/hash-password.utils');

function getUsersService() {
    return UserRespository.getUsers();
}

/**
 * @function
 * @param {{
        firstName: String,
        lastName: String,
        email: String,
        password: String
    }} user 
 */
async function createUserService(user) {
    const existingUser = await UserRespository.findUserBy({ email: user.email });
    if(existingUser) {
        throw { code: 5100, status: 400, message: `Existing user's email`}
    }
    const passwordData = HashPasswordUtils.generateHashPassword(user.password);
    return UserRespository.createUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        hash: passwordData.hash,
        salt: passwordData.salt
    });
}

/**
 * @function
 * @param {{
    firstName: String,
    lastName: String,
    email: String
}} user 
*/
function updateUserService(user) {
    return UserRespository.updateUser(user);
}

function findUserByNameService(name) {
    return UserRespository.findUserByName(name);
}

module.exports = {
    getUsersService,
    createUserService,
    updateUserService,
    findUserByNameService
}