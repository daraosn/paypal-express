var NVPRequest = require('../lib/nvprequest');
var qs = require('querystring');

var USERNAME = 'sdk-three_api1.sdk.com';
var PASSWORD = 'QFZCWN5HZM8VBG7Q';
var SIGNATURE = 'A-IzJhZZjhg29XQ2qnhapuwxIDzyAZQ92FRP5dqBzVesOkzbdUONzmOU';

module.exports['Basic NVP Request'] = function(test) {
    var request = new NVPRequest(USERNAME, PASSWORD, SIGNATURE);
    request.useSandbox(true);

    request.makeRequest({
      'METHOD': 'SetExpressCheckout',
      'RETURNURL': 'http://www.google.com/',
      'CANCELURL': 'http://www.google.com/',
      'PAYMENTREQUEST_0_AMT': 1
    }, function(err, data) {
      if (err) {
        test.ok(false, err);
        test.done();
      }

      var response = qs.parse(data.toString());
      test.equal(response.ACK, 'Success', 'Successful ACK not received.');

      test.done();
    });
};
