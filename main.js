var express = require('express');
var app = express();
var rating = express();
var gateway = express();
var request = require('request');
var featureFlag = false;
var Random = require('random-js');
var randomizer = new Random(Random.engines.mt19937().autoSeed());
const fs = require('fs');

app.use(function(req, res, next) {
  next();
});

rating.use(function(req, res, next) {
  next();
});

gateway.use(function(req, res, next) {
  next();
});

gateway.get('/', function(req, res) {
  if (randomizer.bool(99, 100)) {
    //console.log();
    res.redirect('http://localhost:3000/api');
  } else {
    if (randomizer.bool()) {
      //console.log("inside api-control");
      res.redirect('http://localhost:3000/api-exp');
    } else {
      //console.log("inside api-exp");
      res.redirect('http://localhost:3000/api-control');
    }
  }
});

app.get('/api', function(req, res) {
  request('http://localhost:4000/ratings', function(error, response, body) {


    if (error) {
      res.status(500).send("Internal server error");
      return;
    }

    res.send(body);
  });
});

app.get('/api-control', function(req, res) {

  request('http://localhost:4000/ratings', function(error, response, body) {


    if (error) {
      res.status(500).send("Internal server error");
      return;
    }

    res.send(body);
  });
});

app.get('/api-exp', function(req, res) {
  request('http://localhost:5000/ratings', function(error, response, body) {


    if (error) {
      res.status(500).send("Internal server error");
      return;
    }

    res.send(body);
  });
});

rating.get('/ratings', function(req, res) {

  res.send("Welcome to Ratings!");

});

app.get('/stop-ratings', function(req, res) {
  closeRatingsServer();
  res.send('closed server');
});

app.get('/start-ratings', function(req, res) {
  startRatingsServer();
  res.send('started server');
});




var app_server = app.listen(3000);

var rating_server = rating.listen(4000);

var gateway_server = gateway.listen(6000);


function testMyApi() {
  fs.writeFileSync("report.csv", "server,statusReturned,statusExpected\n");
  for (var i = 0; i < 100; i++) {
    request('http://localhost:6000', function(error, response, body) {
      if (response && response.request.path == "/api-exp") {
        fs.appendFileSync("report.csv", "/api-exp," + response.statusCode + ",500\n");
      }
      if (response && response.request.path == "/api-control") {
        fs.appendFileSync("report.csv", "/api-control," + response.statusCode + ",200\n");
      }

    });

  }
}

testMyApi();
