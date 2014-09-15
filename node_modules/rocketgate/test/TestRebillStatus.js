"use strict";

var should = require("should");
var rocketgate = require("../.");

var GatewayService = rocketgate.GatewayService;
var GatewayRequest = rocketgate.GatewayRequest;
var GatewayResponse = rocketgate.GatewayResponse;

var service = new GatewayService();
var request = new GatewayRequest();
var response = new GatewayResponse();

var time = Math.round(+new Date() / 1000);
var cust_id = time + '.RubyTest';
var inv_id = time +'.RebillStatusTest';
var merchant_id = "1";
var merchant_password = "testpassword";

request.Set(GatewayRequest.MERCHANT_ID, merchant_id);
request.Set(GatewayRequest.MERCHANT_PASSWORD, merchant_password);
request.Set(GatewayRequest.MERCHANT_CUSTOMER_ID, cust_id);
request.Set(GatewayRequest.MERCHANT_INVOICE_ID, inv_id);
request.Set(GatewayRequest.CURRENCY, "USD");
request.Set(GatewayRequest.AMOUNT, 9.99);
request.Set(GatewayRequest.REBILL_FREQUENCY, "MONTHLY");
request.Set(GatewayRequest.CARDNO, "4111-1111-1111-1111");
request.Set(GatewayRequest.EXPIRE_MONTH, "02");
request.Set(GatewayRequest.EXPIRE_YEAR, "2010");
request.Set(GatewayRequest.CVV2, "999");
request.Set(GatewayRequest.CUSTOMER_FIRSTNAME, "Joe");
request.Set(GatewayRequest.CUSTOMER_LASTNAME, "RubyTester");
request.Set(GatewayRequest.EMAIL, "rubytest@fakedomain.com");
request.Set(GatewayRequest.IPADDRESS, "68.224.133.117");
request.Set(GatewayRequest.BILLING_ADDRESS, "123 Main St.");
request.Set(GatewayRequest.BILLING_CITY, "Las Vegas");
request.Set(GatewayRequest.BILLING_STATE, "NV");
request.Set(GatewayRequest.BILLING_ZIPCODE, "89141");
request.Set(GatewayRequest.BILLING_COUNTRY, "US");
request.Set(GatewayRequest.AVS_CHECK, "IGNORE");
request.Set(GatewayRequest.CVV2_CHECK, "IGNORE");
request.Set(GatewayRequest.SCRUB, "IGNORE");

describe("rebill status", function() {
  this.timeout(0);
  it("should perform rebill status", function(done) {
    service.SetTestMode(true);
    service.PerformPurchase(request, response, function(status) {
      status.should.not.equal(null);
      response.Get(GatewayResponse.RESPONSE_CODE).should.equal(0);
      request = new GatewayRequest();
      request.Set(GatewayRequest.MERCHANT_ID, merchant_id);
      request.Set(GatewayRequest.MERCHANT_PASSWORD, merchant_password);
      request.Set(GatewayRequest.MERCHANT_CUSTOMER_ID, cust_id);
      request.Set(GatewayRequest.MERCHANT_INVOICE_ID, inv_id);
      service.PerformRebillUpdate(request, response, function(status) {
        status.should.not.equal(null);
        response.Get(GatewayResponse.RESPONSE_CODE).should.equal(0);
        done();
      });
    });
  });
});
