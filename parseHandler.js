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
			res.send({"title": title.get('name')});
		},
		error: function (e) {
			res.send('Error...');
		}
	});
}

exports.getWelcomeMessage = function (appHandle, res) {
	var appId = idMap[appHandle];
	var app = new Parse.Query('App');
	app.get(appId, {
		success: function (app) {
			res.send({"welcome_message": app.get('welcome_message')});
		},
		error: function (e) {
			res.send('parseHandler l.53: Error...');
		}
	});
}

exports.getUserApps = function (userId, res) {
	var query = new Parse.Query(Parse.User);
	query.equalTo("objectId", userId);  // find all the women
	var names = [];
	query.find({
		success: function(user) {
			console.log('Success!');
			user = user[0];
			var userAppList = user.get('apps');
			var app = new Parse.Query('App');
			var appsJSON = new Object();
			for (var i = 0; i < userAppList.length; i++) {
				appsJSON.write('{ \'app_' + i + '\': ' +
						userAppList[i].get('name') + ' }');
				console.log(('{ \'app_' + i + '\': ' +
				userAppList[i].get('name') + ' }');
			}
			app.get(userAppList[i], {
				success: function (a) {
					res.send(appsJSON);
				},
				error: function (e) {
					console.log('parseHandler l.74: Error...');
				}
			});
		}
	});
	res.send({'apps': names});
}
