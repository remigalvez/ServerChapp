require('fs');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.send({name: 'Remi'});
});

app.get('/uber', function (req, res) {
	var img = fs.readFileSync('./res/UberAppIcon');
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// https://myAppID:javascript-key=myJavaScriptKey@api.parse.com/1/classes/GameScore/Ed1nuqPvcm