// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//Our work goes here
app.get("/:url", function (req, res) {
  var url = req.params.url
   var bpattren = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
   var spattren = /^[a-zA-Z0-9]{4}$/;
  if(url.match(bpattren)){
     // got the long url
     // genarate a shortened word with 4 letters
     // save that as a key in the database
     // and send that url as a response to the user
      
   }else if(url.match(spattren)){
     // got the shortened url
     // query the db to get the long url 
     // redirect to the long url 
     
   }else{
     // got the the junk
     // send the error
     var error = {"error":"This url is not on the database."}
     res.send(error);
   }
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function getRandomNum(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(length){
  
}
