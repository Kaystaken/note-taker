const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

const DB_LOCATION = './db/notes.json';

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile(DB_LOCATION).then((data) => res.json(JSON.parse(data)));
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

    readAndAppend(newNote, DB_LOCATION);
    res.json(newNote);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for a note
notes.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    readFromFile(DB_LOCATION)
      .then((data) => {
        const notes = JSON.parse(data);
        const filteredNotes = notes.filter(note => note.id !== id);
        writeToFile(DB_LOCATION, filteredNotes);
        res.json('');
      })
      .catch(err => res.error('Error in deleting note:', err));
  } else {
    res.error('Error in deleting note');
  }
});

module.exports = notes;