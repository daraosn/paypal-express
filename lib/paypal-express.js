var NVPRequest = require('./nvprequest');
var url = require('url');
var qs = require('querystring');

var SANDBOX_URL = 'www.sandbox.paypal.com';
var REGULAR_URL = 'www.paypal.com';


var PaypalExpress = function(user, pass, sig) {
  this.nvpreq = new NVPRequest(user, pass, sig);
  this.sandbox = false;
};


//Use paypal sandbox
PaypalExpress.prototype.useSandbox = function(bool) {
  this.nvpreq.useSandbox(bool);
  this.sandbox = (bool == true);
};


//Begin the paypal express checkout process for instant payments
//Returns the timestamp, token, and payment url
PaypalExpress.prototype.beginInstantPayment = function(options, callback) {
  //Set required request parameters
  options['METHOD'] = 'SetExpressCheckout';
  options['PAYMENTREQUEST_0_ALLOWEDPAYMENTMETHOD'] = 'InstantPaymentOnly';

  var self = this;

  this.nvpreq.makeRequest(options, function(err, data) {
    if (err) {
      //Request failed
      callback(err);
    }

    var response = qs.parse(data.toString());

    if (response.ACK == 'Success') {
      //Build the checkout URL
      var url_object = {
        protocol: 'https:',
        host: (self.sandbox) ? SANDBOX_URL : REGULAR_URL,
        pathname: '/cgi-bin/webscr',
        query: {
          cmd: '_express-checkout',
          token: response.TOKEN
        }
      }

      //Return the time, token, and payment url
      callback(null, {
        time: response.TIMESTAMP,
        token: response.TOKEN,
        payment_url: url.format(url_object)
      });
    } else if (response.ACK == 'Failure') {
      //Request failed on Paypal end, return the error message given
      callback(response.L_LONGMESSAGE0);
    }
  });
};


module.exports = PaypalExpress;
