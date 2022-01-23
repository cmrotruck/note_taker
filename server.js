const express = require('express');
const { notes } = require("./db/db.json");
const { createNewNote, deleteNote, findNoteByID } = require('./public/assets/lib/notes');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // set id based on Date.now which returns the number of milliseconds since Jan 1, 1970.
    req.body.id = Date.now().toString();
  
      const note = createNewNote(req.body, notes);
    // notes.push(note);
      res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const note = findNoteByID(req.params.id, notes);
    const results = deleteNote(note, notes);
    res.json(results);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});