const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../../configs/index.js');

const PRIV_KEY = fs.readFileSync('private.key', 'utf8');
const algorithm = config.security.jwt.algorithm;
/**
 *
 * @param { object } payload
 */
function signJwt(payload, expiresIn = config.security.jwt.maxage) {
	return jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn });
}

/**
 *
 * @param { String } token
 */
function verifyJwt(token) {
	try {
		const userdecoded = jwt.verify(token, PRIV_KEY, { algorithm: algorithm });
		return { success: true, user: userdecoded };
	} catch (error) {
		return { success: false, status: 401, message: error.message };
	}
}

module.exports = {
	signJwt,
	verifyJwt,
};
