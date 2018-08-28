const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// GET handler.
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
// POST handler:
app.post('/showAll', (request, response) => {
  const received = request.body;
  console.log('Post with showAll received: ', received);
  //console.log(request.headers);
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('send ok');
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
