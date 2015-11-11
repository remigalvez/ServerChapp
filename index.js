var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(request, response) {
	var user = {
		name:"Remi Galvez",
		gender:"Male"
	}
  response.send(user);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


