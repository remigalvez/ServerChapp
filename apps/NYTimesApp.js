var request = require('request');
var htmlToText = require('html-to-text');

const BASE_URL = 'http://api.nytimes.com/svc/topstories/v1/';
const API_KEY = '7647e139616252f89a17532b1b60269e:5:73686841';
const RESPONSE_FORMAT = 'json';

exports.getHeadlines = function (category, res) {

    var responseObj = new Object();

    var queryUrl = parseQueryToUrl(category);

    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            var headlines = data.results;
            responseObj.message = headlines[0].title;
            for (var i = 1; i < headlines.length; i++) {
                responseObj.message += '\n\n' + htmlToText.fromString(headlines[i].title);
            }
            res.json(responseObj);
        } else {
            responseObj.message = 'Looks like I don\'t have much to report to you right now... ' +
                'Try again in a little while!';
            res.json(responseObj);
        }
    });
};

parseQueryToUrl = function (category) {
    return BASE_URL + category + '.' + RESPONSE_FORMAT + '?api-key=' + API_KEY;
};