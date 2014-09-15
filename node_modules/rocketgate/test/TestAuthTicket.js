"use strict";

var rocketgate = require("../.");

var GatewayService = rocketgate.GatewayService;
var GatewayRequest = rocketgate.GatewayRequest;
var GatewayResponse = rocketgate.GatewayResponse;

var service = new GatewayService();
var request = new GatewayRequest();
var response = new GatewayResponse();

var time = Math.round(+new Date() / 1000);

request.Set(GatewayRequest.MERCHANT_ID, 1);
request.Set(GatewayRequest.MERCHANT_PASSWORD, "testpassword");
request.Set(GatewayRequest.MERCHANT_CUSTOMER_ID, time + ".RubyTest");
request.Set(GatewayRequest.MERCHANT_INVOICE_ID, time + ".AuthTicketTest");
request.Set(GatewayRequest.CURRENCY, "USD");
request.Set(GatewayRequest.AMOUNT, 9.99);
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

service.SetTestMode(true);
service.PerformAuthOnly(request, response, function(status) {
  status.should.not.equal(null);
  response.Get(GatewayResponse.RESPONSE_CODE).should.equal(0);
  request = new GatewayRequest();
  request.Set(GatewayRequest.MERCHANT_ID, 1);
  request.Set(GatewayRequest.MERCHANT_PASSWORD, "testpassword");
  request.Set(GatewayRequest.TRANSACT_ID,
              response.Get(GatewayResponse.TRANSACT_ID));
  service.PerformTicket(request, response, function(status) {
    status.should.not.equal(null);
    response.Get(GatewayResponse.RESPONSE_CODE).should.equal(0);
  });
});
