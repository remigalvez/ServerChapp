var Postmates = require('postmates');
var postmates = new Postmates('cus_K-BolFdQzGfG3-', '08cebf02-aa92-4fa8-8b2c-97060a4ccac1');

var delivery = {
    pickup_address: "20 McAllister St, San Francisco, CA",
    dropoff_address: "101 Market St, San Francisco, CA"
};

postmates.quote(delivery, function(err, res) {
    console.log(res.body.fee); // 799
    console.log(res.body);
    console.log(res);

});