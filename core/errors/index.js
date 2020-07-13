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
	return lang[key]
		? lang[key][errorCode]
			? lang[key][errorCode]
			: lang[key].default
		: lang[key].default;
}

module.exports = {
	getErrorMessages,
};
