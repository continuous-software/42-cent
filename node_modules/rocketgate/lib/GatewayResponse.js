"use strict";

var xml2json = require('xml2json');

module.exports = GatewayResponse;

GatewayResponse.VERSION_INDICATOR = "version";
GatewayResponse.AUTH_NO = "authNo";
GatewayResponse.AVS_RESPONSE = "avsResponse";
GatewayResponse.BALANCE_AMOUNT = "balanceAmount";
GatewayResponse.BALANCE_CURRENCY = "balanceCurrency";
GatewayResponse.CARD_TYPE = "cardType";
GatewayResponse.CARD_HASH = "cardHash";
GatewayResponse.CARD_LAST_FOUR = "cardLastFour";
GatewayResponse.CARD_EXPIRATION = "cardExpiration";
GatewayResponse.CARD_COUNTRY = "cardCountry";
GatewayResponse.CARD_REGION = "cardRegion";
GatewayResponse.CARD_DEBIT_CREDIT = "cardDebitCredit";
GatewayResponse.CARD_DESCRIPTION = "cardDescription";
GatewayResponse.CARD_ISSUER_NAME = "cardIssuerName";
GatewayResponse.CARD_ISSUER_PHONE = "cardIssuerPhone";
GatewayResponse.CARD_ISSUER_URL = "cardIssuerURL";
GatewayResponse.CAVV_RESPONSE = "cavvResponse";
GatewayResponse.CVV2_CODE = "cvv2Code";
GatewayResponse.EXCEPTION = "exception";
GatewayResponse.MERCHANT_ACCOUNT = "merchantAccount";
GatewayResponse.PAY_TYPE = "payType";
GatewayResponse.PAY_HASH = "cardHash";
GatewayResponse.PAY_LAST_FOUR = "cardLastFour";
GatewayResponse.REASON_CODE = "reasonCode";
GatewayResponse.REBILL_AMOUNT = "rebillAmount";
GatewayResponse.REBILL_DATE = "rebillDate";
GatewayResponse.REBILL_END_DATE = "rebillEndDate";
GatewayResponse.RESPONSE_CODE = "responseCode";
GatewayResponse.TRANSACT_ID = "guidNo";
GatewayResponse.SCRUB_RESULTS = "scrubResults";
GatewayResponse.SETTLED_AMOUNT = "approvedAmount";
GatewayResponse.SETTLED_CURRENCY = "approvedCurrency";

function GatewayResponse() {
  this.parameterList = {};
}

GatewayResponse.prototype.Set = function(key, value) {
  delete this.parameterList[key];
  if (value)
    this.parameterList[key] = value;
};

GatewayResponse.prototype.Reset = function() {
  this.parameterList = {};
};

GatewayResponse.prototype.Get = function(key) {
  return this.parameterList[key];
};

GatewayResponse.prototype.SetFromXML = function(xmlDocument, callback) {
  this.parameterList = JSON.parse(xml2json.toJson(xmlDocument)).gatewayResponse;
  // TODO: try with parameterList = {}, should fail
};
