var Postmates = require('postmates');
var postmates = new Postmates('cus_K-BolFdQzGfG3-', '08cebf02-aa92-4fa8-8b2c-97060a4ccac1');

var delivery = {
    pickup_address: "20 McAllister St, San Francisco, CA",
    dropoff_address: "101 Market St, San Francisco, CA"
};

var msg = constructMessage(days);
responseObj = new Object();
responseObj.message = msg;
res.json(responseObj);

postmates.quote(delivery, function(err, res) {
    console.log(JSON.stringify(res.body.fee)); // 799
    console.log("------");
    console.log(JSON.stringify(res.body));
    console.log("------");
    console.log(JSON.stringify(res));
    console.log("------");
    console.log(JSON.stringify(res.body.status));
    console.log("------");


    var feeFULL = JSON.stringify(res.body.fee);
    feeFULL = feeFULL.toString();
    var length = feeFULL.length;
    var fee = feeFULL.substring(feeFULL.length - 2, feeFULL.length);
    var feeFULL2 = JSON.stringify(res.body.fee);
    feeFULL2 = feeFULL.toString();
    var fee = ("-%s- %s-", feeFULL.substring(0, length - 2), feeFULL2.substring(length - 2, length));

    console.log("Quote: The delivery will cost $%s", feeFULL);
    console.log("Quote: The delivery will arrive in approximately %s minutes", res.body.duration);


});

constructUrl = function (zipcode) {
    return WU_SEARCH_URL + API_KEY + API_FEATURES + API_SETTINGS + API_CONDITIONS + API_QUERY + zipcode + "/data" + API_OUTPUT_FORMAT;
};

constructMessage = function ( days ) {
    var d = days[0];
    var msg = 'Today - ' + d.lowF + '°F / ' + d.highC + '°C';

    for (var i = 1; i < days.length; i++) {
        d = days[i];
        msg += '\n' + d.dayOfWeek + ' - ' + d.lowF + '°F / ' + d.highC + '°C';
    }

    days.forEach(function (d) {
        msg += d.dayOfWeek + ' - ' + d.lowF + '°F / ' + d.highC + '°C \n';
    });
    return msg;
};

var delivery = {
    manifest: "a box of kittens",
    pickup_name: "The Warehouse",
    pickup_address: "20 McAllister St, San Francisco, CA",
    pickup_phone_number: "555-555-5555",
    pickup_business_name: "Optional Pickup Business Name, Inc.",
    pickup_notes: "Optional note that this is Invoice #123",
    dropoff_name: "Alice",
    dropoff_address: "101 Market St, San Francisco, CA",
    dropoff_phone_number: "415-555-1234",
    dropoff_business_name: "Optional Dropoff Business Name, Inc.",
    dropoff_notes: "Optional note to ring the bell",
    quote_id: "qUdje83jhdk"
};

postmates.new(delivery, function(err, res) {
    // `res.body`
});