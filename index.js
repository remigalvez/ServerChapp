var fs = require('fs');
var express = require('express');
var app = express();

var uber = require(__dirname + '/apps/UberApp.js');
var wu = require(__dirname + '/apps/WeatherUndergroundApp.js');
var db = require(__dirname + '/parseHandler.js');

app.set('port', (process.env.PORT || 5000));

console.log(__dirname + '/parseHandle.js');

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

    uber.getProducts();

    console.log('\n\n');
    uber.getPromotions();

    console.log('\n\n');
    uber.getPrices();

    console.log('\n\n');
    uber.getTimes();

});

app.get('/App/tbkbhBPRzB/:id', function (req, res) {
    zipcode = req.params.id;
    wu.getForecast(20037, res);
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