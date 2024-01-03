const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(newNote);
  } else {
    res.error('Error in adding note');
  }
});

// POST Route for a new note
notes.delete('/:id', (req, res) => {
  console.log(req.body);

  const id = req.params.id;
  if (id) {

    res.json('');
  } else {
    res.error('Error in deleting note');
  }
});

module.exports = notes;