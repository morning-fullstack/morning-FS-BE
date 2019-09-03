const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      body
    } = req.body;

    Note
      .create({ title, body })
      .then(note => res.send(note))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Note
      .find()
      .then(notes => res.send(notes))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Note
      .findByIdAndDelete(req.params.id)
      .then(note => res.send(note))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const {
      title
    } = req.body;
    Note
      .findByIdAndUpdate(req.params.id, { title }, { new: true })
      .then(note => res.send(note))
      .catch(next);
  });

