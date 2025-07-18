const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Bug = require('../src/models/Bug');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/bugtracker_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Bug.deleteMany();
});

describe('Bug API routes', () => {
  test('POST /api/bugs - create a new bug', async () => {
    const response = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test bug', description: 'test desc' });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test bug');
  });

  test('GET /api/bugs - return all bugs', async () => {
    await Bug.create({ title: 'Bug 1', description: 'desc', status: 'open' });

    const response = await request(app).get('/api/bugs');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('PUT /api/bugs/:id - update a bug', async () => {
    const bug = await Bug.create({ title: 'Bug', description: 'desc' });

    const response = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: 'resolved' });

    expect(response.body.status).toBe('resolved');
  });

  test('DELETE /api/bugs/:id - delete a bug', async () => {
    const bug = await Bug.create({ title: 'Bug', description: 'desc' });

    const response = await request(app).delete(`/api/bugs/${bug._id}`);

    expect(response.body.message).toBe('Bug deleted');
  });
});
