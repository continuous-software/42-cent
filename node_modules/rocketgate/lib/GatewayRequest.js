"use strict";

var json2xml = require("json2xml");

module.exports = GatewayRequest;

GatewayRequest.VERSION_INDICATOR = "version";
GatewayRequest.VERSION_NUMBER = "R1.2";
GatewayRequest.AFFILIATE = "affiliate";
GatewayRequest.AMOUNT = "amount";
GatewayRequest.AVS_CHECK = "avsCheck";
GatewayRequest.BILLING_ADDRESS = "billingAddress";
GatewayRequest.BILLING_CITY = "billingCity";
GatewayRequest.BILLING_COUNTRY = "billingCountry";
GatewayRequest.BILLING_STATE = "billingState";
GatewayRequest.BILLING_TYPE = "billingType";
GatewayRequest.BILLING_ZIPCODE = "billingZipCode";
GatewayRequest.CARDNO = "cardNo";
GatewayRequest.CARD_HASH = "cardHash";
GatewayRequest.CURRENCY = "currency";
GatewayRequest.CUSTOMER_FIRSTNAME = "customerFirstName";
GatewayRequest.CUSTOMER_LASTNAME = "customerLastName";
GatewayRequest.CVV2 = "cvv2";
GatewayRequest.CVV2_CHECK = "cvv2Check";
GatewayRequest.EMAIL = "email";
GatewayRequest.EXPIRE_MONTH = "expireMonth";
GatewayRequest.EXPIRE_YEAR = "expireYear";
GatewayRequest.IPADDRESS = "ipAddress";
GatewayRequest.MERCHANT_ACCOUNT = "merchantAccount";
GatewayRequest.MERCHANT_CUSTOMER_ID = "merchantCustomerID";
GatewayRequest.MERCHANT_DESCRIPTOR = "merchantDescriptor";
GatewayRequest.MERCHANT_INVOICE_ID = "merchantInvoiceID";
GatewayRequest.MERCHANT_ID = "merchantID";
GatewayRequest.MERCHANT_PASSWORD = "merchantPassword";
GatewayRequest.MERCHANT_SITE_ID = "merchantSiteID";
GatewayRequest.PARTIAL_AUTH_FLAG = "partialAuthFlag";
GatewayRequest.PAY_HASH = "cardHash";
GatewayRequest.REBILL_FREQUENCY = "rebillFrequency";
GatewayRequest.REBILL_AMOUNT = "rebillAmount";
GatewayRequest.REBILL_START = "rebillStart";
GatewayRequest.REBILL_END_DATE = "rebillEndDate";
GatewayRequest.REFERENCE_GUID = "referenceGUID";
GatewayRequest.REFERRING_MERCHANT_ID = "referringMerchantID";
GatewayRequest.REFERRED_CUSTOMER_ID = "referredCustomerID";
GatewayRequest.SCRUB = "scrub";
GatewayRequest.TRANSACT_ID = "referenceGUID";
GatewayRequest.TRANSACTION_TYPE = "transactionType";
GatewayRequest.UDF01 = "udf01";
GatewayRequest.UDF02 = "udf02";
GatewayRequest.USERNAME = "username";
GatewayRequest.FAILED_SERVER = "failedServer";
GatewayRequest.FAILED_GUID = "failedGUID";
GatewayRequest.FAILED_RESPONSE_CODE = "failedResponseCode";
GatewayRequest.FAILED_REASON_CODE = "failedReasonCode";
GatewayRequest.GATEWAY_CONNECT_TIMEOUT = "gatewayConnectTimeout";
GatewayRequest.GATEWAY_READ_TIMEOUT = "gatewayReadTimeout";

function GatewayRequest() {
  this.parameterList = {};
  this.Set(GatewayRequest.VERSION_INDICATOR, GatewayRequest.VERSION_NUMBER);
}

GatewayRequest.prototype.Set = function(key, value) {
  delete this.parameterList[key];
  if (value)
    this.parameterList[key] = value;
};

GatewayRequest.prototype.Clear = function(key) {
  delete this.parameterList[key];
};

GatewayRequest.prototype.Get = function(key) {
  return this.parameterList[key];
};

GatewayRequest.prototype.ToXML = function() {
  return json2xml({ gatewayRequest: this.parameterList }, { header: true });
};
