const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('top-secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a new user', async () => {
    const res = await request(app)
    .post('/api/v1/users/signup')
    .send({ email: 'ilovechicken@gmail.com', password: 'chickenislife'});

    expect(res.body).toEqual({ user_id: expect.any(String), email: 'ilovechicken@gmail.com'})
  })
});
