const UserRespository = require('../repositories/user.respository');
const { verifyPassword } = require('../core/utils/hash-password.utils');
const { signJwt } = require('../core/utils/jwt');

async function loginService(email, password) {
  const user = await UserRespository.findUserBy({ email });
  if (user) {
    const isMatch = verifyPassword(
      password,
      user.get('salt'),
      user.get('hash'),
    );
    if (isMatch) {
      return signJwt({ sub: user.get('id'), email: user.get('email') });
    }
  }
  return null;
}

module.exports = {
  loginService,
};
