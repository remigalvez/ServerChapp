var fs = require('fs');
var Parse = require('parse/node').Parse;
var AppID = require('./res/AppIDs');

var idMap = AppID.map;

const APP_ID = '1A5G2YPnZmvYoDII7wkZYoMPk0NKm3JKUAiXPsD2';
const JS_KEY = 'h7qocgTb5imqYv5Cle9nMOEzEGp2XICd70o78zxY';
const MASTER_KEY = 'FzPvwcAIoF8ZaSn5k36vc44C5Erk1kLNPOvhbW5G';

Parse.initialize(APP_ID, JS_KEY, MASTER_KEY);

//var getUser = new Parse.Query(Parse.User);
//getUser.get('yMqqXTXKsS', {
//	success: function (user) {
//		console.log(user.get('apps'));
//	},
//	error: function (e) {
//		console.log(e);
//	}
//});

//var getApps = new Parse.Query('App');
//getApps.find({
//	success: function (apps) {
//		for (var i = 0; i < apps.length; i++) {
//			console.log(apps[i].get('name'));
//		}
//	}
//});

exports.getTitle = function (appHandle, res) {
	var appId = idMap[appHandle];
	var app = new Parse.Query('App');
	app.get(appId, {
		success: function (title) {
			res.send(title.get('name'));
		},
		error: function (e) {
			res.send('Error...');
		}
	});
}
