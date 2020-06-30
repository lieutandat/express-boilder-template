const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt) {
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');
};

/**
 * generate salt/hash from user password
 * @function
 * @param { String } password 
 */
function generateHashPassword(password) {
    const salt = genRandomString(16); /** Gives us salt of length 16 */
    const hash = sha512(password, salt);
    return {
        salt,
        hash
    }
}

/**
 * 
 * @param { String } password 
 * @param { String } salt 
 * @param { String } hash 
 */
function verifyPassword(password, salt, hash) {
    const tempHash = sha512(password, salt);
    return tempHash === hash;
}

module.exports = {
    generateHashPassword,
    verifyPassword
}