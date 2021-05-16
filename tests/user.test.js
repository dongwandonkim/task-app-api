const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should signup a new user', async () => {
  const res = await request(app)
    .post('/users')
    .send({
      name: 'Dongwan',
      email: 'donkim@example.com',
      password: 'pass123',
    })
    .expect(201);

  //check if db was changed correctly
  const user = await User.findById(res.body.user._id);
  expect(user).not.toBeNull();
});

test('should login existing user', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  //check if second token matches responsed token
  const user = await User.findById(userOneId);

  expect(user.tokens[1].token).toBe(res.body.token);
});

test('should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'donkim@example.com',
      password: 'pass123',
    })
    .expect(400);
});

test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get profile for unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('should delete acc for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});
test('should NOT delete acc for unauthenticated user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/test.png')
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'dongwankim',
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toBe('dongwankim');
});

test('Should not update invalid user field', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'abc',
    })
    .expect(400);
});
