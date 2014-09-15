"use strict";

var should = require("should");
var rocketgate = require("../.");

var GatewayService = rocketgate.GatewayService;
var GatewayRequest = rocketgate.GatewayRequest;
var GatewayResponse = rocketgate.GatewayResponse;

var service = new GatewayService();
var request = new GatewayRequest();
var response = new GatewayResponse();

request.Set(GatewayRequest.MERCHANT_ID, 1);
request.Set(GatewayRequest.MERCHANT_PASSWORD, "testpassword");
request.Set(GatewayRequest.CARDNO, "4111-1111-1111-1111");
request.Set(GatewayRequest.EXPIRE_MONTH, "02");
request.Set(GatewayRequest.EXPIRE_YEAR, "2010");
request.Set(GatewayRequest.AMOUNT, 3.99);
request.Set(GatewayRequest.MERCHANT_CUSTOMER_ID, "RubyTestCust.1");
request.Set(GatewayRequest.MERCHANT_INVOICE_ID, "RubyTestInv-1");
request.Set(GatewayRequest.CUSTOMER_FIRSTNAME, "Firstname");
request.Set(GatewayRequest.CUSTOMER_LASTNAME, "Lastname");
request.Set(GatewayRequest.BILLING_ADDRESS, "1234 Ruby Street");
request.Set(GatewayRequest.BILLING_CITY, "Stephens City");
request.Set(GatewayRequest.BILLING_STATE, "Virginia");
request.Set(GatewayRequest.BILLING_ZIPCODE, "22655");
request.Set(GatewayRequest.BILLING_COUNTRY, "US");
request.Set(GatewayRequest.AVS_CHECK, "IGNORE");
request.Set(GatewayRequest.CVV2, "999");
request.Set(GatewayRequest.CVV2_CHECK, "IGNORE");
request.Set(GatewayRequest.EMAIL, "testruby@bogusdomain.com");
request.Set(GatewayRequest.IPADDRESS, "68.224.133.117");
request.Set(GatewayRequest.SCRUB, "IGNORE");
//request.Set(GatewayRequest.SCRUB, "YES");
//request.Set(GatewayRequest.REBILL_START, 3);
//request.Set(GatewayRequest.REBILL_FREQUENCY, "MONTHLY");
//request.Set(GatewayRequest.REBILL_AMOUNT, 39.99);

describe("purchase", function() {
  this.timeout(0);
  it("should perform purchase", function(done) {
    service.SetTestMode(true);
    service.PerformPurchase(request, response, function(status) {
      status.should.not.equal(null);
      response.Get(GatewayResponse.RESPONSE_CODE).should.equal(0);
      done();
    });
  });
});
