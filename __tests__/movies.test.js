const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/models');

// Dummy user for testing
const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  // Create an "agent" that gives us the ability
  // to store cookies between requests in a test
  const agent = request.agent(app);

  // Create a user to sign in with
  const user = await db.User.create({ ...mockUser, ...userProps });

  // ...then sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('user routes', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    try {
      await db.Movies.bulkCreate('Movies', [
        {
          title: 'Fresh',
          description: 'Bad movie, do not watch',
          image: 'www.FreshFilm.com',
          releaseYear: '2022',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Beerfest',
          description: 'Great movie, do watch',
          image: 'www.BeerfestFilm.com',
          releaseYear: '2006',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'The Corpse Bride',
          description: 'Fantastic movie, definitely watch',
          image: 'www.TheCorpseBrideFilm.com',
          releaseYear: '2005',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pans Labyrinth',
          description: 'Very trippy yet excellent movie',
          image: 'www.PansLabyrinthFilm.com',
          releaseYear: '2006',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
  it('should return a list of movies including genre', async () => {
    const resp = await request(app).get('/api/v1/movies');
    expect(resp.status).toBe(200);
    console.log(resp.body);
    expect(resp.body[0]).toEqual({
      title: expect.any(String),
      description: expect.any(String),
      image: expect.any(String),
      releaseYear: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

});
