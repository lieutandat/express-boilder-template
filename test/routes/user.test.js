const request = require('supertest');
const app = require('../../app');
const { getToken } = require('../utils');
const db = require('../../database');

const usersMock = [
	{
		firstName: 'test',
		lastName: 'test',
		email: 'test@gmail.com',
		activated: true,
	},
];

afterEach(() => {
	jest.resetAllMocks();
});

test('GET user/all', async () => {
	const myMock = (db.User.findAll = jest.fn().mockReturnValue(usersMock));
	await request(app)
		.get('/api/v1/user/all')
		.set('Authorization', `Bearer ${getToken()}`)
		.expect(200)
		.expect('Content-Type', /json/)
		.then((response) => {
			expect(response.body.data).toEqual(usersMock);
		});

	expect(myMock).toHaveBeenCalled();
});

test('GET user/findByName', async () => {
	const myMock = (db.User.findAll = jest.fn().mockReturnValue(usersMock));
	await request(app)
		.get('/api/v1/user/findByName')
		.set('Authorization', `Bearer ${getToken()}`)
		.query({ name: 'Test' })
		.expect(200)
		.expect('Content-Type', /json/)
		.then((response) => {
			expect(response.body.data).toEqual(usersMock);
		});

	expect(myMock).toHaveBeenCalled();
});

test('GET user/findByName - Bad Request', async () => {
	await request(app)
		.get('/api/v1/user/findByName')
		.set('Authorization', `Bearer ${getToken()}`)
		.expect(400);
});

test('POST user/register', async () => {
	const mockModel = {
		firstName: 'Test',
		lastName: 'Test',
		email: 'test2@gmail.com',
	};
	const myMock = (db.User.create = jest.fn().mockReturnValue(mockModel));
	await request(app)
		.post('/api/v1/user/register')
		.set('Authorization', `Bearer ${getToken()}`)
		.send({
			firstName: 'Test',
			lastName: 'Test',
			email: 'test2@gmail.com',
			password: '1234',
		})
		// .expect(200)
		.expect('Content-Type', /json/)
		.then((response) => {
			console.log(response.body);
			expect(response.body.data.email).toEqual(mockModel.email);
		});
});

test('POST user/register - Existing Email', async (done) => {
	const myMock = (db.User.findAll = jest.fn().mockReturnValue(usersMock));
	await request(app)
		.post('/api/v1/user/register')
		.set('Authorization', `Bearer ${getToken()}`)
		.send({
			firstName: 'Test',
			lastName: 'Test',
			email: 'test@gmail.com',
			password: '1234',
		})
		.expect(400)
		.expect((err, res) => {
			expect(err.body.message).toEqual(`Existing User's email`);
			done();
		});
});

test('POST user/register - Bad request', async () => {
	await request(app)
		.post('/api/v1/user/register')
		.set('Authorization', `Bearer ${getToken()}`)
		.send({
			lastName: 'Test',
			email: 'test@gmail.com',
			password: '1234',
		})
		.expect(400);
});

test('PUT user/update - Update user', async () => {
	const myMock = (db.User.update = jest.fn().mockReturnValue([1]));
	await request(app)
		.put('/api/v1/user/update')
		.set('Authorization', `Bearer ${getToken()}`)
		.send({
			id: '1231',
			lastName: 'Test2',
			email: 'test@gmail.com',
		})
		.expect(200);
});

test('DELETE user/delete - Delete User', async () => {
	const myMock = (db.User.destroy = jest.fn().mockReturnValue([1]));
	await request(app)
		.delete('/api/v1/user/delete')
		.query({
			id: '1231',
			email: 'test@gmail.com',
		})
		.set('Authorization', `Bearer ${getToken()}`)
		.expect(200);
});
