const lang = require('./langs');

const langs = Object.keys(lang);

/**
 * return message with error code and country code
 * @function
 * @param { Number } errorCode
 * @param { 'vn' | 'en'} country
 * @returns { String }
 */
function getErrorMessages(errorCode, country) {
  const key = langs.includes(country) ? country : 'en';
  if (lang[key]) {
    return lang[key][errorCode] || lang[key].default;
  }
  return lang[key].default;
}

module.exports = {
  getErrorMessages,
};
