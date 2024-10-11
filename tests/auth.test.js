const request = require('supertest');
const app = require('../src/app');

describe('User Registration', () => {
  it('should register a user and send OTP', async () => {
    const res = await request(app).post('/graphql')
      .send({
        query: `mutation {
          register(email: "testuser@example.com", password: "Password123!") 
        }`
      });
    expect(res.body.data).toHaveProperty('register');
  });
});
