var http = require('http');

const API_KEY = "/api/4ef9ee9668d8686f" + "/";
const WU_SEARCH_URL = "api.wunderground.com";
const API_FEATURES = "forecast10day" + "/";
const API_SETTINGS = "";
const API_CONDITIONS = "conditions" + "/";
const API_QUERY = "q" + "/";
const API_OUTPUT_FORMAT = ".json";

exports.getForecast = function (zipcode, res) {
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
        host: WU_SEARCH_URL,
        path: computeUrl(zipcode)
    };

    callback = function(response) {
        var str = '';

        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            res.json(JSON.parse(str));




        });
    }

    var data = http.request(options, callback).end();
}

computeUrl = function (zipcode) {
    return API_KEY + API_FEATURES + API_SETTINGS + API_CONDITIONS + API_QUERY + zipcode + "/data" + API_OUTPUT_FORMAT;
}

parseJSON = function () {
    
}


