const express = require('express');
const app = express();
// database access:
const mongoose = require('mongoose'); 
const mongoDB1 = process.env.SECRET1; // admin
const mongoDB = process.env.SECRET2; // visitor
mongoose.connect(mongoDB1); // change this if need db admin/visitor
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Schema = mongoose.Schema;

app.use(express.static('public'));

// GET handler.
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
// POST handler:
app.post('/showAll', (request, response) => {
  console.log('Post with showAll received');
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
