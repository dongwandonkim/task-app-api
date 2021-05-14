const request = require('supertest');
const app = require('../app');

test('should signup a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Dongwan',
      email: 'donkim@example.com',
      password: 'pass123',
    })
    .expect(201);
});
