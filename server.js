// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var URLS = require('./urls.js');
var dbUrl = "mongodb://fccdb:t12345@ds121575.mlab.com:21575/surls"
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.send(request.params);
});

//Our work goes here
app.get("/http://:url", function (req, res) {
  var url = req.params.url
  console.log(url)
   var bpattren = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
   var spattren = /^[a-zA-Z0-9]{4}$/;
  if(url.match(bpattren)){
     // got the long url
     // genarate a shortened word with 4 letters
     var randomUrl = getRandomString(4)
    var shortUrl =  "https://rhinestone-jewel.glitch.me" +"/" + randomUrl 
     // save that as a key in the database
    var url = new URLS({
       shortUrl: randomUrl,
       longUrl:String(url)
    })
    
    url.save(function(err,data){
      if(error){
        console.log("error saving urls");
      }else{
        // and send that url as a response to the user
        var urlToSend = {"original_url":url,"short_url":shortUrl}
        res.send(urlToSend);
        
      }
    })
     
      
   }else if(url.match(spattren)){
     // got the shortened url
     // query the db to get the long url 
     // redirect to the long url 
     
   }else{
     // got the the junk
     // send the error
     var error = {"error":"This url is not the valid url."}
     res.send(error);
   }
});

app.get("/:url", function (req, res) {
  var url = req.params.url
  console.log(url)
  var spattren = /^[a-zA-Z0-9]{4}$/;
  if(url.match(spattren)){
     // got the shortened url
     // query the db to get the long url 
     // redirect to the long url 
    res.send(url);
     
   }else{
     // got the the junk
     // send the error
     var error = {"error":"This url is not the valid url."}
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
  var buffer = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  var string = "";
  for(var i = 0; i < 4; i++){
     string += buffer[getRandomNum(0,buffer.length-1)];
  }
  return string;
}
