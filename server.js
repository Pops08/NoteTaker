const fs = require('fs');
//For connecting an HTML
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({
    extended: true
}));
// parse incoming JSON data
app.use(express.json());

//Added Middleware to grab files (CSS or JS on an html) available
//provide a file path to a location in our application (in this case, the public folder) and instruct the server to make these files static resources.
app.use(express.static('public'));

//include the notes json
const {notes} = require('./db/db');




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.listen(PORT, () => {
    console.log(`API Server on port ${PORT}`)
})