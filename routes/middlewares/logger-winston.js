const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const { getErrorMessages } = require('../../core/errors');
const { NODE_ENV } = process.env;

const showFormat = winston.format.printf((payload) => {
	const { level, message, module, timestamp } = payload;
	return `${timestamp} [${module}] ${level.toUpperCase()}: ${message}`;
});

winston.configure({
	transports: [
		new DailyRotateFile({
			filename: 'application-%DATE%.log',
			datePattern: 'YYYY-MM-DD-HH',
			zippedArchive: true,
			maxSize: '20m',
			dirname: './logs',
			format: 
			winston.format.combine(
				winston.format.timestamp(),
				showFormat
			)
		})
	]
});

function sendErrorMessage(req, res, { status, error, devMessage }) {
	winston.info('Server error with route: ' + req.url)
	winston.error(error.stack || error);
	const { language = 'en' } = req.headers
	if (NODE_ENV === 'production') {
		return res.status(status).send({
			error: true,
			message: getErrorMessages(error.code, language)
		});
	} else {
		return res.status(status).send({
			error: true,
			message: getErrorMessages(error.code, language),
			devMessage: devMessage.replace(/\"/g, `'`)
		});
	}
}

const loggerMiddleWare = (error, req, res, next) => {
	try {
		if (error && error.name === 'UnauthorizedError') {
			return res.status(401).end();
		} else if (error && error.name === 'SequelizeForeignKeyConstraintError') {
			const result = /(table \"[\w.]+\")/g.exec(error.message)
			if(result && result.length > 0) {
				const devMessage = `Your insert value does not match reference to ${result[0]}`
				return sendErrorMessage(req, res, {status: 500, error, devMessage})
			} else {
				return sendErrorMessage(req, res, {status: 500, error, devMessage: error.message})
			}
		} else if (error && error.status && typeof error.status === 'number') {
			return sendErrorMessage(req, res, {status: error.status, error, devMessage: error.message})
		} else if (error) {
			return sendErrorMessage(req, res, {status: 500, error, devMessage: error.message})
		} else {
			res.status(405).send();
		}
	} catch (error) {
		console.log('INTERNAL_SERVER_ERROR', error)
	}	
};


const getModulePath = function(callingModule) {
	const parts = callingModule.filename.split(path.sep);
	return path.join(parts[parts.length - 2], parts.pop());
};

module.exports.getModulePath = getModulePath

module.exports.logger = (fileModule, level, message, meta) => {
	let _module = fileModule;
	if(typeof fileModule === 'object') {
		_module = getModulePath(fileModule);
	} else if(!fileModule) {
		_module = 'Undefined Module Path';
	}
	winston.log(level, message, {...meta, module: _module });
}

module.exports.loggerMiddleWare = loggerMiddleWare