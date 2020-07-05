const request = require('supertest');
const app = require('../app');

test('HealthCheck', async () => {
    await request(app)
    .get('/api/v1')
    .expect(200)
    .expect('Content-Type', /text/)
})

