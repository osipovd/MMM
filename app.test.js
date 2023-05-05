const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  test('returns a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Welcome to my Express server!');
  });
});

describe('GET /mean', () => {
  test('returns the correct mean of numbers', async () => {
    const response = await request(app).get('/mean?nums=2,4,6,8');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mean', value: 5 });
  });
});

describe('GET /median', () => {
  test('returns the correct median of numbers', async () => {
    const response = await request(app).get('/median?nums=2,4,6,8');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'median', value: 5 });
  });
});

describe('GET /mode', () => {
  test('returns the correct mode of numbers', async () => {
    const response = await request(app).get('/mode?nums=2,2,4,4,4,6,8');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mode', value: 4 });
  });
});
