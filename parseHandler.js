var fs = require('fs');
var Parse = require('parse/node').Parse;
var AppID = require('./res/AppIDs');

var idMap = AppID.map;

const APP_ID = '1A5G2YPnZmvYoDII7wkZYoMPk0NKm3JKUAiXPsD2';
const JS_KEY = 'h7qocgTb5imqYv5Cle9nMOEzEGp2XICd70o78zxY';
const MASTER_KEY = 'FzPvwcAIoF8ZaSn5k36vc44C5Erk1kLNPOvhbW5G';

Parse.initialize(APP_ID, JS_KEY, MASTER_KEY);

exports.getApp = function (appId, res) {
	var app = new Parse.Query('App');
	app.get(appId, {
		success: function (app) {
			JSON.stringify(app);
			res.json(app);
		},
		error: function (e) {
			res.send('Error getting app (getApp)...')
		}
	})
};

exports.getUserApps = function (userId, res) {
	var query = new Parse.Query(Parse.User);
	query.equalTo("objectId", userId);
	var names = [];
	query.find({
		success: function(user) {
			user = user[0];
			var userAppList = user.get('apps');
			res.json({apps: userAppList});
		},
		error: function (e) {
			res.send('Error get list of user apps (getUserApps)...');
		}
	});
};
