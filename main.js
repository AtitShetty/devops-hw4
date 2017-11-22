var express = require('express');
var app = express();
var rating = express();
var request = require('request');
var featureFlag = false;
var Random = require('random-js');
var randomizer = new Random(Random.engines.mt19937().autoSeed());

function ServerLogs(serverCode, serverStatus, ratingsStatus){
	
}

app.use(function(req,res,next){
	next();
});

rating.use(function(req,res,next){
	next();
});

app.get('/api',function(req,res){
	if(randomizer.bool(99,100)){
		console.log("inside api");
		res.redirect('/api-main');

	}else{
		if(randomizer.bool()){
			console.log("inside api-control");
			res.redirect('/api-control');
		}else{
			console.log("inside api-exp");
			res.redirect('/api-exp');
		}
	}
});

app.get('/api-main', function(req,res){
	request('http://localhost:4000/ratings', function(error,response,body){
		if(error){
			res.status(500).send("Internal server error");
			return;
		}
		res.send("Status:"+response.statusCode+"<br>"+body);
	});
});

app.get('/api-control', function(req,res){
	res.send('api-control');
});

app.get('/api-exp', function(req,res){
	res.status(500).send('Ratings is Down!');
});

rating.get('/ratings',function(req,res){

		res.send("Welcome to Ratings!");

});

app.get('/stop-ratings',function(req,res){
	closeRatingsServer();
	res.send('closed server');
});

app.get('/start-ratings',function(req,res){
	startRatingsServer();
	res.send('started server');
});



var app_server = app.listen(3000);

var rating_server = rating.listen(4000);

function closeRatingsServer(){
	rating_server.close();
}

function startRatingsServer(){
	rating_server = rating.listen(4000);
}

function testMyApi(){

	for(var i = 0; i < 100; i++){
		toggleRatingsServer();

	}
}

function toggleRatingsServer(){
	if(randomizer.bool(0.5)){
		startRatingsServer();
	}else{
		closeRatingsServer();
	}
}
