
var Uber = require('node-uber');

var uber = new Uber({
    client_id: 'J6X1jebCmfOxT4kWHMgg6E9Y3ma3K8fy',
    client_secret: 'AG7ZXJxUVh9FkbCUuLrG86X41SZ1dA8FlgSMeqSf',
    server_token: 'Kgm5AL3WnOVvfB4sO0HkSAxgNw_DnxrzuTeE5JPr',
    //redirect_uri: 'localhost',
    name: 'Chapp Stick'
});

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  1  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

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
            console.log("Products: %j", res);

            var products = res['products'];

            //for (var i=0; i<products.length; i++) {

                var product = products[0];
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

            //}

            var msg = ("Here are the details for the nearest Uber: Type: " + displayName + " - " + description + " | Cost per minute: " + costPerMinute + currencyCode + " | cost per distance: " + costPerDistance + " per " + distanceUnit + " | base fee: " + baseFee + currencyCode + " | cancellation fee: " + cancellationFee + currencyCode);
            sendMessage(response, msg);

        }
    });

}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  2  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

exports.getPromotions = function (startLat, startLon, endLat, endLon, response) {

    uber.promotions.list({
        start_latitude: startLat, start_longitude: startLon,
        end_latitude: endLat, end_longitude: endLon
    }, function (err, res) {
        if (err) console.error(err);
        else {

            console.log("Promotions: %j", res);
            var promotions = res;
            promoDisplayText = promotions["display_text"];
            console.log("Promotion display text: %s", promoDisplayText);

            sendMessage(response, "There is a promotion available! Check it out: " + promoDisplayText);

            console.log();
        }
    });

}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  3  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

exports.getTimePriceEstimate = function (startLat, startLon, endLat, endLon, response) {

    uber.estimates.price({
        start_latitude: startLat, start_longitude: startLon,
        end_latitude: endLat, end_longitude: endLon
    }, function (err, priceRes) {
        if (err) console.error(err);
        else {
            console.log("Price Estimate: " + JSON.stringify(priceRes));
        }

        uber.estimates.time({
            start_latitude: startLat, start_longitude: startLon,
            end_latitude: endLat, end_longitude: endLon
        }, function (err, timeRes) {
            if (err) console.error(err);
            else {

                var uberX = priceRes["prices"][0];
                var priceEstimate =  uberX["estimate"];
                var duration =  uberX["duration"];

                var time = JSON.stringify(timeRes);

                console.log("Time Estimate: ", time);

                var timeEstimatesArray = timeRes['products'];
                //var timeEstimate = timeEstimatesArray[0];

                console.log();

                sendMessage(response, "An UberX to the White House will cost approximately " + priceEstimate + " and will take about " + (duration / 60).toFixed(2) + " minutes.");
                //sendMessage(response, "We're sending one to you now, courtesy of President Obama. God Bless 'Merica.");

            }
        });
    });

}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function sendMessage(res, msg) {

    var responseObj = new Object();
    responseObj.message = msg;
    res.json(responseObj);
}

