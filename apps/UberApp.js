
var Uber = require('node-uber');

var uber = new Uber({
    client_id: 'J6X1jebCmfOxT4kWHMgg6E9Y3ma3K8fy',
    client_secret: 'AG7ZXJxUVh9FkbCUuLrG86X41SZ1dA8FlgSMeqSf',
    server_token: 'Kgm5AL3WnOVvfB4sO0HkSAxgNw_DnxrzuTeE5JPr',
    //redirect_uri: 'localhost',
    name: 'Chapp Stick'
});

exports.getProducts = function () {

    uber.products.list({ latitude: 3.1357, longitude: 101.6880 }, function (err, res) {
        if (err) console.error(err);
        else console.log("Products: %j", res);
    });

}

exports.getPromotions = function () {

    uber.promotions.list({
        start_latitude: 3.1357, start_longitude: 101.6880,
        end_latitude: 3.0833, end_longitude: 101.6500
    }, function (err, res) {
        if (err) console.error(err);
        else console.log("Promotions: %j", res);
    });

}

exports.getPrices = function () {

    uber.estimates.price({
        start_latitude: 3.1357, start_longitude: 101.6880,
        end_latitude: 3.0833, end_longitude: 101.6500
    }, function (err, res) {
        if (err) console.error(err);
        else console.log("Prices: %j", res);
    });

}

exports.getTimes = function () {

    uber.estimates.time({
        start_latitude: 3.1357, start_longitude: 101.6880
    }, function (err, res) {
        if (err) console.error(err);
        else console.log("Times: %j", res);
    });

}

