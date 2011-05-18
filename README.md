Paypal Express Checkout
=======================
This NodeJS module is a library for working with the Paypal Express Checkout API.

The library consists of two classes:

### NVPRequest
A low-level class for dealing with NVP requests to the Paypal API. Can be used for [any API request](https://cms.paypal.com/uk/cgi-bin/?cmd=_render-content&content_ID=developer/howto_api_reference).

### PaypalExpress
A higher-level class for common payment operations. Performs all the response parsing and request formatting needed for each operation.

## How to install
Run this npm command to install (not working yet):

    npm install paypal-express

## Using PaypalExpress

### Initialization

    var PaypalExpress = require('./paypal-express').PaypalExpress;

    var paypal = new PaypalExpress(<API username>, <API password>, <API signature>);

### Switch to sandbox

    paypal.useSandbox(true);

### Instant payment

    paypal.beginInstantPayment({
      'RETURNURL': '',
      'CANCELURL': '',
      'PAYMENTREQUEST_0_AMT': 1, //Payment amount
      //More request parameters
    }, function(err, data) {
      if (err) {
        console.error(err);
      }

      if (data) {
        var token = data.token;
        var payment_url = data.payment_url;

        //Redirect to payment_url
      }
    });

[List of allowed parameters for SetExpressCheckout](https://cms.paypal.com/uk/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_nvp_r_SetExpressCheckout)

## Using NVPRequest

### Initialization

    var NVPRequest = require('./paypal-express').NVPRequest;

    var request = new NVPRequest(<API username>, <API password>, <API signature>);

### Switch to sandbox API

    request.useSandbox(true);

### Make a request

    request.makeRequest({
      'METHOD': '<API method>',
      //Any API method, and any parameter (see Paypal documentation)
    }, function(err, data) {
      if (err) {
        console.error(err);
      }

      var qs = require('querystring');
      var response = qs.parse(data.toString());

      if (response.ACK == 'Success') {
        console.log('Success!');
      }
    });

[List of all API methods](https://cms.paypal.com/uk/cgi-bin/?cmd=_render-content&content_ID=developer/howto_api_reference).

