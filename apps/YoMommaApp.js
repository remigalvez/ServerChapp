var request = require('request');
var htmlToText = require('html-to-text');

const QUERY_URL = "http://api.yomomma.info/";

exports.sendRandomJoke = function (res) {

    var responseObj = new Object();

    request(QUERY_URL, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            responseObj.message = htmlToText.fromString(data.joke);
            res.json(responseObj);
        } else {
            responseObj.message = "Looks like I'm all out of jokes right now!";
            res.json(responseObj);
        }
    });
};