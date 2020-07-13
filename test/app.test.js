const request = require('supertest');
const app = require('../app');
const db = require('../database');
const { delay, getToken } = require('./utils');
const { getErrorMessages } = require('../core/errors');

test('HealthCheck', async () => {
	await request(app).get('/api/v1').expect(200).expect('Content-Type', /text/);
});

test('Valid authorization', async () => {
	const myMock = (db.User.findAll = jest.fn().mockReturnValue([]));
	const token = getToken();
	await request(app)
		.get('/api/v1/user/all')
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect('Content-Type', /json/);
	myMock.mockClear();
});

test('Without authorization header', async () => {
	await request(app)
		.get('/api/v1/user/all')
		.expect(401)
		.expect(401, { success: false, message: getErrorMessages(4010, 'en') });
});

test('Expired token', async () => {
	const token = getToken(null, '1s');
	await delay(1500);
	await request(app)
		.get('/api/v1/user/all')
		.set('Authorization', `Bearer ${token}`)
		.expect(401);
});
