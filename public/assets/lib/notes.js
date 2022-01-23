const fs = require("fs");
const path = require("path");

function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    
    fs.writeFileSync(
        path.join(__dirname, "../../../db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}

function findNoteByID (id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function deleteNote (body, notesArray) {
    const note = body;
    let results = notesArray.splice(note,1);
    console.log(results);

    fs.writeFileSync(
        path.join(__dirname, "../../../db/db.json"),
        JSON.stringify({ notes: results }, null, 2)
    );

}

module.exports = {createNewNote, deleteNote, findNoteByID};