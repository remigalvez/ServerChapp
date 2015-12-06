
var Uber = require('node-uber');

var uber = new Uber({
    client_id: 'J6X1jebCmfOxT4kWHMgg6E9Y3ma3K8fy',
    client_secret: 'AG7ZXJxUVh9FkbCUuLrG86X41SZ1dA8FlgSMeqSf',
    server_token: 'Kgm5AL3WnOVvfB4sO0HkSAxgNw_DnxrzuTeE5JPr',
    //redirect_uri: 'localhost',
    name: 'Chapp Stick'
});

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

var priceDetailsArray;
var costPerMinute;
var distanceUnit;
var costPerDistance;
var baseFee;
var cancellationFee;
var currencyCode;
var capacity;
var image;
var displayName;
var description;
var promoDisplayText;

exports.getProducts = function (lat, lon, requestType, response) {

    uber.products.list({ latitude: lat, longitude: lon }, function (err, res) {
        if (err) {
            console.error(err);
        } else {
            //console.log("Products: %j", res);

            var products = res['products'];

            for (var i=0; i<products.length; i++) {

                var product = products[i];
                //console.log(JSON.stringify(product));

                // price
                priceDetailsArray = product["price_details"];
                costPerMinute = priceDetailsArray["cost_per_minute"];
                distanceUnit = priceDetailsArray["distance_unit"];
                costPerDistance = priceDetailsArray["cost_per_distance"];
                baseFee = priceDetailsArray["base"];
                cancellationFee = priceDetailsArray["cancellation_fee"];
                currencyCode = priceDetailsArray["currency_code"];

                capacity = product["capacity"];
                image = product["image"];
                displayName = product["display_name"];
                description = product["description"];

                console.log("cost per minute: %s | distance unit: %s | cost per distance: %s | base fee: %s | cancellation fee: %s | currency code: %s", costPerMinute, distanceUnit, costPerDistance, baseFee, cancellationFee, currencyCode)
                console.log("capacity: %s", capacity);
                console.log("image: %s", image);
                console.log("display name: %s", displayName);
                console.log("description: %s", description);

                console.log();
                console.log();

            }

            var msg = "TESTING UBER";
            var responseObj = new Object();
            responseObj.message = msg;
            response.json(responseObj);

            sendMessage(response);
        }
    });

}

function sendMessage(res) {

    var msg = "TESTING UBER";
    var responseObj = new Object();
    responseObj.message = msg;
    res.json(responseObj);
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

exports.getPromotions = function (startLat, startLon, endLat, endLon) {

    uber.promotions.list({
        start_latitude: startLat, start_longitude: startLon,
        end_latitude: endLat, end_longitude: endLon
    }, function (err, res) {
        if (err) console.error(err);
        else {

            console.log("Promotions: %j", res);

            var promotions = res;
            promoDisplayText = promotions["display_text"]

            console.log("Promotion display text: %s", promoDisplayText);

            console.log();
            console.log();
        }
    });

}

exports.getPricesEstimate = function (startLat, startLon, endLat, endLon) {

    uber.estimates.price({
        start_latitude: startLat, start_longitude: startLon,
        end_latitude: endLat, end_longitude: endLon
    }, function (err, res) {
        if (err) console.error(err);
        else {
            console.log("Price Estimate: %j", res);


            console.log();
            console.log();
        }
    });

}

exports.getTimesEstimate = function (startLat, startLon, endLat, endLon) {

    uber.estimates.time({
        start_latitude: startLat, start_longitude: startLon,
        end_latitude: endLat, end_longitude: endLon
    }, function (err, res) {
        if (err) console.error(err);
        else {
            console.log("Time Estimate: %j", res);

            var timeEstimatesArray = res['products'];
            //var timeEstimate = timeEstimatesArray[0];



            console.log();
            console.log();
        }
    });

}






