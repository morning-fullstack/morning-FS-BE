require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Note = require('../lib/models/Note');

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

  it('can get an array of notes with GET', async() => {
    await Note.create([
      { title: 'its a tilt', body: 'its a hot bod' }, 
      { title: 'this is a title', body: 'this is definitely not a test, never would I ever write a test' }
    ]);
    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          title: 'this is a title', 
          body: 'this is definitely not a test, never would I ever write a test',
          __v: 0
        });
      });
  });

  it('can DELETE a note', async() => {
    const note = await Note.create({ title: 'its a tilt', body: 'its a hot bod' });
    
    return request(app)
      .delete(`/api/v1/notes/${note._id}`)
      .then(res => {
        expect(res.body.title).toEqual('its a tilt');
      });
  });

  it('can UPDATE a note', async() => {
    const note = await Note.create({ title: 'its a tilt', body: 'its a hot bod' });

    return request(app)
      .put(`/api/v1/notes/${note._id}`)
      .send({ title: 'its on tilt now' })
      .then(res => {
        expect(res.body.title).toEqual('its on tilt now');
      });
  });
});
