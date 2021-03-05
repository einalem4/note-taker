const path = require('path');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//file path to the public folder and instruct the server to make these files static resources.
app.use(express.static('public'));

// returns the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//returns the index.html file
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});