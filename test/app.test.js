require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const Note = require('../lib/models/Note');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('can create a note', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({
        title: 'this is a title',
        body: 'this is definitely not a test, never would I ever write a test.'
      })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          title: 'this is a title',
          body: 'this is definitely not a test, never would I ever write a test.',
          __v: 0
        });
      });
  });
});
