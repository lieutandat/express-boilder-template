require('./configs');
const express = require('express');
const compression = require('compression');
const { errors } = require('celebrate');
const { loggerMiddleWare } = require('./routes/middlewares/logger-winston');
const router = require('./routes');
const app = express();

app.disable('x-powered-by');
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', router);

app.use(errors());
app.use(loggerMiddleWare);

if (process.env.NODE_ENV !== 'test') {
	app.listen(process.env.PORT, () => {
		console.log('App Started with port: ', process.env.PORT);
	});
}

module.exports = app;
