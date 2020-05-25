const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;

//parse incoming string or array data
app.use(express.urlencoded({
    extended: true
}));
// parse incoming JSON data
app.use(express.json());

//Added Middleware to grab files (CSS or JS on an html) available
app.use(express.static('public'));

//include the notes json
const {notes} = require('./db/dbNotes.json');

//Create new note function that adds to array then writes to JSON file
function createNewNote(body, animalsArray) {
    const newNote = body;
    notes.push(newNote)

    fs.writeFileSync(
        path.join(__dirname, './db/dbNotes.json'),
        JSON.stringify({
            newNote: notes
        }, null, 2)
    );

    // return finished code to post route for response
    return newNote;
}

function checkNote(note) {
    if (!note.title || !note.text) {
        return false;
    }
    return true;
}



app.get('/api/notes', (req, res) => {
    let results = notes;
    return res.send(results);
});

app.post('/api/notes', (req, res) => {
    // if any data in req.body is incorrect, send 400 error back
    if (!checkNote(req.body)) {
        res.status(400).send('Please Populate The Missing Information.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }

    console.log(req.body);
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.listen(PORT, () => {
    console.log(`API Server on port ${PORT}`)
    console.log(notes);
})