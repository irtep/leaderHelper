const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pasw = process.env.SECRET2;
// database access:
const mongoose = require('mongoose'); 
const mongoDB = process.env.SECRET1; // admin
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Schema = mongoose.Schema;

const sahaListSchema = new Schema( {
  sahaList: {
    type: Array    
  } 
});
const muokkausListSchema = new Schema( {
  muokkausList: {
    type: Array    
  } 
});
const deletedListSchema = new Schema( {
  deletedList: {    
    type: Array    
  } 
});

const sahaListModel = mongoose.model('sahaListModel', sahaListSchema ); // for sahalist
const muokkausModel = mongoose.model('muokkausModel', muokkausListSchema ); // for muokkaus
const deletedModel = mongoose.model('deletedModel', deletedListSchema ); // for deleteds

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// GET handlers.
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index2.html');
});
app.get('/index3', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// POST handlers:
app.post('/showAll', (request, response) => {
  
  const received = request.body.MSG;
  let sahaList;
  let muokkausList;
  let deletedList;
  let allLists;
  
  console.log('Post with showAll received: ', received);
  switch (received){
    case ('show'):  
      deletedModel.find((err, results1) => {
      if (err) console.log(err);
      deletedList = results1;  
      console.log('result for deletdlist search: ', results1);
      });
      sahaListModel.find((err, results2) => {
      if (err) console.log(err);
      sahaList = results2;   
        console.log('result for sahalist search: ', results2);
      });
      muokkausModel.find((err, results3) => {
      if (err) console.log(err);
      muokkausList = results3;  
        console.log('result for muokkauslist search: ', results3);
      });
      setTimeout(() => {  // timed so that there is time to add the data
        allLists = [sahaList, muokkausList, deletedList];  
        const sending = JSON.stringify(allLists);
        console.log("responding with data ");
        console.log('all Lists now: ', allLists);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(sending);      
      }, 1000); //timer
    break;  
  }
  
  //console.log(request.headers);

});

app.post('/checkPW', (request, response) =>{
  console.log("login attempt");
  if (request.body.MSG == pasw) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('ok');
  }
});

app.post('/updateAll', (request, response) => {
  console.log('update all db lists request received');
  
  const received = JSON.parse(request.body.MSG); //saha, muokkaus, deleted
  const sahaQuery = { name:  'saha' }; 
  const muokkausQuery = { name:  'muokkaus' }; 
  const deletedQuery = { name:  'deleted' };
  
  setTimeout(() => { 
    sahaListModel.update(sahaQuery, {
      sahaList: received.saha
    }, (err, numberAffected, rawResponse) => {
      console.log("sahaList updated");
    }); 
    muokkausModel.update(muokkausQuery, {
      muokkausList: received.muokkaus
    }, (err, numberAffected, rawResponse) => {
      console.log("muokkausList updated");
    }); 
    deletedModel.update(deletedQuery, {
      deletedList: received.deleted
    }, (err, numberAffected, rawResponse) => {
      console.log("deletedList updated");
    });
  }, 600); //timer  
});
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
