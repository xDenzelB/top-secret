const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const { send } = require('express/lib/response');
const { agent } = require('supertest');

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

  it('signs in a user', async () => {
    const user = await UserService.create({
      email: 'denzel@defence.gov',
      password: 'balut',
    });
    const agent = request.agent(app);
    const res = await agent
    .post('/api/v1/users/signin')
    .send({
      email: 'denzel@defence.gov',
      password: 'balut'
    });
    expect(res.body).toEqual({
      message: 'You have successfully signed in!',
      user
    });
  });

  it('should be able to logout a user', async () => {
    const agent = request.agent(app);
    await UserService.create({
      email: 'denzel@defence.gov',
      password: 'balut',
    });

  const user = await agent
    .post('/api/v1/users/signin')
    .send({
      email: 'denzel@defence.gov',
      password: 'balut',
    });

    const res = await agent
    .delete('/api/v1/users/sessions')
    .send({ 
      email: user.email,
      password: 'balut',
     });

    expect(res.body).toEqual({
      message: 'Successfully signed out',
    });
  })
});
