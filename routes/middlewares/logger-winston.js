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


const loggerMiddleWare = (err, req, res, next) => {
	try {
		const { language = 'en' } = req.headers
		if (err && err.name === 'UnauthorizedError') {
			res.status(401).end();
		} else if (err) {
			winston.info('Server error with route: ' + req.url)
			winston.error(err.stack || err);
			if (NODE_ENV === 'production') {
				res.status(500).send({
					error: true,
					message: getErrorMessages(err.code, language)
				});
			} else {
				res.status(500).send({
					error: true,
					message: getErrorMessages(err.code, language),
					devMessage: err.message
				});
			}
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