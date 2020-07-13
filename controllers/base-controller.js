const {
	logger,
	getModulePath,
} = require('../routes/middlewares/logger-winston');

class BaseController {
	_module = null;

	constructor(module) {
		if (module) {
			this._module = getModulePath(module);
		} else {
			throw new Error(
				'Require extends file module throught contructor: ' +
					this.constructor.name
			);
		}
	}
	/**
	 * @function
	 * @param {'info' | 'log'} level
	 * @param {*} data
	 */
	log(level, data) {
		try {
			const message = typeof data === 'object' ? JSON.stringify(data) : data;
			logger(this._module, level, message);
		} catch (error) {
			console.error(new Error('Data was unable to stringify'));
		}
	}

	/**
	 * Use to handle async request
	 * @function
	 * @param {*} fn
	 */
	asyncHandler(fn) {
		return (req, res, next) => {
			Promise.resolve(fn(req, res, next)).catch(next);
		};
	}

	ok(res, data) {
		return res.status(200).send({
			success: true,
			data: data,
		});
	}

	bad(res, data, message) {
		return res.send(400).send({
			success: false,
			message: message,
			data: data,
		});
	}

	custom(res, status, success, data, message) {
		return res.send(status).send({
			success: success,
			message: message,
			data: data,
		});
	}
}

module.exports = BaseController;
