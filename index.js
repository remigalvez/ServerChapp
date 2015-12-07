var fs = require('fs');
var express = require('express');
var app = express();

var uber = require(__dirname + '/apps/UberApp.js');
var wu = require(__dirname + '/apps/WeatherUndergroundApp.js');
var postmates = require(__dirname + '/apps/PostmatesApp.js');
var jokebot = require(__dirname + '/apps/JokeBotApp.js');
var yoMomma = require(__dirname + '/apps/YoMommaApp.js');
var nyTimes = require(__dirname + '/apps/NYTimesApp.js');
var db = require(__dirname + '/parseHandler.js');

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    res.json({name:'Remi'});
});

app.get('/User/:id/apps', function (req, res) {
    var userId = req.params.id;
    db.getUserApps(userId, res);
});

app.get('/App/:id', function (req, res) {
    var appId = req.params.id;
    db.getApp(appId, res);
});

app.get('/uber', function (req, res) {
	var img = fs.readFileSync('./res/UberAppIcon.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');

    var start_latitude = 3.1357;
    var start_longitude = 101.6880;
    var end_latitude = 3.0833;
    var end_longitude = 101.6500;

    uber.getProducts(start_latitude, start_longitude, "price");
    uber.getPromotions(start_latitude, start_longitude, end_latitude, end_longitude);

});

app.get('/postmates', function (req, res) {
    var img = fs.readFileSync('./res/Postmates_logo.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');

});

// Uber
app.get('/App/cYW2QLamZ9/:lat/:lon/:id', function (req, res) {

    var id = req.params.id;

    console.log('Request received');
    console.log(id);

    var start_latitude = parseFloat(req.params.lat);
    console.log(start_latitude);

    var start_longitude = parseFloat(req.params.lon);
    var end_latitude = 38.8977;
    var end_longitude = -77.0366;

    //start_latitude = 3.1357;
    //start_longitude = 101.6880;

    if (id == "1")  //nearby uber info
        uber.getProducts(start_latitude, start_longitude, "price", res);
    else if (id == "2") //promotion info
        uber.getPromotions(start_latitude, start_longitude, end_latitude, end_longitude, res);
    else if (id == "3") //time/price to white house info
        uber.getTimePriceEstimate(start_latitude, start_longitude, end_latitude, end_longitude, res);
    else {
        var responseObj = new Object();
        responseObj.message = "That is not a valid message. Please try again.";
        res.json(responseObj);
    }

});

/*
app.get('/App/cYW2QLamZ9/:id', function (req, res) {

    var id = req.params.id;

    console.log('Request received');

    var start_latitude = 3.1357;
    var start_longitude = 101.6880;
    var end_latitude = 3.0833;
    var end_longitude = 101.6500;

    if (id == "1")  //nearby uber info
        uber.getProducts(start_latitude, start_longitude, "price", res);
    else if (id == "2") //promotion info
        uber.getPromotions(start_latitude, start_longitude, end_latitude, end_longitude, res);
    else {
        var responseObj = new Object();
        responseObj.message = "That is not a valid message. Please try again.";
        res.json(responseObj);
    }

});
*/


// Postmates
app.get('/App/3GEwPrgLQr/:lat/:lon/:id', function (req, res) {

    var id = req.params.id;
    var start_latitude = parseFloat(req.params.lat);
    var start_longitude = parseFloat(req.params.lon);

    postmates.parseRequest(start_latitude, start_longitude, id, res);

});

// NY Times
app.get('/App/9XviGieDEL/:id', function (req, res) {
    var category = req.params.id;
    nyTimes.getHeadlines(category, res);
});

// Yo momma joke bot
app.get('/App/kzvm5Pt1JH/:id', function (req, res) {
    yoMomma.sendRandomJoke(res);
});

// Chuck Norris joke bot
app.get('/App/yMUWXNwUja/:id', function (req, res) {
    jokebot.sendRandomJoke(res);
});

// Weather Underground
app.get('/App/tbkbhBPRzB/:id', function (req, res) {
    zipcode = req.params.id;
    wu.getForecast(zipcode, res);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



//var http = require('http');
//
//var bodyString = JSON.stringify({
//    username: 'thefourtheye',
//    password: '********'
//});
//
//var headers = {
//    'Content-Type': 'application/json',
//    'Content-Length': bodyString.length
//};
//
//var options = {
//    host: 'localhost',
//    path: '/users/1',
//    port: 3000,
//    method: 'PUT',
//    headers: headers
//};
//
//// callback is same as in the above seen example.
//...
//...

//http.request(options, callback).write(bodyString);