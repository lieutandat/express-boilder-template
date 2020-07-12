const { signJwt } = require('../../core/utils/jwt')

const delay = ms => new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, ms);
})

const tokenPayload = {
	id: '123',
	email: 'test@example.com'
};

const getToken = (payload, expireTime = '10m') => signJwt(payload ? payload : tokenPayload, expireTime)

module.exports = {
    delay,
    getToken
}