var fs = require('fs');
var express = require('express');
var app = express();

//var db = require('./parse.js');

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    res.send('Remi');
});

app.get('/:id/name', function (req, res) {
    var appHandle = req.params.id;
    //var title = db.getTitle(appHandle, res);
    //console.log(title);
    res.send('<html><p style="color: red; font-size: 80pt;">Remi!</p></html>');
});

app.get('/uber', function (req, res) {
	var img = fs.readFileSync('./res/UberAppIcon.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
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