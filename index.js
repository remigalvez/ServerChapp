var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
	console.log("Request received");
	var user = {
		name:"Remi Galvez",
		gender:"Male"
	}
  response.send(user);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


