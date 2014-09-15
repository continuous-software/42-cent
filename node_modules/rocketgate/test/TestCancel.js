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
request.Set(GatewayRequest.MERCHANT_CUSTOMER_ID, "Customer-1");
request.Set(GatewayRequest.MERCHANT_INVOICE_ID, "Invoice-1");

describe("cancel", function() {
  this.timeout(0);
  it("should perform rebill cancel", function(done) {
    service.SetTestMode(true);
    service.PerformRebillCancel(request, response, function(status) {
      status.should.not.equal(null);
      response.Get(GatewayResponse.RESPONSE_CODE).should.equal(0);
      done();
    });
  });
});
