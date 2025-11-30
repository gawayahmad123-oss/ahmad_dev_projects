const request = require('supertest');
const app = require('../src/index');
const { sequelize, User } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('create and list users', async () => {
  const res = await request(app)
    .post('/api/users')
    .send({ email: 'a@a.com', name: 'Alice' })
    .expect(201);

  expect(res.body.email).toBe('a@a.com');

  const list = await request(app).get('/api/users').expect(200);
  expect(Array.isArray(list.body)).toBe(true);
  expect(list.body.length).toBe(1);
});
