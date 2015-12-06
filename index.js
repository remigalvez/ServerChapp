var fs = require('fs');
var express = require('express');
var app = express();

var uber = require(__dirname + '/apps/UberApp.js');
var wu = require(__dirname + '/apps/WeatherUndergroundApp.js');
var postmates = require(__dirname + '/apps/PostmatesApp.js');
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

app.get('/App/:id/name', function (req, res) {
    var appHandle = req.params.id;
    db.getTitle(appHandle, res);
});

app.get('/App/:id/welcome_message', function (req, res) {
    var appHandle = req.params.id;
    var title = db.getWelcomeMessage(appHandle, res);
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

    uber.getPricesEstimate(start_latitude, start_longitude, end_latitude, end_longitude);

    uber.getTimesEstimate(start_latitude, start_longitude, end_latitude, end_longitude);

});

app.get('/postmates', function (req, res) {
    var img = fs.readFileSync('./res/Postmates_logo.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');


});

//Uber
app.get('/App/cYW2QLamZ9/:id'), function (req, res) {

    var start_latitude = 3.1357;
    var start_longitude = 101.6880;
    var end_latitude = 3.0833;
    var end_longitude = 101.6500;

    uber.getProducts(start_latitude, start_longitude, "price", res);
}

//PMx
app.get('/App/3GEwPrgLQr/:id'), function (req, res) {


}

//Weather Underground
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