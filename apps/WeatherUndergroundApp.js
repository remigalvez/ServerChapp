var request = require('request');

const API_KEY = "api/4ef9ee9668d8686f" + "/";
const WU_SEARCH_URL = "http://api.wunderground.com/";
const API_FEATURES = "forecast10day" + "/";
const API_SETTINGS = "";
const API_CONDITIONS = "conditions" + "/";
const API_QUERY = "q" + "/";
const API_OUTPUT_FORMAT = ".json";

exports.getForecast = function (zipcode, res) {

    url = constructUrl(zipcode);
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            var forecastArr = data.forecast.simpleforecast.forecastday;
            var days = [];
            for (var i = 0; i < forecastArr.length; i++) {
                console.log(forecastArr[i].high.fahrenheit);
                var day = createDayObject(forecastArr[i]);
                days.push(day);
            }
            msg = constructMessage(days);
            res.json(msg);
        }
    });
};

constructUrl = function (zipcode) {
    return WU_SEARCH_URL + API_KEY + API_FEATURES + API_SETTINGS + API_CONDITIONS + API_QUERY + zipcode + "/data" + API_OUTPUT_FORMAT;
};

constructMessage = function ( days ) {
    var msg = '';
    days.forEach(function (d) {;
        msg += d.dayOfWeek + ' - ' + d.lowF + '°F / ' + d.highC + '°C \n';
    });
    return msg;
};

createDayObject = function ( data ) {
    var day = new Object();
    day.dayOfWeek = data.date.weekday;
    day.highC = data.high.celsius;
    day.lowC = data.low.celsius;
    data.highF = data.high.fahrenheit;
    data.lowF = data.low.fahrenheit;
    return day;
};

parseJSON = function () {

}


