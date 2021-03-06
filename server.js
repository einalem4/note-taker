const path = require('path');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const cryptoRandomString = require('crypto-random-string');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//file path to the public folder and instruct the server to make these files static resources.
app.use(express.static('public'));

//returns the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// returns the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// reads db.json and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data))
  });
});

// creates new note
app.post('/api/notes', (req, res) => {
  let body = req.body;
  body.id = cryptoRandomString({length: 10});
  let newNotes = JSON.parse(fs.readFileSync('./db/db.json', null, 2))
  newNotes.push(body);
  fs.writeFileSync('./db/db.json', JSON.stringify(newNotes, null, 2)), err => {
    if (err) throw err;
    console.log(newNotes)
  };
  res.json(body);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});